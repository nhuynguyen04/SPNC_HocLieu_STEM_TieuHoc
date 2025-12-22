<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Quản lý Học liệu STEM</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/learning_materials.css?v=<?php echo time(); ?>">
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
                    <li class="nav-item">
                        <a href="statistics.php">
                            <i class="fas fa-chart-line"></i>
                            <span>Thống kê</span>
                        </a>
                    </li>
                    <li class="active">
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
            <div class="filter-section">
                <div class="filter-header">
                    <div class="filter-title">Bộ lọc học liệu</div>
                    <div class="filter-controls">
                        <select class="filter-select" id="gradeFilter">
                            <option value="">Tất cả khối lớp</option>
                            <option value="1">Lớp 1</option>
                            <option value="2">Lớp 2</option>
                            <option value="3">Lớp 3</option>
                            <option value="4">Lớp 4</option>
                            <option value="5">Lớp 5</option>
                        </select>
                        
                        <select class="filter-select" id="typeFilter">
                            <option value="">Tất cả loại học liệu</option>
                            <option value="game">Trò chơi</option>
                            <option value="qa">Trả lời câu hỏi</option>
                            <option value="practice">Thực hành</option>
                            <option value="mixed">Hỗn hợp</option>
                        </select>
                    </div>
                </div>
                
                <div class="filter-badges">
                    <div class="filter-badge active" data-filter="all">
                        <i class="fas fa-layer-group"></i>
                        Tất cả
                    </div>
                    <div class="filter-badge science" data-filter="science">
                        <i class="fas fa-flask"></i>
                        Khoa học
                    </div>
                    <div class="filter-badge tech" data-filter="tech">
                        <i class="fas fa-laptop-code"></i>
                        Công nghệ
                    </div>
                    <div class="filter-badge eng" data-filter="eng">
                        <i class="fas fa-cogs"></i>
                        Kỹ thuật
                    </div>
                    <div class="filter-badge math" data-filter="math">
                        <i class="fas fa-calculator"></i>
                        Toán học
                    </div>
                    <button class="clear-filters" id="clearFilters">Xóa bộ lọc</button>
                </div>
            </div>

            <div class="excel-container">
                <table class="excel-table" id="materialsTable">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên học liệu</th>
                            <th>Chuyên đề</th>
                            <th>Khối lớp</th>
                            <th>Loại học liệu</th>
                            <th>Lượt xem</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="materialsTableBody"></tbody>
                </table>
                
                <div class="empty-state" id="emptyState" style="display: none;">
                    <i class="fas fa-file-alt"></i>
                    <h3>Không tìm thấy học liệu</h3>
                    <p>Không có học liệu nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh bộ lọc hoặc tạo học liệu mới.</p>
                </div>
                
                <div class="pagination">
                    <div class="pagination-info" id="paginationInfo">Hiển thị 1-17 của 17 học liệu</div>
                    <div class="pagination-controls">
                        <button class="pagination-btn" id="prevPage" disabled>
                            <i class="fas fa-chevron-left"></i> Trước
                        </button>
                        <div class="pagination-numbers" id="paginationNumbers">
                            <div class="page-number active">1</div>
                        </div>
                        <button class="pagination-btn" id="nextPage" disabled>
                            Sau <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="assets/js/learning_materials.js?v=<?php echo time(); ?>"></script>
    <script>
    console.log('Trang học liệu đang tải...');

    window.addEventListener('error', function(e) {
        console.error('Lỗi JavaScript:', e.error);
    });

    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM đã tải xong');
        console.log('Tổng số học liệu:', materialsData ? materialsData.length : 'chưa tải');
        
        console.log('materialsTableBody:', document.getElementById('materialsTableBody'));
        console.log('emptyState:', document.getElementById('emptyState'));
        console.log('paginationInfo:', document.getElementById('paginationInfo'));
    });
    </script>
</body>
</html>