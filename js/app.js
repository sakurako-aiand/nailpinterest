import { navigateTo } from './utils.js';
import { renderHome } from './screens/home.js';
import { renderUpload } from './screens/upload.js';
import { renderCollection } from './screens/collection.js';
import { store } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderUpload();

  store.onChange(() => {
    const activeScreen = document.querySelector('.nav-btn.active');
    if (activeScreen && activeScreen.dataset.screen === 'collection') {
      renderCollection();
    }
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.screen);
    });
  });

  if (document.querySelector('.nav-btn[data-screen="home"].active')) {
    navigateTo('home');
  }
});
