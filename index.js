document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const lockBody = () => body.style.overflow = 'hidden';
    const unlockBody = () => body.style.overflow = '';

    // Fixed Nav Show on Scroll
    const fixedNav = document.getElementById('fixedNav');
    window.addEventListener('scroll', () => {
        fixedNav.classList.toggle('visible', window.scrollY > 300);
        updateActiveNavLink(); // ← Yeh nayi line add ki hai
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Lightning Prototyping Subscribe Form (Simple Alert for Now)
    document.querySelector('.proto-form')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Subscribed successfully! Thank you.');
});

    // Hamburger Menu
    document.getElementById('hamburger').addEventListener('click', function () {
        this.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Video Play/Pause
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('videoPlayBtn');
    if (video && playBtn) {
        const toggle = () => {
            if (video.paused) { video.play(); playBtn.classList.add('hidden'); }
            else { video.pause(); playBtn.classList.remove('hidden'); }
        };
        playBtn.addEventListener('click', toggle);
        video.addEventListener('click', toggle);
    }

    // Testimonial Carousel
    let current = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const showSlide = i => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[i].classList.add('active');
        dots[i].classList.add('active');
        current = i;
    };
    dots.forEach((d, i) => d.addEventListener('click', () => showSlide(i)));
    setInterval(() => showSlide((current + 1) % slides.length), 5000);
    if (slides.length) showSlide(0);

    // ================== ANIMATED SLIDING UNDERLINE ==================
    const navLinks = document.querySelectorAll('.nav-link');
    const indicator = document.createElement('div');
    indicator.classList.add('nav-indicator');
    document.querySelector('.nav-links').appendChild(indicator);

    function updateActiveNavLink() {
        let activeSection = 'home';
        const sections = ['home', 'features', 'pricing', 'contact'];

        sections.forEach(sec => {
            const el = document.getElementById(sec);
            if (el && window.scrollY >= el.offsetTop - 150) {
                activeSection = sec;
            }
        });

        const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
        navLinks.forEach(link => link.classList.remove('active'));

        if (activeLink) {
            activeLink.classList.add('active');

            // Smooth sliding indicator
            indicator.style.width = `${activeLink.offsetWidth}px`;
            indicator.style.left = `${activeLink.offsetLeft}px`;
        }
    }

    // Initial call + on resize
    updateActiveNavLink();
    window.addEventListener('resize', updateActiveNavLink);

    // ================== MODALS ==================
    const modal = document.getElementById('modal');
    const successModal = document.getElementById('successModal');
    const openTrialBtns = document.querySelectorAll('.hero-content .btn-primary, .nav-btn');

    const showModal = m => { m.setAttribute('aria-hidden', 'false'); lockBody(); };
    const hideModal = m => { m.setAttribute('aria-hidden', 'true'); unlockBody(); };

    openTrialBtns.forEach(btn => btn.addEventListener('click', () => showModal(modal)));
    document.getElementById('closeModal')?.addEventListener('click', () => hideModal(modal));
    document.getElementById('closeSuccess')?.addEventListener('click', () => hideModal(successModal));

    document.getElementById('modalForm')?.addEventListener('submit', e => {
        e.preventDefault();
        hideModal(modal);
        alert('Thanks — your free trial has started!');
    });

    document.getElementById('contactForm')?.addEventListener('submit', e => {
        e.preventDefault();
        showModal(successModal);
    });

    [modal, successModal].forEach(m => m.addEventListener('click', e => {
        if (e.target === m) hideModal(m);
    }));
});
