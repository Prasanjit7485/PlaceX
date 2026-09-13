import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import type { AlumniTabType } from './AlumniSidebar';

interface AlumniHeaderProps {
  activeTab: AlumniTabType;
  onOpenMobileMenu: () => void;
}

export const AlumniHeader: React.FC<AlumniHeaderProps> = ({
  activeTab,
  onOpenMobileMenu
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

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-blue-100/80 px-4 sm:px-8 py-4 transition-all shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={11} className="text-blue-600" />
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
      </div>
    </header>
  );
};
