import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { generateSchedule } from '../lib/schedule.js';
import { todayISO } from '../lib/util.js';

export function ScheduleScreen() {
  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const u = store.getUser();
    const events = store.listScheduleEvents();
    const today = todayISO();
    const upcoming = events.filter(e => e.scheduled_date >= today);

    root.appendChild(h('div.space-y-6', [
      h('div.flex.items-baseline.justify-between', [
        h('h1.text-2xl.font-bold.text-slate-900', 'Study schedule'),
        h('span.text-sm.text-slate-500',
          u.target_test_date ? `Test day: ${u.target_test_date}` : 'No test date set')
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('div.flex.items-center.justify-between', [
          h('div', [
            h('div.text-sm.text-slate-700.font-medium',
              `Studying ${u.study_days_per_week} day${u.study_days_per_week === 1 ? '' : 's'} per week`),
            h('div.text-xs.text-slate-500',
              `Daily goal: ${u.daily_goal.minutes} min OR ${u.daily_goal.questions} questions`)
          ]),
          h('div.flex.gap-2', [
            h('button.bg-brand-500.text-white.text-sm.font-semibold.px-4.py-2.rounded-lg.hover\\:bg-brand-600', {
              onClick: () => {
                if (!u.target_test_date) { alert('Set a test date in Settings first.'); return; }
                store.setScheduleEvents(generateSchedule({
                  targetDate: u.target_test_date, daysPerWeek: u.study_days_per_week
                }));
                render();
              }
            }, events.length === 0 ? 'Generate schedule' : 'Regenerate'),
            events.length > 0 ? h('button.text-sm.text-slate-500.hover\\:text-slate-900.px-3', {
              onClick: () => { if (confirm('Clear schedule?')) { store.setScheduleEvents([]); render(); } }
            }, 'Clear') : null
          ])
        ])
      ]),

      h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', 'Streak'),
        h('div.flex.items-center.gap-4', [
          h('div.text-5xl', '🔥'),
          h('div', [
            h('div.text-3xl.font-bold.text-orange-600', String(u.streak_count)),
            h('div.text-sm.text-slate-600',
              `${u.streak_count === 1 ? 'day' : 'days'} in a row · 1 freeze available per week`)
          ])
        ]),
        h('div.flex.gap-2.mt-3.flex-wrap',
          [7, 14, 30, 60, 90].map(milestone =>
            h('span.px-3.py-1.rounded-full.text-xs.font-semibold', {
              className: u.streak_count >= milestone
                ? 'bg-orange-100 text-orange-700'
                : 'bg-slate-100 text-slate-400'
            }, `${milestone}d ${u.streak_count >= milestone ? '✓' : ''}`)
          )
        )
      ]),

      events.length > 0 ? h('div.bg-white.rounded-xl.border.border-slate-200.p-5', [
        h('h2.font-semibold.text-slate-900.mb-3', `Upcoming sessions (${upcoming.length})`),
        h('ul.divide-y.divide-slate-100',
          upcoming.slice(0, 30).map(e =>
            h('li.py-2.flex.items-center.justify-between.text-sm', [
              h('div.flex.items-center.gap-3', [
                h('span.font-mono.text-xs.text-slate-500.w-24', e.scheduled_date),
                h('span.px-2.py-0\\.5.rounded.text-xs.font-semibold', {
                  className: e.type === 'mock' ? 'bg-rose-100 text-rose-700'
                           : e.type === 'guided' ? 'bg-blue-100 text-blue-700'
                           : 'bg-purple-100 text-purple-700'
                }, e.type)
              ]),
              e.completed
                ? h('span.text-emerald-600.text-xs', '✓ done')
                : h('a.text-brand-600.text-xs.hover\\:underline', { href: '#/' + e.type }, 'Start →')
            ])
          )
        )
      ]) : null,

      events.length === 0 && u.target_test_date ? h('div.bg-blue-50.border.border-blue-200.rounded-xl.p-5.text-blue-900.text-sm',
        'Click "Generate schedule" above to build a daily plan from now until your test date.') : null
    ]));
  }
  render();
  return root;
}
