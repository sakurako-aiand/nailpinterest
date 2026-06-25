import { i18n } from '../i18n.js';

export function renderContact() {
  const container = document.getElementById('screen-contact');
  if (!container) return;

  const salonMapsUrl = 'https://maps.google.com/?q=tiyu+salon+tokyo+kagurazaka';
  const studioMapsUrl = 'https://maps.google.com/?q=tiyu+studio+tokyo+waseda';

  container.innerHTML = `
    <div class="info-screen contact-screen">
      <div class="info-header">
        <div class="brand">${i18n.t('brand')}</div>
        <h1>${i18n.t('contact.title')}</h1>
        <p class="subtitle">${i18n.t('contact.subtitle')}</p>
      </div>

      <div class="contact-luxury-card salon-card">
        <div class="contact-card-header">
          <span class="contact-loc-dot salon-dot"></span>
          <h2 class="contact-loc-name">${i18n.t('contact.salonTitle')}</h2>
          <p class="contact-loc-tagline">${i18n.t('contact.salonTagline')}</p>
        </div>
        <div class="contact-links">
          <a href="mailto:tiyusalontokyo@gmail.com" class="contact-link-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.email')}</span>
              <span class="contact-link-value">tiyusalontokyo@gmail.com</span>
            </span>
          </a>
          <a href="https://www.instagram.com/tiyusalontokyo/" target="_blank" rel="noopener noreferrer" class="contact-link-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.instagram')}</span>
              <span class="contact-link-value">@tiyusalontokyo</span>
            </span>
          </a>
          <div class="contact-link-item contact-address-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.address')}</span>
              <span class="contact-link-value">${i18n.t('contact.salonAddress')}</span>
            </span>
            <a href="${salonMapsUrl}" target="_blank" rel="noopener noreferrer" class="contact-maps-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${i18n.t('contact.openMaps')}
            </a>
          </div>
        </div>
      </div>

      <div class="contact-luxury-card studio-card">
        <div class="contact-card-header">
          <span class="contact-loc-dot studio-dot"></span>
          <h2 class="contact-loc-name">${i18n.t('contact.studioTitle')}</h2>
          <p class="contact-loc-tagline">${i18n.t('contact.studioTagline')}</p>
        </div>
        <div class="contact-links">
          <a href="mailto:tiyustudiotokyo@gmail.com" class="contact-link-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.email')}</span>
              <span class="contact-link-value">tiyustudiotokyo@gmail.com</span>
            </span>
          </a>
          <a href="https://www.instagram.com/tiyustudiotokyo/" target="_blank" rel="noopener noreferrer" class="contact-link-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.instagram')}</span>
              <span class="contact-link-value">@tiyustudiotokyo</span>
            </span>
          </a>
          <div class="contact-link-item contact-address-item">
            <span class="contact-link-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span class="contact-link-text">
              <span class="contact-link-label">${i18n.t('contact.address')}</span>
              <span class="contact-link-value">${i18n.t('contact.studioAddress')}</span>
            </span>
            <a href="${studioMapsUrl}" target="_blank" rel="noopener noreferrer" class="contact-maps-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${i18n.t('contact.openMaps')}
            </a>
          </div>
        </div>
      </div>

      <p class="contact-bottom-note">${i18n.t('contact.bottomNote')}</p>
    </div>
  `;
}
