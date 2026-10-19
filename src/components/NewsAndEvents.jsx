import React, { useState, useEffect } from 'react';
import { Calendar, Search, ArrowUpRight, ArrowRight, X, Newspaper } from 'lucide-react';
import { getSiteNews } from '../services/siteContentService';

export default function NewsAndEvents({ newsData, onSelectNews, lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState(() => getSiteNews());
  const [featuredArticleId, setFeaturedArticleId] = useState('inauguration');

  useEffect(() => {
    const handleNewsUpdate = (e) => {
      if (e.detail) {
        setArticles(e.detail);
      } else {
        setArticles(getSiteNews());
      }
    };
    window.addEventListener('npit-news-updated', handleNewsUpdate);
    return () => window.removeEventListener('npit-news-updated', handleNewsUpdate);
  }, []);

  const categories = [
    { id: 'all', label: isKh ? 'ទាំងអស់' : 'All Stories' },
    { id: 'Academic', label: isKh ? 'ការសិក្សា & STEM' : 'Academic & STEM' },
    { id: 'Partnerships', label: isKh ? 'កិច្ចសហការ' : 'Partnerships' },
    { id: 'Campus Life', label: isKh ? 'ជីវិតនិស្សិត' : 'Campus Life' },
    { id: 'Exhibition', label: isKh ? 'ពិព័រណ៍ & សន្និសីទ' : 'Exhibitions & Events' }
  ];

  // Current featured article
  const currentFeatured = articles.find(a => a.id === featuredArticleId) || articles[0];


  // Side list: other articles matching filter
  const sideList = articles.filter(a => a.id !== currentFeatured?.id);

  const matchesSearch = (item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = (item.title || '').toLowerCase().includes(q) || (item.titleKh || '').includes(q);
    const descMatch = (item.desc || '').toLowerCase().includes(q) || (item.descKh || '').includes(q);
    const catMatch = (item.category || '').toLowerCase().includes(q) || (item.categoryKh || '').includes(q);
    return titleMatch || descMatch || catMatch;
  };

  const matchesCategory = (item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory || item.categoryLabel === selectedCategory;
  };

  const filteredSideList = sideList.filter(item => matchesCategory(item) && matchesSearch(item));
  const isFeaturedMatched = matchesCategory(currentFeatured) && matchesSearch(currentFeatured);

  return (
    <section id="news" className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Newspaper className="w-4 h-4 text-blue-700" />
              <span>{isKh ? 'ព្រឹត្តិការណ៍ និងសេចក្តីប្រកាសព័ត៌មាន' : 'Campus Press & Announcements'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {newsData?.title || (isKh ? 'ព័ត៌មាន និងព្រឹត្តិការណ៍ថ្មីៗ' : 'News & Events')}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? 'តាមដានសកម្មភាពនវានុវត្តន៍ កិច្ចសហការអន្តរជាតិ និងជោគជ័យរបស់និស្សិតវិស្វកម្ម NPIT។' 
                : 'Stay informed with the latest research milestones, international MoUs, and student innovations at NPIT.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center w-full sm:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={newsData?.searchPlaceholder || (isKh ? 'ស្វែងរកព័ត៌មាន...' : 'Search news & events...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2 text-sm border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="button"
              className="bg-[#1b4b9b] hover:bg-[#163c7c] text-white p-2.5 rounded-r-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Search news"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {searchQuery && (
            <span className="text-xs text-slate-500 ml-2">
              Found matches for "{searchQuery}"
            </span>
          )}
        </div>

        {/* 3-Column Layout Matching Reference Mockup */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Featured News Card (Left, 7 cols) */}
          <div className="lg:col-span-7">
            {isFeaturedMatched && currentFeatured ? (
              <div 
                onClick={() => onSelectNews && onSelectNews(currentFeatured)}
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-100">
                  <img
                    src={currentFeatured.image}
                    alt={currentFeatured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {isKh ? (currentFeatured.categoryKh || currentFeatured.category) : currentFeatured.category}
                  </span>

                  {/* Read time pill */}
                  {currentFeatured.readTime && (
                    <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      {currentFeatured.readTime}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <Calendar className="w-4 h-4" />
                      <span>{isKh ? (currentFeatured.dateKh || currentFeatured.date) : currentFeatured.date}</span>
                    </div>
                    {currentFeatured.author && (
                      <span className="hidden sm:inline text-slate-400">• {currentFeatured.author}</span>
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {isKh ? (currentFeatured.titleKh || currentFeatured.title) : currentFeatured.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {isKh ? (currentFeatured.descKh || currentFeatured.desc) : currentFeatured.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                    <span className="text-slate-500 font-normal">
                      {isKh ? 'NPIT ការិយាល័យទំនាក់ទំនងសាធារណៈ' : 'NPIT Institutional Media'}
                    </span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isKh ? 'អានអត្ថបទពេញលេញ' : 'Read Full Article'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                <p>{isKh ? 'មិនមានអត្ថបទលេចធ្លោត្រូវនឹងការស្វែងរកនេះទេ។' : 'No featured article matched your current filter criteria.'}</p>
              </div>
            )}
          </div>

          {/* Column 2: Stack of Mini News Items (Right, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {filteredSideList.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNews && onSelectNews(item)}
                onMouseEnter={() => {
                  // Optional preview hint
                }}
                className="group p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 flex gap-4 items-center cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-slate-200 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span>{isKh ? (item.dateKh || item.date) : item.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-800 transition-colors line-clamp-2 leading-snug">
                    {isKh ? (item.titleKh || item.title) : item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-sm">
                      {isKh ? (item.categoryKh || item.category) : item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredSideList.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                {isKh ? 'មិនមានព្រឹត្តិការណ៍បន្ថែមត្រូវនឹងពាក្យស្វែងរកនេះទេ។' : `No additional stories found for "${searchQuery}".`}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

