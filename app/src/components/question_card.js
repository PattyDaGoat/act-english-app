// Reusable question display.
// Layout, top to bottom:
//   1. Passage card (yellow). The underlined portion is highlighted inline,
//      the current question's underline is brighter + ★N marker.
//   2. Question card:
//        - "Question N — what to choose" header (plain English instruction)
//        - The exact sentence containing the underline, with the underline
//          rendered as a real underlined span the student can see in context
//        - "Underlined portion: '...'" callout for clarity
//        - The original ACT-style stem, rendered smaller as a secondary line
//   3. Choices.
import { h } from '../lib/dom.js';
import {
  getPassage,
  markerNumberFor,
  parsePassageBody,
  underlinedTextFor,
  sentenceContextFor
} from '../data/passages.js';
import { renderWithGlossary } from '../data/glossary.js';

export function QuestionCard({ question, selected, onSelect, locked, helpHint }) {
  const passage = question.passage_id ? getPassage(question.passage_id) : null;
  const markerN = markerNumberFor(question.id);
  const underlined = passage ? underlinedTextFor(question.id, passage) : null;
  const context   = passage ? sentenceContextFor(question.id, passage)  : null;

  const passageEl = passage
    ? h('div.bg-amber-50.border.border-amber-200.rounded-xl.p-5.passage', [
        h('div.flex.items-center.justify-between.mb-3', [
          h('h3.font-semibold.text-amber-900', passage.title),
          h('span.text-xs.text-amber-700.uppercase', passage.theme)
        ]),
        renderPassageBody(passage.body, markerN)
      ])
    : null;

  const taskHeader = buildTaskHeader(question, underlined, markerN);

  const stemBits = [];

  // Big primary instruction.
  stemBits.push(
    h('div.flex.items-start.gap-3.mb-3', [
      markerN != null
        ? h('span.flex-shrink-0.inline-flex.items-center.justify-center.w-9.h-9.rounded-full.bg-yellow-300.text-yellow-900.font-bold', String(markerN))
        : h('span.flex-shrink-0.inline-flex.items-center.justify-center.w-9.h-9.rounded-full.bg-brand-100.text-brand-700.font-bold', '?'),
      h('div', [
        h('div.text-xs.font-semibold.uppercase.tracking-wide.text-brand-700.mb-1',
          markerN != null ? `Question ${markerN} — what to do` : 'What to do'),
        h('div.text-base.font-semibold.text-slate-900', renderWithGlossary(taskHeader))
      ])
    ])
  );

  // Sentence-in-context with the inline underline.
  if (context && context.html) {
    stemBits.push(
      h('div.bg-slate-50.border.border-slate-200.rounded-lg.p-3.mb-3', [
        h('div.text-xs.font-semibold.text-slate-500.uppercase.tracking-wide.mb-1', 'The sentence'),
        h('p.text-slate-900.leading-relaxed', { html: context.html })
      ])
    );
  }

  // Crisp underlined-portion quote.
  if (underlined) {
    stemBits.push(
      h('div.text-sm.text-slate-700.mb-3', [
        h('span.text-slate-500', 'Underlined portion: '),
        h('span.bg-yellow-200.px-2.py-1.rounded.font-mono.text-slate-900', `"${underlined.trim()}"`),
        h('span.text-slate-500.ml-2', '— pick the version of this portion you think is best (choice A keeps it as is).')
      ])
    );
  }

  // Original ACT-style stem, demoted to a secondary line.
  stemBits.push(
    h('div.text-sm.text-slate-600.italic.border-t.border-slate-100.pt-2',
      ['ACT-style prompt: ', h('span.text-slate-700.not-italic', question.stem)])
  );

  const stem = h('div.bg-white.rounded-xl.border.border-slate-200.p-5', stemBits);

  const letters = ['A','B','C','D'];
  const choices = h('div.space-y-2.mt-3',
    letters.map(L => {
      const isSelected = selected === L;
      const text = question.choices[L];
      return h('button.w-full.text-left.p-4.rounded-xl.border-2.transition-colors.flex.items-start.gap-3', {
        className: isSelected
          ? 'border-brand-500 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
        disabled: locked,
        onClick: () => !locked && onSelect(L)
      }, [
        h('span.flex-shrink-0.w-7.h-7.rounded-full.flex.items-center.justify-center.text-sm.font-bold', {
          className: isSelected ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'
        }, L),
        h('span.text-slate-900', text)
      ]);
    })
  );

  return h('div.space-y-4', [
    passageEl,
    stem,
    helpHint || null,
    choices
  ]);
}

// Render the passage body with [Qn]...[/Qn] segments highlighted inline. The
// current question's underline gets a stronger yellow + numbered badge + ★.
function renderPassageBody(body, currentN) {
  const segments = parsePassageBody(body);
  const nodes = segments.map(seg => {
    if (seg.type === 'text') return h('span', seg.text);
    const isCurrent = seg.n === currentN;
    if (isCurrent) {
      return h('span.bg-yellow-300.underline.decoration-2.decoration-yellow-700.px-1.rounded.font-semibold', [
        h('sup.text-xs.text-yellow-900.font-bold.mr-1', `★${seg.n}`),
        seg.text
      ]);
    }
    return h('span.bg-yellow-100.underline.px-1.rounded.text-slate-700', [
      h('sup.text-xs.text-yellow-700.font-semibold.mr-1', String(seg.n)),
      seg.text
    ]);
  });
  return h('div.text-sm.text-slate-800.leading-relaxed.whitespace-pre-line', nodes);
}

// Build the primary plain-English instruction shown as the question's main
// heading. It is concrete, says what kind of choice to make and where.
function buildTaskHeader(question, underlined, markerN) {
  const t = question.primary_topic_id || '';
  const target = underlined
    ? `the underlined portion ("${truncate(underlined.trim(), 60)}")`
    : 'the underlined sentence';

  const map = {
    'pn.comma':       `Pick the version with the correct comma usage in ${target}.`,
    'pn.semicolon':   `Pick the version with the correct semicolon (or the right replacement punctuation) in ${target}.`,
    'pn.colon':       `Pick the version with the correct colon (or the right replacement punctuation) in ${target}.`,
    'pn.apostrophe':  `Pick the version with the correct apostrophe usage in ${target}.`,
    'pn.dash':        `Pick the version with the correct dash usage in ${target}.`,
    'gu.subj_verb':   `Pick the version whose verb agrees with its subject in ${target}.`,
    'gu.verb_tense':  `Pick the version with the verb tense that fits the surrounding sentences, applied to ${target}.`,
    'gu.pronoun':     `Pick the version with the correct pronoun (or pronoun form) for ${target}.`,
    'gu.modifier':    `Pick the version of ${target} that attaches the modifier to the right word.`,
    'gu.confused':    `Pick the correct word in ${target} — the underlined word is one of a commonly-confused pair (its/it's, who/whom, than/then, etc.).`,
    'ss.fragment':    `Pick the version of ${target} that produces a complete, grammatical sentence (no fragments).`,
    'ss.runon':       `Pick the version that fixes the run-on or comma splice at ${target}.`,
    'ss.parallel':    `Pick the version of ${target} that keeps the items in the list / sentence in the same grammatical form (parallel).`,
    'ss.conjunction': `Pick the conjunction in ${target} that matches the logical relationship between the two parts (and / but / or / so / because…).`,
    'kl.concision':   `Pick the SHORTEST version of ${target} that keeps the same meaning — on the ACT, when meaning is identical, shorter wins.`,
    'kl.word_choice': `Pick the word in ${target} whose meaning AND tone fit the surrounding sentences.`,
    'pw.transition':  `Pick the transition word for ${target} that matches the logical link between the previous sentence and this one (contrast, addition, example, cause, time…).`,
    'pw.add_delete':  `Decide whether the underlined sentence should be KEPT or DELETED, and pick the choice with the best reason.`,
    'pw.organization':`Pick the version of ${target} that fits this paragraph's organization (best topic sentence, best order, etc.).`,
    'pw.purpose':     `Decide whether the essay accomplishes the goal stated in the prompt — pick the choice that matches what the essay actually does.`
  };

  return map[t]
    || `Look at ${target} above. Pick the choice that best fits the sentence.`;
}

function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}
