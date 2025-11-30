<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xây Cầu Vượt - Kỹ Sư Nhí</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
    
    <link rel="stylesheet" href="/SPNC_HocLieu_STEM_TieuHoc/public/CSS/bridge_game.css">
</head>
<body>

    <div id="ui-layer">
        <div class="header-bar">
            <div style="display:flex; gap:10px;">
                <div class="btn btn-replay" onclick="resetGame()" title="Chơi lại">↻</div>
                <div class="btn btn-play" onclick="startGame()" title="Chạy thử">▶</div>
            </div>
            <div class="game-info">Level 1: Xây Cầu</div>
            <div class="btn btn-next" id="btn-next" onclick="nextLevel()" title="Màn tiếp">➡</div>
        </div>
        <div id="supply-zone"><span id="supply-label">KHO VẬT LIỆU</span></div>
        <div id="status-msg"></div>
    </div>

    <script src="/SPNC_HocLieu_STEM_TieuHoc/public/JS/bridge_game.js"></script>
</body>
</html>