function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast ' + type;
  toast.classList.remove('hidden');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

function navigateTo(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const screen = document.getElementById('screen-' + screenName);
  if (screen) screen.classList.add('active');

  const navBtn = document.querySelector(`.nav-btn[data-screen="${screenName}"]`);
  if (navBtn) navBtn.classList.add('active');

  const detailView = document.getElementById('detail-view');
  if (detailView) {
    detailView.classList.remove('active');
    detailView.style.display = 'none';
    document.documentElement.style.overflow = '';
  }

  const estimatorView = document.getElementById('estimator-view');
  if (estimatorView) {
    estimatorView.classList.remove('active');
    estimatorView.style.display = 'none';
  }

  document.getElementById('screen-container').scrollTop = 0;

  if (screenName === 'collection') {
    import('./screens/collection.js').then(m => m.renderCollection());
  }

  if (screenName === 'search') {
    import('./screens/search.js').then(m => m.initSearch());
  }
}

export { showToast, navigateTo };
