import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, X } from 'lucide-react';

/**
 * Reusable Toast Notification Component.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Visually toggle visibility of the toast.
 * @param {string} props.message - The text message to display.
 * @param {'success' | 'error' | 'warning'} [props.variant='success'] - Visual status variant.
 * @param {number} [props.duration=3000] - Delay in milliseconds before triggering onDismiss.
 * @param {Function} props.onDismiss - Callback function to update status / close the toast.
 */
function Toast({
  isOpen,
  message,
  variant = 'success',
  duration = 3000,
  onDismiss
}) {
  useEffect(() => {
    if (isOpen && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onDismiss]);

  if (!isOpen) return null;

  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900',
    error: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-900',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-900'
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-in">
      <div className={`flex items-center space-x-3 p-4 rounded-2xl border shadow-lg max-w-sm ${styles[variant]} backdrop-blur-md`}>
        {icons[variant]}
        <div className="flex-grow text-sm font-semibold text-left">
          {message}
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none transition-colors duration-150"
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
