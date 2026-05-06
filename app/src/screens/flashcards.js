import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { getQuestion } from '../data/questions.js';
import { getTopic } from '../data/topics.js';
import { applyReview, isDue } from '../lib/sm2.js';
import { todayISO } from '../lib/util.js';

export function FlashcardsScreen() {
  const cards = store.listFlashcards();
  const today = todayISO();
  const dueCards = cards.filter(c => isDue(c, today));

  const root = h('div');

  let mode = 'overview';
  let queue = [];
  let idx = 0;
  let revealed = false;

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    if (mode === 'review') root.appendChild(reviewView());
    else root.appendChild(overviewView());
  }

  function overviewView() {
    return h('div.space-y-6', [
      h('div.flex.items-baseline.justify-between', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Flashcards'),
        h('span.text-sm.text-slate-500', `${cards.length} total`)
      ]),

      h('div.grid.grid-cols-3.gap-4', [
        statTile(dueCards.length, 'Due today', 'text-rose-600'),
        statTile(cards.length - dueCards.length, 'Scheduled later', 'text-slate-700'),
        statTile(cards.filter(c => c.lapse_count > 0).length, 'Lapsed (review more)', 'text-amber-600')
      ]),

      dueCards.length > 0
        ? h('button.w-full.bg-brand-500.text-white.font-semibold.py-3\\.5.rounded-lg.hover\\:bg-brand-600', {
            onClick: () => { queue = [...dueCards]; idx = 0; revealed = false; mode = 'review'; render(); }
          }, `Review ${dueCards.length} due card${dueCards.length === 1 ? '' : 's'} →`)
        : h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-5.text-emerald-900.text-center',
            '🎉 No cards due. Great job staying on top of reviews.'),

      cards.length > 0 ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'All cards'),
        h('ul.divide-y.divide-slate-100',
          cards.slice(0, 30).map(c => {
            const q = getQuestion(c.source_question_id);
            const t = q ? getTopic(q.primary_topic_id) : null;
            return h('li.py-2.flex.items-center.justify-between.text-sm', [
              h('div.flex-1.min-w-0', [
                h('div.text-slate-800.truncate', q ? (q.stem.slice(0, 80) + (q.stem.length > 80 ? '…' : '')) : 'Unknown'),
                h('div.text-xs.text-slate-500', t ? t.name : '—')
              ]),
              h('div.flex.items-center.gap-3.flex-shrink-0', [
                h('span.text-xs.text-slate-500',
                  isDue(c, today) ? 'Due now' : `in ${daysUntil(c.due_date, today)}d`),
                h('button.text-xs.text-rose-600.hover\\:underline', {
                  onClick: () => { store.removeFlashcard(c.id); render(); }
                }, 'Remove')
              ])
            ]);
          })
        )
      ]) : null
    ]);
  }

  function reviewView() {
    if (idx >= queue.length) {
      return h('div.bg-white.rounded-xl.border.border-slate-200.p-8.text-center.space-y-4', [
        h('div.text-5xl', '✓'),
        h('h2.text-2xl.font-bold.text-slate-900', 'Review complete!'),
        h('p.text-slate-600', `Reviewed ${queue.length} card${queue.length === 1 ? '' : 's'} today.`),
        h('button.bg-brand-500.text-white.font-semibold.px-5.py-2\\.5.rounded-lg', {
          onClick: () => { mode = 'overview'; render(); }
        }, 'Done')
      ]);
    }

    const card = queue[idx];
    const q = getQuestion(card.source_question_id);
    const t = q ? getTopic(q.primary_topic_id) : null;

    return h('div.space-y-4', [
      h('div.flex.justify-between.text-sm.text-slate-600', [
        h('span', `Card ${idx + 1} of ${queue.length}`),
        h('button.text-slate-500.hover\\:text-slate-900', {
          onClick: () => { mode = 'overview'; render(); }
        }, '← Exit review')
      ]),

      h('div.bg-white.rounded-xl.border-2.border-slate-200.p-6.min-h-\\[280px\\]', [
        t ? h('span.inline-block.bg-slate-100.text-slate-700.text-xs.font-semibold.px-2\\.5.py-1.rounded-full.mb-3', t.name) : null,
        h('p.text-slate-900.font-medium.mb-4', q ? q.stem : ''),
        q && q.choices ? h('div.space-y-1\\.5.text-sm', Object.entries(q.choices).map(([L, txt]) =>
          h('div', { className: revealed && L === q.correct_choice ? 'text-emerald-700 font-semibold' : 'text-slate-600' },
            `${L}. ${txt}`)
        )) : null,

        revealed
          ? h('div.mt-5.pt-4.border-t.border-slate-200.space-y-3', [
              h('div', [
                h('div.text-xs.font-bold.text-emerald-700.uppercase.mb-1', `Correct: ${q.correct_choice}`),
                h('p.text-sm.text-slate-700', q.explanation_correct)
              ]),
              h('div.bg-amber-50.rounded-lg.p-3', [
                h('div.text-xs.font-bold.text-amber-800.uppercase.mb-1', 'Takeaway'),
                h('p.text-sm.text-amber-900', q.takeaway)
              ])
            ])
          : null
      ]),

      revealed
        ? h('div.grid.grid-cols-4.gap-2', [
            reviewBtn('Failed', 'bg-rose-500', 'failed'),
            reviewBtn('Hard',   'bg-orange-500', 'hard'),
            reviewBtn('Good',   'bg-emerald-500', 'good'),
            reviewBtn('Easy',   'bg-blue-500', 'easy')
          ])
        : h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600', {
            onClick: () => { revealed = true; render(); }
          }, 'Show answer')
    ]);
  }

  function reviewBtn(label, color, outcome) {
    return h('button.text-white.font-semibold.py-3.rounded-lg.hover\\:opacity-90.' + color.split(' ').join('.'), {
      onClick: () => recordReview(outcome)
    }, label);
  }

  function recordReview(outcome) {
    const card = queue[idx];
    const update = applyReview(card, outcome);
    store.updateFlashcard(card.id, update);
    idx++;
    revealed = false;
    render();
  }

  render();
  return root;
}

function statTile(big, label, color) {
  return h('div.bg-white.rounded-xl.border.border-slate-200.p-4.text-center', [
    h('div.text-3xl.font-bold.' + color.replace(/\s+/g, '.'), String(big)),
    h('div.text-xs.text-slate-600.mt-1', label)
  ]);
}

function daysUntil(due, today) {
  return Math.max(0, Math.round((new Date(due) - new Date(today)) / 86400000));
}
