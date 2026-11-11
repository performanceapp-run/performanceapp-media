// Fresh screenshots of the real app with made-up sample runs (no real runner's data).
// Starts the app from a local clone on a throwaway local Postgres, signs in a sample runner,
// imports ~5 weeks of generated runs, adds a race (BYD Karachi Marathon, 3 Jan 2027, goal
// 4:30:00), answers the plan questions, then screenshots the main screens at phone size.
//
// Usage: node kit/tools/shoot.js <app-dir> <out-dir>
//   <app-dir>: a clone of AhmedFrz/performance_app with `npm ci` done.
// Needs Postgres 16 in the container (pg_ctlcluster); the script starts it and makes database pa_kit.
// Output: <out-dir>/<name>.png at 1080 px wide (390 pt × 2.77). Full-page shots are tall: crop with
// PIL to the part you need (e.g. the splits table or the heart-rate card of run-long.png).
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const [,, appArg, outArg] = process.argv;
const APP = path.resolve(appArg), OUT = path.resolve(outArg);
const req = (m) => require(path.join(APP, 'node_modules', m));
fs.mkdirSync(OUT, { recursive: true });

const DB = 'postgres://postgres:postgres@localhost:5432/pa_kit';
const SECRET = 'kit-secret-kit-secret-kit-secret-0123456789abcd';
const PORT = 3197, BASE = `http://localhost:${PORT}`;
const sh = (c) => { try { return execSync(c, { stdio: ['ignore', 'pipe', 'pipe'] }).toString(); } catch (e) { return String(e.stdout || '') + String(e.stderr || ''); } };

(async () => {
  sh('pg_ctlcluster 16 main start');
  await new Promise((r) => setTimeout(r, 1500));
  sh(`su postgres -c "psql -c \\"ALTER USER postgres PASSWORD 'postgres'\\""`);
  sh(`su postgres -c "psql -tc \\"SELECT 1 FROM pg_database WHERE datname='pa_kit'\\" | grep -q 1 || psql -c 'CREATE DATABASE pa_kit'"`);
  const { Pool } = req('pg');
  const pool = new Pool({ connectionString: DB });
  const server = spawn(process.execPath, ['server.js'], { cwd: APP, stdio: 'ignore',
    env: { ...process.env, DATABASE_URL: DB, SESSION_SECRET: SECRET, PORT: String(PORT), NODE_ENV: 'test', APP_URL: BASE, GARMIN_CLIENT_ID: 'kit' } });
  try {
    for (let i = 0; i < 60; i++) { try { if ((await fetch(`${BASE}/api/me`)).ok) break; } catch { /* starting */ } await new Promise((r) => setTimeout(r, 500)); }
    await pool.query(`CREATE TABLE IF NOT EXISTS sessions (sid varchar PRIMARY KEY, sess json NOT NULL, expire timestamp(6) NOT NULL)`);
    const u = await pool.query(`INSERT INTO users (google_sub, email, name, units) VALUES ('kit-sample', 'sample@kit.invalid', 'Sample Runner', 'km')
      ON CONFLICT (google_sub) DO UPDATE SET name = EXCLUDED.name RETURNING id`);
    const uid = Number(u.rows[0].id);
    for (const t of ['activities', 'races']) await pool.query(`DELETE FROM ${t} WHERE user_id = $1`, [uid]).catch(() => {});
    await pool.query('UPDATE goals SET plan_days = NULL, plan_race_id = NULL, plan_start = NULL, plan_free_start = NULL WHERE user_id = $1', [uid]).catch(() => {});
    const SID = 'kit-session';
    await pool.query(`INSERT INTO sessions (sid, sess, expire) VALUES ($1, $2, now() + interval '2 hours') ON CONFLICT (sid) DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire`,
      [SID, JSON.stringify({ cookie: { originalMaxAge: 7200000, path: '/', httpOnly: true }, userId: uid })]);
    const cookieValue = `s:${req('cookie-signature').sign(SID, SECRET)}`;
    const headers = { cookie: `pa.sid=${encodeURIComponent(cookieValue)}`, origin: BASE };
    const fx = require(path.join(APP, 'test', 'fixtures'));
    const fd = new FormData();
    for (const r of fx.sampleRuns()) fd.append('files', new Blob([r.gpx]), r.file);
    const up = await fetch(`${BASE}/api/uploads?tz=0`, { method: 'POST', body: fd, headers });
    if (!up.ok) throw new Error('import failed ' + up.status);
    await pool.query(`INSERT INTO races (user_id, name, race_date, distance_m, goal_time_s, is_main) VALUES ($1, 'BYD Karachi Marathon', '2027-01-03', 42195, 16200, true)`, [uid]);
    await fetch(`${BASE}/api/plan/setup`, { method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ days: [1, 3, 4, 6], longDay: 6, level: 'done', speed: true, comeback: false }) });

    const { chromium } = require('playwright');
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1080 / 390 });
    await ctx.addCookies([{ name: 'pa.sid', value: cookieValue, domain: 'localhost', path: '/' }]);
    const pg = await ctx.newPage();
    await pg.addInitScript(() => { try { localStorage.setItem('storySeen', '1'); } catch { /* */ } });
    // Hide the sticky top bar and tab bar on full-page shots so they don't float mid-page.
    const shot = async (hash, name, { full = false, before } = {}) => {
      await pg.goto(`${BASE}/${hash}`); await pg.waitForTimeout(1800);
      if (before) await pg.evaluate(before);
      if (full) await pg.addStyleTag({ content: '.tabbar,nav.tabs,.bottom-nav{display:none!important} header,.topbar{position:static!important}' });
      await pg.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
      console.log('saved', name);
    };
    const runId = async (re) => { await pg.goto(`${BASE}/#/runs`); await pg.waitForTimeout(1500);
      return pg.evaluate((s) => { const a = [...document.querySelectorAll('a[href^="#/run/"]')].find((x) => new RegExp(s).test(x.textContent)); return a && a.getAttribute('href'); }, re); };
    await shot('#/home', 'home');
    await shot('#/home', 'home-full', { full: true });
    await shot('#/runs', 'runs');
    for (const [re, name] of [['Long Run', 'run-long'], ['Tempo Run', 'run-tempo'], ['10K', 'run-10k'], ['Easy Run', 'run-easy']]) {
      const h = await runId(re); if (h) await shot(h, name, { full: true });
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
    await b.close();
  } finally { server.kill(); await pool.end(); }
})().catch((e) => { console.error(e); process.exit(1); });
