import React, { useState } from 'react';
import { User, Mail, Shield, Camera, Save, Lock, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'success' });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setToast({ isOpen: true, message: 'Name and email are required.', variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      const updateData = { name, email, profileImage };
      if (password) updateData.password = password;

      await updateProfile(updateData);
      setPassword('');
      setToast({ isOpen: true, message: 'Profile updated successfully!', variant: 'success' });
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Failed to update profile.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative overflow-hidden">
          <div className="relative group">
            <img
              src={profileImage || user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-emerald-400 shadow-md"
            />
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-emerald-200 border border-emerald-700">
              <Shield className="h-3.5 w-3.5" />
              <span className="capitalize">{user?.role || 'Customer'} Member</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              {user?.name}
            </h1>

            <p className="text-emerald-200 text-sm flex items-center justify-center sm:justify-start space-x-2">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="flex items-center justify-center space-x-1 text-emerald-300 font-extrabold text-lg">
              <Heart className="h-5 w-5 fill-emerald-400 text-emerald-400" />
              <span>{user?.savedHomestays?.length || 0}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">Saved Homestays</span>
          </div>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 dark:border-slate-700 space-y-6 text-left">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Edit Profile Settings
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Update your account credentials, avatar image, and security settings.
            </p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
                  <User className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
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
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Profile Image URL</label>
                <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
                  <Camera className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password change option */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New Password (Optional)</label>
                <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 rounded-xl">
                  <Lock className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

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

export default Profile;
