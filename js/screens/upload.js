import { showToast } from '../utils.js';
import { store } from '../store.js';

let currentFile = null;

export function renderUpload() {
  const container = document.getElementById('screen-upload');
  if (!container) return;

  container.innerHTML = `
    <div class="upload-screen">
      <div class="brand">tiyu salon tokyo</div>
      <h1>Inspo for Tiyu</h1>
      <p class="subtitle">Share looks you love — saved privately to your wishlist</p>

      <div class="form-group">
        <label>Inspiration Photo</label>
        <div class="image-upload-area" id="upload-area">
          <div class="upload-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Tap to add a photo</span>
            <small>Show this to Tiyu during your visit</small>
          </div>
          <input type="file" id="upload-file" accept="image/*" style="display:none" />
        </div>
      </div>

      <div class="form-group">
        <label>Look Title</label>
        <input type="text" id="upload-title" placeholder="e.g. Soft Ombré French" maxlength="60" />
      </div>

      <div class="form-group">
        <label>Colors &amp; Details</label>
        <textarea id="upload-colors" placeholder="Base: OPI Funny Bunny&#10;Accent: Essie Blanc&#10;Gold foil accents"></textarea>
      </div>

      <button class="upload-submit" id="upload-submit-btn">Save to Wishlist</button>
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
        <button class="change-photo" id="change-photo">Change</button>
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
        <span>Tap to add a photo</span>
        <small>Show this to Tiyu during your visit</small>
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
      showToast('Please add a photo first');
      return;
    }
    const title = titleInput.value.trim();
    const colors = colorsInput.value.trim();

    store.addUpload(currentFile, title, colors);
    showToast('Saved to your wishlist', 'success');
    resetForm();
  });
}
