// Scene engine for templates/reel/reel.html: builds the scenes from window.CFG and exposes render/dur/SCENES/COVER.
(function () {
  const C = window.CFG;
  const $ = (i) => document.getElementById(i);
  const cl = (x) => Math.max(0, Math.min(1, x)), ease = (x) => 1 - Math.pow(1 - cl(x), 3), io = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const up = (el, t, t0, d = 0.5, dist = 80, extra = '') => { if (!el) return; const k = ease((t - t0) / d); el.style.opacity = k; el.style.transform = `${extra} translateY(${(1 - k) * dist}px)`; };
  const host = $('scenes');
  const S = {}; const order = [];
  const add = (id, dur, html, fn) => { const d = document.createElement('div'); d.className = 'scene'; d.id = id; d.innerHTML = html; host.appendChild(d); S[id] = [dur, fn]; order.push(id); };
  const note = C.note ? `<div class="note" data-note>${C.note}</div>` : '';

  add('h', C.hook.dur || 3, `<div class="big" style="top:${C.hook.bottom ? 480 : 640}px;font-size:${C.hook.size || 180}px" data-a>${C.hook.top}</div>
    ${C.hook.bottom ? `<div class="big acc" style="top:${C.hook.bottomTop || 1000}px;font-size:${C.hook.size2 || 140}px" data-b>${C.hook.bottom}</div>` : ''}`,
  (t, el) => { up(el.querySelector('[data-a]'), t, 0.1, 0.6, 120); up(el.querySelector('[data-b]'), t, 1.0, 0.6, 120); });

  (C.shots || []).forEach((sh, i) => {
    const id = 's' + i;
    add(id, sh.dur || 5.5, `<div class="cap" data-c1>${sh.cap}</div>${sh.cap2 ? `<div class="cap" data-c2 style="opacity:0">${sh.cap2}</div>` : ''}
      <div class="frame" data-f><div class="wrap" data-w><img src="${sh.img}" data-i>${sh.hl ? `<div class="hl" data-h></div>${sh.hlText ? `<div class="hlt" data-ht>${sh.hlText}</div>` : ''}` : ''}</div></div>${note}`,
    (t, el) => {
      const img = el.querySelector('[data-i]'), w = el.querySelector('[data-w]'), f = el.querySelector('[data-f]');
      const iw = img.naturalWidth || 1080, ih = img.naturalHeight || 1000, sc = Math.min(1, 940 / iw), H = ih * sc;
      f.style.height = Math.min(1330, H) + 'px';
      if (H < 1330) f.style.top = (480 + (1330 - H) / 2 - 40) + 'px';
      up(f, t, 0.05, 0.6, 200);
      const swap = sh.swap || 2.6, k2 = sh.cap2 ? cl((t - swap) / 0.4) : 0;
      const c1 = el.querySelector('[data-c1]'), c2 = el.querySelector('[data-c2]');
      c1.style.opacity = (t < 0.5 ? ease(t / 0.5) : 1) * (1 - k2); c1.style.transform = `translateY(${-k2 * 40}px)`;
      if (c2) { c2.style.opacity = k2; c2.style.transform = `translateY(${(1 - k2) * 40}px)`; }
      let scroll = 0;
      if (H > 1330) {
        const want = sh.hl ? Math.min(H - 1330, Math.max(0, (sh.hl[1] + sh.hl[3]) * sc - 1330 + 80)) : H - 1330;
        scroll = io(cl((t - (sh.scrollAt || 1.6)) / (sh.scrollDur || 3))) * want;
      }
      w.style.transform = `translateY(${-scroll}px) scale(${sc})`;
      const h = el.querySelector('[data-h]');
      if (h) {
        const [x, y, bw, bh] = sh.hl, pad = sh.pad != null ? sh.pad : (sh.grow ? 3 : 10), at = sh.hlAt || 1.2;
        const g = sh.grow ? io(cl((t - at) / 2.6)) : 1;
        h.style.left = (x - pad) + 'px'; h.style.top = (y - pad) + 'px'; h.style.width = (bw + 2 * pad) + 'px';
        h.style.height = (sh.grow ? 90 + g * (bh + 2 * pad - 90) : bh + 2 * pad) + 'px';
        h.style.opacity = cl((t - at) / 0.3);
        h.style.borderWidth = (7 / sc) + 'px';
        const ht = el.querySelector('[data-ht]');
        if (ht) { ht.style.left = (x - pad) + 'px'; ht.style.top = (y - pad - 10) + 'px'; ht.style.fontSize = (30 / sc) + 'px'; ht.style.opacity = cl((t - at - 0.2) / 0.3); }
      }
      const n = el.querySelector('[data-note]'); if (n) n.style.opacity = cl((t - 0.4) / 0.4);
    });
  });

  if (C.say) {
    const big = !C.say.img;
    add('x', C.say.dur || 5, `<div class="${big ? 'big' : 'cap'}" data-c style="${big ? 'top:520px;font-size:150px' : ''}">${C.say.cap}</div>
      ${C.say.img ? `<img data-i src="${C.say.img}" style="position:absolute;width:940px;left:70px;top:470px;border-radius:36px">` : ''}
      ${C.say.sub ? `<div class="sub" data-s style="top:${big ? 1030 : 1400}px;font-size:${big ? 54 : 44}px">${C.say.sub}</div>` : ''}${C.say.img ? note : ''}`,
    (t, el) => {
      const img = el.querySelector('[data-i]'), sub = el.querySelector('[data-s]');
      if (img && sub && img.naturalWidth) sub.style.top = Math.min(1700, 470 + img.naturalHeight * (940 / img.naturalWidth) + 70) + 'px';
      up(el.querySelector('[data-c]'), t, 0.05, 0.5, big ? 120 : 80); up(img, t, 0.2, 0.6, 160); up(sub, t, big ? 0.7 : 1.3, 0.6);
      const n = el.querySelector('[data-note]'); if (n) n.style.opacity = cl((t - 0.4) / 0.4);
    });
  }

  add('e', C.end.dur || 3.5, `<div class="brand" style="top:500px" data-0>PERFORMANCEAPP<span>.RUN</span></div>
    <div class="big" style="top:700px;font-size:150px" data-1>Know your run.<br><span class="acc">Know yourself.</span></div>
    <div class="sub" style="top:1050px" data-2>${C.end.sub || 'Every run explained, in plain words.'}</div>
    <div class="pill" style="top:1250px" data-3>Free to start · Link in bio</div>${C.end.tag ? `<div class="tag" data-4>${C.end.tag}</div>` : ''}`,
  (t, el) => { up(el.querySelector('[data-0]'), t, 0.05); up(el.querySelector('[data-1]'), t, 0.3); up(el.querySelector('[data-2]'), t, 0.7); up(el.querySelector('[data-3]'), t, 1.0, 0.5, 80, 'translateX(-50%)'); up(el.querySelector('[data-4]'), t, 1.3, 0.5, 60, 'translateX(-50%)'); });

  window.SCENES = order;
  window.COVER = C.cover || (C.shots && C.shots.length ? `s0@${Math.min((C.shots[0].dur || 5.5) - 0.6, 4)}` : 'h@2.5');
  window.dur = (id) => S[id][0];
  window.render = (id, t) => {
    for (const k of order) $(k).style.display = k === id ? 'block' : 'none';
    S[id][1](t, $(id));
    const d = S[id][0], fo = cl((t - (d - 0.25)) / 0.25), fi = id === order[0] ? 0 : cl(1 - t / 0.2);
    $('fade').style.opacity = Math.max(id === order[order.length - 1] ? 0 : fo, fi);
  };
})();
