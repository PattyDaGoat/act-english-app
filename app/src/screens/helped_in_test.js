// Helped Test: same structure as Mock + 4-level Help button per §7.
// Two scores reported: raw (helped questions correct only if right)
// AND unaided (any helped question = wrong).
import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { getPassage } from '../data/passages.js';
import { getTopic } from '../data/topics.js';
import { fmtTime, rawToScaled } from '../lib/util.js';
import { buildMockTestList } from '../lib/test_builder.js';

export function HelpedInTestScreen() {
  const TOTAL = 75;
  const TIME_MS = 45 * 60 * 1000;

  const list = buildMockTestList(TOTAL);

  const session = store.startSession({ mode: 'helped', length_target: TOTAL });
  const startedAt = Date.now();
  const responses = new Array(TOTAL).fill(null);
  const helpLevels = new Array(TOTAL).fill(0); // 0..4
  const eliminated = new Array(TOTAL).fill(null).map(() => new Set());
  const flagged = new Set();
  const timeOnQuestion = new Array(TOTAL).fill(0);
  let cur = 0;
  let lastTickAt = Date.now();
  let interval = null;

  const root = h('div.mock-shell.min-h-screen.flex.flex-col');

  function timeLeft() { return Math.max(0, TIME_MS - (Date.now() - startedAt)); }

  function bumpHelp() {
    const q = list[cur];
    helpLevels[cur] = Math.min(4, helpLevels[cur] + 1);
    if (helpLevels[cur] === 3 && eliminated[cur].size === 0) {
      const wrongs = ['A','B','C','D'].filter(L => L !== q.correct_choice);
      eliminated[cur].add(wrongs[Math.floor(Math.random() * wrongs.length)]);
    }
    if (helpLevels[cur] === 4) {
      responses[cur] = q.correct_choice;
    }
    render();
  }

  function helpHint() {
    const q = list[cur];
    const lvl = helpLevels[cur];
    if (lvl === 0) return null;
    const t = getTopic(q.primary_topic_id);
    const lines = [];
    if (lvl >= 1) lines.push(['Concept tag', t ? t.name : '—']);
    if (lvl >= 2) lines.push(['Rule of thumb', q.takeaway]);
    if (lvl >= 3) lines.push(['Eliminated', [...eliminated[cur]].join(', ')]);
    if (lvl >= 4) lines.push(['Answer', `${q.correct_choice} — ${q.explanation_correct}`]);
    return h('div.bg-blue-50.border.border-blue-200.rounded-xl.p-4.space-y-2', [
      h('div.text-xs.font-bold.text-blue-800.uppercase', `Help level ${lvl} of 4`),
      ...lines.map(([label, body]) =>
        h('div', [
          h('div.text-xs.font-bold.text-blue-700', label),
          h('p.text-sm.text-blue-900', body || '—')
        ])
      )
    ]);
  }

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const remaining = timeLeft();
    if (remaining === 0) { submitTest(); return; }
    const q = list[cur];
    const passage = q.passage_id ? getPassage(q.passage_id) : null;
    const lvl = helpLevels[cur];

    root.appendChild(h('div.flex.flex-col.min-h-screen', [
      h('div.bg-white.border-b.border-slate-200.px-4.py-3.flex.items-center.justify-between.sticky.top-0.z-10', [
        h('div.flex.items-center.gap-3', [
          h('span.bg-blue-100.text-blue-800.text-xs.font-bold.px-2.py-1.rounded', 'HELPED TEST'),
          h('span.text-sm.text-slate-600', `Question ${cur + 1} of ${TOTAL}`)
        ]),
        h('div.flex.items-center.gap-4', [
          h('span.mock-timer.text-2xl.font-bold.font-mono', { className: remaining < 60000 ? 'text-rose-600' : 'text-slate-900' },
            fmtTime(remaining))
        ])
      ]),

      h('div.flex-1.grid.grid-cols-1.md\\:grid-cols-2.gap-4.p-4.max-w-6xl.mx-auto.w-full', [
        h('div.bg-white.rounded-xl.border.border-slate-200.p-5.passage', [
          passage ? [
            h('h3.font-semibold.text-slate-900.mb-2', passage.title),
            renderPassageBody(passage.body, indexInPassage(list, cur))
          ] : h('div.text-sm.text-slate-500.italic', 'Standalone question — no passage.')
        ]),
        h('div.space-y-3', [
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
                const elim = eliminated[cur].has(L);
                return h('button.w-full.text-left.p-3.rounded-lg.border-2.flex.items-start.gap-3.transition', {
                  className: elim ? 'border-slate-200 bg-slate-100 line-through opacity-50'
                    : sel ? 'border-brand-500 bg-brand-50'
                    : 'border-slate-200 hover:bg-slate-50',
                  disabled: elim,
                  onClick: () => { if (!elim) { responses[cur] = L; render(); } }
                }, [
                  h('span.flex-shrink-0.w-7.h-7.rounded-full.flex.items-center.justify-center.text-sm.font-bold', {
                    className: sel ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'
                  }, L),
                  h('span.text-sm.text-slate-900', q.choices[L])
                ]);
              })
            ),
            h('button.w-full.bg-blue-600.text-white.font-semibold.py-2\\.5.rounded-lg.hover\\:bg-blue-700.disabled\\:opacity-50', {
              disabled: lvl >= 4,
              onClick: bumpHelp
            }, lvl === 0 ? 'Get help' : lvl < 4 ? `More help (level ${lvl + 1})` : 'Help maxed')
          ]),
          helpHint()
        ])
      ]),

      h('div.bg-white.border-t.border-slate-200.px-4.py-3.sticky.bottom-0', [
        h('div.max-w-6xl.mx-auto.flex.items-center.justify-between.gap-4', [
          h('button.px-4.py-2.text-slate-700.font-medium.disabled\\:opacity-30', {
            onClick: () => { trackTime(); if (cur > 0) { cur--; render(); } }, disabled: cur === 0
          }, '← Previous'),
          h('div.flex.gap-1.flex-wrap.max-w-md.justify-center',
            list.map((_, i) => {
              const ans = responses[i] !== null;
              const helped = helpLevels[i] > 0;
              return h('button.w-7.h-7.text-xs.rounded.font-medium', {
                className: i === cur ? 'bg-brand-600 text-white'
                  : helped ? 'bg-blue-200 text-blue-900'
                  : ans ? 'bg-emerald-200 text-emerald-900'
                  : 'bg-slate-100 text-slate-500',
                onClick: () => { trackTime(); cur = i; render(); }
              }, i + 1);
            })
          ),
          cur === TOTAL - 1
            ? h('button.bg-emerald-600.text-white.font-semibold.px-4.py-2.rounded-lg', {
                onClick: () => { if (confirm('Submit the test?')) submitTest(); }
              }, 'Submit')
            : h('button.px-4.py-2.bg-brand-500.text-white.font-medium.rounded-lg', {
                onClick: () => { trackTime(); if (cur < TOTAL - 1) { cur++; render(); } }
              }, 'Next →')
        ])
      ])
    ]));
  }

  function trackTime() {
    const now = Date.now();
    timeOnQuestion[cur] += now - lastTickAt;
    lastTickAt = now;
  }

  function submitTest() {
    if (interval) clearInterval(interval);
    trackTime();
    list.forEach((q, i) => {
      const chosen = responses[i];
      const lvl = helpLevels[i];
      const isCorrect = chosen === q.correct_choice;
      store.recordAttempt({
        question_id: q.id, session_id: session.id,
        chosen_choice: chosen, is_correct: isCorrect,
        time_spent_ms: timeOnQuestion[i] || 0,
        help_level_used: lvl
      });
    });
    const correct = list.filter((q, i) => responses[i] === q.correct_choice).length;
    const unaidedCorrect = list.filter((q, i) => helpLevels[i] === 0 && responses[i] === q.correct_choice).length;
    const scaled = rawToScaled(correct);
    const unaidedScaled = rawToScaled(unaidedCorrect);
    store.endSession(session.id, {
      raw_score: correct, scaled_score_estimate: scaled, unaided_score: unaidedScaled, length_target: TOTAL
    });
    const today = new Date().toISOString().slice(0, 10);
    store.addDailyProgress(today, 45, TOTAL);
    ephemeral.set('mockReview', {
      sessionId: session.id, list, responses, flagged: [...flagged],
      correct, scaled, mode: 'helped', unaided: unaidedScaled,
      helpUsage: helpLevels
    });
    navigate('/mock/review');
  }

  function tick() { if (timeLeft() === 0) submitTest(); else render(); }
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
  return n;
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
