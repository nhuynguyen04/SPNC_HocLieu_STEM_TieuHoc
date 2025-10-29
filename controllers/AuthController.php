<?php
require_once __DIR__ . '/../models/Database.php';
require_once __DIR__ . '/../models/User.php';

class AuthController {
    private $userModel;
    private $debugMode = true; // Set to false in production
    
    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->userModel = new User($db);
    }
    
    public function login($username, $password, $remember = false) {
        $res = $this->userModel->login($username, $password, $remember);
        // userModel->login trả về true, false, hoặc string 'not_verified'
        if ($res === true) {
            $_SESSION['user_id'] = $this->userModel->id;
            $_SESSION['username'] = $this->userModel->username;
            $_SESSION['role'] = $this->userModel->role;
            $_SESSION['full_name'] = $this->userModel->full_name;
            return true;
        }
        return $res; // false hoặc 'not_verified'
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
    
    public function register($fullName, $username, $email, $password, $class) {
        try {
            // Gọi method register trả về user id nếu thành công
            $userId = $this->userModel->register($username, $email, $password, $fullName, $class);
            if ($userId) {
                // Tạo mã xác thực và lưu vào DB
                $code = $this->userModel->addVerification($userId);
                if ($code) {
                    // Tạo nội dung email
                    $subject = "Xác thực email - STEM Universe";
                    $verificationLink = $this->buildVerifyLink($email, $code);
                    $message = "Xin chào {$fullName},\n\n" .
                               "Cảm ơn bạn đã đăng ký. Vui lòng xác thực email bằng cách mở liên kết sau:\n" .
                               "{$verificationLink}\n\n" .
                               "Mã này có hiệu lực trong 60 phút.";

                    // Đọc cấu hình SMTP từ config/mail.php
                    $configPath = __DIR__ . '/../config/mail.php';
                    if (!file_exists($configPath)) {
                        throw new Exception("Mail configuration file not found at: " . $configPath);
                    }
                    
                    $smtpConfig = require $configPath;
                    if (!is_array($smtpConfig)) {
                        throw new Exception("Invalid mail configuration format");
                    }

                    // Check required SMTP config
                    $required = ['host', 'username', 'password', 'port'];
                    foreach ($required as $field) {
                        if (empty($smtpConfig[$field])) {
                            throw new Exception("Missing required SMTP config: {$field}");
                        }
                    }

                    // Kiểm tra Composer autoload và PHPMailer
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
                        
                        // Debug mode - remove in production
                        if ($this->debugMode) {
                            $mail->SMTPDebug = 2;
                            $mail->Debugoutput = function($str, $level) {
                                error_log("PHPMailer Debug [$level]: $str");
                            };
                        }

                        // Cấu hình SMTP
                        $mail->isSMTP();
                        $mail->Host = $smtpConfig['host'];
                        $mail->SMTPAuth = true;
                        $mail->Username = $smtpConfig['username'];
                        $mail->Password = $smtpConfig['password'];
                        $mail->Port = $smtpConfig['port'];
                        
                        if (!empty($smtpConfig['secure'])) {
                            $mail->SMTPSecure = $smtpConfig['secure'];
                        }

                        // Fix SSL/TLS issues with Gmail
                        $mail->SMTPOptions = array(
                            'ssl' => array(
                                'verify_peer' => false,
                                'verify_peer_name' => false,
                                'allow_self_signed' => true
                            )
                        );

                        // Cấu hình email
                        $mail->CharSet = 'UTF-8';
                        $mail->setFrom($smtpConfig['from_email'], $smtpConfig['from_name']);
                        $mail->addAddress($email, $fullName);
                        $mail->isHTML(false);
                        $mail->Subject = $subject;
                        $mail->Body = $message;

                        // Gửi email và kiểm tra
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
                return true; // User registered but email might have failed
            }
            return false;
        } catch (Exception $e) {
            error_log("Register error in AuthController: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            throw $e; // Re-throw to be handled by signup.php
        }
    }

    private function buildVerifyLink($email, $code) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $basePath = "/SPNC_HocLieu_STEM_TieuHoc"; // Thay đổi này nếu đường dẫn cơ sở khác
        $link = "{$protocol}://{$host}{$basePath}/verify.php?email=" . urlencode($email) . "&code=" . urlencode($code);
        return $link;
    }
}