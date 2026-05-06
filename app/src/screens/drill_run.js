import { h } from '../lib/dom.js';
import { store, ephemeral } from '../lib/store.js';
import { navigate } from '../lib/router.js';
import { questionsForTopic, questionsForDifficulty } from '../data/questions.js';
import { renderLayout } from '../components/layout.js';
import { QuestionCard } from '../components/question_card.js';
import { ExplanationPanel } from '../components/explanation_panel.js';
import { shuffle, fmtTime } from '../lib/util.js';
import { getPassage, sentenceContextFor, underlinedTextFor } from '../data/passages.js';
import { renderWithGlossary } from '../data/glossary.js';
import { getTips } from '../data/improvement_tips.js';
import { getTopic } from '../data/topics.js';
import { youtubeSearchUrl } from '../lib/videos.js';

export function DrillRunScreen() {
  const cfg = ephemeral.get('drillConfig');
  if (!cfg || !cfg.topicId) { navigate('/drill'); return h('div'); }

  const topicQs = questionsForTopic(cfg.topicId);
  const diffSet = new Set(questionsForDifficulty(cfg.difficulty).map(q => q.id));
  let pool = topicQs.filter(q => diffSet.has(q.id));
  if (pool.length === 0) pool = topicQs;
  const queue = shuffle(pool).slice(0, cfg.length);

  if (queue.length === 0) {
    return renderLayout(h('div.bg-white.p-6.rounded-xl', 'No questions for this drill.'));
  }

  const session = store.startSession({
    mode: 'drill',
    topic_filter: cfg.topicId,
    length_target: queue.length
  });

  // Per-question 36s timer; ALSO total drill timer for display.
  const totalLimit = queue.length * 36 * 1000;
  const startedAt = Date.now();
  let idx = 0;
  let selected = null;
  let qStart = Date.now();
  const results = [];
  let phase = 'answering'; // 'answering' | 'review'
  let timerInterval = null;

  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    if (phase === 'review') { root.appendChild(reviewView()); return; }

    const q = queue[idx];
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, totalLimit - elapsed);

    root.appendChild(renderLayout(h('div.space-y-5', [
      h('div.flex.items-center.justify-between.bg-white.rounded-xl.border.border-slate-200.p-4', [
        h('div', [
          h('div.text-sm.text-slate-600', `Drill · Question ${idx + 1} of ${queue.length}`),
          h('div.h-1.w-full.bg-slate-100.rounded-full.mt-2.overflow-hidden', { style: { width: '200px' } }, [
            h('div.h-full.bg-purple-500', { style: { width: ((idx / queue.length) * 100) + '%' } })
          ])
        ]),
        h('div.text-right', [
          h('div.text-xs.text-slate-500.uppercase', 'Time left'),
          h('div.text-2xl.font-bold.font-mono', { className: remaining < 60000 ? 'text-rose-600' : 'text-slate-900' }, fmtTime(remaining))
        ])
      ]),
      QuestionCard({ question: q, selected, onSelect: (L) => { selected = L; render(); }, locked: false }),
      h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600.disabled\\:opacity-50', {
        disabled: !selected,
        onClick: submitCurrent
      }, idx === queue.length - 1 ? 'Submit drill →' : 'Next →')
    ])));
  }

  function submitCurrent() {
    if (!selected) return;
    const q = queue[idx];
    const isCorrect = selected === q.correct_choice;
    const timeMs = Date.now() - qStart;
    store.recordAttempt({
      question_id: q.id, session_id: session.id,
      chosen_choice: selected, is_correct: isCorrect, time_spent_ms: timeMs
    });
    results.push({ q, chosen: selected, isCorrect, timeMs });
    if (!isCorrect && store.getUser().settings.auto_add_missed_to_flashcards) {
      store.addFlashcard({ source_question_id: q.id });
    }
    idx++;
    selected = null;
    qStart = Date.now();
    if (idx >= queue.length) finish();
    else render();
  }

  function finish() {
    if (timerInterval) clearInterval(timerInterval);
    const correct = results.filter(r => r.isCorrect).length;
    store.endSession(session.id, { raw_score: correct });
    bumpProgress(results.length);
    phase = 'review';
    render();
  }

  function reviewView() {
    const correct = results.filter(r => r.isCorrect).length;
    const total = results.length;
    return h('div.space-y-5', [
      renderLayout(h('div.space-y-5', [
        h('div.bg-white.rounded-xl.border.border-slate-200.p-6', [
          h('h1.text-2xl.font-bold.text-slate-900.mb-2', 'Drill complete'),
          h('div.text-4xl.font-bold.text-brand-600', `${correct}/${total}`),
          h('p.text-sm.text-slate-600.mt-1', `Average ${Math.round(results.reduce((a,r)=>a+r.timeMs,0)/results.length/1000)}s per question.`)
        ]),
        improvementBlock(results),
        h('div.space-y-4', results.map((r, i) => reviewItem(r, i))),
        h('div.flex.gap-3', [
          h('a.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-brand-600',
            { href: '#/drill' }, 'New drill'),
          h('a.flex-1.bg-white.border.border-slate-300.text-slate-700.font-semibold.py-3.rounded-lg.text-center.hover\\:bg-slate-50',
            { href: '#/' }, 'Home')
        ])
      ]))
    ]);
  }

  // Tick total timer for the display
  timerInterval = setInterval(() => {
    if (phase !== 'answering') { clearInterval(timerInterval); return; }
    const elapsed = Date.now() - startedAt;
    if (elapsed >= totalLimit) { finish(); return; }
    render();
  }, 1000);

  // Cleanup when leaving the route
  window.addEventListener('hashchange', () => clearInterval(timerInterval), { once: true });

  render();
  return root;
}

// Per-question review card. Shown EXPANDED so the student can scan
// everything at once: the sentence + question, all four choices with green
// (correct) / red (wrong pick) / amber (the right one if they missed)
// borders, plus the per-choice "why" line drawn straight from the question
// data. Quoted snippets keep their flash-to-passage behavior via
// renderWithGlossary.
function reviewItem(r, i) {
  const q = r.q;
  const passage = q.passage_id ? getPassage(q.passage_id) : null;
  const ctx = passage ? sentenceContextFor(q.id, passage) : null;
  const underlined = passage ? underlinedTextFor(q.id, passage) : null;
  const letters = ['A','B','C','D'];

  const reasonForChoice = (L) => {
    if (L === q.correct_choice) return q.explanation_correct;
    return q.explanation_distractors?.[L] || null;
  };

  return h('div.bg-white.rounded-xl.border.border-slate-200.p-5.space-y-3', [
    // Header: number, correct/incorrect badge, topic
    h('div.flex.items-center.justify-between.gap-3.flex-wrap', [
      h('div.flex.items-center.gap-2', [
        h('span.text-xs.font-bold.text-slate-500', `Q${i+1}`),
        h('span.text-sm.font-semibold.px-2.py-1.rounded',
          { className: r.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700' },
          r.isCorrect ? '✓ Correct' : '✗ Incorrect'),
        q.primary_topic_id ? h('span.text-xs.text-slate-500', '· ' + q.primary_topic_id) : null
      ]),
      h('span.text-xs.text-slate-500', `${Math.round(r.timeMs/1000)}s`)
    ]),

    // Sentence in context (if passage-attached) — with the underlined portion
    // highlighted inline. For standalone questions, just show the stem itself
    // since IT is the sentence.
    ctx && ctx.html
      ? h('div.bg-slate-50.border.border-slate-200.rounded-lg.p-3', [
          h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-1', 'The sentence'),
          h('p.text-sm.text-slate-900.leading-relaxed', { html: ctx.html })
        ])
      : h('div.bg-slate-50.border.border-slate-200.rounded-lg.p-3', [
          h('div.text-xs.font-semibold.text-slate-500.uppercase.mb-1', 'The question'),
          h('p.text-sm.text-slate-900.leading-relaxed', q.stem)
        ]),

    // For passage-attached, also show the original prompt + underlined.
    passage ? h('div.text-xs.text-slate-600',
      ['ACT-style prompt: ', h('span.text-slate-800', q.stem),
       underlined ? h('span', [' · Underlined: ', h('span.font-mono.bg-yellow-100.px-1.rounded', `"${underlined.trim()}"`)]) : null]) : null,

    // Choices + per-choice reason
    h('div.space-y-2',
      letters.map(L => {
        const isYourPick = L === r.chosen;
        const isCorrect  = L === q.correct_choice;
        let className = 'border-slate-200 bg-white';
        let badge = null;
        if (isCorrect && isYourPick) {
          className = 'border-emerald-400 bg-emerald-50';
          badge = h('span.text-xs.font-semibold.text-emerald-700', 'Your answer · Correct');
        } else if (isCorrect) {
          className = 'border-emerald-400 bg-emerald-50';
          badge = h('span.text-xs.font-semibold.text-emerald-700', 'Correct answer');
        } else if (isYourPick) {
          className = 'border-rose-400 bg-rose-50';
          badge = h('span.text-xs.font-semibold.text-rose-700', 'Your answer');
        }
        const reason = reasonForChoice(L);
        return h('div.border-2.rounded-lg.p-3', { className }, [
          h('div.flex.items-start.gap-3', [
            h('span.flex-shrink-0.w-7.h-7.rounded-full.bg-slate-100.text-slate-700.font-bold.flex.items-center.justify-center', L),
            h('div.flex-1.min-w-0', [
              h('div.flex.items-center.justify-between.gap-2.flex-wrap.mb-1', [
                h('span.text-sm.font-medium.text-slate-900', q.choices[L]),
                badge
              ]),
              reason ? h('div.text-xs.text-slate-700.leading-relaxed.mt-1', [
                h('span.font-semibold', isCorrect ? 'Why this is right: ' : 'Why this is wrong: '),
                ...renderWithGlossary(reason)
              ]) : null
            ])
          ])
        ]);
      })
    ),

    // Takeaway / rule of thumb
    q.takeaway ? h('div.bg-amber-50.border.border-amber-200.rounded-lg.p-3', [
      h('div.text-xs.font-bold.text-amber-800.uppercase.mb-1', '💡 Takeaway'),
      h('p.text-sm.text-amber-900', renderWithGlossary(q.takeaway))
    ]) : null,

    // Add to flashcards
    h('button.text-xs.text-brand-600.hover\\:underline', {
      onClick: (ev) => {
        store.addFlashcard({ source_question_id: q.id });
        ev.target.textContent = '✓ Added to flashcards';
        ev.target.disabled = true;
      }
    }, '+ Add this question to flashcards')
  ]);
}

// Aggregate misses by topic across the drill, then surface improvement tips
// for any topic where the student missed at least one question. Returns null
// when there were no misses.
function improvementBlock(results) {
  const missedByTopic = new Map();
  for (const r of results) {
    if (r.isCorrect) continue;
    const tid = r.q.primary_topic_id;
    const topic = getTopic(tid);
    if (!topic) continue;
    if (!missedByTopic.has(tid)) missedByTopic.set(tid, { topic, count: 0 });
    missedByTopic.get(tid).count++;
  }
  if (missedByTopic.size === 0) return null;

  const cards = [...missedByTopic.values()].map(({ topic, count }) => {
    const tips = getTips(topic.id);
    if (!tips) return null;
    return h('div.bg-white.border.border-amber-200.rounded-lg.p-4', [
      h('div.flex.items-baseline.justify-between.mb-2.gap-3.flex-wrap', [
        h('h3.font-semibold.text-slate-900', topic.name),
        h('span.text-xs.text-rose-600.font-medium', `${count} miss${count > 1 ? 'es' : ''}`)
      ]),
      h('p.text-sm.text-amber-900.font-medium.italic.mb-2', tips.headline),
      h('div.text-xs.font-bold.text-amber-800.uppercase.tracking-wide.mb-1', 'Do this next:'),
      h('ol.list-decimal.list-inside.text-sm.text-slate-700.space-y-1.leading-relaxed',
        tips.actions.map(a => h('li', renderWithGlossary(a)))),
      h('div.mt-3.flex.gap-2.flex-wrap', [
        h('a.text-xs.bg-emerald-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-emerald-700',
          { href: `#/drill?topic=${topic.id}` }, '⏱️ Drill 5 more →'),
        h('a.text-xs.bg-blue-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-blue-700',
          { href: `#/lesson?topic=${topic.id}` }, '📖 Read mini-lesson'),
        h('a.text-xs.bg-red-600.text-white.font-medium.px-3.py-1\\.5.rounded.hover\\:bg-red-700',
          { href: youtubeSearchUrl(topic.id), target: '_blank', rel: 'noopener noreferrer' }, '📺 Watch a video ↗')
      ])
    ]);
  }).filter(Boolean);

  return h('div.bg-gradient-to-br.from-amber-50.to-orange-50.border.border-amber-300.rounded-xl.p-5', [
    h('div.flex.items-center.gap-2.mb-3', [
      h('span.text-2xl', '🎯'),
      h('div', [
        h('h2.font-semibold.text-amber-900', 'How to get better at the topics you missed'),
        h('p.text-xs.text-amber-800',
          'Concrete next steps for each topic you missed in this drill — based on the patterns that usually trip students up.')
      ])
    ]),
    h('div.space-y-3', cards)
  ]);
}

function bumpProgress(questions) {
  const today = new Date().toISOString().slice(0, 10);
  store.addDailyProgress(today, Math.max(1, Math.round(questions * 36 / 60)), questions);
}
