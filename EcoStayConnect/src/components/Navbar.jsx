import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Home, Info, LayoutDashboard, LogIn, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Change navbar background on scroll for premium glassmorphism effect
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

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Showcase', path: '/showcase', icon: Sparkles },
    { name: 'Login', path: '/login', icon: LogIn },
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
              EcoStay <span className="text-emerald-400 dark:text-emerald-400 font-extrabold">Connect</span>
            </span>
          </Link>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center space-x-2">
            
            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-1 mr-2">
              {navLinks.map((link) => {
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

            {/* Dark Mode Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border border-transparent transition-all duration-200 focus:outline-none cursor-pointer ${
                scrolled
                  ? 'text-slate-500 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

          </div>

          {/* Mobile Action buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-colors focus:outline-none cursor-pointer ${
                scrolled
                  ? 'text-slate-500 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-colors focus:outline-none cursor-pointer ${
                scrolled 
                  ? 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400' 
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <div className={`px-2 pt-2 pb-4 space-y-1 shadow-inner border-t ${
          scrolled 
            ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800' 
            : 'bg-emerald-950 dark:bg-emerald-900 border-emerald-800/40'
        }`}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : scrolled
                      ? 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-slate-350 dark:hover:text-emerald-400 dark:hover:bg-slate-800/60'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
