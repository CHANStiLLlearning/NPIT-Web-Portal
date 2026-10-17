import React from 'react';
import { Search } from 'lucide-react';

export default function Navbar({ 
  navItems, 
  activeTab, 
  setActiveTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onNavigate,
  onOpenApply 
}) {
  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(item.id, item.href);
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <nav className="bg-[#1b4b9b] text-white shadow-md relative z-30 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Menu - Matches the Reference Mockup */}
        <div className="hidden md:flex items-center justify-between h-12">
          <ul className="flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`block px-4 py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-all duration-150 rounded cursor-pointer ${
                      isActive
                        ? 'bg-[#295eb8] text-white font-semibold shadow-xs'
                        : 'text-white/90 hover:bg-[#2052a6] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#track"
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('track', '#track') : (window.location.hash = '#track');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs transition shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Status</span>
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-blue-600/40 animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#295eb8] text-white font-semibold'
                          : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-blue-600/30">
                <a
                  href="#track"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate ? onNavigate('track', '#track') : (window.location.hash = '#track');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-amber-300 hover:bg-blue-800 rounded"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Application Status</span>
                </a>
              </li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
