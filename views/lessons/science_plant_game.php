<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/plant_game.css">

<div class="game-wrapper plant-game">
    <h1>Trò chơi: Gọi tên các bộ phận (<?php echo $plantData['title']; ?>)</h1>
    <p>Hãy kéo các nhãn tên vào đúng vị trí trên cây.</p>
    
    <div class="score-board">Điểm: <span id="score"><?= $_SESSION['plant_score'] ?></span></div>
    <div id="plant-feedback"></div>
    <button id="plantResetButton" class="reset-button">Chơi lại (Reset điểm)</button>
    <hr>

    <div id="plantGameContainer">
    
        <div id="partsBank">
            <h3>Các bộ phận:</h3>
            <?php foreach ($plantData['parts'] as $part): ?>
                <div class="draggable-label" 
                     draggable="true" 
                     id="<?= $part['id'] ?>" 
                     data-part-name="<?= $part['name'] ?>"
                     data-attempt="1">
                    <?= $part['text'] ?>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="plantTarget">
            <img src="<?= $base_url ?>/public/images/plants/<?php echo $plantData['image_bg']; ?>" alt="<?php echo $plantData['title']; ?>" class="plant-image-bg">

            <?php foreach ($plantData['dropzones'] as $zone): ?>
                <div class="dropzone" 
                     data-target-part="<?= $zone['target'] ?>"
                     style="top: <?= $zone['top'] ?>; left: <?= $zone['left'] ?>; width: <?= $zone['width'] ?>; height: <?= $zone['height'] ?>;">
                </div>
            <?php endforeach; ?>
        </div>
        
    </div>
</div>

<script>
    const baseUrl = "<?= $base_url ?>";
</script>
<script src="<?= $base_url ?>/public/JS/plant_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>