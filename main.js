// Language
const savedLang = localStorage.getItem('lang') || 'en';
document.body.classList.add('lang-' + savedLang);

const langBtn = document.getElementById('langToggle');
if (langBtn) {
  langBtn.textContent = savedLang === 'en' ? 'KO' : 'EN';
  langBtn.addEventListener('click', () => {
    const current = document.body.classList.contains('lang-en') ? 'en' : 'ko';
    const next = current === 'en' ? 'ko' : 'en';
    document.body.classList.remove('lang-' + current);
    document.body.classList.add('lang-' + next);
    langBtn.textContent = next === 'en' ? 'KO' : 'EN';
    localStorage.setItem('lang', next);
  });
}

// Scroll progress
const progress = document.getElementById('scrollProgress');
if (progress) {
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
  });
}

// Nav border on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
