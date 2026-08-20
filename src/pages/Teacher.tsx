import { useState } from 'react';
import { useApp } from '../AppContext';
import { ProgressBar, StatCard, StatusBadge, Modal, EmptyState } from '../components/ui';
import type { Student } from '../types';

export function TeacherDashboard() {
  const { t, students, assignments, courses } = useApp();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const classStudents = students.filter((s) => s.class === '8A');
  const avgProgress = Math.round(classStudents.reduce((sum, s) => sum + s.overallProgress, 0) / classStudents.length);
  const avgQuiz = Math.round(classStudents.reduce((sum, s) => sum + s.quizScore, 0) / classStudents.length);
  const avgDigital = Math.round(classStudents.reduce((sum, s) => sum + s.digitalSkills, 0) / classStudents.length);
  const needingAttention = classStudents.filter((s) => s.needsAttention);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('teacherDashboard')}</h1>
      <p className="mt-1 text-sm text-gray-500">Ms. Manpreet Kaur · Government Senior Secondary School — Nabha</p>

      {/* Class Overview */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('classOverview')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard label={t('class')} value="8A" color="primary" />
          <StatCard label={t('studentsCount')} value={classStudents.length} color="secondary" />
          <StatCard label={t('lessonsCompletedPct')} value={`${avgProgress}%`} color="primary" />
          <StatCard label={t('averageQuizScore')} value={`${avgQuiz}%`} color="accent" />
          <StatCard label={t('digitalSkillsScore')} value={`${avgDigital}%`} color="secondary" />
        </div>
      </div>

      {/* Students Needing Attention */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('studentsNeedingAttention')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {needingAttention.length > 0 ? (
            needingAttention.map((student) => (
              <div key={student.id} className="card-hover">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-100 text-lg font-bold text-accent-700">
                    {student.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{student.name}</h3>
                    <p className="text-xs text-gray-500">{student.needsAttention?.reason}</p>
                  </div>
                </div>
                <div className="mt-3"><ProgressBar value={student.overallProgress} size="sm" color="accent" /></div>
                <button onClick={() => setSelectedStudent(student)} className="mt-3 btn-outline w-full text-xs">
                  {t('viewStudent')}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full card">
              <EmptyState icon={<span className="text-2xl">✅</span>} title={t('noResults')} />
            </div>
          )}
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('assignments')}</h2>
        <div className="card">
          {assignments.length > 0 ? (
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.subject} — {a.lesson}</p>
                    <p className="text-xs text-gray-500">{t('class')}: {a.className} · {t('dueDate')}: {a.dueDate}</p>
                  </div>
                  <StatusBadge status="online" label="✓" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">{t('noAssignments')}</p>
          )}
        </div>
      </div>

      {/* Student Detail Modal */}
      <Modal open={!!selectedStudent} onClose={() => setSelectedStudent(null)} title={t('studentDetail')}>
        {selectedStudent && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                {selectedStudent.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{t('class')}: {selectedStudent.class}</p>
              </div>
            </div>

            {selectedStudent.needsAttention && (
              <div className="mb-4 rounded-xl bg-accent-50 p-3">
                <p className="text-sm font-semibold text-accent-700">⚠️ {t('needsAttention')}</p>
                <p className="mt-1 text-sm text-accent-600">{selectedStudent.needsAttention.reason}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{t('overallProgress')}</p>
                <p className="text-lg font-bold text-ink">{selectedStudent.overallProgress}%</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{t('quizScore')}</p>
                <p className="text-lg font-bold text-ink">{selectedStudent.quizScore}%</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{t('lessonsCompleted')}</p>
                <p className="text-lg font-bold text-ink">{selectedStudent.lessonsCompleted}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{t('digitalSkillsScore')}</p>
                <p className="text-lg font-bold text-ink">{selectedStudent.digitalSkills}%</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-ink">{t('progress')}</p>
              <div className="space-y-3">
                {Object.entries(selectedStudent.subjectProgress).map(([subject, progress]) => (
                  <div key={subject}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-gray-600">{t(subject)}</span>
                      <span className="font-semibold text-gray-700">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} size="sm" color={progress < 50 ? 'error' : progress < 75 ? 'accent' : 'secondary'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function TeacherStudentsPage() {
  const { t, students } = useApp();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const classStudents = students.filter((s) => s.class === '8A');

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('students')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('class')}: 8A · {classStudents.length} {t('studentsCount').toLowerCase()}</p>

      <div className="mt-6 space-y-3">
        {classStudents.map((student) => (
          <div key={student.id} className="card-hover">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                {student.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-ink">{student.name}</h3>
                <p className="text-xs text-gray-500">{t('overallProgress')}: {student.overallProgress}% · {t('quizScore')}: {student.quizScore}%</p>
              </div>
              <div className="hidden w-32 sm:block"><ProgressBar value={student.overallProgress} size="sm" /></div>
              {student.needsAttention && <StatusBadge status="warning" label="!" />}
              <button onClick={() => setSelectedStudent(student)} className="btn-outline text-xs">
                {t('viewStudent')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selectedStudent} onClose={() => setSelectedStudent(null)} title={t('studentDetail')}>
        {selectedStudent && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                {selectedStudent.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{t('class')}: {selectedStudent.class}</p>
              </div>
            </div>
            {selectedStudent.needsAttention && (
              <div className="mb-4 rounded-xl bg-accent-50 p-3">
                <p className="text-sm font-semibold text-accent-700">⚠️ {t('needsAttention')}</p>
                <p className="mt-1 text-sm text-accent-600">{selectedStudent.needsAttention.reason}</p>
              </div>
            )}
            <div className="space-y-3">
              {Object.entries(selectedStudent.subjectProgress).map(([subject, progress]) => (
                <div key={subject}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600">{t(subject)}</span>
                    <span className="font-semibold text-gray-700">{progress}%</span>
                  </div>
                  <ProgressBar value={progress} size="sm" color={progress < 50 ? 'error' : progress < 75 ? 'accent' : 'secondary'} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function TeacherAssignmentsPage() {
  const { t, assignments, addAssignment, courses } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [className, setClassName] = useState('8A');
  const [subject, setSubject] = useState('mathematics');
  const [lesson, setLesson] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!lesson.trim() || !dueDate.trim()) return;
    addAssignment({
      id: `a${Date.now()}`,
      className,
      subject,
      lesson,
      dueDate,
      created: true,
    });
    setShowForm(false);
    setLesson('');
    setDueDate('');
  };

  const subjectCourses = courses.filter((c) => c.subject === subject);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('assignments')}</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          + {t('createAssignment')}
        </button>
      </div>

      {/* Assignments list */}
      <div className="mt-6 space-y-3">
        {assignments.length > 0 ? (
          assignments.map((a) => (
            <div key={a.id} className="card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-ink">{a.subject} — {a.lesson}</p>
                  <p className="text-xs text-gray-500">{t('class')}: {a.className} · {t('dueDate')}: {a.dueDate}</p>
                </div>
                <StatusBadge status="online" label="✓" />
              </div>
            </div>
          ))
        ) : (
          <div className="card">
            <EmptyState
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2 2 2 0 00-2-2h-2a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              title={t('noAssignments')}
            />
          </div>
        )}
      </div>

      {/* Create Assignment Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title={t('createAssignment')}>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('class')}</label>
            <select className="input" value={className} onChange={(e) => setClassName(e.target.value)}>
              <option value="8A">8A</option>
              <option value="8B">8B</option>
              <option value="9A">9A</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('subject')}</label>
            <select
              className="input"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setLesson(''); }}
            >
              <option value="mathematics">{t('mathematics')}</option>
              <option value="science">{t('science')}</option>
              <option value="english">{t('english')}</option>
              <option value="digital-literacy">{t('digitalLiteracy')}</option>
              <option value="general-knowledge">{t('generalKnowledge')}</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('lesson')}</label>
            <select className="input" value={lesson} onChange={(e) => setLesson(e.target.value)}>
              <option value="">{t('selectOption')}</option>
              {subjectCourses.map((c) => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('dueDate')}</label>
            <input type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSubmit} disabled={!lesson || !dueDate} className="btn-primary flex-1">
              {t('assignLesson')}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-ghost">{t('cancel')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function TeacherReportsPage() {
  const { t, students } = useApp();
  const classStudents = students.filter((s) => s.class === '8A');
  const avgProgress = Math.round(classStudents.reduce((sum, s) => sum + s.overallProgress, 0) / classStudents.length);
  const avgQuiz = Math.round(classStudents.reduce((sum, s) => sum + s.quizScore, 0) / classStudents.length);
  const avgDigital = Math.round(classStudents.reduce((sum, s) => sum + s.digitalSkills, 0) / classStudents.length);
  const needingSupport = classStudents.filter((s) => s.needsAttention).length;

  // Simple SVG bar chart
  const chartData = [
    { label: t('mathematics'), value: Math.round(classStudents.reduce((sum, s) => sum + s.subjectProgress.mathematics, 0) / classStudents.length) },
    { label: t('science'), value: Math.round(classStudents.reduce((sum, s) => sum + s.subjectProgress.science, 0) / classStudents.length) },
    { label: t('english'), value: Math.round(classStudents.reduce((sum, s) => sum + s.subjectProgress.english, 0) / classStudents.length) },
    { label: t('digitalLiteracy'), value: Math.round(classStudents.reduce((sum, s) => sum + s.subjectProgress['digital-literacy'], 0) / classStudents.length) },
    { label: t('generalKnowledge'), value: Math.round(classStudents.reduce((sum, s) => sum + s.subjectProgress['general-knowledge'], 0) / classStudents.length) },
  ];
  const maxVal = 100;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('teacherAnalytics')}</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={t('completionRate')} value={`${avgProgress}%`} color="primary" />
        <StatCard label={t('averageQuizScore')} value={`${avgQuiz}%`} color="accent" />
        <StatCard label={t('digitalSkillsScore')} value={`${avgDigital}%`} color="secondary" />
        <StatCard label={t('studentsRequiringSupport')} value={needingSupport} color="error" />
      </div>

      {/* Bar Chart */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('learningActivity')}</h2>
        <div className="flex h-48 items-end justify-around gap-2">
          {chartData.map((item, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold text-gray-700">{item.value}%</span>
              <div className="flex w-full max-w-[60px] h-32 items-end">
                <div
                  className="w-full rounded-t-lg bg-primary-500 transition-all duration-700"
                  style={{ height: `${(item.value / maxVal) * 100}%` }}
                />
              </div>
              <span className="text-center text-[10px] font-medium text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student ranking */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('students')}</h2>
        <div className="space-y-2">
          {[...classStudents].sort((a, b) => b.overallProgress - a.overallProgress).map((student, i) => (
            <div key={student.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
              <span className="flex-1 text-sm font-semibold text-ink">{student.name}</span>
              <span className="text-sm font-bold text-primary-700">{student.overallProgress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
