import sys, os, json, shutil, subprocess
sys.path.insert(0, os.path.dirname(__file__)); import reels
W = os.path.dirname(os.path.abspath(__file__)); G = f'{W}/grabs'
mode = sys.argv[1]  # 'stills' or 'render'
only = sys.argv[2:] 
for date, names, cfg, caption in reels.R:
    if only and date not in only: continue
    d = f'{W}/out/{date}'; os.makedirs(d, exist_ok=True)
    for n in names:
        shutil.copy(f'{G}/{n}.png', d)
        if os.path.exists(f'{G}/{n}.json'): shutil.copy(f'{G}/{n}.json', d)
    cfg.setdefault('note', 'Sample run')
    json.dump(cfg, open(f'{d}/cfg.json', 'w'))
    open(f'{d}/caption.txt', 'w').write(caption)
    args = ['node', '/home/claude/performanceapp-media/kit/tools/make-reel.js', d, f'{d}/cfg.json']
    if mode == 'stills':
        st = ['h@2.6'] + [f's{i}@{min(s.get("dur",5.5)-0.6, 4.2)}' for i, s in enumerate(cfg.get('shots', []))] + (['x@3.5'] if cfg.get('say') else []) + ['e@3']
        args += ['still'] + st
    r = subprocess.run(args, capture_output=True, text=True)
    print(date, 'ok' if r.returncode == 0 else 'FAIL ' + r.stderr[-300:], flush=True)
