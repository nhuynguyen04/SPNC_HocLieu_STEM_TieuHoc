<?php
$current_page = 'profile';

$base_url = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
$base_url = rtrim($base_url, '/\\');

require_once './template/header.php';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ - STEM Universe</title>

    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/css/profile.css">
    
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
                            <div class="avatar-large" id="currentAvatar">👦</div>  
                            <button class="edit-avatar-btn" id="editAvatarBtn">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <div class="profile-info">
                            <h1 class="profile-name" id="displayName">Nguyễn Văn A</h1>
                            <p class="profile-role">Học sinh</p>
                            <div class="profile-stats">
                                <div class="stat-item">
                                    <span class="stat-number">12</span>
                                    <span class="stat-label">Bài học</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">8</span>
                                    <span class="stat-label">Thành tích</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">15</span>
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
                    <button class="tab-btn" data-tab="achievements">Thành tích</button>
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
                                        <span class="info-value" id="infoFullName">Nguyễn Văn A</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Ngày sinh:</span>
                                        <span class="info-value" id="infoBirthDate">15/03/2015</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Lớp:</span>
                                        <span class="info-value" id="infoClass">3A</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Trường:</span>
                                        <span class="info-value" id="infoSchool">Tiểu học ABC</span>
                                    </div>
                                </div>
                            </div>

                            <div class="info-section">
                                <h3 class="section-header"><i class="fas fa-graduation-cap"></i> Học tập</h3>
                                <div class="study-info-grid">
                                    <div class="study-item">
                                        <span class="info-label">Điểm trung bình</span>
                                        <span class="study-value">9.2</span>
                                    </div>
                                    <div class="study-item">
                                        <span class="info-label">Bài học hoàn thành</span>
                                        <span class="study-value">12/20</span>
                                    </div>
                                    <div class="study-item">
                                        <span class="info-label">Cấp độ</span>
                                        <span class="level-badge">Nhà khoa học nhí</span>
                                    </div>
                                </div>
                            </div>

                            <div class="info-section">
                                <h3 class="section-header"><i class="fas fa-star"></i> Sở thích</h3>
                                <div class="interests-section">
                                    <span class="interest-tag">Kỹ thuật</span>
                                    <span class="interest-tag">Công nghệ</span>
                                    <span class="interest-tag">Khoa học</span>
                                    <span class="interest-tag">Toán học</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="achievements-tab">
                        <div class="achievements-grid">
                            <div class="achievement-card">
                                <div class="achievement-icon gold">
                                    <i class="fas fa-trophy"></i>
                                </div>
                                <h4>Nhà khoa học tí hon</h4>
                                <p>Hoàn thành 10 bài học đầu tiên</p>
                                <span class="achievement-date">Đạt được: 15/12/2024</span>
                            </div>
                            <div class="achievement-card">
                                <div class="achievement-icon bronze">
                                    <i class="fas fa-award"></i>
                                </div>
                                <h4>Nhà sáng chế</h4>
                                <p>Tạo ra 5 dự án STEM</p>
                                <span class="achievement-date">Đạt được: 05/12/2024</span>
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
                    <input type="text" id="fullName" class="form-input" value="Nguyễn Văn A">
                </div>
                <div class="form-group">
                    <label class="form-label" for="birthDate">Ngày sinh</label>
                    <input type="date" id="birthDate" class="form-input" value="2015-03-15">
                </div>
                <div class="form-group">
                    <label class="form-label" for="class">Lớp</label>
                    <input type="text" id="class" class="form-input" value="3A">
                </div>
                <div class="form-group">
                    <label class="form-label" for="school">Trường</label>
                    <input type="text" id="school" class="form-input" value="Tiểu học ABC">
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
                    👦
                </div>
                <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                <button class="upload-btn" id="uploadAvatarBtn">
                    <i class="fas fa-upload"></i>
                    Chọn ảnh từ thiết bị
                </button>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" id="cancelAvatarEdit">Hủy</button>
                <button type="button" class="btn btn-primary" id="saveAvatarBtn">Lưu ảnh</button>
            </div>
        </div>
    </div>

    <script src="<?php echo $base_url; ?>/public/js/profile.js"></script>
</body>
</html>