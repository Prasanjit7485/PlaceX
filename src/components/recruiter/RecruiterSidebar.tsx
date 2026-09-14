import React, { useState } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  GitMerge
} from 'lucide-react';
import type { Recruiter } from '../../mockData';
import placedLogo from '../../assets/placed_logo.png';

export type RecruiterTabType = 'dashboard' | 'drives' | 'tracker';

interface RecruiterSidebarProps {
  activeTab: RecruiterTabType;
  setActiveTab: (tab: RecruiterTabType) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  recruiter: Recruiter;
}

export const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({
  activeTab,
  setActiveTab,
  isExpanded,
  onToggleExpand,
  recruiter
}) => {
  const [tooltip, setTooltip] = useState<{ text: string; top: number } | null>(null);

  const navItems = [
    { id: 'dashboard' as RecruiterTabType, label: 'Hiring Dashboard', icon: LayoutDashboard },
    { id: 'drives' as RecruiterTabType, label: 'Company Drives', icon: Briefcase },
    { id: 'tracker' as RecruiterTabType, label: 'Applicant Tracker', icon: GitMerge }
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
    if (!isExpanded) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({ text: label, top: rect.top + rect.height / 2 });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <>
      <aside
        className={`rp-sidebar hidden md:flex ${
          isExpanded ? 'rp-sidebar-expanded' : 'rp-sidebar-collapsed'
        }`}
      >
        {/* Top Header: Toggle Button (☰) when Collapsed OR Close Button (✕) when Expanded */}
        <div className="rp-sidebar-brand">
          {isExpanded ? (
            <div className="rp-brand-logo">
              <div className="rp-brand-icon-box flex items-center justify-center p-0.5">
                <img src={placedLogo} alt="PlaceD Logo" className="w-7 h-7 object-contain rounded-md shrink-0" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="rp-brand-text truncate leading-none">{recruiter.companyName}</span>
                <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider mt-0.5">
                  Recruiter Console
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={onToggleExpand}
                onMouseEnter={(e) => handleMouseEnter(e, 'Expand Navigation')}
                onMouseLeave={handleMouseLeave}
                className="rp-sidebar-toggle-btn"
                aria-label="Expand Sidebar (☰)"
                title="Expand Sidebar"
              >
                <Menu size={20} />
              </button>
            </div>
          )}

          {isExpanded && (
            <button
              onClick={onToggleExpand}
              className="rp-sidebar-toggle-btn"
              aria-label="Collapse Sidebar (✕)"
              title="Collapse Sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Recruiter Profile Card (Rendered when Expanded) */}
        {isExpanded && (
          <div className="rp-sidebar-profile-card">
            <div className="rp-avatar-circle">
              {recruiter.companyName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-900 truncate" title={recruiter.name}>
                {recruiter.name}
              </span>
              <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider truncate">
                {recruiter.designation}
              </span>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <nav className="rp-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                onMouseLeave={handleMouseLeave}
                className={`rp-nav-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                <Icon size={20} className="rp-nav-icon" />
                {isExpanded && <span className="rp-nav-label">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Floating Hover Tooltip (Rendered outside overflow bounds when Collapsed) */}
      {!isExpanded && tooltip && (
        <div
          className="rp-fixed-tooltip"
          style={{ top: `${tooltip.top}px` }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};
