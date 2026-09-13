import React from 'react';
import { Briefcase, Building, X, Plus, CheckCircle2 } from 'lucide-react';
import type { Recruiter, PlacementDrive } from '../../mockData';

interface RecruiterDrivesViewProps {
  recruiter: Recruiter;
  showDriveForm: boolean;
  setShowDriveForm: (show: boolean) => void;
  handleDriveSubmit: (e: React.FormEvent) => void;
  role: string;
  setRole: (v: string) => void;
  pkg: string;
  setPkg: (v: string) => void;
  numericPkg: number;
  setNumericPkg: (v: number) => void;
  jobLocation?: string;
  setJobLocation?: (v: string) => void;
  cgpaCutoff: number;
  setCgpaCutoff: (v: number) => void;
  maxBacklogs: number;
  setMaxBacklogs: (v: number) => void;
  allowedBranches: string[];
  handleBranchCheckbox: (branch: string) => void;
  branches: string[];
  eligibleBatch: string;
  setEligibleBatch: (v: string) => void;
  deadline: string;
  setDeadline: (v: string) => void;
  jobDesc: string;
  setJobDesc: (v: string) => void;
  skillsRequiredText: string;
  setSkillsRequiredText: (v: string) => void;
  roundsText: string;
  setRoundsText: (v: string) => void;
  myDrives: PlacementDrive[];
  onToggleDriveActive: (driveId: string) => void;
}

export const RecruiterDrivesView: React.FC<RecruiterDrivesViewProps> = ({
  recruiter,
  showDriveForm,
  setShowDriveForm,
  handleDriveSubmit,
  role,
  setRole,
  pkg,
  setPkg,
  numericPkg,
  setNumericPkg,
  jobLocation,
  setJobLocation,
  cgpaCutoff,
  setCgpaCutoff,
  maxBacklogs,
  setMaxBacklogs,
  allowedBranches,
  handleBranchCheckbox,
  branches,
  eligibleBatch,
  setEligibleBatch,
  deadline,
  setDeadline,
  jobDesc,
  setJobDesc,
  skillsRequiredText,
  setSkillsRequiredText,
  roundsText,
  setRoundsText,
  myDrives,
  onToggleDriveActive
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">
            <Briefcase size={28} className="text-blue-600" />
            Manage Company Recruitment Drives ({myDrives.length})
          </h1>
          <p className="sp-page-subtitle">
            Publish recruitment campaigns for {recruiter.companyName}, set cutoffs, and specify selection rounds.
          </p>
        </div>

        <button
          onClick={() => setShowDriveForm(!showDriveForm)}
          className={`h-11 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all self-start sm:self-center cursor-pointer ${
            showDriveForm
              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/90 shadow-2xs'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {showDriveForm ? <X size={18} /> : <Plus size={18} />}
          {showDriveForm ? 'Close Editor' : 'Post New Drive'}
        </button>
      </div>

      {/* Expandable Post Drive Form Drawer */}
      {showDriveForm && (
        <form
          onSubmit={handleDriveSubmit}
          className="card-form flex flex-col gap-6 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Building size={22} className="text-blue-600" />
                Post New Campus Opportunity
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure role details, compensation, and candidate requirements for {recruiter.companyName}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDriveForm(false)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200/80 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <X size={16} />
              <span>Close Editor</span>
            </button>
          </div>

          {/* Section 1: Role & Company Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5 font-display border-b border-slate-100 pb-2">
              <Building size={14} /> Role Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Company (Locked)</label>
                <input
                  type="text"
                  disabled
                  value={recruiter.companyName}
                  className="input-field bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Job Role Name *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Associate Software Engineer"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">CTC Package (Text) *</label>
                <input
                  type="text"
                  required
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value)}
                  placeholder="18 LPA"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Numeric Package (for analytics) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={numericPkg}
                  onChange={(e) => setNumericPkg(Number(e.target.value))}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Job Location *</label>
                <input
                  type="text"
                  required
                  value={jobLocation}
                  onChange={(e) => setJobLocation && setJobLocation(e.target.value)}
                  placeholder="Bangalore / Remote"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Eligibility Criteria */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5 font-display border-b border-slate-100 pb-2">
              Eligibility Criteria
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">CGPA Cut-off *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min="0"
                  max="10"
                  value={cgpaCutoff}
                  onChange={(e) => setCgpaCutoff(Number(e.target.value))}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Max Backlogs *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={maxBacklogs}
                  onChange={(e) => setMaxBacklogs(Number(e.target.value))}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Graduation Batch *</label>
                <input
                  type="text"
                  required
                  value={eligibleBatch}
                  onChange={(e) => setEligibleBatch(e.target.value)}
                  placeholder="2026 Batch"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Deadline *</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Eligible Branches *</label>
              <div className="flex flex-wrap gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                {branches.map((b) => {
                  const isChecked = allowedBranches.includes(b);
                  return (
                    <label
                      key={b}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center gap-2 select-none ${
                        isChecked
                          ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBranchCheckbox(b)}
                        className="w-4 h-4 rounded text-sky-600 accent-sky-600 cursor-pointer"
                      />
                      <span>{b}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Skills & Pipeline */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5 font-display border-b border-slate-100 pb-2">
              Pipeline & Requirements
            </h4>

            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Required Technical Skills *</label>
                <input
                  type="text"
                  required
                  value={skillsRequiredText}
                  onChange={(e) => setSkillsRequiredText(e.target.value)}
                  placeholder="e.g. React, Node.js, Python, SQL"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Selection Rounds (Comma separated order) *</label>
                <input
                  type="text"
                  required
                  value={roundsText}
                  onChange={(e) => setRoundsText(e.target.value)}
                  placeholder="e.g. Online Test, Technical Interview, HR Round"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Job Description Summary</label>
                <textarea
                  rows={4}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Provide role expectations and responsibilities..."
                  className="input-field font-sans resize-none min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDriveForm(false)}
              className="btn btn-secondary h-11 px-5 rounded-xl text-sm font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary h-11 px-6 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Publish Recruitment Opportunity
            </button>
          </div>
        </form>
      )}

      {/* Active Placement Drives List */}
      <div className="flex flex-col gap-5">
        {myDrives.map((drive) => (
          <div
            key={drive.id}
            className={`glass-card p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${
              drive.status === 'OPEN' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500'
            }`}
          >
            <div className="flex-1 flex flex-col gap-4 w-full">
              {/* Header Info */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md shadow-blue-500/15 border border-white/20">
                  {(drive.companyName || recruiter.companyName).charAt(0)}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-xl sm:text-2xl text-slate-900 font-display leading-tight">{drive.role || drive.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold font-mono bg-blue-50 text-blue-700 border border-blue-200/80">
                      {drive.package}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        drive.status === 'OPEN'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/80'
                          : 'bg-rose-100 text-rose-800 border border-rose-200/80'
                      }`}
                    >
                      {drive.status === 'OPEN' ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-blue-600 flex items-center gap-1.5">
                    <Building size={14} className="shrink-0 text-blue-500" />
                    <span>{drive.companyName || recruiter.companyName}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              {Boolean(drive.jobDesc || drive.description) && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {drive.jobDesc || drive.description}
                </p>
              )}

              {/* Structured Metadata Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Eligible Batch</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {drive.eligibleBatch || '2026 Batch'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cut-off CGPA</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">{drive.cgpaCutoff} CGPA</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Max Backlogs</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">{drive.maxBacklogs} Backlogs</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Applicants</span>
                  <span className="text-xs sm:text-sm font-bold text-blue-600 block">{drive.registeredCount || 0} Students</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Deadline</span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-600 block">{drive.deadline}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="self-stretch lg:self-center shrink-0 flex items-center justify-end">
              <button
                onClick={() => onToggleDriveActive(drive.id)}
                className={`h-11 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  drive.status === 'OPEN'
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/90 shadow-2xs'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {drive.status === 'OPEN' ? 'Suspend Drive' : 'Reactivate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
