// Analytics derivations from raw attempts/sessions.
import { store } from './store.js';
import { getTopic, allTopics, leafTopics } from '../data/topics.js';
import { getQuestion } from '../data/questions.js';
import { todayISO, pct, rawToScaled } from './util.js';

const WEAK_THRESHOLD = 70;
const WEAK_MIN_SAMPLE = 10;
const WEAK_WINDOW = 20;

export function topicAccuracyMap() {
  const attempts = store.listAttempts();
  const byTopic = new Map();
  for (const a of attempts) {
    const q = getQuestion(a.question_id);
    if (!q) continue;
    const topicIds = [q.primary_topic_id, ...(q.secondary_topic_ids || [])];
    for (const tid of topicIds) {
      if (!byTopic.has(tid)) byTopic.set(tid, []);
      byTopic.get(tid).push(a);
    }
  }
  const result = [];
  for (const [tid, list] of byTopic.entries()) {
    const topic = getTopic(tid);
    if (!topic) continue;
    const sorted = [...list].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    const recent = sorted.slice(0, WEAK_WINDOW);
    const correct = recent.filter(a => a.is_correct).length;
    result.push({
      topic_id: tid,
      name: topic.name,
      category: topic.category,
      total: list.length,
      recent_total: recent.length,
      recent_correct: correct,
      accuracy: pct(correct, recent.length)
    });
  }
  return result;
}

export function computeWeakTopics() {
  return topicAccuracyMap()
    .filter(t => t.recent_total >= WEAK_MIN_SAMPLE && t.accuracy < WEAK_THRESHOLD)
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function computeTodayProgress() {
  return store.getDailyProgress(todayISO());
}

export function scoreTrajectory() {
  const fromMocks = store.listSessions()
    .filter(s => s.ended_at && (s.mode === 'mock' || s.mode === 'helped'))
    .map(s => ({
      date: s.ended_at.slice(0, 10),
      mode: s.mode,
      raw_score: s.raw_score,
      scaled: s.scaled_score_estimate,
      unaided: s.unaided_score
    }));
  const fromPrior = store.listPriorScores().map(s => ({
    date: s.date,
    mode: 'official',
    raw_score: null,
    scaled: s.english_score,
    unaided: null,
    composite: s.composite
  }));
  return [...fromPrior, ...fromMocks].sort((a, b) => a.date.localeCompare(b.date));
}

export function avgTimePerQuestion(mode = null) {
  const attempts = store.listAttempts();
  const sessions = new Map(store.listSessions().map(s => [s.id, s]));
  const filtered = attempts.filter(a => {
    if (mode == null) return true;
    const s = sessions.get(a.session_id);
    return s && s.mode === mode;
  });
  if (filtered.length === 0) return 0;
  const sum = filtered.reduce((acc, a) => acc + (a.time_spent_ms || 0), 0);
  return Math.round(sum / filtered.length / 1000);
}

export function totalQuestionsByMode() {
  const sessions = new Map(store.listSessions().map(s => [s.id, s]));
  const counts = { guided: 0, mock: 0, helped: 0, drill: 0, flashcard: 0 };
  for (const a of store.listAttempts()) {
    const s = sessions.get(a.session_id);
    if (s && counts[s.mode] != null) counts[s.mode]++;
  }
  return counts;
}

export function categoryAccuracy() {
  const map = topicAccuracyMap();
  const byCat = { CSE: { correct: 0, total: 0 }, POW: { correct: 0, total: 0 }, KOL: { correct: 0, total: 0 } };
  for (const row of map) {
    if (!byCat[row.category]) continue;
    byCat[row.category].correct += row.recent_correct;
    byCat[row.category].total += row.recent_total;
  }
  return Object.entries(byCat).map(([cat, v]) => ({
    category: cat,
    accuracy: pct(v.correct, v.total),
    total: v.total
  }));
}

export { rawToScaled };
