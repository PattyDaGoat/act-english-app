import { h } from '../lib/dom.js';
import { ephemeral, store } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { getTopic } from '../data/topics.js';
import { getMiniLesson } from '../data/mini_lessons.js';
import { getRationale } from '../data/rationales.js';
import { youtubeSearchUrl, youtubeQueryFor, recommendedChannels } from '../lib/videos.js';
import { renderWithGlossary } from '../data/glossary.js';
import { getTips } from '../data/improvement_tips.js';
import { pct, fmtTime } from '../lib/util.js';

export function SessionSummaryScreen() {
  const summary = ephemeral.get('lastSummary');
  if (!summary) {
    return h('div.bg-white.p-6.rounded-xl', [
      h('p.text-slate-700', 'No recent session to summarize.'),
      h('a.text-brand-600.hover\\:underline', { href: '#/' }, '← Home')
    ]);
  }
  const { results, mode } = summary;
  const correct = results.filter(r => r.isCorrect).length;
  const accuracy = pct(correct, results.length);
  const totalMs = results.reduce((acc, r) => acc + r.timeMs, 0);
  const avgSec = Math.round(totalMs / results.length / 1000);

  // Group by topic — separating missed from covered (for Lesson Mode it's
  // useful to show all topics covered, not just missed).
  const allTopics = new Map();   // tid → { topic, total, missed, qIds }
  for (const r of results) {
    const t = getTopic(r.q.primary_topic_id);
    if (!t) continue;
    if (!allTopics.has(t.id)) allTopics.set(t.id, { topic: t, total: 0, missed: 0, qIds: [] });
    const e = allTopics.get(t.id);
    e.total++;
    if (!r.isCorrect) { e.missed++; e.qIds.push(r.q.id); }
  }
  const missedTopics  = [...allTopics.values()].filter(e => e.missed > 0);
  const coveredTopics = [...allTopics.values()];

  // Topics to show resources for: prefer missed; if none missed, use covered.
  const resourceTopics = missedTopics.length > 0 ? missedTopics : coveredTopics;

  const cardsAdded = store.listFlashcards().length;

  return h('div.space-y-6', [
    h('div.bg-white.rounded-xl.border.border-slate-200.p-6', [
      h('div.flex.items-baseline.justify-between.mb-4', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Session complete!'),
        h('span.text-sm.text-slate-500.uppercase', mode)
      ]),
      h('div.grid.grid-cols-3.gap-4', [
        statTile(`${correct}/${results.length}`, 'Correct'),
        statTile(`${accuracy}%`, 'Accuracy'),
        statTile(`${avgSec}s`, 'Avg / question')
      ])
    ]),

    missedTopics.length > 0
      ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
          h('h2.font-semibold.text-slate-900.mb-3', 'Concepts you missed'),
          h('ul.space-y-2', missedTopics.map(e =>
            h('li.flex.items-center.justify-between.text-sm.py-2.border-b.border-slate-100.last\\:border-0', [
              h('span.text-slate-800', e.topic.name),
              h('div.flex.items-center.gap-3', [
                h('span.text-rose-600.font-medium', `${e.missed} miss${e.missed > 1 ? 'es' : ''}`),
                h('button.text-brand-600.text-xs.hover\\:underline', {
                  onClick: (ev) => {
                    e.qIds.forEach(qid => store.addFlashcard({ source_question_id: qid }));
                    ev.target.textContent = '✓ Added';
                  }
                }, '+ Flashcards')
              ])
            ])
          ))
        ])
      : h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-5.text-emerald-900',
          '🎉 No misses this session. Nice work.'),

    // How-to-improve advice — only when there were misses.
    missedTopics.length > 0
      ? h('div.bg-gradient-to-br.from-amber-50.to-orange-50.border.border-amber-300.rounded-xl.p-5', [
          h('div.flex.items-center.gap-2.mb-3', [
            h('span.text-2xl', '🎯'),
            h('div', [
              h('h2.font-semibold.text-amber-900', 'How to get better at the topics you missed'),
              h('p.text-xs.text-amber-800',
                'Concrete next steps for each topic — based on the patterns that usually trip students up.')
            ])
          ]),
          h('div.space-y-3', missedTopics.map(e => improvementCard(e)))
        ])
      : null,

    // Per-topic resources block — YouTube search, mini-lesson, drill, rationale.
    resourceTopics.length > 0
      ? h('div.bg-gradient-to-br.from-indigo-50.to-purple-50.border.border-indigo-200.rounded-xl.p-5', [
          h('div.flex.items-center.gap-2.mb-3', [
            h('span.text-2xl', '📚'),
            h('div', [
              h('h2.font-semibold.text-indigo-900', 'Resources to keep getting better'),
              h('p.text-xs.text-indigo-700',
                missedTopics.length > 0
                  ? 'Focused on the topics you missed. Mix and match — videos for visual explanation, mini-lessons for the rule, drill for practice.'
                  : 'Resources for every topic this session covered.')
            ])
          ]),
          h('div.space-y-3', resourceTopics.map(e => topicResourceCard(e)))
        ])
      : null,

    // Curated YouTube channel hint.
    h('div.bg-red-50.border.border-red-200.rounded-xl.p-4.text-sm', [
      h('div.font-semibold.text-red-900.mb-1', '📺 Recommended free YouTube channels for ACT English'),
      h('p.text-red-900',
        recommendedChannels().join(' · ') + '. Search for any topic name + "ACT English" on these channels for a video explanation.')
    ]),

    h('div.flex.gap-3', [
      h('a.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-brand-600',
        { href: '#/lesson-mode' }, 'Another lesson →'),
      h('a.flex-1.bg-white.border.border-slate-300.text-slate-700.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-slate-50',
        { href: '#/' }, 'Back to home')
    ]),

    h('p.text-xs.text-slate-500.text-center', `You have ${cardsAdded} flashcard${cardsAdded === 1 ? '' : 's'} ready to review.`)
  ]);
}

function topicResourceCard(e) {
  const t = e.topic;
  const lesson = getMiniLesson(t.id);
  const rationale = getRationale(t.id);

  return h('div.bg-white.border.border-slate-200.rounded-lg.p-4', [
    h('div.flex.items-start.justify-between.mb-2.gap-3', [
      h('div', [
        h('h3.font-semibold.text-slate-900', t.name),
        e.missed > 0
          ? h('div.text-xs.text-rose-600', `${e.missed} of ${e.total} missed this session`)
          : h('div.text-xs.text-emerald-600', `${e.total} attempted, all correct`)
      ])
    ]),
    rationale ? h('details.mb-3', [
      h('summary.cursor-pointer.list-none.text-xs.font-semibold.text-indigo-700.uppercase.tracking-wide',
        '🤔 Why this rule exists ▾'),
      h('p.text-sm.text-slate-700.mt-2.leading-relaxed', renderWithGlossary(rationale))
    ]) : null,
    h('div.grid.grid-cols-1.sm\\:grid-cols-3.gap-2', [
      h('a.flex.items-center.gap-2.bg-red-50.border.border-red-200.text-red-900.text-sm.font-medium.px-3.py-2.rounded.hover\\:bg-red-100', {
        href: youtubeSearchUrl(t.id), target: '_blank', rel: 'noopener noreferrer'
      }, [h('span', '📺'), h('span', 'Watch a video ↗')]),
      lesson ? h('a.flex.items-center.gap-2.bg-blue-50.border.border-blue-200.text-blue-900.text-sm.font-medium.px-3.py-2.rounded.hover\\:bg-blue-100',
        { href: `#/lesson?topic=${t.id}` },
        [h('span', '📖'), h('span', 'Read mini-lesson')]) : null,
      h('a.flex.items-center.gap-2.bg-emerald-50.border.border-emerald-200.text-emerald-900.text-sm.font-medium.px-3.py-2.rounded.hover\\:bg-emerald-100',
        { href: `#/drill?topic=${t.id}` },
        [h('span', '⏱️'), h('span', 'Drill this topic')])
    ]),
    h('div.text-xs.text-slate-500.mt-2',
      `Video search: "${youtubeQueryFor(t.id)}"`)
  ]);
}

// Improvement card — surfaces the per-topic action plan for a missed topic.
function improvementCard(e) {
  const tips = getTips(e.topic.id);
  if (!tips) return null;
  return h('div.bg-white.border.border-amber-200.rounded-lg.p-4', [
    h('div.flex.items-baseline.justify-between.mb-2.gap-3.flex-wrap', [
      h('h3.font-semibold.text-slate-900', e.topic.name),
      h('span.text-xs.text-rose-600.font-medium', `${e.missed} miss${e.missed > 1 ? 'es' : ''} this session`)
    ]),
    h('p.text-sm.text-amber-900.font-medium.italic.mb-2', tips.headline),
    h('div.text-xs.font-bold.text-amber-800.uppercase.tracking-wide.mb-1', 'Do this next:'),
    h('ol.list-decimal.list-inside.text-sm.text-slate-700.space-y-1.leading-relaxed',
      tips.actions.map(a => h('li', renderWithGlossary(a)))),
    h('div.mt-3.flex.gap-2.flex-wrap', [
      h('a.text-xs.bg-emerald-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-emerald-700',
        { href: `#/drill?topic=${e.topic.id}` }, '⏱️ Drill 5 of these →'),
      h('a.text-xs.bg-blue-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-blue-700',
        { href: `#/lesson-mode` }, '📚 Lesson Mode'),
      h('a.text-xs.bg-red-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-red-700',
        { href: youtubeSearchUrl(e.topic.id), target: '_blank', rel: 'noopener noreferrer' }, '📺 Watch a video ↗')
    ])
  ]);
}

function statTile(big, label) {
  return h('div.bg-slate-50.rounded-lg.p-4.text-center', [
    h('div.text-3xl.font-bold.text-slate-900', big),
    h('div.text-xs.text-slate-600.uppercase.mt-1', label)
  ]);
}
