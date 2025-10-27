document.addEventListener('DOMContentLoaded', function() {
    initLessonOverview();
    initSubjectCards();
    initContinueButtons();
});

function initLessonOverview() {
    console.log('STEM Universe - Lesson Overview Initialized');
    
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function initSubjectCards() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.continue-btn')) {
                const pageUrl = this.getAttribute('data-page-url');
                const pageName = this.getAttribute('data-page');
                console.log('Card clicked - Page:', pageName, 'URL:', pageUrl);
                
                if (pageUrl) {
                    openSubjectPage(pageUrl, pageName);
                } else {
                    console.error('No page URL found for:', pageName);
                }
            }
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initContinueButtons() {
    const continueButtons = document.querySelectorAll('.continue-btn');
    
    continueButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const pageUrl = this.getAttribute('data-page-url');
            const pageName = this.getAttribute('data-page');
            console.log('Button clicked - Page:', pageName, 'URL:', pageUrl);
            
            if (pageUrl) {
                openSubjectPage(pageUrl, pageName);
            } else {
                console.error('No page URL found for:', pageName);
            }
        });
        
        button.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
        });
    });
}

function openSubjectPage(pageUrl, pageName) {
    console.log('Opening page:', pageName, 'with URL:', pageUrl);
    
    showLoading();
    
    setTimeout(() => {
        window.location.href = pageUrl;
    }, 800);
}

function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Đang tải môn học...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        if (loadingOverlay.parentElement) {
            loadingOverlay.remove();
        }
    }, 3000);
}

window.openSubjectPage = openSubjectPage;