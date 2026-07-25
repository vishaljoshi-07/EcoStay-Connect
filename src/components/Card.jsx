import React, { useState } from 'react';
import { MapPin, Star, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

function Card({ 
  id,
  name, 
  location, 
  sustainabilityTags = [], 
  description, 
  image, 
  price, 
  rating, 
  reviewsCount 
}) {
  const [bookingState, setBookingState] = useState('idle'); // idle, loading, success

  const handleBookNow = () => {
    setBookingState('loading');
    setTimeout(() => {
      setBookingState('success');
      // Reset back to idle after 3 seconds
      setTimeout(() => {
        setBookingState('idle');
      }, 3000);
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group">
      
      {/* Image and Badges */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <img 
          src={image || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        
        {/* Ratings Tag */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-slate-800 dark:text-slate-100 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
          <Star className="h-3 w.5 text-amber-500 fill-amber-500" />
          <span>{rating || "4.8"}</span>
          <span className="text-slate-450 dark:text-slate-400 font-normal">({reviewsCount || 24})</span>
        </div>

        {/* First Sustainability Tag Featured Badge */}
        {sustainabilityTags.length > 0 && (
          <div className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
            <Sparkles className="h-3 w-3" />
            <span>{sustainabilityTags[0]}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow text-left">
        
        {/* Location */}
        <div className="flex items-center space-x-1 text-slate-400 dark:text-slate-500 text-xs font-semibold mb-2">
          <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-450" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1 mb-2">
          {name}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Sustainability Pills List */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sustainabilityTags.slice(1).map((tag, idx) => (
            <span 
              key={idx} 
              className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-100/60 dark:border-emerald-900/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Area */}
        <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 mt-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">Price / night</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-white font-display">
              ₹{price ? price.toLocaleString('en-IN') : '2,500'}
            </span>
          </div>

          {/* Stateful Button */}
          {bookingState === 'idle' && (
            <button 
              onClick={handleBookNow}
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-1 shadow-md shadow-emerald-700/10 hover:shadow-emerald-600/25 cursor-pointer group-hover:px-4.5"
            >
              <span>Book Now</span>
              <ChevronRight className="h-3 w.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}

          {bookingState === 'loading' && (
            <button 
              disabled
              className="bg-emerald-100 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5"
            >
              <div className="w-3.5 h-3.5 border-2 border-emerald-700 dark:border-emerald-300 border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </button>
          )}

          {bookingState === 'success' && (
            <button 
              disabled
              className="bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1 shadow-md shadow-emerald-600/30"
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Reserved!</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Card;
