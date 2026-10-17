import React, { useState } from 'react';
import { MonitorCheck, Handshake, GraduationCap, Search, CheckCircle2, ArrowRight, X, Sparkles, Building } from 'lucide-react';

export default function WhyNPIT({ whyData, lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalFeature, setActiveModalFeature] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'MonitorCheck':
        return <MonitorCheck className="w-8 h-8 text-blue-700" />;
      case 'Handshake':
        return <Handshake className="w-8 h-8 text-blue-700" />;
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-blue-700" />;
      default:
        return <MonitorCheck className="w-8 h-8 text-blue-700" />;
    }
  };

  const featureDetails = {
    1: {
      tags: isKh ? ['មនុស្សយន្ត ៦-អ័ក្ស', 'ម៉ាស៊ីន CNC', 'បណ្តាញអគ្គិសនីឆ្លាតវៃ'] : ['6-Axis Robotics', 'CNC Machining', 'Smart Grid Lab'],
      points: isKh ? [
        'មន្ទីរពិសោធន៍ចំនួន ១៨ បំពាក់ដោយឧបករណ៍ស្តង់ដារឧស្សាហកម្ម ៤.០',
        'ការអនុវត្តផ្ទាល់ក្នុងមន្ទីរពិសោធន៍លើសពី ២០០ ម៉ោងក្នុងមួយឆមាស',
        'ការគាំទ្រគម្រោងស្រាវជ្រាវ និងការប្រកួតមនុស្សយន្តថ្នាក់ជាតិ និងអន្តរជាតិ'
      ] : [
        '18 state-of-the-art laboratories equipped with Industry 4.0 equipment',
        'Over 200 hours of mandatory practical laboratory modules per semester',
        'National incubator for student robotics teams competing regionally (ABU Robocon)'
      ]
    },
    2: {
      tags: isKh ? ['កិច្ចសហការ ៤០+ ក្រុមហ៊ុន', 'កម្មសិក្សាប្រាក់បៀវត្សរ៍', 'ឱកាសការងារ ៩៤%'] : ['40+ MoUs', 'Paid Co-op Internships', '94% Placement'],
      points: isKh ? [
        'កិច្ចសហការជាមួយក្រុមហ៊ុនពហុជាតិឈានមុខនៅតំបន់សេដ្ឋកិច្ចពិសេសភ្នំពេញ (PPSEZ)',
        'កម្មវិធីចុះកម្មសិក្សាការងារជាក់ស្តែងរយៈពេល ៦ ខែ ជាមួយនឹងប្រាក់ឧបត្ថម្ភ',
        'ការរៀបចំកម្មវិធីពិព័រណ៍ការងារ និងជ្រើសរើសបុគ្គលិកដោយផ្ទាល់ក្នុងបរិវេណវិទ្យាស្ថាន'
      ] : [
        'Formal bilateral partnerships with enterprises across Phnom Penh Special Economic Zone',
        '6-month intensive industrial co-op placements with competitive stipends',
        'Direct fast-track recruitment pathways for top graduating cohorts'
      ]
    },
    3: {
      tags: isKh ? ['សាស្ត្រាចារ្យកម្រិតអនុបណ្ឌិត/បណ្ឌិត', 'បទពិសោធន៍ឧស្សាហកម្ម', 'ការបណ្តុះបណ្តាលអន្តរជាតិ'] : ['Master/PhD Faculty', 'Industry Veterans', 'Global Pedigree'],
      points: isKh ? [
        'សាស្ត្រាចារ្យជាង ៨០% បានបញ្ចប់ការសិក្សាកម្រិតអនុបណ្ឌិត និងបណ្ឌិតពីបរទេស',
        'បទពិសោធន៍ជាក់ស្តែងក្នុងការប្រឹក្សាយោបល់បច្ចេកវិទ្យា និងការគ្រប់គ្រងគម្រោងវិស្វកម្ម',
        'ការណែនាំគម្រោង Capstone បញ្ចប់ការសិក្សាស្របតាមតម្រូវការទីផ្សារការងារ'
      ] : [
        'Over 80% of senior faculty hold postgraduate degrees from accredited international universities',
        'Extensive professional experience managing major engineering and industrial installations',
        'Dedicated personalized mentorship for student capstone and patent innovations'
      ]
    }
  };

  const categories = [
    { id: 'all', label: isKh ? 'ទាំងអស់' : 'All Pillars' },
    { id: 'labs', label: isKh ? 'មន្ទីរពិសោធន៍' : 'Facilities & Labs', matchId: 1 },
    { id: 'industry', label: isKh ? 'ដៃគូឧស្សាហកម្ម' : 'Industry Co-op', matchId: 2 },
    { id: 'faculty', label: isKh ? 'សាស្រ្តាចារ្យ' : 'Expert Faculty', matchId: 3 }
  ];

  const filteredFeatures = (whyData?.features || []).filter((feat) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'labs' && feat.id === 1) ||
      (selectedCategory === 'industry' && feat.id === 2) ||
      (selectedCategory === 'faculty' && feat.id === 3);

    const matchesSearch = 
      feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="about" className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isKh ? 'ឧត្តមភាពនៃការអប់រំបច្ចេកទេស' : 'Polytechnic Distinction'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {whyData?.title || (isKh ? 'ហេតុអ្វីជ្រើសរើស NPIT?' : 'Why NPIT?')}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? 'វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន ផ្តល់ជូននូវបរិយាកាសសិក្សាវិស្វកម្មស្តង់ដារអន្តរជាតិ ជាមួយនឹងការអនុវត្តជាក់ស្តែង ៧០%។'
                : 'NPIT delivers an industry-aligned polytechnic environment combining 70% practical laboratory mastery with international standards.'}
            </p>
          </div>

          {/* Search Box & Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="flex items-center w-full sm:w-72">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={whyData?.searchPlaceholder || (isKh ? 'ស្វែងរកលក្ខណៈពិសេស...' : 'Search features, labs...')}
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
                className="bg-[#1b4b9b] hover:bg-[#163c7c] text-white p-2.5 rounded-r-md transition-colors flex items-center justify-center shrink-0"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
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
              Found {filteredFeatures.length} result(s)
            </span>
          )}
        </div>

        {/* 3 Pillars / Feature Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredFeatures.map((feat) => {
            const extra = featureDetails[feat.id] || { tags: [], points: [] };
            return (
              <div
                key={feat.id}
                onClick={() => setActiveModalFeature(feat)}
                className="group p-6 sm:p-7 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Feature Icon Container */}
                  <div className="p-3.5 rounded-xl bg-blue-100/70 border border-blue-200/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-blue-700 mb-5 w-fit">
                    <div className="group-hover:[&>svg]:text-white transition-colors">
                      {getIcon(feat.icon)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {extra.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-semibold bg-white border border-slate-200 group-hover:border-blue-200 text-slate-600 group-hover:text-blue-800 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-blue-800">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {isKh ? 'មើលលម្អិតបន្ថែម' : 'Explore Details'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">NPIT Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl mt-6 border border-slate-200">
            <p className="font-semibold text-slate-700">No features found matching "{searchQuery}".</p>
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

        {/* Bottom Banner Navigating to Full About Page */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Building className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg">
                {isKh ? 'ចង់ស្វែងយល់បន្ថែមអំពីប្រវត្តិ និងគណៈគ្រប់គ្រងវិទ្យាស្ថាន?' : 'Want to learn more about NPIT History & Leadership?'}
              </h4>
              <p className="text-xs sm:text-sm text-blue-200">
                {isKh 
                  ? 'ស្វែងយល់ពីចក្ខុវិស័យ បេសកកម្ម និងបទប្បញ្ញត្តិធានាគុណភាពអប់រំកម្រិតជាតិ។' 
                  : 'Discover our founding decree, governing council, campus facilities, and quality assurance.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('about', '#about')}
            className="shrink-0 bg-white hover:bg-slate-100 text-blue-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <span>{isKh ? 'ចូលទៅកាន់ទំព័រអំពី NPIT' : 'View Full About Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {activeModalFeature && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => setActiveModalFeature(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 transform transition-all animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
                  {getIcon(activeModalFeature.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeModalFeature.title}
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    {isKh ? 'បទដ្ឋានគុណភាព NPIT' : 'NPIT Quality Framework'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalFeature(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {activeModalFeature.desc}
            </p>

            <div className="mt-5 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isKh ? 'ចំណុចលេចធ្លោសំខាន់ៗ៖' : 'Key Specifications & Capabilities:'}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {(featureDetails[activeModalFeature.id]?.points || []).map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalFeature(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                {isKh ? 'បិទ' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModalFeature(null);
                  if (onNavigate) onNavigate('about', '#about');
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5"
              >
                <span>{isKh ? 'ស្វែងយល់បន្ថែមអំពី NPIT' : 'Explore About Page'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

