// Diagnostic procedures per topic — used by Lesson Mode to walk the student
// through the strategic thinking BEFORE they answer.
// Each entry is an array of 3–5 short imperative steps.

export const DIAGNOSTICS = {
  'gu.subj_verb': [
    'Find the verb in the underlined portion.',
    'Trace back to the actual subject — ignore phrases like "along with," "as well as," or anything between commas.',
    'Is the bare subject singular or plural? (Each, every, either, neither, none = singular.)',
    'Pick the verb that matches the bare subject in number.'
  ],
  'gu.pronoun': [
    'Find the pronoun and ask: what noun is it replacing?',
    'Determine the pronoun\'s job in the sentence: subject (I, he, she, who) or object (me, him, her, whom).',
    'For comparisons ("than I/me"), expand the implied verb: "than I [run]" beats "than me run."',
    'Check that the pronoun agrees in number with the noun it replaces.'
  ],
  'gu.verb_tense': [
    'Identify the time markers (yesterday, by 2010, currently, etc.) and the surrounding tense.',
    'If two past events are sequenced, use past perfect ("had ___") for the earlier one.',
    'For past actions still relevant now, use present perfect ("has/have ___").',
    'Make sure the underlined verb matches the timeline and surrounding tense.'
  ],
  'gu.modifier': [
    'Find the modifier (often an -ing, -ed, or prepositional phrase, usually at the start of the sentence).',
    'Find the noun the modifier is supposed to describe.',
    'Ask: is that noun the very first noun after the modifier? If not, the modifier is dangling.',
    'Pick the answer where the modifier clearly attaches to the right noun.'
  ],
  'gu.adj_adv': [
    'Identify what word the underlined modifier is describing.',
    'Is that word a noun? → use an adjective.',
    'Is it a verb, an adjective, or another adverb? → use an adverb.',
    'After linking verbs (be, seem, feel, taste, look), use an adjective: "She seems happy."'
  ],
  'gu.idiom': [
    'Identify the verb or adjective that pairs with the preposition.',
    'Try the standard pairing in your head: capable OF, succeed IN, prohibit FROM, comply WITH, similar TO, different FROM.',
    'If the preposition feels off, swap to the standard one.',
    'Pick the answer that uses the conventional English pairing.'
  ],
  'gu.confused': [
    'Identify the pair: affect/effect, then/than, its/it\'s, their/there/they\'re, who/whom.',
    'Apply the rule: affect=verb, effect=noun; than=comparison, then=time; it\'s="it is."',
    'Test by substituting the long form ("it is" for it\'s).',
    'Pick the answer that fits the role the word plays in the sentence.'
  ],
  'pn.comma': [
    'Identify what the comma is doing: list separator, intro phrase setoff, FANBOYS, or non-essential modifier.',
    'Check forbidden positions: NO comma between subject and verb, verb and object, or adjective and noun.',
    'For lists of 3+, use commas between items + comma before the conjunction.',
    'For non-essential modifiers, use matching commas (or matching dashes/parens).'
  ],
  'pn.semicolon': [
    'Read both halves of the sentence (before and after the candidate semicolon).',
    'Test: does each half stand alone as a complete sentence?',
    'If yes → semicolon works. If either side is dependent or a fragment → semicolon is wrong.',
    'Pick the answer that uses ; only between two independent clauses (or in complex lists).'
  ],
  'pn.colon': [
    'Read what comes BEFORE the candidate colon.',
    'Test: is it a complete independent clause?',
    'If yes → colon works to introduce the list, quote, or explanation that follows.',
    'If not → the colon is wrong. Use a comma or restructure.'
  ],
  'pn.dash': [
    'Identify whether the dash is a single (emphasis) or paired (parenthetical).',
    'For parentheticals, both dashes must match — opening dash needs a closing dash.',
    'No mixing: dash + comma or dash + parenthesis is always wrong.',
    'Pick the option with consistent matching punctuation around the parenthetical phrase.'
  ],
  'pn.apostrophe': [
    'Determine if the word shows possession or contraction.',
    'For nouns: singular possessive = \'s, plural possessive = s\'.',
    'For pronouns: NO apostrophe for its/his/hers/ours/theirs/whose.',
    'Test it\'s/who\'s by expanding to "it is" / "who is"; if that fails, use the possessive (its/whose).'
  ],
  'ss.runon': [
    'Find the dividing punctuation between two clauses.',
    'Test if both clauses are independent (each a full sentence).',
    'Two independent clauses need: period, semicolon, comma + FANBOYS, or em-dash. Comma alone = splice.',
    'Pick the option that uses adequate glue between the two clauses.'
  ],
  'ss.fragment': [
    'Strip out modifiers, prepositional phrases, and relative clauses.',
    'Check what\'s left for: a subject AND a finite (conjugated) verb.',
    'Watch for participles (-ing, -ed) masquerading as main verbs — they\'re not.',
    'If subject or finite verb is missing, the answer is a fragment.'
  ],
  'ss.parallel': [
    'Identify the list, comparison, or correlative pair (not only/but also; either/or; neither/nor; both/and).',
    'Check that all items share the same grammatical form: all nouns, all gerunds, all infinitives, all clauses.',
    'If one item breaks the pattern, that\'s the error.',
    'Pick the option that restores parallel structure.'
  ],
  'ss.conjunction': [
    'Identify the conjunction: coordinating (FANBOYS) or subordinating (because, although, when, if, since…).',
    'Coordinating conjunctions join two equal clauses → comma before the conjunction.',
    'Subordinating conjunctions create a dependent clause; if the dependent clause comes first, use a comma after.',
    'Match the conjunction to the actual logical relationship.'
  ],
  'pw.transition': [
    'Read the sentence BEFORE and AFTER the transition.',
    'Determine the logical relationship: contrast, addition, cause/effect, example, time, or emphasis.',
    'Reject choices that signal the wrong relationship (e.g., "However" for two agreeing claims).',
    'Pick the transition that names the actual relationship.'
  ],
  'pw.organization': [
    'Read the surrounding paragraph for its main idea.',
    'Identify the topic sentence (usually first or second).',
    'Track logical or chronological flow between sentences.',
    'Look for transitional cues (pronouns, "this," "however," etc.) that lock sentences into place.'
  ],
  'pw.add_delete': [
    'Identify the paragraph\'s purpose in one sentence.',
    'Ask: does the proposed sentence advance, support, or develop that purpose?',
    'If yes → keep. If it strays, repeats, or contradicts → delete.',
    'Pick the answer that names the most accurate reason — both choice and rationale must be right.'
  ],
  'pw.purpose': [
    'Read the prompt carefully — what specific purpose does it claim?',
    'Scan the essay for evidence: does it actually do that thing?',
    'Reject overreach (essay describes but prompt says "argues") and underreach (essay covers more than prompt claims).',
    'Pick the answer where both verdict (yes/no) AND reason match the essay as written.'
  ],
  'kl.word_choice': [
    'Identify the surrounding tone: formal, conversational, technical, narrative.',
    'Reject options that clash with that register (slang in a formal essay, jargon in a personal narrative).',
    'Among remaining options, pick the most precise word — the one whose connotation fits exactly.',
    'When two synonyms compete, prefer the one with sharper meaning.'
  ],
  'kl.concision': [
    'Read all four options and check that each says the same thing.',
    'If meaning is identical, pick the SHORTEST.',
    'Watch for redundancies: "completely finish," "the reason is because," "free gift."',
    'Cut filler phrases: "due to the fact that" → "because"; "in the event that" → "if."'
  ]
};

export function getDiagnostic(topicId) {
  return DIAGNOSTICS[topicId] || null;
}
