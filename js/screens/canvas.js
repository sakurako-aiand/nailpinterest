import { DATA, PRICING } from '../data.js';
import { i18n } from '../i18n.js';
import { showToast, navigateTo } from '../utils.js';
import { openBookingModal } from './booking.js';

const HAND_SVG = `<svg viewBox="0 0 300 460" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skinG" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#F4EADE"/>
      <stop offset="100%" stop-color="#E6D5C6"/>
    </linearGradient>
    <filter id="handShadow"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <ellipse cx="152" cy="430" rx="50" ry="8" fill="rgba(0,0,0,0.06)"/>
  <rect x="128" y="380" width="48" height="48" rx="18" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="150" cy="325" rx="68" ry="82" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="80" cy="258" rx="19" ry="55" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(-33 80 258)"/>
  <ellipse cx="115" cy="178" rx="18" ry="73" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(-6 115 178)"/>
  <ellipse cx="155" cy="155" rx="19" ry="85" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="195" cy="172" rx="18" ry="77" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(7 195 172)"/>
  <ellipse cx="230" cy="212" rx="16" ry="60" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(18 230 212)"/>
  <ellipse cx="51" cy="210" rx="14" ry="11" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(-33 51 210)"/>
  <ellipse cx="108" cy="103" rx="13" ry="10" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(-6 108 103)"/>
  <ellipse cx="155" cy="68" rx="15" ry="12" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5"/>
  <ellipse cx="206" cy="93" rx="14" ry="11" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(7 206 93)"/>
  <ellipse cx="248" cy="156" rx="11" ry="9" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(18 248 156)"/>
</svg>`;

const NAILS = [
  { id: 'thumb',  cx: 51,  cy: 210, w: 32, h: 26, rot: -33 },
  { id: 'index',  cx: 108, cy: 103, w: 30, h: 24, rot: -6 },
  { id: 'middle', cx: 155, cy: 68,  w: 36, h: 28, rot: 0 },
  { id: 'ring',   cx: 206, cy: 93,  w: 32, h: 26, rot: 7 },
  { id: 'pinky',  cx: 248, cy: 156, w: 26, h: 22, rot: 18 },
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
   HAND MODE (existing)
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

      <div class="hand-container" id="hand-container">
        <div class="hand-svg-wrap" id="hand-svg">${HAND_SVG}</div>
        ${NAILS.map(n => {
          const design = appliedDesigns[n.id];
          const pct = (v, max) => (v / max) * 100;
          return `
            <div class="nail-zone ${design ? 'has-design' : ''} ${selectedDesign && !design ? 'ready' : ''}"
                 data-nail="${n.id}"
                 style="left:${pct(n.cx,300)}%;top:${pct(n.cy,460)}%;width:${pct(n.w,300)}%;height:${pct(n.h,460)}%;transform:translate(-50%,-50%) rotate(${n.rot}deg)">
              ${design ? `<img src="${design.image}" alt="${design.title}" class="nail-image" />` : ''}
              ${design ? `<button class="nail-remove" data-nail="${n.id}">&times;</button>` : ''}
            </div>
          `;
        }).join('')}
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
        ${i18n.t('canvas.finalize')} (${filledCount}/5)
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

  view.querySelectorAll('.nail-zone').forEach(zone => {
    zone.addEventListener('click', (e) => {
      if (e.target.classList.contains('nail-remove')) {
        e.stopPropagation();
        delete appliedDesigns[zone.dataset.nail];
        render(view);
        return;
      }
      if (!selectedDesign) {
        showToast(i18n.t('canvas.selectFirst'));
        return;
      }
      appliedDesigns[zone.dataset.nail] = { ...selectedDesign };
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
  const W = 300, H = 460, scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.fillStyle = '#FCFBF7';
  ctx.fillRect(0, 0, W, H);

  const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(HAND_SVG);
  const handImg = new Image();
  handImg.src = svgUrl;
  await new Promise((res, rej) => { handImg.onload = res; handImg.onerror = rej; });
  ctx.drawImage(handImg, 0, 0, W, H);

  for (const nail of NAILS) {
    const design = appliedDesigns[nail.id];
    if (!design) continue;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = design.image;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

    ctx.save();
    ctx.translate(nail.cx, nail.cy);
    ctx.rotate(nail.rot * Math.PI / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, nail.w / 2, nail.h / 2, 0, 0, Math.PI * 2);
    ctx.clip();

    const ir = img.width / img.height;
    const nr = nail.w / nail.h;
    let dw, dh;
    if (ir > nr) { dh = nail.h; dw = dh * ir; } else { dw = nail.w; dh = dw / ir; }
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }

  ctx.fillStyle = '#A38874';
  ctx.font = '600 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('tiyu salon tokyo', W / 2, H - 12);

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
