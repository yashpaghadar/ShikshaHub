import { useApp } from '../AppContext';

export function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useApp();

  const features = [
    { icon: '📶', title: t('featureOfflineFirst'), desc: t('featureOfflineFirstDesc'), color: 'bg-secondary-50 text-secondary-700' },
    { icon: '🏫', title: t('featureLocalLearning'), desc: t('featureLocalLearningDesc'), color: 'bg-primary-50 text-primary-700' },
    { icon: '🌐', title: t('featureMultilingual'), desc: t('featureMultilingualDesc'), color: 'bg-accent-50 text-accent-700' },
    { icon: '💻', title: t('featureDigitalLiteracy'), desc: t('featureDigitalLiteracyDesc'), color: 'bg-primary-50 text-primary-700' },
    { icon: '👩‍🏫', title: t('featureTeacherInsights'), desc: t('featureTeacherInsightsDesc'), color: 'bg-secondary-50 text-secondary-700' },
    { icon: '📱', title: t('featureLowEndFriendly'), desc: t('featureLowEndFriendlyDesc'), color: 'bg-accent-50 text-accent-700' },
  ];

  const lowConn = [
    { icon: '📥', title: t('learnOfflineTitle'), desc: t('learnOfflineDesc') },
    { icon: '🔄', title: t('syncLaterTitle'), desc: t('syncLaterDesc') },
    { icon: '📊', title: t('lowDataUsageTitle'), desc: t('lowDataUsageDesc') },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-surface px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="badge-blue mb-6">{t('prototypeLabel')}</span>
          <h1 className="text-3xl font-bold leading-tight text-ink sm:text-5xl sm:leading-tight">
            {t('heroHeading')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => onNavigate('login')} className="btn-primary w-full sm:w-auto">
              {t('startLearning')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button onClick={() => onNavigate('digital-skills')} className="btn-outline w-full sm:w-auto">
              {t('exploreDigitalSkills')}
            </button>
          </div>
        </div>
      </section>

      {/* Why ShikshaHub */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">{t('whyShikshaHub')}</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="card-hover">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Low Connectivity */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">{t('lowConnectivityHeading')}</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {lowConn.map((item, i) => (
              <div key={i} className="card text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-50 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('heroHeading')}</h2>
          <p className="mt-3 text-primary-100">{t('tagline')}</p>
          <button onClick={() => onNavigate('login')} className="mt-6 btn bg-white text-primary-700 hover:bg-primary-50">
            {t('startLearning')}
          </button>
        </div>
      </section>
    </div>
  );
}

export function AboutPage() {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 animate-fade-in sm:px-6">
      <h1 className="text-3xl font-bold text-ink">{t('aboutHeading')}</h1>

      <div className="mt-8 card">
        <h2 className="text-xl font-bold text-ink">{t('theChallenge')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{t('theChallengeDesc')}</p>
      </div>

      <div className="mt-5 card">
        <h2 className="text-xl font-bold text-ink">{t('ourSolution')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{t('ourSolutionDesc')}</p>
      </div>

      <div className="mt-5 card">
        <h2 className="text-xl font-bold text-ink">{t('howItWorks')}</h2>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-4 rounded-xl bg-primary-50 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">1</span>
            <div>
              <p className="font-semibold text-ink">{t('howItWorksOnline')}</p>
              <p className="mt-1 text-sm text-gray-600">{t('howItWorksOnlineDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-secondary-50 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-600 text-sm font-bold text-white">2</span>
            <div>
              <p className="font-semibold text-ink">{t('howItWorksOffline')}</p>
              <p className="mt-1 text-sm text-gray-600">{t('howItWorksOfflineDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-accent-50 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">3</span>
            <div>
              <p className="font-semibold text-ink">{t('howItWorksShelf')}</p>
              <p className="mt-1 text-sm text-gray-600">{t('howItWorksShelfDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, setRole } = useApp();

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setRole(role);
    onNavigate(role === 'student' ? 'student-home' : role === 'teacher' ? 'teacher-dashboard' : 'admin-overview');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-ink">{t('welcomeToShikshaHub')}</h1>
            <p className="mt-1 text-sm text-gray-500">{t('loginSubtitle')}</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('studentId')}</label>
              <input className="input" placeholder="STU-2026-001" defaultValue="STU-2026-001" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('password')}</label>
              <input type="password" className="input" placeholder="••••••••" defaultValue="demo" />
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-center text-sm font-medium text-gray-500">{t('continueAs')}</p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <button onClick={() => handleRoleSelect('student')} className="btn-primary">
                {t('student')}
              </button>
              <button onClick={() => handleRoleSelect('teacher')} className="btn-secondary">
                {t('teacher')}
              </button>
              <button onClick={() => handleRoleSelect('admin')} className="btn-outline">
                {t('admin')}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-secondary-50 p-4 text-center">
            <p className="text-sm font-medium text-secondary-700">📡 {t('offlineModeNote')}</p>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">{t('demoData')}</p>
        </div>
      </div>
    </div>
  );
}
