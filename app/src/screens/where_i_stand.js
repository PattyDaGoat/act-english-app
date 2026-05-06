// "Where I Stand" — a single-page snapshot of the student's standing across
// every dimension the app tracks, plus a one-click "Copy summary for AI tutor"
// button that exports a structured markdown report. Paste it into Claude (or
// any chat AI) to get personalized advice on what to work on next.
import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import {
  topicAccuracyMap, categoryAccuracy, scoreTrajectory,
  avgTimePerQuestion, totalQuestionsByMode, computeWeakTopics
} from '../lib/analytics.js';
import { leafTopics, getTopic, categoryName } from '../data/topics.js';

export function WhereIStandScreen() {
  const u = store.getUser();
  const plan = store.getStudyPlan();
  const topicMap = topicAccuracyMap();
  const cats = categoryAccuracy();
  const trajectory = scoreTrajectory();
  const counts = totalQuestionsByMode();
  const totalAttempts = store.listAttempts().length;
  const totalSessions = store.listSessions().filter(s => s.ended_at).length;
  const avgSec = avgTimePerQuestion();
  const weak = computeWeakTopics();

  const noData = totalAttempts === 0 && !plan;

  if (noData) {
    return h('div.bg-white.rounded-xl.border.border-slate-200.p-6.space-y-3', [
      h('h1.text-2xl.font-bold.text-slate-900', 'Where I stand'),
      h('p.text-slate-700',
        "You haven't answered any questions yet, so there's nothing to summarize. " +
        'Take the diagnostic test or try a Lesson Mode session, then come back here for a snapshot.'),
      h('div.flex.gap-3', [
        h('a.inline-block.bg-purple-600.text-white.px-4.py-2.rounded-lg.font-medium.hover\\:bg-purple-700',
          { href: '#/diagnostic' }, '🎯 Take the diagnostic'),
        h('a.inline-block.bg-emerald-600.text-white.px-4.py-2.rounded-lg.font-medium.hover\\:bg-emerald-700',
          { href: '#/lesson-mode' }, '📚 Lesson Mode')
      ])
    ]);
  }

  const root = h('div.space-y-6');

  // ── Header card ────────────────────────────────────────────────
  const overallPct = topicMap.length
    ? Math.round(topicMap.reduce((a, t) => a + (t.accuracy || 0), 0) / topicMap.length)
    : null;
  const latestMock = trajectory.filter(s => s.scaled).slice(-1)[0];

  root.appendChild(h('div.bg-gradient-to-r.from-slate-800.to-slate-900.text-white.rounded-xl.p-6', [
    h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-70.mb-1', 'Where you stand'),
    h('h1.text-2xl.font-bold', `${u.display_name}'s ACT English snapshot`),
    h('div.grid.grid-cols-2.md\\:grid-cols-4.gap-4.mt-4', [
      stat('Overall accuracy', overallPct != null ? `${overallPct}%` : '—', 'across recent attempts'),
      stat('Latest scaled', latestMock ? latestMock.scaled : '—', latestMock ? `${latestMock.mode} on ${latestMock.date}` : 'no mock yet'),
      stat('Questions done', String(totalAttempts), `${totalSessions} session${totalSessions === 1 ? '' : 's'}`),
      stat('Avg time / Q', avgSec ? `${avgSec}s` : '—', 'across all modes')
    ])
  ]));

  // ── Copy-for-AI banner ─────────────────────────────────────────
  const summaryMd = buildAiSummary({
    user: u, plan, topicMap, cats, trajectory, counts, totalAttempts, avgSec, weak
  });
  const copyBtn = h('button.bg-purple-600.text-white.px-4.py-2.rounded-lg.font-semibold.hover\\:bg-purple-700',
    { onClick: () => copyToClipboard(summaryMd, copyBtn) },
    '📋 Copy summary for AI tutor');

  root.appendChild(h('div.bg-purple-50.border.border-purple-200.rounded-xl.p-5', [
    h('div.flex.items-start.justify-between.gap-3.flex-wrap', [
      h('div.flex-1.min-w-0', [
        h('h2.font-semibold.text-purple-900.mb-1', '🤖 Show this to an AI tutor'),
        h('p.text-sm.text-purple-900', [
          "Click to copy a structured markdown summary of where you are. Paste it into Claude (or any AI chat) and ask ",
          h('span.font-semibold.italic', '"Based on this, what should I work on next?"'),
          " The AI gets exactly the data it needs without seeing your raw attempts."
        ])
      ]),
      copyBtn
    ]),
    h('details.mt-3', [
      h('summary.cursor-pointer.text-sm.text-purple-700.font-medium', 'Preview the summary'),
      h('pre.mt-2.bg-white.border.border-purple-200.rounded.p-3.text-xs.text-slate-800.whitespace-pre-wrap.overflow-x-auto.font-mono',
        summaryMd)
    ])
  ]));

  // ── Categories ─────────────────────────────────────────────────
  root.appendChild(h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
    h('h2.font-semibold.text-slate-900.mb-3', 'By skill category'),
    cats.length === 0 || cats.every(c => c.total === 0)
      ? h('p.text-sm.text-slate-500', 'No category data yet.')
      : h('div.space-y-3', cats.map(c =>
          h('div', [
            h('div.flex.justify-between.text-sm.mb-1', [
              h('span.font-medium.text-slate-800', categoryName(c.category)),
              h('span.text-slate-600', `${c.accuracy ?? '—'}% · ${c.total} q`)
            ]),
            h('div.h-2.bg-slate-100.rounded-full.overflow-hidden', [
              h('div.h-full.transition-all', {
                className: barColor(c.accuracy),
                style: { width: (c.accuracy ?? 0) + '%' }
              })
            ])
          ])
        ))
  ]));

  // ── Topics breakdown ───────────────────────────────────────────
  const topicRows = leafTopics().map(t => {
    const stats = topicMap.find(x => x.topic_id === t.id);
    const planLevel = plan?.levels?.[t.id];
    return { topic: t, stats, planLevel };
  });

  root.appendChild(h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
    h('div.flex.items-center.justify-between.mb-3', [
      h('h2.font-semibold.text-slate-900', 'Per-topic standing'),
      h('span.text-xs.text-slate-500', `${topicRows.filter(r => r.stats || r.planLevel).length} of ${topicRows.length} topics seen`)
    ]),
    h('div.grid.grid-cols-1.md\\:grid-cols-2.gap-3',
      topicRows.map(r => {
        const acc = r.stats?.accuracy;
        const total = r.stats?.recent_total || 0;
        const level = r.planLevel || levelFromAccuracy(acc, total);
        return h('div.flex.items-center.justify-between.gap-2.p-3.rounded-lg.border', {
          className: levelBgBorder(level)
        }, [
          h('div.min-w-0', [
            h('div.font-medium.text-slate-900.truncate', r.topic.name),
            h('div.text-xs.text-slate-500',
              total > 0 ? `${total} attempt${total === 1 ? '' : 's'} · ${acc ?? '—'}%` : 'not practiced')
          ]),
          h('span.text-xs.font-semibold.uppercase.tracking-wide.flex-shrink-0', { className: levelTextColor(level) }, level)
        ]);
      })
    )
  ]));

  // ── Mode usage ─────────────────────────────────────────────────
  root.appendChild(h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
    h('h2.font-semibold.text-slate-900.mb-3', 'How you\'ve been practicing'),
    h('div.grid.grid-cols-2.md\\:grid-cols-5.gap-3', [
      modeChip('Lesson / Guided', counts.guided),
      modeChip('Drills', counts.drill),
      modeChip('Mocks', counts.mock),
      modeChip('Helped', counts.helped),
      modeChip('Flashcards', counts.flashcard)
    ])
  ]));

  return root;
}

// ─── helpers ─────────────────────────────────────────────────────

function stat(label, value, sub) {
  return h('div', [
    h('div.text-xs.uppercase.tracking-wide.opacity-70', label),
    h('div.text-2xl.font-bold.mt-0\\.5', String(value)),
    h('div.text-xs.opacity-80.mt-0\\.5', sub)
  ]);
}

function modeChip(label, count) {
  return h('div.bg-slate-50.border.border-slate-200.rounded-lg.p-3.text-center', [
    h('div.text-2xl.font-bold.text-slate-900', String(count)),
    h('div.text-xs.text-slate-600.mt-1', label)
  ]);
}

function barColor(acc) {
  if (acc == null) return 'bg-slate-300';
  if (acc >= 80) return 'bg-emerald-500';
  if (acc >= 50) return 'bg-amber-500';
  return 'bg-rose-500';
}

function levelFromAccuracy(acc, total) {
  if (total === 0 || acc == null) return 'unseen';
  if (acc >= 80) return 'strong';
  if (acc >= 50) return 'medium';
  return 'weak';
}

function levelBgBorder(level) {
  return ({
    weak:    'bg-rose-50 border-rose-200',
    medium:  'bg-amber-50 border-amber-200',
    strong:  'bg-emerald-50 border-emerald-200',
    unknown: 'bg-slate-50 border-slate-200',
    unseen:  'bg-slate-50 border-slate-200'
  })[level] || 'bg-slate-50 border-slate-200';
}

function levelTextColor(level) {
  return ({
    weak:    'text-rose-700',
    medium:  'text-amber-700',
    strong:  'text-emerald-700',
    unknown: 'text-slate-500',
    unseen:  'text-slate-500'
  })[level] || 'text-slate-500';
}

function copyToClipboard(text, btn) {
  const original = btn.textContent;
  const done = () => {
    btn.textContent = '✓ Copied — paste it into your AI chat';
    setTimeout(() => { btn.textContent = original; }, 3500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallback());
  } else {
    fallback();
  }
  function fallback() {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); }
    catch { btn.textContent = '⚠️ Copy failed — select the preview text manually'; }
    document.body.removeChild(ta);
  }
}

// Build the markdown summary handed to an external AI tutor. Stable, structured,
// and intentionally short so a model can reason over it without scrolling.
function buildAiSummary({ user, plan, topicMap, cats, trajectory, counts, totalAttempts, avgSec, weak }) {
  const lines = [];
  lines.push('# ACT English — Where I Stand');
  lines.push('');
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(`- Target score: ${user.target_score ?? '—'}`);
  lines.push(`- Most recent self-reported English score: ${user.current_score ?? '—'}`);
  lines.push(`- Daily goal: ${user.daily_goal.minutes} min · ${user.daily_goal.questions} questions`);
  lines.push(`- Streak: ${user.streak_count} day(s)`);
  lines.push(`- Prep timeframe: ${user.prep_weeks ?? '—'} weeks`);
  lines.push('');

  lines.push('## Practice volume');
  lines.push(`- Total questions attempted: ${totalAttempts}`);
  lines.push(`- Average time per question: ${avgSec ? avgSec + 's' : '—'}`);
  lines.push(`- By mode — Lesson/Guided: ${counts.guided} · Drill: ${counts.drill} · Mock: ${counts.mock} · Helped: ${counts.helped} · Flashcard: ${counts.flashcard}`);
  lines.push('');

  if (plan) {
    lines.push('## Diagnostic / study plan');
    lines.push(`- Diagnostic taken: ${new Date(plan.created_at).toLocaleDateString()}`);
    lines.push(`- Overall diagnostic accuracy: ${plan.overall_accuracy ?? '—'}%`);
    lines.push(`- Weak topics (focus): ${plan.grouped.weak.map(t => t.name).join(', ') || 'none'}`);
    lines.push(`- Medium topics: ${plan.grouped.medium.map(t => t.name).join(', ') || 'none'}`);
    lines.push(`- Strong topics: ${plan.grouped.strong.map(t => t.name).join(', ') || 'none'}`);
    lines.push(`- Untested topics: ${plan.grouped.unknown.map(t => t.name).join(', ') || 'none'}`);
    lines.push('');
  }

  lines.push('## Skill-category accuracy (recent window)');
  if (cats.length && cats.some(c => c.total)) {
    for (const c of cats) {
      lines.push(`- ${categoryName(c.category)}: ${c.accuracy ?? '—'}% (n=${c.total})`);
    }
  } else {
    lines.push('- not enough data yet');
  }
  lines.push('');

  lines.push('## Per-topic accuracy (recent attempts)');
  const topicSorted = [...topicMap].sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0));
  if (topicSorted.length) {
    for (const t of topicSorted) {
      lines.push(`- ${t.name}: ${t.accuracy ?? '—'}% (${t.recent_correct}/${t.recent_total})`);
    }
  } else {
    lines.push('- not enough data yet');
  }
  lines.push('');

  if (trajectory.length) {
    lines.push('## Score trajectory (mocks + official scores)');
    for (const s of trajectory.slice(-8)) {
      lines.push(`- ${s.date} · ${s.mode}${s.scaled ? ` · scaled ${s.scaled}` : ''}${s.unaided ? ` · unaided ${s.unaided}` : ''}${s.raw_score != null ? ` · raw ${s.raw_score}` : ''}`);
    }
    lines.push('');
  }

  if (weak.length) {
    lines.push('## Top weak spots (≥10 attempts, <70% accuracy)');
    for (const w of weak.slice(0, 5)) {
      lines.push(`- ${w.name}: ${w.accuracy}%`);
    }
    lines.push('');
  }

  lines.push('## What I want from you');
  lines.push('Given the data above, identify the 3 highest-leverage topics for me to drill this week, suggest a study schedule for the next 7 days, and explain WHY in one sentence per topic.');
  return lines.join('\n');
}
