import { DATA, PRICING } from '../data.js';
import { i18n } from '../i18n.js';
import { showToast, navigateTo } from '../utils.js';
import { openBookingModal } from './booking.js';

const NAIL_TEMPLATE_SVG = (n, h) => {
  const W = 48, H = 86;
  const w2 = W / 2;
  const hh = H / 2;
  return `<svg viewBox="-${w2} 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="nailClip-${n}">
        <path d="M 0,4
                 C -10,8 -14,20 -14,35
                 C -14,55 -8,70 -4,78
                 C -2,82 0,84 0,84
                 C 0,84 2,82 4,78
                 C 8,70 14,55 14,35
                 C 14,20 10,8 0,4
                 Z"/>
      </clipPath>
    </defs>
    <path d="M 0,4
             C -10,8 -14,20 -14,35
             C -14,55 -8,70 -4,78
             C -2,82 0,84 0,84
             C 0,84 2,82 4,78
             C 8,70 14,55 14,35
             C 14,20 10,8 0,4
             Z"
          fill="${h ? 'transparent' : '#FFFFFF'}" stroke="#8A8A8A" stroke-width="1.2"/>
    <!-- cuticle arc -->
    <path d="M -11,16 Q 0,27 11,16" fill="none" stroke="#8A8A8A" stroke-width="0.7" opacity="0.5"/>
    <!-- finger guide lines -->
    <path d="M -14,25 L -18,76" fill="none" stroke="#8A8A8A" stroke-width="0.7" opacity="0.4"/>
    <path d="M 14,25 L 18,76" fill="none" stroke="#8A8A8A" stroke-width="0.7" opacity="0.4"/>
    <!-- cuticle boundary arc -->
    <path d="M -15,22 Q 0,36 15,22" fill="none" stroke="#8A8A8A" stroke-width="0.9" opacity="0.3"/>
  </svg>`;
};

const NAIL_IDS = ['n0','n1','n2','n3','n4','n5','n6','n7','n8','n9'];

// Nail labels for the finalize composite
const NAIL_LABELS = [
  ['R Pinky', 'R Ring', 'R Mid', 'R Index', 'R Thumb'],
  ['L Thumb', 'L Index', 'L Mid', 'L Ring', 'L Pinky'],
];

const MB_PLACEHOLDER = [
  { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', label: 'French Tips' },
  { url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=600&fit=crop', label: 'Chrome Art' },
  { url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=450&fit=crop', label: 'Nude Almond' },
  { url: 'https://images.unsplash.com/photo-1604902396830-aca29e19b06f?w=400&h=550&fit=crop', label: 'Red Stiletto' },
  { url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=480&fit=crop', label: 'Pastel Ombré' },
  { url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=520&fit=crop', label: 'Gold Foil' },
  { url: 'https://images.unsplash.com/photo-1583395145518-331ec52fc07d?w=400&h=440&fit=crop', label: 'Matte Green' },
  { url: 'https://images.unsplash.com/photo-1522337360786-8d7b0e2f4dc5?w=400&h=500&fit=crop', label: 'Lavender Marble' },
  { url: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&h=490&fit=crop', label: 'Ice Chrome' },
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&h=460&fit=crop', label: 'Pearl Bridal' },
];

const MB_SLOTS = 6;

let selectedDesign = null;
let appliedDesigns = {};
let canvasMode = 'hand';
let mbDragData = null;
let mbGhost = null;

export function openCanvas(preselectedItem = null) {
  const view = document.getElementById('canvas-view');
  if (!view) return;

  for (const id of ['detail-view', 'estimator-view', 'policy-view']) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active'); el.style.display = 'none'; }
  }
  document.documentElement.style.overflow = 'hidden';

  selectedDesign = preselectedItem;
  appliedDesigns = {};
  canvasMode = 'hand';
  render(view);
  view.style.display = 'block';
  requestAnimationFrame(() => { view.classList.add('active'); });
  view.scrollTop = 0;
}

export function closeCanvas() {
  const view = document.getElementById('canvas-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 300);
  document.documentElement.style.overflow = '';
  selectedDesign = null;
  appliedDesigns = {};
  mbDragData = null;
  if (mbGhost) { mbGhost.remove(); mbGhost = null; }
}

function render(view) {
  if (canvasMode === 'hand') {
    renderHandMode(view);
  } else {
    renderBoardMode(view);
  }
}

/* ═══════════════════════════════════════
   HAND MODE — 2×5 Nail Grid
   ═══════════════════════════════════════ */

function renderHandMode(view) {
  const filledCount = Object.keys(appliedDesigns).length;

  view.innerHTML = `
    <div class="detail-header">
      <button class="back-btn" id="canvas-back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${i18n.t('detail.back')}
      </button>
      <div class="canvas-mode-tabs">
        <button class="canvas-mode-tab active" data-mode="hand">${i18n.t('canvas.modeHand')}</button>
        <button class="canvas-mode-tab" data-mode="board">${i18n.t('canvas.modeBoard')}</button>
      </div>
      <button class="canvas-clear-btn" id="canvas-clear">${i18n.t('canvas.clearAll')}</button>
    </div>
    <div class="canvas-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('canvas.title')}</h1>
      <p class="canvas-hint" id="canvas-hint">${selectedDesign ? i18n.t('canvas.tapFinger') : i18n.t('canvas.selectDesign')}</p>

      <div class="nail-grid" id="nail-grid">
        ${[0, 1].map(row => `
          <div class="nail-grid-row">
            ${[0, 1, 2, 3, 4].map(col => {
              const n = row * 5 + col;
              const id = NAIL_IDS[n];
              const design = appliedDesigns[id];
              const label = NAIL_LABELS[row][col];
              return `
                <div class="nail-cell ${design ? 'has-design' : ''} ${selectedDesign && !design ? 'ready' : ''}"
                     data-nail="${id}">
                  <div class="nail-cell-inner">
                    ${design
                      ? `<div class="nail-svg-wrap"><img src="${design.image}" alt="" class="nail-fill-img" /></div>`
                      : `<div class="nail-svg-wrap">${NAIL_TEMPLATE_SVG(id, false)}</div>`
                    }
                    <span class="nail-label">${label}</span>
                    ${design ? `<button class="nail-remove" data-nail="${id}">&times;</button>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>

      <div class="design-strip-header">
        <span>${i18n.t('canvas.gallery')}</span>
      </div>
      <div class="design-strip" id="design-strip">
        ${DATA.feed.map(item => `
          <div class="design-thumb ${selectedDesign?.id === item.id ? 'selected' : ''}" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
        `).join('')}
      </div>

      <button class="finalize-btn ${filledCount > 0 ? '' : 'disabled'}" id="finalize-btn" ${filledCount === 0 ? 'disabled' : ''}>
        ${i18n.t('canvas.finalize')} (${filledCount}/10)
      </button>
    </div>
  `;

  attachModeTabs(view);
  view.querySelector('#canvas-back').addEventListener('click', () => closeCanvas());

  view.querySelector('#canvas-clear')?.addEventListener('click', () => {
    appliedDesigns = {};
    render(view);
  });

  view.querySelectorAll('.design-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const item = DATA.feed.find(p => p.id === thumb.dataset.id);
      if (!item) return;
      selectedDesign = selectedDesign?.id === item.id ? null : item;
      render(view);
    });
  });

  view.querySelectorAll('.nail-cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (e.target.classList.contains('nail-remove')) {
        e.stopPropagation();
        delete appliedDesigns[cell.dataset.nail];
        render(view);
        return;
      }
      if (!selectedDesign) {
        showToast(i18n.t('canvas.selectFirst'));
        return;
      }
      appliedDesigns[cell.dataset.nail] = { ...selectedDesign };
      showToast(i18n.t('canvas.applied'), 'success');
      render(view);
    });
  });

  view.querySelector('#finalize-btn').addEventListener('click', async () => {
    if (Object.keys(appliedDesigns).length === 0) return;
    await finalizeLook(view);
  });
}

/* ═══════════════════════════════════════
   BOARD MODE (mood board drag-and-drop)
   ═══════════════════════════════════════ */

function renderBoardMode(view) {
  view.innerHTML = `
    <div class="detail-header">
      <button class="back-btn" id="canvas-back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${i18n.t('detail.back')}
      </button>
      <div class="canvas-mode-tabs">
        <button class="canvas-mode-tab" data-mode="hand">${i18n.t('canvas.modeHand')}</button>
        <button class="canvas-mode-tab active" data-mode="board">${i18n.t('canvas.modeBoard')}</button>
      </div>
      <button class="canvas-clear-btn" id="mb-clear-all">${i18n.t('canvas.clearAll')}</button>
    </div>
    <div class="canvas-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('moodboard.title')}</h1>
      <p class="canvas-hint">${i18n.t('moodboard.subtitle')}</p>

      <div class="mb-layout">
        <section class="mb-gallery-col">
          <div class="mb-section-header">
            <span>${i18n.t('moodboard.galleryTitle')}</span>
            <label class="mb-upload-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>${i18n.t('moodboard.upload')}</span>
              <input type="file" id="mb-file-input" accept="image/*" multiple hidden />
            </label>
          </div>
          <div class="mb-masonry" id="mb-masonry">
            ${MB_PLACEHOLDER.map((img, i) => `
              <div class="mb-gallery-item" data-src="${img.url}" data-label="${img.label}">
                <img src="${img.url}" alt="${img.label}" loading="lazy" />
                <div class="mb-item-label">${img.label}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="mb-board-col">
          <div class="mb-section-header">
            <span>${i18n.t('moodboard.boardTitle')}</span>
          </div>
          <div class="mb-board-grid" id="mb-board-grid">
            ${Array.from({ length: MB_SLOTS }, (_, i) => `
              <div class="mb-board-card" data-index="${i}">
                <div class="mb-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>${i18n.t('moodboard.dropHere')}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <button class="finalize-btn" id="mb-finalize">
        ${i18n.t('moodboard.finalizeBoard')}
      </button>
    </div>
  `;

  attachModeTabs(view);
  view.querySelector('#canvas-back').addEventListener('click', () => closeCanvas());
  view.querySelector('#mb-clear-all').addEventListener('click', () => {
    view.querySelectorAll('.mb-board-card').forEach(card => {
      card.classList.remove('filled');
      card.innerHTML = emptyCardHTML();
    });
  });

  attachMoodboardDragHandlers(view);
  setupMoodboardUpload(view);
  setupMoodboardCardRemoval(view);

  view.querySelector('#mb-finalize').addEventListener('click', () => {
    showToast(i18n.t('moodboard.boardSaved'), 'success');
  });
}

function emptyCardHTML() {
  return `
    <div class="mb-placeholder">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <span>${i18n.t('moodboard.dropHere')}</span>
    </div>
  `;
}

function attachMoodboardDragHandlers(view) {
  view.querySelectorAll('.mb-gallery-item').forEach(item => {
    item.addEventListener('pointerdown', (e) => onMbDragStart(e, view));
  });
}

function onMbDragStart(e, view) {
  e.preventDefault();
  const item = e.currentTarget;
  const src = item.dataset.src;
  const label = item.dataset.label;

  mbDragData = { src, label };
  item.classList.add('dragging');

  mbGhost = document.createElement('div');
  mbGhost.className = 'mb-drag-ghost';
  mbGhost.innerHTML = `<img src="${src}" alt="" />`;
  mbGhost.style.left = e.clientX + 'px';
  mbGhost.style.top = e.clientY + 'px';
  document.body.appendChild(mbGhost);

  const moveFn = (ev) => {
    if (!mbGhost) return;
    mbGhost.style.left = ev.clientX + 'px';
    mbGhost.style.top = ev.clientY + 'px';
    const below = document.elementFromPoint(ev.clientX, ev.clientY);
    view.querySelectorAll('.mb-board-card').forEach(c => c.classList.remove('drag-over'));
    const card = below?.closest('.mb-board-card');
    if (card) card.classList.add('drag-over');
  };

  const endFn = (ev) => {
    document.removeEventListener('pointermove', moveFn);
    document.removeEventListener('pointerup', endFn);
    const below = document.elementFromPoint(ev.clientX, ev.clientY);
    const card = below?.closest('.mb-board-card');
    if (card && mbDragData) {
      card.classList.add('filled');
      card.innerHTML = `
        <img class="mb-card-image" src="${mbDragData.src}" alt="${mbDragData.label}" />
        <button class="mb-remove-btn">&times;</button>
      `;
      const rmBtn = card.querySelector('.mb-remove-btn');
      if (rmBtn) {
        rmBtn.addEventListener('click', (e2) => {
          e2.stopPropagation();
          card.classList.remove('filled');
          card.innerHTML = emptyCardHTML();
        });
      }
    }
    view.querySelectorAll('.mb-gallery-item').forEach(i => i.classList.remove('dragging'));
    view.querySelectorAll('.mb-board-card').forEach(c => c.classList.remove('drag-over'));
    if (mbGhost) { mbGhost.remove(); mbGhost = null; }
    mbDragData = null;
  };

  document.addEventListener('pointermove', moveFn);
  document.addEventListener('pointerup', endFn);
}

function setupMoodboardUpload(view) {
  const input = view.querySelector('#mb-file-input');
  if (!input) return;
  input.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const masonry = view.querySelector('#mb-masonry');
        if (!masonry) return;
        const item = document.createElement('div');
        item.className = 'mb-gallery-item';
        item.dataset.src = ev.target.result;
        item.dataset.label = file.name.replace(/\.[^/.]+$/, '');
        item.innerHTML = `
          <img src="${ev.target.result}" alt="${item.dataset.label}" />
          <div class="mb-item-label">${item.dataset.label}</div>
        `;
        masonry.insertBefore(item, masonry.firstChild);
        item.addEventListener('pointerdown', (ev2) => onMbDragStart(ev2, view));
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  });
}

function setupMoodboardCardRemoval(view) {
  view.querySelectorAll('.mb-board-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('mb-remove-btn')) {
        e.stopPropagation();
        card.classList.remove('filled');
        card.innerHTML = emptyCardHTML();
      }
    });
  });
}

/* ═══════════════════════════════════════
   Mode Tabs
   ═══════════════════════════════════════ */

function attachModeTabs(view) {
  view.querySelectorAll('.canvas-mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      canvasMode = tab.dataset.mode;
      render(view);
    });
  });
}

/* ═══════════════════════════════════════
   Finalize (Hand Mode)
   ═══════════════════════════════════════ */

async function finalizeLook(view) {
  const btn = view.querySelector('#finalize-btn');
  btn.textContent = i18n.t('canvas.generating');
  btn.disabled = true;

  try {
    const dataUrl = await generateCanvasImage();
    showFinalResult(view, dataUrl);
  } catch (e) {
    console.error('Canvas generation error:', e);
    showToast(i18n.t('canvas.generateError'));
    btn.textContent = i18n.t('canvas.finalize');
    btn.disabled = false;
  }
}

async function generateCanvasImage() {
  const COLS = 5, ROWS = 2;
  const CELL_W = 100, CELL_H = 160;
  const GAP_X = 24, GAP_Y = 28;
  const PAD_X = 40, PAD_Y = 20;
  const TOP_PAD = 60, BOT_PAD = 60;

  const W = PAD_X * 2 + COLS * CELL_W + (COLS - 1) * GAP_X;
  const H = TOP_PAD + PAD_Y * 2 + ROWS * CELL_H + (ROWS - 1) * GAP_Y + BOT_PAD;
  const scale = 2;

  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.fillStyle = '#FCFBF7';
  ctx.fillRect(0, 0, W, H);

  // Draw each nail cell
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const n = row * COLS + col;
      const id = NAIL_IDS[n];
      const label = NAIL_LABELS[row][col];

      const cx = PAD_X + col * (CELL_W + GAP_X) + CELL_W / 2;
      const cy = TOP_PAD + PAD_Y + row * (CELL_H + GAP_Y) + CELL_H / 2;

      const design = appliedDesigns[id];

      // Draw nail SVG
      const svgString = NAIL_TEMPLATE_SVG(id, !!design);
      const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      const nailImg = new Image();
      nailImg.src = svgUrl;
      await new Promise((res, rej) => { nailImg.onload = res; nailImg.onerror = rej; });
      ctx.drawImage(nailImg, cx - 24, cy - 43, 48, 86);

      // Draw design if applied
      if (design) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 39);
        ctx.bezierCurveTo(cx - 10, cy - 35, cx - 14, cy - 23, cx - 14, cy - 8);
        ctx.bezierCurveTo(cx - 14, cy + 12, cx - 8, cy + 27, cx - 4, cy + 35);
        ctx.bezierCurveTo(cx - 2, cy + 39, cx, cy + 41, cx, cy + 41);
        ctx.bezierCurveTo(cx, cy + 41, cx + 2, cy + 39, cx + 4, cy + 35);
        ctx.bezierCurveTo(cx + 8, cy + 27, cx + 14, cy + 12, cx + 14, cy - 8);
        ctx.bezierCurveTo(cx + 14, cy - 23, cx + 10, cy - 35, cx, cy - 39);
        ctx.closePath();
        ctx.clip();

        const ir = img.width / img.height;
        const nr = 28 / 80;
        let dw, dh;
        if (ir > nr) { dh = 80; dw = dh * ir; } else { dw = 28; dh = dw / ir; }
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
        ctx.restore();
      }

      // Label
      ctx.fillStyle = '#9A9A9A';
      ctx.font = '400 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, cx, cy + 58);
    }
  }

  ctx.fillStyle = '#A38874';
  ctx.font = '600 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('tiyu salon tokyo', W / 2, H - 16);

  return canvas.toDataURL('image/png');
}

function showFinalResult(view, dataUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'canvas-result-overlay';
  overlay.innerHTML = `
    <div class="canvas-result-modal">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h2>${i18n.t('canvas.resultTitle')}</h2>
      <div class="result-image-wrap">
        <img src="${dataUrl}" alt="Your Tiyu Canvas Look" />
      </div>
      <div class="result-actions">
        <button class="result-btn primary" id="send-to-tiyu">${i18n.t('canvas.sendToTiyu')}</button>
        <button class="result-btn" id="save-image">${i18n.t('canvas.saveImage')}</button>
        <button class="result-btn" id="book-after">${i18n.t('canvas.bookAfter')}</button>
        <button class="result-btn ghost" id="close-result">${i18n.t('canvas.close')}</button>
      </div>
    </div>
  `;
  view.appendChild(overlay);
  view.querySelector('#send-to-tiyu').addEventListener('click', () => shareLook(dataUrl));
  view.querySelector('#save-image').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'tiyu-canvas-look.png';
    a.click();
    showToast(i18n.t('canvas.savedImage'), 'success');
  });
  view.querySelector('#book-after').addEventListener('click', () => {
    overlay.remove();
    closeCanvas();
    openBookingModal();
  });
  view.querySelector('#close-result').addEventListener('click', () => overlay.remove());
}

async function shareLook(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'tiyu-canvas-look.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'My Tiyu Canvas Look',
        text: i18n.t('canvas.shareText'),
        files: [file],
      });
    } else {
      const subject = encodeURIComponent('My Tiyu Canvas - Custom Nail Design');
      const body = encodeURIComponent(i18n.t('canvas.emailBody'));
      window.location.href = `mailto:tiyusalontokyo@gmail.com?subject=${subject}&body=${body}`;
      showToast(i18n.t('canvas.emailOpened'));
    }
  } catch (e) {
    showToast(i18n.t('canvas.shareFallback'));
  }
}
