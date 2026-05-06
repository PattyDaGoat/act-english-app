# ACT English Study App

A browser-based study tool for the ACT English section, built per the spec in `../ACT_English_App_Guidelines.md`.

## How to run

This is a no-build static app. Either:

1. **Open `app/index.html` directly** in a modern browser (Chrome, Edge, Firefox, Safari).
   - Note: ES module loading from `file://` works in most browsers but Chrome may block it. If so, use option 2.

2. **Serve locally with Python:**
   ```
   cd app
   python -m http.server 5500
   ```
   Then open `http://localhost:5500/`.

No `npm install` needed. Tailwind CSS is loaded via Play CDN; vanilla JS uses ES modules.

## Project layout

```
app/
  index.html              Entry point
  src/
    main.js               Router registration, app boot
    styles.css            Custom styles (focus ring, passage formatting, mock chrome)
    lib/
      router.js           Hash-based router
      dom.js              h(tag, props, children) helper
      store.js            localStorage-backed §14 data model
      analytics.js        Topic accuracy, weak spots, score trajectory
      sm2.js              SM-2 flashcard scheduling
      schedule.js         Calendar generator + streak helpers
      util.js             rawToScaled, time format, color helpers
    data/
      topics.js           Topic taxonomy (§8)
      questions.js        Question bank (100 questions, all 4 explanation fields)
      passages.js         Five ACT-style passages (~325 words each, 15 questions per passage)
    components/
      layout.js           Top nav + main container
      question_card.js    Stem + 4 choices + passage context
      explanation_panel.js  Post-submit explanation (concept + why correct + why wrong + takeaway)
    screens/
      onboarding.js       5-step setup
      home.js             Dashboard
      guided_setup.js     Pick topic + length
      guided_question.js  Per-question flow with explanation panel
      session_summary.js  End-of-session stats
      mock_preflight.js   "Are you ready?" gate
      mock_in_test.js     75q / 45min / no feedback
      mock_review.js      Post-test review (also handles helped review)
      helped_in_test.js   Mock + 4-level Help button
      drill_setup.js      Topic + length + difficulty
      drill_run.js        Timed drill, end-of-drill review
      flashcards.js       SM-2 review queue
      analytics.js        Score trajectory + heatmap + category breakdown
      schedule.js         Calendar + streak
      settings.js         Profile, daily goal, data export/reset
```

## What's implemented (MVP per §16)

- ✅ All three practice modes: Guided, Mock, Helped
- ✅ Question bank with all four explanation fields per question (§5 authoring rule)
- ✅ Analytics: score trajectory, topic heatmap, weak-spot detection, category accuracy
- ✅ SM-2 flashcards (auto-add from missed, 4-button rating, due queue)
- ✅ Timed drills by topic with 36s/q pacing
- ✅ Study schedule generator + streak counter with milestones
- ✅ Onboarding, home dashboard, settings, data export
- ✅ Keyboard shortcuts in Guided Practice (1/2/3/4 = A/B/C/D, Enter = submit/next)
- ✅ Reduced-motion respected, focus ring, semantic landmarks

## What's NOT in this build (intentional)

- **600+ question bank.** Bank is 100 questions (75 passage-attached across 5 passages × 15, + 25 standalones). Mock Test now uses the proper ACT 5×15 structure with no repetition. Production target is still 600+.
- **Backend / multi-device sync.** All data is in `localStorage`. Use Settings → Export to back up.
- **Mini-lessons (v1.1).** Concept tags are present but no embedded video.
- **Push/email reminders (v1.1).**
- **Exportable PDF score report (v1.2).**

## Migrating to React+Vite later

The screen and component modules are pure functions returning DOM nodes. Porting:

- `h('div.foo', { onClick }, [kids])` → `<div className="foo" onClick={onClick}>{kids}</div>`
- `store` becomes a Zustand/Redux store; the API surface is intentionally small.
- `router.js` swaps for `react-router-dom`.
- `analytics.js`, `sm2.js`, `schedule.js`, `util.js`, and the `data/` modules port unchanged.

## Testing the app

1. Open the app, complete onboarding (~30 seconds).
2. From Home, click **Guided Practice** → 5 questions → Mixed.
3. Submit a wrong answer to see the four-field explanation panel and the auto-flashcard add.
4. Visit **Analytics** to see your topic heatmap populate.
5. Visit **Flashcards** to review the cards generated from your misses.
6. Try a **Timed Drill** on a topic; observe 36s/q pacing.
7. Try the **Mock Test** — note the no-feedback rule and the post-test review.
8. Try the **Helped Test** — observe the 4-level Help and dual scoring.
