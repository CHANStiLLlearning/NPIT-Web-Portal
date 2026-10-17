import React from 'react';
import { 
  Network, 
  FlaskConical, 
  Search, 
  FileText, 
  Settings, 
  BookOpen, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Cpu,
  Building2,
  Award
} from 'lucide-react';
import { researchList, getResearchById } from '../data/researchData';

export default function ResearchPage({ lang = 'en', onOpenApply, onSelectResearch }) {
  const isKh = lang === 'kh';

  const researchAreas = [
    {
      id: "robotics",
      title: "Engineering & Robotics",
      titleKh: "វិស្វកម្ម និងរ៉ូបូត",
      cardBg: "bg-[#f4f7fb]",
      cardBorder: "border-[#d2def0]",
      headerBg: "bg-[#1b4b9b]",
      btnColor: "text-[#1b4b9b] hover:text-blue-900",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          <path d="M8 8l-2-2" />
          <path d="M16 16l2 2" />
        </svg>
      ),
      image: "/research-robotics.jpg",
      desc: isKh 
        ? "ស្វែងរកព័ត៌មានលម្អិតអំពីកម្មវិធីបណ្តុះបណ្តាល និងគម្រោងស្រាវជ្រាវវិស្វកម្មមនុស្សយន្តកម្រិតខ្ពស់។"
        : "Pioneering intelligent robotic automation, autonomous mobile robots (AMRs), and industrial manipulation.",
      stats: isKh ? "៦ គម្រោងសកម្ម" : "6 Active Projects"
    },
    {
      id: "ict",
      title: "ICT & Digital Innovation",
      titleKh: "ព័ត៌មានវិទ្យា និងនវានុវត្តន៍ឌីជីថល",
      cardBg: "bg-[#fdf3f0]",
      cardBorder: "border-[#fadad4]",
      headerBg: "bg-[#0f2757]",
      btnColor: "text-[#0f2757] hover:text-blue-900",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="5" r="2" />
          <circle cx="19" cy="19" r="2" />
          <circle cx="5" cy="19" r="2" />
          <line x1="12" y1="9" x2="12" y2="3" />
          <line x1="10" y1="13.5" x2="6.5" y2="17.5" />
          <line x1="14" y1="13.5" x2="17.5" y2="17.5" />
          <line x1="10" y1="10.5" x2="6.5" y2="6.5" />
          <line x1="14" y1="10.5" x2="17.5" y2="6.5" />
        </svg>
      ),
      image: "/program-it.jpg",
      desc: isKh 
        ? "ស្វែងយល់ពីវិញ្ញាបនបត្រ ការវិភាគទិន្នន័យ បញ្ញាសិប្បនិម្មិត និងសន្តិសុខប្រព័ន្ធបច្ចេកវិទ្យា។"
        : "Advancing Artificial Intelligence, Khmer NLP, Cloud Native architectures, and cybersecurity defense.",
      stats: isKh ? "៧ គម្រោងសកម្ម" : "7 Active Projects"
    },
    {
      id: "applied-sciences",
      title: "Applied Sciences & Materials",
      titleKh: "វិទ្យាសាស្ត្រអនុវត្ត និងសម្ភារៈ",
      cardBg: "bg-[#fdf9ee]",
      cardBorder: "border-[#f6ebd0]",
      headerBg: "bg-[#b91c1c]",
      btnColor: "text-[#b91c1c] hover:text-red-900",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31L4.1 18.25A2 2 0 0 0 5.75 21h12.5a2 2 0 0 0 1.65-2.75L14 9.31V2" />
          <line x1="8.5" y1="2" x2="15.5" y2="2" />
          <path d="M14 9.3a6.5 6.5 0 0 0-4 0" />
          <circle cx="10" cy="15" r="1" fill="currentColor" />
          <circle cx="13" cy="17" r="1" fill="currentColor" />
        </svg>
      ),
      image: "/news-mini2.jpg",
      desc: isKh 
        ? "ការស្រាវជ្រាវលើវិទ្យាសាស្ត្រសម្ភារៈ ថាមពលកកើតឡើងវិញ និងគីមីវិទ្យាអនុវត្តជាក់ស្តែង។"
        : "Eco-friendly geopolymer concrete, industrial wastewater treatment membranes, and battery thermal modeling.",
      stats: isKh ? "៥ គម្រោងសកម្ម" : "5 Active Projects"
    }
  ];

  const lifecycleSteps = [
    {
      step: 1,
      title: "1. Identify Opportunity",
      titleKh: "ស្វែងរកឱកាស",
      color: "bg-[#d97706]",
      icon: <Search className="w-6 h-6 text-white stroke-[2.3]" />
    },
    {
      step: 2,
      title: "2. Apply for Grants",
      titleKh: "ដាក់សំណើគម្រោង",
      color: "bg-[#b91c1c]",
      icon: <FileText className="w-6 h-6 text-white stroke-[2.3]" />
    },
    {
      step: 3,
      title: "3. Conduct Research",
      titleKh: "ការស្រាវជ្រាវ",
      color: "bg-[#1b4b9b]",
      icon: <Settings className="w-6 h-6 text-white stroke-[2.3]" />
    },
    {
      step: 4,
      title: "4. Publish & Showcase",
      titleKh: "បោះពុម្ពផ្សាយ",
      color: "bg-[#0f2757]",
      icon: <BookOpen className="w-6 h-6 text-white stroke-[2.3]" />
    }
  ];

  const handleAreaClick = (id) => {
    if (onSelectResearch) {
      onSelectResearch(id);
    } else {
      window.location.hash = `#research/${id}`;
    }
  };

  const handleExploreProjects = () => {
    document.getElementById('research-areas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePublicationsClick = () => {
    handleAreaClick('publications-grants');
  };

  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner Matching Reference Mockup */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[460px] md:min-h-[520px] flex items-center">
        {/* Lab Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-students.jpg" 
            alt="NPIT Research Laboratory" 
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full text-left">
          <div className="max-w-2xl space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                <FlaskConical className="w-3.5 h-3.5 text-slate-950" />
                {isKh ? "ការស្រាវជ្រាវ & នវានុវត្តន៍" : "Research & Innovation"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Research & Innovation
            </h1>

            <p className="text-2xl sm:text-3xl md:text-4xl font-bold font-khmer text-amber-300">
              ការស្រាវជ្រាវ និងនវានុវត្តន៍
            </p>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal pt-2">
              {isKh 
                ? "ការបង្កើតដំណោះស្រាយវិស្វកម្មជាក់ស្តែង និងការផ្ទេរបច្ចេកវិទ្យាដល់វិស័យឧស្សាហកម្ម និងសហគ្រាសធុនតូច-មធ្យម តាមរយៈមន្ទីរពិសោធន៍ទំនើប និងអ្នកស្រាវជ្រាវឯកទេស។"
                : "Practical engineering solutions, industrial innovation testbeds, and applied technological transfer for local enterprises through world-class laboratories."}
            </p>

            {/* Two Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleExploreProjects}
                className="bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-7 py-3 rounded-full text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>{isKh ? "ស្វែងរកគម្រោងស្រាវជ្រាវ" : "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handlePublicationsClick}
                className="bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-7 py-3 rounded-full text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>{isKh ? "ការបោះពុម្ពផ្សាយ និងប៉ាតង់" : "Publications & Grants"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "Key Research Areas" / "វិស័យស្រាវជ្រាវគន្លឹះ" (Page to Page Navigation) */}
      <section id="research-areas" className="py-14 md:py-20 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10 text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Key Research Areas
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold font-khmer text-blue-900 mt-0.5">
                វិស័យស្រាវជ្រាវគន្លឹះ
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              {isKh 
                ? "ជ្រើសរើសវិស័យស្រាវជ្រាវណាមួយ ដើម្បីចូលទៅកាន់ទំព័រព័ត៌មានលម្អិត បន្ទប់ពិសោធន៍ និងគម្រោងសកម្ម។" 
                : "Select any research domain to view its dedicated page, ongoing projects, lab equipment, and publications."}
            </p>
          </div>

          {/* 3 Research Area Cards with Split Visual - Clicking navigates to full detail page */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {researchAreas.map((area) => (
              <div 
                key={area.id}
                onClick={() => handleAreaClick(area.id)}
                className={`${area.cardBg} ${area.cardBorder} border rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
              >
                {/* Top Split Visual: Left Color+Icon, Right Photo */}
                <div>
                  <div className="grid grid-cols-5 h-36 sm:h-40 rounded-xl overflow-hidden shadow-xs mb-4">
                    {/* Left 2 columns: colored background with icon */}
                    <div className={`col-span-2 ${area.headerBg} flex items-center justify-center p-3 text-white transition-colors duration-300`}>
                      {area.icon}
                    </div>
                    {/* Right 3 columns: photo */}
                    <div className="col-span-3 h-full overflow-hidden bg-slate-200">
                      <img 
                        src={area.image} 
                        alt={area.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-1">
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {area.stats}
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {area.title}
                    </h4>
                    <p className="text-sm sm:text-base font-bold font-khmer text-blue-900 mt-0.5 leading-snug">
                      {area.titleKh}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {area.desc}
                    </p>
                  </div>
                </div>

                {/* Direct Page Link */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 px-1 flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-bold ${area.btnColor} inline-flex items-center gap-1 group-hover:underline`}>
                    <span>{isKh ? "ចូលមើលព័ត៌មានលម្អិត" : "View Full Details"}</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Page</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. "Research & Grant Lifecycle" / "ដំណើរការស្រាវជ្រាវ និងការស្នើសុំមូលនិធិ" */}
      <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 md:mb-12 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Research & Grant Lifecycle
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold font-khmer text-blue-900 mt-0.5">
              ដំណើរការស្រាវជ្រាវ និងការស្នើសុំមូលនិធិ
            </h3>
          </div>

          {/* Connected Step Track Matching Logo Palette */}
          <div className="relative max-w-5xl mx-auto py-4">
            {/* Horizontal Line passing behind the circles */}
            <div className="hidden md:block absolute top-[36px] left-16 right-16 h-0.5 bg-slate-300 z-0"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {lifecycleSteps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center group">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${s.color} text-white flex items-center justify-center shadow-md ring-4 ring-white mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    {s.icon}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {s.title}
                  </h4>

                  <p className="text-xs sm:text-sm font-bold font-khmer text-slate-900 mt-1">
                    {s.titleKh}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. "Research Centers & Grants" / "មជ្ឈមណ្ឌលស្រាវជ្រាវ និងការគាំទ្រ" */}
      <section id="research-centers" className="py-14 md:py-20 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 md:mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Research Centers & Grants
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold font-khmer text-blue-900 mt-0.5">
              មជ្ឈមណ្ឌលស្រាវជ្រាវ និងការគាំទ្រ
            </h3>
          </div>

          {/* 2 Large Photographic Cards Side-by-Side - Direct Page-to-Page Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: Research Centers & Labs -> Navigates to '#research/centers-labs' */}
            <div 
              onClick={() => handleAreaClick('centers-labs')}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 flex flex-col justify-end p-6 sm:p-8 cursor-pointer transition-all hover:shadow-2xl"
            >
              <img 
                src="/about-students.jpg" 
                alt="Research Centers & Labs" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isKh ? "ហេដ្ឋារចនាសម្ព័ន្ធមន្ទីរពិសោធន៍" : "18 Advanced Laboratories"}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-md group-hover:text-amber-300 transition-colors">
                  Research Centers & Labs
                </h3>
                
                <p className="text-base sm:text-lg font-bold font-khmer text-white drop-shadow-xs">
                  មជ្ឈមណ្ឌលស្រាវជ្រាវ និងមន្ទីរពិសោធន៍
                </p>

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 pt-1">
                  {isKh 
                    ? "បំពាក់ដោយម៉ាស៊ីន CNC ៥-អ័ក្ស ឧបករណ៍កាត់ឡាស៊ែរ បន្ទប់ពិសោធន៍ IoT និងស្ថានីយធ្វើតេស្តអគ្គិសនីកម្លាំងខ្លាំង។"
                    : "Equipped with 5-axis CNC machining, additive 3D fabrication, high-voltage test bays, and IoT testbeds."}
                </p>

                <div className="pt-3">
                  <span className="inline-flex items-center gap-2 bg-[#d97706] group-hover:bg-[#b45309] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all duration-200">
                    <span>{isKh ? "ចូលទំព័រមជ្ឈមណ្ឌលស្រាវជ្រាវ" : "View Labs Page"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Publications & Grants -> Navigates to '#research/publications-grants' */}
            <div 
              onClick={() => handleAreaClick('publications-grants')}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 flex flex-col justify-end p-6 sm:p-8 cursor-pointer transition-all hover:shadow-2xl"
            >
              <img 
                src="/news-conference.jpg" 
                alt="Publications & Grants" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isKh ? "មូលនិធិ & កម្មសិទ្ធិបញ្ញា" : "Scopus & National Patents"}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-md group-hover:text-amber-300 transition-colors">
                  Publications & Grants
                </h3>

                <p className="text-base sm:text-lg font-bold font-khmer text-white drop-shadow-xs">
                  ការបោះពុម្ពផ្សាយ និងមូលនិធិ
                </p>

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 pt-1">
                  {isKh 
                    ? "ការបោះពុម្ពផ្សាយក្នុងទិនានុប្បវត្តិ IEEE, Scopus ការចុះបញ្ជីប៉ាតង់ជាតិ និងការគាំទ្រមូលនិធិស្រាវជ្រាវពីរាជរដ្ឋាភិបាល។"
                    : "Peer-reviewed IEEE publications, utility patents, and national R&D grant programs."}
                </p>

                <div className="pt-3">
                  <span className="inline-flex items-center gap-2 bg-[#d97706] group-hover:bg-[#b45309] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all duration-200">
                    <span>{isKh ? "ចូលទំព័រការបោះពុម្ពផ្សាយ" : "View Publications Page"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


    </div>
  );
}
