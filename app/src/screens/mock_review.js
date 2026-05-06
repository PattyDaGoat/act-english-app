import { h } from '../lib/dom.js';
import { ephemeral, store } from '../lib/store.js';
import { ExplanationPanel } from '../components/explanation_panel.js';
import { getTopic } from '../data/topics.js';
import { pct } from '../lib/util.js';

export function MockReviewScreen() {
  const data = ephemeral.get('mockReview');
  if (!data) {
    return h('div.bg-white.p-6.rounded-xl', [
      h('p.text-slate-700', 'No recent test to review.'),
      h('a.text-brand-600.hover\\:underline', { href: '#/' }, '← Home')
    ]);
  }
  const { list, responses, correct, scaled, mode, unaided, helpUsage, usedEmergency } = data;
  const accuracy = pct(correct, list.length);

  const missedTopics = new Map();
  list.forEach((q, i) => {
    if (responses[i] !== q.correct_choice) {
      const t = getTopic(q.primary_topic_id);
      if (!t) return;
      if (!missedTopics.has(t.id)) missedTopics.set(t.id, { topic: t, qIds: [], count: 0 });
      const e = missedTopics.get(t.id);
      e.qIds.push(q.id); e.count++;
    }
  });

  let filterMissed = false;
  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const visible = filterMissed
      ? list.map((q, i) => ({ q, i })).filter(x => responses[x.i] !== x.q.correct_choice)
      : list.map((q, i) => ({ q, i }));

    root.appendChild(h('div.space-y-6', [
      h('div.bg-white.rounded-xl.border.border-slate-200.p-6', [
        h('div.flex.items-baseline.justify-between.mb-4', [
          h('h1.text-2xl.font-bold.text-slate-900', mode === 'helped' ? 'Helped Test results' : 'Mock Test results'),
          usedEmergency ? h('span.text-xs.text-amber-700.font-medium', '⚑ Non-official (emergency pause used)') : null
        ]),
        h('div.grid.grid-cols-2.md\\:grid-cols-4.gap-4', [
          stat(`${correct}/${list.length}`, 'Raw correct'),
          stat(`${accuracy}%`, 'Accuracy'),
          stat(scaled, 'Estimated scaled score'),
          mode === 'helped'
            ? stat(unaided != null ? `${unaided}` : '—', 'Unaided score (no help)')
            : stat('45m', 'Section time')
        ]),
        mode === 'helped' && helpUsage
          ? h('div.mt-4.p-3.bg-blue-50.rounded-lg.text-sm.text-blue-900', [
              'Help used on ',
              h('span.font-bold', `${Object.values(helpUsage).filter(l => l > 0).length} question(s)`),
              ` · gap to close: `, h('span.font-bold', `${scaled - (unaided ?? scaled)} points`)
            ])
          : null
      ]),

      missedTopics.size > 0
        ? h('div.bg-rose-50.border.border-rose-200.rounded-xl.p-5', [
            h('h2.font-semibold.text-rose-900.mb-3', 'Concepts you missed'),
            h('ul.space-y-2', [...missedTopics.values()].map(e =>
              h('li.flex.items-center.justify-between.text-sm', [
                h('span.text-slate-800', e.topic.name),
                h('span.text-rose-700.font-medium', `${e.count} miss${e.count > 1 ? 'es' : ''}`)
              ])
            )),
            h('button.mt-3.bg-rose-600.text-white.text-sm.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-rose-700', {
              onClick: () => {
                let added = 0;
                missedTopics.forEach(e => e.qIds.forEach(qid => {
                  const r = store.addFlashcard({ source_question_id: qid });
                  if (r) added++;
                }));
                alert(`Added ${added} flashcard${added === 1 ? '' : 's'}.`);
              }
            }, 'Send all missed concepts to flashcards →')
          ])
        : h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-5.text-emerald-900',
            'Perfect mock test. Save this for the bragging rights folder.'),

      h('div.flex.items-center.justify-between', [
        h('h2.font-semibold.text-slate-900', `Question-by-question (${visible.length})`),
        h('label.flex.items-center.gap-2.text-sm.text-slate-700', [
          h('input', { type: 'checkbox', checked: filterMissed,
            onChange: (e) => { filterMissed = e.target.checked; render(); } }),
          'Show only missed'
        ])
      ]),

      h('div.space-y-2', visible.slice(0, 30).map(({ q, i }) => {
        const isCorrect = responses[i] === q.correct_choice;
        return h('details.bg-white.rounded-xl.border.border-slate-200.p-4', [
          h('summary.flex.items-center.justify-between.cursor-pointer.list-none', [
            h('span.text-sm.text-slate-700', `Q${i + 1}: ${q.stem.slice(0, 70)}${q.stem.length > 70 ? '…' : ''}`),
            h('span.text-sm.font-bold', { className: isCorrect ? 'text-emerald-600' : 'text-rose-600' },
              isCorrect ? '✓' : '✗')
          ]),
          h('div.mt-3',
            ExplanationPanel({ question: q, chosen: responses[i] || 'A',
              onAddFlashcard: () => store.addFlashcard({ source_question_id: q.id }),
              flashcardAdded: store.listFlashcards().some(c => c.source_question_id === q.id)
            }))
        ]);
      })),
      visible.length > 30 ? h('p.text-xs.text-slate-500.text-center',
        `Showing first 30 of ${visible.length}. Filter by "missed only" to focus.`) : null,

      h('div.flex.gap-3', [
        h('a.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-brand-600',
          { href: '#/analytics' }, 'See analytics'),
        h('a.flex-1.bg-white.border.border-slate-300.text-slate-700.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-slate-50',
          { href: '#/' }, 'Home')
      ])
    ]));
  }
  render();
  return root;
}

function stat(big, label) {
  return h('div.bg-slate-50.rounded-lg.p-4.text-center', [
    h('div.text-3xl.font-bold.text-slate-900', String(big)),
    h('div.text-xs.text-slate-600.uppercase.mt-1', label)
  ]);
}
