import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ lang, setLang, mobileMenuOpen, setMobileMenuOpen, onNavigate, t }) {
  return (
    <header className="bg-white border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo & Institute Name */}
          <a 
            href="#home" 
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', '#home');
              }
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="NPIT Official Logo" 
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="hidden md:flex flex-col justify-center">
              <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-800 uppercase font-sans">
                {t.instituteName}
              </span>
              <span className="text-sm md:text-lg font-bold text-slate-900 font-khmer mt-0.5 tracking-normal">
                {t.instituteNameKhmer}
              </span>
            </div>
          </a>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang('kh')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 font-khmer ${
                  lang === 'kh'
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Khmer Language"
              >
                KH
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English Language"
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
