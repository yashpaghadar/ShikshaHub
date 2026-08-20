import { useApp } from '../AppContext';
import { ProgressBar, StatCard, StatusBadge } from '../components/ui';

export function AdminOverviewPage() {
  const { t } = useApp();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('adminOverviewHeading')}</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <StatCard label={t('schoolsBranches')} value={12} color="primary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('studentsCount')} value="1,248" color="secondary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('teachers')} value={86} color="accent"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('courses')} value={54} color="primary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <StatCard label={t('offlineSessions')} value="3,482" color="secondary"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8v13H3V8M1 3h22v5H1z" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
      </div>

      {/* Branch Connectivity */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('branchConnectivity')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: t('branchA'), status: 'online' as const },
            { name: t('branchB'), status: 'offline' as const },
            { name: t('branchC'), status: 'online' as const },
            { name: t('branchD'), status: 'syncing' as const },
          ].map((branch, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">{branch.name}</h3>
                <StatusBadge status={branch.status} label={branch.status === 'online' ? t('online') : branch.status === 'offline' ? t('offline') : t('syncing')} />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {branch.status === 'online' ? 'All systems operational' : branch.status === 'offline' ? 'Serving from local node' : 'Syncing in progress'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Activity Chart */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('learningActivity')}</h2>
        <div className="card">
          <div className="flex h-48 items-end justify-around gap-2">
            {[
              { day: 'Mon', value: 65 },
              { day: 'Tue', value: 78 },
              { day: 'Wed', value: 82 },
              { day: 'Thu', value: 70 },
              { day: 'Fri', value: 88 },
              { day: 'Sat', value: 45 },
              { day: 'Sun', value: 30 },
            ].map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-700">{d.value}%</span>
                <div className="flex w-full max-w-[40px] h-32 items-end">
                  <div
                    className="w-full rounded-t-lg bg-primary-500 transition-all duration-700"
                    style={{ height: `${d.value}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSchoolsPage() {
  const { t } = useApp();
  const schools = [
    { name: 'GSSS Nabha', branch: t('branchA'), students: 320, status: 'online' as const },
    { name: 'GMS Nabha', branch: t('branchB'), students: 180, status: 'offline' as const },
    { name: 'GSSS Duladi', branch: t('branchC'), students: 245, status: 'online' as const },
    { name: 'GMS Alour', branch: t('branchD'), students: 150, status: 'syncing' as const },
    { name: 'GSSS Bhadson', branch: t('branchA'), students: 198, status: 'online' as const },
    { name: 'GMS Kauri', branch: t('branchC'), students: 155, status: 'online' as const },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('schools')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('manageSchools')}</p>

      <div className="mt-6 space-y-3">
        {schools.map((school, i) => (
          <div key={i} className="card-hover">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{school.name}</h3>
                  <p className="text-xs text-gray-500">{school.branch} · {school.students} {t('studentsCount').toLowerCase()}</p>
                </div>
              </div>
              <StatusBadge status={school.status} label={school.status === 'online' ? t('online') : school.status === 'offline' ? t('offline') : t('syncing')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminUsersPage() {
  const { t, students } = useApp();
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('users')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('manageUsers')}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard label={t('studentsCount')} value="1,248" color="primary" />
        <StatCard label={t('teachers')} value={86} color="secondary" />
        <StatCard label={t('totalUsers')} value="1,334" color="accent" />
      </div>

      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('students')} · 8A</h2>
        <div className="space-y-2">
          {students.map((student) => (
            <div key={student.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                {student.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">{student.name}</p>
                <p className="text-xs text-gray-500">{t('class')}: {student.class}</p>
              </div>
              <div className="hidden w-24 sm:block"><ProgressBar value={student.overallProgress} size="sm" /></div>
              <span className="text-sm font-bold text-gray-700">{student.overallProgress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminContentPage() {
  const { t, courses } = useApp();
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('content')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('manageContent')}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="card-hover">
            <div className="flex items-start justify-between">
              <span className="text-xl">{course.subject === 'mathematics' ? '🔢' : course.subject === 'science' ? '🔬' : course.subject === 'english' ? '📖' : course.subject === 'digital-literacy' ? '💻' : '🌍'}</span>
              {course.availableOffline && <StatusBadge status="online" label={t('availableOffline')} />}
            </div>
            <h3 className="mt-2 text-sm font-bold text-ink">{course.title}</h3>
            <p className="text-xs text-gray-500">{t(course.subject)} · {t(course.difficulty)}</p>
            <div className="mt-3"><ProgressBar value={course.progress} size="sm" /></div>
            <p className="mt-2 text-xs text-gray-400">📦 {course.fileSize} · {t('estTime')}: {course.estimatedTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminAnalyticsPage() {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('analytics')}</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={t('studentParticipation')} value="87%" color="primary" />
        <StatCard label={t('completionRate')} value="72%" color="secondary" />
        <StatCard label={t('offlineSessions')} value="3,482" color="accent" />
        <StatCard label={t('contentStatus')} value={t('active')} color="secondary" />
      </div>

      {/* Weekly activity */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('learningActivity')}</h2>
        <div className="flex h-48 items-end justify-around gap-2">
          {[
            { day: 'Mon', value: 65 },
            { day: 'Tue', value: 78 },
            { day: 'Wed', value: 82 },
            { day: 'Thu', value: 70 },
            { day: 'Fri', value: 88 },
            { day: 'Sat', value: 45 },
            { day: 'Sun', value: 30 },
          ].map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold text-gray-700">{d.value}%</span>
              <div className="flex w-full max-w-[40px] h-32 items-end">
                <div className="w-full rounded-t-lg bg-secondary-500 transition-all duration-700" style={{ height: `${d.value}%` }} />
              </div>
              <span className="text-[10px] font-medium text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Branch connectivity */}
      <div className="mt-6 card">
        <h2 className="mb-4 text-base font-bold text-ink">{t('branchConnectivity')}</h2>
        <div className="space-y-3">
          {[
            { name: t('branchA'), value: 95, status: 'online' as const },
            { name: t('branchB'), value: 0, status: 'offline' as const },
            { name: t('branchC'), value: 88, status: 'online' as const },
            { name: t('branchD'), value: 65, status: 'syncing' as const },
          ].map((branch, i) => (
            <div key={i}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{branch.name}</span>
                <StatusBadge status={branch.status} label={branch.status === 'online' ? t('online') : branch.status === 'offline' ? t('offline') : t('syncing')} />
              </div>
              <ProgressBar value={branch.value} size="sm" color={branch.status === 'online' ? 'secondary' : branch.status === 'offline' ? 'error' : 'accent'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BranchLearningNodePage() {
  const { t, isOnline, syncStatus } = useApp();

  const nodes = [
    { label: t('azureCloud'), icon: '☁️', status: isOnline ? 'online' : 'offline', statusLabel: isOnline ? t('connected') : t('offline') },
    { label: t('branchNode'), icon: '🖥️', status: 'online', statusLabel: t('branchNodeActive') },
    { label: t('localNetwork'), icon: '📡', status: 'online', statusLabel: t('localNetworkAvailable') },
    { label: t('studentDevices'), icon: '📱', status: 'online', statusLabel: t('active') },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('branchLearningNode')}</h1>

      {/* Architecture diagram */}
      <div className="mt-6 card">
        <div className="flex flex-col items-center gap-3">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className={`flex items-center gap-3 rounded-2xl border-2 px-6 py-4 shadow-card ${
                node.status === 'online' ? 'bg-secondary-50 border-secondary-300' : 'bg-error-50 border-error-300'
              }`}>
                <span className="text-2xl">{node.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{node.label}</p>
                  <p className="text-xs text-gray-500">{node.statusLabel}</p>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ${node.status === 'online' ? 'bg-secondary-500' : 'bg-error-500'}`} />
              </div>
              {i < nodes.length - 1 && (
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 0v28M6 22l6 6 6-6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs text-gray-500">{t('azureCloud')}</p>
          <div className="mt-2"><StatusBadge status={isOnline ? 'online' : 'offline'} label={isOnline ? t('connected') : t('offline')} /></div>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">{t('branchNode')}</p>
          <div className="mt-2"><StatusBadge status="online" label={t('branchNodeActive')} /></div>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">{t('localNetwork')}</p>
          <div className="mt-2"><StatusBadge status="online" label={t('localNetworkAvailable')} /></div>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">{t('contentStatus')}</p>
          <div className="mt-2">
            <StatusBadge
              status={syncStatus === 'synced' ? 'online' : syncStatus === 'syncing' ? 'syncing' : 'warning'}
              label={syncStatus === 'synced' ? t('contentSyncUpToDate') : syncStatus === 'syncing' ? t('syncingProgress') : t('waitingForInternet')}
            />
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 rounded-xl bg-primary-50 p-5">
        <p className="text-sm leading-relaxed text-primary-700">{t('branchNodeDesc')}</p>
      </div>
    </div>
  );
}
