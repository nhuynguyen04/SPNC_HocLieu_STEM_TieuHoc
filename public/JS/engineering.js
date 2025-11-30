console.log('engineering.js loaded');
console.log('baseUrl(from DOM):', baseUrl, ' window.baseUrl:', window.baseUrl);

const planets = {
    1: {
        name: "DỤNG CỤ GẤP ÁO",
        icon: "👕",
        status: "completed",
        description: "Tự chế dụng cụ gấp áo thông minh và tiện lợi",
        time: "25 phút",
        xp: "30 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Hướng dẫn làm dụng cụ", 
                icon: "📐", 
                xp: "30 XP", 
                link: baseUrl + '/views/lessons/engineering_clothing_tool', 
                status: "completed" 
            }
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
            { 
                type: "tutorial", 
                name: "Thiết kế cơ cấu", 
                icon: "🎨", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_flower_mechanism', 
                status: "current" 
            },
            { 
                type: "question", 
                name: "Trả lời câu hỏi", 
                icon: "❓", 
                xp: "25 XP",
                link: baseUrl + '/views/lessons/engineering_mechanism_questions', 
                status: "locked" 
            }
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
            { 
                type: "tutorial", 
                name: "Kỹ thuật xây cầu", 
                icon: "📐", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/engineering_bridge_tutorial', 
                status: "locked" 
            },
            { 
                type: "challenge", 
                name: "Thử thách cầu giấy", 
                icon: "🏗️", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_bridge_challenge', 
                status: "locked" 
            }
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
            { 
                type: "tutorial", 
                name: "Nguyên lý đẩy", 
                icon: "💨", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/engineering_balloon_car_tutorial', 
                status: "locked" 
            },
            { 
                type: "experiment", 
                name: "Thí nghiệm xe bong bóng", 
                icon: "🧪", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/engineering_balloon_car_experiment', 
                status: "locked" 
            }
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
            { 
                type: "tutorial", 
                name: "Kỹ thuật xây tháp", 
                icon: "📏", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_tower_tutorial', 
                status: "locked" 
            },
            { 
                type: "competition", 
                name: "Cuộc thi tháp giấy", 
                icon: "🏆", 
                xp: "45 XP",
                link: baseUrl + '/views/lessons/engineering_tower_competition', 
                status: "locked" 
            }
        ]
    },
    6: {
        name: "HỆ THỐNG LỌC NƯỚC CƠ BẢN",
        icon: "💧",
        status: "locked",
        description: "Tìm hiểu và chế tạo hệ thống lọc nước đơn giản từ vật liệu dễ kiếm",
        time: "40 phút",
        xp: "75 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Nguyên lý lọc nước", 
                icon: "🔬", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_water_filter_tutorial', 
                status: "locked" 
            },
            { 
                type: "experiment", 
                name: "Chế tạo bộ lọc", 
                icon: "🧪", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/engineering_water_filter_experiment', 
                status: "locked" 
            }
        ]
    },
    7: {
        name: "LÀM ĐÈN TRUNG THU",
        icon: "🏮",
        status: "locked",
        description: "Sáng tạo đèn Trung thu từ vật liệu tái chế và thiết kế độc đáo",
        time: "45 phút",
        xp: "65 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Thiết kế đèn", 
                icon: "🎨", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/engineering_lantern_design', 
                status: "locked" 
            },
            { 
                type: "craft", 
                name: "Thực hành làm đèn", 
                icon: "✂️", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_lantern_craft', 
                status: "locked" 
            }
        ]
    },
    8: {
        name: "CHẾ TẠO DÙ CHO QUẢ TRỨNG",
        icon: "🥚",
        status: "locked",
        description: "Thiết kế dù bảo vệ trứng không vỡ khi rơi từ độ cao",
        time: "50 phút",
        xp: "85 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Nguyên lý khí động", 
                icon: "💨", 
                xp: "40 XP",
                link: baseUrl + '/views/lessons/engineering_egg_parachute_tutorial', 
                status: "locked" 
            },
            { 
                type: "challenge", 
                name: "Thử thách trứng rơi", 
                icon: "🏆", 
                xp: "45 XP",
                link: baseUrl + '/views/lessons/engineering_egg_parachute_challenge', 
                status: "locked" 
            }
        ]
    },
    9: {
        name: "THUYỀN NỔI TRÊN MẶT NƯỚC",
        icon: "⛵",
        status: "locked",
        description: "Chế tạo thuyền từ vật liệu nhẹ và thử nghiệm khả năng nổi",
        time: "35 phút",
        xp: "65 XP",
        activities: [
            { 
                type: "tutorial", 
                name: "Nguyên lý nổi", 
                icon: "📚", 
                xp: "30 XP",
                link: baseUrl + '/views/lessons/engineering_boat_tutorial', 
                status: "locked" 
            },
            { 
                type: "experiment", 
                name: "Thử nghiệm thuyền", 
                icon: "🌊", 
                xp: "35 XP",
                link: baseUrl + '/views/lessons/engineering_boat_experiment', 
                status: "locked" 
            }
        ]
    }
};

function initEngineeringSystem() {
    console.log('🚀 Initializing Engineering System...');
    
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
                            activity.type === 'challenge' ? 'Thử thách' : 
                            activity.type === 'experiment' ? 'Thí nghiệm' : 
                            activity.type === 'competition' ? 'Cuộc thi' : 
                            activity.type === 'craft' ? 'Thủ công' : 'Câu hỏi'
                        }</div>
                    </div>
                    <div class="activity-xp">${activity.xp}</div>
                `;
                
                if (activity.link && activity.status !== 'locked') {
                    activityElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        console.log(`🔧 Navigating to: ${activity.link}`);
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
        console.log('👷‍♂️ Character clicked');
        alert('Chào nhà kỹ sư nhí! Mình là Thợ Máy Thông Thái! 👷‍♂️\nCùng mình chế tạo 9 dự án siêu thú vị nhé!');
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