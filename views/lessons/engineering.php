<?php
session_start();
$base_url = "http://" . $_SERVER['HTTP_HOST'] . "/SPNC_HocLieu_STEM_TieuHoc";

$engineering_data = [
    'name' => 'KHÁM PHÁ KỸ THUẬT',
    'color' => '#F59E0B',
    'gradient' => 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    'icon' => '⚙️',
    'description' => 'Sáng tạo và xây dựng thế giới quanh em!',
    'total_xp' => 280,
    'completed_xp' => 60,
    'current_streak' => 4,
    'character' => [
        'name' => 'Bạn Thợ Máy Thông Thái',
        'avatar' => '👷‍♂️',
        'color' => '#D97706',
        'welcome_message' => 'Chào nhà kỹ sư nhí! Mình là Thợ Máy Thông Thái! Cùng mình chế tạo 5 dự án siêu thú vị nhé! 👷‍♂️✨'
    ],
    'stats' => [
        'completed' => 1,
        'current' => 1,
        'upcoming' => 3,
        'total_xp' => 60
    ],
    'topics' => [
        [
            'id' => 1,
            'title' => 'DỤNG CỤ GẤP ÁO',
            'icon' => '👕',
            'status' => 'completed',
            'color' => '#3B82F6',
            'description' => 'Tự chế dụng cụ gấp áo thông minh và tiện lợi',
            'learning_time' => '25 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'HƯỚNG DẪN LÀM DỤNG CỤ',
                    'icon' => '📐',
                    'description' => 'Học cách tạo dụng cụ gấp áo từ bìa cứng',
                    'status' => 'completed',
                    'xp' => 30
                ]
            ]
        ],
        [
            'id' => 2,
            'title' => 'HOA YÊU THƯƠNG NỞ RỘ',
            'icon' => '🌺',
            'status' => 'current',
            'color' => '#EC4899',
            'description' => 'Thiết kế hoa giấy cơ học nở rộ khi kéo dây',
            'learning_time' => '30 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'THIẾT KẾ CƠ CẤU',
                    'icon' => '🎨',
                    'description' => 'Học về cơ cấu cánh hoa chuyển động',
                    'status' => 'current',
                    'xp' => 35
                ],
                [
                    'type' => 'question',
                    'title' => 'TRẢ LỜI CÂU HỎI',
                    'icon' => '❓',
                    'description' => 'Kiểm tra kiến thức về cơ cấu chuyển động',
                    'status' => 'locked',
                    'xp' => 25
                ]
            ]
        ],
        [
            'id' => 3,
            'title' => 'XÂY CẦU GIẤY',
            'icon' => '🌉',
            'status' => 'upcoming',
            'color' => '#8B5CF6',
            'description' => 'Thiết kế và xây dựng cầu từ giấy A4 chịu lực',
            'learning_time' => '35 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'KỸ THUẬT XÂY CẦU',
                    'icon' => '📐',
                    'description' => 'Học về kết cấu và nguyên lý chịu lực',
                    'status' => 'locked',
                    'xp' => 40
                ],
                [
                    'type' => 'challenge',
                    'title' => 'THỬ THÁCH CẦU GIẤY',
                    'icon' => '🏗️',
                    'description' => 'Xây cầu chịu được trọng lượng lớn nhất',
                    'status' => 'locked',
                    'xp' => 35
                ]
            ]
        ],
        [
            'id' => 4,
            'title' => 'CHẾ TẠO XE BONG BÓNG',
            'icon' => '🚗',
            'status' => 'upcoming',
            'color' => '#06B6D4',
            'description' => 'Tạo xe chạy bằng lực đẩy từ bong bóng xà phòng',
            'learning_time' => '28 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'NGUYÊN LÝ ĐẨY',
                    'icon' => '💨',
                    'description' => 'Tìm hiểu về lực đẩy từ khí nén',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'experiment',
                    'title' => 'THÍ NGHIỆM XE BONG BÓNG',
                    'icon' => '🧪',
                    'description' => 'Chế tạo và thử nghiệm xe bong bóng',
                    'status' => 'locked',
                    'xp' => 40
                ]
            ]
        ],
        [
            'id' => 5,
            'title' => 'THÁP GIẤY CAO NHẤT',
            'icon' => '🗼',
            'status' => 'upcoming',
            'color' => '#10B981',
            'description' => 'Thi đua xây tháp giấy cao và vững chắc nhất',
            'learning_time' => '32 phút',
            'activities' => [
                [
                    'type' => 'tutorial',
                    'title' => 'KỸ THUẬT XÂY THÁP',
                    'icon' => '📏',
                    'description' => 'Học về cân bằng và kết cấu tháp',
                    'status' => 'locked',
                    'xp' => 35
                ],
                [
                    'type' => 'competition',
                    'title' => 'CUỘC THI THÁP GIẤY',
                    'icon' => '🏆',
                    'description' => 'Thi xây tháp cao nhất trong 15 phút',
                    'status' => 'locked',
                    'xp' => 45
                ]
            ]
        ]
    ]
];

$subject = $engineering_data;
$current_page = 'engineering';
$progress_percentage = ($subject['completed_xp'] / $subject['total_xp']) * 100;
$first_visit = !isset($_SESSION['engineering_visited']);
$_SESSION['engineering_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Mặt Trời Kỹ Thuật - STEM Universe</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Fredoka+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>/public/CSS/engineering.css">
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
                    <h1>HỆ MẶT TRỜI KỸ THUẬT</h1>
                    <p>Khám phá 5 hành tinh sáng tạo</p>
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
            <div class="sun">⚙️</div>

            <div class="orbit orbit-1"></div>
            <div class="orbit orbit-2"></div>
            <div class="orbit orbit-3"></div>
            <div class="orbit orbit-4"></div>
            <div class="orbit orbit-5"></div>
            
            <div class="planet planet-1 completed" data-planet="1">👕</div>
            <div class="planet planet-2 current" data-planet="2">🌺</div>
            <div class="planet planet-3" data-planet="3">🌉</div>
            <div class="planet planet-4" data-planet="4">🚗</div>
            <div class="planet planet-5" data-planet="5">🗼</div>
        </section>
    </div>

    <div class="planet-info-overlay" id="planetInfoOverlay">
        <div class="planet-info">
            <button class="close-button" id="closeInfo">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="info-header">
                <div class="info-icon" id="infoIcon">👕</div>
                <div class="info-title">
                    <h3 id="infoName">DỤNG CỤ GẤP ÁO</h3>
                    <span class="status" id="infoStatus">Đã hoàn thành</span>
                </div>
            </div>
            
            <p class="info-description" id="infoDescription">
                Tự chế dụng cụ gấp áo thông minh và tiện lợi
            </p>
            
            <div class="info-meta">
                <div class="info-time">
                    <i class="far fa-clock"></i>
                    <span id="infoTime">25 phút</span>
                </div>
                <div class="info-xp">
                    <i class="fas fa-bolt"></i>
                    <span id="infoXp">30 XP</span>
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
        👷‍♂️
    </button>
    
    <script src="<?php echo $base_url; ?>/public/JS/engineering.js?v=1.1"></script>
</body>
</html>