import React from 'react';
import { Briefcase, Users, Award, TrendingUp, Plus, Layers } from 'lucide-react';
import type { Recruiter, PlacementDrive } from '../../mockData';

interface RecruiterDashboardViewProps {
  recruiter: Recruiter;
  activeDrivesCount: number;
  totalApplicants: number;
  placedCount: number;
  averagePackage: string;
  myDrives: PlacementDrive[];
  onGoToPostDrive: () => void;
}

export const RecruiterDashboardView: React.FC<RecruiterDashboardViewProps> = ({
  recruiter,
  activeDrivesCount,
  totalApplicants,
  placedCount,
  averagePackage,
  myDrives,
  onGoToPostDrive
}) => {
  return (
    <div className="flex flex-col gap-7 animate-fade-in pb-6">
      {/* Light Theme Hero Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50/80 via-indigo-50/40 to-white shadow-xs flex flex-col gap-4">
        {/* Top Badges & Button */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="sp-badge sp-badge-success font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Recruiter Account
            </span>
            <span className="text-xs font-mono text-slate-600 font-bold uppercase tracking-widest bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200">
              {recruiter.companyName} Console
            </span>
          </div>

          <button
            onClick={onGoToPostDrive}
            className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} /> Post Your First Drive
          </button>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight capitalize">
            {recruiter.companyName} Hiring Console
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed font-normal">
            Post recruitment drives for <span className="font-semibold text-slate-900">{recruiter.companyName}</span>, evaluate candidate resumes, track round-by-round evaluations, and coordinate job offers through your company-scoped hiring pipeline.
          </p>
        </div>

        {/* Stat Badges Footer */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/60 mt-1">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Briefcase size={14} className="text-blue-600 shrink-0" />
            <span><strong className="text-slate-900 font-bold">{activeDrivesCount}</strong> Active Drives</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Users size={14} className="text-indigo-600 shrink-0" />
            <span><strong className="text-slate-900 font-bold">{totalApplicants}</strong> Total Applicants</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Award size={14} className="text-emerald-600 shrink-0" />
            <span><strong className="text-slate-900 font-bold">{placedCount}</strong> Offers Extended</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* KPI 1 */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Active Drives Running</span>
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              {activeDrivesCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">Company Campaigns</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Total Applicants</span>
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              {totalApplicants}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">Student Applicants</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Candidates Selected</span>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Award size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              {placedCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">Offers Issued</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Average Package Offered</span>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              {averagePackage} <span className="text-sm font-bold text-slate-500">LPA</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">Mean Compensation</p>
          </div>
        </div>
      </div>

      {/* Main Workspace Section: Active Drives or Empty State */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Layers className="text-blue-600" size={20} />
              Company Recruitment Campaigns ({myDrives.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage recruitment drives posted specifically for {recruiter.companyName}
            </p>
          </div>

          {myDrives.length > 0 && (
            <button
              onClick={onGoToPostDrive}
              className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Plus size={15} /> Add Drive
            </button>
          )}
        </div>

        {myDrives.length === 0 ? (
          <div className="glass-card bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 text-center shadow-xs flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <Briefcase size={32} />
            </div>
            <div className="max-w-md flex flex-col gap-1">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                You haven't posted any recruitment drives for {recruiter.companyName} yet.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Launch a recruitment drive to set minimum CGPA cutoffs, outline interview rounds, and receive student applications directly.
              </p>
            </div>
            <button
              onClick={onGoToPostDrive}
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus size={18} /> Post Your First Drive
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {myDrives.map((drive) => (
              <div
                key={drive.id}
                className="glass-card bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 border-l-4 border-l-blue-600"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                      {drive.package}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      drive.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {drive.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-display leading-snug">
                    {drive.title || drive.role}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {drive.description || drive.jobDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
                  <span>{drive.registeredCount || 0} Applicants</span>
                  <span>Min CGPA: {drive.cgpaCutoff}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
