// ===== Preloader =====
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
});

particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#C9A34E' },
        shape: { type: 'circle' },
        opacity: { value: 0.15, random: true },  // Reduced opacity for white bg
        size: { value: 2, random: true },         // Slightly smaller particles
        line_linked: {
            enable: true,
            distance: 150,
            color: '#C9A34E',
            opacity: 2,                        // Reduced for subtle visibility
            width: 1
        },
        move: {
            enable: true,
            speed: 0.8,                          // Slightly slower
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { 
                enable: true, 
                mode: 'grab'
            },
            onclick: { 
                enable: true, 
                mode: 'push' 
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.2                // Increased hover visibility
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMobileMenu);
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});
navOverlay.addEventListener('click', closeMobileMenu);

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

// ===== Scroll Progress Bar & Nav Scroll Effect =====
const scrollProgress = document.getElementById('scrollProgress');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';

    if (scrollTop > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// ===== Active Navigation Highlight =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', highlightNav);

// ===== Scroll Reveal =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .edu-item, .timeline-item, .fade-in, .stat-card, .training-card, .contact-card, .about-text').forEach((el) => observer.observe(el));

// ===== Animated Counters =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const step = Math.max(1, Math.floor(target / 30));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.textContent = current;
            }, 40);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach((el) => counterObserver.observe(el));

// ===== Language Progress Bars =====
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
            langObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-bar-fill').forEach((el) => langObserver.observe(el));

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Textile Engineering Final-Year Student',
    'Wet Processing Specialist',
    'International Client Acquisition'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typewrite() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
        typewriterEl.innerHTML = current.substring(0, charIdx) + '<span class="cursor"></span>';
        charIdx--;
        if (charIdx < 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typewrite, 400);
            return;
        }
        setTimeout(typewrite, 30);
    } else {
        typewriterEl.innerHTML = current.substring(0, charIdx + 1) + '<span class="cursor"></span>';
        charIdx++;
        if (charIdx >= current.length) {
            isDeleting = true;
            setTimeout(typewrite, 2000);
            return;
        }
        setTimeout(typewrite, 60);
    }
}
setTimeout(typewrite, 600);

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
