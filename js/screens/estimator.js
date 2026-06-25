import { ESTIMATOR_PRICING, formatPrice, DATA } from '../data.js';
import { i18n } from '../i18n.js';

const FINGER_COUNT = 10;

export function openEstimator(item) {
  const view = document.getElementById('estimator-view');
  if (!view) return;

  const detailView = document.getElementById('detail-view');
  if (detailView) {
    detailView.classList.remove('active');
    detailView.style.display = 'none';
  }

  const P = ESTIMATOR_PRICING;

  const state = {
    removal: 'none',
    overlayEnabled: false,
    overlayCount: 0,
    extensionEnabled: false,
    extensionCount: 0,
    extensionAllFingers: false,
    fingers: new Array(FINGER_COUNT).fill('oneColor'),
    fingerAddOns: new Array(FINGER_COUNT).fill(null).map(() => ({})),
    allYouCanTake: false,
    selectedFinger: null,
    photoUrl: null,
    aiSuggested: false,
  };

  function buildShell() {
    view.innerHTML = `
      <div class="est-backdrop" id="est-backdrop"></div>
      <div class="est-sheet" id="est-sheet">
        <div class="est-sheet-handle" id="est-handle"></div>
        <button class="est-close-btn" id="est-close" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="est-sheet-scroll" id="est-scroll"></div>
        <div class="estimate-total" id="est-total-bar"></div>
      </div>
    `;

    view.style.display = 'block';
    requestAnimationFrame(() => {
      view.classList.add('active');
      document.body.classList.add('est-open');
    });

    view.querySelector('#est-close').addEventListener('click', (e) => { e.preventDefault(); closeEstimator(); });
    view.querySelector('#est-backdrop').addEventListener('click', (e) => { e.preventDefault(); closeEstimator(); });
    bindSwipeClose();
  }

  function updateContent() {
    const scrollEl = view.querySelector('#est-scroll');
    if (!scrollEl) return;

    const savedScroll = scrollEl.scrollTop;

    scrollEl.innerHTML = `
      <div class="est-sheet-header">
        <h1>${i18n.t('estimator.title')}</h1>
        <p class="subtitle">${i18n.t('estimator.subtitle')}</p>
      </div>
      ${renderPhotoSection()}
      ${renderRemovalsSection()}
      ${renderExtensionsSection()}
      ${renderNailMap()}
      ${renderArtLevelSelector()}
      ${renderReceipt()}
    `;

    const totalBar = view.querySelector('#est-total-bar');
    if (totalBar) {
      const calc = calculate();
      totalBar.innerHTML = `
        <div class="total-range-block">
          <span class="total-label">${i18n.t('estimator.investment')}</span>
          <span class="total-amount-range">${formatPrice(calc.low)} — ${formatPrice(calc.high)}</span>
        </div>
      `;
    }

    scrollEl.scrollTop = savedScroll;
    bindContentEvents();
  }

  function renderPhotoSection() {
    return `
      <div class="estimate-group">
        <h3>${i18n.t('estimator.photoAnalyze')}</h3>
        <p class="group-hint">${i18n.t('estimator.photoHint')}</p>
        <div class="est-photo-area" id="est-photo-area">
          ${state.photoUrl ? `
            <img src="${state.photoUrl}" alt="Nail photo" class="est-photo-preview" />
            ${state.aiSuggested ? `<span class="ai-badge">${i18n.t('estimator.aiSuggested')}</span>` : ''}
          ` : `
            <div class="est-photo-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>${i18n.t('estimator.noPhoto')}</span>
            </div>
          `}
          <input type="file" id="est-file" accept="image/*" style="display:none" />
        </div>
        <div class="est-photo-buttons">
          <button class="est-photo-btn" id="est-upload-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            ${i18n.t('estimator.uploadPhoto')}
          </button>
          <button class="est-photo-btn" id="est-gallery-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            ${i18n.t('estimator.selectFromGallery')}
          </button>
        </div>
        ${state.aiSuggested ? `<p class="ai-suggest-desc">${i18n.t('estimator.aiSuggestDesc')}</p>` : ''}
      </div>
    `;
  }

  function renderRemovalsSection() {
    const removals = [
      { id: 'none',        label: i18n.t('estimator.removalNone'),       desc: '', price: 0 },
      { id: 'polish',      label: i18n.t('estimator.removalPolish'),    desc: i18n.t('estimator.removalPolishDesc'),    price: 1000 },
      { id: 'gel',         label: i18n.t('estimator.removalGel'),       desc: i18n.t('estimator.removalGelDesc'),       price: 2000 },
      { id: 'acrylic',     label: i18n.t('estimator.removalAcrylic'),   desc: i18n.t('estimator.removalAcrylicDesc'),   price: 3000 },
      { id: 'removalOnly', label: i18n.t('estimator.removalOnly'),      desc: i18n.t('estimator.removalOnlyDesc'),      price: 5000 },
    ];
    return `
      <div class="estimate-group">
        <h3>${i18n.t('estimator.removals')}</h3>
        <p class="group-hint">${i18n.t('estimator.removalsHint')}</p>
        <div class="estimate-options">
          ${removals.map(r => `
            <div class="estimate-option ${state.removal === r.id ? 'selected' : ''}" data-removal="${r.id}">
              <div class="opt-info">
                <span class="opt-label">${r.label}</span>
                ${r.desc ? `<span class="opt-desc">${r.desc}</span>` : ''}
              </div>
              <span class="opt-price">${r.price === 0 ? '—' : r.id === 'removalOnly' ? formatPrice(r.price) : '+' + formatPrice(r.price)}</span>
              <div class="opt-check"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderExtensionsSection() {
    return `
      <div class="estimate-group">
        <h3>${i18n.t('estimator.extensions')}</h3>
        <p class="group-hint">${i18n.t('estimator.extensionsHint')}</p>
        <div class="ext-toggles">
          <div class="ext-toggle-card ${state.extensionAllFingers ? 'active' : ''}" id="ext-all-toggle">
            <div class="ext-toggle-header">
              <span class="ext-toggle-label">${i18n.t('estimator.extensionAllFingers')}</span>
              <div class="toggle-switch ${state.extensionAllFingers ? 'on' : ''}"><div class="toggle-knob"></div></div>
            </div>
            <span class="ext-toggle-desc">${i18n.t('estimator.extensionAllDesc')}</span>
          </div>
          <div class="ext-toggle-card ${state.overlayEnabled ? 'active' : ''}" id="overlay-toggle">
            <div class="ext-toggle-header">
              <span class="ext-toggle-label">${i18n.t('estimator.overlay')}</span>
              <div class="toggle-switch ${state.overlayEnabled ? 'on' : ''}"><div class="toggle-knob"></div></div>
            </div>
            <span class="ext-toggle-desc">${i18n.t('estimator.overlayDesc')}</span>
            ${state.overlayEnabled ? `
              <div class="ext-counter">
                <button class="count-btn" id="overlay-minus">&minus;</button>
                <span class="count-value">${state.overlayCount}</span>
                <button class="count-btn" id="overlay-plus">+</button>
                <span class="ext-counter-label">${i18n.t('estimator.overlayCount')}</span>
              </div>
            ` : ''}
          </div>
          <div class="ext-toggle-card ${state.extensionEnabled ? 'active' : ''}" id="extension-toggle">
            <div class="ext-toggle-header">
              <span class="ext-toggle-label">${i18n.t('estimator.extension')}</span>
              <div class="toggle-switch ${state.extensionEnabled ? 'on' : ''}"><div class="toggle-knob"></div></div>
            </div>
            <span class="ext-toggle-desc">${i18n.t('estimator.extensionDesc')}</span>
            ${state.extensionEnabled ? `
              <div class="ext-counter">
                <button class="count-btn" id="ext-minus">&minus;</button>
                <span class="count-value">${state.extensionCount}</span>
                <button class="count-btn" id="ext-plus">+</button>
                <span class="ext-counter-label">${i18n.t('estimator.extensionCount')}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderNailMap() {
    return `
      <div class="estimate-group">
        <h3>${i18n.t('estimator.nailMap')}</h3>
        <p class="group-hint">${i18n.t('estimator.nailMapHint')}</p>
        <div class="nail-map" id="nail-map">
          ${state.fingers.map((art, i) => {
            const hasAddOns = Object.values(state.fingerAddOns[i]).some(c => c > 0);
            return `
              <div class="nail-slot ${state.selectedFinger === i ? 'selected' : ''} ${art !== 'oneColor' ? 'has-art' : ''} ${hasAddOns ? 'has-addons' : ''}"
                   data-finger="${i}">
                <div class="nail-shape nail-${getArtColor(art)}">
                  <span class="nail-num">${i + 1}</span>
                  ${hasAddOns ? '<span class="nail-addon-dot"></span>' : ''}
                </div>
                <span class="nail-art-label">${getArtShortLabel(art)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderArtLevelSelector() {
    if (state.selectedFinger === null) return '';
    const fingerIdx = state.selectedFinger;
    const addOns = state.fingerAddOns[fingerIdx];
    return `
      <div class="estimate-group art-selector" id="art-selector">
        <h3>${i18n.t('estimator.selectArtLevel')} <span class="finger-indicator">#${fingerIdx + 1}</span></h3>
        <div class="estimate-options">
          ${P.artLevels.map(a => `
            <div class="estimate-option ${state.fingers[fingerIdx] === a.id ? 'selected' : ''}" data-art="${a.id}">
              <div class="opt-info">
                <span class="opt-label">${i18n.t(`estimator.art.${a.id}.label`)}</span>
                <span class="opt-desc">${i18n.t(`estimator.art.${a.id}.desc`)}</span>
              </div>
              <span class="opt-price">${a.price === 0 ? '—' : '+' + formatPrice(a.price)}</span>
              <div class="opt-check"></div>
            </div>
          `).join('')}
        </div>
        <button class="apply-all-btn" id="apply-all-btn">${i18n.t('estimator.applyToAll')} &rarr;</button>
      </div>
      <div class="estimate-group add-ons-section">
        <h3>${i18n.t('estimator.addOns')} <span class="finger-indicator">#${fingerIdx + 1}</span></h3>
        <p class="group-hint">${i18n.t('estimator.addOnsHint')}</p>
        ${state.allYouCanTake ? `
          <p class="ayct-active-note">${i18n.t('estimator.allYouCanTake')} — ${i18n.t('estimator.allYouCanTakeDesc')}</p>
        ` : `
          <div class="add-on-grid">
            ${P.addOns.map(a => {
              const count = addOns[a.id] || 0;
              return `
                <button class="add-on-chip ${count > 0 ? 'active' : ''}" data-addon="${a.id}">
                  <span class="add-on-name">${i18n.t(`estimator.addOn.${a.id}.label`)}</span>
                  <span class="add-on-count">${count}</span>
                </button>
              `;
            }).join('')}
          </div>
        `}
      </div>
      <div class="estimate-group ayct-section">
        <div class="ext-toggle-card ${state.allYouCanTake ? 'active' : ''}" id="ayct-toggle">
          <div class="ext-toggle-header">
            <span class="ext-toggle-label">${i18n.t('estimator.allYouCanTake')}</span>
            <div class="toggle-switch ${state.allYouCanTake ? 'on' : ''}"><div class="toggle-knob"></div></div>
          </div>
          <span class="ext-toggle-desc">${i18n.t('estimator.allYouCanTakeDesc')} — ${formatPrice(P.allYouCanTakeCharms)}</span>
        </div>
      </div>
    `;
  }

  function buildSelectionSummary() {
    const calc = calculate();
    const parts = calc.lines.map(l => {
      const price = l.price === 0 ? '' : ` (${formatPrice(l.price)})`;
      return l.label + price;
    });
    parts.push(`${i18n.t('estimator.totalRange')}: ${formatPrice(calc.low)} — ${formatPrice(calc.high)}`);
    return `${i18n.t('estimator.summaryPrefix')} ${parts.join(', ')}`;
  }

  function bookWithSelections() {
    const summary = buildSelectionSummary();
    closeEstimator();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('tiyu:book-with-notes', { detail: summary }));
    }, 380);
  }

  function renderReceipt() {
    const calc = calculate();
    return `
      <div class="estimate-group receipt-section">
        <h3>${i18n.t('estimator.breakdown')}</h3>
        <div class="receipt">
          ${calc.lines.map(line => `
            <div class="receipt-line">
              <span class="receipt-item">${line.label}</span>
              <span class="receipt-price">${line.price === 0 ? '—' : formatPrice(line.price)}</span>
            </div>
          `).join('')}
          <div class="receipt-divider"></div>
          <div class="receipt-line receipt-total-line">
            <span class="receipt-item">${i18n.t('estimator.totalRange')}</span>
            <span class="receipt-price">${formatPrice(calc.low)} — ${formatPrice(calc.high)}</span>
          </div>
        </div>
        <button class="book-selections-btn" id="book-selections-btn">
          ${i18n.t('estimator.bookSelections')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    `;
  }

  function getArtColor(artId) {
    const colors = {
      oneColor: 'neutral',
      catEye: 'champagne',
      french: 'ivory',
      art2dL1: 'taupe',
      art2dL2: 'espresso',
    };
    return colors[artId] || 'neutral';
  }

  function getArtShortLabel(artId) {
    const map = {
      oneColor: '',
      catEye: 'CE',
      french: 'FR',
      art2dL1: 'L1',
      art2dL2: 'L2',
    };
    return map[artId] || '';
  }

  function calculate() {
    const lines = [];
    let total = 0;

    const removal = P.removals.find(r => r.id === state.removal);
    const isRemovalOnly = state.removal === 'removalOnly';

    if (isRemovalOnly) {
      total += P.removalOnlyPrice;
      lines.push({ label: i18n.t('estimator.removalOnly'), price: P.removalOnlyPrice });
    } else {
      total += P.base;
      lines.push({ label: i18n.t('estimator.lineBase'), price: P.base });
      if (removal && removal.price > 0) {
        total += removal.price;
        lines.push({ label: i18n.t('estimator.lineRemoval'), price: removal.price });
      }
    }

    if (state.extensionAllFingers) {
      total += P.extensions.extensionAllFingers;
      lines.push({ label: i18n.t('estimator.extensionAllFingers'), price: P.extensions.extensionAllFingers });
    }

    if (state.overlayEnabled && state.overlayCount > 0) {
      const overlayTotal = P.extensions.overlayPerFinger * state.overlayCount;
      total += overlayTotal;
      lines.push({ label: i18n.t('estimator.lineOverlayCount')(state.overlayCount), price: overlayTotal });
    }

    if (state.extensionEnabled && state.extensionCount > 0) {
      let extTotal;
      let extLabel;
      if (state.extensionCount >= P.extensions.extensionThreshold) {
        extTotal = P.extensions.extensionFlat;
        extLabel = i18n.t('estimator.lineExtensionFlat');
      } else {
        extTotal = P.extensions.extensionPerFinger * state.extensionCount;
        extLabel = i18n.t('estimator.lineExtension')(state.extensionCount);
      }
      total += extTotal;
      lines.push({ label: extLabel, price: extTotal });
    }

    if (state.allYouCanTake) {
      total += P.allYouCanTakeCharms;
      lines.push({ label: i18n.t('estimator.allYouCanTake'), price: P.allYouCanTakeCharms });
    }

    const artCounts = {};
    state.fingers.forEach(artId => {
      artCounts[artId] = (artCounts[artId] || 0) + 1;
    });

    P.artLevels.forEach(a => {
      const count = artCounts[a.id] || 0;
      if (count > 0 && a.price > 0) {
        const artTotal = a.price * count;
        total += artTotal;
        lines.push({
          label: i18n.t('estimator.lineArt')(i18n.t(`estimator.art.${a.id}.label`), count),
          price: artTotal,
        });
      }
    });

    if (!state.allYouCanTake) {
      const fingerLabels = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky', 'Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
      const totalCounts = {};
      state.fingerAddOns.forEach(addOns => {
        Object.entries(addOns).forEach(([id, count]) => {
          if (count > 0) totalCounts[id] = (totalCounts[id] || 0) + count;
        });
      });

      P.addOns.forEach(a => {
        const total_count = totalCounts[a.id] || 0;
        if (total_count === 0) return;
        let addOnTotal;
        if (a.bundleOf) {
          addOnTotal = Math.ceil(total_count / a.bundleOf) * a.price;
        } else {
          addOnTotal = a.price * total_count;
        }
        total += addOnTotal;
        const label = a.bundleOf
          ? `${i18n.t(`estimator.addOn.${a.id}.label`)} (${total_count})`
          : `${i18n.t(`estimator.addOn.${a.id}.label`)} (${total_count})`;
        lines.push({ label, price: addOnTotal });
      });
    }

    return {
      lines,
      low: total,
      high: total + P.variance,
    };
  }

  function bindContentEvents() {
    view.querySelectorAll('[data-removal]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        state.removal = el.dataset.removal;
        updateContent();
      });
    });

    const extAllToggle = view.querySelector('#ext-all-toggle');
    if (extAllToggle) {
      extAllToggle.addEventListener('click', (e) => {
        e.preventDefault();
        state.extensionAllFingers = !state.extensionAllFingers;
        if (state.extensionAllFingers) {
          state.extensionEnabled = false;
        }
        updateContent();
      });
    }

    const overlayToggle = view.querySelector('#overlay-toggle');
    if (overlayToggle) {
      overlayToggle.addEventListener('click', (e) => {
        if (e.target.closest('.count-btn')) return;
        e.preventDefault();
        state.overlayEnabled = !state.overlayEnabled;
        if (state.overlayEnabled && state.overlayCount === 0) state.overlayCount = 1;
        updateContent();
      });
    }

    const extToggle = view.querySelector('#extension-toggle');
    if (extToggle) {
      extToggle.addEventListener('click', (e) => {
        if (e.target.closest('.count-btn')) return;
        e.preventDefault();
        state.extensionEnabled = !state.extensionEnabled;
        if (state.extensionEnabled && state.extensionCount === 0) state.extensionCount = 1;
        if (state.extensionEnabled) state.extensionAllFingers = false;
        updateContent();
      });
    }

    bindCounter('#overlay-minus', '#overlay-plus', () => state.overlayCount, (v) => state.overlayCount = Math.max(0, Math.min(10, v)));
    bindCounter('#ext-minus', '#ext-plus', () => state.extensionCount, (v) => state.extensionCount = Math.max(0, Math.min(10, v)));

    view.querySelectorAll('[data-finger]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(el.dataset.finger);
        state.selectedFinger = state.selectedFinger === idx ? null : idx;
        updateContent();
      });
    });

    view.querySelectorAll('[data-art]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.selectedFinger === null) return;
        state.fingers[state.selectedFinger] = el.dataset.art;
        updateContent();
      });
    });

    const applyAll = view.querySelector('#apply-all-btn');
    if (applyAll) {
      applyAll.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.selectedFinger === null) return;
        const art = state.fingers[state.selectedFinger];
        state.fingers = new Array(FINGER_COUNT).fill(art);
        updateContent();
      });
    }

    view.querySelectorAll('[data-addon]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.selectedFinger === null || state.allYouCanTake) return;
        const addonId = el.dataset.addon;
        const current = state.fingerAddOns[state.selectedFinger][addonId] || 0;
        state.fingerAddOns[state.selectedFinger][addonId] = current + 1;
        updateContent();
      });
      el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (state.selectedFinger === null || state.allYouCanTake) return;
        const addonId = el.dataset.addon;
        const current = state.fingerAddOns[state.selectedFinger][addonId] || 0;
        if (current > 0) {
          state.fingerAddOns[state.selectedFinger][addonId] = current - 1;
          updateContent();
        }
      });
    });

    const ayctToggle = view.querySelector('#ayct-toggle');
    if (ayctToggle) {
      ayctToggle.addEventListener('click', (e) => {
        e.preventDefault();
        state.allYouCanTake = !state.allYouCanTake;
        updateContent();
      });
    }

    const bookSelectionsBtn = view.querySelector('#book-selections-btn');
    if (bookSelectionsBtn) {
      bookSelectionsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        bookWithSelections();
      });
    }

    const uploadBtn = view.querySelector('#est-upload-btn');
    const fileInput = view.querySelector('#est-file');
    const photoArea = view.querySelector('#est-photo-area');

    if (uploadBtn) {
      uploadBtn.addEventListener('click', (e) => { e.preventDefault(); fileInput.click(); });
    }
    if (photoArea && !state.photoUrl) {
      photoArea.addEventListener('click', (e) => { e.preventDefault(); fileInput.click(); });
    }
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => analyzeAndSuggest(ev.target.result);
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    const galleryBtn = view.querySelector('#est-gallery-btn');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', (e) => { e.preventDefault(); openGalleryPicker(); });
    }
  }

  function bindSwipeClose() {
    const sheet = view.querySelector('#est-sheet');
    const handle = view.querySelector('#est-handle');
    if (!sheet || !handle) return;

    let startY = 0;
    let currentY = 0;
    let dragging = false;

    const onStart = (e) => {
      dragging = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      sheet.style.transition = 'none';
    };

    const onMove = (e) => {
      if (!dragging) return;
      currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = currentY - startY;
      if (delta > 0) {
        sheet.style.transform = `translateY(${delta}px)`;
      }
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = '';
      const delta = currentY - startY;
      if (delta > 120) {
        closeEstimator();
      } else {
        sheet.style.transform = '';
      }
    };

    handle.addEventListener('touchstart', onStart, { passive: true });
    handle.addEventListener('touchmove', onMove, { passive: true });
    handle.addEventListener('touchend', onEnd);
    handle.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
  }

  function bindCounter(minusSel, plusSel, getter, setter) {
    const minus = view.querySelector(minusSel);
    const plus = view.querySelector(plusSel);
    if (minus) minus.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setter(getter() - 1);
      updateContent();
    });
    if (plus) plus.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setter(getter() + 1);
      updateContent();
    });
  }

  function openGalleryPicker() {
    const overlay = document.createElement('div');
    overlay.className = 'gallery-picker-overlay';
    overlay.innerHTML = `
      <div class="gallery-picker">
        <div class="gallery-picker-header">
          <span>${i18n.t('estimator.selectFromGallery')}</span>
          <button class="gallery-picker-close" id="gp-close">&times;</button>
        </div>
        <div class="gallery-picker-grid">
          ${DATA.feed.map(item => `
            <div class="gp-item" data-src="${item.image}">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    overlay.querySelector('#gp-close').addEventListener('click', (e) => { e.preventDefault(); closePicker(); });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) { e.preventDefault(); closePicker(); }
    });

    overlay.querySelectorAll('.gp-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const src = el.dataset.src;
        closePicker();
        analyzeAndSuggest(src);
      });
    });

    function closePicker() {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  }

  async function analyzeAndSuggest(imageSrc, sourceItem) {
    state.photoUrl = imageSrc;
    state.aiSuggested = false;
    updateContent();

    const loadingEl = view.querySelector('.est-photo-placeholder span');
    if (loadingEl) loadingEl.textContent = i18n.t('estimator.analyzing');

    try {
      const result = await analyzeImage(imageSrc);
      applyAISuggestion(result);
      state.aiSuggested = true;
    } catch (err) {
      if (sourceItem && sourceItem.tags) {
        applyTagBasedSuggestion(sourceItem.tags);
        state.aiSuggested = true;
      } else {
        state.aiSuggested = false;
      }
    }
    updateContent();
  }

  function analyzeImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const w = 100;
          const h = 100;
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;

          let totalR = 0, totalG = 0, totalB = 0;
          let totalLum = 0, lumVariance = 0;
          let brightPixels = 0;
          let darkPixels = 0;
          const colorBuckets = {};
          const lums = [];

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            totalR += r; totalG += g; totalB += b;
            totalLum += lum;
            lums.push(lum);
            if (lum > 230) brightPixels++;
            if (lum < 50) darkPixels++;

            const bucket = `${Math.floor(r / 64)},${Math.floor(g / 64)},${Math.floor(b / 64)}`;
            colorBuckets[bucket] = (colorBuckets[bucket] || 0) + 1;
          }

          const pixelCount = data.length / 4;
          const avgLum = totalLum / pixelCount;

          for (const lum of lums) {
            lumVariance += (lum - avgLum) ** 2;
          }
          lumVariance = Math.sqrt(lumVariance / pixelCount);

          const distinctColors = Object.keys(colorBuckets).length;
          const brightRatio = brightPixels / pixelCount;

          let baseArt = 'oneColor';
          let accentArt = null;

          if (lumVariance > 60 && brightRatio > 0.08) {
            baseArt = 'catEye';
          } else if (distinctColors > 10 && lumVariance > 35) {
            baseArt = 'art2dL2';
          } else if (distinctColors > 6 && lumVariance > 20) {
            baseArt = 'art2dL1';
          } else if (distinctColors > 3 && lumVariance > 12) {
            baseArt = 'french';
          } else {
            baseArt = 'oneColor';
          }

          if (baseArt !== 'art2dL2' && distinctColors > 8) {
            accentArt = 'art2dL2';
          } else if (baseArt === 'oneColor' && distinctColors > 4) {
            accentArt = 'french';
          }

          resolve({ baseArt, accentArt, avgLum, lumVariance, distinctColors });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  function applyAISuggestion(result) {
    const fingers = new Array(FINGER_COUNT).fill(result.baseArt);
    if (result.accentArt) {
      fingers[1] = result.accentArt;
      fingers[6] = result.accentArt;
    }
    state.fingers = fingers;
  }

  function applyTagBasedSuggestion(tags) {
    const tagStr = tags.join(' ').toLowerCase();
    let baseArt = 'oneColor';
    let accentArt = null;

    if (tagStr.includes('chrome') || tagStr.includes('cat eye')) {
      baseArt = 'catEye';
    } else if (tagStr.includes('3dart') || tagStr.includes('detailed') || tagStr.includes('avantgarde') || tagStr.includes('editorial')) {
      baseArt = 'art2dL2';
    } else if (tagStr.includes('lineart') || tagStr.includes('graphic') || tagStr.includes('art')) {
      baseArt = 'art2dL1';
    } else if (tagStr.includes('frenchtip') || tagStr.includes('ombr') || tagStr.includes('dot')) {
      baseArt = 'french';
    } else if (tagStr.includes('singlecolor') || tagStr.includes('minimalist') || tagStr.includes('natural')) {
      baseArt = 'oneColor';
    }

    if (tagStr.includes('statement') || tagStr.includes('bold') || tagStr.includes('3dart')) {
      accentArt = 'art2dL2';
    } else if (tagStr.includes('floral') || tagStr.includes('glitter') || tagStr.includes('gold')) {
      accentArt = 'art2dL1';
    }

    const fingers = new Array(FINGER_COUNT).fill(baseArt);
    if (accentArt) {
      fingers[1] = accentArt;
      fingers[6] = accentArt;
    }
    state.fingers = fingers;
  }

  buildShell();
  updateContent();

  if (item && item.image) {
    analyzeAndSuggest(item.image, item);
  }
}

export function closeEstimator() {
  const view = document.getElementById('estimator-view');
  if (!view) return;
  view.classList.remove('active');
  document.body.classList.remove('est-open');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 350);
}
