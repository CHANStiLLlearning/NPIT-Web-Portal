import React, { useState, useEffect } from 'react';
import { Megaphone, AlertTriangle, Info, Award, ArrowRight, X } from 'lucide-react';
import { getSiteBanner } from '../services/siteContentService';

export default function SiteBanner({ lang = 'en', onNavigate }) {
  const [banner, setBanner] = useState(() => getSiteBanner());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Listen for custom event triggered when admin saves new banner
    const handleBannerUpdate = (e) => {
      if (e?.detail) {
        setBanner(e.detail);
        setDismissed(false); // Reset dismissal on new update
      } else {
        setBanner(getSiteBanner());
      }
    };

    // Cross-tab synchronization via storage event
    const handleStorage = (e) => {
      if (e.key === 'npit_site_banner') {
        setBanner(getSiteBanner());
        setDismissed(false);
      }
    };

    window.addEventListener('npit-site-banner-updated', handleBannerUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('npit-site-banner-updated', handleBannerUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  if (!banner || !banner.enabled || dismissed) {
    return null;
  }

  const isKh = lang === 'kh';
  const text = (isKh ? banner.textKh : banner.textEn) || banner.textEn || banner.textKh;
  const ctaText = (isKh ? banner.ctaTextKh : banner.ctaTextEn) || banner.ctaTextEn || banner.ctaTextKh;
  const ctaLink = banner.ctaLink || '#';

  if (!text) {
    return null;
  }

  // Visual themes (strictly adhering to no-green rule)
  const getTheme = () => {
    switch (banner.type) {
      case 'urgent':
        return {
          wrapper: 'bg-gradient-to-r from-red-900 via-rose-900 to-red-950 text-white border-b border-red-700/60 shadow-sm',
          iconBg: 'bg-red-500/20 text-red-200',
          icon: AlertTriangle,
          ctaBtn: 'bg-white hover:bg-red-50 text-red-950',
          badgeText: isKh ? 'បន្ទាន់' : 'Urgent Notice'
        };
      case 'info':
        return {
          wrapper: 'bg-gradient-to-r from-sky-950 via-blue-950 to-slate-950 text-white border-b border-sky-800/50 shadow-sm',
          iconBg: 'bg-sky-500/20 text-sky-300',
          icon: Info,
          ctaBtn: 'bg-[#C29A39] hover:bg-[#d4af37] text-white',
          badgeText: isKh ? 'ព័ត៌មាន' : 'Information'
        };
      case 'success':
        return {
          wrapper: 'bg-gradient-to-r from-[#997328] via-[#C29A39] to-[#997328] text-slate-950 border-b border-amber-300/40 shadow-sm',
          iconBg: 'bg-white/30 text-slate-950',
          icon: Award,
          ctaBtn: 'bg-slate-950 hover:bg-slate-900 text-white',
          badgeText: isKh ? 'អាហារូបករណ៍' : 'Scholarship Award'
        };
      case 'announcement':
      default:
        return {
          wrapper: 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-[#C29A39]/30 shadow-sm',
          iconBg: 'bg-[#C29A39]/20 text-[#C29A39]',
          icon: Megaphone,
          ctaBtn: 'bg-[#C29A39] hover:bg-[#d4af37] text-white',
          badgeText: isKh ? 'សេចក្តីជូនដំណឹង' : 'Announcement'
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  const handleCtaClick = (e) => {
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const target = ctaLink.replace('#', '');
      if (onNavigate) {
        onNavigate(target, ctaLink);
      } else {
        window.location.hash = ctaLink;
      }
    }
  };

  return (
    <aside 
      aria-label="Site Announcement"
      className={`relative z-50 w-full px-3 sm:px-6 py-2.5 transition-all duration-300 animate-in slide-in-from-top ${theme.wrapper}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-[13px]">
        {/* Left: Icon & Message */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className={`p-1.5 rounded-lg shrink-0 ${theme.iconBg}`}>
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>

          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-black tracking-wider rounded bg-white/10 shrink-0">
            {theme.badgeText}
          </span>

          <div className="truncate font-medium leading-tight">
            <span>{text}</span>
          </div>
        </div>

        {/* Right: Optional CTA & Dismiss button */}
        <div className="flex items-center gap-2 shrink-0">
          {ctaText && (
            <a
              href={ctaLink}
              onClick={handleCtaClick}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-all duration-150 active:scale-95 shadow-xs cursor-pointer ${theme.ctaBtn}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 rounded hover:bg-black/20 text-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
