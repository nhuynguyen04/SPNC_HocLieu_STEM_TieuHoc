<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

try {
    require_once 'controller/AuthController.php';

    $authController = new AuthController();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fullname = trim($_POST['fullname']);
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];
        $class = isset($_POST['class']) ? trim($_POST['class']) : null;
        
        $error = '';
        if (empty($fullname) || empty($username) || empty($email) || empty($password)) {
            $error = "Vui lòng điền đầy đủ thông tin bắt buộc";
        } elseif ($password !== $confirm_password) {
            $error = "Mật khẩu xác nhận không khớp";
        } elseif (strlen($password) < 6) {
            $error = "Mật khẩu phải có ít nhất 6 ký tự";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = "Email không hợp lệ";
        }
        
        if (empty($error)) {
            if ($authController->register($fullname, $username, $email, $password, $class)) {
                $_SESSION['success'] = "Đăng ký thành công! Vui lòng đăng nhập.";
                header('Location: signin.php');
                exit;
            } else {
                $error = "Tên đăng nhập hoặc email đã tồn tại";
            }
        }
    }
} catch (Exception $e) {
    $error = "Hệ thống đang bảo trì. Vui lòng thử lại sau.";
    error_log("Signup error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký - STEM Universe</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="public/css/signup.css">
</head>
<body>
    <!-- Simple Static Background -->
    <div class="static-bg"></div>

    <!-- Auth Container -->
    <div class="auth-container">
        <div class="auth-form">
            <div class="auth-header">
                <div class="auth-icon">
                    <i class="fas fa-user-astronaut"></i>
                </div>
                <h1 class="auth-title">Đăng ký</h1>
                <p class="auth-subtitle">
                    Bắt đầu hành trình khám phá vũ trụ STEM
                </p>
            </div>

            <?php if (isset($error)): ?>
                <div class="alert alert-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p><?php echo $error; ?></p>
                </div>
            <?php endif; ?>

            <form method="POST" class="form">
                <div class="form-group">
                    <label for="fullname">
                        <i class="fas fa-user"></i>
                        Họ và tên
                    </label>
                    <input type="text" id="fullname" name="fullname" required 
                           placeholder="Nhập họ và tên đầy đủ"
                           value="<?php echo isset($_POST['fullname']) ? htmlspecialchars($_POST['fullname']) : ''; ?>">
                </div>

                <div class="form-group">
                    <label for="username">
                        <i class="fas fa-at"></i>
                        Tên đăng nhập
                    </label>
                    <input type="text" id="username" name="username" required 
                           placeholder="Chọn tên đăng nhập"
                           value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>">
                </div>

                <div class="form-group">
                    <label for="email">
                        <i class="fas fa-envelope"></i>
                        Email
                    </label>
                    <input type="email" id="email" name="email" required 
                           placeholder="Nhập địa chỉ email"
                           value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                </div>

                <div class="form-group">
                    <label for="password">
                        <i class="fas fa-lock"></i>
                        Mật khẩu
                    </label>
                    <div class="password-input-container">
                        <input type="password" id="password" name="password" required 
                               placeholder="Tạo mật khẩu (ít nhất 6 ký tự)">
                        <button type="button" class="toggle-password" data-target="password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="password-requirements">
                        <ul>
                            <li class="requirement" data-requirement="length">Ít nhất 6 ký tự</li>
                            <li class="requirement" data-requirement="uppercase">Có chữ in hoa</li>
                            <li class="requirement" data-requirement="number">Có số</li>
                            <li class="requirement" data-requirement="special">Có ký tự đặc biệt</li>
                        </ul>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirm_password">
                        <i class="fas fa-lock"></i>
                        Xác nhận mật khẩu
                    </label>
                    <div class="password-input-container">
                        <input type="password" id="confirm_password" name="confirm_password" required 
                               placeholder="Nhập lại mật khẩu">
                        <button type="button" class="toggle-password" data-target="confirm_password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="class">
                        <i class="fas fa-graduation-cap"></i>
                        Lớp
                    </label>
                    <input type="text" id="class" name="class" 
                           placeholder="Ví dụ: 10A1, 11B2..."
                           value="<?php echo isset($_POST['class']) ? htmlspecialchars($_POST['class']) : ''; ?>">
                </div>

                <div class="form-options">
                    <label class="checkbox">
                        <input type="checkbox" name="agree_terms" required>
                        <span class="checkmark"></span>
                        Tôi đồng ý với <a href="terms.php" class="terms-link">điều khoản sử dụng</a>
                    </label>
                </div>

                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Đăng ký tài khoản
                </button>
            </form>

            <div class="auth-footer">
                <div class="auth-link">
                    <span>Đã có tài khoản?</span>
                    <a href="signin.php" class="link">
                        <i class="fas fa-sign-in-alt"></i>
                        Đăng nhập ngay
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script src="public/js/signup.js"></script>
</body>
</html>
