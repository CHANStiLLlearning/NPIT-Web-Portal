import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  ShieldCheck, 
  Building2, 
  Send, 
  FileText, 
  Printer, 
  Sparkles,
  HardHat,
  Laptop,
  Cpu,
  Cog,
  Calendar,
  MapPin,
  HelpCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { programsList } from '../data/programsData';
import { submitApplication } from '../services/admissionsService';

export default function ApplyPage({ 
  lang, 
  defaultProgram, 
  onBack, 
  onBackHome, 
  onNavigateToProgram 
}) {
  const isKh = lang === 'kh';

  // Selected major initialization
  const initialProgramId = defaultProgram?.id || 'electrical';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullNameEn: '',
    fullNameKh: '',
    gender: 'male',
    dob: '',
    phone: '',
    email: '',
    province: 'Phnom Penh',
    address: '',
    highSchool: '',
    bacYear: '2026',
    bacGrade: 'B',
    track: 'science',
    degreeLevel: 'beng', // 'beng' (4y) | 'diploma' (2y)
    programId: initialProgramId,
    shift: 'morning', // 'morning' | 'afternoon' | 'weekend'
    scholarship: '100_state', // '100_state' | '50_tvet' | 'women_stem' | 'self_financed'
    agreed: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [refNumber, setRefNumber] = useState('');
  const [submitDate, setSubmitDate] = useState('');

  // Update program selection if defaultProgram changes
  useEffect(() => {
    if (defaultProgram?.id) {
      setFormData(prev => ({ ...prev, programId: defaultProgram.id }));
    }
  }, [defaultProgram]);

  const selectedProgramObj = programsList.find(p => p.id === formData.programId) || programsList[0];

  const getMajorIcon = (iconName, className = "w-5 h-5 text-white") => {
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

  const provinces = [
    "Phnom Penh (រាជធានីភ្នំពេញ)",
    "Kandal (ខេត្តកណ្តាល)",
    "Siem Reap (ខេត្តសៀមរាប)",
    "Battambang (ខេត្តបាត់ដំបង)",
    "Kampong Cham (ខេត្តកំពង់ចាម)",
    "Takeo (ខេត្តតាកែវ)",
    "Kampot (ខេត្តកំពត)",
    "Kampong Thom (ខេត្តកំពង់ធំ)",
    "Prey Veng (ខេត្តព្រៃវែង)",
    "Svay Rieng (ខេត្តស្វាយរៀង)",
    "Banteay Meanchey (ខេត្តបន្ទាយមានជ័យ)",
    "Pursat (ខេត្តពោធិ៍សាត់)",
    "Kampong Chhnang (ខេត្តកំពង់ឆ្នាំង)",
    "Kampong Speu (ខេត្តកំពង់ស្ពឺ)",
    "Sihanoukville (ខេត្តព្រះសីហនុ)",
    "Other Provinces (ខេត្តផ្សេងៗ)"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitApplication({
        fullName: formData.fullNameEn,
        fullNameKhmer: formData.fullNameKh,
        gender: formData.gender,
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        province: formData.province,
        address: formData.address,
        highSchoolName: formData.highSchool,
        graduationYear: formData.bacYear,
        bacIIGrade: formData.bacGrade,
        bacIITrack: formData.track,
        programId: formData.programId,
        degreeType: formData.degreeLevel === 'beng' ? 'Bachelor of Engineering (4 Years)' : 'Higher Technical Diploma (2 Years)',
        shift: formData.shift,
        scholarshipCategory: formData.scholarship,
        scholarshipQuotaPercent: formData.scholarship === '100_state' ? '100% State Quota' : formData.scholarship === '50_tvet' ? '50% TVET Grant' : formData.scholarship === 'women_stem' ? '100% Women in STEM' : 'Self-Financed'
      });

      setRefNumber(result.referenceNumber);
      setSubmitDate(new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[ApplyPage] Submission error:', err);
      setSubmitError(isKh ? 'មានបញ្ហាបច្ចេកទេសក្នុងការរក្សាទុកទិន្នន័យ។ សូមព្យាយាមម្តងទៀត។' : 'An unexpected error occurred while saving your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stepTitles = [
    { num: 1, title: isKh ? "ព័ត៌មានផ្ទាល់ខ្លួន" : "Personal Information", desc: isKh ? "ឈ្មោះ និងទំនាក់ទំនង" : "Identity & Contacts" },
    { num: 2, title: isKh ? "ប្រវត្តិការសិក្សា" : "Academic Background", desc: isKh ? "វិទ្យាល័យ និងនិទ្ទេសបាក់ឌុប" : "High School & Bac II" },
    { num: 3, title: isKh ? "ជម្រើសជំនាញ និងវេន" : "Program & Session", desc: isKh ? "មហាវិទ្យាល័យ និងម៉ោងសិក្សា" : "Major & Study Shift" },
    { num: 4, title: isKh ? "ពិនិត្យ និងដាក់ពាក្យ" : "Review & Submit", desc: isKh ? "បញ្ជាក់ និងទទួលលេខកូដ" : "Verification & Code" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      
      {/* 1. Sub-Header Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] sm:top-[76px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
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
              {isKh ? "ការចុះឈ្មោះចូលរៀន" : "Admissions"}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-blue-900 font-semibold truncate max-w-[220px] sm:max-w-xs">
              {isKh ? "ពាក្យស្នើសុំចូលរៀនអនឡាញ" : "Online Admission Application"}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isKh ? "ថយក្រោយ" : "Back to Previous"}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium border-l border-slate-200 pl-3">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Helpdesk: +855 23 888 203</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <div className="bg-[#102a54] text-white py-10 sm:py-14 border-b border-blue-900/60 relative overflow-hidden">
        {/* Subtle patterned background decoration */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academic Year 2026 - 2027</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md text-white font-medium px-3 py-1 rounded-full text-xs border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>MLVT & Government Accredited</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 font-semibold px-3 py-1 rounded-full text-xs border border-blue-400/30">
                  100% Free Official Application
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {isKh ? "ពាក្យស្នើសុំចុះឈ្មោះចូលរៀនថ្នាក់បរិញ្ញាបត្រ និងសញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យា" : "Online Admission & Enrollment Application"}
              </h1>
              
              <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
                {isKh 
                  ? "បំពេញទម្រង់ពាក្យស្នើសុំត្រឹមតែ ៣ នាទី ដើម្បីទទួលបានឱកាសអាហារូបករណ៍រដ្ឋ ១០០% និង ៥០% សម្រាប់គ្រប់ជំនាញវិស្វកម្មនៅវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT)។"
                  : "Complete your official application in approximately 3 minutes. Apply for Bachelor of Engineering (B.Eng) or Higher Diploma programs with merit scholarships and flexible day/weekend shifts."}
              </p>
            </div>

            {/* Application Quick Stats Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0 w-full md:w-auto text-xs sm:text-sm space-y-2">
              <div className="flex items-center justify-between md:justify-start gap-4">
                <span className="text-slate-300">Processing Time:</span>
                <span className="font-bold text-amber-300">24 – 48 Hours</span>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-4">
                <span className="text-slate-300">State Scholarships:</span>
                <span className="font-bold text-amber-300">100% & 50% Available</span>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-4">
                <span className="text-slate-300">Shift Options:</span>
                <span className="font-bold text-amber-300">Morning / Afternoon / Weekend</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Form Area / Success State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        
        {submitted ? (
          /* Submission Success Receipt Screen */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            <div className="text-center space-y-3 pb-6 border-b border-slate-200">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="inline-block bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-blue-200">
                Application Received Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {isKh ? "ការដាក់ពាក្យស្នើសុំត្រូវបានបញ្ជាក់ជោគជ័យ!" : "Official Application Submitted Successfully!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                {isKh 
                  ? `អរគុណបេក្ខជន ${formData.fullNameEn || formData.fullNameKh}។ ពាក្យស្នើសុំចុះឈ្មោះចូលរៀនរបស់អ្នកត្រូវបានកត់ត្រាក្នុងប្រព័ន្ធទទួលពាក្យរបស់ NPIT។`
                  : `Thank you, ${formData.fullNameEn || 'Applicant'}. Your admission registration has been successfully recorded in the NPIT Student Admissions Registry.`}
              </p>
            </div>

            {/* Official Confirmation Slip Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="NPIT Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      National Polytechnic Institute Techo Sen (NPIT)
                    </h3>
                    <p className="text-xs text-slate-500 font-khmer">
                      វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន • ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Official Reference ID</span>
                  <span className="text-base sm:text-lg font-mono font-extrabold text-[#1b4b9b] tracking-wider">
                    {refNumber}
                  </span>
                </div>
              </div>

              {/* Summary Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Applicant Name</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {formData.fullNameEn || "N/A"}
                  </span>
                  {formData.fullNameKh && (
                    <span className="text-xs font-khmer text-slate-600 block">{formData.fullNameKh}</span>
                  )}
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Engineering Major</span>
                  <span className="font-bold text-blue-900 text-sm mt-0.5 block">
                    {selectedProgramObj.name}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    {formData.degreeLevel === 'beng' ? "Bachelor of Engineering (4 Years)" : "Higher Diploma (2 Years)"}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Preferred Study Shift</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block capitalize">
                    {formData.shift} Shift
                  </span>
                  <span className="text-xs text-slate-500 block">
                    {formData.shift === 'morning' ? '7:30 AM – 11:30 AM' : formData.shift === 'afternoon' ? '1:30 PM – 5:30 PM' : 'Weekend (Sat & Sun)'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Contact Phone & Telegram</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {formData.phone || "N/A"}
                  </span>
                  <span className="text-xs text-slate-500 block">{formData.email}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Scholarship Request</span>
                  <span className="font-bold text-blue-800 text-sm mt-0.5 block">
                    {formData.scholarship === '100_state' ? '100% State Merit Scholarship' :
                     formData.scholarship === '50_tvet' ? '50% National TVET Subsidy' :
                     formData.scholarship === 'women_stem' ? 'Women in STEM Equity Grant' : 'Regular Self-Financed'}
                  </span>
                  <span className="text-xs text-slate-500 block">Subject to Bac II Verification</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-xs block">Submission Date & Status</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {submitDate}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                    <Clock className="w-3 h-3" />
                    <span>Under Review by Admissions</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Next Steps Roadmap */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{isKh ? "ជំហានបន្តបន្ទាប់បន្ទាប់ពីការដាក់ពាក្យ" : "What Happens Next? (Admission Roadmap)"}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Document Verification</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Our admissions counselors verify your academic score and high school graduation records within 24–48 hours.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Notification & Interview</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      You will receive an official notification via Telegram/SMS containing your interview date and scholarship eligibility results.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Official Enrollment</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Visit the NPIT Main Campus Admissions Office (Building A, Room 101) to collect your student handbook and student ID.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>{isKh ? "បោះពុម្ពបង្កាន់ដៃទទួលពាក្យ" : "Print Confirmation Slip"}</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`#track/${refNumber}`}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>🔍</span> {isKh ? "តាមដានស្ថានភាពពាក្យ" : "Track Status Online"}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                  {isKh ? "ដាក់ពាក្យម្តងទៀត" : "Submit Another Application"}
                </button>
                <button
                  type="button"
                  onClick={onBackHome}
                  className="bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Return to Home Page"}
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Multi-Step Interactive Form */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Step Progress Tracker Bar */}
            <div className="bg-slate-50/80 border-b border-slate-200 p-4 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {stepTitles.map((s) => {
                  const isCurrent = step === s.num;
                  const isDone = step > s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setStep(s.num)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10' 
                          : isDone 
                            ? 'bg-blue-50/50 border-blue-200 text-slate-700' 
                            : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isDone 
                            ? 'bg-blue-700 text-white' 
                            : isCurrent 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isDone ? <Check className="w-3 h-3" /> : s.num}
                        </span>
                        <span className={`text-xs font-extrabold truncate ${isCurrent ? 'text-blue-900' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                          {s.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                        {s.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={step === 4 ? handleSubmit : handleNext} className="p-6 sm:p-10 space-y-8">
              
              {/* STEP 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ១៖ ព័ត៌មានផ្ទាល់ខ្លួនរបស់បេក្ខជន" : "Step 1: Personal Identity & Contact Information"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Please enter your name exactly as it appears on your National ID or High School Examination Certificate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Full Name in Latin */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name in English (Latin Alphabet) *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. SOK CHENDA"
                          value={formData.fullNameEn}
                          onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all uppercase"
                        />
                      </div>
                    </div>

                    {/* Full Name in Khmer */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name in Khmer (ឈ្មោះជាភាសាខ្មែរ)
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="ឧទាហរណ៍៖ សុខ ចិន្តា"
                          value={formData.fullNameKh}
                          onChange={(e) => handleInputChange('fullNameKh', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm font-khmer bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender (ភេទ) *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'male', label: isKh ? 'ប្រុស (Male)' : 'Male' },
                          { id: 'female', label: isKh ? 'ស្រី (Female)' : 'Female' },
                          { id: 'other', label: isKh ? 'ផ្សេងទៀត' : 'Other' }
                        ].map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => handleInputChange('gender', g.id)}
                            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                              formData.gender === g.id
                                ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Date of Birth (ថ្ងៃខែឆ្នាំកំណើត) *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Telegram */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number (Telegram Enabled) *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="012 345 678 / 098 765 432"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">We will send admission decisions and exam notices via Telegram.</p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="applicant@student.npit.edu.kh"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Province / City */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Province / City of Origin (ខេត្ត/រាជធានីកំណើត) *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <select
                          value={formData.province}
                          onChange={(e) => handleInputChange('province', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        >
                          {provinces.map((p, idx) => (
                            <option key={idx} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Current Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Current Living Address (អាសយដ្ឋានបច្ចុប្បន្ន)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Khan Chroy Changvar, Phnom Penh"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 2: Academic Background */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ២៖ ប្រវត្តិការសិក្សា និងនិទ្ទេសបាក់ឌុប" : "Step 2: Educational Background & Bac II Records"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Information regarding your high school education, examination year, and academic track.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* High School Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        High School Attended (ឈ្មោះវិទ្យាល័យ / គ្រឹះស្ថានសិក្សា) *
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sisowath High School / វិទ្យាល័យព្រះស៊ីសុវត្ថិ"
                          value={formData.highSchool}
                          onChange={(e) => handleInputChange('highSchool', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Examination Year */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        High School Exam (Bac II) Year *
                      </label>
                      <select
                        value={formData.bacYear}
                        onChange={(e) => handleInputChange('bacYear', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                      >
                        <option value="2026">2026 (Upcoming / Current Batch)</option>
                        <option value="2025">2025 (Last Academic Year)</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023 or Earlier</option>
                        <option value="tvet">TVET Certificate Level 3 Graduate</option>
                      </select>
                    </div>

                    {/* Bac II Overall Grade */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Bac II Grade / Result *
                      </label>
                      <select
                        value={formData.bacGrade}
                        onChange={(e) => handleInputChange('bacGrade', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                      >
                        <option value="A">Grade A (និទ្ទេស A - 100% Scholarship Priority)</option>
                        <option value="B">Grade B (និទ្ទេស B - 100% Scholarship Priority)</option>
                        <option value="C">Grade C (និទ្ទេស C - 50% Scholarship Priority)</option>
                        <option value="D">Grade D (និទ្ទេស D)</option>
                        <option value="E">Grade E (និទ្ទេស E)</option>
                        <option value="awaiting">Awaiting Exam Results 2026</option>
                        <option value="tvet">TVET Technical Diploma Equivalent</option>
                      </select>
                    </div>

                    {/* High School Stream Track */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        High School Major Track (ថ្នាក់វិទ្យាសាស្ត្រ ឬសង្គម)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'science', label: 'Science Track', labelKh: 'ថ្នាក់វិទ្យាសាស្ត្រពិត (Math, Physics, Chemistry)' },
                          { id: 'social', label: 'Social Science', labelKh: 'ថ្នាក់វិទ្យាសាស្ត្រសង្គម' },
                          { id: 'tvet', label: 'TVET / Technical', labelKh: 'វិទ្យាល័យបច្ចេកទេស និងវិជ្ជាជីវៈ (C1-C3)' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleInputChange('track', t.id)}
                            className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                              formData.track === t.id
                                ? 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="block text-xs font-bold">{t.label}</span>
                            <span className="block text-[11px] text-slate-500 font-khmer mt-0.5">{t.labelKh}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3: Major, Degree Track & Study Shift */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ៣៖ ជម្រើសជំនាញវិស្វកម្ម និងវេនសិក្សា" : "Step 3: Engineering Major, Degree Track & Schedule"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Select your target degree credential, engineering department, and preferred shift.
                    </p>
                  </div>

                  {/* Degree Credential Level */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Choose Degree Level *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div 
                        onClick={() => handleInputChange('degreeLevel', 'beng')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          formData.degreeLevel === 'beng'
                            ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/10'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${formData.degreeLevel === 'beng' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Bachelor of Engineering (B.Eng)</h3>
                            <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">4 Years</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {isKh ? "ថ្នាក់បរិញ្ញាបត្រវិស្វកម្មពេញលេញ (១៣០ - ១៣៦ ក្រេឌីត) មានសិទ្ធិប្រឡងក្របខ័ណ្ឌរដ្ឋ និងគណៈវិស្វករ" : "Comprehensive engineering program (130-136 Credits) qualifying for Board of Engineers Cambodia license."}
                          </p>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleInputChange('degreeLevel', 'diploma')}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          formData.degreeLevel === 'diploma'
                            ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/10'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${formData.degreeLevel === 'diploma' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Higher Diploma of Technology</h3>
                            <span className="text-[10px] font-bold bg-slate-700 text-white px-2 py-0.5 rounded-full">2 Years</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {isKh ? "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យា (៧២ ក្រេឌីត) ការបណ្តុះបណ្តាលអនុវត្តផ្ទាល់ ៨០% អាចបន្តយកបរិញ្ញាបត្របាន" : "Practical technician diploma (72 Credits) focusing 80% on lab work with direct pathway to bridge into B.Eng."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Engineering Majors Cards */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Choose Preferred Engineering Major *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {programsList.map((prog) => {
                        const isSelected = formData.programId === prog.id;

                        return (
                          <div
                            key={prog.id}
                            onClick={() => handleInputChange('programId', prog.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-[#1b4b9b] bg-blue-50/70 shadow-sm ring-2 ring-blue-500/15'
                                : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl ${prog.cardBg} text-white shadow-xs shrink-0`}>
                              {getMajorIcon(prog.icon)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-end gap-2 min-h-[20px]">
                                {isSelected && (
                                  <span className="w-5 h-5 rounded-full bg-[#1b4b9b] text-white flex items-center justify-center">
                                    <Check className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 mt-0.5 leading-snug">
                                {isKh ? prog.shortNameKh : prog.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-khmer mt-0.5 truncate">
                                {prog.nameKhmer}
                              </p>
                              <span className="inline-block mt-2 text-[10px] text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-100">
                                {prog.faculty}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Study Shifts */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Study Session & Timing *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'morning', name: 'Morning Shift', nameKh: 'វេនព្រឹក', time: '7:30 AM – 11:30 AM', note: 'Monday – Friday' },
                        { id: 'afternoon', name: 'Afternoon Shift', nameKh: 'វេនរសៀល', time: '1:30 PM – 5:30 PM', note: 'Monday – Friday' },
                        { id: 'weekend', name: 'Weekend Shift', nameKh: 'វេនចុងសប្តាហ៍', time: '8:00 AM – 5:00 PM', note: 'Saturday & Sunday' },
                      ].map((sh) => (
                        <div
                          key={sh.id}
                          onClick={() => handleInputChange('shift', sh.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            formData.shift === sh.id
                              ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{sh.name}</span>
                            <span className="text-[10px] font-bold text-blue-600 font-khmer">{sh.nameKh}</span>
                          </div>
                          <p className="text-xs font-mono font-bold text-slate-700 mt-1">{sh.time}</p>
                          <span className="text-[11px] text-slate-500 block mt-0.5">{sh.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scholarship Request Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Scholarship & Tuition Plan *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: '100_state', title: '100% State Merit Scholarship', desc: 'Reserved for Bac II Grade A & B candidates. Full 4-year tuition covered by MLVT.' },
                        { id: '50_tvet', title: '50% National TVET Subsidy', desc: 'High-priority engineering development subsidy. 50% tuition reduction.' },
                        { id: 'women_stem', title: 'Women in STEM Equity Grant', desc: 'Special incentive scholarship encouraging female engineers in Cambodia.' },
                        { id: 'self_financed', title: 'Standard Self-Financed Tuition', desc: 'Affordable public tuition fee ($500 - $650 per academic year).' },
                      ].map((sch) => (
                        <div
                          key={sch.id}
                          onClick={() => handleInputChange('scholarship', sch.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            formData.scholarship === sch.id
                              ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                              : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="scholarship" 
                            checked={formData.scholarship === sch.id}
                            onChange={() => handleInputChange('scholarship', sch.id)}
                            className="mt-0.5 text-blue-700 focus:ring-blue-600" 
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{sch.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{sch.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 4: Review & Final Submission */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ៤៖ ផ្ទៀងផ្ទាត់ព័ត៌មាន និងការបញ្ជាក់ពាក្យ" : "Step 4: Review Information & Final Submission"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Please review all entered applicant details prior to submitting your official enrollment application.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-blue-900">
                      Applicant Summary Slip
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-400 text-xs block">Applicant Name</span>
                        <span className="font-bold text-slate-900 block mt-0.5">
                          {formData.fullNameEn || "Not provided"} {formData.fullNameKh ? `(${formData.fullNameKh})` : ''}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs block">Gender & DOB</span>
                        <span className="font-bold text-slate-900 block mt-0.5 capitalize">
                          {formData.gender} • {formData.dob || "N/A"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs block">Phone & Telegram</span>
                        <span className="font-bold text-slate-900 block mt-0.5">
                          {formData.phone || "Not provided"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs block">Selected Major</span>
                        <span className="font-bold text-blue-900 block mt-0.5">
                          {selectedProgramObj.name}
                        </span>
                        <span className="text-xs text-slate-500 block">
                          {formData.degreeLevel === 'beng' ? "Bachelor of Engineering (4y)" : "Higher Diploma (2y)"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs block">Study Shift</span>
                        <span className="font-bold text-slate-900 block mt-0.5 capitalize">
                          {formData.shift} Shift
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs block">High School & Grade</span>
                        <span className="font-bold text-slate-900 block mt-0.5">
                          {formData.highSchool || "N/A"} (Grade {formData.bacGrade})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Declarations */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreed}
                        onChange={(e) => handleInputChange('agreed', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded mt-0.5 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs text-slate-700 leading-relaxed">
                        <strong>Official Applicant Declaration:</strong> I hereby certify that the information provided in this admission application is true, accurate, and complete. I understand that any false statement may result in forfeiture of admission or state scholarship.
                      </span>
                    </label>
                  </div>

                </div>
              )}

              {/* Navigation & Submit Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Cancel Application</span>
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-[#1b4b9b] hover:bg-[#12397c] text-white font-bold px-7 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer ml-auto"
                  >
                    <span>Continue to Step {step + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.agreed || submitting}
                    className={`inline-flex items-center gap-2 font-bold px-8 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg cursor-pointer ml-auto ${
                      formData.agreed && !submitting
                        ? 'bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{isKh ? "កំពុងកត់ត្រាចូលប្រព័ន្ធ..." : "Recording in Admissions Registry..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isKh ? "ដាក់ពាក្យស្នើសុំចុះឈ្មោះផ្លូវការ" : "Submit Official Application Now"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {submitError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {submitError}
                </div>
              )}

            </form>

          </div>
        )}

      </div>

    </div>
  );
}
