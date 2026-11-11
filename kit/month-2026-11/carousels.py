A = lambda s: f'<span class="acc">{s}</span>'
TAGS = '#KarachiRunners #RunningPakistan #PakistanRunners #MarathonTraining #RunnersOfInstagram'
CTA = {'type': 'cta', 'h': f'Know your run.<br>{A("Know yourself.")}', 'p': 'Every run explained, in plain words.'}
C = [
 ('2026-11-13', 'How to read your splits', ['km-splits', 'hr-splits', 'cadence-splits', 'mile-splits'], [
   {'type': 'cover', 'k': 'Running basics', 'h': f'How to read<br>{A("your splits.")}', 'p': 'Pace, heart rate and cadence, km by km.'},
   {'type': 'img', 'k': '01 · What a split is', 'h': f'One row<br>{A("per km.")}', 'p': 'Each split is one kilometre (or mile) of your run: its pace, heart rate, cadence and climb.', 'img': 'km-splits.png', 'crop': [585, 1000]},
   {'type': 'img', 'k': '02 · Pace', 'h': f'Spot<br>{A("the work.")}', 'p': 'Fast and easy kilometres side by side: warm-up, the hard middle, cool-down.', 'img': 'km-splits.png', 'crop': [0, 560]},
   {'type': 'img', 'k': '03 · Heart rate', 'h': f'Watch it<br>{A("drift.")}', 'p': 'On long easy runs heart rate creeps up even at the same pace. A little is normal.', 'img': 'hr-splits.png', 'crop': [560, 900]},
   {'type': 'img', 'k': '04 · Cadence', 'h': f'Steps<br>{A("per minute.")}', 'p': 'Cadence rises as you speed up. A quicker, lighter step is easier on your legs.', 'img': 'cadence-splits.png', 'crop': [560, 900]},
   {'type': 'img', 'k': '05 · Km or miles', 'h': f'Your<br>{A("choice.")}', 'p': 'Switch in one tap. Splits, paces and your plan follow.', 'img': 'mile-splits.png', 'crop': [585, 900]},
   CTA],
  f"How to read your splits, in 5 slides. 📊\n\nA split is one km (or mile) of your run. Read across a row and you see pace, heart rate, cadence and climb; read down the column and you see how the run unfolded.\n\nperformanceapp.run shows splits for every run, per km or per mile, with a plain-words verdict on your pacing.\n\nSave this for your next run. Free to start · Link in bio 👆\n(Sample runs shown)\n\n{TAGS}"),

 ('2026-11-16', 'Why runners add it', ['story-long', 'fitness', 'plan-long', 'story-card', 'rewards-level'], [
   {'type': 'cover', 'k': 'Why runners are adding it', 'h': f'Your watch<br>records it.<br>{A("We explain it.")}', 'p': '6 reasons to add performanceapp.run, even if you already use a watch app.', 'size': 140},
   {'type': 'img', 'k': '01 · Every run explained', 'h': f'Plain words,<br>{A("not just numbers.")}', 'p': 'What went well, what your heart rate says and what to do next. Fixed coaching rules, built from your data.', 'img': 'story-long.png', 'tag': 'Free'},
   {'type': 'img', 'k': '02 · The serious numbers', 'h': f'Fitness, load<br>{A("& zones.")}', 'p': 'Fitness and fatigue, training load, heart-rate zones and splits per km or mile.', 'img': 'fitness.png', 'tag': 'Free'},
   {'type': 'img', 'k': '03 · Train for your race', 'h': f'A plan built<br>{A("from your runs.")}', 'p': 'Paces from your own fitness, every session explained, adjusted every Monday.', 'img': 'plan-long.png', 'tag': '2 weeks free · full plan with Pro'},
   {'type': 'img', 'k': '04 · Share your progress', 'h': f'Show how far<br>{A("you have come.")}', 'p': 'Your running story, weekly and monthly cards, then-vs-now cards.', 'img': 'story-card.png'},
   {'type': 'img', 'k': '05 · Run more, earn more', 'h': f'Points, levels<br>{A("& rewards.")}', 'p': 'Every run earns points. Run more in a month and Pro costs less.', 'img': 'rewards-level.png'},
   {'type': 'list', 'k': '06 · Keep what you use', 'h': f'No need<br>{A("to switch.")}', 'items': [['Your watch', 'Runs arrive on their own after each sync'], ['Android phone apps', 'Through Health Connect, e.g. Samsung Health'], ['Your Strava history', 'Import your archive and see years of progress']]},
   {'type': 'cta', 'h': f'No ads.<br>Never sold.<br>{A("Delete anytime.")}', 'p': 'Your runs are only used to show you your own training. Made in Pakistan for runners everywhere.', 'size': 120}],
  f"Your watch records your run. We explain it. ⌚➡️💬\n\nEvery run explained in plain words, the serious numbers (fitness, load, zones), a training plan built from your own runs, share cards and rewards. All without switching apps.\n\nperformanceapp.run works with your watch, Strava and Android phone apps. Free to start; Pro is Rs 699 a month.\n\nLink in bio 👆\n(Sample data shown)\n\n{TAGS}"),

 ('2026-11-20', 'How the training plan works', ['plan-setup', 'plan-overview', 'plan-long', 'plan-why', 'plan-locked'], [
   {'type': 'cover', 'k': 'Training plan', 'h': f'A plan that<br>{A("fits your week.")}', 'p': 'How it works, in 5 slides.'},
   {'type': 'img', 'k': '01 · A few questions', 'h': f'Your days.<br>{A("Your level.")}', 'p': 'Which days you can run, your long-run day, fast sessions or not, coming back from a break.', 'img': 'plan-setup.png', 'crop': [415, 1080], 'note': False},
   {'type': 'img', 'k': '02 · Stages', 'h': f'Base. Build.<br>{A("Peak. Taper.")}', 'p': 'Distance grows 8–10% a week, with an easier week every 4th.', 'img': 'plan-overview.png', 'note': False},
   {'type': 'img', 'k': '03 · Every run explained', 'h': f'Why, how<br>{A("and how fast.")}', 'p': 'Purpose, steps with paces from your own runs, effort and fuel tips.', 'img': 'plan-long.png', 'note': False},
   {'type': 'img', 'k': '04 · It adjusts', 'h': f'Every<br>{A("Monday.")}', 'p': 'Missed a run or ran extra? Next week is rebuilt from what you actually ran.', 'img': 'plan-why.png', 'note': False},
   {'type': 'img', 'k': '05 · Free and Pro', 'h': f'2 weeks<br>{A("free.")}', 'p': 'Your first 2 weeks of plan are free. The full plan to race day is Pro: Rs 699 a month.', 'img': 'plan-locked.png', 'note': False},
   CTA],
  f"A training plan that fits your week. 🗓️\n\nTell us your level, the days you can run and your long-run day. You get a plan in stages (base, build, peak, taper) with every run explained, and it adjusts every Monday to what you actually ran.\n\nperformanceapp.run: your first 2 weeks of plan are free; the full plan to race day is Pro at Rs 699 a month.\n\nLink in bio 👆\n\n{TAGS}"),

 ('2026-11-24', 'Race-week checklist', [], [
   {'type': 'cover', 'k': 'Racing this weekend?', 'h': f'Race-week<br>{A("checklist.")}', 'p': 'Save it. Read it on Saturday night.'},
   {'type': 'list', 'k': 'The days before', 'h': f'Rest up,<br>{A("eat well.")}', 'items': [['Sleep', 'Two good nights before race day matter most; nerves the night before are normal'], ['Food', 'Familiar meals all week. More carbs the day before, nothing new'], ['Running', 'Short and easy, one short sharpener, rest the day before']]},
   {'type': 'list', 'k': 'The night before', 'h': f'Lay it<br>{A("all out.")}', 'items': [['Kit', 'Shoes, clothes, bib and pins, all things you have trained in'], ['Fuel and water', 'The gels, dates or drink you practised with, and where you will drink'], ['Start', 'Start time, how you get there, parking. Set two alarms']]},
   {'type': 'list', 'k': 'Race morning', 'h': f'Start<br>{A("controlled.")}', 'items': [['Breakfast', 'Something familiar, 2–3 hours before the start'], ['Arrive early', '45–60 minutes before, for toilets and a short warm-up'], ['Pacing', 'First km a little slower than race pace. Settle in, then hold it']]},
   {'type': 'list', 'k': 'Afterwards', 'h': f'Recover<br>{A("smart.")}', 'items': [['Eat and drink', 'Within an hour: fluids, carbs and some protein'], ['Move gently', 'A walk later in the day; easy runs only for a few days'], ['Look back', 'Check your splits: where you were strong, where you faded']]},
   CTA],
  f"Race-week checklist ✅ Save it for Saturday night.\n\nSleep, food, kit, fuel, the start, pacing and recovery: the simple things that decide race day, in 4 slides.\n\nperformanceapp.run builds race week into your training plan and shows your splits afterwards, so you can see where you were strong.\n\nGood luck to everyone racing this weekend! 🏁\nFree to start · Link in bio 👆\n\n{TAGS}"),

 ('2026-12-02', 'Your first run in the app', ['story-long', 'run-card', 'plan-week'], [
   {'type': 'cover', 'k': 'Getting started', 'h': f'Your first run,<br>{A("step by step.")}', 'p': 'From sign-in to share card in 4 steps.'},
   {'type': 'list', 'k': 'Steps 1 and 2', 'h': f'Sign in.<br>{A("Bring your runs.")}', 'items': [['Sign in with Google', 'Open performanceapp.run. No card needed'], ['Connect what you use', 'Your watch, Strava or your Android phone (Health Connect)'], ['Add your history', 'Import your old runs to see years of progress at once']]},
   {'type': 'img', 'k': 'Step 3', 'h': f'Every run,<br>{A("explained.")}', 'p': 'Open any run: its story, splits, heart rate, zones and cadence.', 'img': 'story-long.png'},
   {'type': 'img', 'k': 'Step 4', 'h': f'Share<br>{A("a card.")}', 'p': 'One tap makes a card for Instagram or WhatsApp.', 'img': 'run-card.png'},
   {'type': 'img', 'k': 'Next', 'h': f'Add a race,<br>{A("get a plan.")}', 'p': 'Answer a few questions and get your week of runs. 2 weeks free.', 'img': 'plan-week.png'},
   CTA],
  f"Your first run in the app, step by step. 👟\n\nSign in with Google, connect your watch, Strava or Android phone, and every run arrives explained: story, splits, heart rate and zones. Then share a card, or add a race and get a plan.\n\nperformanceapp.run is free to start. No card needed.\n\nLink in bio 👆\n(Sample runs shown)\n\n{TAGS}"),

 ('2026-12-06', '5 numbers to check after every run', ['km-splits', 'zones-run', 'hr-card', 'cadence-card', 'load'], [
   {'type': 'cover', 'k': 'After every run', 'h': f'5 numbers<br>{A("worth a look.")}', 'p': '30 seconds that make your next run better.'},
   {'type': 'img', 'k': '01 · Splits', 'h': f'Did you<br>{A("pace it?")}', 'p': 'A steady or faster second half beats a fast start and a fade.', 'img': 'km-splits.png', 'crop': [585, 1000]},
   {'type': 'img', 'k': '02 · Heart-rate zones', 'h': f'Easy<br>{A("or not?")}', 'p': 'Easy runs should sit mostly in the lower zones.', 'img': 'zones-run.png'},
   {'type': 'img', 'k': '03 · Heart-rate drift', 'h': f'Same pace,<br>{A("higher heart?")}', 'p': 'A little drift is normal on long runs. A lot can mean heat, too little water or tired legs.', 'img': 'hr-card.png'},
   {'type': 'img', 'k': '04 · Cadence', 'h': f'Quick,<br>{A("light steps.")}', 'p': 'Watch it rise on faster runs, and track it against your own target.', 'img': 'cadence-card.png'},
   {'type': 'img', 'k': '05 · Training load', 'h': f'Building<br>{A("or overdoing?")}', 'p': 'Enough load to get fitter, not so much that you break down.', 'img': 'load.png'},
   CTA],
  f"5 numbers worth a look after every run. 🔍\n\nSplits, heart-rate zones, heart-rate drift, cadence and training load. 30 seconds with these makes your next run better.\n\nperformanceapp.run shows all five for every run and explains them in plain words.\n\nSave this. Free to start · Link in bio 👆\n(Sample runs shown)\n\n{TAGS}"),
]
