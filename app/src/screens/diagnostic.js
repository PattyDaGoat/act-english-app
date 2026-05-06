// Diagnostic placement test + auto-generated study plan.
//
// Three screens, all in this file:
//   /diagnostic              → DiagnosticIntroScreen (explain + start)
//   /diagnostic/run          → DiagnosticRunScreen   (20-question test, no timer)
//   /diagnostic/plan         → StudyPlanScreen       (results + plan)
import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { renderLayout } from '../components/layout.js';
import { QuestionCard } from '../components/question_card.js';
import {
  buildDiagnosticQueue,
  computePerTopicResults,
  computeStudyPlan,
  buildPlanWeightedQueue
} from '../lib/diagnostic.js';
import { ephemeral } from '../lib/store.js';
import { getTopic } from '../data/topics.js';

// ─── Intro ───────────────────────────────────────────────────────────────
export function DiagnosticIntroScreen() {
  const existing = store.getStudyPlan();

  return h('div.space-y-6', [
    h('div', [
      h('div.text-xs.font-bold.uppercase.tracking-wide.text-purple-700.mb-1', 'Placement test'),
      h('h1.text-2xl.font-bold.text-slate-900', 'Diagnostic Test'),
      h('p.text-slate-600.mt-2',
        '20 mixed questions across every ACT English topic — no timer, no help. ' +
        'When you finish, the app builds a personalized study plan that focuses your sessions on the topics you got wrong and skips past the ones you already know.')
    ]),

    h('div.bg-purple-50.border.border-purple-200.rounded-xl.p-5', [
      h('div.font-semibold.text-purple-900.mb-2', 'How it works'),
      h('ol.list-decimal.list-inside.space-y-1.text-sm.text-purple-900', [
        h('li', 'Answer 20 questions one by one — pick whichever option feels right.'),
        h('li', "If you don't know, guess. The plan is more accurate when it sees what you actually do under uncertainty."),
        h('li', 'After the last question, you get a per-topic score and a weighted plan.'),
        h('li', "Lesson Mode and Adaptive Review then use that plan to focus on your weak spots.")
      ])
    ]),

    existing ? h('div.bg-amber-50.border.border-amber-200.rounded-xl.p-4.text-sm.text-amber-900', [
      h('div.font-semibold.mb-1', 'You already have a study plan'),
      h('p',
        `Created ${new Date(existing.created_at).toLocaleString()}. Re-taking the diagnostic will replace it. You can also `),
      h('a.underline.font-medium', { href: '#/diagnostic/plan' }, 'view your current plan'),
      h('span', '.')
    ]) : null,

    h('div.flex.gap-3', [
      h('button.flex-1.bg-purple-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-purple-700', {
        onClick: () => {
          ephemeral.set('diagnosticQueue', buildDiagnosticQueue());
          navigate('/diagnostic/run');
        }
      }, existing ? 'Retake the diagnostic →' : 'Begin the 20-question diagnostic →'),
      h('a.px-4.py-3.text-slate-600.hover\\:text-slate-900', { href: '#/' }, 'Cancel')
    ])
  ]);
}

// ─── Run ─────────────────────────────────────────────────────────────────
export function DiagnosticRunScreen() {
  let queue = ephemeral.get('diagnosticQueue');
  if (!queue || queue.length === 0) {
    queue = buildDiagnosticQueue();
    ephemeral.set('diagnosticQueue', queue);
  }

  const session = store.startSession({ mode: 'guided', topic_filter: null, length_target: queue.length });
  const root = h('div');
  let idx = 0;
  let selected = null;
  const results = [];
  let questionStart = Date.now();

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    if (idx >= queue.length) { finish(); return; }
    const q = queue[idx];

    root.appendChild(renderLayout(h('div.space-y-5', [
      h('div', [
        h('div.flex.justify-between.text-sm.text-slate-600.mb-2', [
          h('span', `Diagnostic · Question ${idx + 1} of ${queue.length}`),
          h('span.text-purple-700.font-medium', 'No timer · No help')
        ]),
        h('div.h-2.bg-slate-200.rounded-full.overflow-hidden', [
          h('div.h-full.bg-purple-500.transition-all', { style: { width: ((idx / queue.length) * 100) + '%' } })
        ])
      ]),

      QuestionCard({
        question: q, selected,
        onSelect: (L) => { selected = L; render(); },
        locked: false
      }),

      h('div.flex.gap-3', [
        h('button.flex-1.bg-purple-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-purple-700.disabled\\:opacity-50', {
          onClick: submit, disabled: !selected
        }, idx === queue.length - 1 ? 'Submit & see plan →' : 'Submit & continue →'),
        h('button.px-4.py-3.text-slate-600.hover\\:text-slate-900', {
          onClick: skip
        }, 'Skip')
      ]),

      h('p.text-xs.text-slate-500.text-center',
        'No explanations during the diagnostic — you\'ll get a full per-topic breakdown at the end.')
    ])));
  }

  function submit() {
    if (!selected) return;
    const q = queue[idx];
    const isCorrect = selected === q.correct_choice;
    const timeMs = Date.now() - questionStart;
    store.recordAttempt({
      question_id: q.id, session_id: session.id,
      chosen_choice: selected, is_correct: isCorrect, time_spent_ms: timeMs
    });
    results.push({ question_id: q.id, chosen_choice: selected, is_correct: isCorrect });
    advance();
  }

  function skip() {
    const q = queue[idx];
    store.recordAttempt({
      question_id: q.id, session_id: session.id,
      chosen_choice: null, is_correct: false, time_spent_ms: 0
    });
    results.push({ question_id: q.id, chosen_choice: null, is_correct: false });
    advance();
  }

  function advance() {
    idx++;
    selected = null;
    questionStart = Date.now();
    render();
  }

  function finish() {
    const correct = results.filter(r => r.is_correct).length;
    store.endSession(session.id, { raw_score: correct, length_target: results.length });
    const today = new Date().toISOString().slice(0, 10);
    store.addDailyProgress(today, 5, results.length);

    const perTopic = computePerTopicResults(results);
    const plan = computeStudyPlan(perTopic);
    store.setStudyPlan(plan);
    ephemeral.clear('diagnosticQueue');
    navigate('/diagnostic/plan');
  }

  render();
  return root;
}

// ─── Plan results ────────────────────────────────────────────────────────
export function StudyPlanScreen() {
  const plan = store.getStudyPlan();
  if (!plan) {
    return h('div.bg-white.rounded-xl.border.border-slate-200.p-6.space-y-3', [
      h('h2.font-semibold.text-slate-900', 'No study plan yet'),
      h('p.text-sm.text-slate-600',
        'Take the diagnostic test to generate a personalized plan that focuses your practice on weak topics.'),
      h('a.inline-block.bg-purple-600.text-white.px-4.py-2.rounded-lg.font-medium.hover\\:bg-purple-700',
        { href: '#/diagnostic' }, 'Take the diagnostic →')
    ]);
  }

  const sectionGroup = (label, color, items, hint) => {
    if (items.length === 0) return null;
    return h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
      h('div.flex.items-center.justify-between.mb-2', [
        h('h3.font-semibold.text-slate-900', label),
        h('span.text-xs.px-2.py-1.rounded.font-semibold', { className: color }, `${items.length} topic${items.length === 1 ? '' : 's'}`)
      ]),
      hint ? h('p.text-xs.text-slate-500.mb-3', hint) : null,
      h('ul.space-y-2', items.map(t => {
        const r = plan.per_topic.find(p => p.topic_id === t.id);
        return h('li.flex.items-center.justify-between.text-sm', [
          h('span.text-slate-800', t.name),
          r && r.accuracy != null
            ? h('span.font-mono.text-xs.text-slate-600', `${r.correct}/${r.total} · ${r.accuracy}%`)
            : h('span.text-xs.text-slate-400.italic', 'not tested')
        ]);
      }))
    ]);
  };

  return h('div.space-y-6', [
    h('div.bg-gradient-to-r.from-purple-600.to-indigo-600.text-white.rounded-xl.p-6', [
      h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-80.mb-1', 'Your study plan'),
      h('h1.text-2xl.font-bold', plan.overall_accuracy != null
        ? `Diagnostic score: ${plan.overall_accuracy}%`
        : 'Diagnostic complete'),
      h('p.text-sm.opacity-90.mt-1',
        `Created ${new Date(plan.created_at).toLocaleString()}. ` +
        `${plan.grouped.weak.length} weak · ${plan.grouped.medium.length} medium · ${plan.grouped.strong.length} strong topic${plan.grouped.weak.length + plan.grouped.medium.length + plan.grouped.strong.length === 1 ? '' : 's'}.`)
    ]),

    h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-5', [
      h('div.font-semibold.text-emerald-900.mb-1', '🎯 What happens now'),
      h('ul.list-disc.list-inside.text-sm.text-emerald-900.space-y-1', [
        h('li', 'Lesson Mode and Adaptive Review will pull more questions from your weak topics and fewer from your strong ones.'),
        h('li', 'A new "Plan-based session" button on the home screen launches a session weighted by this plan.'),
        h('li', 'You can retake the diagnostic any time — it always replaces the current plan.')
      ])
    ]),

    h('div.flex.gap-3.flex-wrap', [
      h('a.inline-block.bg-purple-600.text-white.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-purple-700',
        { href: '#/lesson-mode' }, 'Start a Lesson Mode session →'),
      h('a.inline-block.bg-white.border.border-slate-300.text-slate-700.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-slate-50',
        { href: '#/diagnostic' }, 'Retake diagnostic'),
      h('a.inline-block.text-slate-600.px-4.py-2.font-medium.hover\\:text-slate-900',
        { href: '#/' }, '← Home')
    ]),

    sectionGroup(
      '🔴 Focus on these — weak (<50%)',
      'bg-red-100 text-red-700',
      plan.grouped.weak,
      'These are your priority. Lesson Mode and Adaptive Review will draw heavily from this list.'
    ),
    sectionGroup(
      '🟡 Keep practicing — medium (50–79%)',
      'bg-amber-100 text-amber-700',
      plan.grouped.medium,
      'Solid but not yet automatic. Moderate practice volume.'
    ),
    sectionGroup(
      '🟢 You\'ve got these — strong (≥80%)',
      'bg-emerald-100 text-emerald-700',
      plan.grouped.strong,
      'Brief refreshers only. Your plan-based sessions will mostly skip these.'
    ),
    sectionGroup(
      '⚪ Not yet tested',
      'bg-slate-100 text-slate-700',
      plan.grouped.unknown,
      "Not seen in this diagnostic — they'll appear at default priority until you've practiced them."
    )
  ]);
}

// Helper exposed to other screens to launch a plan-weighted session.
export function planWeightedQueue(length = 10) {
  const plan = store.getStudyPlan();
  if (!plan) return null;
  return buildPlanWeightedQueue(plan, length);
}
