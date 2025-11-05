<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/main.css"> 
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/trash_game.css">

<div class="game-wrapper trash-game">
    <h1>Giúp Tấm dọn nhà 🧹</h1>
    <p>Trời ơi! Đồ đạc bừa bộn quá. Bạn hãy giúp Tấm nhặt và phân loại rác vào đúng 3 thùng nhé!</p>
    
    <div class="score-board">Điểm: <span id="score"><?= $_SESSION['trash_score'] ?></span></div>
    <div id="feedback"></div>
    <button id="trashResetButton" class="reset-button">Chơi lại</button>
    <hr>

    <div id="trashGameContainer">
        
        <img src="<?= $base_url ?>/public/images/trash/background.png" alt="Sân nhà Tấm" class="game-background">

        <div id="binContainer">
            <div class="trash-bin bin-huuco" data-bin-type="huuco">
                <img src="<?= $base_url ?>/public/images/trash/bin_green.png" alt="Thùng rác hữu cơ">
                <span>Rác Hữu Cơ</span>
            </div>
            <div class="trash-bin bin-taiche" data-bin-type="taiche">
                <img src="<?= $base_url ?>/public/images/trash/bin_yellow.png" alt="Thùng rác tái chế">
                <span>Rác Tái Chế</span>
            </div>
            <div class="trash-bin bin-voco" data-bin-type="voco">
                <img src="<?= $base_url ?>/public/images/trash/bin_red.png" alt="Thùng rác vô cơ">
                <span>Rác Vô Cơ</span>
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
        
    </div>
</div>

<script>
    const baseUrl = "<?= $base_url ?>";
</script>
<script src="<?= $base_url ?>/public/JS/trash_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>