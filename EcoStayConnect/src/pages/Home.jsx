import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { Leaf, Award, Globe, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

function Home() {
  const [filterLoc, setFilterLoc] = useState('All');
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from API: use search endpoint if filtering by location
        let url = 'http://localhost:5000/api/homestays';
        if (filterLoc !== 'All') {
          url = `http://localhost:5000/api/homestays/search?location=${encodeURIComponent(filterLoc)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch homestays: ${response.statusText}`);
        }
        const json = await response.json();
        
        // Save the API returned array (json.data contains the homestays list)
        setHomestays(json.data || []);
      } catch (err) {
        console.error('Error fetching homestays:', err);
        setError(err.message || 'Something went wrong while loading homestays.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, [filterLoc]);

  return (
    <div className="pb-16">
      
      {/* Hero Section */}
      <Hero />

      {/* Main Discover Grid */}
      <div id="homestays-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header + Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Discover Popular Eco Homestays
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
              Explore handpicked, verified eco-friendly sanctuaries across India. Handcrafted by nature lovers, for green travelers.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Himachal', 'Uttarakhand', 'Kerala', 'Karnataka'].map((loc) => (
              <button
                key={loc}
                onClick={() => setFilterLoc(loc)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  (loc === 'All' && filterLoc === 'All') || (loc !== 'All' && filterLoc === loc)
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-355 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {loc === 'All' ? 'All Locations' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">Loading eco-friendly homestays...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-3xl p-10 text-center max-w-md mx-auto my-8">
            <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-450 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Failed to load homestays</h3>
            <p className="text-rose-600 dark:text-rose-400 text-sm mt-2 font-medium">{error}</p>
            <button 
              onClick={() => setFilterLoc(filterLoc)}
              className="mt-5 bg-rose-655 hover:bg-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-rose-600/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Homestays Grid & Empty State */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {homestays.map((homestay) => (
                <Card key={homestay.id || homestay._id} {...homestay} />
              ))}
            </div>

            {homestays.length === 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto">
                <Leaf className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">No homestays found</h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">We are actively onboarding new eco-hosts in this region. Try filtering for another location!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sustainable Values / Value Prop */}
      <div className="bg-emerald-50/50 dark:bg-slate-900/30 border-y border-emerald-100 dark:border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-700 dark:text-emerald-450 text-xs font-bold uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200/20">
              Our Eco Standards
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-3 tracking-tight">
              Why Stay with EcoStay Connect?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Every listing on our platform undergoes a rigorous 4-step sustainability audit to verify its environmental commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Value 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Carbon Audited</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                We calculate the carbon footprint of your stay and contribute 10% of our booking commissions directly to native tree plantation initiatives.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Support Locals</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                100% of our homestays are owned and operated by local families, helping keep hospitality revenue within rural and mountain communities.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Verified Practices</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                From rainwater harvesting to organic farming, we verify waste management systems so you can stay guilt-free with actual eco-friendly hosts.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Host Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Decorative backdrop */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
              Are you a homestay owner?
            </h2>
            <p className="text-emerald-100 max-w-xl text-sm md:text-base leading-relaxed">
              Join our network of verified eco-hosts. Increase your visibility, manage bookings seamlessly, and showcase your sustainable practices to eco-conscious travelers globally.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-300 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero registration fees for the first 3 months.</span>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <button className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer group">
              <span>List Your Property</span>
              <ArrowRight className="h-4 w-4 text-emerald-800 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
