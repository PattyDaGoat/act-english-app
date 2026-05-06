import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { navigate } from '../lib/router.js';

export function SettingsScreen() {
  const root = h('div');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    const u = store.getUser();

    root.appendChild(h('div.space-y-6', [
      h('h1.text-2xl.font-bold.text-slate-900', 'Settings'),

      section('Profile', [
        field('Display name', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'text', value: u.display_name,
          onChange: (e) => store.updateUser({ display_name: e.target.value })
        })),
        field('Prep timeframe (weeks)', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'number', min: 1, max: 52, value: u.prep_weeks || 12,
          onChange: (e) => {
            const wks = +e.target.value;
            const t = new Date();
            t.setDate(t.getDate() + wks * 7);
            store.updateUser({ prep_weeks: wks, target_test_date: t.toISOString().slice(0, 10) });
            render();
          }
        })),
        h('div.text-xs.text-slate-500.-mt-3',
          u.target_test_date ? `Target test date: ${u.target_test_date}` : 'No target date set'),
        field('Target score', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'number', min: 1, max: 36, value: u.target_score,
          onChange: (e) => store.updateUser({ target_score: +e.target.value })
        })),
        field('Days per week', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'number', min: 1, max: 7, value: u.study_days_per_week,
          onChange: (e) => store.updateUser({ study_days_per_week: +e.target.value })
        }))
      ]),

      priorScoresSection(render),

      section('Daily goal', [
        field('Minutes per day', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'number', min: 5, max: 240, value: u.daily_goal.minutes,
          onChange: (e) => store.updateUser({ daily_goal: { ...u.daily_goal, minutes: +e.target.value } })
        })),
        field('Questions per day', h('input.w-full.border.border-slate-300.rounded-lg.px-3.py-2', {
          type: 'number', min: 5, max: 200, value: u.daily_goal.questions,
          onChange: (e) => store.updateUser({ daily_goal: { ...u.daily_goal, questions: +e.target.value } })
        }))
      ]),

      section('Behavior', [
        toggle('Auto-add missed questions to flashcards', u.settings.auto_add_missed_to_flashcards,
          (v) => store.updateUser({ settings: { ...u.settings, auto_add_missed_to_flashcards: v } })),
        toggle('Show soft timer in Guided Practice', u.settings.soft_timer_in_guided,
          (v) => store.updateUser({ settings: { ...u.settings, soft_timer_in_guided: v } }))
      ]),

      section('Data', [
        h('div.flex.gap-2', [
          h('button.flex-1.bg-slate-100.text-slate-700.font-medium.py-2\\.5.rounded-lg.hover\\:bg-slate-200', {
            onClick: exportData
          }, 'Export data (JSON)'),
          h('button.flex-1.bg-rose-50.text-rose-700.font-medium.py-2\\.5.rounded-lg.hover\\:bg-rose-100.border.border-rose-200', {
            onClick: () => {
              if (confirm('Wipe all progress, attempts, flashcards, and onboarding? This cannot be undone.')) {
                store.resetAll();
                navigate('/onboarding');
              }
            }
          }, 'Reset all data')
        ])
      ]),

      h('div.text-xs.text-slate-500.italic',
        'All data is stored locally in your browser. No account, no server. Export your data to back it up.')
    ]));
  }

  function exportData() {
    const data = {
      user: store.getUser(),
      sessions: store.listSessions(),
      attempts: store.listAttempts(),
      flashcards: store.listFlashcards(),
      schedule_events: store.listScheduleEvents(),
      daily_progress: store.allDailyProgress(),
      exported_at: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `act-english-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  render();
  return root;
}

function priorScoresSection(render) {
  const scores = store.listPriorScores().sort((a, b) => b.date.localeCompare(a.date));

  return section('Prior ACT scores', [
    h('p.text-xs.text-slate-600.-mt-2',
      'Your real test scores show on the score-trajectory chart and seed Adaptive Review with a starting point.'),

    scores.length === 0
      ? h('div.bg-slate-50.rounded-lg.p-3.text-sm.text-slate-600.text-center',
          'No prior scores entered.')
      : h('ul.divide-y.divide-slate-100',
          scores.map(s =>
            h('li.py-2.flex.items-center.justify-between.text-sm', [
              h('div', [
                h('div.text-slate-800.font-medium',
                  `${s.date} · English ${s.english_score}${s.composite ? ` · Composite ${s.composite}` : ''}`),
                h('div.text-xs.text-slate-500',
                  s.source === 'imported' ? '📥 imported' : '✍️ manual entry')
              ]),
              h('button.text-rose-600.text-xs.hover\\:underline', {
                onClick: () => {
                  if (confirm('Remove this score?')) {
                    store.removePriorScore(s.id);
                    render();
                  }
                }
              }, 'Remove')
            ])
          )
        ),

    h('details.bg-blue-50.border.border-blue-200.rounded-lg.p-3', [
      h('summary.text-sm.font-medium.text-blue-900.cursor-pointer.list-none.flex.items-center.justify-between', [
        h('span', '+ Add a score manually'),
        h('span.text-blue-600', '▾')
      ]),
      h('div.mt-3.space-y-2', [
        h('input#ps-date.w-full.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm',
          { type: 'date' }),
        h('div.flex.gap-2', [
          h('input#ps-eng.flex-1.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm',
            { type: 'number', min: 1, max: 36, placeholder: 'English (1–36)' }),
          h('input#ps-comp.flex-1.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm',
            { type: 'number', min: 1, max: 36, placeholder: 'Composite (opt)' })
        ]),
        h('button.w-full.bg-blue-600.text-white.font-semibold.py-2.rounded-lg.hover\\:bg-blue-700', {
          onClick: () => {
            const date = document.getElementById('ps-date').value;
            const eng = document.getElementById('ps-eng').value;
            const comp = document.getElementById('ps-comp').value;
            if (!date || !eng) { alert('Date and English subscore are required.'); return; }
            store.addPriorScore({
              date, english_score: +eng,
              composite: comp ? +comp : null,
              source: 'manual'
            });
            render();
          }
        }, 'Add score')
      ])
    ]),

    h('details.bg-purple-50.border.border-purple-200.rounded-lg.p-3', [
      h('summary.text-sm.font-medium.text-purple-900.cursor-pointer.list-none.flex.items-center.justify-between', [
        h('span', '📥 Import from CSV'),
        h('span.text-purple-600', '▾')
      ]),
      h('div.mt-3.space-y-3', [
        h('p.text-xs.text-purple-900',
          'Upload a CSV with columns: date,english,composite (composite optional). Header row required.'),
        h('input.w-full.text-sm', {
          type: 'file', accept: '.csv,text/csv',
          onChange: (e) => importCSV(e.target.files[0], render)
        }),
        h('p.text-xs.text-slate-600.italic',
          'Example row: 2025-09-12,28,30')
      ])
    ]),

    h('div.bg-slate-50.border.border-slate-200.rounded-lg.p-3', [
      h('div.flex.items-center.justify-between.mb-1', [
        h('span.text-sm.font-medium.text-slate-700', '🔌 Auto-link with MyACT'),
        h('span.text-xs.bg-slate-200.text-slate-600.px-2.py-0\\.5.rounded.font-semibold', 'COMING')
      ]),
      h('p.text-xs.text-slate-600',
        'Direct integration with ACT.org / MyACT isn\'t available — there is no public API. For now use manual entry or CSV import. We\'ll surface this as soon as a sanctioned integration becomes possible.')
    ])
  ]);
}

function importCSV(file, render) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) { alert('CSV is empty or has no data rows.'); return; }
    const header = lines[0].toLowerCase().split(',').map(s => s.trim());
    const dateIdx = header.indexOf('date');
    const engIdx = header.findIndex(h => h.startsWith('english'));
    const compIdx = header.findIndex(h => h.startsWith('composite'));
    if (dateIdx < 0 || engIdx < 0) {
      alert('CSV must have at least "date" and "english" columns.');
      return;
    }
    let added = 0, skipped = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(s => s.trim());
      const date = cols[dateIdx];
      const eng = parseInt(cols[engIdx], 10);
      const comp = compIdx >= 0 && cols[compIdx] ? parseInt(cols[compIdx], 10) : null;
      if (!date || isNaN(eng) || eng < 1 || eng > 36) { skipped++; continue; }
      store.addPriorScore({
        date,
        english_score: eng,
        composite: comp && !isNaN(comp) ? comp : null,
        source: 'imported'
      });
      added++;
    }
    alert(`Imported ${added} score${added === 1 ? '' : 's'}.${skipped ? ` Skipped ${skipped} invalid row${skipped === 1 ? '' : 's'}.` : ''}`);
    render();
  };
  reader.readAsText(file);
}

function section(title, children) {
  return h('div.bg-white.rounded-xl.border.border-slate-200.p-5.space-y-4', [
    h('h2.font-semibold.text-slate-900', title),
    ...children
  ]);
}

function field(label, control) {
  return h('label.block', [
    h('div.text-sm.text-slate-700.font-medium.mb-1', label),
    control
  ]);
}

function toggle(label, val, onChange) {
  return h('label.flex.items-center.justify-between.py-2', [
    h('span.text-sm.text-slate-700', label),
    h('input', {
      type: 'checkbox', checked: val,
      onChange: (e) => onChange(e.target.checked)
    })
  ]);
}
