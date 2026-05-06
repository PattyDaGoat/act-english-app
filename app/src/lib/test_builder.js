// Builds a 75-question Mock/Helped test list following the ACT structure:
// 5 passages × 15 questions, in passage order. If a passage has fewer than 15
// questions in the bank, top up with standalones to reach 15 for that block.
import { PASSAGES } from '../data/passages.js';
import { questionsForPassage, allQuestions } from '../data/questions.js';

export function buildMockTestList(total = 75, perPassage = 15) {
  const passages = PASSAGES.slice(0, Math.ceil(total / perPassage));
  const standalonePool = allQuestions().filter(q => q.passage_id === null);
  let standaloneIdx = 0;

  const list = [];
  for (const p of passages) {
    const qs = questionsForPassage(p.id).slice(0, perPassage);
    list.push(...qs);
    while (list.length < (passages.indexOf(p) + 1) * perPassage && standaloneIdx < standalonePool.length) {
      list.push(standalonePool[standaloneIdx++]);
    }
  }
  // If still short (very small banks), cycle through what we have.
  if (list.length < total && list.length > 0) {
    let i = 0;
    while (list.length < total) {
      list.push(list[i % list.length]);
      i++;
    }
  }
  return list.slice(0, total);
}
