import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AcademicPrograms from './components/AcademicPrograms';
import AdmissionsSection from './components/AdmissionsSection';
import NewsAndEvents from './components/NewsAndEvents';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ProgramsPage from './components/ProgramsPage';
import AdmissionsPage from './components/AdmissionsPage';
import ResearchPage from './components/ResearchPage';
import ResearchDetailPage from './components/ResearchDetailPage';
import { getResearchById, researchList } from './data/researchData';
import NewsPage from './components/NewsPage';
import ContactPage from './components/ContactPage';
import ApplyPage from './components/ApplyPage';
import ProgramDetailPage from './components/ProgramDetailPage';
import { getProgramById, programsList } from './data/programsData';
import NewsDetailPage from './components/NewsDetailPage';
import { getNewsById } from './data/newsData';
import AdmissionDetailPage from './components/AdmissionDetailPage';
import { admissionsDetails } from './data/admissionsData';
import TrackerPage from './components/TrackerPage';
import AdminPage from './components/AdminPage';
import { contentData } from './data/content';
import { ArrowUp, Megaphone } from 'lucide-react';
import { getSiteBanner } from './services/siteContentService';

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'programs' | 'admissions' | 'research' | 'news' | 'contact'
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals / Selection state
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedAdmissionDetail, setSelectedAdmissionDetail] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [trackerCode, setTrackerCode] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [siteBanner, setSiteBanner] = useState(getSiteBanner());

  const t = contentData[lang] || contentData.en;

  // Listen for real-time site banner changes from Admin Dashboard
  useEffect(() => {
    const handleBannerUpdate = (e) => {
      setSiteBanner(e.detail || getSiteBanner());
    };
    window.addEventListener('npit-site-banner-updated', handleBannerUpdate);
    return () => window.removeEventListener('npit-site-banner-updated', handleBannerUpdate);
  }, []);

  // Handle URL hash changes & browser navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentPage('about');
        setActiveTab('about');
      } else if (hash.startsWith('#programs/')) {
        const sub = hash.replace('#programs/', '');
        const prog = getProgramById(sub);
        setSelectedProgram(prog);
        setCurrentPage('program-detail');
        setActiveTab('programs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#programs') {
        setCurrentPage('programs');
        setActiveTab('programs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#admissions/')) {
        const sub = hash.replace('#admissions/', '');
        const detail = admissionsDetails[sub] || admissionsDetails.requirements;
        setSelectedAdmissionDetail(detail);
        setCurrentPage('admission-detail');
        setActiveTab('admissions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#apply')) {
        let progId = null;
        if (hash.includes('program=')) {
          progId = hash.split('program=')[1]?.split('&')[0];
        } else if (hash.replace('#apply/', '') && hash !== '#apply') {
          progId = hash.replace('#apply/', '');
        }
        if (progId && progId !== 'undefined' && progId !== 'null') {
          const prog = getProgramById(progId);
          if (prog) setSelectedProgram(prog);
        }
        setCurrentPage('apply');
        setActiveTab('admissions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#admissions') {
        setCurrentPage('admissions');
        setActiveTab('admissions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#research/')) {
        const sub = hash.replace('#research/', '');
        const res = getResearchById(sub);
        setSelectedResearch(res);
        setCurrentPage('research-detail');
        setActiveTab('research');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#research') {
        setCurrentPage('research');
        setActiveTab('research');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#news/')) {
        const sub = hash.replace('#news/', '');
        const article = getNewsById(sub);
        setSelectedNews(article);
        setCurrentPage('news-detail');
        setActiveTab('news');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#news') {
        setCurrentPage('news');
        setActiveTab('news');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash.startsWith('#contact/')) {
        setCurrentPage('contact');
        setActiveTab('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#track')) {
        const sub = hash.replace('#track/', '').replace('#track', '');
        setTrackerCode(sub ? decodeURIComponent(sub) : '');
        setCurrentPage('track');
        setActiveTab('track');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#admin') {
        setCurrentPage('admin');
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          const id = hash.replace('#', '');
          setActiveTab(id);
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          setActiveTab('home');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Auto-highlight active navigation tab on scroll & show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      if (currentPage !== 'home') return;
      const sections = ['home', 'about', 'programs', 'admissions', 'research', 'news', 'contact'];
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigate = (itemId, href) => {
    if (itemId === 'about') {
      setCurrentPage('about');
      setActiveTab('about');
      window.location.hash = '#about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'programs') {
      setCurrentPage('programs');
      setActiveTab('programs');
      window.location.hash = '#programs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'admissions') {
      setCurrentPage('admissions');
      setActiveTab('admissions');
      window.location.hash = '#admissions';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'research') {
      setCurrentPage('research');
      setActiveTab('research');
      window.location.hash = '#research';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'news') {
      setCurrentPage('news');
      setActiveTab('news');
      window.location.hash = '#news';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'apply') {
      setCurrentPage('apply');
      setActiveTab('admissions');
      window.location.hash = '#apply';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'contact') {
      setCurrentPage('contact');
      setActiveTab('contact');
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'track') {
      setCurrentPage('track');
      setActiveTab('track');
      window.location.hash = href || '#track';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'admin') {
      setCurrentPage('admin');
      setActiveTab('admin');
      window.location.hash = '#admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigating to Home or a section on Home
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setActiveTab(itemId);
        window.location.hash = href;
        setTimeout(() => {
          if (itemId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        setActiveTab(itemId);
        window.location.hash = href;
        if (itemId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleApplyClick = (prog) => {
    let selected = null;
    if (prog && typeof prog === 'string') {
      selected = getProgramById(prog);
    } else if (prog && typeof prog === 'object' && prog.id && typeof prog.id === 'string' && !prog.nativeEvent) {
      selected = getProgramById(prog.id);
    }

    if (selected?.id) {
      setSelectedProgram(selected);
      window.location.hash = `#apply?program=${selected.id}`;
    } else {
      window.location.hash = '#apply';
    }
    setCurrentPage('apply');
    setActiveTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProgramSelect = (programOrId) => {
    let prog;
    if (typeof programOrId === 'string') {
      prog = getProgramById(programOrId);
    } else if (programOrId?.id) {
      prog = getProgramById(programOrId.id);
    } else {
      prog = programsList[0];
    }
    setSelectedProgram(prog);
    setCurrentPage('program-detail');
    setActiveTab('programs');
    window.location.hash = `#programs/${prog.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsSelect = (newsItemOrId) => {
    let article;
    if (newsItemOrId && typeof newsItemOrId === 'object' && newsItemOrId.content) {
      article = newsItemOrId;
    } else if (typeof newsItemOrId === 'string') {
      article = getNewsById(newsItemOrId);
    } else if (newsItemOrId?.slug || newsItemOrId?.id) {
      article = getNewsById(newsItemOrId.slug || newsItemOrId.id);
    } else if (newsItemOrId?.title) {
      article = getNewsById(newsItemOrId.title);
    } else {
      article = getNewsById('inauguration');
    }
    setSelectedNews(article);
    setCurrentPage('news-detail');
    setActiveTab('news');
    window.location.hash = `#news/${article.slug || article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdmissionDetailSelect = (topicIdOrItem) => {
    const topicId = typeof topicIdOrItem === 'string' ? topicIdOrItem : (topicIdOrItem?.id || 'requirements');
    const detail = admissionsDetails[topicId] || admissionsDetails.requirements;
    setSelectedAdmissionDetail(detail);
    setCurrentPage('admission-detail');
    setActiveTab('admissions');
    window.location.hash = `#admissions/${topicId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResearchSelect = (researchOrId) => {
    let res;
    if (typeof researchOrId === 'string') {
      res = getResearchById(researchOrId);
    } else if (researchOrId?.id) {
      res = getResearchById(researchOrId.id);
    } else {
      res = researchList[0];
    }
    setSelectedResearch(res);
    setCurrentPage('research-detail');
    setActiveTab('research');
    window.location.hash = `#research/${res.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Standalone Admin Portal (Full screen application matching reference design)
  if (currentPage === 'admin') {
    return (
      <AdminPage
        lang={lang}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* Combined Sticky Navigation System (Header + Royal Blue Navbar) */}
      <div className="sticky top-0 z-40 shadow-sm transition-all">
        
        {/* Site-Wide Announcement Ticker Banner (Controlled via Admin CMS) */}
        {siteBanner?.enabled && currentPage !== 'admin' && (
          <div className={`px-4 py-2 text-white text-xs shadow-xs transition-all ${
            siteBanner.type === 'urgent' ? 'bg-gradient-to-r from-red-700 via-rose-700 to-red-800' :
            siteBanner.type === 'info' ? 'bg-gradient-to-r from-sky-700 via-blue-700 to-sky-800' :
            siteBanner.type === 'success' ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800' :
            'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950'
          }`}>
            <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="p-1 rounded bg-white/20 shrink-0">
                  <Megaphone className="w-3.5 h-3.5 text-amber-300" />
                </span>
                <span className="font-medium text-[11px] sm:text-xs">
                  {lang === 'kh' ? (siteBanner.textKh || siteBanner.textEn) : siteBanner.textEn}
                </span>
              </div>
              {siteBanner.ctaTextEn && (
                <a
                  href={siteBanner.ctaLink || '#apply'}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3 py-1 rounded-full text-[11px] shrink-0 shadow-xs transition"
                >
                  {lang === 'kh' ? (siteBanner.ctaTextKh || siteBanner.ctaTextEn) : siteBanner.ctaTextEn}
                </a>
              )}
            </div>
          </div>
        )}

        {/* 1. Header (Logo, Language Switcher) */}
        <Header
          lang={lang}
          setLang={setLang}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onNavigate={handleNavigate}
          t={t}
        />

        {/* 2. Main Royal Blue Navigation Bar */}
        <Navbar
          navItems={t.nav}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onNavigate={handleNavigate}
          onOpenApply={handleApplyClick}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        
        {currentPage === 'about' ? (
          /* About Page */
          <AboutPage
            lang={lang}
            onOpenApply={handleApplyClick}
          />
        ) : currentPage === 'programs' ? (
          /* Academic Programs Page */
          <ProgramsPage
            lang={lang}
            onOpenApply={handleApplyClick}
            onSelectProgram={handleProgramSelect}
            onSelectFaculty={(fac) => handleProgramSelect(fac.id)}
            onSelectAdmissionDetail={handleAdmissionDetailSelect}
          />
        ) : currentPage === 'program-detail' ? (
          /* Dedicated Standalone Program Detail Page (Full Page-by-Page) */
          <ProgramDetailPage
            lang={lang}
            program={selectedProgram || programsList[0]}
            onSelectProgram={handleProgramSelect}
            onBack={() => handleNavigate('programs', '#programs')}
            onBackHome={() => handleNavigate('home', '#home')}
            onOpenApply={(prog) => {
              handleApplyClick(prog || selectedProgram);
            }}
          />
        ) : currentPage === 'apply' ? (
          /* Dedicated Standalone Online Admission Application Page (Full Page-by-Page) */
          <ApplyPage
            lang={lang}
            defaultProgram={selectedProgram}
            onBack={() => {
              if (selectedProgram) {
                handleNavigate('programs', `#programs/${selectedProgram.id}`);
              } else {
                handleNavigate('admissions', '#admissions');
              }
            }}
            onBackHome={() => handleNavigate('home', '#home')}
            onNavigateToProgram={handleProgramSelect}
          />
        ) : currentPage === 'admissions' ? (
          /* Admissions Page */
          <AdmissionsPage
            lang={lang}
            onOpenApply={handleApplyClick}
            onSelectAdmissionDetail={handleAdmissionDetailSelect}
          />
        ) : currentPage === 'admission-detail' ? (
          /* Dedicated Standalone Admission Detail Page (Full Page-by-Page) */
          <AdmissionDetailPage
            lang={lang}
            item={selectedAdmissionDetail || admissionsDetails.requirements}
            onSelectTopic={handleAdmissionDetailSelect}
            onBack={() => handleNavigate('admissions', '#admissions')}
            onBackHome={() => handleNavigate('home', '#home')}
            onOpenApply={handleApplyClick}
          />
        ) : currentPage === 'research' ? (
          /* Research & Innovation Page Matching Reference Mockup */
          <ResearchPage
            lang={lang}
            onOpenApply={handleApplyClick}
            onSelectResearch={handleResearchSelect}
          />
        ) : currentPage === 'research-detail' ? (
          /* Dedicated Standalone Research Detail Page (Full Page-by-Page) */
          <ResearchDetailPage
            lang={lang}
            research={selectedResearch || researchList[0]}
            onSelectResearch={handleResearchSelect}
            onBack={() => handleNavigate('research', '#research')}
            onBackHome={() => handleNavigate('home', '#home')}
            onOpenApply={handleApplyClick}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'news' ? (
          /* News & Events Page Matching Reference Mockup */
          <NewsPage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectNews={handleNewsSelect}
          />
        ) : currentPage === 'news-detail' ? (
          /* Dedicated Standalone News Detail Page (Full Page-by-Page) */
          <NewsDetailPage
            lang={lang}
            article={selectedNews}
            onNavigate={handleNavigate}
            onSelectNews={handleNewsSelect}
            onBack={() => handleNavigate('news', '#news')}
          />
        ) : currentPage === 'contact' ? (
          /* Contact Us Page Matching Reference Mockup */
          <ContactPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'track' ? (
          /* Public Application and Inquiry Status Tracker */
          <TrackerPage
            lang={lang}
            initialCode={trackerCode}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'admin' ? (
          /* Staff & Admissions Admin Portal */
          <AdminPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        ) : (
          /* Home Page */
          <>
            {/* 3. Hero Section (id="home") */}
            <Hero
              heroData={t.hero}
              lang={lang}
              onOpenApply={handleApplyClick}
              onExploreClick={() => handleNavigate('programs', '#programs')}
            />

            {/* 5. Academic Programs Grid Section (id="programs") */}
            <AcademicPrograms
              programsData={t.programs}
              lang={lang}
              onSelectProgram={handleProgramSelect}
              onOpenApply={handleApplyClick}
              onNavigate={handleNavigate}
            />

            {/* 6. Admissions & Scholarships Section (id="admissions") */}
            <AdmissionsSection
              lang={lang}
              onSelectAdmissionDetail={handleAdmissionDetailSelect}
              onOpenApply={handleApplyClick}
              onNavigate={handleNavigate}
            />


            {/* 7. News & Events Section (id="news") */}
            <NewsAndEvents
              newsData={t.news}
              lang={lang}
              onSelectNews={handleNewsSelect}
              onNavigate={handleNavigate}
            />
          </>
        )}

      </main>

      {/* 10. Institutional Footer */}
      <Footer
        footerData={t.footer}
        instituteName={t.instituteName}
        instituteNameKhmer={t.instituteNameKhmer}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center border border-white/30"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}

