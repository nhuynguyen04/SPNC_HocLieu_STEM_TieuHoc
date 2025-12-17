document.addEventListener("DOMContentLoaded", () => {
    
    // Tìm các phần tử bên trong .game-wrapper
    const gameWrapper = document.querySelector(".game-wrapper");
    if (!gameWrapper) return;

    // Đảm bảo body có overflow hidden khi full screen
    if (gameWrapper.classList.contains('game-fullscreen')) {
        document.body.style.overflow = 'hidden';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }

    const foodItems = gameWrapper.querySelectorAll(".food-item");
    const pyramidLevels = gameWrapper.querySelectorAll(".pyramid-level");
    const feedbackBox = gameWrapper.querySelector("#feedback");
    const scoreDisplay = gameWrapper.querySelector("#score");
    const resetButton = gameWrapper.querySelector("#resetButton");
    const finishButton = gameWrapper.querySelector("#finishButton");
    
    // Đặt điểm ban đầu là 0
    if (scoreDisplay) {
        scoreDisplay.textContent = '0';
    }
    
    let draggedItem = null;

    console.log("🎮 NUTRITION GAME LOADED - Version:", Date.now());
    console.log("📦 Found", foodItems.length, "food items");
    console.log("🏗️ Found", pyramidLevels.length, "pyramid levels");

    // *** Background Music ***
    const bgMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_4037f3a03c.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    let isMusicPlaying = false;

    // Tạo nút music toggle
    const musicToggle = document.createElement('button');
    musicToggle.className = 'music-toggle';
    musicToggle.innerHTML = '🔇'; // Muted speaker
    musicToggle.title = 'Bật nhạc nền';
    gameWrapper.appendChild(musicToggle);

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '🔇'; // Muted speaker
            musicToggle.title = 'Bật nhạc nền';
            musicToggle.classList.add('muted');
            isMusicPlaying = false;
        } else {
            bgMusic.play().catch(err => console.log('Cannot play music:', err));
            musicToggle.innerHTML = '🔊'; // Speaker on
            musicToggle.title = 'Tắt nhạc nền';
            musicToggle.classList.remove('muted');
            isMusicPlaying = true;
        }
    });

    // *** Tạo âm thanh (sử dụng Web Audio API) ***
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playSuccessSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // Note C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Thêm note thứ 2 để tạo âm thanh vui hơn
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 659.25; // Note E5
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.3);
        }, 100);
    }

    function playErrorSound() {
        // Âm thanh "oop" nhẹ nhàng hơn với 2 notes xuống dần
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        
        osc1.frequency.value = 440; // A4
        osc1.type = 'sine';
        
        gain1.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.15);
        
        // Note thứ 2 thấp hơn
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            
            osc2.frequency.value = 330; // E4
            osc2.type = 'sine';
            
            gain2.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.2);
        }, 100);
    }
    
    function playResetSound() {
        // Âm thanh "whoosh" khi reset
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.3);
    }

    function playCelebrationSound() {
        // Tạo âm thanh pháo hoa với nhiều note
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                gain.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                osc.start(audioContext.currentTime);
                osc.stop(audioContext.currentTime + 0.5);
            }, index * 100);
        });
        
        // Thêm tiếng "boom" cuối
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = 1046.50;
            osc.type = 'triangle';
            
            gain.gain.setValueAtTime(0.4, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 1);
        }, 400);
    } 

    // Mảng tên các nhóm để gợi ý (CẬP NHẬT THEO TẦNG)
    const groupNames = {
        1: "Tầng 4 (Ngũ cốc, Đáy tháp)",
        2: "Tầng 3 (Rau & Trái cây)",
        3: "Tầng 2 (Đạm, Sữa)",
        4: "Tầng 1 (Dầu, Mỡ, Đường, Đỉnh tháp)"
    };

    // --- 1. Xử lý kéo (Drag) - Trực tiếp trên từng food item ---
    foodItems.forEach(item => {
        console.log("🔧 Setting up drag for:", item.dataset.name);
        
        item.addEventListener("dragstart", (e) => {
            console.log("➡️ DRAG START:", item.dataset.name);
            
            // Chỉ cho kéo nếu chưa được thả
            if (item.classList.contains('dropped')) {
                console.log("❌ Already dropped, cannot drag");
                e.preventDefault();
                return;
            }
            
            draggedItem = item;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", item.innerHTML);
            setTimeout(() => item.classList.add("dragging"), 0);
        });

        item.addEventListener("dragend", () => {
            console.log("🏁 DRAG END");
            item.classList.remove("dragging");
            if (draggedItem) {
                draggedItem.classList.remove("dragging");
                draggedItem = null;
            }
        });
    });

    // Completion is validated server-side using `games.passing_score`.
    // Do not enforce a client-side threshold here to avoid mismatch with DB.

    // --- 2. Xử lý thả (Drop) ---
    pyramidLevels.forEach(level => {
        level.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            level.classList.add("drag-over");
        });

        level.addEventListener("dragleave", () => {
            level.classList.remove("drag-over");
        });

        level.addEventListener("drop", async (e) => {
            e.preventDefault();
            level.classList.remove("drag-over");
            console.log("🎯 DROP on", level.id);

            if (draggedItem) {
                const foodGroup = draggedItem.dataset.group;
                const dropZoneGroup = level.dataset.group;
                console.log("🍔 Food:", draggedItem.dataset.name, "(group", foodGroup + ")");
                console.log("🏯 Target: Level", level.id, "(group", dropZoneGroup + ")");
                
                // Lấy số lần thử của món ăn này
                let attempt = parseInt(draggedItem.dataset.attempt, 10);

                if (foodGroup === dropZoneGroup) {
                    // *** ĐÚNG ***
                    console.log("✅ CORRECT! Playing sound...");
                    level.appendChild(draggedItem); 
                    draggedItem.classList.add("dropped"); // Thêm class 'dropped'
                    draggedItem.setAttribute("draggable", "false"); // Khóa, không cho kéo nữa

                    // *** PHÁT ÂM THANH THÀNH CÔNG ***
                    try {
                        playSuccessSound();
                        console.log("🔊 Success sound played");
                    } catch(err) {
                        console.error("❌ Sound error:", err);
                    }

                        if (attempt === 1) {
                            // Lần 1 đúng -> 3.7 điểm (27 món * 3.7 = ~100 điểm)
                            showFeedback(`✅ Chính xác! `, "correct");
                            const pointsToAdd = 3.7;
                            try {
                                const res = await updateScore(pointsToAdd);
                                if (res && res.newScore !== undefined) {
                                    scoreDisplay.textContent = Math.round(parseFloat(res.newScore));
                                } else {
                                    // Fallback: increment locally if server didn't return a value
                                    const current = parseFloat(scoreDisplay.textContent || '0');
                                    scoreDisplay.textContent = Math.round(current + pointsToAdd);
                                }
                            } catch (err) {
                                // If update failed, still increment UI so player sees feedback
                                const current = parseFloat(scoreDisplay.textContent || '0');
                                scoreDisplay.textContent = Math.round(current + pointsToAdd);
                            }
                        } else {
                            // Lần 2 (hoặc hơn) mới đúng -> 0 điểm
                            showFeedback(`👍 Đúng rồi! ${draggedItem.dataset.name} thuộc ${groupNames[foodGroup]}.`, "correct");
                        }
                        
                        // Kiểm tra xem đã thả đủ 27 món chưa
                        const droppedItems = document.querySelectorAll('.food-item.dropped');
                        if (droppedItems.length === 27) {
                            // Phát âm thanh pháo hoa chúc mừng
                            setTimeout(() => {
                                playCelebrationSound();
                                showFinishModal(parseInt(scoreDisplay.textContent || '0', 10));
                            }, 500);
                        }
                    
                } else {
                    // *** SAI ***
                    console.log("❌ WRONG! Playing error sound...");
                    const correctGroupName = groupNames[foodGroup]; // Lấy tên nhóm đúng
                    
                    // *** PHÁT ÂM THANH SAI ***
                    try {
                        playErrorSound();
                        console.log("🔊 Error sound played");
                    } catch(err) {
                        console.error("❌ Sound error:", err);
                    }
                    
                    // Thông báo sai
                    showFeedback(`❌ Sai rồi!`, "wrong");
                    
                    // Đánh dấu là đã thử 1 lần (để lần sau 0 điểm)
                    draggedItem.dataset.attempt = attempt + 1;
                }
            }
        });
    });
    
    // --- 3. Nút Reset ---
    resetButton.addEventListener('click', () => {
        // Phát âm thanh reset
        playResetSound();
        
        // Di chuyển tất cả items về food-items-container
        const foodItemsContainer = document.querySelector('.food-items-container');
        const allFoodItems = document.querySelectorAll('.food-item');
        
        allFoodItems.forEach(item => {
            // Xóa class dropped và enable draggable lại
            item.classList.remove('dropped', 'dragging');
            item.setAttribute('draggable', 'true');
            item.dataset.attempt = '1';
            
            // Move về food-items-container nếu nó đang ở pyramid
            if (item.parentElement.classList.contains('pyramid-level')) {
                foodItemsContainer.appendChild(item);
            }
        });
        
        // Reset score về 0
        scoreDisplay.textContent = '0';
        
        // Clear feedback
        if (feedbackBox) {
            feedbackBox.textContent = '';
            feedbackBox.className = '';
        }
        
        // Reset server score
        fetch(`${baseUrl}/science/update-score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'reset' })
        })
        .catch(error => console.error('Lỗi reset:', error));
    });

    // --- 5. Nút Hoàn thành (Finish) - tổng kết và lưu điểm ---
    if (finishButton) {
        finishButton.addEventListener('click', async () => {
            const currentScore = parseInt(scoreDisplay.textContent || '0', 10);

            // Phát âm thanh chúc mừng ngay lập tức
            playCelebrationSound();
            
            // Hiển toast ngay lập tức với điểm hiện tại
            showFinishModal(currentScore);
            
            finishButton.disabled = true;
            const originalText = finishButton.innerHTML;
            finishButton.innerHTML = '⏳ Đang lưu...';
            
            try {
                const resp = await fetch(`${baseUrl}/science/update-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit' })
                });
                const data = await resp.json();
                // Đã hiển toast rồi, không cần xử lý gì thêm
            } catch (err) {
                console.error('Lỗi commit:', err);
                // Vẫn hiển toast, không báo lỗi
                finishButton.innerHTML = originalText;
            }
        });
    }

    // Back button: reset score on server then navigate back
    const backBtn = gameWrapper.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = backBtn.getAttribute('href') || `${baseUrl}/views/lessons/science.php`;
            fetch(`${baseUrl}/science/update-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' })
            }).finally(() => {
                // navigate after attempting reset regardless of result
                window.location.href = href;
            });
        });
    }

    // --- Các hàm hỗ trợ ---
    function showFeedback(message, type) {
        feedbackBox.textContent = message;
        feedbackBox.className = type;
        
        const duration = (type === 'hint') ? 3500 : 2000;
        
        setTimeout(() => {
            feedbackBox.textContent = "";
            feedbackBox.className = "";
        }, duration);
    }

    function showFinishModal(score) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <h2>KẾT THÚC!</h2>
                <p class="toast-score">Điểm của bạn: <strong>${score}</strong></p>
                <p class="toast-message">${getFinishMessage(score)}</p>
                <div class="toast-buttons">
                    <button class="toast-replay-btn">
                        <span>🔄</span><span>Chơi lại</span>
                    </button>
                    <button class="toast-menu-btn">
                        <span>🏠</span><span>Menu</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Thêm âm thanh cho nút
        const replayBtn = toast.querySelector('.toast-replay-btn');
        const menuBtn = toast.querySelector('.toast-menu-btn');
        
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                playClickSound();
                setTimeout(() => location.reload(), 100);
            });
        }
        
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                playClickSound();
                setTimeout(() => window.location.href = `${baseUrl}/views/lessons/science.php`, 100);
            });
        }
    }

    function getFinishMessage(score) {
        if (score === 100) return '🏆 Hoàn hảo! Bạn đã nắm vừng kiến thức về dinh dưỡng!';
        if (score >= 90) return '🌟 Giỏi lắm! Bạn hiểu rõ về tháp dinh dưỡng!';
        if (score >= 70) return '👍 Tốt lắm! Tiếp tục cố gắng nhé!';
        if (score >= 50) return '😊 Khá ổn! Hãy thử lại để đạt điểm cao hơn!';
        return '💪 Cố gắng thêm nhé! Hãy chơi lại để học hỏi thêm!';
    }

    async function updateScore(points) {
        try {
            const response = await fetch(`${baseUrl}/science/update-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_points', points: points })
            });
            const data = await response.json();
            if (data.newScore !== undefined) {
                scoreDisplay.textContent = data.newScore;
            }
            return data;
        } catch (error) {
            console.error("Lỗi cập nhật điểm:", error);
            return null;
        }
    }

    function showCompletion(finalScore) {
        // Show a persistent completion box and disable further interactions
        let box = gameWrapper.querySelector('#completionBox');
        if (!box) {
            box = document.createElement('div');
            box.id = 'completionBox';
            gameWrapper.appendChild(box);
        }
    }
});