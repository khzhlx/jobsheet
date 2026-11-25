const progress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');

function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = percent + '%';

    if (scrollTop > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', onScroll);

const words = ['bikin web yang rapi.', 'ngerapiin kode.', 'belajar hal baru.', 'sering begadang.'];
const typedEl = document.getElementById('typed');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const current = words[wordIndex];
    if (!deleting) {
        charIndex++;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1600);
            return;
        }
        setTimeout(type, 80);
    } else {
        charIndex--;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 45);
    }
}
type();

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    }
});

const sections = document.querySelectorAll('section[id]');
const menuItems = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = '';
    sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop) {
            currentId = sec.getAttribute('id');
        }
    });
    menuItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
}
window.addEventListener('scroll', setActiveLink);

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        cards.forEach((card) => {
            const show = filter === 'all' || card.dataset.cat === filter;
            card.classList.remove('show');
            setTimeout(() => {
                if (show) {
                    card.style.display = '';
                    card.classList.add('show');
                } else {
                    card.style.display = 'none';
                }
            }, 150);
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section-head, .skill-card, .project-card.show, .tentang-fakta, .kontak-item').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});
cards.forEach((card) => card.classList.add('show'));

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.bar-fill');
            fill.style.width = fill.style.getPropertyValue('--w');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach((el) => skillObserver.observe(el));

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Terima kasih! Pesan kamu sudah masuk. Saya balas secepatnya ya. 😊';
    form.reset();
    setTimeout(() => { formNote.textContent = ''; }, 5000);
});

onScroll();
setActiveLink();