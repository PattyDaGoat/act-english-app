// Shared chrome around interior screens (top nav + container).
import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';

export function renderLayout(content) {
  const u = store.getUser();
  const navItem = (href, label) =>
    h('a.px-3.py-2.rounded-md.text-sm.font-medium.text-slate-700.hover\\:bg-slate-100',
      { href: '#' + href }, label);

  return h('div', [
    h('header.bg-white.border-b.border-slate-200.sticky.top-0.z-10', [
      h('div.max-w-5xl.mx-auto.px-4.py-3.flex.items-center.justify-between', [
        h('a.flex.items-center.gap-2', { href: '#/' }, [
          h('span.text-xl', '🎯'),
          h('span.font-semibold.text-slate-900', 'ACT English Study')
        ]),
        h('nav.hidden.md\\:flex.gap-1', [
          navItem('/', 'Home'),
          navItem('/lesson-mode', 'Lessons'),
          navItem('/guided', 'Guided'),
          navItem('/drill', 'Drills'),
          navItem('/flashcards', 'Flashcards'),
          navItem('/analytics', 'Analytics'),
          navItem('/settings', '⚙️')
        ]),
        h('div.flex.items-center.gap-3.text-sm', [
          h('span.text-orange-600.font-semibold', `🔥 ${u.streak_count}`),
        ])
      ])
    ]),
    h('main.max-w-5xl.mx-auto.px-4.py-6', content)
  ]);
}
