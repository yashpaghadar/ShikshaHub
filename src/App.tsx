import { useState, useCallback } from 'react';
import { AppProvider, useApp } from './AppContext';
import { Header, Sidebar, BottomNav, OfflineBanner, Footer } from './components/Layout';
import { ToastContainer } from './components/ui';
import { LandingPage, AboutPage, LoginPage } from './pages/Public';
import { StudentHome, LearnPage, LessonPage, OfflineShelfPage, ProgressPage, ProfilePage } from './pages/Student';
import { DigitalSkillsPage } from './pages/DigitalSkills';
import { TeacherDashboard, TeacherStudentsPage, TeacherAssignmentsPage, TeacherReportsPage } from './pages/Teacher';
import {
  AdminOverviewPage,
  AdminSchoolsPage,
  AdminUsersPage,
  AdminContentPage,
  AdminAnalyticsPage,
  BranchLearningNodePage,
} from './pages/Admin';

const studentNav = [
  { page: 'student-home', label: 'Home', icon: 'home' },
  { page: 'learn', label: 'Learn', icon: 'learn' },
  { page: 'digital-skills', label: 'Skills', icon: 'digital-skills' },
  { page: 'offline-shelf', label: 'Offline', icon: 'offline-shelf' },
  { page: 'progress', label: 'Progress', icon: 'progress' },
  { page: 'profile', label: 'Profile', icon: 'profile' },
];

const teacherNav = [
  { page: 'teacher-dashboard', label: 'Dashboard', icon: 'dashboard' },
  { page: 'teacher-students', label: 'Students', icon: 'students' },
  { page: 'teacher-assignments', label: 'Assignments', icon: 'assignments' },
  { page: 'teacher-reports', label: 'Reports', icon: 'reports' },
  { page: 'branch-node', label: 'Branch Node', icon: 'branch-node' },
];

const adminNav = [
  { page: 'admin-overview', label: 'Overview', icon: 'overview' },
  { page: 'admin-schools', label: 'Schools', icon: 'schools' },
  { page: 'admin-users', label: 'Users', icon: 'users' },
  { page: 'admin-content', label: 'Content', icon: 'content' },
  { page: 'admin-analytics', label: 'Analytics', icon: 'analytics' },
  { page: 'branch-node', label: 'Branch Node', icon: 'branch-node' },
];

function AppContent() {
  const { role, t } = useApp();
  const [currentPage, setCurrentPage] = useState('landing');

  const navigate = useCallback((page: string) => {
    if (page.startsWith('lesson:')) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Determine nav items based on role
  const navLabelMap: Record<string, string> = {
    'student-home': 'studentHome',
    'digital-skills': 'digitalSkills',
    'offline-shelf': 'offlineShelf',
    'teacher-dashboard': 'teacherDashboard',
    'teacher-students': 'students',
    'teacher-assignments': 'assignments',
    'teacher-reports': 'reports',
    'admin-overview': 'adminOverview',
    'admin-schools': 'schools',
    'admin-users': 'users',
    'admin-content': 'content',
    'admin-analytics': 'analytics',
    'branch-node': 'branchLearningNode',
  };

  let navItems: { page: string; label: string; icon: string }[] = [];
  if (role === 'student') navItems = studentNav.map((n) => ({ ...n, label: t(navLabelMap[n.page] || n.page) }));
  else if (role === 'teacher') navItems = teacherNav.map((n) => ({ ...n, label: t(navLabelMap[n.page] || n.page) }));
  else if (role === 'admin') navItems = adminNav.map((n) => ({ ...n, label: t(navLabelMap[n.page] || n.page) }));

  // Determine active page for nav highlighting
  const activePage = currentPage.startsWith('lesson:') ? 'learn' : currentPage;

  // Render the current page
  const renderPage = () => {
    if (currentPage.startsWith('lesson:')) {
      const courseId = currentPage.split(':')[1];
      return <LessonPage courseId={courseId} onNavigate={navigate} />;
    }

    switch (currentPage) {
      // Public
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      // Student
      case 'student-home':
        return <StudentHome onNavigate={navigate} />;
      case 'learn':
        return <LearnPage onNavigate={navigate} />;
      case 'digital-skills':
        return <DigitalSkillsPage />;
      case 'offline-shelf':
        return <OfflineShelfPage onNavigate={navigate} />;
      case 'progress':
        return <ProgressPage />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      // Teacher
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'teacher-students':
        return <TeacherStudentsPage />;
      case 'teacher-assignments':
        return <TeacherAssignmentsPage />;
      case 'teacher-reports':
        return <TeacherReportsPage />;
      // Admin
      case 'admin-overview':
        return <AdminOverviewPage />;
      case 'admin-schools':
        return <AdminSchoolsPage />;
      case 'admin-users':
        return <AdminUsersPage />;
      case 'admin-content':
        return <AdminContentPage />;
      case 'admin-analytics':
        return <AdminAnalyticsPage />;
      // Technical Demo
      case 'branch-node':
        return <BranchLearningNodePage />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  const showChrome = role !== 'public' || currentPage === 'about';
  const showSidebar = role !== 'public' && navItems.length > 0;
  const showBottomNav = role !== 'public' && navItems.length > 0;
  const showFooter = role === 'public';

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header onNavigate={navigate} />
      <OfflineBanner />

      <div className="flex flex-1">
        {showSidebar && <Sidebar items={navItems} activePage={activePage} onNavigate={navigate} />}

        <main className={`flex-1 ${showBottomNav ? 'pb-16 lg:pb-0' : ''}`}>
          {renderPage()}
        </main>
      </div>

      {showFooter && <Footer onNavigate={navigate} />}
      {showBottomNav && <BottomNav items={navItems} activePage={activePage} onNavigate={navigate} />}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
