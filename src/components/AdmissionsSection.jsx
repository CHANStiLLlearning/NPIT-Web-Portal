import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowRight, Calculator, Send } from 'lucide-react';

export default function AdmissionsSection({ lang, onSelectAdmissionDetail, onOpenApply, onNavigate }) {
  const isKh = lang === 'kh';
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'calculator'

  // Calculator states
  const [grade, setGrade] = useState('B');
  const [shift, setShift] = useState('morning');
  const [programChoice, setProgramChoice] = useState('it');

  const getScholarshipResult = () => {
    if (grade === 'A' || grade === 'B') {
      return {
        percent: '100%',
        title: isKh ? 'អាហារូបករណ៍រដ្ឋពេញលេញ ១០០% (ថ្នាក់បរិញ្ញាបត្រ ឬ សញ្ញាបត្រជាន់ខ្ពស់)' : '100% Full State Merit Scholarship (Bachelor or Diploma)',
        tuition: '$0 / Year (100% Free Tuition)',
        desc: isKh 
          ? 'ឧបត្ថម្ភថ្លៃសិក្សា ១០០% ដោយក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ (MLVT) សម្រាប់រយៈពេល ៤ ឆ្នាំពេញ ឬ ២ ឆ្នាំ។'
          : 'Full 100% tuition coverage sponsored by MLVT for your entire engineering degree program.',
        badge: 'Top Tier • 100% Free',
        badgeColor: 'bg-amber-500 text-slate-950 font-bold'
      };
    } else if (grade === 'C') {
      return {
        percent: '100% / 50%',
        title: isKh ? 'អាហារូបករណ៍ ១០០% ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់ ឬ ៥០% បរិញ្ញាបត្រ' : '100% Diploma Grant or 50% Bachelor Subsidy',
        tuition: '$0 (Diploma 2Y) / $190/sem (Bachelor)',
        desc: isKh 
          ? 'សិស្សនិទ្ទេស C អាចទទួលបានអាហារូបករណ៍ ១០០% សម្រាប់ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់ ២ឆ្នាំ (៩ ជំនាញ) ឬ ៥០% សម្រាប់បរិញ្ញាបត្រ។'
          : 'Grade C candidates receive guaranteed 100% tuition waiver for 2-Year Higher Diploma or 50% subsidy for Bachelor.',
        badge: 'State Priority Grant',
        badgeColor: 'bg-blue-600'
      };
    } else {
      // D, E, or Fail
      return {
        percent: '100%',
        title: isKh ? 'អាហារូបករណ៍ ១០០% ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (ជាប់ ឬធ្លាក់បាក់ឌុប)' : '100% Free Tuition Higher Diploma (Bac II Pass or Fail)',
        tuition: '$0 / 2 Years (100% Free)',
        desc: isKh 
          ? 'សេចក្តីប្រកាសផ្លូវការរបស់ក្រសួង៖ សិស្សជាប់ ឬធ្លាក់បាក់ឌុប ទទួលបានអាហារូបករណ៍ ១០០% ឥតគិតថ្លៃសិក្សា ២ឆ្នាំពេញ លើ ៩ មុខជំនាញបច្ចេកទេស! ចូលរៀនលើកទី១: ១៣ វិច្ឆិកា ២០២៦ | លើកទី២: ០៤ មករា ២០២៧។'
          : 'Official MLVT Program: Candidates who passed or failed Bac II receive 100% free tuition for the 2-Year Higher Diploma across 9 technician majors. Batch 1: Nov 13, 2026 | Batch 2: Jan 04, 2027.',
        badge: '100% Government TVET Grant',
        badgeColor: 'bg-emerald-600'
      };
    }
  };

  const result = getScholarshipResult();

  return (
    <section id="admissions" className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Sub-navigation Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Award className="w-4 h-4 text-blue-700" />
              <span>{isKh ? 'ការចុះឈ្មោះឆ្នាំសិក្សា ២០២៦-២០២៧' : 'Admissions Cohort 2026–2027'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isKh ? "ការចុះឈ្មោះចូលរៀន និងអាហារូបករណ៍" : "Admissions & Scholarships"}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? "ព័ត៌មានលម្អិតអំពីការជ្រើសរើសនិស្សិត កម្មវិធីអាហារូបករណ៍រដ្ឋ និងការប៉ាន់ប្រមាណសិទ្ធិទទួលបានអាហារូបករណ៍។"
                : "Comprehensive guidance for undergraduate admissions, national merit scholarships, and instant eligibility estimation."}
            </p>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isKh ? 'ព័ត៌មានទូទៅ' : 'Admission Pillars'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{isKh ? 'ម៉ាស៊ីនគិតលេខអាហារូបករណ៍' : 'Scholarship Estimator'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 3 Admission Pillars with Cards */}
        {activeTab === 'overview' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* Card 1: Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src="/admission-requirements.jpg" 
                    alt="Eligibility & Requirements" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-blue-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Entry Criteria
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-khmer text-amber-300 font-semibold">
                      {isKh ? "លក្ខខណ្ឌជ្រើសរើស" : "លក្ខខណ្ឌនៃការជ្រើសរើស"}
                    </p>
                    <h3 className="text-lg font-bold text-white drop-shadow-xs">
                      Eligibility & Requirements
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{isKh ? "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ឬសមមូល" : "High School Diploma (Bac II) or recognized equivalent"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{isKh ? "ឆ្លងកាត់ការប្រឡង ឬវាយតម្លៃសមត្ថភាពមូលដ្ឋាន" : "Pass entrance assessment in Math & Science fundamentals"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{isKh ? "មានចំណង់ចំណូលចិត្តខ្ពស់លើបច្ចេកវិទ្យា និងវិស្វកម្ម" : "Strong passion for modern engineering & digital innovation"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectAdmissionDetail && onSelectAdmissionDetail('requirements')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400">NPIT Admissions</span>
              </div>
            </div>

            {/* Card 2: Government Scholarships */}
            <div className="bg-white rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src="/admission-scholarships.jpg" 
                    alt="National Scholarships" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      100% & 50% State-Funded
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-khmer text-amber-300 font-semibold">
                      {isKh ? "អាហារូបករណ៍រដ្ឋាភិបាល" : "អាហារូបករណ៍រដ្ឋាភិបាល"}
                    </p>
                    <h3 className="text-lg font-bold text-white drop-shadow-xs">
                      National Scholarships
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {isKh 
                      ? "ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ ផ្តល់អាហារូបករណ៍ពេញលេញ ១០០% និង ៥០% សម្រាប់សិស្សឆ្នើមទូទាំងប្រទេស។"
                      : "Full 100% and 50% state-sponsored tuition scholarships available for high-achieving high school graduates nationwide."}
                  </p>
                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs font-semibold text-blue-800">
                    {isKh ? "• អាហារូបករណ៍សមធម៌ និងអាទិភាពសិស្សនារីក្នុងវិស័យ STEM" : "• Equity quotas & women-in-STEM priority subsidies"}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectAdmissionDetail && onSelectAdmissionDetail('scholarships')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-amber-600 font-semibold">100% Scholarship</span>
              </div>
            </div>

            {/* Card 3: Flexible Study Sessions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src="/admission-schedules.jpg" 
                    alt="Study Shifts & Schedules" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-blue-800/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      3 Shift Options
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-khmer text-amber-300 font-semibold">
                      {isKh ? "វេនសិក្សាបត់បែន" : "វេនសិក្សាបត់បែន"}
                    </p>
                    <h3 className="text-lg font-bold text-white drop-shadow-xs">
                      Study Shifts & Schedules
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="font-semibold text-slate-800">{isKh ? "វេនព្រឹក" : "Morning Shift"}</span>
                      <span className="text-slate-500 font-mono text-xs">7:30 AM – 11:30 AM</span>
                    </li>
                    <li className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="font-semibold text-slate-800">{isKh ? "វេនរសៀល" : "Afternoon Shift"}</span>
                      <span className="text-slate-500 font-mono text-xs">1:30 PM – 5:30 PM</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span className="font-semibold text-slate-800">{isKh ? "វេនចុងសប្តាហ៍" : "Weekend Shift"}</span>
                      <span className="text-slate-500 font-mono text-xs">Sat & Sun (8AM–5PM)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectAdmissionDetail && onSelectAdmissionDetail('schedules')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-blue-700 font-semibold">Day & Weekend</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Interactive Scholarship Eligibility & Tuition Estimator */}
        {activeTab === 'calculator' && (
          <div className="mt-8 bg-white rounded-3xl border border-blue-200 shadow-xl p-6 sm:p-10 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Form Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isKh ? 'ពិនិត្យសិទ្ធិទទួលបានអាហារូបករណ៍រដ្ឋភ្លាមៗ' : 'Instant National Scholarship Eligibility Checker'}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {isKh 
                      ? 'ជ្រើសរើសនិទ្ទេសបាក់ឌុប និងវេនសិក្សា ដើម្បីដឹងពីកញ្ចប់អាហារូបករណ៍ដែលអ្នកមានសិទ្ធិទទួលបាន។'
                      : 'Select your Bac II result grade and preferences to calculate your government scholarship tier.'}
                  </p>
                </div>

                {/* Question 1: Bac II Grade */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {isKh ? '១. និទ្ទេសប្រឡងបាក់ឌុប (Bac II Grade)' : '1. High School Bac II Exam Grade'}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: 'A', label: 'Grade A' },
                      { id: 'B', label: 'Grade B' },
                      { id: 'C', label: 'Grade C' },
                      { id: 'D', label: 'Grade D/E' },
                      { id: 'F', label: isKh ? 'ធ្លាក់ (Fail)' : 'Failed' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGrade(g.id)}
                        className={`py-2 px-1 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          grade === g.id
                            ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-600 ring-offset-2'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Department of Choice */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {isKh ? '២. មុខជំនាញដែលចង់សិក្សា' : '2. Field of Interest'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'industrial', label: isKh ? '១. ឧស្សាហកម្ម' : 'Industrial' },
                      { id: 'electrical', label: isKh ? '២. អគ្គិសនី' : 'Electrical' },
                      { id: 'hvac', label: isKh ? '៣. បរិក្ខារត្រជាក់' : 'HVAC' },
                      { id: 'it', label: isKh ? '៤. ព័ត៌មានវិទ្យា' : 'IT Software' },
                      { id: 'automotive', label: isKh ? '៥. យន្តសាស្ត្ររថយន្ត' : 'Automotive' },
                      { id: 'civil', label: isKh ? '៦. សំណង់ស៊ីវិល' : 'Civil Eng' },
                      { id: 'cybersecurity', label: isKh ? '៧. សន្តិសុខសាយប័រ' : 'Cybersecurity' },
                      { id: 'business', label: isKh ? '៨. គ្រប់គ្រង/ភាសា' : 'BA/English' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setProgramChoice(p.id)}
                        className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-bold text-center transition-all cursor-pointer font-khmer ${
                          programChoice === p.id
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Study Shift */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {isKh ? '៣. វេនសិក្សាដែលពេញចិត្ត' : '3. Preferred Study Shift'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'morning', label: isKh ? 'វេនព្រឹក (Morning)' : 'Morning (7:30AM)' },
                      { id: 'afternoon', label: isKh ? 'វេនរសៀល (Afternoon)' : 'Afternoon (1:30PM)' },
                      { id: 'evening', label: isKh ? 'វេនយប់ (Evening)' : 'Evening (5:30PM)' },
                      { id: 'weekend', label: isKh ? 'ចុងសប្តាហ៍ (Weekend)' : 'Weekend (Sat-Sun)' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setShift(s.id)}
                        className={`py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold text-center transition-all cursor-pointer ${
                          shift === s.id
                            ? 'bg-blue-800 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Calculated Estimate Card (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2049] to-[#122e6b] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-600/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full text-white ${result.badgeColor}`}>
                      {result.badge}
                    </span>
                    <span className="text-amber-400 font-mono text-xs font-bold">Verified Audit</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
                      {result.percent}
                    </span>
                    <span className="text-base text-blue-200 font-bold">
                      {isKh ? 'អាហារូបករណ៍រដ្ឋ' : 'Tuition Grant'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-amber-300 mb-2">
                    {result.title}
                  </h4>

                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 mb-4">
                    <span className="text-[11px] text-blue-200 block uppercase font-bold tracking-wider">
                      {isKh ? 'ថ្លៃសិក្សាដែលត្រូវបង់៖' : 'Estimated Student Tuition:'}
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      {result.tuition}
                    </span>
                  </div>

                  <p className="text-xs text-blue-100/90 leading-relaxed mb-6">
                    {result.desc}
                  </p>
                </div>

                {/* Direct Action */}
                <button
                  type="button"
                  onClick={() => onOpenApply && onOpenApply(programChoice)}
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{isKh ? 'ដាក់ពាក្យស្នើសុំអាហារូបករណ៍នេះ' : 'Apply Online with this Grant'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Banner Navigating to Full Admissions Page */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                {isKh ? 'ត្រូវការឯកសារណែនាំការចុះឈ្មោះ និងកាលវិភាគពិនិត្យពាក្យ?' : 'Need comprehensive admission policies, brochures & deadlines?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                {isKh 
                  ? 'ពិនិត្យមើលលម្អិតអំពីបែបបទផ្ទេរការសិក្សា វិញ្ញាបនបត្រសមមូល និងកិច្ចសន្យាអាហារូបករណ៍។' 
                  : 'Check detailed credit transfer protocols, high school equivalency rules, and enrollment calendars.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenApply && onOpenApply()}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isKh ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Online'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('admissions', '#admissions')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isKh ? 'ព័ត៌មានចុះឈ្មោះពេញលេញ' : 'All Admissions Info'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

