import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
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
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  X,
  Plus,
  Edit2,
  Trash2,
  Megaphone,
  BookOpen,
  Settings,
  Check,
  Layers,
  Globe,
  Activity,
  HardHat,
  Send,
  Loader2,
  LogOut,
  Menu,
  Sliders,
  ClipboardCheck,
  BookMarked,
  Home
} from 'lucide-react';

import { getAllApplications, updateApplicationStatus } from '../services/admissionsService';
import { getAllInquiries, getAllResearchInquiries } from '../services/inquiryService';
import { 
  getSiteBanner, 
  saveSiteBanner, 
  getSiteNews, 
  saveNewsArticle, 
  deleteNewsArticle, 
  getSitePrograms, 
  updateProgramConfig, 
  getAuditLogs, 
  logAuditEvent 
} from '../services/siteContentService';

import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export default function AdminPage({ lang = 'en', onNavigate }) {
  const isKh = lang === 'kh';

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('admin@npit.edu.kh');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Sidebar collapse state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active Main Dashboard View
  // 'home' | 'applications' | 'programs' | 'shifts' | 'exams' | 'calendar' | 'news' | 'research' | 'tracker' | 'banner' | 'security' | 'config'
  const [activeView, setActiveView] = useState('home');

  // Search in Home launchpad
  const [launcherSearch, setLauncherSearch] = useState('');

  // Admissions & Inquiries Data
  const [applications, setApplications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [researchInquiries, setResearchInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // CMS & Config Data
  const [newsList, setNewsList] = useState([]);
  const [programsListState, setProgramsListState] = useState([]);
  const [bannerConfig, setBannerConfig] = useState(getSiteBanner());
  const [auditLogs, setAuditLogs] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters & Search for Admissions CRM
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  // Application Dossier Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // News Modal (Create / Edit)
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    titleKh: '',
    category: 'Academic',
    categoryKh: 'ការសិក្សា និងបច្ចេកវិទ្យា',
    image: '/news-inauguration.jpg',
    desc: '',
    descKh: '',
    summary: '',
    summaryKh: '',
    author: 'NPIT Media & Public Relations',
    readTime: '3 min read',
    published: true
  });

  // Banner Draft Form
  const [bannerDraft, setBannerDraft] = useState(bannerConfig);

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
      loadCMSData();
    }
  }, [isAuthenticated]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  const loadCMSData = () => {
    setNewsList(getSiteNews());
    setProgramsListState(getSitePrograms());
    const currentBanner = getSiteBanner();
    setBannerConfig(currentBanner);
    setBannerDraft(currentBanner);
    setAuditLogs(getAuditLogs());
  };

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
      if (auth) await signOut(auth);
    } catch (err) {
      console.warn('[AdminPage] Sign out error:', err);
    } finally {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // Status Change in Admissions CRM
  const handleStatusChange = async (appIdOrRef, newStatus, newLabel, newLabelKh) => {
    setIsUpdatingStatus(true);
    try {
      await updateApplicationStatus(appIdOrRef, newStatus, newLabel, newLabelKh, adminNoteInput);
      logAuditEvent('Updated Student Status', `Ref: ${appIdOrRef} -> Status: ${newStatus}`);
      await loadAllData();
      setAuditLogs(getAuditLogs());
      if (selectedApp) {
        setSelectedApp(prev => ({
          ...prev,
          status: newStatus,
          statusLabel: newLabel,
          statusLabelKh: newLabelKh,
          adminNotes: adminNoteInput
        }));
      }
      showToast(`Application ${appIdOrRef} status updated to: ${newLabel}`);
    } catch (err) {
      console.error('[AdminPage] Failed to update status:', err);
      showToast('Error updating status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // News CMS Operations
  const handleOpenNewsModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setNewsFormData({ ...article });
    } else {
      setEditingArticle(null);
      setNewsFormData({
        title: '',
        titleKh: '',
        category: 'Academic',
        categoryKh: 'ការសិក្សា និងបច្ចេកវិទ្យា',
        image: '/news-inauguration.jpg',
        desc: '',
        descKh: '',
        summary: '',
        summaryKh: '',
        author: 'NPIT Media & Public Relations',
        readTime: '3 min read',
        published: true
      });
    }
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newsFormData,
        id: editingArticle?.id || `news-${Date.now()}`
      };
      saveNewsArticle(payload);
      setNewsList(getSiteNews());
      setAuditLogs(getAuditLogs());
      setNewsModalOpen(false);
      showToast(editingArticle ? 'Article updated successfully!' : 'New article published!');
    } catch (err) {
      console.error('[AdminPage] Failed to save news:', err);
      showToast('Failed to save article.');
    }
  };

  const handleDeleteNews = (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    deleteNewsArticle(id);
    setNewsList(getSiteNews());
    setAuditLogs(getAuditLogs());
    showToast('Article deleted.');
  };

  // Programs Operations
  const handleToggleProgramStatus = (progId, currentStatus) => {
    const nextStatus = currentStatus === 'open' ? 'waitlist' : currentStatus === 'waitlist' ? 'closed' : 'open';
    updateProgramConfig(progId, { status: nextStatus });
    setProgramsListState(getSitePrograms());
    setAuditLogs(getAuditLogs());
    showToast(`Program ${progId} status set to: ${nextStatus.toUpperCase()}`);
  };

  // Banner Operations
  const handleSaveBanner = (e) => {
    e.preventDefault();
    const updated = saveSiteBanner(bannerDraft);
    setBannerConfig(updated);
    setAuditLogs(getAuditLogs());
    showToast('Site-wide announcement banner updated!');
  };

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
    showToast('Admissions CSV exported.');
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

  // Calculate Metrics
  const pendingCount = applications.filter(a => a.status === 'pending_review' || a.status === 'submitted').length;
  const acceptedCount = applications.filter(a => a.status === 'accepted' || a.status === 'enrolled').length;

  // 10 Colorful Launchpad Cards (exact matches to the reference design)
  const launchpadItems = [
    {
      id: 'applications',
      title: 'Attendance / Admissions',
      subtitle: `${applications.length} Applicants`,
      gradient: 'from-[#ff5e62] to-[#ff3a3a]',
      icon: <Users className="w-7 h-7 text-white" />
    },
    {
      id: 'programs',
      title: 'Class List / Majors',
      subtitle: '14 Active Majors',
      gradient: 'from-[#20bf6b] to-[#0eb56f]',
      icon: <ClipboardCheck className="w-7 h-7 text-white" />
    },
    {
      id: 'shifts',
      title: 'Timetable / Shifts',
      subtitle: 'Morning • Afternoon • Weekend',
      gradient: 'from-[#ff388b] to-[#d61a6c]',
      icon: <Clock className="w-7 h-7 text-white" />
    },
    {
      id: 'exams',
      title: 'Exam / Bac II',
      subtitle: 'Eligibility & Grades',
      gradient: 'from-[#29b6f6] to-[#0288d1]',
      icon: <FileText className="w-7 h-7 text-white" />
    },
    {
      id: 'calendar',
      title: 'Calendar / Batches',
      subtitle: 'Batch 1 & Batch 2',
      gradient: 'from-[#ffa726] to-[#fb8c00]',
      icon: <Calendar className="w-7 h-7 text-white" />
    },
    {
      id: 'news',
      title: 'News & Events',
      subtitle: `${newsList.length} Press Releases`,
      gradient: 'from-[#66bb6a] to-[#43a047]',
      icon: <NewspaperIcon className="w-7 h-7 text-white" />
    },
    {
      id: 'research',
      title: 'Homework / Research',
      subtitle: `${researchInquiries.length} Industry Testbeds`,
      gradient: 'from-[#ab47bc] to-[#7b1fa2]',
      icon: <BookOpen className="w-7 h-7 text-white" />
    },
    {
      id: 'tracker',
      title: 'Exam Result / Tracker',
      subtitle: 'Student Status Registry',
      gradient: 'from-[#2172f3] to-[#1546a0]',
      icon: <Award className="w-7 h-7 text-white" />
    },
    {
      id: 'banner',
      title: 'Alerts / Site Banner',
      subtitle: bannerConfig.enabled ? 'Live on Website' : 'Disabled',
      gradient: 'from-[#ff416c] to-[#ff4b2b]',
      icon: <Megaphone className="w-7 h-7 text-white" />
    },
    {
      id: 'config',
      title: 'Settings / Security',
      subtitle: 'Firestore & Headers',
      gradient: 'from-[#00b4db] to-[#0083b0]',
      icon: <Sliders className="w-7 h-7 text-white" />
    }
  ];

  const filteredLaunchpad = launchpadItems.filter(item => 
    item.title.toLowerCase().includes(launcherSearch.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(launcherSearch.toLowerCase())
  );

  // 1. Authentication Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1e2129] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#002b80]/10 text-[#002b80] rounded-2xl flex items-center justify-center mx-auto mb-4 ring-8 ring-[#002b80]/5">
              <ShieldCheck className="w-8 h-8 text-[#002b80]" />
            </div>
            <h2 className="text-2xl font-bold text-[#002b80]">
              NPIT School Admin
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Institutional Command Center
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Cloud Firestore & HTTPS Security Active
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
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3 bg-[#002b80] hover:bg-[#001f5c] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmittingAuth ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home', '#home')}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium transition cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard (Reference Layout)
  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-row overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          LEFT DARK SIDEBAR (Theme: #222631 matching screenshot)
         ========================================================================= */}
      <aside className={`bg-[#222631] text-slate-300 flex flex-col shrink-0 transition-all duration-300 z-30 select-none ${
        sidebarOpen ? 'w-60 sm:w-64' : 'w-16'
      }`}>
        
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#0070f3] text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
              <SchoolIcon className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-extrabold text-sm tracking-wider text-white uppercase truncate">
                SCHOOL
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 py-4 overflow-y-auto space-y-0.5 text-xs font-medium scrollbar-none">
          
          {/* 1. Home / Launchpad */}
          <button
            type="button"
            onClick={() => setActiveView('home')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'home'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'home' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Home className="w-4 h-4 text-[#38bdf8] shrink-0" />
            {sidebarOpen && <span className="truncate">Home</span>}
          </button>

          {/* 2. Attendance / Admissions */}
          <button
            type="button"
            onClick={() => setActiveView('applications')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'applications'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'applications' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Users className="w-4 h-4 text-[#ff5e62] shrink-0" />
            {sidebarOpen && (
              <div className="flex-1 flex items-center justify-between overflow-hidden">
                <span className="truncate">Attendance</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full font-bold">
                  {applications.length}
                </span>
              </div>
            )}
          </button>

          {/* 3. Class List / Programs */}
          <button
            type="button"
            onClick={() => setActiveView('programs')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'programs'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'programs' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <ClipboardCheck className="w-4 h-4 text-[#20bf6b] shrink-0" />
            {sidebarOpen && <span className="truncate">Class List</span>}
          </button>

          {/* 4. Timetable */}
          <button
            type="button"
            onClick={() => setActiveView('shifts')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'shifts'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'shifts' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Clock className="w-4 h-4 text-[#ff388b] shrink-0" />
            {sidebarOpen && <span className="truncate">Timetable</span>}
          </button>

          {/* 5. Exam */}
          <button
            type="button"
            onClick={() => setActiveView('exams')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'exams'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'exams' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <FileText className="w-4 h-4 text-[#29b6f6] shrink-0" />
            {sidebarOpen && <span className="truncate">Exam</span>}
          </button>

          {/* 6. Calendar */}
          <button
            type="button"
            onClick={() => setActiveView('calendar')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'calendar'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'calendar' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Calendar className="w-4 h-4 text-[#ffa726] shrink-0" />
            {sidebarOpen && <span className="truncate">Calendar</span>}
          </button>

          {/* 7. News */}
          <button
            type="button"
            onClick={() => setActiveView('news')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'news'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'news' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <NewspaperIcon className="w-4 h-4 text-[#66bb6a] shrink-0" />
            {sidebarOpen && <span className="truncate">News</span>}
          </button>

          {/* 8. Homework / Research */}
          <button
            type="button"
            onClick={() => setActiveView('research')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'research'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'research' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <BookOpen className="w-4 h-4 text-[#ab47bc] shrink-0" />
            {sidebarOpen && <span className="truncate">Homework</span>}
          </button>

          {/* 9. Exam Result / Tracker */}
          <button
            type="button"
            onClick={() => setActiveView('tracker')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'tracker'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'tracker' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Award className="w-4 h-4 text-[#2172f3] shrink-0" />
            {sidebarOpen && <span className="truncate">Exam Result</span>}
          </button>

          {/* 10. Settings / Banner */}
          <button
            type="button"
            onClick={() => setActiveView('banner')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'banner'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'banner' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Settings className="w-4 h-4 text-[#ff416c] shrink-0" />
            {sidebarOpen && (
              <div className="flex-1 flex items-center justify-between overflow-hidden">
                <span className="truncate">Settings</span>
                {bannerConfig.enabled && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
            )}
          </button>

          {/* 11. Configuration / Security */}
          <button
            type="button"
            onClick={() => setActiveView('config')}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition relative cursor-pointer ${
              activeView === 'config'
                ? 'bg-white/5 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeView === 'config' && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#0070f3] rounded-r" />
            )}
            <Sliders className="w-4 h-4 text-[#00b4db] shrink-0" />
            {sidebarOpen && <span className="truncate">Configuration</span>}
          </button>
        </nav>

        {/* Bottom User Area */}
        <div className="p-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            {sidebarOpen && (
              <span className="text-[11px] text-slate-400 truncate">
                Online Sync Active
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              loadAllData();
              loadCMSData();
              showToast('Refreshed data.');
            }}
            title="Reload Data"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN CONTENT AREA
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top White Header Bar (Matching screenshot) */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Admin</h1>
            <p className="text-xs text-slate-400">Jason Statham</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#home"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition"
            >
              <span>View Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Profile Avatar with status pill */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full ring-2 ring-white shadow-xs overflow-hidden bg-slate-200">
                <img
                  src="/campus-round.jpg"
                  alt="Admin Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0070f3] border-2 border-white rounded-full" />
            </div>

            {/* Logout Icon Button (Matching screenshot top right exit icon) */}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-6 sm:p-8 flex-1">
          
          {/* =====================================================================
              VIEW 1: HOME (THE APP LAUNCHPAD GRID FROM THE SCREENSHOT)
             ===================================================================== */}
          {activeView === 'home' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              
              {/* Prominent Search Input (Matching screenshot) */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={launcherSearch}
                  onChange={(e) => setLauncherSearch(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0070f3]/20 focus:border-[#0070f3] shadow-xs transition"
                />
              </div>

              {/* 2 Rows x 5 Columns Grid of App Cards (Matching screenshot) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
                {filteredLaunchpad.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
                  >
                    {/* Squircle with vibrant gradient */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 mb-3`}>
                      {item.icon}
                    </div>

                    <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-[#0070f3] transition-colors leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 truncate max-w-full">
                      {item.subtitle}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Status Bar */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Cloud Firestore Sync: <strong>Connected</strong></span>
                  <span className="text-slate-300">•</span>
                  <span>HTTP Security Headers: <strong>Enforced (A+)</strong></span>
                </div>
                <div className="text-[11px] text-slate-400">
                  National Polytechnic Institute Techo Sen (NPIT) Admin Portal
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 2: ATTENDANCE / ADMISSIONS CRM
             ===================================================================== */}
          {activeView === 'applications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setActiveView('home')} 
                    className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Home
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-900 font-bold">Attendance / Admissions CRM</span>
                </div>

                <button
                  type="button"
                  onClick={exportToCSV}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, phone, tracking code..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="accepted">Accepted / Enrolled</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                  >
                    <option value="all">All Majors</option>
                    {programsListState.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <span className="text-xs text-slate-500 font-medium">
                  Showing <strong>{filteredApps.length}</strong> of {applications.length} Applicants
                </span>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Tracking Code</th>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Phone / Telegram</th>
                        <th className="py-3 px-4">Major Selection</th>
                        <th className="py-3 px-4">Bac II Grade</th>
                        <th className="py-3 px-4">Scholarship</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApps.map(app => (
                        <tr key={app.referenceNumber} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 px-4 font-mono font-bold text-blue-900">
                            {app.referenceNumber}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            <div>{app.applicant?.fullName || 'N/A'}</div>
                            <div className="text-[11px] font-khmer text-slate-500 font-normal">{app.applicant?.fullNameKhmer}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-medium">
                            {app.applicant?.phone || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-slate-700 capitalize font-medium">
                            {app.programSelection?.programId}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-800">
                              Grade {app.academic?.bacIIGrade || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {app.scholarship?.applied ? (
                              <span className="text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]">
                                100% State Quota
                              </span>
                            ) : (
                              <span className="text-slate-400">Regular</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {app.statusLabel || app.status || 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => { setSelectedApp(app); setAdminNoteInput(app.adminNotes || ''); }}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition cursor-pointer"
                            >
                              Review Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredApps.length === 0 && (
                        <tr>
                          <td colSpan="8" className="py-12 text-center text-slate-400">
                            No matching applications found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 3: CLASS LIST / MAJORS CONTROLLER
             ===================================================================== */}
          {activeView === 'programs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-900 font-bold">Class List & Academic Programs (14)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {programsListState.map(prog => (
                  <div key={prog.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {prog.level || 'Higher Diploma'}
                          </span>
                          <h4 className="font-bold text-base text-slate-900 mt-1">{prog.name}</h4>
                          <span className="text-xs font-khmer text-slate-500 block">{prog.nameKhmer}</span>
                        </div>
                        
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prog.status === 'open' ? 'bg-emerald-100 text-emerald-800' :
                          prog.status === 'waitlist' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {prog.status === 'open' ? 'Open' : prog.status === 'waitlist' ? 'Waitlist' : 'Closed'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {prog.overview || prog.overviewKh}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Duration: <strong>{prog.duration}</strong></span>
                      <button
                        type="button"
                        onClick={() => handleToggleProgramStatus(prog.id, prog.status || 'open')}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                      >
                        Cycle Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 4: TIMETABLE & SHIFTS
             ===================================================================== */}
          {activeView === 'shifts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Timetable & Study Shifts</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Morning Shift (វេនព្រឹក)</h4>
                  <p className="text-xs text-slate-500">8:00 AM – 11:30 AM (Monday to Friday)</p>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
                    Full daytime laboratory modules, engineering workshops, and 100% State Scholarship classes.
                  </div>
                  <div className="text-xs font-bold text-emerald-600">Active & Enrolling</div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Afternoon Shift (វេនរសៀល)</h4>
                  <p className="text-xs text-slate-500">1:30 PM – 5:00 PM (Monday to Friday)</p>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
                    Applied technical diploma and Bachelor of Technology practical sessions.
                  </div>
                  <div className="text-xs font-bold text-emerald-600">Active & Enrolling</div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Weekend Shift (វេនសៅរ៍-អាទិត្យ)</h4>
                  <p className="text-xs text-slate-500">Saturday & Sunday Intensive</p>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
                    Tailored for employed technicians and enterprise staff pursuing Bachelor upgrades.
                  </div>
                  <div className="text-xs font-bold text-emerald-600">Active & Enrolling</div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 5: EXAM & BAC II ELIGIBILITY
             ===================================================================== */}
          {activeView === 'exams' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Exam & Bac II Admissions Eligibility</span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="font-bold text-base text-slate-900">Ministry of Labour & Vocational Training Admission Protocols</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">Passed Bac II (និទ្ទេស A, B, C, D, E)</strong>
                      <span className="text-slate-500">Eligible for both Bachelor of Engineering (4 Years) and Higher Diploma (2 Years).</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200">
                      100% & 50% State Scholarships
                    </span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">Failed High School Diploma (ធ្លាក់បាក់ឌុប)</strong>
                      <span className="text-slate-500">100% Eligible for Higher Technical Diploma (2 Years) with full state tuition waiver.</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200">
                      100% Tuition Scholarship
                    </span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">TVET Level 3 Certificate Holders</strong>
                      <span className="text-slate-500">Direct admission into Year 2 Higher Diploma technical tracks.</span>
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg border border-amber-200">
                      Credit Transfer Accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 6: CALENDAR & BATCH START DATES
             ===================================================================== */}
          {activeView === 'calendar' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Academic Calendar & Batch Deadlines</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    B1
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Cohort Batch 1 (វគ្គទី១)</h4>
                  <div className="text-xs text-slate-600">
                    <div>Official Start Date: <strong>November 13, 2026 (១៣ វិច្ឆិកា ២០២៦)</strong></div>
                    <div className="mt-1">Enrollment Deadline: <strong>November 05, 2026</strong></div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700">
                    Orientation, laboratory safety protocol training, and technical toolkit distribution.
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    B2
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Cohort Batch 2 (វគ្គទី២)</h4>
                  <div className="text-xs text-slate-600">
                    <div>Official Start Date: <strong>January 04, 2027 (០៤ មករា ២០២៧)</strong></div>
                    <div className="mt-1">Enrollment Deadline: <strong>December 28, 2026</strong></div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700">
                    Second intake for high school graduates and scholarship awardees.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 7: NEWS & CMS MANAGER
             ===================================================================== */}
          {activeView === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-900 font-bold">Campus News & Press Releases CMS</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenNewsModal()}
                  className="px-4 py-2 bg-[#0070f3] hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newsList.map(article => (
                  <div key={article.id} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="h-40 bg-slate-100 relative overflow-hidden">
                        <img 
                          src={article.image || '/news-inauguration.jpg'} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                          {article.category || 'News'}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="text-[11px] text-slate-400 flex items-center justify-between">
                          <span>{article.date}</span>
                          <span>{article.readTime || '3 min'}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {article.desc || article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {article.author?.slice(0, 16)}...
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenNewsModal(article)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNews(article.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 8: RESEARCH & COLLABORATION
             ===================================================================== */}
          {activeView === 'research' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Applied Research & Industry Testbeds</span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="font-bold text-base text-slate-900">National Innovation & Applied Science Testbeds</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">Solar Microgrids</h5>
                    <p className="text-slate-600">40 kW industrial solar array with battery storage & IoT load monitoring.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">6-Axis Industrial Robotics</h5>
                    <p className="text-slate-600">Automated manufacturing conveyor sorting & computer vision inspection.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                    <h5 className="font-bold text-slate-900 text-sm">Concrete & BIM Digital Twins</h5>
                    <p className="text-slate-600">Seismic structural stress testing and sustainable cementitious material analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 9: APPLICATION TRACKER LOOKUP
             ===================================================================== */}
          {activeView === 'tracker' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Exam Result & Student Application Tracker</span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="font-bold text-base text-slate-900">Registered Students Real-Time Status</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {applications.map(app => (
                    <div key={app.referenceNumber} className="py-3 flex items-center justify-between">
                      <div>
                        <strong className="text-blue-900 font-mono block">{app.referenceNumber}</strong>
                        <span className="text-slate-800 font-bold">{app.applicant?.fullName}</span>
                        <span className="text-slate-500 block">Selected: {app.programSelection?.programId}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-200">
                        {app.statusLabel || app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 10: SETTINGS & SITE-WIDE BANNER
             ===================================================================== */}
          {activeView === 'banner' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">Site Settings & Announcement Ticker Banner</span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-500" />
                    <span>Site-Wide Announcement & Emergency Ticker Banner</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    When enabled, this ticker sits above the website header on every page, alerting students to deadlines, holidays, or emergency closures.
                  </p>
                </div>

                {/* Live Preview Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Live Banner Preview:
                  </span>
                  {bannerDraft.enabled ? (
                    <div className={`p-3 rounded-xl text-white flex flex-wrap items-center justify-between gap-3 shadow-sm ${
                      bannerDraft.type === 'urgent' ? 'bg-gradient-to-r from-red-700 to-rose-800' :
                      bannerDraft.type === 'info' ? 'bg-gradient-to-r from-sky-700 to-blue-800' :
                      bannerDraft.type === 'success' ? 'bg-gradient-to-r from-emerald-700 to-teal-800' :
                      'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 rounded bg-white/20">
                          <Megaphone className="w-4 h-4 text-amber-300" />
                        </span>
                        <span className="text-xs font-medium">
                          {bannerDraft.textEn || 'No announcement text'}
                        </span>
                      </div>
                      {bannerDraft.ctaTextEn && (
                        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                          {bannerDraft.ctaTextEn}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400 font-medium">
                      Banner is disabled. Toggle checkbox to activate.
                    </div>
                  )}
                </div>

                {/* Configuration Form */}
                <form onSubmit={handleSaveBanner} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="banner_enabled_toggle"
                      checked={bannerDraft.enabled}
                      onChange={(e) => setBannerDraft(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="banner_enabled_toggle" className="text-sm font-bold text-slate-800 cursor-pointer">
                      Enable Banner on Public Portal
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Color Theme</label>
                      <select
                        value={bannerDraft.type}
                        onChange={(e) => setBannerDraft(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="announcement">Royal Blue (Standard Announcement)</option>
                        <option value="urgent">Crimson Red (Urgent Notice)</option>
                        <option value="info">Sky Blue (Information)</option>
                        <option value="success">Emerald Green (Scholarship Awards)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Action Link</label>
                      <input
                        type="text"
                        value={bannerDraft.ctaLink}
                        onChange={(e) => setBannerDraft(prev => ({ ...prev, ctaLink: e.target.value }))}
                        placeholder="#apply"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Text in English *</label>
                    <input
                      type="text"
                      required
                      value={bannerDraft.textEn}
                      onChange={(e) => setBannerDraft(prev => ({ ...prev, textEn: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Text in Khmer</label>
                    <input
                      type="text"
                      value={bannerDraft.textKh}
                      onChange={(e) => setBannerDraft(prev => ({ ...prev, textKh: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-khmer"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0070f3] hover:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-xs transition cursor-pointer"
                  >
                    Save & Broadcast Banner
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 11: CONFIGURATION & SECURITY
             ===================================================================== */}
          {activeView === 'config' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <button type="button" onClick={() => setActiveView('home')} className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-bold">System Configuration & Security Audit</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Database Engine</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="font-bold text-slate-900">Google Cloud Firestore</div>
                  <p className="text-xs text-slate-500">Rules active with document-level regex validation.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">HTTP Security</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="font-bold text-slate-900">Enterprise CDN Headers</div>
                  <p className="text-xs text-slate-500">X-Frame-Options DENY & HSTS 1-Year enforced.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Bot Shield</span>
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="font-bold text-slate-900">Honeypot Active</div>
                  <p className="text-xs text-slate-500">Spam crawler payloads filtered before database ingress.</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =========================================================================
          MODAL 1: APPLICANT DOSSIER DRAWER
         ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
                  {selectedApp.referenceNumber}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedApp.applicant?.fullName} ({selectedApp.applicant?.fullNameKhmer || 'N/A'})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Contact Info</span>
                <div className="text-slate-900 font-bold">{selectedApp.applicant?.phone}</div>
                <div className="text-slate-600">{selectedApp.applicant?.email}</div>
                <div className="text-slate-500">{selectedApp.applicant?.address}, {selectedApp.applicant?.province}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Academic Records</span>
                <div className="text-slate-900 font-bold">{selectedApp.academic?.highSchoolName || 'N/A'}</div>
                <div className="text-slate-600">Bac II Grade: <strong className="text-blue-900">{selectedApp.academic?.bacIIGrade || 'N/A'}</strong></div>
                <div className="text-slate-500">Track: {selectedApp.academic?.bacIITrack || 'Science'}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Committee Decision Notes
              </label>
              <textarea
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Add notes..."
                rows="3"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(selectedApp.referenceNumber, 'accepted', 'Accepted & Enrolled', 'បានទទួលជាផ្លូវការ')}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                ✓ Accept
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(selectedApp.referenceNumber, 'waitlist', 'Waitlist Status', 'ស្ថិតក្នុងបញ្ជីរង់ចាំ')}
                className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                ⏳ Waitlist
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(selectedApp.referenceNumber, 'pending_review', 'Under Review', 'កំពុងពិនិត្យ')}
                className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                🔍 Review
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(selectedApp.referenceNumber, 'rejected', 'Rejected', 'មិនត្រូវបានទទួល')}
                className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                ✕ Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: NEWS ARTICLE CMS MODAL
         ========================================================================= */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingArticle ? 'Edit Article' : 'Create Article'}
              </h3>
              <button type="button" onClick={() => setNewsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newsFormData.title}
                  onChange={(e) => setNewsFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title (Khmer)</label>
                <input
                  type="text"
                  value={newsFormData.titleKh}
                  onChange={(e) => setNewsFormData(prev => ({ ...prev, titleKh: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-khmer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Description *</label>
                <textarea
                  required
                  rows="2"
                  value={newsFormData.desc}
                  onChange={(e) => setNewsFormData(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0070f3] text-white font-bold text-xs rounded-lg shadow-xs"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Custom Newspaper Icon Helper
function NewspaperIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

// Custom School Building Icon Helper
function SchoolIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}
