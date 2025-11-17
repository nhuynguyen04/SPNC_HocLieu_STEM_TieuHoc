document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_PARTS = (typeof totalParts !== 'undefined') ? totalParts : 7;

    const draggables = document.querySelectorAll(".draggable-part");
    const dropzones = document.querySelectorAll(".dropzone");
    const feedback = document.getElementById("game-feedback");
    const winModal = document.getElementById("win-modal");
    const restartBtn = document.getElementById("restart-game-btn");

    let correctDrops = 0;
    
    // --- Xử lý KÉO ---
    draggables.forEach(part => {
        part.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', part.dataset.partId);
            part.classList.add('dragging');
        });
        
        part.addEventListener('dragend', () => {
            part.classList.remove('dragging');
        });
    });

    // --- Xử lý THẢ ---
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Cho phép thả
            if (!zone.classList.contains('filled')) {
                 zone.classList.add('hovered');
            }
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hovered');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hovered');
            
            if (zone.classList.contains('filled')) return;
            
            const partId = e.dataTransfer.getData('text/plain');
            const targetId = zone.dataset.target;
            
            const draggedElement = document.querySelector(`.draggable-part[data-part-id='${partId}']`);

            if (partId === targetId) {
                // --- ĐÚNG ---
                showFeedback("Đúng rồi! Rất chính xác!", "success");
                
                zone.classList.add('filled');
                zone.draggable = false;
                
                const img = draggedElement.querySelector('img').cloneNode(true);
                zone.innerHTML = ''; 
                zone.appendChild(img);

                draggedElement.style.display = 'none';

                correctDrops++;
                
                if (correctDrops === TOTAL_PARTS) {
                    setTimeout(() => showModal(true), 500); 
                }
                
            } else {
                // --- SAI ---
                showFeedback("Ôi, sai vị trí rồi! Thử lại nhé.", "error");
                zone.classList.add('shake');
                setTimeout(() => zone.classList.remove('shake'), 500);
            }
        });
    });
    
    // Nút chơi lại
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });

    // Hiển thị thông báo
    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = type;
        setTimeout(() => feedback.textContent = '', 2000); 
    }
    
    function showModal(isWin) {
        if (isWin) {
            winModal.style.display = 'flex';
        }
    }
});