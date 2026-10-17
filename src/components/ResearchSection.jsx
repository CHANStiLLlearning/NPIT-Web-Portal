import React from 'react';
import { Cpu, SunMedium, Building2, ArrowRight, FlaskConical } from 'lucide-react';

export default function ResearchSection({ lang = 'en', onNavigate, onSelectResearch }) {
  const isKh = lang === 'kh';

  const researchFields = [
    {
      id: 'energy',
      targetId: 'energy',
      icon: <SunMedium className="w-6 h-6 text-amber-500" />,
      badge: isKh ? "ថាមពលបៃតង" : "Clean Energy",
      title: isKh ? "ថាមពលកកើតឡើងវិញ និង Smart Grids" : "Renewable Energy & Smart Grids",
      desc: isKh 
        ? "ការស្រាវជ្រាវលើប្រព័ន្ធសូឡាពន្លឺព្រះអាទិត្យ ការគ្រប់គ្រងបណ្តាញអគ្គិសនីឆ្លាតវៃ និងការផ្ទុកថាមពលឧស្សាហកម្ម។"
        : "Optimization of industrial photovoltaic solar arrays, battery storage, and intelligent micro-grid integration across Cambodia.",
      stats: isKh ? "គម្រោងសូឡា ៤០ kW" : "40 kW Solar Microgrid Testbed"
    },
    {
      id: 'robotics',
      targetId: 'robotics',
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      badge: isKh ? "មនុស្សយន្ត & AI" : "Robotics & AI",
      title: isKh ? "ស្វ័យប្រវត្តិកម្ម និងបញ្ញាសិប្បនិម្មិត" : "Robotics, Automation & AI",
      desc: isKh 
        ? "ការអភិវឌ្ឍប្រព័ន្ធដៃយន្តឧស្សាហកម្ម ៦-អ័ក្ស ការត្រួតពិនិត្យគុណភាពដោយ Computer Vision និងប្រព័ន្ធ IoT រោងចក្រ។"
        : "Autonomous robotic manipulators, machine vision for automated quality inspection, and industrial IoT factory suites.",
      stats: isKh ? "ដៃយន្ត KUKA & FANUC" : "6-Axis Industrial Robotics"
    },
    {
      id: 'materials',
      targetId: 'applied-sciences',
      icon: <Building2 className="w-6 h-6 text-red-600" />,
      badge: isKh ? "សំណង់ចីរភាព" : "Sustainable Civil",
      title: isKh ? "សម្ភារៈសំណង់ចីរភាព និង BIM" : "Sustainable Materials & BIM",
      desc: isKh 
        ? "ការធ្វើតេស្តបេតុងកម្លាំងខ្ពស់ ការគូសប្លង់ 3D តាមប្រព័ន្ធ BIM និងការកាត់បន្ថយកាបូនក្នុងវិស័យសំណង់។"
        : "Eco-friendly concrete alternatives, seismic structural resilience testing, and digital twin building modeling.",
      stats: isKh ? "ប្លង់ 3D BIM & GeoLab" : "BIM Digital Twins & Concrete Lab"
    }
  ];

  const handleCardClick = (targetId) => {
    if (onSelectResearch) {
      onSelectResearch(targetId);
    } else if (onNavigate) {
      onNavigate('research', `#research/${targetId}`);
    } else {
      window.location.hash = `#research/${targetId}`;
    }
  };

  return (
    <section id="research" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <FlaskConical className="w-4 h-4" />
              <span>{isKh ? 'នវានុវត្តន៍ និងការស្រាវជ្រាវអនុវត្ត' : 'Applied Science & Industry 4.0'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isKh ? "ការស្រាវជ្រាវ និងការផ្ទេរបច្ចេកវិទ្យា" : "Research & Innovation"}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? "ការបង្កើតដំណោះស្រាយវិស្វកម្មជាក់ស្តែង និងការផ្ទេរបច្ចេកវិទ្យាដល់វិស័យឧស្សាហកម្ម និងសហគ្រាសធុនតូច-មធ្យម។"
                : "Practical engineering solutions, industrial innovation testbeds, and applied technological transfer for local enterprises."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('research', '#research')}
            className="shrink-0 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <span>{isKh ? 'មើលមជ្ឈមណ្ឌលស្រាវជ្រាវ' : 'Explore Research Center'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Research Cards - Direct Page to Page Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchFields.map((field) => (
            <div 
              key={field.id}
              onClick={() => handleCardClick(field.targetId)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    {field.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {field.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {field.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {field.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {field.stats}
                </span>
                <span className="font-bold text-slate-400 group-hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                  <span>{isKh ? 'ស្វែងយល់' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
