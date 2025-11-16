document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = baseUrl; 
    const CURRENT_LEVEL_DATA = currentLevelData; 
    const TOTAL_GAME_LEVELS = totalGameLevels; 

    // DOM Elements
    const characterBank = document.getElementById('character-bank');
    // const checkSolutionBtn = document.getElementById('check-solution-btn'); // Đã xóa
    const feedbackMessage = document.getElementById('game-feedback');
    const livesContainer = document.getElementById('lives-container');
    const gameOverModal = document.getElementById('game-over-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');

    let draggedCharId = null; 
    let lives = 3; 
    let currentLevel = CURRENT_LEVEL_DATA.id;
    let totalCorrectSlots = 0;
    const totalSlotsToWin = Object.keys(CURRENT_LEVEL_DATA.solution).length;

    // Khởi chạy game
    initGame();

    // --- SỬ DỤNG EVENT DELEGATION ---
    
    // 1. BẮT ĐẦU KÉO
    document.addEventListener('dragstart', (e) => {
        const target = e.target.closest('.draggable-char, .person-node');
        
        if (!target || !target.dataset.charId || target.classList.contains('empty') || !target.draggable) {
            e.preventDefault();
            return;
        }

        draggedCharId = target.dataset.charId;
        e.dataTransfer.setData('text/plain', draggedCharId);
        e.dataTransfer.effectAllowed = "move";
        setTimeout(() => target.style.opacity = '0.5', 0);
    });

    // 2. KẾT THÚC KÉO
    document.addEventListener('dragend', (e) => {
        const target = e.target.closest('.draggable-char, .person-node');
        if (target) target.style.opacity = '1';
    });

    // 3. KÉO QUA VÙNG THẢ
    document.addEventListener('dragover', (e) => {
        const slot = e.target.closest('.drop-slot');
        if (slot && !slot.classList.contains('correct')) {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = "move";
            slot.classList.add('hovered');
        }
    });

    // 4. RỜI KHỎI VÙNG THẢ
    document.addEventListener('dragleave', (e) => {
        const slot = e.target.closest('.drop-slot');
        if (slot) {
            slot.classList.remove('hovered');
        }
    });

    // 5. THẢ (DROP)
    document.addEventListener('drop', (e) => {
        const slot = e.target.closest('.drop-slot');
        
        if (!slot || !draggedCharId || slot.classList.contains('correct')) {
            if (draggedCharId) {
                // Nếu thả ra ngoài, trả về bank
                returnToBank(draggedCharId);
            }
            draggedCharId = null;
            return;
        }
        
        e.preventDefault();
        slot.classList.remove('hovered');

        const charIdToDrop = draggedCharId; 
        const currentSlotCharId = slot.dataset.currentCharId; 
        const slotKey = slot.id.replace('slot-', '');
        const correctCharId = CURRENT_LEVEL_DATA.solution[slotKey];

        // TÌM PHẦN TỬ GỐC
        let originalCharElement = document.querySelector(`#character-bank .draggable-char[data-char-id="${charIdToDrop}"]`);
        if (!originalCharElement || originalCharElement.style.display === 'none') {
             const sourceSlot = document.querySelector(`.drop-slot[data-current-char-id="${charIdToDrop}"]`);
             if (sourceSlot && sourceSlot !== slot) {
                 emptySlot(sourceSlot); 
             }
        } else {
            originalCharElement.style.display = 'none';
        }

        // TRẢ LẠI NHÂN VẬT CŨ
        if (currentSlotCharId) {
            returnToBank(currentSlotCharId);
        }

        // ĐIỀN VÀO Ô MỚI
        fillSlot(slot, charIdToDrop, false); // Tạm thời chưa khóa

        // KIỂM TRA ĐÚNG/SAI NGAY LẬP TỨC
        if (charIdToDrop === correctCharId) {
            // *** ĐÚNG  ***
            slot.classList.add('correct');
            slot.draggable = false; // Khóa lại, không cho kéo đi nữa
            totalCorrectSlots++;
            showFeedback("Đúng rồi!", 'success');
            
            // KIỂM TRA THẮNG
            if (totalCorrectSlots === totalSlotsToWin) {
                showModal('win');
            }
            
        } else {
            // *** SAI ***
            lives--;
            updateLivesDisplay();
            showFeedback(`Sai vị trí! Bạn mất 1 trái tim.`, 'error');
            
            // Thêm hiệu ứng rung lắc
            slot.classList.add('wrong-immediate');
            setTimeout(() => {
                slot.classList.remove('wrong-immediate');
                // Trả nhân vật vừa thả sai về bank
                emptySlot(slot);
                returnToBank(charIdToDrop);
            }, 600);

            // KIỂM TRA THUA
            if (lives <= 0) {
                showModal('lose');
            }
        }
        
        draggedCharId = null; // Reset
    });

    // --- CÁC HÀM HỖ TRỢ ---

    function initGame() {
        lives = 3; 
        totalCorrectSlots = 0;
        updateLivesDisplay();
        feedbackMessage.style.display = 'none'; 
        
        nextLevelBtn.onclick = () => {
            const nextLevel = currentLevel + 1;
            window.location.href = `${BASE_URL}/views/lessons/technology_family_tree_game?level=${nextLevel}`;
        };
        restartGameBtn.onclick = () => {
            window.location.reload(); 
        };

        gameOverModal.style.display = 'none';
        
        resetSlotsAndBank();
    }

    function resetSlotsAndBank() {
        characterBank.innerHTML = '';
        CURRENT_LEVEL_DATA.available_characters.forEach(charId => {
            const charDiv = createDraggableCharElement(charId);
            characterBank.appendChild(charDiv);
        });

        document.querySelectorAll('.drop-slot').forEach(slot => {
            emptySlot(slot);
        });
    }

    function createDraggableCharElement(charId) {
        const charDiv = document.createElement('div');
        charDiv.className = 'draggable-char';
        charDiv.dataset.charId = charId;
        charDiv.draggable = true;
        const charName = charId.charAt(0).toUpperCase() + charId.slice(1);
        
        charDiv.innerHTML = `
            <img src="${BASE_URL}/public/images/family_tree/${charId}.png" alt="${charId}">
            <span class="char-name">${charName}</span>
        `;
        return charDiv;
    }
    
    function fillSlot(slot, charId, isCorrect) { // isCorrect dùng để khóa
        const charName = charId.charAt(0).toUpperCase() + charId.slice(1);
        slot.innerHTML = `
            <img src="${BASE_URL}/public/images/family_tree/${charId}.png" alt="${charId}">
            <span class="char-name">${charName}</span>
        `;
        slot.style.backgroundImage = 'none';
        slot.style.backgroundColor = 'none'; 
        slot.style.borderColor = 'none';       
        slot.style.borderStyle = 'none';     
        slot.style.filter = 'none'; 

        slot.classList.add('filled');
        slot.classList.remove('empty');
        slot.dataset.currentCharId = charId;
        slot.dataset.charId = charId; 
        
        slot.draggable = !isCorrect;
        if(isCorrect) {
            slot.classList.add('correct');
        }
    }

    function emptySlot(slot) {
        slot.innerHTML = '';
        slot.style.backgroundImage = `url('${BASE_URL}/public/images/family_tree/empty_slot.png')`;
        slot.style.backgroundColor = '#e0e0e0'; 
        slot.style.borderColor = '#999';       
        slot.style.borderStyle = 'dashed';     
        slot.style.filter = 'grayscale(100%)'; 

        slot.classList.remove('filled', 'correct', 'wrong', 'wrong-immediate', 'correct-immediate');
        slot.classList.add('empty');
        slot.dataset.currentCharId = '';
        slot.dataset.charId = ''; 
        slot.draggable = false;
    }

    // Trả 1 nhân vật về ngân hàng
    function returnToBank(charId) {
        const charInBank = document.querySelector(`#character-bank .draggable-char[data-char-id="${charId}"]`);
        if (charInBank) {
            charInBank.style.display = 'flex';
        }
    }

    function updateLivesDisplay() {
        const hearts = livesContainer.querySelectorAll('.fa-heart');
        hearts.forEach((heart, index) => {
            if (index < lives) {
                heart.classList.add('live');
                heart.classList.remove('lost');
            } else {
                heart.classList.remove('live');
                heart.classList.add('lost');
            }
        });
    }

    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 2000);
    }

    function showModal(status) {
        document.querySelectorAll('.draggable-char, .person-node').forEach(el => el.draggable = false);

        if (status === 'win') {
            modalTitle.textContent = "Chúc Mừng!";
            modalMessage.textContent = "Bạn đã hoàn thành xuất sắc cấp độ này!";
            if (currentLevel < TOTAL_GAME_LEVELS) {
                nextLevelBtn.style.display = 'inline-block';
            } else {
                modalMessage.textContent = "Bạn đã hoàn thành tất cả các cấp độ! Giỏi quá!";
                nextLevelBtn.style.display = 'none';
            }
            restartGameBtn.textContent = "Chơi lại từ đầu";
            restartGameBtn.onclick = () => { 
                window.location.href = `${BASE_URL}/views/lessons/technology_family_tree_game?level=1`;
            };
        } else { 
            modalTitle.textContent = "Thất bại...";
            modalMessage.textContent = "Bạn đã hết 3 lượt sai. Đừng nản chí, hãy thử lại nhé!";
            nextLevelBtn.style.display = 'none';
            restartGameBtn.textContent = "Chơi lại cấp độ này";
            restartGameBtn.onclick = () => { 
                window.location.reload();
            };
        }
        gameOverModal.style.display = 'flex';
    }
});