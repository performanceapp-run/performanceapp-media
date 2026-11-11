// Builds a carousel from the template with a slide list, then renders slide-1.png … slide-N.png.
// Usage: node kit/tools/make-slides.js <work-dir> <slides.json>   (images it names must be in <work-dir>)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const [,, dirArg, specArg] = process.argv;
const dir = path.resolve(dirArg), kit = path.resolve(__dirname, '..');
const slides = JSON.parse(fs.readFileSync(specArg, 'utf8'));
let html = fs.readFileSync(path.join(kit, 'templates/carousel/slides.html'), 'utf8')
  .replace('href="../../assets/fonts.css"', `href="file://${path.join(kit, 'assets/fonts.css')}"`)
  .replace(/window\.SLIDES = \[[\s\S]*?\];<\/script>/, `window.SLIDES = ${JSON.stringify(slides)};</script>`);
fs.writeFileSync(path.join(dir, 'slides.html'), html);
fs.copyFileSync(path.join(kit, 'templates/carousel/slides.js'), path.join(dir, 'slides.js'));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + path.join(dir, 'slides.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => [...document.images].every((i) => i.complete));
  await p.evaluate(() => window.layout()); await p.waitForTimeout(300);
  const els = await p.$$('.s');
  for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `slide-${i + 1}.png`) });
  console.log(`${els.length} slides`);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
