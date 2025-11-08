<?php
session_start();
$base_url = "http://" . $_SERVER['HTTP_HOST'] . "/SPNC_HocLieu_STEM_TieuHoc";

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
$first_visit = !isset($_SESSION['math_visited']);
$_SESSION['math_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Mặt Trời Toán Học - STEM Universe</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Fredoka+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/math.css?v=1.1">
</head>
<body>
    <div class="cosmic-universe">
        <div class="stars"></div>
    </div>

    <div class="universe-container">
        <header class="cosmic-header">
            <div class="header-content">
                <div class="mission-control">
                    <a href="<?php echo $base_url; ?>/views/main_lesson.php" class="nav-button">
                        <i class="fas fa-home"></i>
                    </a>
                </div>
                
                <div class="mission-title">
                    <h1>HỆ MẶT TRỜI TOÁN HỌC</h1>
                    <p>Khám phá 5 hành tinh số học</p>
                </div>
                
                <div class="mission-stats">
                    <div class="stat-orb xp-orb">
                        <div class="stat-value"><?php echo $subject['completed_xp']; ?></div>
                        <div class="stat-label">XP</div>
                    </div>
                    <div class="stat-orb streak-orb">
                        <div class="stat-value"><?php echo $subject['current_streak']; ?></div>
                        <div class="stat-label">NGÀY</div>
                    </div>
                </div>
            </div>
        </header>

        <section class="solar-system">
            <div class="sun">🧮</div>

            <div class="orbit orbit-1"></div>
            <div class="orbit orbit-2"></div>
            <div class="orbit orbit-3"></div>
            <div class="orbit orbit-4"></div>
            <div class="orbit orbit-5"></div>
            
            <div class="planet planet-1 completed" data-planet="1">🎯</div>
            <div class="planet planet-2 current" data-planet="2">📐</div>
            <div class="planet planet-3" data-planet="3">🧩</div>
            <div class="planet planet-4" data-planet="4">🔢</div>
            <div class="planet planet-5" data-planet="5">🛒</div>
        </section>
    </div>

    <div class="planet-info-overlay" id="planetInfoOverlay">
        <div class="planet-info">
            <button class="close-button" id="closeInfo">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="info-header">
                <div class="info-icon" id="infoIcon">🎯</div>
                <div class="info-title">
                    <h3 id="infoName">MÁY BẮN ĐÁ MINI</h3>
                    <span class="status" id="infoStatus">Đã hoàn thành</span>
                </div>
            </div>
            
            <p class="info-description" id="infoDescription">
                Chế tạo máy bắn đá mini học về lực và góc bắn
            </p>
            
            <div class="info-meta">
                <div class="info-time">
                    <i class="far fa-clock"></i>
                    <span id="infoTime">22 phút</span>
                </div>
                <div class="info-xp">
                    <i class="fas fa-bolt"></i>
                    <span id="infoXp">35 XP</span>
                </div>
            </div>
            
            <div class="activities-section">
                <h4 class="activities-title">Hoạt động</h4>
                <div class="activities-grid" id="activitiesGrid">
                </div>
            </div>
            
            <div class="info-actions">
                <button class="action-button action-primary" id="actionStart">
                    <i class="fas fa-play"></i>
                    Bắt đầu
                </button>
                <button class="action-button action-secondary" id="actionClose">
                    <i class="fas fa-times"></i>
                    Đóng
                </button>
            </div>
        </div>
    </div>

    <button class="cosmic-character" id="characterBtn">
        🐰
    </button>

    <script src="<?php echo $base_url; ?>/public/JS/math.js"></script>
</body>
</html>