// Mini-lessons (v1.1, §16) — one short concept primer per topic id.
// Surface in: Guided/Adaptive explanation panel ("Learn this concept"),
// linked from Analytics weak topics.
// Each lesson is ~60–90 seconds of reading: 1–3 paragraphs + 1–2 quick examples.

export const MINI_LESSONS = {
  'gu.subj_verb': {
    title: 'Subject–verb agreement',
    body: [
      'A verb must match its subject in number. Singular subjects take singular verbs; plural subjects take plural verbs. The trap on the ACT is interrupters that visually separate the subject from the verb.',
      'When in doubt, mentally cross out everything between the subject and the verb. What\'s left should make sense.',
    ],
    examples: [
      ['The box of crackers is on the counter.', '"Box" is singular, even though "crackers" is plural.'],
      ['Each of the runners is expected to finish.', '"Each" is always singular.'],
      ['Neither the manager nor the employees were aware.', 'In neither/nor, the verb agrees with the closer subject.']
    ],
    rule_of_thumb: 'Cross out interrupters. Match the verb to the bare subject.'
  },
  'gu.pronoun': {
    title: 'Pronoun case & agreement',
    body: [
      'Subject pronouns (I, he, she, we, they, who) act as subjects of verbs. Object pronouns (me, him, her, us, them, whom) act as objects of verbs or prepositions.',
      'Pronouns must agree in number with what they refer to. "Each student" → "his or her," not "their" (formally).',
      'In comparisons ("taller than I/me"), expand the implied verb: "taller than I am." Subject pronoun wins when a verb follows.',
    ],
    examples: [
      ['Between you and me, this is messy.', 'After "between" use object pronouns.'],
      ['She runs faster than I do.', 'Implied verb test confirms subject pronoun.'],
      ['Drop the other person test: "give it to Maria and ___" → drop "Maria and" → "give it to me."']
    ],
    rule_of_thumb: 'Drop the other person, or expand the implied verb. The right pronoun usually becomes obvious.'
  },
  'gu.verb_tense': {
    title: 'Verb tense & consistency',
    body: [
      'Stay in one tense unless the timeline genuinely changes. Past actions = simple past. Two past events in sequence = past perfect ("had") for the earlier one.',
      'Present perfect ("has done") connects past action to ongoing relevance: "Scientists have discovered…" implies the discovery still matters today.',
    ],
    examples: [
      ['By the time we arrived, the movie had started.', 'Past perfect for the earlier of two past events.'],
      ['She has lived in Boston for ten years.', 'Present perfect for past-into-present.'],
    ],
    rule_of_thumb: 'Match the tense to the timeline; use past perfect when one past action precedes another.'
  },
  'gu.modifier': {
    title: 'Misplaced & dangling modifiers',
    body: [
      'A modifier (a phrase that describes something) must clearly attach to the right word — usually the subject of the sentence right after it.',
      'Watch especially for sentences that begin with -ing or -ed phrases. The subject after the comma must be the thing doing that action.',
    ],
    examples: [
      ['❌ Walking to school, the rain started. (Rain doesn\'t walk.)', '✓ Walking to school, I felt the rain start.'],
      ['❌ Built in 1880, we admired the lighthouse. (We weren\'t built in 1880.)', '✓ Built in 1880, the lighthouse stood firm.'],
    ],
    rule_of_thumb: 'After an introductory -ing/-ed phrase, the noun that follows must be doing or being that action.'
  },
  'gu.adj_adv': {
    title: 'Adjective vs. adverb',
    body: [
      'Adjectives describe nouns. Adverbs describe verbs, adjectives, and other adverbs. Most (not all) adverbs end in -ly.',
      'After linking verbs (be, seem, feel, look, taste), use an adjective: "She seems happy," not "happily."'
    ],
    examples: [
      ['He runs quickly. (modifies "runs" → adverb)', 'The quick fox. (modifies "fox" → adjective)'],
      ['She felt bad. (linking verb, adjective)', 'She played badly. (action verb, adverb)']
    ],
    rule_of_thumb: 'Verb action → adverb. Linking verb / noun → adjective.'
  },
  'gu.idiom': {
    title: 'Idioms & prepositions',
    body: [
      'English idioms pair specific verbs and adjectives with specific prepositions. There\'s no rule — the pairing is conventional.',
      'The ACT tests common pairings: succeed in, capable of, different from, prohibit from, similar to, comply with, consist of.'
    ],
    examples: [
      ['He succeeded in the project. (NOT "succeeded at")', 'Capable of running a marathon. (NOT "capable to run")'],
      ['Different from her brother. (NOT "different than" on formal ACT)', 'Comply with the rules.']
    ],
    rule_of_thumb: 'When a preposition feels off, try saying it aloud — your ear usually knows the standard pairing.'
  },
  'gu.confused': {
    title: 'Commonly confused words',
    body: [
      'Pairs to memorize: affect (verb, "to influence") / effect (noun, "the result"). then (time) / than (comparison). its (possessive) / it\'s (it is). their / there / they\'re.',
      'For who/whom: who is the subject ("Who is calling?"). Whom is the object ("To whom did you give it?"). Modern usage tolerates "who" everywhere, but the ACT prefers the formal rule.'
    ],
    examples: [
      ['The new policy will affect attendance.', 'Verb form, "to influence."'],
      ['The effect was significant.', 'Noun, "the result."'],
      ['Bigger than I thought.', '"Than" for comparison.'],
      ['It\'s sitting on its shelf.', 'It\'s = it is; its = possessive (no apostrophe).']
    ],
    rule_of_thumb: 'Affect = verb, effect = noun. Then = time, than = comparison. Apostrophes don\'t make pronouns possessive.'
  },
  'pn.comma': {
    title: 'Commas',
    body: [
      'Five common ACT comma rules: (1) After an introductory phrase or dependent clause. (2) Before a coordinating conjunction (FANBOYS) joining two independent clauses. (3) Around non-essential modifiers. (4) Between items in a list of three or more. (5) Between coordinate adjectives.',
      'When in doubt: do NOT add a comma between subject and verb, between verb and object, or between an adjective and the noun it modifies.'
    ],
    examples: [
      ['After the movie, we went home. (rule 1)', 'I ran fast, but I missed the bus. (rule 2)'],
      ['My brother, who lives in Denver, is a teacher. (rule 3)', 'Apples, oranges, and pears. (rule 4)']
    ],
    rule_of_thumb: 'No comma between subject and verb — even if the sentence is long.'
  },
  'pn.semicolon': {
    title: 'Semicolons',
    body: [
      'A semicolon joins two independent clauses without a coordinating conjunction. It works as a near-period: both sides must stand alone as complete sentences.',
      'Also used in complex lists where individual items already contain commas, to keep items distinct.',
      'NEVER use a semicolon between a dependent clause and an independent clause, or between a noun and its modifier.'
    ],
    examples: [
      ['I love coffee; my brother prefers tea.', 'Two independent clauses → semicolon.'],
      ['We visited Paris, France; Rome, Italy; and Madrid, Spain.', 'Complex list with internal commas.']
    ],
    rule_of_thumb: 'Semicolons = stronger comma. Both sides must be full sentences — replace with a period to test.'
  },
  'pn.colon': {
    title: 'Colons',
    body: [
      'A colon must follow a complete independent clause. After the colon comes a list, a quote, or an explanation.',
      'On the ACT, the most common error is using a colon mid-clause, e.g., "She bought: apples, milk, and bread." Wrong — there\'s no complete clause before the colon.'
    ],
    examples: [
      ['He had one goal: to finish the marathon.', 'Complete clause + colon + explanation.'],
      ['She bought three things: apples, milk, and bread.', 'Complete clause + colon + list.']
    ],
    rule_of_thumb: 'Read what\'s before the colon. Is it a complete sentence? If no, the colon is wrong.'
  },
  'pn.dash': {
    title: 'Dashes',
    body: [
      'Em-dashes set off parenthetical or emphatic information. They work like commas or parentheses but signal a stronger break.',
      'Dashes used parenthetically MUST come in a matching pair: "— … —". A single dash mid-sentence has no closing partner is an error.',
      'A single em-dash at the end of a clause (not paired) is allowed for emphasis: "She had only one answer — no."'
    ],
    examples: [
      ['My favorite restaurant — the one on Maple Street — serves great pasta.', 'Matched pair.'],
      ['She said one thing — yes.', 'Single dash for emphasis at end.']
    ],
    rule_of_thumb: 'Pair punctuation symmetrically: — … —, ( … ), , … ,'
  },
  'pn.apostrophe': {
    title: 'Apostrophes',
    body: [
      'Two uses: possession (Sara\'s book, the dog\'s collar) and contractions (don\'t, it\'s, who\'s).',
      'Possessive pronouns DO NOT take apostrophes: its, his, hers, ours, theirs, whose. Apostrophes on these = error.',
      'Plural nouns get the apostrophe AFTER the s: "the dogs\' bowls" (multiple dogs).'
    ],
    examples: [
      ['It\'s clear the dog has lost its collar.', 'Contraction vs. possessive.'],
      ['The students\' essays. (multiple students)', 'The student\'s essay. (one student)']
    ],
    rule_of_thumb: 'Pronouns never take apostrophes. Apostrophes show contraction or possession on nouns.'
  },
  'ss.runon': {
    title: 'Run-ons & comma splices',
    body: [
      'Two independent clauses cannot be joined by just a comma (that\'s a comma splice). They cannot be joined by no punctuation at all (that\'s a fused sentence). Both are run-ons.',
      'Five fixes: (1) period, (2) semicolon, (3) comma + FANBOYS, (4) make one clause dependent with a subordinator like "because," "although," "if," (5) em-dash for emphatic break.'
    ],
    examples: [
      ['❌ I love coffee, my brother prefers tea.', '✓ I love coffee; my brother prefers tea. ✓ I love coffee, but my brother prefers tea.'],
    ],
    rule_of_thumb: 'Two independent clauses need stronger glue than a comma alone.'
  },
  'ss.fragment': {
    title: 'Sentence fragments',
    body: [
      'Every sentence needs a subject and a finite (conjugated) verb that match in person and number. A participle (-ing, -ed) by itself is not a finite verb.',
      'Common fragment forms: "The runner who finished first." (no main verb) "Walking through the park." (no subject + finite verb) "Although she was tired." (dependent clause alone)'
    ],
    examples: [
      ['❌ Running to catch the bus.', '✓ She was running to catch the bus.'],
      ['❌ A library that has 412 books.', '✓ The library has 412 books.']
    ],
    rule_of_thumb: 'Strip the modifiers; what\'s left needs a subject and a real verb.'
  },
  'ss.parallel': {
    title: 'Parallelism',
    body: [
      'Items in a list, comparison, or correlative pair must share grammatical form: all nouns, all gerunds, all infinitives, all clauses.',
      'On the ACT, mismatched parallel structure is one of the most common errors. Check lists: do all items match?'
    ],
    examples: [
      ['❌ She enjoys hiking, swimming, and to bike.', '✓ She enjoys hiking, swimming, and biking.'],
      ['❌ Not only did she finish but also winning.', '✓ Not only did she finish, but she also won.']
    ],
    rule_of_thumb: 'Lists, comparisons, correlatives — same grammatical form throughout.'
  },
  'ss.conjunction': {
    title: 'Conjunctions & clause relationships',
    body: [
      'Coordinating conjunctions (FANBOYS — for, and, nor, but, or, yet, so) join two independent clauses with a comma before.',
      'Subordinating conjunctions (because, although, since, while, if, when, unless) introduce a dependent clause that cannot stand alone.',
      'When the dependent clause comes first, use a comma. When the independent clause comes first, no comma is needed in most cases.'
    ],
    examples: [
      ['Because she was tired, she went home. (dep + comma + ind)', 'She went home because she was tired. (ind + dep, no comma)']
    ],
    rule_of_thumb: 'Subordinator at the front → comma after the dependent clause.'
  },
  'pw.transition': {
    title: 'Transitions',
    body: [
      'Transition words signal the logical relationship between sentences or paragraphs. Picking the wrong one is one of the easiest ACT errors to make.',
      'Categories: contrast (however, but, although, yet); addition (also, furthermore, moreover, in addition); cause/effect (therefore, thus, consequently, as a result); example (for example, for instance, specifically); time (then, later, now, today, eventually); emphasis (in fact, indeed).'
    ],
    examples: [
      ['❌ She studied hard. Therefore, she failed the test.', '✓ She studied hard. However, she failed the test.'],
      ['❌ I love coffee. For example, I drink three cups a day.', '✓ I love coffee. In fact, I drink three cups a day.']
    ],
    rule_of_thumb: 'Match the transition to the actual logical relationship — don\'t pick the one that "sounds smart."'
  },
  'pw.organization': {
    title: 'Organization & cohesion',
    body: [
      'A paragraph develops one main idea. Sentences should connect to each other through shared topic, repeated keywords, or logical progression.',
      'When asked to reorder sentences, look for: (1) which sentence introduces the topic, (2) which sentences provide examples or details, (3) which sentence concludes.',
      'Look for transitional cues: pronouns referring back ("This shift…"), demonstrative ("These results…"), and connector words ("As a result…").'
    ],
    examples: [
      ['Sentence 1 introduces a problem. Sentence 2 starts "However, the solution…" — sentence 2 must follow 1.']
    ],
    rule_of_thumb: 'Find the topic sentence; then sequence by logical or chronological flow.'
  },
  'pw.add_delete': {
    title: 'Add / delete / revise',
    body: [
      'Two-step approach: (1) Identify the paragraph\'s purpose. (2) Ask whether the proposed sentence advances that purpose.',
      'Common reasons to delete: stray detail, contradicts surrounding content, repeats earlier information, breaks the paragraph\'s focus.',
      'Common reasons to keep: provides relevant context, supplies a vivid example, makes an abstract claim concrete, transitions between sections.'
    ],
    examples: [
      ['Paragraph about a lighthouse\'s daily operations + proposed sentence about the architect\'s biography → delete (stray).'],
      ['Paragraph about climate change + proposed sentence with specific temperature data → keep (concrete support).']
    ],
    rule_of_thumb: 'Add/delete questions hinge on relevance, not on whether the fact is interesting.'
  },
  'pw.purpose': {
    title: 'Purpose & main idea',
    body: [
      'Purpose questions ask what the writer was trying to do (inform, persuade, narrate, describe). Match the answer to what the essay actually does, not what it could do.',
      'For passage-wide purpose questions at the end, the right answer must be specific enough to capture the essay\'s actual content but broad enough to cover the whole essay — not just one paragraph.'
    ],
    examples: [
      ['Essay describing five techniques used by honeybees → "describe a natural phenomenon" is correct, "advocate for bee conservation" is wrong (essay doesn\'t advocate).']
    ],
    rule_of_thumb: 'Purpose answer must match what the essay does, not what it could do.'
  },
  'kl.word_choice': {
    title: 'Word choice & tone',
    body: [
      'Pick the word whose register and connotation match the surrounding sentences. A formal essay calls for formal vocabulary; a personal narrative tolerates more colloquial words.',
      'When two words seem synonymous, look for the one that\'s most precise — slightly different shades of meaning matter on the ACT.'
    ],
    examples: [
      ['Formal essay: "uncomfortable" not "crappy."', 'Specific: "consequence" beats "thing that happens."']
    ],
    rule_of_thumb: 'Match register to context; pick the most precise option among synonyms.'
  },
  'kl.concision': {
    title: 'Concision & redundancy',
    body: [
      'On the ACT, when two answers say the same thing, the shorter one almost always wins.',
      'Watch for redundancies: "completely finish" (finish = completely done), "the reason is because" (use "the reason is that"), "free gift" (gifts are free).',
      'Also watch for filler phrases: "due to the fact that" → "because"; "in the event that" → "if"; "at this point in time" → "now."'
    ],
    examples: [
      ['❌ should not be taken literally too much in a way', '✓ should not be taken too literally'],
      ['❌ The reason for the delay is because the truck broke down.', '✓ The reason for the delay is that the truck broke down.']
    ],
    rule_of_thumb: 'Same meaning, shorter wording — pick shorter.'
  }
};

export function getMiniLesson(topicId) {
  return MINI_LESSONS[topicId] || null;
}
