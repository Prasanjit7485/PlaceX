import React, { useMemo, useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  Edit3,
  FileText,
  Plus,
  Trash2,
  Users,
  X,
  Sparkles,
  Globe,
  CheckCircle2,
  Save,
  Loader2
} from 'lucide-react';

import type {
  Alumni,
  Blog,
  BlogCategory,
  Referral,
  AlumniProfileRequest
} from '../api/alumniApi';

import { AlumniSidebar, type AlumniTabType } from './alumni/AlumniSidebar';
import { AlumniMobileDrawer } from './alumni/AlumniMobileDrawer';
import { AlumniHeader } from './alumni/AlumniHeader';
import { AlumniDirectoryView } from './alumni/AlumniDirectoryView';
import './AlumniPortal.css';

interface AlumniPortalProps {
  alumni: Alumni;
  allAlumni?: Alumni[];
  blogs: Blog[];
  referrals: Referral[];

  onLogout: () => void;

  onUpdateProfile?: (
    id: string | number,
    data: AlumniProfileRequest
  ) => Promise<void>;

  onCreateBlog: (
    blogData: Omit<Blog, 'id' | 'alumniId' | 'postedDate'>
  ) => Promise<void>;

  onUpdateBlog: (
    id: string,
    data: {
      title: string;
      content: string;
      category: BlogCategory;
      published: boolean;
    }
  ) => Promise<void>;

  onDeleteBlog: (id: string) => Promise<void>;

  onCreateReferral: (
    referralData: Omit<Referral, 'id' | 'alumniId' | 'postedDate'>
  ) => Promise<void>;

  onUpdateReferral: (
    id: string,
    data: Partial<Referral>
  ) => Promise<void>;

  onDeleteReferral: (id: string) => Promise<void>;
}

const categories: BlogCategory[] = [
  'Interview Experience',
  'Career Advice',
  'Referral Tips',
  'General'
];

export const AlumniPortal: React.FC<AlumniPortalProps> = ({
  alumni,
  allAlumni = [],
  blogs,
  referrals,
  onLogout,
  onUpdateProfile,
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog,
  onCreateReferral,
  onUpdateReferral,
  onDeleteReferral
}) => {
  const [activeTab, setActiveTab] = useState<AlumniTabType>('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Modal state */
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [readingBlog, setReadingBlog] = useState<Blog | null>(null);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  /* Profile Edit Form State */
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileForm, setProfileForm] = useState<AlumniProfileRequest>({
    name: alumni.name || '',
    email: alumni.email || '',
    bio: alumni.bio || '',
    location: alumni.location || '',
    linkedinUrl: alumni.linkedinUrl || alumni.linkedIn || '',
    githubUrl: alumni.githubUrl || '',
    hashNodeUrl: alumni.hashNodeUrl || '',
    devToUrl: alumni.devToUrl || '',
    graduationYear: alumni.graduationYear || 2024,
    currentCompany: alumni.currentCompany || '',
    currentRole: alumni.currentRole || '',
    department: alumni.department || 'Computer Science'
  });

  useEffect(() => {
    setProfileForm({
      name: alumni.name || '',
      email: alumni.email || '',
      bio: alumni.bio || '',
      location: alumni.location || '',
      linkedinUrl: alumni.linkedinUrl || alumni.linkedIn || '',
      githubUrl: alumni.githubUrl || '',
      hashNodeUrl: alumni.hashNodeUrl || '',
      devToUrl: alumni.devToUrl || '',
      graduationYear: alumni.graduationYear || 2024,
      currentCompany: alumni.currentCompany || '',
      currentRole: alumni.currentRole || '',
      department: alumni.department || 'Computer Science'
    });
  }, [alumni]);

  /* Blog Form State */
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: 'Career Advice' as BlogCategory,
    published: true
  });

  /* Referral Form State */
  const [referralForm, setReferralForm] = useState({
    companyName: '',
    role: '',
    description: '',
    active: true
  });

  /* Derived lists */
  const myBlogs = useMemo(
    () => blogs.filter((blog) => String(blog.alumniId) === String(alumni.id)),
    [blogs, alumni.id]
  );

  const myReferrals = useMemo(
    () => referrals.filter((r) => String(r.alumniId) === String(alumni.id)),
    [referrals, alumni.id]
  );

  const publishedBlogs = useMemo(
    () => blogs.filter((b) => b.published),
    [blogs]
  );

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      category: 'Career Advice',
      published: true
    });
    setEditingBlog(null);
  };

  const resetReferralForm = () => {
    setReferralForm({
      companyName: '',
      role: '',
      description: '',
      active: true
    });
    setEditingReferral(null);
    setShowReferralForm(false);
  };

  const handleBlogSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) return;

    const blogData = {
      ...blogForm,
      published: publish
    };

    if (editingBlog) {
      await onUpdateBlog(editingBlog.id, blogData);
    } else {
      await onCreateBlog(blogData);
    }

    resetBlogForm();
    setActiveTab('myBlogs');
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralForm.companyName.trim() || !referralForm.role.trim()) return;

    if (editingReferral) {
      await onUpdateReferral(editingReferral.id, referralForm);
    } else {
      await onCreateReferral(referralForm);
    }

    resetReferralForm();
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;

    setIsSavingProfile(true);
    setProfileSuccessMsg('');

    try {
      const payload: AlumniProfileRequest = {
        ...profileForm,
        email: profileForm.email || alumni.email
      };
      await onUpdateProfile(alumni.id, payload);
      setProfileSuccessMsg('Profile details updated successfully!');
      setTimeout(() => setProfileSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const startEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      published: blog.published
    });
    setActiveTab('blogs');
  };

  const startEditReferral = (referral: Referral) => {
    setEditingReferral(referral);
    setReferralForm({
      companyName: referral.companyName,
      role: referral.role,
      description: referral.description,
      active: referral.active
    });
    setShowReferralForm(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-primary">
      {/* Desktop Collapsible Sidebar */}
      <AlumniSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
        alumni={alumni}
        onLogout={onLogout}
      />

      {/* Mobile Navigation Drawer */}
      <AlumniMobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alumni={alumni}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <AlumniHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          alumni={alumni}
          onLogout={onLogout}
        />

        {/* Content Container */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-7 animate-fade-in pb-10">
              {/* Welcome Hero Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-orange-200/90 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/15 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold tracking-wider uppercase backdrop-blur-md inline-flex items-center gap-1.5 shadow-2xs">
                    <Sparkles size={13} /> Welcome Back
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mt-3">
                    Hello, {alumni.name ? alumni.name.split(' ')[0] : 'Alumni'} 👋
                  </h2>
                  <p className="text-orange-100 text-xs sm:text-sm max-w-xl leading-relaxed font-medium mt-1">
                    Share your career insights, publish interview blogs, and offer referrals to help current students get placed.
                  </p>
                </div>

                <div className="relative z-10 shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="px-5 py-3 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 active:scale-95 font-extrabold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={16} />
                    Write Blog
                  </button>
                  <button
                    onClick={() => setActiveTab('referral')}
                    className="px-5 py-3 rounded-2xl bg-orange-950/40 hover:bg-orange-950/60 active:scale-95 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer border border-white/20"
                  >
                    <Briefcase size={16} />
                    Offer Referral
                  </button>
                </div>

                <Award className="absolute -right-6 -bottom-6 text-white/10 w-48 h-48 pointer-events-none" />
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Blogs Posted</span>
                    <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">{myBlogs.length}</h3>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Referrals Offered</span>
                    <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">{myReferrals.length}</h3>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Users size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Network Members</span>
                    <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">{allAlumni.length || publishedBlogs.length || 1}</h3>
                  </div>
                </div>
              </div>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {/* Recent Activity */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg font-display">Recent Activity</h3>
                      <p className="text-xs text-slate-500 font-medium">Your latest published articles and referral updates</p>
                    </div>
                  </div>

                  {myBlogs.length === 0 && myReferrals.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <BookOpen size={32} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-xs font-bold">You haven't posted any blogs or referrals yet.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {[
                        ...myBlogs.map((b) => ({
                          id: b.id,
                          title: b.title,
                          type: 'Blog Post',
                          date: b.postedDate
                        })),
                        ...myReferrals.map((r) => ({
                          id: r.id,
                          title: `${r.companyName} — ${r.role}`,
                          type: 'Referral Opportunity',
                          date: r.postedDate
                        }))
                      ]
                        .slice(0, 5)
                        .map((act) => (
                          <div
                            key={act.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-extrabold text-slate-900 truncate">{act.title}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{act.type} · {act.date}</span>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-orange-100/80 text-orange-800 text-[10px] font-extrabold shrink-0">
                              Active
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Quick Actions & Profile Overview */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg font-display">Alumni Quick Actions</h3>
                    <p className="text-xs text-slate-500 font-medium">Contribute insights or update your profile details</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setActiveTab('blogs')}
                      className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 hover:border-orange-300 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                          <FileText size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">Write Career Experience Blog</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Help students prepare for placement interviews</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('referral')}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 hover:border-amber-300 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
                          <Briefcase size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">Post Referral Opportunity</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Share hiring drives from your current organization</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                          <Edit3 size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">Update Profile & Developer Links</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Keep your company, role, GitHub & LinkedIn updated</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WRITE BLOG TAB */}
          {activeTab === 'blogs' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-6 animate-fade-in pb-10">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 font-display text-lg">
                    {editingBlog ? 'Edit Blog Article' : 'Compose New Blog Article'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Share your interview experiences, technical advice, or career journey with current campus students.
                  </p>
                </div>
              </div>

              <form onSubmit={(e) => handleBlogSubmit(e, blogForm.published)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Blog Article Title *</label>
                  <input
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. My Google Software Engineer Interview Experience & Prep Strategy"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Category *</label>
                  <div className="relative">
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as BlogCategory })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 appearance-none bg-white transition-all cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Content / Article Body *</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="Write detailed rounds, coding questions, interview tips, and recommendations for students..."
                    rows={12}
                    required
                    className="w-full border border-slate-200 rounded-xl p-4 text-xs sm:text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-mono resize-y"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-700">Publish this blog immediately to the student community</span>
                </label>

                <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-100">
                  {editingBlog && (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={16} />
                    {editingBlog ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MY BLOGS TAB */}
          {activeTab === 'myBlogs' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-6 animate-fade-in pb-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 font-display text-lg">My Published Blogs</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Manage and review all articles you have contributed</p>
                </div>
                <button
                  onClick={() => {
                    resetBlogForm();
                    setActiveTab('blogs');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  Write New Blog
                </button>
              </div>

              {myBlogs.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <FileText size={40} className="mx-auto mb-2 text-slate-300" />
                  <h4 className="font-extrabold text-slate-800 text-base">No blogs written yet</h4>
                  <p className="text-xs text-slate-500 mt-1">Start sharing your experiences to guide students.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myBlogs.map((blog) => (
                    <div key={blog.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase">
                            {blog.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${blog.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-base font-display">{blog.title}</h4>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{blog.content}</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60">
                        <span className="text-[11px] text-slate-400 font-medium">Posted {blog.postedDate}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setReadingBlog(blog)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Read
                          </button>
                          <button
                            onClick={() => startEditBlog(blog)}
                            className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold hover:bg-orange-100 flex items-center gap-1"
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this blog post?')) onDeleteBlog(blog.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold hover:bg-rose-100 flex items-center gap-1"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REFERRAL TAB */}
          {activeTab === 'referral' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-6 animate-fade-in pb-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 font-display text-lg">Referral Opportunities</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Post active referral openings in your organization for students</p>
                </div>
                <button
                  onClick={() => {
                    resetReferralForm();
                    setShowReferralForm(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  Add Referral
                </button>
              </div>

              {showReferralForm && (
                <form onSubmit={handleReferralSubmit} className="p-6 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col gap-4">
                  <h4 className="font-extrabold text-slate-900 text-sm">{editingReferral ? 'Edit Referral' : 'Post New Referral'}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-extrabold text-slate-700">Company Name *</label>
                      <input
                        required
                        value={referralForm.companyName}
                        onChange={(e) => setReferralForm({ ...referralForm, companyName: e.target.value })}
                        placeholder="Microsoft / Google / Amazon"
                        className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-extrabold text-slate-700">Job Role / Position *</label>
                      <input
                        required
                        value={referralForm.role}
                        onChange={(e) => setReferralForm({ ...referralForm, role: e.target.value })}
                        placeholder="Software Engineer / SDE-1"
                        className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-extrabold text-slate-700">Instructions / Description</label>
                    <textarea
                      rows={4}
                      value={referralForm.description}
                      onChange={(e) => setReferralForm({ ...referralForm, description: e.target.value })}
                      placeholder="Requirements, job ID, or email instructions for candidate resumes..."
                      className="border border-slate-200 rounded-xl p-3 text-xs bg-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={referralForm.active}
                        onChange={(e) => setReferralForm({ ...referralForm, active: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-600"
                      />
                      <span className="text-xs font-bold text-slate-700">Active Referral Opening</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button type="button" onClick={resetReferralForm} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 rounded-xl bg-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-500/20">
                        {editingReferral ? 'Update Referral' : 'Post Referral'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Referral List */}
              <div className="flex flex-col gap-4">
                {myReferrals.length === 0 && !showReferralForm ? (
                  <div className="text-center py-16 text-slate-400">
                    <Briefcase size={40} className="mx-auto mb-2 text-slate-300" />
                    <h4 className="font-extrabold text-slate-800 text-base">No active referral posts</h4>
                    <p className="text-xs text-slate-500 mt-1">Post referral opportunities to assist students in finding employment.</p>
                  </div>
                ) : (
                  myReferrals.map((ref) => (
                    <div key={ref.id} className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 border border-amber-200">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-extrabold text-slate-900 text-base">{ref.companyName}</h4>
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-extrabold">{ref.role}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{ref.description}</p>
                          <span className="text-[10px] text-slate-400 font-medium mt-2 block">Posted {ref.postedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 justify-end">
                        <button onClick={() => startEditReferral(ref)} className="px-3.5 py-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 text-xs font-extrabold flex items-center gap-1">
                          <Edit3 size={14} /> Edit
                        </button>
                        <button onClick={() => { if (window.confirm('Delete referral?')) onDeleteReferral(ref.id); }} className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-extrabold flex items-center gap-1">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* DIRECTORY TAB */}
          {activeTab === 'directory' && (
            <AlumniDirectoryView alumniList={allAlumni.length > 0 ? allAlumni : [alumni]} currentAlumni={alumni} />
          )}

          {/* SETTINGS / PROFILE TAB */}
          {activeTab === 'settings' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-6 animate-fade-in pb-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 font-display text-lg">Alumni Profile & Backend Information</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Update all entity fields stored in PostgreSQL database (`location`, `bio`, social URLs, `currentCompany`, `currentRole`, `department`)
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> TPO Verified Alumni
                </span>
              </div>

              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
                {/* Basic Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Full Name *</label>
                    <input
                      required
                      value={profileForm.name || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Email Address (Account Identifier)</label>
                    <input
                      disabled
                      value={alumni.email}
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs bg-slate-100 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Company & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Current Organization / Company</label>
                    <input
                      value={profileForm.currentCompany || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, currentCompany: e.target.value })}
                      placeholder="Google / Microsoft / Amazon"
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Job Role / Position</label>
                    <input
                      value={profileForm.currentRole || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, currentRole: e.target.value })}
                      placeholder="Senior Software Engineer"
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Location / City</label>
                    <input
                      value={profileForm.location || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      placeholder="Bengaluru, KA / Remote"
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Department & Grad Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Graduation Year</label>
                    <input
                      type="number"
                      value={profileForm.graduationYear || 2024}
                      onChange={(e) => setProfileForm({ ...profileForm, graduationYear: parseInt(e.target.value, 10) || 2024 })}
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Department / Stream</label>
                    <select
                      value={profileForm.department || 'Computer Science'}
                      onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-slate-700">Alumni Bio / Summary</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    placeholder="Brief description of career experience, tech stack expertise, and mentoring interest..."
                    className="border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-orange-500"
                  />
                </div>

                {/* Social & Developer Handles (Backend Fields) */}
                <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/80 flex flex-col gap-4">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-orange-900 flex items-center gap-2">
                    <Globe size={15} className="text-orange-600" />
                    Developer Portfolios & Professional Links (Database Entity)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">LinkedIn URL</label>
                      <input
                        value={profileForm.linkedinUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">GitHub URL</label>
                      <input
                        value={profileForm.githubUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/username"
                        className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">Hashnode URL</label>
                      <input
                        value={profileForm.hashNodeUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, hashNodeUrl: e.target.value })}
                        placeholder="https://hashnode.com/@username"
                        className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700">Dev.to URL</label>
                      <input
                        value={profileForm.devToUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, devToUrl: e.target.value })}
                        placeholder="https://dev.to/username"
                        className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSavingProfile ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save size={16} /> Save Profile Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Reader Modal for Blogs */}
      {readingBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 flex flex-col gap-5 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setReadingBlog(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>

            <span className="px-3 py-1 rounded-md bg-orange-100 text-orange-900 font-extrabold text-xs uppercase w-fit">
              {readingBlog.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display leading-tight pr-8">
              {readingBlog.title}
            </h2>

            <div className="text-xs text-slate-400 font-medium">
              Posted on {readingBlog.postedDate}
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl border border-slate-100">
              {readingBlog.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};