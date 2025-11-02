<?php require_once __DIR__ . '/../template/header.php'; ?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/color_mixing_game.css"> 

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 

<div class="color-game-wrapper"> 
    <h1>Trò chơi pha màu</h1>
    <div class="score-box">Điểm: <span id="totalScore"><?= $_SESSION['total_score'] ?></span></div>

    <?php if ($target): ?>
        <p class="question"><?= $target['text'] ?></p>
        <div class="target">
            <span>Màu cần pha:</span>
            <div class="color-target" style="background-color: rgb(<?= implode(',', $target['rgb']) ?>);"></div>
        </div>
        <div class="palette">
            <div class="color" data-color="red" style="background:red;"></div>
            <div class="color" data-color="yellow" style="background:yellow;"></div>
            <div class="color" data-color="blue" style="background:blue;"></div>
            <div class="color" data-color="white" style="background:white;"></div>
            <div class="color" data-color="black" style="background:black;"></div>
        </div>
        <div class="selected"><p>Màu đã chọn:</p><div id="selectedColors"></div></div>
        <div id="hintBox"></div>
        <canvas id="mixCanvas" width="400" height="250"></canvas>
        <div id="result"></div>
        <div class="controls">
            <button id="clearButton">Làm lại</button>
            
            <a href="<?= $base_url ?>/science/color-game?next=1" id="nextButton" style="display:none;">Câu hỏi tiếp theo</a>
        </div>

        <script>
            // Truyền $base_url sang JS
            const baseUrl = "<?= $base_url ?>"; 

            // Các biến game
            const targetColor = <?= json_encode($target['rgb']) ?>;
            const correctPair = <?= json_encode($correct_colors_sorted) ?>; 
            let currentAttempt = <?= $current_attempt ?>;
        </script>
        
        <script src="<?= $base_url ?>/public/JS/color_mixing_game.js"></script>

    <?php else: ?>
        <p class="question">Chúc mừng! Bạn đã hoàn thành tất cả các câu hỏi!</p>
        <p class="final-score">Tổng điểm của bạn là: <?= $_SESSION['total_score'] ?></p>
        
        <a href="<?= $base_url ?>/science/color-game?next=1" class="play-again">Chơi lại từ đầu</a>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/../template/footer.php'; ?>