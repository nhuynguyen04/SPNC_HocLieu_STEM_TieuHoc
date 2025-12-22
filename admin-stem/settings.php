<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Cài đặt Hệ thống STEM</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/settings.css?v=<?php echo time(); ?>">
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
                    <li class="nav-item">
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
                    <li class="active">
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
            <div class="header">
                <div class="header-title">
                    <h1>Cài đặt Hệ thống</h1>
                    <p>Quản lý cấu hình và tùy chỉnh hệ thống STEM Tiểu học</p>
                </div>
                <div class="header-actions">
                    <button class="btn-secondary" id="saveAllBtn">
                        <i class="fas fa-save"></i>
                        Lưu tất cả thay đổi
                    </button>
                    <button class="btn-primary" id="systemCheckBtn">
                        <i class="fas fa-check-circle"></i>
                        Kiểm tra hệ thống
                    </button>
                </div>
            </div>

            <div class="settings-nav">
                <button class="settings-tab active" data-tab="general">
                    <i class="fas fa-cogs"></i>
                    <span>Cài đặt chung</span>
                </button>
                <button class="settings-tab" data-tab="security">
                    <i class="fas fa-shield-alt"></i>
                    <span>Bảo mật</span>
                </button>
                <button class="settings-tab" data-tab="notifications">
                    <i class="fas fa-bell"></i>
                    <span>Thông báo</span>
                </button>
                <button class="settings-tab" data-tab="appearance">
                    <i class="fas fa-palette"></i>
                    <span>Giao diện</span>
                </button>
                <button class="settings-tab" data-tab="integrations">
                    <i class="fas fa-plug"></i>
                    <span>Tích hợp</span>
                </button>
                <button class="settings-tab" data-tab="backup">
                    <i class="fas fa-database"></i>
                    <span>Sao lưu</span>
                </button>
                <button class="settings-tab" data-tab="advanced">
                    <i class="fas fa-tools"></i>
                    <span>Nâng cao</span>
                </button>
            </div>

            <div class="settings-content">
                <div class="settings-tab-content active" id="general-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-info-circle"></i>
                            Thông tin hệ thống
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="systemName">Tên hệ thống</label>
                                <input type="text" id="systemName" value="Hệ thống STEM Tiểu học" placeholder="Nhập tên hệ thống">
                                <p class="setting-description">Tên hiển thị trên giao diện người dùng</p>
                            </div>
                            <div class="setting-item">
                                <label for="systemUrl">URL hệ thống</label>
                                <input type="url" id="systemUrl" value="https://stem-tieuhoc.edu.vn" placeholder="https://example.com">
                                <p class="setting-description">Địa chỉ truy cập hệ thống</p>
                            </div>
                            <div class="setting-item">
                                <label for="adminEmail">Email quản trị</label>
                                <input type="email" id="adminEmail" value="admin@stem-tieuhoc.edu.vn" placeholder="admin@example.com">
                                <p class="setting-description">Email nhận thông báo hệ thống</p>
                            </div>
                            <div class="setting-item">
                                <label for="timezone">Múi giờ</label>
                                <select id="timezone">
                                    <option value="Asia/Ho_Chi_Minh" selected>Asia/Ho_Chi_Minh (GMT+7)</option>
                                    <option value="UTC">UTC</option>
                                    <option value="America/New_York">America/New_York (GMT-5)</option>
                                    <option value="Europe/London">Europe/London (GMT+0)</option>
                                </select>
                                <p class="setting-description">Múi giờ sử dụng cho hệ thống</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-language"></i>
                            Ngôn ngữ & Vùng miền
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="language">Ngôn ngữ mặc định</label>
                                <select id="language">
                                    <option value="vi" selected>Tiếng Việt</option>
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="es">Español</option>
                                </select>
                                <p class="setting-description">Ngôn ngữ hiển thị mặc định</p>
                            </div>
                            <div class="setting-item">
                                <label for="dateFormat">Định dạng ngày tháng</label>
                                <select id="dateFormat">
                                    <option value="dd/mm/yyyy" selected>DD/MM/YYYY</option>
                                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                                </select>
                                <p class="setting-description">Định dạng ngày tháng hiển thị</p>
                            </div>
                            <div class="setting-item">
                                <label for="currency">Đơn vị tiền tệ</label>
                                <select id="currency">
                                    <option value="VND" selected>VND (₫)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                                <p class="setting-description">Đơn vị tiền tệ sử dụng</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-user-cog"></i>
                            Cài đặt người dùng
                        </h3>
                        <div class="settings-options">
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Cho phép đăng ký mới</h4>
                                    <p>Cho phép người dùng tự đăng ký tài khoản mới</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="allowRegistration" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Yêu cầu xác minh email</h4>
                                    <p>Yêu cầu người dùng xác minh email sau khi đăng ký</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="emailVerification" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Giới hạn đăng nhập sai</h4>
                                    <p>Khóa tạm thời tài khoản sau 5 lần đăng nhập sai</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="loginLimit" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Cho phép đăng nhập đa thiết bị</h4>
                                    <p>Người dùng có thể đăng nhập trên nhiều thiết bị cùng lúc</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="multiDeviceLogin">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="security-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-lock"></i>
                            Xác thực & Bảo mật
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="passwordPolicy">Chính sách mật khẩu</label>
                                <select id="passwordPolicy">
                                    <option value="basic">Cơ bản (6 ký tự)</option>
                                    <option value="medium" selected>Trung bình (8 ký tự, chữ và số)</option>
                                    <option value="strong">Mạnh (10 ký tự, chữ, số, ký tự đặc biệt)</option>
                                </select>
                                <p class="setting-description">Yêu cầu độ mạnh mật khẩu</p>
                            </div>
                            <div class="setting-item">
                                <label for="sessionTimeout">Thời gian hết phiên (phút)</label>
                                <input type="number" id="sessionTimeout" value="30" min="5" max="480">
                                <p class="setting-description">Thời gian không hoạt động trước khi tự động đăng xuất</p>
                            </div>
                            <div class="setting-item">
                                <label for="twoFactorAuth">Xác thực hai yếu tố</label>
                                <select id="twoFactorAuth">
                                    <option value="disabled">Tắt</option>
                                    <option value="optional" selected>Tùy chọn</option>
                                    <option value="required">Bắt buộc cho quản trị viên</option>
                                    <option value="all">Bắt buộc cho tất cả</option>
                                </select>
                                <p class="setting-description">Bảo mật đăng nhập với 2FA</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-shield-check"></i>
                            Bảo vệ hệ thống
                        </h3>
                        <div class="settings-options">
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Bảo vệ DDoS</h4>
                                    <p>Tự động phát hiện và chặn tấn công DDoS</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="ddosProtection" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Chống brute force</h4>
                                    <p>Giới hạn số lần thử đăng nhập từ một địa chỉ IP</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="bruteForceProtection" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Bảo vệ SQL Injection</h4>
                                    <p>Tự động lọc và kiểm tra các truy vấn SQL</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="sqlInjectionProtection" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Bảo vệ XSS</h4>
                                    <p>Ngăn chặn tấn công Cross-Site Scripting</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="xssProtection" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-key"></i>
                            Chứng chỉ SSL
                        </h3>
                        <div class="ssl-status">
                            <div class="ssl-info">
                                <div class="ssl-icon">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="ssl-details">
                                    <h4>Chứng chỉ SSL đang hoạt động</h4>
                                    <p>Hết hạn: 20/06/2024 • Nhà cung cấp: Let's Encrypt</p>
                                </div>
                            </div>
                            <button class="btn-secondary" id="renewSSLBtn">
                                <i class="fas fa-sync-alt"></i>
                                Gia hạn SSL
                            </button>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="notifications-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-envelope"></i>
                            Cài đặt Email
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="smtpHost">SMTP Host</label>
                                <input type="text" id="smtpHost" value="smtp.gmail.com" placeholder="smtp.example.com">
                            </div>
                            <div class="setting-item">
                                <label for="smtpPort">SMTP Port</label>
                                <input type="number" id="smtpPort" value="587" placeholder="587">
                            </div>
                            <div class="setting-item">
                                <label for="smtpUsername">SMTP Username</label>
                                <input type="text" id="smtpUsername" value="noreply@stem-tieuhoc.edu.vn">
                            </div>
                            <div class="setting-item">
                                <label for="smtpPassword">SMTP Password</label>
                                <div class="password-input">
                                    <input type="password" id="smtpPassword" value="********">
                                    <button type="button" class="toggle-password">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="setting-item">
                                <label for="smtpEncryption">Mã hóa</label>
                                <select id="smtpEncryption">
                                    <option value="tls" selected>TLS</option>
                                    <option value="ssl">SSL</option>
                                    <option value="none">Không mã hóa</option>
                                </select>
                            </div>
                            <div class="setting-item">
                                <button class="btn-secondary" id="testEmailBtn">
                                    <i class="fas fa-paper-plane"></i>
                                    Kiểm tra email
                                </button>
                                <p class="setting-description">Gửi email kiểm tra đến địa chỉ quản trị</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-bell"></i>
                            Loại thông báo
                        </h3>
                        <div class="settings-options">
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Thông báo hệ thống</h4>
                                    <p>Thông báo về bảo trì, cập nhật, lỗi hệ thống</p>
                                </div>
                                <div class="notification-channels">
                                    <label class="channel-checkbox">
                                        <input type="checkbox" checked>
                                        <span>Email</span>
                                    </label>
                                    <label class="channel-checkbox">
                                        <input type="checkbox">
                                        <span>Trong hệ thống</span>
                                    </label>
                                </div>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Thông báo người dùng</h4>
                                    <p>Thông báo về đăng ký, đăng nhập, hoạt động người dùng</p>
                                </div>
                                <div class="notification-channels">
                                    <label class="channel-checkbox">
                                        <input type="checkbox" checked>
                                        <span>Email</span>
                                    </label>
                                    <label class="channel-checkbox">
                                        <input type="checkbox" checked>
                                        <span>Trong hệ thống</span>
                                    </label>
                                </div>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Thông báo học liệu</h4>
                                    <p>Thông báo về học liệu mới, báo cáo lỗi học liệu</p>
                                </div>
                                <div class="notification-channels">
                                    <label class="channel-checkbox">
                                        <input type="checkbox" checked>
                                        <span>Email</span>
                                    </label>
                                    <label class="channel-checkbox">
                                        <input type="checkbox">
                                        <span>Trong hệ thống</span>
                                    </label>
                                </div>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Thông báo báo cáo</h4>
                                    <p>Thông báo báo cáo định kỳ, báo cáo đặc biệt</p>
                                </div>
                                <div class="notification-channels">
                                    <label class="channel-checkbox">
                                        <input type="checkbox" checked>
                                        <span>Email</span>
                                    </label>
                                    <label class="channel-checkbox">
                                        <input type="checkbox">
                                        <span>Trong hệ thống</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="appearance-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-paint-brush"></i>
                            Tùy chỉnh giao diện
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="themeColor">Màu chủ đạo</label>
                                <div class="color-picker">
                                    <input type="color" id="themeColor" value="#4361ee">
                                    <span id="colorValue">#4361ee</span>
                                </div>
                                <p class="setting-description">Màu sắc chính của giao diện</p>
                            </div>
                            <div class="setting-item">
                                <label for="themeMode">Chế độ giao diện</label>
                                <select id="themeMode">
                                    <option value="light" selected>Sáng</option>
                                    <option value="dark">Tối</option>
                                    <option value="auto">Tự động</option>
                                </select>
                                <p class="setting-description">Chế độ sáng/tối của giao diện</p>
                            </div>
                            <div class="setting-item">
                                <label for="fontFamily">Phông chữ</label>
                                <select id="fontFamily">
                                    <option value="Quicksand" selected>Quicksand</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="Inter">Inter</option>
                                </select>
                                <p class="setting-description">Phông chữ sử dụng trong hệ thống</p>
                            </div>
                            <div class="setting-item">
                                <label for="logoUpload">Logo hệ thống</label>
                                <div class="file-upload">
                                    <input type="file" id="logoUpload" accept="image/*">
                                    <label for="logoUpload" class="upload-label">
                                        <i class="fas fa-upload"></i>
                                        Tải lên logo
                                    </label>
                                </div>
                                <p class="setting-description">Định dạng: PNG, JPG, SVG • Tối đa: 2MB</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-desktop"></i>
                            Giao diện quản trị
                        </h3>
                        <div class="preview-section">
                            <div class="preview-header">
                                <h4>Xem trước giao diện</h4>
                                <button class="btn-secondary" id="resetAppearanceBtn">
                                    <i class="fas fa-undo"></i>
                                    Đặt lại mặc định
                                </button>
                            </div>
                            <div class="preview-content" id="themePreview">
                                <div class="preview-sidebar" style="background: #1e293b;">
                                    <div class="preview-logo">STEM</div>
                                    <div class="preview-menu">
                                        <div class="preview-menu-item active">Tổng quan</div>
                                        <div class="preview-menu-item">Học liệu</div>
                                        <div class="preview-menu-item">Người dùng</div>
                                    </div>
                                </div>
                                <div class="preview-main">
                                    <div class="preview-header" style="background: #ffffff;">
                                        <h4>Bảng điều khiển</h4>
                                    </div>
                                    <div class="preview-cards">
                                        <div class="preview-card" style="background: #4361ee; color: white;">
                                            <h5>Người dùng</h5>
                                            <p>1,247</p>
                                        </div>
                                        <div class="preview-card" style="background: #06d6a0; color: white;">
                                            <h5>Học liệu</h5>
                                            <p>148</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="integrations-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-plug"></i>
                            API & Webhooks
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="apiStatus">Trạng thái API</label>
                                <select id="apiStatus">
                                    <option value="enabled" selected>Bật</option>
                                    <option value="disabled">Tắt</option>
                                    <option value="restricted">Hạn chế</option>
                                </select>
                                <p class="setting-description">Cho phép truy cập API từ bên ngoài</p>
                            </div>
                            <div class="setting-item">
                                <label for="apiKey">API Key</label>
                                <div class="api-key-display">
                                    <input type="text" id="apiKey" value="sk_live_xxxxxxxxxxxxxxxx" readonly>
                                    <button type="button" class="btn-icon copy-btn" title="Sao chép">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                    <button type="button" class="btn-icon regenerate-btn" title="Tạo mới">
                                        <i class="fas fa-redo"></i>
                                    </button>
                                </div>
                                <p class="setting-description">Khóa API để tích hợp với hệ thống khác</p>
                            </div>
                            <div class="setting-item">
                                <label for="webhookUrl">Webhook URL</label>
                                <input type="url" id="webhookUrl" placeholder="https://example.com/webhook">
                                <p class="setting-description">URL nhận webhook từ hệ thống</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-handshake"></i>
                            Dịch vụ bên thứ ba
                        </h3>
                        <div class="integration-list">
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-icon" style="background: #4285F4;">
                                        <i class="fab fa-google"></i>
                                    </div>
                                    <div>
                                        <h4>Google Analytics</h4>
                                        <p>Theo dõi và phân tích lưu lượng truy cập</p>
                                    </div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-icon" style="background: #7289DA;">
                                        <i class="fab fa-discord"></i>
                                    </div>
                                    <div>
                                        <h4>Discord Webhook</h4>
                                        <p>Gửi thông báo đến kênh Discord</p>
                                    </div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-icon" style="background: #FF0000;">
                                        <i class="fab fa-youtube"></i>
                                    </div>
                                    <div>
                                        <h4>YouTube API</h4>
                                        <p>Tích hợp video học tập từ YouTube</p>
                                    </div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="integration-item">
                                <div class="integration-info">
                                    <div class="integration-icon" style="background: #333333;">
                                        <i class="fab fa-github"></i>
                                    </div>
                                    <div>
                                        <h4>GitHub</h4>
                                        <p>Quản lý mã nguồn và version control</p>
                                    </div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="backup-settings">
                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-database"></i>
                            Sao lưu tự động
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="backupFrequency">Tần suất sao lưu</label>
                                <select id="backupFrequency">
                                    <option value="daily">Hàng ngày</option>
                                    <option value="weekly" selected>Hàng tuần</option>
                                    <option value="monthly">Hàng tháng</option>
                                </select>
                                <p class="setting-description">Tần suất thực hiện sao lưu tự động</p>
                            </div>
                            <div class="setting-item">
                                <label for="backupTime">Thời gian sao lưu</label>
                                <input type="time" id="backupTime" value="02:00">
                                <p class="setting-description">Thời gian thực hiện sao lưu (giờ địa phương)</p>
                            </div>
                            <div class="setting-item">
                                <label for="backupRetention">Giữ lại bản sao lưu</label>
                                <select id="backupRetention">
                                    <option value="7">7 ngày</option>
                                    <option value="30" selected>30 ngày</option>
                                    <option value="90">90 ngày</option>
                                    <option value="365">1 năm</option>
                                </select>
                                <p class="setting-description">Số ngày giữ lại bản sao lưu cũ</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-cloud-upload-alt"></i>
                            Lưu trữ đám mây
                        </h3>
                        <div class="settings-options">
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Google Drive</h4>
                                    <p>Sao lưu tự động lên Google Drive</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Amazon S3</h4>
                                    <p>Sao lưu lên Amazon S3 bucket</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="setting-option">
                                <div class="option-content">
                                    <h4>Local Storage</h4>
                                    <p>Lưu trữ sao lưu trên máy chủ</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-history"></i>
                            Sao lưu thủ công
                        </h3>
                        <div class="backup-actions">
                            <button class="btn-primary" id="createBackupBtn">
                                <i class="fas fa-plus"></i>
                                Tạo bản sao lưu ngay
                            </button>
                            <button class="btn-secondary" id="restoreBackupBtn">
                                <i class="fas fa-undo"></i>
                                Khôi phục từ bản sao lưu
                            </button>
                            <button class="btn-secondary" id="downloadBackupBtn">
                                <i class="fas fa-download"></i>
                                Tải xuống bản sao lưu
                            </button>
                        </div>
                        <div class="backup-list">
                            <h4>Bản sao lưu gần đây</h4>
                            <div class="backup-items">
                                <div class="backup-item">
                                    <div class="backup-info">
                                        <i class="fas fa-database"></i>
                                        <div>
                                            <h5>Backup_20240320_0200.zip</h5>
                                            <p>20/03/2024 02:00 • 245 MB</p>
                                        </div>
                                    </div>
                                    <div class="backup-actions">
                                        <button class="btn-icon" title="Khôi phục">
                                            <i class="fas fa-undo"></i>
                                        </button>
                                        <button class="btn-icon" title="Tải xuống">
                                            <i class="fas fa-download"></i>
                                        </button>
                                        <button class="btn-icon delete" title="Xóa">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="backup-item">
                                    <div class="backup-info">
                                        <i class="fas fa-database"></i>
                                        <div>
                                            <h5>Backup_20240313_0200.zip</h5>
                                            <p>13/03/2024 02:00 • 238 MB</p>
                                        </div>
                                    </div>
                                    <div class="backup-actions">
                                        <button class="btn-icon" title="Khôi phục">
                                            <i class="fas fa-undo"></i>
                                        </button>
                                        <button class="btn-icon" title="Tải xuống">
                                            <i class="fas fa-download"></i>
                                        </button>
                                        <button class="btn-icon delete" title="Xóa">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-tab-content" id="advanced-settings">
                    <div class="warning-banner">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>
                            <h4>Cảnh báo: Cài đặt nâng cao</h4>
                            <p>Chỉ thay đổi các cài đặt này nếu bạn hiểu rõ về hệ thống. Sai sót có thể làm hỏng hệ thống.</p>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-server"></i>
                            Cấu hình máy chủ
                        </h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="cacheEnabled">Bật cache</label>
                                <select id="cacheEnabled">
                                    <option value="enabled" selected>Bật</option>
                                    <option value="disabled">Tắt</option>
                                </select>
                                <p class="setting-description">Cache để tăng tốc độ tải trang</p>
                            </div>
                            <div class="setting-item">
                                <label for="cacheDuration">Thời gian cache (giây)</label>
                                <input type="number" id="cacheDuration" value="3600" min="60" max="86400">
                                <p class="setting-description">Thời gian lưu cache trước khi làm mới</p>
                            </div>
                            <div class="setting-item">
                                <label for="debugMode">Chế độ debug</label>
                                <select id="debugMode">
                                    <option value="disabled" selected>Tắt</option>
                                    <option value="enabled">Bật</option>
                                </select>
                                <p class="setting-description">Hiển thị thông tin debug (chỉ bật khi cần thiết)</p>
                            </div>
                            <div class="setting-item">
                                <label for="errorLogging">Ghi log lỗi</label>
                                <select id="errorLogging">
                                    <option value="all" selected>Tất cả lỗi</option>
                                    <option value="critical">Chỉ lỗi nghiêm trọng</option>
                                    <option value="none">Không ghi log</option>
                                </select>
                                <p class="setting-description">Mức độ ghi log lỗi hệ thống</p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-code"></i>
                            Tùy chỉnh CSS/JS
                        </h3>
                        <div class="code-editor">
                            <div class="editor-header">
                                <h4>Tùy chỉnh CSS</h4>
                                <div class="editor-actions">
                                    <button class="btn-secondary" id="resetCssBtn">
                                        <i class="fas fa-undo"></i>
                                        Đặt lại
                                    </button>
                                    <button class="btn-primary" id="saveCssBtn">
                                        <i class="fas fa-save"></i>
                                        Lưu CSS
                                    </button>
                                </div>
                            </div>
                            <textarea id="customCss" placeholder="/* Thêm CSS tùy chỉnh của bạn ở đây */">
                                :root {
                                    --custom-primary: #4361ee;
                                }

                                .header {
                                    border-radius: 10px;
                                }

                                .btn-primary {
                                    transition: all 0.3s ease;
                                }
                            </textarea>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>
                            <i class="fas fa-broom"></i>
                            Bảo trì hệ thống
                        </h3>
                        <div class="maintenance-actions">
                            <button class="btn-secondary" id="clearCacheBtn">
                                <i class="fas fa-broom"></i>
                                Xóa cache
                            </button>
                            <button class="btn-secondary" id="optimizeDbBtn">
                                <i class="fas fa-database"></i>
                                Tối ưu cơ sở dữ liệu
                            </button>
                            <button class="btn-warning" id="maintenanceModeBtn">
                                <i class="fas fa-tools"></i>
                                Chế độ bảo trì
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="assets/js/settings.js?v=<?php echo time(); ?>"></script>
</body>
</html>