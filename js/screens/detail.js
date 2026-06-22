import { showToast } from '../utils.js';
import { store } from '../store.js';
import { getTierPrice, getTierLabel, formatPrice } from '../data.js';
import { openEstimator } from './estimator.js';

export function openDetailView(item) {
  const view = document.getElementById('detail-view');
  if (!view) return;

  document.documentElement.style.overflow = 'hidden';

  const isSaved = store.isInCollection(item.id);
  const estPrice = getTierPrice(item.tier);
  const tierLabel = item.tier === 'custom' ? 'Custom Inspo' : getTierLabel(item.tier);

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
      <div class="detail-tier">${tierLabel}</div>

      <div class="investment-section">
        <h2>Estimated Investment</h2>
        <div class="investment-price">${formatPrice(estPrice)}+</div>
        <div class="investment-note">Final pricing varies with length, removal, and custom details</div>
        <button class="estimate-btn" id="open-estimator">Customize My Estimate</button>
      </div>

      <div class="colors-section">
        <h2>The Tiyu Palette</h2>
        <div class="color-chip-list">
          ${(item.colors || []).map(c => `
            <div class="color-chip">
              <div class="swatch ${c.swatch || 'taupe-swatch'}"></div>
              <span class="color-label">${c.label}</span>
              <span class="color-brand">${c.brand} &mdash; ${c.color}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <button class="save-btn ${isSaved ? 'saved' : ''}" id="detail-save-btn">
        ${isSaved ? `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--taupe)" stroke="var(--taupe)" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Saved to Wishlist
        ` : `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Add to Wishlist
        `}
      </button>
    </div>
  `;

  view.style.display = 'block';
  requestAnimationFrame(() => { view.classList.add('active'); });
  view.scrollTop = 0;

  const header = view.querySelector('.detail-header');
  view.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', view.scrollTop > 10);
  }, { once: false });

  view.querySelector('#detail-back').addEventListener('click', () => closeDetailView());
  view.querySelector('#open-estimator').addEventListener('click', () => openEstimator());

  const saveBtn = view.querySelector('#detail-save-btn');
  saveBtn.addEventListener('click', () => {
    if (store.isInCollection(item.id)) {
      store.removeFromCollection(item.id);
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Add to Wishlist
      `;
      showToast('Removed from wishlist');
    } else {
      store.saveToCollection(item);
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--taupe)" stroke="var(--taupe)" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        Saved to Wishlist
      `;
      showToast('Saved to your wishlist', 'success');
    }
  });
}

export function closeDetailView() {
  const view = document.getElementById('detail-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 300);
  document.documentElement.style.overflow = '';
}
