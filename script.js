/* ============================================
   RBSMUN 2026 — Unique, Unpredictable Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initUniqueScrollAnimations();
    initNavScroll();
    initMobileMenu();
    initCountUp();
    initCardGlowTracking();
    initMagneticButtons();
    initSmoothScroll();
});

/* === UNIQUE SCROLL ANIMATIONS ===
   Intersection observer for scroll reveals
*/
function initUniqueScrollAnimations() {
    const animElements = document.querySelectorAll('[data-anim]');
    
    // PRE-APPLY INITIAL STATES!
    // We apply the transforms immediately on page load before scrolling.
    // This entirely prevents "scroll jitter" caused by layout bounding boxes dynamically resizing mid-scroll.
    animElements.forEach(el => {
        if (el.dataset.anim !== 'hero') {
            applyInitialState(el);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            
            if (entry.isIntersecting) {
                if (!el.classList.contains('animated')) {
                    triggerAnimation(el);
                }
            } else {
                // User scrolled away: reset the element so it can animate again when scrolling back
                if (el.classList.contains('animated')) {
                    el.classList.remove('animated');
                    // Reset instantly without transition
                    el.style.transition = 'none';
                    applyInitialState(el);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(el => {
        if (el.dataset.anim !== 'hero') {
            observer.observe(el);
        }
    });
}

function applyInitialState(el) {
    el.style.opacity = '0';
    el.style.willChange = 'transform, opacity, filter';
    
    const animType = el.dataset.anim || 'reveal';
    
    if (animType === 'reveal') {
        const offsetY = randomBetween(30, 50);
        const rotation = randomBetween(-2, 2);
        el.style.transform = `translateY(${offsetY}px) rotate(${rotation}deg)`;
        el.style.filter = `blur(3px)`;
    } else if (animType === 'tilt-in') {
        const directions = [
            { x: -30, y: 20, rotateX: 6, rotateY: -8 },
            { x: 30, y: 15, rotateX: -5, rotateY: 10 },
            { x: 0, y: 35, rotateX: 10, rotateY: 0 },
            { x: -20, y: -15, rotateX: -6, rotateY: -6 }
        ];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const scale = randomBetween(0.85, 0.95);
        el.style.transform = `translate3d(${dir.x}px, ${dir.y}px, -20px) rotateX(${dir.rotateX}deg) rotateY(${dir.rotateY}deg) scale(${scale})`;
        el.style.filter = `blur(4px)`;
    } else if (animType === 'scatter') {
        const angle = Math.random() * Math.PI * 2;
        const distance = randomBetween(40, 100);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotate = randomBetween(-10, 10);
        const scale = randomBetween(0.8, 0.9);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
        el.style.filter = `blur(5px)`;
    } else if (animType === 'morph-in') {
        el.style.transform = `scale(0.88) translateY(20px)`;
        el.style.filter = `blur(10px)`;
        el.style.borderRadius = '40px';
    } else if (animType === 'fade-up') {
        el.style.transform = `translateY(20px)`;
    } else if (animType === 'fade-in' || animType === 'counter') {
        // Just opacity
        el.style.transform = 'none';
        el.style.filter = 'none';
    }
}

function triggerAnimation(el) {
    const delay = parseInt(el.dataset.delay || 0);
    const animType = el.dataset.anim || 'reveal';
    
    // Determine randomized duration based on animation type
    let duration = randomBetween(0.7, 1.1).toFixed(2);
    if (animType === 'tilt-in') duration = randomBetween(0.8, 1.3).toFixed(2);
    if (animType === 'scatter') duration = randomBetween(0.9, 1.5).toFixed(2);
    if (animType === 'morph-in') duration = 1.2;

    requestAnimationFrame(() => {
        setTimeout(() => {
            el.style.transition = `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
            el.style.opacity = '1';
            
            if (animType !== 'fade-in' && animType !== 'counter') {
                el.style.transform = 'translate3d(0,0,0) rotateX(0) rotateY(0) scale(1) rotate(0deg)';
                el.style.filter = 'blur(0px)';
            }
            if (animType === 'morph-in') {
                el.style.borderRadius = ''; // Retain original CSS radius
            }
            
            el.classList.add('animated');
        }, delay);
    });
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/* === NAV GLASS ON SCROLL === */
function initNavScroll() {
    const nav = document.getElementById('mainNav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* === MOBILE MENU === */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

/* === COUNT-UP === */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const delay = randomBetween(0, 400);
                setTimeout(() => animateCount(el, target), delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCount(el, target) {
    const duration = randomBetween(1800, 2800);
    const startTime = performance.now();

    const easings = [
        t => 1 - Math.pow(1 - t, 4),
        t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    ];
    const ease = easings[Math.floor(Math.random() * easings.length)];

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(ease(progress) * target);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* === CARD GLOW TRACKING === */
function initCardGlowTracking() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--glow-x', `${x}%`);
            card.style.setProperty('--glow-y', `${y}%`);
        });
    });
}

/* === MAGNETIC BUTTONS === */
function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.style.transform = 'translate(0, 0)';
            setTimeout(() => { btn.style.transition = ''; }, 400);
        });
    });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navH = document.getElementById('mainNav').offsetHeight;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - navH,
                    behavior: 'smooth'
                });
            }
        });
    });
}
