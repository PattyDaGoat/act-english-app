// Diagnostic placement test + study-plan generation.
//
// buildDiagnosticQueue() — picks ~20 questions covering every leaf topic at
//   least once, mixed difficulty, no time pressure. Used as a one-time
//   placement test to surface where the student stands per topic.
//
// computeStudyPlan(perTopicResults) — turns per-topic accuracy into a focus
//   level (strong / medium / weak / unknown) plus a weight used by other
//   modes (lesson-mode / adaptive-review) to bias question picking.
import { allQuestions, questionsForTopic } from '../data/questions.js';
import { leafTopics, getTopic } from '../data/topics.js';
import { shuffle } from './util.js';

const TARGET_LENGTH = 20;

export function buildDiagnosticQueue() {
  const topics = leafTopics();
  const queue = [];
  const seen = new Set();

  // Pass 1: one question per topic that has questions, prefer difficulty 2-3.
  for (const t of topics) {
    const pool = questionsForTopic(t.id).filter(q => !seen.has(q.id));
    if (pool.length === 0) continue;
    const sorted = pool.slice().sort((a, b) => {
      // Prefer mid difficulty (2,3), then standalones (no passage), then anything.
      const da = Math.abs((a.difficulty || 2) - 2.5);
      const db = Math.abs((b.difficulty || 2) - 2.5);
      if (da !== db) return da - db;
      return (a.passage_id ? 1 : 0) - (b.passage_id ? 1 : 0);
    });
    queue.push(sorted[0]);
    seen.add(sorted[0].id);
  }

  // Pass 2: top up to TARGET_LENGTH with a second sample from popular topics.
  if (queue.length < TARGET_LENGTH) {
    const rest = shuffle(allQuestions().filter(q => !seen.has(q.id)));
    for (const q of rest) {
      if (queue.length >= TARGET_LENGTH) break;
      queue.push(q);
      seen.add(q.id);
    }
  }

  // Trim if we ended up with too many topics for one sitting.
  return shuffle(queue).slice(0, TARGET_LENGTH);
}

// Given the diagnostic attempts, compute per-topic accuracy across leaf topics.
// `attempts` is an array of { question_id, chosen_choice, is_correct } and
// `questionsById` is a map from id → question (so we can look up topics).
export function computePerTopicResults(attempts) {
  const map = new Map(); // topicId → { correct, total, name }
  const byId = new Map(allQuestions().map(q => [q.id, q]));

  for (const a of attempts) {
    const q = byId.get(a.question_id);
    if (!q) continue;
    const topics = [q.primary_topic_id, ...(q.secondary_topic_ids || [])];
    for (const tid of topics) {
      const cur = map.get(tid) || { topic_id: tid, name: getTopic(tid)?.name || tid, correct: 0, total: 0 };
      cur.total += 1;
      if (a.is_correct) cur.correct += 1;
      map.set(tid, cur);
    }
  }

  return Array.from(map.values()).map(r => ({
    ...r,
    accuracy: r.total ? Math.round((r.correct / r.total) * 100) : null
  }));
}

// Convert per-topic results to a study plan: focus level + numeric weight per
// topic, plus a high-level summary. Topics not seen in the diagnostic get the
// 'unknown' level (medium-default weight) so they're still revisited.
export function computeStudyPlan(perTopicResults) {
  const seen = new Set(perTopicResults.map(r => r.topic_id));
  const topics = leafTopics();

  const levels = {};
  const weights = {};

  for (const r of perTopicResults) {
    let level;
    if (r.accuracy >= 80) level = 'strong';
    else if (r.accuracy >= 50) level = 'medium';
    else level = 'weak';
    levels[r.topic_id] = level;
    weights[r.topic_id] = level === 'weak' ? 3 : level === 'medium' ? 2 : 1;
  }

  for (const t of topics) {
    if (seen.has(t.id)) continue;
    levels[t.id] = 'unknown';
    weights[t.id] = 2; // treat unknown as medium-priority by default
  }

  const grouped = {
    weak:    topics.filter(t => levels[t.id] === 'weak'),
    medium:  topics.filter(t => levels[t.id] === 'medium'),
    strong:  topics.filter(t => levels[t.id] === 'strong'),
    unknown: topics.filter(t => levels[t.id] === 'unknown')
  };

  const overall = perTopicResults.length > 0
    ? Math.round(
        perTopicResults.reduce((acc, r) => acc + (r.accuracy || 0), 0) /
        perTopicResults.length
      )
    : null;

  return {
    created_at: new Date().toISOString(),
    overall_accuracy: overall,
    levels,
    weights,
    grouped: {
      weak:    grouped.weak.map(t => ({ id: t.id, name: t.name })),
      medium:  grouped.medium.map(t => ({ id: t.id, name: t.name })),
      strong:  grouped.strong.map(t => ({ id: t.id, name: t.name })),
      unknown: grouped.unknown.map(t => ({ id: t.id, name: t.name }))
    },
    per_topic: perTopicResults.sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0))
  };
}

// Build a session queue using the plan's weights — picks more questions from
// weak topics, fewer from strong ones. Used by Lesson Mode "Plan" option.
export function buildPlanWeightedQueue(plan, length) {
  if (!plan || !plan.weights) return [];
  const weights = plan.weights;

  // Build a flat weighted list of (topicId × weight) entries.
  const slots = [];
  for (const [tid, w] of Object.entries(weights)) {
    if (questionsForTopic(tid).length === 0) continue;
    for (let i = 0; i < w; i++) slots.push(tid);
  }

  const queue = [];
  const seen = new Set();
  let lastTopic = null;
  const shuffled = shuffle(slots);

  for (const tid of shuffled) {
    if (queue.length >= length) break;
    if (tid === lastTopic) continue; // try not to repeat
    const candidates = shuffle(questionsForTopic(tid).filter(q => !seen.has(q.id)));
    if (candidates.length === 0) continue;
    queue.push(candidates[0]);
    seen.add(candidates[0].id);
    lastTopic = tid;
  }

  // Top-up if we got short.
  if (queue.length < length) {
    const remaining = shuffle(allQuestions().filter(q => !seen.has(q.id)));
    for (const q of remaining) {
      if (queue.length >= length) break;
      queue.push(q);
      seen.add(q.id);
    }
  }

  return queue;
}
