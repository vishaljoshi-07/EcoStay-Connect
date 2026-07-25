import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-800 text-emerald-300">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold font-display text-white">
                EcoStay <span className="text-emerald-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering travelers to discover ethical, eco-friendly, and community-driven homestays. Join us in promoting carbon-conscious tourism and preserving local heritage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-lg bg-slate-800 hover:bg-emerald-800 hover:text-white transition-all duration-200" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-slate-800 hover:bg-emerald-800 hover:text-white transition-all duration-200" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-slate-800 hover:bg-emerald-800 hover:text-white transition-all duration-200" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors duration-200">Dashboard</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors duration-200">Login / Register</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sustainability Programs */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Eco-Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <a href="#">Carbon Offsetting</a>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <a href="#">Rural Support Grants</a>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <a href="#">Waste Audits & Certs</a>
              </li>
              <li className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <a href="#">Partner Host Resources</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} EcoStay Connect. All rights reserved. Created for Intern ID <span className="text-slate-400 font-bold">26101252</span>.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500 items-center justify-center">
            <a href="#" className="hover:text-emerald-400 transition-colors duration-150 flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Privacy Policy</span>
            </a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
