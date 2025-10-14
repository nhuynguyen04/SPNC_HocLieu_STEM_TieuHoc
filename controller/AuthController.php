<?php
require_once 'model/Database.php';
require_once 'model/User.php';

class AuthController {
    private $userModel;
    
    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->userModel = new User($db);
    }
    
    public function login($username, $password) {
        if ($this->userModel->login($username, $password)) {
            $_SESSION['user_id'] = $this->userModel->id;
            $_SESSION['username'] = $this->userModel->username;
            $_SESSION['role'] = $this->userModel->role;
            $_SESSION['full_name'] = $this->userModel->full_name;
            return true;
        }
        return false;
    }
    
    public function register($username, $email, $password, $fullName, $class) {
        return $this->userModel->register($username, $email, $password, $fullName, $class);
    }
    
    public function logout() {
        session_destroy();
        header('Location: index.php');
        exit;
    }
}
?>