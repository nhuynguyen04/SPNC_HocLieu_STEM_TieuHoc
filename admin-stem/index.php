<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Học liệu STEM Tiểu học</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/index.css?v=<?php echo time(); ?>">
</head>
<body>
    <div class="admin-container">
        <aside class="sidebar">
            <div class="logo">
                <i class="fas fa-atom"></i>
                <h2>STEM Admin</h2>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li class="active">
                        <a href="index.php">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Tổng quan</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="statistics.php">
                            <i class="fas fa-chart-line"></i>
                            <span>Thống kê</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="learning_materials.php">
                            <i class="fas fa-book"></i>
                            <span>Học liệu</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="users.php">
                            <i class="fas fa-users"></i>
                            <span>Người dùng</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="settings.php">
                            <i class="fas fa-cog"></i>
                            <span>Cài đặt</span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="sidebar-footer">
                <div class="admin-info">
                    <div class="admin-avatar">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <div class="admin-details">
                        <h4>Admin</h4>
                        <p>Quản trị viên</p>
                    </div>
                </div>
                <a href="logout.php" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </aside>

        <main class="main-content">
            <div class="header">
                <div class="header-title">
                    <h1>Tổng quan hệ thống</h1>
                    <p>Quản lý học liệu STEM cho học sinh Tiểu học</p>
                </div>
                <div class="header-actions">
                    <div class="date-info">
                        <i class="fas fa-calendar-alt"></i>
                        <span id="current-date"></span>
                    </div>
                    <button class="btn-notification">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                </div>
            </div>

            <div class="content-wrapper">
                <div class="welcome-card">
                    <div class="welcome-text">
                        <h2>Chào mừng đến với bảng điều khiển</h2>
                        <p>Giám sát và quản lý hệ thống học liệu STEM một cách hiệu quả</p>
                    </div>
                    <div class="welcome-stats">
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <h3>17</h3>
                            <p>Học liệu</p>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <h3>245</h3>
                            <p>Người dùng</p>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-eye"></i>
                            <h3>12.5K</h3>
                            <p>Lượt xem</p>
                        </div>
                    </div>
                </div>

                <div class="stats-overview">
                    <div class="stat-card">
                        <div class="stat-icon science">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Khoa học</h3>
                            <div class="stat-details">
                                <span class="stat-value">42</span>
                                <span class="stat-change positive">+12%</span>
                            </div>
                            <p class="stat-sub">Học liệu</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon technology">
                            <i class="fas fa-laptop-code"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Công nghệ</h3>
                            <div class="stat-details">
                                <span class="stat-value">38</span>
                                <span class="stat-change positive">+8%</span>
                            </div>
                            <p class="stat-sub">Học liệu</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon engineering">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Kỹ thuật</h3>
                            <div class="stat-details">
                                <span class="stat-value">29</span>
                                <span class="stat-change neutral">±0%</span>
                            </div>
                            <p class="stat-sub">Học liệu</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon math">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="stat-info">
                            <h3>Toán học</h3>
                            <div class="stat-details">
                                <span class="stat-value">35</span>
                                <span class="stat-change positive">+5%</span>
                            </div>
                            <p class="stat-sub">Học liệu</p>
                        </div>
                    </div>
                </div>

                <div class="content-row">
                    <div class="content-col">
                        <div class="content-box">
                            <div class="box-header">
                                <h3>
                                    <i class="fas fa-tasks"></i>
                                    Hoạt động gần đây
                                </h3>
                            </div>
                            <div class="activity-list">
                                <div class="activity-item">
                                    <div class="activity-icon success">
                                        <i class="fas fa-user-check"></i>
                                    </div>
                                    <div class="activity-content">
                                        <p>Người dùng mới đăng ký: giáo viên Nguyễn Văn A</p>
                                        <span class="activity-time">5 giờ trước</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon warning">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div class="activity-content">
                                        <p>Báo cáo lỗi từ học liệu "Hậu Nghệ bắn mặt trời"</p>
                                        <span class="activity-time">1 ngày trước</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon success">
                                        <i class="fas fa-user-check"></i>
                                    </div>
                                    <div class="activity-content">
                                        <p>Người dùng mới đăng ký: học sinh Nguyễn Văn B</p>
                                        <span class="activity-time">1 ngày trước</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon success">
                                        <i class="fas fa-user-check"></i>
                                    </div>
                                    <div class="activity-content">
                                        <p>Người dùng mới đăng ký: học sinh Nguyễn Văn C</p>
                                        <span class="activity-time">2 ngày trước</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <div class="section-header">
                            <h3>
                                <i class="fas fa-fire"></i>
                                Học liệu phổ biến
                            </h3>
                        </div>
                        <div class="popular-materials">
                            <div class="material-item">
                                <div class="material-rank">1</div>
                                <div class="material-info">
                                    <h4>Em là họa sĩ máy tính</h4>
                                    <div class="material-meta">
                                        <span class="material-category">Công nghệ</span>
                                        <span class="material-views"><i class="fas fa-eye"></i> 3,421 lượt</span>
                                    </div>
                                </div>
                                <div class="material-rating">
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span>5.0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="material-item">
                                <div class="material-rank">2</div>
                                <div class="material-info">
                                    <h4>Bí kiếp ăn uống lành mạnh</h4>
                                    <div class="material-meta">
                                        <span class="material-category">Khoa học</span>
                                        <span class="material-views"><i class="fas fa-eye"></i> 2,847 lượt</span>
                                    </div>
                                </div>
                                <div class="material-rating">
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span>4.8</span>
                                    </div>
                                </div>
                            </div>
                            <div class="material-item">
                                <div class="material-rank">3</div>
                                <div class="material-info">
                                    <h4>Hậu nghệ</h4>
                                    <div class="material-meta">
                                        <span class="material-category">Toán học</span>
                                        <span class="material-views"><i class="fas fa-eye"></i> 3.792 lượt</span>
                                    </div>
                                </div>
                                <div class="material-rating">
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span>4.7</span>
                                    </div>
                                </div>
                            </div>
                            <div class="material-item">
                                <div class="material-rank">4</div>
                                <div class="material-info">
                                    <h4>Hoa yêu thương nở rộ</h4>
                                    <div class="material-meta">
                                        <span class="material-category">Kỹ thuật</span>
                                        <span class="material-views"><i class="fas fa-eye"></i> 2,539 lượt</span>
                                    </div>
                                </div>
                                <div class="material-rating">
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span>4.5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="assets/js/index.js"></script>
</body>
</html>