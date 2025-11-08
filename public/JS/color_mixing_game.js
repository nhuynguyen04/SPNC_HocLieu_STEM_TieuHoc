// Khởi tạo các đối tượng DOM
const canvas = document.getElementById("mixCanvas");
const ctx = canvas.getContext("2d");
const resultBox = document.getElementById("result");
const selectedContainer = document.getElementById("selectedColors");
const paletteColors = document.querySelectorAll(".color");
const clearButton = document.getElementById("clearButton");
const nextButton = document.getElementById("nextButton");
const hintBox = document.getElementById("hintBox"); 
const totalScoreSpan = document.getElementById("totalScore"); 

let selectedColors = [];
let isDrawing = false;

// Biến 'currentAttempt' và 'baseUrl' đã được nạp từ thẻ <script> trong .php

const baseColorRGBs = {
    red: [255, 0, 0],
    yellow: [255, 255, 0],
    blue: [0, 0, 255],
    white: [255, 255, 255],
    black: [0, 0, 0]
};

// --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

paletteColors.forEach(c => {
    c.addEventListener("click", () => selectColor(c.getAttribute("data-color")));
});

clearButton.addEventListener("click", clearMix);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

// --- CÁC HÀM LOGIC CHÍNH ---

function selectColor(colorName) {
    if (selectedColors.length < 2 && !selectedColors.includes(colorName)) {
        selectedColors.push(colorName);
        updateCanvasAndSwatches();
    }
}

/**
 * Xóa lựa chọn (khi người dùng nhấn nút)
 */
function clearMix() {
    selectedColors = [];
    resultBox.innerHTML = ""; // Xóa thông báo sai
    updateCanvasAndSwatches();
}

/**
 * Cập nhật các ô màu đã chọn và vẽ màu lên canvas
 */
function updateCanvasAndSwatches() {
    selectedContainer.innerHTML = "";
    selectedColors.forEach(clr => {
        const swatch = document.createElement("div");
        swatch.className = "selected-swatch";
        swatch.style.background = clr;
        selectedContainer.appendChild(swatch);
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0; 

    if (selectedColors.length >= 1) {
        drawPuddle(selectedColors[0], 150, 125);
    }
    if (selectedColors.length >= 2) {
        drawPuddle(selectedColors[1], 250, 125);
    }
}

function drawPuddle(colorName, x, y) {
    ctx.fillStyle = colorName;
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI * 2);
    ctx.fill();
}

// --- CÁC HÀM VẼ ---

function startDrawing(e) {
    if (selectedColors.length === 2) {
        isDrawing = true;
        canvas.style.cursor = 'crosshair';
        draw(e);
    } else {
        alert("Hãy chọn ĐỦ 2 màu để pha trước!");
    }
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    canvas.style.cursor = 'default';
    ctx.globalAlpha = 1.0; 
    checkResult(); // Kiểm tra kết quả khi nhả chuột
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mixColor = mixColors(selectedColors[0], selectedColors[1]);
    
    ctx.fillStyle = mixColor;
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}

// --- CÁC HÀM XỬ LÝ GAME ---

function mixColors(c1, c2) {
    const pair = [c1, c2].sort();
    if (pair[0] === 'blue' && pair[1] === 'yellow') {
        return 'rgb(0, 128, 0)'; 
    }
    const rgb1 = baseColorRGBs[c1];
    const rgb2 = baseColorRGBs[c2];
    const r = Math.floor((rgb1[0] + rgb2[0]) / 2);
    const g = Math.floor((rgb1[1] + rgb2[1]) / 2);
    const b = Math.floor((rgb1[2] + rgb2[2]) / 2);
    return `rgb(${r},${g},${b})`;
}

/**
 * Hàm kiểm tra kết quả
 */
function checkResult() {
    if (selectedColors.length < 2) return;

    const selectedPair = [...selectedColors].sort();
    const isCorrectPair = (selectedPair.length === correctPair.length) && 
                          (selectedPair[0] === correctPair[0] && selectedPair[1] === correctPair[1]);

    if (isCorrectPair) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

/**
 * Xử lý khi trả lời ĐÚNG
 */
function handleCorrectAnswer() {
    let points = 0;
    if (currentAttempt === 1) {
        points = 10;
    } else if (currentAttempt === 2) {
        points = 5;
    } // Lần 3 (currentAttempt === 3) hoặc hơn, points = 0

    resultBox.innerHTML = `Chính xác! Bạn nhận được ${points} điểm!`;
    resultBox.style.color = "green";

    // Cập nhật điểm hiển thị ngay lập tức
    totalScoreSpan.innerText = parseInt(totalScoreSpan.innerText) + points;

    // *** ĐÃ SỬA ĐƯỜNG DẪN TẠI ĐÂY ***
    nextButton.href = `${baseUrl}/views/lessons/color-game?next=1&points=${points}`;
    
    // Hiển thị/ẩn nút
    nextButton.style.display = "inline-block";
    clearButton.style.display = "none";
    
    // Vô hiệu hóa game
    togglePalette(false);
    isDrawing = false;
    canvas.style.cursor = 'not-allowed';
    hintBox.innerHTML = ""; // Xóa gợi ý
}

/**
 * Xử lý khi trả lời SAI
 */
function handleWrongAnswer() {
    resultBox.innerHTML = "Sai rồi! Hãy thử lại!";
    resultBox.style.color = "red";
    
    // Tăng số lần thử
    currentAttempt++; 
    
    // Cập nhật gợi ý dựa trên số lần thử MỚI
    if (currentAttempt === 2) {
        // Lần sai 1 (chuẩn bị cho lần thử 2)
        hintBox.innerHTML = `Gợi ý: Một trong hai màu là <span style="color:${correctPair[0]}">${correctPair[0].toUpperCase()}</span>.`;
    } else if (currentAttempt === 3) {
        // Lần sai 2 (chuẩn bị cho lần thử 3)
        hintBox.innerHTML = `Gợi ý: Bạn cần màu <span style="color:${correctPair[0]}">${correctPair[0].toUpperCase()}</span> và <span style="color:${correctPair[1]}">${correctPair[1].toUpperCase()}</span>.`;
    } else {
        // Lần sai 3 trở đi
        hintBox.innerHTML = `Hãy trộn màu <span style="color:${correctPair[0]}">${correctPair[0].toUpperCase()}</span> và <span style="color:${correctPair[1]}">${correctPair[1].toUpperCase()}</span>.`;
    }

    // Tự động làm mới bảng pha màu sau 1.5 giây
    setTimeout(() => {
        selectedColors = [];
        updateCanvasAndSwatches();
        resultBox.innerHTML = ""; // Xóa thông báo "Sai rồi"
    }, 1500); 
}

/**
 * Bật hoặc tắt bảng chọn màu
 */
function togglePalette(enabled) {
    paletteColors.forEach(c => {
        if (enabled) {
            c.classList.remove("disabled");
        } else {
            c.classList.add("disabled");
        }
    });
}