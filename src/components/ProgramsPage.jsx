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
  ChevronRight
} from 'lucide-react';

export default function ProgramsPage({ 
  lang, 
  onOpenApply, 
  onSelectFaculty, 
  onSelectProgram, 
  onSelectAdmissionDetail 
}) {
  const isKh = lang === 'kh';

  const studyLevels = [
    {
      id: "associate",
      title: "Associate Degree",
      titleKh: "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យា",
      degree: "Higher Diploma (2-3 Years)",
      desc: isKh 
        ? "កម្មវិធីសិក្សាផ្តោតលើជំនាញបច្ចេកទេស និងការអនុវត្តផ្ទាល់ ដើម្បីត្រៀមខ្លួនចូលបម្រើការងារក្នុងវិស័យឧស្សាហកម្មយ៉ាងឆាប់រហ័ស។"
        : "Industry-aligned programs with intense hands-on workshop training designed for rapid career entry.",
      image: "/about-students.jpg",
      headerBg: "bg-blue-600",
      accent: "text-blue-600",
      icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
      id: "bachelor",
      title: "Bachelor's Degree",
      titleKh: "សញ្ញាបត្របរិញ្ញាបត្រ",
      degree: "Bachelor of Engineering (4 Years)",
      desc: isKh 
        ? "បណ្តុះបណ្តាលវិស្វករជំនាញកម្រិតឧត្តមសិក្សា ជាមួយទ្រឹស្តីស៊ីជម្រៅ ការស្រាវជ្រាវ និងការរៀបចំគម្រោងបញ្ចប់ការសិក្សា។"
        : "Empowering your future with industry-aligned engineering programs, rigorous technical theory, and innovative curricula.",
      image: "/news-conference.jpg",
      headerBg: "bg-red-700",
      accent: "text-red-700",
      icon: <Award className="w-6 h-6 text-white" />
    },
    {
      id: "technical",
      title: "Technical & Short Courses",
      titleKh: "វគ្គសិក្សាបច្ចេកទេស និងខ្លីៗ",
      degree: "Certificates (3 - 6 Months)",
      desc: isKh 
        ? "វគ្គបណ្តុះបណ្តាលជំនាញជាក់លាក់ដូចជា ការបញ្ជាម៉ាស៊ីន CNC ការតម្លើងសូឡា ការសរសេរកូដ និងប្រព័ន្ធ PLC ឧស្សាហកម្ម។"
        : "Specialized modular masterclasses in advanced PLC automation, CNC machining, solar PV installation, and cloud computing.",
      image: "/news-mini2.jpg",
      headerBg: "bg-amber-500",
      accent: "text-amber-600",
      icon: <BookOpen className="w-6 h-6 text-white" />
    }
  ];

  const faculties = [
    {
      id: "civil",
      name: "Faculty of Civil Engineering",
      nameKh: "មហាវិទ្យាល័យវិស្វកម្មសំណង់ស៊ីវិល",
      desc: isKh 
        ? "សំណង់ស៊ីវិល ស្ថាបត្យកម្ម ការគ្រប់គ្រងការដ្ឋាន និងបច្ចេកវិទ្យាគំរូព័ត៌មានអគារ (BIM)។"
        : "Structural design, geotechnical analysis, infrastructure construction, and Building Information Modeling (BIM).",
      image: "/program-civil.jpg",
      icon: <HardHat className="w-6 h-6 text-amber-400" />
    },
    {
      id: "electrical",
      name: "Faculty of Electrical & Electronics Engineering",
      nameKh: "មហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី និងអេឡិចត្រូនិក",
      desc: isKh 
        ? "ប្រព័ន្ធបណ្តាញអគ្គិសនី ស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម PLC អេឡិចត្រូនិក និងថាមពលកកើតឡើងវិញ។"
        : "Power grid engineering, industrial automation & PLC, embedded systems, microelectronics, and solar energy.",
      image: "/program-electrical.jpg",
      icon: <Cpu className="w-6 h-6 text-blue-400" />
    },
    {
      id: "it",
      name: "Faculty of Information Technology",
      nameKh: "មហាវិទ្យាល័យព័ត៌មានវិទ្យា",
      desc: isKh 
        ? "ការអភិវឌ្ឍសូហ្វវែរ សន្តិសុខប្រព័ន្ធអ៊ីនធឺណិត បញ្ញាសិប្បនិម្មិត (AI) និងការគ្រប់គ្រងទិន្នន័យពពក។"
        : "Full-stack software engineering, cybersecurity defense, artificial intelligence, cloud infrastructure, and data science.",
      image: "/program-it.jpg",
      icon: <Laptop className="w-6 h-6 text-blue-400" />
    },
    {
      id: "mechanical",
      name: "Faculty of Mechanical & Manufacturing",
      nameKh: "មហាវិទ្យាល័យវិស្វកម្មមេកានិច និងផលិតកម្ម",
      desc: isKh 
        ? "ការរចនាម៉ាស៊ីនឧស្សាហកម្ម CAD/CAM ម៉ាស៊ីន CNC ស្វ័យប្រវត្តិកម្ម និងបច្ចេកវិទ្យាយានយន្ត។"
        : "Precision CNC machining, CAD/CAM design, industrial robotics, mechatronics, and automotive powertrain engineering.",
      image: "/program-mechanical.jpg",
      icon: <Cog className="w-6 h-6 text-red-500" />
    }
  ];

  const admissionSteps = [
    {
      step: 1,
      title: isKh ? "ជ្រើសរើសជំនាញសិក្សា" : "Choose Program",
      desc: isKh ? "ជ្រើសរើសជំនាញវិស្វកម្មដែលត្រូវនឹងចំណង់ចំណូលចិត្ត" : "Explore and select your preferred engineering discipline",
      color: "bg-[#f59e0b]",
      border: "border-[#f59e0b]",
      icon: <BookOpen className="w-5 h-5 text-white" />
    },
    {
      step: 2,
      title: isKh ? "ដាក់ឯកសារស្នើសុំ" : "Submit Documents",
      desc: isKh ? "បំពេញពាក្យអនឡាញ និងភ្ជាប់សញ្ញាបត្របាក់ឌុប" : "Complete online application and upload academic transcripts",
      color: "bg-[#e11d48]",
      border: "border-[#e11d48]",
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      step: 3,
      title: isKh ? "ការប្រឡង ឬវាយតម្លៃ" : "Entrance Exam",
      desc: isKh ? "ចូលរួមប្រឡងតេស្តសមត្ថភាពមូលដ្ឋានគណិត និងរូបវិទ្យា" : "Participate in STEM foundation evaluation test",
      color: "bg-[#2563eb]",
      border: "border-[#2563eb]",
      icon: <Pencil className="w-5 h-5 text-white" />
    },
    {
      step: 4,
      title: isKh ? "ចុះឈ្មោះចូលរៀន" : "Enrollment",
      desc: isKh ? "ទទួលលទ្ធផល បង់ថ្លៃសិក្សា ឬទទួលអាហារូបករណ៍" : "Receive admission letter, finalize schedule, and start classes",
      color: "bg-[#0d9488]",
      border: "border-[#0d9488]",
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
          <div className="max-w-2xl text-white">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              ACADEMIC PROGRAMS
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold font-khmer text-amber-300">
              {isKh ? "កម្មវិធីសិក្សាថ្នាក់ឧត្តមសិក្សា និងបច្ចេកទេស" : "កម្មវិធីសិក្សា"}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isKh 
                ? "កសាងអនាគតរបស់អ្នកជាមួយនឹងកម្មវិធីសិក្សាដែលឆ្លើយតបនឹងទីផ្សារការងារ ការអនុវត្តផ្ទាល់ក្នុងមន្ទីរពិសោធន៍ និងកម្មវិធីសិក្សាទំនើបស្របតាមស្តង់ដារអន្តរជាតិ។"
                : "Empowering your future with industry-aligned programs, hands-on training, and innovative curricula."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "ចុះឈ្មោះឥឡូវនេះ" : "Apply Now"}
              </button>

              <a
                href="#study-levels"
                className="bg-black/40 hover:bg-black/60 text-white font-medium border border-white/50 px-7 py-3 rounded-full backdrop-blur-xs transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                {isKh ? "បញ្ជីមុខវិជ្ជាសិក្សា" : "Course Catalog"}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "Study Levels Offered" / "កម្រិតសិក្សាដែលផ្តល់ជូន" */}
      <section id="study-levels" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Study Levels Offered
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "កម្រិតសិក្សាដែលផ្តល់ជូន" : "កម្រិតសិក្សាដែលផ្តល់ជូន"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 3 Colorful Study Level Cards Matching Mockup */}
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
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lvl.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (lvl.id === 'technical') {
                          if (onSelectAdmissionDetail) onSelectAdmissionDetail('vocational');
                          else if (onOpenApply) onOpenApply();
                        } else {
                          if (onSelectAdmissionDetail) onSelectAdmissionDetail('degrees');
                          else if (onOpenApply) onOpenApply();
                        }
                      }}
                      className={`text-xs font-bold ${lvl.accent} hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer`}
                    >
                      <span>{isKh ? "ស្វែងយល់បន្ថែម" : "Learn More"}</span>
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

      {/* 3. "Our Faculties" / "មហាវិទ្យាល័យរបស់យើង" */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Faculties
            </h2>
            <h3 className="text-xl md:text-2xl font-bold font-khmer text-blue-900 mt-1">
              {isKh ? "មហាវិទ្យាល័យវិស្វកម្មរបស់យើង" : "មហាវិទ្យាល័យរបស់យើង"}
            </h3>
            <div className="w-16 h-1 bg-blue-700 mt-3 rounded-full"></div>
          </div>

          {/* 4 Large Faculty Cards in 2x2 Grid with Photo Background & Overlay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculties.map((fac) => (
              <div 
                key={fac.id}
                onClick={() => {
                  if (onSelectProgram) onSelectProgram(fac.id);
                  else if (onSelectFaculty) onSelectFaculty(fac);
                }}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-72 cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <img 
                  src={fac.image} 
                  alt={fac.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30 group-hover:from-slate-950/95 transition-all" />

                {/* Top Icon Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                    {fac.icon}
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                    {fac.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-khmer text-amber-300 font-semibold mt-0.5 drop-shadow-xs">
                    {fac.nameKh}
                  </p>
                  <p className="mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    Brief info: {fac.desc}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:text-white transition-colors">
                    <span>{isKh ? "ស្វែងយល់បន្ថែម & មើលកម្មវិធីសិក្សា" : "Learn More & View Curriculum"}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. "Admission Steps" / "ដំណាក់កាលនៃការចុះឈ្មោះចូលរៀន" */}
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

          {/* Horizontal Step Process with Connecting Line */}
          <div className="relative">
            {/* Connecting Track Line */}
            <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-slate-300 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {admissionSteps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center group">
                  {/* Circle Badge */}
                  <div className={`w-14 h-14 rounded-full ${s.color} text-white flex items-center justify-center shadow-md ring-4 ring-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {s.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {s.step}. {s.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-xs">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA under steps */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onOpenApply}
              className="inline-flex items-center gap-2 bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
            >
              <span>{isKh ? "ចាប់ផ្តើមការចុះឈ្មោះ" : "Start Admission Application"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
