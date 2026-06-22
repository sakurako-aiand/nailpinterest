import { i18n } from '../i18n.js';

const PLACEHOLDER_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', label: 'French Tips' },
  { url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=600&fit=crop', label: 'Chrome Art' },
  { url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=450&fit=crop', label: 'Nude Almond' },
  { url: 'https://images.unsplash.com/photo-1604902396830-aca29e19b06f?w=400&h=550&fit=crop', label: 'Red Stiletto' },
  { url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=480&fit=crop', label: 'Pastel Ombré' },
  { url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=520&fit=crop', label: 'Gold Foil' },
  { url: 'https://images.unsplash.com/photo-1583395145518-331ec52fc07d?w=400&h=440&fit=crop', label: 'Matte Green' },
  { url: 'https://images.unsplash.com/photo-1522337360786-8d7b0e2f4dc5?w=400&h=500&fit=crop', label: 'Lavender Marble' },
  { url: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&h=470&fit=crop', label: 'Red French' },
  { url: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&h=490&fit=crop', label: 'Ice Chrome' },
  { url: 'https://images.unsplash.com/photo-1560060141-7b9018741ced?w=400&h=530&fit=crop', label: 'Neon Swirls' },
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&h=460&fit=crop', label: 'Pearl Bridal' },
];

const BOARD_SLOTS = 6;

let dragData = null;
let ghostEl = null;
let cleanupFns = [];

export function renderMoodboard() {
  const container = document.getElementById('screen-moodboard');
  if (!container) return;

  cleanup();
  dragData = null;
  ghostEl = null;

  container.innerHTML = `
    <div class="feed-header">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('moodboard.title')}</h1>
      <p class="subtitle">${i18n.t('moodboard.subtitle')}</p>
    </div>

    <div class="mb-layout">
      <section class="mb-gallery-col">
        <div class="mb-section-header">
          <h2>${i18n.t('moodboard.galleryTitle')}</h2>
          <label class="mb-upload-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>${i18n.t('moodboard.upload')}</span>
            <input type="file" id="mb-file-input" accept="image/*" multiple hidden />
          </label>
        </div>
        <div class="mb-masonry" id="mb-masonry"></div>
      </section>

      <section class="mb-board-col">
        <div class="mb-section-header">
          <h2>${i18n.t('moodboard.boardTitle')}</h2>
          <button class="mb-clear-btn" id="mb-clear">${i18n.t('moodboard.clear')}</button>
        </div>
        <div class="mb-board-grid" id="mb-board-grid"></div>
      </section>
    </div>
  `;

  renderGallery(container);
  renderBoard(container);
  setupUpload(container);
  setupClear(container);
}

function renderGallery(container) {
  const masonry = container.querySelector('#mb-masonry');
  if (!masonry) return;
  masonry.innerHTML = PLACEHOLDER_IMAGES.map((img, i) => `
    <div class="mb-gallery-item" data-index="${i}" data-src="${img.url}" data-label="${img.label}">
      <img src="${img.url}" alt="${img.label}" loading="lazy" />
      <div class="mb-item-label">${img.label}</div>
    </div>
  `).join('');
  attachDragHandlers(container);
}

function renderBoard(container) {
  const grid = container.querySelector('#mb-board-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 0; i < BOARD_SLOTS; i++) {
    const card = document.createElement('div');
    card.className = 'mb-board-card';
    card.dataset.index = i;
    card.innerHTML = emptyCardHTML();
    grid.appendChild(card);
  }
}

function emptyCardHTML() {
  return `
    <div class="mb-placeholder">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <span>${i18n.t('moodboard.dropHere')}</span>
    </div>
  `;
}

function attachDragHandlers(container) {
  container.querySelectorAll('.mb-gallery-item').forEach(item => {
    const fn = (e) => onDragStart(e, container);
    item.addEventListener('pointerdown', fn);
    cleanupFns.push(() => item.removeEventListener('pointerdown', fn));
  });
}

function onDragStart(e, container) {
  e.preventDefault();
  const item = e.currentTarget;
  const src = item.dataset.src;
  const label = item.dataset.label;

  dragData = { src, label };
  item.classList.add('dragging');

  ghostEl = document.createElement('div');
  ghostEl.className = 'mb-drag-ghost';
  ghostEl.innerHTML = `<img src="${src}" alt="" />`;
  ghostEl.style.left = e.clientX + 'px';
  ghostEl.style.top = e.clientY + 'px';
  document.body.appendChild(ghostEl);

  const moveFn = (ev) => onDragMove(ev, container);
  const endFn = (ev) => onDragEnd(ev, container, moveFn, endFn);
  document.addEventListener('pointermove', moveFn);
  document.addEventListener('pointerup', endFn);
}

function onDragMove(e, container) {
  if (!ghostEl) return;
  ghostEl.style.left = e.clientX + 'px';
  ghostEl.style.top = e.clientY + 'px';

  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  container.querySelectorAll('.mb-board-card').forEach(c => c.classList.remove('drag-over'));
  const card = elemBelow?.closest('.mb-board-card');
  if (card) card.classList.add('drag-over');
}

function onDragEnd(e, container, moveFn, endFn) {
  document.removeEventListener('pointermove', moveFn);
  document.removeEventListener('pointerup', endFn);

  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  const card = elemBelow?.closest('.mb-board-card');

  if (card && dragData) {
    fillCard(card, dragData.src, dragData.label);
  }

  container.querySelectorAll('.mb-gallery-item').forEach(i => i.classList.remove('dragging'));
  container.querySelectorAll('.mb-board-card').forEach(c => c.classList.remove('drag-over'));

  if (ghostEl) { ghostEl.remove(); ghostEl = null; }
  dragData = null;
}

function fillCard(card, src, label) {
  card.classList.add('filled');
  card.innerHTML = `
    <img class="mb-card-image" src="${src}" alt="${label}" />
    <button class="mb-remove-btn" aria-label="Remove">&times;</button>
  `;
  const rm = card.querySelector('.mb-remove-btn');
  if (rm) {
    rm.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('filled');
      card.innerHTML = emptyCardHTML();
    });
  }
}

function setupUpload(container) {
  const input = container.querySelector('#mb-file-input');
  if (!input) return;
  const fn = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        addGalleryItem(container, ev.target.result, file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  };
  input.addEventListener('change', fn);
  cleanupFns.push(() => input.removeEventListener('change', fn));
}

function addGalleryItem(container, url, label) {
  const masonry = container.querySelector('#mb-masonry');
  if (!masonry) return;
  const item = document.createElement('div');
  item.className = 'mb-gallery-item';
  item.dataset.src = url;
  item.dataset.label = label;
  item.innerHTML = `
    <img src="${url}" alt="${label}" />
    <div class="mb-item-label">${label}</div>
  `;
  masonry.insertBefore(item, masonry.firstChild);
  item.addEventListener('pointerdown', (e) => onDragStart(e, container));
}

function setupClear(container) {
  const btn = container.querySelector('#mb-clear');
  if (!btn) return;
  const fn = () => {
    container.querySelectorAll('.mb-board-card').forEach(card => {
      card.classList.remove('filled');
      card.innerHTML = emptyCardHTML();
    });
  };
  btn.addEventListener('click', fn);
  cleanupFns.push(() => btn.removeEventListener('click', fn));
}

function cleanup() {
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
  if (ghostEl) { ghostEl.remove(); ghostEl = null; }
  dragData = null;
}
