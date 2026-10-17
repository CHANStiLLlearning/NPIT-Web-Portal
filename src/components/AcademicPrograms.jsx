import React, { useState } from 'react';
import { HardHat, Laptop, Cpu, Cog, ChevronRight, Search, Clock, ArrowRight, X, Sparkles, BookOpen, Send } from 'lucide-react';

export default function AcademicPrograms({ programsData, onSelectProgram, onOpenApply, lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getProgramIcon = (icon) => {
    switch (icon) {
      case 'HardHat':
        return <HardHat className="w-7 h-7 text-white" />;
      case 'Laptop':
        return <Laptop className="w-7 h-7 text-white" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-white" />;
      case 'Cog':
        return <Cog className="w-7 h-7 text-white" />;
      default:
        return <Laptop className="w-7 h-7 text-white" />;
    }
  };

  const categories = [
    { id: 'all', label: isKh ? 'គ្រប់ដេប៉ាតឺម៉ង់ (៤)' : 'All Departments (4)' },
    { id: 'civil', label: isKh ? 'សំណង់ស៊ីវិល' : 'Civil Engineering' },
    { id: 'it', label: isKh ? 'បច្ចេកវិទ្យាព័ត៌មាន' : 'Information Tech' },
    { id: 'electrical', label: isKh ? 'អគ្គិសនី & អេឡិចត្រូនិក' : 'Electrical & Power' },
    { id: 'mechanical', label: isKh ? 'មេកានិច & ស្វ័យប្រវត្តិកម្ម' : 'Mechanical & CNC' },
  ];

  const list = programsData?.list || [];

  const filteredList = list.filter((prog) => {
    const matchesCategory = selectedCategory === 'all' || prog.id === selectedCategory;
    const matchesSearch = 
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.nameKhmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="programs" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isKh ? 'កម្មវិធីបរិញ្ញាបត្រវិស្វកម្ម ៤ ឆ្នាំ' : '4-Year Bachelor of Engineering'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {programsData?.title || (isKh ? 'កម្មវិធីសិក្សា និងដេប៉ាតឺម៉ង់វិស្វកម្ម' : 'Academic Programs Grid')}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? 'កម្មវិធីសិក្សាស្តង់ដារជាតិ និងតំបន់ ដែលរួមបញ្ចូលទ្រឹស្តី ៣០% និងការអនុវត្តមន្ទីរពិសោធន៍ ៧០%។' 
                : 'Nationally accredited curricula integrating 30% theory and 70% intensive hands-on laboratory mastery.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center w-full sm:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={programsData?.searchPlaceholder || (isKh ? 'ស្វែងរកកម្មវិធីសិក្សា...' : 'Search academic programs...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2 text-sm border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white transition-colors"
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
              title="Filter Programs"
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
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {searchQuery && (
            <span className="text-xs text-slate-500 ml-2">
              Found {filteredList.length} program(s)
            </span>
          )}
        </div>

        {/* 4 Cards Grid Matching Reference Design */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredList.map((prog) => {
            return (
              <div
                key={prog.id}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col bg-white border border-slate-200 cursor-pointer"
                onClick={() => onSelectProgram && onSelectProgram(prog)}
              >
                {/* Image Section with Integrated Header */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Subtle tinted overlay based on card color */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                  {/* Top Floating Icon Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-md">
                      {getProgramIcon(prog.icon)}
                    </div>
                  </div>

                  {/* Degree Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {isKh ? 'បរិញ្ញាបត្រ' : 'Bachelor'}
                    </span>
                  </div>

                  {/* Title overlay inside the card image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-amber-300 font-khmer mt-0.5 font-medium drop-shadow-xs">
                      {prog.nameKhmer}
                    </p>
                  </div>
                </div>

                {/* Card Middle Info */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prog.overview}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>4 Years • {prog.totalCredits || 130}+ Credits</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Color Banner with Dual Actions (Learn More + Apply) */}
                <div className={`px-4 py-3 ${prog.cardBg} text-white flex items-center justify-between transition-colors`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectProgram) onSelectProgram(prog);
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-white hover:underline focus:outline-none cursor-pointer"
                  >
                    <span>{programsData?.learnMore || (isKh ? 'ព័ត៌មានលម្អិត' : 'Learn More')}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenApply) onOpenApply(prog);
                    }}
                    className="bg-white/20 hover:bg-white text-white hover:text-slate-900 text-xs font-bold px-3 py-1 rounded-full border border-white/40 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isKh ? 'ដាក់ពាក្យ' : 'Apply'}</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredList.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 mt-6">
            <p className="font-semibold text-slate-700">No academic program matched your search for "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-bold text-blue-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner Navigating to Full Programs Page */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                {isKh ? 'ត្រូវការពិនិត្យតារាងមុខវិជ្ជា និងកម្មវិធីបណ្តុះបណ្តាលវិជ្ជាជីវៈកម្រិតខ្ពស់?' : 'Need to review complete semester syllabi & higher diplomas?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                {isKh 
                  ? 'ពិនិត្យមើលលម្អិតអំពីក្រេឌីត មុខវិជ្ជាស្នូល មន្ទីរពិសោធន៍អនុវត្ត និងឱកាសការងារ។' 
                  : 'Explore course structures, laboratory credit hours, graduation prerequisites, and career roadmaps.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('programs', '#programs')}
            className="shrink-0 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <span>{isKh ? 'មើលកម្មវិធីសិក្សាពេញលេញ' : 'View Full Programs Guide'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

