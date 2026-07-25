import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('EcoStay ErrorBoundary caught an exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 text-center transition-colors duration-300">
          <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-700 space-y-6">
            
            <div className="p-4 rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 w-16 h-16 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
                Something Went Wrong
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                An unexpected error occurred while rendering this view. Don't worry, your data is safe.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-750 text-left font-mono text-xs text-rose-600 dark:text-rose-400 overflow-x-auto max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Go to Home</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
