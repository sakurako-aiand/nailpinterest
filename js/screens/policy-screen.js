import { i18n } from '../i18n.js';

export function renderPolicyScreen() {
  const container = document.getElementById('screen-policy');
  if (!container) return;

  container.innerHTML = `
    <div class="info-screen policy-full-screen">
      <div class="info-header">
        <div class="brand">${i18n.t('brand')}</div>
        <h1>${i18n.t('policy.title')}</h1>
        <p class="subtitle">${i18n.t('policy.subtitle')}</p>
      </div>

      <div class="policy-document">
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
    </div>
  `;
}
