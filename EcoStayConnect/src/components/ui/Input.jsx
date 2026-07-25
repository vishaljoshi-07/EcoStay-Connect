import React, { useId } from 'react';

/**
 * Reusable Input Component.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.label] - Optional label text displayed above the input.
 * @param {string} [props.placeholder] - Input placeholder text.
 * @param {string} [props.error] - Optional error message. If provided, styles input with error borders and displays error text.
 * @param {string} [props.helperText] - Optional helper text displayed below the input (ignored if error is present).
 * @param {string} [props.type='text'] - HTML input type (e.g., 'text', 'password', 'email').
 * @param {string} [props.className=''] - Additional Tailwind CSS classes.
 */
function Input({
  label,
  placeholder = '',
  error = '',
  helperText = '',
  type = 'text',
  className = '',
  ...props
}) {
  const inputId = useId();

  return (
    <div className={`flex flex-col space-y-1.5 w-full text-left ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`text-xs font-bold uppercase tracking-wider ${
            error 
              ? 'text-rose-500' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold border bg-slate-50 focus:bg-white dark:bg-slate-800/40 dark:focus:bg-slate-900 focus:outline-none transition-all duration-150 ${
            error 
              ? 'border-rose-400 text-rose-900 placeholder-rose-300 focus:border-rose-500 dark:text-rose-200' 
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
          }`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-rose-500 font-semibold mt-1">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
