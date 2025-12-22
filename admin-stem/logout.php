<?php
session_start();
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng xuất - Admin STEM</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/logout.css?v=<?php echo time(); ?>">
</head>
<body>
    <div class="logout-container">
        <div class="logout-icon">
            <i class="fas fa-sign-out-alt"></i>
        </div>
        
        <h1>Đã đăng xuất thành công</h1>
        
        <p>Bạn đã đăng xuất khỏi hệ thống quản trị học liệu STEM tiểu học.</p>
        
        <div class="logout-message">
            <i class="fas fa-check-circle"></i>
            <span>Phiên làm việc đã được kết thúc an toàn.</span>
        </div>
        
        <div class="btn-group">
            <a href="login.php" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i> Đăng nhập lại
            </a>
            <a href="../" class="btn btn-secondary">
                <i class="fas fa-home"></i> Về trang chủ
            </a>
        </div>
        
        <div class="countdown" id="countdown">
            Tự động chuyển hướng về trang đăng nhập sau <span id="seconds">10</span> giây...
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
    <script src="assets/js/logout.js?v=<?php echo time(); ?>"></script>
</body>
</html>