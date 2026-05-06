// Tutor chatbot screen.
//
// The app is no-build vanilla JS without a backend, so we cannot embed a real
// LLM. Instead the tutor answers from local data (glossary, rationales,
// mini-lessons, study plan, weak topics) for the common question shapes and
// offers a one-click handoff to Claude.ai for anything more open-ended.
//
// The handoff opens claude.ai/new in a new tab with the user's question
// pre-typed in the URL hash so they can chat for real with the actual model.
import { h } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { GLOSSARY } from '../data/glossary.js';
import { getMiniLesson } from '../data/mini_lessons.js';
import { getRationale } from '../data/rationales.js';
import { leafTopics, getTopic } from '../data/topics.js';
import { computeWeakTopics, topicAccuracyMap } from '../lib/analytics.js';
import { youtubeSearchUrl } from '../lib/videos.js';

export function TutorScreen() {
  const root = h('div.space-y-4');
  const messages = [];
  let messagesEl;

  // Greeting
  pushMessage('tutor', greeting());

  function pushMessage(who, contentNode) {
    messages.push({ who, contentNode });
    if (messagesEl) renderMessages();
  }

  function renderMessages() {
    while (messagesEl.firstChild) messagesEl.removeChild(messagesEl.firstChild);
    messages.forEach(m => messagesEl.appendChild(messageBubble(m)));
    setTimeout(() => messagesEl.scrollTop = messagesEl.scrollHeight, 0);
  }

  function handleAsk(text) {
    if (!text || !text.trim()) return;
    const trimmed = text.trim();
    pushMessage('user', h('span', trimmed));
    const reply = answer(trimmed);
    pushMessage('tutor', reply);
  }

  // Header
  root.appendChild(h('div.bg-gradient-to-r.from-indigo-600.to-purple-600.text-white.rounded-xl.p-5', [
    h('div.flex.items-center.gap-3', [
      h('div.text-3xl', '🤖'),
      h('div', [
        h('div.text-xs.font-bold.uppercase.tracking-wide.opacity-80', 'Tutor chat'),
        h('h1.text-xl.font-bold', 'Ask me about ACT English'),
        h('p.text-sm.opacity-90.mt-1',
          'I answer from this app\'s glossary, mini-lessons, rationales, and your study plan. For open-ended questions, I\'ll hand you off to Claude.ai with one click.')
      ])
    ])
  ]));

  // Messages list
  messagesEl = h('div.bg-white.border.border-slate-200.rounded-xl.p-4.space-y-3.overflow-y-auto', {
    style: { minHeight: '320px', maxHeight: '60vh' }
  });
  renderMessages();
  root.appendChild(messagesEl);

  // Quick suggestions
  const suggestions = [
    'What is a preposition?',
    'What is a parenthetical?',
    'Why do semicolons need independent clauses?',
    'What should I work on?',
    'Show me my weak topics',
    'Explain subject-verb agreement',
    'What is the difference between its and it\'s?',
    'How do I find a comma splice?'
  ];
  root.appendChild(h('div.flex.flex-wrap.gap-2', suggestions.map(s =>
    h('button.text-xs.px-3.py-1\\.5.rounded-full.bg-indigo-50.border.border-indigo-200.text-indigo-700.hover\\:bg-indigo-100', {
      onClick: () => handleAsk(s)
    }, s)
  )));

  // Input
  const input = h('input.flex-1.bg-white.border.border-slate-300.rounded-l-lg.px-4.py-3.text-slate-900.focus\\:outline-none.focus\\:border-indigo-500', {
    type: 'text',
    placeholder: 'Ask anything about ACT English…'
  });
  const send = () => { handleAsk(input.value); input.value = ''; };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });

  root.appendChild(h('div.flex', [
    input,
    h('button.bg-indigo-600.text-white.font-semibold.px-5.py-3.rounded-r-lg.hover\\:bg-indigo-700', { onClick: send }, 'Ask')
  ]));

  root.appendChild(h('p.text-xs.text-slate-500.text-center',
    'Tip: I answer from local data instantly. For deeper / more open questions, click "Open in Claude" and I\'ll send you to claude.ai with your question pre-typed.'));

  return root;
}

// ─── chat bubbles ────────────────────────────────────────────────────────

function messageBubble({ who, contentNode }) {
  if (who === 'tutor') {
    return h('div.flex.gap-3', [
      h('div.flex-shrink-0.w-8.h-8.rounded-full.bg-indigo-600.text-white.flex.items-center.justify-center.text-sm.font-bold', '🤖'),
      h('div.flex-1.bg-indigo-50.border.border-indigo-200.rounded-lg.p-3.text-sm.text-slate-900.leading-relaxed', contentNode)
    ]);
  }
  return h('div.flex.gap-3.justify-end', [
    h('div.bg-slate-100.border.border-slate-200.rounded-lg.p-3.text-sm.text-slate-900.max-w-md', contentNode),
    h('div.flex-shrink-0.w-8.h-8.rounded-full.bg-slate-700.text-white.flex.items-center.justify-center.text-sm.font-bold', '🧑')
  ]);
}

function greeting() {
  const plan = store.getStudyPlan();
  if (plan) {
    const top = plan.grouped.weak.slice(0, 3).map(t => t.name).join(', ');
    return h('div', [
      h('p', `Hi! Based on your diagnostic (${plan.overall_accuracy ?? '—'}%), your top weak topics are ${top || 'none yet'}.`),
      h('p.mt-2', 'Ask me to explain any concept, define a term, or tell you what to work on. Or pick a quick suggestion below.')
    ]);
  }
  return h('div', [
    h('p', "Hi! I'm your ACT English tutor. Ask me to explain any rule (e.g., \"What is a parenthetical?\"), or take the diagnostic test for a personalized study plan."),
    h('p.mt-2', 'Try the quick suggestions below to see what I can do.')
  ]);
}

// ─── answering ───────────────────────────────────────────────────────────

function answer(question) {
  const q = question.toLowerCase().trim();

  // 1. Glossary lookup
  const glossaryHit = findGlossaryTerm(q);
  if (glossaryHit) {
    const { term, definition } = glossaryHit;
    return wrapWithHandoff(h('div', [
      h('div.font-semibold.mb-1', term),
      h('p', definition),
      hintMore(`I pulled this from the app's grammar glossary. Tap any underlined term in an explanation to see the same kind of card inline. Want a worked example or a video on ${term}? Say so.`)
    ]), question);
  }

  // 2. "What should I work on" / "where am I weak"
  if (/(work on|focus on|improve|weak|priority|study next|practice next)/.test(q)) {
    return wrapWithHandoff(answerWeakTopics(), question);
  }

  // 3. "Why does X / why is X / why do" — rationale lookup
  if (/^why /.test(q)) {
    const topic = matchTopicByName(q);
    if (topic) {
      const r = getRationale(topic.id);
      if (r) {
        return wrapWithHandoff(h('div', [
          h('div.font-semibold.mb-1', `Why the rule for "${topic.name}" exists`),
          h('p', r),
          videoLinkLine(topic.id)
        ]), question);
      }
    }
  }

  // 4. "Explain X" / "how do I X" / "what is X" — mini-lesson lookup
  if (/(explain|teach|how do|how to|what is|what are|tell me about|tutorial)/.test(q)) {
    const topic = matchTopicByName(q);
    if (topic) {
      const lesson = getMiniLesson(topic.id);
      if (lesson) {
        return wrapWithHandoff(h('div', [
          h('div.font-semibold.mb-1', lesson.title),
          ...lesson.body.map(p => h('p.mt-1', p)),
          h('div.mt-2.bg-amber-50.border.border-amber-200.rounded.p-2.text-amber-900', [
            h('span.font-semibold', '💡 Rule of thumb: '),
            h('span', lesson.rule_of_thumb)
          ]),
          videoLinkLine(topic.id),
          h('a.inline-block.mt-2.text-indigo-700.underline.text-sm',
            { href: `#/lesson?topic=${topic.id}` }, '→ Open the full mini-lesson page')
        ]), question);
      }
    }
  }

  // 5. "Show me my weak topics" / "my standing"
  if (/(my|standing|stand|stats|score|how am i doing)/.test(q)) {
    return wrapWithHandoff(answerStanding(), question);
  }

  // 6. Difference questions ("difference between X and Y") — punt to handoff.
  if (/difference|vs\.|versus/.test(q)) {
    return wrapWithHandoff(h('div', [
      h('p', "I can\'t do open-ended comparisons reliably from local data. Click the button below to ask Claude — I'll pre-fill your question."),
    ]), question);
  }

  // Fallback — handoff
  return h('div', [
    h('p', "I don't have a scripted answer for that — but the model that built this app does. Click below to ask Claude with your question pre-filled."),
    handoffButton(question)
  ]);
}

// ─── helpers ─────────────────────────────────────────────────────────────

function findGlossaryTerm(q) {
  // Match: "what is a/an X", "define X", "X means", "what does X mean"
  const patterns = [
    /^what(?:'?s| is| are) (?:a |an |the )?(.+?)(?:\?|$)/,
    /^define (.+?)(?:\?|$)/,
    /^(?:what does )?(.+?) mean(?:\?|$)/,
    /^(.+?) definition$/
  ];
  for (const re of patterns) {
    const m = re.exec(q);
    if (!m) continue;
    const probe = m[1].trim();
    if (GLOSSARY[probe]) return { term: probe, definition: GLOSSARY[probe] };
    // Try to find a contained known term (e.g., "what is a comma splice exactly")
    for (const term of Object.keys(GLOSSARY)) {
      if (probe.includes(term)) return { term, definition: GLOSSARY[term] };
    }
  }
  // Bare term match: "preposition?", "parenthetical"
  const cleaned = q.replace(/[?.!]/g, '').trim();
  if (GLOSSARY[cleaned]) return { term: cleaned, definition: GLOSSARY[cleaned] };
  return null;
}

function matchTopicByName(q) {
  // Map common phrasings to leaf topics.
  const aliases = {
    'subject-verb agreement': 'gu.subj_verb', 'subject verb agreement': 'gu.subj_verb',
    'agreement': 'gu.subj_verb',
    'pronouns': 'gu.pronoun', 'pronoun': 'gu.pronoun', 'pronoun agreement': 'gu.pronoun',
    'verb tense': 'gu.verb_tense', 'tenses': 'gu.verb_tense', 'past perfect': 'gu.verb_tense',
    'modifiers': 'gu.modifier', 'modifier': 'gu.modifier', 'dangling modifier': 'gu.modifier', 'misplaced modifier': 'gu.modifier',
    'adjectives': 'gu.adj_adv', 'adverbs': 'gu.adj_adv', 'adjective vs adverb': 'gu.adj_adv',
    'idioms': 'gu.idiom', 'idiom': 'gu.idiom', 'prepositions': 'gu.idiom',
    'confused words': 'gu.confused', 'its vs it\'s': 'gu.confused', 'than vs then': 'gu.confused',
    'commas': 'pn.comma', 'comma': 'pn.comma', 'comma rules': 'pn.comma',
    'semicolons': 'pn.semicolon', 'semicolon': 'pn.semicolon',
    'colons': 'pn.colon', 'colon': 'pn.colon',
    'dashes': 'pn.dash', 'dash': 'pn.dash', 'em-dash': 'pn.dash', 'em dash': 'pn.dash',
    'apostrophes': 'pn.apostrophe', 'apostrophe': 'pn.apostrophe',
    'run-ons': 'ss.runon', 'run-on': 'ss.runon', 'comma splice': 'ss.runon', 'splice': 'ss.runon',
    'fragments': 'ss.fragment', 'fragment': 'ss.fragment',
    'parallel structure': 'ss.parallel', 'parallelism': 'ss.parallel', 'parallel': 'ss.parallel',
    'conjunctions': 'ss.conjunction', 'conjunction': 'ss.conjunction', 'fanboys': 'ss.conjunction',
    'transitions': 'pw.transition', 'transition': 'pw.transition', 'however': 'pw.transition',
    'organization': 'pw.organization', 'topic sentence': 'pw.organization',
    'add or delete': 'pw.add_delete', 'add/delete': 'pw.add_delete', 'keep or delete': 'pw.add_delete',
    'purpose': 'pw.purpose', 'main idea': 'pw.purpose',
    'word choice': 'kl.word_choice', 'tone': 'kl.word_choice', 'register': 'kl.word_choice',
    'concision': 'kl.concision', 'wordiness': 'kl.concision', 'redundancy': 'kl.concision'
  };
  for (const [phrase, topicId] of Object.entries(aliases)) {
    if (q.includes(phrase)) return getTopic(topicId);
  }
  return null;
}

function answerWeakTopics() {
  const plan = store.getStudyPlan();
  const weak = computeWeakTopics();
  const topics = (plan?.grouped?.weak || []).map(t => t.name);
  if (topics.length === 0 && weak.length === 0) {
    return h('div', [
      h('p', "I don't have enough data yet to recommend a focus. Take the diagnostic so I can build you a study plan."),
      h('a.inline-block.mt-2.bg-purple-600.text-white.text-sm.font-semibold.px-3.py-1\\.5.rounded',
        { href: '#/diagnostic' }, '🎯 Take the diagnostic →')
    ]);
  }
  const list = topics.length > 0 ? topics : weak.slice(0, 5).map(w => `${w.name} (${w.accuracy}%)`);
  return h('div', [
    h('p.font-semibold', 'Your highest-leverage topics right now:'),
    h('ol.list-decimal.list-inside.mt-1.space-y-1', list.map(name => h('li', name))),
    h('p.mt-2',
      'Open Lesson Mode → "🎯 Study plan (recommended)" to drill these in a weighted order. Want a video on the first one?'),
    h('a.inline-block.mt-2.bg-emerald-600.text-white.text-sm.font-semibold.px-3.py-1\\.5.rounded',
      { href: '#/lesson-mode' }, '📚 Start Lesson Mode →')
  ]);
}

function answerStanding() {
  const plan = store.getStudyPlan();
  const map = topicAccuracyMap();
  const overall = map.length ? Math.round(map.reduce((a, t) => a + (t.accuracy || 0), 0) / map.length) : null;
  return h('div', [
    h('p', plan
      ? `You took the diagnostic on ${new Date(plan.created_at).toLocaleDateString()} and scored ${plan.overall_accuracy}%. ${plan.grouped.weak.length} weak / ${plan.grouped.medium.length} medium / ${plan.grouped.strong.length} strong topics.`
      : `You haven't taken the diagnostic yet. Your live accuracy across all attempts is ${overall ?? '—'}%.`),
    h('a.inline-block.mt-2.bg-slate-800.text-white.text-sm.font-semibold.px-3.py-1\\.5.rounded',
      { href: '#/standing' }, '📍 Open Where I Stand →')
  ]);
}

function videoLinkLine(topicId) {
  return h('a.block.mt-2.text-red-700.underline.text-sm',
    { href: youtubeSearchUrl(topicId), target: '_blank', rel: 'noopener noreferrer' },
    '📺 Watch a video on this topic ↗');
}

function hintMore(text) {
  return h('p.text-xs.text-slate-500.mt-2.italic', text);
}

function wrapWithHandoff(content, originalQuestion) {
  return h('div', [
    content,
    h('details.mt-3.text-xs', [
      h('summary.cursor-pointer.text-indigo-700.font-medium', 'Want a deeper answer? Ask Claude →'),
      h('div.mt-2', handoffButton(originalQuestion, true))
    ])
  ]);
}

function handoffButton(question, compact) {
  const summary = buildShortContext();
  const fullPrompt = `I'm studying ACT English. Here's where I stand:\n\n${summary}\n\nMy question: ${question}`;
  // Claude.ai accepts a "q" query parameter on /new for prefilling.
  const url = `https://claude.ai/new?q=${encodeURIComponent(fullPrompt)}`;
  const cls = compact
    ? 'inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-indigo-700'
    : 'inline-block mt-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-indigo-700';
  return h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', className: cls },
    '🤖 Open in Claude.ai with your question →');
}

function buildShortContext() {
  const u = store.getUser();
  const plan = store.getStudyPlan();
  const weak = computeWeakTopics().slice(0, 5);
  const lines = [
    `- Target English score: ${u.target_score ?? '—'}`,
    `- Latest self-reported English score: ${u.current_score ?? '—'}`,
    `- Prep timeframe: ${u.prep_weeks ?? '—'} weeks`
  ];
  if (plan) {
    lines.push(`- Diagnostic: ${plan.overall_accuracy ?? '—'}%`);
    lines.push(`- Weak topics: ${plan.grouped.weak.map(t => t.name).join(', ') || 'none'}`);
  }
  if (weak.length) {
    lines.push(`- Top live weak topics: ${weak.map(w => `${w.name} ${w.accuracy}%`).join('; ')}`);
  }
  return lines.join('\n');
}
