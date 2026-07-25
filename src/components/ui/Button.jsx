import React from 'react';

/**
 * Reusable Button Component.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - The button visual style variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button (padding and font-size).
 * @param {boolean} [props.disabled=false] - If true, prevents interaction and styles the button as disabled.
 * @param {string} [props.className=''] - Optional additional CSS class names.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/10 focus:ring-emerald-500 border border-transparent',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 focus:ring-slate-500 border border-transparent',
    outline: 'bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/50 focus:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-4 text-base'
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
