<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/trash_game.css">

<div id="intro-modal">
    <div class="intro-dialogue">
        <img src="<?= $base_url ?>/public/images/character/tam.png" alt="Tấm" class="intro-tam-avatar">
        <div class="intro-text-content">
            <h3>Chào bạn, mình là Tấm.</h3>
            <p>Vậy là bạn đã học được cách phân loại rác rồi nhé. Giờ để thực hành, bạn có thể giúp mình dọn dẹp nhà được không?</p>
            <button id="startGameButton">Bắt đầu thôi!</button>
        </div>
    </div>
</div>

<div class="game-wrapper trash-game game-fullscreen">
    <div class="game-header">
        <div class="center-info">
            <h1>GIÚP TẤM DỌN NHÀ 🧹</h1>
            <p>Trời ơi! Đồ đạc bừa bộn quá. Bạn hãy giúp Tấm nhặt và phân loại rác vào đúng 3 thùng nhé!</p>
            <div class="score-board">Diểm: <span id="score"><?= $_SESSION['trash_score'] ?></span></div>
        </div>
    </div>
    
    <div class="top-buttons">
        <a href="<?= $base_url ?>/views/lessons/science.php" class="menu-btn" id="trashBackButton">Menu</a>
        <button id="trashResetButton" class="reset-button">Chơi lại</button>
        <button id="trashCompleteButton" class="complete-button">Kết thúc</button>
    </div>

    <div id="trashGameContainer">
        
        <img src="<?= $base_url ?>/public/images/trash/background.png" alt="Sân nhà Tấm" class="game-background">

        <div id="binContainer">
            <div class="trash-bin bin-huuco" data-bin-type="huuco">
                <img src="<?= $base_url ?>/public/images/trash/bin_green.png" alt="Thùng rác hữu cơ">
            </div>
            <div class="trash-bin bin-taiche" data-bin-type="taiche">
                <img src="<?= $base_url ?>/public/images/trash/bin_yellow.png" alt="Thùng rác tái chế">
            </div>
            <div class="trash-bin bin-voco" data-bin-type="voco">
                <img src="<?= $base_url ?>/public/images/trash/bin_red.png" alt="Thùng rác vô cơ">
            </div>
        </div>

        <div id="trashItems">
            <?php foreach ($trashItems as $item): ?>
                <img src="<?= $base_url ?>/public/images/trash/<?= $item['img'] ?>" 
                     alt="<?= $item['name'] ?>"
                     class="trash-item"
                     draggable="true"
                     id="<?= $item['id'] ?>"
                     data-group="<?= $item['group'] ?>"
                     data-attempt="1"
                     style="top: <?= $item['top'] ?>; left: <?= $item['left'] ?>;">
            <?php endforeach; ?>
        </div>

        <div id="character-area">
            <div id="tam-dialogue-box" class="hidden">
                <span id="tam-dialogue-text">...</span>
            </div>
            <img src="<?= $base_url ?>/public/images/character/tam.png" alt="Tấm" id="tam-character">
        </div>
        
    </div>
</div>

<script>
    // Ensure a single global `baseUrl` exists; do not declare `const/var baseUrl` here
    window.baseUrl = window.baseUrl || "<?= $base_url ?>";
</script>
<script src="<?= $base_url ?>/public/JS/trash_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>