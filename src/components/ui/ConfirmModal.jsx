import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Reusable Confirmation Dialog Modal component.
 */
function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'primary'
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20',
    warning: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20',
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-700 space-y-6 relative text-left">
        
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;
