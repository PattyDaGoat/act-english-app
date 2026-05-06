// localStorage-backed store implementing the §14 data model.
// Single namespace key 'act-english.v1' with sub-collections.

const KEY = 'act-english.v1';

const DEFAULT_STATE = {
  user: {
    id: 'local',
    display_name: 'Student',
    onboarded: false,
    prep_weeks: 12,
    target_test_date: null,
    target_score: 30,
    current_score: null,
    study_days_per_week: 5,
    daily_goal: { minutes: 15, questions: 20 },
    settings: { soft_timer_in_guided: false, auto_add_missed_to_flashcards: true, theme: 'light' },
    streak_count: 0,
    last_session_date: null,
    streak_freezes_used_this_week: 0,
    streak_week_start: null,
    badges: []
  },
  attempts: [],
  sessions: [],
  flashcards: [],
  schedule_events: [],
  daily_progress: {},
  prior_scores: [],      // {id, date, english_score, composite, source, notes, created_at}
  study_plan: null       // { created_at, overall_accuracy, levels, weights, grouped, per_topic }
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(DEFAULT_STATE), ...parsed,
             user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) } };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

let state = load();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { console.warn('persist failed', e); }
}

export const store = {
  getUser() { return state.user; },
  updateUser(patch) { state.user = { ...state.user, ...patch }; save(); },

  // Sessions
  startSession({ mode, topic_filter = null, length_target = null }) {
    const session = {
      id: 's_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      mode, topic_filter, length_target,
      started_at: new Date().toISOString(),
      ended_at: null,
      raw_score: null,
      scaled_score_estimate: null,
      unaided_score: null
    };
    state.sessions.push(session);
    save();
    return session;
  },
  endSession(sessionId, patch) {
    const s = state.sessions.find(x => x.id === sessionId);
    if (!s) return null;
    Object.assign(s, patch, { ended_at: new Date().toISOString() });
    save();
    return s;
  },
  getSession(id) { return state.sessions.find(s => s.id === id); },
  listSessions() { return [...state.sessions]; },

  // Attempts
  recordAttempt(attempt) {
    const a = {
      id: 'a_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      created_at: new Date().toISOString(),
      help_level_used: null,
      ...attempt
    };
    state.attempts.push(a);
    save();
    return a;
  },
  listAttempts() { return [...state.attempts]; },
  attemptsForSession(sessionId) {
    return state.attempts.filter(a => a.session_id === sessionId);
  },

  // Flashcards
  listFlashcards() { return [...state.flashcards]; },
  addFlashcard(card) {
    if (state.flashcards.some(c => c.source_question_id === card.source_question_id)) return null;
    const c = {
      id: 'fc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      ease_factor: 2.5,
      interval_days: 1,
      due_date: new Date().toISOString().slice(0, 10),
      last_reviewed_at: null,
      lapse_count: 0,
      ...card
    };
    state.flashcards.push(c);
    save();
    return c;
  },
  updateFlashcard(id, patch) {
    const c = state.flashcards.find(x => x.id === id);
    if (!c) return null;
    Object.assign(c, patch);
    save();
    return c;
  },
  removeFlashcard(id) {
    state.flashcards = state.flashcards.filter(c => c.id !== id);
    save();
  },

  // Schedule
  listScheduleEvents() { return [...state.schedule_events]; },
  setScheduleEvents(events) { state.schedule_events = events; save(); },
  markScheduleEventComplete(id) {
    const e = state.schedule_events.find(x => x.id === id);
    if (e) { e.completed = true; save(); }
  },

  // Daily progress / streaks
  getDailyProgress(date) {
    return state.daily_progress[date] || { minutes: 0, questions: 0, met_goal: false };
  },
  addDailyProgress(date, minutes, questions) {
    const cur = state.daily_progress[date] || { minutes: 0, questions: 0, met_goal: false };
    cur.minutes += minutes;
    cur.questions += questions;
    const goal = state.user.daily_goal;
    cur.met_goal = cur.met_goal || cur.minutes >= goal.minutes || cur.questions >= goal.questions;
    state.daily_progress[date] = cur;
    save();
    return cur;
  },
  allDailyProgress() { return { ...state.daily_progress }; },

  // Prior official ACT scores (manual entry or CSV import)
  listPriorScores() { return [...state.prior_scores]; },
  addPriorScore(score) {
    const s = {
      id: 'ps_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      created_at: new Date().toISOString(),
      source: 'manual',
      ...score
    };
    state.prior_scores.push(s);
    // Auto-update current_score on the user with the most recent English score
    const sorted = [...state.prior_scores].sort((a, b) => b.date.localeCompare(a.date));
    if (sorted[0] && sorted[0].english_score) {
      state.user.current_score = sorted[0].english_score;
    }
    save();
    return s;
  },
  removePriorScore(id) {
    state.prior_scores = state.prior_scores.filter(s => s.id !== id);
    save();
  },

  // Study plan (placement / diagnostic test results)
  getStudyPlan() { return state.study_plan; },
  setStudyPlan(plan) { state.study_plan = plan; save(); return plan; },
  clearStudyPlan() { state.study_plan = null; save(); },

  // Reset (settings → wipe data)
  resetAll() {
    state = structuredClone(DEFAULT_STATE);
    save();
  }
};

// Ephemeral cross-screen state (not persisted): the active session payload.
const _ephemeral = {};
export const ephemeral = {
  set(key, val) { _ephemeral[key] = val; },
  get(key) { return _ephemeral[key]; },
  clear(key) { delete _ephemeral[key]; }
};
