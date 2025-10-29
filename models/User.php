<?php
class User {
    private $conn;
    private $table_name = "users";
    
    public $id;
    public $username;
    public $email;
    public $password;
    public $role;
    public $full_name;
    public $class;
    public $avatar;
    public $email_verified;
    public $verification_code;
    public $verification_expires;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function login($username, $password, $remember = false) {
        $query = "SELECT id, username, password, role, first_name, last_name, class, avatar, email_verified 
                  FROM " . $this->table_name . " 
                  WHERE username = :username OR email = :username";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            
            if ($stmt->rowCount() == 1) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($password, $row['password'])) {
                    // Nếu email chưa xác thực thì trả về chỉ báo
                    $emailVerified = isset($row['email_verified']) ? (int)$row['email_verified'] : 0;
                    if ($emailVerified === 0) {
                        // Không cho phép đăng nhập nếu email chưa xác thực
                        return 'not_verified';
                    }

                    // Cập nhật thông tin user
                    $this->id = $row['id'];
                    $this->username = $row['username'];
                    $this->role = $row['role'];
                    $this->full_name = $row['first_name'] . ' ' . $row['last_name'];
                    $this->class = $row['class'];
                    $this->avatar = $row['avatar'];

                    // Xử lý ghi nhớ đăng nhập với cơ chế selector/validator
                    if ($remember) {
                        $this->createRememberToken();
                    }
                    
                    return true;
                }
            }
        } catch(PDOException $e) {
            error_log("Login error: " . $e->getMessage());
            throw new Exception("Lỗi đăng nhập");
        }
        return false;
    }

    private function createRememberToken() {
        try {
            // Tạo selector và validator ngẫu nhiên
            $selector = bin2hex(random_bytes(9));
            $validator = bin2hex(random_bytes(33));
            $hashedValidator = hash('sha256', $validator);
            
            // Cấu hình thời gian hết hạn và thông tin bổ sung
            $expires = date('Y-m-d H:i:s', strtotime('+30 days'));
            $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? substr($_SERVER['HTTP_USER_AGENT'], 0, 255) : null;
            $ip = $_SERVER['REMOTE_ADDR'] ?? null;

            // Xóa các token cũ của user này (giới hạn 1 token/thiết bị)
            $deleteOld = $this->conn->prepare("DELETE FROM remember_tokens WHERE user_id = :user_id");
            $deleteOld->execute([':user_id' => $this->id]);

            // Thêm token mới
            $query = "INSERT INTO remember_tokens (user_id, selector, hashed_validator, user_agent, ip, expires_at) 
                     VALUES (:user_id, :selector, :hashed_validator, :user_agent, :ip, :expires)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':user_id' => $this->id,
                ':selector' => $selector,
                ':hashed_validator' => $hashedValidator,
                ':user_agent' => $userAgent,
                ':ip' => $ip,
                ':expires' => $expires
            ]);

            // Set cookie với các flags bảo mật
            $cookieValue = base64_encode($selector) . '.' . base64_encode($validator);
            $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
            
            setcookie('remember', $cookieValue, [
                'expires' => time() + 86400 * 30,
                'path' => '/',
                'domain' => '',
                'secure' => $secure,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);

            return true;
        } catch(Exception $e) {
            error_log("Create remember token error: " . $e->getMessage());
            return false;
        }
    }

    public function register($username, $email, $password, $fullName, $class = null) {
        try {
            // Kiểm tra username đã tồn tại
            $stmt = $this->conn->prepare("SELECT id FROM " . $this->table_name . " WHERE username = :username");
            $stmt->bindParam(":username", $username);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return false;
            }

            // Kiểm tra email đã tồn tại
            $stmt = $this->conn->prepare("SELECT id FROM " . $this->table_name . " WHERE email = :email");
            $stmt->bindParam(":email", $email);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return false;
            }

            // Xử lý tách họ và tên
            $nameParts = explode(" ", $fullName);
            $lastName = array_pop($nameParts);
            $firstName = implode(" ", $nameParts);

            // Thêm user mới
            $query = "INSERT INTO " . $this->table_name . " 
                    (username, email, password, first_name, last_name, class, role) 
                    VALUES 
                    (:username, :email, :password, :first_name, :last_name, :class, 'user')";

            $stmt = $this->conn->prepare($query);

            // Hash password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // Bind các giá trị
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $password_hash);
            $stmt->bindParam(":first_name", $firstName);
            $stmt->bindParam(":last_name", $lastName);
            $stmt->bindParam(":class", $class);

            if ($stmt->execute()) {
                // Trả về ID user mới (để controller có thể tạo mã xác thực và gửi email)
                return (int)$this->conn->lastInsertId();
            }
        } catch(PDOException $e) {
            error_log("Register error: " . $e->getMessage());
            throw new Exception("Lỗi đăng ký");
        }
        return false;
    }

    /**
     * Tạo mã xác thực cho user vừa đăng ký
     * Trả về mã xác thực (string) nếu thành công, false nếu thất bại
     */
    public function addVerification($userId, $length = 6, $minutes = 60) {
        try {
            // Tạo mã số ngẫu nhiên gồm chữ số
            $code = '';
            for ($i = 0; $i < $length; $i++) {
                $code .= random_int(0, 9);
            }

            $expires = date('Y-m-d H:i:s', strtotime("+{$minutes} minutes"));

            $query = "UPDATE " . $this->table_name . " SET verification_code = :code, verification_expires = :expires, email_verified = 0 WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                ':code' => $code,
                ':expires' => $expires,
                ':id' => $userId
            ]);

            return $code;
        } catch (PDOException $e) {
            error_log("Add verification error: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Xác thực email bằng email và mã (hoặc bằng id và mã)
     */
    public function verifyEmail($email, $code) {
        try {
            $query = "SELECT id, verification_code, verification_expires FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([':email' => $email]);
            if ($stmt->rowCount() === 0) {
                return false;
            }

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$row['verification_code']) return false;
            if ($row['verification_code'] !== $code) return false;
            if ($row['verification_expires'] && strtotime($row['verification_expires']) < time()) return false;

            // Cập nhật trạng thái đã xác thực
            $update = $this->conn->prepare("UPDATE " . $this->table_name . " SET email_verified = 1, verification_code = NULL, verification_expires = NULL WHERE id = :id");
            $update->execute([':id' => $row['id']]);
            return true;
        } catch (PDOException $e) {
            error_log("Verify email error: " . $e->getMessage());
            return false;
        }
    }

    public function checkRememberToken($cookieValue) {
        try {
            // Tách selector và validator từ cookie
            $parts = explode('.', $cookieValue);
            if (count($parts) !== 2) {
                return false;
            }

            $selector = base64_decode($parts[0]);
            $validator = base64_decode($parts[1]);

            if (!$selector || !$validator) {
                return false;
            }

            // Tìm token trong database bằng selector
            $query = "SELECT rt.*, u.username, u.role, u.first_name, u.last_name, u.class, u.avatar
                     FROM remember_tokens rt
                     INNER JOIN " . $this->table_name . " u ON rt.user_id = u.id
                     WHERE rt.selector = :selector AND rt.expires_at > NOW()
                     LIMIT 1";

            $stmt = $this->conn->prepare($query);
            $stmt->execute([':selector' => $selector]);
            
            if ($stmt->rowCount() === 0) {
                return false;
            }

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Xác thực validator
            if (hash_equals($row['hashed_validator'], hash('sha256', $validator))) {
                $this->id = $row['user_id'];
                $this->username = $row['username'];
                $this->role = $row['role'];
                $this->full_name = $row['first_name'] . ' ' . $row['last_name'];
                $this->class = $row['class'];
                $this->avatar = $row['avatar'];

                // Xoay token (tạo token mới)
                $this->createRememberToken();

                // Xóa token cũ
                $delete = $this->conn->prepare("DELETE FROM remember_tokens WHERE id = :id");
                $delete->execute([':id' => $row['id']]);

                return true;
            }

            // Nếu validator không khớp, xóa token này vì có thể là tấn công
            $delete = $this->conn->prepare("DELETE FROM remember_tokens WHERE selector = :selector");
            $delete->execute([':selector' => $selector]);
            
        } catch(PDOException $e) {
            error_log("Check remember token error: " . $e->getMessage());
            throw new Exception("Lỗi kiểm tra token");
        }
        return false;
    }
}
?>