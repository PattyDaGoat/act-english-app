// Generates a study calendar from user prefs, per §12.
// Mix: drill days, guided days, and one full-mock day per week.
import { todayISO } from './util.js';

export function generateSchedule({ targetDate, daysPerWeek }) {
  if (!targetDate) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  if (target <= today) return [];

  // Pick weekday slots based on daysPerWeek (try to spread).
  // Always include Sat (mock day if possible), then Mon, Wed, Fri, Tue, Thu, Sun.
  const priority = [6, 1, 3, 5, 2, 4, 0]; // Sat, Mon, Wed, Fri, Tue, Thu, Sun
  const allowedDow = new Set(priority.slice(0, Math.min(7, Math.max(1, daysPerWeek))));

  const events = [];
  let dayIdx = 0;
  const cursor = new Date(today);
  let weekStart = startOfWeek(cursor);
  let mockThisWeek = false;

  while (cursor <= target) {
    const dow = cursor.getDay();
    const ws = startOfWeek(cursor).toISOString().slice(0, 10);
    if (ws !== weekStart.toISOString().slice(0, 10)) {
      weekStart = startOfWeek(cursor);
      mockThisWeek = false;
    }
    if (allowedDow.has(dow)) {
      let type;
      // Saturday or first allowed day each week → mock if not already done.
      if (!mockThisWeek && (dow === 6 || dayIdx === 0)) {
        type = 'mock';
        mockThisWeek = true;
      } else if (dayIdx % 2 === 0) {
        type = 'drill';
      } else {
        type = 'guided';
      }
      events.push({
        id: 'sch_' + cursor.toISOString().slice(0, 10),
        scheduled_date: cursor.toISOString().slice(0, 10),
        type,
        suggested_topic_id: null,
        completed: false
      });
      dayIdx++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return events;
}

function startOfWeek(d) {
  const x = new Date(d);
  const dow = x.getDay(); // 0=Sun
  x.setDate(x.getDate() - dow);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function checkAndApplyStreakFreeze(user, dailyProgress) {
  // If yesterday's goal was missed and freezes available, count it as covered.
  // §12: one streak freeze per week, automatic.
  const today = todayISO();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const yProg = dailyProgress[yesterday];
  if (!yProg || !yProg.met_goal) {
    const weekStart = (() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d.toISOString().slice(0,10); })();
    if (user.streak_week_start !== weekStart) {
      return { reset_freezes: true, week_start: weekStart };
    }
    if ((user.streak_freezes_used_this_week || 0) < 1) {
      return { use_freeze: true };
    }
  }
  return {};
}
