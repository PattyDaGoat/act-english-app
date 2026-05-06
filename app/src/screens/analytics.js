import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import {
  topicAccuracyMap, computeWeakTopics, scoreTrajectory,
  avgTimePerQuestion, totalQuestionsByMode, categoryAccuracy
} from '../lib/analytics.js';
import { accuracyColor, pct } from '../lib/util.js';
import { categoryName } from '../data/topics.js';

export function AnalyticsScreen() {
  const sessions = store.listSessions();
  const attempts = store.listAttempts();
  const priorScores = store.listPriorScores();
  if (attempts.length === 0 && priorScores.length === 0) {
    return h('div.bg-white.p-8.rounded-xl.border.border-slate-200.text-center', [
      h('div.text-5xl.mb-3', '📊'),
      h('h2.text-xl.font-bold.text-slate-900.mb-2', 'No data yet'),
      h('p.text-slate-600.mb-4', 'Finish a Guided Practice session, or add a past ACT score in Settings, and your trajectory will appear here.'),
      h('div.flex.gap-2.justify-center', [
        h('a.inline-block.bg-brand-500.text-white.px-5.py-2\\.5.rounded-lg.font-semibold.hover\\:bg-brand-600',
          { href: '#/guided' }, 'Start practicing →'),
        h('a.inline-block.bg-white.border.border-slate-300.text-slate-700.px-5.py-2\\.5.rounded-lg.font-semibold.hover\\:bg-slate-50',
          { href: '#/settings' }, 'Add past score')
      ])
    ]);
  }

  const trajectory = scoreTrajectory();
  const weakTopics = computeWeakTopics();
  const topicMap = topicAccuracyMap().sort((a, b) => b.recent_total - a.recent_total);
  const categoryRows = categoryAccuracy();
  const totalsByMode = totalQuestionsByMode();
  const avgGuided = avgTimePerQuestion('guided');
  const avgMock = avgTimePerQuestion('mock');

  return h('div.space-y-6', [
    h('h1.text-2xl.font-bold.text-slate-900', 'Your progress'),

    // Score trajectory
    h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
      h('h2.font-semibold.text-slate-900.mb-3', 'Score trajectory'),
      trajectory.length === 0
        ? h('p.text-sm.text-slate-500', 'Complete a Mock or Helped Test to see your projected ACT English score.')
        : trajectoryChart(trajectory)
    ]),

    // Category breakdown
    h('div.grid.grid-cols-1.md\\:grid-cols-3.gap-4',
      categoryRows.map(row =>
        h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
          h('div.text-xs.font-semibold.text-slate-500.uppercase.tracking-wide', categoryName(row.category)),
          h('div.text-3xl.font-bold.mt-1', { className: row.accuracy >= 70 ? 'text-emerald-600' : 'text-rose-600' }, `${row.accuracy}%`),
          h('div.text-xs.text-slate-500.mt-1', `${row.total} recent question${row.total === 1 ? '' : 's'}`)
        ])
      )
    ),

    // Topic heatmap
    h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
      h('h2.font-semibold.text-slate-900.mb-1', 'Topic accuracy'),
      h('p.text-xs.text-slate-500.mb-4', 'Last 20 questions per topic. Topics with fewer than 10 attempts shown faded.'),
      topicMap.length === 0
        ? h('p.text-sm.text-slate-500', 'No topic data yet.')
        : h('div.grid.grid-cols-2.md\\:grid-cols-3.gap-2',
            topicMap.map(t =>
              h('div.heatmap-cell.rounded-lg.p-3.text-sm', {
                className: (t.recent_total >= 10 ? '' : 'opacity-50 ') + accuracyColor(t.accuracy)
              }, [
                h('div.font-medium', t.name),
                h('div.text-xs.opacity-90', `${t.accuracy}% · ${t.recent_correct}/${t.recent_total}`)
              ])
            )
          )
    ]),

    // Weak topics
    weakTopics.length > 0
      ? h('div.bg-rose-50.border.border-rose-200.rounded-xl.p-5', [
          h('div.flex.items-center.justify-between.mb-3', [
            h('h2.font-semibold.text-rose-900', '🎯 Topics to focus on'),
            h('a.bg-purple-600.text-white.text-xs.font-semibold.px-3.py-1\\.5.rounded-lg.hover\\:bg-purple-700',
              { href: '#/adaptive' }, '✨ Adaptive Review →')
          ]),
          h('ul.space-y-2',
            weakTopics.slice(0, 5).map(w =>
              h('li.flex.items-center.justify-between.text-sm', [
                h('span.text-slate-800', w.name),
                h('div.flex.items-center.gap-3', [
                  h('span.text-rose-700.font-medium', `${w.accuracy}%`),
                  h('a.text-brand-600.text-xs.hover\\:underline',
                    { href: `#/lesson?topic=${w.topic_id}` }, '📖 Learn'),
                  h('a.text-brand-600.text-xs.hover\\:underline',
                    { href: `#/drill?topic=${w.topic_id}` }, 'Drill →')
                ])
              ])
            )
          )
        ])
      : null,

    // Time and volume stats
    h('div.grid.grid-cols-2.md\\:grid-cols-4.gap-4', [
      smallStat(avgGuided + 's', 'Avg / Q (guided)', avgGuided > 36 ? 'text-amber-600' : 'text-slate-900'),
      smallStat(avgMock ? avgMock + 's' : '—', 'Avg / Q (mock)', avgMock > 36 ? 'text-amber-600' : 'text-slate-900'),
      smallStat(attempts.length, 'Total questions', 'text-slate-900'),
      smallStat(sessions.filter(s => s.ended_at).length, 'Sessions', 'text-slate-900')
    ]),

    h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
      h('h2.font-semibold.text-slate-900.mb-3', 'Question volume by mode'),
      h('div.space-y-2',
        Object.entries(totalsByMode).filter(([, v]) => v > 0).map(([mode, count]) => {
          const total = Object.values(totalsByMode).reduce((a, b) => a + b, 0);
          const w = pct(count, total);
          return h('div', [
            h('div.flex.justify-between.text-sm.mb-1', [
              h('span.text-slate-700.capitalize', mode),
              h('span.text-slate-500', `${count} (${w}%)`)
            ]),
            h('div.h-2.bg-slate-100.rounded-full.overflow-hidden', [
              h('div.h-full.bg-brand-500', { style: { width: w + '%' } })
            ])
          ]);
        })
      )
    ]),

    h('p.text-xs.text-slate-500.italic', 'Score estimate uses a simple raw-to-scaled lookup based on public ACT conversion charts. Not an official score.')
  ]);
}

function smallStat(big, label, colorClass) {
  return h('div.bg-white.rounded-xl.border.border-slate-200.p-4', [
    h('div.text-2xl.font-bold.' + colorClass.replace(/\s+/g, '.'), String(big)),
    h('div.text-xs.text-slate-600.mt-1', label)
  ]);
}

function trajectoryChart(points) {
  // Simple inline bar/line chart with SVG.
  const w = 600, hgt = 160, pad = 30;
  const max = 36, min = 1;
  const xs = points.map((_, i) => pad + (i * (w - 2*pad) / Math.max(1, points.length - 1)));
  const ys = points.map(p => hgt - pad - ((p.scaled - min) / (max - min)) * (hgt - 2*pad));

  const path = points.length > 1
    ? 'M' + xs.map((x, i) => `${x},${ys[i]}`).join(' L ')
    : '';

  return h('div.overflow-x-auto', [
    h('svg', { viewBox: `0 0 ${w} ${hgt}`, width: '100%', preserveAspectRatio: 'xMinYMid meet' }, [
      // grid lines
      ...[10, 20, 30].map(score => {
        const y = hgt - pad - ((score - min) / (max - min)) * (hgt - 2*pad);
        return svg('line', { x1: pad, x2: w - pad, y1: y, y2: y, stroke: '#e2e8f0', 'stroke-dasharray': '2 4' });
      }),
      ...[10, 20, 30].map(score => {
        const y = hgt - pad - ((score - min) / (max - min)) * (hgt - 2*pad);
        return svg('text', { x: pad - 5, y: y + 4, 'text-anchor': 'end', 'font-size': 10, fill: '#94a3b8' }, String(score));
      }),
      path && svg('path', { d: path, fill: 'none', stroke: '#2563eb', 'stroke-width': 2 }),
      ...xs.map((x, i) => {
        const m = points[i].mode;
        const fill = m === 'mock' ? '#1d4ed8'
                   : m === 'helped' ? '#10b981'
                   : '#f59e0b'; // official scores
        return svg('circle', { cx: x, cy: ys[i], r: m === 'official' ? 7 : 5, fill,
          stroke: m === 'official' ? '#92400e' : 'none', 'stroke-width': m === 'official' ? 2 : 0 });
      }),
      ...xs.map((x, i) => svg('text', { x, y: hgt - pad + 14, 'text-anchor': 'middle', 'font-size': 9, fill: '#64748b' }, points[i].date.slice(5)))
    ]),
    h('div.flex.gap-4.text-xs.mt-2.flex-wrap', [
      h('span.text-amber-700', '⬤ Official ACT'),
      h('span.text-brand-700', '● Mock'),
      h('span.text-emerald-600', '● Helped (raw)')
    ])
  ]);
}

function svg(tag, attrs, kids) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
  if (kids != null) {
    if (Array.isArray(kids)) kids.forEach(k => el.appendChild(typeof k === 'string' ? document.createTextNode(k) : k));
    else el.textContent = String(kids);
  }
  return el;
}
