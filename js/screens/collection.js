import { store } from '../store.js';
import { openDetailView } from './detail.js';
import { PRICING } from '../data.js';

export function renderCollection() {
  const container = document.getElementById('screen-collection');
  if (!container) return;

  const items = store.collection;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="feed-header">
        <div class="brand">tiyu salon tokyo</div>
        <h1>My Wishlist</h1>
        <p class="subtitle">Your curated collection</p>
      </div>
      <div class="empty-state">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <h3>Your wishlist awaits</h3>
        <p>Save looks from the gallery or upload your own inspiration to bring to your appointment.</p>
      </div>
      <a class="book-btn" href="${PRICING.bookingUrl}" target="_blank" rel="noopener">
        Book My Appointment
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    `;
  } else {
    const newestFirst = [...items].reverse();
    container.innerHTML = `
      <div class="feed-header">
        <div class="brand">tiyu salon tokyo</div>
        <h1>My Wishlist</h1>
        <p class="subtitle">${newestFirst.length} saved look${newestFirst.length !== 1 ? 's' : ''}</p>
      </div>
      <div class="masonry" id="collection-masonry">
        ${newestFirst.map(item => `
          <div class="masonry-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="pin-overlay">
              <span class="pin-title">${item.title}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <a class="book-btn" href="${PRICING.bookingUrl}" target="_blank" rel="noopener">
        Book My Appointment
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    `;

    container.querySelectorAll('.masonry-item').forEach(el => {
      el.addEventListener('click', () => {
        const item = newestFirst.find(p => p.id === el.dataset.id);
        if (item) openDetailView(item);
      });
    });
  }
}
