import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'success' });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      setToast({ isOpen: true, message: 'Please fill in all required fields.', variant: 'error' });
      return;
    }

    if (!email.includes('@')) {
      setToast({ isOpen: true, message: 'Please enter a valid email address.', variant: 'error' });
      return;
    }

    if (password.length < 6) {
      setToast({ isOpen: true, message: 'Password must be at least 6 characters long.', variant: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ isOpen: true, message: 'Passwords do not match.', variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, role);
      setToast({ isOpen: true, message: 'Registration successful! Redirecting to Dashboard...', variant: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Registration failed. Please try again.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center py-16 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/50 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Register Card */}
      <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100/80 dark:border-slate-700/60 relative z-10 flex flex-col p-8 md:p-10 space-y-6 transition-colors duration-200">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto">
            <Leaf className="h-6 w-6 animate-pulse" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-slate-400 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Join EcoStay Connect to discover and book sustainable homestays worldwide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <User className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                disabled={loading}
                className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <Mail className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                disabled={loading}
                className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  role === 'customer'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🌿 Traveler / Guest
              </button>
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  role === 'owner'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🏡 Homestay Host
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <Lock className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Confirm Password</label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
              <Lock className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                disabled={loading}
                className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Sign In
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

export default Register;
