<?php require_once __DIR__ . '/../template/header.php'; ?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/day_night.css?v=<?= time() ?>">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css?v=<?= time() ?>">
<br><br><br><br>
<div class="lesson-container">
    <div class="lesson-layout">
        <div class="video-column">
            <div class="video-card">
                <div class="video-wrapper">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/z-EjoYboCuQ" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
                <div class="video-description">
                    <h3>Giới thiệu bài học</h3>
                    <p>Video này giải thích về hiện tượng ngày và đêm, nguyên nhân hình thành và các yếu tố liên quan.</p>
                    <div class="lesson-info">
                        <span class="info-item"><i class="info-icon">⏱️</i> Thời lượng: 5 phút</span>
                        <span class="info-item"><i class="info-icon">📊</i> Độ khó: Cơ bản</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="separator-column">
            <div class="separator-line"></div>
            <div class="separator-circle">
                <div class="circle-inner">
                    <span class="separator-icon">📝</span>
                </div>
            </div>
        </div>
        
        <div class="quiz-column">
            <div class="quiz-card">
                <div class="quiz-header">
                    <h2><i class="quiz-icon">📝</i> Bài tập củng cố</h2>
                    <div class="progress-container">
                        <div class="progress-info">
                            <span class="progress-text">Tiến độ</span>
                            <span class="progress-counter" id="progressCounter">0/5</span>
                        </div>
                        <div class="progress-bar" id="progressBarBox">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                    </div>
                </div>
                
                <div class="quiz-content" id="quizContent"></div>
                
                <div class="final-result" id="finalResult">
                    <div class="result-icon">🏆</div>
                    <h3>Chúc mừng bạn đã hoàn thành!</h3>
                    <div class="final-score-container">
                        <div class="score-circle">
                            <span class="score-value" id="finalScoreText">0</span>
                            <span class="score-label">điểm</span>
                        </div>
                        <div class="score-details">
                            <p>Bạn đã hoàn thành <strong>Bài học: Ngày và Đêm</strong></p>
                            <p id="finalMessage" class="final-message"></p>
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="restart-btn" onclick="location.reload()">
                            <i class="btn-icon">🔄</i> Làm lại bài
                        </button>
                        <a href="<?= $base_url ?>/views/lessons/science.php" class="back-btn">
                            <i class="btn-icon">←</i> Quay lại
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="lesson-summary">
        <div class="summary-header">
            <h3><i class="summary-icon">📋</i> Tóm tắt bài học</h3>
        </div>
        <div class="summary-content">
            <div class="summary-point">
                <span class="point-icon">☀️</span>
                <div class="point-content">
                    <h4>Nguyên nhân ngày và đêm</h4>
                    <p>Trái Đất tự quay quanh trục của nó, khiến một nửa được Mặt Trời chiếu sáng (ban ngày) và nửa kia không được chiếu sáng (ban đêm).</p>
                </div>
            </div>
            <div class="summary-point">
                <span class="point-icon">🔄</span>
                <div class="point-content">
                    <h4>Thời gian quay</h4>
                    <p>Trái Đất mất khoảng 24 giờ để hoàn thành một vòng quay quanh trục của nó, tạo ra chu kỳ ngày và đêm.</p>
                </div>
            </div>
            <div class="summary-point">
                <span class="point-icon">🌎</span>
                <div class="point-content">
                    <h4>Hiện tượng liên quan</h4>
                    <p>Do Trái Đất hình cầu và nghiêng trên trục, nên thời gian ngày và đêm thay đổi theo mùa và vĩ độ.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const quizData = <?php echo json_encode($questions); ?>;
</script>

<script src="<?= $base_url ?>/public/JS/day_night.js?v=<?= time() ?>"></script>

<?php require_once __DIR__ . '/../template/footer.php'; ?>