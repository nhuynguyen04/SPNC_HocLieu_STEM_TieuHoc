<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/nutrition_game.css">

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 

<div class="game-wrapper"> 
    <h1>Trò chơi: Sắp xếp Tháp Dinh Dưỡng  pyramid</h1>
    <p>Hãy kéo các món ăn vào đúng nhóm của chúng trên tháp.</p>

    <div class="score-board">
        Điểm của bạn: <span id="score"><?= $_SESSION['nutrition_score'] ?></span>
    </div>
    <div id="feedback"></div>
    <div class="game-actions">
        <button id="resetButton">Chơi lại (Reset điểm)</button>
        <button id="finishButton" class="finish-btn">Hoàn thành</button>
        <a href="<?= $base_url ?>/views/lessons/science.php" class="back-btn">Quay lại</a>
    </div>
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
            <div class="pyramid-level" id="level4" data-group="4">
                <span>Tầng 1: Hạn chế</span>
            </div>
            <div class="pyramid-level" id="level3" data-group="3">
                <span>Tầng 2: Ăn vừa phải</span>
            </div>
            <div class="pyramid-level" id="level2" data-group="2">
                <span>Tầng 3: Ăn nhiều</span>
            </div>
            <div class="pyramid-level" id="level1" data-group="1">
                <span>Tầng 4: Ăn đủ</span>
            </div>
        </div> 
    </div>
</div>

<script>
    // Avoid re-declaring baseUrl if other templates already define it
    window.baseUrl = window.baseUrl || "<?= $base_url ?>";
</script>

<script src="<?= $base_url ?>/public/JS/nutrition_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>