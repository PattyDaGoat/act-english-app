import { h } from '../lib/dom.js';
import { leafTopics, categoryName } from '../data/topics.js';
import { questionsForTopic } from '../data/questions.js';
import { computeWeakTopics } from '../lib/analytics.js';
import { ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';

export function GuidedSetupScreen() {
  let length = 10;
  let topicId = null;     // null = mixed
  let useWeak = false;

  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const topics = leafTopics().filter(t => questionsForTopic(t.id).length > 0);
    const weak = computeWeakTopics();

    root.appendChild(h('div.space-y-6', [
      h('div', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Guided Practice'),
        h('p.text-slate-600.mt-1',
          'Every question is followed by a full explanation — what the right answer is and why each wrong answer is wrong.')
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Session length'),
        h('div.flex.gap-2',
          [5,10,20,30].map(n =>
            h('button.flex-1.py-2.rounded-lg.border-2.font-medium', {
              className: length === n ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600',
              onClick: () => { length = n; render(); }
            }, `${n} questions`)
          )
        )
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Topic'),
        h('div.flex.flex-wrap.gap-2.mb-3', [
          chip('Mixed (all topics)', topicId === null && !useWeak, () => { topicId = null; useWeak = false; render(); }),
          chip(`My weak topics${weak.length ? ' (' + weak.length + ')' : ''}`,
            useWeak, () => {
              if (weak.length === 0) { alert('Need more practice data first.'); return; }
              useWeak = true; topicId = null; render();
            })
        ]),
        h('div.text-xs.text-slate-500.uppercase.font-semibold.mb-2', 'Or pick one topic'),
        h('div.flex.flex-wrap.gap-2',
          topics.map(t => chip(`${t.name}`, topicId === t.id,
            () => { topicId = t.id; useWeak = false; render(); }))
        )
      ]),

      h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600', {
        onClick: () => {
          ephemeral.set('guidedConfig', { length, topicId, useWeak });
          navigate('/guided/run');
        }
      }, `Start ${length}-question session →`)
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
