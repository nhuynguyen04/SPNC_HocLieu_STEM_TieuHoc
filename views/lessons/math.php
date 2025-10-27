<?php
$math_data = [
    'name' => 'KHÁM PHÁ TOÁN HỌC',
    'color' => '#8B5CF6',
    'gradient' => 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    'icon' => '🧮',
    'description' => 'Khám phá thế giới số học đầy màu sắc!',
    'total_xp' => 320,
    'completed_xp' => 80,
    'current_streak' => 6,
    'character' => [
        'name' => 'Bạn Thỏ Toán Học',
        'avatar' => '🐰',
        'color' => '#7C3AED',
        'welcome_message' => 'Chào bạn nhỏ! Mình là Thỏ Toán Học! Cùng mình khám phá 5 chủ đề toán học siêu vui nhé! 🐰✨'
    ],
    'stats' => [
        'completed' => 1,
        'current' => 1,
        'upcoming' => 3,
        'total_xp' => 80
    ],
    'topics' => [
        [
            'id' => 1,
            'title' => 'MÁY BẮN ĐÁ MINI',
            'icon' => '🎯',
            'status' => 'completed',
            'color' => '#EF4444',
            'description' => 'Chế tạo máy bắn đá mini học về lực và góc bắn',
            'learning_time' => '22 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'LÀM MÁY BẮN ĐÁ',
                    'icon' => '🔨',
                    'description' => 'Hướng dẫn chế tạo máy bắn đá từ vật liệu đơn giản',
                    'status' => 'completed',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 2,
            'title' => 'NHẬN BIẾT GÓC',
            'icon' => '📐',
            'status' => 'current',
            'color' => '#3B82F6',
            'description' => 'Học về các loại góc qua video và trò chơi',
            'learning_time' => '18 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'VIDEO NHẬN BIẾT GÓC',
                    'icon' => '📺',
                    'description' => 'Xem video về góc vuông, góc nhọn, góc tù',
                    'status' => 'current',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI PHÂN LOẠI GÓC',
                    'icon' => '🎮',
                    'description' => 'Phân loại các loại góc khác nhau',
                    'status' => 'locked',
                    'xp' => 25
                ]
            ]
        ],
        [
            'id' => 3,
            'title' => 'TANGRAM 3D',
            'icon' => '🧩',
            'status' => 'upcoming',
            'color' => '#10B981',
            'description' => 'Khám phá tangram không gian 3 chiều thú vị',
            'learning_time' => '25 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'GIỚI THIỆU TANGRAM',
                    'icon' => '📺',
                    'description' => 'Video giới thiệu về tangram và lịch sử',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'puzzle',
                    'title' => 'GHÉP HÌNH TANGRAM',
                    'icon' => '🧠',
                    'description' => 'Thử thách ghép hình với tangram 3D',
                    'status' => 'locked',
                    'xp' => 40
                ]
            ]
        ],
        [
            'id' => 4,
            'title' => 'ĐẾM SỐ THÔNG MINH',
            'icon' => '🔢',
            'status' => 'upcoming',
            'color' => '#F59E0B',
            'description' => 'Học đếm số và nhận biết số qua video vui nhộn',
            'learning_time' => '20 phút',
            'activities' => [
                [
                    'type' => 'video',
                    'title' => 'VIDEO ĐẾM SỐ',
                    'icon' => '📺',
                    'description' => 'Video học đếm từ 1 đến 100',
                    'status' => 'locked',
                    'xp' => 25
                ],
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI ĐẾM SỐ',
                    'icon' => '🎲',
                    'description' => 'Luyện tập đếm số với trò chơi tương tác',
                    'status' => 'locked',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 5,
            'title' => 'SIÊU THỊ CỦA BÉ',
            'icon' => '🛒',
            'status' => 'upcoming',
            'color' => '#EC4899',
            'description' => 'Học cộng trừ và nhận biết tiền Việt Nam',
            'learning_time' => '28 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'GIỚI THIỆU TIỀN VN',
                    'icon' => '💵',
                    'description' => 'Nhận biết các mệnh giá tiền Việt Nam',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'simulation',
                    'title' => 'MUA SẮM SIÊU THỊ',
                    'icon' => '🏪',
                    'description' => 'Thực hành tính toán khi mua sắm',
                    'status' => 'locked',
                    'xp' => 45
                ]
            ]
        ]
    ]
];

$subject = $math_data;
$current_page = 'math';

$progress_percentage = ($subject['completed_xp'] / $subject['total_xp']) * 100;

session_start();
$first_visit = !isset($_SESSION['math_visited']);
$_SESSION['math_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject['name']; ?> - STEM Universe</title>
    <link rel="stylesheet" href="../../public/css/math.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="math-background">
        <div class="floating-shapes">
            <div class="shape shape-1">🔢</div>
            <div class="shape shape-2">➕</div>
            <div class="shape shape-3">➖</div>
            <div class="shape shape-4">✖️</div>
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
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        </div>
    </div>

    <main class="math-container">
        <header class="math-header">
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
                <h2>VƯƠNG QUỐC TOÁN HỌC</h2>
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
                            <div class="island-numbers">
                                <div class="number number-1">1</div>
                                <div class="number number-2">2</div>
                                <div class="number number-3">3</div>
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

    <script src="../../public/js/math.js"></script>
</body>
</html>