import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Calendar as CalendarIcon,
  Sparkles,
  MessageSquare,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import type { Student } from '../../mockData';
import type { StudentTabType } from './StudentSidebar';
import placedLogo from '../../assets/placed_logo.png';

interface StudentMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: StudentTabType;
  setActiveTab: (tab: StudentTabType) => void;
  currentStudent: Student;
}

export const StudentMobileDrawer: React.FC<StudentMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currentStudent
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard' as StudentTabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'drives' as StudentTabType, label: 'Placement Drives', icon: Briefcase },
    { id: 'calendar' as StudentTabType, label: 'Placement Calendar', icon: CalendarIcon },
    { id: 'ats' as StudentTabType, label: 'ATS Resume Scorer', icon: Sparkles },
    { id: 'interview' as StudentTabType, label: 'Mock Interview Simulator', icon: MessageSquare },
    { id: 'visualizer' as StudentTabType, label: 'Recruitment Pipeline', icon: TrendingUp },
    { id: 'profile' as StudentTabType, label: 'Profile Settings', icon: User }
  ];

  return (
    <>
      {/* Translucent Backdrop Overlay */}
      <div className="sp-drawer-backdrop md:hidden" onClick={onClose} />

      {/* Sliding Mobile Drawer Panel */}
      <div className="sp-drawer-panel md:hidden">
        {/* Header with PlaceD Brand & Always Visible Close Button (✕) */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-white flex items-center justify-center border border-slate-200 shrink-0 p-1">
              <img src={placedLogo} alt="PlaceD Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-display leading-tight tracking-tight">PlaceD</h3>
              <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mt-0.5">Student Portal</p>
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

        {/* Student Profile Info Pill inside Drawer */}
        <div className="mx-4 my-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
            {currentStudent.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-900 font-display truncate" title={currentStudent.name}>
                {currentStudent.name}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 text-[10px] font-bold shrink-0">
                Active
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
              {currentStudent.department} • {currentStudent.cgpa} CGPA
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3.5 py-2 flex flex-col gap-1.5 overflow-y-auto min-h-0">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Navigation Menu</span>
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

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[11px] font-semibold text-slate-400">PlaceD Campus Recruitment Suite</p>
        </div>
      </div>
    </>
  );
};
