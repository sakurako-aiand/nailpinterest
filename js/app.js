import { navigateTo } from './utils.js';
import { renderHome } from './screens/home.js';
import { renderUpload } from './screens/upload.js';
import { renderCollection } from './screens/collection.js';
import { renderPolicyScreen } from './screens/policy-screen.js';
import { renderContact } from './screens/contact.js';
import { store } from './store.js';
import { i18n } from './i18n.js';
import { LOCATIONS, SERVICES } from './data.js';

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
  renderPolicyScreen();
  renderContact();

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
    renderPolicyScreen();
    renderContact();
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

  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('side-drawer');
  const drawerBackdrop = document.getElementById('side-drawer-backdrop');

  hamburger.addEventListener('click', () => {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('active');
  });

  drawerBackdrop.addEventListener('click', () => {
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
  });

  drawer.querySelectorAll('.drawer-item').forEach(item => {
    item.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      const target = item.dataset.drawer;
      if (target === 'home') {
        navigateTo('home');
      } else if (target === 'vintage') {
        navigateTo('home');
        setTimeout(() => {
          const vintageTab = document.querySelector('.service-tab[data-service="vintage"]');
          if (vintageTab) vintageTab.click();
        }, 100);
      } else if (target === 'policy') {
        navigateTo('policy');
      } else if (target === 'contact') {
        navigateTo('contact');
      }
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

  const funnelState = {
    step: 0,
    location: null,
    tech: '',
    language: 'english',
    notes: '',
  };

  modal.classList.add('active');
  document.body.classList.add('est-open');

  function render() {
    content.innerHTML = `
      <div class="funnel-progress">
        <span class="funnel-dot ${funnelState.step >= 0 ? 'active' : ''}"></span>
        <span class="funnel-dot ${funnelState.step >= 1 ? 'active' : ''}"></span>
        <span class="funnel-dot ${funnelState.step >= 2 ? 'active' : ''}"></span>
        <span class="funnel-dot ${funnelState.step >= 3 ? 'active' : ''}"></span>
      </div>
      <div class="funnel-step" id="funnel-step"></div>
    `;
    renderStep();
  }

  function renderStep() {
    const stepEl = content.querySelector('#funnel-step');
    if (!stepEl) return;

    if (funnelState.step === 0) renderPolicyStep(stepEl);
    else if (funnelState.step === 1) renderLocationStep(stepEl);
    else if (funnelState.step === 2) renderPreferencesStep(stepEl);
    else if (funnelState.step === 3) renderRedirectStep(stepEl);
  }

  function renderPolicyStep(el) {
    el.innerHTML = `
      <div class="funnel-header">
        <button class="booking-close" id="booking-close">&times;</button>
        <h2>${i18n.t('policy.title')}</h2>
        <p class="funnel-subtitle">${i18n.t('policy.subtitle')}</p>
      </div>
      <div class="funnel-scroll">
        <div class="policy-section">
          <h3>${i18n.t('policy.cancellation')}</h3>
          <ul>${i18n.t('policy.cancellationItems').map(item => `<li>${item}</li>`).join('')}</ul>
          <div class="policy-note">${i18n.t('policy.cancellationNote')}</div>
        </div>
        <div class="policy-section">
          <h3>${i18n.t('policy.late')}</h3>
          <ul>${i18n.t('policy.lateItems').map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="policy-section">
          <h3>${i18n.t('policy.refix')}</h3>
          <ul>${i18n.t('policy.refixItems').map(item => `<li>${item}</li>`).join('')}</ul>
          <div class="policy-subtitle">${i18n.t('policy.refixCovers')}</div>
          <ul>${i18n.t('policy.refixCoversItems').map(item => `<li>${item}</li>`).join('')}</ul>
          <div class="policy-note">${i18n.t('policy.refixNote')}</div>
          <div class="policy-note" style="margin-top:8px;">${i18n.t('policy.refixFinal')}</div>
        </div>
      </div>
      <button class="funnel-next-btn" id="funnel-next">${i18n.t('funnel.agreeContinue')} &rarr;</button>
    `;
    el.scrollTop = 0;
    el.querySelector('#booking-close').addEventListener('click', closeModal);
    el.querySelector('#funnel-next').addEventListener('click', () => { funnelState.step = 1; render(); });
  }

  function renderLocationStep(el) {
    el.innerHTML = `
      <div class="funnel-header">
        <button class="booking-close" id="booking-close">&times;</button>
        <h2>${i18n.t('booking.chooseLocation')}</h2>
        <p class="funnel-subtitle">${i18n.t('booking.chooseLocationDesc')}</p>
      </div>
      <button class="booking-location-card salon-card" id="select-salon">
        <span class="booking-dot salon-dot"></span>
        <div class="booking-location-info">
          <span class="booking-location-name">${i18n.t('booking.salon')}</span>
          <span class="booking-location-desc">${i18n.t('booking.salonDesc')}</span>
        </div>
        <span class="booking-select">${i18n.t('booking.select')} &rarr;</span>
      </button>
      <button class="booking-location-card studio-card" id="select-studio">
        <span class="booking-dot studio-dot"></span>
        <div class="booking-location-info">
          <span class="booking-location-name">${i18n.t('booking.studio')}</span>
          <span class="booking-location-desc">${i18n.t('booking.studioDesc')}</span>
        </div>
        <span class="booking-select">${i18n.t('booking.select')} &rarr;</span>
      </button>
    `;
    el.querySelector('#booking-close').addEventListener('click', closeModal);
    el.querySelector('#select-salon').addEventListener('click', () => { funnelState.location = 'salon'; funnelState.step = 2; render(); });
    el.querySelector('#select-studio').addEventListener('click', () => { funnelState.location = 'studio'; funnelState.step = 2; render(); });
  }

  function renderPreferencesStep(el) {
    const techs = ['Tiyu', 'Aya', 'Mika', 'No preference'];
    el.innerHTML = `
      <div class="funnel-header">
        <button class="booking-back" id="booking-back">&larr;</button>
        <button class="booking-close" id="booking-close">&times;</button>
        <h2>${i18n.t('funnel.preferences')}</h2>
        <p class="funnel-subtitle">${i18n.t('funnel.preferencesDesc')}</p>
      </div>
      <div class="funnel-scroll">
        <div class="funnel-field">
          <label class="funnel-label">${i18n.t('funnel.nailTech')}</label>
          <select class="funnel-select" id="pref-tech">
            ${techs.map(t => `<option value="${t}" ${funnelState.tech === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="funnel-field">
          <label class="funnel-label">${i18n.t('funnel.languagePref')}</label>
          <div class="funnel-toggle-group">
            <button class="funnel-toggle ${funnelState.language === 'english' ? 'active' : ''}" data-lang="english">${i18n.t('funnel.english')}</button>
            <button class="funnel-toggle ${funnelState.language === 'japanese' ? 'active' : ''}" data-lang="japanese">${i18n.t('funnel.japanese')}</button>
          </div>
        </div>
        <div class="funnel-field">
          <label class="funnel-label">${i18n.t('funnel.specialNotes')}</label>
          <textarea class="funnel-textarea" id="pref-notes" placeholder="${i18n.t('funnel.notesPlaceholder')}" rows="4">${funnelState.notes}</textarea>
        </div>
      </div>
      <button class="funnel-next-btn" id="funnel-next">${i18n.t('funnel.proceedCalendar')} &rarr;</button>
    `;
    el.scrollTop = 0;
    el.querySelector('#booking-close').addEventListener('click', closeModal);
    el.querySelector('#booking-back').addEventListener('click', () => { funnelState.step = 1; render(); });
    el.querySelector('#pref-tech').addEventListener('change', (e) => { funnelState.tech = e.target.value; });
    el.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        funnelState.language = btn.dataset.lang;
        el.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b === btn));
      });
    });
    el.querySelector('#pref-notes').addEventListener('input', (e) => { funnelState.notes = e.target.value; });
    el.querySelector('#funnel-next').addEventListener('click', () => { funnelState.step = 3; render(); });
  }

  function renderRedirectStep(el) {
    const url = funnelState.location === 'studio'
      ? LOCATIONS.studio.bookingUrl
      : LOCATIONS.salon.bookingUrl;
    const locLabel = funnelState.location === 'studio' ? i18n.t('booking.studio') : i18n.t('booking.salon');
    const techLabel = funnelState.tech || 'No preference';
    const langLabel = funnelState.language === 'english' ? i18n.t('funnel.english') : i18n.t('funnel.japanese');

    el.innerHTML = `
      <div class="funnel-header">
        <button class="booking-back" id="booking-back">&larr;</button>
        <button class="booking-close" id="booking-close">&times;</button>
        <h2>${i18n.t('funnel.ready')}</h2>
        <p class="funnel-subtitle">${i18n.t('funnel.readyDesc')}</p>
      </div>
      <div class="funnel-summary">
        <div class="funnel-summary-row">
          <span class="funnel-summary-label">${i18n.t('booking.chooseLocation')}</span>
          <span class="funnel-summary-value">${locLabel}</span>
        </div>
        <div class="funnel-summary-row">
          <span class="funnel-summary-label">${i18n.t('funnel.nailTech')}</span>
          <span class="funnel-summary-value">${techLabel}</span>
        </div>
        <div class="funnel-summary-row">
          <span class="funnel-summary-label">${i18n.t('funnel.languagePref')}</span>
          <span class="funnel-summary-value">${langLabel}</span>
        </div>
        ${funnelState.notes ? `
          <div class="funnel-summary-row">
            <span class="funnel-summary-label">${i18n.t('funnel.specialNotes')}</span>
            <span class="funnel-summary-value">${funnelState.notes}</span>
          </div>
        ` : ''}
      </div>
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="funnel-next-btn" id="funnel-redirect">
        ${i18n.t('funnel.openCalendar')} &rarr;
      </a>
    `;
    el.scrollTop = 0;
    el.querySelector('#booking-back').addEventListener('click', () => { funnelState.step = 2; render(); });
    el.querySelector('#booking-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('est-open');
    setTimeout(() => { content.innerHTML = ''; }, 350);
  }

  render();
}
