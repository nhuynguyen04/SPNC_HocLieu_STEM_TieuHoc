<?php
// controllers/logout.php

// Kiểm tra xem file có được truy cập không
error_log("=== LOGOUT.PH P ACCESSED ===");

// Xác định base_url
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$project_path = '/SPNC_HocLieu_STEM_TieuHoc';

$base_url = $protocol . '://' . $host . $project_path;

// Session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

error_log("Session before destroy: " . print_r($_SESSION, true));

// Hủy session
$_SESSION = array();

// Xóa cookie session
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();

error_log("Session destroyed, redirecting to site index");

// Chuyển hướng về trang index của dự án
header("Location: " . $base_url . "/index.php");
exit;
?>