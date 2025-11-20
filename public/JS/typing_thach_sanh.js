const storyModal = document.getElementById('story-modal');
const gameOverModal = document.getElementById('game-over-modal');
const enemiesContainer = document.getElementById('enemies-container');
const arrowsContainer = document.getElementById('arrows-container');
const gameWrapper = document.getElementById('game-wrapper');

const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const timeDisplayEl = document.getElementById('time-display'); // Mới
const thachSanhEl = document.getElementById('thach-sanh');
const visualFeedback = document.getElementById('visual-feedback');
const finalScoreEl = document.getElementById('final-score');
const endTitleEl = document.getElementById('end-title');
const endMessageEl = document.getElementById('end-message');

let currentLevelWords = [];
let activeEnemies = [];
let score = 0;
const maxLives = 5;
let lives = maxLives;

const GAME_DURATION = 180; // 3 phút
let timeLeft = GAME_DURATION;
let gameTimerInterval;
// ---------------------

let gameInterval;
let spawnRate = 2500;
let isPlaying = false;

function startGame(level) {
    storyModal.style.display = 'none';
    if (!wordData[level]) return;

    currentLevelWords = wordData[level];
    isPlaying = true;
    
    // Reset chỉ số
    score = 0;
    lives = maxLives;
    timeLeft = GAME_DURATION; // Reset thời gian
    
    scoreEl.innerText = score;
    livesEl.innerText = lives;
    updateTimeDisplay(); // Hiện 03:00
    
    activeEnemies = [];
    enemiesContainer.innerHTML = '';
    arrowsContainer.innerHTML = '';

    // Loop sinh quái
    gameInterval = setInterval(() => {
        if (!isPlaying) return;
        spawnEnemy();
    }, spawnRate);

    // Loop đếm ngược thời gian
    gameTimerInterval = setInterval(() => {
        if (!isPlaying) return;
        timeLeft--;
        updateTimeDisplay();

        if (timeLeft <= 0) {
            victory(); // Hết giờ -> Chiến thắng
        }
    }, 1000);

    requestAnimationFrame(gameLoop);
    document.addEventListener('keydown', handleTyping);
}

// Hàm cập nhật hiển thị đồng hồ
function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Thêm số 0 đằng trước nếu < 10
    timeDisplayEl.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Hàm Chiến Thắng (Hết giờ)
function victory() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    document.removeEventListener('keydown', handleTyping);

    // Tính điểm thưởng
    const bonusPoints = lives * 50; // 50 điểm cho mỗi mạng còn lại
    const totalScore = score + bonusPoints;

    endTitleEl.innerText = "CHIẾN THẮNG!";
    endTitleEl.style.color = "#2ecc71";
    endMessageEl.innerHTML = `
        Bạn đã bảo vệ buôn làng thành công trong 3 phút!<br>
        Điểm gốc: ${score}<br>
        Thưởng mạng (${lives}): +${bonusPoints}
    `;
    finalScoreEl.innerText = totalScore;
    
    gameOverModal.style.display = 'flex';
}

function gameLoop() {
    if (!isPlaying) return;

    const gameHeight = gameWrapper.offsetHeight;

    activeEnemies.forEach((enemy, index) => {
        // Nếu quái đã chết không cho di chuyển nữa
        if (enemy.isDead) return;

        enemy.top += enemy.speed;
        enemy.el.style.top = enemy.top + 'px';

        if (enemy.top > (gameHeight - 100)) { 
            handleEnemyMissed(index);
        }
    });

    requestAnimationFrame(gameLoop);
}

function handleEnemyMissed(index) {
    // Xóa ngay lập tức khỏi mảng logic
    const enemyEl = activeEnemies[index].el;
    activeEnemies.splice(index, 1);
    enemyEl.remove(); // Xóa khỏi màn hình
    
    lives--;
    livesEl.innerText = lives;

    gameWrapper.classList.add('village-damage');
    setTimeout(() => gameWrapper.classList.remove('village-damage'), 500);
    triggerWrong("Ôi hỏng rồi!"); 

    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval); // Dừng đồng hồ
    document.removeEventListener('keydown', handleTyping);
    
    endTitleEl.innerText = "KẾT THÚC!";
    endTitleEl.style.color = "#e74c3c";
    endMessageEl.innerText = "Bạn đã hết mạng. Buôn làng bị tàn phá!";
    finalScoreEl.innerText = score;
    gameOverModal.style.display = 'flex';
}

function spawnEnemy() {
    const word = currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)];
    const isBoss = Math.random() > 0.7;
    const enemyDiv = document.createElement('div');
    enemyDiv.className = 'enemy';
    
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    enemyDiv.style.left = randomLeft + '%';
    enemyDiv.style.top = '-120px'; 

    let imgName = isBoss ? 'chan_tinh.png' : 'dai_bang.png';
    if (word.length === 1 && !isBoss) imgName = 'stone.png';
    const imgSrc = `${baseUrl}/public/images/thachsanh/${imgName}`;

    enemyDiv.innerHTML = `<div class="enemy-word">${word}</div><img src="${imgSrc}">`;
    enemiesContainer.appendChild(enemyDiv);

    activeEnemies.push({
        el: enemyDiv,
        word: word,
        remaining: word,
        top: -120,
        speed: isBoss ? 0.5 : 0.9,
        isDead: false // Cờ đánh dấu quái đang bị tiêu diệt
    });
}

function handleTyping(e) {
    if (!isPlaying) return;
    const key = e.key.toUpperCase();
    let targetIndex = -1; let maxTop = -1000;

    for (let i = 0; i < activeEnemies.length; i++) {
        // Bỏ qua quái đã chết
        if (activeEnemies[i].isDead) continue;

        if (activeEnemies[i].word !== activeEnemies[i].remaining) {
            if (activeEnemies[i].remaining.startsWith(key)) { targetIndex = i; break; } 
            else { triggerWrong(); return; }
        }
    }
    if (targetIndex === -1) {
        for (let i = 0; i < activeEnemies.length; i++) {
            if (activeEnemies[i].isDead) continue; // Bỏ qua quái chết

            if (activeEnemies[i].remaining.startsWith(key)) {
                if (activeEnemies[i].top > maxTop) { maxTop = activeEnemies[i].top; targetIndex = i; }
            }
        }
    }

    if (targetIndex !== -1) {
        const enemy = activeEnemies[targetIndex];
        enemy.remaining = enemy.remaining.substring(1);
        
        const typed = enemy.word.substring(0, enemy.word.length - enemy.remaining.length);
        enemy.el.querySelector('.enemy-word').innerHTML = `<span class="typed">${typed}</span>${enemy.remaining}`;

        // Nếu hoàn thành từ
        if (enemy.remaining === '') {
            score += 10;
            scoreEl.innerText = score;
            
            // Đánh dấu đã chết để không gõ được nữa và không di chuyển
            enemy.isDead = true;

            // *** Bắn tên -> Chờ tên bay tới -> Mới xóa quái ***
            shootArrow(enemy.el, () => {
                // Callback này chạy khi tên đã trúng đích
                removeEnemy(targetIndex);
            });
        }
    } else {
        triggerWrong();
    }
}

// Hàm bắn tên có Callback (hành động sau khi trúng)
function shootArrow(targetEl, onHitCallback) {
    const thachSanhRect = thachSanhEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const gameRect = gameWrapper.getBoundingClientRect();

    const startX = thachSanhRect.left + thachSanhRect.width / 2 - gameRect.left;
    const startY = thachSanhRect.top - gameRect.top;
    const endX = targetRect.left + targetRect.width / 2 - gameRect.left;
    const endY = targetRect.top + targetRect.height / 2 - gameRect.top;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    arrow.style.left = startX + 'px';
    arrow.style.top = startY + 'px';
    arrow.style.transform = `rotate(${angle}deg)`;
    arrowsContainer.appendChild(arrow);

    requestAnimationFrame(() => {
        arrow.style.left = endX + 'px';
        arrow.style.top = endY + 'px';
    });

    // Sau 300ms (thời gian tên bay), thực hiện xóa quái
    setTimeout(() => {
        arrow.remove();
        if (onHitCallback) onHitCallback(); // Xóa quái vật
    }, 300);
}

function removeEnemy(index) {
    const enemyObj = activeEnemies[index];
    if (enemyObj && enemyObj.el && enemyObj.el.parentNode) {
         enemyObj.el.remove();
         activeEnemies.splice(index, 1);
    } else {
        // Nếu index bị lệch, tìm và xóa object có isDead = true
        const deadIndex = activeEnemies.findIndex(e => e.isDead);
        if (deadIndex !== -1) {
            activeEnemies[deadIndex].el.remove();
            activeEnemies.splice(deadIndex, 1);
        }
    }
}

function triggerWrong(msg = "Thử lại!") {
    thachSanhEl.classList.add('shake');
    setTimeout(() => thachSanhEl.classList.remove('shake'), 500);
    
    visualFeedback.innerText = msg;
    visualFeedback.className = "show-wrong";
    setTimeout(() => visualFeedback.className = "", 500);
}