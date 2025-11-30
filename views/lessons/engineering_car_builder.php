<?php require_once __DIR__ . '/../template/header.php'; ?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/car_builder.css">

<div class="game-wrapper car-builder">
    <div class="header-game">
        <a href="<?= $base_url ?>/views/main_lesson.php" class="home-btn"><i class="fas fa-home"></i></a>
        <h1>🏎️ Xưởng Chế Tạo: <?= $currentLevel['title'] ?></h1>
        <div class="level-indicator">Màn <?= $currentLevel['id'] ?>/<?= $totalLevels ?></div>
    </div>
    
    <p class="instruction">Nhiệm vụ: <?= $currentLevel['desc'] ?></p>

    <div id="workshop-area">
        
        <div class="parts-selector">
            <div class="part-category">
                <h3>1. Khung Xe</h3>
                <div class="part-options">
                    <?php foreach ($parts['body'] as $p): ?>
                        <div class="part-item" onclick="selectPart('body', '<?= $p['id'] ?>')" data-stats='<?= json_encode($p) ?>'>
                            <img src="<?= $base_url ?>/public/images/car_builder/<?= $p['img'] ?>">
                            <span><?= $p['name'] ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <div class="part-category">
                <h3>2. Động Cơ</h3>
                <div class="part-options">
                    <?php foreach ($parts['engine'] as $p): ?>
                        <div class="part-item" onclick="selectPart('engine', '<?= $p['id'] ?>')" data-stats='<?= json_encode($p) ?>'>
                            <img src="<?= $base_url ?>/public/images/car_builder/<?= $p['img'] ?>">
                            <span><?= $p['name'] ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="part-category">
                <h3>3. Bánh Xe</h3>
                <div class="part-options">
                    <?php foreach ($parts['wheel'] as $p): ?>
                        <div class="part-item" onclick="selectPart('wheel', '<?= $p['id'] ?>')" data-stats='<?= json_encode($p) ?>'>
                            <img src="<?= $base_url ?>/public/images/car_builder/<?= $p['img'] ?>">
                            <span><?= $p['name'] ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
             <div class="part-category">
                <h3>4. Phụ Kiện</h3>
                <div class="part-options">
                    <?php foreach ($parts['addon'] as $p): ?>
                        <div class="part-item" onclick="selectPart('addon', '<?= $p['id'] ?>')" data-stats='<?= json_encode($p) ?>'>
                             <?php if($p['img']): ?>
                                <img src="<?= $base_url ?>/public/images/car_builder/<?= $p['img'] ?>">
                             <?php else: ?>
                                <div style="width:50px;height:50px;line-height:50px;background:#eee;border-radius:50%;">🚫</div>
                             <?php endif; ?>
                            <span><?= $p['name'] ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="preview-area">
            <div class="car-preview-box" style="background-image: url('<?= $base_url ?>/public/images/car_builder/garage_bg.png');">
                <div id="car-assembly">
                    <img id="preview-body" src="" class="layer body">
                    <img id="preview-wheel-f" src="" class="layer wheel front">
                    <img id="preview-wheel-b" src="" class="layer wheel back">
                    <img id="preview-engine" src="" class="layer engine">
                    <img id="preview-addon" src="" class="layer addon">
                </div>
            </div>

            <div class="stats-board">
                <h3>Thông số kỹ thuật</h3>
                
                <div class="stat-row">
                    <span class="stat-label">⚡ Tốc độ:</span>
                    <div class="progress-bar"><div class="progress-fill speed" id="bar-speed" style="width: 0%"></div></div>
                    <span class="stat-val" id="val-speed">0</span>
                </div>
                
                <div class="stat-row">
                    <span class="stat-label">⛰️ Sức mạnh:</span>
                    <div class="progress-bar"><div class="progress-fill power" id="bar-power" style="width: 0%"></div></div>
                    <span class="stat-val" id="val-power">0</span>
                </div>
                
                <div class="stat-row">
                    <span class="stat-label">🦎 Độ bám:</span>
                    <div class="progress-bar"><div class="progress-fill grip" id="bar-grip" style="width: 0%"></div></div>
                    <span class="stat-val" id="val-grip">0</span>
                </div>
            </div>

            <button id="btn-test-drive" class="game-btn run">🏁 CHẠY THỬ NGHIỆM 🏁</button>
        </div>
    </div>

    <div id="simulation-modal" class="modal">
        <div class="modal-content sim-content">
            <h2 id="sim-title">Đang chạy thử...</h2>
            <div class="sim-stage" style="background-image: url('<?= $base_url ?>/public/images/car_builder/<?= $currentLevel['bg'] ?>');">
                <div id="sim-car" class="sim-car">
                    </div>
                <div class="flag-pole">🚩</div>
            </div>
            <p id="sim-message">Xe đang tăng tốc...</p>
            <div id="sim-actions" style="display:none;">
                <button id="next-level-btn" class="game-btn">Màn tiếp theo ➡️</button>
                <button id="retry-btn" class="game-btn reset">Về xưởng sửa lại 🔧</button>
            </div>
        </div>
    </div>
</div>

<script>
    const baseUrl = "<?= $base_url ?>";
    const levelReq = <?= json_encode($currentLevel) ?>;
    const totalGameLevels = <?= $totalLevels ?>;
</script>
<script src="<?= $base_url ?>/public/JS/car_builder.js"></script>

<?php require_once __DIR__ . '/../template/footer.php'; ?>