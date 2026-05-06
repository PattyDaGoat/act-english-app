// Adaptive review (v1.1, §16). Scores each topic by "need" and builds a
// prioritized question queue — pulling first from topics where the student
// is weakest, has been struggling recently, and hasn't seen lately.
//
// Score = weakness * recency_decay * sample_confidence
//   weakness:           1 - accuracy (over recent 20)
//   recency_decay:      higher when last seen further back (capped)
//   sample_confidence:  scales 0..1 as samples approach 10 (avoids noise)
//
// Within a topic, questions are weighted by:
//   - missed before > never seen > correctly answered
//   - older attempts > recent attempts (don't repeat what was just shown)
import { store } from './store.js';
import { topicAccuracyMap } from './analytics.js';
import { allQuestions, questionsForTopic } from '../data/questions.js';
import { getTopic } from '../data/topics.js';

const MIN_SAMPLE_FOR_FULL_WEIGHT = 10;
const MAX_RECENCY_DAYS = 14;

export function topicNeedScores() {
  const map = topicAccuracyMap();
  const now = Date.now();
  const lastSeenByTopic = computeLastSeenByTopic();

  return map.map(row => {
    const weakness = Math.max(0, 1 - (row.accuracy / 100));
    const sampleConfidence = Math.min(1, row.recent_total / MIN_SAMPLE_FOR_FULL_WEIGHT);
    const lastSeen = lastSeenByTopic.get(row.topic_id);
    const daysSince = lastSeen ? Math.min(MAX_RECENCY_DAYS, (now - lastSeen) / 86400000) : MAX_RECENCY_DAYS;
    const recencyDecay = 0.5 + (daysSince / MAX_RECENCY_DAYS) * 0.5; // 0.5..1.0
    const score = weakness * sampleConfidence * recencyDecay;
    return { ...row, score, days_since_seen: Math.round(daysSince) };
  }).sort((a, b) => b.score - a.score);
}

function computeLastSeenByTopic() {
  const lastSeen = new Map();
  for (const a of store.listAttempts()) {
    const q = allQuestions().find(x => x.id === a.question_id);
    if (!q) continue;
    const t = a.created_at ? new Date(a.created_at).getTime() : 0;
    const topics = [q.primary_topic_id, ...(q.secondary_topic_ids || [])];
    for (const tid of topics) {
      const prev = lastSeen.get(tid) || 0;
      if (t > prev) lastSeen.set(tid, t);
    }
  }
  return lastSeen;
}

export function buildAdaptiveQueue(targetLength = 10) {
  const needScores = topicNeedScores().filter(t => t.score > 0.05);
  if (needScores.length === 0) {
    // Fallback: use any topic with any data
    const fallback = topicAccuracyMap().filter(t => t.recent_total > 0);
    if (fallback.length === 0) return [];
    needScores.push(...fallback.map(t => ({ ...t, score: 0.5 })));
  }

  // Allocate question slots to topics proportional to score
  const totalScore = needScores.reduce((acc, t) => acc + t.score, 0);
  const allocations = needScores.map(t => ({
    topic_id: t.topic_id,
    name: t.name,
    score: t.score,
    target: Math.max(1, Math.round((t.score / totalScore) * targetLength))
  }));

  const attempts = store.listAttempts();
  const attemptsByQ = new Map();
  for (const a of attempts) {
    if (!attemptsByQ.has(a.question_id)) attemptsByQ.set(a.question_id, []);
    attemptsByQ.get(a.question_id).push(a);
  }

  const seen = new Set();
  const queue = [];

  for (const alloc of allocations) {
    const candidates = questionsForTopic(alloc.topic_id)
      .filter(q => !seen.has(q.id))
      .map(q => {
        const history = attemptsByQ.get(q.id) || [];
        const lastAttempt = history[history.length - 1];
        const lastWrong = lastAttempt && !lastAttempt.is_correct;
        const lastTime = lastAttempt ? new Date(lastAttempt.created_at).getTime() : 0;
        const daysSince = lastTime ? (Date.now() - lastTime) / 86400000 : 999;
        const priority =
          (lastWrong ? 3 : 0) +              // missed before = top priority
          (history.length === 0 ? 2 : 0) +   // never seen = second
          Math.min(2, daysSince / 7);        // older = mildly favored
        return { q, priority };
      })
      .sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < Math.min(alloc.target, candidates.length); i++) {
      queue.push({ ...candidates[i].q, _topic_reason: alloc.name });
      seen.add(candidates[i].q.id);
    }
    if (queue.length >= targetLength) break;
  }

  // Top up if under target
  if (queue.length < targetLength) {
    const remaining = allQuestions().filter(q => !seen.has(q.id));
    for (const q of remaining) {
      if (queue.length >= targetLength) break;
      queue.push({ ...q, _topic_reason: 'Mixed review' });
      seen.add(q.id);
    }
  }

  return queue.slice(0, targetLength);
}

export function summarizeAdaptiveContext() {
  const scores = topicNeedScores();
  const top3 = scores.slice(0, 3);
  return {
    has_data: scores.length > 0,
    top_focus: top3,
    total_topics_struggling: scores.filter(s => s.accuracy < 70 && s.recent_total >= 5).length
  };
}
