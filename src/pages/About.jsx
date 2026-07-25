import React from 'react';
import { Leaf, Users, ShieldAlert, Award, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

function About() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Page Header */}
      <div className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest bg-emerald-900 border border-emerald-800 px-3.5 py-1.5 rounded-full">
            Our Story & Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mt-4 tracking-tight">
            About EcoStay Connect
          </h1>
          <p className="text-emerald-100/90 text-md md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            Bridging the gap between conscious travelers and remote homestay owners to build a sustainable, community-first travel ecosystem.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Promoting Eco-Tourism, Sustaining Rural Lives
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-350 text-base leading-relaxed">
              <p>
                EcoStay Connect was born out of a simple realization: while traditional tourism often depletes local resources and leaves large carbon footprints, there exists an untapped wealth of heritage homes and eco-resorts run by local families in rural hills and valley regions.
              </p>
              <p>
                We believe travel should enrich, not extract. By matching travelers with local homestays, we support mountain and forest families, promote local organic farming, and fund carbon-neutral native tree plantation programs.
              </p>
              <p>
                Every homestay listed on our platform is hand-selected and verified against strict green criteria—including solar adoption, water harvesting, and organic farming. We ensure transparency so you can explore pristine destinations with absolute peace of mind.
              </p>
            </div>
          </div>
          
          {/* Highlight Showcase box */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-emerald-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800/30 rounded-full blur-xl pointer-events-none" />
            <h3 className="text-xl font-bold font-display mb-6">Our Journey in Numbers</h3>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="text-left">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-300 block">150+</span>
                <span className="text-xs text-emerald-100 uppercase font-bold tracking-wider">Eco Homestays</span>
              </div>
              <div className="text-left">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-300 block">25+</span>
                <span className="text-xs text-emerald-100 uppercase font-bold tracking-wider">Hill Regions</span>
              </div>
              <div className="text-left">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-300 block">12,000+</span>
                <span className="text-xs text-emerald-100 uppercase font-bold tracking-wider">Trees Planted</span>
              </div>
              <div className="text-left">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-300 block">4.9/5</span>
                <span className="text-xs text-emerald-100 uppercase font-bold tracking-wider">User Rating</span>
              </div>
            </div>
            
            <div className="border-t border-emerald-800/80 pt-6 mt-8 flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span>Audited by Green Globe Foundation</span>
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Our 3 Core Pillars */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Our Pillars of Sustainability
            </h2>
            <p className="text-slate-550 dark:text-slate-400 text-sm mt-1">
              Every decision we make, from host onboarding to carbon offsetting, aligns with our core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Pillar 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-450 flex items-center justify-center">
                <Leaf className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">1. Environmental Health</h3>
              <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">
                Minimizing waste, harvesting rainwater, harnessing clean energy, and maintaining zero single-use plastic policies across all properties.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-450 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">2. Economic Equity</h3>
              <p className="text-slate-555 dark:text-slate-400 text-sm leading-relaxed">
                Keeping the profits where they belong. We pay fair wages to hosts, employ native nature guides, and purchase locally made organic goods.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-450 flex items-center justify-center">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">3. Cultural Preservation</h3>
              <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">
                Promoting vernacular architecture, encouraging hosts to cook heritage cuisines, and providing authentic, low-impact cultural immersions.
              </p>
            </div>

          </div>
        </div>

        {/* The Verification Badge Process */}
        <div className="bg-emerald-50/40 dark:bg-slate-800/40 rounded-3xl p-8 md:p-12 border border-emerald-100/60 dark:border-slate-800/60 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-display text-emerald-950 dark:text-emerald-300 tracking-tight">
                How our Eco-Audit works
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Before a property gets its green badge on EcoStay Connect, our sustainability auditors conduct an in-person assessment. We audit their water sources, solid waste separation systems, use of solar panels or biomass generators, and their relationships with local food suppliers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-emerald-800">
                <div className="flex items-center space-x-2">
                  <Award className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Annual re-audits for premium hosts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Verified eco-reviews from actual guests</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <a 
                href="#"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-700/10 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer group"
              >
                <span>Read Sustainability Guidelines</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default About;
