<?php
session_start();
require_once 'controller/AuthController.php';

$authController = new AuthController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    if ($authController->login($username, $password)) {
        header('Location: index.php');
        exit;
    } else {
        $error = "Tên đăng nhập hoặc mật khẩu không đúng";
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập - STEM Kids Việt</title>
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-form">
            <h2>Đăng nhập</h2>
            <?php if (isset($error)): ?>
                <div class="alert alert-error"><?php echo $error; ?></div>
            <?php endif; ?>
            <form method="POST">
                <div class="form-group">
                    <label for="username">Tên đăng nhập</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Đăng nhập</button>
            </form>
            <p>Chưa có tài khoản? <a href="signup.php">Đăng ký ngay</a></p>
        </div>
    </div>
</body>
</html>