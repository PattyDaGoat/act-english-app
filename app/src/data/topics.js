// Topic taxonomy from §8 of the spec. Three categories: CSE, POW, KOL.
// Hierarchy: parent topics group leaf topics that map to questions.

export const TOPICS = [
  // Conventions of Standard English — Grammar & Usage
  { id: 'gu',                name: 'Grammar & Usage',         category: 'CSE', parent_id: null },
  { id: 'gu.subj_verb',      name: 'Subject–verb agreement',   category: 'CSE', parent_id: 'gu',
    description: 'Match verb to subject; watch interrupters, collective nouns, "each".' },
  { id: 'gu.pronoun',        name: 'Pronoun case & agreement', category: 'CSE', parent_id: 'gu',
    description: 'Pronoun must match its antecedent in number, person, and case.' },
  { id: 'gu.verb_tense',     name: 'Verb tense & consistency', category: 'CSE', parent_id: 'gu',
    description: 'Maintain consistent tense within a passage.' },
  { id: 'gu.modifier',       name: 'Misplaced & dangling modifiers', category: 'CSE', parent_id: 'gu',
    description: 'A modifier must clearly attach to the word it describes.' },
  { id: 'gu.adj_adv',        name: 'Adjective vs. adverb',     category: 'CSE', parent_id: 'gu',
    description: 'Adverbs modify verbs/adjectives/adverbs; adjectives modify nouns.' },
  { id: 'gu.idiom',          name: 'Idioms & prepositions',    category: 'CSE', parent_id: 'gu',
    description: 'Standard English pairs certain verbs with specific prepositions.' },
  { id: 'gu.confused',       name: 'Commonly confused words',  category: 'CSE', parent_id: 'gu',
    description: 'affect/effect, then/than, its/it\'s, who/whom.' },

  // Punctuation
  { id: 'pn',                name: 'Punctuation',              category: 'CSE', parent_id: null },
  { id: 'pn.comma',          name: 'Commas',                    category: 'CSE', parent_id: 'pn',
    description: 'Lists, FANBOYS, intro phrases, non-essential clauses.' },
  { id: 'pn.semicolon',      name: 'Semicolons',                category: 'CSE', parent_id: 'pn',
    description: 'Joins two independent clauses or separates complex list items.' },
  { id: 'pn.colon',          name: 'Colons',                    category: 'CSE', parent_id: 'pn',
    description: 'Must follow a complete clause; introduces a list, quote, or explanation.' },
  { id: 'pn.dash',           name: 'Dashes',                    category: 'CSE', parent_id: 'pn',
    description: 'Sets off parenthetical info or signals an emphatic break.' },
  { id: 'pn.apostrophe',     name: 'Apostrophes',               category: 'CSE', parent_id: 'pn',
    description: 'Possession (Sara\'s) and contractions (don\'t).' },

  // Sentence Structure
  { id: 'ss',                name: 'Sentence Structure',       category: 'CSE', parent_id: null },
  { id: 'ss.runon',          name: 'Run-ons & comma splices',   category: 'CSE', parent_id: 'ss',
    description: 'Two independent clauses cannot be joined by just a comma.' },
  { id: 'ss.fragment',       name: 'Sentence fragments',        category: 'CSE', parent_id: 'ss',
    description: 'Every sentence needs a subject and a finite verb.' },
  { id: 'ss.parallel',       name: 'Parallelism',                category: 'CSE', parent_id: 'ss',
    description: 'Items in a list/comparison must share grammatical structure.' },
  { id: 'ss.conjunction',    name: 'Conjunctions & clause relationships', category: 'CSE', parent_id: 'ss',
    description: 'Coordinating vs. subordinating conjunctions.' },

  // Production of Writing
  { id: 'pw',                name: 'Production of Writing',    category: 'POW', parent_id: null },
  { id: 'pw.transition',     name: 'Transitions',                category: 'POW', parent_id: 'pw',
    description: 'Words like however, therefore, in addition signal logical relationships.' },
  { id: 'pw.organization',   name: 'Organization & cohesion',    category: 'POW', parent_id: 'pw',
    description: 'Sentence and paragraph order; what sentence belongs where.' },
  { id: 'pw.add_delete',     name: 'Add / delete / revise',      category: 'POW', parent_id: 'pw',
    description: 'Decide whether to keep or cut material based on purpose.' },
  { id: 'pw.purpose',        name: 'Purpose & main idea',        category: 'POW', parent_id: 'pw',
    description: 'Identify the writer\'s goal for a passage or paragraph.' },

  // Knowledge of Language
  { id: 'kl',                name: 'Knowledge of Language',    category: 'KOL', parent_id: null },
  { id: 'kl.word_choice',    name: 'Word choice & tone',         category: 'KOL', parent_id: 'kl',
    description: 'Pick the word that best fits register and precision.' },
  { id: 'kl.concision',      name: 'Concision & redundancy',     category: 'KOL', parent_id: 'kl',
    description: 'Eliminate wordiness; on the ACT, shorter is usually better.' }
];

const byId = new Map(TOPICS.map(t => [t.id, t]));

export function allTopics() { return [...TOPICS]; }
export function getTopic(id) { return byId.get(id); }
export function leafTopics() { return TOPICS.filter(t => t.parent_id !== null); }
export function topLevelTopics() { return TOPICS.filter(t => t.parent_id === null); }
export function topicsByParent(parentId) { return TOPICS.filter(t => t.parent_id === parentId); }
export function categoryName(cat) {
  return { CSE: 'Conventions of Standard English', POW: 'Production of Writing', KOL: 'Knowledge of Language' }[cat] || cat;
}
