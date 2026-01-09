<?php
require_once __DIR__ . '/../template/header.php';

// Khởi tạo session và điểm nếu chưa có
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['nutrition_score'])) {
    $_SESSION['nutrition_score'] = 0;
}

// Định nghĩa danh sách món ăn
$foodItems = [
    // Tầng 4 (Đáy tháp) -> data-group = 1
    ['id' => 'food1', 'name' => 'Hạt', 'group' => 1, 'img' => 'hat.png'],
    ['id' => 'food2', 'name' => 'Đậu', 'group' => 1, 'img' => 'hat_dau.png'],
    ['id' => 'food3', 'name' => 'Bánh mì', 'group' => 1, 'img' => 'banh_mi.png'],
    ['id' => 'food4', 'name' => 'Sandwich', 'group' => 1, 'img' => 'sandwich.png'],
    ['id' => 'food5', 'name' => 'Mì', 'group' => 1, 'img' => 'mi.png'],
    ['id' => 'food6', 'name' => 'Cơm', 'group' => 1, 'img' => 'com.png'],
    ['id' => 'food7', 'name' => 'Pasta', 'group' => 1, 'img' => 'pasta.png'],
    ['id' => 'food8', 'name' => 'Ngũ cốc', 'group' => 1, 'img' => 'ngu_coc.png'],

    // Tầng 3 (Rau/Trái cây) -> data-group = 2
    ['id' => 'food9', 'name' => 'Cà chua', 'group' => 2, 'img' => 'ca_chua.png'],
    ['id' => 'food10', 'name' => 'Ớt chuông', 'group' => 2, 'img' => 'ot_chuong.png'],
    ['id' => 'food11', 'name' => 'Nấm', 'group' => 2, 'img' => 'nam.png'],
    ['id' => 'food12', 'name' => 'Cà rốt', 'group' => 2, 'img' => 'ca_rot.png'],
    ['id' => 'food13', 'name' => 'Cam', 'group' => 2, 'img' => 'cam.png'],
    ['id' => 'food14', 'name' => 'Chuối', 'group' => 2, 'img' => 'chuoi.png'],
    ['id' => 'food15', 'name' => 'Nho', 'group' => 2, 'img' => 'nho.png'],
    ['id' => 'food16', 'name' => 'Dâu', 'group' => 2, 'img' => 'dau.png'],

    // Tầng 2 (Đạm/Sữa) -> data-group = 3
    ['id' => 'food17', 'name' => 'Yogurt', 'group' => 3, 'img' => 'yogurt.png'],
    ['id' => 'food18', 'name' => 'Sữa', 'group' => 3, 'img' => 'sua.png'],
    ['id' => 'food19', 'name' => 'Phô mai', 'group' => 3, 'img' => 'pho_mai.png'],
    ['id' => 'food20', 'name' => 'Cá', 'group' => 3, 'img' => 'ca.png'],
    ['id' => 'food21', 'name' => 'Thịt', 'group' => 3, 'img' => 'thit.png'],
    ['id' => 'food22', 'name' => 'Đùi gà', 'group' => 3, 'img' => 'dui_ga.png'],
    ['id' => 'food23', 'name' => 'Trứng', 'group' => 3, 'img' => 'trung.png'],
    ['id' => 'food24', 'name' => 'Tôm', 'group' => 3, 'img' => 'tom.png'],

    // Tầng 1 (Đỉnh tháp) -> data-group = 4
    ['id' => 'food25', 'name' => 'Dầu ăn', 'group' => 4, 'img' => 'dau_an.png'],
    ['id' => 'food26', 'name' => 'Đường', 'group' => 4, 'img' => 'duong.png'],
    ['id' => 'food27', 'name' => 'Muối', 'group' => 4, 'img' => 'muoi.png'],
];
shuffle($foodItems);
?>

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/nutrition_game.css?v=<?= time() . rand(1000,9999) ?>">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css?v=<?= time() . rand(1000,9999) ?>"> 
<script src="https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js"></script>

<div class="game-wrapper"> 
    <div class="game-header">
        <div class="center-info">
            <h1>SẮP XẾP THÁP DINH DƯỠNG PYRAMID</h1>
            <div id="feedback"></div>
        </div>
    </div>

    <div class="controls-section">
        <div class="score-board">
            Điểm của bạn: <span id="score">0</span>
        </div>

        <div class="top-buttons">
            <a href="<?= $base_url ?>/views/lessons/science.php" class="menu-btn">Menu</a>
            <button id="resetButton">Chơi lại</button>
            <button id="finishButton" class="finish-btn">Kết thúc</button>
        </div>
    </div>
    
    <div id="gameContainer">
        <div id="foodBank">
            <h3>Hãy kéo các món ăn vào đúng nhóm của chúng trên tháp.</h3>
            <div class="food-items-container">
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

<script src="<?= $base_url ?>/public/JS/nutrition_game.js?v=<?= time() . rand(1000,9999) ?>"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>