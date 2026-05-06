// Post-submit explanation panel — the heart of Guided Practice.
// Now also offers a "Watch a video on this topic" link that opens YouTube
// search for reputable free ACT English channels in a new tab, and a
// step-by-step rule-application breakdown that the student can reveal.
import { h } from '../lib/dom.js';
import { getTopic } from '../data/topics.js';
import { getMiniLesson } from '../data/mini_lessons.js';
import { getDiagnostic } from '../data/diagnostics.js';
import { getRationale } from '../data/rationales.js';
import { renderWithGlossary } from '../data/glossary.js';
import { youtubeSearchUrl, youtubeQueryFor } from '../lib/videos.js';

export function ExplanationPanel({ question, chosen, onAddFlashcard, flashcardAdded, onRetry }) {
  const correct = question.correct_choice;
  const isCorrect = chosen === correct;
  const topic = getTopic(question.primary_topic_id);
  const diagnostic = getDiagnostic(question.primary_topic_id);

  return h('div.rounded-xl.border-2.p-5.space-y-4.celebrate', {
    className: isCorrect ? 'border-emerald-300 bg-emerald-50 celebrate-correct' : 'border-rose-300 bg-rose-50'
  }, [
    h('div.flex.items-start.justify-between.gap-3', [
      h('div', [
        h('div.text-2xl.font-bold', { className: isCorrect ? 'text-emerald-700' : 'text-rose-700' },
          isCorrect ? '✓ Correct' : '✗ Not quite'),
        !isCorrect ? h('div.text-sm.text-slate-700.mt-1',
          ['You chose ', h('span.font-semibold', chosen), '. Correct answer: ',
           h('span.font-semibold.text-emerald-700', correct)]) : null
      ]),
      topic ? h('span.bg-white.px-3.py-1.rounded-full.text-xs.font-semibold.text-slate-700.border.border-slate-200',
        topic.name) : null
    ]),

    // "Try again" interactive — only shown when the student missed it.
    !isCorrect && onRetry ? h('button.w-full.bg-amber-100.border.border-amber-300.text-amber-900.font-medium.py-2.rounded-lg.hover\\:bg-amber-200', {
      onClick: onRetry
    }, '🔄 Hide explanation and try once more') : null,

    h('div.bg-white.rounded-lg.p-4.border.border-slate-200', [
      h('div.text-xs.font-bold.text-emerald-700.uppercase.tracking-wide.mb-1',
        `Why ${correct} is correct`),
      h('p.text-slate-800.text-sm.leading-relaxed', renderWithGlossary(question.explanation_correct))
    ]),

    // Step-by-step rule application (collapsed by default).
    diagnostic ? h('details.bg-white.rounded-lg.p-4.border.border-slate-200', [
      h('summary.cursor-pointer.list-none.flex.items-center.justify-between', [
        h('span.text-xs.font-bold.text-blue-700.uppercase.tracking-wide',
          '🧭 How a top scorer would solve this — step by step'),
        h('span.text-slate-400', '▾')
      ]),
      h('ol.list-decimal.list-inside.text-sm.text-slate-700.mt-3.space-y-1.leading-relaxed',
        diagnostic.map(step => h('li', renderWithGlossary(step))))
    ]) : null,

    h('div.bg-white.rounded-lg.p-4.border.border-slate-200', [
      h('div.text-xs.font-bold.text-rose-700.uppercase.tracking-wide.mb-2', 'Why the other answers are wrong'),
      h('ul.space-y-2.text-sm',
        Object.entries(question.explanation_distractors).map(([letter, expl]) =>
          h('li.flex.gap-2', [
            h('span.font-bold.text-slate-500.flex-shrink-0', letter + ':'),
            h('span.text-slate-700.leading-relaxed', renderWithGlossary(expl))
          ])
        )
      )
    ]),

    h('div.bg-amber-50.border.border-amber-200.rounded-lg.p-4', [
      h('div.text-xs.font-bold.text-amber-800.uppercase.tracking-wide.mb-1', '💡 Rule of thumb'),
      h('p.text-amber-900.text-sm.font-medium', renderWithGlossary(question.takeaway)),
      h('p.text-xs.text-amber-700.mt-1.italic', 'Tip: tap any underlined grammar term for a quick definition.')
    ]),

    // Per-topic rationale: WHY this rule exists. Plain-English so the student
    // builds intuition instead of memorizing.
    getRationale(question.primary_topic_id)
      ? h('details.bg-indigo-50.border.border-indigo-200.rounded-lg.p-4', [
          h('summary.cursor-pointer.list-none.flex.items-center.justify-between', [
            h('span.text-xs.font-bold.text-indigo-700.uppercase.tracking-wide',
              '🤔 WHY this rule exists'),
            h('span.text-slate-400', '▾')
          ]),
          h('p.text-indigo-900.text-sm.mt-2.leading-relaxed', renderWithGlossary(getRationale(question.primary_topic_id)))
        ])
      : null,

    // Watch a video — opens YouTube search in a new tab.
    h('a.flex.items-center.justify-between.bg-red-50.border.border-red-200.rounded-lg.p-3.text-red-900.text-sm.hover\\:bg-red-100.transition', {
      href: youtubeSearchUrl(question.primary_topic_id),
      target: '_blank',
      rel: 'noopener noreferrer'
    }, [
      h('span', [
        h('span.font-semibold', '📺 Watch a video on this topic '),
        h('span.text-red-700.text-xs', `· "${youtubeQueryFor(question.primary_topic_id)}"`)
      ]),
      h('span.text-xs.text-red-700', 'opens YouTube ↗')
    ]),

    getMiniLesson(question.primary_topic_id)
      ? h('a.flex.items-center.justify-between.bg-blue-50.border.border-blue-200.rounded-lg.p-3.text-blue-900.text-sm.hover\\:bg-blue-100',
          { href: `#/lesson?topic=${question.primary_topic_id}` }, [
            h('span', `📖 Read the concept primer: ${topic ? topic.name : ''}`),
            h('span.text-xs.text-blue-700', '~60–90s →')
          ])
      : null,

    onAddFlashcard ? h('button.w-full.bg-white.border-2.border-slate-200.text-slate-700.font-medium.py-2\\.5.rounded-lg.hover\\:bg-slate-50.transition', {
      onClick: onAddFlashcard,
      disabled: flashcardAdded
    }, flashcardAdded ? '✓ Added to flashcards' : '🃏 Add this concept to flashcards') : null
  ]);
}
