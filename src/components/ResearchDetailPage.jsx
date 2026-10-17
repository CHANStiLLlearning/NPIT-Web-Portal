import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Building2, 
  ChevronRight, 
  Check, 
  Cpu,
  Network,
  FlaskConical,
  SunMedium,
  FileText,
  Clock,
  Award,
  Layers,
  Mail,
  MapPin,
  BookOpen,
  Users,
  ShieldCheck
} from 'lucide-react';
import { researchList } from '../data/researchData';
import { submitResearchInquiry } from '../services/inquiryService';

export default function ResearchDetailPage({ 
  lang = 'en', 
  research, 
  onSelectResearch, 
  onBack, 
  onBackHome, 
  onOpenApply,
  onNavigate 
}) {
  const isKh = lang === 'kh';
  const [copied, setCopied] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryRefNum, setInquiryRefNum] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryOrg, setInquiryOrg] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  // Safe fallback if research object is somehow null
  const current = research || researchList[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find index for prev/next navigation
  const currentIndex = researchList.findIndex(r => r.id === current.id);
  const prevResearch = currentIndex > 0 ? researchList[currentIndex - 1] : null;
  const nextResearch = currentIndex < researchList.length - 1 ? researchList[currentIndex + 1] : null;

  // Other research domains for sidebar
  const otherResearch = researchList.filter(r => r.id !== current.id);

  const getDomainIcon = (iconName, className = "w-6 h-6 text-white") => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Network':
        return <Network className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'SunMedium':
        return <SunMedium className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || inquirySubmitting) return;

    setInquirySubmitting(true);
    try {
      const res = await submitResearchInquiry({
        researchDomain: current.title,
        name: inquiryName,
        org: inquiryOrg,
        email: inquiryEmail,
        message: inquiryMessage
      });
      setInquiryRefNum(res.referenceNumber);
      setInquirySubmitted(true);
      setTimeout(() => {
        setInquirySubmitted(false);
        setInquiryName('');
        setInquiryOrg('');
        setInquiryEmail('');
        setInquiryMessage('');
      }, 5500);
    } catch (err) {
      console.warn('Research inquiry error:', err);
    } finally {
      setInquirySubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Sub-Header Breadcrumb & Action Toolbar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] sm:top-[76px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-slate-500 overflow-x-auto py-1">
            <button 
              type="button" 
              onClick={onBackHome || (() => onNavigate && onNavigate('home', '#home'))} 
              className="hover:text-blue-700 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {isKh ? "ទំព័រដើម" : "Home"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              type="button" 
              onClick={onBack || (() => onNavigate && onNavigate('research', '#research'))} 
              className="hover:text-blue-700 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {isKh ? "ការស្រាវជ្រាវ និងនវានុវត្តន៍" : "Research & Innovation"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
              {isKh && current.titleKh ? current.titleKh : current.title}
            </span>
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={onBack || (() => onNavigate && onNavigate('research', '#research'))}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>{isKh ? "ត្រឡប់ទៅការស្រាវជ្រាវ" : "Back to Research"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                copied 
                  ? 'bg-blue-50 text-blue-700 border-blue-300' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Copy direct page URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-700" /> : <Share2 className="w-3.5 h-3.5 text-blue-700" />}
              <span>{copied ? (isKh ? "បានចម្លង!" : "Copied!") : (isKh ? "ចែករំលែក" : "Share")}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold p-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
              title="Print research details"
            >
              <Printer className="w-4 h-4 text-slate-600" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. Hero Presentation Banner */}
      <section className="bg-gradient-to-br from-[#0f2757] via-[#1b4b9b] to-[#0f2757] text-white pt-10 pb-14 border-b border-blue-900 shadow-inner relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Cols: Titles, Badges, Tagline */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-slate-950" />
                  {isKh ? (current.badgeKh || current.badge) : current.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-xs border border-white/20">
                  {isKh ? "ដេប៉ាតឺម៉ង់ស្រាវជ្រាវផ្លូវការ NPIT" : "Official NPIT Research Division"}
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {current.title}
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold font-khmer text-amber-300 mt-1 leading-snug">
                  {current.titleKh}
                </p>
              </div>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                {isKh ? (current.taglineKh || current.tagline) : current.tagline}
              </p>

              {/* Fast Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15">
                  <span className="block text-xs text-blue-200 font-medium">
                    {isKh ? "គម្រោងសកម្ម" : "Active Projects"}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {isKh ? current.stats.activeProjectsKh : current.stats.activeProjects}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15">
                  <span className="block text-xs text-blue-200 font-medium">
                    {isKh ? "មន្ទីរពិសោធន៍" : "Laboratories"}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {isKh ? current.stats.laboratoriesKh : current.stats.laboratories}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15">
                  <span className="block text-xs text-blue-200 font-medium">
                    {isKh ? "អ្នកស្រាវជ្រាវ" : "Researchers"}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {isKh ? current.stats.facultyResearchersKh : current.stats.facultyResearchers}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15">
                  <span className="block text-xs text-blue-200 font-medium">
                    {isKh ? "ដៃគូសហការ" : "Industry Partners"}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {isKh ? current.stats.industryPartnersKh : current.stats.industryPartners}
                  </span>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Photographic Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <img 
                  src={current.image} 
                  alt={current.title} 
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-700/90 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-xs">
                      {getDomainIcon(current.iconName, "w-6 h-6 text-white")}
                    </div>
                    <div>
                      <p className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                        {isKh ? "វិស័យស្រាវជ្រាវ" : "Research Domain"}
                      </p>
                      <p className="text-sm font-bold text-white">
                        {current.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Content Grid (Two-Column Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 3.1 Overview & Strategic Vision */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {isKh ? "ទស្សនវិស័យ និងបេសកកម្មស្រាវជ្រាវ" : "Overview & Strategic Vision"}
                  </h2>
                  <p className="text-xs text-slate-500 font-khmer">
                    {isKh ? "សង្ខេបអំពីទិសដៅស្រាវជ្រាវ និងការរួមចំណែក" : "Scope, technological mission and regional impact"}
                  </p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  {isKh ? current.overviewKh : current.overview}
                </p>
              </div>

              {/* Research Methodology Pill Highlights */}
              <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {isKh ? "ស្តង់ដារ ISO & IEEE" : "ISO & IEEE Compliant"}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      {isKh ? "អនុវត្តតាមបទដ្ឋានវិស្វកម្មអន្តរជាតិ" : "International testing benchmarks"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Users className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {isKh ? "និស្សិតចូលរួមផ្ទាល់" : "Student Internship"}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      {isKh ? "និស្សិតឆ្នាំទី៤ អនុវត្តគម្រោងជាក់ស្តែង" : "Senior engineering capstone teams"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Award className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {isKh ? "ផ្ទេរបច្ចេកវិទ្យា" : "Tech Transfer"}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      {isKh ? "ដំណោះស្រាយសម្រាប់រោងចក្រ និងសហគ្រាស" : "Direct deployment to enterprises"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 Key Research Focus Areas */}
            {current.keyFocusAreas && current.keyFocusAreas.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {isKh ? "វិស័យស្រាវជ្រាវស្នូល" : "Core Research Focus Areas"}
                    </h2>
                    <p className="text-xs text-slate-500 font-khmer">
                      {isKh ? "ជំនាញឯកទេស និងបច្ចេកវិទ្យាដែលកំពុងអភិវឌ្ឍ" : "Specialized disciplines and ongoing inquiries"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.keyFocusAreas.map((focus, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900">
                            {focus.title}
                          </h3>
                          {focus.titleKh && (
                            <p className="text-xs font-bold font-khmer text-blue-800 mt-0.5">
                              {focus.titleKh}
                            </p>
                          )}
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {focus.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3.3 Active Research Projects & Prototypes */}
            {current.projects && current.projects.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {isKh ? "គម្រោងស្រាវជ្រាវ និងគំរូសកម្ម" : "Active Research Projects & Prototypes"}
                      </h2>
                      <p className="text-xs text-slate-500 font-khmer">
                        {isKh ? "គម្រោងដែលកំពុងដំណើរការ និងមានការគាំទ្រមូលនិធិ" : "Funded and validated technological implementations"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {current.projects.map((proj, idx) => (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                          proj.status?.includes('Active') 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : proj.status?.includes('Testing')
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : proj.status?.includes('Completed')
                            ? 'bg-slate-200 text-slate-800 border border-slate-300'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {isKh && proj.statusKh ? proj.statusKh : proj.status}
                        </span>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          {proj.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{proj.duration}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {proj.title}
                      </h3>
                      {proj.titleKh && (
                        <p className="text-xs sm:text-sm font-bold font-khmer text-blue-900 mt-0.5">
                          {proj.titleKh}
                        </p>
                      )}

                      {proj.sponsor && (
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          <span className="text-slate-700">{isKh ? "ម្ចាស់មូលនិធិ / ដៃគូ៖ " : "Sponsor / Partner: "}</span>
                          {proj.sponsor}
                        </p>
                      )}

                      {proj.desc && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                          {proj.desc}
                        </p>
                      )}

                      {/* Deliverables Checklist */}
                      {proj.deliverables && proj.deliverables.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                            {isKh ? "លទ្ធផល និងសមិទ្ធផលសំខាន់ៗ" : "Key Deliverables & Milestones"}
                          </h4>
                          <ul className="space-y-1.5">
                            {proj.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3.4 Specialized Laboratories & Equipment */}
            {current.facilities && current.facilities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {isKh ? "មន្ទីរពិសោធន៍ និងឧបករណ៍ឯកទេស" : "Specialized Laboratories & Equipment"}
                    </h2>
                    <p className="text-xs text-slate-500 font-khmer">
                      {isKh ? "ហេដ្ឋារចនាសម្ព័ន្ធ និងបរិក្ខារទំនើបស្តង់ដារឧស្សាហកម្ម" : "Physical testing bays, CNC mills, and diagnostics"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {current.facilities.map((fac, idx) => (
                    <div 
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {fac.name}
                        </h3>
                        {fac.nameKh && (
                          <p className="text-xs sm:text-sm font-bold font-khmer text-blue-800 mt-0.5">
                            {fac.nameKh}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {fac.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3.5 Publications & Patents */}
            {current.publications && current.publications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {isKh ? "ការបោះពុម្ពផ្សាយ និងកម្មសិទ្ធិបញ្ញា" : "Selected Publications & Intellectual Property"}
                    </h2>
                    <p className="text-xs text-slate-500 font-khmer">
                      {isKh ? "អត្ថបទវិទ្យាសាស្ត្រក្នុងទិនានុប្បវត្តិអន្តរជាតិ និងប៉ាតង់ជាតិ" : "Peer-reviewed articles, conference proceedings, and patents"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {current.publications.map((pub, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                          {pub.title}
                        </h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 shrink-0">
                          {pub.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-700 mt-1">
                        {pub.journal}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {pub.authors}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 3.6 Lead Researcher Card */}
            {current.leadResearcher && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <Users className="w-4 h-4 text-blue-700" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    {isKh ? "ប្រធានក្រុមស្រាវជ្រាវ" : "Principal Investigator"}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {current.leadResearcher.name}
                    </h4>
                    <p className="text-xs font-bold font-khmer text-blue-800">
                      {current.leadResearcher.nameKh}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {isKh ? current.leadResearcher.titleKh : current.leadResearcher.title}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p className="font-semibold text-slate-700">
                      {current.leadResearcher.degrees}
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-500 pt-1">
                      <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <a href={`mailto:${current.leadResearcher.email}`} className="hover:text-blue-700 truncate">
                        {current.leadResearcher.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{current.leadResearcher.office}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3.7 Industry Collaboration & Inquiry Form */}
            <div className="bg-gradient-to-br from-[#0f2757] to-[#1b4b9b] text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-300" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  {isKh ? "កិច្ចសហការឧស្សាហកម្ម" : "Industry Collaboration"}
                </h3>
              </div>

              <h4 className="text-lg font-black text-white leading-snug">
                {isKh ? "ចាប់ដៃគូស្រាវជ្រាវជាមួយ NPIT" : "Partner with Our Research Labs"}
              </h4>

              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                {isKh 
                  ? "សហគ្រាស និងរោងចក្រអាចសហការជាមួយយើង ដើម្បីធ្វើតេស្តបច្ចេកវិទ្យា បង្កើតគំរូ និងដោះស្រាយបញ្ហាជាក់ស្តែង។"
                  : "We offer contract research, prototyping, and technical consultancy for industrial clients across Southeast Asia."}
              </p>

              {inquirySubmitted ? (
                <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20 text-center animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">
                    {isKh ? "សំណើរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ!" : "Inquiry Saved to Research Registry!"}
                  </p>
                  {inquiryRefNum && (
                    <p className="text-[11px] font-mono font-bold text-amber-300 mt-1">
                      Tracking Code: <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">{inquiryRefNum}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-blue-200 mt-1">
                    {isKh ? "ក្រុមការងារស្រាវជ្រាវនឹងទាក់ទងមកវិញឆាប់ៗនេះ។" : "Our research coordinator will respond within 2 business days."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-4 space-y-3">
                  <div>
                    <input 
                      type="text" 
                      placeholder={isKh ? "ឈ្មោះរបស់អ្នក / Your Name" : "Your Name"}
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder={isKh ? "ឈ្មោះស្ថាប័ន / ក្រុមហ៊ុន (Company / Org)" : "Company / Institution Name"}
                      value={inquiryOrg}
                      onChange={(e) => setInquiryOrg(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder={isKh ? "អ៊ីមែលផ្លូវការ / Official Email" : "Official Work Email"}
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder={isKh ? "សង្ខេបអំពីតម្រូវការស្រាវជ្រាវ ឬគម្រោង..." : "Briefly describe your R&D requirement or testbed inquiry..."}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      rows={3}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>{isKh ? "ផ្ញើសំណើកិច្ចសហការ" : "Submit Research Inquiry"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-white/15 text-center">
                <button
                  type="button"
                  onClick={() => onOpenApply && onOpenApply()}
                  className="text-xs text-blue-200 hover:text-white underline underline-offset-2 font-medium"
                >
                  {isKh ? "ដាក់ពាក្យចូលរៀន ឬស្រាវជ្រាវថ្នាក់ឧត្តមសិក្សា →" : "Apply for Graduate Research Fellowship →"}
                </button>
              </div>
            </div>

            {/* 3.8 Other Research Domains in Sidebar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-3 mb-4 border-b border-slate-100">
                {isKh ? "វិស័យស្រាវជ្រាវដទៃទៀត" : "Other Research Domains"}
              </h3>

              <div className="space-y-2.5">
                {otherResearch.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => {
                      if (onSelectResearch) onSelectResearch(res);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                        {getDomainIcon(res.iconName, "w-4 h-4")}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {res.title}
                        </p>
                        <p className="text-[11px] font-bold font-khmer text-slate-500">
                          {res.titleKh}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 4. Bottom Prev / Next Navigation Banner */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {prevResearch ? (
              <button
                type="button"
                onClick={() => onSelectResearch && onSelectResearch(prevResearch)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-left group cursor-pointer flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {isKh ? "← វិស័យមុន" : "← Previous Domain"}
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {prevResearch.title}
                  </p>
                </div>
              </button>
            ) : <div />}

            {nextResearch ? (
              <button
                type="button"
                onClick={() => onSelectResearch && onSelectResearch(nextResearch)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-right group cursor-pointer flex items-center justify-end gap-3 sm:ml-auto w-full"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {isKh ? "វិស័យបន្ទាប់ →" : "Next Domain →"}
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {nextResearch.title}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ) : <div />}

          </div>
        </div>

      </div>

    </div>
  );
}
