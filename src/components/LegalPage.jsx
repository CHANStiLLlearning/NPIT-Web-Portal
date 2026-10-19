import React, { useState } from 'react';
import { ShieldCheck, FileText, ArrowLeft, Printer, Lock, CheckCircle, ExternalLink } from 'lucide-react';

export default function LegalPage({ lang = 'en', initialTab = 'privacy', onBackHome }) {
  const isKh = lang === 'kh';
  const [activeTab, setActiveTab] = useState(initialTab); // 'privacy' | 'terms'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] sm:top-[76px] z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isKh ? "ទំព័រដើម" : "Home"}</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">
              {activeTab === 'privacy' 
                ? (isKh ? "គោលការណ៍ឯកជនភាព" : "Privacy Policy") 
                : (isKh ? "លក្ខខណ្ឌប្រើប្រាស់" : "Terms of Service")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isKh ? "បោះពុម្ព" : "Print"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#002b80] to-[#001f5c] text-white py-12 px-4 sm:px-6 border-b border-blue-900">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-4 border border-white/15">
            <ShieldCheck className="w-4 h-4" />
            <span>National Polytechnic Institute Techo Sen (NPIT) Legal & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {activeTab === 'privacy' 
              ? (isKh ? "គោលការណ៍ឯកជនភាព និងសុវត្ថិភាពទិន្នន័យ" : "Privacy & Data Protection Policy") 
              : (isKh ? "លក្ខខណ្ឌ និងកិច្ចព្រមព្រៀងនៃការប្រើប្រាស់" : "Institutional Terms of Service")}
          </h1>
          <p className="mt-2 text-sm text-blue-100 max-w-2xl leading-relaxed">
            {isKh 
              ? "សេចក្តីណែនាំ និងបទបញ្ញត្តិស្តីពីការការពារទិន្នន័យផ្ទាល់ខ្លួន សិទ្ធិរបស់និស្សិត និងការប្រើប្រាស់ប្រព័ន្ធឌីជីថលរបស់វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន។"
              : "Official regulatory standards governing personal data protection, applicant confidentiality, and digital portal governance under the Ministry of Labour and Vocational Training (MLVT)."}
          </p>

          {/* Policy Selector Tabs */}
          <div className="mt-8 flex gap-2 p-1 bg-white/10 rounded-xl max-w-sm border border-white/15">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'privacy' ? 'bg-white text-[#002b80] shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isKh ? "គោលការណ៍ឯកជនភាព" : "Privacy Policy"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'terms' ? 'bg-white text-[#002b80] shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isKh ? "លក្ខខណ្ឌប្រើប្រាស់" : "Terms of Service"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Legal Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8 leading-relaxed text-sm text-slate-700">
          
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100 gap-2">
            <span>Effective Date: Academic Cohort 2026–2027</span>
            <span>Document Ref: NPIT-LEGAL-2026-v2.4</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Verified MLVT Standard
            </span>
          </div>

          {activeTab === 'privacy' ? (
            <div className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">1.</span>
                  {isKh ? "ការប្រមូលព័ត៌មានផ្ទាល់ខ្លួនរបស់បេក្ខជន" : "Collection of Personal and Academic Data"}
                </h2>
                <p>
                  National Polytechnic Institute Techo Sen (NPIT) collects personal identity documents, high school examination records (Bac II), contact details, and demographic information exclusively for processing admissions, state scholarship allocations, and enrollment verification under the regulations of the Ministry of Labour and Vocational Training (MLVT).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">2.</span>
                  {isKh ? "ការរក្សាទុក និងសុវត្ថិភាពទិន្នន័យ (Data Protection & Storage)" : "Data Protection and Cloud Security Standards"}
                </h2>
                <p>
                  All applicant dossiers, uploaded identification files, and academic certificates are transmitted via encrypted HTTPS TLS 1.3 channels and stored in Google Cloud Firestore and Firebase Storage facilities with role-based access control (RBAC). Access is strictly restricted to authorized Admissions Committee officers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">3.</span>
                  {isKh ? "ការមិនចែករំលែកទិន្នន័យទៅភាគីទីបី" : "Non-Disclosure to Third Parties"}
                </h2>
                <p>
                  NPIT adheres to strict institutional confidentiality standards. We never sell, rent, or transfer student records or visitor contact inquiries to commercial marketers or unauthorized third parties. Information is only shared with official government accreditation bodies when mandated by national education policy.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">4.</span>
                  {isKh ? "សិទ្ធិរបស់និស្សិត និងបេក្ខជន" : "Applicant Rights & Data Corrections"}
                </h2>
                <p>
                  Applicants maintain the right to inspect their submitted admission records, request corrections to academic history, or verify scholarship evaluation status using the official Application Tracker tool or by presenting original documentation at the NPIT Admissions Office in Ta Khmau, Kandal Province.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">1.</span>
                  {isKh ? "ការទទួលយកកិច្ចព្រមព្រៀង" : "Acceptance of Institutional Terms"}
                </h2>
                <p>
                  By accessing the NPIT Web Portal, submitting an application, or utilizing the Student & Faculty Portal, you agree to comply with all guidelines, code of conduct requirements, and policies enacted by the National Polytechnic Institute Techo Sen and MLVT.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">2.</span>
                  {isKh ? "ភាពត្រឹមត្រូវនៃព័ត៌មានដែលបានផ្តល់" : "Truthfulness of Submitted Documentation"}
                </h2>
                <p>
                  Applicants are legally responsible for the accuracy and authenticity of all diplomas, National IDs, examination transcripts, and personal information submitted. Submitting forged or misleading documentation will result in immediate disqualification, cancellation of awarded government scholarships, and potential legal referral under applicable Kingdom of Cambodia statutes.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">3.</span>
                  {isKh ? "កម្មសិទ្ធិបញ្ញា និងធនធានបច្ចេកវិទ្យា" : "Intellectual Property & Digital Portal Usage"}
                </h2>
                <p>
                  All curriculum materials, course syllabi, engineering laboratory blueprints, and research publications accessible on this portal are the intellectual property of NPIT or their respective academic partners. Unauthorized reproduction or scraping is strictly prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-blue-700">4.</span>
                  {isKh ? "ការកែប្រែកម្មវិធីសិក្សា និងកាលវិភាគ" : "Modifications to Programs and Schedules"}
                </h2>
                <p>
                  NPIT reserves the right to adjust semester opening dates, laboratory shifts, and course offerings in accordance with institutional capacity and ministerial directives. Enrolled students will receive direct notifications regarding any schedule updates.
                </p>
              </section>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              For legal and compliance inquiries, contact: <a href="mailto:info@npit-edu.com" className="text-blue-700 font-semibold hover:underline">info@npit-edu.com</a>
            </div>
            <button
              type="button"
              onClick={onBackHome}
              className="px-5 py-2 rounded-xl bg-[#002b80] hover:bg-[#001f5c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Return to Home Page"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
