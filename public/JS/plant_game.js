document.addEventListener("DOMContentLoaded", () => {

    const draggableParts = document.querySelectorAll(".draggable-label");
    const dropzones = document.querySelectorAll(".dropzone");
    const feedbackBox = document.getElementById("plant-feedback");
    const scoreDisplay = document.getElementById("score"); 
    const resetButton = document.getElementById("plantResetButton");
    const finishButton = document.getElementById('plantFinishButton');
    const backButton = document.querySelector('.back-button');
    
    // Local reference to baseUrl (defined on the window by the view).
    const baseUrl = window.baseUrl || '';

    let draggedItem = null;
    let correctDrops = 0;
    const totalDrops = dropzones.length; // Đếm số lượng dropzone

    // 1. Xử lý kéo
    draggableParts.forEach(part => {
        part.addEventListener("dragstart", (e) => {
            if (part.classList.contains('dropped')) {
                e.preventDefault();
                return;
            }
            draggedItem = e.target; 
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => e.target.classList.add("dragging"), 0);
        });

        part.addEventListener("dragend", () => {
            if(draggedItem) draggedItem.classList.remove("dragging");
            draggedItem = null;
        });
    });

    // 2. Xử lý thả
    dropzones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            if (zone.dataset.targetPart !== "filled") { 
                zone.classList.add("drag-over");
            }
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

            const partName = droppedItem.dataset.partName;
            const targetName = zone.dataset.targetPart;
            let attempt = parseInt(droppedItem.dataset.attempt, 10);

            if (partName === targetName) {
                // ĐÚNG
                zone.appendChild(droppedItem); 
                
                droppedItem.classList.add("dropped");
                droppedItem.setAttribute("draggable", "false");
                
                zone.dataset.targetPart = "filled"; 

                let points = 0;
                if (attempt === 1) {
                    points = 10;
                    updateScore(points);
                }

                correctDrops++; 
                
                if (correctDrops === totalDrops) {
                    if (points > 0) {
                        showFeedback("🎉 Chúc mừng! đã hoàn thành!", "win");
                    } else {
                        showFeedback("🎉 Chúc mừng! Bạn đã ghép hoàn chỉnh cái cây!", "win");
                    }
                    // No automatic commit here. Commit will occur only when user clicks 'Hoàn thành'.
                } else {
                    if (points > 0) {
                        showFeedback(`Chính xác! `, "win");
                    } else {
                        showFeedback("Đúng rồi!", "win");
                    }
                }
                
            } else if (targetName === "filled") {
                showFeedback("Vị trí này đã được ghép đúng rồi!", "hint");
            } else {
                // SAI
                droppedItem.dataset.attempt = attempt + 1;
                
                let targetNameVietnamese = targetName;
                if(targetName === 'hoa') targetNameVietnamese = 'Hoa';
                else if(targetName === 'la') targetNameVietnamese = 'Lá';
                else if(targetName === 'than') targetNameVietnamese = 'Thân';
                else if(targetName === 're') targetNameVietnamese = 'Rễ';
                else if(targetName === 'trai' || targetName === 'qua') targetNameVietnamese = 'Quả';
                else if(targetName === 'cu') targetNameVietnamese = 'Củ';
                else if(targetName === 'canh') targetNameVietnamese = 'Cành';
                
                showFeedback(`Sai vị trí! Vị trí này là dành cho '${targetNameVietnamese}'.`, "wrong");
            }
        });
    });

    // 3. Logic cho nút Reset
    resetButton.addEventListener('click', () => {
        fetch(`${baseUrl}/views/lessons/update-plant-score`, {
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

    // Back button: reset score on server then navigate back
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            const href = backButton.getAttribute('href');
            fetch(`${baseUrl}/views/lessons/update-plant-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' })
            })
            .then(() => {
                // navigate after reset
                window.location.href = href;
            })
            .catch((err) => {
                console.error('Lỗi reset khi nhấn Quay lại:', err);
                // still navigate even if reset failed
                window.location.href = href;
            });
        });
    }

    // Finish button: commit score to server then navigate back on success
    // Finish button
    if (finishButton) {
        finishButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Kiểm tra xem đã ghép đủ chưa (logic client)
            if (correctDrops < totalDrops) {
                showFeedback('Bạn chưa ghép xong tất cả các bộ phận!', 'hint');
                return;
            }

            finishButton.disabled = true;
            finishButton.textContent = 'Đang xử lý...';
            
            try {
                const resp = await fetch(`${baseUrl}/views/lessons/update-plant-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit', game_id: 2, total_drops: totalDrops })
                });
                
                // ... (đoạn xử lý json giống cũ) ...
                const ct = resp.headers.get('content-type') || '';
                let data = null;
                if (ct.indexOf('application/json') !== -1) data = await resp.json();
                else data = { success: false };

                if (data && data.success) {
                    // *** QUAN TRỌNG: GỌI HÀM HIỆN MODAL ***
                    showWinModal(); 
                } else {
                    showFeedback('Có lỗi xảy ra khi lưu điểm.', 'hint');
                }
            } catch (err) {
                console.error(err);
            } finally {
                finishButton.disabled = false;
                finishButton.textContent = 'Hoàn thành';
            }
        });
    }



    // Hàm hiển thị thông báo
    function showFeedback(message, type) {
        feedbackBox.textContent = message;
        feedbackBox.className = type;
        
        if (type === "win") {
            feedbackBox.style.color = "#2ecc71";
        } else if (type === "wrong") {
            feedbackBox.style.color = "#e74c3c";
        } else {
            feedbackBox.style.color = "#e67e22";
        }
    }

    // Hàm cập nhật điểm
    async function updateScore(points) {
        try {
            const response = await fetch(`${baseUrl}/views/lessons/update-plant-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_points', points: points, total_drops: totalDrops })
            });
            // Parse response safely: if server returns JSON, use it; otherwise log text for debugging.
            const contentType = response.headers.get('content-type') || '';
            let data = null;
            if (contentType.indexOf('application/json') !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response from update-plant-score:', text);
                // Try to recover: don't throw, just return
                return;
            }

            if (data && data.newScore !== undefined) {
                scoreDisplay.textContent = data.newScore;
            }
        } catch (error) {
            console.error("Lỗi cập nhật điểm:", error);
        }
    }

    function showWinModal() {
        const winModal = document.getElementById('win-modal');
        const nextLevelBtn = document.getElementById('next-level-btn');
        const replayAllBtn = document.getElementById('replay-all-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
        // Lấy biến từ window (do view truyền sang)
        const nextType = window.nextPlantType; 

        // Hiển thị modal
        if (winModal) winModal.style.display = 'flex';

        // Kiểm tra xem có màn tiếp theo không
        if (nextType) {
            // CÒN MÀN -> Hiện nút Next
            if(nextLevelBtn) {
                nextLevelBtn.style.display = 'block';
                nextLevelBtn.onclick = () => {
                    window.location.href = `${baseUrl}/views/lessons/plant-game?type=${nextType}`;
                };
            }
            if(replayAllBtn) replayAllBtn.style.display = 'none';
        } else {
            // HẾT MÀN -> Hiện nút Chơi lại từ đầu
            if(nextLevelBtn) nextLevelBtn.style.display = 'none';
            if(replayAllBtn) {
                replayAllBtn.style.display = 'block';
                replayAllBtn.onclick = () => {
                    window.location.href = `${baseUrl}/views/lessons/plant-game?type=hoa`;
                };
            }
            
            // Đổi lời chúc
            const title = document.querySelector('#win-modal h2');
            const msg = document.querySelector('#win-modal p');
            if(title) title.textContent = "🏆 HOÀN THÀNH TẤT CẢ! 🏆";
            if(msg) msg.textContent = "Bạn đã giải mã hết các loại cây. Quá tuyệt vời!";
        }

        if(closeModalBtn) {
            closeModalBtn.onclick = () => {
                if(winModal) winModal.style.display = 'none';
            };
        }
    }
});