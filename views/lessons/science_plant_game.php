<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/plant_game.css?v=<?php echo time(); ?>">

<div class="game-wrapper plant-game">
    <h1>Trò chơi: Lắp ghép bộ phận (<?php echo $plantData['title']; ?>)</h1>
    <p>Hãy kéo các nhãn tên vào đúng vị trí trên cây.</p>
    
    <div id="plant-feedback"></div>
    <div class="game-actions">
        <button id="plantFinishButton" class="finish-button">Hoàn thành</button>
        <a href="<?= $base_url ?>/views/lessons/science.php" class="back-button">Quay lại</a>
    </div>
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
    window.baseUrl = window.baseUrl || "<?= $base_url ?>";
    window.gameName = window.gameName || "<?= addslashes($plantData['title']) ?>";
    window.nextPlantType = <?= json_encode($nextType) ?>;
    window.prevPlantType = <?= json_encode($prevType ?? null) ?>;
    window.currentPlantType = <?= json_encode($plantType) ?>;
</script>
<script src="<?= $base_url ?>/public/JS/plant_game.js"></script>

<!-- Win modal for plant progression -->
<div id="win-modal" class="modal" style="display:none; position:fixed; inset:0; align-items:center; justify-content:center; background:rgba(0,0,0,0.6); z-index:9999;">
    <div style="background:#fff; padding:1.2rem; max-width:520px; width:90%; border-radius:8px; text-align:center;">
        <button id="close-modal-btn" style="float:right; background:none; border:none; font-size:1.1rem;">✖</button>
        <h2>🎉 Hoàn thành!</h2>
        <p>Bạn đã ghép xong loại cây này.</p>
        <div style="margin-top:1rem; display:flex; gap:.5rem; justify-content:center;">
            <button id="next-level-btn" style="display:none; background:#2ecc71; color:#fff; padding:.6rem 1rem; border-radius:6px; border:none;">Chơi tiếp</button>
            <button id="replay-all-btn" style="display:none; background:#3498db; color:#fff; padding:.6rem 1rem; border-radius:6px; border:none;">Chơi lại từ đầu</button>
            <button id="back-to-lessons-btn" style="display:none; background:#3498db; color:#fff; padding:.6rem 1rem; border-radius:6px; border:none;">Quay lại</button>
        </div>
    </div>
</div>

<script>
    (function(){
        var backBtn = document.querySelector('.back-button');
        var prevType = window.prevPlantType || null;
        if (backBtn) {
            if (prevType) {
                backBtn.setAttribute('href', window.baseUrl + '/views/lessons/science_plant_game?type=' + encodeURIComponent(prevType));
            } else {
                backBtn.setAttribute('href', window.baseUrl + '/views/lessons/science.php');
            }
        }
    })();
</script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>