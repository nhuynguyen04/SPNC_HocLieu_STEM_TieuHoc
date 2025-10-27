class EngineeringRoadmap {
    constructor() {
        this.currentTopic = 2;
        this.character = {
            name: 'Bạn Thợ Máy Thông Thái',
            avatar: '👷‍♂️',
            color: '#D97706',
            messages: {
                welcome: 'Chào nhà kỹ sư nhí! Mình là Thợ Máy Thông Thái! Cùng mình chế tạo 5 dự án siêu thú vị nhé! 👷‍♂️✨',
                topicStart: [
                    'Chúc bạn chế tạo thành công! 🔧',
                    'Hãy bắt đầu dự án sáng tạo nào! 🚀',
                    'Ôi! Dự án này siêu thú vị! ⚡'
                ],
                activityComplete: [
                    'Xuất sắc! Bạn làm rất khéo léo! 🎯',
                    'Tuyệt vời! Thêm một công cụ cho bộ sưu tập! 🛠️',
                    'Giỏi quá! Bạn thật sáng tạo! 💡'
                ],
                topicComplete: [
                    'Chúc mừng! Bạn đã hoàn thành dự án xuất sắc! 🏆',
                    'Thật ấn tượng! Bạn là kỹ sư tài ba! 💎',
                    'Hoàn hảo! Dự án mới đã mở khóa! 🔓'
                ]
            }
        };
        
        this.init();
    }

    init() {
        console.log('👷‍♂️ Engineering Roadmap initialized - Kid Friendly Version');
        this.setupEventListeners();
        this.setupAnimations();
        this.setupCharacterInteractions();
        this.highlightCurrentTopic();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.island-btn')) {
                const btn = e.target.closest('.island-btn');
                const island = btn.closest('.island');
                const topicId = parseInt(island.getAttribute('data-topic'));
                
                e.stopPropagation();
                if (btn.classList.contains('start')) {
                    this.startTopic(topicId);
                } else if (btn.classList.contains('review')) {
                    this.reviewTopic(topicId);
                }
            }
        });

        const dialogButton = document.getElementById('dialogButton');
        if (dialogButton) {
            dialogButton.addEventListener('click', () => {
                this.closeWelcomeDialog();
            });
        }

        const floatBtn = document.getElementById('characterFloatBtn');
        if (floatBtn) {
            floatBtn.addEventListener('click', () => {
                this.showRandomEncouragement();
            });
        }

        document.querySelectorAll('.island').forEach(island => {
            island.addEventListener('click', (e) => {
                if (!e.target.closest('.island-btn')) {
                    this.bounceIsland(island);
                }
            });
        });
    }

    setupAnimations() {
        const islands = document.querySelectorAll('.island');
        islands.forEach((island, index) => {
            island.style.animationDelay = `${index * 0.2}s`;
        });

        const cards = document.querySelectorAll('.progress-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    setupCharacterInteractions() {
        const welcomeDialog = document.getElementById('characterDialog');
        if (welcomeDialog && welcomeDialog.classList.contains('show')) {
            setTimeout(() => {
                this.showCharacterMessage(this.character.messages.welcome, true);
            }, 1000);
        }

        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.showRandomEncouragement();
            }
        }, 90000);
    }

    showCharacterMessage(message, isImportant = false) {
        const dialog = document.getElementById('characterDialog');
        const dialogText = document.getElementById('dialogText');
        const dialogButton = document.getElementById('dialogButton');
        
        if (!dialog || !dialogText) return;

        dialogText.textContent = message;
        dialogButton.innerHTML = isImportant 
            ? '<span>Bắt đầu thôi!</span><i class="fas fa-tools"></i>'
            : '<span>Tiếp tục</span><i class="fas fa-arrow-right"></i>';
        
        dialog.classList.add('show');

        if (isImportant) {
            this.typeMessage(dialogText, message);
        }
        if (!isImportant) {
            setTimeout(() => {
                if (dialog.classList.contains('show')) {
                    this.closeWelcomeDialog();
                }
            }, 4000);
        }
    }

    typeMessage(element, message) {
        element.textContent = '';
        let i = 0;
        const typingSpeed = 40;

        const type = () => {
            if (i < message.length) {
                element.textContent += message.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            }
        };
        
        type();
    }

    closeWelcomeDialog() {
        const dialog = document.getElementById('characterDialog');
        if (dialog) {
            dialog.classList.remove('show');
        }
    }

    showRandomEncouragement() {
        const messages = [
            'Cố lên bạn! Kỹ thuật rất thú vị phải không? 🔧',
            'Bạn đang làm rất tốt! Tiếp tục nhé! 💪',
            'Ôi! Bạn chế tạo nhanh quá! 🚀',
            'Mỗi dự án là một lần sáng tạo! 🎉'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showCharacterMessage(randomMessage, false);
    }

    startTopic(topicId) {
        this.showCharacterMessage(this.getRandomMessage(this.character.messages.topicStart), true);
        this.showLoadingState(topicId, 'topic');
        
        setTimeout(() => {
            console.log(`🏝️ Starting topic: ${topicId}`);
            this.simulateTopicCompletion(topicId);
        }, 2000);
    }

    reviewTopic(topicId) {
        this.showCharacterMessage('Làm lại để hoàn thiện kỹ năng nhé! 🔄', true);
        this.showLoadingState(topicId, 'topic');
        
        setTimeout(() => {
            console.log(`🔄 Reviewing topic: ${topicId}`);
        }, 1500);
    }

    simulateTopicCompletion(topicId) {
        const island = document.querySelector(`[data-topic="${topicId}"]`);
        if (!island) return;

        island.classList.remove('current');
        island.classList.add('completed');
        
        const islandShape = island.querySelector('.island-shape');
        if (islandShape) {
            islandShape.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
        }
        
        const islandButton = island.querySelector('.island-btn');
        if (islandButton) {
            islandButton.className = 'island-btn review';
            islandButton.innerHTML = '<i class="fas fa-redo"></i><span>Làm lại</span>';
        }
        
        const activityBadges = island.querySelectorAll('.activity-badge');
        activityBadges.forEach(badge => {
            badge.classList.remove('current');
            badge.classList.add('completed');
        });
        
        this.unlockNextIsland(topicId);
        
        this.showCharacterMessage(this.getRandomMessage(this.character.messages.topicComplete), true);
        
        this.celebrateIsland(island);
    }

    unlockNextIsland(topicId) {
        const nextTopicId = topicId + 1;
        const nextIsland = document.querySelector(`[data-topic="${nextTopicId}"]`);
        
        if (nextIsland) {
            nextIsland.classList.remove('upcoming');
            nextIsland.classList.add('current');
            
            const nextButton = nextIsland.querySelector('.island-btn');
            if (nextButton) {
                nextButton.className = 'island-btn start';
                nextButton.innerHTML = '<i class="fas fa-play"></i><span>Bắt đầu</span>';
                nextButton.disabled = false;
            }
            const nextActivityBadges = nextIsland.querySelectorAll('.activity-badge');
            nextActivityBadges.forEach(badge => {
                badge.classList.remove('locked');
                badge.classList.add('current');
            });

            this.bounceIsland(nextIsland);
        }
    }

    showLoadingState(topicId, type) {
        const island = document.querySelector(`[data-topic="${topicId}"]`);
        const button = island?.querySelector('.island-btn');
        
        if (button && !button.disabled) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                if (button.parentNode) {
                    button.innerHTML = originalHTML;
                    button.disabled = false;
                }
            }, 1500);
        }
    }

    bounceIsland(island) {
        island.style.animation = 'none';
        setTimeout(() => {
            island.style.animation = 'bounce 0.6s ease';
        }, 10);
        
        setTimeout(() => {
            island.style.animation = '';
        }, 600);
    }

    celebrateIsland(island) {
        island.style.animation = 'celebrate 1s ease-out';
        this.createCelebration(island);
        
        setTimeout(() => {
            island.style.animation = '';
        }, 1000);
    }

    createCelebration(element) {
        const rect = element.getBoundingClientRect();
        const emojis = ['🎉', '⭐', '🔧', '🎊', '👏'];
        
        for (let i = 0; i < 12; i++) {
            const celebration = document.createElement('div');
            celebration.className = 'celebration';
            celebration.style.cssText = `
                position: fixed;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                top: ${rect.top + rect.height / 2}px;
                left: ${rect.left + rect.width / 2}px;
                animation: celebratePop 1s ease-out forwards;
            `;
            celebration.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            document.body.appendChild(celebration);
            
            setTimeout(() => {
                celebration.remove();
            }, 1000);
        }
    }

    highlightCurrentTopic() {
        const currentIsland = document.querySelector('.island.current');
        if (currentIsland) {
            setTimeout(() => {
                currentIsland.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
            }, 2000);
        }
    }

    getRandomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }
}

const celebrationStyles = document.createElement('style');
celebrationStyles.textContent = `
    @keyframes celebrate {
        0% { transform: scale(1); }
        25% { transform: scale(1.1); }
        50% { transform: scale(0.95); }
        75% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes celebratePop {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, -100px) scale(0);
        }
    }
    
    .island.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(celebrationStyles);

function startTopic(topicId) {
    if (window.engineeringRoadmap) {
        window.engineeringRoadmap.startTopic(topicId);
    }
}

function reviewTopic(topicId) {
    if (window.engineeringRoadmap) {
        window.engineeringRoadmap.reviewTopic(topicId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.engineeringRoadmap = new EngineeringRoadmap();
});