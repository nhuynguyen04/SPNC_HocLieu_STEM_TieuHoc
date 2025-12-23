document.addEventListener("DOMContentLoaded", () => {

    // Lấy các phần tử game
    const trashItems = document.querySelectorAll(".trash-item");
    const dropzones = document.querySelectorAll(".trash-bin");
    const scoreDisplay = document.getElementById("score"); 
    const resetButton = document.getElementById("trashResetButton");

    // *** Lấy các phần tử cốt truyện ***
    const introModal = document.getElementById("intro-modal");
    const startGameButton = document.getElementById("startGameButton");
    const tamDialogueBox = document.getElementById("tam-dialogue-box");
    const tamDialogueText = document.getElementById("tam-dialogue-text");
    
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
    
    // Biến 'baseUrl' đã được nạp từ thẻ <script>
    let draggedItem = null;
    let correctDrops = 0;
    // Compute total at runtime to avoid mismatches if DOM changes
    let totalDrops = document.querySelectorAll('.trash-item').length || trashItems.length; // Tổng số rác
    let feedbackTimer; // Biến hẹn giờ

    startGameButton.addEventListener('click', () => {
        introModal.style.display = 'none';
    });

    // 1. Xử lý kéo
    trashItems.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            if (item.classList.contains('dropped')) {
                e.preventDefault();
                return;
            }
            draggedItem = e.target; 
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => e.target.classList.add("dragging"), 0);
        });

        item.addEventListener("dragend", () => {
            if(draggedItem) draggedItem.classList.remove("dragging");
            draggedItem = null;
        });
    });

    // 2. Xử lý thả
    dropzones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            zone.classList.add("drag-over");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("drag-over");
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("drag-over");

            const droppedItemID = e.dataTransfer.getData("text/plain");
            const droppedItem = document.getElementById(droppedItemID);

            if (!droppedItem) return;

            const itemGroup = droppedItem.dataset.group;
            const binType = zone.dataset.binType;
            let attempt = parseInt(droppedItem.dataset.attempt, 10);

            // KIỂM TRA ĐÁP ÁN
            if (itemGroup === binType) {
                // ĐÚNG
                playSuccessSound(); // Play success sound
                droppedItem.classList.add("dropped");
                correctDrops++;
                let points = 0;

                if (attempt === 1) {
                    points = 10;
                    updateScore(points);
                }
                
                // recompute totalDrops in case DOM changed
                totalDrops = document.querySelectorAll('.trash-item').length || totalDrops;
                if (correctDrops === totalDrops) {
                    // Show immediate completion message
                    showFeedback("🎉 Hoan hô! Tấm cảm ơn bạn đã dọn sạch sân nhà!", "win", true);

                    // When all items placed, commit score and show server response
                    (async () => {
                        try {
                            console.log('All items dropped — committing score...');
                            const resp = await fetch(`${window.baseUrl || ''}/science/update-trash-score`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ action: 'commit', game_id: 4, total_drops: totalDrops })
                            });

                            if (!resp.ok) {
                                const text = await resp.text();
                                console.error('Commit HTTP error', resp.status, text);
                                showFeedback('Lỗi khi gửi điểm. Vui lòng thử lại.', 'wrong', true);
                                return;
                            }

                            const json = await resp.json();
                            console.log('Commit response:', json);

                            if (json && json.success) {
                                // update visible score to server-provided newScore (should be 0)
                                if (json.newScore !== undefined) scoreDisplay.textContent = json.newScore;
                                if (json.completed) {
                                    showFeedback('🎉 Bạn đã hoàn thành trò chơi và điểm đã được lưu!', 'win', true);
                                } else {
                                    // success true but completed false is unlikely; show message
                                    showFeedback('Điểm đã được lưu.', 'info', true);
                                }

                                // After a short delay, behave like Back button: reset (already done server-side) and navigate back
                                setTimeout(() => {
                                    window.location.href = `${window.baseUrl || ''}/views/lessons/science.php`;
                                }, 1500);
                            } else {
                                // Not saved — show message from server (e.g., not enough points)
                                const msg = (json && json.message) ? json.message : 'Chưa thể lưu điểm.';
                                const scoreText = (json && json.newScore !== undefined) ? ` (Điểm: ${json.newScore}%)` : '';
                                showFeedback(`${msg}${scoreText}`, 'wrong', true);
                            }
                        } catch (err) {
                            console.error('Commit error:', err);
                            showFeedback('Lỗi mạng khi lưu điểm.', 'wrong', true);
                        }
                    })();
                } else {
                    if (points > 0) {
                        showFeedback("Tuyệt vời! Bạn được 10 điểm.", "win");
                    } else {
                        showFeedback("Tốt lắm!", "win");
                    }
                }
                
            } else {
                // SAI
                playErrorSound(); // Play error sound
                droppedItem.dataset.attempt = attempt + 1;
                
                let correctBinName = "";
                if(itemGroup === 'huuco') correctBinName = 'Hữu Cơ (xanh lá)';
                else if(itemGroup === 'taiche') correctBinName = 'Tái Chế (vàng)';
                else if(itemGroup === 'voco') correctBinName = 'Vô Cơ (đỏ)';
                
                showFeedback(`Ôi sai rồi! "${droppedItem.alt}" phải bỏ vào thùng ${correctBinName}.`, "wrong");
            }
        });
    });

    // 3. Logic cho nút Reset
    resetButton.addEventListener('click', () => {
        fetch(`${window.baseUrl || ''}/science/update-trash-score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'reset' })
        })
        .then(response => {
            if (response.ok) {
                location.reload(); 
            } else {
                alert("Lỗi! Không thể chơi lại.");
            }
        })
        .catch(error => console.error('Lỗi reset:', error));
    });

    // Nút Quay lại: xóa điểm (session) rồi chuyển về trang bài học
    const backButton = document.getElementById('trashBackButton');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`${window.baseUrl || ''}/science/update-trash-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' })
            }).finally(() => {
                window.location.href = `${window.baseUrl || ''}/views/lessons/science.php`;
            });
        });
    }

    // Nút Hoàn thành: so sánh và commit điểm
    const completeButton = document.getElementById('trashCompleteButton');
    if (completeButton) {
        completeButton.addEventListener('click', async (e) => {
            e.preventDefault();
            // show temporary message while committing
            showFeedback('Đang kiểm tra và gửi điểm...', 'info', true);
            try {
                const resp = await fetch(`${window.baseUrl || ''}/science/update-trash-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit', game_id: 4, total_drops: totalDrops })
                });

                if (!resp.ok) {
                    const text = await resp.text();
                    console.error('Commit HTTP error', resp.status, text);
                    showFeedback('Lỗi khi gửi điểm. Vui lòng thử lại.', 'wrong', true);
                    return;
                }

                const json = await resp.json();
                console.log('Manual commit response:', json);

                if (json && json.success) {
                    if (json.newScore !== undefined) scoreDisplay.textContent = json.newScore;
                    if (json.completed) {
                        showFeedback('🎉 Bạn đã hoàn thành trò chơi và điểm đã được lưu!', 'win', true);
                    } else {
                        showFeedback('Điểm đã được lưu.', 'info', true);
                    }
                } else {
                    const msg = (json && json.message) ? json.message : 'Chưa thể lưu điểm.';
                    const scoreText = (json && json.newScore !== undefined) ? ` (Điểm: ${json.newScore}%)` : '';
                    showFeedback(`${msg}${scoreText}`, 'wrong', true);
                }
            } catch (err) {
                console.error('Commit error:', err);
                showFeedback('Lỗi mạng khi lưu điểm.', 'wrong', true);
            }
        });
    }

    // Hàm hiển thị thông báo trong hộp thoại của Tấm
    function showFeedback(message, type, persist = false) {
        // Xóa hẹn giờ cũ
        clearTimeout(feedbackTimer);

        tamDialogueText.textContent = message;
        tamDialogueBox.className = type;
        
        // Hiện hộp thoại
        tamDialogueBox.classList.remove("hidden");

        // Tự động ẩn sau 3 giây, trừ khi có lệnh giữ lại (persist = true)
        if (!persist) {
            feedbackTimer = setTimeout(() => {
                tamDialogueBox.classList.add("hidden");
            }, 3000); // 3 giây
        }
    }

    // Hàm cập nhật điểm
    async function updateScore(points) {
        try {
            const response = await fetch(`${window.baseUrl || ''}/science/update-trash-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_points', points: points, total_drops: totalDrops })
            });
            const data = await response.json();
            
            if (data.newScore !== undefined) {
                scoreDisplay.textContent = data.newScore;
            }
        } catch (error) {
            console.error("Lỗi cập nhật điểm:", error);
        }
    }
});