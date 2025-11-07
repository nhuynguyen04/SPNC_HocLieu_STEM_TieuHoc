// Planet Data with Activities
const planets = {
    1: {
        name: "THẾ GIỚI MÀU SẮC",
        icon: "🎨",
        status: "completed",
        description: "Khám phá bí mật của màu sắc qua các hoạt động thú vị",
        time: "15 phút",
        xp: "50 XP",
        activities: [
            { type: "question", name: "Trả lời câu hỏi", icon: "❓", xp: "25 XP" },
            { type: "game", name: "Trò chơi pha màu", icon: "🎮", xp: "25 XP" }
        ]
    },
    2: {
        name: "BÍ KÍP ĂN UỐNG LÀNH MẠNH",
        icon: "🍎",
        status: "completed", 
        description: "Học cách chọn thực phẩm tốt cho sức khỏe",
        time: "20 phút",
        xp: "50 XP",
        activities: [
            { type: "game", name: "Trò chơi dinh dưỡng", icon: "🧩", xp: "50 XP" }
        ]
    },
    3: {
        name: "NGÀY VÀ ĐÊM", 
        icon: "🌓",
        status: "current",
        description: "Khám phá bí mật của thời gian và thiên văn",
        time: "12 phút", 
        xp: "50 XP",
        activities: [
            { type: "question", name: "Trả lời câu hỏi", icon: "🌞", xp: "50 XP" }
        ]
    },
    4: {
        name: "CẨM NANG PHÒNG TRÁNH HỎA HOẠN",
        icon: "🚒",
        status: "locked",
        description: "Học cách phòng tránh và xử lý khi có hỏa hoạn",
        time: "18 phút",
        xp: "50 XP", 
        activities: [
            { type: "game", name: "Trò chơi thoát hiểm", icon: "🏃‍♂️", xp: "50 XP" }
        ]
    },
    5: {
        name: "THÙNG RÁC THÂN THIỆN",
        icon: "🗑️",
        status: "locked",
        description: "Học cách phân loại rác bảo vệ môi trường",
        time: "16 phút",
        xp: "50 XP",
        activities: [
            { type: "game", name: "Trò chơi phân loại", icon: "♻️", xp: "30 XP" },
            { type: "question", name: "Trả lời câu hỏi", icon: "❓", xp: "20 XP" }
        ]
    }
};

// Hàm khởi tạo
function initScienceSystem() {
    console.log('🚀 Initializing Science System...');
    
    // DOM Elements
    const planetInfoOverlay = document.getElementById('planetInfoOverlay');
    const infoIcon = document.getElementById('infoIcon');
    const infoName = document.getElementById('infoName');
    const infoStatus = document.getElementById('infoStatus');
    const infoDescription = document.getElementById('infoDescription');
    const infoTime = document.getElementById('infoTime');
    const infoXp = document.getElementById('infoXp');
    const activitiesGrid = document.getElementById('activitiesGrid');
    const actionStart = document.getElementById('actionStart');
    const actionClose = document.getElementById('actionClose');
    const closeInfo = document.getElementById('closeInfo');
    const characterBtn = document.getElementById('characterBtn');

    // Kiểm tra xem các element có tồn tại không
    const elements = {
        planetInfoOverlay, infoIcon, infoName, infoStatus, infoDescription,
        infoTime, infoXp, activitiesGrid, actionStart, actionClose, closeInfo, characterBtn
    };

    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`❌ Không tìm thấy element: ${name}`);
            return false;
        }
    }

    console.log('✅ Tất cả elements đã được tìm thấy');

    // Planet Click Handler
    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', function() {
            const planetId = this.getAttribute('data-planet');
            console.log(`🪐 Planet clicked: ${planetId}`);
            
            const planetData = planets[planetId];
            
            if (!planetData) {
                console.error('❌ Không tìm thấy dữ liệu cho planet:', planetId);
                return;
            }
            
            // Update info panel
            infoIcon.textContent = planetData.icon;
            infoName.textContent = planetData.name;
            infoDescription.textContent = planetData.description;
            infoTime.textContent = planetData.time;
            infoXp.textContent = planetData.xp;
            
            // Update status
            let statusText = '';
            let statusClass = '';
            
            if (planetData.status === 'completed') {
                statusText = 'Đã hoàn thành';
                statusClass = 'status-completed';
            } else if (planetData.status === 'current') {
                statusText = 'Đang học';
                statusClass = 'status-current';
            } else {
                statusText = 'Chờ mở khóa';
                statusClass = 'status-locked';
            }
            
            infoStatus.textContent = statusText;
            infoStatus.className = 'status ' + statusClass;
            
            // Update activities
            activitiesGrid.innerHTML = '';
            planetData.activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                activityElement.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-info">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-type">${activity.type === 'game' ? 'Trò chơi' : 'Câu hỏi'}</div>
                    </div>
                    <div class="activity-xp">${activity.xp}</div>
                `;
                activitiesGrid.appendChild(activityElement);
            });
            
            // Update action button
            if (planetData.status === 'completed') {
                actionStart.innerHTML = '<i class="fas fa-redo"></i> Ôn tập lại';
                actionStart.className = 'action-button action-primary';
                actionStart.disabled = false;
            } else if (planetData.status === 'current') {
                actionStart.innerHTML = '<i class="fas fa-play"></i> Tiếp tục học';
                actionStart.className = 'action-button action-primary';
                actionStart.disabled = false;
            } else {
                actionStart.innerHTML = '<i class="fas fa-lock"></i> Chờ mở khóa';
                actionStart.className = 'action-button action-locked';
                actionStart.disabled = true;
            }
            
            // Show info panel
            planetInfoOverlay.classList.add('show');
            console.log('📱 Info panel shown');
            
            // Add visual feedback to planet
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // Close Info Panel
    function closeInfoPanel() {
        planetInfoOverlay.classList.remove('show');
        console.log('📱 Info panel closed');
    }

    closeInfo.addEventListener('click', closeInfoPanel);
    actionClose.addEventListener('click', closeInfoPanel);

    // Start Action
    actionStart.addEventListener('click', function() {
        if (!this.disabled) {
            const planetName = infoName.textContent;
            console.log(`🎮 Starting: ${planetName}`);
            alert(`Bắt đầu học: ${planetName}`);
            // Add your navigation logic here
        }
    });

    // Character Interaction
    characterBtn.addEventListener('click', function() {
        console.log('🦖 Character clicked');
        alert('Chào nhà khoa học nhí! Mình là Khủng Long Vũ Trụ! 🦖\nHãy chọn một hành tinh để bắt đầu khám phá!');
    });

    // Close overlay when clicking outside
    planetInfoOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeInfoPanel();
        }
    });

    // Pause animations on hover for better interaction
    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    console.log('🎉 Science System initialized successfully!');
    return true;
}

// Khởi tạo khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScienceSystem);
} else {
    initScienceSystem();
}