// Adaptive review session — same flow as Guided Practice but the queue is
// generated from the student's weak topics (per §16 v1.1).
import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { buildAdaptiveQueue, summarizeAdaptiveContext } from '../lib/adaptive.js';
import { renderLayout } from '../components/layout.js';
import { QuestionCard } from '../components/question_card.js';
import { ExplanationPanel } from '../components/explanation_panel.js';
import { pct } from '../lib/util.js';

export function AdaptiveReviewSetupScreen() {
  let length = 10;
  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const ctx = summarizeAdaptiveContext();

    root.appendChild(h('div.space-y-6', [
      h('div', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Adaptive Review'),
        h('p.text-slate-600.mt-1',
          'Smart queue: pulls from the topics you\'re weakest at, weighted by how recently you struggled.')
      ]),

      ctx.has_data
        ? h('div.bg-purple-50.border.border-purple-200.rounded-xl.p-5', [
            h('h2.font-semibold.text-purple-900.mb-3',
              `Today\'s focus${ctx.top_focus.length === 1 ? '' : 'es'}`),
            h('ul.space-y-2',
              ctx.top_focus.map(t =>
                h('li.flex.items-center.justify-between.text-sm', [
                  h('span.text-slate-800', t.name),
                  h('div.flex.items-center.gap-3', [
                    h('span.text-rose-700.font-medium', `${t.accuracy}% acc`),
                    h('span.text-xs.text-slate-500',
                      t.days_since_seen >= 14 ? '14d+ ago' : `${t.days_since_seen}d ago`)
                  ])
                ])
              )
            ),
            ctx.total_topics_struggling > 3
              ? h('p.text-xs.text-purple-700.mt-3',
                  `+ ${ctx.total_topics_struggling - 3} more topics in the rotation`)
              : null
          ])
        : h('div.bg-amber-50.border.border-amber-200.rounded-xl.p-5.text-amber-900', [
            h('p', 'Not enough practice data yet — try Guided Practice or a Drill first. Adaptive Review needs at least a few sessions to know what to work on.')
          ]),

      ctx.has_data
        ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
            h('h2.font-semibold.text-slate-900.mb-3', 'Session length'),
            h('div.flex.gap-2',
              [5, 10, 15, 20].map(n =>
                h('button.flex-1.py-2.rounded-lg.border-2.font-medium', {
                  className: length === n
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 text-slate-600',
                  onClick: () => { length = n; render(); }
                }, `${n} questions`)
              )
            )
          ])
        : null,

      ctx.has_data
        ? h('button.w-full.bg-purple-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-purple-700', {
            onClick: () => {
              ephemeral.set('adaptiveLength', length);
              navigate('/adaptive/run');
            }
          }, `Start ${length}-question adaptive session →`)
        : h('a.block.text-center.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600',
            { href: '#/guided' }, 'Try Guided Practice instead →')
    ]));
  }
  render();
  return root;
}

export function AdaptiveReviewRunScreen() {
  const length = ephemeral.get('adaptiveLength') || 10;
  const queue = buildAdaptiveQueue(length);

  if (queue.length === 0) {
    return renderLayout(h('div.bg-white.p-6.rounded-xl', [
      h('p.text-slate-700', 'No questions available for adaptive review yet.'),
      h('a.text-brand-600.hover\\:underline', { href: '#/' }, '← Home')
    ]));
  }

  const session = store.startSession({
    mode: 'guided',
    topic_filter: 'ADAPTIVE',
    length_target: queue.length
  });

  const root = h('div');
  let idx = 0;
  let selected = null;
  let submittedAt = null;
  let questionStart = Date.now();
  const results = [];

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    if (idx >= queue.length) { finish(); return; }
    const q = queue[idx];
    const submitted = submittedAt !== null;

    root.appendChild(renderLayout(h('div.space-y-5', [
      h('div.flex.items-center.justify-between', [
        h('div', [
          h('div.flex.justify-between.text-sm.text-slate-600.mb-1', [
            h('span', `Adaptive · ${idx + 1} of ${queue.length}`),
            h('span.text-purple-700.font-medium', `Focus: ${q._topic_reason}`)
          ]),
          h('div.h-2.bg-slate-200.rounded-full.overflow-hidden.w-64', [
            h('div.h-full.bg-purple-600.transition-all', {
              style: { width: ((idx / queue.length) * 100) + '%' }
            })
          ])
        ])
      ]),
      QuestionCard({
        question: q, selected,
        onSelect: (L) => { selected = L; render(); },
        locked: submitted
      }),
      submitted
        ? h('div.space-y-4', [
            ExplanationPanel({
              question: q, chosen: selected,
              onAddFlashcard: () => { store.addFlashcard({ source_question_id: q.id }); render(); },
              flashcardAdded: store.listFlashcards().some(c => c.source_question_id === q.id)
            }),
            h('button.w-full.bg-purple-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-purple-700', {
              onClick: nextQuestion
            }, idx === queue.length - 1 ? 'Finish session →' : 'Next question →')
          ])
        : h('div.flex.gap-3', [
            h('button.flex-1.bg-purple-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-purple-700.disabled\\:opacity-50', {
              onClick: submit, disabled: !selected
            }, 'Submit answer'),
            h('button.px-4.py-3.text-slate-600.hover\\:text-slate-900', {
              onClick: () => { if (confirm('End session early?')) finish(); }
            }, 'End session')
          ])
    ])));
  }

  function submit() {
    if (!selected) return;
    submittedAt = Date.now();
    const q = queue[idx];
    const isCorrect = selected === q.correct_choice;
    store.recordAttempt({
      question_id: q.id, session_id: session.id,
      chosen_choice: selected, is_correct: isCorrect,
      time_spent_ms: submittedAt - questionStart
    });
    results.push({ q, chosen: selected, isCorrect, timeMs: submittedAt - questionStart });
    if (!isCorrect && store.getUser().settings.auto_add_missed_to_flashcards) {
      store.addFlashcard({ source_question_id: q.id });
    }
    render();
  }

  function nextQuestion() {
    idx++; selected = null; submittedAt = null; questionStart = Date.now();
    render();
  }

  function finish() {
    const correct = results.filter(r => r.isCorrect).length;
    const totalMs = results.reduce((acc, r) => acc + r.timeMs, 0);
    store.endSession(session.id, { raw_score: correct, length_target: results.length });
    const today = new Date().toISOString().slice(0, 10);
    store.addDailyProgress(today, Math.max(1, Math.round(totalMs / 60000)), results.length);
    ephemeral.set('lastSummary', { sessionId: session.id, results, mode: 'adaptive' });
    navigate('/summary');
  }

  const keyHandler = (e) => {
    if (idx >= queue.length) return;
    const submitted = submittedAt !== null;
    if (!submitted && ['1','2','3','4'].includes(e.key)) {
      selected = ['A','B','C','D'][+e.key - 1]; render();
    } else if (e.key === 'Enter') {
      if (!submitted && selected) submit();
      else if (submitted) nextQuestion();
    }
  };
  document.addEventListener('keydown', keyHandler);
  window.addEventListener('hashchange',
    () => document.removeEventListener('keydown', keyHandler), { once: true });

  render();
  return root;
}
