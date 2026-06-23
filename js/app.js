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
  const bookSpan = document.querySelector('.book-now-btn span');
  if (bookSpan) bookSpan.textContent = i18n.t('nav.bookNow');
}

function updateViewToggle() {
  const app = document.getElementById('app');
  const viewToggle = document.getElementById('view-toggle');
  if (!app || !viewToggle) return;
  const isDesktop = app.classList.contains('full-width');
  viewToggle.classList.toggle('desktop', isDesktop);
  const iconMobile = viewToggle.querySelector('.icon-mobile');
  const iconDesktop = viewToggle.querySelector('.icon-desktop');
  if (iconMobile) iconMobile.style.display = isDesktop ? 'none' : 'block';
  if (iconDesktop) iconDesktop.style.display = isDesktop ? 'block' : 'none';
}

function toggleViewMode() {
  const app = document.getElementById('app');
  if (!app) return;
  const isDesktop = app.classList.toggle('full-width');
  document.body.classList.toggle('view-desktop', isDesktop);
  localStorage.setItem('tiyu_view', isDesktop ? 'desktop' : 'mobile');
  updateViewToggle();
}

function loadViewMode() {
  const saved = localStorage.getItem('tiyu_view');
  const app = document.getElementById('app');
  if (!app) return;
  if (saved === 'desktop') {
    app.classList.add('full-width');
    document.body.classList.add('view-desktop');
  }
  updateViewToggle();
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
  document.body.classList.remove('est-open');
  document.documentElement.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = i18n.lang;
  loadViewMode();

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

  document.getElementById('view-toggle').addEventListener('click', () => {
    toggleViewMode();
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
