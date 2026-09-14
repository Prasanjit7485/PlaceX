import React from 'react';
import {
  X,
  LayoutDashboard,
  Briefcase,
  Globe,
  Calendar as CalendarIcon,
  Users,
  GitMerge,
  Mail,
  Plus
} from 'lucide-react';
import type { AdminTabType } from './AdminSidebar';
import placedLogo from '../../assets/placed_logo.png';

interface AdminMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
  onSeedData?: () => void;
}

export const AdminMobileDrawer: React.FC<AdminMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onSeedData
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard' as AdminTabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'drives' as AdminTabType, label: 'Placement Drives', icon: Briefcase },
    { id: 'scraped' as AdminTabType, label: 'Scraped Jobs', icon: Globe },
    { id: 'calendar' as AdminTabType, label: 'Calendar', icon: CalendarIcon },
    { id: 'students' as AdminTabType, label: 'Student Database', icon: Users },
    { id: 'recruiters' as AdminTabType, label: 'Recruiter Management', icon: Users },
    { id: 'alumni' as AdminTabType, label: 'Alumni Directory', icon: Users },
    { id: 'tracker' as AdminTabType, label: 'Live Round Tracker', icon: GitMerge },
    { id: 'hr' as AdminTabType, label: 'HR Outreach', icon: Mail }
  ];

  return (
    <>
      <div className="ap-mobile-overlay md:hidden" onClick={onClose} />
      <div className="ap-mobile-drawer md:hidden">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-white flex items-center justify-center border border-slate-200 shrink-0 p-1">
              <img src={placedLogo} alt="PlaceD Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-display leading-tight tracking-tight">PlaceD Admin</h3>
              <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mt-0.5">TPO Console</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer border border-transparent hover:border-slate-200"
            title="Close Drawer (✕)"
            aria-label="Close Drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3.5 py-3 flex flex-col gap-1.5 overflow-y-auto min-h-0">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Admin Navigation</span>
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
                className={`group flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all cursor-pointer text-xs ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-extrabold shadow-2xs'
                    : 'text-slate-600 font-bold hover:bg-slate-100/80 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {onSeedData && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => {
                onClose();
                onSeedData();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <Plus size={16} />
              <span>Seed Sample Data</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
