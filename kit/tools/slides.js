// Renders each carousel slide (elements with class "s", 1080×1350) of <dir>/slides.html
// to <dir>/slide-1.png, slide-2.png … Usage: node kit/tools/slides.js <dir>
// See kit/examples/carousel-why.
const { chromium } = require('playwright');
const path = require('path');
const dir = path.resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + path.join(dir, 'slides.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const slides = await p.$$('.s');
  for (let i = 0; i < slides.length; i++) await slides[i].screenshot({ path: path.join(dir, `slide-${i + 1}.png`) });
  console.log(`${slides.length} slides`);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
