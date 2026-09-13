import React, { useState } from 'react';
import {
  Menu,
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
import placedLogo from '../../assets/placed_logo.png';

export type AlumniTabType =
  | 'dashboard'
  | 'blogs'
  | 'myBlogs'
  | 'referral'
  | 'directory'
  | 'settings';

interface AlumniSidebarProps {
  activeTab: AlumniTabType;
  setActiveTab: (tab: AlumniTabType) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  alumni: Alumni;
  onLogout: () => void;
}

export const AlumniSidebar: React.FC<AlumniSidebarProps> = ({
  activeTab,
  setActiveTab,
  isExpanded,
  onToggleExpand,
  alumni,
  onLogout
}) => {
  const [hoveredItem, setHoveredItem] = useState<{ id: string; label: string; y: number } | null>(null);

  const navItems = [
    { id: 'dashboard' as AlumniTabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs' as AlumniTabType, label: 'Write Blog', icon: FileText },
    { id: 'myBlogs' as AlumniTabType, label: 'My Blogs', icon: BookOpen },
    { id: 'referral' as AlumniTabType, label: 'Offer Referral', icon: Briefcase },
    { id: 'directory' as AlumniTabType, label: 'Alumni Directory', icon: Users },
    { id: 'settings' as AlumniTabType, label: 'Profile Settings', icon: User }
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, id: string, label: string) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    setHoveredItem({ id, label, y: centerY });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
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
    <>
      <aside
        className={`alp-sidebar hidden md:flex ${
          isExpanded ? 'alp-sidebar-expanded' : 'alp-sidebar-collapsed'
        }`}
      >
        {/* Sidebar Header */}
        <div className="alp-sidebar-header">
          {isExpanded ? (
            <div className="alp-brand-box">
              <div className="alp-brand-icon-box flex items-center justify-center p-0.5">
                <img src={placedLogo} alt="PlaceD Logo" className="w-7 h-7 object-contain rounded-md shrink-0" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="alp-brand-text leading-none">PlaceD Alumni</span>
                <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-0.5">
                  Alumni Portal
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={onToggleExpand}
                onMouseEnter={(e) => handleMouseEnter(e, 'expand-btn', 'Expand Navigation')}
                onMouseLeave={handleMouseLeave}
                className="alp-sidebar-toggle-btn"
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
              className="alp-sidebar-toggle-btn"
              aria-label="Collapse Sidebar (✕)"
              title="Collapse Sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Profile Card (when expanded) */}
        {isExpanded && (
          <div className="alp-sidebar-profile-card">
            <div className="alp-avatar-circle">
              {initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-900 truncate" title={alumni.name}>
                {alumni.name}
              </span>
              <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider truncate">
                {alumni.currentCompany || alumni.department || 'Alumni Member'}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="alp-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={(e) => handleMouseEnter(e, item.id, item.label)}
                onMouseLeave={handleMouseLeave}
                className={`alp-nav-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                <Icon size={20} className="alp-nav-icon" />
                {isExpanded && <span className="alp-nav-label">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="alp-sidebar-footer">
          <button
            onClick={onLogout}
            onMouseEnter={(e) => handleMouseEnter(e, 'logout-btn', 'Logout')}
            onMouseLeave={handleMouseLeave}
            className="alp-nav-item logout-btn"
          >
            <LogOut size={18} className="alp-nav-icon text-rose-500" />
            {isExpanded && <span className="alp-nav-label text-rose-600 font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Floating Hover Tooltip (When Collapsed) */}
      {!isExpanded && hoveredItem && (
        <div
          className="alp-fixed-tooltip"
          style={{ top: `${hoveredItem.y}px` }}
        >
          {hoveredItem.label}
        </div>
      )}
    </>
  );
};
