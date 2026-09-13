import React from 'react';
import {
  X,
  LayoutDashboard,
  FileText,
  BookOpen,
  Briefcase,
  Users,
  User,
  LogOut
} from 'lucide-react';
import type { Alumni } from '../../api/alumniApi';
import type { AlumniTabType } from './AlumniSidebar';
import placedLogo from '../../assets/placed_logo.png';

interface AlumniMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: AlumniTabType;
  setActiveTab: (tab: AlumniTabType) => void;
  alumni: Alumni;
  onLogout: () => void;
}

export const AlumniMobileDrawer: React.FC<AlumniMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  alumni,
  onLogout
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard' as AlumniTabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs' as AlumniTabType, label: 'Write Blog', icon: FileText },
    { id: 'myBlogs' as AlumniTabType, label: 'My Blogs', icon: BookOpen },
    { id: 'referral' as AlumniTabType, label: 'Offer Referral', icon: Briefcase },
    { id: 'directory' as AlumniTabType, label: 'Alumni Directory', icon: Users },
    { id: 'settings' as AlumniTabType, label: 'Profile Settings', icon: User }
  ];

  const initials = alumni.name
    ? alumni.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AL';

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative flex-1 max-w-xs w-full bg-white shadow-2xl flex flex-col h-full z-10 animate-slide-right">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={placedLogo} alt="PlaceD Logo" className="w-7 h-7 object-contain rounded-md shrink-0" />
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-sm leading-none font-display">
                PlaceD Alumni
              </span>
              <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider mt-0.5">
                Alumni Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-blue-50/60 border-b border-blue-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-slate-900 truncate">
              {alumni.name}
            </span>
            <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider truncate">
              {alumni.currentCompany || alumni.department || 'Alumni'}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 flex-1 overflow-y-auto flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:bg-blue-50/80 hover:text-blue-700'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
