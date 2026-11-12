# performanceapp-media

Public media for performanceapp.run's Instagram and Facebook posts, plus the kit used to make them.
Everything here is public: **never add app code, keys, passwords, real runners' data, or anything not meant to be posted.**
Screenshots come from made-up sample runs only.

## Layout
- `YYYY-MM-DD/` — media for posts on that day (`reel.mp4`, `cover.jpg`, `slide-N.png`). Metricool fetches them from
  `https://performanceapp-run.github.io/performanceapp-media/YYYY-MM-DD/<file>` and keeps its own copy.
- `kit/calendar.json` — the plan, day by day (what each day's drafts are about).
- `kit/tools/sample-app.js` — starts the real app (a clone of AhmedFrz/performance_app, after `npm ci`) on a local Postgres with one
  made-up sample runner: 8 weeks of realistic runs from `kit/tools/sample-runs.js`, a race called "January Marathon" (no real race names),
  plan answers, points. Used by:
  - `kit/tools/grab.js <app> <out> <spec.json>` — single app cards as PNG (+ highlight boxes as JSON), or the app's own share-card images.
  - `kit/tools/shoot.js <app> <out>` — full screenshots of the main screens.
- `kit/templates/reel/` + `kit/tools/make-reel.js <dir> <cfg.json> [still …]` — the Reel template: hook → app cards with highlights → message → end frame.
- `kit/templates/carousel/` + `kit/tools/make-slides.js <dir> <slides.json>` — the carousel template (cover, image, list and end slides).
- `kit/tools/reel.js`, `kit/tools/slides.js` — lower-level renderers used by the above; `kit/examples/` — the first hand-made posts.
- `kit/assets/fonts.css` — Barlow Condensed + Inter, embedded (free fonts, SIL OFL).
- Cards that show Garmin (the import card, the Free vs Pro screen's Free list) must not be used in posts.

## Daily run: make tomorrow's drafts
Run every evening (Asia/Karachi). The owner approves every post; you only ever create **drafts**.

1. **Target date** = tomorrow in Asia/Karachi. Find it in `kit/calendar.json`. If there is no entry, stop and say the 30-day plan has ended.
2. **No duplicates.** Metricool brand/blogId `7958058`, timezone `Asia/Karachi`. Call `getScheduledPosts` for the target date
   (from 00:00 to 23:59 +05:00). If an Instagram post already exists that day, don't make another Reel; only add a missing carousel.
3. **Pick the idea.** If `needs` is `auto`, make the `reel`. Otherwise make the `fallback` (if `fallback` is null, make nothing and only remind the owner),
   and tell the owner what the main idea needs (footage to film, permission to get, partner to ask) so they can send it for a later day.
4. **Get the tools.** Attach and clone this repo with push access (`performanceapp-run/performanceapp-media`) and AhmedFrz/performance_app (read).
   In the app clone run `npm ci`. Take screenshots: `node kit/tools/shoot.js <app-clone> <work>/shots` (Postgres 16 and Playwright are in the container).
   Crop what you need with PIL (full-page shots are tall).
5. **Make the Reel.** Grab the cards you need with `grab.js`, then write a cfg for `make-reel.js` (see the comment at the top of
   `kit/templates/reel/reel.html`; `"hl": "@card"` takes a highlight box from grab.js). 15–22 s, 3–5 scenes
   (hook question → app screen with one thing highlighted → what it means → end frame). Keep the house style: dark `#0B0B0C`, lime `#D4FF00`,
   Barlow Condensed italic uppercase headlines, Inter body text, big readable text, a phone frame around app screens.
   End frame always: `PERFORMANCEAPP.RUN` · "Know your run. Know yourself." · "Free to start · Link in bio".
   Check frames with `node kit/tools/make-reel.js <dir> <cfg> still h@2.6 s0@4 x@3.5 e@3` and look at them before the full render;
   fix overlaps, cut-off text and highlights. Then run it without `still`.
6. **Carousel days.** Write 5–8 slides for `make-slides.js` (1080×1350), look at every slide.
7. **Upload.** Copy the finished files into `YYYY-MM-DD/` (only `reel.mp4`, `cover.jpg`, `slide-N.png`). Commit as
   `git config user.name Claude; git config user.email noreply@anthropic.com`, message `Post media for D Mon YYYY` ending with the session's
   attribution lines, and push to `main`. Pages takes about a minute to update.
8. **Create the drafts** with `createScheduledPost`, `draft: true`:
   - Reel: 20:00 Asia/Karachi, providers instagram + facebook, `instagramData {type: "REEL", showReelOnFeed: true}`, `facebookData {type: "REEL"}`,
     `media` = the Pages URL of `reel.mp4`, `videoThumbnailUrl` = the Pages URL of `cover.jpg`.
   - Carousel: 13:00 Asia/Karachi, instagram + facebook, `instagramData {type: "POST"}`, `facebookData {type: "POST"}`, `media` = the slide URLs in order.
   - If Metricool can't fetch a URL yet, wait a minute (Pages is still deploying) and try once more.
9. **Report** in your final message, in plain words: what was drafted for which day and time, the Metricool planner link(s), and the owner's
   to-dos for that day: approve the draft(s) in Metricool, the Story idea (polls, question boxes and link stickers are added in the Instagram app),
   DMs or other `action`, and anything a main idea needs from them.

## Caption style
3 short paragraphs: the hook in one line → what it means in plain words → what the app does. Then `Free to start · Link in bio 👆`,
`(Sample run shown)` when app data is shown, and 5–8 hashtags from:
#KarachiRunners #KarachiMarathon #RunningPakistan #PakistanRunners #MarathonTraining #HalfMarathon #RunnersOfInstagram #UnifiedMarathon (only with the organiser's OK).

## Rules for every post
- **Honest claims.** "Free to start", never just "free". "Android", not "your phone" (no iPhone app yet). Lead with "every run explained";
  race predictions are one feature, not the headline. Training plan: free runners get 2 weeks of plan once; the full plan is Pro. Pro is Rs 699/month.
- **No AI claims.** The app's analysis is fixed coaching rules, not AI. Don't say "AI coach".
- **Garmin** (Garmin's API brand guidelines). Posts use sample runs, so never show the Garmin logo or a "Garmin [device]"
  credit, and never present sample runs as Garmin data. Prefer "your watch". To say the app works with Garmin, name the app
  in full, "the Garmin Connect™ app" (never "Garmin" alone or shortened), with the Garmin Connect™ app tile beside it, unaltered
  (the tile is `public/img/garmin-connect.png` in AhmedFrz/performance_app). Don't add Garmin's guideline files here: they are confidential.
- **Sample data.** Screenshots use sample runs: label them "Sample run" on screen and in the caption. Never present them as a real runner's result.
- **Real people.** A runner's data, face or name only with their permission in writing (a DM is enough). The owner gets it, not you.
- **Race organisers.** A race's name or logo only with the organiser's OK; never suggest the app is the official race app or race timing.
- **Unified Marathon.** The athletes are the story. Ask before filming anyone; follow the organisers' guidance.
- Nothing is published without the owner: drafts only, never `draft: false`.
