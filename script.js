document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLenis();
    initUniqueScrollAnimations();
    initNavScroll();
    initMobileMenu();
    initCountUp();
    initCardGlowTracking();
    initMagneticButtons();
    initSmoothScroll();
    initHeroShrink();
    initCommitteeExpand();
    initTeamExpand();
    initGroupPhoto();
});

function initPreloader() {
    const whiteOverlay = document.getElementById('hero-white-overlay');
    const heroTitle = document.querySelector('.hero-title');
    const hero = document.getElementById('hero');

    if (!heroTitle || !hero) return;

    // Block scrolling during preloader
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    // Hide nav during preloader
    const nav = document.getElementById('mainNav');
    if (nav) gsap.set(nav, { opacity: 0 });

    // Hide other hero content (badge, subtitle, buttons)
    const otherHeroContent = hero.querySelectorAll('.hero-badge, .hero-subtitle, .hero-actions');
    gsap.set(otherHeroContent, { opacity: 0 });

    // Scramble the ACTUAL hero title characters — black on white
    const lines = heroTitle.querySelectorAll('.title-line');
    lines.forEach(line => {
        const isOutline = line.classList.contains('title-outline');
        const text = line.textContent.trim();
        line.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, color';
            // Start as black text (visible on white overlay)
            if (isOutline) {
                span.style.webkitTextFillColor = 'transparent';
                span.style.webkitTextStroke = '2px #000000';
            } else {
                span.style.color = '#000000';
            }
            gsap.set(span, {
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 300,
                rotation: (Math.random() - 0.5) * 150,
            });
            line.appendChild(span);
        });
    });

    const allSpans = heroTitle.querySelectorAll('span');
    const solidSpans = heroTitle.querySelectorAll('.title-line:not(.title-outline) span');
    const outlineSpans = heroTitle.querySelectorAll('.title-outline span');

    // Timeline: 3s hold → unscramble → curtain reveal
    const tl = gsap.timeline({
        delay: 1,
        onComplete: () => {
            // Clean up
            if (whiteOverlay) whiteOverlay.remove();
            // Clear inline styles from spans so CSS takes over
            allSpans.forEach(span => {
                span.style.color = '';
                span.style.webkitTextFillColor = '';
                span.style.webkitTextStroke = '';
                span.style.willChange = '';
            });
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    });

    // PHASE 1: Unscramble letters into place (still black on white)
    tl.to(allSpans, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        stagger: 0.02,
        ease: 'power3.out'
    }, 0);

    // PHASE 2: Curtain reveal — white overlay slides up, text turns white
    // Solid text: black → white
    tl.to(solidSpans, {
        color: '#f0f0f2',
        duration: 0.8,
        ease: 'power2.inOut'
    }, 1.3);

    // Outline text: black stroke → white stroke
    tl.to(outlineSpans, {
        webkitTextStroke: '1.5px #f0f0f2',
        webkitTextFillColor: 'transparent',
        duration: 0.8,
        ease: 'power2.inOut'
    }, 1.3);

    // White overlay inside hero slides up
    if (whiteOverlay) {
        tl.to(whiteOverlay, {
            yPercent: -100,
            duration: 1.0,
            ease: 'power3.inOut'
        }, 1.1);
    }

    // Fade in other hero elements
    tl.to(otherHeroContent, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, 1.8);

    // Show nav
    if (nav) {
        tl.to(nav, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, 2.0);
    }
}

let lenis;
function initLenis() {
    lenis = new Lenis({
        autoRaf: true,
    });

    // Listen for lenis scroll and update ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

function initUniqueScrollAnimations() {
    const animElements = document.querySelectorAll('[data-anim]');

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
                if (el.classList.contains('animated')) {
                    el.classList.remove('animated');
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
        el.style.transform = 'none';
        el.style.filter = 'none';
    }
}

function triggerAnimation(el) {
    const delay = parseInt(el.dataset.delay || 0);
    const animType = el.dataset.anim || 'reveal';

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
                el.style.borderRadius = '';
            }

            el.classList.add('animated');
        }, delay);
    });
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

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

function initHeroShrink() {
    const hero = document.querySelector('.page-hero');
    const title = document.querySelector('.page-hero-title');
    const subtitle = document.querySelector('.page-hero-subtitle');

    if (!hero || hero.closest('body').classList.contains('home-page')) return;

    let heroHeight = hero.offsetHeight;
    let minHeight = 180;
    let ticking = false;

    const originalTitle = title ? title.textContent : '';
    let currentDisplayedTitle = originalTitle;
    let isFading = false;

    function crossfadeTo(newText) {
        if (newText === currentDisplayedTitle || isFading) return;
        isFading = true;
        title.style.opacity = '0';
        setTimeout(() => {
            title.textContent = newText;
            currentDisplayedTitle = newText;
            title.style.opacity = '1';
            isFading = false;
        }, 350);
    }

    const updateHero = () => {
        const scrollY = window.scrollY;

        const currentHeight = Math.max(minHeight, heroHeight - scrollY);
        const clipBottom = heroHeight - currentHeight;
        hero.style.clipPath = `inset(0px 0px ${clipBottom}px 0px)`;

        const maxScroll = heroHeight - minHeight;
        const progress = Math.min(scrollY / maxScroll, 1);

        if (title) {
            const scale = 1 - (0.55 * progress);
            const translateY = -(heroHeight - currentHeight) / 2 + (progress * 75);
            title.style.transform = `translateY(${translateY}px) scale(${scale})`;

            if (progress > 0.8) {
                title.style.whiteSpace = 'nowrap';
            } else {
                title.style.whiteSpace = 'normal';
            }

            if (progress >= 1) {
                const heroBarBottom = minHeight;
                // Exclude titles inside overlays
                const sectionTitles = document.querySelectorAll('section .section-title');
                let activeTitle = null;

                sectionTitles.forEach(st => {
                    const rect = st.getBoundingClientRect();
                    if (rect.top < heroBarBottom + 50) {
                        activeTitle = st.textContent.trim();
                    }
                });

                if (activeTitle) {
                    crossfadeTo(activeTitle);
                } else {
                    crossfadeTo(originalTitle);
                }
            } else {
                if (currentDisplayedTitle !== originalTitle && !isFading) {
                    crossfadeTo(originalTitle);
                }
            }
        }

        if (subtitle) {
            subtitle.style.opacity = Math.max(0, 1 - (progress * 3));
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHero);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        hero.style.clipPath = 'none';
        heroHeight = hero.offsetHeight;
        updateHero();
    });

    updateHero();
}

function initCommitteeExpand() {
    const overlay = document.getElementById('committeeOverlay');
    const closeBtn = document.getElementById('committeeOverlayClose');
    const overlayAcronym = document.getElementById('overlayAcronym');
    const overlayFullname = document.getElementById('overlayFullname');

    if (!overlay) return;

    const cards = document.querySelectorAll('.committee-logo-card[data-committee]');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            const acronym = card.querySelector('.committee-massive-acronym').textContent;
            const fullname = card.dataset.fullname || '';

            if (overlayAcronym) overlayAcronym.textContent = acronym;
            if (overlayFullname) overlayFullname.textContent = fullname;

            overlay.scrollTop = 0;

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            overlay.setAttribute('data-lenis-prevent', 'true');
        });
    });

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        overlay.removeAttribute('data-lenis-prevent');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeOverlay);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });
}

function initTeamExpand() {
    const overlay = document.getElementById('teamOverlay');
    const closeBtn = document.getElementById('teamOverlayClose');
    const overlayTitle = document.getElementById('teamOverlayTitle');
    const overlayRole = document.getElementById('teamOverlayRole');
    const overlayDesc = document.getElementById('teamOverlayDesc');

    if (!overlay) return;

    const cards = document.querySelectorAll('.team-card[data-team]');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const title = card.dataset.teamTitle || '';
            const role = card.querySelector('.team-role')?.textContent || '';
            const desc = card.dataset.teamDesc || '';

            if (overlayTitle) overlayTitle.textContent = title;
            if (overlayRole) overlayRole.textContent = role;
            if (overlayDesc) overlayDesc.textContent = desc;

            overlay.scrollTop = 0;

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            overlay.setAttribute('data-lenis-prevent', 'true');
        });
    });

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        overlay.removeAttribute('data-lenis-prevent');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeOverlay);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });
}

function initGroupPhoto() {
    const containers = document.querySelectorAll('.group-photo-container');
    if (!containers.length) return;

    containers.forEach(container => {
        const hotspots = container.querySelectorAll('.person-hotspot');
        const popup = container.querySelector('.person-popup');
        const popupPortrait = popup?.querySelector('.popup-portrait');
        const popupName = popup?.querySelector('.popup-name');
        const popupRole = popup?.querySelector('.popup-role');
        const popupBio = popup?.querySelector('.popup-bio');
        const popupClose = popup?.querySelector('.popup-close');

        if (!popup) return;

        let activeHotspot = null;

        function showPopup(hotspot) {
            if (activeHotspot === hotspot) return;
            activeHotspot = hotspot;

            const name = hotspot.dataset.name || '';
            const role = hotspot.dataset.role || '';
            const bio = hotspot.dataset.bio || '';
            const portrait = hotspot.dataset.portrait || '';

            if (popupPortrait) {
                popupPortrait.src = portrait;
                popupPortrait.alt = name;
            }
            if (popupName) popupName.textContent = name;
            if (popupRole) popupRole.textContent = role;
            if (popupBio) popupBio.textContent = bio;

            container.classList.add('has-active');
            popup.classList.add('active');

            gsap.killTweensOf(popup);
            gsap.to(popup, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.4)'
            });
        }

        function hidePopup() {
            if (!activeHotspot) return;
            activeHotspot = null;

            gsap.killTweensOf(popup);
            gsap.to(popup, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    container.classList.remove('has-active');
                    popup.classList.remove('active');
                }
            });
        }

        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', (e) => {
                e.stopPropagation();
                if (activeHotspot === hotspot) {
                    hidePopup();
                } else {
                    showPopup(hotspot);
                }
            });

            // Desktop hover
            hotspot.addEventListener('mouseenter', () => showPopup(hotspot));
        });

        // Close on popup close button
        if (popupClose) {
            popupClose.addEventListener('click', (e) => {
                e.stopPropagation();
                hidePopup();
            });
        }

        // Close when clicking outside or leaving
        container.addEventListener('mouseleave', () => hidePopup());
        document.addEventListener('click', (e) => {
            if (activeHotspot && !container.contains(e.target)) hidePopup();
        });
    });
}
