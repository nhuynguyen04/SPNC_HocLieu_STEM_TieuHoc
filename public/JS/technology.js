const planets = {
    1: {
        name: "CÂY GIA ĐÌNH",
        icon: "🌳",
        status: "completed",
        description: "Tìm hiểu về các mối quan hệ gia đình qua cây phả hệ",
        time: "20 phút",
        xp: "25 XP",
        activities: [
            { type: "game", name: "Trò chơi cây gia đình", icon: "🎮", xp: "25 XP",
                link: baseUrl + '/views/lessons/tech_family_tree'
             }
        ]
    },
    2: {
        name: "EM LÀ HỌA SĨ MÁY TÍNH",
        icon: "🎨",
        status: "current",
        description: "Khám phá các công cụ vẽ đơn giản trên máy tính",
        time: "25 phút",
        xp: "50 XP",
        activities: [
            { type: "tutorial", name: "Giới thiệu công cụ vẽ", icon: "📝", xp: "30 XP" },
            { type: "share", name: "Chia sẻ tác phẩm", icon: "🖼️", xp: "20 XP" }
        ]
    },
    3: {
        name: "AN TOÀN TRÊN INTERNET",
        icon: "🛡️",
        status: "locked",
        description: "Học các quy tắc cơ bản khi sử dụng Internet",
        time: "18 phút",
        xp: "50 XP",
        activities: [
            { type: "video", name: "Quy tắc Internet", icon: "📺", xp: "25 XP" },
            { type: "question", name: "Trả lời câu hỏi", icon: "❓", xp: "25 XP" }
        ]
    },
    4: {
        name: "LẬP TRÌNH VIÊN NHÍ VỚI SCRATCH",
        icon: "🧩",
        status: "locked",
        description: "Làm quen với lập trình qua nền tảng Scratch",
        time: "30 phút",
        xp: "70 XP",
        activities: [
            { type: "video", name: "Giới thiệu Scratch", icon: "📺", xp: "30 XP" },
            { type: "game", name: "Thực hành Scratch", icon: "🎮", xp: "40 XP" }
        ]
    },
    5: {
        name: "CÁC BỘ PHẬN CỦA MÁY TÍNH",
        icon: "💻",
        status: "locked",
        description: "Tìm hiểu các thành phần cơ bản của máy tính",
        time: "22 phút",
        xp: "60 XP",
        activities: [
            { type: "video", name: "Giới thiệu bộ phận máy tính", icon: "📺", xp: "25 XP" },
            { type: "game", name: "Ghép bộ phận máy tính", icon: "🧩", xp: "35 XP" }
        ]
    }
};

function initTechnologySystem() {
    console.log('🚀 Initializing Technology System...');
    
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
                    case 'game': activityTypeText = 'Trò chơi'; break;
                    case 'video': activityTypeText = 'Video'; break;
                    case 'question': activityTypeText = 'Câu hỏi'; break;
                    case 'tutorial': activityTypeText = 'Hướng dẫn'; break;
                    case 'share': activityTypeText = 'Chia sẻ'; break;
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
        console.log('🤖 Character clicked');
        alert('Xin chào! Mình là Robot Công Nghệ! 🤖✨\nCùng mình khám phá 5 chủ đề công nghệ siêu thú vị nhé!');
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

    console.log('🎉 Technology System initialized successfully!');
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechnologySystem);
} else {
    initTechnologySystem();
}