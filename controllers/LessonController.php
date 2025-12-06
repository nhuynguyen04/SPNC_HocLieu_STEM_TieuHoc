<?php

class LessonController {

    // Helper: try to find a lesson id that matches a game/lesson name
    private function findLessonIdByName($db, $name) {
        if (!$db || empty($name)) return null;
        try {
            // 1) exact match
            $stmt = $db->prepare("SELECT id FROM lessons WHERE lesson_name = :name LIMIT 1");
            $stmt->execute([':name' => $name]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) return (int)$row['id'];

            // 2) like match
            $stmt = $db->prepare("SELECT id FROM lessons WHERE lesson_name LIKE :like LIMIT 1");
            $stmt->execute([':like' => '%' . $name . '%']);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) return (int)$row['id'];

            // 3) try shorter token matches (split words)
            $parts = preg_split('/\s+/', trim($name));
            foreach ($parts as $p) {
                if (strlen($p) < 3) continue;
                $stmt = $db->prepare("SELECT id FROM lessons WHERE lesson_name LIKE :like LIMIT 1");
                $stmt->execute([':like' => '%' . $p . '%']);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) return (int)$row['id'];
            }
        } catch (Exception $e) {
            // ignore and return null
        }
        return null;
    }

    // Helper: get topic_id from a lesson id (returns null if not found)
    private function getTopicIdFromLesson($db, $lessonId) {
        if (!$db || empty($lessonId)) return null;
        try {
            $tstmt = $db->prepare("SELECT topic_id FROM lessons WHERE id = :lid LIMIT 1");
            $tstmt->execute([':lid' => $lessonId]);
            $trow = $tstmt->fetch(PDO::FETCH_ASSOC);
            if ($trow && !empty($trow['topic_id'])) return (int)$trow['topic_id'];
        } catch (Exception $e) {
            // ignore
        }
        return null;
    }

    // API: commit quiz score for lessons like 'Ngày và Đêm'
    public function commitQuizScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['lesson']) || !isset($data['score'])) {
            echo json_encode(['success' => false, 'message' => 'Missing lesson or score']);
            return;
        }

        if (empty($_SESSION['user_id'])) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        $lessonName = $data['lesson'];
        $score = (int)$data['score'];

        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();

            $stmt = $db->prepare("SELECT id FROM games WHERE game_name = :name LIMIT 1");
            $stmt->execute([':name' => $lessonName]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $gameId = (int)$row['id'];
            } else {
              
                $stmt2 = $db->prepare("SELECT id FROM games WHERE game_name LIKE :like LIMIT 1");
                $stmt2->execute([':like' => '%' . $lessonName . '%']);
                $r2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                if ($r2) {
                    $gameId = (int)$r2['id'];
                } else {
                    echo json_encode(['success' => false, 'message' => 'Game record not found for: ' . $lessonName]);
                    return;
                }
            }

            $userId = (int)$_SESSION['user_id'];
            $scorePct = max(0, min(100, (int)$score));
            $res = Score::saveAndMark($userId, $gameId, $scorePct);

            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * TRÒ CHƠI PHA MÀU
     */
    public function showColorGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // 1. KHỞI TẠO ĐIỂM SỐ (dùng chung session 'total_score' cho game)
        if (!isset($_SESSION['total_score'])) {
            $_SESSION['total_score'] = 0;
        }

        // 2. XỬ LÝ KHI QUA CÂU HỎI MỚI (hoặc chơi lại)
        if (isset($_GET['next'])) {
            if (isset($_GET['points'])) {
                $_SESSION['total_score'] += (int)$_GET['points'];
            }
            unset($_SESSION['current_target']);
            unset($_SESSION['current_attempt']);
            if (empty($_SESSION['available_targets']) && !isset($_GET['points'])) {
                $_SESSION['total_score'] = 0;
                unset($_SESSION['available_targets']);
            }
        }

        // 3. DANH SÁCH CÂU HỎI
        $targets = [
            ["name" => "orange", "text" => "Hãy pha trộn màu CAM 🍊", "rgb" => [255, 165, 0], "colors" => ["red", "yellow"]],
            ["name" => "green", "text" => "Hãy pha trộn màu XANH LÁ 🍃", "rgb" => [0, 128, 0], "colors" => ["blue", "yellow"]],
            ["name" => "purple", "text" => "Hãy pha trộn màu TÍM 💜", "rgb" => [128, 0, 128], "colors" => ["red", "blue"]],
            ["name" => "gray", "text" => "Hãy pha trộn màu XÁM ⚙️", "rgb" => [128, 128, 128], "colors" => ["black", "white"]]
        ];

        // 4. KHỞI TẠO DANH SÁCH CÂU HỎI
        if (!isset($_SESSION['available_targets'])) {
            $_SESSION['available_targets'] = $targets;
            shuffle($_SESSION['available_targets']);
        }

        // 5. LẤY CÂU HỎI HIỆN TẠI
        if (!isset($_SESSION['current_target'])) {
            if (!empty($_SESSION['available_targets'])) {
                $_SESSION['current_target'] = array_pop($_SESSION['available_targets']);
                $_SESSION['current_attempt'] = 1;
                $target = $_SESSION['current_target'];
            } else {
                $target = null; // Hết câu hỏi
            }
        } else {
            $target = $_SESSION['current_target'];
        }

        $current_attempt = $_SESSION['current_attempt'] ?? 1;
        $correct_colors_sorted = [];
        if ($target) {
            $correct_colors_sorted = $target['colors'];
            sort($correct_colors_sorted);
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        // Default passing threshold (percentage) for this game
        $passingThreshold = 25;
        // Nếu đã hết câu hỏi -> có thể lưu điểm/chấm hoàn thành một lần
        $completionResult = null;
        if ($target === null) {
            // Nếu user đăng nhập và chưa commit điểm cho game này trong session
            if (!empty($_SESSION['user_id']) && empty($_SESSION['color_game_committed'])) {
                try {
                    require_once __DIR__ . '/../models/Database.php';
                    require_once __DIR__ . '/../models/Score.php';

                    $database = new Database();
                    $db = $database->getConnection();

                    // Tìm game 'Pha màu' trong cơ sở dữ liệu (không tạo mới từ controller)
                    $stmt = $db->prepare("SELECT id FROM games WHERE game_name LIKE :name LIMIT 1");
                    $stmt->execute([':name' => '%Pha màu%']);
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    if ($row) {
                        $gameId = (int)$row['id'];
                    } else {
                        // Try a looser match and otherwise skip DB save.
                        $stmt2 = $db->prepare("SELECT id FROM games WHERE game_name LIKE :like LIMIT 1");
                        $stmt2->execute([':like' => '%Pha màu%']);
                        $r2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                        if ($r2) {
                            $gameId = (int)$r2['id'];
                        } else {
                            // No game record found; skip saving to DB and mark completionResult accordingly
                            $completionResult = ['success' => false, 'message' => 'Game "Pha màu" not registered in database'];
                        }
                    }

                    // Lưu điểm và đánh dấu hoàn thành nếu đạt `passing_score` (nếu gameId tồn tại)
                    $userId = (int)$_SESSION['user_id'];
                    $rawScore = isset($_SESSION['total_score']) ? (int)$_SESSION['total_score'] : 0;
                    // Derive max possible points: number of targets * 10 (JS awards up to 10 per question)
                    $maxPoints = count($targets) * 10;
                    $percentage = 0;
                    if ($maxPoints > 0) {
                        $percentage = (int)round(($rawScore / $maxPoints) * 100);
                        if ($percentage > 100) $percentage = 100;
                        if ($percentage < 0) $percentage = 0;
                    }
                    if (!empty($gameId)) {
                        $completionResult = Score::saveAndMark($userId, $gameId, $percentage);
                    } else {
                        // completionResult already set above when game not found
                    }

                    // Đánh dấu đã commit để tránh double-insert
                    $_SESSION['color_game_committed'] = true;
                } catch (Exception $e) {
                    error_log('Color game commit error: ' . $e->getMessage());
                }
            }
        }

        // compute final percentage for view (even if user not logged in)
        if (!isset($percentage)) {
            $rawScore = isset($_SESSION['total_score']) ? (int)$_SESSION['total_score'] : 0;
            $maxPoints = count($targets) * 25;
            $percentage = 0;
            if ($maxPoints > 0) {
                $percentage = (int)round(($rawScore / $maxPoints) * 100);
                if ($percentage > 100) $percentage = 100;
                if ($percentage < 0) $percentage = 0;
            }
        }

        // 6. TẢI VIEW (GIAO DIỆN)
        require_once __DIR__ . '/../views/lessons/science_color_game.php';
    }


    /**
     * TRÒ CHƠI THÁP DINH DƯỠNG
     */
    public function showNutritionGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        // Dùng một session điểm riêng cho game
        if (!isset($_SESSION['nutrition_score'])) {
            $_SESSION['nutrition_score'] = 0;
        }

        $foodItems = [
            // Tầng 4 (Đáy tháp) -> data-group = 1
            ['id' => 'food1', 'name' => 'Hạt', 'group' => 1, 'img' => 'hat.png'],
            ['id' => 'food2', 'name' => 'Đậu', 'group' => 1, 'img' => 'hat_dau.png'],
            ['id' => 'food3', 'name' => 'Bánh mì', 'group' => 1, 'img' => 'banh_mi.png'],
            ['id' => 'food4', 'name' => 'Sandwich', 'group' => 1, 'img' => 'sandwich.png'],
            ['id' => 'food5', 'name' => 'Mì', 'group' => 1, 'img' => 'mi.png'],
            ['id' => 'food6', 'name' => 'Cơm', 'group' => 1, 'img' => 'com.png'],
            ['id' => 'food7', 'name' => 'Pasta', 'group' => 1, 'img' => 'pasta.png'],
            ['id' => 'food8', 'name' => 'Ngũ cốc', 'group' => 1, 'img' => 'ngu_coc.png'],

            // Tầng 3 (Rau/Trái cây) -> data-group = 2
            ['id' => 'food9', 'name' => 'Cà chua', 'group' => 2, 'img' => 'ca_chua.png'],
            ['id' => 'food10', 'name' => 'Ớt chuông', 'group' => 2, 'img' => 'ot_chuong.png'],
            ['id' => 'food11', 'name' => 'Nấm', 'group' => 2, 'img' => 'nam.png'],
            ['id' => 'food12', 'name' => 'Cà rốt', 'group' => 2, 'img' => 'ca_rot.png'],
            ['id' => 'food13', 'name' => 'Cam', 'group' => 2, 'img' => 'cam.png'],
            ['id' => 'food14', 'name' => 'Chuối', 'group' => 2, 'img' => 'chuoi.png'],
            ['id' => 'food15', 'name' => 'Nho', 'group' => 2, 'img' => 'nho.png'],
            ['id' => 'food16', 'name' => 'Dâu', 'group' => 2, 'img' => 'dau.png'],

            // Tầng 2 (Đạm/Sữa) -> data-group = 3
            ['id' => 'food17', 'name' => 'Yogurt', 'group' => 3, 'img' => 'yogurt.png'],
            ['id' => 'food18', 'name' => 'Sữa', 'group' => 3, 'img' => 'sua.png'],
            ['id' => 'food19', 'name' => 'Phô mai', 'group' => 3, 'img' => 'pho_mai.png'],
            ['id' => 'food20', 'name' => 'Cá', 'group' => 3, 'img' => 'ca.png'],
            ['id' => 'food21', 'name' => 'Thịt', 'group' => 3, 'img' => 'thit.png'],
            ['id' => 'food22', 'name' => 'Đùi gà', 'group' => 3, 'img' => 'dui_ga.png'],
            ['id' => 'food23', 'name' => 'Trứng', 'group' => 3, 'img' => 'trung.png'],
            ['id' => 'food24', 'name' => 'Tôm', 'group' => 3, 'img' => 'tom.png'],

            // Tầng 1 (Đỉnh tháp) -> data-group = 4
            ['id' => 'food25', 'name' => 'Dầu ăn', 'group' => 4, 'img' => 'dau_an.png'],
            ['id' => 'food26', 'name' => 'Đường', 'group' => 4, 'img' => 'duong.png'],
            ['id' => 'food27', 'name' => 'Muối', 'group' => 4, 'img' => 'muoi.png'],
        ];

        shuffle($foodItems);

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        
        // Tải view
        require_once __DIR__ . '/../views/lessons/science_nutrition_game.php';
    }

    /**
     * API Cập nhật điểm (cho Game Dinh Dưỡng)
     */
    public function updateNutritionScore() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['nutrition_score'])) {
            $_SESSION['nutrition_score'] = 0;
        }

        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            if ($data['action'] === 'add_points' && isset($data['points'])) {
                // Only update session score here. Do NOT auto-commit to DB.
                // Commit will only happen when the user presses the Finish button.
                $_SESSION['nutrition_score'] += (int)$data['points'];
            } elseif ($data['action'] === 'reset') {
                $_SESSION['nutrition_score'] = 0;
            } elseif ($data['action'] === 'commit') {
                // Lưu điểm vào database và đánh dấu hoàn thành nếu đạt passing_score
                require_once __DIR__ . '/../models/Database.php';
                require_once __DIR__ . '/../models/Score.php';

                $userId = $_SESSION['user_id'] ?? null;
                $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;
                $playTime = isset($data['play_time']) ? (int)$data['play_time'] : null;
                $totalTime = isset($data['total_time']) ? (int)$data['total_time'] : null;

                if (empty($userId)) {
                    header('Content-Type: application/json');
                    echo json_encode(['success' => false, 'message' => 'User not logged in']);
                    exit();
                }

                try {
                    $db = (new Database())->getConnection();

                    // If game_id not provided, find or create the 'Tháp dinh dưỡng' game and set passing_score accordingly
                    if (empty($gameId)) {
                        $stmt = $db->prepare("SELECT id FROM games WHERE game_name = :name LIMIT 1");
                        $stmt->execute([':name' => 'Tháp dinh dưỡng']);
                        $row = $stmt->fetch(PDO::FETCH_ASSOC);

                        // determine threshold based on number of foods (27 items * 10 / 2)
                        $totalFoods = 27;
                        $threshold = (int)ceil(($totalFoods * 10) / 2.0);

                            if ($row) {
                                $gameId = (int)$row['id'];
                            } else {
                                // Try a looser match; do not create games from controller.
                                $stmt2 = $db->prepare("SELECT id FROM games WHERE game_name LIKE :like LIMIT 1");
                                $stmt2->execute([':like' => '%Tháp dinh dưỡng%']);
                                $r2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                                if ($r2) {
                                    $gameId = (int)$r2['id'];
                                } else {
                                    header('Content-Type: application/json');
                                    echo json_encode(['success' => false, 'message' => 'Game "Tháp dinh dưỡng" not registered']);
                                    exit();
                                }
                            }
                    }

                    // compute percentage
                    $raw = (int)$_SESSION['nutrition_score'];
                    $maxPoints = $totalFoods * 10;
                    $pct = 0;
                    if ($maxPoints > 0) {
                        $pct = (int)round(($raw / $maxPoints) * 100);
                        if ($pct > 100) $pct = 100;
                        if ($pct < 0) $pct = 0;
                    }

                    // Determine passing threshold from DB (games.passing_score). If not set,
                    // fall back to half of max points as before.
                    $passingScore = null;
                    try {
                        $pstmt = $db->prepare("SELECT passing_score FROM games WHERE id = :gid LIMIT 1");
                        $pstmt->execute([':gid' => $gameId]);
                        $prow = $pstmt->fetch(PDO::FETCH_ASSOC);
                        if ($prow && $prow['passing_score'] !== null) {
                            $passingScore = (int)$prow['passing_score'];
                        }
                    } catch (Exception $e) {
                        // ignore and use fallback
                    }

                    if ($passingScore === null) {
                        // fallback: half of max points (expressed as percent)
                        $passingScore = (int)ceil((($totalFoods * 10) / $maxPoints) * 100 / 2);
                        // The above simplifies to 50, but keep calculation explicit if items change
                        if ($passingScore <= 0) $passingScore = 50;
                    }

                    // Only save when user meets or exceeds passing_score
                    if ($pct >= $passingScore) {
                        $res = Score::saveAndMark($userId, $gameId, $pct);
                        // If save succeeded, reset session score to avoid duplicate saves
                        if (is_array($res) && !empty($res['success'])) {
                            $_SESSION['nutrition_score'] = 0;
                            // include newScore in response so client can update UI
                            $res['newScore'] = 0;
                        }
                        header('Content-Type: application/json');
                        echo json_encode($res);
                        exit();
                    } else {
                        header('Content-Type: application/json');
                        echo json_encode(['success' => false, 'message' => 'Chưa đủ điểm để hoàn thành', 'newScore' => $pct, 'required' => $passingScore]);
                        exit();
                    }
                } catch (Exception $e) {
                    header('Content-Type: application/json');
                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                    exit();
                }
            }
        }

        // return score as percentage for client
        $raw = isset($_SESSION['nutrition_score']) ? (int)$_SESSION['nutrition_score'] : 0;
        $totalFoods = 27;
        $maxPoints = $totalFoods * 10;
        $pct = 0;
        if ($maxPoints > 0) {
            $pct = (int)round(($raw / $maxPoints) * 100);
            if ($pct > 100) $pct = 100;
            if ($pct < 0) $pct = 0;
        }
        header('Content-Type: application/json');
        echo json_encode(['newScore' => $pct]);
        exit();
    }

    /**
     * TRÒ CHƠI LẮP GHÉP BỘ PHẬN CÂY
     */
    public function showPlantGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        
        $plantType = $_GET['type'] ?? 'hoa';
        
        // *** TOÀN BỘ DỮ LIỆU 5 LOẠI CÂY MỚI ***
        $allPlantsData = [
            
            // === 1. CÂY HOA ===
            'hoa' => [
                'title' => 'Cây Hoa',
                'image_bg' => 'plant_hoa_bg.png',
                'parts' => [
                    ['id' => 'label-hoa', 'name' => 'hoa', 'text' => 'Hoa'],
                    ['id' => 'label-la', 'name' => 'la', 'text' => 'Lá'],
                    ['id' => 'label-than', 'name' => 'than', 'text' => 'Thân'],
                    ['id' => 'label-re', 'name' => 're', 'text' => 'Rễ'],
                ],
                'dropzones' => [
                    ['target' => 'hoa', 'top' => '26%', 'left' => '61.2%', 'width' => '9%', 'height' => '8%'],
                    ['target' => 'la', 'top' => '45.5%', 'left' => '61.4%', 'width' => '8%', 'height' => '10%'],
                    ['target' => 'than', 'top' => '58.5%', 'left' => '37.5%', 'width' => '8%', 'height' => '8%'],
                    ['target' => 're', 'top' => '78.3%', 'left' => '60.3%', 'width' => '8.8%', 'height' => '8.6%'],
                ]
            ],
            
            // === 2. CÂY CỔ THỤ ===
            'cothu' => [
                'title' => 'Cây Cổ Thụ',
                'image_bg' => 'plant_cothu_bg.png',
                'parts' => [
                    ['id' => 'label-la', 'name' => 'la', 'text' => 'Lá'],
                    ['id' => 'label-canh', 'name' => 'canh', 'text' => 'Cành'],
                    ['id' => 'label-than', 'name' => 'than', 'text' => 'Thân'],
                    ['id' => 'label-re', 'name' => 're', 'text' => 'Rễ'],
                ],
                'dropzones' => [
                    ['target' => 'la', 'top' => '27.5%', 'left' => '66.5%', 'width' => '9%', 'height' => '9.5%'],
                    ['target' => 'canh', 'top' => '35%', 'left' => '28%', 'width' => '9.2%', 'height' => '10.5%'],
                    ['target' => 'than', 'top' => '56%', 'left' => '34.5%', 'width' => '8.5%', 'height' => '10.3%'],
                    ['target' => 're', 'top' => '77.5%', 'left' => '63%', 'width' => '8%', 'height' => '10%'],
                ]
            ],
            
            // === 3. CÂY CỦ ===
            'cu' => [
                'title' => 'Cây Củ',
                'image_bg' => 'plant_cu_bg.png',
                'parts' => [
                    ['id' => 'label-la', 'name' => 'la', 'text' => 'Lá'],
                    ['id' => 'label-cu', 'name' => 'cu', 'text' => 'Củ'],
                    ['id' => 'label-re', 'name' => 're', 'text' => 'Rễ'],
                ],
                'dropzones' => [
                    ['target' => 'la', 'top' => '27%', 'left' => '59.5%', 'width' => '9%', 'height' => '10%'],
                    ['target' => 'cu', 'top' => '58%', 'left' => '55%', 'width' => '8.5%', 'height' => '10%'],
                    ['target' => 're', 'top' => '77%', 'left' => '59%', 'width' => '8%', 'height' => '10%'],
                ]
            ],
            
            // === 4. CÂY ĂN QUẢ ===
            'anqua' => [
                'title' => 'Cây Ăn Quả',
                'image_bg' => 'plant_anqua_bg.png',
                'parts' => [
                    ['id' => 'label-qua', 'name' => 'qua', 'text' => 'Quả'],
                    ['id' => 'label-la', 'name' => 'la', 'text' => 'Lá'],
                    ['id' => 'label-canh', 'name' => 'canh', 'text' => 'Cành'],
                    ['id' => 'label-than', 'name' => 'than', 'text' => 'Thân'],
                    ['id' => 'label-re', 'name' => 're', 'text' => 'Rễ'],
                ],
                'dropzones' => [
                    ['target' => 'qua', 'top' => '50.5%', 'left' => '57.5%', 'width' => '8.8%', 'height' => '9.7%'],
                    ['target' => 'la', 'top' => '29%', 'left' => '67.7%', 'width' => '9%', 'height' => '9.5%'],
                    ['target' => 'canh', 'top' => '9%', 'left' => '25.7%', 'width' => '9%', 'height' => '10.7%'],
                    ['target' => 'than', 'top' => '56.5%', 'left' => '32.5%', 'width' => '9%', 'height' => '10%'],
                    ['target' => 're', 'top' => '77.5%', 'left' => '57.7%', 'width' => '8%', 'height' => '10.2%'],
                ]
            ],
            
            // === 5. CÂY DÂY LEO ===
            'dayleo' => [
                'title' => 'Cây Dây Leo',
                'image_bg' => 'plant_dayleo_bg.png',
                'parts' => [
                    ['id' => 'label-la', 'name' => 'la', 'text' => 'Lá'],
                    ['id' => 'label-hoa', 'name' => 'hoa', 'text' => 'Hoa'],
                    ['id' => 'label-than', 'name' => 'than', 'text' => 'Thân (dây)'],
                    ['id' => 'label-qua', 'name' => 'qua', 'text' => 'Quả'],
                    ['id' => 'label-re', 'name' => 're', 'text' => 'Rễ'],
                ],
                'dropzones' => [
                    ['target' => 'la', 'top' => '11%', 'left' => '49.5%', 'width' => '12.5%', 'height' => '10.5%'],
                    ['target' => 'hoa', 'top' => '22%', 'left' => '3.1%', 'width' => '14%', 'height' => '11%'],
                    ['target' => 'than', 'top' => '57%', 'left' => '3.1%', 'width' => '16%', 'height' => '12%'],
                    ['target' => 'qua', 'top' => '38%', 'left' => '82.5%', 'width' => '14.5%', 'height' => '12.5%'],
                    ['target' => 're', 'top' => '80.5%', 'left' => '41.5%', 'width' => '15.5%', 'height' => '12%'],
                ]
            ],
        ];
        
        // Xác định màn hiện tại và màn kế tiếp
        $keys = array_keys($allPlantsData); // Lấy danh sách các key ['hoa', 'cothu', ...]
        $currentIndex = array_search($plantType, $keys);
        $nextType = null;

        // Nếu tìm thấy và không phải màn cuối cùng
        if ($currentIndex !== false && isset($keys[$currentIndex + 1])) {
            $nextType = $keys[$currentIndex + 1];
        }
        // Xác định màn trước đó (nếu có)
        $prevType = null;
        if ($currentIndex !== false && isset($keys[$currentIndex - 1])) {
            $prevType = $keys[$currentIndex - 1];
        }
        
        $plantData = $allPlantsData[$plantType] ?? $allPlantsData['hoa']; 
        shuffle($plantData['parts']);

        require_once __DIR__ . '/../views/lessons/science_plant_game.php';
    }

    /**
     * API Cập nhật điểm (cho Game Ghép Cây)
     */
    public function updatePlantScore() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $data = json_decode(file_get_contents('php://input'), true);
        header('Content-Type: application/json');

        // Only support commit action for this game now. We no longer track per-plant scores.
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit') {
            echo json_encode(['success' => false, 'message' => 'Unsupported action']);
            exit();
        }

        // commit: mark this game as 100% completed for the logged-in user
        require_once __DIR__ . '/../models/Database.php';
        require_once __DIR__ . '/../models/Score.php';

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            exit();
        }

        // Allow caller to provide game_id, but default to 5 for Plant game
        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : 5;

        try {
            $db = (new Database())->getConnection();
            // Ensure game exists; if not, try to find a games record with topic_id=2
            $gstmt = $db->prepare('SELECT id FROM games WHERE id = :gid LIMIT 1');
            $gstmt->execute([':gid' => $gameId]);
            $grow = $gstmt->fetch(PDO::FETCH_ASSOC);
            if (!$grow) {
                $tstmt = $db->prepare('SELECT id FROM games WHERE topic_id = :tid LIMIT 1');
                $tstmt->execute([':tid' => 2]);
                $trow = $tstmt->fetch(PDO::FETCH_ASSOC);
                if ($trow) $gameId = (int)$trow['id'];
            }

            $pct = 100;

            // Prevent duplicate commits in session
            if (!empty($_SESSION['plant_committed'])) {
                echo json_encode(['success' => true, 'message' => 'Already committed', 'newScore' => $pct]);
                exit();
            }

            $res = Score::saveAndMark((int)$userId, $gameId, $pct);
            if (is_array($res) && !empty($res['success'])) {
                $_SESSION['plant_committed'] = true;
            }
            echo json_encode($res);
            exit();
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit();
        }
    }

    public function showMathAngleGame() {
         // khởi tạo session score nếu cần
         if (!isset($_SESSION['angle_score'])) {
             $_SESSION['angle_score'] = 0;
         }
         require_once __DIR__ . '/../views/lessons/math_shapes_challenge.php';
    }

    public function showMathNumberGame() {
        // khởi tạo session score nếu cần
        if (!isset($_SESSION['number_score'])) {
          $_SESSION['number_score'] = 0;
        }
        require_once __DIR__ . '/../views/lessons/math_number_game.php';
   }

    /**
     * Hiển thị TRÒ CHƠI PHÂN LOẠI RÁC
     */
    public function showTrashGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['trash_score'])) {
            $_SESSION['trash_score'] = 0;
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Định nghĩa các loại rác
        $trashItems = [
            // Rác Vô Cơ
            ['id' => 'trash1', 'name' => 'Bao tay rách', 'group' => 'voco', 'img' => 'bao_tay_rach.png', 'top' => '70%', 'left' => '63%'],
            ['id' => 'trash2', 'name' => 'Túi nilon rách', 'group' => 'voco', 'img' => 'tui_nilon_rach.png', 'top' => '41%', 'left' => '1%'],
            ['id' => 'trash3', 'name' => 'Chai thủy tinh vỡ', 'group' => 'voco', 'img' => 'chai_vo.png', 'top' => '90%', 'left' => '3%'],
            ['id' => 'trash4', 'name' => 'Cốc vỡ', 'group' => 'voco', 'img' => 'coc_vo.png', 'top' => '42%', 'left' => '60%'],
            ['id' => 'trash5', 'name' => 'Áo mưa rách', 'group' => 'voco', 'img' => 'ao_mua_rach.png', 'top' => '73%', 'left' => '38%'],
            ['id' => 'trash6', 'name' => 'Dép hỏng', 'group' => 'voco', 'img' => 'dep_hong.png', 'top' => '21%', 'left' => '13%'],
            ['id' => 'trash7', 'name' => 'Bàn chải gãy', 'group' => 'voco', 'img' => 'ban_chai.png', 'top' => '0.1%', 'left' => '60%'],
            
            // Rác Hữu Cơ
            ['id' => 'trash8', 'name' => 'Vỏ trứng', 'group' => 'huuco', 'img' => 'vo_trung.png', 'top' => '55%', 'left' => '41%'],
            ['id' => 'trash9', 'name' => 'Vỏ chuối', 'group' => 'huuco', 'img' => 'vo_chuoi.png', 'top' => '68%', 'left' => '80%'],
            ['id' => 'trash10', 'name' => 'Ruột táo', 'group' => 'huuco', 'img' => 'ruot_tao.png', 'top' => '80%', 'left' => '15%'],
            ['id' => 'trash11', 'name' => 'Xương cá', 'group' => 'huuco', 'img' => 'xuong_ca.png', 'top' => '17%', 'left' => '83%'],
            ['id' => 'trash12', 'name' => 'Pizza thừa', 'group' => 'huuco', 'img' => 'pizza.png', 'top' => '22%', 'left' => '55%'],
            ['id' => 'trash13', 'name' => 'Vỏ dưa hấu', 'group' => 'huuco', 'img' => 'vo_dua_hau.png', 'top' => '84%', 'left' => '50%'],
            ['id' => 'trash14', 'name' => 'Lá cây', 'group' => 'huuco', 'img' => 'la_cay.png', 'top' => '90%', 'left' => '35%'],

            // Rác Tái Chế
            ['id' => 'trash15', 'name' => 'Áo', 'group' => 'taiche', 'img' => 'ao.png', 'top' => '21%', 'left' => '30%'],
            ['id' => 'trash16', 'name' => 'Thùng carton', 'group' => 'taiche', 'img' => 'thung_carton.png', 'top' => '57%', 'left' => '24%'],
            ['id' => 'trash17', 'name' => 'Túi giấy', 'group' => 'taiche', 'img' => 'tui_giay.png', 'top' => '57%', 'left' => '85%'],
            ['id' => 'trash18', 'name' => 'Vở', 'group' => 'taiche', 'img' => 'vo_sach.png', 'top' => '5%', 'left' => '40%'],
            ['id' => 'trash19', 'name' => 'Lon nước', 'group' => 'taiche', 'img' => 'lon_nuoc.png', 'top' => '62%', 'left' => '7%'],
            ['id' => 'trash20', 'name' => 'Chai thủy tinh', 'group' => 'taiche', 'img' => 'chai_thuy_tinh.png', 'top' => '48%', 'left' => '69.5%'],
            ['id' => 'trash21', 'name' => 'Túi nilon', 'group' => 'taiche', 'img' => 'tui_nilon.png', 'top' => '38%', 'left' => '88%'],
        ];
        
        shuffle($trashItems); 

        require_once __DIR__ . '/../views/lessons/science_trash_game.php';
    }

    /**
     * API Cập nhật điểm (cho Game Rác)
     */
    public function updateTrashScore() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['trash_score'])) {
            $_SESSION['trash_score'] = 0;
        }

        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            if ($data['action'] === 'add_points' && isset($data['points'])) {
                $_SESSION['trash_score'] += (int)$data['points'];
            } elseif ($data['action'] === 'reset') { 
                $_SESSION['trash_score'] = 0;
            } elseif ($data['action'] === 'commit') {
                require_once __DIR__ . '/../models/Score.php';
                require_once __DIR__ . '/../models/Database.php';
                $userId = $_SESSION['user_id'] ?? null;
                $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;

                header('Content-Type: application/json');

                if (empty($userId) || empty($gameId)) {
                    echo json_encode(['success' => false, 'message' => 'User not logged in or missing game_id']);
                    exit();
                }

                try {
                    $db = (new Database())->getConnection();

                    // Compute percentage from raw session points. JS may send total_drops so
                    // we can compute a proper percentage: (raw / (total_drops*10)) * 100
                    $raw = (int)($_SESSION['trash_score'] ?? 0);
                    $totalDropsParam = isset($data['total_drops']) ? (int)$data['total_drops'] : null;
                    if ($totalDropsParam && $totalDropsParam > 0) {
                        $maxPoints = $totalDropsParam * 10;
                        $pct = ($maxPoints > 0) ? (int) round((($raw / $maxPoints) * 100)) : 0;
                    } else {
                        // fallback: assume 21 items (matching showTrashGame list)
                        $defaultItems = 21;
                        $maxPoints = $defaultItems * 10;
                        $pct = ($maxPoints > 0) ? (int) round((($raw / $maxPoints) * 100)) : 0;
                    }
                    if ($pct > 100) $pct = 100;
                    if ($pct < 0) $pct = 0;

                    // Get passing_score from games table (if set)
                    $passingScore = null;
                    try {
                        $pstmt = $db->prepare("SELECT passing_score FROM games WHERE id = :gid LIMIT 1");
                        $pstmt->execute([':gid' => $gameId]);
                        $prow = $pstmt->fetch(PDO::FETCH_ASSOC);
                        if ($prow && $prow['passing_score'] !== null) {
                            $passingScore = (int)$prow['passing_score'];
                        }
                    } catch (Exception $e) {
                        // ignore and fall back
                    }

                    if ($passingScore === null) {
                        // fallback default: 50
                        $passingScore = 50;
                    }

                    // Only save to DB if percentage meets or exceeds passing score
                    if ($pct >= $passingScore) {
                        $res = Score::saveAndMark($userId, $gameId, $pct);
                        // If save succeeded, reset session score to avoid duplicate saves
                        if (is_array($res) && !empty($res['success'])) {
                            $_SESSION['trash_score'] = 0;
                            // include newScore in response so client can update UI
                            $res['newScore'] = 0;
                        }
                        echo json_encode($res);
                        exit();
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Chưa đủ điểm để hoàn thành', 'newScore' => $pct, 'required' => $passingScore]);
                        exit();
                    }
                } catch (Exception $e) {
                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                    exit();
                }
            }
        }

        // return percentage to client. If client provided total_drops, use it to compute
        // an accurate percentage; otherwise fall back to default item count.
        $raw = isset($_SESSION['trash_score']) ? (int)$_SESSION['trash_score'] : 0;
        $totalDropsResp = isset($data['total_drops']) ? (int)$data['total_drops'] : null;
        if ($totalDropsResp && $totalDropsResp > 0) {
            $maxPointsResp = $totalDropsResp * 10;
            $pct = ($maxPointsResp > 0) ? (int) round((($raw / $maxPointsResp) * 100)) : 0;
        } else {
            $defaultItems = 21;
            $maxPointsResp = $defaultItems * 10;
            $pct = ($maxPointsResp > 0) ? (int) round((($raw / $maxPointsResp) * 100)) : 0;
        }
        if ($pct > 100) $pct = 100;
        if ($pct < 0) $pct = 0;
        header('Content-Type: application/json');
        echo json_encode(['newScore' => $pct]);
        exit();
    }

    /**
     * Bài học Ngày và Đêm
     */
    public function showDayNightLesson() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $questions = [
            [
                'id' => 1,
                'question' => 'Mặt trời mọc ở hướng nào?',
                'options' => [
                    'A' => 'Bắc',
                    'B' => 'Đông',
                    'C' => 'Nam',
                    'D' => 'Tây'
                ],
                'correct' => 'B',
                'explanation' => 'Do Trái Đất quay từ Tây sang Đông, nên ta luôn nhìn thấy Mặt Trời mọc từ hướng Đông.'
            ],
            [
                'id' => 2,
                'question' => 'Thời gian để Trái Đất quay hết một vòng quanh trục của mình là bao lâu?',
                'options' => [
                    'A' => '12 giờ',
                    'B' => '1 tháng',
                    'C' => '24 giờ',
                    'D' => '1 năm'
                ],
                'correct' => 'C',
                'explanation' => 'Trái Đất mất 24 giờ (một ngày đêm) để tự quay hết một vòng quanh trục của nó.'
            ],
            [
                'id' => 3,
                'question' => 'Khi một nửa Trái Đất hướng về phía Mặt Trời thì nửa đó là ban gì?',
                'options' => [
                    'A' => 'Ban đêm',
                    'B' => 'Ban ngày',
                    'C' => 'Cả ngày và đêm',
                    'D' => 'Buổi chiều'
                ],
                'correct' => 'B',
                'explanation' => 'Phần được Mặt Trời chiếu sáng sẽ là ban ngày, phần còn lại bị khuất bóng là ban đêm.'
            ],
            [
                'id' => 4,
                'question' => 'Câu nào sau đây là ĐÚNG về chuyển động của Trái Đất?',
                'options' => [
                    'A' => 'Trái Đất đứng yên, Mặt Trời quay quanh nó.',
                    'B' => 'Trái Đất vừa quay quanh Mặt Trời, vừa tự quay quanh mình nó.',
                    'C' => 'Trái Đất chỉ quay quanh Mặt Trời.',
                    'D' => 'Mặt Trời và Trái Đất đều đứng yên.'
                ],
                'correct' => 'B',
                'explanation' => 'Trái Đất không đứng yên mà luôn thực hiện 2 chuyển động cùng lúc: tự quay quanh trục và quay quanh Mặt Trời.'
            ],
            [
                'id' => 5,
                'question' => 'Nếu ở Việt Nam đang là buổi trưa, thì ở phía bên kia Trái Đất sẽ là:',
                'options' => [
                    'A' => 'Buổi sáng',
                    'B' => 'Buổi trưa',
                    'C' => 'Ban đêm',
                    'D' => 'Buổi chiều'
                ],
                'correct' => 'C',
                'explanation' => 'Vì Trái Đất hình cầu, khi một bên được chiếu sáng (buổi trưa) thì bên đối diện sẽ chìm trong bóng tối (ban đêm).'
            ]
        ];

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        require_once __DIR__ . '/../views/lessons/science_day_night.php';
    }

    public function showFamilyTree() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        $base_url = str_replace('\\', '/', rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\'));
        
        // DỮ LIỆU 5 LEVEL
        $gameLevels = [
            // LEVEL 1:
            1 => [
                'id' => 1,
                'layout_type' => 'type_2p_3c_fixed', // Layout: 2 phụ huynh (1 cố định), 3 con
                'level_title' => 'Gia đình của Lan (Dễ)',
                'fixed_chars' => ['parent1' => ['id' => 'lan', 'name' => 'Lan']], 
                'available_characters' => ['Hùng', 'Chi', 'An', 'Bình'],
                'clues' => [
                    'Lan là vợ của Hùng.',
                    'Chi là chị cả trong nhà.',
                    'Bình là em út.'
                ],
                'solution' => [
                    'parent2' => 'Hùng', // Bố
                    'child1' => 'Chi',   // Con cả
                    'child2' => 'An',    // Con giữa
                    'child3' => 'Bình'   // Con út
                ]
            ],

            // LEVEL 2:
            2 => [
                'id' => 2,
                'layout_type' => 'type_2p_2c', // Layout: 2 phụ huynh, 2 con
                'level_title' => 'Gia đình của Tuấn & Mai (Trung bình)',
                'fixed_chars' => [],
                'available_characters' => ['Tuấn', 'Mai', 'Tí', 'Tèo'],
                'clues' => [
                    'Tuấn kết hôn với Mai.',
                    'Tí là anh của Tèo.'
                ],
                'solution' => [
                    'parent1' => 'Tuấn',
                    'parent2' => 'Mai',
                    'child1' => 'Tí',
                    'child2' => 'Tèo'
                ]
            ],

            // LEVEL 3:
            3 => [
                'id' => 3,
                'layout_type' => 'type_vertical_3gen', // Layout: Ông -> Bố -> Cháu
                'level_title' => 'Gia đình 3 thế hệ (Khá)',
                'fixed_chars' => [],
                'available_characters' => ['Ba', 'Nam', 'Bi'],
                'clues' => [
                    'Bi là cháu nội của Ba.',
                    'Nam là ba của Bi.'
                ],
                'solution' => [
                    'gen1' => 'Ba',  // Ông
                    'gen2' => 'Nam', // Bố
                    'gen3' => 'Bi'   // Cháu
                ]
            ],

            // LEVEL 4:
            4 => [
                'id' => 4,
                'layout_type' => 'type_2p_3c_fixed_dad',
                'level_title' => 'Gia đình của Bảo (Khá)',
                'fixed_chars' => ['parent1' => ['id' => 'Bảo', 'name' => 'Bảo']],
                'available_characters' => ['Nga', 'Minh', 'Cúc', 'Hải'],
                'clues' => [
                    'Nga là mẹ của 3 đứa trẻ.',
                    'Hải có 1 anh trai và 1 chị gái (Hải là út).',
                    'Cúc không phải con cả.'
                ],
                'solution' => [
                    'parent2' => 'Nga',  // Mẹ
                    'child1' => 'Minh',  // Cả
                    'child2' => 'Cúc',   // Giữa
                    'child3' => 'Hải'    // Út
                ]
            ],

            // LEVEL 5:
            5 => [
                'id' => 5,
                'layout_type' => 'type_3gen_complex',
                'level_title' => 'Gia đình Đạt & Hoàng (Nâng cao)',
                'fixed_chars' => [],
                'available_characters' => ['Đạt', 'Hoàng', 'Linh', 'Dũng', 'Thảo', 'Anh'],
                'clues' => [
                    'Đạt và Hoàng có hai người con là Linh và Dũng.',
                    'Linh là chị của Dũng.',
                    'Đạt là ông nội của Anh.'
                ],
                'solution' => [
                    'gen1_p1' => 'Đạt',   // Ông
                    'gen1_p2' => 'Hoàng', // Bà
                    'gen2_c1' => 'Linh',  // Con (Bác)
                    'gen2_c2' => 'Dũng',  // Con (Bố)
                    'gen2_spouse' => 'Thảo',// Mẹ
                    'gen3_c1' => 'Anh'   // Cháu
                ]
            ]
        ];

        $currentLevelId = isset($_GET['level']) ? (int)$_GET['level'] : 1;
        $currentLevel = $gameLevels[$currentLevelId] ?? $gameLevels[1];
        $totalLevels = count($gameLevels);

        require_once __DIR__ . '/../views/lessons/technology_family_tree_game.php';
    }

    /**
     * TRÒ CHƠI SƠN TINH - THỦY TINH
     */
    public function showCodingGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        
        // Map codes: 0=Đất, 1=Núi(Chặn), 2=Sơn Tinh, 3=Đích(Sính lễ), 4=Nước, 5=Cầu(Sau khi xây)
        $levels = [
            1 => [
                'id' => 1,
                'title' => 'Khu rừng rậm rạp',
                'mission' => 'Tìm Voi chín ngà',
                'target_img' => 'voi9nga.png',
                'hint' => 'Sử dụng các lệnh Đi thẳng và Rẽ để vượt qua mê cung.',
                'concepts' => ['sequence'], // Tuần tự
                'map' => [
                    [1, 1, 1, 1, 1],
                    [1, 0, 0, 3, 1],
                    [1, 0, 1, 1, 1],
                    [1, 2, 0, 0, 1],
                    [1, 1, 1, 1, 1]
                ],
                'limit' => 10,
                'time' => 60 // giây
            ],
            2 => [
                'id' => 2,
                'title' => 'Vách núi cheo leo',
                'mission' => 'Tìm Gà chín cựa',
                'target_img' => 'ga9cua.png',
                'hint' => 'Đường đi lặp lại giống nhau. Hãy dùng khối [Lặp lại] để leo núi nhanh hơn!',
                'concepts' => ['loop'], // Vòng lặp
                'map' => [
                    [1, 1, 1, 3, 1],
                    [1, 1, 0, 0, 1],
                    [1, 0, 0, 1, 1],
                    [2, 0, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ],
                'limit' => 5,
                'time' => 60
            ],
            3 => [
                'id' => 3,
                'title' => 'Đồng cỏ ngập nước',
                'mission' => 'Tìm Ngựa chín hồng mao',
                'target_img' => 'ngua9hongmao.png',
                'hint' => 'Nước lũ dâng cao! Dùng khối [Nếu gặp nước] để bắc cầu.',
                'concepts' => ['condition'], // Điều kiện
                'map' => [
                    [1, 1, 1, 1, 1],
                    [1, 3, 4, 0, 0],
                    [1, 1, 1, 1, 4],
                    [1, 2, 0, 4, 0],
                    [1, 1, 1, 1, 1]
                ],
                'limit' => 12,
                'time' => 70
            ]
        ];

        $currentLevelId = isset($_GET['level']) ? (int)$_GET['level'] : 1;
        $currentLevel = $levels[$currentLevelId] ?? $levels[1];
        $totalLevels = count($levels);

        // Tải view mới
        require_once __DIR__ . '/../views/lessons/technology_coding_game.php';
    }

    /**
     * TRÒ CHƠI CÁC BỘ PHẬN MÁY TÍNH
     */
    public function showComputerPartsGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Định nghĩa các bộ phận.
        $computerParts = [
            ['id' => 'monitor', 'name' => 'Màn hình', 'img' => 'monitor.png'],
            ['id' => 'case', 'name' => 'Thùng máy', 'img' => 'case.png'],
            ['id' => 'keyboard', 'name' => 'Bàn phím', 'img' => 'keyboard.png'],
            ['id' => 'mouse', 'name' => 'Chuột', 'img' => 'mouse.png'],
            ['id' => 'printer', 'name' => 'Máy in', 'img' => 'printer.png'],
            ['id' => 'speaker', 'name' => 'Loa', 'img' => 'speaker.png'],
            ['id' => 'microphone', 'name' => 'Micrô', 'img' => 'microphone.png']
        ];
        
        shuffle($computerParts); // Xáo trộn các bộ phận trong ngân hàng

        // Tải view
        require_once __DIR__ . '/../views/lessons/technology_computer_parts.php';
    }

    /**
     * GAME ĐÁNH MÁY THẠCH SANH
     */
    public function showThachSanhGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        $base_url = str_replace('\\', '/', $base_url);

        // Dữ liệu từ vựng theo cấp độ
        $gameData = [
            'easy' => [ // Hàng phím cơ sở
                'A', 'S', 'D', 'F', 'J', 'K', 'L', 
                'A', 'S', 'D', 'F', 'J', 'K', 'L'
            ],
            'hard' => [ // Từ đơn không dấu
                'GA', 'CA', 'BA', 'DA', 'LA', 'MA', 'NA', 
                'CO', 'BO', 'HO', 'TO', 'LO', 
                'VE', 'XE', 'BE', 'HE',
                'VOI', 'CUA', 'MEO', 'CHO'
            ]
        ];

        $level = $_GET['level'] ?? 'easy';
        $wordList = $gameData[$level];

        require_once __DIR__ . '/../views/lessons/technology_typing_thach_sanh.php';
    }

    /**
     * TRÒ CHƠI HỌA SĨ MÁY TÍNH
     */
    public function showPainterGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Lấy chủ đề từ URL, mặc định là 'free' (Tự vẽ)
        $topic = $_GET['topic'] ?? 'free';
        
        // Cấu hình các chủ đề
        $topicConfig = [
            'free' => [
                'title' => 'Tự do sáng tạo', 
                'bg_image' => '', // Không có nền
                'icon' => 'icon_free.png'
            ],
            'house' => [
                'title' => 'Ngôi nhà mơ ước', 
                'bg_image' => 'bg_house.png', // Ảnh ngôi nhà
                'icon' => 'icon_house.png'
            ],
            'animal' => [
                'title' => 'Thế giới động vật', 
                'bg_image' => 'bg_animal.png', // Ảnh con vật
                'icon' => 'icon_animal.png'
            ],
            'computer' => [
                'title' => 'Máy tính của em', 
                'bg_image' => 'bg_computer.png', // Ảnh máy tính
                'icon' => 'icon_computer.png'
            ],
            'nature' => [
                'title' => 'Thiên nhiên tươi đẹp', 
                'bg_image' => 'bg_nature.png', // Ảnh cây cối
                'icon' => 'icon_nature.png'
            ]
        ];

        // Kiểm tra nếu chủ đề không tồn tại thì quay về 'free'
        $currentConfig = $topicConfig[$topic] ?? $topicConfig['free'];
        $timeLimit = 300; // Thời gian mặc định 5 phút

        require_once __DIR__ . '/../views/lessons/technology_painter_game.php';
    }

    /*TRÒ CHƠI CƠ CHẾ HOA*/
    public function showFlowerMechanismGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
        
        // Khởi tạo điểm game
        if (!isset($_SESSION['flower_score'])) {
            $_SESSION['flower_score'] = 0;
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Dữ liệu game (tuỳ bạn thêm)
        $flowerParts = [
            ['id' => 'petal', 'name' => 'Cánh hoa'],
            ['id' => 'stamen', 'name' => 'Nhị hoa'],
            ['id' => 'pistil', 'name' => 'Nhuỵ hoa'],
            ['id' => 'sepal', 'name' => 'Đài hoa'],
            ['id' => 'stem', 'name' => 'Thân'],
        ];

        shuffle($flowerParts);

        // Load view
        require_once __DIR__ . '/../views/lessons/engineering_flower_mechanism.php';
    }

  
    public function updateFlowerScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit') {
            echo json_encode(['success' => false, 'message' => 'Unsupported action']);
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        $correct = isset($data['correct']) ? (bool)$data['correct'] : false;
        if (!$correct) {
            echo json_encode(['success' => false, 'message' => 'Prediction incorrect; not saved']);
            return;
        }

        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;
        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();

            if (empty($gameId)) {
                // Prefer exact match for the flower experiment game name
                $preferred = ['Hoa yêu thương nở rộ', 'Hoa yêu thương'];
                foreach ($preferred as $nm) {
                    $pstmt = $db->prepare('SELECT id FROM games WHERE game_name = :name LIMIT 1');
                    $pstmt->execute([':name' => $nm]);
                    $pr = $pstmt->fetch(PDO::FETCH_ASSOC);
                    if ($pr) { $gameId = (int)$pr['id']; break; }
                }
                // Looser match
                if (empty($gameId)) {
                    $lstmt = $db->prepare('SELECT id FROM games WHERE game_name LIKE :like LIMIT 1');
                    $lstmt->execute([':like' => '%Hoa%']);
                    $lr = $lstmt->fetch(PDO::FETCH_ASSOC);
                    if ($lr) $gameId = (int)$lr['id'];
                }
                // Fallback to topic_id
                if (empty($gameId)) {
                    $stmt = $db->prepare('SELECT id FROM games WHERE topic_id = :tid LIMIT 1');
                    $stmt->execute([':tid' => 4]);
                    $r = $stmt->fetch(PDO::FETCH_ASSOC);
                    if ($r) $gameId = (int)$r['id'];
                }
            }

            if (empty($gameId)) {
                echo json_encode(['success' => false, 'message' => 'Could not resolve game id for flower experiment']);
                return;
            }

            $pct = 100;
            $res = Score::saveAndMark((int)$userId, $gameId, $pct);
            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * API: Commit score for Family Tree game when final level completed
     * Saves 100% for the user for a game in topic_id = 3 (Technology)
     */
    public function updateFamilyTreeScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit') {
            echo json_encode(['success' => false, 'message' => 'Unsupported action']);
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        // allow caller to provide game_id, otherwise find by topic_id = 3
        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;

        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();
            if (empty($gameId)) {
                // Prefer exact match for the Family Tree game name
                $preferred = ['Cây gia đình', 'Gia đình'];
                foreach ($preferred as $nm) {
                    $pstmt = $db->prepare('SELECT id FROM games WHERE game_name = :name LIMIT 1');
                    $pstmt->execute([':name' => $nm]);
                    $pr = $pstmt->fetch(PDO::FETCH_ASSOC);
                    if ($pr) { $gameId = (int)$pr['id']; break; }
                }
                // Looser match
                if (empty($gameId)) {
                    $lstmt = $db->prepare('SELECT id FROM games WHERE game_name LIKE :like LIMIT 1');
                    $lstmt->execute([':like' => '%Cây gia đình%']);
                    $lr = $lstmt->fetch(PDO::FETCH_ASSOC);
                    if ($lr) $gameId = (int)$lr['id'];
                }
                // Fallback to topic_id
                if (empty($gameId)) {
                    $tstmt = $db->prepare('SELECT id FROM games WHERE topic_id = :tid LIMIT 1');
                    $tstmt->execute([':tid' => 3]);
                    $trow = $tstmt->fetch(PDO::FETCH_ASSOC);
                    if ($trow) $gameId = (int)$trow['id'];
                }
            }

            if (empty($gameId)) {
                echo json_encode(['success' => false, 'message' => 'Could not resolve game id for family tree']);
                return;
            }

            // Prevent duplicate commits for this session
            if (!empty($_SESSION['family_tree_committed'])) {
                echo json_encode(['success' => true, 'message' => 'Already committed', 'newScore' => 100]);
                return;
            }

            $pct = 100;
            $res = Score::saveAndMark((int)$userId, $gameId, $pct);
            if (is_array($res) && !empty($res['success'])) {
                $_SESSION['family_tree_committed'] = true;
            }
            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * API: Commit score for Computer Parts game when user completes assembly
     * Saves 100% for the user for a game in topic_id = 3 (Technology)
     */
    public function updateComputerPartsScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit') {
            echo json_encode(['success' => false, 'message' => 'Unsupported action']);
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;

        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();
            if (empty($gameId)) {
                // Prefer exact match for the game name
                $preferred = ['Các bộ phận của máy tính', 'Các bộ phận máy tính', 'Các bộ phận của máy tính'];
                foreach ($preferred as $nm) {
                    $pstmt = $db->prepare('SELECT id FROM games WHERE game_name = :name LIMIT 1');
                    $pstmt->execute([':name' => $nm]);
                    $pr = $pstmt->fetch(PDO::FETCH_ASSOC);
                    if ($pr) { $gameId = (int)$pr['id']; break; }
                }
                if (empty($gameId)) {
                    $lstmt = $db->prepare('SELECT id FROM games WHERE game_name LIKE :like LIMIT 1');
                    $lstmt->execute([':like' => '%bộ phận máy tính%']);
                    $lr = $lstmt->fetch(PDO::FETCH_ASSOC);
                    if ($lr) $gameId = (int)$lr['id'];
                }
                if (empty($gameId)) {
                    $tstmt = $db->prepare('SELECT id FROM games WHERE topic_id = :tid LIMIT 1');
                    $tstmt->execute([':tid' => 3]);
                    $trow = $tstmt->fetch(PDO::FETCH_ASSOC);
                    if ($trow) $gameId = (int)$trow['id'];
                }
            }

            if (empty($gameId)) {
                echo json_encode(['success' => false, 'message' => 'Could not resolve game id for computer parts']);
                return;
            }

            if (!empty($_SESSION['computer_parts_committed'])) {
                echo json_encode(['success' => true, 'message' => 'Already committed', 'newScore' => 100]);
                return;
            }

            $pct = 100;
            $res = Score::saveAndMark((int)$userId, $gameId, $pct);
            if (is_array($res) && !empty($res['success'])) {
                $_SESSION['computer_parts_committed'] = true;
            }
            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * API: Commit score for Thach Sanh typing game
     * Expects JSON: { action: 'commit', score_pct: <int>, game_name?: string }
     */
    public function updateThachSanhScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit' || !isset($data['score_pct'])) {
            echo json_encode(['success' => false, 'message' => 'Unsupported action or missing score_pct']);
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        $scorePct = (int)$data['score_pct'];
        $gameName = isset($data['game_name']) ? trim($data['game_name']) : null;
        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;

        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();
            if (empty($gameId)) {
                if (!empty($gameName)) {
                    $pstmt = $db->prepare('SELECT id FROM games WHERE game_name = :name LIMIT 1');
                    $pstmt->execute([':name' => $gameName]);
                    $pr = $pstmt->fetch(PDO::FETCH_ASSOC);
                    if ($pr) $gameId = (int)$pr['id'];
                }
                if (empty($gameId)) {
                    $lstmt = $db->prepare('SELECT id FROM games WHERE game_name LIKE :like LIMIT 1');
                    $lstmt->execute([':like' => '%Thạch%']);
                    $lr = $lstmt->fetch(PDO::FETCH_ASSOC);
                    if ($lr) $gameId = (int)$lr['id'];
                }
            }

            if (empty($gameId)) {
                echo json_encode(['success' => false, 'message' => 'Could not resolve game id for typing game']);
                return;
            }

            // Prevent duplicate commits in session
            if (!empty($_SESSION['thach_sanh_committed'])) {
                echo json_encode(['success' => true, 'message' => 'Already committed', 'newScore' => $scorePct]);
                return;
            }

            $res = Score::saveAndMark((int)$userId, $gameId, max(0, min(100, $scorePct)));
            if (is_array($res) && !empty($res['success'])) {
                $_SESSION['thach_sanh_committed'] = true;
            }
            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * API: Reset commit flag for Thạch Sanh so user can re-submit after replay
     */
    public function resetThachSanhCommit() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');
        try {
            if (!empty($_SESSION['thach_sanh_committed'])) {
                unset($_SESSION['thach_sanh_committed']);
            }
            echo json_encode(['success' => true, 'message' => 'reset']);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    /**
     * API: Commit score for Painter game when user presses submit
     * Saves 100% for the user for a game in topic_id = 3 (Technology)
     */
    public function updatePainterScore() {
        if (session_status() == PHP_SESSION_NONE) session_start();
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['action']) || $data['action'] !== 'commit') {
            echo json_encode(['success' => false, 'message' => 'Unsupported action']);
            return;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (empty($userId)) {
            echo json_encode(['success' => false, 'message' => 'User not logged in']);
            return;
        }

        // allow caller to provide game_id, otherwise find by topic_id = 3
        $gameId = isset($data['game_id']) ? (int)$data['game_id'] : null;

        try {
            require_once __DIR__ . '/../models/Database.php';
            require_once __DIR__ . '/../models/Score.php';

            $db = (new Database())->getConnection();
            if (empty($gameId)) {
                // Prefer exact match for the painter game name to avoid picking another game with same topic
                $preferredNames = [
                    'Em làm họa sĩ máy tính',
                    'Em làm họa sĩ',
                    'Họa sĩ máy tính'
                ];
                foreach ($preferredNames as $nm) {
                    $pstmt = $db->prepare('SELECT id FROM games WHERE game_name = :name LIMIT 1');
                    $pstmt->execute([':name' => $nm]);
                    $pr = $pstmt->fetch(PDO::FETCH_ASSOC);
                    if ($pr) { $gameId = (int)$pr['id']; break; }
                }
                // Looser match by keyword
                if (empty($gameId)) {
                    $lstmt = $db->prepare('SELECT id FROM games WHERE game_name LIKE :like LIMIT 1');
                    $lstmt->execute([':like' => '%họa sĩ%']);
                    $lr = $lstmt->fetch(PDO::FETCH_ASSOC);
                    if ($lr) $gameId = (int)$lr['id'];
                }
                // Fallback to any game under topic_id=3
                if (empty($gameId)) {
                    $tstmt = $db->prepare('SELECT id FROM games WHERE topic_id = :tid LIMIT 1');
                    $tstmt->execute([':tid' => 3]);
                    $trow = $tstmt->fetch(PDO::FETCH_ASSOC);
                    if ($trow) $gameId = (int)$trow['id'];
                }
            }

            if (empty($gameId)) {
                echo json_encode(['success' => false, 'message' => 'Could not resolve game id for painter']);
                return;
            }

            // Prevent duplicate commits for this session
            if (!empty($_SESSION['painter_committed'])) {
                echo json_encode(['success' => true, 'message' => 'Already committed', 'newScore' => 100]);
                return;
            }

            $pct = 100;
            $res = Score::saveAndMark((int)$userId, $gameId, $pct);
            if (is_array($res) && !empty($res['success'])) {
                $_SESSION['painter_committed'] = true;
            }
            echo json_encode($res);
            return;
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            return;
        }
    }

    public function showBridgeGame() {
        require_once 'views/lessons/engineering_bridge_game.php';
    }

    /**
     * TRÒ CHƠI CHẾ TẠO XE
     */
    public function showCarBuilderGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Dữ liệu màn chơi (Yêu cầu chỉ số khác nhau)
        $levels = [
            1 => [
                'id' => 1,
                'title' => 'Đường Đua Tốc Độ',
                'desc' => 'Đường bằng phẳng và dài. Hãy chế tạo chiếc xe có Tốc độ cao nhất!',
                'bg' => 'bg_track.jpg',
                'req_speed' => 80,    // Yêu cầu Tốc độ
                'req_power' => 20,    // Yêu cầu Sức mạnh (Leo dốc)
                'req_grip' => 20      // Yêu cầu Độ bám (Đường trơn)
            ],
            2 => [
                'id' => 2,
                'title' => 'Vượt Đèo Dốc',
                'desc' => 'Ngọn núi rất cao! Xe cần Động cơ mạnh và Bánh lớn để leo dốc.',
                'bg' => 'bg_hill.jpg',
                'req_speed' => 30,
                'req_power' => 70,    // Cần sức mạnh lớn
                'req_grip' => 40
            ],
            3 => [
                'id' => 3,
                'title' => 'Đầm Lầy Trơn Trượt',
                'desc' => 'Đường rất trơn. Nếu không có Độ bám tốt, xe sẽ bị trượt!',
                'bg' => 'bg_mud.jpg',
                'req_speed' => 40,
                'req_power' => 40,
                'req_grip' => 80      // Cần độ bám cao
            ]
        ];

        // Dữ liệu các bộ phận xe
        $parts = [
            'body' => [
                ['id' => 'sport', 'name' => 'Xe Đua', 'img' => 'body_sport.png', 'speed' => 40, 'power' => 10, 'grip' => 10],
                ['id' => 'truck', 'name' => 'Xe Tải', 'img' => 'body_truck.png', 'speed' => 10, 'power' => 40, 'grip' => 20],
                ['id' => 'buggy', 'name' => 'Xe Địa Hình', 'img' => 'body_buggy.png', 'speed' => 25, 'power' => 25, 'grip' => 25],
            ],
            'engine' => [
                ['id' => 'v4', 'name' => 'Động cơ V4', 'img' => 'engine_v4.png', 'speed' => 20, 'power' => 10, 'grip' => 0],
                ['id' => 'v8', 'name' => 'Động cơ V8', 'img' => 'engine_v8.png', 'speed' => 40, 'power' => 30, 'grip' => 0],
                ['id' => 'electric', 'name' => 'Động cơ Điện', 'img' => 'engine_electric.png', 'speed' => 30, 'power' => 20, 'grip' => 0],
            ],
            'wheel' => [
                ['id' => 'small', 'name' => 'Bánh Nhỏ', 'img' => 'wheel_small.png', 'speed' => 20, 'power' => 0, 'grip' => 10],
                ['id' => 'big', 'name' => 'Bánh Lớn', 'img' => 'wheel_big.png', 'speed' => 10, 'power' => 20, 'grip' => 30],
                ['id' => 'chain', 'name' => 'Bánh Xích', 'img' => 'wheel_chains.png', 'speed' => 5, 'power' => 30, 'grip' => 50],
            ],
            'addon' => [
                ['id' => 'none', 'name' => 'Không', 'img' => '', 'speed' => 0, 'power' => 0, 'grip' => 0],
                ['id' => 'spoiler', 'name' => 'Cánh Gió', 'img' => 'spoiler.png', 'speed' => 10, 'power' => 0, 'grip' => 20],
                ['id' => 'booster', 'name' => 'Tên Lửa', 'img' => 'booster.png', 'speed' => 30, 'power' => 10, 'grip' => -10], // Tăng tốc nhưng giảm bám
            ]
        ];

        $currentLevelId = isset($_GET['level']) ? (int)$_GET['level'] : 1;
        $currentLevel = $levels[$currentLevelId] ?? $levels[1];
        $totalLevels = count($levels);

        require_once __DIR__ . '/../views/lessons/engineering_car_builder.php';
    }

    /**
     * HẬU NGHỆ BẮN MẶT TRỜI
     */
    public function showMathAngleGame() {
        if (session_status() == PHP_SESSION_NONE) { session_start(); }
        
        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        // Dữ liệu các màn chơi
        $levels = [
            1 => [
                'id' => 1,
                'title' => 'Bình Minh (Góc Nhọn)',
                'desc' => 'Mặt trời vừa mọc ở phía Đông. Hãy bắn hạ nó! Góc bắn nhỏ hơn 90°.',
                'sun_pos' => ['x' => 0.8, 'y' => 0.4],
                'type' => 'acute'
            ],
            2 => [
                'id' => 2,
                'title' => 'Giữa Trưa (Góc Vuông)',
                'desc' => 'Mặt trời đang đứng bóng. Góc bắn là 90°.',
                'sun_pos' => ['x' => 0.5, 'y' => 0.15],
                'type' => 'right'
            ],
            3 => [
                'id' => 3,
                'title' => 'Hoàng Hôn (Góc Tù)',
                'desc' => 'Mặt trời lặn về phía Tây. Hãy bắn vòng qua núi! Góc bắn lớn hơn 90°.',
                'sun_pos' => ['x' => 0.2, 'y' => 0.4],
                'type' => 'obtuse'
            ]
        ];

        $currentLevelId = isset($_GET['level']) ? (int)$_GET['level'] : 1;
        $currentLevel = $levels[$currentLevelId] ?? $levels[1];
        $totalLevels = count($levels);

        require_once __DIR__ . '/../views/lessons/math_angle_game.php';
    }
}