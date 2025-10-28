<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/nutrition_game.css">

<div class="game-wrapper"> 
    <h1>Trò chơi: Sắp xếp Tháp Dinh Dưỡng  pyramid</h1>
    <p>Hãy kéo các món ăn vào đúng nhóm của chúng trên tháp.</p>

    <div class="score-board">
        Điểm của bạn: <span id="score"><?= $_SESSION['nutrition_score'] ?></span>
    </div>
    <div id="feedback"></div>
    <button id="resetButton">Chơi lại (Reset điểm)</button>
    <hr>

    <div id="gameContainer">
        <div id="foodBank">
            <h3>Các món ăn:</h3>
            <?php foreach ($foodItems as $food): ?>
                <div class="food-item" 
                     draggable="true" 
                     id="<?= $food['id'] ?>" 
                     data-group="<?= $food['group'] ?>"
                     data-name="<?= $food['name'] ?>" data-attempt="1"> <img src="<?= $base_url ?>/public/images/foods/<?= $food['img'] ?>" alt="<?= $food['name'] ?>">
                    <span><?= $food['name'] ?></span>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="pyramid">
            <img src="<?= $base_url ?>/public/images/nutrition_pyramid.png" alt="Tháp dinh dưỡng" class="pyramid-bg">
            
            <div class="pyramid-level dropzone" id="level4" data-group="4" title="Tầng 1: Dầu, Mỡ, Đường"></div>
            <div class="pyramid-level dropzone" id="level3" data-group="3" title="Tầng 2: Đạm, Sữa"></div>
            <div class="pyramid-level dropzone" id="level2" data-group="2" title="Tầng 3: Rau & Trái cây"></div>
            <div class="pyramid-level dropzone" id="level1" data-group="1" title="Tầng 4: Ngũ cốc"></div>
        </div>
    </div>
</div>

<script>
    const baseUrl = "<?= $base_url ?>";
</script>

<script src="<?= $base_url ?>/public/JS/nutrition_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>