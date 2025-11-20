document.addEventListener("DOMContentLoaded", () => {
    
    // Tìm các phần tử bên trong .game-wrapper
    const gameWrapper = document.querySelector(".game-wrapper");
    if (!gameWrapper) return;

    const foodItems = gameWrapper.querySelectorAll(".food-item");
    const pyramidLevels = gameWrapper.querySelectorAll(".pyramid-level");
    const feedbackBox = gameWrapper.querySelector("#feedback");
    const scoreDisplay = gameWrapper.querySelector("#score");
    const resetButton = gameWrapper.querySelector("#resetButton");
    const finishButton = gameWrapper.querySelector("#finishButton");
    
    let draggedItem = null; 

    // Mảng tên các nhóm để gợi ý (CẬP NHẬT THEO TẦNG)
    const groupNames = {
        1: "Tầng 4 (Ngũ cốc, Đáy tháp)",
        2: "Tầng 3 (Rau & Trái cây)",
        3: "Tầng 2 (Đạm, Sữa)",
        4: "Tầng 1 (Dầu, Mỡ, Đường, Đỉnh tháp)"
    };

    // --- 1. Xử lý kéo (Drag) ---
    foodItems.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            // Chỉ cho kéo nếu chưa được thả (chưa có class 'dropped')
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

            if (draggedItem) {
                const foodGroup = draggedItem.dataset.group;
                const dropZoneGroup = level.dataset.group;
                
                // Lấy số lần thử của món ăn này
                let attempt = parseInt(draggedItem.dataset.attempt, 10);

                if (foodGroup === dropZoneGroup) {
                    // *** ĐÚNG ***
                    level.appendChild(draggedItem); 
                    draggedItem.classList.add("dropped"); // Thêm class 'dropped'
                    draggedItem.setAttribute("draggable", "false"); // Khóa, không cho kéo nữa

                        if (attempt === 1) {
                            // Lần 1 đúng -> 10 điểm: ask server to add points and use server's
                            // returned score as the authoritative value for the UI.
                            showFeedback(`✅ Chính xác! `, "correct");
                            try {
                                const res = await updateScore(10);
                                if (res && res.newScore !== undefined) {
                                    scoreDisplay.textContent = parseInt(res.newScore, 10);
                                } else {
                                    // Fallback: increment locally if server didn't return a value
                                    const current = parseInt(scoreDisplay.textContent || '0', 10);
                                    scoreDisplay.textContent = current + 10;
                                }
                            } catch (err) {
                                // If update failed, still increment UI so player sees feedback
                                const current = parseInt(scoreDisplay.textContent || '0', 10);
                                scoreDisplay.textContent = current + 10;
                            }
                        } else {
                            // Lần 2 (hoặc hơn) mới đúng -> 0 điểm
                            showFeedback(`👍 Đúng rồi! ${draggedItem.dataset.name} thuộc ${groupNames[foodGroup]}.`, "correct");
                        }
                    
                } else {
                    // *** SAI ***
                    const correctGroupName = groupNames[foodGroup]; // Lấy tên nhóm đúng
                    
                    // Gợi ý cho người chơi
                    showFeedback(`❌ Sai rồi! Gợi ý: "${draggedItem.dataset.name}" nên ở ${correctGroupName}.`, "hint");
                    
                    // Đánh dấu là đã thử 1 lần (để lần sau 0 điểm)
                    draggedItem.dataset.attempt = attempt + 1;
                }
            }
        });
    });
    
    // --- 3. Nút Reset ---
    resetButton.addEventListener('click', () => {
        fetch(`${baseUrl}/science/update-score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'reset' })
        })
        .then(response => {
            if (response.ok) {
                location.reload(); 
            }
        })
        .catch(error => console.error('Lỗi reset:', error));
    });

    // --- 4. Nút Hoàn thành (Finish) - tổng kết và lưu điểm ---
    if (finishButton) {
        finishButton.addEventListener('click', async () => {
            // Defer completion validation to the server (uses games.passing_score)
            const currentScore = parseInt(scoreDisplay.textContent || '0', 10);

            finishButton.disabled = true;
            finishButton.textContent = 'Đang xử lý...';
            try {
                const resp = await fetch(`${baseUrl}/science/update-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit' })
                });
                const data = await resp.json();
                if (data && data.success) {
                    // update visible score to server-provided newScore (should be 0 when saved)
                    const serverScore = data.score ?? data.newScore ?? currentScore;
                    scoreDisplay.textContent = serverScore;
                    showCompletion(serverScore);
                    // show an extra feedback if completed is true
                    if (data.completed) {
                        showFeedback('🎉 Bạn đã hoàn thành trò chơi!', 'correct');
                    }

                    // After short delay, behave like back button: navigate back to lessons
                    setTimeout(() => {
                        window.location.href = `${baseUrl}/views/lessons/science.php`;
                    }, 1500);
                } else {
                    const msg = (data && data.message) ? data.message : 'Không thể lưu tiến độ.';
                    // if server returned newScore (percentage), update UI accordingly
                    if (data && data.newScore !== undefined) {
                        scoreDisplay.textContent = data.newScore;
                    }
                    showFeedback(msg, 'hint');
                }
            } catch (err) {
                console.error('Lỗi commit:', err);
                showFeedback('Lỗi khi lưu điểm. Vui lòng thử lại.', 'hint');
            } finally {
                finishButton.disabled = false;
                finishButton.textContent = 'Hoàn thành';
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