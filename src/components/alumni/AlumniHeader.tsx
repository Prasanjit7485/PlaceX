import React from 'react';
import { Menu, LogOut, Sparkles, Building2 } from 'lucide-react';
import type { Alumni } from '../../api/alumniApi';
import type { AlumniTabType } from './AlumniSidebar';

interface AlumniHeaderProps {
  activeTab: AlumniTabType;
  onOpenMobileMenu: () => void;
  alumni: Alumni;
  onLogout: () => void;
}

export const AlumniHeader: React.FC<AlumniHeaderProps> = ({
  activeTab,
  onOpenMobileMenu,
  alumni,
  onLogout
}) => {
  const titleMap: Record<AlumniTabType, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Alumni Dashboard',
      subtitle: 'Overview of your contributions, blog posts, and active referrals'
    },
    blogs: {
      title: 'Write a Blog',
      subtitle: 'Share career advice, interview experiences, and insights'
    },
    myBlogs: {
      title: 'My Published Blogs',
      subtitle: 'Manage and review articles you have published for students'
    },
    referral: {
      title: 'Offer Referral',
      subtitle: 'Post referral opportunities to help current students get hired'
    },
    directory: {
      title: 'Alumni Directory',
      subtitle: 'Browse and connect with verified alumni network members'
    },
    settings: {
      title: 'Alumni Profile Settings',
      subtitle: 'Manage your profile details, social handles, and career info'
    }
  };

  const current = titleMap[activeTab] || {
    title: 'Alumni Portal',
    subtitle: 'PlaceD Institutional Alumni Network'
  };

  const initials = alumni.name
    ? alumni.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AL';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-orange-100/80 px-4 sm:px-8 py-4 transition-all shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-orange-100/80 text-orange-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={11} className="text-orange-600" />
                Alumni Network
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display tracking-tight mt-0.5">
              {current.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: User Badge & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {alumni.name}
              </span>
              <span className="text-[10px] text-orange-700 font-extrabold flex items-center gap-1">
                <Building2 size={10} />
                {alumni.currentCompany || alumni.currentRole || 'Verified Alumni'}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 text-xs font-extrabold transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs"
            title="Sign Out"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
