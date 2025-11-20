    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <div class="logo-icon">🌟</div>
                        <span>STEM Universe</span>
                    </div>
                    <p>Nền tảng học liệu STEM cho học sinh tiểu học Việt Nam</p>
                </div>
                <div class="footer-section">
                    <h4>Liên kết nhanh</h4>
                    <a href="#">Về chúng tôi</a>
                    <a href="#">Đội ngũ giáo viên</a>
                    <a href="#">Phụ huynh</a>
                    <a href="#">Hỗ trợ</a>
                </div>
                <div class="footer-section">
                    <h4>Theo dõi chúng tôi</h4>
                    <div class="social-links">
                        <a href="#" class="social-link" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link" title="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 STEM Universe. Tất cả các quyền được bảo lưu.</p>
            </div>
        </div>
    </footer>

    <?php if (!isset($base_url)) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $project_path = '/SPNC_HocLieu_STEM_TieuHoc';
        $base_url = $protocol . '://' . $host . $project_path;
    }
    ?>
    <script src="<?= $base_url ?>/public/JS/home.js"></script>
</body>
</html>
