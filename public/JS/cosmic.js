// cosmic.js
document.addEventListener('DOMContentLoaded', function() {
    initCosmicAnimations();
    initPlanetInteractions();
    initStarfield();
});

function initCosmicAnimations() {
    // Add scroll animations for planets and features
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for scroll animations
    document.querySelectorAll('.planet-card, .feature-comet').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.9)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initPlanetInteractions() {
    const planetCards = document.querySelectorAll('.planet-card');
    
    planetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            const planet = this.querySelector('.planet');
            planet.style.animationDuration = '5s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const planet = this.querySelector('.planet');
            planet.style.animationDuration = '15s';
        });
        
        // Click to navigate
        card.addEventListener('click', function() {
            const button = this.querySelector('.btn-orbit');
            if (button) {
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = button.onclick.toString().match(/window\.location\.href='([^']+)'/)[1];
                }, 300);
            }
        });
    });
}

function initStarfield() {
    const starfield = document.querySelector('.stars');
    const starsCount = 100;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        star.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${1 + Math.random() * 2}px;
            height: ${1 + Math.random() * 2}px;
            animation-delay: -${Math.random() * 5}s;
        `;
        starfield.appendChild(star);
    }
}

// Add parallax effect
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelector('.nebula').style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    document.querySelector('.stars').style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const planetCards = document.querySelectorAll('.planet-card');
        const currentFocus = document.activeElement;
        let currentIndex = Array.from(planetCards).indexOf(currentFocus);
        
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % planetCards.length;
        } else {
            currentIndex = (currentIndex - 1 + planetCards.length) % planetCards.length;
        }
        
        planetCards[currentIndex].focus();
    }
});