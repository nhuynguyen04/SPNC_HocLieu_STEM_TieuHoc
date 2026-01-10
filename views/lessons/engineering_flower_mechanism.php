<?php 
$page_title = "Hoa Yêu Thương Nở Rộ - Thí Nghiệm STEM";
require_once __DIR__ . '/../template/header.php'; 
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/flower_mechanism.css?v=<?php echo time(); ?>">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css"> 

<div class="stem-experiment-container">
    <div class="experiment-layout">
        <!-- Panel thí nghiệm bên trái -->
        <div class="experiment-panel">
            <div class="material-section">
                <h2>Chọn Thiết Kế Hoa</h2>
                <div class="material-buttons">
                    <button class="material-btn" data-material="thin">
                        <span class="btn-text">Giấy Mỏng</span>
                        <span class="btn-desc">Nở nhanh</span>
                    </button>
                    <button class="material-btn" data-material="thick">
                        <span class="btn-text">Giấy Dày</span>
                        <span class="btn-desc">Nở chậm</span>
                    </button>
                </div>
            </div>

            <div class="prediction-section">
                <h2>Dự Đoán Tốc Độ Nở</h2>
                <div class="prediction-content">
                    <div class="prediction-options">
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="fast">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">Nở nhanh</span>
                                <span class="time">(dưới 3 giây)</span>
                            </span>
                        </label>
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="medium">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">Nở vừa</span>
                                <span class="time">(3-5 giây)</span>
                            </span>
                        </label>
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="slow">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">Nở chậm</span>
                                <span class="time">(trên 5 giây)</span>
                            </span>
                        </label>
                    </div>
                    
                    <button id="startExperiment" class="experiment-btn primary" disabled>
                        Bắt Đầu Thí Nghiệm!
                    </button>
                </div>
            </div>

            <div class="results-section hidden">
                <h2>Kết Quả Thí Nghiệm</h2>
                <div class="results-content">
                    <div class="result-stats">
                        <div class="stat">
                            <span class="stat-label">Loại giấy:</span>
                            <span class="stat-value" id="resultMaterial">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Dự đoán:</span>
                            <span class="stat-value" id="resultPrediction">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Thời gian:</span>
                            <span class="stat-value" id="resultTime">-</span>
                        </div>
                    </div>
                    
                    <div class="result-message" id="resultMessage">
                    </div>
                    
                    <div class="action-buttons">
                        <button id="restartExperiment" class="experiment-btn secondary">
                            Thử Lại Nhé!
                        </button>
                        <button id="nextGame" class="experiment-btn next-game">
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flower-display">
            <div class="game-title-section">
                <h1 class="game-title">HOA YÊU THƯƠNG NỞ RỘ</h1>
                <div class="instruction-text">
                    <p>Chọn loại giấy và dự đoán tốc độ nở hoa!</p>
                </div>
            </div>

            <div class="flower-container">
                <div class="flower-stage">
                    <div class="flower" id="flower">
                    </div>
                    <div class="stem"></div>
                    <div class="leaf leaf-1"></div>
                    <div class="leaf leaf-2"></div>
                </div>
                
                <div class="water-droplets hidden" id="waterDroplets">
                    <div class="droplet d1"></div>
                    <div class="droplet d2"></div>
                    <div class="droplet d3"></div>
                </div>
            </div>
            
            <div class="experiment-progress hidden" id="experimentProgress">
                <div class="progress-text" id="progressText">Hoa đang uống nước...</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= $base_url ?>/public/JS/flower_mechanism.js"></script>
<script>
    window.baseUrl = window.baseUrl || "<?= $base_url ?>";
    window.gameName = window.gameName || "Hoa Yêu Thương Nở Rộ";
</script>
<?php require_once __DIR__ . '/../template/footer.php'; ?>