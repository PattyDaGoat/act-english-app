import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { computeWeakTopics, computeTodayProgress } from '../lib/analytics.js';
import { todayISO } from '../lib/util.js';

export function HomeScreen() {
  const u = store.getUser();
  const today = computeTodayProgress();
  const weak = computeWeakTopics().slice(0, 3);
  const events = store.listScheduleEvents().filter(e => e.scheduled_date === todayISO());
  const plan = store.getStudyPlan();

  const goalPctMin = Math.min(100, Math.round((today.minutes / u.daily_goal.minutes) * 100));
  const goalPctQ = Math.min(100, Math.round((today.questions / u.daily_goal.questions) * 100));
  const goalPct = Math.max(goalPctMin, goalPctQ);

  return h('div.space-y-6', [
    h('div.bg-white.rounded-xl.shadow-sm.border.border-slate-200.p-6', [
      h('div.flex.items-center.justify-between.mb-4', [
        h('div', [
          h('h1.text-2xl.font-bold.text-slate-900', `Hi, ${u.display_name}`),
          h('p.text-slate-600.text-sm', "Let's keep your streak alive.")
        ]),
        h('div.text-right', [
          h('div.text-3xl.font-bold.text-orange-600', `🔥 ${u.streak_count}`),
          h('div.text-xs.text-slate-500', 'day streak')
        ])
      ]),
      h('div.mt-4', [
        h('div.flex.justify-between.text-sm.mb-1', [
          h('span.text-slate-700', "Today's goal"),
          h('span.text-slate-500', `${today.minutes} min · ${today.questions} q`)
        ]),
        h('div.h-2.bg-slate-100.rounded-full.overflow-hidden', [
          h('div.h-full.bg-emerald-500.transition-all', { style: { width: goalPct + '%' } })
        ])
      ])
    ]),

    plan
      ? h('a.block.bg-gradient-to-r.from-purple-600.to-indigo-600.text-white.rounded-xl.p-5.hover\\:shadow-lg.transition-shadow',
          { href: '#/diagnostic/plan' }, [
            h('div.flex.items-center.justify-between', [
              h('div', [
                h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-80.mb-1', '🎯 Your study plan'),
                h('div.font-semibold',
                  `Diagnostic: ${plan.overall_accuracy ?? '—'}% · ${plan.grouped.weak.length} weak / ${plan.grouped.medium.length} medium / ${plan.grouped.strong.length} strong`),
                h('div.text-xs.opacity-90.mt-1',
                  plan.grouped.weak.length > 0
                    ? `Today's focus: ${plan.grouped.weak.slice(0, 3).map(t => t.name).join(', ')}`
                    : 'No weak topics — keep practicing the medium ones.')
              ]),
              h('div.text-3xl', '→')
            ])
          ])
      : h('a.block.bg-gradient-to-r.from-purple-600.to-pink-600.text-white.rounded-xl.p-5.hover\\:shadow-lg.transition-shadow',
          { href: '#/diagnostic' }, [
            h('div.flex.items-center.justify-between', [
              h('div', [
                h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-80.mb-1', '🚀 Start here'),
                h('div.font-semibold', 'Take the 20-question diagnostic'),
                h('div.text-xs.opacity-90.mt-1',
                  "We'll auto-build a study plan focused on your weak spots — and skip the ones you already know.")
              ]),
              h('div.text-3xl', '→')
            ])
          ]),

    h('div.grid.grid-cols-2.md\\:grid-cols-4.gap-4', [
      quickStartCard('📚', 'Lesson Mode', 'Strategy first, then apply', '#/lesson-mode', 'bg-emerald-50 border-emerald-200'),
      quickStartCard('🎓', 'Guided Practice', 'Learn from every miss', '#/guided', 'bg-blue-50 border-blue-200'),
      quickStartCard('⏱️', 'Timed Drill', 'Quick 5–15 question set', '#/drill', 'bg-purple-50 border-purple-200'),
      quickStartCard('📝', 'Mock Test', 'Full 45-min simulation', '#/mock', 'bg-rose-50 border-rose-200')
    ]),

    weak.length >= 2
      ? h('a.block.bg-gradient-to-r.from-purple-600.to-indigo-600.text-white.rounded-xl.p-5.hover\\:shadow-lg.transition-shadow',
          { href: '#/adaptive' }, [
            h('div.flex.items-center.justify-between', [
              h('div', [
                h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-80.mb-1', '✨ Adaptive review'),
                h('div.font-semibold', `Smart queue from your ${weak.length} weakest topic${weak.length === 1 ? '' : 's'}`),
                h('div.text-xs.opacity-90.mt-1',
                  `Focus today: ${weak.slice(0, 2).map(w => w.name).join(', ')}`)
              ]),
              h('div.text-3xl', '→')
            ])
          ])
      : null,

    h('div.grid.grid-cols-1.md\\:grid-cols-2.gap-4', [
      h('div.bg-white.rounded-xl.shadow-sm.border.border-slate-200.p-5', [
        h('h3.font-semibold.text-slate-900.mb-3', 'Weakest topics'),
        weak.length === 0
          ? h('p.text-sm.text-slate-500', 'Practice more questions to surface weak spots.')
          : h('ul.space-y-2', weak.map(w =>
              h('li.flex.items-center.justify-between.text-sm', [
                h('span.text-slate-700', w.name),
                h('span.text-red-600.font-medium', `${w.accuracy}%`)
              ])
            ))
      ]),
      h('div.bg-white.rounded-xl.shadow-sm.border.border-slate-200.p-5', [
        h('h3.font-semibold.text-slate-900.mb-3', "Today's plan"),
        events.length === 0
          ? h('p.text-sm.text-slate-500', 'No scheduled session today. Pick any practice mode above.')
          : h('ul.space-y-2', events.map(e =>
              h('li.flex.items-center.justify-between.text-sm', [
                h('span.text-slate-700', `${e.type} session`),
                e.completed
                  ? h('span.text-emerald-600.text-xs', '✓ done')
                  : h('a.text-brand-600.text-xs.hover\\:underline',
                      { href: '#/' + e.type }, 'Start →')
              ])
            ))
      ])
    ]),

    h('div.bg-white.rounded-xl.shadow-sm.border.border-slate-200.p-5', [
      h('h3.font-semibold.text-slate-900.mb-3', 'Other practice'),
      h('div.flex.flex-wrap.gap-2', [
        chipLink('🤖 Tutor chat', '#/tutor'),
        chipLink('📍 Where I stand', '#/standing'),
        chipLink('🛡️ Helped Test', '#/helped'),
        chipLink('✨ Adaptive Review', '#/adaptive'),
        chipLink('🃏 Flashcards', '#/flashcards'),
        chipLink('📊 Analytics', '#/analytics'),
        chipLink('📅 Schedule', '#/schedule')
      ])
    ])
  ]);
}

function quickStartCard(emoji, title, sub, href, bg) {
  return h('a.block.rounded-xl.border.p-5.hover\\:shadow-md.transition-shadow.' + bg.split(' ').join('.'),
    { href }, [
      h('div.text-3xl.mb-2', emoji),
      h('div.font-semibold.text-slate-900', title),
      h('div.text-sm.text-slate-600', sub)
    ]);
}

function chipLink(label, href) {
  return h('a.px-3.py-1\\.5.rounded-full.bg-slate-100.text-slate-700.text-sm.hover\\:bg-slate-200',
    { href }, label);
}
