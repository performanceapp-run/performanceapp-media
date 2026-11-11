// Starts the real app (a local clone of AhmedFrz/performance_app) on a throwaway local Postgres
// with one made-up sample runner: 8 weeks of generated runs ending yesterday (sample-runs.js), a goal race
// ('January Marathon', 3 Jan 2027, goal 4:30:00; no real race name) and plan answers. No real runner's data.
// Used by shoot.js and grab.js. Returns { page, BASE, runHash(regex), compareHash(regex), setPro(bool), close() }.
const { spawn, execSync } = require('child_process');
const path = require('path');
const DB = 'postgres://postgres:postgres@localhost:5432/pa_kit';
const SECRET = 'kit-secret-kit-secret-kit-secret-0123456789abcd';
const PORT = 3197, BASE = `http://localhost:${PORT}`;
const sh = (c) => { try { return execSync(c, { stdio: ['ignore', 'pipe', 'pipe'] }).toString(); } catch (e) { return String(e.stdout || '') + String(e.stderr || ''); } };

async function start(appDir) {
  const APP = path.resolve(appDir);
  const req = (m) => require(path.join(APP, 'node_modules', m));
  sh('pg_ctlcluster 16 main start');
  await new Promise((r) => setTimeout(r, 1500));
  sh(`su postgres -c "psql -c \\"ALTER USER postgres PASSWORD 'postgres'\\""`);
  sh(`su postgres -c "psql -tc \\"SELECT 1 FROM pg_database WHERE datname='pa_kit'\\" | grep -q 1 || psql -c 'CREATE DATABASE pa_kit'"`);
  const { Pool } = req('pg');
  const pool = new Pool({ connectionString: DB });
  const server = spawn(process.execPath, ['server.js'], { cwd: APP, stdio: 'ignore',
    env: { ...process.env, DATABASE_URL: DB, SESSION_SECRET: SECRET, PORT: String(PORT), NODE_ENV: 'test', APP_URL: BASE, GARMIN_CLIENT_ID: 'kit' } });
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`${BASE}/api/me`)).ok) break; } catch { /* starting */ } await new Promise((r) => setTimeout(r, 500)); }
  await pool.query(`CREATE TABLE IF NOT EXISTS sessions (sid varchar PRIMARY KEY, sess json NOT NULL, expire timestamp(6) NOT NULL)`);
  const u = await pool.query(`INSERT INTO users (google_sub, email, name, units) VALUES ('kit-sample', 'sample@kit.invalid', 'Sample Runner', 'km')
    ON CONFLICT (google_sub) DO UPDATE SET name = EXCLUDED.name, plan = 'free', pro_until = NULL RETURNING id`);
  const uid = Number(u.rows[0].id);
  // Joined 6 weeks ago, so the sample runs count for points, levels and run cards.
  await pool.query("UPDATE users SET created_at = now() - interval '60 days', max_hr = 190 WHERE id = $1", [uid]);
  await pool.query('DELETE FROM points_ledger WHERE user_id = $1', [uid]).catch(() => {});
  for (const t of ['activities', 'races']) await pool.query(`DELETE FROM ${t} WHERE user_id = $1`, [uid]).catch(() => {});
  await pool.query('UPDATE goals SET plan_days = NULL, plan_race_id = NULL, plan_start = NULL, plan_free_start = NULL WHERE user_id = $1', [uid]).catch(() => {});
  const SID = 'kit-session';
  await pool.query(`INSERT INTO sessions (sid, sess, expire) VALUES ($1, $2, now() + interval '3 hours') ON CONFLICT (sid) DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire`,
    [SID, JSON.stringify({ cookie: { originalMaxAge: 10800000, path: '/', httpOnly: true }, userId: uid })]);
  const cookieValue = `s:${req('cookie-signature').sign(SID, SECRET)}`;
  const headers = { cookie: `pa.sid=${encodeURIComponent(cookieValue)}`, origin: BASE };
  const all = require('./sample-runs').sampleRuns();
  for (let i = 0; i < all.length; i += 15) {          // the app takes at most 20 files per upload
    const fd = new FormData();
    for (const r of all.slice(i, i + 15)) fd.append('files', new Blob([r.gpx]), r.file);
    const up = await fetch(`${BASE}/api/uploads?tz=-300`, { method: 'POST', body: fd, headers });
    if (!up.ok) throw new Error('import failed ' + up.status);
  }
  // Points, levels and run cards: imported files don't earn points in the app, so pay the sample runs the
  // app's own run points (RULES.run) directly, as if they had come from a phone.
  process.env.DATABASE_URL = process.env.DATABASE_URL || DB;
  const RULES = require(path.join(APP, 'src', 'points')).RULES;
  const acts = await pool.query("SELECT id, distance_m, start_local FROM activities WHERE user_id = $1 ORDER BY start_local", [uid]);
  for (const a of acts.rows) {
    const km = a.distance_m / 1000;
    await pool.query(`INSERT INTO points_ledger (user_id, kind, ref, points, note, created_at) VALUES ($1, 'run', $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
      [uid, String(a.id), RULES.run(km), `${Math.round(km * 10) / 10} km run`, new Date(String(a.start_local).slice(0, 19) + 'Z')]);
  }
  await pool.query(`INSERT INTO races (user_id, name, race_date, distance_m, goal_time_s, is_main) VALUES ($1, 'January Marathon', '2027-01-03', 42195, 16200, true)`, [uid]);
  await fetch(`${BASE}/api/plan/setup`, { method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify({ days: [1, 3, 4, 6], longDay: 6, level: 'done', speed: true, comeback: false }) });

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1080 / 390 });
  await ctx.addCookies([{ name: 'pa.sid', value: cookieValue, domain: 'localhost', path: '/' }]);
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('storySeen', '1'); } catch { /* */ } });
  const runHash = async (re) => {
    await page.goto(`${BASE}/#/runs`); await page.waitForTimeout(1500);
    return page.evaluate((s) => { const a = [...document.querySelectorAll('a[href^="#/run/"]')].find((x) => new RegExp(s).test(x.textContent)); return a && a.getAttribute('href'); }, re);
  };
  // Two runs whose rows match the regex, oldest first, for the compare screen: '#/compare/<a>-<b>'.
  const compareHash = async (re) => {
    await page.goto(`${BASE}/#/runs`); await page.waitForTimeout(1500);
    const ids = await page.evaluate((s) => [...document.querySelectorAll('a[href^="#/run/"]')].filter((x) => new RegExp(s).test(x.textContent)).map((a) => a.getAttribute('href').split('/').pop()), re);
    return ids.length >= 2 ? `#/compare/${ids[ids.length - 1]}-${ids[0]}` : null;
  };
  const setPro = (on) => pool.query('UPDATE users SET plan = $2 WHERE id = $1', [uid, on ? 'pro' : 'free']);
  const setUnits = (u) => pool.query('UPDATE users SET units = $2 WHERE id = $1', [uid, u === 'mi' ? 'mi' : 'km']);
  const close = async () => { await browser.close(); server.kill(); await pool.end(); };
  return { page, BASE, runHash, compareHash, setPro, setUnits, close };
}
module.exports = { start };
