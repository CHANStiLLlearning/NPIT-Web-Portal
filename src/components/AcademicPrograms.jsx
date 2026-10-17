import React, { useState } from 'react';
import { 
  HardHat, 
  Laptop, 
  Cpu, 
  Cog, 
  ChevronRight, 
  Search, 
  Clock, 
  ArrowRight, 
  X, 
  GraduationCap, 
  BookOpen, 
  Send,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Phone,
  MapPin
} from 'lucide-react';
import { 
  higherDiplomaMajors, 
  bachelorMajors, 
  programsList, 
  officialAdmissionInfo 
} from '../data/programsData';

export default function AcademicPrograms({ programsData, onSelectProgram, onOpenApply, lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'diploma' | 'bachelor'

  const getProgramIcon = (icon) => {
    switch (icon) {
      case 'HardHat':
        return <HardHat className="w-6 h-6 text-white" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-white" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-white" />;
      case 'Cog':
        return <Cog className="w-6 h-6 text-white" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-white" />;
      default:
        return <Award className="w-6 h-6 text-white" />;
    }
  };

  const categories = [
    { 
      id: 'all', 
      label: isKh ? 'គ្រប់ជំនាញទាំងអស់ (១៤)' : 'All Programs (14)' 
    },
    { 
      id: 'diploma', 
      label: isKh ? 'សញ្ញាបត្រជាន់ខ្ពស់ ២ឆ្នាំ (អាហារូបករណ៍ ១០០% - ៩ ជំនាញ)' : 'Higher Diploma 2Y (100% Scholarship - 9 Majors)' 
    },
    { 
      id: 'bachelor', 
      label: isKh ? 'បរិញ្ញាបត្របច្ចេកទេស ៤ឆ្នាំ (វេនយប់/ចុងសប្តាហ៍ - ៥ ជំនាញ)' : 'Bachelor of Tech 4Y (Night/Weekend - 5 Majors)' 
    },
  ];

  const fullList = programsList;

  const filteredList = fullList.filter((prog) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'diploma' && (prog.degreeType === 'diploma' || prog.degreeType === 'both' || prog.level?.toLowerCase().includes('diploma'))) ||
      (selectedCategory === 'bachelor' && (prog.degreeType === 'beng' || prog.degreeType === 'bachelor' || prog.level?.toLowerCase().includes('bachelor')));

    const matchesSearch = 
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.nameKhmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prog.overviewKh && prog.overviewKh.includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="programs" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Header with Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>{isKh ? 'កម្មវិធីបណ្តុះបណ្តាលផ្លូវការ NPIT' : 'Official NPIT Academic & Polytechnic Majors'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isKh ? 'បញ្ជីមុខជំនាញបណ្តុះបណ្តាលផ្លូវការ' : 'Official Academic Programs & Majors'}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? 'កម្មវិធីសិក្សាស្តង់ដារជាតិ រួមមានសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (សិក្សា ២ឆ្នាំ) និងបរិញ្ញាបត្របច្ចេកទេស (សិក្សា ៤ឆ្នាំ)។' 
                : 'National accredited curricula featuring 2-Year Higher Diploma (100% Scholarship) and 4-Year Bachelor of Technology (Evening & Weekend).'}
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center w-full sm:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={isKh ? 'ស្វែងរកជំនាញ (ឧទាហរណ៍៖ អគ្គិសនី, បរិក្ខារត្រជាក់, សាយប័រ)...' : 'Search majors (e.g. Electrical, HVAC, Cyber)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2.5 text-sm border border-slate-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white transition-colors"
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
              className="bg-[#1b4b9b] hover:bg-[#163c7c] text-white p-2.5 rounded-r-xl transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Filter Programs"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-700/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
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

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((prog, idx) => {
            const isDiploma = prog.level?.includes('Diploma') || prog.degreeType === 'diploma';
            const isBeng = prog.level?.includes('Bachelor') || prog.degreeType === 'beng';

            return (
              <div
                key={`${prog.id}-${idx}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_rgba(0,43,128,0.12)] hover:border-[#002b80]/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                onClick={() => onSelectProgram && onSelectProgram(prog)}
              >
                {/* 1. Authentic Photography Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                  {/* Top-Left: Number & Degree Level Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-lg bg-[#002b80] text-white font-bold flex items-center justify-center text-xs shadow-md border border-white/20">
                      {prog.num || idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-sm">
                      {isBeng ? (isKh ? 'បរិញ្ញាបត្រ' : 'B.Tech') : (isKh ? 'សញ្ញាបត្រជាន់ខ្ពស់' : 'Higher Diploma')}
                    </span>
                  </div>

                  {/* Top-Right: Scholarship or Study Shift Pill */}
                  <div className="absolute top-3 right-3 z-10">
                    {isDiploma && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg shadow-md">
                        <Sparkles className="w-3 h-3" />
                        <span>{isKh ? 'អាហារូបករណ៍ ១០០%' : '100% Free'}</span>
                      </span>
                    )}
                    {isBeng && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#002b80] text-white px-2.5 py-1 rounded-lg shadow-md border border-white/20">
                        <Clock className="w-3 h-3 text-blue-200" />
                        <span>{isKh ? 'វេនយប់/ចុងសប្តាហ៍' : 'Night/Weekend'}</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Strip: Faculty Pill */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 line-clamp-1 max-w-[80%]">
                      {isKh ? prog.facultyKh : prog.faculty}
                    </span>
                    <span className="text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      {prog.code}
                    </span>
                  </div>
                </div>

                {/* 2. Structured Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    {/* Program Titles */}
                    <h3 className="text-base sm:text-lg font-bold font-khmer text-slate-900 group-hover:text-[#002b80] transition-colors leading-snug">
                      {isKh ? prog.nameKhmer : prog.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                      {isKh ? prog.name : prog.nameKhmer}
                    </p>

                    {/* Overview snippet */}
                    <p className="text-xs text-slate-600 font-khmer mt-3 line-clamp-2 leading-relaxed">
                      {isKh ? prog.overviewKh : prog.overview}
                    </p>
                  </div>

                  {/* 3. Specs Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#002b80]" />
                        <span>{isKh ? prog.durationKh : prog.duration}</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {isDiploma 
                          ? (isKh ? 'ជាប់/ធ្លាក់ បាក់ឌុប' : 'Bac II Pass/Fail')
                          : (isKh ? '៤ឆ្នាំ (៨ ឆមាស)' : '4 Years')}
                      </span>
                    </div>

                    {prog.shiftsKh && (
                      <div className="text-[11px] text-slate-700 font-medium bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 flex items-center justify-between">
                        <span className="text-slate-500">{isKh ? 'វេនសិក្សា៖' : 'Shifts:'}</span>
                        <span className="font-semibold text-slate-800">{isKh ? prog.shiftsKh : prog.shiftsEn}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Sleek Card Action Footer */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectProgram) onSelectProgram(prog);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#002b80] hover:text-blue-900 group/btn cursor-pointer"
                  >
                    <span>{isKh ? 'ព័ត៌មានលម្អិត' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenApply) onOpenApply(prog);
                    }}
                    className="bg-[#002b80] hover:bg-blue-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <span>{isKh ? 'ចុះឈ្មោះ' : 'Apply'}</span>
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
              className="mt-3 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Contact Info Footer Strip from Poster */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                {isKh ? "ទីតាំងវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT)" : "National Polytechnic Institute Techo Sen Campus"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {isKh ? officialAdmissionInfo.officialAddressKh : officialAdmissionInfo.officialAddressEn}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-blue-800 font-bold">
                <span>Hotline: 098 444 495 / 092 735 263 / 016 475 544</span>
                <span>• Website: www.npit-edu.com</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenApply && onOpenApply()}
              className="bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isKh ? 'ចុះឈ្មោះចូលរៀនឥឡូវនេះ' : 'Apply Online Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
