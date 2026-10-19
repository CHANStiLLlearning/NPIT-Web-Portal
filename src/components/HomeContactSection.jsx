import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, ArrowRight, MessageSquare, Award } from 'lucide-react';
import { submitGeneralInquiry } from '../services/inquiryService';

export default function HomeContactSection({ lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refNum, setRefNum] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'civil',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await submitGeneralInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Program Inquiry: ${formData.program}`,
        message: formData.message
      });
      setRefNum(res.referenceNumber);
      setFormSubmitted(true);
      setToastMessage(isKh ? `✓ សារត្រូវបានផ្ញើជោគជ័យ! លេខយោង៖ ${res.referenceNumber}` : `✓ Inquiry Dispatched Successfully! Reference: ${res.referenceNumber}`);
      setTimeout(() => setToastMessage(null), 8000);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', program: 'civil', message: '' });
      }, 5500);
    } catch (err) {
      console.warn('Inquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Award className="w-4 h-4" />
              <span>{isKh ? 'ទំនាក់ទំនង និងទស្សនកិច្ចបរិវេណ' : 'Campus Admissions & Hotline'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isKh ? "ទំនាក់ទំនងមកកាន់វិទ្យាស្ថាន NPIT" : "Contact & Campus Inquiries"}
            </h2>
            <div className="w-16 h-1 bg-blue-700 mt-2 rounded-full"></div>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {isKh 
                ? "ក្រុមការងារប្រឹក្សាយោបល់ការសិក្សារបស់យើង រង់ចាំស្វាគមន៍ និងផ្តល់ព័ត៌មានលម្អិតជូនលោកអ្នកជារៀងរាល់ថ្ងៃធ្វើការ។" 
                : "Our admissions advisors and faculty departments are here to assist with enrollment inquiries, scholarships, and campus visits."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('contact', '#contact')}
            className="shrink-0 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <span>{isKh ? 'ទំព័រទំនាក់ទំនងពេញលេញ' : 'Full Contact Directory'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Content: Left Contact Info / Right Quick Inquiry */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Campus Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Campus Address Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isKh ? 'ទីតាំងបរិវេណវិទ្យាស្ថានផ្លូវការ' : 'Official Campus Location'}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed font-khmer">
                  {isKh 
                    ? 'ផ្លូវជាតិលេខ២១ ភូមិព្រែកសំរោង៣ សង្កាត់តាខ្មៅ ក្រុងតាខ្មៅ ខេត្តកណ្តាល' 
                    : 'National Road 21, Prek Samraong 3 Village, Sangkat Ta Khmau, Ta Khmau City, Kandal Province'}
                </p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-blue-700">
                  {isKh ? '• ១៥ នាទីពីរង្វង់មូលចាក់អង្រែ • ក្រុងតាខ្មៅ' : '• 15 mins from Chak Angre Circle • Ta Khmau City'}
                </span>
              </div>
            </div>

            {/* Hotline & Advisory Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isKh ? 'ទូរស័ព្ទទំនាក់ទំនង & Telegram ចុះឈ្មោះ' : 'Admissions Hotline & Telegram'}
                </h4>
                <p className="mt-1 text-xs text-slate-700 font-mono font-bold leading-relaxed">
                  098 444 495 / 092 735 263 / 016 475 544
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  012 216 169 / 011 674 567 • www.npit-edu.com
                </p>
                <span className="inline-block mt-1 text-[11px] text-amber-800 font-semibold font-khmer">
                  {isKh ? '• ផ្តល់ការប្រឹក្សាអាហារូបករណ៍ ១០០% ដោយឥតគិតថ្លៃ' : '• Free 100% scholarship counseling'}
                </span>
              </div>
            </div>

            {/* Email & Office Hours Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isKh ? 'ម៉ោងធ្វើការផ្លូវការ' : 'Official Office Hours'}
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  {isKh ? 'ច័ន្ទ - សុក្រ៖ ៧:៣០ ព្រឹក – ៥:០០ ល្ងាច' : 'Monday – Friday: 7:30 AM – 5:00 PM'}
                </p>
                <p className="text-xs text-slate-500">
                  {isKh ? 'សៅរ៍ - អាទិត្យ៖ ៨:០០ ព្រឹក – ៤:៣០ រសៀល (វេនចុងសប្តាហ៍)' : 'Saturday – Sunday: 8:00 AM – 4:30 PM (Weekend Shifts)'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">
                {isKh ? 'ផ្ញើសារសាកសួរ ឬស្នើសុំទស្សនកិច្ចមន្ទីរពិសោធន៍' : 'Quick Inquiry & Lab Tour Request'}
              </h3>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">
                    {isKh ? 'សាររបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ!' : 'Inquiry Stored in Admissions Registry!'}
                  </h4>
                  {refNum && (
                    <p className="text-xs font-mono font-bold text-blue-900 mt-1">
                      Tracking Code: <span className="bg-white px-2 py-0.5 rounded border border-blue-200">{refNum}</span>
                    </p>
                  )}
                  <p className="text-xs text-blue-700 mt-1">
                    {isKh 
                      ? 'ក្រុមការងារប្រឹក្សា NPIT នឹងទាក់ទងមកលោកអ្នកតាមរយៈលេខទូរស័ព្ទក្នុងពេលឆាប់ៗ។' 
                      : 'An NPIT academic advisor will reach out to you within 24 business hours.'}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isKh ? 'ឈ្មោះរបស់អ្នក *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isKh ? 'ឧ. សុខ ចាន់ដារា' : 'e.g. John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isKh ? 'លេខទូរស័ព្ទ / Telegram *' : 'Phone / Telegram Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="012 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isKh ? 'អាសយដ្ឋានអ៊ីមែល' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isKh ? 'ដេប៉ាតឺម៉ង់ដែលចាប់អារម្មណ៍' : 'Engineering Department of Interest'}
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                  >
                    <option value="civil">{isKh ? 'វិស្វកម្មសំណង់ស៊ីវិល (Civil Engineering)' : 'Civil Engineering'}</option>
                    <option value="it">{isKh ? 'បច្ចេកវិទ្យាព័ត៌មាន (Information Technology)' : 'Information Technology'}</option>
                    <option value="electrical">{isKh ? 'វិស្វកម្មអគ្គិសនី និងអេឡិចត្រូនិក (Electrical)' : 'Electrical & Electronics'}</option>
                    <option value="mechanical">{isKh ? 'វិស្វកម្មមេកានិច (Mechanical Engineering)' : 'Mechanical Engineering'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isKh ? 'សំណួរ ឬសាររបស់អ្នក' : 'Your Inquiry / Message'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={isKh ? 'សាកសួរអំពីអាហារូបករណ៍ កាលវិភាគ ឬស្នើសុំទស្សនកិច្ចមន្ទីរពិសោធន៍...' : 'Ask about scholarship quotas, lab tour bookings, or enrollment steps...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    {isKh ? '* ព័ត៌មានរបស់អ្នកត្រូវបានរក្សាការសម្ងាត់' : '* Your contact details are securely handled.'}
                  </span>
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isKh ? 'ផ្ញើសំណួរ' : 'Send Inquiry'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div 
          role="alert"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300 border border-amber-500/40"
        >
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </section>
  );
}
