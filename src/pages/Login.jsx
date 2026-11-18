import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Leaf, ArrowRight, UserCheck } from 'lucide-react';
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

  const performLogin = async (userEmail, userPassword) => {
    setLoading(true);
    try {
      await login(userEmail, userPassword);
      setToast({ isOpen: true, message: 'Authenticated successfully! Redirecting to dashboard...', variant: 'success' });
      setTimeout(() => {
        navigate(fromPath, { replace: true });
      }, 800);
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Login failed. Please try again.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

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

    await performLogin(email, password);
  };

  const handleQuickDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    performLogin(demoEmail, demoPassword);
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/google`;
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
            Sign in to discover eco-homestays, manage reservations, and explore sustainable travel.
          </p>
        </div>

        {/* Quick Demo Login Preset Banner */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-3.5 space-y-2 text-left">
          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            <UserCheck className="h-4 w-4 text-emerald-600" />
            <span>Quick 1-Click Demo Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickDemoLogin('traveler@ecostay.org', 'password123')}
              className="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>🌿 Traveler</span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickDemoLogin('admin@ecostay.com', 'adminpassword')}
              className="bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>👑 Admin</span>
            </button>
          </div>
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
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
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
