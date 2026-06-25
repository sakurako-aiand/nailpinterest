import { i18n } from '../i18n.js';

export function renderVintage() {
  const container = document.getElementById('screen-vintage');
  if (!container) return;

  container.innerHTML = `
    <div class="vintage-page">
      <div class="vintage-hero">
        <div class="vintage-hero-img">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#F7F4EF"/>
            <ellipse cx="200" cy="160" rx="120" ry="80" fill="#E5D3B3" opacity="0.3"/>
            <path d="M120 140 Q120 100 160 100 L240 100 Q280 100 280 140 L280 200 Q280 220 260 220 L140 220 Q120 220 120 200 Z" fill="#C9A991" opacity="0.4"/>
            <rect x="170" y="90" width="60" height="20" rx="8" fill="#A38874" opacity="0.5"/>
            <circle cx="200" cy="100" r="4" fill="#A38874" opacity="0.6"/>
          </svg>
        </div>
        <h1 class="vintage-hero-title">${i18n.t('vintage.heroTitle')}</h1>
        <p class="vintage-hero-subtitle">${i18n.t('vintage.heroSubtitle')}</p>
      </div>

      <div class="vintage-story">
        <h2 class="vintage-section-title">${i18n.t('vintage.storyTitle')}</h2>
        <p class="vintage-story-body">${i18n.t('vintage.storyBody')}</p>
        <p class="vintage-story-signature">${i18n.t('vintage.storySignature')}</p>
      </div>

      <div class="vintage-experience">
        <h2 class="vintage-section-title">${i18n.t('vintage.experienceTitle')}</h2>
        <p class="vintage-experience-body">${i18n.t('vintage.experienceBody')}</p>
      </div>

      <div class="vintage-ctas">
        <a href="https://www.tiyutokyo.com/category/all-products" target="_blank" rel="noopener noreferrer" class="vintage-cta-btn">
          ${i18n.t('vintage.exploreCollection')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="https://www.instagram.com/tiyuvintagetokyo/" target="_blank" rel="noopener noreferrer" class="vintage-cta-btn">
          ${i18n.t('vintage.followInstagram')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <button class="vintage-cta-btn vintage-cta-primary" id="vintage-viewing-btn">
          ${i18n.t('vintage.requestViewing')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>
    </div>
  `;

  const viewingBtn = container.querySelector('#vintage-viewing-btn');
  if (viewingBtn) {
    viewingBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('tiyu:book-with-notes', {
        detail: i18n.t('vintage.viewingNotes'),
      }));
    });
  }
}
