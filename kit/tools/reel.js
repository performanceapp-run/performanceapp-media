// Renders a Reel page to an MP4 (1080×1920, 30 fps, H.264) plus a cover JPEG.
// Usage: node kit/tools/reel.js <dir>   (reads <dir>/reel.html, writes <dir>/reel.mp4 and <dir>/cover.jpg)
//        node kit/tools/reel.js <dir> still b@4 c@2   (check frames → <dir>/still-b-4.jpg …)
// The page must define, on window: render(sceneId, seconds), dur(sceneId), SCENES (ids in order),
// COVER ('scene@seconds'). The frame is the element with id "s". See kit/examples/reel-heart-rate.
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const [,, dirArg, mode, ...frames] = process.argv;
const dir = path.resolve(dirArg);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + path.join(dir, 'reel.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const el = await p.$('#s');
  const still = async (spec, file) => { const [id, t] = spec.split('@'); await p.evaluate(([i, tt]) => render(i, +tt), [id, t]); await el.screenshot({ path: file, type: 'jpeg', quality: 92 }); };
  if (mode === 'still') { for (const f of frames) await still(f, path.join(dir, `still-${f.replace('@', '-')}.jpg`)); }
  else {
    const scenes = await p.evaluate(() => window.SCENES);
    const parts = [];
    for (const id of scenes) {
      const n = Math.round((await p.evaluate((i) => dur(i), id)) * 30);
      const tmp = path.join(dir, `_${id}.tmp.mp4`), out = path.join(dir, `_${id}.mp4`);
      const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30', tmp]);
      for (let f = 0; f < n; f++) { await p.evaluate(([i, t]) => render(i, t), [id, f / 30]); const buf = await el.screenshot({ type: 'jpeg', quality: 92 }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
      ff.stdin.end();
      if ((await new Promise((r) => ff.on('close', r))) !== 0) throw new Error('ffmpeg failed on scene ' + id);
      fs.renameSync(tmp, out); parts.push(out);
    }
    const list = path.join(dir, '_list.txt');
    fs.writeFileSync(list, parts.map((x) => `file '${x}'`).join('\n'));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', path.join(dir, 'reel.mp4')]);
    for (const x of [...parts, list]) fs.unlinkSync(x);
    await still(await p.evaluate(() => window.COVER), path.join(dir, 'cover.jpg'));
  }
  if (errs.length) console.log('page errors:', errs);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
