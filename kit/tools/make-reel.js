// Builds a Reel from the template with a settings file, then renders it.
// Usage: node kit/tools/make-reel.js <work-dir> <cfg.json> [still a@1 s0@3 …]
//   cfg.json = window.CFG for kit/templates/reel/reel.html. Images it names must already be in <work-dir>.
//   "hl": "@name" in a shot means: take the highlight box from <work-dir>/name.json (written by grab.js).
// Writes <work-dir>/reel.mp4 and cover.jpg (or still-*.jpg frames when "still" is given).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const [,, dirArg, cfgArg, ...rest] = process.argv;
const dir = path.resolve(dirArg);
const kit = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(cfgArg, 'utf8'));
for (const sh of cfg.shots || []) {
  if (typeof sh.hl === 'string' && sh.hl.startsWith('@')) sh.hl = JSON.parse(fs.readFileSync(path.join(dir, sh.hl.slice(1) + '.json'), 'utf8')).hl;
}
let html = fs.readFileSync(path.join(kit, 'templates/reel/reel.html'), 'utf8');
html = html.replace('href="../../assets/fonts.css"', `href="file://${path.join(kit, 'assets/fonts.css')}"`);
html = html.replace(/window\.CFG = \{[\s\S]*?\n\};/, `window.CFG = ${JSON.stringify(cfg, null, 1)};`);
fs.writeFileSync(path.join(dir, 'reel.html'), html);
fs.copyFileSync(path.join(kit, 'templates/reel/reel.js'), path.join(dir, 'reel.js'));
execFileSync(process.execPath, [path.join(__dirname, 'reel.js'), dir, ...rest], { stdio: 'inherit' });
