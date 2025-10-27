<?php
class Database {
    private $host = "localhost";
    private $db_name = "stem_tieu_hoc";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                $this->username, 
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Nếu database chưa tồn tại, tạo mới
            if ($exception->getCode() == '1049') {
                return $this->createDatabase();
            } else {
                echo "Lỗi kết nối database: " . $exception->getMessage();
            }
        }
        return $this->conn;
    }

    // Tạo database mới
    private function createDatabase() {
        try {
            // Kết nối tới MySQL mà không chọn database
            $temp_conn = new PDO("mysql:host=" . $this->host, $this->username, $this->password);
            $temp_conn->exec("CREATE DATABASE IF NOT EXISTS " . $this->db_name);
            
            // Đóng kết nối tạm
            $temp_conn = null;
            
            // Kết nối lại tới database mới tạo
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                $this->username, 
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Tạo các bảng
            $this->createTables();
            
            return $this->conn;
        } catch(PDOException $exception) {
            echo "Lỗi tạo database: " . $exception->getMessage();
            return null;
        }
    }

    // Tạo các bảng
    private function createTables() {
        $sql = "
        -- Bảng người dùng
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(100),
            class VARCHAR(20),
            role ENUM('admin', 'student') DEFAULT 'student',
            avatar VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Bảng lĩnh vực STEM
        CREATE TABLE IF NOT EXISTS stem_fields (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            description TEXT,
            icon VARCHAR(100),
            color VARCHAR(7)
        );

        -- Bảng nhiệm vụ/chuyến phiêu lưu
        CREATE TABLE IF NOT EXISTS adventures (
            id INT PRIMARY KEY AUTO_INCREMENT,
            field_id INT,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            level INT,
            video_url VARCHAR(255),
            image_url VARCHAR(255),
            content TEXT,
            question_data TEXT,
            FOREIGN KEY (field_id) REFERENCES stem_fields(id) ON DELETE CASCADE
        );

        -- Bảng tiến độ học tập
        CREATE TABLE IF NOT EXISTS progress (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            adventure_id INT,
            completed BOOLEAN DEFAULT FALSE,
            score INT DEFAULT 0,
            answers_data TEXT,
            completed_at TIMESTAMP NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (adventure_id) REFERENCES adventures(id) ON DELETE CASCADE,
            UNIQUE KEY unique_user_adventure (user_id, adventure_id)
        );

        -- Bảng sticker/huy hiệu
        CREATE TABLE IF NOT EXISTS rewards (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            image_url VARCHAR(255),
            condition_type VARCHAR(50),
            condition_value VARCHAR(100)
        );

        -- Bảng sticker đã đạt được
        CREATE TABLE IF NOT EXISTS user_rewards (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            reward_id INT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (reward_id) REFERENCES rewards(id) ON DELETE CASCADE
        );

        -- Bảng học liệu
        CREATE TABLE IF NOT EXISTS learning_materials (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            file_url VARCHAR(255),
            field_id INT,
            type ENUM('image', 'video', 'simulation', 'document'),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (field_id) REFERENCES stem_fields(id) ON DELETE CASCADE
        );

        -- Chèn dữ liệu mẫu cho các lĩnh vực STEM
        INSERT IGNORE INTO stem_fields (id, name, description, icon, color) VALUES
        (1, 'Khoa học', 'Khám phá thế giới tự nhiên qua các thí nghiệm thú vị', '🔬', '#FF9E6D'),
        (2, 'Công nghệ', 'Lập trình, robot và trí tuệ nhân tạo', '🤖', '#96CEB4'),
        (3, 'Kỹ thuật', 'Xây dựng, lắp ráp và sáng tạo', '⚙️', '#FFD166'),
        (4, 'Toán học', 'Tư duy logic và các trò chơi số học', '📊', '#A594F9');

        -- Tạo tài khoản admin mặc định (mật khẩu: password)
        INSERT IGNORE INTO users (id, username, email, password, full_name, role) VALUES
        (1, 'admin', 'admin@stemkids.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Quản trị viên', 'admin');

        -- Thêm một vài sticker mẫu
        INSERT IGNORE INTO rewards (id, name, description, image_url, condition_type, condition_value) VALUES
        (1, 'Nhà khoa học nhí', 'Hoàn thành chương trình Khoa học', 'science_badge.png', 'field_complete', '1'),
        (2, 'Lập trình viên tài ba', 'Hoàn thành chương trình Công nghệ', 'tech_badge.png', 'field_complete', '2'),
        (3, 'Kỹ sư nhí', 'Hoàn thành chương trình Kỹ thuật', 'engineering_badge.png', 'field_complete', '3'),
        (4, 'Nhà toán học', 'Hoàn thành chương trình Toán học', 'math_badge.png', 'field_complete', '4');
        ";

        // Thực thi từng câu lệnh SQL
        $statements = array_filter(array_map('trim', explode(';', $sql)));
        
        foreach ($statements as $statement) {
            if (!empty($statement)) {
                $this->conn->exec($statement);
            }
        }
    }

    // Kiểm tra database đã được cài đặt chưa
    public function isInstalled() {
        try {
            $query = "SELECT COUNT(*) as count FROM information_schema.tables 
                     WHERE table_schema = :db_name";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':db_name', $this->db_name);
            $stmt->execute();
            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['count'] > 0;
        } catch(PDOException $exception) {
            return false;
        }
    }
}
?>