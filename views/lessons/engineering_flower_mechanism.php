<?php 
$page_title = "Hoa Yêu Thương Nở Rộ - Thí Nghiệm STEM";
require_once __DIR__ . '/../template/header.php'; 
?>

<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/flower_mechanism.css">

<div class="stem-experiment-container">
    <div class="experiment-layout">
        <!-- Panel thí nghiệm bên trái -->
        <div class="experiment-panel">
            <div class="material-section">
                <h2>🌸 Chọn Thiết Kế Hoa</h2>
                <div class="material-options">
                    <div class="material-card" data-material="thin">
                        <div class="material-icon">🌼</div>
                        <h3>Hoa Giấy Mỏng</h3>
                        <p>Hấp thụ nhanh, nở nhanh</p>
                        <div class="material-properties">
                            <span class="property">💧 Hút nước: Nhanh</span>
                        </div>
                    </div>
                    
                    <div class="material-card" data-material="thick">
                        <div class="material-icon">🌺</div>
                        <h3>Hoa Giấy Dày</h3>
                        <p>Hấp thụ chậm, nở chậm</p>
                        <div class="material-properties">
                            <span class="property">💧 Hút nước: Chậm</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="prediction-section">
                <h2>🎯 Dự Đoán Tốc Độ Nở</h2>
                <div class="prediction-content">
                    <div class="prediction-options">
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="fast">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">🚀 Nở nhanh</span>
                                <span class="time">(dưới 3 giây)</span>
                            </span>
                        </label>
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="medium">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">🐢 Nở vừa</span>
                                <span class="time">(3-5 giây)</span>
                            </span>
                        </label>
                        <label class="prediction-option">
                            <input type="radio" name="prediction" value="slow">
                            <span class="radio-custom"></span>
                            <span class="prediction-text">
                                <span class="speed">🐌 Nở chậm</span>
                                <span class="time">(trên 5 giây)</span>
                            </span>
                        </label>
                    </div>
                    
                    <button id="startExperiment" class="experiment-btn primary" disabled>
                        <span class="btn-icon">🌟</span>
                        Bắt Đầu Thí Nghiệm!
                    </button>
                </div>
            </div>

            <div class="results-section hidden">
                <h2>📊 Kết Quả Thí Nghiệm</h2>
                <div class="results-content">
                    <div class="result-stats">
                        <div class="stat">
                            <span class="stat-label">Loại giấy:</span>
                            <span class="stat-value" id="resultMaterial">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Dự đoán của bạn:</span>
                            <span class="stat-value" id="resultPrediction">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Thời gian nở:</span>
                            <span class="stat-value" id="resultTime">-</span>
                        </div>
                    </div>
                    
                    <div class="result-message" id="resultMessage">
                        <!-- Kết quả sẽ hiển thị ở đây -->
                    </div>
                    
                    <button id="restartExperiment" class="experiment-btn secondary">
                        <span class="btn-icon">🔄</span>
                        Thử Lại Nhé!
                    </button>
                </div>
            </div>
        </div>

        <!-- Khu vực hiển thị hoa bên phải -->
        <div class="flower-display">
            <div class="game-title">
                <h1>Hoa Yêu Thương Nở Rộ</h1>
            </div>

            <div class="instruction-text">
                <p>Chọn loại giấy và dự đoán tốc độ nở hoa!</p>
            </div>

            <div class="flower-container">
                <div class="flower-stage">
                    <div class="flower" id="flower">
                        <!-- Cánh hoa sẽ được tạo bằng JavaScript -->
                    </div>
                    <div class="stem"></div>
                    <div class="leaf leaf-1"></div>
                    <div class="leaf leaf-2"></div>
                </div>
                
                <div class="water-droplets hidden" id="waterDroplets">
                    <div class="droplet d1">💧</div>
                    <div class="droplet d2">💧</div>
                    <div class="droplet d3">💧</div>
                </div>
            </div>
            
            <div class="experiment-progress hidden" id="experimentProgress">
                <div class="progress-text" id="progressText">Hoa đang uống nước... 🌊</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= $base_url ?>/public/JS/flower_mechanism.js"></script>
<?php require_once __DIR__ . '/../template/footer.php'; ?>