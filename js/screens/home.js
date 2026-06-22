import { DATA, PRICING, getTierPrice, formatPrice } from '../data.js';
import { openDetailView } from './detail.js';
import { openEstimator } from './estimator.js';

export function renderHome() {
  const container = document.getElementById('screen-home');
  if (!container) return;

  container.innerHTML = `
    <div class="feed-header">
      <div class="brand">tiyu salon tokyo</div>
      <h1>The Lookbook</h1>
      <p class="subtitle">A curated gallery of our work</p>
    </div>
    <div class="cta-banner" id="estimator-cta">
      <h3>Plan Your Visit</h3>
      <p>Estimate your investment with our price calculator</p>
      <span class="cta-arrow">Open Estimator &rarr;</span>
    </div>
    <div class="masonry" id="home-masonry">
      ${DATA.feed.map(item => `
        <div class="masonry-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="pin-overlay">
            <span class="pin-title">${item.title}</span>
            <div class="pin-price">${formatPrice(getTierPrice(item.tier))}+</div>
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

  container.querySelector('#estimator-cta').addEventListener('click', () => {
    openEstimator();
  });
}
