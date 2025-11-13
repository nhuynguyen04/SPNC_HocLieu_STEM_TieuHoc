console.log('math.js loaded');
console.log('baseUrl(from DOM):', baseUrl, ' window.baseUrl:', window.baseUrl);

const planets = {
    1: {
        name: "MÁY BẮN ĐÁ MINI",
        icon: "🎯",
        status: "completed",
        description: "Chế tạo máy bắn đá mini học về lực và góc bắn",
        time: "22 phút",
        xp: "35 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Làm máy bắn đá", 
                icon: "🔨", 
                xp: "35 XP", 
                link: baseUrl + '/views/lessons/math_catapult_tutorial', 
                status: "completed" 
            }
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
            { 
                type: "video", 
                name: "Video nhận biết góc", 
                icon: "📺", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/math_angles_video', 
                status: "current" 
            },
            { 
                type: "game", 
                name: "Trò chơi phân loại góc", 
                icon: "🎮", 
                xp: "25 XP",
                link: baseUrl + '/views/lessons/math_angles_game', 
                status: "locked" 
            }
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
            { 
                type: "video", 
                name: "Giới thiệu tangram", 
                icon: "📺", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/math_tangram_video', 
                status: "locked" 
            },
            { 
                type: "puzzle", 
                name: "Ghép hình tangram", 
                icon: "🧠", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/math_tangram_puzzle', 
                status: "locked" 
            }
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
            { 
                type: "video", 
                name: "Video đếm số", 
                icon: "📺", 
                xp: "25 XP",
                link: baseUrl + '/views/lessons/math_counting_video', 
                status: "locked" 
            },
            { 
                type: "game", 
                name: "Trò chơi đếm số", 
                icon: "🎲", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/math_counting_game', 
                status: "locked" 
            }
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
            { 
                type: "tutorial", 
                name: "Giới thiệu tiền VN", 
                icon: "💵", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/math_money_tutorial', 
                status: "locked" 
            },
            { 
                type: "simulation", 
                name: "Mua sắm siêu thị", 
                icon: "🏪", 
                xp: "45 XP",
                link: baseUrl + '/views/lessons/math_shopping_simulation', 
                status: "locked" 
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
                } else if (activity.status === 'locked') {
                    activityElement.classList.add('activity-locked');
                }
                
                if (activity.link && activity.status !== 'locked') {
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
                } else if (activity.status === 'locked') {
                    statusBadge = '<div class="activity-status-badge locked-badge">🔒</div>';
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