import { showToast, navigateTo } from '../utils.js';
import { store } from '../store.js';

let currentFile = null;

export function renderUpload() {
  const container = document.getElementById('screen-upload');
  if (!container) return;

  container.innerHTML = `
    <div class="upload-screen">
      <h1>Upload</h1>
      <p class="subtitle">Your Private Collection</p>

      <div class="form-group">
        <label>Photo</label>
        <div class="image-upload-area" id="upload-area">
          <div class="upload-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Tap to add a photo</span>
            <small>Your photo stays private</small>
          </div>
          <input type="file" id="upload-file" accept="image/*" style="display:none" />
        </div>
      </div>

      <div class="form-group">
        <label>Title</label>
        <input type="text" id="upload-title" placeholder="e.g. Summer Ombré" maxlength="60" />
      </div>

      <div class="form-group">
        <label>The Palette</label>
        <textarea id="upload-colors" placeholder="Base: OPI Funny Bunny&#10;Accent: Essie Blanc&#10;Top Coat: Seche Vite"></textarea>
      </div>

      <button class="upload-submit" id="upload-submit-btn">Save to Collection</button>
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
        <button class="change-photo" id="change-photo">Change Photo</button>
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

  submitBtn.addEventListener('click', () => {
    if (!currentFile) {
      showToast('Please add a photo first');
      return;
    }
    const title = titleInput.value.trim();
    const colors = colorsInput.value.trim();
    if (!colors) {
      showToast('Please enter the colors used');
      return;
    }

    store.addUpload(currentFile, title, colors);
    showToast('Saved to your collection!', 'success');

    titleInput.value = '';
    colorsInput.value = '';
    currentFile = null;
    area.classList.remove('has-image');
    area.innerHTML = `
      <div class="upload-placeholder">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Tap to add a photo</span>
        <small>Your photo stays private</small>
      </div>
      <input type="file" id="upload-file" accept="image/*" style="display:none" />
    `;
    const newFileInput = area.querySelector('#upload-file');
    area.addEventListener('click', () => newFileInput.click());
    newFileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) updatePreview(e.target.files[0]);
    });
  });
}
