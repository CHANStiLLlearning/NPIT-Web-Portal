import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Handshake, 
  Search, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Quote
} from 'lucide-react';

export default function AboutPage({ lang, onOpenApply }) {
  const isKh = lang === 'kh';
  const [historySearch, setHistorySearch] = useState('');
  const [activeMilestone, setActiveMilestone] = useState(3); // default Present

  const milestones = [
    {
      year: "2015",
      title: isKh ? "ការបង្កើតវិទ្យាស្ថាន" : "Establishment",
      desc: isKh 
        ? "បង្កើតឡើងជាផ្លូវការក្រោមអនុក្រឹត្យរបស់រាជរដ្ឋាភិបាលកម្ពុជា ដើម្បីបណ្តុះបណ្តាលវិស្វករជំនាញបច្ចេកទេស។"
        : "Officially established by Royal Decree to develop Cambodia's technical engineering workforce.",
      color: "bg-amber-500",
      activeBg: "border-amber-500 text-amber-600"
    },
    {
      year: "2018",
      title: isKh ? "ការពង្រីកបរិវេណវិទ្យាស្ថាន" : "Campus Expansion",
      desc: isKh 
        ? "សម្ពោធអគារសិក្សាថ្មី និងអគារសិក្ខាសាលាទំនើបសម្រាប់ដេប៉ាតឺម៉ង់សំណង់ស៊ីវិល និងអគ្គិសនី។"
        : "Inauguration of modern multistory lecture buildings, seminar centers, and civil engineering workshops.",
      color: "bg-blue-600",
      activeBg: "border-blue-600 text-blue-600"
    },
    {
      year: "2021",
      title: isKh ? "ការបំពាក់មន្ទីរពិសោធន៍កម្រិតខ្ពស់" : "Advanced Lab Additions",
      desc: isKh 
        ? "បំពាក់ឧបករណ៍ពិសោធន៍ទំនើប ប្រព័ន្ធដៃយន្ត Robotics និងម៉ាស៊ីន CNC ស្តង់ដារឧស្សាហកម្ម ៤.០។"
        : "Deployment of Industry 4.0 robotic arms, high-precision CNC machinery, and high-voltage power testbeds.",
      color: "bg-red-700",
      activeBg: "border-red-700 text-red-700"
    },
    {
      year: isKh ? "បច្ចុប្បន្ន" : "Present",
      title: isKh ? "មជ្ឈមណ្ឌលបច្ចេកវិទ្យាឈានមុខ" : "A Leading Tech Hub",
      desc: isKh 
        ? "ឈានមុខគេក្នុងការអប់រំបច្ចេកទេស និងវិស្វកម្ម ជាមួយអត្រាការងារនិស្សិតបញ្ចប់ការសិក្សា ៩៥%។"
        : "Nationally recognized polytechnic leader serving 5,000+ students with 95% graduate employment.",
      color: "bg-red-700",
      activeBg: "border-red-700 text-red-700"
    }
  ];

  const leaders = [
    {
      name: "Dr. Sophy Keo",
      role: isKh ? "អនុប្រធានទទួលបន្ទុកកិច្ចការសិក្សា" : "Deputy Director of Academic Affairs",
      image: "/leader-1.jpg"
    },
    {
      name: "Dr. Vuthy Chamroeun",
      role: isKh ? "អនុប្រធានទទួលបន្ទុកកិច្ចការនិស្សិត" : "Deputy Director of Student Affairs",
      image: "/leader-2.jpg"
    },
    {
      name: "Dr. Linny Keo",
      role: isKh ? "ប្រធានកិច្ចការសិក្សា និងការស្រាវជ្រាវ" : "Academic Director",
      image: "/leader-3.jpg"
    },
    {
      name: "Dr. Sovannarith Peou",
      role: isKh ? "ព្រឹទ្ធបុរសមហាវិទ្យាល័យវិស្វកម្ម" : "Dean of Engineering",
      image: "/leader-4.jpg"
    }
  ];

  const coreValues = [
    {
      title: "Excellence",
      titleKh: "ឧត្តមភាព",
      bg: "bg-[#f59e0b]",
      icon: <Trophy className="w-5 h-5 text-white" />,
      desc: isKh ? "ការលើកកម្ពស់គុណភាពអប់រំ និងស្តង់ដារវិជ្ជាជីវៈខ្ពស់បំផុត។" : "Upholding highest standards of academic rigor & skill mastery."
    },
    {
      title: "Innovation",
      titleKh: "នវានុវត្តន៍",
      bg: "bg-[#2563eb]",
      icon: <Lightbulb className="w-5 h-5 text-white" />,
      desc: isKh ? "ការជំរុញគំនិតច្នៃប្រឌិត និងការបង្កើតបច្ចេកវិទ្យាថ្មីៗ។" : "Fostering creative problem-solving and modern tech applications."
    },
    {
      title: "Integrity",
      titleKh: "សុចរិតភាព",
      bg: "bg-[#e11d48]",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      desc: isKh ? "ប្រកាន់ខ្ជាប់ក្រមសីលធម៌វិជ្ជាជីវៈ និងភាពស្មោះត្រង់។" : "Operating with moral transparency and professional accountability."
    },
    {
      title: "Collaboration",
      titleKh: "កិច្ចសហការ",
      bg: "bg-[#0d9488]",
      icon: <Handshake className="w-5 h-5 text-white" />,
      desc: isKh ? "កិច្ចសហការជិតស្និទ្ធជាមួយសហគ្រាស និងដៃគូអន្តរជាតិ។" : "Partnering closely with industry leaders and global universities."
    }
  ];

  const filteredMilestones = milestones.filter((m) =>
    !historySearch ||
    m.year.toLowerCase().includes(historySearch.toLowerCase()) ||
    m.title.toLowerCase().includes(historySearch.toLowerCase()) ||
    m.desc.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner Matching the About Screenshot */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[440px] md:min-h-[500px] flex items-center">
        {/* Campus Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-campus.jpg" 
            alt="NPIT Main Campus Building" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Subtle gradient overlay to enhance text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-2xl text-white">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              ABOUT NPIT
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold font-khmer text-amber-300">
              {isKh ? "អំពី វិទ្យាស្ថានជាតិពហុបច្ចេកវិទ្យាតេជោសែន" : "អំពី វិទ្យាស្ថានជាតិពហុបច្ចេកវិទ្យាតេជោសែន"}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isKh 
                ? "ផ្តល់អំណាចដល់យុវជនជំនាន់ក្រោយ តាមរយៈការអប់រំផ្អែកលើតម្រូវការឧស្សាហកម្ម នវានុវត្តន៍ និងផលជះជាវិជ្ជមានដល់សង្គមជាតិ។"
                : "Empowering generations through industry-driven education, innovation, and community impact."}
            </p>

            {/* CTA Buttons Matching Mockup */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#history"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ប្រវត្តិវិទ្យាស្ថាន" : "Our History"}
              </a>

              <a
                href="#milestones"
                className="bg-black/40 hover:bg-black/60 text-white font-medium border border-white/50 px-7 py-3 rounded-full backdrop-blur-xs transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ព្រឹត្តិការណ៍សំខាន់ៗ" : "View Milestones"}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "Who We Are" / "យើងជានរណា" Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Who We Are
                </h2>
                <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
                  យើងជានរណា
                </h3>
                <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
              </div>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed pt-2">
                {isKh
                  ? "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT) ត្រូវបានបង្កើតឡើងជាគ្រឹះស្ថានឧត្តមសិក្សាសាធារណៈឈានមុខគេ ក្នុងគោលបំណងបណ្តុះបណ្តាលជំនាញបច្ចេកទេស និងវិស្វកម្មប្រកបដោយគុណភាពខ្ពស់ ដើម្បីចូលរួមចំណែកយ៉ាងសកម្មក្នុងការអភិវឌ្ឍសេដ្ឋកិច្ចសង្គមរបស់ព្រះរាជាណាចក្រកម្ពុជា។"
                  : "NPIT is founded in Cambodia as a premier National Polytechnic Institute committed to excellence in technology, engineering, and vocational education, forming the critical talent pipeline for national industrial transformation and regional economic growth."}
              </p>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {isKh
                  ? "យើងប្តេជ្ញាចិត្តយ៉ាងមុតមាំក្នុងការផ្តល់នូវការអនុវត្តជាក់ស្តែងក្នុងបន្ទប់ពិសោធន៍ទំនើប ផ្សារភ្ជាប់ទ្រឹស្តីជាមួយបទពិសោធន៍ផ្ទាល់ដៃ និងកសាងភាពជាដៃគូជាមួយក្រុមហ៊ុន និងសហគ្រាសឧស្សាហកម្មធំៗ។"
                  : "We are wholeheartedly dedicated to hands-on technology, engineering, and workforce capability development, equipping students with high-demand professional competencies, critical problem-solving skills, and forward-looking technological leadership."}
              </p>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                <img 
                  src="/about-students.jpg" 
                  alt="NPIT Students Collaborating in Engineering Lab" 
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
                  Interactive Lab Session • Electronics & Robotics Center
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "Our Vision & Mission" / "គុណតម្លៃរួម" Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Vision & Mission
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "ចក្ខុវិស័យ និងបេសកកម្ម" : "គុណតម្លៃរួម"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 2 Big Cards Matching the Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Card (Navy/Royal Blue) */}
            <div className="rounded-2xl bg-[#1b4b9b] text-white p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                {/* Vision Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-blue-900 transition-colors">
                  <Trophy className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Vision
                </h3>
                <p className="text-sm font-khmer text-amber-300 font-semibold mt-1">
                  {isKh ? "ចក្ខុវិស័យ" : "ចក្ខុវិស័យស្ថាប័ន"}
                </p>

                <p className="mt-4 text-base md:text-lg text-slate-100 leading-relaxed font-light">
                  {isKh 
                    ? "ក្លាយជាគ្រឹះស្ថានឧត្តមសិក្សាពហុបច្ចេកទេសឈានមុខគេ ទទួលបានការទទួលស្គាល់ចំពោះឧត្តមភាព នវានុវត្តន៍ និងការបណ្តុះបណ្តាលធនធានមនុស្សជំនាញវិស្វកម្មឆ្លើយតបនឹងទីផ្សារការងារ។"
                    : "To be a leading polytechnic institution recognized for excellence, innovation, and producing industry-ready professionals."}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-blue-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Excellence & Global Competence</span>
              </div>
            </div>

            {/* Mission Card (National Red) */}
            <div className="rounded-2xl bg-[#b91c1c] text-white p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-red-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                {/* Mission Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-red-800 transition-colors">
                  <Target className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Mission
                </h3>
                <p className="text-sm font-khmer text-amber-300 font-semibold mt-1">
                  {isKh ? "បេសកកម្ម" : "បេសកកម្មចម្បង"}
                </p>

                <p className="mt-4 text-base md:text-lg text-slate-100 leading-relaxed font-light">
                  {isKh 
                    ? "ផ្តល់នូវការអប់រំបច្ចេកទេសកម្រិតខ្ពស់ និងការអនុវត្តផ្ទាល់ លើកកម្ពស់ការស្រាវជ្រាវ និងកសាងភាពជាដៃគូរឹងមាំជាមួយវិស័យឧស្សាហកម្ម ដើម្បីជំរុញការអភិវឌ្ឍជាតិ។"
                    : "To provide top-tier, hands-on education, foster research, and build strong industry partnerships that drive national development."}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-red-100">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Impact-Driven National Development</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. "Message from the Director" & "Our Core Values, គុណតម្លៃស្នូល" Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Message from the Director
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "សារលិខិតរបស់ឯកឧត្តមប្រធានវិទ្យាស្ថាន" : "សារលិខិតនាយក"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Director Quote Box (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              {/* Director Photo */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-200">
                <img 
                  src="/director-portrait.jpg" 
                  alt="Director H.E. Tan Kosal" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote Content */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <Quote className="w-8 h-8 text-blue-600/40 mx-auto sm:mx-0" />
                
                <p className="text-sm md:text-base text-slate-700 italic leading-relaxed">
                  {isKh 
                    ? "«សូមស្វាគមន៍មកកាន់វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន។ យើងប្តេជ្ញាបង្កើតបរិយាកាសសិក្សាដែលផ្សារភ្ជាប់ការចង់ចេះចង់ដឹង ជាមួយការអនុវត្តជាក់ស្តែង និងនវានុវត្តន៍ឥតឈប់ឈរ ដើម្បីធានាថាគ្រប់និស្សិតទាំងអស់នឹងក្លាយជាកម្លាំងចលករដ៏មានតម្លៃសម្រាប់សង្គមជាតិ។»"
                    : "“Welcome to NPIT. We are committed to fostering an environment where curiosity meets practical application and continuous innovation, empowering each graduate to excel in tomorrow's engineering landscape.”"}
                </p>

                <div className="pt-2 border-t border-slate-200">
                  <h4 className="text-base font-bold text-slate-900">
                    H.E. Tan Kosal
                  </h4>
                  <p className="text-xs font-semibold text-blue-800">
                    {isKh ? "ប្រធានវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន" : "Director of NPIT"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Our Core Values (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div className="mb-4">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Our Core Values, <span className="font-khmer text-blue-800 font-bold">គុណតម្លៃស្នូល</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The principles guiding our institutional culture and pedagogy.
                </p>
              </div>

              {/* 4 Colored Mini-Cards in 2x2 Grid or 4 Columns */}
              <div className="grid grid-cols-2 gap-3">
                {coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className={`${val.bg} rounded-xl p-4 text-white shadow-xs flex flex-col justify-between min-h-[110px] hover:scale-102 transition-transform duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-black/15">
                        {val.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                        {idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold leading-tight">
                        {val.title}
                      </h4>
                      <p className="text-[10px] text-white/85 font-khmer mt-0.5">
                        {val.titleKh}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. "Our History" / "ប្រវត្តិរបស់យើង" & Milestones Section */}
      <section id="history" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Search Bar Matching Mockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our History
              </h2>
              <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
                {isKh ? "ប្រវត្តិវិទ្យាស្ថាន" : "ប្រវត្តិនៃការបង្កើត"}
              </h3>
              <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
            </div>

            {/* Search Box */}
            <div className="flex items-center w-full sm:w-72">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={isKh ? "ស្វែងរកព្រឹត្តិការណ៍..." : "Search milestones..."}
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full pl-3.5 pr-2 py-2 text-sm border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white transition-colors"
                />
              </div>
              <button
                type="button"
                className="bg-[#1b4b9b] hover:bg-[#163c7c] text-white p-2.5 rounded-r-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                title="Search History"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timeline Visualization Matching Screenshot */}
          <div id="milestones" className="mt-12">
            
            {/* Timeline Progress Track */}
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-300 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                {filteredMilestones.map((m, idx) => {
                  const isSelected = activeMilestone === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveMilestone(idx)}
                      className={`p-5 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                        isSelected ? m.activeBg + ' shadow-md scale-102' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-3.5 h-3.5 rounded-full ${m.color} ring-4 ring-white shadow-xs shrink-0`} />
                        <span className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
                          {m.year}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-800 leading-snug">
                        {m.title}
                      </h4>

                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. "Our Leadership" / "គណៈគ្រប់គ្រង" Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Leadership
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "គណៈគ្រប់គ្រងវិទ្យាស្ថាន" : "គណៈគ្រប់គ្រង"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600">
              Experienced academic leaders steering technical excellence and national industrial partnerships.
            </p>
          </div>

          {/* 4 Leadership Portrait Cards Matching Mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Photo with aspect-ratio 3:4 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                      {leader.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 leading-snug">
                      {leader.role}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                    <span>NPIT Faculty</span>
                    <span>Executive Board</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
