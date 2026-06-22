import { DATA, getTierPrice, formatPrice } from '../data.js';
import { openDetailView } from './detail.js';
import { openEstimator } from './estimator.js';
import { openPolicy } from './policy.js';
import { i18n } from '../i18n.js';

export function renderHome() {
  const container = document.getElementById('screen-home');
  if (!container) return;

  container.innerHTML = `
    <div class="feed-header">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('home.title')}</h1>
      <p class="subtitle">${i18n.t('home.subtitle')}</p>
      <button class="policy-link" id="home-policy-link" style="margin-top: 16px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        ${i18n.t('policy.title')}
      </button>
    </div>
    <div class="cta-banner" id="estimator-cta">
      <h3>${i18n.t('home.ctaTitle')}</h3>
      <p>${i18n.t('home.ctaDesc')}</p>
      <span class="cta-arrow">${i18n.t('home.ctaArrow')} &rarr;</span>
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

  container.querySelector('#home-policy-link').addEventListener('click', () => {
    openPolicy();
  });
}
