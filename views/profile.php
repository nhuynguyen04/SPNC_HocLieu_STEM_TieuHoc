<?php
$current_page = 'profile';

$base_url = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
$base_url = rtrim($base_url, '/\\');

require_once './template/header.php';

// Load user info from session + database
$user = [
    'id' => null,
    'username' => 'Khách',
    'first_name' => '',
    'last_name' => '',
    'email' => '',
    'class' => '',
    'avatar' => null,
    'role' => 'user'
];

if (!empty($_SESSION['user_id'])) {
    try {
    require_once __DIR__ . '/../models/Database.php';
        $database = new Database();
        $db = $database->getConnection();

        if ($db) {
            $stmt = $db->prepare("SELECT id, username, email, first_name, last_name, class, avatar, role FROM users WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $_SESSION['user_id']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $user = array_merge($user, $row);
            }

            // compute some simple stats from scores/works
            $statsStmt = $db->prepare("SELECT
                (SELECT COUNT(*) FROM lessons) AS total_lessons,
                (SELECT COUNT(*) FROM works WHERE user_id = :uid) AS works_count,
                (SELECT COUNT(*) FROM scores WHERE user_id = :uid) AS scores_count,
                (SELECT COUNT(DISTINCT DATE(created_at)) FROM scores WHERE user_id = :uid) AS active_days,
                (SELECT IFNULL(ROUND(AVG(score),1), 0) FROM scores WHERE user_id = :uid) AS avg_score
                ");
            $statsStmt->execute([':uid' => $_SESSION['user_id']]);
            $stats = $statsStmt->fetch(PDO::FETCH_ASSOC) ?: [];
        }
    } catch (Exception $e) {
        error_log('Profile load error: ' . $e->getMessage());
    }
}

// Helper values for template
$displayName = trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? '')) ?: ($user['username'] ?? 'Khách');
$profileRole = ($user['role'] ?? 'Học sinh') === 'admin' ? 'Quản trị viên' : 'Học sinh';
$avatarHtml = '<div class="avatar-large">👦</div>';
if (!empty($user['avatar'])) {
    $avatarPath = rtrim($base_url, '/') . '/public/uploads/avatars/' . rawurlencode($user['avatar']);
    $avatarHtml = '<img src="' . $avatarPath . '" alt="avatar" class="avatar-img" />';
}

// Safe stats
$lessonsCount = isset($stats['total_lessons']) ? (int)$stats['total_lessons'] : 0;
$achievementsCount = isset($stats['works_count']) ? (int)$stats['works_count'] : 0;
$daysLearning = isset($stats['active_days']) ? (int)$stats['active_days'] : 0;
$avgScore = isset($stats['avg_score']) ? $stats['avg_score'] : 0;
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ - STEM Universe</title>

    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/profile.css?v=<?php echo time(); ?>">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-elements">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-circle circle-3"></div>
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
    </div>

    <main class="profile-container">
        <div class="container">
            <div class="profile-content">

                <div class="profile-header">
                    <div class="profile-avatar-section">
                        <div class="profile-avatar">
                            <div id="currentAvatar"><?php echo $avatarHtml; ?></div>
                            <button class="edit-avatar-btn" id="editAvatarBtn">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <div class="profile-info">
                            <h1 class="profile-name" id="displayName"><?php echo htmlspecialchars($displayName); ?></h1>
                            <p class="profile-role"><?php echo htmlspecialchars($profileRole); ?></p>
                            <div class="profile-stats">
                                <div class="stat-item">
                                    <span class="stat-number"><?php echo $lessonsCount; ?></span>
                                    <span class="stat-label">Bài học</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number"><?php echo $achievementsCount; ?></span>
                                    <span class="stat-label">Thành tích</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number"><?php echo $daysLearning; ?></span>
                                    <span class="stat-label">Ngày học</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="edit-profile-btn" id="editProfileBtn">
                        <i class="fas fa-edit"></i>
                        Chỉnh sửa hồ sơ
                    </button>
                </div>

                <div class="profile-tabs">
                    <button class="tab-btn active" data-tab="info">Thông tin cá nhân</button>
                    <button class="tab-btn" data-tab="progress">Tiến độ học tập</button>
                </div>

                <div class="tab-content">

                    <div class="tab-pane active" id="info-tab">
                        <div class="info-card-grid">

                            <div class="info-section">
                                <h3 class="section-header"><i class="fas fa-user"></i> Thông tin cơ bản</h3>
                                <div class="basic-info-grid">
                                    <div class="info-row">
                                        <span class="info-label">Họ và tên:</span>
                                        <span class="info-value" id="infoFullName"><?php echo htmlspecialchars($displayName); ?></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Ngày sinh:</span>
                                        <span class="info-value" id="infoBirthDate">15/03/2015</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Lớp:</span>
                                        <span class="info-value" id="infoClass"><?php echo htmlspecialchars($user['class'] ?? ''); ?></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Trường:</span>
                                        <span class="info-value" id="infoSchool"><?php echo htmlspecialchars($user['email'] ?? ''); ?></span>
                                    </div>
                                </div>
                            </div>

                            <div class="info-section">
                                <h3 class="section-header"><i class="fas fa-graduation-cap"></i> Học tập</h3>
                                <div class="study-info-grid">
                                    <div class="study-item">
                                        <span class="info-label">Điểm trung bình</span>
                                        <span class="study-value"><?php echo htmlspecialchars($avgScore); ?></span>
                                    </div>
                                    <div class="study-item">
                                        <span class="info-label">Bài học hoàn thành</span>
                                        <span class="study-value"><?php echo ($lessonsCount > 0) ? ($achievementsCount . '/' . $lessonsCount) : '0/' . $lessonsCount; ?></span>
                                    </div>
                                    <div class="study-item">
                                        <span class="info-label">Cấp độ</span>
                                        <span class="level-badge">Nhà khoa học nhí</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="progress-tab">
                        <div class="progress-stats">
                            <div class="progress-card">
                                <h4>Tiến độ học tập</h4>
                                <div class="circular-progress-wrapper">
                                    <div class="circular-progress" data-progress="60">
                                        <div class="inner-circle">
                                            <span class="progress-value">60%</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="progress-text">Đã hoàn thành 12/20 bài học</p>
                            </div>
                            
                            <div class="chart-container">
                                <h4 class="chart-title">Thời gian học tập trong tuần</h4>
                                <p class="chart-subtitle">(Tính theo phút)</p>
                                <div class="chart-bars">
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 80%"></div>
                                        <span>T2</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 60%"></div>
                                        <span>T3</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 90%"></div>
                                        <span>T4</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 70%"></div>
                                        <span>T5</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 85%"></div>
                                        <span>T6</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 50%"></div>
                                        <span>T7</span>
                                    </div>
                                    <div class="chart-bar">
                                        <div class="bar-fill" style="height: 40%"></div>
                                        <span>CN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div class="modal" id="editProfileModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Chỉnh sửa hồ sơ</h3>
                <button class="close-modal" id="closeProfileModal">&times;</button>
            </div>
            <form id="profileForm">
                <div class="form-group">
                    <label class="form-label" for="fullName">Họ và tên</label>
                    <input type="text" id="fullName" class="form-input" value="<?php echo htmlspecialchars($displayName); ?>">
                </div>
                <div class="form-group">
                    <label class="form-label" for="birthDate">Ngày sinh</label>
                    <input type="date" id="birthDate" class="form-input" value="">
                </div>
                <div class="form-group">
                    <label class="form-label" for="class">Lớp</label>
                    <input type="text" id="class" class="form-input" value="<?php echo htmlspecialchars($user['class'] ?? ''); ?>">
                </div>
                <div class="form-group">
                    <label class="form-label" for="school">Trường</label>
                    <input type="text" id="school" class="form-input" value="">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="cancelProfileEdit">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                </div>
            </form>
        </div>
    </div>

    <div class="modal" id="editAvatarModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Thay đổi ảnh đại diện</h3>
                <button class="close-modal" id="closeAvatarModal">&times;</button>
            </div>
            <div class="avatar-upload">
                <div class="avatar-preview" id="avatarPreview">
                    <?php echo $avatarHtml; ?>
                </div>
                <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                <button class="upload-btn" id="uploadAvatarBtn">
                    <i class="fas fa-upload"></i>
                    Chọn ảnh từ thiết bị
                </button>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" id="cancelAvatarEdit">Hủy</button>
                <button type="button" class="btn btn-danger" id="deleteAvatarBtn">Xóa ảnh</button>
                <button type="button" class="btn btn-primary" id="saveAvatarBtn">Lưu ảnh</button>
            </div>
        </div>
    </div>

    <script src="<?php echo $base_url; ?>/public/JS/profile.js?v=<?php echo time(); ?>"></script>
</body>
</html>