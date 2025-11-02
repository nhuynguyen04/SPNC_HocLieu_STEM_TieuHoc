document.addEventListener("DOMContentLoaded", () => {

    const draggableParts = document.querySelectorAll(".draggable-label");
    const dropzones = document.querySelectorAll(".dropzone");
    const feedbackBox = document.getElementById("plant-feedback");
    const scoreDisplay = document.getElementById("score"); 
    const resetButton = document.getElementById("plantResetButton");
    
    // Biến 'baseUrl' đã được nạp từ thẻ <script>
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
                
                zone.classList.add("correct");
                zone.dataset.targetPart = "filled"; 

                let points = 0;
                if (attempt === 1) {
                    points = 10;
                    updateScore(points);
                }

                correctDrops++; 
                
                if (correctDrops === totalDrops) {
                    if (points > 0) {
                        showFeedback("🎉 Chúc mừng! Bạn nhận được 10 điểm và đã hoàn thành!", "win");
                    } else {
                        showFeedback("🎉 Chúc mừng! Bạn đã ghép hoàn chỉnh cái cây!", "win");
                    }
                } else {
                    if (points > 0) {
                        showFeedback(`Chính xác! Bạn nhận được ${points} điểm.`, "win");
                    } else {
                        showFeedback("Đúng rồi!", "win");
                    }
                }
                
            } else if (targetName === "filled") {
                showFeedback("Vị trí này đã được ghép đúng rồi!", "hint");
            } else {
                // SAI
                droppedItem.dataset.attempt = attempt + 1;
                
                // *** ĐÃ CẬP NHẬT GỢI Ý ***
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
        fetch(`${baseUrl}/science/update-plant-score`, {
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
            const response = await fetch(`${baseUrl}/science/update-plant-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_points', points: points })
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