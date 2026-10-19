import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Globe, Send } from 'lucide-react';

export default function Footer({ footerData, instituteName, instituteNameKhmer }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0b1c3c] text-white border-t-4 border-amber-400">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Institute Brand & Ministry Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="NPIT Logo" 
                className="w-14 h-14 object-contain brightness-110"
              />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {instituteName}
                </h3>
                <p className="text-sm font-bold text-white font-khmer mt-0.5">
                  {instituteNameKhmer}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {footerData.aboutText}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-blue-200 block">
                Under the Auspices of:
              </span>
              <span className="text-xs text-amber-300 font-medium">
                Ministry of Labour and Vocational Training (MLVT)
              </span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-blue-900 pb-2">
              {footerData.programsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Department of Civil Engineering</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Department of Information Technology</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Department of Electrical & Electronics</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Department of Mechanical Engineering</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Department of Automotive Technology</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-blue-900 pb-2">
              {footerData.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About the Institute</a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-amber-400 transition-colors">Admissions & Scholarships</a>
              </li>
              <li>
                <a href="#news" className="hover:text-amber-400 transition-colors">News, Announcements & Events</a>
              </li>
              <li>
                <a href="#research" className="hover:text-amber-400 transition-colors">Applied Research & Innovation</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-blue-900 pb-2">
              {footerData.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{footerData.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{footerData.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{footerData.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{footerData.hours}</span>
              </li>
            </ul>

            {/* Social Icons with Accessible Labels */}
            <div className="mt-5 flex items-center gap-3">
              <a 
                href="https://www.facebook.com/npit.edu.kh" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                title="Facebook"
                aria-label="NPIT Official Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/npit_official" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                title="Telegram"
                aria-label="NPIT Official Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@npitcambodia" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-blue-900/60 hover:bg-red-600 flex items-center justify-center transition-colors text-white"
                title="YouTube"
                aria-label="NPIT Official YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/school/npit-cambodia/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-blue-900/60 hover:bg-blue-500 flex items-center justify-center transition-colors text-white"
                title="LinkedIn"
                aria-label="NPIT Official LinkedIn Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#07132a] border-t border-blue-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{footerData.copyright}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#track" className="text-amber-400 hover:text-white transition-colors font-semibold flex items-center gap-1">
              <span>🔍</span> Track Application
            </a>
            <span>•</span>
            <a href="#admin" className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>🔐</span> Staff Portal
            </a>
            <span>•</span>
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-blue-900 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
