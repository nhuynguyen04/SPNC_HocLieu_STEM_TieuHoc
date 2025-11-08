const planets = {
    1: {
        name: "DỤNG CỤ GẤP ÁO",
        icon: "👕",
        status: "completed",
        description: "Tự chế dụng cụ gấp áo thông minh và tiện lợi",
        time: "25 phút",
        xp: "30 XP",
        activities: [
            { type: "tutorial", name: "Hướng dẫn làm dụng cụ", icon: "📐", xp: "30 XP" }
        ]
    },
    2: {
        name: "HOA YÊU THƯƠNG NỞ RỘ",
        icon: "🌺",
        status: "current",
        description: "Thiết kế hoa giấy cơ học nở rộ khi kéo dây",
        time: "30 phút",
        xp: "60 XP",
        activities: [
            { type: "tutorial", name: "Thiết kế cơ cấu", icon: "🎨", xp: "35 XP" },
            { type: "question", name: "Trả lời câu hỏi", icon: "❓", xp: "25 XP" }
        ]
    },
    3: {
        name: "XÂY CẦU GIẤY",
        icon: "🌉",
        status: "locked",
        description: "Thiết kế và xây dựng cầu từ giấy A4 chịu lực",
        time: "35 phút",
        xp: "75 XP",
        activities: [
            { type: "tutorial", name: "Kỹ thuật xây cầu", icon: "📐", xp: "40 XP" },
            { type: "challenge", name: "Thử thách cầu giấy", icon: "🏗️", xp: "35 XP" }
        ]
    },
    4: {
        name: "CHẾ TẠO XE BONG BÓNG",
        icon: "🚗",
        status: "locked",
        description: "Tạo xe chạy bằng lực đẩy từ bong bóng xà phòng",
        time: "28 phút",
        xp: "70 XP",
        activities: [
            { type: "tutorial", name: "Nguyên lý đẩy", icon: "💨", xp: "30 XP" },
            { type: "experiment", name: "Thí nghiệm xe bong bóng", icon: "🧪", xp: "40 XP" }
        ]
    },
    5: {
        name: "THÁP GIẤY CAO NHẤT",
        icon: "🗼",
        status: "locked",
        description: "Thi đua xây tháp giấy cao và vững chắc nhất",
        time: "32 phút",
        xp: "80 XP",
        activities: [
            { type: "tutorial", name: "Kỹ thuật xây tháp", icon: "📏", xp: "35 XP" },
            { type: "competition", name: "Cuộc thi tháp giấy", icon: "🏆", xp: "45 XP" }
        ]
    }
};

function initEngineeringSystem() {
    console.log('⚙️ Initializing Engineering System...');
    
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
                    case 'challenge': activityTypeText = 'Thử thách'; break;
                    case 'experiment': activityTypeText = 'Thí nghiệm'; break;
                    case 'competition': activityTypeText = 'Thi đua'; break;
                    case 'question': activityTypeText = 'Câu hỏi'; break;
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
        console.log('👷‍♂️ Character clicked');
        alert('Chào nhà kỹ sư nhí! Mình là Thợ Máy Thông Thái! 👷‍♂️✨\nCùng mình chế tạo 5 dự án siêu thú vị nhé!');
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

    console.log('🎉 Engineering System initialized successfully!');
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngineeringSystem);
} else {
    initEngineeringSystem();
}