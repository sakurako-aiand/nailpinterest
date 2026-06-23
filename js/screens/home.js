import { DATA, PRICING, SERVICES, PRICE_LISTS, getTierPrice, getFeedByCategory, formatPrice } from '../data.js';
import { openDetailView } from './detail.js';
import { openEstimator } from './estimator.js';
import { openPolicy } from './policy.js';
import { openCanvas } from './canvas.js';
import { i18n } from '../i18n.js';

let activeCategory = 'nails';

export function renderHome() {
  const container = document.getElementById('screen-home');
  if (!container) return;

  const feed = getFeedByCategory(activeCategory);
  const isNails = activeCategory === 'nails';

  container.innerHTML = `
    <div class="feed-header">
      <div class="brand">${i18n.t('brand')}</div>
      <h1>${i18n.t('home.title')}</h1>
      <p class="subtitle">${i18n.t('home.subtitle')}</p>
      <div class="service-tabs" id="service-tabs">
        ${SERVICES.map(s => `
          <button class="service-tab ${activeCategory === s.id ? 'active' : ''}" data-service="${s.id}">
            ${i18n.t(`services.${s.id}`)}
          </button>
        `).join('')}
      </div>
      <button class="policy-link" id="home-policy-link" style="margin-top: 12px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        ${i18n.t('policy.title')}
      </button>
    </div>
    ${isNails ? `
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
    ` : `
      <div class="cta-banner" id="pricelist-cta">
        <h3>${i18n.t('home.priceListCta')}</h3>
        <p>${i18n.t('home.priceListCtaDesc')}</p>
        <span class="cta-arrow">${i18n.t('services.priceList')} &rarr;</span>
      </div>
    `}
    <div class="masonry masonry-fade" id="home-masonry">
      ${feed.map(item => `
        <div class="masonry-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="pin-overlay">
            <span class="pin-title">${item.title}</span>
            ${item.tier ? `<div class="pin-price">${formatPrice(getTierPrice(item.tier))}+</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="social-footer">
      <a class="social-card ig-footer" href="https://www.instagram.com/tiyusalontokyo/?hl=en" target="_blank" rel="noopener noreferrer">
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
      <a class="social-card tt-footer" href="https://www.tiktok.com/@tiyusalontokyo" target="_blank" rel="noopener noreferrer">
        <span class="ig-icon tt-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
          </svg>
        </span>
        <span class="ig-text">
          <span class="ig-handle">${i18n.t('home.tiktokHandle')}</span>
          <span class="ig-desc">${i18n.t('home.tiktokDesc')}</span>
        </span>
        <span class="ig-arrow">${i18n.t('home.tiktokFollow')} &rarr;</span>
      </a>
    </div>
  `;

  container.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.service;
      renderHome();
    });
  });

  container.querySelectorAll('.masonry-item').forEach(el => {
    el.addEventListener('click', () => {
      const item = DATA.feed.find(p => p.id === el.dataset.id);
      if (item) openDetailView(item);
    });
  });

  const estimatorCta = container.querySelector('#estimator-cta');
  if (estimatorCta) {
    estimatorCta.addEventListener('click', () => openEstimator());
  }

  const canvasCta = container.querySelector('#canvas-cta');
  if (canvasCta) {
    canvasCta.addEventListener('click', () => openCanvas());
  }

  const priceListCta = container.querySelector('#pricelist-cta');
  if (priceListCta) {
    priceListCta.addEventListener('click', () => openPriceList(activeCategory));
  }

  container.querySelector('#home-policy-link').addEventListener('click', () => openPolicy());
}

function openPriceList(category) {
  const items = PRICE_LISTS[category];
  if (!items) return;

  const overlay = document.createElement('div');
  overlay.className = 'pricelist-overlay';
  overlay.innerHTML = `
    <div class="est-backdrop" data-close></div>
    <div class="est-sheet pricelist-sheet">
      <div class="est-sheet-handle" data-close></div>
      <button class="est-close-btn" data-close aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="est-sheet-scroll">
        <div class="est-sheet-header">
          <h1>${i18n.t('services.priceList')}</h1>
          <p class="subtitle">${i18n.t('services.priceListDesc')}</p>
        </div>
        <div class="receipt pricelist-receipt">
          ${items.map(item => `
            <div class="receipt-line">
              <div class="pricelist-item-info">
                <span class="receipt-item">${item.label}</span>
                <span class="pricelist-item-desc">${item.desc}</span>
              </div>
              <span class="receipt-price">${formatPrice(item.price)}</span>
            </div>
          `).join('')}
          <div class="receipt-divider"></div>
          <a href="${PRICING.bookingUrl}" target="_blank" rel="noopener noreferrer" class="book-now-link">
            ${i18n.t('services.bookBtn')} &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add('est-open');
  requestAnimationFrame(() => overlay.classList.add('active'));

  overlay.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => closePriceList(overlay));
  });
}

function closePriceList(overlay) {
  overlay.classList.remove('active');
  document.body.classList.remove('est-open');
  setTimeout(() => overlay.remove(), 350);
}
