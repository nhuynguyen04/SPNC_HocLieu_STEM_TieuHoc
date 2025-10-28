<?php
// Giả sử bạn import LessonController ở đây
// use App\Controllers\LessonController;

// --- TRÒ CHƠI PHA MÀU (Color Mixing Game) ---
// Đường dẫn GET để hiển thị trò chơi
// Nó cũng xử lý logic 'next' và 'points' qua tham số ?next=1
$router->get('/science/color-game', [LessonController::class, 'showColorGame']);

// --- TRÒ CHƠI THÁP DINH DƯỠNG (Nutrition Game) ---
// 1. Đường dẫn GET để xem trò chơi
$router->get('/science/nutrition', [LessonController::class, 'showNutritionGame']);

// 2. Đường dẫn API (POST) để cập nhật điểm
$router->post('/science/update-score', [LessonController::class, 'updateNutritionScore']);