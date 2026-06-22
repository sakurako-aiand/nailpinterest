import { showToast, navigateTo } from '../utils.js';
import { store } from '../store.js';

const swatchMap = {
  'pink': 'pink-swatch',
  'red': 'red-swatch',
  'nude': 'nude-swatch',
  'white': 'white-swatch',
  'blue': 'blue-swatch',
  'green': 'green-swatch',
  'purple': 'purple-swatch',
  'black': 'black-swatch',
  'gold': 'gold-swatch',
  'silver': 'silver-swatch',
  'grey': 'grey-swatch',
  'coral': 'coral-swatch',
  'mint': 'mint-swatch',
  'lavender': 'lavender-swatch',
  'peach': 'peach-swatch',
  'teal': 'teal-swatch',
};

export function openDetailView(item) {
  const view = document.getElementById('detail-view');
  if (!view) return;

  document.documentElement.style.overflow = 'hidden';

  const isSaved = store.isInCollection(item.id);

  view.innerHTML = `
    <div class="detail-header">
      <button class="back-btn" id="detail-back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>
    </div>
    <div class="detail-image-container">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="detail-content">
      <h1 class="detail-title">${item.title}</h1>
      <div class="colors-section">
        <h2>The Palette</h2>
        <div class="color-chip-list">
          ${(item.colors || []).map(c => `
            <div class="color-chip">
              <div class="swatch ${c.swatch || 'pink-swatch'}"></div>
              <span class="color-label">${c.label}</span>
              <span class="color-brand">${c.brand} &mdash; ${c.color}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <button class="save-btn ${isSaved ? 'saved' : ''}" id="detail-save-btn">
        ${isSaved ? `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--taupe)" stroke="var(--taupe)" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Saved
        ` : `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Save to Collection
        `}
      </button>
    </div>
  `;

  view.style.display = 'block';
  requestAnimationFrame(() => {
    view.classList.add('active');
  });

  view.scrollTop = 0;

  const header = view.querySelector('.detail-header');
  view.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', view.scrollTop > 10);
  }, { once: false });

  view.querySelector('#detail-back').addEventListener('click', () => {
    closeDetailView();
  });

  const saveBtn = view.querySelector('#detail-save-btn');
  saveBtn.addEventListener('click', () => {
    if (store.isInCollection(item.id)) {
      store.removeFromCollection(item.id);
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Save to Collection
      `;
      showToast('Removed from collection');
    } else {
      store.saveToCollection(item);
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--taupe)" stroke="var(--taupe)" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Saved
      `;
      showToast('Saved to collection!', 'success');
    }
  });
}

export function closeDetailView() {
  const view = document.getElementById('detail-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => {
    view.style.display = 'none';
    view.innerHTML = '';
  }, 300);
  document.documentElement.style.overflow = '';
}
