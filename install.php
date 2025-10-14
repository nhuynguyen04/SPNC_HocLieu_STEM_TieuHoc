<?php
// install.php - Trang cài đặt tự động hệ thống STEM Tiểu Học

// Tắt hiển thị lỗi để tránh làm hỏng giao diện
error_reporting(0);
ini_set('display_errors', 0);

require_once 'model/Database.php';

$database = new Database();
$message = '';
$isInstalled = false;

// Kiểm tra xem hệ thống đã được cài đặt chưa
try {
    $conn = $database->getConnection();
    if ($conn && $database->isInstalled()) {
        $isInstalled = true;
        $message = '<div class="alert info">
            <h3>✅ Hệ thống đã được cài đặt</h3>
            <p>Bạn có thể:</p>
            <ul>
                <li><a href="index.php">🏠 Truy cập trang chủ</a></li>
                <li><a href="signin.php">🔐 Đăng nhập vào hệ thống</a></li>
                <li><a href="admin/">⚙️ Truy cập trang quản trị</a></li>
            </ul>
        </div>';
    }
} catch (Exception $e) {
    // Database chưa tồn tại, có thể tiếp tục cài đặt
}

// Xử lý form cài đặt
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['install'])) {
        try {
            if ($database->initializeDatabase()) {
                $message = '<div class="alert success">
                    <h3>🎉 Cài đặt thành công!</h3>
                    <p><strong>Thông tin đăng nhập mặc định:</strong></p>
                    <ul>
                        <li>👤 Username: <strong>admin</strong></li>
                        <li>🔑 Password: <strong>password</strong></li>
                        <li>📧 Email: admin@stemkids.vn</li>
                    </p>
                    <div class="actions">
                        <a href="signin.php" class="btn btn-primary">🔐 Đăng nhập ngay</a>
                        <a href="index.php" class="btn btn-secondary">🏠 Về trang chủ</a>
                    </div>
                    <div class="warning">
                        ⚠️ <strong>Quan trọng:</strong> Hãy xóa file <code>install.php</code> sau khi cài đặt để bảo mật!
                    </div>
                </div>';
                $isInstalled = true;
            } else {
                throw new Exception("Không thể khởi tạo database");
            }
        } catch (Exception $e) {
            $message = '<div class="alert error">
                <h3>❌ Lỗi cài đặt</h3>
                <p>' . $e->getMessage() . '</p>
                <p>Vui lòng kiểm tra:</p>
                <ul>
                    <li>Thông tin kết nối database trong <code>model/Database.php</code></li>
                    <li>MySQL server đang chạy</li>
                    <li>Quyền truy cập database</li>
                </ul>
            </div>';
        }
    }
    
    // Xử lý tạo lại database (reset)
    if (isset($_POST['reset'])) {
        try {
            $conn = $database->getConnection();
            $conn->exec("DROP DATABASE IF EXISTS stem_tieu_hoc");
            $message = '<div class="alert info">
                <h3>🗑️ Đã xóa database</h3>
                <p>Database đã được xóa. Bạn có thể cài đặt lại hệ thống.</p>
            </div>';
            $isInstalled = false;
        } catch (Exception $e) {
            $message = '<div class="alert error">Lỗi khi xóa database: ' . $e->getMessage() . '</div>';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cài đặt Hệ thống STEM Tiểu Học</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #4a6fa5 0%, #3a5a8a 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .alert {
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            border-left: 5px solid;
        }
        
        .alert.success {
            background: #d4edda;
            color: #155724;
            border-color: #c3e6cb;
        }
        
        .alert.error {
            background: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
        }
        
        .alert.info {
            background: #d1ecf1;
            color: #0c5460;
            border-color: #bee5eb;
        }
        
        .alert h3 {
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .alert ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .alert .actions {
            margin: 20px 0 10px 0;
        }
        
        .alert .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 10px;
            border-radius: 5px;
            margin-top: 15px;
            font-size: 0.9rem;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        
        .btn-primary {
            background: #4a6fa5;
            color: white;
        }
        
        .btn-primary:hover {
            background: #3a5a8a;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #545b62;
        }
        
        .btn-danger {
            background: #dc3545;
            color: white;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .install-info, .config-info {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
        }
        
        .install-info h3, .config-info h3 {
            color: #4a6fa5;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .feature-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        pre {
            background: #2d3748;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.9rem;
        }
        
        .danger-zone {
            border: 2px solid #dc3545;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            background: #f8f9fa;
        }
        
        .danger-zone h3 {
            color: #dc3545;
            margin-bottom: 15px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 STEM Tiểu Học</h1>
            <p>Hệ thống học liệu điện tử môn STEM cho học sinh tiểu học</p>
        </div>
        
        <div class="content">
            <?php echo $message; ?>
            
            <?php if (!$isInstalled): ?>
            <div class="install-info">
                <h3>📋 Thông tin cài đặt</h3>
                <p>Hệ thống sẽ tự động tạo:</p>
                
                <div class="features">
                    <div class="feature-item">
                        <div class="feature-icon">🗃️</div>
                        <strong>Database</strong>
                        <p>stem_tieu_hoc</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">📊</div>
                        <strong>7 Bảng dữ liệu</strong>
                        <p>users, adventures, rewards...</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">👥</div>
                        <strong>Tài khoản mẫu</strong>
                        <p>Admin & dữ liệu demo</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">🎮</div>
                        <strong>4 Lĩnh vực STEM</strong>
                        <p>Khoa học, Công nghệ, Kỹ thuật, Toán học</p>
                    </div>
                </div>
                
                <form method="POST">
                    <button type="submit" name="install" class="btn btn-primary">
                        🚀 Bắt đầu cài đặt
                    </button>
                </form>
            </div>
            <?php endif; ?>
            
            <div class="config-info">
                <h3>⚙️ Cấu hình database</h3>
                <p>File cấu hình: <code>model/Database.php</code></p>
                <pre>
// Cấu hình mặc định
private $host = "localhost";
private $db_name = "stem_tieu_hoc";
private $username = "root";
private $password = "";</pre>
                <p><small>💡 Chỉnh sửa file này nếu bạn có cấu hình database khác</small></p>
            </div>
            
            <?php if ($isInstalled): ?>
            <div class="danger-zone">
                <h3>⚠️ Khu vực nguy hiểm</h3>
                <p>Thao tác này sẽ <strong>xóa toàn bộ database</strong> và bạn sẽ mất mọi dữ liệu!</p>
                <form method="POST" onsubmit="return confirm('⚠️ Bạn có CHẮC CHẮN muốn xóa toàn bộ database? This action cannot be undone!');">
                    <button type="submit" name="reset" class="btn btn-danger">
                        🗑️ Xóa database và cài đặt lại
                    </button>
                </form>
            </div>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>