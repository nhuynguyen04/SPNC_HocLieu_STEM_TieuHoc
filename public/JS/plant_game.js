document.addEventListener("DOMContentLoaded", () => {

    const draggableParts = document.querySelectorAll(".draggable-label");
    const dropzones = document.querySelectorAll(".dropzone");
    const feedbackBox = document.getElementById("plant-feedback");
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

                // points are awarded once per finished plant (handled on Finish click)
                let points = 0;

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

    // Back button: simply navigate back (no server-side scoring to reset)
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            // allow normal navigation
        });
    }

    // Finish button: if there is a next plant, navigate to it (do NOT commit here).
    // Only commit to DB when on the last plant (no next plant type available).
    if (finishButton) {
        finishButton.addEventListener('click', async (e) => {
            e.preventDefault();

            // Kiểm tra xem đã ghép đủ chưa (logic client)
            if (correctDrops < totalDrops) {
                showFeedback('Bạn chưa ghép xong tất cả các bộ phận!', 'hint');
                return;
            }

            // If there is a next plant type, navigate to it (no scoring calls)
            const nextType = window.nextPlantType || null;
            if (nextType) {
                window.location.href = `${baseUrl}/views/lessons/science_plant_game?type=${encodeURIComponent(nextType)}`;
                return;
            }

            // Otherwise (no next) perform commit to DB
            finishButton.disabled = true;
            finishButton.textContent = 'Đang xử lý...';
            
            try {
                const resp = await fetch(`${baseUrl}/views/lessons/update-plant-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit', game_id: 5 })
                });
                
                const ct = resp.headers.get('content-type') || '';
                let data = null;
                if (ct.indexOf('application/json') !== -1) data = await resp.json();
                else data = { success: false };

                if (data && data.success) {
                    // Show modal and allow replay/next logic from modal
                    showWinModal(); 
                } else {
                    console.error('commit response', data);
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

    // No scoring update function: scoring has been removed for the Plant game.

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
                    window.location.href = `${baseUrl}/views/lessons/science_plant_game?type=${encodeURIComponent(nextType)}`;
                };
            }
            if(replayAllBtn) replayAllBtn.style.display = 'none';
            // Always show 'Back to lessons' button so user can return to lessons list
            const backToLessonsBtn = document.getElementById('back-to-lessons-btn');
            if (backToLessonsBtn) {
                backToLessonsBtn.style.display = 'block';
                backToLessonsBtn.onclick = () => {
                    window.location.href = `${baseUrl}/views/lessons/science.php`;
                };
            }
        } else {
            // HẾT MÀN -> Hiện nút Chơi lại từ đầu
            if(nextLevelBtn) nextLevelBtn.style.display = 'none';
            if(replayAllBtn) {
                replayAllBtn.style.display = 'block';
                replayAllBtn.onclick = () => {
                    window.location.href = `${baseUrl}/views/lessons/science_plant_game?type=hoa`;
                };
            }
            // Show 'Back to lessons' alongside replay
            const backToLessonsBtn2 = document.getElementById('back-to-lessons-btn');
            if (backToLessonsBtn2) {
                backToLessonsBtn2.style.display = 'block';
                backToLessonsBtn2.onclick = () => {
                    window.location.href = `${baseUrl}/views/lessons/science.php`;
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