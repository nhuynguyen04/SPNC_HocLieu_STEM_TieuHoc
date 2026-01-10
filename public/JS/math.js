console.log('math.js loaded');
console.log('baseUrl(from DOM):', baseUrl, ' window.baseUrl:', window.baseUrl);

const planets = {
    1: {
        name: "HẬU NGHỆ BẮN MẶT TRỜI",
        icon: "🎯",
        status: "completed",
        description: "Trò chơi máy bắn đá mini học về lực và góc bắn",
        time: "22 phút",
        xp: "35 XP",
        activities: [
            { 
                type: "game", 
                name: "Chế tạo máy bắn đá", 
                icon: "🎮", 
                xp: "35 XP", 
                link: baseUrl + '/views/lessons/math_angle_game', 
                status: "completed" 
            }
        ]
    },
    2: {
        name: "NHẬN BIẾT HÌNH HỌC",
        icon: "🔺",
        status: "current",
        description: "Trò chơi học về các hình học qua thử thách",
        time: "18 phút",
        xp: "55 XP",
        activities: [
            { 
                type: "game", 
                name: "Thử thách hình học", 
                icon: "🧩", 
                xp: "25 XP",
                link: baseUrl + '/views/lessons/math_shapes_challenge', 
                status: "current" 
            }
        ]
    },
    3: {
        name: "TANGRAM 3D", 
        icon: "🧩",
        status: "current",
        description: "Trò chơi tangram không gian 3 chiều thú vị",
        time: "25 phút", 
        xp: "70 XP",
        activities: [
            { 
                type: "game", 
                name: "Ghép hình tangram 3D", 
                icon: "🔷", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/math_tangram_3d', 
                status: "current" 
            }
        ]
    },
    4: {
        name: "ĐẾM SỐ THÔNG MINH",
        icon: "🔢",
        status: "upcoming",
        description: "Trò chơi học đếm số và nhận biết số thú vị",
        time: "20 phút",
        xp: "60 XP",
        activities: [
            { 
                type: "game", 
                name: "Trò chơi đếm số", 
                icon: "🎲", 
                xp: "25 XP",
                link: baseUrl + '/views/lessons/math_number_game', 
                status: "upcoming" 
            }
        ]
    },
    5: {
        name: "ĐỒNG HỒ THỜI GIAN",
        icon: "⏰",
        status: "current",
        description: "Trò chơi học xem đồng hồ và quản lý thời gian",
        time: "28 phút",
        xp: "75 XP",
        activities: [
            { 
                type: "game", 
                name: "Trò chơi đồng hồ", 
                icon: "🕹️", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/math_clock_game', 
                status: "current" 
            },
            { 
                type: "game", 
                name: "Quản lý thời gian", 
                icon: "⏳", 
                xp: "45 XP",
                link: baseUrl + '/views/lessons/math_time_management', 
                status: "current" 
            }
        ]
    }
};

function initMathSystem() {
    console.log('🚀 Initializing Math System...');
    
    const planetInfoOverlay = document.getElementById('planetInfoOverlay');
    const infoIcon = document.getElementById('infoIcon');
    const infoName = document.getElementById('infoName');
    const infoStatus = document.getElementById('infoStatus');
    const infoDescription = document.getElementById('infoDescription');
    const infoTime = document.getElementById('infoTime');
    const infoXp = document.getElementById('infoXp');
    const activitiesGrid = document.getElementById('activitiesGrid');
    const closeInfo = document.getElementById('closeInfo');
    const characterBtn = document.getElementById('characterBtn');

    const elements = {
        planetInfoOverlay, infoIcon, infoName, infoStatus, infoDescription,
        infoTime, infoXp, activitiesGrid, closeInfo, characterBtn
    };

    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`❌ Không tìm thấy element: ${name}`);
            return false;
        }
    }

    console.log('✅ Tất cả elements đã được tìm thấy');

    let currentPlanetData = null;

    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', function() {
            const planetId = this.getAttribute('data-planet');
            console.log(`🪐 Planet clicked: ${planetId}`);
            
            currentPlanetData = planets[planetId];
            
            if (!currentPlanetData) {
                console.error('❌ Không tìm thấy dữ liệu cho planet:', planetId);
                return;
            }
            
            infoIcon.textContent = currentPlanetData.icon;
            infoName.textContent = currentPlanetData.name;
            infoDescription.textContent = currentPlanetData.description;
            infoTime.textContent = currentPlanetData.time;
            infoXp.textContent = currentPlanetData.xp;
            
            let statusText = '';
            let statusClass = '';
            
            if (currentPlanetData.status === 'completed') {
                statusText = 'Đã hoàn thành';
                statusClass = 'status-completed';
            } else if (currentPlanetData.status === 'current') {
                statusText = 'Đang học';
                statusClass = 'status-current';
            } else {
                statusText = 'Chờ mở khóa';
                statusClass = 'status-locked';
            }
            
            infoStatus.textContent = statusText;
            infoStatus.className = 'status ' + statusClass;
            
            activitiesGrid.innerHTML = '';
            currentPlanetData.activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                
                if (activity.status === 'completed') {
                    activityElement.classList.add('activity-completed');
                } else if (activity.status === 'current') {
                    activityElement.classList.add('activity-current');
                }
                
                if (activity.link) {
                    activityElement.classList.add('activity-clickable');
                    activityElement.style.cursor = 'pointer';
                } else {
                    activityElement.style.cursor = 'not-allowed';
                }
                
                let statusBadge = '';
                if (activity.status === 'completed') {
                    statusBadge = '<div class="activity-status-badge completed-badge">✓</div>';
                } else if (activity.status === 'current') {
                    statusBadge = '<div class="activity-status-badge current-badge">●</div>';
                }
                
                activityElement.innerHTML = `
                    ${statusBadge}
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-info">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-type">${
                            activity.type === 'tutorial' ? 'Hướng dẫn' : 
                            activity.type === 'video' ? 'Video' : 
                            activity.type === 'game' ? 'Trò chơi' : 
                            activity.type === 'puzzle' ? 'Câu đố' : 
                            activity.type === 'simulation' ? 'Mô phỏng' : 'Hoạt động'
                        }</div>
                    </div>
                    <div class="activity-xp">${activity.xp}</div>
                `;
                
                if (activity.link && activity.status !== 'locked') {
                    activityElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        console.log(`🧮 Navigating to: ${activity.link}`);
                        window.location.href = activity.link;
                    });
                }
                
                activitiesGrid.appendChild(activityElement);
            });

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

    characterBtn.addEventListener('click', function() {
        console.log('🐰 Character clicked');
        alert('Chào bạn nhỏ! Mình là Thỏ Toán Học! 🐰\nCùng mình khám phá 5 chủ đề toán học siêu vui nhé!');
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
