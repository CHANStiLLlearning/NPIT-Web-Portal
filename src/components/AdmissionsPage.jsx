import React, { useState } from 'react';
import { 
  GraduationCap, 
  ClipboardList, 
  Globe2, 
  FileText, 
  Pencil, 
  CreditCard, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';

export default function AdmissionsPage({ lang, onOpenApply, onSelectAdmissionDetail }) {
  const isKh = lang === 'kh';
  const [activePathwayModal, setActivePathwayModal] = useState(null);

  const pathways = [
    {
      id: "degrees",
      title: "Associate & Bachelor Degrees",
      titleKh: "ថ្នាក់បរិញ្ញាបត្ររង និងបរិញ្ញាបត្រ",
      badgeColor: "bg-blue-600",
      accent: "text-blue-600",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      image: "/admission-degrees.jpg",
      desc: isKh 
        ? "ស្វែងយល់ពីលក្ខខណ្ឌតម្រូវសម្រាប់ការចុះឈ្មោះចូលរៀនកម្មវិធីសិក្សា ២ឆ្នាំ (បរិញ្ញាបត្ររង) និង ៤ឆ្នាំ (បរិញ្ញាបត្រវិស្វកម្ម)។"
        : "Find requirements for our 2-year Higher Diploma and 4-year Bachelor of Engineering degree programs.",
      details: [
        "High school diploma (Bac II) or recognized equivalent",
        "Pass basic entrance examination in Mathematics & Physics",
        "Options for morning, afternoon, or weekend study shifts",
        "Credit transfer accepted from accredited technical colleges"
      ]
    },
    {
      id: "vocational",
      title: "Technical & Vocational Training",
      titleKh: "វគ្គបណ្តុះបណ្តាលបច្ចេកទេស",
      badgeColor: "bg-red-700",
      accent: "text-red-700",
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      image: "/admission-vocational.jpg",
      desc: isKh 
        ? "ស្វែងយល់ពីវិញ្ញាបនបត្រជំនាញ និងវគ្គបណ្តុះបណ្តាលវិជ្ជាជីវៈរយៈពេលខ្លីជាក់លាក់ដែលឆ្លើយតបនឹងទីផ្សារការងារ។"
        : "Explore certificates and specialized short-term vocational courses tailored directly for immediate factory & industrial employment.",
      details: [
        "Short courses from 3 to 6 months duration",
        "Direct hands-on training with CNC, PLC, and Solar PV",
        "No prior degree required; open for all motivated learners",
        "Nationally accredited National Competency Certificate (Level 1-4)"
      ]
    },
    {
      id: "transfer",
      title: "Transfer & International Students",
      titleKh: "និស្សិតផ្ទេរការសិក្សា និងបរទេស",
      badgeColor: "bg-amber-500",
      accent: "text-amber-600",
      icon: <Globe2 className="w-6 h-6 text-white" />,
      image: "/admission-transfer.jpg",
      desc: isKh 
        ? "ព័ត៌មានសម្រាប់ការផ្ទេរក្រេឌីតពីគ្រឹះស្ថានឧត្តមសិក្សាផ្សេង និងការចុះឈ្មោះសម្រាប់និស្សិតអន្តរជាតិ។"
        : "Information for transferring students, credit equivalence assessment, and international applicants across the ASEAN region.",
      details: [
        "Official academic transcripts and course syllabus evaluation",
        "Minimum 2.50 GPA for transfer credit recognition",
        "English language proficiency support courses available",
        "International student visa facilitation and campus housing"
      ]
    }
  ];

  const steps = [
    {
      num: 1,
      title: isKh ? "ជ្រើសរើសកម្មវិធីសិក្សា" : "Choose Program",
      desc: isKh ? "ស្វែងយល់ពីដេប៉ាតឺម៉ង់ និងជំនាញដែលអ្នកពេញចិត្ត" : "Select from our 4 engineering departments and study levels",
      color: "bg-[#f59e0b]",
      icon: <BookOpen className="w-5 h-5 text-white" />
    },
    {
      num: 2,
      title: isKh ? "ដាក់ពាក្យ និងឯកសារ" : "Submit Documents",
      desc: isKh ? "បំពេញពាក្យអនឡាញ និងភ្ជាប់សញ្ញាបត្របាក់ឌុប" : "Submit your ID, birth certificate, and high school transcript",
      color: "bg-[#e11d48]",
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      num: 3,
      title: isKh ? "ប្រឡងវាស់ស្ទង់" : "Entrance Exam",
      desc: isKh ? "ចូលរួមប្រឡងតេស្តសមត្ថភាពមូលដ្ឋាន ឬសម្ភាសន៍" : "Complete basic aptitude test in science and mathematics",
      color: "bg-[#2563eb]",
      icon: <Pencil className="w-5 h-5 text-white" />
    },
    {
      num: 4,
      title: isKh ? "ចុះឈ្មោះ និងបង់ថ្លៃសិក្សា" : "Enrollment & Fees",
      desc: isKh ? "ទទួលលទ្ធផល បង់ថ្លៃសិក្សា ឬចុះកិច្ចសន្យាអាហារូបករណ៍" : "Finalize enrollment, choose study shift, and receive student ID",
      color: "bg-[#0d9488]",
      icon: <CreditCard className="w-5 h-5 text-white" />
    }
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner Matching Reference Mockup */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[460px] md:min-h-[520px] flex items-center">
        {/* Admissions Desk Photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/admissions-hero.jpg" 
            alt="NPIT Admissions and Registration Hall" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-2xl text-white">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              ADMISSIONS
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold font-khmer text-amber-300">
              {isKh ? "ការចុះឈ្មោះចូលរៀន" : "Admissions & Enrollment"}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isKh 
                ? "ចាប់ផ្តើមដំណើរសិក្សារបស់អ្នកជាមួយយើង។ ស្វែងយល់ពីកម្មវិធីសិក្សា លក្ខខណ្ឌតម្រូវការចុះឈ្មោះ និងដាក់ពាក្យស្នើសុំអនឡាញនៅថ្ងៃនេះ។"
                : "Start your journey with us. Explore our programs, admission requirements, and apply online today."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ដាក់ពាក្យឥឡូវនេះ" : "Apply Now"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "Admission Pathways" / "កម្រិត និងលក្ខខណ្ឌនៃការចូលរៀន" */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admission Pathways
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "កម្រិត និងលក្ខខណ្ឌនៃការចូលរៀន" : "កម្រិត និងលក្ខខណ្ឌនៃការចូលរៀន"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 3 Pathway Cards Matching Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathways.map((pw) => (
              <div 
                key={pw.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col group"
              >
                {/* Image Header with Badge */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={pw.image} 
                    alt={pw.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 p-2.5 rounded-xl ${pw.badgeColor} shadow-md`}>
                    {pw.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                      {pw.title}
                    </h3>
                    <p className="text-xs font-khmer text-blue-700 font-semibold mt-1">
                      {pw.titleKh}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pw.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectAdmissionDetail ? onSelectAdmissionDetail(pw.id) : setActivePathwayModal(pw)}
                      className={`text-xs font-bold ${pw.accent} hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer`}
                    >
                      <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-400">NPIT Admissions</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. "Application Steps" / "ដំណាក់កាលនៃការដាក់ពាក្យចូលរៀន" */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Application Steps
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "ដំណាក់កាលនៃការដាក់ពាក្យចូលរៀន" : "ដំណាក់កាលនៃការដាក់ពាក្យចូលរៀន"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* Connected Step Track Matching Mockup */}
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-slate-300 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-center text-center group">
                  <div className={`w-14 h-14 rounded-full ${s.color} text-white flex items-center justify-center shadow-md ring-4 ring-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {s.icon}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {s.num}. {s.title}
                  </h4>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-xs">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. "Scholarships & Fees" / "អាហារូបករណ៍ និងតម្លៃសិក្សា" */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Scholarships & Fees
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "អាហារូបករណ៍ និងតម្លៃសិក្សា" : "អាហារូបករណ៍ និងតម្លៃសិក្សា"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 2 Large Cards Side-by-Side Matching Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Scholarship & Financial Aid */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-80 sm:h-96 flex flex-col justify-end p-6 sm:p-8">
              <img 
                src="/admission-scholarships.jpg" 
                alt="Scholarship & Financial Aid" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20" />

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block bg-amber-400 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  100% Government Funding
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  Scholarship & Financial Aid
                </h3>
                
                <p className="text-sm font-khmer text-amber-300 font-semibold drop-shadow-xs">
                  {isKh ? "អាហារូបករណ៍ និងការឧបត្ថម្ភ" : "អាហារូបករណ៍ និងការឧបត្ថម្ភ"}
                </p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                  {isKh 
                    ? "ស្វែងយល់ពីឱកាសអាហារូបករណ៍រដ្ឋាភិបាលពេញលេញ ១០០% និង ៥០% សម្រាប់សិស្សឆ្នើមទូទាំង ២៥ រាជធានី-ខេត្ត។"
                    : "Explore available scholarship opportunities, government subsidies, and merit-based tuition waivers for outstanding applicants."}
                </p>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onSelectAdmissionDetail ? onSelectAdmissionDetail('scholarships') : onOpenApply()}
                    className="bg-black/50 hover:bg-black/80 text-white font-medium border border-white/40 px-5 py-2 rounded-full text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Tuition & Fees */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-80 sm:h-96 flex flex-col justify-end p-6 sm:p-8">
              <img 
                src="/admission-tuition.jpg" 
                alt="Tuition & Fees Counseling" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20" />

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block bg-blue-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Affordable Higher Education
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  Tuition & Fees
                </h3>

                <p className="text-sm font-khmer text-amber-300 font-semibold drop-shadow-xs">
                  {isKh ? "តម្លៃសិក្សា និងការបង់ប្រាក់" : "តម្លៃសិក្សា និងការបង់ប្រាក់"}
                </p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                  {isKh 
                    ? "ព័ត៌មានលម្អិតអំពីតម្លៃសិក្សាប្រចាំឆមាស ការបង់ប្រាក់រំលោះ និងការគាំទ្រសម្ភារៈពិសោធន៍ឥតគិតថ្លៃ។"
                    : "View detailed information on semester tuition fees, flexible installment payment plans, and laboratory material access."}
                </p>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onSelectAdmissionDetail ? onSelectAdmissionDetail('tuition') : onOpenApply()}
                    className="bg-black/50 hover:bg-black/80 text-white font-medium border border-white/40 px-5 py-2 rounded-full text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Pathway Detail Dialog */}
      {activePathwayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0f2757] text-white relative">
              <button
                type="button"
                onClick={() => setActivePathwayModal(null)}
                className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold">{activePathwayModal.title}</h3>
              <p className="text-xs text-amber-300 font-khmer">{activePathwayModal.titleKh}</p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {activePathwayModal.desc}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Requirements & Guidelines
                </h4>
                <ul className="space-y-2">
                  {activePathwayModal.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActivePathwayModal(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePathwayModal(null);
                    onOpenApply();
                  }}
                  className="bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>Apply for this Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
