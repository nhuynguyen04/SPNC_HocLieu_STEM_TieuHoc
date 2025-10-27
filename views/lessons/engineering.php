<?php
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

session_start();
$first_visit = !isset($_SESSION['engineering_visited']);
$_SESSION['engineering_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject['name']; ?> - STEM Universe</title>
    <link rel="stylesheet" href="../../public/css/engineering.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="engineering-background">
        <div class="floating-shapes">
            <div class="shape shape-1">⚙️</div>
            <div class="shape shape-2">🔧</div>
            <div class="shape shape-3">🏗️</div>
            <div class="shape shape-4">📐</div>
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
                    <i class="fas fa-tools"></i>
                </button>
            </div>
        </div>
    </div>

    <main class="engineering-container">
        <header class="engineering-header">
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
                <h2>CÔNG XƯỞNG SÁNG TẠO</h2>
                <p>Chọn một dự án để bắt đầu chế tạo!</p>
            </div>

            <div class="islands-container">
                <?php foreach ($subject['topics'] as $topic): ?>
                <div class="island <?php echo $topic['status']; ?>" data-topic="<?php echo $topic['id']; ?>">
                    <div class="island-content">
                        <div class="island-shape" style="background: <?php echo $topic['color']; ?>">
                            <div class="island-flag">
                                <?php echo $topic['icon']; ?>
                            </div>
                            <div class="island-tools">
                                <div class="tool tool-1">🔧</div>
                                <div class="tool tool-2">⚙️</div>
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
                                        <span>Làm lại</span>
                                    </button>
                                <?php elseif ($topic['status'] == 'current'): ?>
                                    <button class="island-btn start" onclick="startTopic(<?php echo $topic['id']; ?>)">
                                        <i class="fas fa-play"></i>
                                        <span>Bắt đầu chế tạo</span>
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

    <script src="../../public/js/engineering.js"></script>
</body>
</html>