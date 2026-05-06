// SM-2 spaced repetition scheduling, per §10 of the spec.
// Inputs: card with ease_factor + interval_days; outcome in {failed, hard, good, easy}.
// Outputs: { interval_days, ease_factor, due_date, lapse_count }.

export function applyReview(card, outcome) {
  let ease = card.ease_factor ?? 2.5;
  let interval = card.interval_days ?? 1;
  let lapses = card.lapse_count ?? 0;

  switch (outcome) {
    case 'failed':
      interval = 1;
      ease = Math.max(1.3, ease - 0.20);
      lapses += 1;
      break;
    case 'hard':
      interval = Math.max(1, Math.round(interval * 1.2));
      ease = Math.max(1.3, ease - 0.15);
      break;
    case 'good':
      interval = Math.max(1, Math.round(interval * ease));
      // ease unchanged
      break;
    case 'easy':
      interval = Math.max(1, Math.round(interval * ease * 1.3));
      ease = ease + 0.15;
      break;
    default:
      interval = Math.max(1, Math.round(interval * ease));
  }

  const due = new Date();
  due.setDate(due.getDate() + interval);

  return {
    interval_days: interval,
    ease_factor: Math.round(ease * 100) / 100,
    due_date: due.toISOString().slice(0, 10),
    lapse_count: lapses,
    last_reviewed_at: new Date().toISOString()
  };
}

export function isDue(card, today = new Date().toISOString().slice(0, 10)) {
  return (card.due_date || today) <= today;
}
