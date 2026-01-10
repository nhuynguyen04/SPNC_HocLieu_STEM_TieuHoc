<?php
require_once __DIR__ . '/../template/header.php';
?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/shapes_game.css?v=<?php echo time(); ?>">
<link rel="stylesheet" href="<?= $base_url ?>/public/CSS/home.css">

<div class="game-wrapper"> <br><br><br><br>
    <div class="game-stats-bar">
        <div class="stats-container">
            <div class="stat-item">
                <span class="stat-label">Thời gian:</span>
                <span class="stat-value" id="timer">00:00</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Điểm:</span>
                <span class="stat-value" id="score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Hoàn thành:</span>
                <span class="stat-value" id="completedCount">0/6</span>
            </div>
        </div>
    </div>
    
    <div class="game-container">
        <div class="left-panel">
            <div class="mission-card">
                <div class="mission-header">
                    <h2>Thử thách hình học</h2>
                    <div class="challenge-counter">
                        <span class="current-challenge" id="currentChallenge">1</span>
                        <span class="total-challenges">/6</span>
                    </div>
                </div>
                
                <div class="mission-content">
                    <div class="challenge-info">
                        <div class="shape-icon-large" id="shapeIcon">🟦</div>
                        <div class="challenge-text">
                            <h3 id="challengeTitle">Hình vuông</h3>
                            <p class="challenge-desc" id="challengeDesc">4 cạnh bằng nhau, 4 góc vuông</p>
                        </div>
                    </div>
                    
                    <div class="challenge-question">
                        <h4>Yêu cầu:</h4>
                        <p class="question-text" id="questionText">
                            "Biến hình vuông thành hình chữ nhật bằng cách điều chỉnh các điểm."
                        </p>
                    </div>
                    
                    <div class="hint-section">
                        <button class="hint-btn" id="showHint">
                            <span class="hint-text">Xem đặc điểm hình cần tạo</span>
                        </button>
                        <div class="hint-content" id="hintContent">
                            <p><strong>Đặc điểm hình chữ nhật:</strong></p>
                            <ul>
                                <li>4 góc vuông (90°)</li>
                                <li>Các cạnh đối bằng nhau</li>
                                <li>Các cạnh đối song song</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="knowledge-card">
                <h2>Kiến thức hình học</h2>
                <div class="knowledge-content" id="knowledgeContent">
                    <div class="fact-item">
                        <div class="fact-text">
                            <strong>Hình vuông:</strong> 4 cạnh bằng nhau, 4 góc vuông
                        </div>
                    </div>
                    <div class="fact-item">
                        <div class="fact-text">
                            <strong>Hình chữ nhật:</strong> Các cạnh đối bằng nhau, 4 góc vuông
                        </div>
                    </div>
                    <div class="fun-fact" id="funFact">
                        Mọi hình vuông đều là hình chữ nhật, nhưng không phải mọi hình chữ nhật đều là hình vuông!
                    </div>
                </div>
            </div>
        </div>
        
        <div class="center-panel">
            <div class="game-area">
                <div class="game-title">
                    <h1>Biến hình sáng tạo</h1>
                    <p class="game-subtitle">Tự do kéo các điểm để tạo hình theo yêu cầu!</p>
                </div>
                
                <div class="play-area">
                    <div class="shape-status">
                        <div class="current-shape">
                            <span>Hình hiện tại: </span>
                            <span class="shape-name" id="currentShapeName">Hình vuông</span>
                        </div>
                        <div class="target-shape">
                            <span>Yêu cầu: </span>
                            <span class="shape-name target" id="targetShapeName">Hình chữ nhật</span>
                        </div>
                    </div>
                    
                    <div class="canvas-container">
                        <canvas id="shapeCanvas" width="500" height="400"></canvas>
                        
                        <div class="draggable-point" id="pointA" data-point="A">
                            <div class="point-circle"></div>
                        </div>
                        <div class="draggable-point" id="pointB" data-point="B">
                            <div class="point-circle"></div>
                        </div>
                        <div class="draggable-point" id="pointC" data-point="C">
                            <div class="point-circle"></div>
                        </div>
                        <div class="draggable-point" id="pointD" data-point="D">
                            <div class="point-circle"></div>
                        </div>
                    </div>
                    
                    <div class="controls">
                        <button id="checkBtn" class="control-btn primary-btn">
                            <span class="btn-text">Kiểm tra hình</span>
                        </button>
                        <button id="resetBtn" class="control-btn secondary-btn">
                            <span class="btn-icon">↻</span>
                            <span class="btn-text">Bắt đầu lại</span>
                        </button>
                        <button id="showAnswerBtn" class="control-btn tertiary-btn">
                            <span class="btn-text">Xem ví dụ</span>
                        </button>
                    </div>
                    
                    <div class="feedback-container">
                        <div class="feedback-message" id="feedbackMessage">
                            <div class="feedback-content">
                                <span class="feedback-text" id="feedbackText">
                                    Hãy kéo các điểm màu xanh để biến hình vuông thành hình chữ nhật!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="right-panel">
            <div class="next-challenge-card">
                <h2>Thử thách tiếp theo</h2>
                <div class="next-challenge-info">
                    <div class="next-challenge-details">
                        <h3 id="nextShapeName">Hình chữ nhật</h3>
                        <p class="next-challenge-desc" id="nextShapeDesc">
                            Chờ hoàn thành thử thách hiện tại
                        </p>
                    </div>
                </div>
                <button id="nextChallengeBtn" class="next-challenge-btn" disabled>
                    <span class="btn-text">Mở khóa tiếp theo</span>
                </button>
            </div>
            
            <div class="shape-progress">
                <h2>Tiến độ học tập</h2>
                <div class="progress-grid">
                    <div class="progress-item completed" data-shape="square">
                        <span class="progress-name">Hình vuông</span>
                        <span class="progress-status">✓</span>
                    </div>
                    <div class="progress-item" data-shape="rectangle" id="progressRectangle">
                        <span class="progress-name">Hình chữ nhật</span>
                        <span class="progress-status">•</span>
                    </div>
                    <div class="progress-item" data-shape="triangle" id="progressTriangle">
                        <span class="progress-name">Tam giác</span>
                        <span class="progress-status">•</span>
                    </div>
                    <div class="progress-item" data-shape="trapezoid" id="progressTrapezoid">
                        <span class="progress-name">Hình thang</span>
                        <span class="progress-status">•</span>
                    </div>
                    <div class="progress-item" data-shape="parallelogram" id="progressParallelogram">
                        <span class="progress-name">Hình bình hành</span>
                        <span class="progress-status">•</span>
                    </div>
                    <div class="progress-item" data-shape="rhombus" id="progressRhombus">
                        <span class="progress-name">Hình thoi</span>
                        <span class="progress-status">•</span>
                    </div>
                </div>
            </div>
            
            <div class="shape-tips">
                <h2>Mẹo nhận biết hình</h2>
                <div class="tips-content" id="shapeTips">
                    <p><strong>Để nhận biết hình:</strong></p>
                    <ul>
                        <li>Đếm số cạnh</li>
                        <li>Đo độ dài các cạnh</li>
                        <li>Kiểm tra góc vuông</li>
                        <li>Kiểm tra cạnh song song</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    window.baseUrl = window.baseUrl || "<?= $base_url ?>";
    window.gameData = <?= json_encode([
        'challenges' => [
            [
                'id' => 1,
                'title' => 'Hình vuông → Hình chữ nhật',
                'description' => '4 góc vuông, cạnh đối bằng nhau',
                'question' => 'Biến hình vuông thành hình chữ nhật bằng cách điều chỉnh các điểm.',
                'startingShape' => 'square',
                'targetShape' => 'rectangle',
                'startingPoints' => [[150,100], [250,100], [250,200], [150,200]],
                'hint' => 'Hình chữ nhật: 4 góc vuông, các cạnh đối bằng nhau và song song.',
                'knowledge' => 'Hình chữ nhật là tứ giác có 4 góc vuông. Các cạnh đối song song và bằng nhau.',
                'funFact' => 'Mọi hình vuông đều là hình chữ nhật, nhưng không phải mọi hình chữ nhật đều là hình vuông!',
                'tips' => 'Kiểm tra: 1) Có 4 góc 90° không? 2) Các cạnh đối có bằng nhau không?',
                'nextShape' => 'triangle'
            ],
            [
                'id' => 2,
                'title' => 'Hình vuông → Tam giác vuông cân',
                'description' => '3 cạnh, có góc vuông, 2 cạnh góc vuông bằng nhau',
                'question' => 'Biến hình vuông thành tam giác vuông cân.',
                'startingShape' => 'square',
                'targetShape' => 'triangle',
                'startingPoints' => [[150,100], [250,100], [250,200], [150,200]],
                'hint' => 'Tam giác vuông cân: Có 1 góc 90°, 2 cạnh góc vuông bằng nhau.',
                'knowledge' => 'Tam giác vuông cân có 1 góc vuông và 2 cạnh góc vuông bằng nhau.',
                'funFact' => 'Trong tam giác vuông cân, 2 góc nhọn bằng nhau và mỗi góc là 45°!',
                'tips' => 'Kiểm tra: 1) Có đúng 3 cạnh không? 2) Có góc 90° không? 3) 2 cạnh góc vuông có bằng nhau không?',
                'nextShape' => 'trapezoid'
            ],
            [
                'id' => 3,
                'title' => 'Hình vuông → Hình thang vuông',
                'description' => 'Có cặp cạnh song song và góc vuông',
                'question' => 'Biến hình vuông thành hình thang vuông.',
                'startingShape' => 'square',
                'targetShape' => 'trapezoid',
                'startingPoints' => [[150,100], [250,100], [250,200], [150,200]],
                'hint' => 'Hình thang vuông: Có ít nhất 1 cặp cạnh song song và 1 góc vuông.',
                'knowledge' => 'Hình thang là tứ giác có ít nhất một cặp cạnh đối song song.',
                'funFact' => 'Hình thang vuông thường gặp trong kiến trúc như mặt cắt của các bậc thang!',
                'tips' => 'Kiểm tra: 1) Có cặp cạnh song song không? 2) Có góc vuông không?',
                'nextShape' => 'parallelogram'
            ],
            [
                'id' => 4,
                'title' => 'Hình vuông → Hình bình hành',
                'description' => 'Các cạnh đối song song và bằng nhau',
                'question' => 'Biến hình vuông thành hình bình hành.',
                'startingShape' => 'square',
                'targetShape' => 'parallelogram',
                'startingPoints' => [[150,100], [250,100], [250,200], [150,200]],
                'hint' => 'Hình bình hành: Các cạnh đối song song và bằng nhau.',
                'knowledge' => 'Hình bình hành có các góc đối bằng nhau và các cạnh đối bằng nhau.',
                'funFact' => 'Hình bình hành có tâm đối xứng là giao điểm của hai đường chéo!',
                'tips' => 'Kiểm tra: 1) Các cạnh đối có song song không? 2) Các cạnh đối có bằng nhau không?',
                'nextShape' => 'rhombus'
            ],
            [
                'id' => 5,
                'title' => 'Hình vuông → Hình thoi',
                'description' => '4 cạnh bằng nhau',
                'question' => 'Biến hình vuông thành hình thoi.',
                'startingShape' => 'square',
                'targetShape' => 'rhombus',
                'startingPoints' => [[150,100], [250,100], [250,200], [150,200]],
                'hint' => 'Hình thoi: 4 cạnh bằng nhau, các cạnh đối song song.',
                'knowledge' => 'Hình thoi có các đường chéo vuông góc với nhau.',
                'funFact' => 'Hình thoi là hình bình hành đặc biệt có 4 cạnh bằng nhau!',
                'tips' => 'Kiểm tra: 1) 4 cạnh có bằng nhau không? 2) Các cạnh đối có song song không?',
                'nextShape' => 'square2'
            ],
            [
                'id' => 6,
                'title' => 'Hình thoi → Hình vuông',
                'description' => '4 cạnh bằng nhau, 4 góc vuông',
                'question' => 'Biến hình thoi thành hình vuông.',
                'startingShape' => 'rhombus',
                'targetShape' => 'square',
                'startingPoints' => [[200,50], [300,150], [200,250], [100,150]],
                'hint' => 'Hình vuông: 4 cạnh bằng nhau và 4 góc vuông.',
                'knowledge' => 'Hình vuông là hình chữ nhật đặc biệt và cũng là hình thoi đặc biệt.',
                'funFact' => 'Hình vuông có đến 4 trục đối xứng và 1 tâm đối xứng!',
                'tips' => 'Kiểm tra: 1) 4 cạnh có bằng nhau không? 2) Có 4 góc 90° không?',
                'nextShape' => null
            ]
        ]
    ]) ?>;
</script>
<script src="<?= $base_url ?>/public/JS/shapes_game.js"></script>

<?php
require_once __DIR__ . '/../template/footer.php';
?>