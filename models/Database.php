<?php
class Database {
    private $host = "localhost";
    private $db_name = "learning_app";
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
            $temp_conn->exec("CREATE DATABASE IF NOT EXISTS " . $this->db_name . " CHARACTER SET utf8 COLLATE utf8_unicode_ci");
            
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
            
            echo "✅ Đã tạo database '" . $this->db_name . "' thành công!";
            
            return $this->conn;
        } catch(PDOException $exception) {
            echo "Lỗi tạo database: " . $exception->getMessage();
            return null;
        }
    }

    // Tạo các bảng theo sơ đồ
    private function createTables() {
        $sql = [
            // Bảng người dùng
            "CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name NVARCHAR(100),
                last_name NVARCHAR(100),
                class VARCHAR(10),
                role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
                avatar VARCHAR(255),
                email_verified TINYINT(1) DEFAULT 0,
                verification_code VARCHAR(10),
                verification_expires DATETIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",

            // Bảng chủ đề (Chỉ đề) - ĐỔI TÊN THÀNH stem_fields để index.php không lỗi
            "CREATE TABLE IF NOT EXISTS stem_fields (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                description TEXT,
                icon VARCHAR(100),
                color VARCHAR(7),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",

            // Bảng bài giảng (Đài giảng)
            "CREATE TABLE IF NOT EXISTS lessons (
                id INT PRIMARY KEY AUTO_INCREMENT,
                topic_id INT,
                lesson_name NVARCHAR(255) NOT NULL,
                class_level NVARCHAR(100),
                video_url VARCHAR(255),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (topic_id) REFERENCES stem_fields(id) ON DELETE CASCADE
            )",

            // Bảng trò chơi (Từ chơi)
            "CREATE TABLE IF NOT EXISTS games (
                id INT PRIMARY KEY AUTO_INCREMENT,
                lesson_id INT,
                game_name NVARCHAR(255) NOT NULL,
                game_rules TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            )",

            // Bảng tác phẩm
            "CREATE TABLE IF NOT EXISTS works (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                lesson_id INT,
                content TEXT,
                image_url VARCHAR(255),
                video_url VARCHAR(255),
                work_time INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            )",

            // Bảng điểm
            "CREATE TABLE IF NOT EXISTS scores (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                game_id INT,
                score INT NOT NULL,
                play_time INT,
                total_time INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
            )",

            // Bảng xếp hạng từng trò chơi
            "CREATE TABLE IF NOT EXISTS game_leaderboards (
                id INT PRIMARY KEY AUTO_INCREMENT,
                game_id INT,
                user_id INT,
                total_score INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )",

            // Bảng xếp hạng hoạt động tuần
            "CREATE TABLE IF NOT EXISTS weekly_leaderboards (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                total_score INT,
                week_number INT,
                year INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )",

            // Bảng lưu token ghi nhớ đăng nhập với cơ chế selector/validator
            "CREATE TABLE IF NOT EXISTS remember_tokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                selector VARCHAR(24) UNIQUE NOT NULL,
                hashed_validator VARCHAR(128) NOT NULL,
                user_agent VARCHAR(255) NULL,
                ip VARCHAR(45) NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_selector (selector)
            )"
        ];

        // Thực thi từng câu lệnh SQL
        foreach ($sql as $statement) {
            try {
                $this->conn->exec($statement);
            } catch(PDOException $e) {
                echo "Lỗi khi tạo bảng: " . $e->getMessage() . "<br>";
            }
        }

        // Chèn dữ liệu mẫu
        $this->insertSampleData();
    }

    // Chèn dữ liệu mẫu
    private function insertSampleData() {
        try {
            // Kiểm tra xem đã có dữ liệu chưa
            $check = $this->conn->query("SELECT COUNT(*) as count FROM users")->fetch(PDO::FETCH_ASSOC);
            
            if ($check['count'] == 0) {
                // Tạo tài khoản admin và user mặc định (mật khẩu: 123456)
                $hashed_password = password_hash('123456', PASSWORD_DEFAULT);
                $this->conn->exec("INSERT INTO users (username, email, password, first_name, last_name, class, role, email_verified) VALUES
                ('admin', 'admin@stem.edu.vn', '$hashed_password', 'Admin', 'System', NULL, 'admin', 1),
                ('student1', 'student1@stem.edu.vn', '$hashed_password', 'Minh', 'Nguyễn', '5A1', 'user', 1),
                ('student2', 'student2@stem.edu.vn', '$hashed_password', 'Lan', 'Trần', '5A2', 'user', 1)");

                $this->conn->exec("INSERT INTO stem_fields (name, description, icon, color) VALUES
                ('Toán học', 'Môn học về số học và hình học', '📊', '#A594F9'),
                ('Khoa học', 'Khám phá thế giới tự nhiên', '🔬', '#FF9E6D'),
                ('Công nghệ', 'Lập trình và robot', '🤖', '#96CEB4'),
                ('Kỹ thuật', 'Xây dựng và sáng tạo', '⚙️', '#FFD166')");

                // Chèn bài giảng mẫu
                $this->conn->exec("INSERT INTO lessons (topic_id, lesson_name, class_level, video_url, content) VALUES
                (1, 'Phép cộng cơ bản', 'Lớp 1', 'video/phep-cong.mp4', 'Nội dung bài học phép cộng'),
                (1, 'Phép trừ cơ bản', 'Lớp 1', 'video/phep-tru.mp4', 'Nội dung bài học phép trừ'),
                (2, 'Thực vật xung quanh em', 'Lớp 2', 'video/thuc-vat.mp4', 'Tìm hiểu về các loại cây')");

                // Chèn trò chơi mẫu
                $this->conn->exec("INSERT INTO games (lesson_id, game_name, game_rules) VALUES
                (1, 'Đố vui phép cộng', 'Trả lời các câu hỏi phép cộng trong 2 phút'),
                (1, 'Thử thách toán học', 'Giải các bài toán nhanh'),
                (2, 'Ghép từ thành câu', 'Sắp xếp các từ thành câu hoàn chỉnh')");

                // Chèn điểm mẫu
                $this->conn->exec("INSERT INTO scores (user_id, game_id, score, play_time, total_time) VALUES
                (2, 1, 85, 120, 180),
                (2, 2, 90, 150, 200),
                (3, 1, 78, 140, 190)");

                // echo "✅ Đã chèn dữ liệu mẫu thành công!";
            }
        } catch(PDOException $e) {
            echo "Lỗi khi chèn dữ liệu mẫu: " . $e->getMessage();
        }
    }
}
?>