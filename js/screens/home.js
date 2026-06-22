import { DATA } from '../data.js';
import { openDetailView } from './detail.js';

export function renderHome() {
  const container = document.getElementById('screen-home');
  if (!container) return;

  container.innerHTML = `
    <div class="feed-header">
      <h1>NailPin</h1>
      <p class="subtitle">The Art of Nail Inspiration</p>
    </div>
    <div class="cta-banner" id="home-cta">
      <h3>Curate Your Collection</h3>
      <p>Save looks you love &amp; upload your own</p>
    </div>
    <div class="masonry" id="home-masonry">
      ${DATA.feed.map(item => `
        <div class="masonry-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="pin-overlay">
            <span class="pin-title">${item.title}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.masonry-item').forEach(el => {
    el.addEventListener('click', () => {
      const item = DATA.feed.find(p => p.id === el.dataset.id);
      if (item) openDetailView(item);
    });
  });
}
