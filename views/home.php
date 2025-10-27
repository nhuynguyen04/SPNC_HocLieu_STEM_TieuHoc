<?php

$subjects = [
    'khoa_hoc' => [
        'name' => 'Khoa học',
        'color' => '#4CAF50',
        'gradient' => 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        'icon' => '🔬',
        'description' => 'Khám phá thế giới tự nhiên kỳ diệu',
        'lessons' => [
            ['title' => 'Thế giới màu sắc', 'type' => 'TLCH - TC', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Mô hình các bộ phận của cây', 'type' => 'TC', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Ngày và đêm', 'type' => 'TLCH', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Cẩm nang phòng tránh hỏa hoạn', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Thùng rác thân thiện', 'type' => 'TC', 'has_video' => true, 'status' => 'complete'],
        ]
    ],
    'cong_nghe' => [
        'name' => 'Công nghệ',
        'color' => '#2196F3',
        'gradient' => 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
        'icon' => '💻',
        'description' => 'Làm chủ công nghệ trong thời đại số',
        'lessons' => [
            ['title' => 'Cây gia đình', 'type' => 'TC', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Em là họa sĩ máy tính', 'type' => 'Chia sẻ tác phẩm', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Em là người đánh máy', 'type' => 'TLCH', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Lập trình viên nhí với Scratch', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Các bộ phận của máy tính', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
        ]
    ],
    'ky_thuat' => [
        'name' => 'Kỹ thuật',
        'color' => '#FF9800',
        'gradient' => 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
        'icon' => '⚙️',
        'description' => 'Sáng tạo và xây dựng những điều tuyệt vời',
        'lessons' => [
            ['title' => 'Dụng cụ gấp áo', 'type' => 'TC', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Hoa yêu thương nở rộ', 'type' => 'TC - TLCH', 'has_video' => true, 'status' => 'complete'],
            ['title' => 'Xây cầu giấy', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Chế tạo xe bong bóng', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Hệ thống lọc nước cơ bản', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
        ]
    ],
    'toan' => [
        'name' => 'Toán học',
        'color' => '#9C27B0',
        'gradient' => 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
        'icon' => '🔢',
        'description' => 'Khám phá vẻ đẹp của những con số',
        'lessons' => [
            ['title' => 'Máy bắn đá mini', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Tangram 3D', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Đếm số', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Nhận biết hình học', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
            ['title' => 'Đồng hồ và thời gian', 'type' => 'TC', 'has_video' => false, 'status' => 'incomplete'],
        ]
    ]
];

$search_results = [];
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search_term = strtolower($_GET['search']);
    foreach ($subjects as $subject) {
        foreach ($subject['lessons'] as $lesson) {
            if (strpos(strtolower($lesson['title']), $search_term) !== false) {
                $search_results[] = [
                    'subject' => $subject['name'],
                    'subject_gradient' => $subject['gradient'],
                    'lesson' => $lesson
                ];
            }
        }
    }
}

$total = $done = 0;
foreach ($subjects as $subject) {
    $total += count($subject['lessons']);
    foreach ($subject['lessons'] as $lesson) {
        if ($lesson['status'] === 'complete') $done++;
    }
}
$progress = $total ? round(($done / $total) * 100) : 0;

require_once './template/header.php';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STEM Universe - Học liệu STEM Tiểu học</title>
    <link rel="stylesheet" href="../public/css/home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Baloo+2:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-elements">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-circle circle-3"></div>
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
    </div>

    <main class="container">
        <?php if (!empty($search_results)): ?>
            <section class="search-results-section">
                <div class="section-header">
                    <h2>Kết quả tìm kiếm cho "<?php echo htmlspecialchars($_GET['search']); ?>"</h2>
                    <p>Tìm thấy <?php echo count($search_results); ?> bài học</p>
                </div>
                <div class="results-grid">
                    <?php foreach ($search_results as $result): ?>
                        <div class="result-card">
                            <div class="result-badge" style="background: <?php echo $result['subject_gradient']; ?>">
                                <?php echo $result['subject']; ?>
                            </div>
                            <div class="result-content">
                                <h3><?php echo $result['lesson']['title']; ?></h3>
                                <div class="result-meta">
                                    <span class="lesson-type"><?php echo $result['lesson']['type']; ?></span>
                                    <?php if ($result['lesson']['has_video']): ?>
                                        <span class="video-tag">📹 Video</span>
                                    <?php endif; ?>
                                </div>
                                <button class="start-lesson-btn" onclick="openLesson('<?php echo $result['lesson']['title']; ?>')">
                                    Bắt đầu học
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                <a href="?" class="back-home-btn">
                    <span>← Quay lại trang chủ</span>
                </a>
            </section>
        <?php else: ?>
            <section class="hero-section">
                <div class="hero-content">
                    <div class="hero-text">
                        <h2>Chào mừng đến với <span class="highlight">STEM Universe!</span></h2>
                        <p>Nơi những ý tưởng nhỏ trở thành phát minh lớn. Cùng khám phá thế giới STEM đầy màu sắc!</p>
                        <div class="hero-stats">
                            <div class="stat">
                                <div class="stat-number"><?php echo $total; ?></div>
                                <div class="stat-label">Bài học</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number"><?php echo $done; ?></div>
                                <div class="stat-label">Đã hoàn thành</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number"><?php echo $progress; ?>%</div>
                                <div class="stat-label">Tiến độ</div>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="floating-elements">
                            <div class="floating-element element-1">🔬</div>
                            <div class="floating-element element-2">💻</div>
                            <div class="floating-element element-3">⚙️</div>
                            <div class="floating-element element-4">🔢</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="progress-section">
                <div class="progress-card">
                    <h3>Tiến độ học tập của bạn</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: <?php echo $progress; ?>%"></div>
                    </div>
                    <div class="progress-text">
                        <span>Đã hoàn thành: <?php echo $done; ?>/<?php echo $total; ?> bài học</span>
                        <span><?php echo $progress; ?>%</span>
                    </div>
                </div>
            </section>

            <section class="subjects-section">
                <div class="section-header">
                    <h2>Khám phá các môn học</h2>
                    <p>Chọn môn học yêu thích và bắt đầu hành trình</p>
                </div>
                
                <div class="subjects-container">
                    <button class="subjects-nav prev" onclick="scrollSubjects(-1)">
                        <span class="nav-arrow">‹</span>
                    </button>
                    
                    <div class="subjects-wrapper">
                        <div class="subjects-track" id="subjectsTrack">
                            <?php foreach ($subjects as $subject_id => $subject): ?>
                                <div class="subject-card" style="--subject-color: <?php echo $subject['color']; ?>">
                                    <div class="card-header" style="background: <?php echo $subject['gradient']; ?>">
                                        <div class="subject-icon"><?php echo $subject['icon']; ?></div>
                                        <div class="subject-info">
                                            <h3><?php echo $subject['name']; ?></h3>
                                            <p><?php echo $subject['description']; ?></p>
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="lessons-count">
                                            <span><?php echo count($subject['lessons']); ?> bài học</span>
                                        </div>
                                        <div class="lessons-list">
                                            <?php foreach ($subject['lessons'] as $index => $lesson): ?>
                                                <div class="lesson-item <?php echo $lesson['status']; ?>" 
                                                     onclick="openLesson('<?php echo $lesson['title']; ?>')">
                                                    <div class="lesson-preview"></div>
                                                    <div class="lesson-details">
                                                        <h4><?php echo $lesson['title']; ?></h4>
                                                        <div class="lesson-meta">
                                                            <span class="lesson-type"><?php echo $lesson['type']; ?></span>
                                                            <?php if ($lesson['has_video']): ?>
                                                                <span class="video-indicator" title="Có video">📹</span>
                                                            <?php endif; ?>
                                                        </div>
                                                    </div>
                                                    <div class="lesson-status">
                                                        <?php if ($lesson['status'] == 'complete'): ?>
                                                            <div class="status-badge completed">✓</div>
                                                        <?php else: ?>
                                                            <div class="status-badge upcoming">●</div>
                                                        <?php endif; ?>
                                                    </div>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    
                    <button class="subjects-nav next" onclick="scrollSubjects(1)">
                        <span class="nav-arrow">›</span>
                    </button>
                </div>
                
                <div class="subjects-dots" id="subjectsDots"></div>
            </section>

            <section class="featured-section">
                <div class="section-header">
                    <h2>Bài học nổi bật</h2>
                    <p>Khám phá những bài học thú vị nhất</p>
                </div>
                <div class="featured-grid">
                    <div class="featured-card featured-1">
                        <div class="featured-badge">Phổ biến</div>
                        <h3>Thế giới màu sắc</h3>
                        <p>Khám phá sự kỳ diệu của màu sắc trong tự nhiên</p>
                        <button class="featured-btn" onclick="openLesson('Thế giới màu sắc')">Khám phá ngay</button>
                    </div>
                    <div class="featured-card featured-2">
                        <div class="featured-badge">Mới</div>
                        <h3>Em là họa sĩ máy tính</h3>
                        <p>Sáng tạo nghệ thuật với công cụ số</p>
                        <button class="featured-btn" onclick="openLesson('Em là họa sĩ máy tính')">Bắt đầu vẽ</button>
                    </div>
                    <div class="featured-card featured-3">
                        <div class="featured-badge">Thử thách</div>
                        <h3>Xây cầu giấy</h3>
                        <p>Kỹ thuật xây dựng với vật liệu đơn giản</p>
                        <button class="featured-btn" onclick="openLesson('Xây cầu giấy')">Nhận thử thách</button>
                    </div>
                </div>
            </section>
        <?php endif; ?>
    </main>

    <?php require_once './template/footer.php'; ?>                                                       
    <script src="../public/js/main.js"></script>
    <script>
    function openLesson(lessonTitle) {
        window.location.href = `lesson.php?title=${encodeURIComponent(lessonTitle)}`;
    }
    </script>
</body>
</html>