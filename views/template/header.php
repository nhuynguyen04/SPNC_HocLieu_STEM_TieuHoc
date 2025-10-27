<?php
$current_page = basename($_SERVER['PHP_SELF']);
$current_page = $current_page ?? 'home';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STEM Universe - Học liệu STEM Tiểu học</title>
    <link rel="stylesheet" href="/SPNC_HocLieu_STEM_TieuHoc/public/css/home.css">
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

    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <div class="logo-icon">🌟</div>
                    <div class="logo-text">
                        <h1>STEM Universe</h1>
                        <p>Hành trình khám phá tri thức</p>
                    </div>
                </div>
                
                <nav class="main-nav">
                    <a href="/SPNC_HocLieu_STEM_TieuHoc/views/home.php" class="nav-link <?php echo $current_page === 'home.php' ? 'active' : ''; ?>">Trang chủ</a>
                    <a href="/SPNC_HocLieu_STEM_TieuHoc/views/main_lesson.php" class="nav-link <?php echo $current_page === 'main_lesson.php' ? 'active' : ''; ?>">Bài học</a>
                </nav>

                
                <div class="header-actions">
                    <form class="search-bar" method="GET">
                        <input type="text" name="search" placeholder="Tìm bài học..." 
                            value="<?= isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '' ?>">
                        <button type="submit" class="search-btn">🔍</button>
                    </form>
                    <div class="user-avatar">
                        <div class="avatar">👦</div>
                    </div>
                </div>
            </div>
        </div>
    </header>
