// Question bank — 100 questions covering all topics in §8.
// Each question has all four §5 explanation fields populated.
// 75 passage-attached (15 per passage × 5 passages) + 25 standalones for drills.

export const QUESTIONS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PASSAGE 1 — Tillamook Rock Lighthouse (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'p1q01', passage_id: 'p1',
    stem: 'Which choice has the correct verb form to agree with the singular subject "lantern room"?',
    choices: { A: 'NO CHANGE', B: 'which were sitting', C: 'sat', D: 'OMIT the underlined portion' },
    correct_choice: 'A',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: ['kl.concision'], difficulty: 2,
    explanation_correct: 'The subject is "lantern room" — singular. "Which sat" is singular past tense ("the lantern room sat"), so subject and verb agree. The relative clause also adds the height detail without breaking sentence flow.',
    explanation_distractors: {
      B: '"were sitting" is plural and progressive — wrong number for "lantern room" and unnecessarily wordy.',
      C: 'Without "which," the verb "sat" is left dangling next to a preceding comma, producing an awkward and unclear sentence.',
      D: 'Omitting the portion deletes a meaningful detail (the height) that the rest of the passage relies on for impact.'
    },
    takeaway: 'On the ACT, "shorter" only wins when nothing important is lost.'
  },
  {
    id: 'p1q02', passage_id: 'p1',
    stem: 'Which punctuation correctly joins the items in this list of storm damage?',
    choices: {
      A: 'NO CHANGE (no punctuation)',
      B: ', flooded the kitchen,',
      C: '; flooded the kitchen,',
      D: ', flooded the kitchen and'
    },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.parallel'], difficulty: 2,
    explanation_correct: 'A list of three parallel verb phrases needs commas separating each item.',
    explanation_distractors: {
      A: 'Without a comma, the three items run together as one nonsensical clause.',
      C: 'Semicolons separate items only in complex lists where items already contain commas.',
      D: 'Adding "and" before the second item drops the conjunction before the third, breaking parallel structure.'
    },
    takeaway: 'List of three or more parallel items → commas between, "and" before the last.'
  },
  {
    id: 'p1q03', passage_id: 'p1',
    stem: 'Choose the option that maintains parallel structure across the list of tasks.',
    choices: { A: 'NO CHANGE (no punctuation)', B: '; cleaning', C: ', cleaning', D: ', they cleaned' },
    correct_choice: 'C',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: ['pn.comma'], difficulty: 3,
    explanation_correct: 'The three tasks are bailing, cleaning, and re-glazing — all gerunds. A comma keeps them parallel.',
    explanation_distractors: {
      A: 'No punctuation runs "bailing water cleaning" together.',
      B: 'Semicolons join independent clauses or items in a complex list; these are simple gerund phrases.',
      D: '"they cleaned" is a finite verb, breaking the gerund pattern.'
    },
    takeaway: 'Parallel lists keep the same grammatical form throughout.'
  },
  {
    id: 'p1q04', passage_id: 'p1',
    stem: 'Which choice best handles the relationship between the two clauses?',
    choices: { A: 'NO CHANGE', B: ', it paid well,', C: '. It paid well,', D: ': it paid well,' },
    correct_choice: 'A',
    primary_topic_id: 'pn.semicolon', secondary_topic_ids: ['ss.runon'], difficulty: 3,
    explanation_correct: 'Both halves are independent clauses. A semicolon properly links two related independent clauses.',
    explanation_distractors: {
      B: 'A comma alone between two independent clauses is a comma splice.',
      C: 'A period works grammatically but loses the close connection the semicolon signals.',
      D: 'A colon should introduce a list, quote, or explanatory phrase — not link two equal clauses.'
    },
    takeaway: 'Semicolon = period substitute. Both sides must be independent clauses.'
  },
  {
    id: 'p1q05', passage_id: 'p1',
    stem: 'Which punctuation best follows "Christianson" to introduce the descriptive clause?',
    choices: { A: 'NO CHANGE (no punctuation)', B: ',', C: ';', D: ' —' },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.fragment'], difficulty: 2,
    explanation_correct: 'A non-essential modifier ("served at the rock for twenty years…") attached to a proper noun needs a comma to set it off.',
    explanation_distractors: {
      A: 'Without punctuation, the proper noun runs into the modifier with no signal.',
      C: 'A semicolon would require an independent clause to follow, but "served at…" is a participial phrase.',
      D: 'An em-dash works grammatically but is overstrong for a routine biographical detail; the comma is the standard, neutral choice.'
    },
    takeaway: 'Set off non-essential descriptive phrases with commas.'
  },
  {
    id: 'p1q06', passage_id: 'p1',
    stem: 'Which choice best continues the paragraph\'s focus on Christianson\'s long tenure?',
    choices: {
      A: 'NO CHANGE',
      B: 'He often grew restless during the long winters.',
      C: 'Most lighthouse keepers worked shorter rotations.',
      D: 'OMIT the underlined sentence.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: ['pw.organization'], difficulty: 3,
    explanation_correct: 'The detail about the meticulous logbook reinforces Christianson\'s dedication, supporting the paragraph\'s focus on his long tenure.',
    explanation_distractors: {
      B: 'Restlessness contradicts the "never been bored" quote later in the paragraph.',
      C: 'Comparing rotation lengths shifts focus away from Christianson personally.',
      D: 'Deleting eliminates a relevant detail about the keeper\'s practices.'
    },
    takeaway: 'Add/delete questions reward content that develops the paragraph\'s established focus.'
  },
  {
    id: 'p1q07', passage_id: 'p1',
    stem: 'Which transition best fits the contrast in the underlined sentence?',
    choices: { A: 'NO CHANGE', B: 'Therefore,', C: 'Furthermore,', D: 'Meanwhile,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Although" sets up the contrast between loneliness and his claim of never being bored — a textbook contrast transition.',
    explanation_distractors: {
      B: '"Therefore" implies the loneliness caused his lack of boredom, which is the opposite of the intended contrast.',
      C: '"Furthermore" signals addition, not contrast.',
      D: '"Meanwhile" signals simultaneous action, not contrast.'
    },
    takeaway: 'Pick the transition word that matches the logical relationship between sentences.'
  },
  {
    id: 'p1q08', passage_id: 'p1',
    stem: 'The writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: {
      A: 'Kept, because it explains why the lighthouse became a columbarium.',
      B: 'Kept, because it adds a memorable historical detail consistent with the paragraph\'s focus.',
      C: 'Deleted, because it interrupts the paragraph\'s focus on the building\'s eventual use.',
      D: 'Deleted, because it contradicts the previous sentence.'
    },
    correct_choice: 'C',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: ['pw.organization'], difficulty: 4,
    explanation_correct: 'The paragraph traces the lighthouse from decommissioning to its present use as a columbarium. The detour about a real-estate sale interrupts that arc and is never developed.',
    explanation_distractors: {
      A: 'It does not explain the columbarium use — it describes a separate, earlier transaction.',
      B: 'Stray detail, not consistent with the paragraph\'s focus.',
      D: 'It does not contradict anything; it is simply unrelated.'
    },
    takeaway: 'Add/delete questions hinge on relevance to the paragraph\'s purpose, not interesting-ness.'
  },
  {
    id: 'p1q09', passage_id: 'p1',
    stem: 'Which choice is the most concise alternative?',
    choices: { A: 'NO CHANGE (of being disused)', B: 'of having been disused', C: 'of disuse', D: 'in which it was unused' },
    correct_choice: 'C',
    primary_topic_id: 'kl.concision', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Of disuse" is the cleanest noun phrase — three words shorter and exactly equivalent in meaning.',
    explanation_distractors: {
      A: 'Wordy passive construction.',
      B: 'Even wordier.',
      D: 'Adds a relative clause for no extra meaning.'
    },
    takeaway: 'When meaning is identical, the shorter answer wins.'
  },
  {
    id: 'p1q10', passage_id: 'p1',
    stem: 'Which option correctly punctuates the appositive describing the columbarium?',
    choices: { A: 'NO CHANGE', B: ', operated', C: '; operated', D: '. Operated' },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['gu.modifier'], difficulty: 3,
    explanation_correct: 'A participial modifier ("operated by a private foundation") describing the preceding noun needs a comma to set it off.',
    explanation_distractors: {
      A: 'No punctuation runs the modifier into the noun phrase awkwardly.',
      C: 'A semicolon requires an independent clause on each side; "operated by…" is a participial phrase.',
      D: 'Starting a new sentence with "Operated" creates a fragment.'
    },
    takeaway: 'Participial modifiers attached to nouns are usually set off with commas.'
  },
  {
    id: 'p1q11', passage_id: 'p1',
    stem: 'Which transition best opens this concluding paragraph?',
    choices: { A: 'NO CHANGE (On the other hand,)', B: 'For instance,', C: 'Today,', D: 'Consequently,' },
    correct_choice: 'C',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: '"Today" signals a shift to the present and frames the lighthouse\'s current symbolic meaning — the actual focus of this paragraph.',
    explanation_distractors: {
      A: '"On the other hand" implies contrast, but the paragraph is summarizing, not contrasting.',
      B: '"For instance" promises an example of the previous claim, but this paragraph zooms out.',
      D: '"Consequently" implies the previous paragraph caused the symbolism, which is too strong a claim.'
    },
    takeaway: 'Match transition word to actual logical relationship — not just to "transition-y" feel.'
  },
  {
    id: 'p1q12', passage_id: 'p1',
    stem: 'Which choice correctly punctuates the relative clause?',
    choices: {
      A: 'NO CHANGE (one, in which,)',
      B: 'one in which',
      C: 'one; in which',
      D: 'one: in which'
    },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.fragment'], difficulty: 3,
    explanation_correct: '"In which" introduces an essential restrictive clause defining the relationship being described — no commas needed.',
    explanation_distractors: {
      A: 'Commas around "in which" interrupt the essential definition.',
      C: 'Semicolon would require an independent clause to follow.',
      D: 'Colon would also need a complete clause on the left and is overformal here.'
    },
    takeaway: 'Restrictive (essential) clauses do NOT take commas; non-restrictive (extra info) ones do.'
  },
  {
    id: 'p1q13', passage_id: 'p1',
    stem: 'Which word best fits the contemplative tone of the closing paragraph?',
    choices: { A: 'NO CHANGE (uncomfortably)', B: 'kind of badly', C: 'crappily', D: 'sub-optimally' },
    correct_choice: 'A',
    primary_topic_id: 'kl.word_choice', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"Uncomfortably" matches the reflective, formal register the paragraph has built.',
    explanation_distractors: {
      B: '"Kind of badly" is colloquial and clashes with surrounding tone.',
      C: '"Crappily" is slang.',
      D: '"Sub-optimally" is jargon and breaks the human voice.'
    },
    takeaway: 'Pick the word whose register matches the surrounding sentences.'
  },
  {
    id: 'p1q14', passage_id: 'p1',
    stem: 'Which choice corrects the pronoun error?',
    choices: { A: 'NO CHANGE (who they would never see)', B: 'whom they would never see', C: 'that they would never see', D: 'whose they would never see' },
    correct_choice: 'C',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: ['gu.confused'], difficulty: 4,
    explanation_correct: '"Ships" are not people, so the relative pronoun "that" (or "which") is correct, not "who" or "whom."',
    explanation_distractors: {
      A: '"Who" is for people, not ships.',
      B: '"Whom" is also reserved for people.',
      D: '"Whose" can refer to non-humans but is possessive, which doesn\'t fit "they would never see."'
    },
    takeaway: 'Who/whom for people; that/which for things.'
  },
  {
    id: 'p1q15', passage_id: 'p1',
    stem: 'Suppose the writer\'s primary purpose was to inform readers about a unique historical site. Has the writer accomplished that purpose?',
    choices: {
      A: 'Yes, because the essay describes Tillamook Rock\'s history, conditions, and current use.',
      B: 'Yes, because the essay argues for the lighthouse\'s preservation.',
      C: 'No, because the essay focuses too narrowly on one keeper\'s biography.',
      D: 'No, because the essay does not explain why the lighthouse was built.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The essay covers the lighthouse\'s construction, daily operations, decommissioning, and present-day use — all informational.',
    explanation_distractors: {
      B: 'The essay does not argue for preservation; it describes.',
      C: 'Christianson is one detail among many; the essay\'s scope is broader.',
      D: 'While the construction date is given (1881), the question is whether the essay informs about a "unique historical site," which it does.'
    },
    takeaway: 'Purpose questions: judge whether the essay actually does what the prompt claims.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSAGE 2 — Armillaria fungus (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'p2q01', passage_id: 'p2',
    stem: 'Which choice produces a complete and grammatical sentence?',
    choices: { A: 'NO CHANGE (discovered)', B: 'discovering', C: 'who discovered', D: 'and discovered' },
    correct_choice: 'A',
    primary_topic_id: 'ss.fragment', secondary_topic_ids: ['gu.verb_tense'], difficulty: 2,
    explanation_correct: '"Discovered" is the main verb of the sentence — it gives the subject "Myron Smith" something to do.',
    explanation_distractors: {
      B: '"Discovering" is a participle, not a finite verb.',
      C: '"Who discovered" turns the verb into a relative clause, leaving no main verb.',
      D: '"And" implies a second verb, but "named" is a participle, not the main verb.'
    },
    takeaway: 'Every sentence needs a finite main verb. Strip the modifiers and check.'
  },
  {
    id: 'p2q02', passage_id: 'p2',
    stem: 'Which option correctly handles the "not X but Y" construction?',
    choices: { A: 'NO CHANGE (no comma)', B: ', but rather', C: '; but rather', D: '. But rather' },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.parallel'], difficulty: 3,
    explanation_correct: 'In "not X, but Y" constructions, a comma cleanly separates the two contrasted elements.',
    explanation_distractors: {
      A: 'Without a comma, the contrast runs together.',
      C: 'A semicolon would require an independent clause; "but rather one connected…" is not independent.',
      D: 'Starting a new sentence with "But rather" leaves a fragment.'
    },
    takeaway: '"Not X, but Y" pairs use a comma — both halves stay inside one sentence.'
  },
  {
    id: 'p2q03', passage_id: 'p2',
    stem: 'Which transition most effectively opens this paragraph?',
    choices: { A: 'For example,', B: 'In fact,', C: 'However,', D: 'NO CHANGE (no transition word)' },
    correct_choice: 'B',
    primary_topic_id: 'pw.transition', secondary_topic_ids: ['pw.organization'], difficulty: 3,
    explanation_correct: '"In fact" intensifies the previous claim that the fungus is one connected organism.',
    explanation_distractors: {
      A: '"For example" promises a specific instance, but the next sentence makes a broader claim.',
      C: '"However" signals contrast, but the new paragraph reinforces the previous one.',
      D: 'Without a transition the paragraph reads as if jumping topics.'
    },
    takeaway: 'Match the transition to the logical relationship: contrast, addition, example, or emphasis.'
  },
  {
    id: 'p2q04', passage_id: 'p2',
    stem: 'Which choice best completes the verb phrase to match the paragraph\'s past-tense narrative?',
    choices: { A: 'NO CHANGE (finding)', B: 'they found', C: 'and found', D: 'who found' },
    correct_choice: 'A',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: ['gu.verb_tense'], difficulty: 3,
    explanation_correct: '"Finding" is a participial phrase modifying the subject ("Smith and his colleagues") — it describes what they did while sampling DNA.',
    explanation_distractors: {
      B: '"They found" introduces a new clause without proper punctuation.',
      C: '"And found" adds a coordinating conjunction without a clear grammatical anchor.',
      D: '"Who found" creates a relative clause that disrupts the sentence flow.'
    },
    takeaway: 'Participial modifiers attach actions to subjects without starting a new clause.'
  },
  {
    id: 'p2q05', passage_id: 'p2',
    stem: 'The writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: {
      A: 'Kept, because it provides a relevant publication detail.',
      B: 'Kept, because it explains how the discovery became famous.',
      C: 'Deleted, because it interrupts the explanation of how the team confirmed the fungus\'s identity.',
      D: 'Deleted, because it contradicts the surrounding paragraph.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The detail about Nature publication is relevant context for a science narrative and is brief enough not to derail the paragraph.',
    explanation_distractors: {
      B: 'The sentence does not address fame; it just notes publication.',
      C: 'The DNA-confirmation explanation has already concluded by this point.',
      D: 'Nothing in the sentence contradicts surrounding content.'
    },
    takeaway: 'Brief, relevant details that don\'t derail the paragraph generally stay.'
  },
  {
    id: 'p2q06', passage_id: 'p2',
    stem: 'Which punctuation best introduces the question that follows?',
    choices: { A: 'NO CHANGE (colon)', B: ', namely', C: '; that is', D: '— that is —' },
    correct_choice: 'A',
    primary_topic_id: 'pn.colon', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'The clause before the colon is independent and the colon introduces what that question is — textbook colon use.',
    explanation_distractors: {
      B: '"Namely" introduces a clarification but pairs awkwardly with a preceding comma; the colon is cleaner.',
      C: '"That is" needs commas around it, not a semicolon.',
      D: 'Em-dashes work grammatically but the doubled construction is heavy and unnecessary.'
    },
    takeaway: 'Colon: complete sentence on the left, list/quote/explanation on the right.'
  },
  {
    id: 'p2q07', passage_id: 'p2',
    stem: 'Which choice maintains the descriptive flow of the sentence?',
    choices: { A: 'NO CHANGE', B: 'an area which is larger than 1,600 football fields', C: 'an area; larger than 1,600 football fields', D: 'OMIT the underlined portion' },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['pn.comma'], difficulty: 2,
    explanation_correct: 'The appositive "an area larger than 1,600 football fields" cleanly describes the acreage in concrete terms.',
    explanation_distractors: {
      B: '"Which is" adds wordiness without meaning.',
      C: 'A semicolon would require independent clauses on both sides.',
      D: 'Removing the comparison removes a vivid concrete detail.'
    },
    takeaway: 'Appositives describe nouns concisely; "which is" usually adds nothing.'
  },
  {
    id: 'p2q08', passage_id: 'p2',
    stem: 'How should the contrast between these two clauses be punctuated?',
    choices: { A: 'NO CHANGE', B: ', however,', C: '; however,', D: '. However,' },
    correct_choice: 'C',
    primary_topic_id: 'ss.runon', secondary_topic_ids: ['pn.semicolon', 'pw.transition'], difficulty: 3,
    explanation_correct: '"However" is a conjunctive adverb. To join two independent clauses with it, use a semicolon before and a comma after.',
    explanation_distractors: {
      A: 'Comma + however between two independent clauses creates a comma splice.',
      B: 'Same problem — commas alone cannot join two independent clauses.',
      D: 'A period works grammatically but breaks the logical close connection.'
    },
    takeaway: '"; however,"  links two independent clauses. ", however," does not.'
  },
  {
    id: 'p2q09', passage_id: 'p2',
    stem: 'Which choice corrects the agreement error in the underlined portion?',
    choices: { A: 'NO CHANGE', B: ', which allow', C: ', which allows', D: '— which allow —' },
    correct_choice: 'B',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: ['pn.comma'], difficulty: 4,
    explanation_correct: '"Which" refers to the plural list of conditions, so the verb must be plural: "allow." The clause is non-essential, so use a comma.',
    explanation_distractors: {
      A: '"allows" is singular but the antecedent is plural.',
      C: 'Comma fixes the punctuation but "allows" is still wrong number.',
      D: 'Em-dashes work, but "allow" is what fixes the agreement.'
    },
    takeaway: 'Find what "which" refers to. Match the verb to that antecedent.'
  },
  {
    id: 'p2q10', passage_id: 'p2',
    stem: 'Should the underlined sentence be kept or deleted?',
    choices: {
      A: 'Kept, because it adds a useful technical context for how scientists determine the fungus\'s age.',
      B: 'Kept, because it argues for funding more research.',
      C: 'Deleted, because the sentence contradicts the prior estimate.',
      D: 'Deleted, because it interrupts the paragraph\'s description of fungal habitats.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'A note about how the age estimate is calculated reinforces the previous claim and adds informational depth.',
    explanation_distractors: {
      B: 'The sentence is descriptive, not advocacy.',
      C: 'It does not contradict; it explains the methodology.',
      D: 'It supports the claim about age, which is part of the paragraph\'s subject.'
    },
    takeaway: 'Methodology details that support a numeric claim usually belong.'
  },
  {
    id: 'p2q11', passage_id: 'p2',
    stem: 'Which choice maintains parallel structure with the surrounding verbs?',
    choices: { A: 'NO CHANGE (release)', B: 'releasing', C: 'they release', D: 'and release' },
    correct_choice: 'A',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: ['pn.comma'], difficulty: 2,
    explanation_correct: 'The list is "decompose…, release…, and even transmit…" — three parallel present-tense verbs.',
    explanation_distractors: {
      B: '"Releasing" is a participle, breaking the verb pattern.',
      C: '"They release" introduces a second subject mid-list.',
      D: 'Adding "and" too early drops the conjunction needed before the final item.'
    },
    takeaway: 'In a series of three or more, the conjunction comes before the LAST item.'
  },
  {
    id: 'p2q12', passage_id: 'p2',
    stem: 'Which choice best signals the transition from established research to a more interpretive claim?',
    choices: { A: 'NO CHANGE (Some researchers, however,)', B: 'Some researchers,', C: 'However; some researchers', D: 'Some researchers — however —' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: ['pn.comma'], difficulty: 3,
    explanation_correct: 'The "however" signals that the next claim is more speculative than the preceding facts; commas correctly set off the parenthetical.',
    explanation_distractors: {
      B: 'Removing "however" loses the signal that this is a more tentative claim.',
      C: 'Semicolon followed by "some researchers" creates an awkward fragment.',
      D: 'Em-dashes are too emphatic for a routine "however" interjection.'
    },
    takeaway: 'Use a comma-bracketed "however" to flag a softer, contrasting claim.'
  },
  {
    id: 'p2q13', passage_id: 'p2',
    stem: 'Which choice is the most concise without losing meaning?',
    choices: {
      A: 'NO CHANGE (should not be taken too literally)',
      B: 'should really not be taken literally in too much of a way',
      C: 'is something that probably ought not to be taken literally to too great an extent',
      D: 'literally should not be taken too far in its interpretation as a metaphor'
    },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['kl.word_choice'], difficulty: 2,
    explanation_correct: '"should not be taken too literally" says exactly what is needed in seven words.',
    explanation_distractors: {
      B: 'Wordy and awkward.',
      C: 'Hedged padding for no informational gain.',
      D: 'Repeats "literally" and "metaphor" with circular phrasing.'
    },
    takeaway: 'When meaning is identical, the shorter answer wins.'
  },
  {
    id: 'p2q14', passage_id: 'p2',
    stem: 'Which choice best fits the present-perfect framing of the sentence ("have reshaped")?',
    choices: { A: 'NO CHANGE', B: 'reshape', C: 'reshaped', D: 'will reshape' },
    correct_choice: 'A',
    primary_topic_id: 'gu.verb_tense', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: '"Have reshaped" connects past discoveries to ongoing scientific influence — exactly the relationship present perfect expresses.',
    explanation_distractors: {
      B: '"Reshape" (simple present) suggests routine present action, not a finished influence.',
      C: '"Reshaped" (simple past) cuts off the link to the present.',
      D: '"Will reshape" implies the influence has not yet happened.'
    },
    takeaway: 'Present perfect for past actions whose effects continue into the present.'
  },
  {
    id: 'p2q15', passage_id: 'p2',
    stem: 'Which word completes the comparison correctly?',
    choices: { A: 'NO CHANGE (than)', B: 'then', C: 'as', D: 'from what' },
    correct_choice: 'A',
    primary_topic_id: 'gu.confused', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"Than" is the comparison word ("larger than"). "Then" refers to time.',
    explanation_distractors: {
      B: '"Then" is a time word.',
      C: '"Larger as" is not valid English.',
      D: '"Larger from what" is unidiomatic.'
    },
    takeaway: 'Comparisons use "than"; "then" is for time.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSAGE 3 — Honeybee hexagons (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'p3q01', passage_id: 'p3',
    stem: 'Which option best joins these two related claims?',
    choices: { A: 'NO CHANGE (and)', B: 'but', C: 'or', D: 'because' },
    correct_choice: 'A',
    primary_topic_id: 'ss.conjunction', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"And" correctly adds the second claim (the choice is not accidental) to the first (cells are hexagons).',
    explanation_distractors: {
      B: '"But" implies contrast, which doesn\'t exist here.',
      C: '"Or" implies alternatives, not addition.',
      D: '"Because" suggests the second claim caused the first, which reverses the logic.'
    },
    takeaway: 'Match the conjunction to the actual logical relationship.'
  },
  {
    id: 'p3q02', passage_id: 'p3',
    stem: 'Which choice best opens this paragraph by establishing chronology?',
    choices: { A: 'NO CHANGE', B: 'Once,', C: 'In some periods,', D: 'OMIT (start with "The Greek mathematician…")' },
    correct_choice: 'A',
    primary_topic_id: 'pw.organization', secondary_topic_ids: ['pw.transition'], difficulty: 2,
    explanation_correct: '"In the third century" anchors the paragraph in a specific era — useful for a paragraph that traces a 1,700-year history.',
    explanation_distractors: {
      B: '"Once" is vague and folkloric; doesn\'t fit the analytic tone.',
      C: '"In some periods" is even vaguer.',
      D: 'Removing the time anchor leaves the reader unsure when this happened.'
    },
    takeaway: 'Open historical paragraphs with a clear time anchor when one is available.'
  },
  {
    id: 'p3q03', passage_id: 'p3',
    stem: 'Which punctuation correctly sets off the parenthetical clause?',
    choices: { A: 'NO CHANGE (commas)', B: 'em-dashes', C: 'parentheses', D: 'no punctuation' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['gu.modifier'], difficulty: 2,
    explanation_correct: 'Commas are standard for non-essential conditional phrases; em-dashes and parentheses are correct alternatives but commas match the surrounding tone.',
    explanation_distractors: {
      B: 'Em-dashes work but are more emphatic than this routine condition warrants.',
      C: 'Parentheses are also valid but visually distancing.',
      D: 'No punctuation runs the conditional into the main clause.'
    },
    takeaway: 'For non-essential modifiers, commas are the default; dashes and parens are choices for emphasis.'
  },
  {
    id: 'p3q04', passage_id: 'p3',
    stem: 'Which transition best opens this sentence about Pappus\'s work?',
    choices: { A: 'NO CHANGE (However,)', B: 'Therefore,', C: 'Similarly,', D: 'Indeed,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: '"However" signals the contrast between Pappus\'s insight and his incomplete proof.',
    explanation_distractors: {
      B: '"Therefore" implies the prior sentence caused the proof to be incomplete.',
      C: '"Similarly" implies the next claim is parallel, but it\'s actually a limitation.',
      D: '"Indeed" implies emphasis on a previous point, not a counterpoint.'
    },
    takeaway: 'Contrast between strength and weakness → "however" or "but."'
  },
  {
    id: 'p3q05', passage_id: 'p3',
    stem: 'Which option correctly handles the verb form?',
    choices: { A: 'NO CHANGE (demonstrated)', B: 'demonstrating', C: 'has demonstrated', D: 'demonstrate' },
    correct_choice: 'A',
    primary_topic_id: 'gu.verb_tense', secondary_topic_ids: ['gu.subj_verb'], difficulty: 2,
    explanation_correct: 'Simple past "demonstrated" matches the historical narrative of a specific 1999 event.',
    explanation_distractors: {
      B: '"Demonstrating" is a participle and would leave the sentence without a finite verb.',
      C: 'Present perfect "has demonstrated" is grammatical but the date "1999" makes it sound oddly current.',
      D: '"Demonstrate" (present) clashes with the past-tense framing.'
    },
    takeaway: 'For historical events with specific dates, simple past is the default tense.'
  },
  {
    id: 'p3q06', passage_id: 'p3',
    stem: 'Should the writer keep or delete the underlined sentence about Hales\' earlier work?',
    choices: {
      A: 'Kept, because it provides relevant context about the mathematician\'s background.',
      B: 'Kept, because it explains why bees use hexagons.',
      C: 'Deleted, because it introduces an unrelated geometry problem.',
      D: 'Deleted, because it interrupts the chronological narrative.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'Mentioning Hales\' earlier proof (Kepler conjecture) provides context for his approach to the honeycomb proof — relevant biographical detail.',
    explanation_distractors: {
      B: 'The sentence does not explain bee behavior.',
      C: 'The two problems are linked by similar techniques, as the sentence states.',
      D: 'It does interrupt slightly but the connection is justified.'
    },
    takeaway: 'Background details that enrich the narrative\'s context tend to belong.'
  },
  {
    id: 'p3q07', passage_id: 'p3',
    stem: 'Which choice provides the clearest topic sentence for this paragraph?',
    choices: {
      A: 'NO CHANGE (The visible mouths of honeycomb cells are flat hexagons; the back of each cell is…)',
      B: 'Honeycomb cells have a complicated shape that is not just hexagonal.',
      C: 'Bees do many surprising things in their hives.',
      D: 'There are many ways to construct a cell wall.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.organization', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The original directly introduces the structural detail (flat front, rhombic back) that the rest of the paragraph develops.',
    explanation_distractors: {
      B: 'Vague — "complicated shape" doesn\'t prepare for the specific rhombic detail.',
      C: 'Too general; doesn\'t set up the geometric discussion.',
      D: 'Off-topic — the paragraph is specifically about cell shape.'
    },
    takeaway: 'A good topic sentence previews the specific content of the paragraph.'
  },
  {
    id: 'p3q08', passage_id: 'p3',
    stem: 'Which choice maintains the writer\'s analytic tone?',
    choices: { A: 'NO CHANGE', B: 'These rhombic ends are kind of wasteful with wax.', C: 'These rhombic ends gobble up wax.', D: 'These rhombic ends use a hilariously huge amount of wax.' },
    correct_choice: 'A',
    primary_topic_id: 'kl.word_choice', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"Slightly more wax than a perfect hexagonal tube would" is precise and matches the surrounding analytic register.',
    explanation_distractors: {
      B: '"Kind of wasteful" is informal and imprecise.',
      C: '"Gobble up" is colloquial.',
      D: '"Hilariously huge" is wildly out of register and inaccurate (it\'s a small difference).'
    },
    takeaway: 'Match register to the rest of the passage.'
  },
  {
    id: 'p3q09', passage_id: 'p3',
    stem: 'Which choice best resolves the punctuation and verb form together?',
    choices: { A: 'NO CHANGE', B: 'efficient settle for', C: 'efficient, settle for', D: 'efficient, would settle for' },
    correct_choice: 'D',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['gu.verb_tense'], difficulty: 4,
    explanation_correct: 'The intervening modifier "evolved over millions of years to be efficient" is non-essential and needs a closing comma. "Would settle" matches the speculative framing of "Why would bees…?"',
    explanation_distractors: {
      A: 'Original is missing the closing comma after the parenthetical.',
      B: 'Removes both commas, eliminating the parenthetical setoff entirely.',
      C: 'Closes the parenthetical correctly but uses bare "settle" (clashes with "Why would bees…?" framing).'
    },
    takeaway: 'Parenthetical phrases need matching commas, AND the verb form must match the question framing.'
  },
  {
    id: 'p3q10', passage_id: 'p3',
    stem: 'Which transition most precisely opens this paragraph?',
    choices: { A: 'NO CHANGE (The answer appears to be structural.)', B: 'Surprisingly, scientists have figured this out.', C: 'There is no consensus.', D: 'It turns out that bees are weird.' },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: ['kl.word_choice'], difficulty: 2,
    explanation_correct: '"The answer appears to be structural" directly answers the question posed at the end of the previous paragraph.',
    explanation_distractors: {
      B: 'Vague and informal.',
      C: 'Contradicts the actual content of the paragraph.',
      D: 'Off-register and content-free.'
    },
    takeaway: 'When a paragraph answers a previous question, its opening should signal that answer.'
  },
  {
    id: 'p3q11', passage_id: 'p3',
    stem: 'Which choice corrects the modifier?',
    choices: { A: 'NO CHANGE (doubling)', B: 'doubles', C: 'which doubles', D: 'and doubling' },
    correct_choice: 'A',
    primary_topic_id: 'gu.modifier', secondary_topic_ids: ['ss.parallel'], difficulty: 3,
    explanation_correct: '"Doubling…" is a participial phrase modifying the action described in the prior clause — the geometry "allows two layers to nest, doubling storage."',
    explanation_distractors: {
      B: '"Doubles" creates a new finite verb, fragmenting the sentence.',
      C: '"Which doubles" is a relative clause that could refer to the wrong noun.',
      D: '"And doubling" introduces a coordinator without a parallel partner.'
    },
    takeaway: 'Use participles to attach a result-modifier to a previous clause.'
  },
  {
    id: 'p3q12', passage_id: 'p3',
    stem: 'Which option fixes the punctuation error?',
    choices: { A: 'NO CHANGE (structural; integrity)', B: 'structural integrity', C: 'structural: integrity', D: 'structural, integrity' },
    correct_choice: 'B',
    primary_topic_id: 'pn.semicolon', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"Structural integrity" is a single noun phrase — no internal punctuation belongs between the adjective and the noun.',
    explanation_distractors: {
      A: 'Semicolon between adjective and noun is a serious error.',
      C: 'Colon between adjective and noun is also wrong.',
      D: 'Comma between adjective and noun is wrong unless there are coordinate adjectives, which is not the case.'
    },
    takeaway: 'No punctuation belongs between an adjective and the noun it modifies.'
  },
  {
    id: 'p3q13', passage_id: 'p3',
    stem: 'Which choice provides the strongest topic sentence for this concluding paragraph?',
    choices: {
      A: 'NO CHANGE (What honeybees seem to "know" — though…)',
      B: 'Bees are interesting insects.',
      C: 'Engineering is hard.',
      D: 'OMIT this sentence and start with "Real-world structures…"'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The original frames the concluding insight — that bee design balances trade-offs — and prepares the reader for the explicit lesson.',
    explanation_distractors: {
      B: 'Vague generality.',
      C: 'Off-topic.',
      D: 'Removes the framing that ties bee behavior to the engineering lesson.'
    },
    takeaway: 'Conclusions should explicitly frame the takeaway, not assume the reader will infer it.'
  },
  {
    id: 'p3q14', passage_id: 'p3',
    stem: 'Should the underlined sentence be kept or deleted?',
    choices: {
      A: 'Kept, because it states the engineering principle the essay illustrates.',
      B: 'Kept, because it provides a personal anecdote.',
      C: 'Deleted, because it strays from the bee topic.',
      D: 'Deleted, because it repeats earlier material.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: ['pw.purpose'], difficulty: 3,
    explanation_correct: 'The sentence makes the essay\'s engineering thesis explicit — exactly what a closing paragraph should do.',
    explanation_distractors: {
      B: 'No anecdote is offered.',
      C: 'It abstracts from the bee topic to a general principle, which is appropriate for a conclusion.',
      D: 'It generalizes earlier material rather than repeating.'
    },
    takeaway: 'Conclusions earn their place by stating the broader principle, not just summarizing.'
  },
  {
    id: 'p3q15', passage_id: 'p3',
    stem: 'Which item completes the parallel list ("materials, weight, and load")?',
    choices: { A: 'NO CHANGE (weight)', B: 'weighing', C: 'their weight', D: 'a heavy weight' },
    correct_choice: 'A',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: 'The list "materials, weight, and load" is three parallel nouns.',
    explanation_distractors: {
      B: '"Weighing" is a gerund, breaking the noun pattern.',
      C: '"Their weight" inserts a possessive without parallel logic.',
      D: '"A heavy weight" adds an adjective without symmetry.'
    },
    takeaway: 'In a list of nouns, every item should be a bare noun unless all are parallel modified.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSAGE 4 — Snow-rolling and city streets (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'p4q01', passage_id: 'p4',
    stem: 'Which option produces the most concise grammatical sentence?',
    choices: { A: 'NO CHANGE', B: 'winter streets had not been being plowed', C: 'plowing winter streets was not done', D: 'they did not plow winter streets' },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['gu.verb_tense'], difficulty: 2,
    explanation_correct: '"Winter streets were not plowed" is the cleanest passive past form.',
    explanation_distractors: {
      B: 'Triple-stacked auxiliaries are needlessly heavy.',
      C: 'Awkward nominalization ("plowing… was not done").',
      D: 'Unspecified "they" is vague.'
    },
    takeaway: 'On the ACT, simpler verb constructions usually win.'
  },
  {
    id: 'p4q02', passage_id: 'p4',
    stem: 'Which relative pronoun fits the antecedent "crews"?',
    choices: { A: 'NO CHANGE (who)', B: 'whom', C: 'which', D: 'that' },
    correct_choice: 'A',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Who" is correct for people (the crew members) acting as the subject of "would harness."',
    explanation_distractors: {
      B: '"Whom" is for objects of verbs/prepositions, not subjects.',
      C: '"Which" is for things, not people.',
      D: '"That" can refer to people informally but "who" is preferred and clearer.'
    },
    takeaway: 'Subject of the relative clause + people = "who."'
  },
  {
    id: 'p4q03', passage_id: 'p4',
    stem: 'Which punctuation best introduces the explanation that follows?',
    choices: { A: 'NO CHANGE (colon)', B: 'comma', C: 'semicolon', D: 'period' },
    correct_choice: 'A',
    primary_topic_id: 'pn.colon', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'The colon introduces the explanation that follows ("sleighs and sleds traveled faster…") — its core function.',
    explanation_distractors: {
      B: 'Comma is too weak to introduce a full clause of explanation.',
      C: 'Semicolon would treat the two halves as parallel rather than as setup-and-explanation.',
      D: 'Period works grammatically but loses the "here\'s why" effect.'
    },
    takeaway: 'Colons signal "here is what I mean" — perfect for explanations.'
  },
  {
    id: 'p4q04', passage_id: 'p4',
    stem: 'Which placement of the parenthetical phrase best preserves sentence flow?',
    choices: { A: 'NO CHANGE (after Boston)', B: 'before Merchants', C: 'before looked forward', D: 'at the end of the sentence' },
    correct_choice: 'A',
    primary_topic_id: 'pw.organization', secondary_topic_ids: ['gu.modifier'], difficulty: 3,
    explanation_correct: '"For example" placed mid-sentence after the subject smoothly clarifies that Boston is one instance.',
    explanation_distractors: {
      B: 'Starting with "For example" is fine in some sentences but forces awkward repetition here.',
      C: 'Placing it after the subject and verb interrupts the verb phrase.',
      D: 'End placement orphans the example tag.'
    },
    takeaway: 'Mid-sentence "for example" is most natural when the subject is already named.'
  },
  {
    id: 'p4q05', passage_id: 'p4',
    stem: 'Which choice is the most precise word here?',
    choices: { A: 'NO CHANGE (additional)', B: 'extra special', C: 'bonus', D: 'kinda more' },
    correct_choice: 'A',
    primary_topic_id: 'kl.word_choice', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: '"Additional" is precise and formally appropriate.',
    explanation_distractors: {
      B: '"Extra special" is colloquial and redundant.',
      C: '"Bonus" connotes a reward, not a top-up.',
      D: '"Kinda more" is informal slang.'
    },
    takeaway: 'Pick the precise, formal word.'
  },
  {
    id: 'p4q06', passage_id: 'p4',
    stem: 'Which choice produces the cleanest, most concise sentence?',
    choices: { A: 'worked well, until', B: 'worked well until', C: 'worked well; until', D: 'worked: well, until' },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.conjunction', 'kl.concision'], difficulty: 2,
    explanation_correct: 'No comma is needed before "until" when it introduces a tight subordinate clause; the streamlined version reads cleaner.',
    explanation_distractors: {
      A: 'The comma is defensible for emphasis, but the cleaner option drops it.',
      C: 'A semicolon needs an independent clause on each side; "until automobiles arrived" is dependent.',
      D: 'The colon breaks the sentence in the wrong place.'
    },
    takeaway: 'When a dependent clause follows the main clause, omit the comma unless you specifically need a pause for emphasis.'
  },
  {
    id: 'p4q07', passage_id: 'p4',
    stem: 'Which choice handles the contrast with horses most concisely?',
    choices: {
      A: 'something that horses, which spread their weight, never had a problem with',
      B: 'a problem horses never had — they spread their weight…',
      C: 'horses never had this problem; their weight spread across…',
      D: 'a problem that horses, spreading their weight over four hooves, never had'
    },
    correct_choice: 'D',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['gu.modifier'], difficulty: 4,
    explanation_correct: 'D uses a participial modifier ("spreading their weight") that attaches cleanly to "horses" and reads concisely.',
    explanation_distractors: {
      A: 'Wordy; "something that horses…never had a problem with" trails off.',
      B: 'Em-dash addition is overstrong; structure is also asymmetric.',
      C: 'Splits into two clauses, losing the smooth modifier-and-clarification pattern.'
    },
    takeaway: 'When attaching a clarifier to a noun, prefer a tight participial modifier.'
  },
  {
    id: 'p4q08', passage_id: 'p4',
    stem: 'Which transition best opens this sentence about driver preferences?',
    choices: { A: 'NO CHANGE (Worse,)', B: 'In summary,', C: 'Despite this,', D: 'Therefore,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Worse" intensifies the previous problem (cars stuck in snow) by introducing an additional grievance — drivers wanted bare pavement.',
    explanation_distractors: {
      B: '"In summary" implies a conclusion, but the paragraph is still building grievances.',
      C: '"Despite this" implies the next claim contradicts; it actually adds to the problem.',
      D: '"Therefore" implies causation, which is wrong.'
    },
    takeaway: '"Worse" / "moreover" / "additionally" → the next thing intensifies the previous one.'
  },
  {
    id: 'p4q09', passage_id: 'p4',
    stem: 'Which sentence best captures the key contrast?',
    choices: {
      A: 'NO CHANGE',
      B: 'New technology was good, but old technology was bad.',
      C: 'There was a problem with strategies.',
      D: 'OMIT — start the next sentence directly.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: ['ss.parallel'], difficulty: 3,
    explanation_correct: 'The original frames the policy conflict in parallel terms ("demanded one strategy; the old technology…demanded the opposite") — clear and rhetorically balanced.',
    explanation_distractors: {
      B: 'Reduces a nuanced trade-off to a moral judgment.',
      C: 'Vague.',
      D: 'Removes the explicit framing of the conflict.'
    },
    takeaway: 'Parallel constructions sharpen contrast; replace them only when they\'re wrong.'
  },
  {
    id: 'p4q10', passage_id: 'p4',
    stem: 'Which option best handles the abrupt-but-resolved rhythm of this sentence?',
    choices: { A: 'NO CHANGE (Cities chose the cars.)', B: 'After much deliberation, the matter was resolved.', C: 'It was decided.', D: 'And so, the cars triumphed in the end.' },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['kl.word_choice'], difficulty: 2,
    explanation_correct: 'The original is short, punchy, and matches the essay\'s lean prose.',
    explanation_distractors: {
      B: 'Wordy and bureaucratic.',
      C: 'Vague — "It was decided" omits the agent (Cities).',
      D: 'Ornate and editorial.'
    },
    takeaway: 'When a short, declarative sentence works, prefer it.'
  },
  {
    id: 'p4q11', passage_id: 'p4',
    stem: 'Which choice opens this paragraph with the appropriate emphasis on consequences?',
    choices: { A: 'NO CHANGE (The shift had unexpected costs.)', B: 'Shifts often happen.', C: 'Unexpected costs always come.', D: 'OMIT — let the next sentence stand alone.' },
    correct_choice: 'A',
    primary_topic_id: 'pw.organization', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'The topic sentence directly previews the paragraph: the shift to plows had hidden costs.',
    explanation_distractors: {
      B: 'Generic.',
      C: 'Generic and unsupported.',
      D: 'Removing the topic sentence weakens the paragraph\'s structure.'
    },
    takeaway: 'A clear topic sentence makes the next sentences feel earned.'
  },
  {
    id: 'p4q12', passage_id: 'p4',
    stem: 'Which choice is the cleanest verb form?',
    choices: { A: 'NO CHANGE (requiring)', B: 'which required', C: 'and required', D: 'so they required' },
    correct_choice: 'A',
    primary_topic_id: 'gu.modifier', secondary_topic_ids: ['ss.parallel'], difficulty: 3,
    explanation_correct: '"Requiring expensive de-icing chemicals…" is a participial phrase neatly attached to the previous clause.',
    explanation_distractors: {
      B: 'Adds wordiness without changing meaning.',
      C: '"And required" creates an additional clause without parallel structure.',
      D: 'Pronoun "they" refers awkwardly.'
    },
    takeaway: 'Participles attach result-clauses cleanly without spawning new finite verbs.'
  },
  {
    id: 'p4q13', passage_id: 'p4',
    stem: 'Which option best continues the list of consequences from the previous sentence?',
    choices: { A: 'NO CHANGE (In addition,)', B: 'For example,', C: 'However,', D: 'Specifically,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"In addition" adds another consequence (salt washing into streams) to the prior one (de-icing chemicals).',
    explanation_distractors: {
      B: 'This is not an example of the prior consequence — it\'s a new consequence.',
      C: '"However" implies contrast.',
      D: '"Specifically" implies a narrowing of the prior point, but the salt-runoff is a new point.'
    },
    takeaway: '"In addition" / "furthermore" / "moreover" → adding another item of the same kind.'
  },
  {
    id: 'p4q14', passage_id: 'p4',
    stem: 'Which is the most precise word?',
    choices: { A: 'NO CHANGE (consequences)', B: 'effects', C: 'aftermath', D: 'fallout' },
    correct_choice: 'A',
    primary_topic_id: 'kl.word_choice', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Consequences" precisely names downstream effects of a deliberate choice — fitting the policy narrative.',
    explanation_distractors: {
      B: '"Effects" is acceptable but more generic.',
      C: '"Aftermath" connotes disaster, overstating the situation.',
      D: '"Fallout" is similarly disaster-flavored.'
    },
    takeaway: 'When two near-synonyms compete, pick the one whose connotation matches the situation.'
  },
  {
    id: 'p4q15', passage_id: 'p4',
    stem: 'Which transition opens this final paragraph appropriately?',
    choices: { A: 'NO CHANGE (Nowadays,)', B: 'In conclusion,', C: 'Therefore,', D: 'However,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Nowadays" pivots to current practice — exactly what this paragraph describes (modern brining experiments).',
    explanation_distractors: {
      B: '"In conclusion" is too formal/academic for this informal essay.',
      C: '"Therefore" implies causation from prior paragraph, which is too tight.',
      D: '"However" implies contrast, but the paragraph extends rather than contradicts.'
    },
    takeaway: 'Time-shift transitions ("today," "now," "currently") are perfect for jumping to present practice.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSAGE 5 — Stillwell Library (15 questions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'p5q01', passage_id: 'p5',
    stem: 'Which choice provides the most concise relative clause?',
    choices: { A: 'NO CHANGE (most of which were donated)', B: 'most of which had been donated', C: 'most donated', D: 'and most being donated' },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['gu.verb_tense'], difficulty: 2,
    explanation_correct: '"Most of which were donated" is the standard relative-clause form and matches the past-tense narrative.',
    explanation_distractors: {
      B: 'Past perfect "had been donated" is unnecessary; no earlier past event is being referenced.',
      C: '"Most donated" is a fragment without a verb.',
      D: '"And most being donated" is awkward and not grammatical.'
    },
    takeaway: 'Use simple past for events that just happened in the narrative\'s timeline.'
  },
  {
    id: 'p5q02', passage_id: 'p5',
    stem: 'Which punctuation correctly introduces the direct quotation?',
    choices: { A: 'NO CHANGE (comma)', B: 'colon', C: 'no punctuation', D: 'semicolon' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'A comma is standard for introducing a direct quotation that follows the speech-tag verb "wrote."',
    explanation_distractors: {
      B: 'A colon would also be acceptable but commas are more common with verbs of speaking.',
      C: 'No punctuation runs the quote into the speaker tag.',
      D: 'Semicolon is wrong — it requires independent clauses on both sides.'
    },
    takeaway: 'Comma + " for short direct quotations after verbs of speaking; colon for longer or formal ones.'
  },
  {
    id: 'p5q03', passage_id: 'p5',
    stem: 'Which option corrects the relative pronoun?',
    choices: { A: 'NO CHANGE (who\'s)', B: 'whose', C: 'who is', D: 'that\'s' },
    correct_choice: 'B',
    primary_topic_id: 'gu.confused', secondary_topic_ids: ['pn.apostrophe'], difficulty: 1,
    explanation_correct: '"Whose" is the possessive relative pronoun ("whose population"). "Who\'s" is the contraction of "who is."',
    explanation_distractors: {
      A: '"Who\'s" means "who is" and doesn\'t fit possession.',
      C: '"Who is population" is ungrammatical.',
      D: '"That\'s" is the contraction of "that is" and is wrong here too.'
    },
    takeaway: 'Whose = possession. Who\'s = "who is." Apostrophes don\'t make possession of pronouns.'
  },
  {
    id: 'p5q04', passage_id: 'p5',
    stem: 'Which transition best opens this paragraph about the library\'s rising reputation?',
    choices: { A: 'NO CHANGE (However,)', B: 'For example,', C: 'In contrast,', D: 'Moreover,' },
    correct_choice: 'A',
    primary_topic_id: 'pw.transition', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"However" signals the shift from the small-village quietude (prior paragraph) to the unexpected reputation in the 1950s.',
    explanation_distractors: {
      B: 'Not an example of the previous claim.',
      C: '"In contrast" is too sharp — the shift is gradual, not directly opposed.',
      D: '"Moreover" implies adding another similar fact, but this is a turn.'
    },
    takeaway: '"However" is the workhorse contrast transition — broad and flexible.'
  },
  {
    id: 'p5q05', passage_id: 'p5',
    stem: 'Which choice is the most concise way to say this?',
    choices: { A: 'NO CHANGE (including dozens of unpublished accounts from the abolition movement)', B: 'including dozens of unpublished accounts that came from the abolition movement', C: 'including a number of accounts (which had not been published) from the abolition movement', D: 'OMIT the underlined portion' },
    correct_choice: 'A',
    primary_topic_id: 'kl.concision', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'The original is the cleanest of the four; "from the abolition movement" works as a postnominal modifier.',
    explanation_distractors: {
      B: '"That came from" adds words without meaning.',
      C: 'Parenthetical aside is grammatical but wordy.',
      D: 'Removing the detail loses the most vivid example of the collection\'s value.'
    },
    takeaway: 'Postnominal "from" phrases are tighter than "that came from" relative clauses.'
  },
  {
    id: 'p5q06', passage_id: 'p5',
    stem: 'Which option correctly punctuates the appositive describing the librarian?',
    choices: { A: 'NO CHANGE (commas)', B: 'em-dashes', C: 'parentheses', D: 'no punctuation' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['gu.modifier'], difficulty: 1,
    explanation_correct: 'Standard appositive punctuation: commas around a non-essential descriptor.',
    explanation_distractors: {
      B: 'Em-dashes are too emphatic for a routine biographical detail.',
      C: 'Parentheses are valid but more visually distancing than the writer\'s tone calls for.',
      D: 'No punctuation runs the appositive into the noun.'
    },
    takeaway: 'Commas are the default for appositives; reserve dashes and parens for emphasis or interruption.'
  },
  {
    id: 'p5q07', passage_id: 'p5',
    stem: 'Should the writer keep or delete the underlined sentence?',
    choices: {
      A: 'Kept, because it gives concrete evidence of the library\'s reach.',
      B: 'Kept, because it identifies which universities specifically.',
      C: 'Deleted, because it shifts focus to universities rather than the library.',
      D: 'Deleted, because it adds nothing not already implied.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.add_delete', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'Concrete details (researchers writing ahead, traveling hours) substantiate the prior claim that the library was lending nationally.',
    explanation_distractors: {
      B: 'No specific universities are named.',
      C: 'The focus stays on the library — the universities are mentioned only as users.',
      D: 'It\'s not implied; the prior sentence stated reach but didn\'t describe behavior.'
    },
    takeaway: 'Concrete behavior details strengthen abstract claims.'
  },
  {
    id: 'p5q08', passage_id: 'p5',
    stem: 'Which choice maintains parallel structure?',
    choices: { A: 'NO CHANGE (donated, not purchased)', B: 'donations, not purchases', C: 'they were donating, not purchasing', D: 'donated, but not purchased' },
    correct_choice: 'A',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Donated" and "purchased" are both past participles modifying "collections" — clean parallel.',
    explanation_distractors: {
      B: 'Switches to nouns, breaking the participle pattern.',
      C: 'Adds subject-verb construction, shifting voice.',
      D: '"But" is grammatical but redundant; "not" alone signals contrast.'
    },
    takeaway: 'Parallel pairs use the same grammatical form on both sides.'
  },
  {
    id: 'p5q09', passage_id: 'p5',
    stem: 'Which transition opens this paragraph appropriately?',
    choices: { A: 'NO CHANGE (Then came the digital era.)', B: 'Eventually, things happened.', C: 'And then,', D: 'OMIT — start with "The trustees…"' },
    correct_choice: 'A',
    primary_topic_id: 'pw.organization', secondary_topic_ids: ['kl.word_choice'], difficulty: 2,
    explanation_correct: '"Then came the digital era" is a vivid topic sentence that signals a new chapter and frames the paragraph\'s focus.',
    explanation_distractors: {
      B: 'Vague.',
      C: 'Awkward and informal.',
      D: 'Removes a useful chapter-opening signal.'
    },
    takeaway: 'Vivid topic sentences earn their place by clearly opening a new section.'
  },
  {
    id: 'p5q10', passage_id: 'p5',
    stem: 'Which option resolves the punctuation issue?',
    choices: { A: 'NO CHANGE (arguing)', B: ', they argued', C: ' — arguing', D: '. Arguing' },
    correct_choice: 'A',
    primary_topic_id: 'gu.modifier', secondary_topic_ids: ['ss.parallel'], difficulty: 3,
    explanation_correct: '"Arguing that the value…" is a participial modifier attached to the trustees\' decision — clean and parallel.',
    explanation_distractors: {
      B: '"They argued" adds a new clause without proper coordination.',
      C: 'Em-dash is too emphatic.',
      D: 'Period leaves "Arguing…" as a fragment.'
    },
    takeaway: 'Participial modifiers attach without inflating the clause count.'
  },
  {
    id: 'p5q11', passage_id: 'p5',
    stem: 'Which verb form best matches the surrounding past-tense narrative?',
    choices: { A: 'NO CHANGE (had been scanned)', B: 'is scanned', C: 'will be scanned', D: 'is being scanned' },
    correct_choice: 'A',
    primary_topic_id: 'gu.verb_tense', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'Past perfect ("had been scanned") fits the historical timeline — by 2010, the scanning was already complete, before later events in the narrative.',
    explanation_distractors: {
      B: '"Is scanned" is present tense and clashes with the past-tense narrative.',
      C: '"Will be scanned" is future tense — the event is in the past relative to the narrator.',
      D: '"Is being scanned" is present progressive — wrong tense.'
    },
    takeaway: 'Match verb tense to the surrounding narrative timeline.'
  },
  {
    id: 'p5q12', passage_id: 'p5',
    stem: 'Which is the strongest topic sentence for this concluding paragraph?',
    choices: {
      A: 'NO CHANGE (The library today still operates from Eleanor\'s original brick building…)',
      B: 'Libraries are interesting institutions.',
      C: 'The history of the library is long.',
      D: 'Eleanor would be proud.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: ['pw.organization'], difficulty: 2,
    explanation_correct: 'Original anchors the closing paragraph in the present-day library and primes the contrast between physical building and online millions.',
    explanation_distractors: {
      B: 'Generic.',
      C: 'Vague restatement.',
      D: 'Editorial speculation.'
    },
    takeaway: 'Strong concluding paragraphs anchor on a concrete present-day image.'
  },
  {
    id: 'p5q13', passage_id: 'p5',
    stem: 'Which option corrects the comma error?',
    choices: { A: 'NO CHANGE (building, with)', B: 'building with', C: 'building; with', D: 'building. With' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'Comma is correct here, separating the main clause from a non-essential descriptive prepositional phrase.',
    explanation_distractors: {
      B: 'No comma runs the descriptor into the noun without breath.',
      C: 'Semicolon needs an independent clause; "with the same…" is a phrase.',
      D: 'Period creates a fragment.'
    },
    takeaway: 'Comma sets off non-essential prepositional descriptors at the end of a clause.'
  },
  {
    id: 'p5q14', passage_id: 'p5',
    stem: 'Which choice corrects the subject-verb agreement?',
    choices: { A: 'NO CHANGE (has crept)', B: 'have crept', C: 'are creeping', D: 'creep' },
    correct_choice: 'A',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Population" is singular, so the verb is "has crept."',
    explanation_distractors: {
      B: '"Have crept" is plural; subject is singular.',
      C: '"Are creeping" is plural and shifts tense.',
      D: '"Creep" is plural.'
    },
    takeaway: 'Collective nouns like "population" usually take singular verbs in standard ACT English.'
  },
  {
    id: 'p5q15', passage_id: 'p5',
    stem: 'The closing question asks whether the essay supports the view that small institutions can have outsized influence. The essay best supports this view by:',
    choices: {
      A: 'showing how a 412-book village library became a national research resource through dedicated curation.',
      B: 'arguing that all small libraries should digitize.',
      C: 'comparing Stillwell to other Vermont libraries.',
      D: 'criticizing larger libraries for not preserving regional records.'
    },
    correct_choice: 'A',
    primary_topic_id: 'pw.purpose', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The essay narrates how Stillwell\'s curated collection grew from local donation into a national resource — a textbook "outsized influence" arc.',
    explanation_distractors: {
      B: 'No general advocacy is made.',
      C: 'No comparison to other libraries is offered.',
      D: 'No criticism of larger libraries.'
    },
    takeaway: 'Big-picture purpose questions: pick the choice that summarizes the essay as written, not as imagined.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STANDALONE QUESTIONS (25) — for drills
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 's01', passage_id: null,
    stem: 'The committee, along with its chairperson, ____ to release a final report next month.',
    choices: { A: 'plan', B: 'plans', C: 'are planning', D: 'have planned' },
    correct_choice: 'B',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Committee" is a singular collective noun. "Along with its chairperson" is a parenthetical interrupter.',
    explanation_distractors: {
      A: '"Plan" is plural; the singular subject "committee" needs a singular verb.',
      C: 'Plural verb with a singular subject.',
      D: '"Have planned" is plural and tense doesn\'t match "next month."'
    },
    takeaway: 'Cross out interrupters between subject and verb to expose the real agreement question.'
  },
  {
    id: 's02', passage_id: null,
    stem: 'Each of the runners ____ expected to finish before sunset.',
    choices: { A: 'are', B: 'were', C: 'is', D: 'have been' },
    correct_choice: 'C',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Each" is always grammatically singular.',
    explanation_distractors: {
      A: '"Are" is plural; "Each" is singular.',
      B: 'Plural and wrong tense.',
      D: 'Plural.'
    },
    takeaway: 'Each, every, either, neither, none — all singular on the ACT.'
  },
  {
    id: 's03', passage_id: null,
    stem: 'Walking through the museum, the ancient pottery ____.',
    choices: { A: 'caught my eye', B: 'I noticed the ancient pottery', C: 'was particularly fascinating to me', D: 'displays were vibrant' },
    correct_choice: 'B',
    primary_topic_id: 'gu.modifier', secondary_topic_ids: ['ss.fragment'], difficulty: 3,
    explanation_correct: '"Walking through the museum" must describe a person who can walk. Choice B puts "I" right after the comma.',
    explanation_distractors: {
      A: 'Pottery cannot walk through a museum.',
      C: 'Same problem — pottery as subject can\'t walk.',
      D: 'Displays cannot walk either.'
    },
    takeaway: 'After an introductory -ing modifier, the subject must be the thing doing that action.'
  },
  {
    id: 's04', passage_id: null,
    stem: 'Each member of the band practices longer than ____.',
    choices: { A: 'me', B: 'I do', C: 'mine', D: 'myself' },
    correct_choice: 'B',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The implied comparison is "longer than I [practice]." Subject pronoun + verb makes the comparison clear.',
    explanation_distractors: {
      A: '"Me" is an object pronoun; the comparison demands a subject.',
      C: '"Mine" is possessive.',
      D: '"Myself" is reflexive.'
    },
    takeaway: 'In comparisons, expand the implied verb to test pronoun case.'
  },
  {
    id: 's05', passage_id: null,
    stem: 'The teacher gave the assignment to Maria and ____.',
    choices: { A: 'I', B: 'me', C: 'myself', D: 'mine' },
    correct_choice: 'B',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: 'The pronoun is the object of the preposition "to," so it takes the object form "me."',
    explanation_distractors: {
      A: '"I" is a subject pronoun.',
      C: '"Myself" requires the subject to be "I" elsewhere.',
      D: '"Mine" is possessive.'
    },
    takeaway: 'Drop the other person to test pronoun case: "to me," not "to I."'
  },
  {
    id: 's06', passage_id: null,
    stem: 'By the time we arrived at the theater, the movie ____ already.',
    choices: { A: 'started', B: 'had started', C: 'has started', D: 'starts' },
    correct_choice: 'B',
    primary_topic_id: 'gu.verb_tense', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'Past perfect ("had started") for one past action completed before another.',
    explanation_distractors: {
      A: 'Simple past leaves the order ambiguous.',
      C: 'Present perfect clashes with "we arrived."',
      D: 'Present tense doesn\'t fit past narrative.'
    },
    takeaway: 'Two past events in sequence → past perfect for the earlier one.'
  },
  {
    id: 's07', passage_id: null,
    stem: '____ going to the concert tonight, even though it\'s raining.',
    choices: { A: 'There', B: 'Their', C: "They're", D: 'Theyre' },
    correct_choice: 'C',
    primary_topic_id: 'gu.confused', secondary_topic_ids: ['pn.apostrophe'], difficulty: 1,
    explanation_correct: '"They\'re" = "they are," fitting "are going."',
    explanation_distractors: {
      A: '"There" indicates location.',
      B: '"Their" shows possession.',
      D: 'Missing apostrophe — not a word.'
    },
    takeaway: 'their / there / they\'re: possessive / location / "they are."'
  },
  {
    id: 's08', passage_id: null,
    stem: 'The recipe calls for flour, sugar, eggs ____ butter.',
    choices: { A: ', and', B: ' and', C: '; and', D: ', and,' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: 'Three or more items: comma before the conjunction (Oxford comma preferred on ACT).',
    explanation_distractors: {
      B: 'No comma omits the Oxford comma.',
      C: 'Semicolons separate items only when items contain commas.',
      D: 'No reason for comma after "and."'
    },
    takeaway: 'ACT list rule: items, items, items, AND items.'
  },
  {
    id: 's09', passage_id: null,
    stem: 'My brother who lives in Denver is a teacher; ____ visits us every summer.',
    choices: { A: 'who', B: 'he', C: 'which', D: 'and' },
    correct_choice: 'B',
    primary_topic_id: 'ss.runon', secondary_topic_ids: ['gu.pronoun'], difficulty: 2,
    explanation_correct: 'After a semicolon, an independent clause is required. "He visits…" is independent.',
    explanation_distractors: {
      A: '"Who visits…" is dependent.',
      C: '"Which" is for non-human antecedents.',
      D: 'Adding "and" after a semicolon is redundant.'
    },
    takeaway: 'After a semicolon, both halves must stand alone as full sentences.'
  },
  {
    id: 's10', passage_id: null,
    stem: 'Sarah enjoys hiking, swimming, and ____.',
    choices: { A: 'to bike', B: 'biking', C: 'she bikes', D: 'her biking' },
    correct_choice: 'B',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: 'Two gerunds (hiking, swimming) demand a third gerund: biking.',
    explanation_distractors: {
      A: '"To bike" is an infinitive.',
      C: '"She bikes" is a finite clause.',
      D: '"Her biking" is possessive + gerund.'
    },
    takeaway: 'Parallel lists keep the same word form throughout.'
  },
  {
    id: 's11', passage_id: null,
    stem: 'The new policy will likely ____ student attendance positively.',
    choices: { A: 'effect', B: 'affect', C: 'effects', D: 'affects' },
    correct_choice: 'B',
    primary_topic_id: 'gu.confused', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: '"Affect" is the verb meaning "to influence." After "will likely" we need a base-form verb.',
    explanation_distractors: {
      A: '"Effect" as a verb means "to bring about" — wrong meaning here.',
      C: '"Effects" is a noun.',
      D: 'Wrong form after "will likely."'
    },
    takeaway: 'Affect = verb, "to influence." Effect = noun, "the result."'
  },
  {
    id: 's12', passage_id: null,
    stem: 'Although she was tired ____ Maya finished writing the essay before midnight.',
    choices: { A: ',', B: ';', C: ':', D: ' (no punctuation)' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.conjunction'], difficulty: 2,
    explanation_correct: 'Intro dependent clause + comma + main clause.',
    explanation_distractors: {
      B: 'Semicolon needs an independent clause on the left.',
      C: 'Colon also needs a complete clause on the left.',
      D: 'No punctuation runs clauses together.'
    },
    takeaway: 'Intro dependent clause + comma + main clause.'
  },
  {
    id: 's13', passage_id: null,
    stem: 'My favorite restaurant — the one on Maple Street ____ serves the best pasta in town.',
    choices: { A: '—', B: ',', C: '(', D: ';' },
    correct_choice: 'A',
    primary_topic_id: 'pn.dash', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'Em-dashes used parenthetically must come in matching pairs.',
    explanation_distractors: {
      B: 'Comma cannot close a phrase opened with an em-dash.',
      C: 'Open parenthesis can\'t close an em-dash.',
      D: 'Semicolon doesn\'t pair with dash.'
    },
    takeaway: 'Parenthetical punctuation comes in matching pairs: , … , — … — ( … ).'
  },
  {
    id: 's14', passage_id: null,
    stem: 'The hikers reached the summit ____ they unpacked their lunch.',
    choices: { A: ', and', B: 'and', C: ', and,', D: 'so' },
    correct_choice: 'A',
    primary_topic_id: 'pn.comma', secondary_topic_ids: ['ss.conjunction'], difficulty: 2,
    explanation_correct: 'Two independent clauses joined by FANBOYS need a comma before the conjunction.',
    explanation_distractors: {
      B: 'No comma → comma splice / run-on between two independent clauses.',
      C: 'No reason for a comma after "and."',
      D: '"So" without a leading comma also creates a run-on, and "so" implies causation that the sentence doesn\'t establish.'
    },
    takeaway: 'Independent clause + , + FANBOYS + independent clause.'
  },
  {
    id: 's15', passage_id: null,
    stem: 'Which revision of the underlined sentence is the most concise and grammatical? "Due to the book\'s lateness in being returned, a fine was charged to the patron."',
    choices: {
      A: 'NO CHANGE',
      B: 'The book, due to lateness in being returned, charged a fine to the patron.',
      C: 'Because the book was returned late, the library charged the patron a fine.',
      D: 'Lateness in returning the book caused a charging of the patron with a fine.'
    },
    correct_choice: 'C',
    primary_topic_id: 'kl.concision', secondary_topic_ids: ['gu.modifier'], difficulty: 3,
    explanation_correct: 'C uses active voice with a clear subject (the library) doing a clear action (charged a fine), and identifies the cause briefly.',
    explanation_distractors: {
      A: 'Passive ("a fine was charged") and wordy ("lateness in being returned").',
      B: 'Dangling modifier — the book, not the library, would be "charging" a fine.',
      D: 'Awkward nominalization ("a charging of the patron") and unidiomatic.'
    },
    takeaway: 'Prefer active voice with a clear subject doing a clear action.'
  },
  {
    id: 's16', passage_id: null,
    stem: 'Neither the manager nor the employees ____ aware of the change.',
    choices: { A: 'was', B: 'were', C: 'is', D: 'has been' },
    correct_choice: 'B',
    primary_topic_id: 'gu.subj_verb', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'In "neither X nor Y" constructions, the verb agrees with the closer subject ("employees" → plural).',
    explanation_distractors: {
      A: '"Was" agrees with "manager" but the closer subject is plural "employees."',
      C: '"Is" is wrong tense and number.',
      D: '"Has been" is singular.'
    },
    takeaway: 'Neither/Nor and Either/Or: verb agrees with the closer subject.'
  },
  {
    id: 's17', passage_id: null,
    stem: 'The professor ____ lectures we attended last semester is publishing a new book.',
    choices: { A: 'who\'s', B: 'whose', C: 'who', D: 'that' },
    correct_choice: 'B',
    primary_topic_id: 'gu.confused', secondary_topic_ids: ['pn.apostrophe'], difficulty: 2,
    explanation_correct: '"Whose" shows possession — the lectures belong to the professor.',
    explanation_distractors: {
      A: '"Who\'s" = "who is."',
      C: '"Who" doesn\'t express possession.',
      D: '"That" doesn\'t fit possessive context.'
    },
    takeaway: 'Whose = possessive. Who\'s = "who is."'
  },
  {
    id: 's18', passage_id: null,
    stem: 'Not only did she finish the marathon, ____ she also set a personal record.',
    choices: { A: 'and', B: 'but', C: 'or', D: 'so' },
    correct_choice: 'B',
    primary_topic_id: 'ss.parallel', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'The correlative pair is "Not only X but also Y."',
    explanation_distractors: {
      A: '"And" doesn\'t pair with "not only."',
      C: '"Or" implies alternatives.',
      D: '"So" implies causation.'
    },
    takeaway: 'Correlative conjunctions come in fixed pairs: not only…but also; either…or; neither…nor; both…and.'
  },
  {
    id: 's19', passage_id: null,
    stem: 'The artist\'s style — bold, geometric, and unmistakably modern ____ has influenced a generation of painters.',
    choices: { A: '—', B: ',', C: ';', D: ' (no punctuation)' },
    correct_choice: 'A',
    primary_topic_id: 'pn.dash', secondary_topic_ids: [], difficulty: 3,
    explanation_correct: 'The opening em-dash needs a closing em-dash to wrap the parenthetical.',
    explanation_distractors: {
      B: 'Mismatched punctuation pair.',
      C: 'Semicolon doesn\'t pair with em-dash.',
      D: 'Without closing punctuation, the parenthetical bleeds into the main clause.'
    },
    takeaway: 'Parenthetical punctuation must match: dash + dash, comma + comma, paren + paren.'
  },
  {
    id: 's20', passage_id: null,
    stem: 'Despite the rain ____ the outdoor concert proceeded as planned.',
    choices: { A: 'NO CHANGE (no comma)', B: ',', C: ':', D: ';' },
    correct_choice: 'B',
    primary_topic_id: 'pn.comma', secondary_topic_ids: [], difficulty: 1,
    explanation_correct: 'A contrastive introductory phrase ("Despite the rain") signals a setup–payoff structure that calls for a comma before the main clause.',
    explanation_distractors: {
      A: 'No comma runs the contrastive intro into the main clause without the expected pause.',
      C: 'Colon would require an independent clause on the left and would introduce an explanation, not the main clause.',
      D: 'Semicolon needs an independent clause on the left; "Despite the rain" is a phrase, not a clause.'
    },
    takeaway: 'Contrastive intro phrases (Despite, Although, Even though) typically take a comma.'
  },
  {
    id: 's21', passage_id: null,
    stem: 'The reason for the delay ____ that the truck broke down on the highway.',
    choices: { A: 'is because', B: 'is that', C: 'is, because', D: 'is, that' },
    correct_choice: 'B',
    primary_topic_id: 'gu.idiom', secondary_topic_ids: ['kl.concision'], difficulty: 3,
    explanation_correct: '"The reason is that…" is the standard idiom; "the reason is because" is redundant.',
    explanation_distractors: {
      A: '"Reason is because" is redundant — "reason" already implies "because."',
      C: 'Comma is unnecessary.',
      D: 'Comma is unnecessary.'
    },
    takeaway: 'Avoid "the reason is because…"; say "the reason is that…"'
  },
  {
    id: 's22', passage_id: null,
    stem: 'Between you and ____, this project is far behind schedule.',
    choices: { A: 'I', B: 'me', C: 'myself', D: 'mine' },
    correct_choice: 'B',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: [], difficulty: 2,
    explanation_correct: 'After the preposition "between," use the object pronoun "me."',
    explanation_distractors: {
      A: '"I" is a subject pronoun.',
      C: '"Myself" requires "I" elsewhere as the subject.',
      D: '"Mine" is possessive.'
    },
    takeaway: 'After prepositions (between, with, to), use object pronouns: me, him, her, us, them.'
  },
  {
    id: 's23', passage_id: null,
    stem: 'The novel\'s ____ to capture the era is what makes it remarkable.',
    choices: { A: 'uniqueness', B: 'unique ability', C: 'most unique ability', D: 'very unique gift' },
    correct_choice: 'B',
    primary_topic_id: 'kl.word_choice', secondary_topic_ids: ['kl.concision'], difficulty: 3,
    explanation_correct: '"Unique ability" pairs the precise adjective with a noun that takes an infinitive complement ("ability to capture") — clean and idiomatic.',
    explanation_distractors: {
      A: '"Uniqueness to capture" is unidiomatic — abstract nouns don\'t take infinitive complements like that.',
      C: '"Most unique" is redundant — unique is absolute (something either is or isn\'t unique).',
      D: '"Very unique" is also redundant; uniqueness has no degrees.'
    },
    takeaway: '"Unique" is absolute — never "more unique," "very unique," or "most unique."'
  },
  {
    id: 's24', passage_id: null,
    stem: 'The tour guide pointed out the cathedral, ____ stained-glass windows are nearly 600 years old.',
    choices: { A: 'who\'s', B: 'whose', C: 'which', D: 'who\'ve' },
    correct_choice: 'B',
    primary_topic_id: 'gu.pronoun', secondary_topic_ids: ['gu.confused'], difficulty: 3,
    explanation_correct: '"Whose" can refer to non-humans and signals possession of the windows by the cathedral.',
    explanation_distractors: {
      A: '"Who\'s" = "who is."',
      C: '"Which" doesn\'t express possession.',
      D: '"Who\'ve" = "who have" — wrong number and not possessive.'
    },
    takeaway: '"Whose" can refer to things, not just people, when expressing possession.'
  },
  {
    id: 's25', passage_id: null,
    stem: 'After completing the experiment, ____ that the original hypothesis was incorrect.',
    choices: {
      A: 'it became clear to the researchers',
      B: 'the data revealed',
      C: 'the researchers concluded',
      D: 'it was concluded by the researchers'
    },
    correct_choice: 'C',
    primary_topic_id: 'gu.modifier', secondary_topic_ids: ['kl.concision'], difficulty: 3,
    explanation_correct: '"After completing the experiment" requires a subject that can complete experiments — the researchers.',
    explanation_distractors: {
      A: '"It" cannot complete an experiment — dangling modifier.',
      B: 'Data cannot "complete the experiment" in the agentive sense.',
      D: 'Passive construction with "it" creates a dangling modifier and is wordy.'
    },
    takeaway: 'After an introductory action phrase, the subject must be the actor.'
  }
];

import { QUESTIONS_MORE }  from './questions_more.js';
import { QUESTIONS_MORE2 } from './questions_more2.js';

const ALL = [...QUESTIONS, ...QUESTIONS_MORE, ...QUESTIONS_MORE2];
const byId = new Map(ALL.map(q => [q.id, q]));

export function getQuestion(id) { return byId.get(id); }
export function allQuestions() { return [...ALL]; }

export function questionsForTopic(topicId) {
  return ALL.filter(q =>
    q.primary_topic_id === topicId ||
    (q.secondary_topic_ids || []).includes(topicId)
  );
}

export function questionsForPassage(passageId) {
  return ALL.filter(q => q.passage_id === passageId);
}

export function questionsForDifficulty(diff) {
  if (diff === 'mixed') return [...ALL];
  const ranges = { easy: [1, 2], medium: [3], hard: [4, 5] };
  const range = ranges[diff] || [1, 2, 3, 4, 5];
  return ALL.filter(q => range.includes(q.difficulty));
}
