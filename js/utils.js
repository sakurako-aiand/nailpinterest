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

  for (const id of ['detail-view', 'estimator-view', 'policy-view']) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('active');
      el.style.display = 'none';
      el.innerHTML = '';
    }
  }

  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('active');

  document.documentElement.style.overflow = '';

  document.getElementById('screen-container').scrollTop = 0;

  if (screenName === 'collection') {
    import('./screens/collection.js').then(m => m.renderCollection());
  }

  if (screenName === 'search') {
    import('./screens/search.js').then(m => m.initSearch());
  }
}

export { showToast, navigateTo };
