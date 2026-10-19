import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  HardHat, 
  Laptop, 
  Cpu, 
  Cog, 
  Award, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Share2, 
  Printer, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  Wrench,
  Microscope,
  Briefcase
} from 'lucide-react';
import { programsList } from '../data/programsData';

export default function ProgramDetailPage({ 
  lang, 
  program, 
  onSelectProgram, 
  onBack, 
  onBackHome, 
  onOpenApply 
}) {
  const isKh = lang === 'kh';
  const current = program || programsList[0] || {};
  const [activeYear, setActiveYear] = useState(1);
  const [copied, setCopied] = useState(false);

  // Safe defaults for stats
  const stats = current?.stats || {
    degree: current?.level || (isKh ? 'បរិញ្ញាបត្រ / សញ្ញាបត្រជាន់ខ្ពស់' : 'Bachelor / Higher Diploma'),
    duration: current?.duration || (isKh ? '២ ទៅ ៤ ឆ្នាំ' : '2 - 4 Years'),
    credits: current?.totalCredits ? `${current.totalCredits} Credits` : '72 - 136 Credits'
  };

  // Safe defaults for highlights
  const defaultHighlightsEn = [
    '80% practical hands-on workshop training with modern machinery',
    '100% Ministry of Labour (MLVT) full scholarship eligibility',
    'Direct career placement pathways with leading industrial partners',
    'Certified curriculum accredited by BEC and National Quality Standards'
  ];
  const defaultHighlightsKh = [
    'ការបណ្តុះបណ្តាលអនុវត្តផ្ទាល់ក្នុងរោងជាង ៨០% ជាមួយគ្រឿងចក្រទំនើប',
    'ឱកាសទទួលបានអាហារូបករណ៍ ១០០% ពីរាជរដ្ឋាភិបាល (ក្រសួងការងារ)',
    'ការធានាឱកាសការងារ និងការចុះកម្មសិក្សាផ្ទាល់នៅរោងចក្រ-សហគ្រាសធំៗ',
    'កម្មវិធីសិក្សាស្របតាមស្តង់ដារជាតិ និងទទួលស្គាល់ដោយគណៈកម្មាធិការវាយតម្លៃ'
  ];
  const highlights = (isKh ? current?.highlightsKh : current?.highlights) || (isKh ? defaultHighlightsKh : defaultHighlightsEn);

  // Safe defaults for degrees
  const degreesList = (current?.degrees && Array.isArray(current.degrees) && current.degrees.length > 0)
    ? current.degrees
    : [
        {
          level: current?.degreeType === 'diploma' ? 'Higher Technical Diploma (2 Years)' : 'Bachelor of Technology (4 Years)',
          levelKh: current?.degreeType === 'diploma' ? 'សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (២ ឆ្នាំ)' : 'បរិញ្ញាបត្របច្ចេកទេស (៤ ឆ្នាំ)',
          duration: current?.duration || '4 Years (8 Semesters)',
          durationKh: current?.durationKh || '៤ ឆ្នាំ (៨ ឆមាស)',
          credits: current?.totalCredits || 132
        },
        {
          level: 'Higher Technical Diploma (2 Years)',
          levelKh: 'សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (២ ឆ្នាំ)',
          duration: '2 Years (4 Semesters)',
          durationKh: '២ ឆ្នាំ (៤ ឆមាស)',
          credits: 72
        }
      ];

  // Safe defaults for curriculum
  const defaultCurriculum = [
    {
      year: 1,
      title: 'Year 1: Engineering Science & Foundational Technology',
      titleKh: 'ឆ្នាំទី ១៖ មូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យាវិស្វកម្ម',
      courses: [
        { code: `${current?.code || 'ENG'}-101`, name: isKh ? 'គណិតវិទ្យាវិស្វកម្ម និងរូបវិទ្យាអនុវត្ត' : 'Applied Engineering Mathematics & Physics', credits: 4, lab: '30h' },
        { code: `${current?.code || 'ENG'}-102`, name: isKh ? 'គំនូរបច្ចេកទេស និង AutoCAD 2D/3D' : 'Technical Drawing & Computer-Aided Drafting (CAD)', credits: 3, lab: '45h' },
        { code: `${current?.code || 'ENG'}-103`, name: isKh ? 'សុវត្ថិភាពការងារ និងបទបញ្ជាឧស្សាហកម្ម' : 'Occupational Health, Safety & Industrial Protocols', credits: 2, lab: '15h' },
        { code: `${current?.code || 'ENG'}-104`, name: isKh ? 'សិក្ខាសាលាអនុវត្តបច្ចេកវិទ្យាមូលដ្ឋាន' : 'Foundational Workshop Tools & Practices', credits: 4, lab: '60h' }
      ]
    },
    {
      year: 2,
      title: 'Year 2: Core Engineering Discipline & Applied Systems',
      titleKh: 'ឆ្នាំទី ២៖ ជំនាញស្នូល និងប្រព័ន្ធបច្ចេកវិទ្យាអនុវត្តជាក់ស្តែង',
      courses: [
        { code: `${current?.code || 'ENG'}-201`, name: isKh ? 'សៀគ្វី និងប្រព័ន្ធគ្រប់គ្រងស្វ័យប្រវត្ត' : 'Control Systems & Instrumentation', credits: 4, lab: '60h' },
        { code: `${current?.code || 'ENG'}-202`, name: isKh ? 'ប្រព័ន្ធវិភាគ និងតេស្តឧបករណ៍ឧស្សាហកម្ម' : 'Industrial Diagnostics & Testing Systems', credits: 4, lab: '60h' },
        { code: `${current?.code || 'ENG'}-203`, name: isKh ? 'ការថែទាំបង្ការ និងជួសជុលឧបករណ៍ទំនើប' : 'Preventative Maintenance & Overhaul Engineering', credits: 3, lab: '45h' },
        { code: `${current?.code || 'ENG'}-204`, name: isKh ? 'កម្មសិក្សាការងារលើកទី១ នៅរោងចក្រ' : 'Industrial Internship Practicum I', credits: 3, lab: '120h' }
      ]
    },
    {
      year: 3,
      title: 'Year 3: Advanced Systems & Industrial Automation',
      titleKh: 'ឆ្នាំទី ៣៖ បច្ចេកវិទ្យាកម្រិតខ្ពស់ និងស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម',
      courses: [
        { code: `${current?.code || 'ENG'}-301`, name: isKh ? 'ស្វ័យប្រវត្តិកម្ម PLC & ប្រព័ន្ធ SCADA' : 'PLC Automation & SCADA Plant Networks', credits: 4, lab: '60h' },
        { code: `${current?.code || 'ENG'}-302`, name: isKh ? 'ការរចនា និងគណនាប្រព័ន្ធស្មុគស្មាញ' : 'Advanced Engineering Simulation & Design', credits: 4, lab: '45h' },
        { code: `${current?.code || 'ENG'}-303`, name: isKh ? 'ការគ្រប់គ្រងគម្រោងវិស្វកម្ម និងគុណភាព QA' : 'Engineering Project Management & Quality Control', credits: 3, lab: '30h' },
        { code: `${current?.code || 'ENG'}-304`, name: isKh ? 'ប្រព័ន្ធឆ្លាតវៃ និងបច្ចេកវិទ្យាឌីជីថល Industry 4.0' : 'Smart Industry 4.0 & Sensor Networks', credits: 3, lab: '45h' }
      ]
    },
    {
      year: 4,
      title: 'Year 4: Industrial Capstone Design & Enterprise Residency',
      titleKh: 'ឆ្នាំទី ៤៖ សារណាបញ្ចប់ការសិក្សា និងកម្មសិក្សាសហគ្រាស',
      courses: [
        { code: `${current?.code || 'ENG'}-401`, name: isKh ? 'សារណាស្រាវជ្រាវ និងច្នៃប្រឌិតបច្ចេកវិទ្យា' : 'Senior Capstone Engineering Project', credits: 6, lab: '120h' },
        { code: `${current?.code || 'ENG'}-402`, name: isKh ? 'កម្មសិក្សាការងារពេញម៉ោងនៅសហគ្រាស' : 'Full-Time Enterprise Practicum & Residency', credits: 6, lab: '240h' },
        { code: `${current?.code || 'ENG'}-403`, name: isKh ? 'សីលធម៌វិជ្ជាជីវៈ និងការបង្កើតអាជីវកម្មបច្ចេកវិទ្យា' : 'Professional Engineering Ethics & Technopreneurship', credits: 2, lab: '15h' }
      ]
    }
  ];
  const curriculumList = (current?.curriculum && Array.isArray(current.curriculum) && current.curriculum.length > 0)
    ? current.curriculum
    : defaultCurriculum;

  // Safe defaults for laboratories
  const defaultLaboratories = [
    {
      name: `${current?.shortName || current?.name || 'Engineering'} Specialized Laboratory`,
      nameKh: `មន្ទីរពិសោធន៍ឯកទេស ${current?.shortNameKh || current?.nameKhmer || 'វិស្វកម្ម'}`,
      desc: isKh 
        ? 'បំពាក់ដោយឧបករណ៍តេស្ត គ្រឿងចក្រទំនើប និងប្រព័ន្ធកុំព្យូទ័រសម្រាប់អនុវត្តផ្ទាល់តាមស្តង់ដារឧស្សាហកម្ម ៤.០។'
        : 'Equipped with Industry 4.0 testing benches, precision equipment, and computer-assisted diagnostic suites.'
    },
    {
      name: 'Advanced Prototyping & Computer Simulation Center',
      nameKh: 'មជ្ឈមណ្ឌលពិសោធន៍កុំព្យូទ័រ និងគំរូដើមបច្ចេកវិទ្យា',
      desc: isKh 
        ? 'មន្ទីរពិសោធន៍សម្រាប់សរសេរកូដ បញ្ជាម៉ាស៊ីនស្វ័យប្រវត្ត និងការក្លែងធ្វើពិសោធន៍តាមកម្មវិធីកុំព្យូទ័រ។'
        : 'Dedicated high-performance workstations for technical simulations, CAD/CAM drafting, and digital testing.'
    }
  ];
  const laboratories = (current?.laboratories && Array.isArray(current.laboratories) && current.laboratories.length > 0)
    ? current.laboratories
    : defaultLaboratories;

  // Safe defaults for partners
  const defaultPartners = [
    'MinebeaMitsumi Cambodia',
    'Soma Group',
    'Chip Mong Insee',
    'CamGSM (Cellcard)',
    'Smart Axiata',
    'Schneider Electric Cambodia',
    'TotalEnergies Cambodia'
  ];
  const industryPartners = (current?.industryPartners && Array.isArray(current.industryPartners) && current.industryPartners.length > 0)
    ? current.industryPartners
    : defaultPartners;

  // Safe defaults for careers
  const defaultCareersEn = ['Senior Systems Engineer', 'Plant Automation Supervisor', 'Quality Assurance (QA/QC) Specialist', 'Technical Project Consultant'];
  const defaultCareersKh = ['វិស្វករប្រព័ន្ធជាន់ខ្ពស់', 'ប្រធានផ្នែកស្វ័យប្រវត្តិកម្មរោងចក្រ', 'អ្នកឯកទេសត្រួតពិនិត្យគុណភាព QA/QC', 'អ្នកប្រឹក្សាបច្ចេកទេសគម្រោង'];
  const careers = (isKh ? current?.careersKh : current?.careers) || (isKh ? defaultCareersKh : defaultCareersEn);

  const getProgramIcon = (iconName, className = "w-6 h-6 text-white") => {
    switch (iconName) {
      case 'HardHat':
        return <HardHat className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Cog':
        return <Cog className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: current.name || 'NPIT Program',
        text: `NPIT Academic Program: ${current.name} (${current.nameKhmer})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Sub-Header Breadcrumb & Action Toolbar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] sm:top-[76px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-slate-500 overflow-x-auto py-1">
            <button 
              type="button" 
              onClick={onBackHome} 
              className="hover:text-blue-700 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {isKh ? "ទំព័រដើម" : "Home"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              type="button" 
              onClick={onBack} 
              className="hover:text-blue-700 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {isKh ? "កម្មវិធីបណ្តុះបណ្តាល" : "Academic Programs"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-blue-900 font-semibold truncate max-w-[220px] sm:max-w-xs">
              {isKh ? (current.nameKhmer || current.name) : current.name}
            </span>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 font-medium transition-colors text-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isKh ? "ថយក្រោយ" : "All Programs"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition-colors text-xs cursor-pointer"
              title="Share Program"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKh ? "ចែករំលែក" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition-colors text-xs cursor-pointer"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? (isKh ? "បានចម្លង" : "Copied!") : (isKh ? "ចម្លងតំណ" : "Copy Link")}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition-colors text-xs cursor-pointer"
              title="Print Curriculum"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKh ? "បោះពុម្ព" : "Print"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <img 
            src={current.image || '/major-industrial.jpg'} 
            alt={current.name || 'NPIT Academic Program'} 
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            
            {/* Top Tag Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-md text-white border border-white/20">
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{isKh ? (current.facultyKh || current.faculty || 'វិទ្យាស្ថាន NPIT') : (current.faculty || 'NPIT Faculty')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Check className="w-3.5 h-3.5" />
                <span>{isKh ? (current.scholarshipKh || "អាហារូបករណ៍ ១០០%") : (current.scholarship || "100% Scholarship")}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>National & BEC Accredited</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {current.name || 'Academic Program'}
            </h1>
            <p className="text-xl sm:text-2xl font-bold font-khmer text-amber-300 mt-2">
              {current.nameKhmer || ''}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {isKh ? (current.overviewKh || current.overview) : (current.overview || '')}
            </p>

            {/* Key Quick Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{stats.degree}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="font-semibold text-white">{stats.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{stats.credits}</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenApply && onOpenApply(current)}
                className="inline-flex items-center gap-2 bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-5 py-2 rounded-xl shadow-lg transition-all text-xs sm:text-sm ml-auto cursor-pointer"
              >
                <span>{isKh ? "ចុះឈ្មោះចូលរៀនជំនាញនេះ" : "Apply for this Program"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Content Container - Matches header max-w-7xl width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Key Program Highlights */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl ${current.cardBg || 'bg-[#002b80]'} text-white shadow-md`}>
              {getProgramIcon(current.icon)}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {isKh ? "ចំណុចលេចធ្លោនៃកម្មវិធីសិក្សា" : "Key Program Highlights"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                National Polytechnic Institute Techo Sen Standards
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Degree Tracks (Bachelor vs Associate) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isKh ? "កម្រិតសញ្ញាបត្រដែលត្រូវទទួលបាន" : "Degrees & Certification Levels"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose between the 4-year professional Bachelor or 2-year practical Higher Diploma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {degreesList.map((deg, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border ${idx === 0 ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 bg-slate-50'} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                      {idx === 0 ? "Degree Track" : "Diploma Track"}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{deg.credits} Credits</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isKh ? (deg.levelKh || deg.level) : deg.level}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isKh ? (deg.durationKh || deg.duration) : deg.duration}</span>
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">80% Hands-on Practice</span>
                  <button
                    type="button"
                    onClick={() => onOpenApply && onOpenApply(current)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Year-by-Year Curriculum Breakdown */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {isKh ? "កម្មវិធីសិក្សាលម្អិតតាមឆ្នាំនីមួយៗ" : "Year-by-Year Curriculum Outline"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured modular course units with corresponding laboratory & workshop hours
              </p>
            </div>

            {/* Year Selector Tabs */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
              {[1, 2, 3, 4].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeYear === year 
                      ? 'bg-[#1b4b9b] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKh ? `ឆ្នាំទី ${year}` : `Year ${year}`}
                </button>
              ))}
            </div>
          </div>

          {/* Active Year Content */}
          {curriculumList.filter(c => c.year === activeYear).map((cur) => (
            <div key={cur.year} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-blue-900">
                  {isKh ? cur.titleKh : cur.title}
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                  Year {cur.year} Total: ~34 Credits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-2.5 px-3">Course Code</th>
                      <th className="py-2.5 px-3">Module Name</th>
                      <th className="py-2.5 px-3 text-center">Credits</th>
                      <th className="py-2.5 px-3 text-right">Lab Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cur.courses.map((course, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">
                          {course.code}
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-800">
                          {course.name}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-600">
                          {course.credits}
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-blue-700">
                          {course.lab}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Engineering Laboratories */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Microscope className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Hands-on Facilities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isKh ? "មន្ទីរពិសោធន៍ និងរោងជាងបច្ចេកវិទ្យាជាក់ស្តែង" : "Specialized Laboratories & Workshop Centers"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Over 5,000 square meters of high-tech laboratory spaces dedicated to this faculty
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {laboratories.map((lab, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {isKh ? lab.nameKh : lab.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lab.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>NPIT Engineering Lab</span>
                  <span className="text-blue-700 font-bold">Active 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Opportunities & Industry Partners */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Career & Employment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isKh ? "ឱកាសការងារ និងដៃគូឧស្សាហកម្ម" : "Career Pathways & Industry Partners"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct recruitment channels into leading domestic and multinational corporations
            </p>
          </div>

          {/* Roles */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {isKh ? "មុខតំណែងការងារក្រោយបញ្ចប់ការសិក្សា" : "Target Career Roles"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {careers.map((role, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {isKh ? "សហការជាមួយក្រុមហ៊ុន និងស្ថាប័នធំៗ" : "Top Employing Partners & Internships"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {industryPartners.map((partner, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{partner}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
