let currentSlide = 0;
let slideWidth = 0;
let totalSlides = 0;

function initCarousel() {
    const track = document.getElementById('subjectsTrack');
    const cards = document.querySelectorAll('.subject-card');
    const dotsContainer = document.getElementById('subjectsDots');
    
    if (!track || cards.length === 0) return;
    
    totalSlides = cards.length;
    slideWidth = cards[0].offsetWidth + 30; 

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'subject-dot';
        if (i === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    updateNavigation();
}

function scrollSubjects(direction) {
    const track = document.getElementById('subjectsTrack');
    if (!track) return;
    
    const maxSlide = Math.ceil(totalSlides / getSlidesPerView()) - 1;
    currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlide));
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    const maxSlide = Math.ceil(totalSlides / getSlidesPerView()) - 1;
    currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('subjectsTrack');
    const dots = document.querySelectorAll('.subject-dot');
    
    if (!track) return;
    
    const translateX = -currentSlide * slideWidth * getSlidesPerView();
    track.style.transform = `translateX(${translateX}px)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    updateNavigation();
}

function getSlidesPerView() {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 1024) return 2;
    return 3;
}

function updateNavigation() {
    const prevBtn = document.querySelector('.subjects-nav.prev');
    const nextBtn = document.querySelector('.subjects-nav.next');
    const maxSlide = Math.ceil(totalSlides / getSlidesPerView()) - 1;
    
    if (prevBtn) {
        prevBtn.classList.toggle('disabled', currentSlide === 0);
    }
    if (nextBtn) {
        nextBtn.classList.toggle('disabled', currentSlide === maxSlide);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();

    window.addEventListener('resize', function() {
        initCarousel();
        updateCarousel();
    });
});

let startX = 0;
let currentX = 0;
let isDragging = false;

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('subjectsTrack');
    if (!track) return;
    
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: true });
    track.addEventListener('touchend', handleTouchEnd);
    
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
});

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            scrollSubjects(1); 
        } else {
            scrollSubjects(-1);
        }
    }
    
    isDragging = false;
}

function handleMouseDown(e) {
    startX = e.clientX;
    isDragging = true;
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentX = e.clientX;
}

function handleMouseUp() {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            scrollSubjects(1);
        } else {
            scrollSubjects(-1); 
        }
    }
    
    isDragging = false;
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        scrollSubjects(-1);
    } else if (e.key === 'ArrowRight') {
        scrollSubjects(1);
    }
});