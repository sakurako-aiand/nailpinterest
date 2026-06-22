import { DATA, PRICING } from '../data.js';
import { i18n } from '../i18n.js';
import { showToast, navigateTo } from '../utils.js';
import { openBookingModal } from './booking.js';

const HAND_SVG = `<svg viewBox="0 0 300 460" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skinG" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#F4EADE"/>
      <stop offset="100%" stop-color="#E6D5C6"/>
    </linearGradient>
    <filter id="handShadow"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <ellipse cx="152" cy="430" rx="50" ry="8" fill="rgba(0,0,0,0.06)"/>
  <rect x="128" y="380" width="48" height="48" rx="18" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="150" cy="325" rx="68" ry="82" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="80" cy="258" rx="19" ry="55" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(-33 80 258)"/>
  <ellipse cx="115" cy="178" rx="18" ry="73" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(-6 115 178)"/>
  <ellipse cx="155" cy="155" rx="19" ry="85" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8"/>
  <ellipse cx="195" cy="172" rx="18" ry="77" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(7 195 172)"/>
  <ellipse cx="230" cy="212" rx="16" ry="60" fill="url(#skinG)" stroke="#DBC9BA" stroke-width="0.8" transform="rotate(18 230 212)"/>
  <ellipse cx="51" cy="210" rx="14" ry="11" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(-33 51 210)"/>
  <ellipse cx="108" cy="103" rx="13" ry="10" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(-6 108 103)"/>
  <ellipse cx="155" cy="68" rx="15" ry="12" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5"/>
  <ellipse cx="206" cy="93" rx="14" ry="11" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(7 206 93)"/>
  <ellipse cx="248" cy="156" rx="11" ry="9" fill="#F0E5DC" stroke="#DBC9BA" stroke-width="0.5" transform="rotate(18 248 156)"/>
</svg>`;

const NAILS = [
  { id: 'thumb',  cx: 51,  cy: 210, w: 32, h: 26, rot: -33 },
  { id: 'index',  cx: 108, cy: 103, w: 30, h: 24, rot: -6 },
  { id: 'middle', cx: 155, cy: 68,  w: 36, h: 28, rot: 0 },
  { id: 'ring',   cx: 206, cy: 93,  w: 32, h: 26, rot: 7 },
  { id: 'pinky',  cx: 248, cy: 156, w: 26, h: 22, rot: 18 },
];

let selectedDesign = null;
let appliedDesigns = {};

export function openCanvas(preselectedItem = null) {
  const view = document.getElementById('canvas-view');
  if (!view) return;

  for (const id of ['detail-view', 'estimator-view', 'policy-view']) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active'); el.style.display = 'none'; }
  }
  document.documentElement.style.overflow = 'hidden';

  selectedDesign = preselectedItem;
  appliedDesigns = {};
  render(view);
  view.style.display = 'block';
  requestAnimationFrame(() => { view.classList.add('active'); });
  view.scrollTop = 0;
}

export function closeCanvas() {
  const view = document.getElementById('canvas-view');
  if (!view) return;
  view.classList.remove('active');
  setTimeout(() => { view.style.display = 'none'; view.innerHTML = ''; }, 300);
  document.documentElement.style.overflow = '';
  selectedDesign = null;
  appliedDesigns = {};
}

function render(view) {
  const filledCount = Object.keys(appliedDesigns).length;

  view.innerHTML = `
    <div class="detail-header">
      <button class="back-btn" id="canvas-back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        ${i18n.t('detail.back')}
      </button>
      <button class="canvas-clear-btn" id="canvas-clear">${i18n.t('canvas.clearAll')}</button>
    </div>
    <div class="canvas-screen">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h1>${i18n.t('canvas.title')}</h1>
      <p class="canvas-hint" id="canvas-hint">${selectedDesign ? i18n.t('canvas.tapFinger') : i18n.t('canvas.selectDesign')}</p>

      <div class="hand-container" id="hand-container">
        <div class="hand-svg-wrap" id="hand-svg">${HAND_SVG}</div>
        ${NAILS.map(n => {
          const design = appliedDesigns[n.id];
          const pct = (v, max) => (v / max) * 100;
          return `
            <div class="nail-zone ${design ? 'has-design' : ''} ${selectedDesign && !design ? 'ready' : ''}"
                 data-nail="${n.id}"
                 style="left:${pct(n.cx,300)}%;top:${pct(n.cy,460)}%;width:${pct(n.w,300)}%;height:${pct(n.h,460)}%;transform:translate(-50%,-50%) rotate(${n.rot}deg)">
              ${design ? `<img src="${design.image}" alt="${design.title}" class="nail-image" />` : ''}
              ${design ? `<button class="nail-remove" data-nail="${n.id}">&times;</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div class="design-strip-header">
        <span>${i18n.t('canvas.gallery')}</span>
      </div>
      <div class="design-strip" id="design-strip">
        ${DATA.feed.map(item => `
          <div class="design-thumb ${selectedDesign?.id === item.id ? 'selected' : ''}" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
        `).join('')}
      </div>

      <button class="finalize-btn ${filledCount > 0 ? '' : 'disabled'}" id="finalize-btn" ${filledCount === 0 ? 'disabled' : ''}>
        ${i18n.t('canvas.finalize')} (${filledCount}/5)
      </button>
    </div>
  `;

  view.querySelector('#canvas-back').addEventListener('click', () => closeCanvas());

  view.querySelector('#canvas-clear')?.addEventListener('click', () => {
    appliedDesigns = {};
    render(view);
  });

  view.querySelectorAll('.design-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const item = DATA.feed.find(p => p.id === thumb.dataset.id);
      if (!item) return;
      selectedDesign = selectedDesign?.id === item.id ? null : item;
      render(view);
    });
  });

  view.querySelectorAll('.nail-zone').forEach(zone => {
    zone.addEventListener('click', (e) => {
      if (e.target.classList.contains('nail-remove')) {
        e.stopPropagation();
        delete appliedDesigns[zone.dataset.nail];
        render(view);
        return;
      }
      if (!selectedDesign) {
        showToast(i18n.t('canvas.selectFirst'));
        return;
      }
      appliedDesigns[zone.dataset.nail] = { ...selectedDesign };
      showToast(i18n.t('canvas.applied'), 'success');
      render(view);
    });
  });

  view.querySelector('#finalize-btn').addEventListener('click', async () => {
    if (Object.keys(appliedDesigns).length === 0) return;
    await finalizeLook(view);
  });
}

async function finalizeLook(view) {
  const btn = view.querySelector('#finalize-btn');
  btn.textContent = i18n.t('canvas.generating');
  btn.disabled = true;

  try {
    const dataUrl = await generateCanvasImage();
    showFinalResult(view, dataUrl);
  } catch (e) {
    console.error('Canvas generation error:', e);
    showToast(i18n.t('canvas.generateError'));
    btn.textContent = i18n.t('canvas.finalize');
    btn.disabled = false;
  }
}

async function generateCanvasImage() {
  const W = 300, H = 460, scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.fillStyle = '#FCFBF7';
  ctx.fillRect(0, 0, W, H);

  const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(HAND_SVG);
  const handImg = new Image();
  handImg.src = svgUrl;
  await new Promise((res, rej) => { handImg.onload = res; handImg.onerror = rej; });
  ctx.drawImage(handImg, 0, 0, W, H);

  for (const nail of NAILS) {
    const design = appliedDesigns[nail.id];
    if (!design) continue;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = design.image;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

    ctx.save();
    ctx.translate(nail.cx, nail.cy);
    ctx.rotate(nail.rot * Math.PI / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, nail.w / 2, nail.h / 2, 0, 0, Math.PI * 2);
    ctx.clip();

    const ir = img.width / img.height;
    const nr = nail.w / nail.h;
    let dw, dh;
    if (ir > nr) { dh = nail.h; dw = dh * ir; } else { dw = nail.w; dh = dw / ir; }
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }

  ctx.fillStyle = '#A38874';
  ctx.font = '600 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('tiyu salon tokyo', W / 2, H - 12);

  return canvas.toDataURL('image/png');
}

function showFinalResult(view, dataUrl) {
  const overlay = document.createElement('div');
  overlay.className = 'canvas-result-overlay';
  overlay.innerHTML = `
    <div class="canvas-result-modal">
      <div class="brand">${i18n.t('home.brand')}</div>
      <h2>${i18n.t('canvas.resultTitle')}</h2>
      <div class="result-image-wrap">
        <img src="${dataUrl}" alt="Your Tiyu Canvas Look" />
      </div>
      <div class="result-actions">
        <button class="result-btn primary" id="send-to-tiyu">${i18n.t('canvas.sendToTiyu')}</button>
        <button class="result-btn" id="save-image">${i18n.t('canvas.saveImage')}</button>
        <button class="result-btn" id="book-after">${i18n.t('canvas.bookAfter')}</button>
        <button class="result-btn ghost" id="close-result">${i18n.t('canvas.close')}</button>
      </div>
    </div>
  `;
  view.appendChild(overlay);
  view.querySelector('#send-to-tiyu').addEventListener('click', () => shareLook(dataUrl));
  view.querySelector('#save-image').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'tiyu-canvas-look.png';
    a.click();
    showToast(i18n.t('canvas.savedImage'), 'success');
  });
  view.querySelector('#book-after').addEventListener('click', () => {
    overlay.remove();
    closeCanvas();
    openBookingModal();
  });
  view.querySelector('#close-result').addEventListener('click', () => overlay.remove());
}

async function shareLook(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'tiyu-canvas-look.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'My Tiyu Canvas Look',
        text: i18n.t('canvas.shareText'),
        files: [file],
      });
    } else {
      const subject = encodeURIComponent('My Tiyu Canvas - Custom Nail Design');
      const body = encodeURIComponent(
        i18n.t('canvas.emailBody')
      );
      window.location.href = `mailto:tiyusalontokyo@gmail.com?subject=${subject}&body=${body}`;
      showToast(i18n.t('canvas.emailOpened'));
    }
  } catch (e) {
    showToast(i18n.t('canvas.shareFallback'));
  }
}
