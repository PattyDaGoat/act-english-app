import { h } from '../lib/dom.js';
import { navigate } from '../lib/router.js';
import { allQuestions, questionsForPassage } from '../data/questions.js';
import { PASSAGES } from '../data/passages.js';

// Same screen for Mock and Helped (different copy + target route).
export function MockPreflightScreen(opts = {}) {
  const helped = opts.helped === true;
  const total = allQuestions().length;
  const passageCounts = PASSAGES.map(p => questionsForPassage(p.id).length);
  const haveFullTest = passageCounts.length >= 5 && passageCounts.slice(0, 5).every(c => c >= 15);

  return h('div.space-y-6', [
    h('div.bg-white.rounded-xl.border.border-slate-200.p-6', [
      h('h1.text-2xl.font-bold.text-slate-900', helped ? 'Helped Test' : 'Mock Test'),
      h('p.text-slate-600.mt-2',
        helped
          ? 'Timed practice test with a Help button. Two scores reported: raw and unaided.'
          : 'Full ACT-English simulation. 45 minutes, 75 questions, no feedback during the test.'),
    ]),

    h('div.bg-amber-50.border.border-amber-200.rounded-xl.p-5', [
      h('h2.font-semibold.text-amber-900.mb-2', 'Before you start'),
      h('ul.list-disc.list-inside.text-sm.text-amber-900.space-y-1', [
        h('li', 'You will need 45 uninterrupted minutes.'),
        h('li', 'The timer cannot be paused once started.'),
        h('li', helped
          ? 'Using Help does NOT pause the timer.'
          : 'No correctness feedback or help during the test — only after.'),
        h('li', 'Auto-submits at 0:00.'),
        haveFullTest
          ? h('li.text-emerald-800', `Bank: ${total} questions across ${PASSAGES.length} passages (${passageCounts.slice(0,5).join('/')} per passage). Full ACT-faithful structure.`)
          : h('li.font-semibold', `Bank: ${total} questions. Some slots will repeat to reach 75; production needs 600+.`)
      ])
    ]),

    h('div.flex.gap-3', [
      h('button.flex-1.bg-brand-500.text-white.font-semibold.py-3.rounded-lg.hover\\:bg-brand-600', {
        onClick: () => navigate(helped ? '/helped/run' : '/mock/run')
      }, helped ? 'Begin Helped Test →' : 'Begin Mock Test →'),
      h('a.px-5.py-3.text-slate-600.hover\\:text-slate-900.text-center', { href: '#/' }, 'Cancel')
    ])
  ]);
}
