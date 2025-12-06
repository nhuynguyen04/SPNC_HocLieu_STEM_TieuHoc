// shape_game.js - Logic mới: TỰ DO SÁNG TẠO, chỉ kiểm tra đặc điểm hình học
document.addEventListener('DOMContentLoaded', function() {
    // Các phần tử DOM
    const canvas = document.getElementById('shapeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const completedCount = document.getElementById('completedCount');
    const currentChallengeElement = document.getElementById('currentChallenge');
    const shapeIcon = document.getElementById('shapeIcon');
    const challengeTitle = document.getElementById('challengeTitle');
    const challengeDesc = document.getElementById('challengeDesc');
    const questionText = document.getElementById('questionText');
    const hintContent = document.getElementById('hintContent');
    const knowledgeContent = document.getElementById('knowledgeContent');
    const funFactElement = document.getElementById('funFact');
    const shapeTips = document.getElementById('shapeTips');
    const currentShapeName = document.getElementById('currentShapeName');
    const targetShapeName = document.getElementById('targetShapeName');
    const feedbackText = document.getElementById('feedbackText');
    const feedbackIcon = document.querySelector('.feedback-icon');
    const nextShapeIcon = document.getElementById('nextShapeIcon');
    const nextShapeName = document.getElementById('nextShapeName');
    const nextShapeDesc = document.getElementById('nextShapeDesc');
    
    // Game state
    let currentChallengeIndex = 0;
    let score = 0;
    let totalTime = 0;
    let timerInterval;
    let completedChallenges = 0;
    let points = [];
    let currentChallenge = null;
    
    // Các biểu tượng hình
    const shapeIcons = {
        'square': '🟦',
        'rectangle': '⬜',
        'triangle': '🔺',
        'trapezoid': '🔶',
        'parallelogram': '🔷',
        'rhombus': '💎'
    };
    
    // Tên hình
    const shapeNames = {
        'square': 'Hình vuông',
        'rectangle': 'Hình chữ nhật',
        'triangle': 'Tam giác',
        'trapezoid': 'Hình thang vuông',
        'parallelogram': 'Hình bình hành',
        'rhombus': 'Hình thoi'
    };
    
    // Khởi tạo game
    function initGame() {
        loadChallenge(currentChallengeIndex);
        initDraggablePoints();
        startTimer();
        updateCompletedCount();
        
        // Thêm sự kiện
        document.getElementById('checkBtn').addEventListener('click', checkSolution);
        document.getElementById('resetBtn').addEventListener('click', resetPoints);
        document.getElementById('showAnswerBtn').addEventListener('click', showExample);
        document.getElementById('showHint').addEventListener('click', toggleHint);
        document.getElementById('nextChallengeBtn').addEventListener('click', nextChallenge);
    }
    
    // Tải thử thách
    function loadChallenge(index) {
        if (!window.gameData || !window.gameData.challenges[index]) return;
        
        currentChallengeIndex = index;
        currentChallenge = window.gameData.challenges[index];
        
        // Cập nhật giao diện
        currentChallengeElement.textContent = currentChallenge.id;
        shapeIcon.textContent = shapeIcons[currentChallenge.targetShape] || '📐';
        challengeTitle.textContent = currentChallenge.title;
        challengeDesc.textContent = currentChallenge.description;
        questionText.textContent = currentChallenge.question;
        currentShapeName.textContent = shapeNames[currentChallenge.startingShape];
        targetShapeName.textContent = shapeNames[currentChallenge.targetShape];
        
        // Cập nhật kiến thức
        updateKnowledge();
        
        // Đặt điểm bắt đầu
        points = JSON.parse(JSON.stringify(currentChallenge.startingPoints));
        
        // Cập nhật thử thách tiếp theo
        updateNextChallenge();
        
        // Vẽ lại
        updateCanvas();
        updateDraggablePoints();
        
        // Reset feedback
        showFeedback('👋', `Hãy tự do kéo các điểm để tạo ${shapeNames[currentChallenge.targetShape]}!`);
        
        // Disable nút tiếp theo
        document.getElementById('nextChallengeBtn').disabled = true;
        document.getElementById('nextChallengeBtn').innerHTML = '<span class="btn-icon">🔒</span><span class="btn-text">Mở khóa tiếp theo</span>';
        
        // Ẩn gợi ý
        hintContent.classList.remove('show');
    }
    
    // Cập nhật kiến thức
    function updateKnowledge() {
        // Cập nhật kiến thức
        const facts = currentChallenge.knowledge.split('. ');
        const factsHtml = facts.map(fact => 
            `<div class="fact-item">
                <span class="fact-icon">📚</span>
                <div class="fact-text">${fact}.</div>
            </div>`
        ).join('');
        
        knowledgeContent.innerHTML = factsHtml;
        
        // Cập nhật fun fact
        funFactElement.textContent = currentChallenge.funFact;
        
        // Cập nhật tips
        shapeTips.innerHTML = `
            <p><strong>Để nhận biết ${shapeNames[currentChallenge.targetShape]}:</strong></p>
            <ul>
                ${currentChallenge.tips.split('?').map(tip => tip.trim()).filter(tip => tip).map(tip => `<li>${tip}?</li>`).join('')}
            </ul>
        `;
    }
    
    // Cập nhật thử thách tiếp theo
    function updateNextChallenge() {
        const nextIndex = currentChallengeIndex + 1;
        if (nextIndex < window.gameData.challenges.length) {
            const nextChallenge = window.gameData.challenges[nextIndex];
            nextShapeIcon.textContent = shapeIcons[nextChallenge.targetShape] || '🔜';
            nextShapeName.textContent = shapeNames[nextChallenge.targetShape];
            nextShapeDesc.textContent = nextChallenge.title;
        } else {
            nextShapeIcon.textContent = '🏆';
            nextShapeName.textContent = 'Hoàn thành!';
            nextShapeDesc.textContent = 'Bạn đã học xong tất cả hình!';
        }
    }
    
    // Vẽ canvas
    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Vẽ lưới mờ
        drawGrid();
        
        // Vẽ hình hiện tại
        drawShape();
        
        // Vẽ các điểm
        drawPoints();
    }
    
    // Vẽ lưới
    function drawGrid() {
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    // Vẽ hình
    function drawShape() {
        if (points.length < 2) return;
        
        // Xác định số cạnh thực tế (loại bỏ điểm trùng)
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length < 2) return;
        
        ctx.fillStyle = 'rgba(66, 133, 244, 0.1)';
        ctx.strokeStyle = '#4285f4';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(uniquePoints[0][0], uniquePoints[0][1]);
        
        for (let i = 1; i < uniquePoints.length; i++) {
            ctx.lineTo(uniquePoints[i][0], uniquePoints[i][1]);
        }
        
        // Đóng hình nếu có đủ điểm và là tứ giác
        if (uniquePoints.length >= 3 && currentChallenge.targetShape !== 'triangle') {
            ctx.closePath();
        }
        
        ctx.fill();
        ctx.stroke();
    }
    
    // Vẽ các điểm
    function drawPoints() {
        for (let i = 0; i < points.length; i++) {
            // Kiểm tra điểm có trùng với điểm khác không
            let isUnique = true;
            for (let j = 0; j < i; j++) {
                if (distance(points[i], points[j]) < 10) {
                    isUnique = false;
                    break;
                }
            }
            
            if (!isUnique) continue; // Bỏ qua điểm trùng
            
            ctx.fillStyle = '#4285f4';
            ctx.beginPath();
            ctx.arc(points[i][0], points[i][1], 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Vẽ nhãn A, B, C, D
            ctx.fillStyle = '#3367d6';
            ctx.font = 'bold 14px Quicksand';
            ctx.fillText(String.fromCharCode(65 + i), points[i][0] + 10, points[i][1] - 10);
        }
    }
    
    // Khởi tạo các điểm kéo
    function initDraggablePoints() {
        const pointsElements = ['A', 'B', 'C', 'D'];
        
        pointsElements.forEach(point => {
            const element = document.getElementById(`point${point}`);
            if (element) {
                element.addEventListener('mousedown', startDrag);
                element.addEventListener('touchstart', startDrag);
            }
        });
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    
    function updateDraggablePoints() {
        const pointsElements = ['A', 'B', 'C', 'D'];
        
        pointsElements.forEach((point, index) => {
            const element = document.getElementById(`point${point}`);
            if (element && index < points.length) {
                const offset = 10; // 20px / 2 = 10px
                element.style.left = (points[index][0] - offset) + 'px';
                element.style.top = (points[index][1] - offset) + 'px';
                element.style.display = 'block';
            } else if (element) {
                element.style.display = 'none';
            }
        });
    }
    
    // Kéo điểm
    let isDragging = false;
    let draggedPoint = null;
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        draggedPoint = this.dataset.point;
        
        this.style.cursor = 'grabbing';
        this.style.zIndex = '100';
        this.style.transform = 'scale(1.1)';
    }
    
    function drag(e) {
        if (!isDragging || !draggedPoint) return;
        
        e.preventDefault();
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const canvasRect = canvas.getBoundingClientRect();
        
        let x = clientX - canvasRect.left;
        let y = clientY - canvasRect.top;
        
        const offset = 10;
        x = Math.max(offset, Math.min(canvas.width - offset, x));
        y = Math.max(offset, Math.min(canvas.height - offset, y));
        
        const pointIndex = draggedPoint.charCodeAt(0) - 65;
        if (pointIndex < points.length) {
            points[pointIndex][0] = x;
            points[pointIndex][1] = y;
            
            const pointElement = document.getElementById(`point${draggedPoint}`);
            if (pointElement) {
                pointElement.style.left = (x - offset) + 'px';
                pointElement.style.top = (y - offset) + 'px';
            }
            
            updateCanvas();
        }
    }
    
    function stopDrag() {
        if (draggedPoint) {
            const pointElement = document.getElementById(`point${draggedPoint}`);
            if (pointElement) {
                pointElement.style.cursor = 'grab';
                pointElement.style.zIndex = '10';
                pointElement.style.transform = '';
            }
        }
        
        isDragging = false;
        draggedPoint = null;
    }
    
    function checkSolution() {
        const targetShape = currentChallenge.targetShape;
        let isValid = false;
        let message = '';
        
        const currentShapeType = detectCurrentShape();
        currentShapeName.textContent = shapeNames[currentShapeType] || 'Hình không xác định';
        
        switch(targetShape) {
            case 'rectangle':
                isValid = checkRectangle();
                message = isValid ? 
                    '🎉 Chính xác! Bạn đã tạo được hình chữ nhật!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Hình chữ nhật cần: 1) 4 góc vuông 2) Cạnh đối bằng nhau.`;
                break;
                
            case 'triangle':
                isValid = checkTriangle();
                message = isValid ?
                    '🎉 Tuyệt vời! Đây là tam giác!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Tam giác cần có đúng 3 cạnh.`;
                break;
                
            case 'trapezoid':
                isValid = checkTrapezoid();
                message = isValid ?
                    '🎉 Xuất sắc! Đây là hình thang vuông!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Hình thang vuông cần: 1) Có cặp cạnh song song 2) Có góc vuông.`;
                break;
                
            case 'parallelogram':
                isValid = checkParallelogram();
                message = isValid ?
                    '🎉 Hoàn hảo! Đây là hình bình hành!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Hình bình hành cần: 1) Các cạnh đối song song 2) Các cạnh đối bằng nhau.`;
                break;
                
            case 'rhombus':
                isValid = checkRhombus();
                message = isValid ?
                    '🎉 Tuyệt vời! Đây là hình thoi!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Hình thoi cần 4 cạnh bằng nhau.`;
                break;
                
            case 'square':
                isValid = checkSquare();
                message = isValid ?
                    '🎉 Hoàn hảo! Đây là hình vuông!' :
                    `❌ Chưa đúng! Hiện tại là ${shapeNames[currentShapeType]}. Hình vuông cần: 1) 4 cạnh bằng nhau 2) 4 góc vuông.`;
                break;
        }
        
        if (isValid) {
            score += 100;
            scoreElement.textContent = score;
            
            showFeedback('✅', message);
            
            document.getElementById('nextChallengeBtn').disabled = false;
            document.getElementById('nextChallengeBtn').innerHTML = '<span class="btn-icon">🎯</span><span class="btn-text">Thử thách tiếp theo</span>';
            
            updateProgress(currentChallenge.targetShape);
            
            if (!currentChallenge.completed) {
                currentChallenge.completed = true;
                completedChallenges++;
                updateCompletedCount();
            }
        } else {
            showFeedback('❌', message);
        }
    }
    
    function detectCurrentShape() {
        const uniquePoints = getUniquePoints(10);
        const numPoints = uniquePoints.length;
        
        if (numPoints === 3) return 'triangle';
        if (numPoints !== 4) return 'unknown';
        
        if (checkSquare()) return 'square';
        if (checkRectangle()) return 'rectangle';
        if (checkRhombus()) return 'rhombus';
        if (checkParallelogram()) return 'parallelogram';
        if (checkTrapezoid()) return 'trapezoid';
        
        return 'quadrilateral';
    }
    
    function checkRectangle() {
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const angles = calculateAngles(uniquePoints);
        for (let angle of angles) {
            if (Math.abs(angle - 90) > 15) return false;
        }
        
        const sides = calculateSideLengths(uniquePoints);
        const oppositeSidesEqual = 
            Math.abs(sides[0] - sides[2]) < 30 && 
            Math.abs(sides[1] - sides[3]) < 30;  
        
        return oppositeSidesEqual;
    }
    
    function checkTriangle() {
        const uniquePoints = getUniquePoints(10);
        return uniquePoints.length === 3;
    }
    
    function checkTrapezoid() {
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const hasParallelSides = checkParallelSides(uniquePoints);
        if (!hasParallelSides) return false;
        
        const angles = calculateAngles(uniquePoints);
        const hasRightAngle = angles.some(angle => Math.abs(angle - 90) < 15);
        
        return hasRightAngle;
    }
    
    function checkParallelogram() {
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const isParallel = checkParallelSides(uniquePoints);
        if (!isParallel) return false;
        
        const sides = calculateSideLengths(uniquePoints);
        const oppositeSidesEqual = 
            Math.abs(sides[0] - sides[2]) < 30 && 
            Math.abs(sides[1] - sides[3]) < 30;
        
        return oppositeSidesEqual;
    }
    
    function checkRhombus() {
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const sides = calculateSideLengths(uniquePoints);
        const allSidesEqual = sides.every(side => 
            Math.abs(side - sides[0]) < 30
        );
        
        return allSidesEqual;
    }
    
    function checkSquare() {
        const uniquePoints = getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const sides = calculateSideLengths(uniquePoints);
        const allSidesEqual = sides.every(side => 
            Math.abs(side - sides[0]) < 20
        );
        if (!allSidesEqual) return false;
        
        const angles = calculateAngles(uniquePoints);
        const allRightAngles = angles.every(angle => 
            Math.abs(angle - 90) < 10
        );
        
        return allRightAngles;
    }
    function distance(p1, p2) {
        const dx = p2[0] - p1[0];
        const dy = p2[1] - p1[1];
        return Math.sqrt(dx*dx + dy*dy);
    }
    
    function getUniquePoints(minDistance = 10) {
        const unique = [];
        
        for (let point of points) {
            let isUnique = true;
            for (let u of unique) {
                if (distance(point, u) < minDistance) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                unique.push(point);
            }
        }
        
        return unique;
    }
    
    function calculateSideLengths(pointsArray = points) {
        const uniquePoints = pointsArray.length === 4 ? pointsArray : getUniquePoints(10);
        if (uniquePoints.length < 2) return [];
        
        const lengths = [];
        const n = uniquePoints.length;
        
        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n;
            lengths.push(distance(uniquePoints[i], uniquePoints[next]));
        }
        
        return lengths;
    }
    
    function calculateAngles(pointsArray = points) {
        const uniquePoints = pointsArray.length === 4 ? pointsArray : getUniquePoints(10);
        if (uniquePoints.length < 3) return [];
        
        const angles = [];
        const n = uniquePoints.length;
        
        for (let i = 0; i < n; i++) {
            const prev = (i - 1 + n) % n;
            const curr = i;
            const next = (i + 1) % n;
            
            const v1 = [uniquePoints[prev][0] - uniquePoints[curr][0], uniquePoints[prev][1] - uniquePoints[curr][1]];
            const v2 = [uniquePoints[next][0] - uniquePoints[curr][0], uniquePoints[next][1] - uniquePoints[curr][1]];
            
            const dot = v1[0]*v2[0] + v1[1]*v2[1];
            const mag1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
            const mag2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]);
            
            if (mag1 === 0 || mag2 === 0) {
                angles.push(90);
                continue;
            }
            
            let angle = Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
            if (isNaN(angle)) angle = 90;
            
            angles.push(angle);
        }
        
        return angles;
    }
    
    function checkParallelSides(pointsArray = points) {
        const uniquePoints = pointsArray.length === 4 ? pointsArray : getUniquePoints(10);
        if (uniquePoints.length !== 4) return false;
        
        const vectors = [];
        for (let i = 0; i < 4; i++) {
            const next = (i + 1) % 4;
            vectors.push([
                uniquePoints[next][0] - uniquePoints[i][0],
                uniquePoints[next][1] - uniquePoints[i][1]
            ]);
        }
        
        for (let i = 0; i < 2; i++) {
            const j = i + 2;
            const v1 = vectors[i];
            const v2 = vectors[j];
            
            const crossProduct = Math.abs(v1[0] * v2[1] - v1[1] * v2[0]);
            const tolerance = 100; 
            
            if (crossProduct < tolerance) {
                return true;
            }
        }
        
        return false;
    }
    
    function showExample() {
        const examples = {
            'rectangle': [[100,100], [300,100], [300,200], [100,200]],
            'triangle': [[150,100], [250,100], [150,200]], 
            'trapezoid': [[150,100], [250,100], [200,200], [150,200]],
            'parallelogram': [[150,100], [300,100], [250,200], [100,200]], 
            'rhombus': [[200,50], [300,150], [200,250], [100,150]], 
            'square': [[150,100], [250,100], [250,200], [150,200]] 
        };
        
        if (examples[currentChallenge.targetShape]) {
            points = JSON.parse(JSON.stringify(examples[currentChallenge.targetShape]));
            updateCanvas();
            updateDraggablePoints();
            showFeedback('👁️', `Đây là MỘT cách tạo ${shapeNames[currentChallenge.targetShape]}. Bạn có thể tạo theo cách khác!`);
        }
    }
    
    function resetPoints() {
        points = JSON.parse(JSON.stringify(currentChallenge.startingPoints));
        updateCanvas();
        updateDraggablePoints();
        currentShapeName.textContent = shapeNames[currentChallenge.startingShape];
        showFeedback('↻', 'Đã reset về vị trí ban đầu! Hãy thử sáng tạo theo cách của bạn!');
    }
    
    function toggleHint() {
        hintContent.classList.toggle('show');
    }
    
    function nextChallenge() {
        if (currentChallengeIndex < window.gameData.challenges.length - 1) {
            currentChallengeIndex++;
            loadChallenge(currentChallengeIndex);
            showFeedback('🎯', `Bắt đầu thử thách mới: ${window.gameData.challenges[currentChallengeIndex].title}`);
        } else {
            showFeedback('🏆', 'Xuất sắc! Bạn đã hoàn thành tất cả thử thách!');
        }
    }
    
    function updateProgress(shape) {
        const progressItem = document.getElementById(`progress${shape.charAt(0).toUpperCase() + shape.slice(1)}`);
        if (progressItem) {
            progressItem.classList.add('completed');
            progressItem.querySelector('.progress-status').textContent = '✓';
        }
    }
    
    function showFeedback(icon, text) {
        feedbackIcon.textContent = icon;
        feedbackText.textContent = text;
        
        const feedbackMessage = document.querySelector('.feedback-message');
        feedbackMessage.classList.remove('success-animation');
        void feedbackMessage.offsetWidth;
        feedbackMessage.classList.add('success-animation');
        
        setTimeout(() => {
            feedbackMessage.classList.remove('success-animation');
        }, 500);
    }
    
    function startTimer() {
        timerInterval = setInterval(() => {
            totalTime++;
            const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
            const seconds = (totalTime % 60).toString().padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    function updateCompletedCount() {
        completedCount.textContent = `${completedChallenges}/6`;
    }
    
    initGame();
});