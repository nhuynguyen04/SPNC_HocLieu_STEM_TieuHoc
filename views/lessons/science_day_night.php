<?php require_once __DIR__ . '/../template/header.php'; ?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/day_night.css">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 

<div class="lesson-container">
    <h1 class="lesson-title">Bài học: Ngày và Đêm</h1>

    <div class="video-wrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/z-EjoYboCuQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <div class="quiz-section">
        <h2>Bài tập củng cố</h2>
        <div class="quiz-container">
            
            <div class="progress-bar" id="progressBarBox">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div id="quizContent">
                </div>

            <div class="final-result" id="finalResult">
                <h3>Chúc mừng bạn đã hoàn thành!</h3>
                <div class="final-score" id="finalScoreText">0 / 50</div>
                <p id="finalMessage"></p>
                <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
                    <button class="restart-btn" onclick="location.reload()">Làm lại bài</button>
                    <a href="<?= $base_url ?>/views/lessons/science.php" class="back-btn">Quay lại</a>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
    const quizData = <?php echo json_encode($questions); ?>;
</script>

<script src="<?= $base_url ?>/public/JS/day_night.js"></script>

<?php require_once __DIR__ . '/../template/footer.php'; ?>