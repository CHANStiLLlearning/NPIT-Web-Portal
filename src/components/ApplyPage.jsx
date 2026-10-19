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
  HardHat,
  Laptop,
  Cpu,
  Cog,
  Calendar,
  MapPin,
  HelpCircle,
  AlertCircle,
  Loader2,
  Upload,
  Camera,
  FileCheck,
  Trash2
} from 'lucide-react';
import { programsList, higherDiplomaMajors, bachelorMajors, officialAdmissionInfo } from '../data/programsData';
import { submitApplication, uploadApplicationDocument } from '../services/admissionsService';

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
    agreed: false,
    honeypot: ''
  });

  // Document Uploads State for Firebase Cloud Storage
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [bacFile, setBacFile] = useState(null);
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadedDocsInfo, setUploadedDocsInfo] = useState({
    photoName: '',
    bacName: '',
    idName: ''
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

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.fullNameEn?.trim() && !formData.fullNameKh?.trim()) {
        errs.fullName = isKh ? 'សូមបញ្ចូលឈ្មោះបេក្ខជន' : 'Please enter full name in English or Khmer';
      }
      if (!formData.phone?.trim() || formData.phone.trim().length < 8) {
        errs.phone = isKh ? 'សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (យ៉ាងហោច ៨ ខ្ទង់)' : 'Please enter a valid phone number (at least 8 digits)';
      }
      if (!formData.email?.trim() || !formData.email.includes('@')) {
        errs.email = isKh ? 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ' : 'Please enter a valid email address';
      }
      if (!formData.dob) {
        errs.dob = isKh ? 'សូមជ្រើសរើសថ្ងៃខែឆ្នាំកំណើត' : 'Please provide your date of birth';
      }
    } else if (currentStep === 2) {
      if (!formData.highSchool?.trim()) {
        errs.highSchool = isKh ? 'សូមបញ្ចូលឈ្មោះវិទ្យាល័យដែលបានបញ្ចប់' : 'Please provide your high school name';
      }
      if (!formData.bacGrade) {
        errs.bacGrade = isKh ? 'សូមជ្រើសរើសនិទ្ទេសបាក់ឌុប' : 'Please select your Bac II examination grade';
      }
    } else if (currentStep === 3) {
      if (!formData.programId) {
        errs.programId = isKh ? 'សូមជ្រើសរើសជំនាញសិក្សា' : 'Please choose an academic major';
      }
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (!validateStep(step)) {
      setSubmitError(isKh ? 'សូមបំពេញព័ត៌មានដែលចាំបាច់ (*) ក្នុងជំហាននេះជាមុនសិន។' : 'Please complete all required fields (*) before continuing.');
      return;
    }
    setSubmitError(null);
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleStepSelect = (targetStep) => {
    if (targetStep <= step) {
      setStep(targetStep);
      return;
    }
    for (let s = 1; s < targetStep; s++) {
      if (!validateStep(s)) {
        setStep(s);
        setSubmitError(isKh ? `សូមបំពេញព័ត៌មានដែលចាំបាច់ក្នុងជំហានទី ${s} ជាមុនសិន។` : `Please complete required fields in Step ${s} before continuing.`);
        return;
      }
    }
    setSubmitError(null);
    setStep(targetStep);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    for (let s = 1; s <= 3; s++) {
      if (!validateStep(s)) {
        setStep(s);
        setSubmitError(isKh ? `សូមបំពេញព័ត៌មានចាំបាច់ក្នុងជំហានទី ${s} ជាមុនសិន។` : `Please complete required fields in Step ${s} before submitting.`);
        return;
      }
    }

    if (!formData.agreed) {
      setSubmitError(isKh ? 'សូមធីកយល់ព្រមលើសេចក្តីប្រកាសផ្លូវការរបស់បេក្ខជន' : 'Please check the applicant declaration agreement to proceed.');
      return;
    }

    // Security: Anti-bot honeypot check
    if (formData.honeypot) {
      console.warn('[Security] Automated spam submission filtered.');
      setRefNumber('NPIT-2026-APP-999999');
      setSubmitDate(new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setUploadStatusText(isKh ? 'កំពុងរៀបចំការតភ្ជាប់...' : 'Preparing connection...');

    try {
      const tempRef = `NPIT-2026-APP-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Upload files to Firebase Cloud Storage if selected
      let photoData = { url: '', name: '' };
      let bacData = { url: '', name: '' };
      let idData = { url: '', name: '' };

      if (photoFile) {
        setUploadStatusText(isKh ? 'កំពុងបញ្ចូលរូបថត ៤x៦ ទៅ Cloud Storage...' : 'Uploading portrait photo to Cloud Storage...');
        photoData = await uploadApplicationDocument(photoFile, tempRef, 'photo');
      }

      if (bacFile) {
        setUploadStatusText(isKh ? 'កំពុងបញ្ចូលសញ្ញាបត្របាក់ឌុប...' : 'Uploading Bac II Certificate...');
        bacData = await uploadApplicationDocument(bacFile, tempRef, 'bac_certificate');
      }

      if (nationalIdFile) {
        setUploadStatusText(isKh ? 'កំពុងបញ្ចូលអត្តសញ្ញាណប័ណ្ណ...' : 'Uploading National ID / Birth Certificate...');
        idData = await uploadApplicationDocument(nationalIdFile, tempRef, 'national_id');
      }

      setUploadedDocsInfo({
        photoName: photoData.name || (photoFile ? photoFile.name : ''),
        bacName: bacData.name || (bacFile ? bacFile.name : ''),
        idName: idData.name || (nationalIdFile ? nationalIdFile.name : '')
      });

      setUploadStatusText(isKh ? 'កំពុងរក្សាទុកព័ត៌មានពាក្យសុំ...' : 'Saving application dossier...');

      const result = await submitApplication({
        fullName: formData.fullNameEn || formData.fullNameKh || 'Applicant',
        fullNameKhmer: formData.fullNameKh,
        gender: formData.gender,
        dob: formData.dob,
        phone: formData.phone || '',
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
        scholarshipQuotaPercent: formData.scholarship === '100_state' ? '100% State Quota' : formData.scholarship === '50_tvet' ? '50% TVET Grant' : formData.scholarship === 'women_stem' ? '100% Women in STEM' : 'Self-Financed',
        documents: {
          photoUrl: photoData.url,
          photoName: photoData.name,
          bacCertificateUrl: bacData.url,
          bacCertificateName: bacData.name,
          nationalIdUrl: idData.url,
          nationalIdName: idData.name
        }
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
      setUploadStatusText('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stepTitles = [
    { num: 1, title: isKh ? "ព័ត៌មានផ្ទាល់ខ្លួន" : "Personal Information", desc: isKh ? "ឈ្មោះ និងទំនាក់ទំនង" : "Identity & Contacts" },
    { num: 2, title: isKh ? "ប្រវត្តិការសិក្សា" : "Academic Background", desc: isKh ? "វិទ្យាល័យ និងនិទ្ទេសបាក់ឌុប" : "High School & Bac II" },
    { num: 3, title: isKh ? "ជម្រើសជំនាញ និងវេន" : "Program & Session", desc: isKh ? "មហាវិទ្យាល័យ និងម៉ោងសិក្សា" : "Major & Study Shift" },
    { num: 4, title: isKh ? "ឯកសារភ្ជាប់ និងរូបថត" : "Documents & Photo", desc: isKh ? "រូបថត ៤x៦ និងសញ្ញាបត្រ" : "Photo & Bac II Slip" },
    { num: 5, title: isKh ? "ពិនិត្យ និងដាក់ពាក្យ" : "Review & Submit", desc: isKh ? "បញ្ជាក់ និងទទួលលេខកូដ" : "Verification & Code" },
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

                <div className="p-3 bg-white rounded-xl border border-slate-200 sm:col-span-2 md:col-span-3">
                  <span className="text-slate-400 text-xs block mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                    Firebase Cloud Storage Documents
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                      uploadedDocsInfo.photoName ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Camera className="w-3.5 h-3.5" />
                      {uploadedDocsInfo.photoName ? `Photo: ${uploadedDocsInfo.photoName}` : 'Photo: Submit in Person'}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                      uploadedDocsInfo.bacName ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <GraduationCap className="w-3.5 h-3.5" />
                      {uploadedDocsInfo.bacName ? `Bac II: ${uploadedDocsInfo.bacName}` : 'Bac II: Submit in Person'}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                      uploadedDocsInfo.idName ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {uploadedDocsInfo.idName ? `National ID: ${uploadedDocsInfo.idName}` : 'National ID: Submit in Person'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Next Steps Roadmap */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {stepTitles.map((s) => {
                  const isCurrent = step === s.num;
                  const isDone = step > s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => handleStepSelect(s.num)}
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
            <form onSubmit={step === 5 ? handleSubmit : handleNext} className="p-6 sm:p-10 space-y-8">
              
              {/* Security Honeypot Anti-Bot Field (Hidden from real users) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="sys_campus_code">Campus Code</label>
                <input
                  type="text"
                  id="sys_campus_code"
                  name="sys_campus_code"
                  value={formData.honeypot || ''}
                  onChange={(e) => handleInputChange('honeypot', e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

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
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all uppercase ${
                            formErrors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">{formErrors.fullName}</p>
                      )}
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
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                            formErrors.dob ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.dob && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">{formErrors.dob}</p>
                      )}
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
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                            formErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">{formErrors.phone}</p>
                      )}
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
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                            formErrors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">{formErrors.email}</p>
                      )}
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
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                            formErrors.highSchool ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.highSchool && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">{formErrors.highSchool}</p>
                      )}
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
                      {isKh ? "ជំហានទី ៣៖ ជម្រើសជំនាញបណ្តុះបណ្តាល និងវេនសិក្សា" : "Step 3: Program Major, Degree Track & Schedule"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {isKh 
                        ? "ជ្រើសរើសកម្រិតសញ្ញាបត្រ មុខជំនាញដែលចង់សិក្សា និងវេនសិក្សាស្របតាមសេចក្តីប្រកាសផ្លូវការរបស់ក្រសួង។" 
                        : "Select your target credential, official major from MLVT/NPIT announcement, and preferred shift."}
                    </p>
                  </div>

                  {/* Official Admission Notice Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-blue-700/40">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase">
                        <Award className="w-3.5 h-3.5" />
                        <span>{isKh ? "អាហារូបករណ៍ ១០០% (ជាប់ ឬធ្លាក់បាក់ឌុប)" : "100% Scholarship (Pass/Fail Bac II)"}</span>
                      </div>
                      <p className="text-xs text-blue-100 font-khmer">
                        {isKh ? "កាលបរិច្ឆេទចូលរៀនផ្លូវការ៖ លើកទី១: ១៣ វិច្ឆិកា ២០២៦ | លើកទី២: ០៤ មករា ២០២៧" : "Official Class Starts: Batch 1: Nov 13, 2026 | Batch 2: Jan 04, 2027"}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-amber-300 font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 w-fit">
                      Hotline: 098 444 495 / 092 735 263
                    </span>
                  </div>

                  {/* Degree Credential Level */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isKh ? "ជ្រើសរើសកម្រិតសិក្សា *" : "Choose Degree Level *"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 1. Higher Diploma (2 Years - 100% Scholarship) */}
                      <div 
                        onClick={() => {
                          handleInputChange('degreeLevel', 'diploma');
                          handleInputChange('programId', 'industrial');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          formData.degreeLevel === 'diploma'
                            ? 'border-[#002b80] bg-blue-50/50 ring-1 ring-[#002b80]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${formData.degreeLevel === 'diploma' ? 'bg-[#002b80] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <GraduationCap className="w-5 h-5 font-bold" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                              {isKh ? "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស" : "Higher Diploma of Technology"}
                            </h3>
                            <span className="text-[10px] font-semibold bg-[#002b80] text-white px-2 py-0.5 rounded-full">
                              {isKh ? "២ ឆ្នាំ • អាហារូបករណ៍ ១០០%" : "2 Years • 100% Free"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-khmer mt-1 leading-relaxed">
                            {isKh 
                              ? "សិក្សា ២ឆ្នាំ (៩ មុខជំនាញ) • លក្ខខណ្ឌ៖ ជាប់ ឬធ្លាក់បាក់ឌុប ក៏ទទួលបានអាហារូបករណ៍ ១០០% ពីរដ្ឋាភិបាល" 
                              : "2-Year technical study across 9 majors. Both passed or failed Bac II graduates receive 100% scholarship."}
                          </p>
                        </div>
                      </div>

                      {/* 2. Bachelor of Technology (4 Years - Fee-Paying Night & Weekend) */}
                      <div 
                        onClick={() => {
                          handleInputChange('degreeLevel', 'beng');
                          handleInputChange('programId', 'cybersecurity');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          formData.degreeLevel === 'beng'
                            ? 'border-[#002b80] bg-blue-50/50 ring-1 ring-[#002b80]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${formData.degreeLevel === 'beng' ? 'bg-[#002b80] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                              {isKh ? "បរិញ្ញាបត្របច្ចេកទេស" : "Bachelor of Technology (B.Tech)"}
                            </h3>
                            <span className="text-[10px] font-semibold bg-slate-800 text-white px-2 py-0.5 rounded-full">
                              {isKh ? "៤ ឆ្នាំ • ថ្នាក់បង់ថ្លៃ" : "4 Years • Regular"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-khmer mt-1 leading-relaxed">
                            {isKh 
                              ? "សិក្សា ៤ឆ្នាំ (៥ មុខជំនាញ) • វេនយប់ និង ថ្ងៃសៅរ៍-អាទិត្យ សម្រាប់សិស្សទូទៅ និងបុគ្គលិកកំពុងបំពេញការងារ" 
                              : "4-Year degree across 5 engineering majors. Evening & Saturday-Sunday weekend shifts available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Official Majors List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {formData.degreeLevel === 'diploma'
                          ? (isKh ? "ជ្រើសរើសជំនាញសញ្ញាបត្រជាន់ខ្ពស់ ២ឆ្នាំ (៩ ជំនាញ) *" : "Select Higher Diploma Major (9 Official Majors) *")
                          : (isKh ? "ជ្រើសរើសជំនាញបរិញ្ញាបត្របច្ចេកទេស ៤ឆ្នាំ (៥ ជំនាញ) *" : "Select Bachelor Major (5 Official Majors) *")
                        }
                      </label>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {formData.degreeLevel === 'diploma' ? (isKh ? "អាហារូបករណ៍ ១០០%" : "100% Free Tuition") : (isKh ? "វេនយប់ & ចុងសប្តាហ៍" : "Night & Weekend")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {(formData.degreeLevel === 'diploma' ? higherDiplomaMajors : bachelorMajors).map((prog, idx) => {
                        const isSelected = formData.programId === prog.id;

                        return (
                          <div
                            key={prog.id}
                            onClick={() => handleInputChange('programId', prog.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? 'border-[#002b80] bg-blue-50/60 shadow-xs ring-1 ring-[#002b80]/15'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-[#002b80] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              {prog.num || idx + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug font-khmer">
                                  {isKh ? prog.nameKhmer : prog.name}
                                </h3>
                                {isSelected && (
                                  <span className="w-4 h-4 rounded-full bg-[#002b80] text-white flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {isKh ? prog.name : prog.nameKhmer}
                              </p>
                              <span className="inline-block mt-1.5 text-[10px] text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-100">
                                {isKh ? prog.facultyKh : prog.faculty}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Study Shifts with Official Evening and Weekend Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isKh ? "ជ្រើសរើសវេនសិក្សា *" : "Preferred Study Session & Timing *"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { id: 'morning', name: 'Morning Shift', nameKh: 'វេនព្រឹក', time: '7:30 AM – 11:30 AM', note: isKh ? 'ចន្ទ – សុក្រ' : 'Mon – Fri' },
                        { id: 'afternoon', name: 'Afternoon Shift', nameKh: 'វេនរសៀល', time: '1:30 PM – 5:30 PM', note: isKh ? 'ចន្ទ – សុក្រ' : 'Mon – Fri' },
                        { id: 'evening', name: 'Evening Shift', nameKh: 'វេនយប់', time: '5:30 PM – 8:30 PM', note: isKh ? 'ចន្ទ – សុក្រ (ថ្នាក់បង់ថ្លៃ)' : 'Mon – Fri (Degree)' },
                        { id: 'weekend', name: 'Weekend Shift', nameKh: 'វេនសៅរ៍-អាទិត្យ', time: '8:00 AM – 5:00 PM', note: isKh ? 'សៅរ៍ និង អាទិត្យ' : 'Sat & Sun' },
                      ].map((sh) => (
                        <div
                          key={sh.id}
                          onClick={() => handleInputChange('shift', sh.id)}
                          className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                            formData.shift === sh.id
                              ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{isKh ? sh.nameKh : sh.name}</span>
                            <span className="text-[10px] font-bold text-blue-600 font-khmer">{isKh ? sh.name : sh.nameKh}</span>
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
                      {isKh ? "គម្រោងអាហារូបករណ៍ ឬការបង់ថ្លៃសិក្សា *" : "Scholarship & Tuition Plan *"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { 
                          id: '100_state', 
                          title: isKh ? 'អាហារូបករណ៍រដ្ឋ ១០០% (ជាប់ ឬធ្លាក់បាក់ឌុប)' : '100% Free State Scholarship (Bac II Pass/Fail)', 
                          desc: isKh ? 'អាហារូបករណ៍ពេញលេញ ១០០% ឥតគិតថ្លៃសម្រាប់ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកទេស (សិក្សា ២ឆ្នាំ)។' : 'Full 100% free tuition for 2-Year Higher Diploma under national TVET program.' 
                        },
                        { 
                          id: 'self_financed', 
                          title: isKh ? 'ថ្នាក់បង់ថ្លៃ (វេនយប់ ឬ ចុងសប្តាហ៍)' : 'Regular Fee-Paying (Evening / Weekend)', 
                          desc: isKh ? 'សម្រាប់ថ្នាក់បរិញ្ញាបត្របច្ចេកទេស ៤ឆ្នាំ (វេនយប់ ឬថ្ងៃសៅរ៍-អាទិត្យ) តម្លៃសមរម្យ។' : 'For 4-Year Bachelor of Technology degrees with flexible scheduling.' 
                        },
                        { 
                          id: 'women_stem', 
                          title: isKh ? 'អាទិភាពសិស្សនារីក្នុងវិស័យវិស្វកម្ម' : 'Women in STEM Equity Grant', 
                          desc: isKh ? 'កូតាពិសេសលើកទឹកចិត្តសិស្សនារីចុះឈ្មោះសិក្សាផ្នែកបច្ចេកវិទ្យា និងវិស្វកម្ម។' : 'Special quota encouraging female engineers with mentoring support.' 
                        },
                        { 
                          id: '50_tvet', 
                          title: isKh ? 'អាហារូបករណ៍សមធម៌ និងបណ្តាខេត្ត' : 'Provincial & Equity Assistance', 
                          desc: isKh ? 'ជំនួយឧបត្ថម្ភកន្លែងស្នាក់នៅក្នុងអន្តេវាសិកដ្ឋានសម្រាប់សិស្សមកពីបណ្តាខេត្ត។' : 'Dormitory priority and financial assistance for provincial applicants.' 
                        },
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

              {/* STEP 4: Upload Required Documents & Photo to Firebase Storage */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold mb-2">
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Google Firebase Cloud Storage</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ៤៖ ឯកសារភ្ជាប់ និងរូបថតបេក្ខជន" : "Step 4: Required Documents & Photo Upload"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {isKh 
                        ? "សូមភ្ជាប់រូបថត ៤x៦ សញ្ញាបត្រ ឬលិខិតបញ្ជាក់បាក់ឌុប និងអត្តសញ្ញាណប័ណ្ណ (JPG, PNG, PDF ទំហំអតិបរមា 10MB)។"
                        : "Upload your ID photo, Bac II Examination Certificate, and National ID/Birth Certificate to secure cloud storage."}
                    </p>
                  </div>

                  {/* 3 Upload Dropzones */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* 1. Student Photo (4x6) */}
                    <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                            <Camera className="w-4 h-4 text-blue-600" />
                            {isKh ? "រូបថត ៤x៦ (Photo)" : "Portrait Photo (4x6)"}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">JPG, PNG</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {isKh ? "រូបថតសម្លៀកបំពាក់សមរម្យ ផ្ទៃខៀវ/ស សម្រាប់ធ្វើកាតនិស្សិត" : "Official formal portrait for student ID card"}
                        </p>
                      </div>

                      {photoPreview ? (
                        <div className="relative group mx-auto w-32 h-40 rounded-xl overflow-hidden border-2 border-blue-600 shadow-md bg-slate-100">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                            className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-700 transition cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-xl p-5 text-center cursor-pointer hover:bg-blue-50/30 transition block">
                          <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                          <span className="text-xs font-bold text-blue-700 block">
                            {isKh ? "ជ្រើសរើសរូបថត ៤x៦" : "Browse Portrait Photo"}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Click or drag & drop</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setPhotoFile(file);
                                setPhotoPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </label>
                      )}

                      {photoFile && (
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{photoFile.name}</span>
                        </div>
                      )}
                    </div>

                    {/* 2. Bac II Examination Certificate */}
                    <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            {isKh ? "សញ្ញាបត្របាក់ឌុប" : "Bac II Certificate"}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">PDF, JPG</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {isKh ? "សញ្ញាបត្របណ្តោះអាសន្ន ឬលិខិតបញ្ជាក់និទ្ទេសបាក់ឌុប" : "High school diploma, provisional slip, or TVET level 3 certificate"}
                        </p>
                      </div>

                      {bacFile ? (
                        <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileCheck className="w-6 h-6 text-blue-700 shrink-0" />
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-900 truncate block">{bacFile.name}</span>
                              <span className="text-[10px] text-slate-500">{(bacFile.size / 1024).toFixed(0)} KB</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setBacFile(null)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-xl p-5 text-center cursor-pointer hover:bg-blue-50/30 transition block">
                          <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                          <span className="text-xs font-bold text-blue-700 block">
                            {isKh ? "ជ្រើសរើសឯកសារបាក់ឌុប" : "Browse Bac II Document"}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">PDF or image file</span>
                          <input
                            type="file"
                            accept=".pdf, image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setBacFile(file);
                            }}
                          />
                        </label>
                      )}

                      {bacFile && (
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{bacFile.name}</span>
                        </div>
                      )}
                    </div>

                    {/* 3. National ID Card or Birth Certificate */}
                    <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                            {isKh ? "អត្តសញ្ញាណប័ណ្ណ" : "National ID / Birth Cert"}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">PDF, JPG</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {isKh ? "ច្បាប់ចម្លងអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ ឬសំបុត្រកំណើត" : "Front scan of Cambodian National ID card or Birth Certificate"}
                        </p>
                      </div>

                      {nationalIdFile ? (
                        <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileCheck className="w-6 h-6 text-blue-700 shrink-0" />
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-900 truncate block">{nationalIdFile.name}</span>
                              <span className="text-[10px] text-slate-500">{(nationalIdFile.size / 1024).toFixed(0)} KB</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNationalIdFile(null)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-xl p-5 text-center cursor-pointer hover:bg-blue-50/30 transition block">
                          <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                          <span className="text-xs font-bold text-blue-700 block">
                            {isKh ? "ជ្រើសរើសអត្តសញ្ញាណប័ណ្ណ" : "Browse National ID / PDF"}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">PDF or image file</span>
                          <input
                            type="file"
                            accept=".pdf, image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setNationalIdFile(file);
                            }}
                          />
                        </label>
                      )}

                      {nationalIdFile && (
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{nationalIdFile.name}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Optional Note */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800">{isKh ? "ឯកសារអាចភ្ជាប់នៅពេលក្រោយបាន៖ " : "Optional during initial registration: "}</strong>
                      {isKh 
                        ? "ប្រសិនបើមិនទាន់មានឯកសារស្កេននៅពេលនេះ លោកអ្នកអាចចុចបន្ត ហើយយកឯកសារច្បាប់ដើមមកបង្ហាញនៅថ្ងៃចុះឈ្មោះផ្ទាល់នៅវិទ្យាស្ថាន។" 
                        : "If you don't have scanned files right now, you may continue and submit original documents in person during on-campus enrollment."}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Final Submission */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {isKh ? "ជំហានទី ៥៖ ផ្ទៀងផ្ទាត់ព័ត៌មាន និងការបញ្ជាក់ពាក្យ" : "Step 5: Review Information & Final Submission"}
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

                      <div className="sm:col-span-2 md:col-span-3 pt-2 border-t border-slate-200">
                        <span className="text-slate-400 text-xs block mb-1">Attached Documents for Cloud Upload:</span>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                          <span className={`px-2.5 py-1 rounded-md ${photoFile ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                            📷 {photoFile ? `Photo: ${photoFile.name}` : 'Photo: None (In-Person)'}
                          </span>
                          <span className={`px-2.5 py-1 rounded-md ${bacFile ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                            🎓 {bacFile ? `Bac II: ${bacFile.name}` : 'Bac II: None (In-Person)'}
                          </span>
                          <span className={`px-2.5 py-1 rounded-md ${nationalIdFile ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                            🪪 {nationalIdFile ? `National ID: ${nationalIdFile.name}` : 'National ID: None (In-Person)'}
                          </span>
                        </div>
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

                {step < 5 ? (
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
                        <span>{uploadStatusText || (isKh ? "កំពុងកត់ត្រាចូលប្រព័ន្ធ..." : "Recording in Admissions Registry...")}</span>
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
