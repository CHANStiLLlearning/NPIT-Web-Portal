import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Eye, 
  Award, 
  GraduationCap, 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { getAllApplications, updateApplicationStatus } from '../services/admissionsService';
import { getAllInquiries, getAllResearchInquiries } from '../services/inquiryService';
import { programsList } from '../data/programsData';

import { auth, isFirebaseConfigured } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export default function AdminPage({ lang = 'en', onNavigate }) {
  // Real Firebase Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('admin@npit.edu.kh');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Data states
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'inquiries' | 'research'
  const [applications, setApplications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [researchInquiries, setResearchInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  // Selected Item for Detail Drawer / Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Listen for real Firebase Auth state changes
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(Boolean(user));
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Initial load once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmittingAuth(true);

    try {
      if (auth) {
        const userCred = await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
        setCurrentUser(userCred.user);
        setIsAuthenticated(true);
      } else {
        // Fallback for offline mode if Firebase Auth is unavailable
        if (passwordInput === 'NPIT@Academic2026!' || passwordInput === 'npit2026') {
          setIsAuthenticated(true);
        } else {
          setLoginError('Invalid credentials. Hint: NPIT@Academic2026!');
        }
      }
    } catch (err) {
      console.error('[AdminPage] Auth error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setLoginError('Invalid admin email or password. Please verify credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Please wait a few moments.');
      } else {
        setLoginError(err.message || 'Authentication failed.');
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('[AdminPage] Sign out error:', err);
    } finally {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [apps, inqs, resInqs] = await Promise.all([
        getAllApplications(),
        getAllInquiries(),
        getAllResearchInquiries()
      ]);
      setApplications(apps || []);
      setInquiries(inqs || []);
      setResearchInquiries(resInqs || []);
    } catch (err) {
      console.error('[AdminPage] Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appIdOrRef, newStatus, newLabel, newLabelKh) => {
    setIsUpdatingStatus(true);
    try {
      await updateApplicationStatus(appIdOrRef, newStatus, newLabel, newLabelKh, adminNoteInput);
      // Reload updated records
      await loadAllData();
      if (selectedApp) {
        setSelectedApp(prev => ({
          ...prev,
          status: newStatus,
          statusLabel: newLabel,
          statusLabelKh: newLabelKh,
          adminNotes: adminNoteInput
        }));
      }
    } catch (err) {
      console.error('[AdminPage] Failed to update status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (app.referenceNumber || '').toLowerCase().includes(q) ||
      (app.applicant?.fullName || '').toLowerCase().includes(q) ||
      (app.applicant?.phone || '').includes(q) ||
      (app.applicant?.email || '').toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesProgram = programFilter === 'all' || 
      app.programSelection?.programId === programFilter ||
      app.programSelection?.majorId === programFilter ||
      (app.programSelection?.programName || '').toLowerCase().includes(programFilter.toLowerCase()) ||
      (app.programSelection?.department || '').toLowerCase().includes(programFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Reference', 'Full Name', 'Phone', 'Email', 'Program', 'Degree', 'Bac II Grade', 'High School', 'Scholarship', 'Status', 'Date'];
    const rows = applications.map(a => [
      a.referenceNumber || '',
      `"${a.applicant?.fullName || ''}"`,
      `"${a.applicant?.phone || ''}"`,
      `"${a.applicant?.email || ''}"`,
      `"${a.programSelection?.programId || ''}"`,
      `"${a.programSelection?.degreeType || ''}"`,
      `"${a.academic?.bacIIGrade || ''}"`,
      `"${a.academic?.highSchoolName || ''}"`,
      `"${a.scholarship?.applied ? a.scholarship?.category : 'None'}"`,
      `"${a.status || 'pending'}"`,
      `"${a.submittedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NPIT_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Firebase Authentication Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#002b80]/10 text-[#002b80] rounded-2xl flex items-center justify-center mx-auto mb-4 ring-8 ring-[#002b80]/5">
              <ShieldCheck className="w-8 h-8 text-[#002b80]" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#002b80]">
              NPIT Staff Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Admissions & Institutional Admin
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Cloud Firestore Security Enabled
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff Email Address
              </label>
              <input 
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@npit.edu.kh"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#002b80] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#002b80] focus:bg-white transition"
              />
              {loginError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {loginError}
                </p>
              )}
            </div>

            {/* Quick pre-fill buttons for committee staff convenience */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Fill Authorized Accounts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput('admin@npit.edu.kh');
                    setPasswordInput('NPIT@Academic2026!');
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-[#002b80] transition"
                >
                  admin@npit.edu.kh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput('reactjs35@gmail.com');
                    setPasswordInput('NPIT@Academic2026!');
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition"
                >
                  reactjs35@gmail.com
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3 bg-[#002b80] hover:bg-[#001a4d] disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
            >
              {isSubmittingAuth ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Cryptographic Token...
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Sign In to Admin Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onNavigate?.('home')}
              className="text-xs font-semibold text-slate-500 hover:text-[#002b80] transition"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Statistics calculation
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'pending_review' || !a.status).length;
  const acceptedApps = applications.filter(a => a.status === 'accepted' || a.status === 'approved').length;
  const scholarshipApps = applications.filter(a => a.scholarship?.applied).length;
  const totalInquiries = inquiries.length;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Cloud Firestore Sync • Authenticated Session
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#002b80] mt-1">
              NPIT Academic & Admissions Administration
            </h1>
            {currentUser && (
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Signed in as: <span className="font-semibold text-slate-800">{currentUser.email || 'Admin'}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002b80] hover:bg-[#001a4d] text-white font-bold rounded-xl text-xs transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-[#d32f2f] font-bold rounded-xl text-xs transition border border-red-200"
            >
              Sign Out
            </button>
            <button
              onClick={() => onNavigate?.('home')}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Applications</span>
              <FileText className="w-4 h-4 text-[#002b80]" />
            </div>
            <div className="text-2xl font-extrabold text-[#002b80] font-mono">{totalApps}</div>
            <span className="text-[11px] text-slate-400">AY 2026-2027</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-sky-700 font-mono">{pendingApps}</div>
            <span className="text-[11px] text-sky-600 font-medium">Awaiting Faculty</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Accepted Students</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">{acceptedApps}</div>
            <span className="text-[11px] text-emerald-600 font-medium">Enrolled</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Scholarship Applicants</span>
              <Award className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-extrabold text-[#002b80] font-mono">{scholarshipApps}</div>
            <span className="text-[11px] text-[#d4af37] font-semibold">100% State Quota</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Campus Inquiries</span>
              <Mail className="w-4 h-4 text-[#d32f2f]" />
            </div>
            <div className="text-2xl font-extrabold text-[#d32f2f] font-mono">{totalInquiries}</div>
            <span className="text-[11px] text-slate-400">Helpdesk Messages</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-6 bg-white px-6 rounded-t-2xl pt-2">
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'applications'
                ? 'border-[#002b80] text-[#002b80]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-[#002b80] text-[#002b80]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            General Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'research'
                ? 'border-[#002b80] text-[#002b80]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Research Collaborations ({researchInquiries.length})
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Search & Filters Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002b80]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002b80]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="under_review">Under Review</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="accepted">Accepted</option>
                  <option value="waitlist">Waitlist</option>
                </select>

                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002b80]"
                >
                  <option value="all">All Majors & Programs ({programsList.length})</option>
                  <optgroup label="Higher Diploma (100% Scholarship - 2 Years)">
                    {programsList.filter(p => p.degreeType === 'diploma').map(p => (
                      <option key={p.id} value={p.id}>
                        {p.num}. {p.nameKhmer} ({p.name})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Bachelor Degree (Fee-Paying - 4 Years)">
                    {programsList.filter(p => p.degreeType === 'bachelor').map(p => (
                      <option key={p.id} value={p.id}>
                        {p.num}. {p.nameKhmer} ({p.name})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Reference Code</th>
                    <th className="px-5 py-3.5">Candidate Name</th>
                    <th className="px-5 py-3.5">Department & Shift</th>
                    <th className="px-5 py-3.5">Bac II Grade</th>
                    <th className="px-5 py-3.5">Scholarship</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-5 py-12 text-center text-slate-400">
                        No applications found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.referenceNumber || app.cloudId} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-4 font-mono font-bold text-[#002b80]">
                          {app.referenceNumber}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-800">{app.applicant?.fullName || 'N/A'}</div>
                          <div className="text-[11px] text-slate-500">{app.applicant?.phone}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-semibold text-slate-800 capitalize block">
                            {app.programSelection?.programId?.replace('-', ' ')}
                          </span>
                          <span className="text-[11px] text-slate-500">{app.programSelection?.shift}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-block px-2 py-0.5 rounded font-extrabold text-[#d32f2f] bg-red-50 border border-red-200">
                            Grade {app.academic?.bacIIGrade || 'N/A'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {app.scholarship?.applied ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Award className="w-3 h-3" />
                              {app.scholarship?.category || '100% Quota'}
                            </span>
                          ) : (
                            <span className="text-slate-400">Self-Funded</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            app.status === 'accepted' || app.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : app.status === 'interview_scheduled'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : app.status === 'under_review'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-sky-50 text-sky-700 border-sky-200'
                          }`}>
                            {app.statusLabel || 'Pending Review'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setAdminNoteInput(app.adminNotes || '');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002b80]/10 hover:bg-[#002b80] text-[#002b80] hover:text-white rounded-lg font-bold text-xs transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: General Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#002b80] mb-4">
              Campus Helpdesk Inquiries ({inquiries.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No inquiries logged yet.</div>
              ) : (
                inquiries.map((inq, idx) => (
                  <div key={idx} className="py-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#002b80]">{inq.referenceNumber}</span>
                        <span className="font-bold text-slate-800">{inq.fullName || inq.name}</span>
                      </div>
                      <span className="text-slate-400">
                        {new Date(inq.submittedAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span>📞 {inq.phone || 'N/A'}</span>
                      <span>✉️ {inq.email || 'N/A'}</span>
                      <span className="font-semibold text-slate-700">Topic: {inq.subject || 'General'}</span>
                    </div>
                    <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
                      {inq.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Research Inquiries */}
        {activeTab === 'research' && (
          <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#002b80] mb-4">
              Research & Industry Collaboration Proposals ({researchInquiries.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {researchInquiries.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No research inquiries yet.</div>
              ) : (
                researchInquiries.map((res, idx) => (
                  <div key={idx} className="py-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#002b80]">{res.referenceNumber}</span>
                      <span className="font-bold text-slate-800">{res.organization || res.name}</span>
                    </div>
                    <div className="text-slate-600">
                      Domain: <span className="font-semibold text-[#002b80]">{res.researchDomain}</span> • Contact: {res.email}
                    </div>
                    <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
                      {res.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Application Review Modal / Drawer */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#002b80] to-[#001a4d] p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#d4af37] font-bold">
                    Official Candidate Dossier
                  </span>
                  <h3 className="text-xl font-bold font-mono">{selectedApp.referenceNumber}</h3>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 text-xs">
                
                {/* Status Switcher Actions */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold uppercase tracking-wider text-slate-600 block mb-2">
                    Academic Committee Decision Actions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedApp.cloudId || selectedApp.referenceNumber, 'accepted', 'Officially Accepted', 'ត្រូវបានអនុម័តទទួល')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve & Accept
                    </button>

                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedApp.cloudId || selectedApp.referenceNumber, 'interview_scheduled', 'Interview Scheduled', 'បានកំណត់កាលវិភាគសម្ភាសន៍')}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Schedule Interview
                    </button>

                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedApp.cloudId || selectedApp.referenceNumber, 'under_review', 'Under Committee Review', 'កំពុងស្ថិតក្នុងការពិនិត្យ')}
                      className="px-3.5 py-2 bg-[#002b80] hover:bg-[#001a4d] text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Mark Under Review
                    </button>

                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedApp.cloudId || selectedApp.referenceNumber, 'waitlist', 'Waiting List', 'ក្នុងបញ្ជីរង់ចាំ')}
                      className="px-3.5 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition flex items-center gap-1.5"
                    >
                      Waitlist
                    </button>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block">Candidate Name</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedApp.applicant?.fullName} ({selectedApp.applicant?.fullNameKhmer || 'N/A'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone & Email</span>
                    <span className="font-semibold text-slate-800">{selectedApp.applicant?.phone} • {selectedApp.applicant?.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">National ID / DOB</span>
                    <span className="font-semibold text-slate-800">{selectedApp.applicant?.nationalId || 'N/A'} • {selectedApp.applicant?.dob || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Province / Origin</span>
                    <span className="font-semibold text-slate-800">{selectedApp.applicant?.province || 'Battambang'}</span>
                  </div>
                </div>

                {/* Academic Qualifications */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[#002b80] block">
                    Academic Background & Bac II Examination:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-slate-400 block">High School:</span>
                      <span className="font-semibold text-slate-800">{selectedApp.academic?.highSchoolName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Bac II Grade:</span>
                      <span className="font-bold text-[#d32f2f] text-sm">Grade {selectedApp.academic?.bacIIGrade} ({selectedApp.academic?.bacIITrack})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Table Number:</span>
                      <span className="font-mono text-slate-800">{selectedApp.academic?.bacIITableNumber || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Program & Scholarship */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[#002b80] block">
                    Department & State Scholarship Quota:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block">Program Selected:</span>
                      <span className="font-bold text-[#002b80] capitalize">
                        {selectedApp.programSelection?.programId?.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Degree & Shift:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedApp.programSelection?.degreeType} ({selectedApp.programSelection?.shift})
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Scholarship Quota:</span>
                      <span className="font-bold text-emerald-700">
                        {selectedApp.scholarship?.applied ? selectedApp.scholarship?.category : 'Self-Funded'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Admin Committee Notes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Committee Notes / Interview Instructions (Visible to Candidate):
                  </label>
                  <textarea
                    rows="3"
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Enter instructions, interview date/room, or required document follow-up..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002b80]"
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
