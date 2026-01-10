<?php
require_once __DIR__ . '/../includes/config.php';
// ensure admin is logged in (this starts session)
checkAdminLogin();

header('Content-Type: application/json; charset=utf-8');

try {
    // Use project's PDO Database class (it will create DB/tables if missing)
    require_once __DIR__ . '/../../models/Database.php';
    $database = new Database();
    $db = $database->getConnection();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // detect existing columns so we only SELECT what exists
        $existingCols = [];
        try {
            $colStmt = $db->query("SHOW COLUMNS FROM users");
            while ($c = $colStmt->fetch(PDO::FETCH_ASSOC)) {
                $existingCols[] = $c['Field'];
            }
        } catch (Exception $e) {
            // if SHOW COLUMNS fails, fall back to a safe minimal select
            $existingCols = ['id'];
        }

        $desired = ['id','username','email','first_name','last_name','phone','class','role','notes','created_at'];
        $selectCols = array_values(array_intersect($desired, $existingCols));
        if (empty($selectCols)) $selectCols = ['id'];

        $cols = implode(', ', array_map(function($c){ return "`".$c."`"; }, $selectCols));

        $stmt = $db->prepare("SELECT {$cols} FROM users ORDER BY id DESC");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $out = [];
        foreach ($rows as $r) {
            $full = trim(($r['first_name'] ?? '') . ' ' . ($r['last_name'] ?? ''));
            $out[] = [
                'id' => (int)($r['id'] ?? 0),
                'fullName' => $full ?: ($r['username'] ?? ''),
                'email' => $r['email'] ?? '',
                'phone' => $r['phone'] ?? '',
                'grade' => $r['class'] ?? '',
                'notes' => $r['notes'] ?? '',
                'role' => $r['role'] ?? '',
                'registrationDate' => $r['created_at'] ?? ''
            ];
        }

        echo json_encode(['success' => true, 'users' => $out]);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Expect JSON body
        $payload = json_decode(file_get_contents('php://input'), true);
        $action = $payload['action'] ?? '';

        if ($action === 'delete') {
            $id = (int)($payload['id'] ?? 0);
            if ($id <= 0) throw new Exception('Invalid id');
            $stmt = $db->prepare('DELETE FROM users WHERE id = :id');
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true]);
            exit();
        }

        // toggle_status removed: status/online handling retired

        if ($action === 'save') {
            $id = isset($payload['id']) ? (int)$payload['id'] : 0;
            $fullName = trim($payload['fullName'] ?? '');
            $email = trim($payload['email'] ?? '');
            $phone = trim($payload['phone'] ?? '');
            $grade = trim($payload['grade'] ?? '');
            $notes = trim($payload['notes'] ?? '');

            // detect existing columns
            $existingCols = [];
            try {
                $colStmt = $db->query("SHOW COLUMNS FROM users");
                while ($c = $colStmt->fetch(PDO::FETCH_ASSOC)) $existingCols[] = $c['Field'];
            } catch (Exception $e) { $existingCols = [] ; }

            $hasFirst = in_array('first_name', $existingCols);
            $hasLast = in_array('last_name', $existingCols);
            $hasPhone = in_array('phone', $existingCols);
            $hasClass = in_array('class', $existingCols);
            $hasNotes = in_array('notes', $existingCols);

            // Split full name to first/last
            $parts = preg_split('/\s+/', $fullName);
            $last = array_pop($parts);
            $first = implode(' ', $parts);

            if ($id > 0) {
                $set = [];
                $params = [':id' => $id];

                if ($hasFirst) { $set[] = 'first_name = :first'; $params[':first'] = $first; }
                if ($hasLast) { $set[] = 'last_name = :last'; $params[':last'] = $last; }
                if (in_array('email', $existingCols)) { $set[] = 'email = :email'; $params[':email'] = $email; }
                if ($hasPhone) { $set[] = 'phone = :phone'; $params[':phone'] = $phone; }
                if ($hasClass) { $set[] = '`class` = :class'; $params[':class'] = $grade; }
                if ($hasNotes) { $set[] = 'notes = :notes'; $params[':notes'] = $notes; }

                if (empty($set)) throw new Exception('No updatable columns available');
                $sql = 'UPDATE users SET ' . implode(', ', $set) . ' WHERE id = :id';
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                echo json_encode(['success' => true]);
                exit();
            } else {
                // Create minimal user (username from email)
                $existingCols = $existingCols ?: [];
                $cols = [];
                $place = [];
                $params = [];

                // username
                if (in_array('username', $existingCols)) { $cols[] = 'username'; $place[] = ':username'; $params[':username'] = $email ?: 'user'.time(); }
                if (in_array('email', $existingCols)) { $cols[] = 'email'; $place[] = ':email'; $params[':email'] = $email; }
                if (in_array('password', $existingCols)) { $cols[] = 'password'; $place[] = ':password'; $params[':password'] = password_hash('changeme', PASSWORD_DEFAULT); }
                if ($hasFirst) { $cols[] = 'first_name'; $place[] = ':first'; $params[':first'] = $first; }
                if ($hasLast) { $cols[] = 'last_name'; $place[] = ':last'; $params[':last'] = $last; }
                if ($hasClass) { $cols[] = '`class`'; $place[] = ':class'; $params[':class'] = $grade; }
                if ($hasNotes) { $cols[] = 'notes'; $place[] = ':notes'; $params[':notes'] = $notes; }
                if (in_array('role', $existingCols)) { $cols[] = 'role'; $place[] = ':role'; $params[':role'] = 'user'; }

                if (empty($cols)) throw new Exception('No creatable columns on users table');
                $sql = 'INSERT INTO users (' . implode(', ', $cols) . ') VALUES (' . implode(', ', $place) . ')';
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
                exit();
            }
        }

        throw new Exception('Unknown action');
    }

    throw new Exception('Unsupported method');
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit();
}
