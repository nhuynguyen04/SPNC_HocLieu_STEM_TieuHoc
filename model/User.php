<?php
class User {
    private $conn;
    private $table_name = "users";
    
    // Các thuộc tính...
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Các phương thức...
    
    public function login($username, $password) {
        $query = "SELECT id, username, password, role, full_name, class, avatar 
                  FROM " . $this->table_name . " 
                  WHERE username = :username OR email = :username";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        
        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                // Cập nhật thông tin user
                $this->id = $row['id'];
                $this->username = $row['username'];
                $this->role = $row['role'];
                $this->full_name = $row['full_name'];
                $this->class = $row['class'];
                $this->avatar = $row['avatar'];
                return true;
            }
        }
        return false;
    }
}
?>