import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    // Simulate login request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect to Dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center py-16 px-4 transition-colors duration-300">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/50 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100/80 dark:border-slate-700/60 relative z-10 flex flex-col p-8 md:p-10 space-y-6 transition-colors duration-200">
        
        {/* Branding & Welcome */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto">
            <Leaf className="h-6 w-6 animate-bounce" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Enter your details to manage your homestay listings or view your green reservations.
          </p>
        </div>

        {/* Error/Success Notifications */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-bold p-3.5 rounded-xl text-left">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold p-3.5 rounded-xl text-left flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Authenticated successfully! Redirecting to Dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 focus-within:dark:border-emerald-500 focus-within:bg-white focus-within:dark:bg-slate-950 rounded-xl transition-all duration-155">
              <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500 absolute left-4 shrink-0 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                disabled={loading || success}
                className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-bold text-emerald-600 dark:text-emerald-450 hover:text-emerald-500">Forgot?</a>
            </div>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 focus-within:dark:border-emerald-500 focus-within:bg-white focus-within:dark:bg-slate-955 rounded-xl transition-all duration-155">
              <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500 absolute left-4 shrink-0 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading || success}
                className="w-full bg-transparent py-3.5 pl-12 pr-12 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2 pt-1.5">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-750 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-900 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-slate-500 dark:text-slate-400 font-semibold cursor-pointer select-none">
              Keep me logged in for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-100 disabled:dark:bg-slate-700 disabled:text-emerald-400 text-white font-bold p-4 rounded-xl shadow-lg shadow-emerald-700/10 hover:shadow-emerald-600/25 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-102 cursor-pointer mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            ) : success ? (
              <span>Success!</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 text-white/80" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Or Sign In With</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-700"></div>
        </div>

        {/* Third-party Sign In options */}
        <div className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
          <button 
            type="button"
            onClick={() => {
              setEmail('admin@ecostayconnect.org');
              setPassword('password123');
            }}
            className="border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors duration-150 cursor-pointer"
          >
            <span className="text-xs">Autofill Demo</span>
          </button>
          
          <button 
            type="button"
            className="border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors duration-150 cursor-pointer"
          >
            <span className="text-xs">Google Account</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 text-center font-medium">
          New to the platform? <a href="#" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Apply as a Host</a>
        </p>

      </div>
    </div>
  );
}

export default Login;
