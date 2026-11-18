import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Users, MapPin, Check, ArrowRight, ShieldCheck, Leaf, UserCheck, AlertCircle } from 'lucide-react';
import Modal from './ui/Modal';
import { bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

function BookingModal({ isOpen, onClose, homestay, onBookingSuccess }) {
  const { user, login } = useAuth();

  // Helper date formatters
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const getThreeDaysLater = (baseDateStr) => {
    const d = baseDateStr ? new Date(baseDateStr) : new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTomorrow());
  const [checkOut, setCheckOut] = useState(getThreeDaysLater(getTomorrow()));
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Sync guest credentials with logged-in user
  useEffect(() => {
    if (user) {
      setGuestName(user.name || '');
      setGuestEmail(user.email || '');
    }
  }, [user]);

  // When checkIn changes, ensure checkOut is at least the next day
  const handleCheckInChange = (newCheckIn) => {
    setCheckIn(newCheckIn);
    if (newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 2);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  // Compute number of nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const homestayPrice = homestay?.price || 3500;
  const totalPrice = homestayPrice * nights;

  const handleQuickDemoLogin = async () => {
    try {
      await login('traveler@ecostay.org', 'password123');
      setError(null);
    } catch (err) {
      setError('Failed to auto-sign in. Please enter guest details manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCustomerName = user ? user.name : guestName.trim();
    const finalCustomerEmail = user ? user.email : guestEmail.trim().toLowerCase();

    if (!finalCustomerName || !finalCustomerEmail) {
      setError('Please provide your name and email address to confirm your reservation.');
      return;
    }

    if (!finalCustomerEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const homestayId = homestay?.id || homestay?._id || '64a000000000000000000001';

    try {
      const res = await bookingApi.create({
        homestayId,
        customerName: finalCustomerName,
        email: finalCustomerEmail,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        guests: Number(guests),
        bookingStatus: 'Confirmed'
      });

      if (res && res.success) {
        if (onBookingSuccess) {
          onBookingSuccess(res.data);
        }
        onClose();
      } else {
        throw new Error(res?.message || 'Failed to complete booking');
      }
    } catch (err) {
      setError(err.message || 'Booking reservation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !homestay) return null;

  const homestayName = homestay.name || homestay.title || 'Eco Sanctuary';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reserve Eco Homestay"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        
        {/* Homestay Brief Card */}
        <div className="flex items-center space-x-3.5 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/60">
          <img
            src={homestay.image || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=200&q=80"}
            alt={homestayName}
            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
              {homestayName}
            </h4>
            <div className="flex items-center space-x-1 text-slate-400 text-xs mt-0.5">
              <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
              <span className="truncate">{homestay.location}</span>
            </div>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
              ₹{homestayPrice.toLocaleString('en-IN')} <span className="font-normal text-slate-400">/ night</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Lead Guest Section */}
        {!user ? (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Guest Information
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>1-Click Demo Login</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  required
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="maya@example.com"
                  required
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex items-center justify-between text-xs">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lead Traveler</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{user.name}</span>
              <span className="text-slate-400 ml-1.5 font-normal">({user.email})</span>
            </div>
            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
              Verified
            </span>
          </div>
        )}

        {/* Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Check-In Date
            </label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
              <Calendar className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleCheckInChange(e.target.value)}
                required
                className="w-full bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Check-Out Date
            </label>
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
              <Calendar className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Guests selector */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Number of Guests
          </label>
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
            <Users className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Impact Breakdown */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>₹{homestayPrice.toLocaleString('en-IN')} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span className="font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            <span className="flex items-center space-x-1">
              <Leaf className="h-3.5 w-3.5" />
              <span>Carbon Offset Contribution (10%)</span>
            </span>
            <span>Included</span>
          </div>
          <div className="border-t border-emerald-200/50 dark:border-emerald-800/40 pt-2 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
            <span>Total Amount:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-display">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Eco Assurance Note */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Immediate confirmation recorded in database and dashboard.</span>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming Booking...</span>
              </>
            ) : (
              <>
                <span>Confirm Reservation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

      </form>
    </Modal>
  );
}

export default BookingModal;
