import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  HardHat, 
  Laptop, 
  Cog, 
  FileText, 
  Pencil, 
  UserCheck, 
  ChevronRight,
  Clock,
  Calendar,
  Phone,
  MapPin,
  Send,
  Sparkles
} from 'lucide-react';
import { 
  higherDiplomaMajors, 
  bachelorMajors, 
  officialAdmissionInfo 
} from '../data/programsData';

export default function ProgramsPage({ 
  lang, 
  onOpenApply, 
  onSelectFaculty, 
  onSelectProgram, 
  onSelectAdmissionDetail 
}) {
  const isKh = lang === 'kh';
  const [activeTab, setActiveTab] = useState('diploma'); // 'diploma' | 'bachelor'

  const studyLevels = [
    {
      id: "associate",
      title: "Higher Diploma of Technology",
      titleKh: "កម្រិតសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស",
      degree: "2 Years (100% Scholarship)",
      desc: isKh 
        ? "អាហារូបករណ៍ ១០០% ពីរដ្ឋាភិបាលលើ ៩ មុខជំនាញ។ លក្ខខណ្ឌ៖ ជាប់ ឬធ្លាក់បាក់ឌុប ក៏អាចចុះឈ្មោះចូលរៀនបានដោយឥតគិតថ្លៃ។"
        : "100% Government scholarship across 9 key technician majors. Open to both passed and failed Bac II graduates.",
      image: "/about-students.jpg",
      headerBg: "bg-[#002b80]",
      accent: "text-[#002b80]",
      icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
      id: "bachelor",
      title: "Bachelor of Technology",
      titleKh: "កម្រិតបរិញ្ញាបត្របច្ចេកទេស",
      degree: "4 Years (Night & Weekend)",
      desc: isKh 
        ? "ថ្នាក់បង់ថ្លៃ វេនយប់ និង ថ្ងៃសៅរ៍-អាទិត្យ លើ ៥ មុខជំនាញវិស្វកម្មទំនើប សម្រាប់សិស្សទូទៅ និងបុគ្គលិកកំពុងបំពេញការងារ។"
        : "4-Year degree across 5 modern engineering fields. Evening and Saturday-Sunday weekend sessions for working professionals.",
      image: "/news-conference.jpg",
      headerBg: "bg-[#002b80]",
      accent: "text-[#002b80]",
      icon: <Award className="w-6 h-6 text-white" />
    },
    {
      id: "technical",
      title: "Technical & Short Courses",
      titleKh: "វគ្គបណ្តុះបណ្តាលបច្ចេកទេសខ្លីៗ",
      degree: "Certificates (3 - 6 Months)",
      desc: isKh 
        ? "វគ្គបណ្តុះបណ្តាលជំនាញជាក់លាក់ដូចជា ការបញ្ជាម៉ាស៊ីន CNC ការតម្លើងសូឡា ការសរសេរកូដ និងប្រព័ន្ធ PLC ឧស្សាហកម្ម។"
        : "Specialized modular masterclasses in advanced PLC automation, CNC machining, solar PV installation, and cloud computing.",
      image: "/news-mini2.jpg",
      headerBg: "bg-[#002b80]",
      accent: "text-[#002b80]",
      icon: <BookOpen className="w-6 h-6 text-white" />
    }
  ];

  const admissionSteps = [
    {
      step: 1,
      title: isKh ? "ជ្រើសរើសជំនាញសិក្សា" : "Choose Program",
      desc: isKh ? "ជ្រើសរើសជំនាញពីបញ្ជីផ្លូវការទាំង ៩ ឬ ៥ មុខជំនាញ" : "Explore and select from the official 9 Diploma or 5 Bachelor majors",
      color: "bg-[#002b80]",
      icon: <BookOpen className="w-5 h-5 text-white" />
    },
    {
      step: 2,
      title: isKh ? "ដាក់ឯកសារស្នើសុំ" : "Submit Documents",
      desc: isKh ? "បំពេញពាក្យអនឡាញ ឬមកកាន់ទីតាំង NPIT ផ្លូវជាតិលេខ២១" : "Complete online form or register in person along National Road 21",
      color: "bg-[#002b80]",
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      step: 3,
      title: isKh ? "ការប្រឡង ឬវាយតម្លៃ" : "Entrance Diagnostic",
      desc: isKh ? "ចូលរួមតេស្តសមត្ថភាពមូលដ្ឋាន ឬទទួលអាហារូបករណ៍ផ្ទាល់" : "Sit for foundational diagnostic or immediate scholarship enrollment",
      color: "bg-[#002b80]",
      icon: <Pencil className="w-5 h-5 text-white" />
    },
    {
      step: 4,
      title: isKh ? "ចុះឈ្មោះចូលរៀន" : "Enrollment & Batch",
      desc: isKh ? "ចូលរៀនលើកទី១: ១៣ វិច្ឆិកា ២០២៦ ឬ លើកទី២: ០៤ មករា ២០២៧" : "Batch 1: Nov 13, 2026 | Batch 2: Jan 04, 2027",
      color: "bg-[#002b80]",
      icon: <UserCheck className="w-5 h-5 text-white" />
    }
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner Matching Reference Mockup */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[460px] md:min-h-[520px] flex items-center">
        {/* Lab Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-lab.jpg" 
            alt="Engineering Academic Lab" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-3xl text-white">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-slate-950" />
              <span>{isKh ? "សេចក្តីជូនដំណឹងជ្រើសរើសនិស្សិតផ្លូវការ" : "Official Enrollment Announcement"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              ACADEMIC PROGRAMS & MAJORS
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold font-khmer text-amber-300">
              {isKh ? "កម្មវិធីបណ្តុះបណ្តាលផ្លូវការ វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT)" : "National Polytechnic Institute Techo Sen (NPIT)"}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isKh 
                ? "ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ ផ្តល់អាហារូបករណ៍ ១០០% ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (សិក្សា ២ឆ្នាំ) លើ ៩ មុខជំនាញ (ជាប់ ឬធ្លាក់បាក់ឌុប) និងថ្នាក់បរិញ្ញាបត្របច្ចេកទេស (សិក្សា ៤ឆ្នាំ) វេនយប់ និង ថ្ងៃសៅរ៍-អាទិត្យ លើ ៥ មុខជំនាញ។"
                : "Ministry of Labour and Vocational Training (MLVT) provides 100% full scholarships for 2-Year Higher Diploma (9 majors, passed or failed Bac II) and 4-Year Bachelor of Technology (5 majors, evening & weekend shifts)."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ចុះឈ្មោះយកអាហារូបករណ៍ ១០០%" : "Apply for 100% Scholarship"}
              </button>

              <a
                href="#official-majors"
                className="bg-black/40 hover:bg-black/60 text-white font-medium border border-white/50 px-7 py-3 rounded-full backdrop-blur-xs transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ពិនិត្យមុខជំនាញទាំង ១៤" : "Explore All 14 Majors"}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Official Admission Notice Callout Strip from Poster */}
      <section className="bg-gradient-to-r from-[#0d234d] via-[#153a7a] to-[#0c4a6e] text-white py-6 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-extrabold text-amber-300 font-khmer text-sm">
                {isKh ? "កាលបរិច្ឆេទចូលរៀនផ្លូវការ៖" : "Official Class Starts:"}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{isKh ? "លើកទី១: ១៣ វិច្ឆិកា ២០២៦" : "Batch 1: Nov 13, 2026"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{isKh ? "លើកទី២: ០៤ មករា ២០២៧" : "Batch 2: Jan 04, 2027"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full">
                <span>{isKh ? "លក្ខខណ្ឌ៖ ជាប់ ឬធ្លាក់បាក់ឌុប" : "Condition: Bac II Pass/Fail"}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-amber-300 font-bold font-mono">
              <Phone className="w-4 h-4" />
              <span>098 444 495 / 092 735 263 / 016 475 544</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Study Levels Offered" / "កម្រិតសិក្សាដែលផ្តល់ជូន" */}
      <section id="study-levels" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Study Levels Offered
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "កម្រិតសិក្សាដែលផ្តល់ជូននៅ NPIT" : "កម្រិតសិក្សាដែលផ្តល់ជូន"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 3 Study Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyLevels.map((lvl) => (
              <div 
                key={lvl.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
              >
                {/* Card Header with Icon & Photo */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={lvl.image} 
                    alt={lvl.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                  
                  {/* Floating Icon */}
                  <div className={`absolute top-4 left-4 p-2.5 rounded-xl ${lvl.headerBg} shadow-md`}>
                    {lvl.icon}
                  </div>

                  {/* Degree Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/30">
                      {lvl.degree}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                      {lvl.title}
                    </h3>
                    <p className="text-xs font-khmer text-blue-700 font-semibold mt-1">
                      {lvl.titleKh}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-khmer">
                      {lvl.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (lvl.id === 'associate') {
                          setActiveTab('diploma');
                          const elem = document.getElementById('official-majors');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        } else if (lvl.id === 'bachelor') {
                          setActiveTab('bachelor');
                          const elem = document.getElementById('official-majors');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          if (onSelectAdmissionDetail) onSelectAdmissionDetail('vocational');
                          else if (onOpenApply) onOpenApply();
                        }
                      }}
                      className={`text-xs font-bold ${lvl.accent} hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer`}
                    >
                      <span>{isKh ? "ពិនិត្យមុខជំនាញ" : "View Majors"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-400">NPIT Academic Dept</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Complete Official Majors Section (From Ministry & NPIT Poster) */}
      <section id="official-majors" className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>{isKh ? "មុខជំនាញផ្លូវការរបស់ក្រសួងការងារ និងវិទ្យាស្ថាន NPIT" : "Official Ministry & NPIT Majors"}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isKh ? "មុខជំនាញបណ្តុះបណ្តាលផ្លូវការ" : "Official Polytechnic Majors"}
              </h2>
              <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            </div>

            {/* Program Tabs */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('diploma')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'diploma'
                    ? 'bg-[#002b80] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isKh ? "សញ្ញាបត្រជាន់ខ្ពស់ ២ឆ្នាំ (អាហារូបករណ៍ ១០០% - ៩ ជំនាញ)" : "Higher Diploma (100% Scholarship - 9 Majors)"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bachelor')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'bachelor'
                    ? 'bg-[#002b80] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isKh ? "បរិញ្ញាបត្របច្ចេកទេស ៤ឆ្នាំ (វេនយប់/ចុងសប្តាហ៍ - ៥ ជំនាញ)" : "Bachelor of Tech (Night & Weekend - 5 Majors)"}
              </button>
            </div>
          </div>

          {/* Tab 1: 9 Higher Diploma Majors */}
          {activeTab === 'diploma' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[#002b80] text-white font-bold">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 font-khmer">
                      {isKh ? "អាហារូបករណ៍ ១០០% សម្រាប់កម្រិតសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (សិក្សា ២ឆ្នាំ)" : "100% Scholarship for 2-Year Higher Diploma"}
                    </h4>
                    <p className="text-xs text-slate-600 font-khmer">
                      {isKh ? "លក្ខខណ្ឌ៖ ជាប់ ឬធ្លាក់ សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ទទួលបានអាហារូបករណ៍ ១០០% ឥតគិតថ្លៃ" : "Eligibility: Passed or Failed Bac II / High School Diploma are directly eligible for 100% free tuition."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="bg-[#002b80] hover:bg-blue-900 text-white font-bold px-5 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {isKh ? "ចុះឈ្មោះឥឡូវនេះ" : "Apply Online"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {higherDiplomaMajors.map((prog, idx) => (
                  <div
                    key={prog.id}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_rgba(0,43,128,0.12)] hover:border-[#002b80]/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                    onClick={() => onSelectProgram && onSelectProgram(prog)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={prog.image}
                        alt={prog.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                      {/* Floating Number & Degree */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="w-7 h-7 rounded-lg bg-[#002b80] text-white font-bold flex items-center justify-center text-xs shadow-md border border-white/20">
                          {prog.num}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-sm">
                          {isKh ? 'សញ្ញាបត្រជាន់ខ្ពស់' : 'Higher Diploma'}
                        </span>
                      </div>

                      {/* 100% Free Scholarship Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg shadow-md">
                          <Sparkles className="w-3 h-3" />
                          <span>{isKh ? 'អាហារូបករណ៍ ១០០%' : '100% Free'}</span>
                        </span>
                      </div>

                      {/* Faculty & Code Strip */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 line-clamp-1 max-w-[80%]">
                          {isKh ? prog.facultyKh : prog.faculty}
                        </span>
                        <span className="text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                          {prog.code}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-khmer text-slate-900 group-hover:text-[#002b80] transition-colors leading-snug">
                          {isKh ? prog.nameKhmer : prog.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                          {isKh ? prog.name : prog.nameKhmer}
                        </p>

                        <p className="text-xs text-slate-600 font-khmer mt-3 line-clamp-2 leading-relaxed">
                          {isKh ? prog.overviewKh : prog.overview}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-[#002b80]" />
                          <span>{isKh ? prog.durationKh : prog.duration}</span>
                        </span>
                        <span className="text-[11px] text-blue-900 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {isKh ? 'ជាប់/ធ្លាក់ បាក់ឌុប' : 'Pass/Fail Bac II'}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
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
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: 5 Bachelor Majors */}
          {activeTab === 'bachelor' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[#002b80] text-white font-bold">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 font-khmer">
                      {isKh ? "ថ្នាក់បង់ថ្លៃ កម្រិតបរិញ្ញាបត្របច្ចេកទេស (សិក្សា ៤ឆ្នាំ)" : "4-Year Bachelor of Technology (Fee-Paying)"}
                    </h4>
                    <p className="text-xs text-slate-600 font-khmer">
                      {isKh ? "វេនសិក្សា៖ វេនយប់ (ចន្ទ-សុក្រ ៥:៣០-៨:៣០ យប់) និង ថ្ងៃសៅរ៍-អាទិត្យ (៨:០០ ព្រឹក-៥:០០ ល្ងាច)" : "Study Shifts: Evening Shift (Mon-Fri 5:30-8:30 PM) & Weekend Shift (Sat-Sun 8:00 AM-5:00 PM)."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="bg-[#002b80] hover:bg-blue-900 text-white font-bold px-5 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {isKh ? "ចុះឈ្មោះចូលរៀន" : "Apply for Bachelor"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bachelorMajors.map((prog, idx) => (
                  <div
                    key={prog.id}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_rgba(0,43,128,0.12)] hover:border-[#002b80]/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                    onClick={() => onSelectProgram && onSelectProgram(prog)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={prog.image}
                        alt={prog.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                      {/* Floating Number & Degree */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="w-7 h-7 rounded-lg bg-[#002b80] text-white font-bold flex items-center justify-center text-xs shadow-md border border-white/20">
                          {prog.num}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-sm">
                          {isKh ? 'បរិញ្ញាបត្រ' : 'B.Tech'}
                        </span>
                      </div>

                      {/* Study Shift Pill */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#002b80] text-white px-2.5 py-1 rounded-lg shadow-md border border-white/20">
                          <Clock className="w-3 h-3 text-blue-200" />
                          <span>{isKh ? 'វេនយប់/ចុងសប្តាហ៍' : 'Night/Weekend'}</span>
                        </span>
                      </div>

                      {/* Faculty & Code Strip */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 line-clamp-1 max-w-[80%]">
                          {isKh ? prog.facultyKh : prog.faculty}
                        </span>
                        <span className="text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                          {prog.code}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-khmer text-slate-900 group-hover:text-[#002b80] transition-colors leading-snug">
                          {isKh ? prog.nameKhmer : prog.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                          {isKh ? prog.name : prog.nameKhmer}
                        </p>

                        <p className="text-xs text-slate-600 font-khmer mt-3 line-clamp-2 leading-relaxed">
                          {isKh ? prog.overviewKh : prog.overview}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-[#002b80]" />
                            <span>{isKh ? prog.durationKh : prog.duration}</span>
                          </span>
                          <span className="text-[11px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                            {isKh ? 'ថ្នាក់បង់ថ្លៃ' : 'Fee-Paying'}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-700 font-medium bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 flex items-center justify-between">
                          <span className="text-slate-500">{isKh ? 'វេន៖' : 'Shifts:'}</span>
                          <span className="font-semibold text-slate-800">{isKh ? prog.shiftsKh : prog.shiftsEn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
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
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. "Admission Steps" / "ដំណាក់កាលនៃការចុះឈ្មោះចូលរៀន" */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admission Steps
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "ដំណាក់កាលនៃការចុះឈ្មោះចូលរៀន" : "ដំណាក់កាលនៃការចុះឈ្មោះចូលរៀន"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* Horizontal Step Process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {admissionSteps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className={`w-14 h-14 rounded-full ${s.color} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-200 font-bold text-lg`}>
                  {s.icon}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-khmer">
                  {s.step}. {s.title}
                </h4>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-khmer">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>


        </div>
      </section>

    </div>
  );
}
