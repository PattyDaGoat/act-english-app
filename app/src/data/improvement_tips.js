// Per-topic improvement advice — concrete, actionable steps a student can
// take TODAY to get better at a topic where they're struggling. Surfaced on
// the session summary for any topic with significant misses.

export const IMPROVEMENT_TIPS = {
  'gu.subj_verb': {
    headline: "You're getting tripped by interrupters between subject and verb.",
    actions: [
      'Practice the cross-out drill: in every long subject, mentally cross out the prepositional phrase ("of the runners," "in the box") and re-read with just the bare subject + verb.',
      'Memorize the always-singular indefinite pronouns: each, every, either, neither, none, anyone, somebody. They take singular verbs even when followed by plural-sounding phrases.',
      'For "either…or" / "neither…nor", remember the verb agrees with the CLOSER subject — not the first one.',
      'Drill 5 subject-verb questions in a row in Drills, then re-read the rule of thumb. Repetition with feedback locks the pattern in.'
    ]
  },
  'gu.pronoun': {
    headline: "You're mixing up pronoun cases (subject vs object).",
    actions: [
      'Use the "drop the other person" trick on every compound pronoun: "to Maria and ___" → drop "Maria and" → "to me" sounds right.',
      'For who/whom: substitute he/him. If "he" works → who. If "him" works → whom.',
      'Memorize the singular indefinite pronouns (each, everyone, somebody) — they take singular pronouns ("his or her," not "their" on the formal ACT).',
      'Drill 5 pronoun questions in a row to surface the patterns; the second-time-through always feels easier.'
    ]
  },
  'gu.verb_tense': {
    headline: "You're losing track of which tense fits the timeline.",
    actions: [
      'Watch for time-marker words: "last X" / "ago" / "in 1999" → simple past. "Since X" / "for X years" + still true → present perfect. "By the time" / one event before another past event → past perfect.',
      'When describing what a book or film does, use the LITERARY PRESENT: "the author writes," "the character realizes."',
      'Build the habit of asking: "What\'s the SECOND past event here? Which came first?" Past-before-past gets past perfect ("had + past participle").',
      'Drill 5 verb-tense questions back-to-back to feel the time-marker cues.'
    ]
  },
  'gu.modifier': {
    headline: "You're not catching dangling/misplaced modifiers.",
    actions: [
      'For every sentence opening with -ing or -ed (e.g., "Walking to school,…"), ask: WHO is doing the action? That word must be the noun right after the comma.',
      'Test by reading just the modifier + the noun after the comma: "Walking to school, the rain started" → "the rain was walking" — clearly wrong.',
      'On the ACT, the answer that fixes the modifier is usually the one that PUTS A PERSON right after the comma.',
      'Drill 5 modifier questions to internalize the "who is doing this?" check.'
    ]
  },
  'gu.adj_adv': {
    headline: "You're confusing adjectives with adverbs.",
    actions: [
      'Memorize the linking verbs: be, seem, become, feel, look, taste, smell, sound, appear, remain. After these → ADJECTIVE describing the subject.',
      'After action verbs (run, write, played, finished) → ADVERB telling HOW.',
      'For comparisons: TWO things → comparative (faster / more careful). THREE+ things → superlative (fastest / most careful).',
      '"Unique," "perfect," and "complete" are absolutes — never use "more," "most," or "very" with them.'
    ]
  },
  'gu.idiom': {
    headline: "You're missing the conventional preposition pairings.",
    actions: [
      'Idioms have no logical rule — they\'re memorized. Start a personal list: capable OF, different FROM, comply WITH, consist OF, succeed IN, opposed TO, similar TO, focus ON.',
      'When a preposition feels off, say the phrase aloud — your ear often catches it before your brain does.',
      'On the ACT, "different FROM" beats "different than"; "succeed IN" beats "succeed at"; "the reason IS THAT" beats "the reason is BECAUSE".',
      'Add every missed idiom to flashcards — repetition is the only fix.'
    ]
  },
  'gu.confused': {
    headline: "You're mixing up commonly-confused word pairs.",
    actions: [
      'The big six to drill: its/it\'s · their/there/they\'re · than/then · who\'s/whose · affect/effect · your/you\'re.',
      'Trick: any pronoun with an apostrophe is a CONTRACTION (it\'s = it is, who\'s = who is, you\'re = you are). Possessive pronouns NEVER take an apostrophe (its, hers, theirs, whose).',
      'Affect = verb (to influence). Effect = noun (the result). Memorize: "the effect of X is to affect Y."',
      'Than = comparison. Then = time/sequence.',
      'Drill 5 confused-words questions in a row to lock in the patterns.'
    ]
  },
  'pn.comma': {
    headline: "You're not catching where commas belong (and don't).",
    actions: [
      'Memorize the FIVE places a comma is used: (1) lists of 3+, (2) before FANBOYS joining two independent clauses, (3) after intro phrases/clauses, (4) around non-essential modifiers, (5) between coordinate adjectives.',
      'Critical: a comma alone CANNOT join two independent clauses (that\'s a comma splice).',
      'For "which" vs "that": "which" clauses are non-essential (USE commas); "that" clauses are essential (NO commas).',
      'When in doubt, DROP the phrase between the commas — if the sentence still makes sense, the commas are correct.',
      'Drill 5 comma questions back-to-back; comma rules are pattern recognition.'
    ]
  },
  'pn.semicolon': {
    headline: "You're misusing semicolons.",
    actions: [
      'Mantra: a semicolon = a period substitute. BOTH sides must be complete sentences (independent clauses).',
      'Test: replace the semicolon with a period. If both halves stand alone as sentences → semicolon was right. If not → semicolon is wrong.',
      'Second use: separating list items that already contain commas ("Rome, Italy; Athens, Greece; Cairo, Egypt").',
      'For conjunctive adverbs (however, therefore, moreover): pattern is "; however,"  not ", however,".',
      'Drill 5 semicolon questions in a row.'
    ]
  },
  'pn.colon': {
    headline: "You're using colons in the wrong spots.",
    actions: [
      'A colon needs a COMPLETE sentence on its left. "My favorite snacks are: apples…" is WRONG (left side is incomplete). "My favorite snacks are these: apples…" is right.',
      'Test by reading just the left side. If it could end with a period → colon is fine. If not → colon is wrong.',
      'Right side of a colon: a list, a quotation, OR an explanation/specification — anything that completes the promise of the setup.',
      'Drill 5 colon questions back-to-back.'
    ]
  },
  'pn.dash': {
    headline: "You're missing the matching-pair rule for em-dashes.",
    actions: [
      'For mid-sentence parentheticals: dashes come in MATCHING PAIRS (— … —), exactly like commas (, … ,) or parentheses (( … )).',
      'Mismatched is always wrong: "— word," is wrong; ", word —" is wrong.',
      'A SOLO em-dash can introduce an emphatic specification (like a louder colon): "There\'s only one answer — yes."',
      'A solo em-dash at the end of a sentence is closed by the period.',
      'Drill 5 dash questions in a row.'
    ]
  },
  'pn.apostrophe': {
    headline: "You're misplacing or omitting apostrophes.",
    actions: [
      'Three rules: (1) Singular possessive = noun + \'s ("the dog\'s bone"). (2) Plural possessive = noun ending in s + just \' ("the dogs\' bones"). (3) Irregular plurals (children, women) take \'s ("children\'s books").',
      'POSSESSIVE PRONOUNS NEVER TAKE APOSTROPHES: its, hers, his, ours, theirs, whose. Apostrophes on these always = contraction (it\'s = it is).',
      'Test for it\'s vs its: replace with "it is." If the sentence still works → it\'s. If not → its.',
      'Drill 5 apostrophe questions in a row.'
    ]
  },
  'ss.runon': {
    headline: "You're letting independent clauses run together.",
    actions: [
      'Memorize the four legal ways to join two independent clauses: (1) period, (2) semicolon, (3) comma + FANBOYS, (4) subordinating word ("because," "although") that demotes one clause.',
      'A bare comma is NEVER one of them. That\'s a comma splice.',
      'Test: cover the punctuation in a sentence. Could each side stand alone? If yes, you need real punctuation between them.',
      'Drill 5 run-on questions in a row.'
    ]
  },
  'ss.fragment': {
    headline: "You're missing fragments — clauses that look complete but aren't.",
    actions: [
      'Every sentence needs a SUBJECT and a FINITE VERB (one that carries tense, like "ran" or "is running" — not just "running").',
      'Subordinating words (because, although, when, if, since, while) make a clause DEPENDENT — it can\'t stand alone.',
      'Relative pronouns (which, that, who) demote the verb into a relative clause, leaving no main verb.',
      'Test: ask "what\'s the main verb?" If the only verb is inside a "which/that/because" clause, you have a fragment.',
      'Drill 5 fragment questions in a row.'
    ]
  },
  'ss.parallel': {
    headline: "You're breaking parallel structure in lists and comparisons.",
    actions: [
      'Items in a list MUST share grammatical form: all gerunds, all infinitives, all nouns, all clauses. "Hiking, swimming, and to bike" → wrong.',
      'For correlative pairs, memorize the partners: not only…BUT ALSO; either…OR; neither…NOR; both…AND.',
      'When two items are joined ("X and Y," "X or Y"), check both sides have the same shape.',
      'Drill 5 parallel-structure questions in a row.'
    ]
  },
  'ss.conjunction': {
    headline: "You're picking the wrong conjunction for the logical relationship.",
    actions: [
      'Match the conjunction to the actual logical relationship: addition (and, also), contrast (but, however, although), cause (because, since), effect (so, therefore), choice (or).',
      'On the ACT, the wrong conjunction is the most common trap — the sentence might sound OK but the logic is reversed.',
      'When two halves contradict → contrast conjunction. When the second half is the result of the first → cause/effect conjunction.',
      'Drill 5 conjunction questions in a row.'
    ]
  },
  'pw.transition': {
    headline: "You're picking transitions that don't match the logic.",
    actions: [
      'Match the transition to the relationship between the two sentences: contrast (however, but, yet, nevertheless), addition (in addition, furthermore, moreover), example (for example, for instance), cause-effect (therefore, as a result, consequently), time (meanwhile, then, now, today).',
      'On the ACT, the wrong transition is the most common trap — it usually sounds fine but signals the wrong relationship.',
      'Read the two sentences without the transition first. Decide what the actual relationship is. THEN pick the word that names it.',
      'Drill 5 transition questions in a row.'
    ]
  },
  'pw.organization': {
    headline: "You're misjudging where sentences belong in a paragraph.",
    actions: [
      'A topic sentence previews the SPECIFIC content of the paragraph — vague openers ("X is interesting") almost never win.',
      'For sentence-placement questions: look for "this," "these," "that," "those" — those words REQUIRE the previous sentence to mention what they refer to.',
      'Chronological paragraphs follow time order. Argument paragraphs build toward a conclusion. Match sentence position to paragraph type.',
      'Drill 5 organization questions in a row.'
    ]
  },
  'pw.add_delete': {
    headline: "You're picking 'interesting' over 'relevant'.",
    actions: [
      'Add/delete questions hinge on RELEVANCE to the paragraph\'s focus, not on whether the sentence is interesting or true.',
      'Always ask: does this sentence develop the paragraph\'s SPECIFIC topic? If it strays — even into related territory — it\'s usually wrong to add (or right to delete).',
      'Beware of "vivid detail" answers that introduce a tangent. Trivia loses, even when colorful.',
      'On "should the writer add" questions, the right answer almost always names a CONCRETE relevance reason ("supports," "develops," "illustrates").',
      'Drill 5 add/delete questions in a row.'
    ]
  },
  'pw.purpose': {
    headline: "You're judging by what the essay COULD do, not what it ACTUALLY does.",
    actions: [
      'Purpose questions ask whether the essay accomplishes a specific goal. Judge ONLY by what\'s on the page — never by what could be there.',
      'Read the prompt\'s goal carefully. Then check: did the essay actually do THAT? If yes → which choice names HOW it did so?',
      'For "support the view that…" questions, the right answer cites concrete content from the essay that demonstrates that view.',
      'Drill 5 purpose questions in a row.'
    ]
  },
  'kl.word_choice': {
    headline: "You're picking words with the wrong tone or imprecise meaning.",
    actions: [
      'Match REGISTER: formal essay = formal vocabulary. Slang ("kicked it off," "wiped," "kind of") never wins on the ACT.',
      'Match CONNOTATION: "aftermath" feels disastrous; "results" is neutral. Pick the one whose feeling matches the situation.',
      'When two words are synonyms, prefer the more SPECIFIC one ("commenced" over "started" in formal writing).',
      'Drill 5 word-choice questions in a row.'
    ]
  },
  'kl.concision': {
    headline: "You're keeping extra words that don't add meaning.",
    actions: [
      'When meaning is identical, the SHORTEST answer wins on the ACT. Almost always.',
      'Memorize common cuts: "due to the fact that" → "because"; "in order to" → "to"; "at this point in time" → "now"; "the reason is because" → "the reason is that".',
      'Watch for redundancy: "the reason WHY," "PIN number," "ATM machine," "advance forward," "free gift."',
      'Drop nominalizations: "made a decision" → "decided"; "is in possession of" → "has"; "gave consideration to" → "considered".',
      'Drill 5 concision questions in a row.'
    ]
  }
};

export function getTips(topicId) {
  return IMPROVEMENT_TIPS[topicId] || null;
}
