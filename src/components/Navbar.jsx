import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, Home, Info, LayoutDashboard, LogIn, UserPlus, LogOut, User, Sun, Moon, Sparkles, Bot } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  // Glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home, show: true },
    { name: 'About', path: '/about', icon: Info, show: true },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, show: true },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, show: isAuthenticated },
    { name: 'Showcase', path: '/showcase', icon: Sparkles, show: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-3 border-b border-slate-100 dark:border-slate-800/80' 
        : 'bg-emerald-900 dark:bg-emerald-950 text-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              scrolled 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' 
                : 'bg-emerald-800 text-emerald-200 group-hover:bg-emerald-700'
            }`}>
              <Leaf className="h-6 w-6 animate-pulse" />
            </div>
            <span className={`text-xl font-bold tracking-tight font-display transition-colors duration-300 ${
              scrolled ? 'text-slate-900 dark:text-white' : 'text-white'
            }`}>
              EcoStay <span className="text-emerald-400 font-extrabold">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.filter(l => l.show).map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? scrolled
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                        : 'bg-white text-emerald-900 shadow-md shadow-emerald-950/20'
                      : scrolled
                        ? 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer ${
                scrolled
                  ? 'text-slate-500 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-emerald-800/40 dark:border-slate-700/60">
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                    scrolled
                      ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      : 'hover:bg-emerald-800/60 text-white'
                  }`}
                >
                  <img
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                    alt={user?.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                  />
                  <span className="text-xs font-bold font-display max-w-[100px] truncate">
                    {user?.name?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-600/80 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    scrolled
                      ? 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      : 'text-emerald-100 hover:bg-emerald-800'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-emerald-100 hover:bg-emerald-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-emerald-100 hover:bg-emerald-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-emerald-950 dark:bg-slate-900 border-t border-emerald-800/40">
          {navLinks.filter(l => l.show).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold text-emerald-100 hover:bg-emerald-900 dark:hover:bg-slate-800"
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold text-emerald-100 hover:bg-emerald-900"
              >
                <User className="h-5 w-5" />
                <span>My Profile ({user?.name})</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold text-rose-300 hover:bg-rose-900/50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full py-3 text-center rounded-xl bg-emerald-800 text-white font-bold text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full py-3 text-center rounded-xl bg-emerald-600 text-white font-bold text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
