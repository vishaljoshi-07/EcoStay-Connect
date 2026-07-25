import React from 'react';
import { Home, CalendarX, MessageSquareX, SearchX, Plus } from 'lucide-react';

/**
 * Reusable Empty State component.
 * 
 * @param {'homestays' | 'bookings' | 'ai' | 'search' | 'generic'} type - Type of empty state.
 */
function EmptyState({
  type = 'generic',
  title,
  description,
  actionLabel,
  onAction
}) {
  const defaults = {
    homestays: {
      icon: Home,
      title: 'No Homestays Available',
      description: 'We couldn\'t find any eco-homestays matching your request.',
    },
    bookings: {
      icon: CalendarX,
      title: 'No Active Reservations',
      description: 'You haven\'t booked any sustainable homestays yet.',
    },
    ai: {
      icon: MessageSquareX,
      title: 'No Conversation History',
      description: 'Ask the Eco Travel Assistant for itineraries, homestay picks, or green travel advice!',
    },
    search: {
      icon: SearchX,
      title: 'No Search Results Found',
      description: 'Try adjusting your search location or rating filter to discover more homestays.',
    },
    generic: {
      icon: Home,
      title: 'No Data Available',
      description: 'There are no items to display at this time.',
    }
  };

  const config = defaults[type] || defaults.generic;
  const Icon = config.icon;
  const displayTitle = title || config.title;
  const displayDesc = description || config.description;

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-8 sm:p-12 text-center border border-slate-100 dark:border-slate-700/60 shadow-md space-y-4 max-w-md mx-auto my-6 transition-all duration-300">
      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 w-16 h-16 mx-auto flex items-center justify-center shadow-inner">
        <Icon className="h-8 w-8" />
      </div>
      
      <div className="space-y-1.5">
        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
          {displayTitle}
        </h3>
        <p className="text-slate-400 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          {displayDesc}
        </p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-500/25 transition-all duration-200 cursor-pointer mt-2"
        >
          <Plus className="h-4 w-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

export default EmptyState;
