<?php
require_once __DIR__ . '/../models/Database.php';
require_once __DIR__ . '/../models/User.php';
// PHPMailer will be required when needed by methods below
// Composer autoload is checked inside methods that send email to avoid breaking environments without composer

class AuthController {
    private $userModel;
    private $debugMode = true; 
    
    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->userModel = new User($db);
    }
    
    public function login($username, $password, $remember = false) {
        $res = $this->userModel->login($username, $password, $remember);
        if ($res === true) {
            $_SESSION['user_id'] = $this->userModel->id;
            $_SESSION['username'] = $this->userModel->username;
            $_SESSION['role'] = $this->userModel->role;
            $_SESSION['full_name'] = $this->userModel->full_name;
            return true;
        }
        return $res; 
    }
    
    public function checkRememberToken() {
        if (isset($_COOKIE['remember'])) {
            $token = $_COOKIE['remember'];
            if ($this->userModel->checkRememberToken($token)) {
                $_SESSION['user_id'] = $this->userModel->id;
                $_SESSION['username'] = $this->userModel->username;
                $_SESSION['role'] = $this->userModel->role;
                $_SESSION['full_name'] = $this->userModel->full_name;
                return true;
            }
        }
        return false;
    }
    
    public function register($fullName, $username, $email, $password, $class, $phone = null, $agreeTerms = false) {
        try {
            // Server-side validation: require agreement to terms
            if (!$agreeTerms) {
                throw new Exception('Bạn phải đồng ý với điều khoản sử dụng');
            }

            // Password complexity: at least 6 chars, one uppercase, one digit, one special char
            if (empty($password) || strlen($password) < 6) {
                throw new Exception('Mật khẩu phải có ít nhất 6 ký tự');
            }
            if (!preg_match('/[A-Z]/', $password)) {
                throw new Exception('Mật khẩu phải chứa ít nhất một chữ cái in hoa');
            }
            if (!preg_match('/[0-9]/', $password)) {
                throw new Exception('Mật khẩu phải chứa ít nhất một chữ số');
            }
            if (!preg_match('/[!@#$%^&*()_+\-=\[\]{};:\"\\|,.<>\/?~`]/', $password)) {
                throw new Exception('Mật khẩu phải chứa ít nhất một ký tự đặc biệt');
            }

            $userId = $this->userModel->register($username, $email, $password, $fullName, $class, $phone);
            if ($userId) {
                $code = $this->userModel->addVerification($userId);
                if ($code) {
                    // Tạo nội dung email
                    $subject = "Xác thực email - STEM Universe";
                    $verificationLink = $this->buildVerifyLink($email, $code);
                    $message = "Xin chào {$fullName},\n\n" .
                               "Cảm ơn bạn đã đăng ký. Vui lòng xác thực email bằng cách mở liên kết sau:\n" .
                               "{$verificationLink}\n\n" .
                               "Mã này có hiệu lực trong 60 phút.";

                    $configPath = __DIR__ . '/../config/mail.php';
                    if (!file_exists($configPath)) {
                        throw new Exception("Mail configuration file not found at: " . $configPath);
                    }
                    
                    $smtpConfig = require $configPath;
                    if (!is_array($smtpConfig)) {
                        throw new Exception("Invalid mail configuration format");
                    }

                    $required = ['host', 'username', 'password', 'port'];
                    foreach ($required as $field) {
                        if (empty($smtpConfig[$field])) {
                            throw new Exception("Missing required SMTP config: {$field}");
                        }
                    }

                    $vendorAutoload = __DIR__ . '/../vendor/autoload.php';
                    if (!file_exists($vendorAutoload)) {
                        throw new Exception("Composer autoload not found. Please run: composer require phpmailer/phpmailer");
                    }
                    
                    require_once $vendorAutoload;

                    if (!class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
                        throw new Exception("PHPMailer class not found. Please run: composer require phpmailer/phpmailer");
                    }

                    try {
                        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
                        
                        if ($this->debugMode) {
                            $mail->SMTPDebug = 2;
                            $mail->Debugoutput = function($str, $level) {
                                error_log("PHPMailer Debug [$level]: $str");
                            };
                        }

                        $mail->isSMTP();
                        $mail->Host = $smtpConfig['host'];
                        $mail->SMTPAuth = true;
                        $mail->Username = $smtpConfig['username'];
                        $mail->Password = $smtpConfig['password'];
                        $mail->Port = $smtpConfig['port'];
                        
                        if (!empty($smtpConfig['secure'])) {
                            $mail->SMTPSecure = $smtpConfig['secure'];
                        }

                        $mail->SMTPOptions = array(
                            'ssl' => array(
                                'verify_peer' => false,
                                'verify_peer_name' => false,
                                'allow_self_signed' => true
                            )
                        );

                        $mail->CharSet = 'UTF-8';
                        $mail->setFrom($smtpConfig['from_email'], $smtpConfig['from_name']);
                        $mail->addAddress($email, $fullName);
                        $mail->isHTML(false);
                        $mail->Subject = $subject;
                        $mail->Body = $message;

                        if (!$mail->send()) {
                            throw new Exception('Mailer Error: ' . $mail->ErrorInfo);
                        }

                        error_log("Verification email sent successfully to: " . $email);
                        return true;

                    } catch (\PHPMailer\PHPMailer\Exception $e) {
                        $errorMsg = "Mail sending failed: " . $e->getMessage();
                        if ($this->debugMode) {
                            $errorMsg .= "\nSMTP Debug: " . $mail->ErrorInfo;
                            $errorMsg .= "\nSMTP Config (host/port): " . $smtpConfig['host'] . ':' . $smtpConfig['port'];
                        }
                        error_log($errorMsg);
                        throw new Exception($errorMsg);
                    }
                }
                return true; 
            }
            return false;
        } catch (Exception $e) {
            error_log("Register error in AuthController: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            throw $e; 
        }
    }

    // -----------------------------
    // Forgot password related APIs
    // -----------------------------
    public function sendResetCode() {
        try {
            header('Content-Type: application/json');
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method');
            }

            $email = $_POST['email'] ?? '';
            if (empty($email)) {
                throw new Exception('Vui lòng nhập email');
            }

            $resetCode = $this->userModel->createResetCode($email);
            if (!$resetCode) {
                throw new Exception('Email không tồn tại trong hệ thống');
            }

            $configPath = __DIR__ . '/../config/mail.php';
            if (!file_exists($configPath)) {
                throw new Exception('Mail configuration file not found');
            }
            $smtpConfig = require $configPath;

            $vendorAutoload = __DIR__ . '/../vendor/autoload.php';
            if (!file_exists($vendorAutoload)) {
                throw new Exception('Composer autoload not found. Please run: composer require phpmailer/phpmailer');
            }
            require_once $vendorAutoload;

            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            if (defined('MAIL_DEBUG') && MAIL_DEBUG) {
                $mail->SMTPDebug = 0;
                $mail->Debugoutput = function($str, $level) {
                    error_log("PHPMailer Debug [$level]: $str");
                };
            }

            $mail->isSMTP();
            $mail->Host = $smtpConfig['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $smtpConfig['username'];
            $mail->Password = $smtpConfig['password'];
            $mail->Port = $smtpConfig['port'];
            if (!empty($smtpConfig['secure'])) {
                $mail->SMTPSecure = $smtpConfig['secure'];
            }
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->CharSet = 'UTF-8';
            $mail->setFrom($smtpConfig['from_email'] ?? $smtpConfig['username'], $smtpConfig['from_name'] ?? 'STEM Universe');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = 'Mã xác nhận đặt lại mật khẩu - STEM Universe';
            $mail->Body = "<h2>Yêu cầu đặt lại mật khẩu</h2>\n<p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản STEM Universe.</p>\n<p>Mã xác nhận của bạn là: <strong style='font-size:24px;color:#4c6ef5;'>{$resetCode}</strong></p>\n<p>Mã này sẽ hết hạn sau 15 phút.</p>";

            $mail->send();

            return json_encode([
                'success' => true,
                'message' => 'Mã xác nhận đã được gửi đến email của bạn'
            ]);

        } catch (Exception $e) {
            return json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function verifyResetCode() {
        try {
            header('Content-Type: application/json');
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method');
            }

            $email = $_POST['email'] ?? '';
            $code = $_POST['code'] ?? '';
            if (empty($email) || empty($code)) {
                throw new Exception('Vui lòng nhập đầy đủ thông tin');
            }

            if (!$this->userModel->verifyResetCode($email, $code)) {
                throw new Exception('Mã xác nhận không đúng hoặc đã hết hạn');
            }

            return json_encode([
                'success' => true,
                'message' => 'Mã xác nhận hợp lệ'
            ]);
        } catch (Exception $e) {
            return json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function resetPassword() {
        try {
            header('Content-Type: application/json');
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('Invalid request method');
            }

            $email = $_POST['email'] ?? '';
            $code = $_POST['code'] ?? '';
            $password = $_POST['password'] ?? '';
            if (empty($email) || empty($code) || empty($password)) {
                throw new Exception('Vui lòng nhập đầy đủ thông tin');
            }
            if (strlen($password) < 6) {
                throw new Exception('Mật khẩu phải có ít nhất 6 ký tự');
            }

            if ($this->userModel->resetPassword($email, $code, $password)) {
                return json_encode([
                    'success' => true,
                    'message' => 'Đặt lại mật khẩu thành công'
                ]);
            }

            throw new Exception('Không thể đặt lại mật khẩu. Vui lòng thử lại');

        } catch (Exception $e) {
            return json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    private function buildVerifyLink($email, $code) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $basePath = "/SPNC_HocLieu_STEM_TieuHoc"; 
        $link = "{$protocol}://{$host}{$basePath}/verify.php?email=" . urlencode($email) . "&code=" . urlencode($code);
        return $link;
    }
}