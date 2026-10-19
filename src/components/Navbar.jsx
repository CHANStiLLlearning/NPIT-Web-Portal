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
    }, 150);
  };

  const handleDropdownPanelEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Click on top-level item
  const handleNavClick = (e, item) => {
    if (item.dropdown || item.dropdownGroups) {
      if (activeDropdown === item.id) {
        setActiveDropdown(null);
        if (onNavigate) {
          onNavigate(item.id, item.href);
        } else {
          setActiveTab(item.id);
          window.location.hash = item.href;
        }
      } else {
        setActiveDropdown(item.id);
      }
      return;
    }

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

  return (
    <nav ref={navRef} className="bg-[#122133] text-white shadow-md relative z-40 select-none border-t border-[#1c304a] border-b border-[#0a1420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Menu - ACLEDA Bank Corporate Style */}
        <div className="hidden md:flex items-center justify-between h-12 md:h-13">
          <ul className="flex items-center space-x-1 lg:space-x-2 h-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = Boolean(item.dropdown || item.dropdownGroups);
              const isOpen = activeDropdown === item.id;

              return (
                <li 
                  key={item.id} 
                  className="relative h-full flex items-center group/nav"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.id)}
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  <button
                    type="button"
                    onClick={(e) => handleNavClick(e, item)}
                    aria-expanded={isOpen}
                    className={`relative h-full inline-flex items-center gap-1.5 px-3 lg:px-3.5 text-xs lg:text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                      isActive || isOpen
                        ? 'text-[#C29A39]'
                        : 'text-white hover:text-[#C29A39]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
                          isOpen ? 'rotate-180 text-[#C29A39]' : 'text-slate-300 group-hover/nav:text-[#C29A39]'
                        }`} 
                      />
                    )}
                    {/* Animated ACLEDA Gold Underline Indicator */}
                    <span 
                      className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#C29A39] transition-all duration-300 ease-out origin-center pointer-events-none ${
                        isActive || isOpen 
                          ? 'scale-x-100 opacity-100' 
                          : 'scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100'
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown for Academic Programs - ACLEDA Bank Solid Style */}
                  {hasDropdown && item.isMega && isOpen && (
                    <div 
                      onMouseEnter={handleDropdownPanelEnter}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/3 pt-1.5 z-50 pointer-events-auto"
                    >
                      <div className="w-[640px] lg:w-[720px] bg-[#122133] border border-[#284263] shadow-2xl rounded-lg overflow-hidden text-white acleda-dropdown-animate">
                        
                        {/* 2 Solid Clean Columns */}
                        <div className="grid grid-cols-2 divide-x divide-[#1c304a]">
                          
                          {/* Column 1: Higher Diploma (2 Years) */}
                          <div className="flex flex-col">
                            <div className="bg-[#0e1b2b] px-4 py-2.5 border-b border-[#1c304a] flex items-center justify-between">
                              <span className="text-xs font-bold text-[#C29A39] uppercase tracking-wider">
                                {item.dropdownGroups[0]?.title}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                                {item.dropdownGroups[0]?.badge}
                              </span>
                            </div>

                            <div className="divide-y divide-[#1c304a] max-h-[300px] overflow-y-auto">
                              {item.dropdownGroups[0]?.items.map((sub, idx) => (
                                <a
                                  key={idx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="group flex items-center justify-between px-4 py-2 text-xs text-white hover:text-[#C29A39] hover:bg-[#1a2f47] transition-all duration-200 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b5980] group-hover:bg-[#C29A39] group-hover:scale-125 transition-all duration-200"></span>
                                    <span className="font-medium group-hover:translate-x-1.5 transition-transform duration-200 ease-out">
                                      {sub.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-amber-200 transition-colors duration-200">
                                      {sub.code}
                                    </span>
                                    {sub.tag && (
                                      <span className="text-[9px] bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-1 py-0.2 rounded font-bold transition-transform duration-200 group-hover:scale-105">
                                        {sub.tag}
                                      </span>
                                    )}
                                    <ChevronRight className="w-3 h-3 text-[#C29A39] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out shrink-0" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Bachelor of Technology (4 Years) */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="bg-[#0e1b2b] px-4 py-2.5 border-b border-[#1c304a] flex items-center justify-between">
                                <span className="text-xs font-bold text-[#C29A39] uppercase tracking-wider">
                                  {item.dropdownGroups[1]?.title}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/40">
                                  {item.dropdownGroups[1]?.badge}
                                </span>
                              </div>

                              <div className="divide-y divide-[#1c304a]">
                                {item.dropdownGroups[1]?.items.map((sub, idx) => (
                                  <a
                                    key={idx}
                                    href={sub.href}
                                    onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                    className="group flex items-center justify-between px-4 py-2 text-xs text-white hover:text-[#C29A39] hover:bg-[#1a2f47] transition-all duration-200 cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b5980] group-hover:bg-[#C29A39] group-hover:scale-125 transition-all duration-200"></span>
                                      <span className="font-medium group-hover:translate-x-1.5 transition-transform duration-200 ease-out">
                                        {sub.label}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] bg-amber-900/60 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold transition-transform duration-200 group-hover:scale-105">
                                        {sub.tag}
                                      </span>
                                      <ChevronRight className="w-3 h-3 text-[#C29A39] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out shrink-0" />
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Class Shift Notice */}
                            <div className="bg-[#0e1b2b] p-3 border-t border-[#1c304a] text-[11px] text-slate-300 leading-tight">
                              <span className="font-bold text-[#C29A39]">
                                {isKh ? 'វេនសិក្សា៖ ' : 'Class Shifts: '}
                              </span>
                              <span>
                                {isKh ? 'វេនយប់ (ច័ន្ទ-សុក្រ) & វេនថ្ងៃសៅរ៍-អាទិត្យ' : 'Evening (Mon-Fri) & Weekend (Sat-Sun)'}
                              </span>
                            </div>
                          </div>

                        </div>

                        {/* Bottom Action Bar */}
                        <div className="bg-[#0a1523] px-4 py-2.5 border-t border-[#1c304a] flex items-center justify-between">
                          <a
                            href="#programs"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              onNavigate ? onNavigate('programs', '#programs') : (window.location.hash = '#programs');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C29A39] hover:underline transition-transform duration-150 hover:translate-x-0.5"
                          >
                            <span>{item.footerLink?.label || (isKh ? 'មើលកម្មវិធីសិក្សាទាំងអស់' : 'Explore All 14 Programs')}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                          </a>

                          <a
                            href="#admissions/scholarships"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(null);
                              onNavigate ? onNavigate('admissions', '#admissions/scholarships') : (window.location.hash = '#admissions/scholarships');
                            }}
                            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors duration-150"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{isKh ? 'អាហារូបករណ៍ ១០០% របស់រដ្ឋ' : '100% State Scholarship Details'}</span>
                          </a>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Standard Solid Dropdown for About, Admissions, Research, News - ACLEDA Bank Style */}
                  {hasDropdown && !item.isMega && isOpen && (
                    <div 
                      onMouseEnter={handleDropdownPanelEnter}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-0 pt-1.5 z-50 pointer-events-auto"
                    >
                      <div className="w-72 lg:w-80 bg-[#122133] border border-[#284263] shadow-2xl rounded-lg overflow-hidden py-1 text-white acleda-dropdown-animate">
                        <div className="divide-y divide-[#1c304a]">
                          {item.dropdown?.map((sub, idx) => {
                            if (sub.isCta) {
                              return (
                                <a
                                  key={idx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="block px-4 py-3 bg-[#C29A39] hover:bg-[#d4af37] active:scale-98 text-[#122133] font-bold text-xs text-center uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-inner"
                                >
                                  <div className="flex items-center justify-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-[#122133] transition-transform duration-200 group-hover:rotate-12" />
                                    <span>{sub.label}</span>
                                  </div>
                                </a>
                              );
                            }

                            if (sub.isFullLink) {
                              return (
                                <div key={idx} className="bg-[#0e1b2b]">
                                  <a
                                    href={sub.href}
                                    onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                    className="group flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#C29A39] hover:bg-[#1a2f47] transition-all duration-200 cursor-pointer"
                                  >
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{sub.label}</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                                  </a>
                                </div>
                              );
                            }

                            return (
                              <a
                                key={idx}
                                href={sub.href}
                                onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                className="group flex items-center justify-between px-4 py-2.5 text-xs lg:text-[13px] text-white hover:text-[#C29A39] hover:bg-[#1a2f47] transition-all duration-200 cursor-pointer"
                              >
                                <div>
                                  <div className="font-medium group-hover:translate-x-1.5 transition-transform duration-200 ease-out">
                                    {sub.label}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[10px] text-slate-400 group-hover:text-amber-200/90 mt-0.5 line-clamp-1 transition-colors duration-200">
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-200 border border-blue-500/40 shrink-0 transition-transform duration-200 group-hover:scale-105">
                                      {sub.badge}
                                    </span>
                                  )}
                                  <ChevronRight className="w-3.5 h-3.5 text-[#C29A39] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out shrink-0" />
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

          {/* Quick Track Status Action - ACLEDA Gold Accent */}
          <div className="flex items-center gap-2">
            <a
              href="#track"
              onClick={(e) => {
                e.preventDefault();
                setActiveDropdown(null);
                onNavigate ? onNavigate('track', '#track') : (window.location.hash = '#track');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C29A39] hover:bg-[#d4af37] active:scale-95 text-[#122133] font-bold rounded text-xs transition-all duration-200 uppercase tracking-wider shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isKh ? 'ពិនិត្យពាក្យ' : 'Track Status'}</span>
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer (Accordion Style) - ACLEDA Bank Solid Style */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 bg-[#122133] border-t border-[#1c304a] acleda-dropdown-animate max-h-[82vh] overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const hasDropdown = Boolean(item.dropdown || item.dropdownGroups);
                const isExpanded = Boolean(mobileExpanded[item.id]);

                return (
                  <li key={item.id} className="border-b border-[#1c304a] last:border-b-0">
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
                        className={`flex-1 px-4 py-3 text-xs uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'text-[#C29A39] bg-[#1a2f47]'
                            : 'text-white hover:text-[#C29A39]'
                        }`}
                      >
                        <span>{item.label}</span>
                      </a>

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={(e) => toggleMobileSection(e, item.id)}
                          className="px-4 py-3 text-slate-300 hover:text-[#C29A39] transition-colors cursor-pointer"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              isExpanded ? 'rotate-180 text-[#C29A39]' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Content for Mega-Menu (Programs) */}
                    {hasDropdown && item.isMega && isExpanded && (
                      <div className="bg-[#0e1b2b] border-l-2 border-[#C29A39] ml-4 my-1 space-y-3 p-3 rounded-r acleda-accordion-animate">
                        {item.dropdownGroups?.map((grp, gIdx) => (
                          <div key={gIdx} className="space-y-1">
                            <div className="flex items-center justify-between py-1 text-[11px] font-bold text-[#C29A39] uppercase tracking-wider border-b border-[#1c304a]">
                              <span>{grp.title}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                                {grp.badge}
                              </span>
                            </div>

                            <div className="divide-y divide-[#1c304a]">
                              {grp.items.map((sub, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                  className="group block py-2 px-1 text-xs text-slate-200 hover:text-[#C29A39] transition-all duration-150"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="group-hover:translate-x-1 transition-transform duration-150">{sub.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">{sub.code}</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="pt-2 border-t border-[#1c304a]">
                          <a
                            href="#programs"
                            onClick={(e) => {
                              e.preventDefault();
                              setMobileMenuOpen(false);
                              onNavigate ? onNavigate('programs', '#programs') : (window.location.hash = '#programs');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C29A39] hover:underline"
                          >
                            <span>{item.footerLink?.label || (isKh ? 'មើលកម្មវិធីសិក្សាទាំងអស់' : 'View All 14 Programs')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Accordion Content for Standard Dropdown */}
                    {hasDropdown && !item.isMega && isExpanded && (
                      <div className="bg-[#0e1b2b] border-l-2 border-[#C29A39] ml-4 my-1 space-y-1 p-3 rounded-r acleda-accordion-animate">
                        {item.dropdown?.map((sub, sIdx) => {
                          if (sub.isCta) {
                            return (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={(e) => handleSubItemClick(e, item.id, sub)}
                                className="block mt-2 p-2.5 bg-[#C29A39] hover:bg-[#d4af37] text-[#122133] font-bold rounded text-xs text-center uppercase tracking-wider transition-colors"
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
                              className="group block py-2 px-1 text-xs text-slate-200 hover:text-[#C29A39] border-b border-[#1c304a] last:border-b-0 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="group-hover:translate-x-1 transition-transform duration-150">{sub.label}</span>
                                {sub.badge && (
                                  <span className="text-[9px] px-1 bg-blue-900/60 text-blue-200 rounded">
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

              {/* Mobile Quick Action Buttons in Solid ACLEDA Gold */}
              <li className="pt-3 border-t border-[#1c304a] space-y-2 px-4">
                <a
                  href="#apply"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onOpenApply) onOpenApply();
                    else window.location.hash = '#apply';
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#C29A39] hover:bg-[#d4af37] active:scale-95 text-[#122133] rounded shadow-xs hover:shadow-md transition-all duration-200"
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
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white hover:text-[#C29A39] bg-[#1a2f47] hover:bg-[#203a57] border border-[#284263] rounded shadow-xs hover:shadow-md transition-all duration-200"
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
