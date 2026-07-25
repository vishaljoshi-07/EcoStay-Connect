import React, { useState } from 'react';
import { LayoutDashboard, Home, BookOpen, Star, Plus, FileText, User, ArrowUpRight, RefreshCw, Check, Clock, X } from 'lucide-react';

function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const stats = [
    {
      title: 'Total Homestays',
      value: '154',
      change: '+12.4%',
      trend: 'up',
      description: 'Active eco-certified listings',
      icon: Home,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      title: 'Total Bookings',
      value: '1,280',
      change: '+8.2%',
      trend: 'up',
      description: 'Reservations this year',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-450',
    },
    {
      title: 'Verified Reviews',
      value: '3,420',
      change: '4.9 ★',
      trend: 'neutral',
      description: 'Average eco-guest score',
      icon: Star,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    },
  ];

  const recentBookings = [
    {
      id: '#BK-9801',
      homestay: 'The Whispering Pines Sanctuary',
      guest: 'Amit Sharma',
      date: 'June 22, 2026',
      amount: '₹10,500',
      status: 'Confirmed',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-250 dark:bg-emerald-950/40 dark:text-emerald-350 dark:border-emerald-900/50',
      statusIcon: Check
    },
    {
      id: '#BK-9754',
      homestay: 'Emerald Valley Bamboo Retreat',
      guest: 'Priya Patel',
      date: 'June 20, 2026',
      amount: '₹12,600',
      status: 'Pending Verification',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-250 dark:bg-amber-950/40 dark:text-amber-350 dark:border-amber-900/50',
      statusIcon: Clock
    },
    {
      id: '#BK-9721',
      homestay: 'Cloud-Kissed Mud Haven',
      guest: 'John Doe',
      date: 'June 18, 2026',
      amount: '₹5,600',
      status: 'Cancelled',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-250 dark:bg-rose-950/40 dark:text-rose-350 dark:border-rose-900/50',
      statusIcon: X
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Dashboard Top Banner */}
      <div className="bg-emerald-950 text-white py-10 sm:py-12 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-emerald-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
              EcoStay Connect Dashboard
            </h1>
            <p className="text-emerald-100/70 text-sm">
              Real-time platform insights, bookings, and host verification analytics.
            </p>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="self-start sm:self-auto bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center space-x-2 transition-all duration-200 hover:scale-102 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Dashboard Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-6 sm:space-y-8">
        
        {/* Stats Section Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
              >
                <div className="space-y-1.5 text-left">
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-extrabold tracking-wider block">{stat.title}</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-800 dark:text-white tracking-tight">{stat.value}</span>
                    <span className={`text-xs font-bold flex items-center ${
                      stat.trend === 'up' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : stat.trend === 'neutral' 
                          ? 'text-amber-500' 
                          : 'text-rose-500'
                    }`}>
                      {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 inline mr-0.5" />}
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{stat.description}</span>
                </div>
                
                <div className={`p-3.5 sm:p-4 rounded-2xl ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Details & Actions Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Recent Bookings List (Left 2 Columns) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg p-5 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white tracking-tight">Recent Platform Bookings</h3>
                <a href="#" className="text-xs font-bold text-emerald-600 dark:text-emerald-450 hover:text-emerald-500 flex items-center">
                  <span>View All</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                </a>
              </div>

              <div className="overflow-x-auto -mx-5 sm:mx-0">
                <table className="w-full text-left min-w-[550px] sm:min-w-0">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-3 px-5 sm:px-0">ID</th>
                      <th className="pb-3">Homestay</th>
                      <th className="pb-3">Guest</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-5 sm:pr-0">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold divide-y divide-slate-100/50 dark:divide-slate-700/50">
                    {recentBookings.map((bk, idx) => {
                      const StatusIcon = bk.statusIcon;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors duration-150">
                          <td className="py-4 font-mono text-slate-400 dark:text-slate-500 px-5 sm:px-0">{bk.id}</td>
                          <td className="py-4 text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[180px] mt-2">{bk.homestay}</td>
                          <td className="py-4 text-slate-505 dark:text-slate-400">{bk.guest}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center space-x-1 border px-2.5 py-1 rounded-full text-xs font-bold ${bk.statusColor}`}>
                              <StatusIcon className="h-3 w-3 shrink-0" />
                              <span>{bk.status}</span>
                            </span>
                          </td>
                          <td className="py-4 text-right text-slate-900 dark:text-white font-extrabold pr-5 sm:pr-0">{bk.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel (Right 1 Column) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-lg p-5 sm:p-8 space-y-6 text-left">
            <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white tracking-tight">Quick Controls</h3>
            
            <div className="flex flex-col gap-3">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs p-4 rounded-2xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-500/25 transition-all duration-200 flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5 bg-white/20 p-0.5 rounded-lg text-white" />
                  <span>Onboard New Homestay</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button className="bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-bold text-xs p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border border-slate-100 dark:border-slate-700 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <span>Generate Eco Reports</span>
                </div>
                <span className="bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">PDF</span>
              </button>

              <button className="bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-bold text-xs p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border border-slate-100 dark:border-slate-700 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <span>Manage Verification Audits</span>
                </div>
                <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">3 Active</span>
              </button>
            </div>

            {/* Performance Tip Banner */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 p-4 space-y-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider block">Carbon Impact Update</span>
              <p className="text-slate-650 dark:text-slate-400 text-xs leading-relaxed">
                By verifying 12 solar installations in Manali this month, the platform has successfully lowered its average homestay emission coefficient by 14.2%.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
