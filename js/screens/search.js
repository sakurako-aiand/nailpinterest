import { DATA, getTierPrice, formatPrice, getAllTags } from '../data.js';
import { openDetailView } from './detail.js';
import { i18n } from '../i18n.js';
import { navigateTo } from '../utils.js';

export function initSearch() {
  const container = document.getElementById('screen-search');
  if (!container) return;

  const allTags = getAllTags();

  container.innerHTML = `
    <div class="search-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('search.title')}</h1>
      <div class="search-input-wrapper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search-input" placeholder="${i18n.t('search.placeholder')}" autocomplete="off" />
      </div>
      <div class="popular-tags" id="popular-tags">
        <p class="popular-tags-label">${i18n.t('search.popularTags')}</p>
        <div class="tag-pills-wrap">
          ${allTags.map(tag => `<button class="tag-pill" data-tag="${tag}">${tag}</button>`).join('')}
        </div>
      </div>
      <div class="search-results" id="search-results">
        <div class="masonry" id="search-masonry"></div>
      </div>
    </div>
  `;

  const input = container.querySelector('#search-input');
  const resultsDiv = container.querySelector('#search-results');
  const masonry = container.querySelector('#search-masonry');
  const popularTags = container.querySelector('#popular-tags');

  function performSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      masonry.innerHTML = '';
      resultsDiv.querySelector('.no-results')?.remove();
      popularTags.style.display = 'block';
      return;
    }

    popularTags.style.display = 'none';

    const filtered = DATA.feed.filter(item => {
      const inTitle = item.title.toLowerCase().includes(q);
      const tierLabel = item.tier ? i18n.t(`estimator.tierLabels.${item.tier}`) : i18n.t(`services.${item.category}`);
      const inTier = tierLabel.toLowerCase().includes(q);
      const inColors = (item.colors || []).some(c =>
        c.brand.toLowerCase().includes(q) ||
        c.color.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q)
      );
      const inTags = (item.tags || []).some(tag =>
        tag.toLowerCase().includes(q) ||
        tag.toLowerCase().replace('#', '').includes(q)
      );
      return inTitle || inTier || inColors || inTags;
    });

    renderResults(filtered);
  }

  function renderResults(filtered) {
    if (filtered.length === 0) {
      masonry.innerHTML = '';
      if (!resultsDiv.querySelector('.no-results')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `<p>${i18n.t('search.noResults')}</p>`;
        resultsDiv.appendChild(noResults);
      }
    } else {
      resultsDiv.querySelector('.no-results')?.remove();
      masonry.innerHTML = filtered.map(item => `
        <div class="masonry-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          ${item.location === 'salon' ? '<span class="loc-pill salon-pill"></span>' : item.location === 'studio' ? '<span class="loc-pill studio-pill"></span>' : item.location === 'both' ? '<span class="loc-pill dual-pill"></span>' : ''}
          <div class="pin-overlay">
            <span class="pin-title">${item.title}</span>
            ${item.tier ? `<div class="pin-price">${formatPrice(getTierPrice(item.tier))}+</div>` : ''}
          </div>
        </div>
      `).join('');

      masonry.querySelectorAll('.masonry-item').forEach(el => {
        el.addEventListener('click', () => {
          const item = filtered.find(p => p.id === el.dataset.id);
          if (item) openDetailView(item);
        });
      });
    }
  }

  input.addEventListener('input', () => performSearch(input.value));

  container.querySelectorAll('.tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const tag = pill.dataset.tag;
      input.value = tag;
      performSearch(tag);
      input.focus();
    });
  });
}

export function searchByTag(tag) {
  const container = document.getElementById('screen-search');
  if (!container) return;
  const input = container.querySelector('#search-input');
  if (input) {
    input.value = tag;
    input.dispatchEvent(new Event('input'));
  }
}
