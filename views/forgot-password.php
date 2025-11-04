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
                <p class="auth-subtitle" id="stepSubtitle">
                    Nhập email của bạn để nhận mã xác nhận
                </p>
            </div>

            <div class="alert alert-info" id="infoAlert" style="display: none;">
                <i class="fas fa-info-circle"></i>
                <p id="infoMessage">Vui lòng kiểm tra email để lấy mã xác nhận</p>
            </div>

            <div class="alert alert-error" id="errorAlert" style="display: none;">
                <i class="fas fa-exclamation-triangle"></i>
                <p id="errorMessage"></p>
            </div>

            <div class="alert alert-success" id="successAlert" style="display: none;">
                <i class="fas fa-check-circle"></i>
                <p id="successMessage"></p>
            </div>

            <!-- Step 1: Enter Email -->
            <form class="form" id="emailForm" style="display: block;">
                <div class="form-group">
                    <label for="email">
                        <i class="fas fa-envelope"></i>
                        Email đăng ký
                    </label>
                    <input type="email" id="email" name="email" required 
                           placeholder="Nhập email của bạn">
                    <div class="field-error" id="emailError"></div>
                </div>

                <button type="submit" class="btn btn-primary" id="sendCodeBtn">
                    <i class="fas fa-paper-plane"></i>
                    Gửi mã xác nhận
                </button>
            </form>

            <!-- Step 2: Enter Verification Code -->
            <form class="form" id="codeForm" style="display: none;">
                <div class="form-group">
                    <label for="verificationCode">
                        <i class="fas fa-shield-alt"></i>
                        Mã xác nhận (6 số)
                    </label>
                    <div class="code-inputs-container">
                        <input type="text" class="code-input" maxlength="1" data-index="0" autocomplete="off">
                        <input type="text" class="code-input" maxlength="1" data-index="1" autocomplete="off">
                        <input type="text" class="code-input" maxlength="1" data-index="2" autocomplete="off">
                        <input type="text" class="code-input" maxlength="1" data-index="3" autocomplete="off">
                        <input type="text" class="code-input" maxlength="1" data-index="4" autocomplete="off">
                        <input type="text" class="code-input" maxlength="1" data-index="5" autocomplete="off">
                    </div>
                    <input type="hidden" id="verificationCode" name="verificationCode">
                    <div class="field-error" id="codeError"></div>
                </div>

                <div class="code-info">
                    <p>Mã xác nhận đã được gửi đến: <span id="userEmail"></span></p>
                    <button type="button" class="resend-btn" id="resendCodeBtn">
                        Gửi lại mã
                    </button>
                    <div class="countdown" id="countdown" style="display: none;">
                        Gửi lại sau <span class="countdown-number">60</span>s
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" id="verifyCodeBtn">
                    <i class="fas fa-check"></i>
                    Xác nhận mã
                </button>
            </form>

            <!-- Step 3: Reset Password -->
            <form class="form" id="resetForm" style="display: none;">
                <div class="form-group">
                    <label for="newPassword">
                        <i class="fas fa-lock"></i>
                        Mật khẩu mới
                    </label>
                    <div class="password-input-container">
                        <input type="password" id="newPassword" name="newPassword" required 
                               placeholder="Nhập mật khẩu mới">
                        <button type="button" class="toggle-password" data-target="newPassword">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="field-error" id="passwordError"></div>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">
                        <i class="fas fa-lock"></i>
                        Xác nhận mật khẩu
                    </label>
                    <div class="password-input-container">
                        <input type="password" id="confirmPassword" name="confirmPassword" required 
                               placeholder="Nhập lại mật khẩu mới">
                        <button type="button" class="toggle-password" data-target="confirmPassword">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="field-error" id="confirmPasswordError"></div>
                </div>

                <button type="submit" class="btn btn-primary" id="resetPasswordBtn">
                    <i class="fas fa-sync-alt"></i>
                    Đặt lại mật khẩu
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

<script>
    // Set app base path for JS (e.g. '/SPNC_HocLieu_STEM_TieuHoc')
    var APP_BASE = '<?php echo rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), "\\/"); ?>';
    // Ensure root slash
    if (!APP_BASE || APP_BASE === '.') APP_BASE = '';
</script>