// Troca de idioma 
const LANG = {
  current: 'pt',

  switch(lang) {
    this.current = lang;

    document.documentElement.className = 'lang-' + lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // Atualiza os botões de idioma (desktop e mobile)
    document.querySelectorAll('[data-switch]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.switch === lang);
    });

    // Atualiza o texto dos links de navegação
    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      if (el.tagName === 'A' || el.tagName === 'LI') {
        const text = el.dataset[lang];
        if (text) el.textContent = text;
      }
    });
  }
};

// Menu mobile 
const menu = {
  nav:     document.getElementById('mobile-nav'),
  overlay: document.getElementById('nav-overlay'),

  open() {
    this.nav.classList.add('open');
    this.overlay.classList.add('open');
    this.nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.nav.classList.remove('open');
    this.overlay.classList.remove('open');
    this.nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

// Fechar ao clicar no overlay
document.getElementById('nav-overlay').addEventListener('click', () => menu.close());

// Nav com sombra ao rolar 
const siteNav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Scroll suave 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    menu.close();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

LANG.switch('pt');