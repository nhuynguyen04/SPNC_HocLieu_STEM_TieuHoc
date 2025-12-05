<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hậu Nghệ Bắn Mặt Trời - STEM Universe</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="<?= $base_url ?>/public/CSS/main.css">
    <link rel="stylesheet" href="<?= $base_url ?>/public/CSS/math_angle_game.css">
    
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #2c3e50;
        }
        .math-game.game-wrapper {
            margin: 0;
            width: 100vw;
            height: 100vh;
            max-width: none;
            border: none;
            border-radius: 0;
        }
    </style>
</head>
<body>

    <div class="game-wrapper math-game full-screen-mode">
        
        <div class="game-ui-layer">
            <div class="header-game">
                <a href="<?= $base_url ?>/views/main_lesson.php" class="home-btn" title="Thoát game">
                    <i class="fas fa-home"></i>
                </a>
                <h1>Màn <?= $currentLevel['id'] ?>: <?= $currentLevel['title'] ?></h1>
            </div>
            
            <div class="instruction-box">
                <p><?= $currentLevel['desc'] ?></p>
                <div class="angle-hint">
                    Góc: <span id="angle-value">0</span>° (<span id="angle-type">...</span>)
                </div>
            </div>
        </div>

        <div id="game-stage">
            <canvas id="gameCanvas"></canvas>
            
            <div class="controls-overlay">
                <div class="protractor-container">
                    <div class="protractor-bg"></div>
                    <input type="range" id="angle-slider" min="0" max="180" value="0" step="1">
                </div>
                </div>

            <button id="fire-btn" class="fire-btn">BẮN!</button>
            
            <div id="miss-feedback" class="miss-feedback hidden">TRƯỢT RỒI! THỬ LẠI NHÉ</div>
        </div>

        <div id="result-modal" class="modal">
            <div class="modal-content">
                <h2 id="modal-title"></h2>
                <p id="modal-message"></p>
                <button id="next-level-btn" class="game-btn">Màn tiếp theo ➡️</button>
                <button id="retry-btn" class="game-btn">Thử lại 🏹</button>
            </div>
        </div>
    </div>

    <script>
        const baseUrl = "<?= $base_url ?>";
        const levelData = <?= json_encode($currentLevel) ?>;
        const totalLevels = <?= $totalLevels ?>;
    </script>
    
    <script src="<?= $base_url ?>/public/JS/math_angle_game.js"></script>

</body>
</html>