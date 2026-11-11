// Carousel engine (1080×1350 slides) for templates/carousel. Builds slides from window.SLIDES:
// { type: 'cover', k, h, p }  ·  { type: 'img', k, h, p, img, crop: [y, height] (img pixels, optional), tag }
// { type: 'list', k, h, items: [[title, text], …] }  ·  { type: 'cta', h, p }
// Text: <span class="acc">…</span> for lime words, <br> for lines. Slide numbers are added automatically.
(function () {
  const S = window.SLIDES, n = S.length;
  const host = document.getElementById('host');
  S.forEach((s, i) => {
    const el = document.createElement('div'); el.className = 's'; host.appendChild(el);
    const num = i > 0 && i < n - 1 ? `<div class="n">${i} / ${n - 2}</div>` : '';
    if (s.type === 'cover') {
      el.innerHTML = `<div class="glow"></div><div class="brand">PERFORMANCEAPP<span>.RUN</span></div>
        <div style="margin-top:120px"><div class="k">${s.k || ''}</div><h1 class="h" style="font-size:${s.size || 150}px">${s.h}</h1>
        ${s.p ? `<p class="p" style="max-width:none;font-size:40px">${s.p}</p>` : ''}</div><div class="swipe">Swipe →</div>`;
    } else if (s.type === 'img') {
      el.innerHTML = `<div class="glow"></div><div class="k">${s.k || ''}</div><h1 class="h">${s.h}</h1>
        ${s.p ? `<p class="p wide">${s.p}</p>` : ''}${s.tag ? `<span class="tag">${s.tag}</span>` : ''}
        <div class="shot"><img src="${s.img}" data-crop="${(s.crop || []).join(',')}"></div>${num}${s.note === false ? '' : '<div class="note">Sample run</div>'}`;
    } else if (s.type === 'list') {
      el.innerHTML = `<div class="glow"></div><div class="k">${s.k || ''}</div><h1 class="h">${s.h}</h1>
        <ul class="list">${s.items.map(([t, x], j) => `<li><b>${String(j + 1).padStart(2, '0')}</b><span>${t}<small>${x}</small></span></li>`).join('')}</ul>${num}`;
    } else {
      el.innerHTML = `<div class="glow"></div><div style="position:absolute;left:80px;right:80px;top:300px">
        <h1 class="h" style="font-size:${s.size || 130}px">${s.h}</h1>${s.p ? `<p class="p" style="max-width:none;font-size:38px">${s.p}</p>` : ''}</div>
        <div style="position:absolute;left:80px;bottom:150px"><div class="brand" style="font-size:56px">PERFORMANCEAPP<span>.RUN</span></div>
        <div class="tag" style="font-size:40px;padding:22px 44px">Free to start · Link in bio</div></div>`;
    }
  });
  // Fit each screenshot into the space below the text: scale to 920 wide, crop to the chosen band, anchor at the bottom.
  window.layout = () => document.querySelectorAll('.s').forEach((el) => {
    const shot = el.querySelector('.shot'); if (!shot) return;
    const img = shot.querySelector('img');
    const textBottom = Math.max(...[...el.querySelectorAll('.h,.p,.tag')].map((x) => x.offsetTop + x.offsetHeight));
    const top = textBottom + 50, avail = 1350 - 130 - top;
    const sc = 920 / img.naturalWidth;
    const [cy, ch] = (img.dataset.crop || '').split(',').map(Number);
    const bandY = Number.isFinite(cy) ? cy * sc : 0, bandH = Math.min(avail, Number.isFinite(ch) ? ch * sc : img.naturalHeight * sc - bandY);
    shot.style.top = top + 'px'; shot.style.height = bandH + 'px';
    img.style.width = '920px'; img.style.marginTop = (-bandY) + 'px';
  });
})();
