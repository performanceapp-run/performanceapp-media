// Fresh full screenshots of the main app screens with the sample runner (see sample-app.js).
// Usage: node kit/tools/shoot.js <app-dir> <out-dir>     (<app-dir>: clone of AhmedFrz/performance_app after `npm ci`)
// Output: <out-dir>/<name>.png, 1080 px wide. Full-page shots are tall; crop with PIL, or use grab.js for single cards.
const path = require('path');
const fs = require('fs');
const { start } = require('./sample-app');
const [,, appArg, outArg] = process.argv;
const OUT = path.resolve(outArg);
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const app = await start(appArg);
  const { page, BASE } = app;
  try {
    const shot = async (hash, name, { full = false, before } = {}) => {
      await page.goto(`${BASE}/${hash}`); await page.waitForTimeout(1800);
      if (before) await page.evaluate(before);
      if (full) await page.addStyleTag({ content: '.tabbar{display:none!important} header,.topbar{position:static!important}' });
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
      console.log('saved', name);
    };
    await shot('#/home', 'home');
    await shot('#/home', 'home-full', { full: true });
    await shot('#/runs', 'runs');
    for (const [re, name] of [['Long Run', 'run-long'], ['Tempo Run', 'run-tempo'], ['10K', 'run-10k'], ['Easy Run', 'run-easy']]) {
      const h = await app.runHash(re); if (h) await shot(h, name, { full: true });
    }
    await shot('#/progress', 'progress', { full: true });
    await shot('#/plan', 'plan-week', { full: true, before: () => { const d = [...document.querySelectorAll('details.sess')]; d.forEach((x) => { x.open = false; }); const l = d.find((x) => /Long run/.test(x.textContent)); if (l) l.open = true; } });
    await shot('#/plan/w2', 'plan-week2', { full: true, before: () => { const d = document.querySelectorAll('details.sess'); if (d[1]) d[1].open = true; } });
    await shot('#/plan/w6', 'plan-locked', { full: true });
    await shot('#/plan/all', 'plan-overview', { full: true });
    await shot('#/plan/setup', 'plan-setup', { full: true });
    await shot('#/rewards', 'rewards', { full: true });
    await shot('#/story', 'story', { full: true });
    await shot('#/plans', 'free-vs-pro', { full: true });
    await shot('#/me', 'me', { full: true });
  } finally { await app.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
