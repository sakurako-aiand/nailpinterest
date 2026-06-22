import { navigateTo } from './utils.js';
import { renderHome } from './screens/home.js';
import { renderUpload } from './screens/upload.js';
import { renderCollection } from './screens/collection.js';
import { store } from './store.js';
import { i18n } from './i18n.js';

function updateLangToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;
  const en = toggle.querySelector('.lang-en');
  const ja = toggle.querySelector('.lang-ja');
  en.classList.toggle('active', i18n.lang === 'en');
  ja.classList.toggle('active', i18n.lang === 'ja');
  const navSpans = document.querySelectorAll('.nav-btn span');
  if (navSpans.length >= 4) {
    navSpans[0].textContent = i18n.t('nav.gallery');
    navSpans[1].textContent = i18n.t('nav.search');
    navSpans[2].textContent = i18n.t('nav.inspo');
    navSpans[3].textContent = i18n.t('nav.wishlist');
  }
}

function closeAllOverlays() {
  for (const id of ['detail-view', 'estimator-view', 'policy-view', 'canvas-view']) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('active');
      el.style.display = 'none';
      el.innerHTML = '';
    }
  }
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('active');
  document.documentElement.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = i18n.lang;

  renderHome();
  renderUpload();

  store.onChange(() => {
    const activeScreen = document.querySelector('.nav-btn.active');
    if (activeScreen && activeScreen.dataset.screen === 'collection') {
      renderCollection();
    }
  });

  i18n.onChange(() => {
    updateLangToggle();
    renderHome();
    renderUpload();
    const activeScreen = document.querySelector('.nav-btn.active');
    if (activeScreen) {
      const screen = activeScreen.dataset.screen;
      if (screen === 'collection') renderCollection();
      if (screen === 'search') import('./screens/search.js').then(m => m.initSearch());
    }
    closeAllOverlays();
  });

  document.getElementById('lang-toggle').addEventListener('click', () => {
    i18n.toggle();
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.screen);
    });
  });

  if (document.querySelector('.nav-btn[data-screen="home"].active')) {
    navigateTo('home');
  }

  updateLangToggle();
});
