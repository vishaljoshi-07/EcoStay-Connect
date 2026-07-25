import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'success' });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const fromPath = location.state?.from?.pathname || '/dashboard';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setToast({ isOpen: true, message: 'Please fill in both email and password.', variant: 'error' });
      return;
    }

    if (!email.includes('@')) {
      setToast({ isOpen: true, message: 'Please enter a valid email address.', variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      setToast({ isOpen: true, message: 'Authenticated successfully! Redirecting...', variant: 'success' });
      setTimeout(() => {
        navigate(fromPath, { replace: true });
      }, 1000);
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Login failed. Invalid credentials.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/api/users/google';
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center py-16 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/50 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100/80 dark:border-slate-700/60 relative z-10 flex flex-col p-8 md:p-10 space-y-6 transition-colors duration-200">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto">
            <Leaf className="h-6 w-6 animate-bounce" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Enter your credentials to manage your eco homestay bookings and AI assistant.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <Mail className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                disabled={loading}
                className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <Lock className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-transparent py-3.5 pl-12 pr-12 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold p-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Or Continue With</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-700"></div>
        </div>

        {/* Third-party Sign In options */}
        <div className="grid grid-cols-2 gap-3 text-sm font-bold">
          <button 
            type="button"
            onClick={() => {
              setEmail('traveler@ecostay.org');
              setPassword('password123');
            }}
            className="border border-slate-200 dark:border-slate-700 rounded-xl py-3 flex items-center justify-center space-x-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer text-xs"
          >
            <span>Autofill Demo</span>
          </button>
          
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="border border-slate-200 dark:border-slate-700 rounded-xl py-3 flex items-center justify-center space-x-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer text-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google Sign In</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Register Now
          </Link>
        </p>

      </div>

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}

export default Login;
