import { i18n } from '../i18n.js';

export function openPolicy() {
  const view = document.getElementById('policy-view');
  if (!view) return;

  const detailView = document.getElementById('detail-view');
  if (detailView) {
    detailView.classList.remove('active');
    detailView.style.display = 'none';
  }

  view.innerHTML = `
    <div class="detail-header">
      <button class="back-btn" id="policy-back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${i18n.t('detail.back')}
      </button>
    </div>
    <div class="policy-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('policy.title')}</h1>
      <p class="subtitle">${i18n.t('policy.subtitle')}</p>

      <div class="policy-section">
        <h2>${i18n.t('policy.cancellation')}</h2>
        <ul>
          ${i18n.t('policy.cancellationItems').map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="policy-note">${i18n.t('policy.cancellationNote')}</div>
      </div>

      <div class="policy-section">
        <h2>${i18n.t('policy.late')}</h2>
        <ul>
          ${i18n.t('policy.lateItems').map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="policy-section">
        <h2>${i18n.t('policy.refix')}</h2>
        <ul>
          ${i18n.t('policy.refixItems').map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="policy-subtitle">${i18n.t('policy.refixCovers')}</div>
        <ul>
          ${i18n.t('policy.refixCoversItems').map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="policy-note">${i18n.t('policy.refixNote')}</div>
        <div class="policy-note" style="margin-top: 8px;">${i18n.t('policy.refixFinal')}</div>
      </div>
    </div>
  `;

  view.style.display = 'block';
  requestAnimationFrame(() => { view.classList.add('active'); });
  view.scrollTop = 0;

  const header = view.querySelector('.detail-header');
  view.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', view.scrollTop > 10);
  }, { once: false });

  view.querySelector('#policy-back').addEventListener('click', () => closePolicy());
}

export function closePolicy() {
  const view = document.getElementById('policy-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 300);
}
