import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Navigation,
  X
} from 'lucide-react';

import { submitGeneralInquiry } from '../services/inquiryService';

export default function ContactPage({ lang, onNavigate }) {
  const isKh = lang === 'kh';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refNum, setRefNum] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message || submitting) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitGeneralInquiry({
        name: formData.fullName,
        email: formData.email,
        subject: formData.subject || 'General Campus Inquiry',
        message: formData.message
      });
      setRefNum(res.referenceNumber);
      setSubmitted(true);
      setToastMessage(isKh ? `✓ សារត្រូវបានផ្ញើជោគជ័យ! លេខយោង៖ ${res.referenceNumber}` : `✓ Message Dispatched Successfully! Reference: ${res.referenceNumber}`);
      setTimeout(() => setToastMessage(null), 8000);
      setTimeout(() => {
        document.getElementById('contact-feedback')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.warn('Contact page submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white relative">

      {/* Prominent Floating Feedback Toast */}
      {toastMessage && (
        <div 
          role="status"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </span>
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isKh ? "ជោគជ័យ" : "Inquiry Sent"}
              </p>
              <p className="text-sm font-medium text-slate-100">
                {toastMessage}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Hero Banner Matching Reference Mockup */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[380px] md:min-h-[440px] flex items-center">
        {/* Campus Entrance Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-campus.jpg" 
            alt="National Polytechnic Institute Techo Sen Entrance Gate" 
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/45" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="max-w-2xl text-white">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
              CONTACT US
            </h1>

            <p className="mt-2 text-lg sm:text-xl font-bold text-white">
              {isKh ? "ទំនាក់ទំនងមកកាន់យើងខ្ញុំ" : "Get in Touch with Us"}
            </p>

            <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              {isKh 
                ? "តើលោកអ្នកមានចម្ងល់ ឬសំណួរផ្សេងៗទេ? សូមទាក់ទងមកកាន់ក្រុមការងាររបស់យើង ដើម្បីទទួលបានការគាំទ្រ និងព័ត៌មានលម្អិត។"
                : "Have questions? Reach out to our team for assistance and inquiries."}
            </p>

            {/* Breadcrumb Matching Reference */}
            <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm">
              <button 
                type="button"
                onClick={() => onNavigate ? onNavigate('home', '#home') : window.location.hash = '#home'}
                className="text-[#e5a035] hover:text-amber-300 font-medium transition-colors cursor-pointer"
              >
                {isKh ? "ទំព័រដើម" : "Home"}
              </button>
              <span className="text-slate-400 font-light">&gt;</span>
              <span className="text-white font-medium">
                {isKh ? "ទំនាក់ទំនង" : "Contact Us"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid (Get in Touch + Send Us a Message) */}
      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Get in Touch (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Get in Touch
                </h2>
                {isKh && (
                  <p className="text-lg font-bold font-khmer text-slate-700 mt-1">
                    ទំនាក់ទំនងមកកាន់យើង
                  </p>
                )}
              </div>

              {/* 1. Address Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b4b9b] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isKh ? "អាសយដ្ឋានផ្លូវការ" : "Official Address"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-khmer">
                    {isKh 
                      ? "ផ្លូវជាតិលេខ២១ ភូមិព្រែកសំរោង៣ សង្កាត់តាខ្មៅ ក្រុងតាខ្មៅ ខេត្តកណ្តាល"
                      : "National Road 21, Prek Samraong 3 Village, Sangkat Ta Khmau, Ta Khmau City, Kandal Province"}
                  </p>
                  <a 
                    href="https://www.google.com/maps/dir//National+Polytechnic+Institute+Techo+Sen,+Ta+Khmau/@11.4644588,104.9505676,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31095974d7d331ed:0xd006dcb2951e6187!2m2!1d104.9622168!2d11.4502745?entry=ttu"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#154696] hover:text-blue-800 mt-2 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isKh ? "ទិសដៅធ្វើដំណើរលើ Google Maps" : "Get Directions"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* 2. Phone Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b4b9b] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isKh ? "លេខទូរស័ព្ទ & Telegram ចុះឈ្មោះ" : "Phone & Telegram Inquiries"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1 font-mono font-bold">
                    098 444 495 / 092 735 263<br />
                    016 475 544 / 012 216 169 / 011 674 567
                  </p>
                </div>
              </div>

              {/* 3. Email Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b4b9b] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isKh ? "អ៊ីមែល" : "Email"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-sans">
                    info@npits.edu.kh<br />
                    admissions@npits.edu.kh
                  </p>
                </div>
              </div>

              {/* 4. Working Hours Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b4b9b] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isKh ? "ម៉ោងធ្វើការ" : "Working Hours"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-sans">
                    Monday - Friday: 7:30 AM - 5:00 PM
                  </p>
                </div>
              </div>

              {/* Follow Us Social Links Matching Mockup */}
              <div className="pt-4">
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  {isKh ? "តាមដានពួកយើង" : "Follow Us"}
                </h4>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/npit.edu.kh" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
                    aria-label="Official Facebook"
                    title="NPIT Official Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/school/npit-cambodia/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
                    aria-label="Official LinkedIn"
                    title="NPIT LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a 
                    href="https://t.me/npit_official" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#229ed9] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
                    aria-label="Official Telegram"
                    title="NPIT Official Telegram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.536-.196 1.006.128.832.941z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://www.youtube.com/@npitcambodia" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity"
                    aria-label="Official YouTube"
                    title="NPIT Official YouTube Channel"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Send Us a Message (7 Columns) */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Send Us a Message
                </h2>
                {isKh && (
                  <p className="text-lg font-bold font-khmer text-slate-700 mt-1">
                    ផ្ញើសារមកកាន់យើង
                  </p>
                )}
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                {submitted && (
                  <div id="contact-feedback" role="alert" className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-xs animate-in fade-in duration-300 scroll-mt-32">
                    <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">
                        {isKh ? "សារត្រូវបានផ្ញើ និងកត់ត្រាជោគជ័យ!" : "Inquiry Dispatched Successfully!"}
                      </h4>
                      {refNum && (
                        <p className="text-xs font-mono font-bold text-amber-950 mt-1">
                          Tracking Reference: <span className="bg-white px-2.5 py-0.5 rounded-md border border-amber-300">{refNum}</span>
                        </p>
                      )}
                      <p className="text-xs text-amber-900 mt-1">
                        {isKh 
                          ? "សូមអរគុណសម្រាប់ការទាក់ទងមកកាន់ NPIT។ ក្រុមការងារយើងខ្ញុំនឹងឆ្លើយតបមកកាន់លោកអ្នកវិញក្នុងពេលឆាប់ៗ។"
                          : "Thank you for contacting NPIT. Your message has been forwarded to our admissions desk."}
                      </p>
                    </div>
                  </div>
                )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={isKh ? "ឈ្មោះពេញ *" : "Full Name"}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isKh ? "អាសយដ្ឋានអ៊ីមែល *" : "Email Address"}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={isKh ? "ប្រធានបទ" : "Subject"}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        required
                        rows="6"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={isKh ? "សាររបស់អ្នក... *" : "Message"}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* Submit Button Matching Reference */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#154696] hover:bg-[#103777] text-white font-semibold py-3.5 px-6 rounded-lg text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <span>{isKh ? "កំពុងផ្ញើ..." : "Sending..."}</span>
                        ) : (
                          <span>{isKh ? "ផ្ញើសារ" : "Send Message"}</span>
                        )}
                      </button>
                    </div>
                  </form>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Our Location Section Matching Mockup with Live Google Maps */}
      <section className="py-14 md:py-20 bg-[#f0f4f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Location
              </h2>
              {isKh ? (
                <p className="text-lg font-bold font-khmer text-slate-700 mt-1">
                  ទីតាំងរបស់យើង (ផ្លូវជាតិលេខ២ ក្រុងតាខ្មៅ ខេត្តកណ្តាល)
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Main Campus • National Road 2, Ta Khmau City, Kandal Province
                </p>
              )}
            </div>

            <a
              href="https://www.google.com/maps/dir//National+Polytechnic+Institute+Techo+Sen,+Ta+Khmau/@11.4644588,104.9505676,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31095974d7d331ed:0xd006dcb2951e6187!2m2!1d104.9622168!2d11.4502745?entry=ttu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#154696] hover:bg-[#103777] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{isKh ? "បើកទិសដៅធ្វើដំណើរ Google Maps" : "Get Directions"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Real Live Google Map Fetched Directly from Google */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe 
              title="Google Map of National Polytechnic Institute Techo Sen, Ta Khmau"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15640.0!2d104.95!3d11.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095974d7d331ed%3A0xd006dcb2951e6187!2sNational%20Polytechnic%20Institute%20Techo%20Sen%2C%20Ta%20Khmau!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] sm:h-[480px] md:h-[540px] block"
            />

            {/* Quick Action Info Overlay Matching Mockup */}
            <div className="absolute bottom-4 right-4 max-w-sm sm:max-w-none bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#154696] shrink-0" />
                  <span>{isKh ? "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន" : "National Polytechnic Institute Techo Sen"}</span>
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {isKh ? "ផ្លូវជាតិលេខ២ ក្រុងតាខ្មៅ ខេត្តកណ្តាល" : "National Road 2, Ta Khmau City, Kandal Province"}
                </p>
              </div>
              <a
                href="https://www.google.com/maps/dir//National+Polytechnic+Institute+Techo+Sen,+Ta+Khmau/@11.4644588,104.9505676,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31095974d7d331ed:0xd006dcb2951e6187!2m2!1d104.9622168!2d11.4502745?entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="bg-[#154696] hover:bg-[#103777] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{isKh ? "ទិសដៅ Google Maps" : "Get Directions"}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Floating Toast Notification */}


    </div>
  );
}
