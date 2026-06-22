import { PRICING } from '../data.js';
import { i18n } from '../i18n.js';
import { openPolicy } from './policy.js';

export function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  const content = document.getElementById('booking-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <h1>${i18n.t('booking.title')}</h1>
    <p class="modal-subtitle">${i18n.t('booking.subtitle')}</p>

    <div class="reminder-item">
      <div class="reminder-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="reminder-text">
        <div class="reminder-title">${i18n.t('booking.reminder1Title')}</div>
        <div class="reminder-desc">${i18n.t('booking.reminder1Text')}</div>
      </div>
    </div>

    <div class="reminder-item">
      <div class="reminder-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div class="reminder-text">
        <div class="reminder-title">${i18n.t('booking.reminder2Title')}</div>
        <div class="reminder-desc">${i18n.t('booking.reminder2Text')}</div>
      </div>
    </div>

    <div class="reminder-item">
      <div class="reminder-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      </div>
      <div class="reminder-text">
        <div class="reminder-title">${i18n.t('booking.reminder3Title')}</div>
        <div class="reminder-desc">${i18n.t('booking.reminder3Text')}</div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="modal-acknowledge-btn" id="modal-acknowledge">${i18n.t('booking.acknowledgeBtn')}</button>
      <button class="modal-back-btn" id="modal-cancel">${i18n.t('booking.cancel')}</button>
    </div>
    <div class="modal-view-full">
      <a href="#" id="view-full-policy">${i18n.t('booking.viewFull')}</a>
    </div>
  `;

  modal.classList.add('active');

  content.querySelector('#modal-acknowledge').addEventListener('click', () => {
    closeBookingModal();
    window.open(PRICING.bookingUrl, '_blank', 'noopener');
  });

  content.querySelector('#modal-cancel').addEventListener('click', () => {
    closeBookingModal();
  });

  content.querySelector('#view-full-policy').addEventListener('click', (e) => {
    e.preventDefault();
    closeBookingModal();
    openPolicy();
  });
}

export function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  modal.classList.remove('active');
}
