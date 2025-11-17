<?php
session_start();
$baseUrl = "http://" . $_SERVER['HTTP_HOST'] . "/SPNC_HocLieu_STEM_TieuHoc";
?>

<?php require_once __DIR__ . '/../template/header.php'; ?>

<link rel="stylesheet" href="<?php echo $baseUrl; ?>/views/lessons/flower_mechanism.css">
<script defer src="<?php echo $baseUrl; ?>/views/lessons/flower_mechanism.js"></script>

<div class="flower-container">
    <h1 class="title">🌺 HOA YÊU THƯƠNG NỞ RỘ 🌺</h1>
    <p class="subtitle">Vẽ – Trang trí – Gấp cánh – Ngắm hoa nở</p>

    <div class="toolbar">
        <button id="drawBtn">✏️ Vẽ bông hoa</button>
        <button id="chooseBtn">🌸 Chọn hoa có sẵn</button>
        <button id="clearBtn">🧽 Xóa</button>
    </div>

    <canvas id="flowerCanvas" width="500" height="500"></canvas>

    <p class="guide">👉 Nhấn vào từng cánh hoa để gấp chúng lại. Sau đó hoa sẽ từ từ nở ra.</p>
</div>

<?php require_once __DIR__ . '/../template/footer.php'; ?>