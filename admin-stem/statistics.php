<?php
session_start();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thống kê - Học liệu STEM</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/statistics.css?v=<?php echo time(); ?>">
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
                    <li class="nav-item">
                        <a href="index.php">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Tổng quan</span>
                        </a>
                    </li>
                    <li class="active">
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
            <div class="content-wrapper">
                <div class="welcome-card">
                    <div class="welcome-text">
                        <h2>Báo cáo thống kê</h2>
                        <p>Thông tin chi tiết về hoạt động của hệ thống</p>
                    </div>
                    <div class="welcome-stats">
                        <div class="stat-item">
                            <i class="fas fa-chart-bar"></i>
                            <h3>8,542</h3>
                            <p>Truy cập tháng</p>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-user-plus"></i>
                            <h3>156</h3>
                            <p>Người dùng mới</p>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <h3>24m</h3>
                            <p>Thời gian TB</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="card">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-chart-line"></i>
                                Thống kê truy cập
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="monthlyChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-pie-chart"></i>
                                Phân loại người dùng
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="userTypeChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="card full-width">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-table"></i>
                                Báo cáo chi tiết
                            </h3>
                        </div>
                        <div class="card-body">
                            <table class="stats-table">
                                <thead>
                                    <tr>
                                        <th>Chỉ số</th>
                                        <th>Hôm nay</th>
                                        <th>Tuần này</th>
                                        <th>Tháng này</th>
                                        <th>Tổng cộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lượt truy cập</td>
                                        <td>245</td>
                                        <td>1,847</td>
                                        <td>8,542</td>
                                        <td>45,231</td>
                                    </tr>
                                    <tr>
                                        <td>Người dùng mới</td>
                                        <td>12</td>
                                        <td>89</td>
                                        <td>156</td>
                                        <td>1,234</td>
                                    </tr>
                                    <tr>
                                        <td>Học liệu hoàn thành</td>
                                        <td>67</td>
                                        <td>423</td>
                                        <td>1,987</td>
                                        <td>12,456</td>
                                    </tr>
                                    <tr>
                                        <td>Thời gian học TB</td>
                                        <td>28m</td>
                                        <td>24m</td>
                                        <td>22m</td>
                                        <td>20m</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="assets/js/statistics.js" defer></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Statistics page loaded');
        });
    </script>
</body>
</html>