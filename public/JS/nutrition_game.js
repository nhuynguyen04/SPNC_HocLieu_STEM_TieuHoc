document.addEventListener("DOMContentLoaded", () => {
    
    // Tìm các phần tử bên trong .game-wrapper
    const gameWrapper = document.querySelector(".game-wrapper");
    if (!gameWrapper) return;

    const foodItems = gameWrapper.querySelectorAll(".food-item");
    const pyramidLevels = gameWrapper.querySelectorAll(".pyramid-level");
    const feedbackBox = gameWrapper.querySelector("#feedback");
    const scoreDisplay = gameWrapper.querySelector("#score");
    const resetButton = gameWrapper.querySelector("#resetButton");
    
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

    // --- 2. Xử lý thả (Drop) ---
    pyramidLevels.forEach(level => {
        level.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            level.classList.add("drag-over");
        });

        level.addEventListener("dragleave", () => {
            level.classList.remove("drag-over");
        });

        level.addEventListener("drop", (e) => {
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
                        // Lần 1 đúng -> 10 điểm
                        showFeedback(`✅ Chính xác! Bạn được 10 điểm!`, "correct");
                        updateScore(10); 
                    } else {
                        // Lần 2 (hoặc hơn) mới đúng -> 0 điểm
                        showFeedback(`👍 Đúng rồi! ${draggedItem.dataset.name} thuộc ${groupNames[foodGroup]}.`, "correct");
                        // Không cộng điểm
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
        } catch (error) {
            console.error("Lỗi cập nhật điểm:", error);
        }
    }
});