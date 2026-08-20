import { useApp } from '../AppContext';
import type { Role, Language } from '../types';
import { StatusBadge } from './ui';

const languageOptions: { code: Language; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', short: 'ਪੰ' },
];

export function Header({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, role, language, setLanguage, isOnline, toggleOnline, setRole } = useApp();

  const handleLogout = () => {
    setRole('public');
    onNavigate('landing');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate(role === 'public' ? 'landing' : role === 'student' ? 'student-home' : role === 'teacher' ? 'teacher-dashboard' : 'admin-overview')}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block text-base font-bold leading-tight text-ink">ShikshaHub</span>
            <span className="block text-[10px] font-medium leading-tight text-gray-500">{t('prototypeLabel')}</span>
          </div>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language selector */}
          <div className="hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
            {languageOptions.map((opt) => (
              <button
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  language === opt.code
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {opt.short}
              </button>
            ))}
          </div>

          {/* Mobile language dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-semibold text-ink sm:hidden"
          >
            {languageOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Internet status toggle */}
          <button
            onClick={toggleOnline}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 hover:bg-gray-50"
            title={t('internetStatus')}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-secondary-500' : 'bg-error-500'}`}
            />
            <span className="hidden text-xs font-semibold sm:inline">
              {isOnline ? t('online') : t('offline')}
            </span>
          </button>

          {/* Role / logout */}
          {role !== 'public' && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Sidebar({
  items,
  activePage,
  onNavigate,
}: {
  items: { page: string; label: string; icon: string }[];
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  const iconMap: Record<string, string> = {
    home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
    learn: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    'digital-skills': 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    'offline-shelf': 'M21 8v13H3V8M1 3h22v5H1z M10 12h4',
    progress: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    profile: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
    dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    students: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
    lessons: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    assignments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 2 2 0 00-2-2h-2a2 2 0 00-2 2z',
    reports: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    overview: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    schools: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
    content: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    analytics: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    'branch-node': 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  };

  return (
    <aside className="hidden w-60 shrink-0 border-r border-gray-200 bg-white lg:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-4">
        {items.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`nav-link ${activePage === item.page ? 'nav-link-active' : 'nav-link-inactive'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={iconMap[item.icon] || iconMap.home} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function BottomNav({
  items,
  activePage,
  onNavigate,
}: {
  items: { page: string; label: string; icon: string }[];
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  const iconMap: Record<string, string> = {
    home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
    learn: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    'digital-skills': 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    'offline-shelf': 'M21 8v13H3V8M1 3h22v5H1z M10 12h4',
    progress: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    profile: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
    dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    students: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z',
    lessons: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    assignments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 2 2 0 00-2-2h-2a2 2 0 00-2 2z',
    reports: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    overview: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    schools: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z',
    content: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6',
    analytics: 'M3 3v18h18 M7 16l4-4 4 4 5-5',
    'branch-node': 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-200 bg-white px-1 py-1.5 lg:hidden">
      {items.map((item) => (
        <button
          key={item.page}
          onClick={() => onNavigate(item.page)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-semibold transition-colors ${
            activePage === item.page ? 'text-primary-700' : 'text-gray-400'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconMap[item.icon] || iconMap.home} />
          </svg>
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function OfflineBanner() {
  const { isOnline, syncStatus, t } = useApp();
  if (isOnline && syncStatus !== 'syncing') return null;

  return (
    <div
      className={`px-4 py-2.5 text-center text-sm font-medium ${
        syncStatus === 'syncing'
          ? 'bg-primary-50 text-primary-700'
          : 'bg-error-50 text-error-700'
      }`}
    >
      {syncStatus === 'syncing' ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
          </svg>
          {t('syncingProgress')}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-error-500" />
          {t('youAreOffline')} — {t('offlineDontWorry')}
        </span>
      )}
    </div>
  );
}

export function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t, language, setLanguage } = useApp();
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-base font-bold text-ink">ShikshaHub</p>
            <p className="text-sm text-gray-500">{t('tagline')}</p>
            <p className="mt-1 text-xs text-gray-400">{t('prototypeLabel')}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button onClick={() => onNavigate('about')} className="text-sm text-gray-500 hover:text-primary-700">
              {t('about')}
            </button>
            <button className="text-sm text-gray-500 hover:text-primary-700">{t('accessibility')}</button>
            <button className="text-sm text-gray-500 hover:text-primary-700">{t('help')}</button>
            <button className="text-sm text-gray-500 hover:text-primary-700">{t('contact')}</button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'font-semibold text-primary-700' : 'text-gray-500'}
            >
              English
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={language === 'hi' ? 'font-semibold text-primary-700' : 'text-gray-500'}
            >
              हिन्दी
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setLanguage('pa')}
              className={language === 'pa' ? 'font-semibold text-primary-700' : 'text-gray-500'}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
