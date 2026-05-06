// Tap-the-error interactive exercises, keyed by topic id.
// Each exercise breaks a sentence into tokens; the student clicks the token
// they think contains the error. Tokens with `is_error: true` are correct.
//
// Token shapes:
//   { type: 'static', text: '...' }       — non-clickable plain text
//   { type: 'word',   text: '...', is_error?: true } — clickable

const t = (text) => ({ type: 'static', text });
const w = (text, is_error) => ({ type: 'word', text, is_error: !!is_error });

export const INTERACTIVES = {
  'gu.subj_verb': {
    title: 'Find the wrong verb',
    instruction: 'One verb in this sentence does not agree with its subject. Click it.',
    tokens: [
      t('The '), w('box'), t(' of crackers '), w('are', true), t(' on the counter.')
    ],
    feedback: '"Box" is the singular subject. The verb should be "is."',
    explanation: 'Cross out the prepositional interrupter "of crackers." The bare subject is "box" — singular. The verb must be singular: "is."'
  },
  'gu.pronoun': {
    title: 'Find the wrong pronoun',
    instruction: 'One pronoun is in the wrong case. Click it.',
    tokens: [
      t('The teacher gave the assignment to Maria and '), w('I', true), t('.')
    ],
    feedback: 'After the preposition "to," you need an object pronoun.',
    explanation: 'Drop "Maria and" and re-read: "gave the assignment to I" sounds wrong. The right pronoun is "me."'
  },
  'gu.confused': {
    title: 'Find the wrong word',
    instruction: 'One word in this sentence is the wrong member of a commonly-confused pair. Click it.',
    tokens: [
      t('She runs faster '), w('then', true), t(' her brother does.')
    ],
    feedback: '"Then" refers to time; "than" is the comparison word.',
    explanation: '"Faster than" is a comparison. "Then" only works for sequence in time ("we ate, then we left").'
  },
  'pn.comma': {
    title: 'Find the missing comma spot',
    instruction: 'One spot in this sentence is missing a needed comma — click the word that comes RIGHT AFTER where the comma should go.',
    tokens: [
      t('After the long flight '), w('I', true), t(' fell asleep on the couch.')
    ],
    feedback: 'A comma belongs after introductory phrases of more than a couple of words.',
    explanation: '"After the long flight" is an introductory prepositional phrase. Set it off with a comma: "After the long flight, I fell asleep…"'
  },
  'pn.semicolon': {
    title: 'Find the wrong semicolon',
    instruction: 'One punctuation mark is wrong. Click it.',
    tokens: [
      t('The trail was steep'), w(';', true), t(' rocky'), t(', and slick with rain.')
    ],
    feedback: 'Semicolons join two independent clauses, not list items.',
    explanation: '"Rocky" and "slick with rain" are not independent clauses — they\'re list items. Use a comma here: "steep, rocky, and slick with rain."'
  },
  'pn.colon': {
    title: 'Find the wrong colon',
    instruction: 'A colon must follow a complete sentence. One colon here breaks that rule. Click it.',
    tokens: [
      t('My favorite snacks are'), w(':', true), t(' apples, popcorn, and cheese.')
    ],
    feedback: 'A colon needs a complete sentence on its left.',
    explanation: '"My favorite snacks are" is not a complete sentence by itself — it needs an object. Drop the colon: "My favorite snacks are apples, popcorn, and cheese."'
  },
  'pn.apostrophe': {
    title: 'Find the wrong apostrophe',
    instruction: 'One word here uses an apostrophe wrong. Click it.',
    tokens: [
      t('The dog wagged '), w("it's", true), t(' tail happily.')
    ],
    feedback: '"It\'s" = "it is." For possession, use "its" with no apostrophe.',
    explanation: 'Possessive pronouns (its, his, hers, theirs) never take an apostrophe. The contraction "it\'s" means "it is."'
  },
  'ss.runon': {
    title: 'Find the comma splice',
    instruction: 'Two complete sentences are joined by just a comma. Click the comma.',
    tokens: [
      t('The rain stopped'), w(',', true), t(' the kids ran outside.')
    ],
    feedback: 'A comma cannot join two independent clauses on its own.',
    explanation: 'Both halves stand alone as sentences ("The rain stopped." / "The kids ran outside."). Use a period, semicolon, or comma + FANBOYS conjunction.'
  },
  'ss.fragment': {
    title: 'Find the fragment-maker',
    instruction: 'One word turns this into a sentence fragment. Click it.',
    tokens: [
      t('The lighthouse '), w('which', true), t(' stood on the cliff for a hundred years.')
    ],
    feedback: '"Which" makes "stood on the cliff…" a relative clause and leaves the sentence with no main verb.',
    explanation: 'Drop "which" and you have a sentence: "The lighthouse stood on the cliff for a hundred years." The relative pronoun strips out the main verb.'
  },
  'ss.parallel': {
    title: 'Find the non-parallel item',
    instruction: 'Two items in this list are parallel. The third breaks the pattern. Click it.',
    tokens: [
      t('She loves '), w('hiking'), t(', '), w('swimming'), t(', and '), w('to bike', true), t('.')
    ],
    feedback: '"Hiking" and "swimming" are gerunds (-ing). "To bike" is an infinitive.',
    explanation: 'Items in a list must share grammatical form. Change "to bike" to "biking": "hiking, swimming, and biking."'
  },
  'gu.modifier': {
    title: 'Find the dangling modifier',
    instruction: 'One word follows the introductory phrase but cannot logically be the one doing the action. Click it.',
    tokens: [
      t('Walking through the museum, '), w('the pottery', true), t(' caught my eye.')
    ],
    feedback: 'Pottery does not walk. The subject after the comma must be the one doing the walking.',
    explanation: 'Re-write so "I" (or some person) follows the introductory phrase: "Walking through the museum, I noticed the pottery."'
  },
  'kl.concision': {
    title: 'Find the most wasteful phrase',
    instruction: 'One chunk of this sentence is wordy padding. Click it.',
    tokens: [
      t('The reason '), w('why', true), t(' she left is that she was bored.')
    ],
    feedback: '"The reason why" is redundant — "the reason" alone means "why."',
    explanation: 'On the ACT, when meaning is identical the shorter version wins. "The reason she left is that she was bored" is cleaner.'
  },
  'pw.transition': {
    title: 'Find the wrong transition',
    instruction: 'One transition word does not match the logical relationship between the two clauses. Click it.',
    tokens: [
      t('She studied for hours'), t('; '), w('therefore', true), t(', she failed the test.')
    ],
    feedback: '"Therefore" means "as a result." Studying hard does not RESULT in failing — that\'s a contrast.',
    explanation: 'The right transition is "however" or "but" — there\'s a contrast between effort and outcome.'
  }
};

export function getInteractive(topicId) {
  return INTERACTIVES[topicId] || null;
}
