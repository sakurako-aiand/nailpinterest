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

const galleryMasonry = document.getElementById('gallery-masonry');
const boardGrid = document.getElementById('board-grid');
const fileInput = document.getElementById('file-input');
const clearBtn = document.getElementById('clear-board');

let dragData = null;
let ghostEl = null;

function init() {
  renderGallery();
  renderBoard();
  setupUpload();
  setupClear();
}

function renderGallery() {
  galleryMasonry.innerHTML = PLACEHOLDER_IMAGES.map((img, i) => `
    <div class="gallery-item" data-index="${i}" data-src="${img.url}" data-label="${img.label}">
      <img src="${img.url}" alt="${img.label}" />
      <div class="item-label">${img.label}</div>
    </div>
  `).join('');

  attachDragHandlers();
}

function renderBoard() {
  boardGrid.innerHTML = '';
  for (let i = 0; i < BOARD_SLOTS; i++) {
    const card = document.createElement('div');
    card.className = 'board-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="placeholder">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span>Drop image here</span>
      </div>
    `;
    attachDropHandlers(card);
    boardGrid.appendChild(card);
  }
}

function attachDragHandlers() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('pointerdown', onDragStart);
  });
}

function onDragStart(e) {
  e.preventDefault();
  const item = e.currentTarget;
  const src = item.dataset.src;
  const label = item.dataset.label;
  const img = item.querySelector('img');

  dragData = { src, label, fromIndex: null };
  item.classList.add('dragging');

  ghostEl = document.createElement('div');
  ghostEl.className = 'drag-ghost';
  ghostEl.innerHTML = `<img src="${src}" alt="" />`;
  ghostEl.style.left = e.clientX + 'px';
  ghostEl.style.top = e.clientY + 'px';
  document.body.appendChild(ghostEl);

  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup', onDragEnd);
}

function onDragMove(e) {
  if (!ghostEl) return;
  ghostEl.style.left = e.clientX + 'px';
  ghostEl.style.top = e.clientY + 'px';

  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  document.querySelectorAll('.board-card').forEach(c => c.classList.remove('drag-over'));
  const card = elemBelow?.closest('.board-card');
  if (card) card.classList.add('drag-over');
}

function onDragEnd(e) {
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);

  const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  const card = elemBelow?.closest('.board-card');

  if (card && dragData) {
    fillCard(card, dragData.src, dragData.label);
  }

  document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('dragging'));
  document.querySelectorAll('.board-card').forEach(c => c.classList.remove('drag-over'));

  if (ghostEl) {
    ghostEl.remove();
    ghostEl = null;
  }
  dragData = null;
}

function attachDropHandlers(card) {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      e.stopPropagation();
      clearCard(card);
    }
  });
}

function fillCard(card, src, label) {
  card.classList.add('filled');
  card.innerHTML = `
    <img class="card-image" src="${src}" alt="${label}" />
    <button class="remove-btn" aria-label="Remove">&times;</button>
  `;
}

function clearCard(card) {
  card.classList.remove('filled');
  card.innerHTML = `
    <div class="placeholder">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <span>Drop image here</span>
    </div>
  `;
}

function setupUpload() {
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target.result;
        const label = file.name.replace(/\.[^/.]+$/, '');
        addGalleryItem(url, label);
      };
      reader.readAsDataURL(file);
    });
    fileInput.value = '';
  });
}

function addGalleryItem(url, label) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.src = url;
  item.dataset.label = label;
  item.innerHTML = `
    <img src="${url}" alt="${label}" />
    <div class="item-label">${label}</div>
  `;
  galleryMasonry.insertBefore(item, galleryMasonry.firstChild);
  item.addEventListener('pointerdown', onDragStart);
}

function setupClear() {
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.board-card').forEach(card => clearCard(card));
  });
}

init();
