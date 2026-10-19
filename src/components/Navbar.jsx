import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  Award, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Layers,
  FlaskConical,
  Compass
} from 'lucide-react';

export default function Navbar({ 
  navItems = [], 
  lang = 'en',
  activeTab, 
  setActiveTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onNavigate,
  onOpenApply 
}) {
  const isKh = lang === 'kh';
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Debounced hover handlers for smooth desktop interactions
  const handleMouseEnter = (itemId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownPanelEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Click on top-level item
  const handleNavClick = (e, item) => {
    // If it has sub-items, allow direct click to toggle or navigate
    if (item.dropdown || item.dropdownGroups) {
      // If already active, navigate to parent page and close
      if (activeDropdown === item.id) {
        setActiveDropdown(null);
        if (onNavigate) {
          onNavigate(item.id, item.href);
        } else {
          setActiveTab(item.id);
          window.location.hash = item.href;
        }
      } else {
        // Toggle open
        setActiveDropdown(item.id);
      }
      return;
    }

    // Direct link (e.g. Home, Contact)
    setActiveDropdown(null);
    if (onNavigate) {
      onNavigate(item.id, item.href);
    } else {
      setActiveTab(item.id);
      window.location.hash = item.href;
    }
  };

  // Click on sub-menu item
  const handleSubItemClick = (e, parentId, subItem) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (subItem.isCta && onOpenApply) {
      onOpenApply();
      return;
    }

    if (onNavigate) {
      onNavigate(parentId, subItem.href);
    } else {
      window.location.hash = subItem.href;
    }
  };

  // Toggle mobile accordion section
  const toggleMobileSection = (e, itemId) => {
    e.stopPropagation();
    setMobileExpanded(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Helper to pick category icon
  const getSubItemIcon = (parentId, subItem) => {
    if (subItem.isCta) return <Sparkles className="w-4 h-4 text-amber-950 shrink-0" />;
    if (parentId === 'programs') return <GraduationCap className="w-3.5 h-3.5 text-blue-300 shrink-0" />;
    if (parentId === 'admissions') return <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (parentId === 'research') return <FlaskConical className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    if (parentId === 'news') return <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    return <Compass className="w-3.5 h-3.5 text-blue-300 shrink-0" />;
  };

  return (
    <nav ref={navRef} className="bg-[#1b4b9b] text-white shadow-md relative z-40 select-none border-t border-blue-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between h-12">
          <ul className="flex items-center space-x-1 lg:space-x-1.5 h-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = Boolean(item.dropdown || item.dropdownGroups);
              const isOpen = activeDropdown === item.id;

              return (
                <li 
                  key={item.id} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.id)}
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  <button
                    type="button"
                    onClick={(e) => handleNavClick(e, item)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1.5 px-3 lg:px-3.5 py-1.5 text-xs lg:text-[13px] font-medium tracking-wide transition-all duration-150 rounded-md cursor-pointer ${
                      isActive || isOpen
                        ? 'bg-[#295eb8] text-white font-semibold shadow-xs'
                        : 'text-white/90 hover:bg-[#2052a6] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-amber-300 opacity-100' : ''
                        }`} 
                      />
                    )}
                  </button>

                  {/* Mega Menu Dropdown for Academic Programs */}
                  {hasDropdown && item.isMega && isOpen && (
                    <div 
                      onMouseEnter={handleDropdownPanelEnter}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/3 pt-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    >
                      <div className="w-[740px] lg:w-[840px] bg-[#0c2049]/98 backdrop-blur-xl border border-blue-600/40 shadow-2xl rounded-2xl p-5 text-white overflow-hidden">
                        
                        {/* Top Highlights Banner */}
                        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-blue-700/50">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg">
                              <GraduationCap className="w-4 h-4" />
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white tracking-wide">
                                {isKh ? 'កម្មវិធីសិក្សាផ្លូវការនៅ NPIT' : 'NPIT Official Academic Programs'}
                              </h4>
                              <p className="text-[11px] text-blue-200/80">
                                {isKh 
                                  ? 'សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (អាហារូបករណ៍ ១០០%) & បរិញ្ញាបត្របច្ចេកទេស ៤ឆ្នាំ' 
                                  : '2-Year Higher Diploma (100% Scholarship) & 4-Year Bachelor of Technology'}
                              </p>
                            </div>
                          </div>

                          <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                            {isKh ? 'ឆ្នាំសិក្សា ២០២៦-២០២៧' : 'Academic Year 2026-2027'}
                          </span>
                        </div>

                        {/* 2 Main Columns */}
                        <div className="grid grid-cols-12 gap-5">
                          
                          {/* Left Column: Higher Diploma (7 cols) */}
                          <div className="col-span-7 bg-blue-950/40 rounded-xl p-3 border border-blue-800/40">
                            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-blue-800/40">
                              <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                {item.dropdownGroups[0]?.title}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.dropdownGroups[0]?.badgeColor}`}>
                                {item.dropdownGroups[0]?.badge}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-1 max-h-[280px] overflow-y-auto pr-1">
                              {item.dropdownGroups[0]?.items.map((sub, idx) => (
                                <a
                                  key={idx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-blue-600/30 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-amber-300 transition-colors"></span>
                                    <span className="text-xs text-slate-100 group-hover:text-white group-hover:font-medium transition-colors">
                                      {sub.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono text-blue-300/80 group-hover:text-blue-200">
                                      {sub.code}
                                    </span>
                                    {sub.tag && (
                                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-medium">
                                        {sub.tag}
                                      </span>
                                    )}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Bachelor of Technology (5 cols) */}
                          <div className="col-span-5 bg-blue-950/40 rounded-xl p-3 border border-blue-800/40 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-blue-800/40">
                                <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                  {item.dropdownGroups[1]?.title}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.dropdownGroups[1]?.badgeColor}`}>
                                  {item.dropdownGroups[1]?.badge}
                                </span>
                              </div>

                              <div className="space-y-1">
                                {item.dropdownGroups[1]?.items.map((sub, idx) => (
                                  <a
                                    key={idx}
                                    href={sub.href}
                                    onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                    className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-blue-600/30 transition-colors text-left"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-amber-300 transition-colors"></span>
                                      <span className="text-xs text-slate-100 group-hover:text-white group-hover:font-medium transition-colors">
                                        {sub.label}
                                      </span>
                                    </div>
                                    <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-medium">
                                      {sub.tag}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Bachelor Shift Badge */}
                            <div className="mt-3 pt-2.5 border-t border-blue-800/40 text-[10px] text-blue-200/90 leading-tight">
                              <span className="font-semibold text-amber-300">
                                {isKh ? 'វេនសិក្សា៖ ' : 'Class Shifts: '}
                              </span>
                              {isKh ? 'វេនយប់ (ច័ន្ទ-សុក្រ) & វេនថ្ងៃសៅរ៍-អាទិត្យ' : 'Evening (Mon-Fri) & Weekend (Sat-Sun)'}
                            </div>
                          </div>

                        </div>

                        {/* Footer Bar with View All Action */}
                        <div className="mt-4 pt-3 border-t border-blue-700/50 flex items-center justify-between">
                          <a
                            href="#programs"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              onNavigate ? onNavigate('programs', '#programs') : (window.location.hash = '#programs');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 hover:underline transition-colors"
                          >
                            <span>{item.footerLink?.label || (isKh ? 'មើលកម្មវិធីសិក្សាទាំងអស់' : 'Explore All Programs')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href="#admissions/scholarships"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              onNavigate ? onNavigate('admissions', '#admissions/scholarships') : (window.location.hash = '#admissions/scholarships');
                            }}
                            className="text-[11px] text-blue-200 hover:text-white transition-colors flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>{isKh ? 'ព័ត៌មានអាហារូបករណ៍ ១០០% របស់រដ្ឋ' : '100% Government Scholarship Details'}</span>
                          </a>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Standard Dropdown for About, Admissions, Research, News */}
                  {hasDropdown && !item.isMega && isOpen && (
                    <div 
                      onMouseEnter={handleDropdownPanelEnter}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-0 pt-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    >
                      <div className="w-80 sm:w-96 bg-[#0c2049]/98 backdrop-blur-xl border border-blue-600/40 shadow-2xl rounded-2xl p-2.5 text-white">
                        <div className="space-y-1">
                          {item.dropdown?.map((sub, idx) => {
                            if (sub.isCta) {
                              return (
                                <a
                                  key={idx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="mt-2 block p-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-transform duration-150 transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                                      <span className="text-xs font-extrabold">{sub.label}</span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[10px] text-slate-900/80 font-medium mt-0.5 pl-6">
                                      {sub.desc}
                                    </p>
                                  )}
                                </a>
                              );
                            }

                            if (sub.isFullLink) {
                              return (
                                <div key={idx} className="pt-1.5 mt-1 border-t border-blue-700/40">
                                  <a
                                    href={sub.href}
                                    onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-amber-300 hover:text-amber-200 hover:bg-blue-600/20 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <span>{sub.label}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              );
                            }

                            return (
                              <a
                                key={idx}
                                href={sub.href}
                                onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-600/30 transition-colors text-left cursor-pointer"
                              >
                                <span className="mt-0.5 p-1 rounded-md bg-blue-800/60 group-hover:bg-blue-700 transition-colors shrink-0">
                                  {getSubItemIcon(item.id, sub)}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <h5 className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                                      {sub.label}
                                    </h5>
                                    {sub.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30 shrink-0">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[11px] text-blue-200/70 group-hover:text-blue-100 line-clamp-1 mt-0.5 leading-tight">
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                </li>
              );
            })}
          </ul>

          {/* Quick Track Status Action */}
          <div className="flex items-center gap-2">
            <a
              href="#track"
              onClick={(e) => {
                e.preventDefault();
                setActiveDropdown(null);
                onNavigate ? onNavigate('track', '#track') : (window.location.hash = '#track');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-md text-xs transition shadow-xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isKh ? 'ពិនិត្យពាក្យ' : 'Track Status'}</span>
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer (Accordion Style) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-blue-600/40 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[82vh] overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const hasDropdown = Boolean(item.dropdown || item.dropdownGroups);
                const isExpanded = Boolean(mobileExpanded[item.id]);

                return (
                  <li key={item.id} className="rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (hasDropdown) {
                            toggleMobileSection(e, item.id);
                          } else {
                            handleNavClick(e, item);
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`flex-1 px-3.5 py-2.5 text-sm font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-[#295eb8] text-white font-bold'
                            : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                      </a>

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={(e) => toggleMobileSection(e, item.id)}
                          className="px-3 py-2.5 text-blue-200 hover:text-white hover:bg-blue-800 rounded-r-lg transition-colors cursor-pointer"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-amber-300' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Content for Mega-Menu (Programs) */}
                    {hasDropdown && item.isMega && isExpanded && (
                      <div className="pl-4 pr-2 py-2 bg-[#0c2049]/60 border-l-2 border-amber-400 ml-3 my-1 space-y-3 rounded-r-lg">
                        {item.dropdownGroups?.map((grp, gIdx) => (
                          <div key={gIdx} className="space-y-1">
                            <div className="flex items-center justify-between py-1 text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                              <span>{grp.title}</span>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${grp.badgeColor}`}>
                                {grp.badge}
                              </span>
                            </div>

                            <div className="space-y-0.5">
                              {grp.items.map((sub, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="block px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-blue-700/40 rounded transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{sub.label}</span>
                                    <span className="text-[10px] text-blue-300/80 font-mono">{sub.code}</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="pt-2 border-t border-blue-800/40">
                          <a
                            href="#programs"
                            onClick={(e) => {
                              e.preventDefault();
                              setMobileMenuOpen(false);
                              onNavigate ? onNavigate('programs', '#programs') : (window.location.hash = '#programs');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:underline"
                          >
                            <span>{item.footerLink?.label || (isKh ? 'មើលកម្មវិធីសិក្សាទាំងអស់' : 'View All 14 Programs')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Accordion Content for Standard Dropdown */}
                    {hasDropdown && !item.isMega && isExpanded && (
                      <div className="pl-4 pr-2 py-2 bg-[#0c2049]/60 border-l-2 border-blue-400 ml-3 my-1 space-y-1 rounded-r-lg">
                        {item.dropdown?.map((sub, sIdx) => {
                          if (sub.isCta) {
                            return (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                className="block mt-2 p-2 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs text-center"
                              >
                                {sub.label}
                              </a>
                            );
                          }

                          return (
                            <a
                              key={sIdx}
                              href={sub.href}
                              onClick={(e) => handleSubItemClick(e, item.id, sub)}
                              className="block px-2 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-blue-700/40 rounded transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="text-[9px] px-1 bg-blue-500/20 text-blue-200 rounded">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    )}

                  </li>
                );
              })}

              {/* Mobile Quick Action Buttons */}
              <li className="pt-3 border-t border-blue-600/40 space-y-2">
                <a
                  href="#apply"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onOpenApply) onOpenApply();
                    else window.location.hash = '#apply';
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-lg shadow-sm transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isKh ? 'ចុះឈ្មោះសិក្សាអនឡាញ' : 'Apply Online for 2026-2027'}</span>
                </a>

                <a
                  href="#track"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate ? onNavigate('track', '#track') : (window.location.hash = '#track');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-blue-200 hover:text-white bg-blue-800/60 rounded-lg transition"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isKh ? 'ពិនិត្យស្ថានភាពពាក្យស្នើសុំ' : 'Track Application Status'}</span>
                </a>
              </li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
