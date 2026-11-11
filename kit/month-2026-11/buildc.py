import sys, os, json, shutil, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import carousels
W = os.path.dirname(os.path.abspath(__file__)); G = f'{W}/grabs'
for date, title, names, slides, caption in carousels.C:
    d = f'{W}/outc/{date}'; os.makedirs(d, exist_ok=True)
    for n in names: shutil.copy(f'{G}/{n}.png', d)
    json.dump(slides, open(f'{d}/slides.json', 'w')); open(f'{d}/caption.txt', 'w').write(caption)
    r = subprocess.run(['node', '/home/claude/performanceapp-media/kit/tools/make-slides.js', d, f'{d}/slides.json'], capture_output=True, text=True)
    print(date, r.stdout.strip() or ('FAIL ' + r.stderr[-300:]), flush=True)
