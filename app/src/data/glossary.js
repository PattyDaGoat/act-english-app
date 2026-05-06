// Glossary of grammar / sentence-structure vocab the app uses in rules of
// thumb and explanations. Plain-English, one sentence each. The renderer
// auto-detects these terms inside any text and wraps them with a tap-to-reveal
// tooltip so the student doesn't have to leave the page to look one up.

export const GLOSSARY = {
  'independent clause':
    'A group of words that contains a subject and a verb and could stand alone as a complete sentence. Example: "the dog barked."',
  'dependent clause':
    'A group of words with a subject and verb that CANNOT stand alone — it depends on a main clause. Example: "because the dog barked."',
  'subordinate clause':
    'Same as a dependent clause — starts with a subordinating word like "because," "although," "if," or "when."',
  'main clause':
    'The independent clause that holds a sentence together. Without it you have a fragment.',
  'subject':
    'The noun (person, place, thing) doing the action of the verb. In "the cat slept," the subject is "cat."',
  'verb':
    'The word that names the action or state of being in a clause. Every complete sentence needs at least one finite verb.',
  'finite verb':
    'A verb that carries tense (past/present/future) and a subject. "Walked" is finite; "walking" alone is not.',
  'antecedent':
    'The noun a pronoun refers back to. In "Maya lost her keys," the antecedent of "her" is "Maya."',
  'pronoun':
    'A word that stands in for a noun: I, you, he, she, it, we, they, who, whose, this, that, etc.',
  'modifier':
    'A word or phrase that describes another word. "Walking quickly" modifies whoever is walking.',
  'dangling modifier':
    'A modifier whose intended target isn\'t actually in the sentence — leaving it "dangling" with no logical attachment.',
  'misplaced modifier':
    'A modifier sitting next to the wrong word, so it accidentally describes something it shouldn\'t.',
  'participle':
    'An -ing or -ed form of a verb used as a modifier. Example: "running water," "broken glass."',
  'participial phrase':
    'A phrase built around a participle: "running through the park," "broken by the storm."',
  'gerund':
    'An -ing verb form used as a noun. "Hiking is fun" — "hiking" is the subject.',
  'infinitive':
    'The "to + verb" form: "to run," "to learn." Often used as a noun, adjective, or adverb.',
  'noun':
    'A word naming a person, place, thing, or idea: dog, Boston, freedom, courage.',
  'adjective':
    'A word that describes a noun: happy dog, blue sky, ancient ruins.',
  'adverb':
    'A word that describes a verb, adjective, or other adverb. Most end in -ly: quickly, very, well.',
  'preposition':
    'A short word showing relationship: in, on, of, at, to, with, by, from, between.',
  'prepositional phrase':
    'A preposition + its object: "in the box," "of the people," "to the store." Can usually be crossed out without breaking the sentence.',
  'conjunction':
    'A word that joins parts of a sentence: and, but, or, so, because, although.',
  'coordinating conjunction':
    'The seven FANBOYS conjunctions (For And Nor But Or Yet So) that join two equal grammatical parts.',
  'subordinating conjunction':
    'A conjunction that turns a clause into a dependent one: because, although, if, when, since, while, unless.',
  'FANBOYS':
    'The seven coordinating conjunctions: For And Nor But Or Yet So. Use a comma BEFORE one when it joins two independent clauses.',
  'correlative conjunction':
    'Conjunctions that come in fixed pairs: not only…but also, either…or, neither…nor, both…and, whether…or.',
  'comma splice':
    'The error of joining two independent clauses with just a comma. Fix: use a period, semicolon, or comma + FANBOYS.',
  'run-on':
    'Two independent clauses jammed together with no punctuation or only a comma between them.',
  'fragment':
    'An incomplete sentence — missing a subject, missing a finite verb, or starting with a subordinating word.',
  'parallel':
    'Items in a list or comparison that share the same grammatical form. "Hiking, swimming, and biking" is parallel; "hiking, swimming, and to bike" is not.',
  'parallelism':
    'The principle of keeping items in a list or comparison in the same grammatical form.',
  'parallel structure':
    'See parallelism — items in a list or comparison must share the same grammatical shape.',
  'appositive':
    'A noun phrase that renames the noun beside it. "My brother, a teacher, lives in Denver." "A teacher" is the appositive.',
  'restrictive':
    'An essential modifier — removing it changes the meaning. NO commas. "The students who studied passed" (only those students).',
  'non-restrictive':
    'An extra-information modifier — removing it doesn\'t change the meaning. USE commas. "The students, who studied, passed" (all of them did).',
  'essential clause':
    'Same as a restrictive clause — needed for meaning, no commas.',
  'non-essential clause':
    'Same as a non-restrictive clause — extra info, set off with commas.',
  'relative clause':
    'A clause starting with who/whom/whose/which/that that adds info about a noun.',
  'relative pronoun':
    'who, whom, whose, which, that — they introduce relative clauses.',
  'tense':
    'The form of a verb that signals time: past (walked), present (walks), future (will walk).',
  'past perfect':
    'The "had + past participle" form, used for a past action that happened BEFORE another past action: "By the time we arrived, the movie had started."',
  'present perfect':
    'The "has/have + past participle" form, linking a past action to the present: "She has lived here ten years."',
  'progressive':
    'The "-ing" form with a "to be" helper, showing ongoing action: "is running," "was running."',
  'voice':
    'Whether the subject acts (active: "the cat ate the fish") or is acted on (passive: "the fish was eaten by the cat").',
  'active voice':
    'The subject performs the action. Usually clearer and more concise than passive.',
  'passive voice':
    'The subject receives the action: "the report was written by Maria." Often wordier than active.',
  'object':
    'The noun receiving the action of a verb or following a preposition. In "Maya kicked the ball," "ball" is the object.',
  'object pronoun':
    'me, him, her, us, them, whom — used after verbs and prepositions.',
  'subject pronoun':
    'I, he, she, we, they, who — used as the subject of a verb.',
  'possessive':
    'Form showing ownership: my, your, his, her, its, our, their, whose, Maria\'s.',
  'gerund phrase':
    'A phrase built around a gerund acting as a noun: "running marathons takes training."',
  'transition':
    'A word like however, therefore, in addition, meanwhile that signals the logical link between sentences or clauses.',
  'idiom':
    'A conventional pairing of words (especially verb + preposition) that English speakers learned by ear: "capable OF," "different FROM."',
  'register':
    'The level of formality in word choice — slang, casual, neutral, formal. The right word matches the surrounding tone.',
  'connotation':
    'The feeling or association a word carries beyond its dictionary meaning. "Aftermath" connotes disaster; "results" is neutral.',
  'concision':
    'Using as few words as possible without losing meaning. The ACT prefers shorter answers when meaning is identical.',
  'redundancy':
    'Using two words that mean the same thing: "the reason WHY," "advance forward," "PIN number."',
  'colon':
    'The : punctuation. Needs a complete sentence on its left; introduces a list, quote, or explanation.',
  'semicolon':
    'The ; punctuation. Joins two independent clauses, OR separates list items that already contain commas.',
  'em-dash':
    'The — punctuation (longer than a hyphen). Sets off parenthetical info with emphasis. Comes in matching pairs.',
  'parenthetical':
    'Extra information set off from the main sentence — usually with commas, dashes, or parentheses.',
  'apostrophe':
    'The \' mark. Two jobs: contractions (it\'s = it is) and possession (Sara\'s book). Possessive PRONOUNS skip it (its, hers).',
  'noun phrase':
    'A noun plus the words attached to it: "the small red book on the table" is one noun phrase.',
  'collective noun':
    'A noun naming a group treated as a unit: team, family, committee, audience. Usually singular on the ACT.',
  'compound subject':
    'Two or more subjects joined by "and" — almost always plural. "Maria and Tom are…"',
  'phrase':
    'A group of words that work together but lack a subject + verb pair. "On the table" and "running quickly" are phrases, not clauses.',
  'clause':
    'A group of words containing a subject and a verb. Can be independent (stands alone) or dependent (needs a main clause).',
  'case':
    'The form of a pronoun based on its job: subject (I/he/she/we/they/who), object (me/him/her/us/them/whom), or possessive (my/his/her/our/their/whose).',
  'agreement':
    'The grammatical match between two words — subject and verb (in number) or pronoun and antecedent (in number, person, gender).',
  'number':
    'Whether a word is singular (one) or plural (more than one). Subjects and verbs must match in number.',
  'person':
    'Who\'s being referred to: first person (I/we), second person (you), third person (he/she/it/they). Verbs and pronouns shift form by person.',
  'predicate':
    'Everything in a sentence that\'s NOT the subject — the verb plus its objects and modifiers. "The dog [barked at the mailman]" — the bracketed part is the predicate.',
  'complement':
    'A word or phrase that completes the meaning of a verb. After linking verbs, the complement describes the subject ("She is [a lawyer]").',
  'helping verb':
    'A verb that combines with a main verb to form a tense or mood: be, have, do, will, can, should, may, might. Also called an auxiliary verb.',
  'auxiliary verb':
    'Same as a helping verb — combines with a main verb to form tenses or moods (be, have, do, will, can, etc.).',
  'linking verb':
    'A verb that connects the subject to a description rather than an action: be, seem, become, feel, look, taste, sound, appear, remain.',
  'action verb':
    'A verb that describes a physical or mental action: run, write, think, build. Modify with adverbs (quickly, carefully).',
  'transitive':
    'A verb that takes a direct object: "she WROTE a book". The action transfers to the object.',
  'intransitive':
    'A verb that doesn\'t take a direct object: "she ARRIVED". The action stays with the subject.',
  'interrupter':
    'A word or phrase that interrupts the main flow of a sentence — usually set off with commas. Drop it and the sentence still makes sense.',
  'qualifier':
    'A word that limits or refines another word\'s meaning: very, somewhat, almost, nearly. Often safe to cut for concision.',
  'intensifier':
    'A word that amplifies another word: very, extremely, really, quite. Often unnecessary on the ACT.',
  'conjunctive adverb':
    'An adverb that joins two independent clauses with a logical relationship: however, therefore, moreover, consequently, nevertheless, furthermore. Pattern: "; conjunctive adverb,".',
  'demonstrative':
    'A word that points to a specific noun: this, that, these, those. Can be a pronoun ("This is mine") or adjective ("This book is mine").',
  'indefinite pronoun':
    'A pronoun referring to a non-specific noun: everyone, somebody, anyone, each, none, all, some, several. Most are singular on the ACT.',
  'reflexive pronoun':
    'Pronouns ending in -self/-selves: myself, yourself, himself, herself, itself, ourselves, themselves. Used only when the subject and object are the same: "I hurt myself."',
  'speech tag':
    'A short attribution in dialogue: "she said," "he asked." Followed by a comma before the quote.',
  'verb phrase':
    'A main verb plus any helping verbs and modifiers: "had been quietly waiting" is one verb phrase.',
  'infinitive phrase':
    'A phrase built around an infinitive: "to win the race" — can act as a noun, adjective, or adverb.',
  'absolute phrase':
    'A noun + participle pair that modifies the whole sentence, set off by commas: "The game over, the players walked off the field."',
  'subjunctive':
    'A verb form for hypotheticals, wishes, and demands: "If I WERE you" (not "was"); "She insisted that he BE on time."',
  'imperative':
    'A verb form giving a command. Subject "you" is implied: "[You] Close the door." "[You] Be quiet."',
  'conditional':
    'A construction expressing what would happen IF something else were true: "If it rains, we WILL stay home"; "If she had studied, she WOULD HAVE passed."',
  'splice':
    'Short for "comma splice" — joining two independent clauses with just a comma.',
  'parallelism':
    'See "parallel" — items in a list or comparison must share the same grammatical form.',
  'preposition':
    'A short word showing relationship between a noun and another word: in, on, of, at, to, with, by, from, between, under, over, through. Always followed by an object.',
  'parenthetical':
    'Extra information inserted into a sentence — set off with commas, dashes, or parentheses. Drop it and the main sentence still works.',
  'object pronoun':
    'me, him, her, us, them, whom — used after verbs and prepositions.',
  'subject pronoun':
    'I, he, she, we, they, who — used as the subject of a verb.',
  'comma splice':
    'The error of joining two independent clauses with just a comma. Fix with a period, semicolon, or comma + FANBOYS.',
  'serial comma':
    'The comma before "and" in a list of three or more: "red, white, AND blue." Also called the Oxford comma. Preferred on the ACT.',
  'oxford comma':
    'Same as the serial comma — the comma before "and" in a list of three or more. Preferred on the ACT.',
  'antecedent':
    'The noun a pronoun refers back to. In "Maya lost her keys," the antecedent of "her" is "Maya."',
  'restrictive clause':
    'An essential modifier — removing it changes the meaning. NO commas. Often starts with "that".',
  'non-restrictive clause':
    'An extra-information modifier — removing it doesn\'t change the meaning. USE commas. Often starts with "which" or "who".',
  'comparative':
    'The form of an adjective/adverb used to compare TWO things: faster, taller, more careful, better.',
  'superlative':
    'The form of an adjective/adverb used to compare THREE or more: fastest, tallest, most careful, best.',
  'positive degree':
    'The plain form of an adjective/adverb (no comparison): fast, tall, careful, good.',
  'past participle':
    'The verb form used with "have/has/had" (perfect tenses) or "be" (passive voice): walked, eaten, written, broken.',
  'present participle':
    'The -ing form of a verb: walking, eating, writing. Used in progressive tenses and as a modifier.'
};

// Render text with glossary terms wrapped as interactive tooltips. Returns an
// array of DOM nodes suitable for use as children of an h() call.
//
// Strategy: build a single regex matching any glossary term (longest first, so
// "parallel structure" matches before "parallel"), then walk the text and emit
// alternating plain-text and tooltip-span children.
import { h } from '../lib/dom.js';

const TERMS_BY_LEN = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
const TERM_RE = new RegExp(
  '\\b(' + TERMS_BY_LEN.map(t => t.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')).join('|') + ')\\b',
  'gi'
);

export function renderWithGlossary(text) {
  if (!text || typeof text !== 'string') return [text];
  const nodes = [];
  let lastIndex = 0;
  let m;
  TERM_RE.lastIndex = 0;
  while ((m = TERM_RE.exec(text)) !== null) {
    if (m.index > lastIndex) {
      // Render the in-between text, but auto-highlight any quoted snippet
      // (e.g. "lantern room") so the student can see what part of the
      // question is being referenced.
      nodes.push(...renderQuotes(text.slice(lastIndex, m.index)));
    }
    const matched = m[0];
    const key = matched.toLowerCase();
    const def = GLOSSARY[key] || GLOSSARY[Object.keys(GLOSSARY).find(k => k === key)];
    if (def) {
      // Look at the text RIGHT after this term for an adjacent quoted snippet
      // — that's the example from THIS question for this term. e.g. the
      // subject "lantern room" → example = "lantern room".
      const tail = text.slice(m.index + matched.length, m.index + matched.length + 80);
      const exampleMatch = /^[\s,:—-]*["“]([^"”]{1,60})["”]/.exec(tail);
      const example = exampleMatch ? exampleMatch[1] : null;
      nodes.push(GlossaryTerm(matched, def, example));
    } else {
      nodes.push(matched);
    }
    lastIndex = m.index + matched.length;
  }
  if (lastIndex < text.length) {
    nodes.push(...renderQuotes(text.slice(lastIndex)));
  }
  return nodes;
}

// Wrap any "..." or "..." (curly) quoted snippet in a yellow highlight pill
// that visually matches the passage's underline color. Clicking it scrolls to
// the passage and briefly flashes the matching segment if any.
function renderQuotes(text) {
  const out = [];
  const QUOTE_RE = /["“]([^"”]{1,80})["”]/g;
  let last = 0;
  let m;
  while ((m = QUOTE_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const snippet = m[1];
    out.push(QuoteHighlight(snippet));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : [text];
}

function QuoteHighlight(snippet) {
  return h('span.bg-yellow-200.text-slate-900.px-1.rounded.font-mono.text-xs.cursor-pointer.hover\\:bg-yellow-300', {
    title: 'From the question — click to find it in the passage',
    onClick: (e) => { e.stopPropagation(); flashSnippetInPassage(snippet); }
  }, `"${snippet}"`);
}

function GlossaryTerm(label, definition, example) {
  const span = h('span.border-b.border-dashed.border-indigo-400.text-indigo-700.cursor-help.font-medium',
    { onClick: (e) => togglePopover(e, label, definition, example) }, label);
  return span;
}

function togglePopover(e, label, definition, example) {
  e.stopPropagation();
  document.querySelectorAll('.glossary-popover').forEach(el => el.remove());
  const trigger = e.currentTarget;
  const pop = document.createElement('div');
  pop.className = 'glossary-popover bg-indigo-900 text-white text-xs leading-relaxed rounded-lg shadow-lg p-3 max-w-xs';
  pop.style.position = 'fixed';
  pop.style.zIndex = '9999';

  const titleEl = document.createElement('div');
  titleEl.className = 'font-bold uppercase tracking-wide text-indigo-200 mb-1';
  titleEl.textContent = label;
  pop.appendChild(titleEl);

  const defEl = document.createElement('div');
  defEl.className = 'mb-1';
  defEl.textContent = definition;
  pop.appendChild(defEl);

  if (example) {
    const exHeader = document.createElement('div');
    exHeader.className = 'mt-2 text-indigo-300 uppercase tracking-wide text-xxs';
    exHeader.style.fontSize = '10px';
    exHeader.textContent = 'In this question';
    pop.appendChild(exHeader);

    const exEl = document.createElement('button');
    exEl.className = 'mt-1 text-yellow-200 underline font-mono text-left';
    exEl.textContent = `"${example}"`;
    exEl.onclick = (ev) => { ev.stopPropagation(); flashSnippetInPassage(example); };
    pop.appendChild(exEl);

    const hint = document.createElement('div');
    hint.className = 'text-indigo-300 mt-1';
    hint.style.fontSize = '10px';
    hint.textContent = 'Tap the snippet to find it in the passage above.';
    pop.appendChild(hint);
  }

  document.body.appendChild(pop);
  const r = trigger.getBoundingClientRect();
  const popR = pop.getBoundingClientRect();
  let top = r.bottom + 6;
  let left = r.left;
  if (left + popR.width > window.innerWidth - 8) left = window.innerWidth - popR.width - 8;
  if (top + popR.height > window.innerHeight - 8) top = r.top - popR.height - 6;
  pop.style.top  = top + 'px';
  pop.style.left = Math.max(8, left) + 'px';

  setTimeout(() => {
    const dismiss = (ev) => {
      if (!pop.contains(ev.target)) {
        pop.remove();
        document.removeEventListener('click', dismiss, true);
      }
    };
    document.addEventListener('click', dismiss, true);
  }, 0);
}

// Find the snippet in the .passage container, scroll it into view, and pulse
// a temporary yellow highlight around the match. Falls back silently if the
// snippet isn't in the passage (e.g. it's from a choice).
function flashSnippetInPassage(snippet) {
  const passage = document.querySelector('.passage');
  if (!passage || !snippet) return;
  const walker = document.createTreeWalker(passage, NodeFilter.SHOW_TEXT);
  const lower = snippet.toLowerCase();
  let node;
  while ((node = walker.nextNode())) {
    const idx = node.nodeValue.toLowerCase().indexOf(lower);
    if (idx === -1) continue;
    const range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + snippet.length);
    const rect = range.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = rect.left + 'px';
    overlay.style.top = rect.top + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    overlay.style.background = 'rgba(251, 191, 36, 0.55)';
    overlay.style.border = '2px solid rgb(217, 119, 6)';
    overlay.style.borderRadius = '4px';
    overlay.style.zIndex = '9998';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 1.2s ease';
    document.body.appendChild(overlay);
    passage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { overlay.style.opacity = '0'; }, 1200);
    setTimeout(() => overlay.remove(), 2500);
    return;
  }
}
