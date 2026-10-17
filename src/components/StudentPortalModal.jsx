import React, { useState } from 'react';
import { X, Lock, User, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export default function StudentPortalModal({ isOpen, onClose, t }) {
  const [role, setRole] = useState('student');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f2757] text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h3 className="text-base font-bold text-white">NPIT Integrated Portal</h3>
              <p className="text-xs text-amber-400 font-khmer">ប្រព័ន្ធគ្រប់គ្រងការសិក្សានិស្សិត</p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Welcome to Student Portal</h4>
            <p className="text-xs text-slate-600">Authenticating session and loading course schedules...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Role selector */}
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  role === 'student' ? 'bg-blue-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student Login
              </button>
              <button
                type="button"
                onClick={() => setRole('faculty')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  role === 'faculty' ? 'bg-blue-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Faculty & Staff
              </button>
            </div>

            {/* Input Student ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {role === 'student' ? 'Student ID Number (e.g., NPIT-2026-0812)' : 'Staff Email / ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder={role === 'student' ? 'NPIT-2026-0812' : 'staff@npit.edu.kh'}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Portal Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span>Remember login</span>
              </label>
              <a href="#forgot" className="text-blue-700 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#1b4b9b] hover:bg-[#12387a] text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>NPIT Centralized Identity Service (OAuth 2.0)</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
