const planets = {
    1: {
        name: "MÁY BẮN ĐÁ MINI",
        icon: "🎯",
        status: "completed",
        description: "Chế tạo máy bắn đá mini học về lực và góc bắn",
        time: "22 phút",
        xp: "35 XP",
        activities: [
            { type: "tutorial", name: "Làm máy bắn đá", icon: "🔨", xp: "35 XP" }
        ]
    },
    2: {
        name: "NHẬN BIẾT GÓC",
        icon: "📐",
        status: "current",
        description: "Học về các loại góc qua video và trò chơi",
        time: "18 phút",
        xp: "55 XP",
        activities: [
            { type: "video", name: "Video nhận biết góc", icon: "📺", xp: "30 XP" },
            { type: "game", name: "Trò chơi phân loại góc", icon: "🎮", xp: "25 XP" }
        ]
    },
    3: {
        name: "TANGRAM 3D",
        icon: "🧩",
        status: "locked",
        description: "Khám phá tangram không gian 3 chiều thú vị",
        time: "25 phút",
        xp: "70 XP",
        activities: [
            { type: "video", name: "Giới thiệu tangram", icon: "📺", xp: "30 XP" },
            { type: "puzzle", name: "Ghép hình tangram", icon: "🧠", xp: "40 XP" }
        ]
    },
    4: {
        name: "ĐẾM SỐ THÔNG MINH",
        icon: "🔢",
        status: "locked",
        description: "Học đếm số và nhận biết số qua video vui nhộn",
        time: "20 phút",
        xp: "60 XP",
        activities: [
            { type: "video", name: "Video đếm số", icon: "📺", xp: "25 XP" },
            { type: "game", name: "Trò chơi đếm số", icon: "🎲", xp: "35 XP" }
        ]
    },
    5: {
        name: "SIÊU THỊ CỦA BÉ",
        icon: "🛒",
        status: "locked",
        description: "Học cộng trừ và nhận biết tiền Việt Nam",
        time: "28 phút",
        xp: "75 XP",
        activities: [
            { type: "tutorial", name: "Giới thiệu tiền VN", icon: "💵", xp: "30 XP" },
            { type: "simulation", name: "Mua sắm siêu thị", icon: "🏪", xp: "45 XP" }
        ]
    }
};

function initMathSystem() {
    console.log('🧮 Initializing Math System...');
    
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

    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', function() {
            const planetId = this.getAttribute('data-planet');
            console.log(`🪐 Planet clicked: ${planetId}`);
            
            const planetData = planets[planetId];
            
            if (!planetData) {
                console.error('❌ Không tìm thấy dữ liệu cho planet:', planetId);
                return;
            }
            
            infoIcon.textContent = planetData.icon;
            infoName.textContent = planetData.name;
            infoDescription.textContent = planetData.description;
            infoTime.textContent = planetData.time;
            infoXp.textContent = planetData.xp;
            
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
            
            activitiesGrid.innerHTML = '';
            planetData.activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                
                let activityTypeText = '';
                switch(activity.type) {
                    case 'tutorial': activityTypeText = 'Hướng dẫn'; break;
                    case 'video': activityTypeText = 'Video'; break;
                    case 'game': activityTypeText = 'Trò chơi'; break;
                    case 'puzzle': activityTypeText = 'Câu đố'; break;
                    case 'simulation': activityTypeText = 'Mô phỏng'; break;
                    default: activityTypeText = 'Hoạt động';
                }
                
                activityElement.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-info">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-type">${activityTypeText}</div>
                    </div>
                    <div class="activity-xp">${activity.xp}</div>
                `;
                activitiesGrid.appendChild(activityElement);
            });
            
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

            planetInfoOverlay.classList.add('show');
            console.log('📱 Info panel shown');
         
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    function closeInfoPanel() {
        planetInfoOverlay.classList.remove('show');
        console.log('📱 Info panel closed');
    }

    closeInfo.addEventListener('click', closeInfoPanel);
    actionClose.addEventListener('click', closeInfoPanel);

    actionStart.addEventListener('click', function() {
        if (!this.disabled) {
            const planetName = infoName.textContent;
            console.log(`🎮 Starting: ${planetName}`);
            alert(`Bắt đầu học: ${planetName}`);
        }
    });

    characterBtn.addEventListener('click', function() {
        console.log('🐰 Character clicked');
        alert('Chào bạn nhỏ! Mình là Thỏ Toán Học! 🐰✨\nCùng mình khám phá 5 chủ đề toán học siêu vui nhé!');
    });

    planetInfoOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeInfoPanel();
        }
    });

    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    console.log('🎉 Math System initialized successfully!');
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMathSystem);
} else {
    initMathSystem();
}