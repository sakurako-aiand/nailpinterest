import { navigateTo } from './utils.js';
import { renderHome, getActiveLocation, setActiveLocation } from './screens/home.js';
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
  applyTheme(getActiveLocation());

  renderHome();
  renderUpload();
  renderPolicyScreen();
  renderContact();

  const switcher = document.getElementById('location-switcher');
  if (switcher) {
    const savedLoc = getActiveLocation();
    updateSwitcherUI(savedLoc);
    switcher.querySelectorAll('.loc-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = btn.dataset.loc;
        if (loc === getActiveLocation()) return;
        switchLocation(loc);
      });
    });
  }

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
      if (btn.dataset.screen === 'home') updateRailActive('home');
    });
  });

  function handleRailNav(target) {
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
    updateRailActive(target);
  }

  document.querySelectorAll('.rail-item').forEach(item => {
    item.addEventListener('click', () => handleRailNav(item.dataset.rail));
  });

  document.getElementById('more-btn').addEventListener('click', () => openMoreSheet());

  if (document.querySelector('.nav-btn[data-screen="home"].active')) {
    navigateTo('home');
  }

  updateLangToggle();
});

function updateRailActive(target) {
  document.querySelectorAll('.rail-item').forEach(item => {
    item.classList.toggle('active', item.dataset.rail === target);
  });
}

function switchLocation(loc) {
  const app = document.getElementById('app');
  app.classList.add('theme-transitioning');
  setActiveLocation(loc);
  applyTheme(loc);
  updateSwitcherUI(loc);
  setTimeout(() => {
    renderHome();
    app.classList.remove('theme-transitioning');
  }, 300);
}

function applyTheme(loc) {
  const app = document.getElementById('app');
  if (!app) return;
  app.setAttribute('data-theme', loc);
}

function updateSwitcherUI(loc) {
  const switcher = document.getElementById('location-switcher');
  if (!switcher) return;
  switcher.querySelectorAll('.loc-switch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.loc === loc);
  });
  switcher.classList.toggle('studio-mode', loc === 'studio');
}

function openMoreSheet() {
  const overlay = document.createElement('div');
  overlay.className = 'more-sheet-overlay';
  overlay.innerHTML = `
    <div class="est-backdrop" data-more-close></div>
    <div class="est-sheet more-sheet">
      <div class="est-sheet-handle" data-more-close></div>
      <button class="est-close-btn" data-more-close aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="est-sheet-scroll">
        <div class="est-sheet-header">
          <h1>${i18n.t('menu.more')}</h1>
        </div>
        <div class="more-list">
          <button class="more-item" data-more="vintage">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>${i18n.t('menu.vintage')}</span>
          </button>
          <button class="more-item" data-more="policy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <span>${i18n.t('menu.policy')}</span>
          </button>
          <button class="more-item" data-more="contact">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>${i18n.t('menu.contact')}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add('est-open');
  requestAnimationFrame(() => overlay.classList.add('active'));

  overlay.querySelectorAll('[data-more-close]').forEach(el => {
    el.addEventListener('click', () => closeMoreSheet(overlay));
  });

  overlay.querySelectorAll('[data-more]').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.more;
      closeMoreSheet(overlay);
      setTimeout(() => {
        if (target === 'vintage') {
          navigateTo('home');
          setTimeout(() => {
            const vintageTab = document.querySelector('.service-tab[data-service="vintage"]');
            if (vintageTab) vintageTab.click();
          }, 100);
        } else {
          navigateTo(target);
        }
      }, 300);
    });
  });
}

function closeMoreSheet(overlay) {
  overlay.classList.remove('active');
  document.body.classList.remove('est-open');
  setTimeout(() => overlay.remove(), 350);
}

function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  const content = document.getElementById('booking-modal-content');
  if (!modal || !content) return;

  const activeLoc = getActiveLocation();
  const funnelState = {
    step: activeLoc ? 0 : 0,
    location: activeLoc || null,
    tech: 'no-preference',
    language: 'english',
    friendRequest: false,
    drinkPolicy: false,
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
      <button class="booking-location-card salon-card ${funnelState.location === 'salon' ? 'pre-selected' : ''}" id="select-salon">
        <span class="booking-dot salon-dot"></span>
        <div class="booking-location-info">
          <span class="booking-location-name">${i18n.t('booking.salon')}</span>
          <span class="booking-location-desc">${i18n.t('booking.salonDesc')}</span>
        </div>
        <span class="booking-select">${funnelState.location === 'salon' ? i18n.t('booking.select') : i18n.t('booking.select')} &rarr;</span>
      </button>
      <button class="booking-location-card studio-card ${funnelState.location === 'studio' ? 'pre-selected' : ''}" id="select-studio">
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
    const techs = [
      { id: 'nanaho',   en: 'Nanaho',   ja: 'ナナホ' },
      { id: 'pramila',  en: 'Pramila',  ja: 'プラミラ' },
      { id: 'yoshino',  en: 'Yoshino',  ja: 'ヨシノ' },
      { id: 'ujin',    en: 'Ujin',     ja: 'ウジン' },
      { id: 'nozomi',   en: 'Nozomi',   ja: 'ノゾミ' },
      { id: 'diana',    en: 'Diana',    ja: 'ディアナ' },
      { id: 'mihane',   en: 'Mihane',   ja: 'ミハネ' },
      { id: 'nikita',   en: 'Nikita',   ja: 'ニキタ' },
      { id: 'misaki',   en: 'Misaki',   ja: 'ミサキ' },
      { id: 'ema',      en: 'Ema',      ja: 'エマ' },
      { id: 'yumi',     en: 'Yumi',     ja: 'ユミ' },
      { id: 'ishara',   en: 'Ishara',   ja: 'イシャーラ' },
      { id: 'nyah',     en: 'Nyah',     ja: 'ナイア' },
      { id: 'shanay',   en: 'Shanay',   ja: 'シャネイ' },
    ];

    const nextBtnDisabled = !funnelState.drinkPolicy;

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
          <div class="tech-grid" id="tech-grid">
            <button class="tech-chip ${funnelState.tech === 'no-preference' ? 'selected' : ''}" data-tech="no-preference">${i18n.t('funnel.noPreference')}</button>
            ${techs.map(t => `
              <button class="tech-chip ${funnelState.tech === t.id ? 'selected' : ''}" data-tech="${t.id}">
                ${i18n.isJapanese ? t.ja : t.en}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="funnel-field">
          <label class="funnel-label">${i18n.t('funnel.languagePref')}</label>
          <div class="funnel-toggle-group">
            <button class="funnel-toggle ${funnelState.language === 'english' ? 'active' : ''}" data-lang="english">${i18n.t('funnel.english')}</button>
            <button class="funnel-toggle ${funnelState.language === 'japanese' ? 'active' : ''}" data-lang="japanese">${i18n.t('funnel.japanese')}</button>
          </div>
        </div>
        <div class="funnel-field">
          <label class="funnel-checkbox-row">
            <input type="checkbox" id="pref-friend" ${funnelState.friendRequest ? 'checked' : ''} />
            <span class="funnel-checkbox-custom"></span>
            <span class="funnel-checkbox-text">${i18n.t('funnel.friendRequest')}</span>
          </label>
        </div>
        <div class="funnel-field">
          <div class="drink-policy-box">
            <label class="funnel-checkbox-row">
              <input type="checkbox" id="pref-drink" ${funnelState.drinkPolicy ? 'checked' : ''} />
              <span class="funnel-checkbox-custom"></span>
              <span class="funnel-checkbox-text">${i18n.t('funnel.drinkPolicy')}</span>
            </label>
          </div>
        </div>
        <div class="funnel-field">
          <label class="funnel-label">${i18n.t('funnel.specialNotes')}</label>
          <textarea class="funnel-textarea" id="pref-notes" placeholder="${i18n.t('funnel.notesPlaceholder')}" rows="4">${funnelState.notes}</textarea>
        </div>
      </div>
      <button class="funnel-next-btn ${nextBtnDisabled ? 'disabled' : ''}" id="funnel-next" ${nextBtnDisabled ? 'disabled' : ''}>${i18n.t('funnel.proceedCalendar')} &rarr;</button>
    `;
    el.scrollTop = 0;
    el.querySelector('#booking-close').addEventListener('click', closeModal);
    el.querySelector('#booking-back').addEventListener('click', () => { funnelState.step = 1; render(); });

    el.querySelectorAll('[data-tech]').forEach(btn => {
      btn.addEventListener('click', () => {
        funnelState.tech = btn.dataset.tech;
        el.querySelectorAll('[data-tech]').forEach(b => b.classList.toggle('selected', b === btn));
      });
    });

    el.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        funnelState.language = btn.dataset.lang;
        el.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    el.querySelector('#pref-friend').addEventListener('change', (e) => {
      funnelState.friendRequest = e.target.checked;
    });

    el.querySelector('#pref-drink').addEventListener('change', (e) => {
      funnelState.drinkPolicy = e.target.checked;
      const nextBtn = el.querySelector('#funnel-next');
      nextBtn.classList.toggle('disabled', !funnelState.drinkPolicy);
      nextBtn.disabled = !funnelState.drinkPolicy;
    });

    el.querySelector('#pref-notes').addEventListener('input', (e) => { funnelState.notes = e.target.value; });
    el.querySelector('#funnel-next').addEventListener('click', () => {
      if (!funnelState.drinkPolicy) return;
      funnelState.step = 3;
      render();
    });
  }

  function renderRedirectStep(el) {
    const url = funnelState.location === 'studio'
      ? LOCATIONS.studio.bookingUrl
      : LOCATIONS.salon.bookingUrl;
    const locLabel = funnelState.location === 'studio' ? i18n.t('booking.studio') : i18n.t('booking.salon');
    const techMap = {
      'no-preference': i18n.t('funnel.noPreference'),
      'nanaho': 'Nanaho', 'pramila': 'Pramila', 'yoshino': 'Yoshino', 'ujin': 'Ujin',
      'nozomi': 'Nozomi', 'diana': 'Diana', 'mihane': 'Mihane', 'nikita': 'Nikita',
      'misaki': 'Misaki', 'ema': 'Ema', 'yumi': 'Yumi', 'ishara': 'Ishara',
      'nyah': 'Nyah', 'shanay': 'Shanay',
    };
    const techLabel = techMap[funnelState.tech] || i18n.t('funnel.noPreference');
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
        <div class="funnel-summary-row">
          <span class="funnel-summary-label">${i18n.t('funnel.friendShort')}</span>
          <span class="funnel-summary-value">${funnelState.friendRequest ? i18n.t('funnel.yes') : i18n.t('funnel.no')}</span>
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
