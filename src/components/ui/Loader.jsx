import React from 'react';

/**
 * Reusable Loader Component (Animated Spinner).
 * 
 * @param {Object} props - The component props.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Defines the size variant of the loader.
 * @param {string} [props.className=''] - Additional custom CSS class names.
 */
function Loader({
  size = 'md',
  className = ''
}) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-solid border-slate-200 border-t-emerald-600 dark:border-slate-800 dark:border-t-emerald-500 ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default Loader;
