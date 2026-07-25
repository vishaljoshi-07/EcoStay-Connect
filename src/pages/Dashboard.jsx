import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Home, BookOpen, Star, Plus, FileText, User, ArrowUpRight, RefreshCw, Check, Clock, X, Trash2, Edit, Heart, Bot } from 'lucide-react';
import { bookingApi, homestayApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/ui/ConfirmModal';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'success' });
  
  // Modal states
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [showHomestayModal, setShowHomestayModal] = useState(false);
  
  // New Homestay Form State
  const [newHomestay, setNewHomestay] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    rating: 4.8,
    image: '',
    sustainabilityTags: ['Solar Powered', 'Rainwater Harvesting']
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [bRes, hRes] = await Promise.all([
        bookingApi.getAll().catch(() => ({ success: false, data: [] })),
        homestayApi.getAll().catch(() => ({ success: false, data: [] }))
      ]);

      if (bRes.success) setBookings(bRes.data || []);
      if (hRes.success) setHomestays(hRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setToast({ isOpen: true, message: 'Failed to load live dashboard data.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setTimeout(() => {
      setIsRefreshing(false);
      setToast({ isOpen: true, message: 'Dashboard data updated from live API.', variant: 'success' });
    }, 600);
  };

  const handleCancelBooking = async () => {
    if (!deleteBookingId) return;
    try {
      const res = await bookingApi.delete(deleteBookingId);
      if (res.success) {
        setBookings((prev) => prev.filter((b) => b._id !== deleteBookingId));
        setToast({ isOpen: true, message: 'Booking cancelled successfully.', variant: 'success' });
      }
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Failed to cancel booking.', variant: 'error' });
    } finally {
      setDeleteBookingId(null);
    }
  };

  const handleCreateHomestaySubmit = async (e) => {
    e.preventDefault();
    if (!newHomestay.name || !newHomestay.location || !newHomestay.price) {
      setToast({ isOpen: true, message: 'Please fill in required homestay fields.', variant: 'warning' });
      return;
    }

    try {
      const res = await homestayApi.create(newHomestay);
      if (res.success) {
        setHomestays((prev) => [res.data, ...prev]);
        setShowHomestayModal(false);
        setNewHomestay({
          name: '',
          location: '',
          description: '',
          price: '',
          rating: 4.8,
          image: '',
          sustainabilityTags: ['Solar Powered']
        });
        setToast({ isOpen: true, message: 'New Eco Homestay created live!', variant: 'success' });
      }
    } catch (err) {
      setToast({ isOpen: true, message: err.message || 'Failed to create homestay.', variant: 'error' });
    }
  };

  const stats = [
    {
      title: 'Total Listings',
      value: homestays.length.toString(),
      change: '+4 new',
      trend: 'up',
      description: 'Verified eco-homestays',
      icon: Home,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      title: 'My Bookings',
      value: bookings.length.toString(),
      change: 'Active',
      trend: 'up',
      description: 'Your eco stays reserved',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      title: 'Saved Stays',
      value: (user?.savedHomestays?.length || 0).toString(),
      change: 'Favorites',
      trend: 'neutral',
      description: 'Wishlist homestays',
      icon: Heart,
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader text="Fetching authenticated dashboard metrics..." size="large" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Dashboard Header */}
      <div className="bg-emerald-950 text-white py-10 sm:py-12 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <LayoutDashboard className="h-4 w-4" />
              <span>User Console ({user?.role})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
              Welcome back, {user?.name}
            </h1>
            <p className="text-emerald-100/70 text-sm">
              Live platform metrics, active reservations, and saved green homestays.
            </p>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="self-start sm:self-auto bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh API</span>
          </button>
        </div>
      </div>

      {/* Dashboard Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-6 sm:space-y-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg flex items-center justify-between group"
              >
                <div className="space-y-1.5 text-left">
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-extrabold tracking-wider block">{stat.title}</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-800 dark:text-white tracking-tight">{stat.value}</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{stat.change}</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{stat.description}</span>
                </div>
                
                <div className={`p-4 rounded-2xl ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Bookings Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Column: Bookings */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white tracking-tight text-left">
                  Your Reservations
                </h3>
                <p className="text-xs text-slate-400 text-left">Real-time status of your homestay bookings</p>
              </div>
            </div>

            {bookings.length === 0 ? (
              <EmptyState
                type="bookings"
                title="No Bookings Found"
                description="You haven't made any homestay bookings yet. Explore our listings to plan your next green trip!"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-3">Homestay</th>
                      <th className="pb-3">Dates</th>
                      <th className="pb-3">Guests</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold divide-y divide-slate-100/50 dark:divide-slate-700/50">
                    {bookings.map((bk) => (
                      <tr key={bk._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 font-bold text-slate-800 dark:text-slate-200">
                          {bk.homestayId?.title || bk.homestayId?.name || 'Eco Sanctuary Stay'}
                        </td>
                        <td className="py-4 text-xs text-slate-500">
                          {new Date(bk.checkIn).toLocaleDateString()} - {new Date(bk.checkOut).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-slate-600 dark:text-slate-400">{bk.guests} Guests</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            bk.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}>
                            <Check className="h-3 w-3 shrink-0" />
                            <span>{bk.bookingStatus || 'Confirmed'}</span>
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => setDeleteBookingId(bk._id)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all cursor-pointer"
                            title="Cancel Booking"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Column: Controls & AI Quick Launch */}
          <div className="space-y-6 text-left">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg p-5 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white tracking-tight">
                Quick Actions
              </h3>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowHomestayModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs p-4 rounded-2xl shadow-md shadow-emerald-600/10 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="h-5 w-5 bg-white/20 p-0.5 rounded-lg" />
                    <span>List New Homestay</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <a
                  href="/ai-assistant"
                  className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-bold text-xs p-4 rounded-2xl transition-all flex items-center justify-between border border-slate-100 dark:border-slate-700 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Launch AI Travel Assistant</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                    Gemini 1.5
                  </span>
                </a>
              </div>

              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 p-4 space-y-2">
                <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider block">
                  Eco Verification Status
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Your account is verified for eco-friendly homestay bookings and AI assistant queries.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Homestay Creation Modal */}
      <Modal
        isOpen={showHomestayModal}
        onClose={() => setShowHomestayModal(false)}
        title="Onboard New Eco Homestay"
      >
        <form onSubmit={handleCreateHomestaySubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Homestay Name</label>
            <input
              type="text"
              value={newHomestay.name}
              onChange={(e) => setNewHomestay({ ...newHomestay, name: e.target.value })}
              placeholder="e.g. Pine Tree Solar Eco Stay"
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
            <input
              type="text"
              value={newHomestay.location}
              onChange={(e) => setNewHomestay({ ...newHomestay, location: e.target.value })}
              placeholder="e.g. Manali, Himachal Pradesh"
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-semibold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price per Night (₹)</label>
              <input
                type="number"
                value={newHomestay.price}
                onChange={(e) => setNewHomestay({ ...newHomestay, price: e.target.value })}
                placeholder="4500"
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={newHomestay.rating}
                onChange={(e) => setNewHomestay({ ...newHomestay, rating: parseFloat(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea
              value={newHomestay.description}
              onChange={(e) => setNewHomestay({ ...newHomestay, description: e.target.value })}
              placeholder="Describe sustainability features and location highlights..."
              rows={3}
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-sm font-semibold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3.5 rounded-xl shadow-md cursor-pointer mt-2"
          >
            Submit Listing
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteBookingId}
        title="Cancel Homestay Booking?"
        message="Are you sure you want to cancel this reservation? The homestay owner will be notified."
        confirmText="Cancel Reservation"
        onConfirm={handleCancelBooking}
        onCancel={() => setDeleteBookingId(null)}
      />

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}

export default Dashboard;
