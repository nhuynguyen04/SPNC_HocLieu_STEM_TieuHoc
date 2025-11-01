<?php
// --- TRÒ CHƠI PHA MÀU (Color Mixing Game) ---
$router->get('/science/color-game', [LessonController::class, 'showColorGame']);

// --- TRÒ CHƠI THÁP DINH DƯỠNG (Nutrition Game) ---
$router->get('/science/nutrition', [LessonController::class, 'showNutritionGame']);

// 2. Đường dẫn API (POST) để cập nhật điểm
$router->post('/science/update-score', [LessonController::class, 'updateNutritionScore']);