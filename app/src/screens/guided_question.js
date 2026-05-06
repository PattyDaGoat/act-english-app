import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { allQuestions, getQuestion, questionsForTopic } from '../data/questions.js';
import { computeWeakTopics } from '../lib/analytics.js';
import { shuffle } from '../lib/util.js';
import { renderLayout } from '../components/layout.js';
import { QuestionCard } from '../components/question_card.js';
import { ExplanationPanel } from '../components/explanation_panel.js';

export function GuidedQuestionScreen() {
  const cfg = ephemeral.get('guidedConfig') || { length: 10, topicId: null, useWeak: false };

  let pool;
  if (cfg.useWeak) {
    const weak = new Set(computeWeakTopics().map(w => w.topic_id));
    pool = allQuestions().filter(q =>
      weak.has(q.primary_topic_id) || (q.secondary_topic_ids || []).some(t => weak.has(t)));
    if (pool.length === 0) pool = allQuestions();
  } else if (cfg.topicId) {
    pool = questionsForTopic(cfg.topicId);
  } else {
    pool = allQuestions();
  }

  const queue = shuffle(pool).slice(0, cfg.length);
  if (queue.length === 0) {
    return renderLayout(h('div.bg-white.p-6.rounded-xl', 'No questions match this filter. Try Mixed.'));
  }

  const session = store.startSession({
    mode: 'guided',
    topic_filter: cfg.topicId || (cfg.useWeak ? 'WEAK' : null),
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
    if (idx >= queue.length) {
      finish();
      return;
    }
    const q = queue[idx];
    const submitted = submittedAt !== null;

    root.appendChild(renderLayout(h('div.space-y-5', [
      progressBar(idx, queue.length),
      QuestionCard({
        question: q,
        selected,
        onSelect: (L) => { selected = L; render(); },
        locked: submitted
      }),
      submitted
        ? h('div.space-y-4', [
            ExplanationPanel({
              question: q,
              chosen: selected,
              onAddFlashcard: () => addCard(q),
              flashcardAdded: store.listFlashcards().some(c => c.source_question_id === q.id),
              onRetry: () => { submitted = false; selected = null; render(); }
            }),
            h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600', {
              onClick: nextQuestion
            }, idx === queue.length - 1 ? 'Finish session →' : 'Next question →')
          ])
        : h('div.flex.gap-3', [
            h('button.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600.disabled\\:opacity-50.disabled\\:cursor-not-allowed', {
              onClick: submit, disabled: !selected
            }, 'Submit answer'),
            h('button.px-4.py-3.text-slate-600.hover\\:text-slate-900', {
              onClick: () => {
                if (confirm('End session early? Progress will be saved.')) finish();
              }
            }, 'End session')
          ])
    ])));
  }

  function progressBar(i, n) {
    return h('div', [
      h('div.flex.justify-between.text-sm.text-slate-600.mb-2', [
        h('span', `Question ${i + 1} of ${n}`),
        h('span', `${Math.round((i / n) * 100)}% complete`)
      ]),
      h('div.h-2.bg-slate-200.rounded-full.overflow-hidden', [
        h('div.h-full.bg-brand-500.transition-all', { style: { width: ((i / n) * 100) + '%' } })
      ])
    ]);
  }

  function submit() {
    if (!selected) return;
    submittedAt = Date.now();
    const q = queue[idx];
    const isCorrect = selected === q.correct_choice;
    const timeMs = submittedAt - questionStart;
    store.recordAttempt({
      question_id: q.id,
      session_id: session.id,
      chosen_choice: selected,
      is_correct: isCorrect,
      time_spent_ms: timeMs
    });
    results.push({ q, chosen: selected, isCorrect, timeMs });

    if (!isCorrect && store.getUser().settings.auto_add_missed_to_flashcards) {
      addCard(q);
    }
    render();
  }

  function addCard(q) {
    store.addFlashcard({ source_question_id: q.id });
    render();
  }

  function nextQuestion() {
    idx++;
    selected = null;
    submittedAt = null;
    questionStart = Date.now();
    render();
  }

  function finish() {
    const correct = results.filter(r => r.isCorrect).length;
    const totalMs = results.reduce((acc, r) => acc + r.timeMs, 0);
    store.endSession(session.id, {
      raw_score: correct,
      length_target: results.length
    });
    bumpStreakAndProgress(results.length, totalMs);
    ephemeral.set('lastSummary', { sessionId: session.id, results, mode: 'guided' });
    navigate('/summary');
  }

  // Keyboard shortcuts (1/2/3/4 = A/B/C/D, Enter = submit/next)
  const keyHandler = (e) => {
    if (idx >= queue.length) return;
    const submitted = submittedAt !== null;
    if (!submitted && ['1','2','3','4'].includes(e.key)) {
      selected = ['A','B','C','D'][+e.key - 1];
      render();
    } else if (e.key === 'Enter') {
      if (!submitted && selected) submit();
      else if (submitted) nextQuestion();
    }
  };
  document.addEventListener('keydown', keyHandler);
  // Note: in this lightweight router we accept that the listener stays attached until next route swap.
  window.addEventListener('hashchange', () => document.removeEventListener('keydown', keyHandler), { once: true });

  render();
  return root;
}

function bumpStreakAndProgress(questions, ms) {
  const u = store.getUser();
  const today = new Date().toISOString().slice(0, 10);
  const minutes = Math.max(1, Math.round(ms / 60000));
  const before = store.getDailyProgress(today);
  const after = store.addDailyProgress(today, minutes, questions);
  if (!before.met_goal && after.met_goal) {
    // Streak update
    const last = u.last_session_date;
    let newStreak = u.streak_count;
    if (last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      newStreak = last === yesterday ? newStreak + 1 : 1;
      store.updateUser({ streak_count: newStreak, last_session_date: today });
    }
  } else if (u.last_session_date !== today) {
    store.updateUser({ last_session_date: today });
  }
}
