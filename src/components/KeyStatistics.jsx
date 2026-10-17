import React, { useState } from 'react';
import { Users, FlaskConical, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export default function KeyStatistics({ statsData, lang = 'en' }) {
  const isKh = lang === 'kh';
  const [activeStat, setActiveStat] = useState(null);

  const defaultItems = [
    {
      count: '1,500+',
      label: isKh ? 'និស្សិតវិស្វកម្មសកម្ម' : 'Enrolled Students',
      sub: isKh ? 'ក្នុង ៤ ដេប៉ាតឺម៉ង់ឯកទេស' : 'Across 4 specialized departments',
      icon: Users,
      detail: isKh ? 'បរិញ្ញាបត្រវិស្វកម្ម និងសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស' : 'Undergraduate B.Eng & Higher Technical Diplomas'
    },
    {
      count: '18+',
      label: isKh ? 'មន្ទីរពិសោធន៍បច្ចេកវិទ្យាខ្ពស់' : 'Advanced Laboratories',
      sub: isKh ? 'ឧបករណ៍ស្តង់ដារឧស្សាហកម្ម ៤.០' : 'Industry 4.0 standard equipment',
      icon: FlaskConical,
      detail: isKh ? 'ដៃមនុស្សយន្ត ៦-អ័ក្ស ម៉ាស៊ីន CNC និងប្រព័ន្ធ Smart Grid' : '6-axis robotics, CNC machining & smart grid testbeds'
    },
    {
      count: '94%',
      label: isKh ? 'អត្រាការងារជោគជ័យ' : 'Graduate Employment',
      sub: isKh ? 'ក្នុងរយៈពេល ៦ ខែក្រោយបញ្ចប់ការសិក្សា' : 'Within 6 months of graduation',
      icon: TrendingUp,
      detail: isKh ? 'ធ្វើការនៅក្រុមហ៊ុនពហុជាតិ និងតំបន់សេដ្ឋកិច្ចពិសេស' : 'Placed at top multinationals & industrial SEZs'
    },
    {
      count: '100%',
      label: isKh ? 'អាហារូបករណ៍រដ្ឋពេញលេញ' : 'State Scholarship Quotas',
      sub: isKh ? 'ឧបត្ថម្ភដោយក្រសួងការងារ MLVT' : 'Sponsored by the Royal Government',
      icon: Award,
      detail: isKh ? 'អាហារូបករណ៍សមធម៌ និងអាទិភាពសិស្សនារីក្នុង STEM' : 'Full tuition waivers & women-in-STEM priority grants'
    }
  ];

  const title = statsData?.title || (isKh ? 'សមិទ្ធផល និងស្ថិតិសំខាន់ៗ' : 'Key Institutional Highlights & Impact');
  const items = statsData?.items || defaultItems;

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Navy Rounded Banner Matching Mockup */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0a1936] via-[#0f2757] to-[#14326d] text-white py-10 md:py-12 px-6 sm:px-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
          
          {/* Subtle geometric background patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Header Inside Banner */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-blue-800/60 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isKh ? 'គុណភាពអប់រំបច្ចេកទេស និងវិស្វកម្ម' : 'Proven Polytechnic Excellence'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
            </div>
            <span className="text-xs text-blue-200/80 bg-blue-900/60 border border-blue-700/50 px-3 py-1.5 rounded-full w-fit">
              {isKh ? 'ទិន្នន័យផ្លូវការឆ្នាំសិក្សា ២០២៣-២០២៦' : 'Official Academic Audit 2023–2026'}
            </span>
          </div>

          {/* 4 Stats Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-blue-800/50">
            {items.map((stat, idx) => {
              const IconComponent = stat.icon || (idx === 0 ? Users : idx === 1 ? FlaskConical : idx === 2 ? TrendingUp : Award);
              return (
                <div 
                  key={idx} 
                  onMouseEnter={() => setActiveStat(idx)}
                  onMouseLeave={() => setActiveStat(null)}
                  className={`flex flex-col items-center text-center transition-all duration-300 p-3 rounded-xl cursor-default ${
                    idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
                  } ${activeStat === idx ? 'bg-white/5 transform -translate-y-1' : ''}`}
                >
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Number with bold display typography */}
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm font-sans">
                    {stat.count}
                  </span>

                  {/* Main Label */}
                  <span className="mt-2 text-sm sm:text-base font-bold text-slate-100 tracking-wide">
                    {stat.label}
                  </span>

                  {/* Subtitle */}
                  {stat.sub && (
                    <span className="mt-1 text-xs text-blue-200/80 max-w-xs leading-relaxed">
                      {stat.sub}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

