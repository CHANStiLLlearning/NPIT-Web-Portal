import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Building2, 
  Bookmark, 
  ArrowRight, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Download,
  Newspaper,
  Tag
} from 'lucide-react';
import { newsArticles } from '../data/newsData';

export default function NewsDetailPage({ 
  lang, 
  article, 
  onNavigate, 
  onSelectNews, 
  onBack 
}) {
  const isKh = lang === 'kh';
  const [copied, setCopied] = useState(false);

  // Safe fallback if article is somehow missing
  const current = article || newsArticles[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const otherArticles = newsArticles.filter(a => a.id !== current.id);

  // Find index for prev/next
  const currentIndex = newsArticles.findIndex(a => a.id === current.id);
  const prevArticle = currentIndex > 0 ? newsArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < newsArticles.length - 1 ? newsArticles[currentIndex + 1] : null;

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Top Breadcrumb & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <button 
              type="button"
              onClick={() => onNavigate ? onNavigate('home', '#home') : window.location.hash = '#home'}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              {isKh ? "ទំព័រដើម" : "Home"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              type="button"
              onClick={onBack || (() => onNavigate ? onNavigate('news', '#news') : window.location.hash = '#news')}
              className="hover:text-blue-700 transition-colors cursor-pointer font-medium"
            >
              {isKh ? "ព័ត៌មាន និងព្រឹត្តិការណ៍" : "News & Events"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {isKh && current.titleKh ? current.titleKh : current.title}
            </span>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={onBack || (() => onNavigate ? onNavigate('news', '#news') : window.location.hash = '#news')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isKh ? "ត្រឡប់ក្រោយ" : "Back to News"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                copied 
                  ? 'bg-blue-50 text-blue-700 border-blue-300' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Copy page link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-700" /> : <Share2 className="w-3.5 h-3.5 text-blue-700" />}
              <span>{copied ? (isKh ? "បានចម្លង!" : "Copied!") : (isKh ? "ចែករំលែក" : "Share")}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold p-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
              title="Print article"
            >
              <Printer className="w-4 h-4 text-slate-600" />
            </button>
          </div>

        </div>

        {/* 2. Main Article Layout (Grid: 8 Cols Article + 4 Cols Sticky Sidebar) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 md:p-10">
            
            {/* Meta Tags & Category Header */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                {isKh && current.categoryKh ? current.categoryKh : current.category}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{isKh && current.dateKh ? current.dateKh : current.date}</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{current.readTime || "4 min read"}</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{current.author || "NPIT Press Bureau"}</span>
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {current.title}
            </h1>

            {/* Khmer Subtitle / Headline */}
            {current.titleKh && (
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-2 leading-relaxed">
                {current.titleKh}
              </h2>
            )}

            {/* Big Hero Image */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 relative shadow-md">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-72 sm:h-96 md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-xs p-2.5 rounded-lg border border-white/20">
                📷 {current.title} — National Polytechnic Institute Techo Sen (NPIT)
              </div>
            </div>

            {/* Lead Summary Callout Box */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-l-4 border-blue-700 text-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
                {isKh ? "សេចក្តីសង្ខេបព័ត៌មានផ្លូវការ" : "Official Press Summary"}
              </span>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {isKh && current.summaryKh ? current.summaryKh : current.summary}
              </p>
            </div>

            {/* Rich Article Story Paragraphs */}
            <div className="mt-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {current.content && current.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-blue-900">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights Box */}
            {current.highlights && current.highlights.length > 0 && (
              <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Bookmark className="w-5 h-5 text-blue-700" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isKh ? "ចំណុចសំខាន់ៗនៃព្រឹត្តិការណ៍" : "Key Highlights & Takeaways"}
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Leadership Quotation Block */}
            {current.quote && (
              <figure className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#0f2757] text-white relative overflow-hidden shadow-lg">
                <span className="text-6xl text-amber-400 font-serif absolute -top-4 left-4 opacity-30 select-none">“</span>
                <blockquote className="relative z-10 text-base sm:text-lg italic font-medium leading-relaxed text-slate-100">
                  "{isKh && current.quote.textKh ? current.quote.textKh : current.quote.text}"
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-blue-900/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    NPIT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{current.quote.author}</h4>
                    <p className="text-xs text-blue-200">{current.quote.role}</p>
                  </div>
                </figcaption>
              </figure>
            )}

            {/* Article Photo Showcase */}
            {current.gallery && current.gallery.length > 0 && (
              <div className="mt-10">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-700" />
                  <span>{isKh ? "រូបភាពបន្ថែមក្នុងព្រឹត្តិការណ៍" : "Event Photo Gallery"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {current.gallery.map((img, idx) => (
                    <div key={idx} className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
                      <div className="h-36 sm:h-32 overflow-hidden">
                        <img 
                          src={img.src} 
                          alt={img.caption} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2.5 bg-white text-[11px] font-medium text-slate-600 truncate" title={img.caption}>
                        {img.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Footer & Prev / Next Navigation */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {prevArticle ? (
                <button
                  type="button"
                  onClick={() => onSelectNews && onSelectNews(prevArticle)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-slate-50 cursor-pointer self-start"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block uppercase">{isKh ? "អត្ថបទមុន" : "Previous Story"}</span>
                    <span className="truncate max-w-[200px] block">{prevArticle.title}</span>
                  </div>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  type="button"
                  onClick={() => onSelectNews && onSelectNews(nextArticle)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-slate-50 cursor-pointer self-end"
                >
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">{isKh ? "អត្ថបទបន្ទាប់" : "Next Story"}</span>
                    <span className="truncate max-w-[200px] block">{nextArticle.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : <div />}

            </div>

          </article>

          {/* Right Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Other Recent News Box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {isKh ? "ព័ត៌មានផ្សេងៗទៀត" : "More Recent News"}
                </h3>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  NPIT Feed
                </span>
              </div>

              <div className="space-y-4">
                {otherArticles.slice(0, 4).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectNews && onSelectNews(item)}
                    className="group flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onBack || (() => onNavigate ? onNavigate('news', '#news') : window.location.hash = '#news')}
                  className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 transition-colors cursor-pointer"
                >
                  <span>{isKh ? "មើលព័ត៌មានទាំងអស់" : "View All News & Events"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Upcoming Events Mini-Widget */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {isKh ? "ព្រឹត្តិការណ៍បន្ទាប់" : "Upcoming Events"}
                </h3>
                <span className="text-xs text-amber-600 font-semibold">2023 - 2024</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#244b8a] text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold leading-none">08</span>
                    <span className="text-[8px] font-bold leading-none mt-0.5">NOV</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">Annual Career Fair 2023</h5>
                    <p className="text-[11px] text-slate-500">8:00 AM • Main Hall</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#244b8a] text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold leading-none">22</span>
                    <span className="text-[8px] font-bold leading-none mt-0.5">NOV</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">International Research Symposium</h5>
                    <p className="text-[11px] text-slate-500">9:00 AM • Conference Room A</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#244b8a] text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold leading-none">15</span>
                    <span className="text-[8px] font-bold leading-none mt-0.5">DEC</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">Community Outreach Day</h5>
                    <p className="text-[11px] text-slate-500">8:30 AM • Campus Plaza</p>
                  </div>
                </div>
              </div>
            </div>



          </aside>

        </div>

      </div>
    </div>
  );
}
