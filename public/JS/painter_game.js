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
    // Lấy biến màn tiếp theo từ View
    const nextPlantType = window.nextPlantType;

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
                    // *** LOGIC CHUYỂN MÀN MỚI ***
                    if (nextPlantType) {
                        showFeedback("🎉 Xuất sắc! Đang chuyển sang cây tiếp theo...", "win");
                        // Tự động chuyển sau 2 giây
                        setTimeout(() => {
                            // Cấu tạo URL mới: giữ nguyên đường dẫn, chỉ đổi tham số ?type=...
                            // Cách an toàn nhất là dùng URL object
                            const currentUrl = new URL(window.location.href);
                            currentUrl.searchParams.set('type', nextPlantType);
                            window.location.href = currentUrl.toString();
                        }, 2000);
                    } else {
                        // Hết màn
                        if (points > 0) {
                            showFeedback("🏆 CHÚC MỪNG! Bạn đã hoàn thành tất cả các cây!", "win");
                        } else {
                            showFeedback("🏆 Bạn đã hoàn thành tất cả các cây!", "win");
                        }
                        // Có thể thêm nút về menu chính hoặc alert tại đây
                    }
                    // ******************************
                    
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

    // Back button
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
                window.location.href = href;
            })
            .catch((err) => {
                console.error('Lỗi reset khi nhấn Quay lại:', err);
                window.location.href = href;
            });
        });
    }

    // Finish button
    if (finishButton) {
        finishButton.addEventListener('click', async (e) => {
            e.preventDefault();
            finishButton.disabled = true;
            finishButton.textContent = 'Đang xử lý...';
            try {
                const resp = await fetch(`${baseUrl}/views/lessons/update-plant-score`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'commit', game_id: 2, total_drops: totalDrops })
                });
                const ct = resp.headers.get('content-type') || '';
                let data = null;
                if (ct.indexOf('application/json') !== -1) data = await resp.json();
                else data = { success: false, message: 'Non-JSON response' };

                if (data && data.success) {
                    if (data.newScore !== undefined) scoreDisplay.textContent = data.newScore;
                    if (data.score !== undefined) scoreDisplay.textContent = data.score;
                    if (data.completed) showFeedback('🎉 Điểm đã được lưu và hoàn thành!', 'win');
                    else showFeedback('Điểm đã được lưu.', 'win');

                    setTimeout(() => {
                        const href = backButton ? backButton.getAttribute('href') : `${baseUrl}/views/lessons/science.php`;
                        window.location.href = href;
                    }, 1500);
                } else {
                    const msg = (data && data.message) ? data.message : 'Không thể lưu điểm.';
                    if (data && data.newScore !== undefined) scoreDisplay.textContent = data.newScore;
                    showFeedback(msg, 'hint');
                }
            } catch (err) {
                console.error('Finish commit error:', err);
                showFeedback('Lỗi khi lưu điểm. Vui lòng thử lại.', 'hint');
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
            const contentType = response.headers.get('content-type') || '';
            let data = null;
            if (contentType.indexOf('application/json') !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response from update-plant-score:', text);
                return;
            }

            if (data && data.newScore !== undefined) {
                scoreDisplay.textContent = data.newScore;
            }
        } catch (error) {
            console.error("Lỗi cập nhật điểm:", error);
        }
    }
});