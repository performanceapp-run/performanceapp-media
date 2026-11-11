// Made-up but realistic sample runs (GPX) for post screenshots: 8 weeks of training ending yesterday,
// fitness improving ~6%, easy runs, tempo and interval sessions, long runs with heart-rate drift,
// negative splits, hills, cadence that rises with speed. Route: a wiggly line along the Karachi seafront.
// Nothing here is a real person's data.
const DAY = 86400000;
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

// segs: [{ km, pace (s/km), hr }]; HR moves toward each segment's target, with drift on long efforts.
function gpx(name, startMs, segs, { drift = 0, every = 5 } = {}) {
  const pts = [];
  let t = 0, d = 0, hr = 95, lat = 24.79, lon = 67.02, head = 0.6;
  const total = segs.reduce((s, x) => s + x.km, 0) * 1000;
  for (const sg of segs) {
    const end = d + sg.km * 1000;
    while (d < end) {
      const hill = Math.sin(d / 900) * 9 + Math.sin(d / 260) * 3;            // metres
      const slope = Math.cos(d / 900) * 0.01 + Math.cos(d / 260) * 0.0115;
      const pace = sg.pace * (1 + slope * 0.9) * (1 + (rnd() - 0.5) * 0.02);
      const v = 1000 / pace;                                                  // m/s
      const target = sg.hr + drift * (d / total) + slope * 80;
      hr += (target - hr) * 0.08 + (rnd() - 0.5) * 1.0;
      const spm = 150 + v * 7 + (rnd() - 0.5) * 3;                            // steps per minute rises with speed
      const step = v * every;
      head += Math.sin(d / 700) * 0.02;                                       // a gently curving route
      lat += (step * Math.cos(head)) / 111000;
      lon += (step * Math.sin(head)) / (111000 * Math.cos((lat * Math.PI) / 180));
      d += step; t += every;
      const time = new Date(startMs + t * 1000).toISOString().replace(/\.\d+Z$/, 'Z');
      pts.push(`<trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${(6 + hill).toFixed(1)}</ele><time>${time}</time><extensions><gpxtpx:TrackPointExtension><gpxtpx:hr>${Math.round(hr)}</gpxtpx:hr><gpxtpx:cad>${Math.round(spm / 2)}</gpxtpx:cad></gpxtpx:TrackPointExtension></extensions></trkpt>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Sample data" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1">
<trk><name>${name}</name><type>running</type><trkseg>
${pts.join('\n')}
</trkseg></trk></gpx>`;
}

function sampleRuns(nowMs = Date.now()) {
  seed = 7;
  const today0 = nowMs - (nowMs % DAY);
  const start0 = today0 - 56 * DAY + 1 * 3600000;      // 06:00 Karachi (01:00 UTC), 8 weeks ago, a Monday-ish
  const out = [];
  for (let w = 0; w < 8; w++) {
    const f = 1 - 0.0075 * w;                            // pace factor: ~6% faster by week 8
    const h = -w * 0.6;                                  // and a little lower heart rate for the same effort
    const base = start0 + w * 7 * DAY;
    const easy = Math.round(400 * f), mp = Math.round(345 * f), tp = Math.round(318 * f), ip = Math.round(292 * f);
    out.push({ name: 'Easy Run', at: base + 1 * DAY, segs: [{ km: 6 + (w % 3), pace: easy, hr: 129 + h }] });
    if (w % 2 === 0) out.push({ name: 'Tempo Run', at: base + 3 * DAY, segs: [{ km: 2, pace: easy, hr: 130 + h }, { km: 4.5, pace: tp, hr: 164 + h }, { km: 1.5, pace: easy + 10, hr: 140 + h }] });
    else {
      const segs = [{ km: 2, pace: easy, hr: 130 + h }];
      for (let r = 0; r < 5 + Math.floor(w / 3); r++) { segs.push({ km: 0.8, pace: ip, hr: 174 + h }); segs.push({ km: 0.3, pace: easy + 60, hr: 148 + h }); }
      segs.push({ km: 1.5, pace: easy + 10, hr: 138 + h });
      out.push({ name: 'Intervals', at: base + 3 * DAY, segs });
    }
    out.push({ name: 'Easy Run', at: base + 4 * DAY, segs: [{ km: 5 + (w % 2), pace: easy + 5, hr: 128 + h }] });
    const L = Math.min(24, 12 + w * 1.6);
    const longSegs = w >= 4 && w % 2 === 0
      ? [{ km: L - 5, pace: easy - 5, hr: 125 + h }, { km: 5, pace: mp, hr: 150 + h }]             // marathon-pace finish
      : [{ km: L, pace: easy - 5, hr: 125 + h }];
    out.push({ name: 'Long Run', at: base + 6 * DAY, segs: longSegs, drift: 7 });
  }
  out.push({ name: '10K Effort', at: today0 - 9 * DAY + 3600000, segs: [{ km: 1, pace: 300, hr: 158 }, { km: 8, pace: 288, hr: 171 }, { km: 1, pace: 279, hr: 180 }] });
  return out.filter((r) => r.at < nowMs - DAY / 3).map((r) => ({
    file: `${new Date(r.at).toISOString().slice(0, 10)}-${r.name.toLowerCase().replace(/ /g, '-')}.gpx`,
    gpx: gpx(r.name, r.at, r.segs, { drift: r.drift || 0 })
  }));
}
module.exports = { sampleRuns };
