import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Role, Language, Course, Student, Assignment, DigitalSkillModule, FileItem, Toast } from './types';
import { translate } from './i18n';
import {
  initialCourses,
  initialStudents,
  initialDigitalSkills,
  initialFiles,
  initialAssignments,
} from './data';

const STORAGE_KEY = 'shikshahub-demo-state';

interface PersistedState {
  role: Role;
  language: Language;
  isOnline: boolean;
  courses: Course[];
  students: Student[];
  assignments: Assignment[];
  digitalSkills: DigitalSkillModule[];
  files: FileItem[];
  storageUsed: number;
  currentStudentId: string;
}

interface AppContextValue extends PersistedState {
  syncStatus: 'synced' | 'waiting' | 'syncing';
  toasts: Toast[];
  t: (key: string) => string;
  setRole: (role: Role) => void;
  setLanguage: (lang: Language) => void;
  toggleOnline: () => void;
  setOnline: (online: boolean) => void;
  saveCourseOffline: (courseId: string) => void;
  removeOfflineCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  addAssignment: (assignment: Assignment) => void;
  updateDigitalSkillProgress: (moduleId: string, progress: number) => void;
  addFile: (name: string, type: 'folder' | 'file', parent: string | null) => void;
  renameFile: (id: string, name: string) => void;
  moveFile: (id: string, newParent: string | null) => void;
  deleteFile: (id: string) => void;
  resetDemo: () => void;
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const defaultState: PersistedState = {
  role: 'public',
  language: 'en',
  isOnline: true,
  courses: initialCourses,
  students: initialStudents,
  assignments: initialAssignments,
  digitalSkills: initialDigitalSkills,
  files: initialFiles,
  storageUsed: 720,
  currentStudentId: 'aarav',
};

const AppContext = createContext<AppContextValue | null>(null);

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      return { ...defaultState, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaultState;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'waiting' | 'syncing'>(
    state.isOnline ? 'synced' : 'waiting'
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const t = useCallback((key: string) => translate(state.language, key), [state.language]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const setRole = useCallback((role: Role) => {
    setState((prev) => ({ ...prev, role }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setState((prev) => ({ ...prev, language }));
  }, []);

  const setOnline = useCallback(
    (online: boolean) => {
      setState((prev) => {
        if (online === prev.isOnline) return prev;
        if (online) {
          setSyncStatus('syncing');
          setTimeout(() => setSyncStatus('synced'), 2200);
          showToast(translate(state.language, 'youAreOnline'), 'success');
        } else {
          setSyncStatus('waiting');
          showToast(translate(state.language, 'youAreOffline'), 'warning');
        }
        return { ...prev, isOnline: online };
      });
    },
    [showToast, state.language]
  );

  const toggleOnline = useCallback(() => {
    setOnline(!state.isOnline);
  }, [state.isOnline, setOnline]);

  const saveCourseOffline = useCallback(
    (courseId: string) => {
      setState((prev) => {
        const courses = prev.courses.map((c) =>
          c.id === courseId ? { ...c, savedOffline: true, availableOffline: true } : c
        );
        const course = prev.courses.find((c) => c.id === courseId);
        const sizeMb = course ? parseInt(course.fileSize) : 0;
        return {
          ...prev,
          courses,
          storageUsed: Math.min(prev.storageUsed + sizeMb, prev.storageUsed + 500),
        };
      });
      showToast(translate(state.language, 'lessonSavedOffline'), 'success');
    },
    [showToast, state.language]
  );

  const removeOfflineCourse = useCallback(
    (courseId: string) => {
      setState((prev) => {
        const courses = prev.courses.map((c) =>
          c.id === courseId ? { ...c, savedOffline: false } : c
        );
        const course = prev.courses.find((c) => c.id === courseId);
        const sizeMb = course ? parseInt(course.fileSize) : 0;
        return {
          ...prev,
          courses,
          storageUsed: Math.max(prev.storageUsed - sizeMb, 0),
        };
      });
      showToast(translate(state.language, 'removedFromOffline'), 'info');
    },
    [showToast, state.language]
  );

  const updateCourseProgress = useCallback(
    (courseId: string, progress: number) => {
      setState((prev) => ({
        ...prev,
        courses: prev.courses.map((c) =>
          c.id === courseId ? { ...c, progress: Math.max(c.progress, progress) } : c
        ),
      }));
      showToast(translate(state.language, 'progressSaved'), 'success');
    },
    [showToast, state.language]
  );

  const addAssignment = useCallback(
    (assignment: Assignment) => {
      setState((prev) => ({
        ...prev,
        assignments: [...prev.assignments, { ...assignment, created: true }],
      }));
      showToast(translate(state.language, 'assignmentCreated'), 'success');
    },
    [showToast, state.language]
  );

  const updateDigitalSkillProgress = useCallback(
    (moduleId: string, progress: number) => {
      setState((prev) => ({
        ...prev,
        digitalSkills: prev.digitalSkills.map((m) =>
          m.id === moduleId ? { ...m, progress: Math.max(m.progress, progress) } : m
        ),
      }));
      showToast(translate(state.language, 'progressSaved'), 'success');
    },
    [showToast, state.language]
  );

  const addFile = useCallback(
    (name: string, type: 'folder' | 'file', parent: string | null) => {
      setState((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          { id: `f${Date.now()}`, name, type, parent },
        ],
      }));
      showToast(
        type === 'folder'
          ? translate(state.language, 'folderCreated')
          : translate(state.language, 'fileRenamed'),
        'success'
      );
    },
    [showToast, state.language]
  );

  const renameFile = useCallback(
    (id: string, name: string) => {
      setState((prev) => ({
        ...prev,
        files: prev.files.map((f) => (f.id === id ? { ...f, name } : f)),
      }));
      showToast(translate(state.language, 'fileRenamed'), 'success');
    },
    [showToast, state.language]
  );

  const moveFile = useCallback(
    (id: string, newParent: string | null) => {
      setState((prev) => ({
        ...prev,
        files: prev.files.map((f) => (f.id === id ? { ...f, parent: newParent } : f)),
      }));
      showToast(translate(state.language, 'fileMoved'), 'success');
    },
    [showToast, state.language]
  );

  const deleteFile = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        files: prev.files.filter((f) => f.id !== id && f.parent !== id),
      }));
      showToast(translate(state.language, 'fileDeleted'), 'info');
    },
    [showToast, state.language]
  );

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
    setSyncStatus('synced');
  }, []);

  const value: AppContextValue = {
    ...state,
    syncStatus,
    toasts,
    t,
    setRole,
    setLanguage,
    toggleOnline,
    setOnline,
    saveCourseOffline,
    removeOfflineCourse,
    updateCourseProgress,
    addAssignment,
    updateDigitalSkillProgress,
    addFile,
    renameFile,
    moveFile,
    deleteFile,
    resetDemo,
    showToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
