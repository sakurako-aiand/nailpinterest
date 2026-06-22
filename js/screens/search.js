import { DATA } from '../data.js';
import { openDetailView } from './detail.js';

export function initSearch() {
  const container = document.getElementById('screen-search');
  if (!container) return;

  container.innerHTML = `
    <div class="search-screen">
      <h1>Search</h1>
      <div class="search-input-wrapper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search-input" placeholder="Search styles, colors, brands..." autocomplete="off" />
      </div>
      <div class="search-results" id="search-results">
        <div class="masonry" id="search-masonry"></div>
      </div>
    </div>
  `;

  const input = container.querySelector('#search-input');
  const resultsDiv = container.querySelector('#search-results');
  const masonry = container.querySelector('#search-masonry');

  function performSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      masonry.innerHTML = '';
      resultsDiv.querySelector('.no-results')?.remove();
      return;
    }

    const filtered = DATA.feed.filter(item => {
      const inTitle = item.title.toLowerCase().includes(q);
      const inColors = (item.colors || []).some(c =>
        c.brand.toLowerCase().includes(q) ||
        c.color.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q)
      );
      return inTitle || inColors;
    });

    if (filtered.length === 0) {
      masonry.innerHTML = '';
      if (!resultsDiv.querySelector('.no-results')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<p>No results found. Try a different search term.</p>';
        resultsDiv.appendChild(noResults);
      }
    } else {
      resultsDiv.querySelector('.no-results')?.remove();
      masonry.innerHTML = filtered.map(item => `
        <div class="masonry-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="pin-overlay">
            <span class="pin-title">${item.title}</span>
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
  input.focus();

  window._searchCleanup = () => {};
}
