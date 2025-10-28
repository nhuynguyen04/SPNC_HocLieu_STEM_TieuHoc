<?php

$science_data = [
    'name' => 'KHÁM PHÁ KHOA HỌC',
    'color' => '#22C55E',
    'gradient' => 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
    'icon' => '🔬',
    'description' => 'Cùng khám phá thế giới diệu kỳ!',
    'total_xp' => 250,
    'completed_xp' => 100,
    'current_streak' => 7,
    'character' => [
        'name' => 'Bạn Khủng Long Khoa Học',
        'avatar' => '🦖',
        'color' => '#10B981',
        'welcome_message' => 'Chào bạn nhỏ! Mình là Khủng Long Khoa Học! Cùng mình khám phá 5 chủ đề siêu thú vị nhé! 🦖✨'
    ],
    'stats' => [
        'completed' => 2,
        'current' => 1,
        'upcoming' => 2,
        'total_xp' => 100
    ],
    'topics' => [
        [
            'id' => 1,
            'title' => 'THẾ GIỚI MÀU SẮC',
            'icon' => '🎨',
            'status' => 'completed',
            'color' => '#22C55E',
            'description' => 'Khám phá bí mật của màu sắc qua các hoạt động thú vị',
            'learning_time' => '15 phút',
            'activities' => [
                [
                    'type' => 'question',
                    'title' => 'TRẢ LỜI CÂU HỎI',
                    'icon' => '❓',
                    'description' => 'Kiểm tra kiến thức về màu sắc',
                    'status' => 'completed',
                    'xp' => 25
                ],
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI PHA MÀU',
                    'icon' => '🎮',
                    'description' => 'Pha trộn màu sắc tạo màu mới',
                    'status' => 'completed',
                    'xp' => 25
                ]
            ]
        ],
        [
            'id' => 2,
            'title' => 'BÍ KÍP ĂN UỐNG LÀNH MẠNH',
            'icon' => '🍎',
            'status' => 'completed',
            'color' => '#10B981',
            'description' => 'Học cách chọn thực phẩm tốt cho sức khỏe',
            'learning_time' => '20 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI DINH DƯỠNG',
                    'icon' => '🧩',
                    'description' => 'Phân loại thực phẩm tốt cho sức khỏe',
                    'status' => 'completed',
                    'xp' => 50
                ]
            ]
        ],
        [
            'id' => 3,
            'title' => 'NGÀY VÀ ĐÊM',
            'icon' => '🌓',
            'status' => 'current',
            'color' => '#3B82F6',
            'description' => 'Khám phá bí mật của thời gian và thiên văn',
            'learning_time' => '12 phút',
            'activities' => [
                [
                    'type' => 'question',
                    'title' => 'TRẢ LỜI CÂU HỎI',
                    'icon' => '🌞',
                    'description' => 'Câu hỏi về Mặt Trời và Mặt Trăng',
                    'status' => 'current',
                    'xp' => 50
                ]
            ]
        ],
        [
            'id' => 4,
            'title' => 'CẨM NANG PHÒNG TRÁNH HỎA HOẠN',
            'icon' => '🚒',
            'status' => 'upcoming',
            'color' => '#EF4444',
            'description' => 'Học cách phòng tránh và xử lý khi có hỏa hoạn',
            'learning_time' => '18 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI THOÁT HIỂM',
                    'icon' => '🏃‍♂️',
                    'description' => 'Thực hành tình huống thoát hiểm an toàn',
                    'status' => 'locked',
                    'xp' => 50
                ]
            ]
        ],
        [
            'id' => 5,
            'title' => 'THÙNG RÁC THÂN THIỆN',
            'icon' => '🗑️',
            'status' => 'upcoming',
            'color' => '#84CC16',
            'description' => 'Học cách phân loại rác bảo vệ môi trường',
            'learning_time' => '16 phút',
            'activities' => [
                [
                    'type' => 'game',
                    'title' => 'TRÒ CHƠI PHÂN LOẠI',
                    'icon' => '♻️',
                    'description' => 'Phân loại rác vào đúng thùng',
                    'status' => 'locked',
                    'xp' => 30
                ],
                [
                    'type' => 'question',
                    'title' => 'TRẢ LỜI CÂU HỎI',
                    'icon' => '❓',
                    'description' => 'Kiểm tra kiến thức về bảo vệ môi trường',
                    'status' => 'locked',
                    'xp' => 20
                ]
            ]
        ]
    ]
];

$subject = $science_data;
$current_page = 'science';

$progress_percentage = ($subject['completed_xp'] / $subject['total_xp']) * 100;

session_start();
$first_visit = !isset($_SESSION['science_visited']);
$_SESSION['science_visited'] = true;
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject['name']; ?> - STEM Universe</title>
    <link rel="stylesheet" href="../../public/css/science.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="science-background">
        <div class="floating-shapes">
            <div class="shape shape-1">🌈</div>
            <div class="shape shape-2">🍎</div>
            <div class="shape shape-3">🔬</div>
            <div class="shape shape-4">♻️</div>
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

    <main class="science-container">
        <header class="science-header">
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
                <h2>HÀNH TRÌNH KHÁM PHÁ</h2>
                <p>Chọn một chủ đề để bắt đầu học tập!</p>
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
                                <div class="tree tree-1">🌱</div>
                                <div class="tree tree-2">🌿</div>
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
                                <?php
                                $game_link = '';
                                if ($topic['id'] == 1) { // ID 1 là "Thế giới màu sắc"
                                    $game_link = '/SPNC_HocLieu_STEM_TieuHoc/science/color-game';
                                } elseif ($topic['id'] == 2) { // ID 2 là "Bí kíp ăn uống"
                                    $game_link = '/SPNC_HocLieu_STEM_TieuHoc/science/nutrition';
                                }

                                // Tạo nút dựa trên link
                                if (!empty($game_link)):
                                ?>
                                    <button class="island-btn <?php echo $topic['status'] == 'completed' ? 'review' : 'start'; ?>" 
                                            onclick="window.location.href='<?php echo $game_link; ?>'">
                                        <i class="fas <?php echo $topic['status'] == 'completed' ? 'fa-redo' : 'fa-play'; ?>"></i>
                                        <span><?php echo $topic['status'] == 'completed' ? 'Chơi lại' : 'Chơi game'; ?></span>
                                    </button>
                                <?php
                                elseif ($topic['status'] == 'completed'): 
                                ?>
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

    <script src="../../public/js/science.js"></script>
</body>
</html>