<?php
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quên mật khẩu - STEM Universe</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../public/css/forgot-password.css">
</head>
<body>
    <div class="static-bg"></div>

    <div class="auth-container">
        <div class="auth-form">
            <div class="auth-header">
                <div class="auth-icon">
                    <i class="fas fa-key"></i>
                </div>
                <h1 class="auth-title">Quên mật khẩu</h1>
                <p class="auth-subtitle">
                    Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                </p>
            </div>

            <div class="alert alert-info" id="infoAlert" style="display: none;">
                <i class="fas fa-info-circle"></i>
                <p>Vui lòng kiểm tra hộp thư đến và thư mục spam của bạn</p>
            </div>

            <div class="alert alert-error" id="errorAlert" style="display: none;">
                <i class="fas fa-exclamation-triangle"></i>
                <p id="errorMessage"></p>
            </div>

            <div class="alert alert-success" id="successAlert" style="display: none;">
                <i class="fas fa-check-circle"></i>
                <p id="successMessage"></p>
            </div>

            <form class="form" id="forgotPasswordForm">
                <div class="form-group">
                    <label for="email">
                        <i class="fas fa-envelope"></i>
                        Email đăng ký
                    </label>
                    <input type="email" id="email" name="email" required 
                           placeholder="Nhập email của bạn">
                    <div class="field-error" id="emailError"></div>
                </div>

                <button type="submit" class="btn btn-primary" id="submitBtn">
                    <i class="fas fa-paper-plane"></i>
                    Gửi liên kết đặt lại
                </button>
            </form>

            <div class="auth-footer">
                <div class="auth-link">
                    <span>Nhớ mật khẩu?</span>
                    <a href="signin.php" class="link">
                        <i class="fas fa-sign-in-alt"></i>
                        Quay lại đăng nhập
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script src="../public/js/forgot-password.js"></script>
</body>
</html>