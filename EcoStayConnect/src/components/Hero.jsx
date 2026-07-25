import React from 'react';
import { Compass, Calendar, Users, Search, ShieldCheck, TreePine, Sparkles } from 'lucide-react';

function Hero() {
  const handleScrollToGrid = () => {
    const element = document.getElementById('homestays-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-emerald-950 text-white overflow-hidden py-16 lg:py-24">
      {/* Background Graphic Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/40 rounded-l-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Search Widget */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-700/50 rounded-full px-4.5 py-1.5 text-emerald-300 text-sm font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Eco-tourism Platform of the Year</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight text-white">
              Discover Homestays That <span className="text-emerald-400">Heal the Earth</span>
            </h1>
            
            <p className="text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              Book verified eco-friendly homestays in scenic rural and hill regions. Support local communities, reduce your carbon footprint, and immerse yourself in pristine nature.
            </p>

            {/* Simulated Search Widget */}
            <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center transition-colors duration-200">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Destination Selector */}
                <div className="relative text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Where to?</label>
                  <div className="flex items-center space-x-2">
                    <Compass className="h-5 w-5 text-emerald-600 dark:text-emerald-450 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="e.g., Manali, Wayanad" 
                      className="w-full text-sm font-semibold text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="relative text-left border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/80 pt-3 md:pt-0 md:pl-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">When?</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-450 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Select dates" 
                      className="w-full text-sm font-semibold text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="relative text-left border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/80 pt-3 md:pt-0 md:pl-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Guests</label>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-450 shrink-0" />
                    <select defaultValue="2 Guests" className="w-full text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none bg-transparent cursor-pointer dark:bg-slate-900">
                      <option className="dark:bg-slate-900">1 Guest</option>
                      <option className="dark:bg-slate-900">2 Guests</option>
                      <option className="dark:bg-slate-900">4 Guests</option>
                      <option className="dark:bg-slate-900">Family (5+)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <button 
                onClick={handleScrollToGrid}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4.5 rounded-xl shadow-lg shadow-emerald-700/20 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-102 hover:shadow-emerald-500/35 cursor-pointer shrink-0"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Small reassurance stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-emerald-200 text-sm">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Carbon Neutral Bookings</span>
              </div>
              <div className="flex items-center space-x-2">
                <TreePine className="h-4 w-4 text-emerald-400" />
                <span>Planted over 12,000 trees</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Visual Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/40 group hover:border-emerald-700/40 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80" 
                alt="Beautiful Eco-homestay Cabin"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
              
              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-emerald-600/90 text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  ★ 4.9 Premium
                </span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-1">Featured Mountain Sanctuary</p>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">The Pine Whispers Cabin, Manali</h3>
                <p className="text-emerald-100/90 text-sm mt-1">100% solar powered, organic meals, rain harvested.</p>
              </div>
            </div>

            {/* Decorative background grids */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
