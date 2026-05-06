// Entry point: bootstraps router and renders current screen.
import { router, navigate } from './lib/router.js';
import { store } from './lib/store.js';
import { renderLayout } from './components/layout.js';

import { HomeScreen } from './screens/home.js';
import { OnboardingScreen } from './screens/onboarding.js';
import { GuidedSetupScreen } from './screens/guided_setup.js';
import { GuidedQuestionScreen } from './screens/guided_question.js';
import { SessionSummaryScreen } from './screens/session_summary.js';
import { MockPreflightScreen } from './screens/mock_preflight.js';
import { MockInTestScreen } from './screens/mock_in_test.js';
import { MockReviewScreen } from './screens/mock_review.js';
import { HelpedInTestScreen } from './screens/helped_in_test.js';
import { DrillSetupScreen } from './screens/drill_setup.js';
import { DrillRunScreen } from './screens/drill_run.js';
import { FlashcardsScreen } from './screens/flashcards.js';
import { AnalyticsScreen } from './screens/analytics.js';
import { ScheduleScreen } from './screens/schedule.js';
import { SettingsScreen } from './screens/settings.js';
import { AdaptiveReviewSetupScreen, AdaptiveReviewRunScreen } from './screens/adaptive_review.js';
import { MiniLessonScreen } from './screens/mini_lesson.js';
import { LessonSetupScreen, LessonRunScreen } from './screens/lesson_mode.js';
import { DiagnosticIntroScreen, DiagnosticRunScreen, StudyPlanScreen } from './screens/diagnostic.js';
import { WhereIStandScreen } from './screens/where_i_stand.js';
import { TutorScreen } from './screens/tutor.js';

router.register('/', () => {
  if (!store.getUser().onboarded) return navigate('/onboarding');
  return renderLayout(HomeScreen());
});
router.register('/onboarding', () => OnboardingScreen());
router.register('/guided', () => renderLayout(GuidedSetupScreen()));
router.register('/guided/run', () => GuidedQuestionScreen());
router.register('/summary', () => renderLayout(SessionSummaryScreen()));
router.register('/mock', () => renderLayout(MockPreflightScreen()));
router.register('/mock/run', () => MockInTestScreen());
router.register('/mock/review', () => renderLayout(MockReviewScreen()));
router.register('/helped', () => renderLayout(MockPreflightScreen({ helped: true })));
router.register('/helped/run', () => HelpedInTestScreen());
router.register('/drill', () => renderLayout(DrillSetupScreen()));
router.register('/drill/run', () => DrillRunScreen());
router.register('/flashcards', () => renderLayout(FlashcardsScreen()));
router.register('/analytics', () => renderLayout(AnalyticsScreen()));
router.register('/schedule', () => renderLayout(ScheduleScreen()));
router.register('/settings', () => renderLayout(SettingsScreen()));
router.register('/adaptive', () => renderLayout(AdaptiveReviewSetupScreen()));
router.register('/adaptive/run', () => AdaptiveReviewRunScreen());
router.register('/lesson', () => renderLayout(MiniLessonScreen()));
router.register('/lesson-mode', () => renderLayout(LessonSetupScreen()));
router.register('/lesson-mode/run', () => LessonRunScreen());
router.register('/diagnostic', () => renderLayout(DiagnosticIntroScreen()));
router.register('/diagnostic/run', () => DiagnosticRunScreen());
router.register('/diagnostic/plan', () => renderLayout(StudyPlanScreen()));
router.register('/standing', () => renderLayout(WhereIStandScreen()));
router.register('/tutor', () => renderLayout(TutorScreen()));

router.start();
