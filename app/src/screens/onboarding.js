import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { navigate } from '../lib/router.js';

export function OnboardingScreen() {
  let step = 0;
  const TOTAL_STEPS = 6;
  const data = {
    display_name: '',
    prep_weeks: 12,
    target_score: 30,
    current_score: '',
    study_days_per_week: 5,
    prior_scores: []  // { date, english_score, composite }
  };

  const root = h('div.min-h-screen.flex.items-center.justify-center.bg-gradient-to-br.from-blue-50.to-indigo-100.p-4');

  function render() {
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(card());
  }

  function card() {
    const stepEl = [stepWelcome, stepName, stepTimeframe, stepScore, stepPriorScores, stepDays][step]();
    return h('div.bg-white.rounded-2xl.shadow-xl.max-w-md.w-full.p-8', [
      h('div.flex.gap-1.mb-6',
        Array.from({ length: TOTAL_STEPS }, (_, i) =>
          h('div.h-1.flex-1.rounded-full', {
            className: i <= step ? 'bg-brand-500' : 'bg-slate-200'
          })
        )
      ),
      stepEl
    ]);
  }

  function nextBtn(label = 'Continue', disabled = false, onClick) {
    return h('button.w-full.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600.disabled\\:opacity-50.disabled\\:cursor-not-allowed',
      { onClick, disabled }, label);
  }

  function backBtn() {
    return h('button.w-full.text-slate-500.font-medium.py-2.mt-2.hover\\:text-slate-700', {
      onClick: () => { step--; render(); }
    }, '← Back');
  }

  function stepWelcome() {
    return h('div', [
      h('div.text-5xl.mb-4', '🎯'),
      h('h1.text-2xl.font-bold.text-slate-900.mb-2', 'Welcome to ACT English Study'),
      h('p.text-slate-600.mb-6',
        'A focused, 4-point-improvement tool. Three modes, real explanations, daily habit. Takes 60 seconds to set up.'),
      nextBtn('Get started', false, () => { step++; render(); })
    ]);
  }

  function stepName() {
    let val = data.display_name;
    const input = h('input.w-full.border.border-slate-300.rounded-lg.px-4.py-3.mb-6.focus\\:border-brand-500.focus\\:outline-none', {
      type: 'text', placeholder: 'Your first name', value: val,
      onInput: (e) => { val = e.target.value; data.display_name = val; btn.disabled = !val.trim(); }
    });
    const btn = nextBtn('Continue', !val.trim(), () => { step++; render(); });
    return h('div', [
      h('h2.text-xl.font-bold.text-slate-900.mb-2', "What's your name?"),
      h('p.text-slate-600.mb-4', "We'll use it on your dashboard."),
      input, btn, backBtn()
    ]);
  }

  function stepTimeframe() {
    const options = [
      { weeks: 4,  label: '4 weeks',  sub: 'Crash mode'   },
      { weeks: 8,  label: '8 weeks',  sub: 'Two months'   },
      { weeks: 12, label: '12 weeks', sub: 'Recommended'  },
      { weeks: 16, label: '16 weeks', sub: 'Steady pace'  },
      { weeks: 24, label: '24 weeks', sub: 'Long runway'  }
    ];
    const buttons = options.map(o =>
      h('button.w-full.text-left.p-3.rounded-lg.border-2.flex.items-center.justify-between.transition', {
        className: data.prep_weeks === o.weeks
          ? 'border-brand-500 bg-brand-50'
          : 'border-slate-200 hover:bg-slate-50',
        onClick: () => { data.prep_weeks = o.weeks; render(); }
      }, [
        h('div', [
          h('div.font-semibold.text-slate-900', o.label),
          h('div.text-xs.text-slate-500', o.sub)
        ]),
        data.prep_weeks === o.weeks
          ? h('span.text-brand-600.font-bold', '✓')
          : null
      ])
    );
    return h('div', [
      h('h2.text-xl.font-bold.text-slate-900.mb-2', 'How long do you have to prep?'),
      h('p.text-slate-600.mb-4', "We'll build a study schedule sized to your timeframe."),
      h('div.space-y-2.mb-6', buttons),
      nextBtn('Continue', false, () => { step++; render(); }),
      backBtn()
    ]);
  }

  function stepScore() {
    const slider = h('input.w-full.mb-2', {
      type: 'range', min: 18, max: 36, value: data.target_score,
      onInput: (e) => { data.target_score = +e.target.value; label.textContent = data.target_score; }
    });
    const label = h('div.text-3xl.font-bold.text-brand-600.text-center.mb-2', String(data.target_score));
    return h('div', [
      h('h2.text-xl.font-bold.text-slate-900.mb-2', "What's your target English score?"),
      h('p.text-slate-600.mb-4', '1–36 scale, English section only.'),
      label, slider,
      h('div.flex.justify-between.text-xs.text-slate-500.mb-6', [h('span','18'), h('span','36')]),
      nextBtn('Continue', false, () => { step++; render(); }),
      backBtn()
    ]);
  }

  function stepPriorScores() {
    function addScore() {
      data.prior_scores.push({ date: '', english_score: '', composite: '' });
      render();
    }

    const scoreRows = data.prior_scores.map((s, i) =>
      h('div.bg-slate-50.rounded-lg.p-3.space-y-2', [
        h('div.flex.gap-2', [
          h('input.flex-1.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm', {
            type: 'date', value: s.date, placeholder: 'Test date',
            onChange: (e) => { s.date = e.target.value; }
          }),
          h('button.text-rose-600.text-xs.hover\\:underline', {
            onClick: () => { data.prior_scores.splice(i, 1); render(); }
          }, 'Remove')
        ]),
        h('div.flex.gap-2', [
          h('div.flex-1', [
            h('label.text-xs.text-slate-600.block', 'English subscore (1–36)'),
            h('input.w-full.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm', {
              type: 'number', min: 1, max: 36, value: s.english_score,
              onChange: (e) => { s.english_score = e.target.value ? +e.target.value : ''; }
            })
          ]),
          h('div.flex-1', [
            h('label.text-xs.text-slate-600.block', 'Composite (optional)'),
            h('input.w-full.border.border-slate-300.rounded.px-2.py-1\\.5.text-sm', {
              type: 'number', min: 1, max: 36, value: s.composite,
              onChange: (e) => { s.composite = e.target.value ? +e.target.value : ''; }
            })
          ])
        ])
      ])
    );

    return h('div', [
      h('h2.text-xl.font-bold.text-slate-900.mb-2', 'Have you taken the ACT before?'),
      h('p.text-slate-600.mb-4',
        'Optional. Adds your real scores to your trajectory and gives Adaptive Review a starting point.'),

      data.prior_scores.length === 0
        ? h('div.bg-slate-50.rounded-lg.p-4.text-center.mb-4', [
            h('div.text-3xl.mb-2', '📊'),
            h('p.text-sm.text-slate-600.mb-3', 'No prior scores yet. You can skip this and add them later.')
          ])
        : h('div.space-y-3.mb-4', scoreRows),

      h('button.w-full.border-2.border-dashed.border-slate-300.rounded-lg.py-3.text-slate-700.hover\\:border-brand-500.hover\\:text-brand-600.transition.mb-4', {
        onClick: addScore
      }, '+ Add a score'),

      h('div.bg-blue-50.border.border-blue-200.rounded-lg.p-3.text-xs.text-blue-900.mb-4', [
        h('div.font-semibold.mb-1', '🔌 Auto-link with MyACT?'),
        h('div', 'Direct integration with ACT.org isn\'t available yet (no public API). For now you can enter scores manually here, or import a CSV in Settings later.')
      ]),

      nextBtn(data.prior_scores.length > 0 ? 'Save & continue' : 'Skip', false, () => { step++; render(); }),
      backBtn()
    ]);
  }

  function stepDays() {
    const buttons = [3,4,5,6,7].map(n =>
      h('button.flex-1.py-3.rounded-lg.border-2.font-semibold', {
        className: data.study_days_per_week === n ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600',
        onClick: () => { data.study_days_per_week = n; render(); }
      }, n)
    );
    return h('div', [
      h('h2.text-xl.font-bold.text-slate-900.mb-2', 'How many days per week?'),
      h('p.text-slate-600.mb-4', 'Consistency beats cramming. Pick something realistic.'),
      h('div.flex.gap-2.mb-6', buttons),
      nextBtn('Start studying', false, finish),
      backBtn()
    ]);
  }

  function finish() {
    // Compute target_test_date from prep_weeks
    const target = new Date();
    target.setDate(target.getDate() + data.prep_weeks * 7);
    const targetISO = target.toISOString().slice(0, 10);

    // Persist prior scores (only those with valid English subscore + date)
    const validPrior = data.prior_scores.filter(s => s.date && s.english_score);
    for (const s of validPrior) {
      store.addPriorScore({
        date: s.date,
        english_score: +s.english_score,
        composite: s.composite ? +s.composite : null,
        source: 'manual'
      });
    }

    const mostRecentEnglish = validPrior.length > 0
      ? validPrior.sort((a, b) => b.date.localeCompare(a.date))[0].english_score
      : null;

    store.updateUser({
      display_name: data.display_name.trim(),
      prep_weeks: data.prep_weeks,
      target_test_date: targetISO,
      target_score: data.target_score,
      current_score: mostRecentEnglish ? +mostRecentEnglish : null,
      study_days_per_week: data.study_days_per_week,
      onboarded: true
    });
    navigate('/');
  }

  render();
  return root;
}
