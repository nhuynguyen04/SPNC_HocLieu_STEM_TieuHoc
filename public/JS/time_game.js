document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('clockCanvas');
    const ctx = canvas.getContext('2d');
    
    // UI Elements
    const targetHourEl = document.getElementById('target-hour');
    const targetMinEl = document.getElementById('target-minute');
    const checkBtn = document.getElementById('check-btn');
    const qCurrentEl = document.getElementById('q-current');
    const qTotalEl = document.getElementById('q-total');
    
    // Modal
    const modal = document.getElementById('result-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMsg = document.getElementById('modal-message');
    const nextBtn = document.getElementById('next-btn');

    // Game State
    const radius = canvas.height / 2;
    ctx.translate(radius, radius); // Dời gốc tọa độ về tâm
    const clockRadius = radius * 0.9;

    let questions = levelData.questions;
    let currentQIndex = 0;
    
    // Góc hiện tại của kim (tính bằng radian, 12h = -PI/2)
    let hourAngle = -Math.PI / 2;   // Mặc định 12h
    let minuteAngle = -Math.PI / 2; // Mặc định 12h
    
    let isDraggingHour = false;
    let isDraggingMinute = false;

    // --- KHỞI TẠO ---
    qTotalEl.innerText = questions.length;
    loadQuestion(0);
    drawClock();

    function loadQuestion(index) {
        if (index >= questions.length) {
            // Hết level
            finishLevel();
            return;
        }
        currentQIndex = index;
        qCurrentEl.innerText = index + 1;
        
        // Hiển thị giờ mục tiêu
        const q = questions[index];
        targetHourEl.innerText = q.h.toString().padStart(2, '0');
        targetMinEl.innerText = q.m.toString().padStart(2, '0');
        
        // Reset kim về 12h cho dễ chơi
        hourAngle = -Math.PI / 2;
        minuteAngle = -Math.PI / 2;
        drawClock();
    }

    // --- VẼ ĐỒNG HỒ ---
    function drawClock() {
        // Xóa canvas (reset transform tạm thời để xóa)
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        drawFace(ctx, clockRadius);
        drawNumbers(ctx, clockRadius);
        drawHand(ctx, hourAngle, clockRadius * 0.5, 10, "#e74c3c"); // Kim giờ ngắn, đỏ
        drawHand(ctx, minuteAngle, clockRadius * 0.8, 6, "#3498db"); // Kim phút dài, xanh
        drawCenter(ctx);
    }

    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Viền đồng hồ
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = radius * 0.05;
        ctx.stroke();
        
        // Vẽ vạch phút
        for(let i=0; i<60; i++) {
            const ang = (i * 6) * Math.PI / 180;
            const len = (i % 5 === 0) ? radius * 0.15 : radius * 0.05;
            const width = (i % 5 === 0) ? 4 : 1;
            
            ctx.rotate(ang);
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.95);
            ctx.lineTo(0, -radius * 0.95 + len);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = width;
            ctx.stroke();
            ctx.rotate(-ang);
        }
    }

    function drawNumbers(ctx, radius) {
        ctx.font = radius * 0.15 + "px Fredoka";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "#333";
        
        for(let num = 1; num < 13; num++){
            let ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.80);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.80);
            ctx.rotate(-ang);
        }
    }

    function drawHand(ctx, pos, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    function drawCenter(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }

    // --- TƯƠNG TÁC CHUỘT ---
    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) - radius, // Tọa độ so với tâm (0,0)
            y: (evt.clientY - rect.top) - radius
        };
    }

    // Tính góc từ tọa độ chuột (trả về radian chuẩn cho đồng hồ)
    function getAngle(x, y) {
        let angle = Math.atan2(y, x); 
        return angle + Math.PI / 2; // Điều chỉnh để vẽ (vẽ mặc định hướng lên -Y)
    }

    canvas.addEventListener('mousedown', (e) => {
        const mouse = getMousePos(e);
        // Nếu click xa tâm -> Kim phút, gần tâm -> Kim giờ
        const dist = Math.sqrt(mouse.x*mouse.x + mouse.y*mouse.y);
        
        if (dist < clockRadius * 0.6) {
            isDraggingHour = true;
        } else {
            isDraggingMinute = true;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDraggingHour && !isDraggingMinute) return;
        
        const mouse = getMousePos(e);
        const angle = getAngle(mouse.x, mouse.y); // Trả về góc vẽ

        if (isDraggingMinute) {
            minuteAngle = angle;
            
        } else if (isDraggingHour) {
            hourAngle = angle;
        }
        
        drawClock();
    });

    window.addEventListener('mouseup', () => {
        isDraggingHour = false;
        isDraggingMinute = false;
        
        // SNAP (Hít vào vạch số cho đẹp)
        snapHands();
        drawClock();
    });

    function snapHands() {
        // Hít kim phút vào mỗi 6 độ (1 phút)
        let mDeg = (minuteAngle * 180 / Math.PI);
        let mSnap = Math.round(mDeg / 6) * 6;
        minuteAngle = mSnap * Math.PI / 180;
    }

    // --- KIỂM TRA KẾT QUẢ ---
    checkBtn.addEventListener('click', () => {
        const q = questions[currentQIndex];
    
        let userMinDeg = (minuteAngle * 180 / Math.PI) % 360;
        if (userMinDeg < 0) userMinDeg += 360;
        
        let userHourDeg = (hourAngle * 180 / Math.PI) % 360;
        if (userHourDeg < 0) userHourDeg += 360;

        // Góc mục tiêu
        const targetMinDeg = q.m * 6; // 6 độ 1 phút
        // Kim giờ di chuyển theo phút: (Giờ * 30) + (Phút * 0.5)
        const targetHourDeg = ((q.h % 12) * 30) + (q.m * 0.5);

        // Chấp nhận sai số (khoảng +/- 6 độ cho phút, +/- 15 độ cho giờ)
        const minDiff = Math.abs(userMinDeg - targetMinDeg);
        const hourDiff = Math.abs(userHourDeg - targetHourDeg);
        
        // Xử lý trường hợp qua mốc 0/360
        const isMinCorrect = minDiff < 7 || (360 - minDiff) < 7;
        const isHourCorrect = hourDiff < 15 || (360 - hourDiff) < 15;

        if (isMinCorrect && isHourCorrect) {
            showModal(true);
        } else {
            showModal(false);
        }
    });

    function showModal(isWin) {
        modal.style.display = 'flex';
        if (isWin) {
            modalTitle.innerText = "Chính Xác!";
            modalTitle.style.color = "#2ecc71";
            modalMsg.innerText = "Em rất giỏi xem giờ!";
            nextBtn.onclick = () => {
                modal.style.display = 'none';
                loadQuestion(currentQIndex + 1);
            };
        } else {
            modalTitle.innerText = "Chưa đúng rồi";
            modalTitle.style.color = "#e74c3c";
            modalMsg.innerText = "Hãy kiểm tra lại vị trí các kim nhé.";
            nextBtn.onclick = () => modal.style.display = 'none';
        }
    }

    function finishLevel() {
        modal.style.display = 'flex';
        modalTitle.innerText = "HOÀN THÀNH CẤP ĐỘ!";
        modalTitle.style.color = "#f1c40f";
        modalMsg.innerText = "Em đã hoàn thành tất cả câu hỏi.";
        
        if (levelData.id < totalGameLevels) {
            nextBtn.innerText = "Cấp độ tiếp theo";
            nextBtn.onclick = () => window.location.href = `${baseUrl}/views/lessons/math-time-game?level=${levelData.id + 1}`;
        } else {
            nextBtn.innerText = "Về trang bài học";
            nextBtn.onclick = () => window.location.href = `${baseUrl}/views/lessons/math.php`;
        }
    }
});