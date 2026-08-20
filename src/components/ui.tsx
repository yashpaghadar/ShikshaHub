import type { ReactNode } from 'react';
import { useApp } from '../AppContext';

export function ProgressBar({
  value,
  color = 'primary',
  size = 'md',
}: {
  value: number;
  color?: 'primary' | 'secondary' | 'accent' | 'error';
  size?: 'sm' | 'md' | 'lg';
}) {
  const colors = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-500',
    error: 'bg-error-600',
  };
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };
  return (
    <div className={`w-full rounded-full bg-gray-200 ${sizes[size]}`}>
      <div
        className={`h-full rounded-full ${colors[color]} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  color = 'primary',
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'error';
}) {
  const bgColors = {
    primary: 'bg-primary-50 text-primary-700',
    secondary: 'bg-secondary-50 text-secondary-700',
    accent: 'bg-accent-50 text-accent-700',
    error: 'bg-error-50 text-error-700',
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
        </div>
        {icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgColors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl animate-slide-up sm:rounded-2xl`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();
  const colors = {
    success: 'bg-secondary-600',
    error: 'bg-error-600',
    info: 'bg-primary-600',
    warning: 'bg-accent-500',
  };
  const icons = {
    success: 'M5 13l4 4L19 7',
    error: 'M18 6L6 18M6 6l12 12',
    info: 'M12 8v4m0 4h.01',
    warning: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  };
  return (
    <div className="fixed bottom-20 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${colors[toast.type]} flex items-center gap-3 rounded-xl px-4 py-3 text-white shadow-lg animate-slide-up`}
          onClick={() => dismissToast(toast.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={icons[toast.type]} />
          </svg>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export function StatusBadge({
  status,
  label,
}: {
  status: 'online' | 'offline' | 'syncing' | 'warning';
  label: string;
}) {
  const config = {
    online: { dot: 'bg-secondary-500', badge: 'badge-green' },
    offline: { dot: 'bg-error-500', badge: 'badge-red' },
    syncing: { dot: 'bg-accent-500 animate-pulse', badge: 'badge-yellow' },
    warning: { dot: 'bg-accent-500', badge: 'badge-yellow' },
  };
  const c = config[status];
  return (
    <span className={c.badge}>
      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
      {label}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
    </div>
  );
}
