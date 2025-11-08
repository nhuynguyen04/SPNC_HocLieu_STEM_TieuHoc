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

<div class="game-wrapper trash-game">
    <h1>Giúp Tấm dọn nhà 🧹</h1>
    <p>Trời ơi! Đồ đạc bừa bộn quá. Bạn hãy giúp Tấm nhặt và phân loại rác vào đúng 3 thùng nhé!</p>
    
    <div class="score-board">Điểm: <span id="score"><?= $_SESSION['trash_score'] ?></span></div>
    
    <button id="trashResetButton" class="reset-button">Chơi lại</button>
    <hr>

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
    const baseUrl = "<?= $base_url ?>";
</script>
<script src="<?= $base_url ?>/public/JS/trash_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>