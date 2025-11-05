document.addEventListener("DOMContentLoaded", () => {

    const trashItems = document.querySelectorAll(".trash-item");
    const dropzones = document.querySelectorAll(".trash-bin");
    const feedbackBox = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score"); 
    const resetButton = document.getElementById("trashResetButton");
    
    // Biến 'baseUrl' đã được nạp từ thẻ <script>
    let draggedItem = null;
    let correctDrops = 0;
    const totalDrops = trashItems.length; // Tổng số rác

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
                droppedItem.classList.add("dropped"); // Ẩn món rác đi
                correctDrops++;
                let points = 0;

                if (attempt === 1) {
                    points = 10;
                    updateScore(points);
                }
                
                if (correctDrops === totalDrops) {
                    showFeedback("🎉 Hoan hô! Tấm cảm ơn bạn đã dọn sạch sân nhà!", "win");
                } else {
                    if (points > 0) {
                        showFeedback(`Chính xác! Bạn được 10 điểm.`, "win");
                    } else {
                        showFeedback("Đúng rồi!", "win");
                    }
                }
                
            } else {
                // SAI
                droppedItem.dataset.attempt = attempt + 1;
                
                // Gợi ý
                let correctBinName = "";
                if(itemGroup === 'huuco') correctBinName = 'Hữu Cơ (màu xanh lá)';
                else if(itemGroup === 'taiche') correctBinName = 'Tái Chế (màu vàng)';
                else if(itemGroup === 'voco') correctBinName = 'Vô Cơ (màu đỏ)';
                
                showFeedback(`Sai rồi! "${droppedItem.alt}" phải bỏ vào thùng ${correctBinName}.`, "wrong");
            }
        });
    });

    // 3. Logic cho nút Reset
    resetButton.addEventListener('click', () => {
        fetch(`${baseUrl}/science/update-trash-score`, {
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
        
        const duration = (type === 'wrong') ? 3000 : 2000;
        setTimeout(() => {
            feedbackBox.textContent = "";
            feedbackBox.className = "";
        }, duration);
    }

    // Hàm cập nhật điểm
    async function updateScore(points) {
        try {
            const response = await fetch(`${baseUrl}/science/update-trash-score`, {
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