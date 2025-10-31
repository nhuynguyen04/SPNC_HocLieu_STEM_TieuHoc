document.addEventListener("DOMContentLoaded", () => {

    const draggableParts = document.querySelectorAll(".draggable-part");
    const dropzones = document.querySelectorAll(".dropzone");
    const feedbackBox = document.getElementById("plant-feedback");
    const scoreDisplay = document.getElementById("score"); // Thêm mới
    
    // Biến 'baseUrl' đã được nạp từ thẻ <script>
    let draggedItem = null;
    let correctDrops = 0;
    
    // Đếm số dropzone có tên (bỏ qua lá 2, vì dùng chung tên 'la') - CHỈNH LẠI
    const totalDrops = document.querySelectorAll('.dropzone[data-target-part]').length;


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

            // KIỂM TRA ĐÁP ÁN
            if (partName === targetName) {
                // ĐÚNG
                const img = droppedItem.querySelector('img');
                zone.appendChild(img); 
                
                droppedItem.classList.add("dropped");
                droppedItem.setAttribute("draggable", "false");
                
                zone.classList.add("correct");
                zone.dataset.targetPart = "filled"; // Đánh dấu là đã đầy

                if (attempt === 1) {
                    // Lần 1 đúng -> 10 điểm
                    showFeedback("Chính xác! Bạn nhận được 10 điểm.", "win");
                    updateScore(10);
                } else {
                    // Lần 2 (hoặc hơn) mới đúng -> 0 điểm
                    showFeedback("Đúng rồi!", "win");
                    // Không cộng điểm
                }

                correctDrops++;
                if (correctDrops === totalDrops) {
                    showFeedback("Chúc mừng! Bạn đã ghép hoàn chỉnh cái cây!", "win");
                }
                
            } else if (targetName === "filled") {
                showFeedback("Vị trí này đã được ghép đúng rồi!", "hint");
            } else {
                // SAI
                // Tăng số lần thử (để lần sau 0 điểm)
                droppedItem.dataset.attempt = attempt + 1;
                
                // Hiển thị gợi ý
                let partNameVietnamese = partName;
                if(partName === 'hoa') partNameVietnamese = 'Hoa';
                if(partName === 'la') partNameVietnamese = 'Lá';
                if(partName === 'than') partNameVietnamese = 'Thân';
                if(partName === 're') partNameVietnamese = 'Rễ';
                
                showFeedback(`Sai vị trí! Gợi ý: Đây là '${partNameVietnamese}'.`, "wrong");
            }
        });
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

    // *** Hàm cập nhật điểm ***
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