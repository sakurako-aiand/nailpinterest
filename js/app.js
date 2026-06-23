import { navigateTo } from './utils.js';
import { renderHome } from './screens/home.js';
import { renderUpload } from './screens/upload.js';
import { renderCollection } from './screens/collection.js';
import { store } from './store.js';
import { i18n } from './i18n.js';
import { LOCATIONS } from './data.js';

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

  document.getElementById('book-now-btn').addEventListener('click', () => {
    openBookingModal();
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

function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  const content = document.getElementById('booking-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="booking-location-header">
      <h2>${i18n.t('booking.chooseLocation')}</h2>
      <p>${i18n.t('booking.chooseLocationDesc')}</p>
      <button class="booking-close" id="booking-close">&times;</button>
    </div>
    <a href="${LOCATIONS.salon.bookingUrl}" target="_blank" rel="noopener noreferrer" class="booking-location-card salon-card">
      <span class="booking-dot salon-dot"></span>
      <div class="booking-location-info">
        <span class="booking-location-name">${i18n.t('booking.salon')}</span>
        <span class="booking-location-desc">${i18n.t('booking.salonDesc')}</span>
      </div>
      <span class="booking-select">${i18n.t('booking.select')} &rarr;</span>
    </a>
    <a href="${LOCATIONS.studio.bookingUrl}" target="_blank" rel="noopener noreferrer" class="booking-location-card studio-card">
      <span class="booking-dot studio-dot"></span>
      <div class="booking-location-info">
        <span class="booking-location-name">${i18n.t('booking.studio')}</span>
        <span class="booking-location-desc">${i18n.t('booking.studioDesc')}</span>
      </div>
      <span class="booking-select">${i18n.t('booking.select')} &rarr;</span>
    </a>
  `;

  modal.classList.add('active');
  document.body.classList.add('est-open');

  document.getElementById('booking-close').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('est-open');
  });
}
