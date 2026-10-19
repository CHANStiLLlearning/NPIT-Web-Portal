import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Award, 
  Calendar, 
  User, 
  GraduationCap, 
  Building2, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { getApplicationByReference } from '../services/admissionsService';
import { getInquiryByReference } from '../services/inquiryService';

export default function TrackerPage({ lang = 'en', onNavigate, initialCode = '' }) {
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState('application'); // 'application' | 'inquiry'
  const [error, setError] = useState(null);

  // If initialCode provided, search automatically
  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (codeToSearch) => {
    const queryCode = (codeToSearch || trackingCode || '').trim().toUpperCase();
    if (!queryCode) {
      setError(lang === 'kh' ? 'សូមបញ្ចូលលេខកូដតាមដានផ្លូវការ' : 'Please enter your tracking reference code.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Check if application
      const app = await getApplicationByReference(queryCode);
      if (app) {
        setResult(app);
        setResultType('application');
        setLoading(false);
        return;
      }

      // 2. Check if inquiry
      const inq = await getInquiryByReference(queryCode);
      if (inq) {
        setResult(inq);
        setResultType('inquiry');
        setLoading(false);
        return;
      }

      // 3. Not found
      setError(
        lang === 'kh'
          ? `រកមិនឃើញទិន្នន័យសម្រាប់លេខកូដ "${queryCode}" ទេ។ សូមពិនិត្យលេខកូដឡើងវិញ។`
          : `No record found matching code "${queryCode}". Please verify your reference number.`
      );
    } catch (err) {
      console.error('[Tracker] Search error:', err);
      setError(
        lang === 'kh'
          ? 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យ។ សូមព្យាយាមម្តងទៀត។'
          : 'Unable to retrieve record from server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'approved':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300',
          icon: CheckCircle2,
          text: lang === 'kh' ? 'ត្រូវបានអនុម័តទទួល' : 'Officially Accepted',
          step: 4
        };
      case 'interview_scheduled':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: Calendar,
          text: lang === 'kh' ? 'បានកំណត់កាលវិភាគសម្ភាសន៍' : 'Interview Scheduled',
          step: 3
        };
      case 'under_review':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-300',
          icon: Clock,
          text: lang === 'kh' ? 'កំពុងស្ថិតក្នុងការពិនិត្យ' : 'Under Committee Review',
          step: 2
        };
      case 'waitlist':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-300',
          icon: AlertCircle,
          text: lang === 'kh' ? 'ក្នុងបញ្ជីរង់ចាំ' : 'Waiting List',
          step: 2
        };
      default:
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-300',
          icon: Clock,
          text: lang === 'kh' ? 'បានទទួលពាក្យ - រង់ចាំការពិនិត្យ' : 'Submitted & Logged',
          step: 1
        };
    }
  };

  const statusInfo = result ? getStatusBadge(result.status) : null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002b80]/10 text-[#002b80] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            {lang === 'kh' ? 'ប្រព័ន្ធតាមដានពាក្យសុំផ្លូវការ' : 'Official Application Verification System'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002b80] font-serif">
            {lang === 'kh' ? 'តាមដានស្ថានភាពពាក្យសុំចូលរៀន' : 'Application & Admission Status Tracker'}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            {lang === 'kh' 
              ? 'បញ្ចូលលេខកូដយោង (ឧទាហរណ៍៖ NPIT-2026-APP-XXXXXX) ដើម្បីពិនិត្យស្ថានភាពចូលរៀន អាហារូបករណ៍ និងការណែនាំផ្លូវការពីវិទ្យាស្ថាន។' 
              : 'Enter your tracking reference code to check your real-time admission verification, scholarship approval status, and faculty committee instructions.'}
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder={lang === 'kh' ? 'បញ្ចូលលេខកូដ ឧ. NPIT-2026-APP-123456' : 'Enter Tracking Code e.g. NPIT-2026-APP-123456'}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#002b80] focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#002b80] hover:bg-[#001a4d] text-white font-bold rounded-xl text-sm transition shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {lang === 'kh' ? 'កំពុងស្វែងរក...' : 'Searching...'}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {lang === 'kh' ? 'ស្វែងរក' : 'Check Status'}
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>
              {lang === 'kh' ? '💡 មិនចាំលេខកូដ?' : '💡 Lost your tracking code?'}
            </span>
            <span className="text-slate-400">
              {lang === 'kh' 
                ? 'សូមទាក់ទងមកការិយាល័យសិក្សា តាមលេខទូរស័ព្ទ 012 345 678' 
                : 'Contact the Academic Affairs Office at +855 (0) 53 952 999'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
            <div className="text-sm">
              <p className="font-semibold">{error}</p>
              <p className="mt-1 text-xs text-red-600">
                {lang === 'kh' 
                  ? 'សូមពិនិត្យមើលសារដែលបានផ្ញើទៅអ៊ីមែលរបស់អ្នក ឬចុចដាក់ពាក្យចូលរៀនថ្មី។' 
                  : 'Please check your application confirmation receipt or apply online if you have not registered yet.'}
              </p>
            </div>
          </div>
        )}

        {/* Result Card: Application */}
        {result && resultType === 'application' && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden print:shadow-none print:border-none">
            
            {/* Header Strip */}
            <div className="bg-gradient-to-r from-[#002b80] to-[#001a4d] px-6 py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  <Award className="w-4 h-4" />
                  {lang === 'kh' ? 'ប័ណ្ណបញ្ជាក់ពាក្យសុំផ្លូវការ' : 'Official Application Verification Slip'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-wider mt-1">
                  {result.referenceNumber}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  {lang === 'kh' ? 'កាលបរិច្ឆេទដាក់ពាក្យ៖ ' : 'Submission Date: '}
                  {new Date(result.submittedAt || Date.now()).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Status Pill */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-sm ${statusInfo.bg}`}>
                <statusInfo.icon className="w-4 h-4" />
                <span>{lang === 'kh' ? result.statusLabelKh || statusInfo.text : result.statusLabel || statusInfo.text}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="px-6 py-8 border-b border-slate-100 bg-slate-50/50">
              <div className="max-w-2xl mx-auto">
                <div className="relative flex justify-between items-center">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
                  
                  {/* Step 1 */}
                  <div className="relative z-10 text-center">
                    <div className="w-8 h-8 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm">
                      ✓
                    </div>
                    <span className="block text-xs font-bold text-slate-800 mt-2">
                      {lang === 'kh' ? 'បានដាក់ពាក្យ' : 'Submitted'}
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="relative z-10 text-center">
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm ${
                      statusInfo.step >= 2 ? 'bg-[#002b80] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      2
                    </div>
                    <span className="block text-xs font-bold text-slate-700 mt-2">
                      {lang === 'kh' ? 'ពិនិត្យឯកសារ' : 'Verification'}
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 text-center">
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm ${
                      statusInfo.step >= 3 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      3
                    </div>
                    <span className="block text-xs font-bold text-slate-700 mt-2">
                      {lang === 'kh' ? 'សម្ភាសន៍/វាយតម្លៃ' : 'Evaluation'}
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="relative z-10 text-center">
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm ${
                      statusInfo.step >= 4 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      ★
                    </div>
                    <span className="block text-xs font-bold text-slate-700 mt-2">
                      {lang === 'kh' ? 'អនុម័តផ្លូវការ' : 'Accepted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant & Academic Details Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Applicant Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#002b80] mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#d4af37]" />
                  {lang === 'kh' ? 'ព័ត៌មានបេក្ខជន' : 'Applicant Credentials'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'ឈ្មោះជាអក្សរឡាតាំង' : 'Full Name (Latin)'}</span>
                    <span className="font-semibold text-slate-800">{result.applicant?.fullName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'ឈ្មោះជាភាសាខ្មែរ' : 'Full Name (Khmer)'}</span>
                    <span className="font-semibold text-slate-800">{result.applicant?.fullNameKhmer || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'លេខទូរស័ព្ទ' : 'Phone Number'}</span>
                    <span className="font-semibold text-slate-800">{result.applicant?.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'អ៊ីមែល' : 'Email Address'}</span>
                    <span className="font-semibold text-slate-800">{result.applicant?.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'ខេត្ត/ក្រុង' : 'Province / City'}</span>
                    <span className="font-semibold text-slate-800">{result.applicant?.province || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'ភេទ' : 'Gender'}</span>
                    <span className="font-semibold text-slate-800 capitalize">{result.applicant?.gender || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Program & Scholarship */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#002b80] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#d4af37]" />
                  {lang === 'kh' ? 'ជំនាញដែលបានជ្រើសរើស និងអាហារូបករណ៍' : 'Academic Program & Scholarship Allocation'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'ដេប៉ាតឺម៉ង់ / ជំនាញ' : 'Department'}</span>
                    <span className="font-bold text-[#002b80] capitalize">
                      {result.programSelection?.programId?.replace('-', ' ') || 'Engineering'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'កម្រិតសញ្ញាបត្រ' : 'Degree Level'}</span>
                    <span className="font-semibold text-slate-800">{result.programSelection?.degreeType || 'Bachelor (4 Years)'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'វេនសិក្សា' : 'Study Shift'}</span>
                    <span className="font-semibold text-slate-800">{result.programSelection?.shift || 'Morning'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'អាហារូបករណ៍រដ្ឋ' : 'Scholarship Category'}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-800">
                      <Award className="w-3.5 h-3.5" />
                      {result.scholarship?.applied ? (result.scholarship?.category || '100% State Quota') : 'Full Self-Funded'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'និទ្ទេសបាក់ឌុប (Bac II)' : 'Bac II Grade'}</span>
                    <span className="font-extrabold text-[#d32f2f] text-base">
                      Grade {result.academic?.bacIIGrade || 'N/A'} ({result.academic?.bacIITrack || 'Science'})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'kh' ? 'វិទ្យាល័យដែលបានបញ្ចប់' : 'High School'}</span>
                    <span className="font-semibold text-slate-800">{result.academic?.highSchoolName || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Cloud Uploaded Documents */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#002b80] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#d4af37]" />
                  {lang === 'kh' ? 'ឯកសារភ្ជាប់ដែលបានបញ្ចូលក្នុងប្រព័ន្ធ' : 'Verified Cloud Documents & Credentials'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                    {result.documents?.photoUrl ? (
                      <img src={result.documents.photoUrl} alt="Photo" className="w-10 h-12 object-cover rounded border border-slate-200 shadow-2xs" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">ID</div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Student Photo</span>
                      <span className={`text-[10px] font-bold ${result.documents?.photoUrl ? 'text-amber-800' : 'text-slate-500'}`}>
                        {result.documents?.photoUrl ? '✓ Stored in Cloud' : 'To submit on campus'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">BAC</div>
                    <div className="truncate">
                      <span className="text-xs font-bold text-slate-800 block">Bac II Slip</span>
                      <span className={`text-[10px] font-bold ${result.documents?.bacCertificateUrl ? 'text-amber-800' : 'text-slate-500'}`}>
                        {result.documents?.bacCertificateUrl ? '✓ Stored in Cloud' : 'To submit on campus'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">DOC</div>
                    <div className="truncate">
                      <span className="text-xs font-bold text-slate-800 block">National ID</span>
                      <span className={`text-[10px] font-bold ${result.documents?.nationalIdUrl ? 'text-amber-800' : 'text-slate-500'}`}>
                        {result.documents?.nationalIdUrl ? '✓ Stored in Cloud' : 'To submit on campus'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Committee Notes (if any) */}
              {result.adminNotes && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
                  <span className="font-bold text-[#002b80] block mb-1">
                    {lang === 'kh' ? 'កំណត់សម្គាល់ពីគណៈកម្មការសិក្សា៖' : 'Academic Committee Instructions:'}
                  </span>
                  <p className="text-slate-700">{result.adminNotes}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition shadow-sm"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  {lang === 'kh' ? 'បោះពុម្ពប័ណ្ណបញ្ជាក់' : 'Print Official Slip'}
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('contact')}
                    className="text-sm font-semibold text-[#002b80] hover:underline"
                  >
                    {lang === 'kh' ? 'ទាក់ទងមកវិទ្យាស្ថាន' : 'Campus Inquiries'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('apply')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002b80] hover:bg-[#001a4d] text-white font-bold rounded-xl text-sm transition shadow-sm"
                  >
                    {lang === 'kh' ? 'ដាក់ពាក្យថ្មី' : 'Submit Another Application'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Result Card: General Inquiry */}
        {result && resultType === 'inquiry' && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#002b80] to-[#001a4d] px-6 py-6 text-white flex justify-between items-center">
              <div>
                <span className="text-xs uppercase text-[#d4af37] font-semibold tracking-wider">
                  Campus Helpdesk Inquiry
                </span>
                <h2 className="text-xl font-bold font-mono mt-1">{result.referenceNumber}</h2>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-bold">
                Logged & Dispatched
              </span>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Sender Name</span>
                <span className="font-bold text-slate-800">{result.fullName || result.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Contact Phone / Email</span>
                <span className="text-slate-800">{result.phone || result.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Message Content</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 mt-1">
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
