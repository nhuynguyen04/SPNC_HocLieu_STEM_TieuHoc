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
        'upcoming' => 7,
        'total_xp' => 80
    ],
    'topics' => [
        [
            'id' => 1,
            'title' => 'MÁY BẮN ĐÁ MINI',
            'icon' => '🎯',
            'status' => 'completed',
            'color' => '#EF4444',
            'description' => 'Trò chơi máy bắn đá mini học về lực và góc bắn',
            'learning_time' => '22 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'CHẾ TẠO MÁY BẮN ĐÁ',
                    'icon' => '🎮',
                    'description' => 'Trò chơi chế tạo máy bắn đá từ vật liệu đơn giản',
                    'status' => 'completed',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 2,
            'title' => 'NHẬN BIẾT HÌNH HỌC',
            'icon' => '🔺',
            'status' => 'current',
            'color' => '#3B82F6',
            'description' => 'Trò chơi học về các hình học qua thử thách',
            'learning_time' => '18 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI NHẬN BIẾT GÓC',
                    'icon' => '🎯',
                    'description' => 'Trò chơi phân biệt góc vuông, góc nhọn, góc tù',
                    'status' => 'current',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'THỬ THÁCH HÌNH HỌC',
                    'icon' => '🧩',
                    'description' => 'Trò chơi phân loại các hình học khác nhau',
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
            'description' => 'Trò chơi tangram không gian 3 chiều thú vị',
            'learning_time' => '25 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'GIỚI THIỆU TANGRAM 3D',
                    'icon' => '🎮',
                    'description' => 'Trò chơi làm quen với tangram 3D',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'GHÉP HÌNH TANGRAM 3D',
                    'icon' => '🔷',
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
            'description' => 'Trò chơi học đếm số và nhận biết số thú vị',
            'learning_time' => '20 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI ĐẾM SỐ',
                    'icon' => '🎲',
                    'description' => 'Trò chơi học đếm từ 1 đến 100',
                    'status' => 'locked',
                    'xp' => 25
                ],
                [
                    'type' => 'game',
                    'title' => 'THỬ THÁCH ĐẾM SỐ',
                    'icon' => '⭐',
                    'description' => 'Trò chơi luyện tập đếm số tương tác',
                    'status' => 'locked',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 5,
            'title' => 'ĐỒNG HỒ THỜI GIAN',
            'icon' => '⏰',
            'status' => 'upcoming',
            'color' => '#EC4899',
            'description' => 'Trò chơi học xem đồng hồ và quản lý thời gian',
            'learning_time' => '28 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI ĐỒNG HỒ',
                    'icon' => '🕹️',
                    'description' => 'Trò chơi học xem giờ và đặt đồng hồ',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'QUẢN LÝ THỜI GIAN',
                    'icon' => '⏳',
                    'description' => 'Trò chơi thực hành quản lý thời gian hàng ngày',
                    'status' => 'locked',
                    'xp' => 45
                ]
            ]
        ],
        [
            'id' => 6,
            'title' => 'PHÉP ĐỐI XỨNG DIỆU KỲ',
            'icon' => '🦋',
            'status' => 'upcoming',
            'color' => '#EC4899',
            'description' => 'Khám phá phép đối xứng qua các hình ảnh và trò chơi thú vị',
            'learning_time' => '30 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI ĐỐI XỨNG',
                    'icon' => '🎮',
                    'description' => 'Trò chơi nhận biết và tạo hình đối xứng',
                    'status' => 'locked',
                    'xp' => 35
                ],
                [
                    'type' => 'puzzle',
                    'title' => 'GHÉP HÌNH ĐỐI XỨNG',
                    'icon' => '🧩',
                    'description' => 'Thử thách ghép hình đối xứng hoàn chỉnh',
                    'status' => 'locked',
                    'xp' => 40
                ]
            ]
        ],
        [
            'id' => 7,
            'title' => 'SIÊU THỊ CỦA BÉ',
            'icon' => '🛒',
            'status' => 'upcoming',
            'color' => '#10B981',
            'description' => 'Học toán qua mô phỏng mua sắm tại siêu thị',
            'learning_time' => '35 phút',
            'activities' => [
                [
                    'type' => 'simulation',
                    'title' => 'MUA SẮM THÔNG MINH',
                    'icon' => '💰',
                    'description' => 'Mô phỏng mua sắm và tính tiền tại siêu thị',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'game',
                    'title' => 'TÍNH TIỀN NHANH',
                    'icon' => '⚡',
                    'description' => 'Trò chơi tính toán tổng tiền mua hàng',
                    'status' => 'locked',
                    'xp' => 45
                ]
            ]
        ],
        [
            'id' => 8,
            'title' => 'MÊ CUNG SỐ HỌC',
            'icon' => '🌀',
            'status' => 'upcoming',
            'color' => '#F59E0B',
            'description' => 'Giải cứu qua mê cung bằng cách giải các bài toán số học',
            'learning_time' => '40 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'THÁM HIỂM MÊ CUNG',
                    'icon' => '🗺️',
                    'description' => 'Trò chơi giải toán để tìm đường ra mê cung',
                    'status' => 'locked',
                    'xp' => 40
                ],
                [
                    'type' => 'puzzle',
                    'title' => 'CÂU ĐỐ MÊ CUNG',
                    'icon' => '🔐',
                    'description' => 'Giải câu đố toán học để mở khóa mê cung',
                    'status' => 'locked',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 9,
            'title' => 'SẮP XẾP THEO QUY LUẬT',
            'icon' => '🔢',
            'status' => 'upcoming',
            'color' => '#3B82F6',
            'description' => 'Nhận biết và áp dụng các quy luật sắp xếp trong toán học',
            'learning_time' => '25 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TÌM QUY LUẬT',
                    'icon' => '🎯',
                    'description' => 'Trò chơi phát hiện quy luật trong dãy số',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'puzzle',
                    'title' => 'SẮP XẾP THÔNG MINH',
                    'icon' => '🧠',
                    'description' => 'Thử thách sắp xếp theo quy luật logic',
                    'status' => 'locked',
                    'xp' => 25
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
    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/math.css?v=<?= time() ?>">
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
                    <p>Khám phá 9 hành tinh số học</p>
                </div>
                
                <div class="mission-stats">
                    <div class="stat-orb xp-orb">
                        <div class="stat-value">80</div>
                        <div class="stat-label">XP</div>
                    </div>
                    <div class="stat-orb streak-orb">
                        <div class="stat-value">6</div>
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
            <div class="orbit orbit-6"></div>
            <div class="orbit orbit-7"></div>
            <div class="orbit orbit-8"></div>
            <div class="orbit orbit-9"></div>
            
            <div class="planet planet-1 completed" data-planet="1">🎯</div>
            <div class="planet planet-2 current" data-planet="2">🔺</div>
            <div class="planet planet-3" data-planet="3">🧩</div>
            <div class="planet planet-4" data-planet="4">🔢</div>
            <div class="planet planet-5" data-planet="5">⏰</div>
            <div class="planet planet-6" data-planet="6">🦋</div>
            <div class="planet planet-7" data-planet="7">🛒</div>
            <div class="planet planet-8" data-planet="8">🌀</div>
            <div class="planet planet-9" data-planet="9">🔢</div>
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
        </div>
    </div>

    <button class="cosmic-character" id="characterBtn">
        🐰
    </button>
    <script>window.baseUrl = "<?php echo $base_url; ?>";</script>
    <script src="<?php echo $base_url; ?>/public/JS/math.js?v=<?= time() ?>"></script>
</body>
</html>