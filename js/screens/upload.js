import { showToast } from '../utils.js';
import { store } from '../store.js';
import { i18n } from '../i18n.js';

let currentFile = null;

export function renderUpload() {
  const container = document.getElementById('screen-upload');
  if (!container) return;

  container.innerHTML = `
    <div class="upload-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('upload.title')}</h1>
      <p class="subtitle">${i18n.t('upload.subtitle')}</p>

      <div class="form-group">
        <label>${i18n.t('upload.photo')}</label>
        <div class="image-upload-area" id="upload-area">
          <div class="upload-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>${i18n.t('upload.tapPhoto')}</span>
            <small>${i18n.t('upload.photoNote')}</small>
          </div>
          <input type="file" id="upload-file" accept="image/*" style="display:none" />
        </div>
      </div>

      <div class="form-group">
        <label>${i18n.t('upload.lookTitle')}</label>
        <input type="text" id="upload-title" placeholder="${i18n.t('upload.titlePlaceholder')}" maxlength="60" />
      </div>

      <div class="form-group">
        <label>${i18n.t('upload.colors')}</label>
        <textarea id="upload-colors" placeholder="${i18n.t('upload.colorsPlaceholder')}"></textarea>
      </div>

      <button class="upload-submit" id="upload-submit-btn">${i18n.t('upload.submit')}</button>
    </div>
  `;

  const area = container.querySelector('#upload-area');
  const fileInput = container.querySelector('#upload-file');
  const titleInput = container.querySelector('#upload-title');
  const colorsInput = container.querySelector('#upload-colors');
  const submitBtn = container.querySelector('#upload-submit-btn');

  function updatePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      area.classList.add('has-image');
      area.innerHTML = `
        <img src="${e.target.result}" alt="Preview" />
        <button class="change-photo" id="change-photo">${i18n.t('upload.change')}</button>
        <input type="file" id="upload-file" accept="image/*" style="display:none" />
      `;
      currentFile = e.target.result;
      area.querySelector('#change-photo').addEventListener('click', (ev) => {
        ev.stopPropagation();
        area.querySelector('#upload-file').click();
      });
      area.querySelector('#upload-file').addEventListener('change', (ev) => {
        if (ev.target.files[0]) updatePreview(ev.target.files[0]);
      });
    };
    reader.readAsDataURL(file);
  }

  area.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) updatePreview(e.target.files[0]);
  });

  function resetForm() {
    titleInput.value = '';
    colorsInput.value = '';
    currentFile = null;
    area.classList.remove('has-image');
    area.innerHTML = `
      <div class="upload-placeholder">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>${i18n.t('upload.tapPhoto')}</span>
        <small>${i18n.t('upload.photoNote')}</small>
      </div>
      <input type="file" id="upload-file" accept="image/*" style="display:none" />
    `;
    const newFileInput = area.querySelector('#upload-file');
    area.addEventListener('click', () => newFileInput.click());
    newFileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) updatePreview(e.target.files[0]);
    });
  }

  submitBtn.addEventListener('click', () => {
    if (!currentFile) {
      showToast(i18n.t('upload.needPhoto'));
      return;
    }
    const title = titleInput.value.trim();
    const colors = colorsInput.value.trim();

    store.addUpload(currentFile, title, colors);
    showToast(i18n.t('upload.saved'), 'success');
    resetForm();
  });
}
