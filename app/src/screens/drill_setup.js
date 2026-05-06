import { h } from '../lib/dom.js';
import { leafTopics, getTopic } from '../data/topics.js';
import { questionsForTopic, allQuestions } from '../data/questions.js';
import { ephemeral } from '../lib/store.js';
import { navigate, getQuery } from '../lib/router.js';
import { computeWeakTopics } from '../lib/analytics.js';

export function DrillSetupScreen() {
  const q = getQuery();
  let topicId = q.topic || null;
  let length = 10;
  let difficulty = 'mixed';

  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const topics = leafTopics().filter(t => questionsForTopic(t.id).length > 0);
    const weak = computeWeakTopics();
    const suggested = weak[0];

    root.appendChild(h('div.space-y-6', [
      h('div', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Timed Drill'),
        h('p.text-slate-600.mt-1', 'Short focused set, ACT-paced at 36 seconds per question.')
      ]),

      suggested && !topicId ? h('div.bg-purple-50.border.border-purple-200.rounded-xl.p-4.flex.items-center.justify-between', [
        h('div', [
          h('div.text-xs.font-bold.text-purple-700.uppercase', '✨ Suggested'),
          h('div.text-slate-800', `Drill ${suggested.name} — your weakest topic (${suggested.accuracy}%)`)
        ]),
        h('button.bg-purple-600.text-white.text-sm.font-semibold.px-4.py-2.rounded-lg', {
          onClick: () => { topicId = suggested.topic_id; render(); }
        }, 'Use')
      ]) : null,

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Topic'),
        topicId ? h('div.flex.items-center.justify-between', [
          h('span.font-medium.text-slate-800', getTopic(topicId)?.name || topicId),
          h('button.text-sm.text-brand-600.hover\\:underline', { onClick: () => { topicId = null; render(); } }, 'Change')
        ]) : h('div.flex.flex-wrap.gap-2',
          topics.map(t => chip(t.name, false, () => { topicId = t.id; render(); }))
        )
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Length'),
        h('div.flex.gap-2',
          [5, 10, 15].map(n =>
            h('button.flex-1.py-2.rounded-lg.border-2.font-medium', {
              className: length === n ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600',
              onClick: () => { length = n; render(); }
            }, `${n} questions · ${Math.round(n * 36 / 60 * 10) / 10} min`)
          )
        )
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Difficulty'),
        h('div.grid.grid-cols-4.gap-2',
          ['easy', 'medium', 'hard', 'mixed'].map(d =>
            h('button.py-2.rounded-lg.border-2.font-medium.text-sm.capitalize', {
              className: difficulty === d ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600',
              onClick: () => { difficulty = d; render(); }
            }, d)
          )
        )
      ]),

      h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600.disabled\\:opacity-50', {
        disabled: !topicId,
        onClick: () => {
          ephemeral.set('drillConfig', { topicId, length, difficulty });
          navigate('/drill/run');
        }
      }, topicId ? `Start drill →` : 'Pick a topic first')
    ]));
  }
  render();
  return root;
}

function chip(label, active, onClick) {
  return h('button.px-3.py-1\\.5.rounded-full.text-sm.font-medium.border-2', {
    className: active ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50',
    onClick
  }, label);
}
