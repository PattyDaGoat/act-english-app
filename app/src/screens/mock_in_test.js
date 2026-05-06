// 75 questions, 45 minutes, NO feedback during the test (per spec §6).
import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { getPassage } from '../data/passages.js';
import { fmtTime, rawToScaled } from '../lib/util.js';
import { buildMockTestList } from '../lib/test_builder.js';

export function MockInTestScreen() {
  const TOTAL = 75;
  const TIME_MS = 45 * 60 * 1000;

  const list = buildMockTestList(TOTAL);

  const session = store.startSession({ mode: 'mock', length_target: TOTAL });
  const startedAt = Date.now();
  let pauseAccum = 0;       // ms spent paused (subtracted from elapsed)
  const responses = new Array(TOTAL).fill(null);
  const flagged = new Set();
  const timeOnQuestion = new Array(TOTAL).fill(0);
  let cur = 0;
  let lastTickAt = Date.now();
  let interval = null;
  let emergencyPaused = false;
  let usedEmergency = false;

  const root = h('div.mock-shell.min-h-screen.flex.flex-col');

  function timeLeft() {
    return Math.max(0, TIME_MS - (Date.now() - startedAt - pauseAccum));
  }

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const remaining = timeLeft();
    if (remaining === 0) { submitTest(); return; }
    const q = list[cur];
    const passage = q.passage_id ? getPassage(q.passage_id) : null;

    root.appendChild(h('div.flex.flex-col.min-h-screen', [
      h('div.bg-white.border-b.border-slate-200.px-4.py-3.flex.items-center.justify-between.sticky.top-0.z-10', [
        h('div.text-sm.text-slate-600', `Question ${cur + 1} of ${TOTAL}`),
        h('div.flex.items-center.gap-4', [
          h('span.mock-timer.text-2xl.font-bold.font-mono', { className: remaining < 60000 ? 'text-rose-600' : 'text-slate-900' },
            fmtTime(remaining)),
          !usedEmergency
            ? h('button.text-xs.text-slate-500.hover\\:text-slate-900', { onClick: emergencyPause }, '⏸ Emergency pause')
            : h('span.text-xs.text-amber-700', '⚑ non-official')
        ])
      ]),

      h('div.flex-1.grid.grid-cols-1.md\\:grid-cols-2.gap-4.p-4.max-w-6xl.mx-auto.w-full', [
        h('div.bg-white.rounded-xl.border.border-slate-200.p-5.passage', [
          passage ? [
            h('h3.font-semibold.text-slate-900.mb-2', passage.title),
            renderPassageBody(passage.body, indexInPassage(list, cur))
          ] : h('div.text-sm.text-slate-500.italic', 'Standalone question — no passage.')
        ]),
        h('div.bg-white.rounded-xl.border.border-slate-200.p-5.space-y-3', [
          h('div.flex.items-center.justify-between', [
            h('div.text-xs.text-slate-500',
              q.anchor ? 'Underlined: ' + q.anchor.replace(/\[Q\d+\]/g, '').trim().slice(0, 60) : ''),
            h('button.text-xs.font-medium.px-2.py-1.rounded', {
              className: flagged.has(cur) ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-100',
              onClick: () => { flagged.has(cur) ? flagged.delete(cur) : flagged.add(cur); render(); }
            }, flagged.has(cur) ? '🚩 Flagged' : '🚩 Flag')
          ]),
          h('p.text-slate-900.font-medium', q.stem),
          h('div.space-y-2',
            ['A','B','C','D'].map(L => {
              const sel = responses[cur] === L;
              return h('button.w-full.text-left.p-3.rounded-lg.border-2.flex.items-start.gap-3', {
                className: sel ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50',
                onClick: () => { responses[cur] = L; render(); }
              }, [
                h('span.flex-shrink-0.w-7.h-7.rounded-full.flex.items-center.justify-center.text-sm.font-bold', {
                  className: sel ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'
                }, L),
                h('span.text-sm.text-slate-900', q.choices[L])
              ]);
            })
          )
        ])
      ]),

      h('div.bg-white.border-t.border-slate-200.px-4.py-3.sticky.bottom-0', [
        h('div.max-w-6xl.mx-auto.flex.items-center.justify-between.gap-4', [
          h('button.px-4.py-2.text-slate-700.font-medium.disabled\\:opacity-30', {
            onClick: prev, disabled: cur === 0
          }, '← Previous'),
          h('div.flex.gap-1.flex-wrap.max-w-md.justify-center',
            list.map((_, i) => {
              const ans = responses[i] !== null;
              const flg = flagged.has(i);
              return h('button.w-7.h-7.text-xs.rounded.font-medium', {
                className: i === cur ? 'bg-brand-600 text-white' :
                           flg ? 'bg-amber-200 text-amber-900' :
                           ans ? 'bg-emerald-200 text-emerald-900' :
                           'bg-slate-100 text-slate-500 hover:bg-slate-200',
                onClick: () => { trackTime(); cur = i; render(); }
              }, i + 1);
            })
          ),
          cur === TOTAL - 1
            ? h('button.bg-emerald-600.text-white.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-emerald-700', {
                onClick: () => { if (confirm('Submit the test?')) submitTest(); }
              }, 'Submit')
            : h('button.px-4.py-2.bg-brand-500.text-white.font-medium.rounded-lg.hover\\:bg-brand-600', {
                onClick: next
              }, 'Next →')
        ])
      ])
    ]));
  }

  function next() { trackTime(); if (cur < TOTAL - 1) { cur++; render(); } }
  function prev() { trackTime(); if (cur > 0) { cur--; render(); } }
  function trackTime() {
    const now = Date.now();
    timeOnQuestion[cur] += now - lastTickAt;
    lastTickAt = now;
  }

  function emergencyPause() {
    if (usedEmergency) return;
    if (!confirm('Use your one emergency pause? The attempt will be flagged as non-official.')) return;
    usedEmergency = true;
    emergencyPaused = true;
    const pauseStart = Date.now();
    if (interval) clearInterval(interval);
    alert('Paused. Click OK to resume.');
    pauseAccum += Date.now() - pauseStart;
    emergencyPaused = false;
    lastTickAt = Date.now();
    interval = setInterval(tick, 1000);
    render();
  }

  function submitTest() {
    if (interval) clearInterval(interval);
    trackTime();
    list.forEach((q, i) => {
      const chosen = responses[i];
      store.recordAttempt({
        question_id: q.id, session_id: session.id,
        chosen_choice: chosen,
        is_correct: chosen === q.correct_choice,
        time_spent_ms: timeOnQuestion[i] || 0
      });
    });
    const correct = list.filter((q, i) => responses[i] === q.correct_choice).length;
    const scaled = rawToScaled(correct);
    store.endSession(session.id, {
      raw_score: correct, scaled_score_estimate: scaled, length_target: TOTAL
    });
    const today = new Date().toISOString().slice(0, 10);
    store.addDailyProgress(today, 45, TOTAL);
    ephemeral.set('mockReview', {
      sessionId: session.id, list, responses, flagged: [...flagged],
      correct, scaled, mode: 'mock', usedEmergency
    });
    navigate('/mock/review');
  }

  function tick() {
    if (timeLeft() === 0) submitTest();
    else render();
  }
  interval = setInterval(tick, 1000);
  window.addEventListener('hashchange', () => { if (interval) clearInterval(interval); }, { once: true });

  render();
  return root;
}

function indexInPassage(list, curIdx) {
  const cur = list[curIdx];
  if (!cur || !cur.passage_id) return -1;
  let n = 0;
  for (let i = 0; i <= curIdx; i++) {
    if (list[i].passage_id === cur.passage_id) n++;
  }
  return n; // 1-based marker number
}

function renderPassageBody(body, markerIdx) {
  const parts = body.split(/(\[Q\d+\])/);
  let count = 0;
  const out = h('div.text-sm.text-slate-700.whitespace-pre-line.max-h-\\[60vh\\].overflow-y-auto');
  for (const part of parts) {
    if (/^\[Q\d+\]$/.test(part)) {
      count++;
      const isCurrent = count === markerIdx;
      out.appendChild(h('span', {
        className: isCurrent
          ? 'inline-block bg-yellow-300 text-slate-900 font-bold px-2 rounded mx-0.5'
          : 'inline-block bg-slate-200 text-slate-500 px-1 rounded mx-0.5'
      }, isCurrent ? '★ ' + count : '◆ ' + count));
    } else {
      out.appendChild(document.createTextNode(part));
    }
  }
  return out;
}
