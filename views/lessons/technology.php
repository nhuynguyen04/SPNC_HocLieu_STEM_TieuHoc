<?php
$technology_data = [
    'name' => 'KHÁM PHÁ CÔNG NGHỆ',
    'color' => '#3B82F6',
    'gradient' => 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    'icon' => '💻',
    'description' => 'Khám phá thế giới công nghệ đầy thú vị!',
    'total_xp' => 300,
    'completed_xp' => 75,
    'current_streak' => 5,
    'character' => [
        'name' => 'Bạn Robot Công Nghệ',
        'avatar' => '🤖',
        'color' => '#2563EB',
        'welcome_message' => 'Xin chào! Mình là Robot Công Nghệ! Cùng mình khám phá 5 chủ đề công nghệ siêu thú vị nhé! 🤖✨'
    ],
    'stats' => [
        'completed' => 1,
        'current' => 1,
        'upcoming' => 3,
        'total_xp' => 75
    ],
    'topics' => [
        [
            'id' => 1,
            'title' => 'CÂY GIA ĐÌNH',
            'icon' => '🌳',
            'status' => 'completed',
            'color' => '#10B981',
            'description' => 'Tìm hiểu về các mối quan hệ gia đình qua cây phả hệ',
            'learning_time' => '20 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI CÂY GIA ĐÌNH',
                    'icon' => '🎮',
                    'description' => 'Xây dựng cây phả hệ gia đình',
                    'status' => 'completed',
                    'xp' => 25
                ]
            ]
        ],
        [
            'id' => 2,
            'title' => 'EM LÀ HỌA SĨ MÁY TÍNH',
            'icon' => '🎨',
            'status' => 'current',
            'color' => '#EC4899',
            'description' => 'Khám phá các công cụ vẽ đơn giản trên máy tính',
            'learning_time' => '25 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'GIỚI THIỆU CÔNG CỤ VẼ',
                    'icon' => '📝',
                    'description' => 'Tìm hiểu các công cụ vẽ cơ bản',
                    'status' => 'current',
                    'xp' => 30
                ],
                [
                    'type' => 'share',
                    'title' => 'CHIA SẺ TÁC PHẨM',
                    'icon' => '🖼️',
                    'description' => 'Chia sẻ bức vẽ của bạn với mọi người',
                    'status' => 'locked',
                    'xp' => 20
                ]
            ]
        ],
        [
            'id' => 3,
            'title' => 'AN TOÀN TRÊN INTERNET',
            'icon' => '🛡️',
            'status' => 'upcoming',
            'color' => '#F59E0B',
            'description' => 'Học các quy tắc cơ bản khi sử dụng Internet',
            'learning_time' => '18 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'QUY TẮC INTERNET',
                    'icon' => '📺',
                    'description' => 'Xem video về an toàn trên mạng',
                    'status' => 'locked',
                    'xp' => 25
                ],
                [
                    'type' => 'question',
                    'title' => 'TRẢ LỜI CÂU HỎI',
                    'icon' => '❓',
                    'description' => 'Kiểm tra kiến thức an toàn mạng',
                    'status' => 'locked',
                    'xp' => 25
                ]
            ]
        ],
        [
            'id' => 4,
            'title' => 'LẬP TRÌNH VIÊN NHÍ VỚI SCRATCH',
            'icon' => '🧩',
            'status' => 'upcoming',
            'color' => '#8B5CF6',
            'description' => 'Làm quen với lập trình qua nền tảng Scratch',
            'learning_time' => '30 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'GIỚI THIỆU SCRATCH',
                    'icon' => '📺',
                    'description' => 'Xem video giới thiệu về Scratch',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'THỰC HÀNH SCRATCH',
                    'icon' => '🎮',
                    'description' => 'Thực hành lập trình đơn giản',
                    'status' => 'locked',
                    'xp' => 40
                ]
            ]
        ],
        [
            'id' => 5,
            'title' => 'CÁC BỘ PHẬN CỦA MÁY TÍNH',
            'icon' => '💻',
            'status' => 'upcoming',
            'color' => '#6366F1',
            'description' => 'Tìm hiểu các thành phần cơ bản của máy tính',
            'learning_time' => '22 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'GIỚI THIỆU BỘ PHẬN MÁY TÍNH',
                    'icon' => '📺',
                    'description' => 'Xem video về các bộ phận máy tính',
                    'status' => 'locked',
                    'xp' => 25
                ],
                [
                    'type' => 'game',
                    'title' => 'GHÉP BỘ PHẬN MÁY TÍNH',
                    'icon' => '🧩',
                    'description' => 'Trò chơi ghép các bộ phận máy tính',
                    'status' => 'locked',
                    'xp' => 35
                ]
            ]
        ]
    ]
];

$subject = $technology_data;
$current_page = 'technology';

$progress_percentage = ($subject['completed_xp'] / $subject['total_xp']) * 100;

session_start();
$first_visit = !isset($_SESSION['technology_visited']);
$_SESSION['technology_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject['name']; ?> - STEM Universe</title>
    <link rel="stylesheet" href="../../public/css/technology.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="technology-background">
        <div class="floating-shapes">
            <div class="shape shape-1">💻</div>
            <div class="shape shape-2">🌐</div>
            <div class="shape shape-3">🔧</div>
            <div class="shape shape-4">⚙️</div>
        </div>
        <div class="background-pattern"></div>
    </div>

    <div class="character-dialog <?php echo $first_visit ? 'show' : ''; ?>" id="characterDialog">
        <div class="dialog-content">
            <div class="character-avatar" style="background: <?php echo $subject['character']['color']; ?>">
                <?php echo $subject['character']['avatar']; ?>
            </div>
            <div class="dialog-message">
                <div class="character-name"><?php echo $subject['character']['name']; ?></div>
                <p id="dialogText"><?php echo $subject['character']['welcome_message']; ?></p>
                <button class="dialog-button" id="dialogButton">
                    <span>Bắt đầu thôi!</span>
                    <i class="fas fa-rocket"></i>
                </button>
            </div>
        </div>
    </div>

    <main class="technology-container">
        <header class="technology-header">
            <div class="header-content">
                <a href="../main_lesson.php" class="back-button">
                    <i class="fas fa-home"></i>
                </a>
                
                <div class="header-main">
                    <div class="subject-info">
                        <div class="subject-icon">
                            <?php echo $subject['icon']; ?>
                        </div>
                        <div class="subject-details">
                            <h1><?php echo $subject['name']; ?></h1>
                            <p><?php echo $subject['description']; ?></p>
                        </div>
                    </div>
                    
                    <div class="header-stats">
                        <div class="xp-display">
                            <div class="xp-chart" style="background: conic-gradient(var(--primary) <?php echo $progress_percentage; ?>%, var(--border) 0);">
                                <div class="xp-chart-content">
                                    <div class="xp-chart-number"><?php echo $subject['completed_xp']; ?></div>
                                    <div class="xp-chart-label">XP</div>
                                </div>
                            </div>
                            <div class="xp-info">
                                <div class="xp-text">Đã đạt được</div>
                                <div class="xp-total">/ <?php echo $subject['total_xp']; ?> XP</div>
                            </div>
                        </div>
                        
                        <div class="streak-display">
                            <div class="streak-badge">
                                <i class="fas fa-fire"></i>
                                <span class="streak-count"><?php echo $subject['current_streak']; ?> ngày</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="adventure-map">
            <div class="map-header">
                <h2>HÀNH TRÌNH CÔNG NGHỆ</h2>
                <p>Chọn một chủ đề để bắt đầu khám phá!</p>
            </div>

            <div class="islands-container">
                <?php foreach ($subject['topics'] as $topic): ?>
                <div class="island <?php echo $topic['status']; ?>" data-topic="<?php echo $topic['id']; ?>">
                    <div class="island-content">
                        <div class="island-shape" style="background: <?php echo $topic['color']; ?>">
                            <div class="island-flag">
                                <?php echo $topic['icon']; ?>
                            </div>
                            <div class="island-trees">
                                <div class="tree tree-1">💡</div>
                                <div class="tree tree-2">🔌</div>
                            </div>
                        </div>
                        
                        <div class="island-info">
                            <h3 class="island-title"><?php echo $topic['title']; ?></h3>
                            <p class="island-description"><?php echo $topic['description']; ?></p>
                            
                            <div class="learning-time">
                                <i class="far fa-clock"></i>
                                <span><?php echo $topic['learning_time']; ?></span>
                            </div>
                            
                            <div class="island-activities">
                                <?php foreach ($topic['activities'] as $activity): ?>
                                <div class="activity-badge <?php echo $activity['status']; ?>">
                                    <span class="activity-emoji"><?php echo $activity['icon']; ?></span>
                                    <span class="activity-text"><?php echo $activity['title']; ?></span>
                                </div>
                                <?php endforeach; ?>
                            </div>
                            
                            <div class="island-action">
                                <?php if ($topic['status'] == 'completed'): ?>
                                    <button class="island-btn review" onclick="reviewTopic(<?php echo $topic['id']; ?>)">
                                        <i class="fas fa-redo"></i>
                                        <span>Ôn tập lại</span>
                                    </button>
                                <?php elseif ($topic['status'] == 'current'): ?>
                                    <button class="island-btn start" onclick="startTopic(<?php echo $topic['id']; ?>)">
                                        <i class="fas fa-play"></i>
                                        <span>Bắt đầu học</span>
                                    </button>
                                <?php else: ?>
                                    <button class="island-btn locked" disabled>
                                        <i class="fas fa-lock"></i>
                                        <span>Chờ mở khóa</span>
                                    </button>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>

                    <div class="ocean-waves">
                        <div class="wave wave-1"></div>
                        <div class="wave wave-2"></div>
                        <div class="wave wave-3"></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
    </main>

    <button class="character-float-btn" id="characterFloatBtn" style="background: <?php echo $subject['character']['color']; ?>">
        <?php echo $subject['character']['avatar']; ?>
        <div class="pulse-ring"></div>
    </button>

    <script src="../../public/js/technology.js"></script>
</body>
</html>