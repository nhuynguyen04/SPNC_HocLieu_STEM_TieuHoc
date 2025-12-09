<?php ?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tangram: <?= $currentLevel['title'] ?></title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="<?= $base_url ?>/public/CSS/tangram.css">
</head>
<body>

    <div class="game-wrapper tangram-game">
        <div class="header-game">
            <a href="<?= $base_url ?>/views/main_lesson.php" class="home-btn" title="Về danh sách bài học">
                <i class="fas fa-home"></i> Trang chủ
            </a>
            
            <h1>🧩 <?= $currentLevel['title'] ?></h1>
            
            <div class="level-indicator">Màn <?= $currentLevel['id'] ?>/<?= $totalLevels ?></div>
        </div>
        
        <div class="instruction-bar">
            <span><?= $currentLevel['desc'] ?></span>
            <span class="controls-hint">
                <i class="fas fa-mouse-pointer"></i> Kéo thả | 
                <i class="fas fa-mouse"></i><i class="fas fa-mouse"></i> Nhấn đúp để xoay
            </span>
        </div>

        <div id="canvas-container">
            <canvas id="gameCanvas" width="800" height="600"></canvas>
        </div>

        <div id="result-modal" class="modal">
            <div class="modal-content">
                <h2 id="modal-title"></h2>
                <p id="modal-message"></p>
                <div class="modal-buttons">
                     <button id="next-level-btn" class="game-btn next">Màn tiếp theo</button>
                     <button id="retry-btn" class="game-btn reset">Chơi lại</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const levelData = <?= json_encode($currentLevel) ?>;
        const totalLevels = <?= $totalLevels ?>;
        const baseUrl = '<?= $base_url ?>';
    </script>

    <script src="<?= $base_url ?>/public/JS/tangram.js"></script>
</body>
</html>