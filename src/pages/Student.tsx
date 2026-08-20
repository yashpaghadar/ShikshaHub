import { useState } from 'react';
import { useApp } from '../AppContext';
import { ProgressBar, StatCard, StatusBadge, EmptyState } from '../components/ui';
import type { Course } from '../types';

export function StudentHome({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, students, currentStudentId, courses, assignments } = useApp();
  const student = students.find((s) => s.id === currentStudentId) || students[0];

  const recommended = courses.filter((c) => c.progress < 60 && c.progress >= 0).slice(0, 3);
  const offlineCourses = courses.filter((c) => c.savedOffline || c.availableOffline).slice(0, 3);
  const continueCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];
  const pendingAssignments = assignments.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          {t('goodMorning')}, {student.name}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">{t('yourLearningProgress')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={t('overallProgress')} value={`${student.overallProgress}%`} color="primary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 16l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('lessonsCompleted')} value={student.lessonsCompleted} color="secondary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('quizScore')} value={`${student.quizScore}%`} color="accent"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('digitalSkillsScore')} value={`${student.digitalSkills}%`} color="primary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
      </div>

      {pendingAssignments > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-accent-50 p-4">
          <span className="text-xl">📋</span>
          <p className="text-sm font-medium text-accent-700">
            {pendingAssignments} {t('assignments').toLowerCase()} — {t('dueDate')}
          </p>
          <button onClick={() => onNavigate('learn')} className="ml-auto btn-outline text-xs">
            {t('viewStudent')}
          </button>
        </div>
      )}

      {/* Continue Learning */}
      {continueCourse && (
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-ink">{t('continueLearning')}</h2>
          <div className="card-hover">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-2xl">
                {continueCourse.subject === 'mathematics' ? '🔢' : continueCourse.subject === 'science' ? '🔬' : continueCourse.subject === 'english' ? '📖' : continueCourse.subject === 'digital-literacy' ? '💻' : '🌍'}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">{t(continueCourse.subject)}</p>
                <h3 className="text-base font-bold text-ink">{continueCourse.title}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1"><ProgressBar value={continueCourse.progress} /></div>
                  <span className="text-sm font-semibold text-gray-600">{continueCourse.progress}%</span>
                </div>
              </div>
              <button onClick={() => onNavigate(`lesson:${continueCourse.id}`)} className="btn-primary shrink-0">
                {t('continueLearning')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('recommendedForYou')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((course) => (
            <div key={course.id} className="card-hover">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{course.subject === 'mathematics' ? '🔢' : course.subject === 'science' ? '🔬' : course.subject === 'english' ? '📖' : course.subject === 'digital-literacy' ? '💻' : '🌍'}</span>
                <span className="text-xs font-medium text-gray-500">{t(course.subject)}</span>
              </div>
              <h3 className="text-sm font-bold text-ink">{course.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{course.estimatedTime} · {t(course.difficulty)}</p>
              <div className="mt-3"><ProgressBar value={course.progress} size="sm" /></div>
              <button onClick={() => onNavigate(`lesson:${course.id}`)} className="mt-3 btn-outline w-full text-xs">
                {t('continue')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Offline */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('availableOffline')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offlineCourses.map((course) => (
            <div key={course.id} className="card-hover">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xl">{course.subject === 'mathematics' ? '🔢' : course.subject === 'science' ? '🔬' : course.subject === 'english' ? '📖' : '💻'}</span>
                <StatusBadge status="online" label={t('availableOffline')} />
              </div>
              <h3 className="text-sm font-bold text-ink">{course.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{t(course.subject)}</p>
              <button onClick={() => onNavigate(`lesson:${course.id}`)} className="mt-3 btn-secondary w-full text-xs">
                {t('open')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LearnPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, courses, isOnline } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const subjects = ['all', 'mathematics', 'science', 'english', 'digital-literacy', 'general-knowledge'];
  const filtered = filter === 'all' ? courses : courses.filter((c) => c.subject === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('courseLibrary')}</h1>

      {/* Filter */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === s ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s === 'all' ? t('content') : t(s)}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => {
          const locked = !course.savedOffline && !course.availableOffline && !isOnline;
          return (
            <div key={course.id} className="card-hover flex flex-col">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{course.subject === 'mathematics' ? '🔢' : course.subject === 'science' ? '🔬' : course.subject === 'english' ? '📖' : course.subject === 'digital-literacy' ? '💻' : '🌍'}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">{t(course.subject)}</p>
                    <p className="text-xs text-gray-400">{t(course.difficulty)}</p>
                  </div>
                </div>
                {course.savedOffline && <StatusBadge status="online" label={t('availableOffline')} />}
              </div>
              <h3 className="text-sm font-bold text-ink">{course.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{t('estTime')}: {course.estimatedTime}</p>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">{t('progress')}</span>
                  <span className="font-semibold text-gray-700">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} size="sm" />
              </div>
              <button
                onClick={() => onNavigate(`lesson:${course.id}`)}
                disabled={locked}
                className="mt-4 btn-primary w-full text-xs"
              >
                {locked ? `🔒 ${t('offline')}` : course.progress > 0 ? t('continue') : t('open')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LessonPage({ courseId, onNavigate }: { courseId: string; onNavigate: (page: string) => void }) {
  const { t, courses, saveCourseOffline, updateCourseProgress, isOnline, showToast } = useApp();
  const course = courses.find((c) => c.id === courseId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!course) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-gray-500">{t('noResults')}</p>
        <button onClick={() => onNavigate('learn')} className="mt-4 btn-primary">{t('back')}</button>
      </div>
    );
  }

  const isCorrect = selectedAnswer === course.question.correctIndex;
  const canAccess = course.savedOffline || course.availableOffline || isOnline;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === course.question.correctIndex) {
      const newProgress = Math.min(100, course.progress + 10);
      updateCourseProgress(course.id, newProgress);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (!canAccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 animate-fade-in">
        <div className="card text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-error-50 text-3xl">🔒</div>
          <h2 className="text-lg font-bold text-ink">{t('offline')}</h2>
          <p className="mt-2 text-sm text-gray-500">{t('offlineModeNote')}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button onClick={() => onNavigate('offline-shelf')} className="btn-primary">{t('offlineShelf')}</button>
            <button onClick={() => onNavigate('learn')} className="btn-outline">{t('back')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <button onClick={() => onNavigate('learn')} className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-700">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        {t('back')}
      </button>

      <div className="mb-6">
        <span className="badge-blue">{t(course.subject)}</span>
        <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{course.title}</h1>
      </div>

      {/* Progress */}
      <div className="mb-6 card">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">{t('lessonProgress')}</span>
          <span className="font-bold text-primary-700">{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} color="primary" />
      </div>

      {/* Save for Offline */}
      <div className="mb-6">
        {course.savedOffline ? (
          <div className="flex items-center gap-3 rounded-xl bg-secondary-50 p-4">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-semibold text-secondary-700">{t('savedForOffline')}</span>
          </div>
        ) : (
          <button onClick={() => saveCourseOffline(course.id)} className="btn-secondary w-full">
            📥 {t('saveForOffline')}
          </button>
        )}
      </div>

      {/* Intro */}
      <div className="mb-4 card">
        <h2 className="mb-2 text-base font-bold text-ink">{t('lessonIntro')}</h2>
        <p className="text-sm leading-relaxed text-gray-600">{course.lessonIntro}</p>
      </div>

      {/* Explanation */}
      <div className="mb-4 card">
        <h2 className="mb-2 text-base font-bold text-ink">{t('lessonExplanation')}</h2>
        <p className="text-sm leading-relaxed text-gray-600">{course.lessonExplanation}</p>
      </div>

      {/* Visual Example */}
      <div className="mb-4 card">
        <h2 className="mb-3 text-base font-bold text-ink">{t('visualExample')}</h2>
        <div className="flex items-center justify-center rounded-xl bg-primary-50 py-8">
          {course.subject === 'mathematics' && course.id === 'math-fractions' ? (
            <FractionVisual />
          ) : (
            <div className="text-center">
              <span className="text-5xl">
                {course.subject === 'science' ? '🌱' : course.subject === 'english' ? '✍️' : course.subject === 'digital-literacy' ? '💻' : '🌍'}
              </span>
              <p className="mt-2 text-sm text-gray-500">{course.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Question */}
      <div className="mb-4 card">
        <h2 className="mb-3 text-base font-bold text-ink">{t('interactiveQuestion')}</h2>
        <p className="mb-4 text-sm font-medium text-gray-700">{course.question.prompt}</p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {course.question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const showResult = answered && isSelected;
            const showCorrect = answered && i === course.question.correctIndex;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                  showCorrect
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                    : showResult && !isCorrect
                    ? 'border-error-500 bg-error-50 text-error-700'
                    : 'border-gray-200 bg-white text-ink hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <span>{option}</span>
                {showCorrect && <span>✓</span>}
                {showResult && !isCorrect && <span>✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4">
            {isCorrect ? (
              <div className="rounded-xl bg-secondary-50 p-4">
                <p className="font-bold text-secondary-700">✓ {t('correct')}</p>
              </div>
            ) : (
              <div className="rounded-xl bg-error-50 p-4">
                <p className="font-bold text-error-700">✗ {t('incorrect')}</p>
                <button onClick={handleRetry} className="mt-2 btn-outline text-xs">
                  {t('retry')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FractionVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-2 gap-1">
        <div className="h-16 w-16 rounded bg-secondary-500"></div>
        <div className="h-16 w-16 rounded bg-secondary-500"></div>
        <div className="h-16 w-16 rounded bg-secondary-500"></div>
        <div className="h-16 w-16 rounded bg-gray-200"></div>
      </div>
      <p className="text-sm font-medium text-gray-600">3/4 shaded</p>
    </div>
  );
}

export function OfflineShelfPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, courses, removeOfflineCourse, storageUsed, storageTotal } = useApp();
  const savedCourses = courses.filter((c) => c.savedOffline);
  const pct = (storageUsed / storageTotal) * 100;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('offlineShelfHeading')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('offlineShelfDesc')}</p>

      {/* Storage */}
      <div className="mt-6 card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">{t('storage')}</h2>
          <span className="text-sm font-semibold text-gray-600">{storageUsed} MB / {storageTotal} MB</span>
        </div>
        <ProgressBar value={pct} color="secondary" />
        <p className="mt-2 text-xs text-secondary-600">🛡️ {t('storageProtected')}</p>
      </div>

      {/* Saved courses */}
      {savedCourses.length === 0 ? (
        <div className="mt-6 card">
          <EmptyState
            icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            title={t('emptyOfflineShelf')}
          />
          <div className="flex justify-center pb-4">
            <button onClick={() => onNavigate('learn')} className="btn-primary">{t('learn')}</button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {savedCourses.map((course) => (
            <div key={course.id} className="card-hover">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{course.subject === 'mathematics' ? '🔢' : course.subject === 'science' ? '🔬' : course.subject === 'english' ? '📖' : '💻'}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-500">{t(course.subject)}</p>
                    <h3 className="text-sm font-bold text-ink">{course.title}</h3>
                  </div>
                </div>
                <StatusBadge status="online" label={t('availableOffline')} />
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📦 {course.fileSize}</span>
                <span>📅 {course.downloadedDate || 'Today'}</span>
              </div>
              <div className="mt-3"><ProgressBar value={course.progress} size="sm" /></div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => onNavigate(`lesson:${course.id}`)} className="btn-primary flex-1 text-xs">
                  {t('open')}
                </button>
                <button onClick={() => removeOfflineCourse(course.id)} className="btn-danger text-xs">
                  {t('remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProgressPage() {
  const { t, students, currentStudentId } = useApp();
  const student = students.find((s) => s.id === currentStudentId) || students[0];
  const subjects = Object.entries(student.subjectProgress);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('myProgress')}</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <StatCard label={t('overallProgress')} value={`${student.overallProgress}%`} color="primary" />
        <StatCard label={t('lessonsCompleted')} value={student.lessonsCompleted} color="secondary" />
        <StatCard label={t('quizScore')} value={`${student.quizScore}%`} color="accent" />
        <StatCard label={t('digitalSkillsScore')} value={`${student.digitalSkills}%`} color="primary" />
        <StatCard label={t('learningStreak')} value={`${student.streak} ${t('days')}`} color="secondary" />
      </div>

      {/* Subject Progress */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('subjectProgress' as string) || t('progress')}</h2>
        <div className="space-y-4">
          {subjects.map(([subject, progress]) => (
            <div key={subject}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{t(subject)}</span>
                <span className="font-bold text-gray-600">{progress}%</span>
              </div>
              <ProgressBar value={progress} color={progress >= 70 ? 'secondary' : progress >= 50 ? 'primary' : 'accent'} />
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('achievements')}</h2>
        <div className="flex flex-wrap gap-3">
          {student.achievements.length > 0 ? (
            student.achievements.map((ach) => (
              <div key={ach} className="flex items-center gap-2 rounded-xl bg-accent-50 px-4 py-3">
                <span className="text-2xl">🏆</span>
                <span className="text-sm font-semibold text-accent-700">
                  {ach === 'first-quiz' ? t('firstQuiz') || 'First Quiz' : ach === 'five-lessons' ? '5 ' + t('lessonsCompleted') : ach === 'safety-beginner' ? t('cyberSafety') : ach === 'ten-lessons' ? '10 ' + t('lessonsCompleted') : ach}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">{t('noResults')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProfilePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, students, currentStudentId, resetDemo, setRole } = useApp();
  const student = students.find((s) => s.id === currentStudentId) || students[0];

  const handleReset = () => {
    if (window.confirm(t('resetDemoConfirm'))) {
      resetDemo();
      setRole('public');
      onNavigate('landing');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('profile')}</h1>

      <div className="mt-6 card text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-3xl font-bold text-primary-700">
          {student.name[0]}
        </div>
        <h2 className="text-xl font-bold text-ink">{student.name}</h2>
        <p className="text-sm text-gray-500">{t('class')}: {student.class}</p>
        <p className="mt-1 text-xs text-gray-400">{t('demoData')} · Government Senior Secondary School — Nabha</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t('overallProgress')} value={`${student.overallProgress}%`} color="primary" />
        <StatCard label={t('lessonsCompleted')} value={student.lessonsCompleted} color="secondary" />
        <StatCard label={t('quizScore')} value={`${student.quizScore}%`} color="accent" />
        <StatCard label={t('learningStreak')} value={`${student.streak}d`} color="secondary" />
      </div>

      <div className="mt-6 space-y-3">
        <button onClick={() => onNavigate('progress')} className="btn-outline w-full">
          {t('myProgress')}
        </button>
        <button onClick={handleReset} className="btn-danger w-full">
          {t('resetDemoData')}
        </button>
      </div>
    </div>
  );
}
