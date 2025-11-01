<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/plant_game.css">

<div class="game-wrapper plant-game">
    <h1>Trò chơi: Lắp ghép các bộ phận của cây</h1>
    <p>Hãy kéo các bộ phận bên phải vào đúng vị trí trên cây.</p>
    
    <div class="score-board">Điểm: <span id="score"><?= $_SESSION['plant_score'] ?></span></div>
    <div id="plant-feedback"></div>

    <button id="plantResetButton" class="reset-button">Chơi lại</button>

    <hr>

    <div id="plantGameContainer">
    
        <div id="partsBank">
            <h3>Các bộ phận:</h3>
            <?php foreach ($plantParts as $part): ?>
                <div class="draggable-part" 
                     draggable="true" 
                     id="<?= $part['id'] ?>" 
                     data-part-name="<?= $part['name'] ?>" data-attempt="1"> 
                    
                    <img src="<?= $base_url ?>/public/images/plants/<?= $part['img'] ?>" alt="<?= $part['name'] ?>">
                </div>
            <?php endforeach; ?>
        </div>

        <div id="plantTarget">
            <img src="<?= $base_url ?>/public/images/plants/plant_silhouette.png" alt="Cây xám" class="plant-silhouette">

            <div class="dropzone" data-target-part="hoa" id="drop-hoa"></div>
            <div class="dropzone" data-target-part="la1" id="drop-la1"></div> <div class="dropzone" data-target-part="la2" id="drop-la2"></div> <div class="dropzone" data-target-part="than" id="drop-than"></div>
            <div class="dropzone" data-target-part="re" id="drop-re"></div>
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