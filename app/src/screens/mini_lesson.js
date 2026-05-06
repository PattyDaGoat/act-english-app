import { h } from '../lib/dom.js';
import { getMiniLesson } from '../data/mini_lessons.js';
import { getTopic } from '../data/topics.js';
import { navigate, getQuery } from '../lib/router.js';
import { youtubeSearchUrl, youtubeQueryFor, recommendedChannels } from '../lib/videos.js';
import { getInteractive } from '../data/interactives.js';
import { renderWithGlossary } from '../data/glossary.js';

export function MiniLessonScreen() {
  const q = getQuery();
  const topicId = q.topic;
  const lesson = topicId ? getMiniLesson(topicId) : null;
  const topic = topicId ? getTopic(topicId) : null;

  if (!lesson) {
    return h('div.bg-white.p-6.rounded-xl', [
      h('p.text-slate-700', 'No mini-lesson available for this topic yet.'),
      h('a.text-brand-600.hover\\:underline', { href: '#/' }, '← Home')
    ]);
  }

  const interactive = getInteractive(topicId);

  return h('div.space-y-5', [
    h('div.flex.items-center.gap-2.text-sm', [
      h('a.text-brand-600.hover\\:underline', { href: '#/analytics' }, '← Analytics'),
      topic ? h('span.text-slate-400', '·') : null,
      topic ? h('span.text-slate-500.uppercase.text-xs.font-semibold',
        topic.category === 'CSE' ? 'Conventions of Standard English'
          : topic.category === 'POW' ? 'Production of Writing'
          : 'Knowledge of Language') : null
    ]),

    h('div.bg-white.rounded-xl.border.border-slate-200.p-6', [
      h('h1.text-2xl.font-bold.text-slate-900.mb-2', lesson.title),
      h('div.flex.items-center.gap-2.text-xs.text-slate-500.mb-4', [
        h('span', '⏱️ ~60–90s'),
        h('span', '·'),
        h('span', 'Mini-lesson')
      ]),
      h('div.space-y-3.text-slate-800.leading-relaxed',
        lesson.body.map(p => h('p', renderWithGlossary(p)))
      )
    ]),

    h('div.bg-amber-50.border.border-amber-200.rounded-xl.p-5', [
      h('h2.font-semibold.text-amber-900.mb-3', '💡 Rule of thumb'),
      h('p.text-amber-900.font-medium', renderWithGlossary(lesson.rule_of_thumb)),
      h('p.text-xs.text-amber-700.mt-2.italic', 'Tap any underlined grammar term for a quick definition.')
    ]),

    // Interactive practice widget — small "tap the error" exercise rendered
    // when the topic has one defined.
    interactive ? h('div.bg-purple-50.border.border-purple-200.rounded-xl.p-5', [
      h('div.flex.items-center.gap-2.mb-3', [
        h('span.text-xs.font-bold.bg-purple-200.text-purple-900.px-2.py-1.rounded.uppercase', '⚡ Try it'),
        h('h2.font-semibold.text-purple-900', interactive.title)
      ]),
      h('p.text-sm.text-purple-900.mb-4', interactive.instruction),
      TapTheError(interactive)
    ]) : null,

    // Watch a video — opens YouTube search in a new tab.
    h('div.bg-red-50.border.border-red-200.rounded-xl.p-5', [
      h('div.flex.items-center.gap-2.mb-2', [
        h('span.text-2xl', '📺'),
        h('h2.font-semibold.text-red-900', 'Watch a video on this topic')
      ]),
      h('p.text-sm.text-red-900.mb-3',
        `Click below to open a YouTube search for this exact ACT English topic. Free channels with strong ACT English content include ${recommendedChannels().slice(0, 4).join(', ')}.`),
      h('a.inline-flex.items-center.gap-2.bg-red-600.text-white.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-red-700', {
        href: youtubeSearchUrl(topicId),
        target: '_blank',
        rel: 'noopener noreferrer'
      }, [
        h('span', `Search "${youtubeQueryFor(topicId)}"`),
        h('span', '↗')
      ])
    ]),

    lesson.examples && lesson.examples.length > 0
      ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
          h('h2.font-semibold.text-slate-900.mb-3', 'Quick examples'),
          h('ul.space-y-3',
            lesson.examples.map(([ex, note]) =>
              h('li.text-sm', [
                h('div.text-slate-900.font-mono.bg-slate-50.p-2.rounded', ex),
                note ? h('div.text-xs.text-slate-600.mt-1.italic', note) : null
              ])
            )
          )
        ])
      : null,

    h('div.flex.gap-3', [
      h('a.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-brand-600',
        { href: `#/drill?topic=${topicId}` }, 'Drill this topic →'),
      h('a.flex-1.bg-white.border.border-slate-300.text-slate-700.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-slate-50',
        { href: '#/analytics' }, 'Back to analytics')
    ])
  ]);
}

// Interactive "tap the error" widget. The student clicks the word/phrase
// they think is wrong; the widget colors their pick and shows feedback.
function TapTheError(interactive) {
  const root = h('div');
  let picked = null;

  function paint() {
    while (root.firstChild) root.removeChild(root.firstChild);

    const sentence = h('div.bg-white.border.border-purple-200.rounded-lg.p-4.text-base.text-slate-900.leading-loose');
    interactive.tokens.forEach((tok, i) => {
      if (tok.type === 'static') {
        sentence.appendChild(document.createTextNode(tok.text));
      } else {
        const span = h('span.tap-error-word', { onClick: () => { picked = i; paint(); } }, tok.text);
        if (picked === i) {
          // Clicking the ERROR is the correct action → green; clicking a
          // non-error word → red.
          span.className = 'tap-error-word ' + (tok.is_error ? 'correct' : 'wrong');
        }
        sentence.appendChild(span);
      }
    });
    root.appendChild(sentence);

    if (picked !== null) {
      const tok = interactive.tokens[picked];
      const right = tok.is_error;
      root.appendChild(h('div.mt-3.text-sm', { className: right ? 'text-emerald-700' : 'text-rose-700' }, [
        h('span.font-semibold', right ? '✓ Got it. ' : '✗ Not that one. '),
        h('span', interactive.feedback || (right
          ? 'That\'s the error.'
          : 'Try clicking a different word.'))
      ]));
      if (right) {
        root.appendChild(h('div.mt-2.text-sm.text-slate-700.bg-emerald-50.border.border-emerald-200.rounded.p-3', [
          h('span.font-semibold', 'Why: '),
          h('span', interactive.explanation)
        ]));
      }
    } else {
      root.appendChild(h('p.text-xs.text-purple-700.mt-2.italic',
        'Click the word or phrase you think is wrong.'));
    }
  }

  paint();
  return root;
}
