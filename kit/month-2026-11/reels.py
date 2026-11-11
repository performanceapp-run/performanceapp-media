A = lambda s: f'<span class="acc">{s}</span>'
END = 'Every run explained, in plain words.'
TAGS = {
 'base': '#KarachiRunners #RunningPakistan #PakistanRunners #RunnersOfInstagram',
 'marathon': '#KarachiRunners #KarachiMarathon #MarathonTraining #RunningPakistan #PakistanRunners #RunnersOfInstagram',
 'half': '#KarachiRunners #HalfMarathon #MarathonTraining #RunningPakistan #PakistanRunners #RunnersOfInstagram',
}
def cap(hook, mean, app, tags='base', sample=True):
    return f"{hook}\n\n{mean}\n\n{app}\n\nFree to start · Link in bio 👆" + ("\n(Sample run shown)" if sample else "") + f"\n\n{TAGS[tags]}"

R = [
 ('2026-11-12', ['cadence-splits', 'cadence-card'], {
   'hook': {'top': 'Short steps<br>or long strides?', 'bottom': 'Your cadence<br>knows.'},
   'shots': [{'cap': f'Cadence for<br>{A("every km.")}', 'cap2': f'Steps per minute,<br>{A("split by split.")}', 'img': 'cadence-splits.png', 'hl': '@cadence-splits', 'grow': True, 'dur': 6.5},
             {'cap': f'171 steps<br>{A("a minute.")}', 'img': 'cadence-card.png', 'dur': 4.5}],
   'say': {'cap': f'Run faster,<br>{A("step quicker.")}', 'sub': 'Cadence rises with speed. Set a target and the app tracks it for you, run after run.'},
   'end': {'sub': END}},
  cap('Short steps or long strides? Your cadence knows.', 'Cadence is your steps per minute. It rises as you speed up, and a quicker, lighter step is easier on your legs.', 'performanceapp.run shows your cadence for every km or mile, next to pace and heart rate, and tracks it against your own target.')),

 ('2026-11-13', ['story-long', 'did-tempo'], {
   'hook': {'top': 'Your watch gives<br>you numbers.', 'bottom': 'We give you<br>the story.', 'size': 150, 'size2': 130},
   'shots': [{'cap': f'Every run,<br>{A("in plain words.")}', 'img': 'story-long.png', 'dur': 6}],
   'say': {'cap': f'Plus what it<br>{A("did for you.")}', 'img': 'did-tempo.png', 'sub': 'Fitness gained, race times updated, and what to do next.', 'subTop': 1250},
   'end': {'sub': END}},
  cap('Your watch gives you numbers. We give you the story.', 'After every run you get a short story: how it went, what your heart rate says, how it compares with your usual runs, and what to do next.', 'performanceapp.run explains every run with fixed coaching rules, built from your own data. No guesswork, no jargon.')),

 ('2026-11-14', ['plan-long', 'zones-run'], {
   'hook': {'top': 'Long run<br>today?', 'bottom': "Here's exactly<br>how to run it."},
   'shots': [{'cap': f'Purpose. Pace.<br>{A("Fuel.")}', 'img': 'plan-long.png', 'dur': 6.5, 'scrollAt': 1.4, 'scrollDur': 4}],
   'say': {'cap': f'Then check<br>{A("you got it right.")}', 'img': 'zones-run.png', 'sub': 'Zones show if your easy run really was easy.'},
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap("Long run today? Here's exactly how to run it.", 'Every session in your plan says why it matters, the pace for each part, how it should feel, and when to drink and fuel.', 'performanceapp.run builds your plan from your own runs and adjusts it every Monday. Your first 2 weeks of plan are free; the full plan is Pro.', 'marathon')),

 ('2026-11-15', ['week-card', 'month-card'], {
   'hook': {'top': 'How was<br>your week?', 'bottom': 'Share it<br>in one tap.'},
   'shots': [{'cap': f'Your week,<br>{A("ready to post.")}', 'img': 'week-card.png', 'dur': 5},
             {'cap': f'Your month<br>{A("too.")}', 'img': 'month-card.png', 'dur': 4.5}],
   'end': {'sub': 'Share cards for every run, week, month and year.'}},
  cap('How was your week? Share it in one tap.', 'Your distance, runs, longest run and pace, laid out as a card that looks good on Instagram and WhatsApp.', 'performanceapp.run makes share cards for every run, week, month and year, straight from your own data.')),

 ('2026-11-16', ['plan-overview', 'plan-week'], {
   'hook': {'top': '7 weeks<br>to race day.', 'bottom': 'Is your plan<br>ready?'},
   'shots': [{'cap': f'Base. Build. Peak.<br>{A("Taper.")}', 'img': 'plan-overview.png', 'dur': 5},
             {'cap': f"This week's runs,<br>{A('on your days.')}", 'img': 'plan-week.png', 'dur': 5}],
   'say': {'cap': f'It adjusts<br>{A("every Monday.")}', 'sub': 'Answer a few quick questions. Your plan fits your days, your level and what you actually ran.'},
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap('7 weeks to race day. Is your plan ready?', 'A good plan builds in stages: base, build, peak, then a taper so you arrive fresh. It should fit the days you can actually run.', 'performanceapp.run asks a few quick questions and builds your plan from your own runs, then adjusts it every Monday. 2 weeks free; the full plan is Pro.', 'marathon', sample=False)),

 ('2026-11-17', ['zones-run', 'zones-tempo'], {
   'hook': {'top': 'Easy day?', 'bottom': 'Your heart<br>decides.', 'size': 200},
   'shots': [{'cap': f'Easy run:<br>{A("99% in Base.")}', 'img': 'zones-run.png', 'dur': 4.8},
             {'cap': f'Tempo run:<br>{A("48% Threshold.")}', 'img': 'zones-tempo.png', 'dur': 4.8}],
   'say': {'cap': f'Easy days<br>{A("easy.")}', 'sub': 'Most of your running should be easy, so your hard days can be hard. The app shows if they really were.'},
   'end': {'sub': END}},
  cap('Easy day? Your heart decides.', 'Most runners run their easy days too fast. Heart-rate zones show how hard a run really was, not how it felt.', 'performanceapp.run shows your time in each zone for every run and every week, based on your own max heart rate.')),

 ('2026-11-18', ['fitness', 'load'], {
   'hook': {'top': 'Are you getting<br>fitter?', 'bottom': 'One line<br>tells you.', 'size': 160},
   'shots': [{'cap': f'Fitness, fatigue<br>{A("and form.")}', 'img': 'fitness.png', 'dur': 5},
             {'cap': f'Training load:<br>{A("productive.")}', 'img': 'load.png', 'dur': 4.5}],
   'say': {'cap': f'No more<br>{A("guessing.")}', 'sub': 'Push when you are fresh. Back off when fatigue builds up.'},
   'end': {'sub': END}},
  cap('Are you getting fitter? One line tells you.', 'Fitness builds slowly from weeks of training; fatigue rises fast after hard days. The gap between them is your form.', 'performanceapp.run tracks your fitness, fatigue and training load from every run, so you know when to push and when to rest.')),

 ('2026-11-19', ['did-tempo', 'readiness'], {
   'hook': {'top': 'What could you<br>run today?', 'bottom': '5K. 10K.<br>Half. Full.', 'size': 160},
   'shots': [{'cap': f'Race times from<br>{A("your own runs.")}', 'img': 'did-tempo.png', 'dur': 5},
             {'cap': f'Ready for<br>{A("race day?")}', 'img': 'readiness.png', 'dur': 5}],
   'end': {'sub': END}},
  cap('What could you run today? 5K, 10K, half, full.', 'Your best recent efforts predict your race times, and they update as you get fitter.', 'performanceapp.run shows your predicted times and how ready you are for your goal race: long runs, pace and cadence.', 'half')),

 ('2026-11-20', ['story-view', 'story-card'], {
   'hook': {'top': 'Your whole<br>running story.', 'bottom': 'In one card.', 'size': 160},
   'shots': [{'cap': f'Every km.<br>{A("Every hour.")}', 'img': 'story-view.png', 'dur': 5.5},
             {'cap': f'Made to<br>{A("share.")}', 'img': 'story-card.png', 'dur': 4.5}],
   'end': {'sub': 'Your running story, ready for Instagram.'}},
  cap('Your whole running story. In one card.', 'Days active, kilometres, hours on your feet, your longest run and how far you have come since your first 10K.', 'performanceapp.run turns your running history into a story you can share.')),

 ('2026-11-21', ['plan-hills'], {
   'hook': {'top': 'Hill repeats?', 'bottom': "Here's how.", 'size': 190},
   'shots': [{'cap': f'Warm-up. Main set.<br>{A("Cool-down.")}', 'img': 'plan-hills.png', 'dur': 6.5, 'scrollAt': 1.4, 'scrollDur': 4}],
   'say': {'cap': f'Every session<br>{A("explained.")}', 'sub': 'Why it matters, how to run it, and the pace for each part, from your own fitness.'},
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap("Hill repeats? Here's how.", 'Hills build leg strength and form: speed work in disguise. Warm up, then 8 × 60 s uphill at a hard, steady effort, jogging down to recover.', 'performanceapp.run explains every session in your plan, with paces from your own runs. 2 weeks free; the full plan is Pro.', sample=False)),

 ('2026-11-22', ['rewards-level', 'run-cards', 'earn-pro'], {
   'hook': {'top': 'Run.<br>Earn points.', 'bottom': 'Level up.', 'size': 190},
   'shots': [{'cap': f'Every run<br>{A("earns points.")}', 'img': 'rewards-level.png', 'dur': 4.2},
             {'cap': f'Every run<br>{A("becomes a card.")}', 'img': 'run-cards.png', 'dur': 4.2},
             {'cap': f'Run more.<br>{A("Pay less.")}', 'img': 'earn-pro.png', 'dur': 4.5}],
   'end': {'sub': 'Points, levels, run cards and rewards.'}},
  cap('Run. Earn points. Level up.', 'Every run earns points. Personal bests and firsts become rare run cards. Run more in a month and Pro costs less.', 'performanceapp.run makes your consistency count: points, levels, a run card album and up to a free month of Pro.')),

 ('2026-11-23', ['plan-why', 'plan-weeks'], {
   'hook': {'top': 'Missed a run?', 'bottom': 'Your plan<br>adjusts.', 'size': 180},
   'shots': [{'cap': f'Every Monday,<br>{A("a fresh week.")}', 'img': 'plan-why.png', 'dur': 5},
             {'cap': f'Week by week<br>{A("to race day.")}', 'img': 'plan-weeks.png', 'dur': 5}],
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap('Missed a run? Your plan adjusts.', 'Life happens. A plan that ignores it either breaks you or bores you.', 'performanceapp.run rebuilds your week every Monday from what you actually ran, so the plan always fits. 2 weeks free; the full plan is Pro.', 'marathon', sample=False)),

 ('2026-11-24', ['pace-10k', 'km-splits'], {
   'hook': {'top': 'Did you start<br>too fast?', 'bottom': 'Your splits<br>will tell.', 'size': 160},
   'shots': [{'cap': f'Negative split:<br>{A("finish faster.")}', 'img': 'pace-10k.png', 'dur': 5.5},
             {'cap': f'Tempo run:<br>{A("see the work.")}', 'img': 'km-splits.png', 'hl': '@km-splits', 'grow': True, 'dur': 5.5}],
   'say': {'cap': f'Start controlled.<br>{A("Finish strong.")}', 'sub': 'The app reads your splits and tells you how well you paced it.'},
   'end': {'sub': END}},
  cap('Did you start too fast? Your splits will tell.', 'Going out too fast is the most common race mistake. A negative split, running the second half faster, is the sign of a well-paced run.', 'performanceapp.run shows your splits, your pace chart and a plain-words verdict on your pacing.', 'half')),

 ('2026-11-25', ['run-cards', 'album'], {
   'hook': {'top': 'Every run<br>becomes a card.', 'bottom': 'Some are<br>legendary.', 'size': 160},
   'shots': [{'cap': f'Legendary. Epic.<br>{A("Rare.")}', 'img': 'run-cards.png', 'dur': 4},
             {'cap': f'Collect<br>{A("them all.")}', 'img': 'album.png', 'dur': 6, 'scrollAt': 0.8, 'scrollDur': 4.8}],
   'end': {'sub': 'Your runs, collected.'}},
  cap('Every run becomes a card. Some are legendary.', 'Your first 10K, a new 5K best, your longest run ever: the runs that matter become rare cards in your album.', 'performanceapp.run turns every run into a card and keeps them all in one album.')),

 ('2026-11-26', ['compare', 'cmp-bib'], {
   'hook': {'top': 'Same run.<br>6 weeks apart.', 'bottom': '2 minutes<br>faster.', 'size': 160},
   'shots': [{'cap': f'Run vs run,<br>{A("side by side.")}', 'img': 'compare.png', 'dur': 5.5},
             {'cap': f'Then vs now,<br>{A("ready to share.")}', 'img': 'cmp-bib.png', 'dur': 4.5}],
   'end': {'sub': 'Compare any two runs.', 'tag': 'Pro · Rs 699 a month'}},
  cap('Same run. 6 weeks apart. 2 minutes faster.', 'Progress is easy to miss week to week. Put two runs side by side and it is obvious: faster, at almost the same heart rate. That is fitness.', 'performanceapp.run Pro compares any two runs and makes then-vs-now share cards. Pro is Rs 699 a month.')),

 ('2026-11-27', ['run-card', 'colours'], {
   'hook': {'top': 'Make your<br>progress', 'bottom': 'Insta-ready.', 'size': 170},
   'shots': [{'cap': f'Every run,<br>{A("one tap.")}', 'img': 'run-card.png', 'dur': 4.8},
             {'cap': f'Your colours.<br>{A("Your style.")}', 'img': 'colours.png', 'dur': 4.5}],
   'end': {'sub': 'Share cards for every run.', 'tag': 'More colours and styles with Pro'}},
  cap('Make your progress Insta-ready.', 'Every run becomes a clean share card: distance, time, pace, heart rate and your splits.', 'performanceapp.run makes share cards in one tap. Pro adds every app colour and every card style.')),

 ('2026-11-28', ['plan-race'], {
   'hook': {'top': 'Race week?', 'bottom': "We've got<br>you covered.", 'size': 190},
   'shots': [{'cap': f'Sharpener. Shake-out.<br>{A("Race plan.")}', 'img': 'plan-race.png', 'dur': 7, 'scrollAt': 1.4, 'scrollDur': 4.6}],
   'say': {'cap': f'Start controlled.<br>{A("Finish strong.")}', 'sub': 'Race week is in your plan: short runs, one sharpener, rest the day before, and a pacing plan for race day.'},
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap("Race week? We've got you covered.", 'Race week is about arriving fresh: a short sharpener, easy runs, rest the day before, and a pacing plan that starts controlled.', 'performanceapp.run builds race week into your plan, with your race pace from your own runs. Good luck to everyone racing this weekend! 🏁', 'marathon', sample=False)),

 ('2026-11-30', ['km-splits', 'mile-splits', 'settings'], {
   'hook': {'top': 'Kilometres<br>or miles?', 'bottom': 'Your call.', 'size': 180},
   'shots': [{'cap': f'Splits per<br>{A("kilometre.")}', 'img': 'km-splits.png', 'dur': 4.2},
             {'cap': f'Or per<br>{A("mile.")}', 'img': 'mile-splits.png', 'dur': 4.2},
             {'cap': f'One tap<br>{A("to switch.")}', 'img': 'settings.png', 'dur': 4}],
   'end': {'sub': END}},
  cap('Kilometres or miles? Your call.', 'Train in km, race in miles, or the other way round. Your splits, paces and plan follow your choice.', 'performanceapp.run shows splits per km or per mile, with pace, heart rate and cadence for each one.')),

 ('2026-12-01', ['story-next'], {
   'hook': {'top': 'What should your<br>next run be?', 'bottom': 'Ask your<br>last one.', 'size': 150},
   'shots': [{'cap': f'It tells you<br>{A("what to do next.")}', 'img': 'story-next.png', 'hl': '@story-next', 'dur': 6.5, 'hlAt': 2.2}],
   'say': {'cap': f'Recover<br>{A("smart.")}', 'sub': 'After a big effort: 30–45 easy minutes, with a heart-rate limit set from your own zones.'},
   'end': {'sub': END}},
  cap('What should your next run be? Ask your last one.', 'After a hard run or a race, the right next run is easy and short. Most runners go too hard too soon.', 'performanceapp.run ends every run story with your next run: how long, and the heart rate to stay under.')),

 ('2026-12-02', ['plan-setup', 'plan-long'], {
   'hook': {'top': 'Tell us<br>your days.', 'bottom': 'Get your<br>plan.', 'size': 180},
   'shots': [{'cap': f'A few quick<br>{A("questions.")}', 'img': 'plan-setup.png', 'dur': 6, 'scrollAt': 1.0, 'scrollDur': 4.5},
             {'cap': f'Every run<br>{A("explained.")}', 'img': 'plan-long.png', 'dur': 5}],
   'end': {'sub': 'A training plan built from your own runs.', 'tag': '2 weeks free · full plan Rs 699/month'}},
  cap('Tell us your days. Get your plan.', 'Your level, the days you can run, your long-run day, whether you want fast sessions, and whether you are coming back from a break.', 'performanceapp.run builds a plan that fits your week, with every run explained. 2 weeks free; the full plan is Pro at Rs 699 a month.', 'marathon')),

 ('2026-12-03', ['pace-tempo', 'story-tempo'], {
   'hook': {'top': 'What did your<br>tempo run do?', 'size': 160},
   'shots': [{'cap': f'Warm-up. Work.<br>{A("Cool-down.")}', 'img': 'pace-tempo.png', 'dur': 5.5},
             {'cap': f'Your fastest 5 km<br>{A("in 4 months.")}', 'img': 'story-tempo.png', 'dur': 5.5}],
   'end': {'sub': END}},
  cap('What did your tempo run do?', 'A tempo run is comfortably hard: fast enough to raise your threshold, controlled enough to hold. The fast kilometres are where the fitness is built.', 'performanceapp.run spots the work in your run, calls out new bests, and tells you what it did for your fitness.')),

 ('2026-12-04', ['story-long', 'home-week'], {
   'hook': {'top': 'Keep your watch.', 'bottom': 'Keep Strava.', 'size': 150, 'size2': 150},
   'shots': [{'cap': f'Add the<br>{A("explanation.")}', 'img': 'story-long.png', 'dur': 5},
             {'cap': f'And see<br>{A("your progress.")}', 'img': 'home-week.png', 'dur': 4.5}],
   'say': {'cap': f'No need<br>{A("to switch.")}', 'sub': 'Runs arrive from your watch, Strava or your Android phone. Import your old runs to see years of progress.'},
   'end': {'sub': END}},
  cap('Keep your watch. Keep Strava. Add the explanation.', 'You do not need another tracker. Keep the apps you use for recording and for friends.', 'performanceapp.run brings in your runs from your watch, Strava or your Android phone (Health Connect) and explains every one.')),

 ('2026-12-05', ['records', 'story-tempo'], {
   'hook': {'top': 'New personal<br>best?', 'bottom': 'We noticed.', 'size': 170},
   'shots': [{'cap': f'Your records,<br>{A("always up to date.")}', 'img': 'records.png', 'dur': 5},
             {'cap': f'Called out<br>{A("in your run story.")}', 'img': 'story-tempo.png', 'dur': 5}],
   'end': {'sub': END}},
  cap('New personal best? We noticed.', 'Bests hide inside longer runs: your fastest 5 km stretch, your quickest 10 km. You might never know.', 'performanceapp.run finds your best efforts inside every run, keeps your records up to date, and tells you when you set a new one.')),

 ('2026-12-06', [], {
   'hook': {'top': 'No ads.', 'bottom': 'Never sold.', 'size': 210, 'size2': 210, 'bottomTop': 900},
   'say': {'cap': f'Your runs are<br>{A("yours.")}', 'sub': 'Used only to show you your own training.<br>No ads. Never sold.<br>Delete your account and data anytime.'},
   'end': {'sub': 'Made in Pakistan, for runners everywhere.'}, 'note': ''},
  cap('No ads. Never sold.', 'Your runs say a lot about you. They should only be used for you.', 'performanceapp.run uses your runs only to show you your own training. No ads, never sold, and you can delete your account and data anytime.', sample=False)),

 ('2026-12-07', ['plan-taper', 'plan-overview'], {
   'hook': {'top': '4 weeks<br>to go?', 'bottom': 'Taper is<br>coming.', 'size': 180},
   'shots': [{'cap': f'Less running.<br>{A("Fresher legs.")}', 'img': 'plan-taper.png', 'dur': 5},
             {'cap': f'Built into<br>{A("your plan.")}', 'img': 'plan-overview.png', 'dur': 4.8}],
   'say': {'cap': f'Trust<br>{A("the taper.")}', 'sub': 'Cutting back before a race lets your body absorb the training. You arrive faster, not weaker.'},
   'end': {'sub': 'A training plan built from your own runs.', 'tag': 'Training plan: 2 weeks free'}},
  cap('4 weeks to go? Taper is coming.', 'The last 2–3 weeks before a marathon are about running less so your legs arrive fresh, with a little race pace to stay sharp.', 'performanceapp.run builds the taper into your plan automatically. 2 weeks free; the full plan is Pro.', 'marathon', sample=False)),

 ('2026-12-08', ['plan-locked', 'compare', 'colours'], {
   'hook': {'top': 'Free to start.', 'bottom': 'Pro is<br>Rs 699 a month.', 'size': 160, 'size2': 130},
   'shots': [{'cap': f'Full plan<br>{A("to race day.")}', 'img': 'plan-locked.png', 'dur': 4.2},
             {'cap': f'Compare<br>{A("any two runs.")}', 'img': 'compare.png', 'dur': 4.2},
             {'cap': f'Every colour.<br>{A("Every card style.")}', 'img': 'colours.png', 'dur': 4.2}],
   'say': {'cap': f'Free gets you<br>{A("plenty.")}', 'sub': 'Every run explained, progress, zones, race predictions, training load and 2 weeks of plan. No card needed.'},
   'end': {'sub': 'Free to start. Pro is Rs 699 a month.'}},
  cap('Free to start. Pro is Rs 699 a month.', 'Free: every run explained, progress, heart-rate zones, race predictions, training load and 2 weeks of training plan. No card needed.', 'Pro adds your full plan to race day, run-vs-run comparisons, then-vs-now cards and every colour and card style. Run more in a month and Pro costs less.')),
]
