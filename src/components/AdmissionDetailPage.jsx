import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  BookOpen, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  ChevronRight, 
  Share2, 
  Printer, 
  AlertCircle, 
  HelpCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { admissionsDetails } from '../data/admissionsData';

export default function AdmissionDetailPage({ 
  lang, 
  item, 
  onSelectTopic, 
  onBack, 
  onBackHome, 
  onOpenApply 
}) {
  const isKh = lang === 'kh';
  const currentItem = item || admissionsDetails.requirements;

  // List of all admission topics for sidebar navigation
  const allTopics = [
    { id: 'requirements', title: 'Eligibility & Requirements', titleKh: 'លក្ខខណ្ឌជ្រើសរើស', icon: <FileText className="w-4 h-4" /> },
    { id: 'scholarships', title: 'National Scholarships', titleKh: 'អាហារូបករណ៍រដ្ឋ', icon: <Award className="w-4 h-4" /> },
    { id: 'schedules', title: 'Study Shifts & Timetables', titleKh: 'វេនសិក្សា និងពេលវេលា', icon: <Clock className="w-4 h-4" /> },
    { id: 'tuition', title: 'Tuition & Payment Plans', titleKh: 'តម្លៃសិក្សា និងការបង់ប្រាក់', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'degrees', title: 'Associate & Bachelor Degrees', titleKh: 'ថ្នាក់បរិញ្ញាបត្ររង និងបរិញ្ញាបត្រ', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'vocational', title: 'Technical & Vocational Training', titleKh: 'វគ្គបណ្តុះបណ្តាលបច្ចេកទេស', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'transfer', title: 'Transfer & International Students', titleKh: 'និស្សិតផ្ទេរការសិក្សា និងបរទេស', icon: <Building className="w-4 h-4" /> },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentItem.title,
        text: `NPIT Admissions: ${currentItem.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert(isKh ? "បានចម្លងតំណភ្ជាប់!" : "Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Sub-Header Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-slate-500 overflow-x-auto py-1">
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
              {isKh ? "ការចុះឈ្មោះ" : "Admissions"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-blue-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {isKh ? currentItem.titleKh : currentItem.title}
            </span>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title={isKh ? "បោះពុម្ពទំព័រនេះ" : "Print this page"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-slate-50 transition-colors text-xs cursor-pointer font-medium"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKh ? "បោះពុម្ព" : "Print"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              title={isKh ? "ចែករំលែក" : "Share"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-slate-50 transition-colors text-xs cursor-pointer font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKh ? "ចែករំលែក" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isKh ? "ត្រឡប់ក្រោយ" : "Back to Overview"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Hero Title Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            
            {/* Topic Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold tracking-wide uppercase mb-4">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentItem.badge}</span>
            </div>

            {/* H1 Title in English & Khmer */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {currentItem.title}
            </h1>

            <p className="mt-3 text-xl sm:text-2xl font-bold font-khmer text-amber-300">
              {currentItem.titleKh}
            </p>

            {/* Institutional Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Academic Year 2026 – 2027</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Building className="w-3.5 h-3.5 text-blue-300" />
                <span>Ta Khmau Main Campus</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Ministry of Labour & Vocational Training</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Content Container (2-Column Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Column (Cols 8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Image Banner */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative h-64 sm:h-80 md:h-96 group">
              <img
                src={currentItem.image || "/hero-lab.jpg"}
                alt={currentItem.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                  National Polytechnic Institute Techo Sen (NPIT)
                </p>
                <p className="text-base sm:text-lg font-bold drop-shadow-md">
                  {currentItem.title}
                </p>
              </div>
            </div>

            {/* Section 1: Executive Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isKh ? "សេចក្តីសង្ខេប និងគោលការណ៍ណែនាំ" : "Program Overview & Guidelines"}
                  </h2>
                  <p className="text-xs text-slate-500">Official Institutional Directive</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-950 leading-relaxed text-sm sm:text-base font-medium">
                {isKh ? currentItem.summaryKh : currentItem.summary}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isKh
                  ? "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT) ផ្តល់ជូននូវបរិយាកាសសិក្សាជាក់ស្តែង ជាមួយឧបករណ៍ពិសោធន៍ទំនើបស្តង់ដារឧស្សាហកម្ម ៤.០ ដើម្បីបណ្តុះបណ្តាលយុវជនកម្ពុជាឱ្យក្លាយជាវិស្វករ និងអ្នកបច្ចេកទេសជំនាញកម្រិតខ្ពស់។"
                  : "National Polytechnic Institute Techo Sen (NPIT) offers a premier applied technical education experience, blending rigorous theoretical fundamentals with modern Industry 4.0 laboratory hands-on training to prepare forward-thinking engineers for Cambodia's thriving industrial landscape."}
              </p>
            </div>

            {/* Section 2: Key Criteria & Core Guidelines */}
            {currentItem.criteria && currentItem.criteria.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {isKh ? "លក្ខខណ្ឌវិនិច្ឆ័យ និងតម្រូវការចាំបាច់" : "Admission Criteria & Eligibility"}
                    </h2>
                    <p className="text-xs text-slate-500">Key admission benchmarks for candidates</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentItem.criteria.map((c, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              {c.title}
                            </h3>
                            {c.titleKh && (
                              <p className="text-xs font-khmer text-blue-800 font-semibold mt-0.5">
                                {c.titleKh}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8.5">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Tuition Rates Table (If tuition topic or has feeTable) */}
            {(currentItem.feeTable || currentItem.tuitionRates) && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {isKh ? "តារាងតម្លៃសិក្សាផ្លូវការ" : "Official Tuition Rates"}
                    </h2>
                    <p className="text-xs text-slate-500">Subsidized state-approved education rates</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">{isKh ? "កម្រិតសិក្សា" : "Program Level"}</th>
                        <th className="py-3 px-4">{isKh ? "រយៈពេល" : "Duration"}</th>
                        <th className="py-3 px-4">{isKh ? "តម្លៃសិក្សា" : "Tuition Rate"}</th>
                        <th className="py-3 px-4 hidden md:table-cell">{isKh ? "កំណត់ចំណាំ" : "Inclusions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {(currentItem.feeTable || currentItem.tuitionRates).map((tr, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            <div>{tr.level}</div>
                            {tr.levelKh && (
                              <div className="text-xs font-khmer text-blue-700 font-normal mt-0.5">
                                {tr.levelKh}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{tr.duration}</td>
                          <td className="py-3 px-4 font-bold text-blue-700 text-sm sm:text-base whitespace-nowrap">
                            {tr.fee}
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-500 hidden md:table-cell">
                            {tr.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    {isKh
                      ? "តម្លៃសិក្សាទាំងអស់ខាងលើ ត្រូវបានគាំទ្រឧបត្ថម្ភដោយក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ។ គ្មានការគិតថ្លៃសម្ភារៈពិសោធន៍បន្ថែមឡើយ។"
                      : "All tuition rates are subsidized by the Ministry of Labour and Vocational Training. There are zero hidden laboratory, exam, or library fees."}
                  </span>
                </div>
              </div>
            )}

            {/* Section 4: Study Shifts Timetable (If schedules topic or has shifts) */}
            {currentItem.shifts && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {isKh ? "កាលវិភាគ និងជម្រើសវេនសិក្សា" : "Available Study Shifts & Timetables"}
                    </h2>
                    <p className="text-xs text-slate-500">Flexible options tailored for full-time and working students</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentItem.shifts.map((sh, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                            Shift {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {sh.days}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mt-3">
                          {sh.name}
                        </h3>
                        {sh.nameKh && (
                          <p className="text-xs font-khmer text-blue-900 font-semibold mt-0.5">
                            {sh.nameKh}
                          </p>
                        )}

                        <div className="mt-3 inline-block font-mono text-sm font-bold text-blue-900 bg-blue-100/70 px-3 py-1 rounded-lg">
                          {sh.hours || sh.time}
                        </div>

                        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                          {sh.desc || sh.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Required Documents Checklist */}
            {(currentItem.documents || currentItem.requirementsList) && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {isKh ? "ឯកសារតម្រូវ និងការណែនាំ" : "Required Documents & Inclusions"}
                    </h2>
                    <p className="text-xs text-slate-500">Please prepare these items prior to submitting your file</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(currentItem.documents || currentItem.requirementsList).map((doc, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Application Steps & Procedure (If available) */}
            {currentItem.procedure && currentItem.procedure.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {isKh ? "នីតិវិធី និងជំហានអនុវត្ត" : "Application Procedure & Key Steps"}
                    </h2>
                    <p className="text-xs text-slate-500">Step-by-step roadmap to enrollment</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {currentItem.procedure.map((stepText, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {stepText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Direct Application Callout Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8">
                <GraduationCap className="w-64 h-64 text-white" />
              </div>

              <div className="relative z-10 max-w-xl space-y-4">
                <span className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Admissions Open 2026 – 2027
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isKh ? "ត្រៀមខ្លួនរួចរាល់ដើម្បីចាប់ផ្តើម?" : "Ready to Start Your Application?"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-khmer">
                  {isKh
                    ? "ដាក់ពាក្យស្នើសុំចូលរៀនតាមប្រព័ន្ធអនឡាញឥឡូវនេះ ងាយស្រួល រហ័ស និងមិនគិតថ្លៃសេវាដំណើរការឯកសារ។"
                    : "Complete our streamlined online application in under 5 minutes. No registration fee required."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenApply}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>{isKh ? "ដាក់ពាក្យឥឡូវនេះ" : "Apply for this Admission"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:023999888"
                    className="bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 px-5 py-3 rounded-full text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>023 999 888</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Back Button Navigation at the bottom */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-800 hover:text-blue-950 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isKh ? "ត្រឡប់ទៅទំព័រចុះឈ្មោះ" : "Back to Admissions Overview"}</span>
              </button>

              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <span>{isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Sidebar Column (Cols 4 - Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Sidebar Card 1: Fast Action Apply */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {isKh ? "សកម្មភាពរហ័ស" : "Take Action"}
              </h3>

              <button
                type="button"
                onClick={onOpenApply}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isKh ? "ដាក់ពាក្យស្នើសុំអនឡាញ" : "Apply Online Now"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(isKh ? "កំពុងទាញយកសៀវភៅណែនាំការចុះឈ្មោះ (PDF)..." : "Downloading Admissions Guide (PDF)...");
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-700" />
                <span>{isKh ? "ទាញយកសៀវភៅណែនាំ (PDF)" : "Download Guide (PDF)"}</span>
              </button>
            </div>

            {/* Sidebar Card 2: Other Admission Topics */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>{isKh ? "ប្រធានបទចុះឈ្មោះផ្សេងទៀត" : "Admissions Topics"}</span>
                <span className="text-[11px] font-normal text-slate-400">7 topics</span>
              </h3>

              <div className="space-y-1.5 pt-1">
                {allTopics.map((topic) => {
                  const isActive = topic.id === currentItem.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => onSelectTopic(topic.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isActive 
                          ? 'bg-blue-700 text-white font-bold shadow-xs' 
                          : 'bg-slate-50/80 hover:bg-blue-50 text-slate-700 hover:text-blue-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={isActive ? 'text-amber-300' : 'text-blue-700'}>
                          {topic.icon}
                        </span>
                        <div className="truncate">
                          <div className="truncate font-medium">{topic.title}</div>
                          <div className={`text-[11px] font-khmer ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                            {topic.titleKh}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Card 3: Admissions Office Contact */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                {isKh ? "ការិយាល័យចុះឈ្មោះ និងសិក្សាធិការ" : "Admissions Office"}
              </h3>

              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>National Road 2, Ta Khmau City, Kandal Province, Cambodia</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">023 999 888</strong> / 012 345 678
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-blue-700 hover:underline">admission@npit.edu.kh</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-700 font-semibold">Mon – Fri:</span> 7:30 AM – 5:00 PM<br />
                    <span className="text-slate-700 font-semibold">Sat:</span> 8:00 AM – 12:00 PM
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-[11px] leading-relaxed">
                  {isKh
                    ? "ក្រុមការងារប្រឹក្សាយោបល់ការសិក្សារបស់ NPIT រង់ចាំស្វាគមន៍ប្អូនៗរៀងរាល់ថ្ងៃធ្វើការ!"
                    : "Visit our campus admissions desk for direct academic counseling & document submission."}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
