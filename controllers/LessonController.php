<?php

class LessonController {

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
                $_SESSION['nutrition_score'] += (int)$data['points'];
            } elseif ($data['action'] === 'reset') {
                $_SESSION['nutrition_score'] = 0;
            }
        }

        header('Content-Type: application/json');
        echo json_encode(['newScore' => $_SESSION['nutrition_score']]);
        exit();
    }

    /**
     * TRÒ CHƠI LẮP GHÉP BỘ PHẬN CÂY
     */
    public function showPlantGame() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        // *** Khởi tạo điểm cho game ***
        if (!isset($_SESSION['plant_score'])) {
            $_SESSION['plant_score'] = 0;
        }

        $base_url = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

        $plantParts = [
            ['id' => 'part-hoa', 'name' => 'hoa', 'img' => 'plant_hoa.png'],
            ['id' => 'part-la1', 'name' => 'la1', 'img' => 'plant_la1.png'],
            ['id' => 'part-la2', 'name' => 'la2', 'img' => 'plant_la2.png'], 
            ['id' => 'part-than', 'name' => 'than', 'img' => 'plant_than.png'],
            ['id' => 'part-re', 'name' => 're', 'img' => 'plant_re.png'],
        ];
        
        shuffle($plantParts); 

        require_once __DIR__ . '/../views/lessons/science_plant_game.php';
    }

    /**
     * API Cập nhật điểm cho Game Ghép Bộ Phận Cây ***
     */
    public function updatePlantScore() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['plant_score'])) {
            $_SESSION['plant_score'] = 0;
        }

        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            if ($data['action'] === 'add_points' && isset($data['points'])) {
                $_SESSION['plant_score'] += (int)$data['points'];
            } elseif ($data['action'] === 'reset') {
                $_SESSION['plant_score'] = 0;
            }
        }

        header('Content-Type: application/json');
        echo json_encode(['newScore' => $_SESSION['plant_score']]);
        exit();
    }
}