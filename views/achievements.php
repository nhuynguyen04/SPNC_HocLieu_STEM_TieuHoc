<?php
$base_url = "http://" . $_SERVER['HTTP_HOST'] . "/SPNC_HocLieu_STEM_TieuHoc";
require_once './template/header.php';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thành Tích - STEM Universe</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Baloo+2:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/home.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/achievements.css?v=<?php echo time(); ?>   ">
</head>
<body>
    <div class="bg-elements">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-circle circle-3"></div>
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
    </div>

    <main class="container">
        <section class="hero-section">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Thành Tích <span class="highlight">Của Bạn</span></h1>
                    <p>Nơi ghi nhận những nỗ lực và thành công trong hành trình khám phá STEM</p>
                </div>
                <div class="hero-visual">
                    <div class="floating-elements">
                        <div class="floating-element element-1">🏆</div>
                        <div class="floating-element element-2">🎓</div>
                        <div class="floating-element element-3">⭐</div>
                        <div class="floating-element element-4">📜</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-number">18</div>
                    <div class="stat-label">Bài học đã hoàn thành</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-number">7</div>
                    <div class="stat-label">Chứng nhận nhận được</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-number">24</div>
                    <div class="stat-label">Điểm thành tích</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-number">85%</div>
                    <div class="stat-label">Tiến độ học tập</div>
                </div>
            </div>
        </section>

        <section class="certificates-section">
            <div class="section-header">
                <h2>Bộ Sưu Tập Chứng Nhận</h2>
                <p>Những bằng khen và chứng nhận bạn đã đạt được</p>
            </div>
            
            <div class="certificates-display">
                <button class="certificate-nav prev" onclick="changeCertificate(-1)">
                    <span class="nav-arrow">‹</span>
                </button>
                
                <div class="certificate-viewport">
                    <div class="certificate-wrapper">
                        <div class="certificate-paper" id="currentCertificate">
                        </div>
                    </div>
                </div>
                
                <button class="certificate-nav next" onclick="changeCertificate(1)">
                    <span class="nav-arrow">›</span>
                </button>
            </div>
            
            <div class="certificate-actions">
                <button class="action-btn download-btn" onclick="downloadCertificate()">
                    <i class="fas fa-download"></i>
                    Tải xuống
                </button>
                <button class="action-btn share-btn" onclick="shareCertificate()">
                    <i class="fas fa-share"></i>
                    Chia sẻ
                </button>
            </div>
        </section>
    </main>

    <?php require_once './template/footer.php'; ?>

    <script src="<?php echo $base_url; ?>/public/JS/achievements.js?v=<?php echo time(); ?>"></script>

</body>
</html>