import { DATA, getTierPrice, formatPrice } from '../data.js';
import { openDetailView } from './detail.js';
import { openEstimator } from './estimator.js';
import { openPolicy } from './policy.js';
import { openCanvas } from './canvas.js';
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
    <div class="canvas-cta" id="canvas-cta">
      <h3>${i18n.t('canvas.ctaTitle')}</h3>
      <p>${i18n.t('canvas.ctaDesc')}</p>
      <span class="cta-arrow">${i18n.t('canvas.ctaArrow')} &rarr;</span>
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
    <a class="ig-footer" href="https://www.instagram.com/tiyusalontokyo/?hl=en" target="_blank" rel="noopener noreferrer">
      <span class="ig-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </span>
      <span class="ig-text">
        <span class="ig-handle">${i18n.t('home.instagramHandle')}</span>
        <span class="ig-desc">${i18n.t('home.instagramDesc')}</span>
      </span>
      <span class="ig-arrow">${i18n.t('home.instagramFollow')} &rarr;</span>
    </a>
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

  container.querySelector('#canvas-cta').addEventListener('click', () => {
    openCanvas();
  });

  container.querySelector('#home-policy-link').addEventListener('click', () => {
    openPolicy();
  });
}
