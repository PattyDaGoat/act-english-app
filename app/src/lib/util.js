export function todayISO() { return new Date().toISOString().slice(0, 10); }

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function fmtTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function pct(num, denom) {
  if (!denom) return 0;
  return Math.round((num / denom) * 100);
}

export function classNames(...xs) {
  return xs.filter(Boolean).join(' ');
}

// Raw → scaled ACT English score estimate (approximate, per public conversion charts).
// Input: 0–75 raw correct. Output: 1–36 scaled.
export function rawToScaled(raw) {
  const table = [
    [75,36],[74,35],[73,34],[71,33],[70,32],[68,31],[67,30],[65,29],[63,28],[61,27],
    [59,26],[57,25],[55,24],[52,23],[49,22],[46,21],[42,20],[39,19],[36,18],[33,17],
    [30,16],[27,15],[24,14],[21,13],[18,12],[15,11],[12,10],[9,9],[7,8],[6,7],
    [5,6],[4,5],[3,4],[2,3],[1,2],[0,1]
  ];
  for (const [r, s] of table) if (raw >= r) return s;
  return 1;
}

// Concept-tag flavored color for heatmaps & badges
export function accuracyColor(pctVal) {
  if (pctVal >= 85) return 'bg-emerald-500 text-white';
  if (pctVal >= 70) return 'bg-emerald-300 text-slate-900';
  if (pctVal >= 55) return 'bg-amber-300 text-slate-900';
  if (pctVal >= 40) return 'bg-orange-400 text-white';
  return 'bg-red-500 text-white';
}
