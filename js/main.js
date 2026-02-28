/* ================================================================
   BABA ENGINEERING SOLUTIONS — main.js
   ================================================================ */

// ── LOADER ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1100);
});

// ── HERO SLIDER ─────────────────────────────────────────────────
const heroData = [
  { title: 'Borehole<br><span class="gold-text">Drilling</span>', sub: 'Professional drilling, casing, and pump installation. Reliable clean water access for farms, schools, and communities across Uganda.' },
  { title: 'Solar Pump<br><span class="gold-text">Systems</span>', sub: 'High-efficiency solar-powered water pumping — submersible and surface. Low-maintenance, off-grid, built to last.' },
  { title: 'Irrigation<br><span class="gold-text">Solutions</span>', sub: 'Drip, sprinkler, and surface irrigation systems. Maximising yields and conserving water for smallholder and commercial farms.' },
  { title: 'Water Storage<br><span class="gold-text">Tanks</span>', sub: 'Supply and installation of plastic and concrete water storage tanks. From 500L domestic to 50,000L industrial capacities.' },
  { title: 'Civil<br><span class="gold-text">Construction</span>', sub: 'Residential and commercial building construction with expert project management and quality materials.' },
];

const slideImgs = [
  'assets/images/boreholes.jpg',
  'assets/images/solarpump.png',
  'assets/images/irrigation.png',
  'assets/images/water-tank.png',
  'assets/images/building.png',
];

let currentSlide = 0;
let sliderTimer;
const slidesEl    = document.getElementById('hero-slides');
const dotWrap     = document.getElementById('hero-dots');
const titleEl     = document.getElementById('hero-title');
const subEl       = document.getElementById('hero-sub');
const counterEl   = document.getElementById('hero-counter');
const totalEl     = document.getElementById('hero-total');
const heroTexts   = document.querySelectorAll('.hero-text');

// Build slides
slideImgs.forEach((src, i) => {
  const div = document.createElement('div');
  div.className = 'hero-slide' + (i === 0 ? ' active' : '');
  div.innerHTML = `<img src="${src}" alt="slide ${i+1}" ${i===0?'loading="eager"':'loading="lazy"'}><div class="hero-overlay"></div>`;
  slidesEl.appendChild(div);
});

// Build dots
slideImgs.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', `Slide ${i+1}`);
  btn.addEventListener('click', () => { goToSlide(i); resetTimer(); });
  dotWrap.appendChild(btn);
});
if (totalEl) totalEl.textContent = String(slideImgs.length).padStart(2,'0');

function updateDots(idx) {
  document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function animateHeroText() {
  heroTexts.forEach(el => { el.classList.remove('show'); void el.offsetWidth; });
  heroTexts.forEach((el, i) => setTimeout(() => el.classList.add('show'), i * 110));
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = ((idx % slides.length) + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (titleEl) titleEl.innerHTML = heroData[currentSlide].title;
  if (subEl)   subEl.textContent  = heroData[currentSlide].sub.replace(/<[^>]+>/g,'');
  if (counterEl) counterEl.textContent = String(currentSlide + 1).padStart(2,'0');
  updateDots(currentSlide);
  animateHeroText();
}

function resetTimer() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
}

document.getElementById('hero-prev').addEventListener('click', () => { goToSlide(currentSlide - 1); resetTimer(); });
document.getElementById('hero-next').addEventListener('click', () => { goToSlide(currentSlide + 1); resetTimer(); });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  { goToSlide(currentSlide - 1); resetTimer(); }
  if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); resetTimer(); }
});

animateHeroText();
resetTimer();

// ── NAVBAR SCROLL ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ─────────────────────────────────────────────────
const hamburger   = document.querySelector('.hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobSvcToggle = document.getElementById('mob-svc-toggle');
const mobSvcPanel  = document.getElementById('mob-svc-panel');
const mobArrow     = document.getElementById('mob-arrow');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

if (mobSvcToggle) {
  mobSvcToggle.addEventListener('click', () => {
    mobSvcPanel.classList.toggle('open');
    mobArrow.style.transform = mobSvcPanel.classList.contains('open') ? 'rotate(180deg)' : '';
  });
}

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false; hamburger.classList.remove('open');
  mobileMenu.classList.remove('open'); document.body.style.overflow = '';
}));

// ── SCROLL REVEAL ───────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// ── COUNTERS ────────────────────────────────────────────────────
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      let start = 0;
      const step = target / (1800 / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start).toLocaleString();
        if (start >= target) clearInterval(timer);
      }, 16);
    });
    countObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) countObs.observe(statsBar);

// ── ACTIVE NAV ──────────────────────────────────────────────────
const sectionIds = ['home','about','services','projects','testimonials','blog','contact'];
const navLinks   = document.querySelectorAll('.nav-link[href^="#"]');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#'+e.target.id));
    }
  });
}, { threshold: 0.3 });
sectionIds.forEach(id => { const el = document.getElementById(id); if (el) secObs.observe(el); });

// ── BACK TO TOP ─────────────────────────────────────────────────
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 400));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── CONTACT FORM ────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); let valid = true;

    function validate(id, errorId, condition) {
      const field = document.getElementById(id), err = document.getElementById(errorId);
      if (condition) { field.classList.add('error'); err.classList.add('show'); valid = false; }
      else           { field.classList.remove('error'); err.classList.remove('show'); }
    }
    validate('f-name',    'e-name',    document.getElementById('f-name').value.trim().length < 2);
    validate('f-email',   'e-email',   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('f-email').value));
    validate('f-service', 'e-service', !document.getElementById('f-service').value);
    validate('f-msg',     'e-msg',     document.getElementById('f-msg').value.trim().length < 20);

    if (valid) {
      contactForm.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
      document.getElementById('form-success').style.display = 'block';
    }
  });
  ['f-name','f-email','f-service','f-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => el.classList.remove('error'));
  });
}

// ── SMOOTH SCROLL ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
