let currentQuestionIndex = 0;
let score = 0;

// Các element DOM cần dùng
const quizContentEl = document.getElementById('quizContent');
const finalResultEl = document.getElementById('finalResult');
const progressFillEl = document.getElementById('progressFill');
const progressBarBox = document.getElementById('progressBarBox');

// 1. HÀM HIỂN THỊ CÂU HỎI
function loadQuestion(index) {
    const totalQuestions = quizData.length;
    // Cập nhật thanh tiến độ
    const progressPercent = ((index) / totalQuestions) * 100;
    progressFillEl.style.width = `${progressPercent}%`;

    if (index >= totalQuestions) {
        showFinalResult();
        return;
    }

    const question = quizData[index];
    
    // Tạo HTML cho các lựa chọn
    let optionsHTML = '';
    for (const [key, value] of Object.entries(question.options)) {
        optionsHTML += `<button class="option-btn" onclick="checkAnswer(this, '${key}')">${key}. ${value}</button>`;
    }

    // Render câu hỏi vào DOM
    quizContentEl.innerHTML = `
        <div class="question-box active">
            <div class="question-text">Câu ${index + 1}: ${question.question}</div>
            <div class="options-grid">
                ${optionsHTML}
            </div>
            <div class="explanation-box" id="explanation-${index}">
                <div class="explanation-title">Giải thích:</div>
                <span id="explanation-text-${index}"></span>
            </div>
            <button class="next-btn" id="nextBtn-${index}" onclick="nextQuestion()">Câu tiếp theo</button>
        </div>
    `;
}

// 2. HÀM KIỂM TRA ĐÁP ÁN
function checkAnswer(selectedBtn, selectedOption) {
    const currentQuizData = quizData[currentQuestionIndex];
    const correctOption = currentQuizData.correct;
    const allOptions = document.querySelectorAll('.option-btn');

    // Vô hiệu hóa tất cả các nút để không chọn lại được
    allOptions.forEach(btn => btn.disabled = true);

    // Kiểm tra đúng/sai
    if (selectedOption === correctOption) {
        selectedBtn.classList.add('correct');
        score += 10; // Cộng 10 điểm
    } else {
        selectedBtn.classList.add('wrong');
        // Tìm và hiển thị đáp án đúng
        allOptions.forEach(btn => {
            if (btn.textContent.startsWith(correctOption + '.')) {
                btn.classList.add('correct');
            }
        });
    }

    // Hiển thị giải thích
    const explanationBox = document.getElementById(`explanation-${currentQuestionIndex}`);
    const explanationText = document.getElementById(`explanation-text-${currentQuestionIndex}`);
    explanationText.textContent = currentQuizData.explanation;
    explanationBox.style.display = 'block';

    // Hiển thị nút Next
    document.getElementById(`nextBtn-${currentQuestionIndex}`).style.display = 'block';
}

// 3. HÀM CHUYỂN CÂU TIẾP THEO
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// 4. HÀM HIỂN THỊ KẾT QUẢ CUỐI CÙNG
function showFinalResult() {
    const totalQuestions = quizData.length;
    quizContentEl.style.display = 'none';
    progressBarBox.style.display = 'none';
    finalResultEl.style.display = 'block';

    const scoreText = document.getElementById('finalScoreText');
    const messageText = document.getElementById('finalMessage');

    scoreText.textContent = `${score} / ${totalQuestions * 10} điểm`;

    if (score === totalQuestions * 10) {
        messageText.textContent = "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi!";
    } else if (score >= (totalQuestions * 10) * 0.6) {
        messageText.textContent = "Làm tốt lắm! Bạn đã nắm được phần lớn kiến thức.";
    } else {
        messageText.textContent = "Hãy xem lại video và thử lại lần nữa nhé!";
    }
}

// Bắt đầu game khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    if (typeof quizData !== 'undefined' && quizData.length > 0) {
        loadQuestion(0);
    } else {
        console.error("Không tìm thấy dữ liệu câu hỏi (quizData)!");
    }
});