import { PRICING, formatPrice } from '../data.js';

export function openEstimator() {
  const view = document.getElementById('estimator-view');
  if (!view) return;

  const detailView = document.getElementById('detail-view');
  if (detailView) {
    detailView.classList.remove('active');
    detailView.style.display = 'none';
  }

  let selectedDesign = 'single';
  let selectedExtension = 'natural';
  let selectedRemoval = 'none';
  let fingerCount = 1;

  function render() {
    view.innerHTML = `
      <div class="detail-header">
        <button class="back-btn" id="est-back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
      </div>
      <div class="estimator-content">
        <h1>Price Estimator</h1>
        <p class="subtitle">Build your custom estimate</p>

        <div class="estimate-group">
          <h3>Design Level</h3>
          <div class="estimate-options">
            ${PRICING.designs.map(d => `
              <div class="estimate-option ${selectedDesign === d.id ? 'selected' : ''}" data-design="${d.id}">
                <div class="opt-info">
                  <span class="opt-label">${d.label}</span>
                  <span class="opt-desc">${d.desc}</span>
                </div>
                <span class="opt-price">${d.price === 0 ? 'Base' : '+' + formatPrice(d.price)}</span>
                <div class="opt-check"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="estimate-group">
          <h3>Length &amp; Extensions</h3>
          <div class="estimate-options">
            ${PRICING.extensions.map(e => `
              <div class="estimate-option ${selectedExtension === e.id ? 'selected' : ''}" data-ext="${e.id}">
                <div class="opt-info">
                  <span class="opt-label">${e.label}</span>
                  <span class="opt-desc">${e.desc}</span>
                </div>
                <span class="opt-price">${e.price === 0 ? 'Included' : '+' + formatPrice(e.price)}</span>
                <div class="opt-check"></div>
              </div>
            `).join('')}
          </div>
          ${PRICING.extensions.find(e => e.id === selectedExtension)?.hasCount ? `
            <div class="estimate-finger-count">
              <span class="count-label">Number of fingers</span>
              <button class="count-btn" id="count-minus">−</button>
              <span class="count-value">${fingerCount}</span>
              <button class="count-btn" id="count-plus">+</button>
            </div>
          ` : ''}
        </div>

        <div class="estimate-group">
          <h3>Removal (if applicable)</h3>
          <div class="estimate-options">
            ${PRICING.removals.map(r => `
              <div class="estimate-option ${selectedRemoval === r.id ? 'selected' : ''}" data-removal="${r.id}">
                <div class="opt-info">
                  <span class="opt-label">${r.label}</span>
                  <span class="opt-desc">${r.desc}</span>
                </div>
                <span class="opt-price">${r.price === 0 ? 'No charge' : '+' + formatPrice(r.price)}</span>
                <div class="opt-check"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="estimate-total">
        <span class="total-label">Estimated Total</span>
        <span class="total-amount" id="est-total">${formatPrice(calculate())}</span>
      </div>
    `;

    view.style.display = 'block';
    requestAnimationFrame(() => { view.classList.add('active'); });
    view.scrollTop = 0;

    view.querySelector('#est-back').addEventListener('click', () => closeEstimator());

    view.querySelectorAll('[data-design]').forEach(el => {
      el.addEventListener('click', () => { selectedDesign = el.dataset.design; render(); });
    });

    view.querySelectorAll('[data-ext]').forEach(el => {
      el.addEventListener('click', () => { selectedExtension = el.dataset.ext; render(); });
    });

    view.querySelectorAll('[data-removal]').forEach(el => {
      el.addEventListener('click', () => { selectedRemoval = el.dataset.removal; render(); });
    });

    const minusBtn = view.querySelector('#count-minus');
    const plusBtn = view.querySelector('#count-plus');
    if (minusBtn) minusBtn.addEventListener('click', () => { if (fingerCount > 1) { fingerCount--; render(); } });
    if (plusBtn) plusBtn.addEventListener('click', () => { if (fingerCount < 10) { fingerCount++; render(); } });

    const header = view.querySelector('.detail-header');
    view.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', view.scrollTop > 10);
    }, { once: false });
  }

  function calculate() {
    const design = PRICING.designs.find(d => d.id === selectedDesign);
    const ext = PRICING.extensions.find(e => e.id === selectedExtension);
    const removal = PRICING.removals.find(r => r.id === selectedRemoval);

    let total = PRICING.base;
    if (design) total += design.price;
    if (ext) {
      if (ext.hasCount) {
        total += ext.price * fingerCount;
      } else {
        total += ext.price;
      }
    }
    if (removal) total += removal.price;
    return total;
  }

  render();
}

export function closeEstimator() {
  const view = document.getElementById('estimator-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 300);
}
