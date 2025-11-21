document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('drawing-canvas');
    // willReadFrequently giúp tối ưu hóa cho các thao tác đọc dữ liệu như Flood Fill
    const ctx = canvas.getContext('2d', { willReadFrequently: true }); 
    const timeDisplay = document.getElementById('time-display');
    
    // --- BIẾN TRẠNG THÁI ---
    let isDrawing = false;
    let currentTool = 'brush'; // brush, eraser, line, rect, circle, triangle, bucket, sticker
    let currentColor = '#000000';
    let currentSize = 5;
    let startX, startY;
    let snapshot; // Lưu ảnh canvas tạm thời khi vẽ hình khối
    let currentStickerImg = null;

    // --- QUẢN LÝ UNDO (HOÀN TÁC) ---
    let undoStack = [];
    const MAX_HISTORY = 20; // Lưu tối đa 20 bước

    function saveState() {
        // Nếu lịch sử quá dài, xóa bớt cái cũ nhất
        if (undoStack.length >= MAX_HISTORY) {
            undoStack.shift(); 
        }
        // Lưu trạng thái hiện tại của canvas
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    // --- CÀI ĐẶT CANVAS ---
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // --- 1. KHỞI TẠO & TẢI ẢNH NỀN ---
    function initCanvas() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (bgImageName && bgImageName !== '') {
            const img = new Image();
            img.src = `${baseUrl}/public/images/painter/${bgImageName}`;
            img.onload = () => {
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                saveState(); // Lưu trạng thái đầu tiên (có ảnh nền)
            };
            img.onerror = () => {
                console.error("Không tải được ảnh nền:", img.src);
                saveState(); // Lưu trạng thái trắng nếu lỗi
            };
        } else {
            saveState(); // Lưu trạng thái trắng
        }
    }

    initCanvas();

    // --- 2. XỬ LÝ CÔNG CỤ ---
    
    // Chọn công cụ (Trái)
    document.querySelectorAll('.tool-btn').forEach(btn => {
        // Bỏ qua nút Undo
        if(btn.id === 'undo-btn') return;

        btn.addEventListener('click', () => {
            // Tắt active cũ
            const currentActive = document.querySelector('.tool-btn.active');
            if(currentActive) currentActive.classList.remove('active');
            
            // Tắt active sticker
            const activeSticker = document.querySelector('.topic-btn.active');
            if(activeSticker) activeSticker.classList.remove('active');

            // Bật active mới
            btn.classList.add('active');
            currentTool = btn.dataset.tool;
        });
    });
    
    // Nút Undo
    document.getElementById('undo-btn').addEventListener('click', () => {
        if (undoStack.length > 0) {
            const previousState = undoStack.pop();
            ctx.putImageData(previousState, 0, 0);
        } else {
            // Không còn lịch sử
            // alert("Không thể hoàn tác nữa!");
        }
    });

    // Slider kích thước
    document.getElementById('size-slider').addEventListener('input', (e) => {
        currentSize = e.target.value;
    });

    // Chọn màu
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            document.querySelector('.color-swatch.selected').classList.remove('selected');
            swatch.classList.add('selected');
            currentColor = swatch.dataset.color;
        });
    });
    document.getElementById('color-picker').addEventListener('change', (e) => {
        currentColor = e.target.value;
    });

    // Nút Xóa Hết
    document.getElementById('clear-btn').addEventListener('click', () => {
        if(confirm("Bé có muốn xóa hết tranh để vẽ lại không?")) {
            saveState(); // Lưu trước khi xóa
            initCanvas(); // Vẽ lại nền trắng hoặc ảnh nền
        }
    });

    // Nút Lưu
    document.getElementById('save-btn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'tranh-cua-be.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // --- 3. CÁC SỰ KIỆN VẼ (MOUSE EVENTS) ---
    
    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        // Tính toán tỷ lệ nếu canvas bị co giãn CSS
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const pos = getPos(e);
        startX = pos.x;
        startY = pos.y;

        // Lưu trạng thái TRƯỚC KHI thực hiện hành động (trừ bucket vì nó xử lý riêng)
        if (currentTool !== 'bucket') {
             saveState(); 
        }

        ctx.beginPath();
        ctx.lineWidth = currentSize;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;

        // Công cụ Đổ màu
        if (currentTool === 'bucket') {
            saveState(); // Lưu trước khi đổ
            floodFill(Math.floor(startX), Math.floor(startY), hexToRgba(currentColor));
            isDrawing = false;
            return;
        }
        
        // Công cụ Hình khối: Lưu snapshot để tạo hiệu ứng kéo dãn
        if (['rect', 'circle', 'triangle', 'line'].includes(currentTool)) {
            snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else {
            // Bút vẽ / Tẩy
            ctx.moveTo(startX, startY);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const pos = getPos(e);

        if (['rect', 'circle', 'triangle', 'line'].includes(currentTool)) {
            ctx.putImageData(snapshot, 0, 0); // Xóa nét cũ
            drawShape(pos.x, pos.y); // Vẽ nét mới tại vị trí chuột
        } else {
            // Vẽ tự do
            if (currentTool === 'eraser') {
                ctx.strokeStyle = '#ffffff'; // Tẩy là vẽ màu trắng
            }
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    // --- 4. HÀM VẼ HÌNH KHỐI ---
    function drawShape(x, y) {
        ctx.beginPath();
        if (currentTool === 'rect') {
            ctx.strokeRect(startX, startY, x - startX, y - startY);
            // ctx.fillRect(startX, startY, x - startX, y - startY); // Nếu muốn hình đặc
        } else if (currentTool === 'circle') {
            const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        } else if (currentTool === 'triangle') {
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.lineTo(startX * 2 - x, y);
            ctx.closePath();
            ctx.stroke();
        } else if (currentTool === 'line') {
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    // --- 5. THUẬT TOÁN ĐỔ MÀU (FLOOD FILL) ---
    function hexToRgba(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b, 255];
    }

    function getPixel(imageData, x, y) {
        if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) return [-1, -1, -1, -1];
        const offset = (y * imageData.width + x) * 4;
        return [
            imageData.data[offset],
            imageData.data[offset+1],
            imageData.data[offset+2],
            imageData.data[offset+3]
        ];
    }

    function setPixel(imageData, x, y, color) {
        const offset = (y * imageData.width + x) * 4;
        imageData.data[offset] = color[0];
        imageData.data[offset+1] = color[1];
        imageData.data[offset+2] = color[2];
        imageData.data[offset+3] = color[3];
    }

    function colorsMatch(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }

    function floodFill(startX, startY, fillColor) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const targetColor = getPixel(imageData, startX, startY);

        // Nếu màu click trùng màu muốn tô -> Dừng
        if (colorsMatch(targetColor, fillColor)) return;
        
        // Giới hạn vùng tô (tránh treo trình duyệt nếu tô vùng quá lớn)
        // Sử dụng Stack thay vì Đệ quy
        const stack = [[startX, startY]];
        
        while (stack.length) {
            const [x, y] = stack.pop();
            const currentColor = getPixel(imageData, x, y);

            if (colorsMatch(currentColor, targetColor)) {
                setPixel(imageData, x, y, fillColor);
                
                // Thêm các điểm lân cận vào stack
                if (x + 1 < canvas.width) stack.push([x + 1, y]);
                if (x - 1 >= 0) stack.push([x - 1, y]);
                if (y + 1 < canvas.height) stack.push([x, y + 1]);
                if (y - 1 >= 0) stack.push([x, y - 1]);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    // --- 6. ĐỒNG HỒ ĐẾM NGƯỢC ---
    let timeLeft = (typeof timeLimit !== 'undefined') ? timeLimit : 300;
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Hết giờ! Bé hãy lưu lại tác phẩm của mình nhé.");
            return;
        }
        timeLeft--;
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        if (timeDisplay) {
            timeDisplay.innerText = `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
        }
    }, 1000);

});