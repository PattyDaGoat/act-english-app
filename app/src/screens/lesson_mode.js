// Lesson Mode — a 4th practice mode (sibling to Guided / Mock / Helped).
// Per-question flow:
//   1. Show concept + rule of thumb + diagnostic procedure
//   2. (Optional "I'm ready" gate)
//   3. Show the question; student picks answer
//   4. Show full explanation panel
//   5. Next
// Goal: teach DURING the question (vs. Guided which teaches AFTER).

import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { allQuestions, questionsForTopic } from '../data/questions.js';
import { leafTopics, getTopic } from '../data/topics.js';
import { getMiniLesson } from '../data/mini_lessons.js';
import { getDiagnostic } from '../data/diagnostics.js';
import { computeWeakTopics } from '../lib/analytics.js';
import { buildPlanWeightedQueue } from '../lib/diagnostic.js';
import { renderLayout } from '../components/layout.js';
import { QuestionCard } from '../components/question_card.js';
import { ExplanationPanel } from '../components/explanation_panel.js';
import { shuffle } from '../lib/util.js';

export function LessonSetupScreen() {
  let length = 5;
  let topicId = null;
  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const topics = leafTopics().filter(t => questionsForTopic(t.id).length > 0 && getDiagnostic(t.id));
    const weak = computeWeakTopics();

    root.appendChild(h('div.space-y-6', [
      h('div', [
        h('div.flex.items-center.gap-2.mb-1', [
          h('span.text-xs.font-bold.bg-emerald-100.text-emerald-700.px-2.py-0\\.5.rounded.uppercase', 'New mode'),
          h('span.text-xs.text-slate-500', 'Teach as you go')
        ]),
        h('h1.text-2xl.font-bold.text-slate-900', 'Lesson Mode'),
        h('p.text-slate-600.mt-1',
          'Each question is preceded by a short rule + diagnostic procedure. Learn the strategy first, then apply it. Use this when you\'re new to a topic.')
      ]),

      h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-4.text-sm.text-emerald-900', [
        h('div.font-semibold.mb-2', 'How it differs from Guided Practice:'),
        h('ul.list-disc.list-inside.space-y-1', [
          h('li', '🎓 Guided: explanation comes AFTER you answer.'),
          h('li', '📚 Lesson: rule + step-by-step strategy come BEFORE you answer.')
        ])
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Topic'),
        topicId ? h('div.flex.items-center.justify-between', [
          h('span.font-medium.text-slate-800',
            topicId === '__ALL_TOPICS__' ? 'All sections (one question per leaf topic — full sweep)'
            : topicId === '__ALL__' ? 'All sections (mixed) — random topic each question'
            : topicId === '__PLAN__' ? 'Study plan — weighted toward your weak topics'
            : (getTopic(topicId)?.name || topicId)),
          h('button.text-sm.text-brand-600.hover\\:underline',
            { onClick: () => { topicId = null; render(); } }, 'Change')
        ]) : h('div.space-y-3', [
          store.getStudyPlan() ? h('div', [
            h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-2', 'Best for you'),
            h('button.w-full.text-left.p-3.rounded-lg.border-2.border-purple-300.bg-purple-50.hover\\:border-purple-500', {
              onClick: () => { topicId = '__PLAN__'; render(); }
            }, [
              h('div.font-semibold.text-purple-800', '🎯 Study plan (recommended)'),
              h('div.text-xs.text-purple-700.mt-0\\.5',
                `Picks more questions from your weak topics (${store.getStudyPlan().grouped.weak.length}) and fewer from the strong ones. Based on your diagnostic score of ${store.getStudyPlan().overall_accuracy ?? '—'}%.`)
            ])
          ]) : h('div', [
            h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-2', 'No study plan yet'),
            h('a.block.w-full.text-left.p-3.rounded-lg.border-2.border-purple-300.bg-purple-50.hover\\:border-purple-500',
              { href: '#/diagnostic' }, [
                h('div.font-semibold.text-purple-800', '🎯 Take the diagnostic test (20 questions)'),
                h('div.text-xs.text-purple-700.mt-0\\.5',
                  "We'll figure out where you stand and weight your future sessions toward your weak topics.")
              ])
          ]),
          h('div', [
            h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-2.mt-3', 'Cover everything'),
            h('button.w-full.text-left.p-3.rounded-lg.border-2.border-blue-300.bg-blue-50.hover\\:border-blue-500.mb-2', {
              onClick: () => { topicId = '__ALL_TOPICS__'; render(); }
            }, [
              h('div.font-semibold.text-blue-800', '📖 Teach me ALL sections (one of each topic)'),
              h('div.text-xs.text-blue-700.mt-0\\.5',
                "One question per leaf topic in a single sitting. You'll see the full strategy briefing for every topic the ACT tests. Best for a thorough sweep.")
            ]),
            h('button.w-full.text-left.p-3.rounded-lg.border-2.border-emerald-300.bg-emerald-50.hover\\:border-emerald-500', {
              onClick: () => { topicId = '__ALL__'; render(); }
            }, [
              h('div.font-semibold.text-emerald-800', 'All sections (random sample)'),
              h('div.text-xs.text-emerald-700.mt-0\\.5',
                'A shorter mixed sample — strategy briefing adapts to whichever topic comes up next.')
            ])
          ]),
          weak.length > 0 ? h('div', [
            h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-2.mt-3', 'Suggested (your weak topics)'),
            h('div.flex.flex-wrap.gap-2',
              weak.slice(0, 5).map(w =>
                chip(`${w.name} · ${w.accuracy}%`, false,
                  () => { topicId = w.topic_id; render(); }, true)
              )
            )
          ]) : null,
          h('div', [
            h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-2.mt-3', 'A specific topic'),
            h('div.flex.flex-wrap.gap-2',
              topics.map(t => chip(t.name, false, () => { topicId = t.id; render(); }))
            )
          ])
        ])
      ]),

      topicId && topicId !== '__ALL_TOPICS__' ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Lesson length'),
        h('div.flex.gap-2',
          ((topicId === '__ALL__' || topicId === '__PLAN__') ? [5, 10, 15] : [3, 5, 8]).map(n =>
            h('button.flex-1.py-2.rounded-lg.border-2.font-medium', {
              className: length === n
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 text-slate-600',
              onClick: () => { length = n; render(); }
            }, `${n} questions`)
          )
        ),
        h('p.text-xs.text-slate-500.mt-2',
          topicId === '__PLAN__'
            ? 'Plan-weighted sessions cycle through several topics — pick a longer length so each gets a fair shot.'
            : topicId === '__ALL__'
              ? 'Mixed sessions cover several rules — pick a longer length so each rule gets a fair shot.'
              : 'Lessons are deliberately short — 3 questions is plenty for one concept.')
      ]) : null,

      topicId === '__ALL_TOPICS__' ? h('div.bg-blue-50.border.border-blue-200.rounded-xl.p-4.text-sm.text-blue-900', [
        h('span.font-semibold', 'Length is fixed: '),
        h('span', 'one question per leaf topic that has one — about 22 questions. Plan ~25 minutes.')
      ]) : null,

      topicId ? h('button.w-full.bg-emerald-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-emerald-700', {
        onClick: () => {
          ephemeral.set('lessonConfig', { topicId, length });
          navigate('/lesson-mode/run');
        }
      }, topicId === '__ALL_TOPICS__'
            ? 'Begin full-sweep lesson (every topic, in order) →'
            : topicId === '__PLAN__'
              ? `Begin plan-weighted lesson (${length} questions, focus on weak topics) →`
              : topicId === '__ALL__'
                ? `Begin mixed lesson (${length} questions, random topics) →`
                : `Begin lesson on ${getTopic(topicId)?.name} →`) : null
    ]));
  }
  render();
  return root;
}

// Pick exactly one question per leaf topic that has any questions and a
// mini-lesson — preserves topic order so the sweep feels structured.
function buildOneOfEachTopicQueue() {
  const queue = [];
  for (const t of leafTopics()) {
    const pool = questionsForTopic(t.id).filter(q => getDiagnostic(q.primary_topic_id));
    if (pool.length === 0) continue;
    // Prefer mid difficulty for a representative example.
    const sorted = pool.slice().sort((a, b) =>
      Math.abs((a.difficulty || 2) - 2.5) - Math.abs((b.difficulty || 2) - 2.5));
    queue.push(sorted[0]);
  }
  return queue;
}

// Pick a mixed queue across topics, weighted toward an ACT-realistic spread of
// difficulty: ~30% easy (1), ~50% medium (2-3), ~20% hard (4). Also try not to
// repeat the same topic in consecutive questions.
function buildMixedQueue(n) {
  const pool = allQuestions().filter(q => getDiagnostic(q.primary_topic_id));
  const easy = pool.filter(q => q.difficulty === 1);
  const med  = pool.filter(q => q.difficulty === 2 || q.difficulty === 3);
  const hard = pool.filter(q => q.difficulty >= 4);
  const targets = [
    { bucket: shuffle(easy), share: 0.30 },
    { bucket: shuffle(med),  share: 0.50 },
    { bucket: shuffle(hard), share: 0.20 }
  ];
  const counts = targets.map(t => Math.max(0, Math.round(t.share * n)));
  // Adjust rounding so total === n.
  let diff = n - counts.reduce((a, b) => a + b, 0);
  let safety = counts.length * 50;
  for (let i = 0; diff !== 0 && safety-- > 0; i = (i + 1) % counts.length) {
    if (diff > 0 && targets[i].bucket.length > counts[i]) { counts[i]++; diff--; }
    else if (diff < 0 && counts[i] > 0) { counts[i]--; diff++; }
  }
  const picks = [];
  targets.forEach((t, i) => { picks.push(...t.bucket.slice(0, counts[i])); });
  // Interleave so consecutive questions are from different topics where possible.
  const interleaved = [];
  let remaining = shuffle(picks);
  let lastTopic = null;
  while (remaining.length) {
    const idx = remaining.findIndex(q => q.primary_topic_id !== lastTopic);
    const pick = idx >= 0 ? remaining.splice(idx, 1)[0] : remaining.shift();
    interleaved.push(pick);
    lastTopic = pick.primary_topic_id;
  }
  return interleaved;
}

function chip(label, active, onClick, suggested) {
  return h('button.px-3.py-1\\.5.rounded-full.text-sm.font-medium.border-2', {
    className: active
      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
      : suggested
        ? 'border-purple-300 bg-purple-50 text-purple-700 hover:border-purple-500'
        : 'border-slate-200 text-slate-700 hover:bg-slate-50',
    onClick
  }, label);
}

export function LessonRunScreen() {
  const cfg = ephemeral.get('lessonConfig');
  if (!cfg || !cfg.topicId) { navigate('/lesson-mode'); return h('div'); }

  const queue = cfg.topicId === '__ALL_TOPICS__'
    ? buildOneOfEachTopicQueue()
    : cfg.topicId === '__ALL__'
      ? buildMixedQueue(cfg.length)
      : cfg.topicId === '__PLAN__'
        ? buildPlanWeightedQueue(store.getStudyPlan(), cfg.length)
        : shuffle(questionsForTopic(cfg.topicId)).slice(0, cfg.length);
  if (queue.length === 0) {
    return renderLayout(h('div.bg-white.p-6.rounded-xl', 'No questions for this topic.'));
  }

  const session = store.startSession({
    mode: 'guided', topic_filter: cfg.topicId, length_target: queue.length
  });

  const root = h('div');
  let idx = 0;
  let phase = 'lesson'; // 'lesson' | 'answering' | 'reviewed'
  let selected = null;
  let questionStart = 0;
  const results = [];

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    if (idx >= queue.length) { finish(); return; }
    const q = queue[idx];
    const topic = getTopic(q.primary_topic_id);
    const lesson = getMiniLesson(q.primary_topic_id);
    const diagnostic = getDiagnostic(q.primary_topic_id);

    root.appendChild(renderLayout(h('div.space-y-5', [
      progressBar(idx, queue.length, phase),

      // Phase 1: Pre-question lesson teaching
      phase === 'lesson' ? h('div.space-y-4', [
        h('div.bg-emerald-50.border.border-emerald-200.rounded-xl.p-5', [
          h('div.flex.items-center.gap-2.mb-3', [
            h('span.text-xs.font-bold.bg-emerald-100.text-emerald-800.px-2.py-1.rounded.uppercase',
              'Strategy briefing'),
            h('span.text-emerald-700.font-semibold', topic ? topic.name : '')
          ]),
          lesson ? h('div.space-y-3', [
            h('div', [
              h('div.text-xs.font-bold.text-emerald-800.uppercase.mb-1', '💡 Rule of thumb'),
              h('p.text-emerald-900.font-medium', lesson.rule_of_thumb)
            ]),
            h('div.bg-white.rounded-lg.p-4', [
              h('div.text-xs.font-bold.text-slate-700.uppercase.mb-2', 'How to approach this question'),
              diagnostic
                ? h('ol.list-decimal.list-inside.text-sm.text-slate-700.space-y-1',
                    diagnostic.map(step => h('li', step)))
                : h('p.text-sm.text-slate-700', lesson.body[0])
            ]),
            lesson.examples && lesson.examples.length > 0 ? h('details.bg-white.rounded-lg.p-3', [
              h('summary.text-sm.font-medium.text-slate-700.cursor-pointer.list-none.flex.justify-between', [
                h('span', '📖 See worked examples'),
                h('span.text-slate-400', '▾')
              ]),
              h('ul.mt-2.space-y-2.text-xs',
                lesson.examples.slice(0, 3).map(([ex, note]) =>
                  h('li.p-2.bg-slate-50.rounded', [
                    h('div.font-mono.text-slate-900', ex),
                    note ? h('div.text-slate-600.italic.mt-1', note) : null
                  ])
                )
              )
            ]) : null
          ]) : h('p.text-sm.text-slate-700', 'No mini-lesson available for this topic.')
        ]),
        h('button.w-full.bg-emerald-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-emerald-700', {
          onClick: () => { phase = 'answering'; questionStart = Date.now(); render(); }
        }, "I'm ready — show me the question →")
      ]) : null,

      // Phase 2: Answer the question (with rule-of-thumb still visible)
      (phase === 'answering' || phase === 'reviewed') ? h('div.space-y-4', [
        lesson ? h('div.bg-emerald-50.border.border-emerald-200.rounded-lg.p-3.text-xs.text-emerald-900', [
          h('span.font-bold', '💡 Remember: '),
          h('span', lesson.rule_of_thumb)
        ]) : null,
        QuestionCard({
          question: q, selected,
          onSelect: (L) => { if (phase === 'answering') { selected = L; render(); } },
          locked: phase === 'reviewed'
        }),
        phase === 'answering'
          ? h('div.flex.gap-3', [
              h('button.flex-1.bg-emerald-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-emerald-700.disabled\\:opacity-50', {
                onClick: submit, disabled: !selected
              }, 'Submit answer'),
              h('button.px-4.py-3.text-slate-600.hover\\:text-slate-900', {
                onClick: () => { phase = 'lesson'; render(); }
              }, '← Re-read briefing')
            ])
          : h('div.space-y-4', [
              ExplanationPanel({
                question: q, chosen: selected,
                onAddFlashcard: () => { store.addFlashcard({ source_question_id: q.id }); render(); },
                flashcardAdded: store.listFlashcards().some(c => c.source_question_id === q.id),
                onRetry: () => { phase = 'answering'; selected = null; questionStart = Date.now(); render(); }
              }),
              h('button.w-full.bg-emerald-600.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-emerald-700', {
                onClick: nextQuestion
              }, idx === queue.length - 1 ? 'Finish lesson →' : 'Next question →')
            ])
      ]) : null
    ])));
  }

  function progressBar(i, n, ph) {
    const phaseLabel = ph === 'lesson' ? 'Strategy' : ph === 'answering' ? 'Apply it' : 'Review';
    return h('div', [
      h('div.flex.justify-between.text-sm.text-slate-600.mb-2', [
        h('span', `Lesson · Question ${i + 1} of ${n}`),
        h('span.text-emerald-700.font-medium', phaseLabel)
      ]),
      h('div.h-2.bg-slate-200.rounded-full.overflow-hidden', [
        h('div.h-full.bg-emerald-500.transition-all', { style: { width: ((i / n) * 100) + '%' } })
      ])
    ]);
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
    results.push({ q, chosen: selected, isCorrect, timeMs });
    if (!isCorrect && store.getUser().settings.auto_add_missed_to_flashcards) {
      store.addFlashcard({ source_question_id: q.id });
    }
    phase = 'reviewed';
    render();
  }

  function nextQuestion() {
    idx++;
    selected = null;
    phase = 'lesson';
    render();
  }

  function finish() {
    const correct = results.filter(r => r.isCorrect).length;
    store.endSession(session.id, { raw_score: correct, length_target: results.length });
    const today = new Date().toISOString().slice(0, 10);
    const totalMs = results.reduce((acc, r) => acc + r.timeMs, 0);
    store.addDailyProgress(today, Math.max(2, Math.round(totalMs / 60000)), results.length);
    ephemeral.set('lastSummary', { sessionId: session.id, results, mode: 'lesson' });
    navigate('/summary');
  }

  const keyHandler = (e) => {
    if (idx >= queue.length) return;
    if (phase === 'answering' && ['1','2','3','4'].includes(e.key)) {
      selected = ['A','B','C','D'][+e.key - 1]; render();
    } else if (e.key === 'Enter') {
      if (phase === 'lesson') { phase = 'answering'; questionStart = Date.now(); render(); }
      else if (phase === 'answering' && selected) submit();
      else if (phase === 'reviewed') nextQuestion();
    }
  };
  document.addEventListener('keydown', keyHandler);
  window.addEventListener('hashchange',
    () => document.removeEventListener('keydown', keyHandler), { once: true });

  render();
  return root;
}
