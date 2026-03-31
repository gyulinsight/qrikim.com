// Language system
const LANGS = { en: 'English', ko: '한국어', ja: '日本語', zh: '中文' };
const savedLang = localStorage.getItem('lang') || 'en';
document.body.classList.add('lang-' + savedLang);

// Init all lang selectors on the page
document.querySelectorAll('.lang-selector').forEach(selector => {
  const current = selector.querySelector('.lang-current');
  const dropdown = selector.querySelector('.lang-dropdown');

  // Set initial label
  current.childNodes[0].textContent = savedLang.toUpperCase() + ' ';

  // Mark active option
  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === savedLang);
  });

  // Toggle dropdown
  current.addEventListener('click', (e) => {
    e.stopPropagation();
    selector.classList.toggle('open');
  });

  // Select language
  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.dataset.lang;
      Object.keys(LANGS).forEach(l => document.body.classList.remove('lang-' + l));
      document.body.classList.add('lang-' + lang);
      localStorage.setItem('lang', lang);
      current.childNodes[0].textContent = lang.toUpperCase() + ' ';
      dropdown.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
      selector.classList.remove('open');
    });
  });
});

// Close dropdown on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.lang-selector').forEach(s => s.classList.remove('open'));
});

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
