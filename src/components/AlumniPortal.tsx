import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  Edit3,
  ExternalLink,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  Settings,
  Trash2,
  Users,
  X
} from 'lucide-react';

import type {
  Alumni,
  Blog,
  BlogCategory,
  Referral
} from '../api/alumniApi';

import './AlumniPortal.css';

type AlumniTab =
  | 'dashboard'
  | 'blogs'
  | 'myBlogs'
  | 'referral'
  | 'settings';

interface AlumniPortalProps {
  alumni: Alumni;
  blogs: Blog[];
  referrals: Referral[];

  onLogout: () => void;

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
  blogs,
  referrals,
  onLogout,
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog,
  onCreateReferral,
  onUpdateReferral,
  onDeleteReferral
}) => {
  const [activeTab, setActiveTab] =
    useState<AlumniTab>('dashboard');

  const [mobileOpen, setMobileOpen] = useState(false);

  const [editingBlog, setEditingBlog] =
    useState<Blog | null>(null);

  const [readingBlog, setReadingBlog] =
    useState<Blog | null>(null);

  const [, setShowBlogForm] = useState(false);

  const [showReferralForm, setShowReferralForm] =
    useState(false);

  const [editingReferral, setEditingReferral] =
    useState<Referral | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: 'Career Advice' as BlogCategory,
    published: true
  });

  const [referralForm, setReferralForm] = useState({
    companyName: '',
    role: '',
    description: '',
    active: true
  });

  const myBlogs = useMemo(
    () => blogs.filter((blog) => blog.alumniId === alumni.id),
    [blogs, alumni.id]
  );

  const myReferrals = useMemo(
    () =>
      referrals.filter(
        (referral) => referral.alumniId === alumni.id
      ),
    [referrals, alumni.id]
  );

  const publishedBlogs = blogs.filter(
    (blog) => blog.published
  );

  const navigate = (tab: AlumniTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      category: 'Career Advice',
      published: true
    });

    setEditingBlog(null);
    setShowBlogForm(false);
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

  const handleBlogSubmit = (
  e: React.FormEvent,
  publish: boolean
) => {
  e.preventDefault();

  if (!blogForm.title.trim() || !blogForm.content.trim()) {
    return;
  }

  const blogData = {
    ...blogForm,
    published: publish,
  };

  if (editingBlog) {
    onUpdateBlog(editingBlog.id, blogData);
  } else {
    onCreateBlog(blogData);
  }

  resetBlogForm();
};
  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !referralForm.companyName.trim() ||
      !referralForm.role.trim()
    ) {
      return;
    }

    if (editingReferral) {
      onUpdateReferral(
        editingReferral.id,
        referralForm
      );
    } else {
      onCreateReferral(referralForm);
    }

    resetReferralForm();
  };

  const startEditBlog = (blog: Blog) => {
    setEditingBlog(blog);

    setBlogForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      published: blog.published
    });

    setShowBlogForm(true);
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

  const initials = alumni.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navigation = [
    {
      id: 'dashboard' as AlumniTab,
      label: 'Dashboard',
      icon: Home
    },
    {
      id: 'blogs' as AlumniTab,
      label: 'Write Blog',
      icon: FileText
    },
    {
      id: 'myBlogs' as AlumniTab,
      label: 'My Blogs',
      icon: BookOpen
    },
    {
      id: 'referral' as AlumniTab,
      label: 'Offer Referral',
      icon: Briefcase
    },
    {
      id: 'settings' as AlumniTab,
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="alumni-layout">

      {/* Mobile top bar */}
      <div className="alumni-mobile-header">
        <button
          onClick={() => setMobileOpen(true)}
          className="alumni-icon-btn"
        >
          <Menu size={21} />
        </button>

        <div className="alumni-mobile-title">
          PlaceX Alumni
        </div>

        <div className="alumni-avatar small">
          {initials}
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`alumni-sidebar ${
          mobileOpen ? 'open' : ''
        }`}
      >
        <div className="alumni-sidebar-header">
          <div className="alumni-brand">
            <div className="alumni-brand-icon">
              <Award size={22} />
            </div>

            <div>
              <div className="alumni-brand-name">
                PlaceX
              </div>

              <div className="alumni-brand-subtitle">
                ALUMNI PORTAL
              </div>
            </div>
          </div>

          <button
            className="alumni-close-mobile"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="alumni-profile">
          <div className="alumni-avatar">
            {initials}
          </div>

          <div className="alumni-profile-info">
            <strong>{alumni.name}</strong>
            <span>{alumni.currentCompany}</span>
          </div>
        </div>

        <nav className="alumni-navigation">
          <div className="alumni-nav-label">
            ALUMNI WORKSPACE
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`alumni-nav-item ${
                  activeTab === item.id ? 'active' : ''
                }`}
                onClick={() => navigate(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="alumni-sidebar-footer">
          <button
            className="alumni-logout"
            onClick={onLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="alumni-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <main className="alumni-main">

        <header className="alumni-topbar">
          <div>
            <div className="alumni-page-kicker">
              ALUMNI NETWORK
            </div>

            <h1>
              {activeTab === 'dashboard' &&
                'Alumni Dashboard'}

              {activeTab === 'blogs' &&
                'Write a Blog'}

              {activeTab === 'myBlogs' &&
                'My Blogs'}

              {activeTab === 'referral' &&
                'Offer Referral'}

              {activeTab === 'settings' &&
                'Settings'}
            </h1>
          </div>

          <div className="alumni-topbar-user">
            <div className="alumni-topbar-user-text">
              <strong>{alumni.name}</strong>
              <span>{alumni.currentRole}</span>
            </div>

            <div className="alumni-avatar">
              {initials}
            </div>
          </div>
        </header>

        <section className="alumni-content">

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="alumni-welcome-card">
                <div>
                  <span className="welcome-label">
                    WELCOME BACK
                  </span>

                  <h2>
                    Hello, {alumni.name.split(' ')[0]} 👋
                  </h2>

                  <p>
                    Share your experience, help students,
                    and strengthen the PlaceX alumni network.
                  </p>
                </div>

                <Award
                  className="welcome-decoration"
                  size={86}
                />
              </div>

              <div className="alumni-stat-grid">

                <div className="alumni-stat-card">
                  <div className="stat-icon blue">
                    <BookOpen size={21} />
                  </div>

                  <div>
                    <span>Blogs Posted</span>
                    <strong>{myBlogs.length}</strong>
                  </div>
                </div>

                <div className="alumni-stat-card">
                  <div className="stat-icon green">
                    <Briefcase size={21} />
                  </div>

                  <div>
                    <span>Referrals Offered</span>
                    <strong>{myReferrals.length}</strong>
                  </div>
                </div>

                <div className="alumni-stat-card">
                  <div className="stat-icon purple">
                    <Users size={21} />
                  </div>

                  <div>
                    <span>Published Blogs</span>
                    <strong>{publishedBlogs.length}</strong>
                  </div>
                </div>
              </div>

              <div className="alumni-two-column">

                <div className="alumni-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Recent Activity</h3>
                      <p>Your latest contributions</p>
                    </div>
                  </div>

                  {myBlogs.length === 0 &&
                  myReferrals.length === 0 ? (
                    <div className="alumni-empty">
                      <BookOpen size={32} />
                      <p>
                        You haven't posted anything yet.
                      </p>
                    </div>
                  ) : (
                    <div className="activity-list">
                      {[
                        ...myBlogs.map((blog) => ({
                          id: blog.id,
                          title: blog.title,
                          type: 'Blog',
                          date: blog.postedDate
                        })),
                        ...myReferrals.map((ref) => ({
                          id: ref.id,
                          title: `${ref.companyName} — ${ref.role}`,
                          type: 'Referral',
                          date: ref.postedDate
                        }))
                      ]
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )
                        .slice(0, 5)
                        .map((activity) => (
                          <div
                            className="activity-item"
                            key={activity.id}
                          >
                            <div className="activity-dot" />

                            <div>
                              <strong>
                                {activity.title}
                              </strong>

                              <span>
                                {activity.type} ·{' '}
                                {activity.date}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="alumni-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Quick Actions</h3>
                      <p>Contribute to the community</p>
                    </div>
                  </div>

                  <div className="quick-actions">
                    <button
                      onClick={() => navigate('blogs')}
                    >
                      <FileText size={20} />
                      <div>
                        <strong>Write a Blog</strong>
                        <span>
                          Share your career experience
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('referral')}
                    >
                      <Briefcase size={20} />
                      <div>
                        <strong>Offer a Referral</strong>
                        <span>
                          Help students get opportunities
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* WRITE BLOG */}
          {activeTab === 'blogs' && (
            <div className="alumni-panel large">
              <div className="panel-heading">
                <div>
                  <h3>
                    {editingBlog
                      ? 'Edit Blog'
                      : 'Create New Blog'}
                  </h3>

                  <p>
                    Share knowledge and career
                    experiences with current students.
                  </p>
                </div>
              </div>

              <form
                className="alumni-form"
                onSubmit={(e) =>
                  handleBlogSubmit(e, blogForm.published)
                }
              >
                <div className="form-field">
                  <label>Blog Title</label>

                  <input
                    value={blogForm.title}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        title: e.target.value
                      })
                    }
                    placeholder="e.g. My journey from college to software engineering"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Category</label>

                  <div className="select-wrapper">
                    <select
                      value={blogForm.category}
                      onChange={(e) =>
                        setBlogForm({
                          ...blogForm,
                          category:
                            e.target.value as BlogCategory
                        })
                      }
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={17} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Content</label>

                  <textarea
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        content: e.target.value
                      })
                    }
                    placeholder="Write your experience or advice here..."
                    rows={12}
                    required
                  />
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        published: e.target.checked
                      })
                    }
                  />

                  <span>
                    Publish this blog immediately
                  </span>
                </label>

                <div className="form-actions">
                  {editingBlog && (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={resetBlogForm}
                    >
                      Cancel
                    </button>
                  )}

                  <button
  type="button"
  onClick={(e) => handleBlogSubmit(e, true)}
>
  Publish Blog
</button>
                </div>
              </form>
            </div>
          )}

          {/* MY BLOGS */}
          {activeTab === 'myBlogs' && (
            <div className="alumni-panel large">
              <div className="panel-heading">
                <div>
                  <h3>Your Blogs</h3>
                  <p>
                    Manage everything you have written.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    resetBlogForm();
                    navigate('blogs');
                  }}
                >
                  <Plus size={17} />
                  Write Blog
                </button>
              </div>

              {myBlogs.length === 0 ? (
                <div className="alumni-empty large-empty">
                  <FileText size={40} />
                  <h3>No blogs yet</h3>
                  <p>
                    Start by sharing your first career
                    experience.
                  </p>
                </div>
              ) : (
                <div className="blog-list">
                  {myBlogs.map((blog) => (
                    <article
                      className="blog-card"
                      key={blog.id}
                    >
                      <div className="blog-card-top">
                        <span className="category-badge">
                          {blog.category}
                        </span>

                        <span
                          className={`status-badge ${
                            blog.published
                              ? 'published'
                              : 'draft'
                          }`}
                        >
                          {blog.published
                            ? 'Published'
                            : 'Draft'}
                        </span>
                      </div>

                      <h3>{blog.title}</h3>

                      <p>
                        {blog.content.length > 180
                          ? `${blog.content.slice(
                              0,
                              180
                            )}...`
                          : blog.content}
                      </p>

                      <div className="blog-card-bottom">
                        <span>
                          Posted {blog.postedDate}
                        </span>

                        <div className="card-actions">
                          <button
                            onClick={() =>
                              setReadingBlog(blog)
                            }
                          >
                            Read
                          </button>

                          <button
                            onClick={() => {
                              startEditBlog(blog);
                              navigate('blogs');
                            }}
                          >
                            <Edit3 size={15} />
                            Edit
                          </button>

                          <button
                            className="danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Delete this blog?'
                                )
                              ) {
                                onDeleteBlog(blog.id);
                              }
                            }}
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REFERRAL */}
          {activeTab === 'referral' && (
            <div className="alumni-panel large">
              <div className="panel-heading">
                <div>
                  <h3>Referral Opportunities</h3>
                  <p>
                    Offer genuine opportunities to
                    current students.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    resetReferralForm();
                    setShowReferralForm(true);
                  }}
                >
                  <Plus size={17} />
                  Add Referral
                </button>
              </div>

              {showReferralForm && (
                <form
                  className="referral-form"
                  onSubmit={handleReferralSubmit}
                >
                  <div className="form-grid">

                    <div className="form-field">
                      <label>Company Name</label>

                      <input
                        required
                        value={
                          referralForm.companyName
                        }
                        onChange={(e) =>
                          setReferralForm({
                            ...referralForm,
                            companyName:
                              e.target.value
                          })
                        }
                        placeholder="Microsoft"
                      />
                    </div>

                    <div className="form-field">
                      <label>Role</label>

                      <input
                        required
                        value={referralForm.role}
                        onChange={(e) =>
                          setReferralForm({
                            ...referralForm,
                            role: e.target.value
                          })
                        }
                        placeholder="Software Engineer"
                      />
                    </div>

                  </div>

                  <div className="form-field">
                    <label>Description</label>

                    <textarea
                      rows={5}
                      value={referralForm.description}
                      onChange={(e) =>
                        setReferralForm({
                          ...referralForm,
                          description:
                            e.target.value
                        })
                      }
                      placeholder="Explain the opportunity and any useful instructions..."
                    />
                  </div>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={referralForm.active}
                      onChange={(e) =>
                        setReferralForm({
                          ...referralForm,
                          active: e.target.checked
                        })
                      }
                    />

                    <span>
                      Make this referral active
                    </span>
                  </label>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={resetReferralForm}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingReferral
                        ? 'Update Referral'
                        : 'Post Referral'}
                    </button>
                  </div>
                </form>
              )}

              <div className="referral-list">
                {myReferrals.length === 0 &&
                !showReferralForm ? (
                  <div className="alumni-empty large-empty">
                    <Briefcase size={40} />
                    <h3>No referrals yet</h3>
                    <p>
                      Add a referral opportunity for
                      current students.
                    </p>
                  </div>
                ) : (
                  myReferrals.map((referral) => (
                    <div
                      className="referral-card"
                      key={referral.id}
                    >
                      <div className="referral-company-icon">
                        <Briefcase size={22} />
                      </div>

                      <div className="referral-main">
                        <div className="referral-title-row">
                          <div>
                            <h3>
                              {referral.companyName}
                            </h3>
                            <strong>
                              {referral.role}
                            </strong>
                          </div>

                          <span
                            className={`status-badge ${
                              referral.active
                                ? 'published'
                                : 'draft'
                            }`}
                          >
                            {referral.active
                              ? 'Active'
                              : 'Inactive'}
                          </span>
                        </div>

                        <p>
                          {referral.description ||
                            'No description provided.'}
                        </p>

                        <div className="referral-footer">
                          <span>
                            Posted {referral.postedDate}
                          </span>

                          <div className="card-actions">
                            <button
                              onClick={() =>
                                startEditReferral(
                                  referral
                                )
                              }
                            >
                              <Edit3 size={15} />
                              Edit
                            </button>

                            <button
                              className="danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Delete this referral?'
                                  )
                                ) {
                                  onDeleteReferral(
                                    referral.id
                                  );
                                }
                              }}
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="alumni-panel large">
              <div className="panel-heading">
                <div>
                  <h3>Alumni Profile</h3>
                  <p>
                    Information associated with your
                    alumni account.
                  </p>
                </div>
              </div>

              <div className="settings-profile">
                <div className="alumni-avatar huge">
                  {initials}
                </div>

                <div>
                  <h2>{alumni.name}</h2>
                  <p>{alumni.email}</p>

                  <span className="approved-badge">
                    ✓ TPO Approved
                  </span>
                </div>
              </div>

              <div className="profile-grid">
                <div>
                  <span>Graduation Year</span>
                  <strong>
                    {alumni.graduationYear}
                  </strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>
                    {alumni.department}
                  </strong>
                </div>

                <div>
                  <span>Current Company</span>
                  <strong>
                    {alumni.currentCompany}
                  </strong>
                </div>

                <div>
                  <span>Current Role</span>
                  <strong>
                    {alumni.currentRole}
                  </strong>
                </div>
              </div>

              {alumni.linkedIn && (
                <a
                  href={alumni.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="linkedin-button"
                >
                  <ExternalLink size={17} />
                  Open LinkedIn Profile
                </a>
              )}
            </div>
          )}

        </section>
      </main>

      {/* Blog reader */}
      {readingBlog && (
        <div className="alumni-modal-overlay">
          <div className="alumni-modal">
            <button
              className="modal-close"
              onClick={() => setReadingBlog(null)}
            >
              <X size={20} />
            </button>

            <span className="category-badge">
              {readingBlog.category}
            </span>

            <h2>{readingBlog.title}</h2>

            <div className="modal-meta">
              Posted on {readingBlog.postedDate}
            </div>

            <div className="modal-content">
              {readingBlog.content}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};