console.log('science.js loaded');
console.log('baseUrl(from DOM):', baseUrl, ' window.baseUrl:', window.baseUrl);

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
            { type: "game", name: "Trò chơi pha màu", icon: "🎮", xp: "25 XP",
              link: baseUrl + '/views/lessons/science_color_game.php' }
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
            { type: "game", name: "Trò chơi dinh dưỡng", icon: "🧩", xp: "50 XP",
              link: baseUrl + '/views/lessons/science_nutrition_game.php' }
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
            { 
                type: "question", 
                name: "Trả lời câu hỏi", 
                icon: "🌞", 
                xp: "50 XP"
            }
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
            { 
                type: "game", 
                name: "Trò chơi thoát hiểm", 
                icon: "🏃‍♂️", 
                xp: "50 XP"
            }
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
            { type: "game", name: "Trò chơi phân loại", icon: "♻️", xp: "30 XP",
              link: baseUrl + '/views/lessons/science_trash_game.php' },
            { type: "question", name: "Trả lời câu hỏi", icon: "❓", xp: "20 XP" }
        ]
    },
    6: {
        name: "CÁC BỘ PHẬN CỦA CÂY",
        icon: "🌱",
        status: "locked",
        description: "Học cách nhận biết các bộ phận của cây",
        time: "10 phút",
        xp: "30 XP",
        activities: [
            { type: "game", name: "Trò chơi lắp ghép", icon: "🌿", xp: "30 XP",
              link: baseUrl + '/views/lessons/science_plant_game.php' }
        ]
    }
};

function initScienceSystem() {
    console.log('🚀 Initializing Science System...');
    
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
            
            // Cập nhật activities với clickable links
            activitiesGrid.innerHTML = '';
            currentPlanetData.activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                
                // Thêm class clickable nếu có link và không bị locked
                if (activity.link && currentPlanetData.status !== 'locked') {
                    activityElement.classList.add('activity-clickable');
                    activityElement.style.cursor = 'pointer';
                }
                
                activityElement.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-info">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-type">${activity.type === 'game' ? 'Trò chơi' : 'Câu hỏi'}</div>
                    </div>
                    <div class="activity-xp">${activity.xp}</div>
                `;
                
                // Thêm sự kiện click cho từng activity
                if (activity.link && currentPlanetData.status !== 'locked') {
                    activityElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        console.log(`🎮 Navigating to: ${activity.link}`);
                        window.location.href = activity.link;
                    });
                }
                
                activitiesGrid.appendChild(activityElement);
            });
            
            // Cập nhật nút hành động chính
            if (currentPlanetData.status === 'completed') {
                actionStart.innerHTML = '<i class="fas fa-redo"></i> Ôn tập lại';
                actionStart.className = 'action-button action-primary';
                actionStart.disabled = false;
                
                // Chuyển đến activity đầu tiên khi click nút chính
                actionStart.onclick = function() {
                    if (currentPlanetData.activities.length > 0 && currentPlanetData.activities[0].link) {
                        window.location.href = currentPlanetData.activities[0].link;
                    }
                };
            } else if (currentPlanetData.status === 'current') {
                actionStart.innerHTML = '<i class="fas fa-play"></i> Bắt đầu học';
                actionStart.className = 'action-button action-primary';
                actionStart.disabled = false;
                
                // Chuyển đến activity đầu tiên khi click nút chính
                actionStart.onclick = function() {
                    if (currentPlanetData.activities.length > 0 && currentPlanetData.activities[0].link) {
                        window.location.href = currentPlanetData.activities[0].link;
                    }
                };
            } else {
                actionStart.innerHTML = '<i class="fas fa-lock"></i> Chờ mở khóa';
                actionStart.className = 'action-button action-locked';
                actionStart.disabled = true;
                actionStart.onclick = null;
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

    // Xóa event listener cũ và sử dụng onclick đã được gán trong planet click
    actionStart.addEventListener('click', function(e) {
        // Ngăn chặn hành vi mặc định, sử dụng onclick đã được gán
        e.preventDefault();
    });

    characterBtn.addEventListener('click', function() {
        console.log('🦖 Character clicked');
        alert('Chào nhà khoa học nhí! Mình là Khủng Long Vũ Trụ! 🦖\nHãy chọn một hành tinh để bắt đầu khám phá!');
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

    console.log('🎉 Science System initialized successfully!');
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScienceSystem);
} else {
    initScienceSystem();
}