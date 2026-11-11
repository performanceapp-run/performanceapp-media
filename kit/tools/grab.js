// Captures single app cards (crisp, 1080 px per 390 pt) for posts, with the sample runner (see sample-app.js),
// plus where to draw a highlight inside each card.
// Usage: node kit/tools/grab.js <app-dir> <out-dir> <spec.json>
// spec.json: [{ "name": "cadence", "hash": "#/progress" | "run:Long Run" (the latest run whose row matches) | "compare:Tempo Run" (two such runs, oldest vs latest),
//   "card": "Splits per" (regex; the smallest section.card / details / .card containing it; omit for the whole page),
//   "hl": { "text": "regex" } (smallest element containing it) | { "column": 4 } (nth column of table.laps, 1-based),
//   "before": "JS to run first, e.g. open a <details>", "pro": true (make the sample runner Pro first), "units": "mi",
//   "share": "JS that makes the app share an image, e.g. sharePeriodCard('week', -1)" (saves that share card instead) }]
// Output: <out-dir>/<name>.png and <out-dir>/<name>.json = { w, h, hl: [x, y, w, h] } in that PNG's pixels.
const path = require('path');
const fs = require('fs');
const { start } = require('./sample-app');
const [,, appArg, outArg, specArg] = process.argv;
const OUT = path.resolve(outArg);
fs.mkdirSync(OUT, { recursive: true });
const spec = JSON.parse(fs.readFileSync(specArg, 'utf8'));
(async () => {
  const app = await start(appArg);
  const { page, BASE } = app;
  const S = 1080 / 390;
  try {
    for (const g of spec) {
      await app.setPro(!!g.pro); await app.setUnits(g.units || 'km');
      const hash = g.hash.startsWith('run:') ? await app.runHash(g.hash.slice(4)) : g.hash.startsWith('compare:') ? await app.compareHash(g.hash.slice(8)) : g.hash;
      if (!hash) { console.log('no run for', g.name); continue; }
      await page.goto(`${BASE}/?g=${Date.now()}${hash}`); await page.waitForTimeout(2000);
      await page.addStyleTag({ content: '.tabbar{display:none!important} header,.topbar{position:static!important}' });
      if (g.before) { await page.evaluate(g.before); await page.waitForTimeout(500); }
      if (g.share) {
        // The app's own share image: catch what it would share instead of opening the share sheet.
        await page.evaluate(() => { window.__shot = null; window.shareImage = (b) => new Promise((res) => { const fr = new FileReader(); fr.onload = () => { window.__shot = fr.result; res(); }; fr.readAsDataURL(b); }); });
        await page.evaluate(g.share);
        await page.waitForFunction(() => window.__shot, null, { timeout: 20000 });
        const url = await page.evaluate(() => window.__shot);
        fs.writeFileSync(path.join(OUT, `${g.name}.png`), Buffer.from(url.split(',')[1], 'base64'));
        console.log('saved', g.name, '(share image)');
        continue;
      }
      const info = await page.evaluate(({ card, hl }) => {
        const all = [...document.querySelectorAll('section.card, details.sess, .card')];
        let el = document.querySelector('#view');
        if (card) {
          const re = new RegExp(card);
          const hits = all.filter((x) => re.test(x.innerText));
          if (!hits.length) return { error: 'card not found: ' + card };
          el = hits.sort((a, b) => a.innerText.length - b.innerText.length)[0];
        }
        el.scrollIntoView({ block: 'start' });
        const r = el.getBoundingClientRect();
        let box = null;
        if (hl && hl.text) {
          const re = new RegExp(hl.text);
          const c = [...el.querySelectorAll('*')].filter((x) => re.test(x.innerText || '') && x.getBoundingClientRect().width > 0);
          const t = c.sort((a, b) => a.innerText.length - b.innerText.length)[0];
          if (t) { const q = t.getBoundingClientRect(); box = [q.left - r.left, q.top - r.top, q.width, q.height]; }
        } else if (hl && hl.column) {
          const cells = [...el.querySelectorAll(`table.laps tr > :nth-child(${hl.column})`)].map((x) => x.getBoundingClientRect());
          if (cells.length) { const L = Math.min(...cells.map((q) => q.left)), T = Math.min(...cells.map((q) => q.top)), R = Math.max(...cells.map((q) => q.right)), B = Math.max(...cells.map((q) => q.bottom)); box = [L - r.left, T - r.top, R - L, B - T]; }
        }
        el.setAttribute('data-grab', '1');
        return { w: r.width, h: r.height, hl: box };
      }, { card: g.card, hl: g.hl });
      if (info.error) { console.log(g.name, info.error); continue; }
      const el = await page.$('[data-grab="1"]');
      await el.screenshot({ path: path.join(OUT, `${g.name}.png`) });
      await page.evaluate(() => document.querySelector('[data-grab]').removeAttribute('data-grab'));
      fs.writeFileSync(path.join(OUT, `${g.name}.json`), JSON.stringify({ w: Math.round(info.w * S), h: Math.round(info.h * S), hl: info.hl && info.hl.map((v) => Math.round(v * S)) }));
      console.log('saved', g.name, info.hl ? 'with highlight' : '');
    }
  } finally { await app.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
