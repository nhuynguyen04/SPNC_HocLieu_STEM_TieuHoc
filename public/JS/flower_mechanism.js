document.addEventListener('DOMContentLoaded', function() {
    // Các phần tử DOM
    const materialCards = document.querySelectorAll('.material-card');
    const predictionOptions = document.querySelectorAll('.prediction-option input');
    const startBtn = document.getElementById('startExperiment');
    const restartBtn = document.getElementById('restartExperiment');
    const resultsSection = document.querySelector('.results-section');
    const flower = document.getElementById('flower');
    const waterDroplets = document.getElementById('waterDroplets');
    const experimentProgress = document.getElementById('experimentProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Kết quả elements
    const resultMaterial = document.getElementById('resultMaterial');
    const resultPrediction = document.getElementById('resultPrediction');
    const resultTime = document.getElementById('resultTime');
    const resultMessage = document.getElementById('resultMessage');
    
    // Biến trạng thái
    let selectedMaterial = null;
    let selectedPrediction = null;
    let experimentRunning = false;
    
    // Khởi tạo
    function init() {
        setupEventListeners();
        createFlowerPetals();
        resetExperiment();
    }
    
    // Tạo cánh hoa
    function createFlowerPetals() {
        const petalCount = 8;
        flower.innerHTML = '';
        
        // Tạo cánh hoa
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.setProperty('--start-rotate', `${i * (360/petalCount)}deg`);
            petal.style.setProperty('--end-rotate', `${i * (360/petalCount)}deg`);
            flower.appendChild(petal);
        }
        
        // Tạo nhụy hoa
        const center = document.createElement('div');
        center.className = 'petal-center';
        flower.appendChild(center);
    }
    
    // Thiết lập sự kiện
    function setupEventListeners() {
        // Chọn vật liệu
        materialCards.forEach(card => {
            card.addEventListener('click', function() {
                selectMaterial(this.dataset.material);
            });
        });
        
        // Chọn dự đoán
        predictionOptions.forEach(option => {
            option.addEventListener('change', function() {
                selectPrediction(this.value);
            });
        });
        
        // Nút bắt đầu
        startBtn.addEventListener('click', startExperiment);
        
        // Nút thử lại
        restartBtn.addEventListener('click', resetExperiment);
    }
    
    // Chọn vật liệu
    function selectMaterial(material) {
        selectedMaterial = material;
        
        // Cập nhật giao diện
        materialCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.material === material) {
                card.classList.add('selected');
            }
        });
        
        checkStartReady();
    }
    
    // Chọn dự đoán
    function selectPrediction(prediction) {
        selectedPrediction = prediction;
        checkStartReady();
    }
    
    // Kiểm tra có thể bắt đầu chưa
    function checkStartReady() {
        if (selectedMaterial && selectedPrediction) {
            startBtn.disabled = false;
            startBtn.style.animation = 'pulse 1s infinite';
        } else {
            startBtn.disabled = true;
            startBtn.style.animation = 'none';
        }
    }
    
    // Bắt đầu thí nghiệm
    function startExperiment() {
        if (experimentRunning) return;
        
        experimentRunning = true;
        startBtn.disabled = true;
        startBtn.style.animation = 'none';
        
        // Hiển thị tiến trình
        experimentProgress.classList.remove('hidden');
        
        // Hiển thị giọt nước
        waterDroplets.classList.remove('hidden');
        animateWaterDroplets();
        
        // Tính thời gian nở dựa trên vật liệu
        const bloomTime = selectedMaterial === 'thin' ? 
            Math.random() * 2000 + 1500 : // 1.5-3.5 giây cho giấy mỏng
            Math.random() * 3000 + 3000;  // 3-6 giây cho giấy dày
        
        let elapsedTime = 0;
        const startTime = Date.now();
        
        // Cập nhật tiến trình
        const progressInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            const progress = Math.min((elapsedTime / bloomTime) * 100, 100);
            
            progressFill.style.width = `${progress}%`;
            
            // Cập nhật text tiến trình
            if (progress < 30) {
                progressText.textContent = "Hoa đang uống nước... 🌊";
            } else if (progress < 70) {
                progressText.textContent = "Hoa đang phình to... 🌸";
            } else {
                progressText.textContent = "Hoa sắp nở rồi... 💫";
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                completeExperiment(elapsedTime);
            }
        }, 50);
        
        // Bắt đầu animation hoa nở
        setTimeout(() => {
            animateFlowerBloom(bloomTime);
        }, 500);
    }
    
    // Animation giọt nước
    function animateWaterDroplets() {
        const droplets = document.querySelectorAll('.droplet');
        
        droplets.forEach((droplet, index) => {
            droplet.style.animation = `waterDrop 2s ease-in-out ${index * 0.5}s infinite`;
        });
    }
    
    // Animation hoa nở
    function animateFlowerBloom(duration) {
        const petals = document.querySelectorAll('.petal');
        
        petals.forEach((petal, index) => {
            const delay = index * (duration / petals.length) * 0.3;
            petal.style.animation = `bloomPetal ${duration}ms ease-out ${delay}ms both`;
        });
        
        // Thêm hiệu ứng lung linh cho nhụy hoa
        const center = document.querySelector('.petal-center');
        center.style.animation = `pulse ${duration/2000}s ease-in-out infinite`;
    }
    
    // Hoàn thành thí nghiệm
    function completeExperiment(time) {
        experimentRunning = false;
        
        // Tính thời gian thực
        const actualTime = (time / 1000).toFixed(1);
        
        // Xác định kết quả
        let timeCategory;
        if (actualTime < 3) timeCategory = 'fast';
        else if (actualTime <= 5) timeCategory = 'medium';
        else timeCategory = 'slow';
        
        // Cập nhật kết quả
        updateResults(actualTime, timeCategory);
        
        // Hiển thị kết quả
        resultsSection.classList.remove('hidden');
        
        // Hiệu ứng hoàn thành
        progressText.textContent = "Hoa đã nở rồi! 🎉";
        progressText.style.color = "var(--success)";
        
        // Hiệu ứng hoa lung linh
        flower.style.animation = 'gentleSway 3s ease-in-out infinite';
    }
    
    // Cập nhật kết quả
    function updateResults(actualTime, timeCategory) {
        // Cập nhật thông tin
        resultMaterial.textContent = selectedMaterial === 'thin' ? 'Giấy Mỏng' : 'Giấy Dày';
        
        const predictionText = 
            selectedPrediction === 'fast' ? 'Nở nhanh' :
            selectedPrediction === 'medium' ? 'Nở vừa' : 'Nở chậm';
        resultPrediction.textContent = predictionText;
        
        resultTime.textContent = `${actualTime} giây`;
        
        // Tạo thông báo
        const isCorrect = selectedPrediction === timeCategory;
        let message = '';
        
        if (isCorrect) {
            message = `🎉 Wow! Bạn đoán đúng rồi! Thật tuyệt vời! `;
        } else {
            message = `🤔 Ôi! Dự đoán hơi sai rồi! Lần sau bạn sẽ làm tốt hơn! `;
        }
        
        message += `Hoa giấy ${selectedMaterial === 'thin' ? 'mỏng' : 'dày'} nở ${timeCategory === 'fast' ? 'rất nhanh' : timeCategory === 'medium' ? 'vừa phải' : 'khá chậm'}!`;
        
        resultMessage.textContent = message;
    }
    
    // Reset thí nghiệm
    function resetExperiment() {
        selectedMaterial = null;
        selectedPrediction = null;
        experimentRunning = false;
        
        // Reset giao diện
        materialCards.forEach(card => card.classList.remove('selected'));
        predictionOptions.forEach(option => option.checked = false);
        startBtn.disabled = true;
        startBtn.style.animation = 'none';
        
        // Reset hoa
        waterDroplets.classList.add('hidden');
        experimentProgress.classList.add('hidden');
        resultsSection.classList.add('hidden');
        
        // Reset animation
        flower.style.animation = 'none';
        progressFill.style.width = '0%';
        progressText.textContent = "Hoa đang uống nước... 🌊";
        progressText.style.color = "var(--primary)";
        
        // Dừng tất cả animation
        const droplets = document.querySelectorAll('.droplet');
        droplets.forEach(droplet => {
            droplet.style.animation = 'none';
        });
        
        const petals = document.querySelectorAll('.petal');
        petals.forEach(petal => {
            petal.style.animation = 'none';
            petal.style.opacity = '0';
        });
        
        const center = document.querySelector('.petal-center');
        if (center) {
            center.style.animation = 'none';
        }
    }
    
    // Khởi chạy ứng dụng
    init();
});