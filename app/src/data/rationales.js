// Per-topic "why" rationales. Plain-English explanations of WHY the rule
// exists, in language a high-schooler can absorb. Surfaced in the explanation
// panel so students don't just memorize rules — they understand the reason.
export const RATIONALES = {
  'gu.subj_verb':
    "English grammar tags every verb as either singular or plural so the listener can match the action to who's doing it. When the subject and verb don't match in number, the sentence sounds 'off' and ambiguous — your brain has to do extra work to figure out who's acting. The ACT tests this because professional writing always keeps subject and verb visibly aligned.",
  'gu.pronoun':
    "Pronouns inherit identity from their antecedent — the noun they replace. If the case (subject vs object) or number (singular vs plural) doesn't match, the reader has to stop and figure out who's being referenced. The rule exists to keep referents unambiguous so writing flows.",
  'gu.verb_tense':
    "Verb tense is how English tells you WHEN something happened. Switching tenses without a real change in time fractures the timeline and confuses the reader. Past perfect ('had done') exists specifically to mark that one past event happened BEFORE another — without it, sequence becomes unclear.",
  'gu.modifier':
    "A modifier (a phrase like 'walking through the park') needs an actor to attach to. English convention is that the actor is the noun right after the comma. When the wrong noun lands there, the sentence literally claims something impossible — like rain walking to school — even if the meaning is obvious. The rule exists to keep sentences logically watertight.",
  'gu.adj_adv':
    "Adjectives modify nouns; adverbs modify verbs, adjectives, and other adverbs. Different word classes get different forms (quick vs quickly) so readers can instantly tell what's being described. Linking verbs (be, seem, feel) are the special case — they connect the subject to a description, so the description is an adjective.",
  'gu.idiom':
    "Idioms are conventional preposition pairings ('capable OF', 'different FROM') that English speakers learned by ear. They don't follow a logical rule — they're just what sounds right. The ACT tests them because professional writing follows the conventional pairing, not the literal one.",
  'gu.confused':
    "Pairs like its/it's, than/then, who's/whose came from words that historically diverged — same sound, different meaning. The apostrophe always signals contraction (it's = it is, who's = who is); the version without is possessive. Mixing them up makes the meaning genuinely ambiguous, which is why the rule survives.",
  'pn.comma':
    "Commas are the silent traffic lights of a sentence — they tell the reader where to slow down, pause, and group ideas. Without them, three list items run together as one phrase, introductory clauses bleed into the main clause, and non-essential information hides in plain sight. Each comma rule exists to prevent a specific ambiguity.",
  'pn.semicolon':
    "A semicolon is a period that pretends to be a comma — it joins two independent clauses while signaling they're tightly related. The 'two independent clauses' rule exists because anything weaker (a fragment) on either side would just make the sentence ungrammatical without warning.",
  'pn.colon':
    "A colon means: 'here's what I just promised.' It introduces a list, a quote, or an explanation that completes the thought of the clause to its left. The rule that the LEFT side must be a complete sentence exists because the colon signals a payoff — and you can't deliver a payoff to an incomplete setup.",
  'pn.dash':
    "Em-dashes set off parenthetical asides with EMPHASIS — they're louder than commas and more abrupt than parentheses. The 'matching pair' rule (dash...dash) exists because the reader needs to know exactly where the aside ends; otherwise the rest of the sentence loses its anchor.",
  'pn.apostrophe':
    "Apostrophes do two jobs: mark contractions (don't, it's) and mark possession (Sara's). Possessive PRONOUNS (its, his, hers, theirs, ours, yours) never take apostrophes — they evolved as inherently possessive forms, so adding an apostrophe is redundant. That's why 'it's' always means 'it is.'",
  'ss.runon':
    "Two complete sentences need real punctuation between them — a period, semicolon, or comma+conjunction. A bare comma (the comma splice) is the most common error because the writer can hear that the two ideas are related but didn't reach for stronger glue. The rule exists because, without it, sentence boundaries vanish.",
  'ss.fragment':
    "A complete sentence needs a subject AND a finite verb. Words like 'which' and 'that' demote a verb into a relative clause — the verb still exists but it's no longer the MAIN verb, so the sentence has nothing standing on its own. The rule exists because fragments leave the reader waiting for a payoff that never comes.",
  'ss.parallel':
    "When you list or compare items, the human brain expects them to share the same grammatical shape. Mismatched shapes ('hiking, swimming, and to bike') force the reader to mentally re-align — the meaning is still there, but the rhythm breaks. The rule exists for clarity AND for cadence.",
  'ss.conjunction':
    "Conjunctions tell you the LOGICAL relationship between two ideas: addition (and), contrast (but), choice (or), cause (because, since), result (so). Picking the wrong one isn't a typo — it changes what the sentence claims. The ACT tests this to check that you're tracking meaning, not just grammar.",
  'pw.transition':
    "Transition words (however, therefore, in addition, meanwhile) are signposts. They warn the reader what KIND of relationship the next sentence has to the previous one. The wrong transition lies to the reader — and the ACT loves to put a contrast transition where the actual relationship is addition (or vice versa).",
  'pw.organization':
    "Good writing has a shape: each paragraph develops one idea, sentences within it support that idea, and the order builds a case. Organization questions test whether you can feel that shape — knowing where a sentence belongs (or doesn't) is a reading skill more than a grammar skill.",
  'pw.add_delete':
    "The ACT loves to test 'should we keep this sentence?' Decisions hinge on RELEVANCE to the paragraph's purpose, not on whether the sentence is interesting. A vivid detail that wanders off-topic still loses; a plain sentence that nails the topic still wins. The rule exists because tight writing is on-topic writing.",
  'pw.purpose':
    "Purpose questions ask: did the essay actually do what the prompt claims it did? You judge by what's ON THE PAGE, not by what could have been there. The rule exists because real audiences (graders, editors, readers) evaluate text by what it accomplishes, not by what it intends.",
  'kl.word_choice':
    "Word choice combines meaning AND register. 'Aftermath' technically means 'what came after' but its connotation is disastrous — wrong for a routine policy outcome. The ACT tests precision because professional writing matches the connotation of every word to the situation.",
  'kl.concision':
    "Wordy English isn't elegant — it makes the reader work harder for the same meaning. The ACT's bias toward shorter answers reflects a real-world rule: when two versions mean the same thing, the shorter one is almost always better. The rule exists to train you to spot redundancy and cut it."
};

export function getRationale(topicId) {
  return RATIONALES[topicId] || null;
}
