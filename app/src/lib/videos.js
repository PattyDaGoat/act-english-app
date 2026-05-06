// Video helpers — open a YouTube search for a topic in a new tab.
// We deliberately avoid embedding specific video IDs we cannot verify; instead
// we generate a search URL targeting reputable free ACT English channels.
import { getTopic } from '../data/topics.js';

const RECOMMENDED_CHANNELS = [
  'Khan Academy',
  'SupertutorTV',
  'Magoosh',
  'PrepScholar',
  'The Princeton Review'
];

// Per-topic short search query — concrete and disambiguated for ACT English.
const TOPIC_QUERIES = {
  'gu.subj_verb':   'ACT English subject verb agreement',
  'gu.pronoun':     'ACT English pronoun case agreement',
  'gu.verb_tense':  'ACT English verb tense consistency',
  'gu.modifier':    'ACT English misplaced dangling modifier',
  'gu.adj_adv':     'ACT English adjective vs adverb',
  'gu.idiom':       'ACT English idioms prepositions',
  'gu.confused':    'ACT English commonly confused words its than',
  'pn.comma':       'ACT English comma rules',
  'pn.semicolon':   'ACT English semicolon rules',
  'pn.colon':       'ACT English colon rules',
  'pn.dash':        'ACT English dash rules',
  'pn.apostrophe':  'ACT English apostrophe possessive contraction',
  'ss.runon':       'ACT English run-on comma splice',
  'ss.fragment':    'ACT English sentence fragment',
  'ss.parallel':    'ACT English parallel structure',
  'ss.conjunction': 'ACT English conjunctions FANBOYS',
  'pw.transition':  'ACT English transitions however therefore',
  'pw.organization':'ACT English organization paragraph order',
  'pw.add_delete':  'ACT English add delete sentence questions',
  'pw.purpose':     'ACT English purpose main idea',
  'kl.word_choice': 'ACT English word choice tone',
  'kl.concision':   'ACT English concision wordiness'
};

export function youtubeSearchUrl(topicId) {
  const query = TOPIC_QUERIES[topicId]
    || `ACT English ${getTopic(topicId)?.name || topicId}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function youtubeQueryFor(topicId) {
  return TOPIC_QUERIES[topicId] || `ACT English ${getTopic(topicId)?.name || topicId}`;
}

export function recommendedChannels() {
  return RECOMMENDED_CHANNELS;
}
