'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  X, 
  KeyRound, 
  LogOut, 
  MessageSquareHeart, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileSpreadsheet, 
  Printer, 
  Eye, 
  Send, 
  Building2, 
  Sparkles,
  Users,
  Image as ImageIcon,
  Check,
  Trash2,
  CheckSquare,
  Square,
  Edit3,
  Upload
} from 'lucide-react';
import { BARANGAYS } from '@/lib/umingan-data';

interface FeedbackRecord {
  id?: string;
  reference_code: string;
  category: string;
  name: string;
  contact: string;
  barangay: string;
  description: string;
  photo?: string | null;
  status: 'pending' | 'under_review' | 'in_progress' | 'resolved' | 'dismissed' | string;
  admin_notes?: string;
  created_at: string;
}

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  // Auth state initialized directly from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('umingan_admin_auth') === 'true';
    }
    return false;
  });
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Admin Tab selection
  const [adminTab, setAdminTab] = useState<'feedback' | 'services' | 'announcements'>('feedback');

  // Feedback State
  const [feedbackList, setFeedbackList] = useState<FeedbackRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [barangayFilter, setBarangayFilter] = useState<string>('all');

  // Deletion and Selection State
  const [selectedRefCodes, setSelectedRefCodes] = useState<string[]>([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    codes: string[];
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Selected Report for Detail / Resolution Inspector
  const [selectedReport, setSelectedReport] = useState<FeedbackRecord | null>(null);
  const [newStatus, setNewStatus] = useState<string>('pending');
  const [adminNote, setAdminNote] = useState<string>('');
  const [editPhoto, setEditPhoto] = useState<string | null>(null);
  const [isSavingStatus, setIsSavingStatus] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Feedback Reports
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.feedback)) {
          setFeedbackList(data.feedback);
        }
      }
    } catch (err) {
      console.error('Failed to load feedback reports:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      const timer = setTimeout(() => {
        fetchReports();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoggedIn, fetchReports]);

  if (!isOpen) return null;

  // Handle Login via Supabase Auth API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('umingan_admin_auth', 'true');
        fetchReports();
      } else {
        setAuthError(data.error || 'Authentication failed. Please check your Supabase Auth credentials.');
      }
    } catch (err) {
      console.error('Supabase Auth verification error:', err);
      setAuthError('Network error connecting to Supabase Auth service.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('umingan_admin_auth');
    setSelectedReport(null);
  };

  // Open Report Detail Inspector
  const handleInspectReport = (report: FeedbackRecord) => {
    setSelectedReport(report);
    setNewStatus(report.status || 'pending');
    setAdminNote(report.admin_notes || '');
    setEditPhoto(report.photo || null);
    setSaveSuccessMsg(null);
  };

  // Photo handlers for editing evidence
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setEditPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setEditPhoto(null);
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  // Update Status, Admin Notes & Evidence Photo
  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    setIsSavingStatus(true);
    setSaveSuccessMsg(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference_code: selectedReport.reference_code,
          status: newStatus,
          admin_notes: adminNote,
          photo: editPhoto
        })
      });

      if (res.ok) {
        // Update local state list
        setFeedbackList(prev => prev.map(item => {
          if (item.reference_code === selectedReport.reference_code) {
            return {
              ...item,
              status: newStatus,
              admin_notes: adminNote,
              photo: editPhoto || undefined
            };
          }
          return item;
        }));

        setSelectedReport(prev => prev ? {
          ...prev,
          status: newStatus,
          admin_notes: adminNote,
          photo: editPhoto || undefined
        } : null);

        setSaveSuccessMsg('Report details, action notes & photo evidence saved successfully!');
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error saving report status:', err);
    } finally {
      setIsSavingStatus(false);
    }
  };

  // Toggle selection for a single report
  const toggleSelectReport = (refCode: string) => {
    setSelectedRefCodes(prev =>
      prev.includes(refCode) ? prev.filter(code => code !== refCode) : [...prev, refCode]
    );
  };

  // Select / Deselect all visible reports
  const toggleSelectAll = (visibleCodes: string[]) => {
    const allSelected = visibleCodes.length > 0 && visibleCodes.every(code => selectedRefCodes.includes(code));
    if (allSelected) {
      setSelectedRefCodes(prev => prev.filter(code => !visibleCodes.includes(code)));
    } else {
      setSelectedRefCodes(prev => Array.from(new Set([...prev, ...visibleCodes])));
    }
  };

  // Perform deletion API call
  const handleDeleteReports = async (codes: string[]) => {
    if (codes.length === 0) return;
    setIsDeleting(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference_codes: codes }),
      });

      if (res.ok) {
        setFeedbackList(prev => prev.filter(item => !codes.includes(item.reference_code)));
        setSelectedRefCodes(prev => prev.filter(code => !codes.includes(code)));

        if (selectedReport && codes.includes(selectedReport.reference_code)) {
          setSelectedReport(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete report(s):', err);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmModal(null);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (feedbackList.length === 0) return;

    const headers = ['Reference Code', 'Category', 'Citizen Name', 'Contact', 'Barangay', 'Status', 'Description', 'Admin Notes', 'Date Submitted'];
    const rows = feedbackList.map(item => [
      `"${item.reference_code}"`,
      `"${item.category}"`,
      `"${item.name}"`,
      `"${item.contact}"`,
      `"${item.barangay}"`,
      `"${item.status}"`,
      `"${(item.description || '').replace(/"/g, '""')}"`,
      `"${(item.admin_notes || '').replace(/"/g, '""')}"`,
      `"${new Date(item.created_at).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Umingan_Citizen_Feedback_Log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering reports
  const filteredReports = feedbackList.filter(item => {
    const matchesSearch = 
      item.reference_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barangay.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesBarangay = barangayFilter === 'all' || item.barangay === barangayFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesBarangay;
  });

  // Calculate Metrics
  const totalCount = feedbackList.length;
  const pendingCount = feedbackList.filter(f => f.status === 'pending').length;
  const inProgressCount = feedbackList.filter(f => f.status === 'in_progress' || f.status === 'under_review').length;
  const resolvedCount = feedbackList.filter(f => f.status === 'resolved').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-300 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolved</span>;
      case 'in_progress':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-blue-300 flex items-center gap-1 w-fit"><Clock className="w-3 h-3 text-blue-600" /> In Progress</span>;
      case 'under_review':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-amber-300 flex items-center gap-1 w-fit"><Search className="w-3 h-3 text-amber-700" /> Under Review</span>;
      case 'dismissed':
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-slate-300 w-fit">Dismissed</span>;
      default:
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-rose-300 flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3 text-rose-600" /> Pending</span>;
    }
  };

  return (
    <div className={isLoggedIn
      ? "fixed inset-0 z-50 bg-slate-900 text-slate-100 w-screen h-screen flex flex-col overflow-hidden"
      : "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    }>
      <div className={isLoggedIn
        ? "bg-slate-900 text-slate-100 w-full h-full flex flex-col overflow-hidden relative"
        : "bg-slate-900 text-slate-100 w-full max-w-6xl rounded-2xl shadow-2xl border border-blue-800 relative overflow-hidden flex flex-col max-h-[92vh]"
      }>
        
        {/* Modal Close Button for Login view */}
        {!isLoggedIn && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {!isLoggedIn ? (
          /* ========================================================= */
          /* ADMIN LOGIN SCREEN                                         */
          /* ========================================================= */
          <div className="p-6 sm:p-12 my-auto max-w-md mx-auto w-full space-y-6 text-center">
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-blue-950 rounded-2xl border-2 border-yellow-500 shadow-lg flex items-center justify-center mx-auto text-yellow-400">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <span className="bg-yellow-500 text-blue-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-md inline-block mt-2">
                Restricted Access
              </span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                2026 LGU Admin Portal
              </h2>
              <p className="text-xs text-blue-200">
                Municipality of Umingan Executive Action Desk & Citizen Grievance Portal
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs text-left">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-extrabold text-blue-200 uppercase tracking-wider mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="official admin email@gmail.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-blue-200 uppercase tracking-wider mb-1">
                  Authorized Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-blue-950 font-black text-xs py-3 px-4 rounded-xl transition-all shadow-md uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-yellow-300"
              >
                <KeyRound className={`w-4 h-4 text-blue-950 ${isAuthenticating ? 'animate-spin' : ''}`} />
                <span>{isAuthenticating ? 'Verifying with Supabase Auth...' : 'Log In to Admin Portal'}</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 font-medium">
                Protected LGU Administrator Access. Authenticates via Supabase Auth.
              </p>
            </div>

          </div>
        ) : (
          /* ========================================================= */
          /* AUTHENTICATED ADMIN DASHBOARD VIEW                          */
          /* ========================================================= */
          <>
            {/* Admin Header Bar */}
            <div className="bg-blue-950 p-4 sm:p-5 border-b border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500 text-blue-950 font-black flex items-center justify-center border-2 border-yellow-300 shrink-0">
                  LGU
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                      Umingan Executive Action & Feedback Portal
                    </h2>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                      Admin Session Active
                    </span>
                  </div>
                  <p className="text-xs text-blue-200">
                    Logged in as: <strong className="text-yellow-400">Karl Henz (Executive Administrator)</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchReports}
                  disabled={isLoading}
                  className="bg-blue-900 hover:bg-blue-800 text-blue-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-blue-700 cursor-pointer"
                  title="Reload Reports"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-yellow-400 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-rose-950 hover:bg-rose-900 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Return to Public Website"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                  <span>Exit Admin Portal</span>
                </button>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setAdminTab('feedback')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  adminTab === 'feedback'
                    ? 'border-yellow-400 text-yellow-400 bg-slate-900 font-black'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquareHeart className="w-4 h-4 text-emerald-400" />
                <span>Citizen Feedback Desk</span>
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.2 rounded-full">
                  {pendingCount} Pending
                </span>
              </button>

              <button
                onClick={() => setAdminTab('services')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  adminTab === 'services'
                    ? 'border-yellow-400 text-yellow-400 bg-slate-900 font-black'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>e-Services & Permits Queue</span>
              </button>

              <button
                onClick={() => setAdminTab('announcements')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  adminTab === 'announcements'
                    ? 'border-yellow-400 text-yellow-400 bg-slate-900 font-black'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Barangay LGU Hotlines</span>
              </button>
            </div>

            {/* Main Admin Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900">
              
              {adminTab === 'feedback' && (
                <>
                  {/* Quick Overview Metrics Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Submitted Reports</span>
                      <span className="text-xl font-black text-white mt-1 block">{totalCount} Reports</span>
                    </div>
                    <div className="bg-rose-950/40 p-3.5 rounded-xl border border-rose-900/60">
                      <span className="text-[10px] text-rose-400 font-bold uppercase block">Pending Inspection</span>
                      <span className="text-xl font-black text-rose-200 mt-1 block">{pendingCount} Reports</span>
                    </div>
                    <div className="bg-blue-950/40 p-3.5 rounded-xl border border-blue-900/60">
                      <span className="text-[10px] text-blue-400 font-bold uppercase block">Action In Progress</span>
                      <span className="text-xl font-black text-blue-200 mt-1 block">{inProgressCount} Reports</span>
                    </div>
                    <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-900/60">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block">Successfully Resolved</span>
                      <span className="text-xl font-black text-emerald-200 mt-1 block">{resolvedCount} Reports</span>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      
                      {/* Search Bar */}
                      <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search reference code, citizen name, phone, description..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-white focus:outline-none focus:border-yellow-400"
                        />
                      </div>

                      {/* Status Filter */}
                      <div className="w-full sm:w-auto flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-yellow-400 w-full"
                        >
                          <option value="all">All Statuses</option>
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="dismissed">Dismissed</option>
                        </select>
                      </div>

                      {/* Category Filter */}
                      <div className="w-full sm:w-auto">
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-yellow-400 w-full"
                        >
                          <option value="all">All Categories</option>
                          <option value="streetlight">Streetlight Concern</option>
                          <option value="road">Road & Drainage</option>
                          <option value="garbage">Garbage Collection</option>
                          <option value="health">Health & Sanitation</option>
                          <option value="appreciation">Commendation</option>
                        </select>
                      </div>

                      {/* Barangay Filter */}
                      <div className="w-full sm:w-auto">
                        <select
                          value={barangayFilter}
                          onChange={(e) => setBarangayFilter(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-yellow-400 w-full"
                        >
                          <option value="all">All 58 Barangays</option>
                          {BARANGAYS.map(b => (
                            <option key={b.name} value={b.name}>Brgy. {b.name}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Active Selection Bulk Actions Bar */}
                    {selectedRefCodes.length > 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs transition-all animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-rose-400" />
                          <span className="font-extrabold text-white">
                            {selectedRefCodes.length} Report(s) Selected
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteConfirmModal({
                              isOpen: true,
                              codes: selectedRefCodes,
                              title: `Delete ${selectedRefCodes.length} Selected Report(s)`
                            })}
                            className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Selected ({selectedRefCodes.length})</span>
                          </button>
                          <button
                            onClick={() => setSelectedRefCodes([])}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Deselect All
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feedback Table / List */}
                  {filteredReports.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <MessageSquareHeart className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-sm font-bold text-slate-300">No citizen feedback records found matching filters.</p>
                      <p className="text-xs text-slate-500">Try adjusting your search query or reset status/category filters.</p>
                    </div>
                  ) : (
                    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-md">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                              <th className="p-3.5 w-10 text-center">
                                <button
                                  type="button"
                                  onClick={() => toggleSelectAll(filteredReports.map(r => r.reference_code))}
                                  className="text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
                                  title="Select All Visible Reports"
                                >
                                  {filteredReports.length > 0 && filteredReports.every(r => selectedRefCodes.includes(r.reference_code)) ? (
                                    <CheckSquare className="w-4 h-4 text-yellow-400" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-500" />
                                  )}
                                </button>
                              </th>
                              <th className="p-3.5">Ref & Date</th>
                              <th className="p-3.5">Citizen Name & Contact</th>
                              <th className="p-3.5">Barangay</th>
                              <th className="p-3.5">Category</th>
                              <th className="p-3.5">Concern / Issue Description</th>
                              <th className="p-3.5">Evidence</th>
                              <th className="p-3.5">Status</th>
                              <th className="p-3.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 text-slate-200">
                            {filteredReports.map((report) => {
                              const isSelected = selectedRefCodes.includes(report.reference_code);
                              return (
                                <tr
                                  key={report.reference_code || report.id}
                                  className={`transition-colors ${isSelected ? 'bg-rose-950/30' : 'hover:bg-slate-900/80'}`}
                                >
                                  <td className="p-3.5 text-center">
                                    <button
                                      type="button"
                                      onClick={() => toggleSelectReport(report.reference_code)}
                                      className="text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="w-4 h-4 text-yellow-400" />
                                      ) : (
                                        <Square className="w-4 h-4 text-slate-600" />
                                      )}
                                    </button>
                                  </td>

                                  <td className="p-3.5 whitespace-nowrap">
                                    <span className="font-mono font-bold text-yellow-400 block text-xs">
                                      {report.reference_code}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">
                                      {new Date(report.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </td>

                                  <td className="p-3.5">
                                    <div className="font-bold text-white">{report.name}</div>
                                    <div className="text-[11px] text-slate-400 font-mono">{report.contact}</div>
                                  </td>

                                  <td className="p-3.5 whitespace-nowrap">
                                    <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded-md font-semibold text-[11px] border border-blue-800">
                                      {report.barangay}
                                    </span>
                                  </td>

                                  <td className="p-3.5 whitespace-nowrap capitalize text-slate-300 font-medium">
                                    {report.category}
                                  </td>

                                  <td className="p-3.5 max-w-xs">
                                    <p className="line-clamp-2 text-slate-300 font-medium leading-relaxed">
                                      {report.description}
                                    </p>
                                    {report.admin_notes && (
                                      <p className="text-[10px] text-emerald-400 font-medium mt-1 line-clamp-1 italic">
                                        LGU Note: {report.admin_notes}
                                      </p>
                                    )}
                                  </td>

                                  <td className="p-3.5 whitespace-nowrap">
                                    {report.photo ? (
                                      <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-800">
                                        <ImageIcon className="w-3 h-3 text-emerald-400" /> Photo Attached
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-500 font-medium">No Attachment</span>
                                    )}
                                  </td>

                                  <td className="p-3.5 whitespace-nowrap">
                                    {getStatusBadge(report.status)}
                                  </td>

                                  <td className="p-3.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => handleInspectReport(report)}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                                        title="Inspect / Edit Status"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Edit / Inspect</span>
                                      </button>

                                      <button
                                        onClick={() => setDeleteConfirmModal({
                                          isOpen: true,
                                          codes: [report.reference_code],
                                          title: `Delete Report ${report.reference_code}`
                                        })}
                                        className="bg-red-950 hover:bg-red-900 text-red-300 hover:text-white border border-red-800 p-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                                        title="Delete Report"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {adminTab === 'services' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white uppercase">e-Services Online Application Queue</h3>
                        <p className="text-xs text-slate-400">Incoming applications for Business Permits, Tax Certificates, and Civil Registrations</p>
                      </div>
                      <span className="bg-blue-950 text-blue-300 text-xs font-bold px-3 py-1 rounded-md border border-blue-800">
                        8 Active Requests Pending Inspection
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-yellow-400 font-extrabold uppercase text-[10px]">BPLO One-Stop-Shop</span>
                        <h4 className="font-bold text-white text-sm">New Business Permit #2026-0811</h4>
                        <p className="text-slate-400">Applicant: Umingan Agro Cold Storage Corp.</p>
                        <p className="text-slate-400">Line: Commercial Cold Storage & Grain Processing</p>
                        <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold inline-block">Under Assessment</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-emerald-400 font-extrabold uppercase text-[10px]">Municipal Assessor</span>
                        <h4 className="font-bold text-white text-sm">Real Property Tax Assessment #RPT-4481</h4>
                        <p className="text-slate-400">Property: 2-Hectare Rice Farm (Brgy. Alo-o)</p>
                        <p className="text-slate-400">Owner: Sps. Eduardo & Luz Soriano</p>
                        <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold inline-block">Assessment Verified</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-blue-400 font-extrabold uppercase text-[10px]">Local Civil Registry</span>
                        <h4 className="font-bold text-white text-sm">Live Birth Certificate Request #LCR-1092</h4>
                        <p className="text-slate-400">Requestor: Ana Marie Santos</p>
                        <p className="text-slate-400">Purpose: Passport & School Enrollment</p>
                        <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold inline-block">Ready for Pickup</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'announcements' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white uppercase">38 Barangays Emergency Contact Directory Admin</h3>
                      <p className="text-xs text-slate-400">Manage local Liga ng mga Barangay captains, hotline numbers, and hall addresses</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {BARANGAYS.slice(0, 9).map(b => (
                        <div key={b.name} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                          <span className="text-[10px] text-yellow-400 font-extrabold uppercase block">{b.zone}</span>
                          <h4 className="font-bold text-white">Barangay {b.name}</h4>
                          <p className="text-slate-400 text-[11px]">Captain: <span className="text-slate-200 font-semibold">{b.captain}</span></p>
                          <p className="text-slate-400 text-[11px]">Hotline: <span className="text-emerald-400 font-mono font-semibold">{b.contact}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Selected Report Inspector Modal Drawer */}
            {selectedReport && (
              <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-slate-900 text-slate-100 max-w-2xl w-full rounded-2xl border-2 border-yellow-500 shadow-2xl p-6 relative space-y-5 max-h-[90vh] overflow-y-auto">
                  
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-yellow-500 text-blue-950 font-mono font-black text-xs px-2.5 py-0.5 rounded-md">
                        {selectedReport.reference_code}
                      </span>
                      {getStatusBadge(selectedReport.status)}
                    </div>
                    <h3 className="text-lg font-black text-white uppercase mt-1">
                      Citizen Feedback Action & Resolution Inspector
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submitted on: {new Date(selectedReport.created_at).toLocaleString()}
                    </p>
                  </div>

                  {saveSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{saveSuccessMsg}</span>
                    </div>
                  )}

                  {/* Citizen Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Citizen Name</span>
                      <span className="font-extrabold text-white">{selectedReport.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Contact Hotline</span>
                      <span className="font-mono font-bold text-yellow-400">{selectedReport.contact}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Barangay Location</span>
                      <span className="font-extrabold text-blue-300">Brgy. {selectedReport.barangay}</span>
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase">
                      Citizen Report Description & Landmark
                    </label>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
                      {selectedReport.description}
                    </div>
                  </div>

                  {/* Photo / Evidence Editor Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-emerald-400" />
                        <span>Photo / Landmark Evidence</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => editFileInputRef.current?.click()}
                          className="bg-blue-900 hover:bg-blue-800 text-yellow-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3 text-yellow-400" />
                          <span>{editPhoto ? 'Replace / Edit Photo' : 'Upload Evidence Photo'}</span>
                        </button>
                        {editPhoto && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="bg-red-950 hover:bg-red-900 text-red-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-red-800 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                            <span>Remove Photo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />

                    {editPhoto ? (
                      <div className="relative h-56 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group">
                        <Image
                          src={editPhoto}
                          alt="Citizen Evidence Photo"
                          fill
                          className="object-contain"
                          referrerPolicy="no-referrer"
                          unoptimized
                        />
                        <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-700 text-slate-200 text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 pointer-events-none">
                          <Edit3 className="w-3 h-3 text-yellow-400" />
                          <span>Evidence Photo Attached</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => editFileInputRef.current?.click()}
                        className="p-5 border-2 border-dashed border-slate-800 hover:border-blue-600 rounded-xl bg-slate-950 text-center cursor-pointer transition-colors space-y-1"
                      >
                        <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                        <p className="text-xs font-semibold text-slate-400">No Photo Evidence attached</p>
                        <p className="text-[10px] text-slate-500">Click here to upload or edit inspection photo (Max 5MB)</p>
                      </div>
                    )}
                  </div>

                  {/* Action Form */}
                  <form onSubmit={handleSaveStatus} className="space-y-4 pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">
                        Update Report Action Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-yellow-400"
                      >
                        <option value="pending">Pending Action</option>
                        <option value="under_review">Under Action Officer Review</option>
                        <option value="in_progress">In Progress (Field Team Dispatched)</option>
                        <option value="resolved">Resolved & Completed</option>
                        <option value="dismissed">Dismissed / Duplicate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">
                        Action Officer Remarks / Resolution Note
                      </label>
                      <textarea
                        rows={3}
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        placeholder="e.g. Dispatched Municipal Engineering Team (Engr. R. Santos) for replacement of luminaire bulb on Aug 3..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-medium text-white focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteConfirmModal({
                            isOpen: true,
                            codes: [selectedReport.reference_code],
                            title: `Delete Report ${selectedReport.reference_code}`
                          });
                        }}
                        className="bg-red-950 hover:bg-red-900 text-red-300 hover:text-white border border-red-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Delete Report</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Work Order</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSavingStatus}
                          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-blue-950 font-black text-xs py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <Send className="w-4 h-4 text-blue-950" />
                          <span>{isSavingStatus ? 'Updating Status...' : 'Save & Notify Citizen'}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            )}

            {/* Confirmation Modal for Delete Action */}
            {deleteConfirmModal?.isOpen && (
              <div className="fixed inset-0 z-70 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-slate-900 border-2 border-red-600/80 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
                  <div className="flex items-center gap-3 text-red-400 border-b border-slate-800 pb-3">
                    <div className="p-2.5 bg-red-950 rounded-xl border border-red-800">
                      <Trash2 className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Confirm Delete Action</h3>
                      <p className="text-xs text-slate-400">{deleteConfirmModal.title}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Are you sure you want to permanently delete <strong className="text-yellow-400">{deleteConfirmModal.codes.length}</strong> feedback record(s) ({deleteConfirmModal.codes.slice(0, 3).join(', ')}{deleteConfirmModal.codes.length > 3 ? '...' : ''})? This action will remove the record(s) from the LGU database.
                  </p>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setDeleteConfirmModal(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDeleteReports(deleteConfirmModal.codes)}
                      className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
};
