import React from 'react';
import {
  X,
  LayoutDashboard,
  Briefcase,
  GitMerge
} from 'lucide-react';
import type { RecruiterTabType } from './RecruiterSidebar';
import type { Recruiter } from '../../mockData';
import placedLogo from '../../assets/placed_logo.png';

interface RecruiterMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: RecruiterTabType;
  setActiveTab: (tab: RecruiterTabType) => void;
  recruiter: Recruiter;
}

export const RecruiterMobileDrawer: React.FC<RecruiterMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  recruiter
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard' as RecruiterTabType, label: 'Hiring Dashboard', icon: LayoutDashboard },
    { id: 'drives' as RecruiterTabType, label: 'Company Drives', icon: Briefcase },
    { id: 'tracker' as RecruiterTabType, label: 'Applicant Tracker', icon: GitMerge }
  ];

  return (
    <>
      <div className="rp-mobile-overlay md:hidden" onClick={onClose} />
      <div className="rp-mobile-drawer md:hidden">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-white flex items-center justify-center border border-slate-200 shrink-0 p-1">
              <img src={placedLogo} alt="PlaceD Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-display leading-tight tracking-tight">{recruiter.companyName}</h3>
              <p className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest mt-0.5">Recruiter Portal</p>
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
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Recruiter Console</span>
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
                    ? 'bg-sky-50 text-sky-700 border border-sky-200/80 font-extrabold shadow-2xs'
                    : 'text-slate-600 font-bold hover:bg-slate-100/80 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-2xs'
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

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[11px] font-semibold text-slate-400">PlaceD Corporate Partner Console</p>
        </div>
      </div>
    </>
  );
};
