export type Role = 'public' | 'student' | 'teacher' | 'admin';
export type Language = 'en' | 'hi' | 'pa';
export type Subject = 'mathematics' | 'science' | 'english' | 'digital-literacy' | 'general-knowledge';

export interface Course {
  id: string;
  subject: Subject;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  estimatedTime: string;
  availableOffline: boolean;
  savedOffline: boolean;
  fileSize: string;
  downloadedDate?: string;
  lessonIntro: string;
  lessonExplanation: string;
  question: {
    prompt: string;
    options: string[];
    correctIndex: number;
  };
}

export interface Student {
  id: string;
  name: string;
  class: string;
  overallProgress: number;
  lessonsCompleted: number;
  quizScore: number;
  digitalSkills: number;
  streak: number;
  subjectProgress: Record<Subject, number>;
  achievements: string[];
  needsAttention?: { reason: string; subject?: string; value?: number };
}

export interface Assignment {
  id: string;
  className: string;
  subject: string;
  lesson: string;
  dueDate: string;
  created: boolean;
}

export interface DigitalSkillModule {
  id: string;
  title: string;
  icon: string;
  topics: string[];
  progress: number;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parent: string | null;
}

export interface DemoState {
  role: Role;
  language: Language;
  isOnline: boolean;
  courses: Course[];
  students: Student[];
  assignments: Assignment[];
  digitalSkills: DigitalSkillModule[];
  files: FileItem[];
  storageUsed: number;
  storageTotal: number;
  syncStatus: 'synced' | 'waiting' | 'syncing';
  currentStudentId: string;
}
