// --- KHỞI TẠO BIẾN & DOM ---
const itemsGrid = document.getElementById('items-grid');
const furnitureLayer = document.getElementById('furniture-layer');
const rugLayer = document.getElementById('rug-layer');

// [QUAN TRỌNG] Chỉ lấy 1 ID ảnh nền chính
const bgMain = document.getElementById('bg-main'); 

const trashCan = document.getElementById('trash-can');
const roomContainer = document.getElementById('room-container');

// Biến trạng thái
let draggedItem = null;
let offset = { x: 0, y: 0 };
let currentCategory = Object.keys(categories)[0]; // Lấy danh mục đầu tiên mặc định

// --- 1. SỰ KIỆN KHỞI TẠO ---
document.addEventListener("DOMContentLoaded", () => {
    // Render danh mục đầu tiên khi vào game
    renderItems(currentCategory);
});

// Hàm chuyển đổi Tab danh mục
window.switchCategory = function(catKey, btn) {
    currentCategory = catKey;
    
    // Update UI active cho nút
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Render lại lưới đồ vật bên trái
    renderItems(catKey);
}

// --- 2. RENDER DANH SÁCH ĐỒ VẬT (SIDEBAR) ---
function renderItems(catKey) {
    itemsGrid.innerHTML = ''; // Xóa danh sách cũ
    const catData = categories[catKey];
    
    if (catData && catData.items) {
        catData.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-card';
            
            // Tạo nội dung thẻ (Ảnh + Tên)
            div.innerHTML = `
                <div class="img-wrapper">
                    <img src="${baseUrl}/public/images/room_decor/${item.img}" style="max-width:100%; max-height:100%;">
                </div>
                <span>${item.name}</span>
            `;

            // XỬ LÝ SỰ KIỆN CLICK
            // Kiểm tra type là 'room' để đổi nền
            if (item.type === 'room') {
                div.onclick = () => changeRoomBackground(item.img);
            } else {
                // Nếu là Đồ vật -> Sinh ra trong phòng
                const isRug = (catKey === 'rug');
                div.onclick = () => spawnItem(item.id, item.img, item.w, catKey, isRug);
            }
            
            itemsGrid.appendChild(div);
        });
    }
}

// --- 3. HÀM THAY ĐỔI NỀN PHÒNG ---
function changeRoomBackground(imgSrc) {
    const fullPath = `${baseUrl}/public/images/room_decor/${imgSrc}`;
    
    // Cập nhật src cho ảnh nền duy nhất
    if(bgMain) {
        bgMain.src = fullPath;
    } else {
        console.error("Không tìm thấy element #bg-main. Hãy kiểm tra lại file View.");
    }
}

// --- 4. HÀM TẠO ĐỒ VẬT (SPAWN) ---
function spawnItem(id, imgSrc, width, category, isRug = false) {
    const el = document.createElement('img');
    el.src = `${baseUrl}/public/images/room_decor/${imgSrc}`;
    el.className = 'room-item';
    el.style.width = width + 'px';
    
    // Vị trí xuất hiện ngẫu nhiên trong vùng an toàn (giữa phòng)
    el.style.left = (300 + Math.random() * 100) + 'px';
    el.style.top = (300 + Math.random() * 100) + 'px';
    
    // --- [MỚI] Lưu ID để phân loại lớp hiển thị (Window/Poster) ---
    el.dataset.itemId = id; 
    // -----------------------------------------------------------

    el.dataset.flipped = "false";
    el.dataset.category = category; // Lưu loại để tính Z-index
    el.dataset.isRug = isRug;

    // Gán sự kiện chuột
    el.addEventListener('mousedown', startDrag);
    el.addEventListener('dblclick', flipItem);
    
    // Ngăn chặn hành vi kéo ảnh mặc định của trình duyệt
    el.addEventListener('dragstart', (e) => e.preventDefault());

    // PHÂN LOẠI LAYER
    if (isRug) {
        // Thảm: Bỏ vào lớp dưới, z-index thấp cố định
        el.style.zIndex = 1; 
        rugLayer.appendChild(el);
    } else {
        // Nội thất: Bỏ vào lớp trên, tính toán z-index động
        furnitureLayer.appendChild(el);
        updateZIndex(el);
    }
}

// --- 5. LOGIC KÉO THẢ (DRAG & DROP) ---
function startDrag(e) {
    // Chỉ xử lý chuột trái
    if (e.button !== 0) return;
    
    e.preventDefault();
    draggedItem = e.target;
    
    // Tính offset chuột so với góc trái trên của vật thể
    const rect = draggedItem.getBoundingClientRect();
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;

    // Tạm thời đưa vật lên lớp cao nhất để khi kéo không bị vật khác che mất
    // (Trừ thảm và Cửa sổ/Tranh thì không nên nổi lên quá cao)
    if (draggedItem.dataset.isRug !== "true") {
        draggedItem.style.zIndex = 99999;
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}

function drag(e) {
    if (!draggedItem) return;
    e.preventDefault();

    const containerRect = roomContainer.getBoundingClientRect();
    
    // Tính toán vị trí mới tương đối trong container
    let newX = e.clientX - containerRect.left - offset.x;
    let newY = e.clientY - containerRect.top - offset.y;

    // Giới hạn không cho kéo ra quá xa ngoài khung phòng
    newX = Math.max(-50, Math.min(newX, containerRect.width - 50));
    newY = Math.max(-50, Math.min(newY, containerRect.height - 50));

    draggedItem.style.left = newX + 'px';
    draggedItem.style.top = newY + 'px';

    // HIỆU ỨNG THÙNG RÁC
    checkTrashHover(e.clientX, e.clientY);
}

function endDrag(e) {
    if (!draggedItem) return;

    // Kiểm tra xem có thả vào thùng rác không
    const trashRect = trashCan.getBoundingClientRect();
    const isOverTrash = (
        e.clientX >= trashRect.left && e.clientX <= trashRect.right &&
        e.clientY >= trashRect.top && e.clientY <= trashRect.bottom
    );

    if (isOverTrash) {
        // Xóa vật thể
        draggedItem.remove();
    } else {
        // Nếu không xóa, tính toán lại Z-Index chuẩn vị trí mới
        if (draggedItem.dataset.isRug !== "true") {
            updateZIndex(draggedItem);
        }
    }

    // Reset trạng thái
    trashCan.classList.remove('drag-over');
    draggedItem = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
}

function checkTrashHover(mouseX, mouseY) {
    const trashRect = trashCan.getBoundingClientRect();
    if (mouseX >= trashRect.left && mouseX <= trashRect.right &&
        mouseY >= trashRect.top && mouseY <= trashRect.bottom) {
        trashCan.classList.add('drag-over');
    } else {
        trashCan.classList.remove('drag-over');
    }
}

// --- 6. [CẬP NHẬT] LOGIC TÍNH Z-INDEX (CHIỀU SÂU) ---
function updateZIndex(el) {
    // Không áp dụng cho thảm
    if (el.dataset.isRug === "true") return;

    const itemId = el.dataset.itemId || "";
    const category = el.dataset.category;

    // --- [LOGIC MỚI] XỬ LÝ VẬT TREO TƯỜNG (Cửa sổ, Tranh) ---
    // Kiểm tra nếu ID chứa chữ 'window' hoặc 'poster'
    if (itemId.includes('window') || itemId.includes('poster')) {
        // Gán Z-index thấp cố định (10) để luôn nằm sau Giường/Tủ (thường > 100)
        // Nhưng vẫn nằm trên Thảm (1)
        el.style.zIndex = 10; 
        return; // Kết thúc luôn, không tính toán tiếp
    }
    // -------------------------------------------------------

    const rect = el.getBoundingClientRect();
    
    // CÔNG THỨC ISOMETRIC CƠ BẢN:
    // Vật nào chân ở thấp hơn (Y lớn hơn) thì nằm đè lên vật ở cao hơn.
    let depth = Math.floor(parseInt(el.style.top) + rect.height);

    // LOGIC ƯU TIÊN: ĐỒ NHỎ NẰM TRÊN ĐỒ LỚN (Chỉ áp dụng cho đồ để bàn)
    // Loại bỏ 'decor' khỏi đây nếu bạn coi decor là tranh ảnh
    // Nhưng vì ta đã lọc window/poster ở trên, nên 'decor' ở đây sẽ là đồng hồ để bàn, v.v.
    if (category === 'decor' || category === 'misc' || category === 'toy') {
        depth += 2000; 
    }
    
    if (category === 'rug') {
        depth = 1;
    }

    el.style.zIndex = depth;
}

// --- 7. CÁC TIỆN ÍCH ---

// Xoay lật hình ảnh
function flipItem(e) {
    const el = e.target;
    if (el.dataset.flipped === "false") {
        el.style.transform = "scaleX(-1)";
        el.dataset.flipped = "true";
    } else {
        el.style.transform = "scaleX(1)";
        el.dataset.flipped = "false";
    }
}

// Dọn sạch phòng (Giữ lại nền, chỉ xóa đồ)
window.clearRoom = function() {
    if(confirm('Bạn có chắc muốn xóa hết đồ đạc trong phòng không?')) {
        furnitureLayer.innerHTML = '';
        rugLayer.innerHTML = '';
    }
}

// Chụp ảnh màn hình
if(document.getElementById('save-btn')) {
    document.getElementById('save-btn').addEventListener('click', () => {
        html2canvas(roomContainer, {
            useCORS: true,
            scale: 2 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'thiet-ke-phong-cua-em.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
}