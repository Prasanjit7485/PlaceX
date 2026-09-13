import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  Briefcase,
  Building2,
  ShieldCheck,
  XCircle,
  Clock3
} from 'lucide-react';
import type { Student, PlacementDrive } from '../../mockData';
import { studentApi } from '../../api/studentApi';
import type { StudentRoundVisualizerResponse } from '../../api/types';

interface StudentVisualizerViewProps {
  currentStudent: Student;
  drives: PlacementDrive[];
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
}

export const StudentVisualizerView: React.FC<StudentVisualizerViewProps> = ({
  currentStudent,
  drives,
  selectedApplicationId,
  setSelectedApplicationId
}) => {
  const [realVisualizer, setRealVisualizer] = useState<StudentRoundVisualizerResponse[] | null>(null);

  useEffect(() => {
    if (currentStudent?.id) {
      studentApi
        .getStageVisualizer(currentStudent.id)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRealVisualizer(data);
          }
        })
        .catch(() => {});
    }
  }, [currentStudent?.id]);

  const activeRealVisualizer = realVisualizer?.filter(
    (v) => String(v.jobPostingId) === selectedApplicationId
  );

  const totalApplied = currentStudent.applications.length;

  // Selected application
  const selectedApp =
    currentStudent.applications.find((app) => app.jobPostingId === selectedApplicationId) ||
    currentStudent.applications[0];

  // Selected drive details
  const selectedDrive =
    drives.find((d) => d.id === selectedApplicationId) ||
    (selectedApp
      ? {
          id: selectedApp.jobPostingId,
          companyName: selectedApp.companyName,
          title: selectedApp.role,
          description: 'Software engineering recruitment drive',
          package: '32 LPA',
          numericPackage: 32,
          cgpaCutoff: 7.0,
          maxBacklogs: 0,
          allowedBranches: ['Computer Science', 'Information Technology'],
          eligibleBatch: '2026 Batch',
          deadline: '2026-06-30',
          skillsRequired: ['React', 'Data Structures', 'System Design'],
          rounds: ['Online Coding Test', 'Technical Round 1', 'Technical Round 2', 'HR Interview'],
          status: 'OPEN' as const,
          registeredCount: 42
        }
      : undefined);

  // Sync selectedApplicationId if empty
  useEffect(() => {
    if (!selectedApplicationId && currentStudent.applications.length > 0) {
      setSelectedApplicationId(currentStudent.applications[0].jobPostingId);
    }
  }, [selectedApplicationId, currentStudent.applications, setSelectedApplicationId]);

  // Round pipeline definitions
  const rounds = selectedDrive?.rounds && selectedDrive.rounds.length > 0
    ? selectedDrive.rounds
    : ['Online Coding Test', 'Technical Round 1', 'Technical Round 2', 'HR Interview'];

  const currentRoundIdx = selectedApp?.currentRoundIndex ?? 0;
  const isSelected = selectedApp?.status === 'Selected';
  const isRejected = selectedApp?.status === 'Rejected';

  const progressPercentage = isSelected
    ? 100
    : isRejected
    ? Math.round(((currentRoundIdx) / rounds.length) * 100)
    : Math.round(((currentRoundIdx + 1) / rounds.length) * 100);

  return (
    <div className="flex flex-col gap-7 animate-fade-in pb-8">
      {/* Top Welcoming Hero Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="sp-badge sp-badge-primary font-bold flex items-center gap-1.5 shadow-2xs">
              <Sparkles size={13} /> Synchronized Live Tracker
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold flex items-center gap-2 shadow-2xs">
            <Clock3 size={14} className="text-blue-600" />
            <span>Active Student Pipeline View</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
              <TrendingUp size={28} className="text-blue-600 shrink-0" />
              Recruitment Stage Visualizer
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium mt-1">
              Track round-by-round selection progress, active interview stages, and evaluation feedback directly from the institutional placement board.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sp-kpi-card" style={{ '--kpi-accent': '#2563EB' } as React.CSSProperties}>
          <div className="sp-kpi-header">
            <span className="sp-kpi-label">Applied Drives</span>
            <div className="sp-kpi-icon bg-blue-50 text-blue-600">
              <Building2 size={22} />
            </div>
          </div>
          <div className="sp-kpi-value">{totalApplied}</div>
          <p className="text-xs text-slate-500 mt-2 font-medium">Active Placement Applications</p>
        </div>

        <div className="sp-kpi-card" style={{ '--kpi-accent': '#4F46E5' } as React.CSSProperties}>
          <div className="sp-kpi-header">
            <span className="sp-kpi-label">Current Pipeline Stage</span>
            <div className="sp-kpi-icon bg-indigo-50 text-indigo-600">
              <Layers size={22} />
            </div>
          </div>
          <div className="sp-kpi-value font-mono">
            Stage {isSelected ? rounds.length : currentRoundIdx + 1} / {rounds.length}
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">Progress: {progressPercentage}% Complete</p>
        </div>

        <div className="sp-kpi-card" style={{ '--kpi-accent': isSelected ? '#10B981' : isRejected ? '#EF4444' : '#F59E0B' } as React.CSSProperties}>
          <div className="sp-kpi-header">
            <span className="sp-kpi-label">Selected Application Status</span>
            <div className={`sp-kpi-icon ${isSelected ? 'bg-emerald-50 text-emerald-600' : isRejected ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
              {isSelected ? <ShieldCheck size={22} /> : isRejected ? <XCircle size={22} /> : <CheckCircle2 size={22} />}
            </div>
          </div>
          <div className="sp-kpi-value text-xl font-display font-extrabold truncate">
            {selectedApp?.status || 'Applied'}
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {selectedDrive?.companyName || 'Campus Drive'}
          </p>
        </div>
      </div>

      {totalApplied === 0 ? (
        <div className="sp-visualizer-card text-center py-20 px-6 rounded-3xl border border-slate-200 bg-white/90 shadow-sm text-slate-400">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Layers size={32} />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-display">No active applications to track</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium max-w-md mx-auto">
            Apply to active campus placement drives to view your visual selection pipeline and stage status.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Select Application Bar */}
          <div className="sp-visualizer-card p-7 sm:p-9 px-8 sm:px-11 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200/90 shadow-md rounded-3xl bg-white mb-1">
            <div className="flex flex-col gap-2.5 max-w-xl w-full">
              <label className="text-xs sm:text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2.5 pl-1 font-display">
                <Briefcase size={17} className="text-blue-600 shrink-0" />
                Select Application to Track
              </label>

              <div className="relative w-full mt-1">
                <select
                  value={selectedApplicationId}
                  onChange={(e) => setSelectedApplicationId(e.target.value)}
                  className="sp-visualizer-select font-bold px-6 py-3.5"
                >
                  {currentStudent.applications.map((app) => (
                    <option key={app.jobPostingId} value={app.jobPostingId}>
                      {app.companyName} — {app.role || 'Software Engineer'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedApp && (
              <div className="flex flex-col md:items-end gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 pr-1">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider pl-1 font-mono">
                  Application Status
                </span>
                <span
                  className={`sp-badge text-xs sm:text-sm px-5 py-2.5 shadow-2xs font-extrabold flex items-center gap-2.5 rounded-2xl ${
                    selectedApp.status === 'Selected'
                      ? 'sp-badge-success ring-2 ring-emerald-400/30'
                      : selectedApp.status === 'Rejected'
                      ? 'sp-badge-danger ring-2 ring-rose-400/30'
                      : 'sp-badge-primary ring-2 ring-blue-400/30'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    selectedApp.status === 'Selected'
                      ? 'bg-emerald-500'
                      : selectedApp.status === 'Rejected'
                      ? 'bg-rose-500'
                      : 'bg-blue-600 animate-ping'
                  }`} />
                  Current Status: {selectedApp.status}
                </span>
              </div>
            )}
          </div>

          {selectedApp && selectedDrive && (
            <div className="flex flex-col gap-6">
              {/* Selected Drive Banner Card: Company, Package, Stage, Progress */}
              <div className="sp-visualizer-card p-8 sm:p-10 px-9 sm:px-12 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white border border-blue-200/80 flex flex-col gap-7 shadow-md rounded-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                  {/* Company Logo Avatar + Name + Package + Role */}
                  <div className="flex items-center gap-5">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 ring-4 ring-white">
                      {selectedDrive.companyName.charAt(0)}
                    </div>

                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-center gap-3.5 flex-wrap">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight pl-1.5">
                          {selectedDrive.companyName}
                        </h2>
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-bold text-xs sm:text-sm shadow-xs ml-1">
                          {selectedDrive.package || '16 LPA'}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-blue-700 flex items-center gap-2 pl-1.5">
                        <span>{selectedApp.role || selectedDrive.title || 'Software Engineer'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Stage readout */}
                  <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Pipeline Progress</span>
                    <span className="text-blue-700 text-sm sm:text-base font-extrabold">
                      Stage {isSelected ? rounds.length : isRejected ? currentRoundIdx : currentRoundIdx + 1} of {rounds.length}
                    </span>
                  </div>
                </div>

                {/* Overall Pipeline Progress bar */}
                <div className="flex flex-col gap-3 pt-5 border-t border-blue-100/70 mt-1 pl-1 pr-1">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-slate-700 font-mono">
                    <span className="uppercase tracking-wider">Overall Pipeline Progress</span>
                    <span className="text-blue-700 text-sm sm:text-base font-black">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200/80 h-4 rounded-full overflow-hidden p-1 border border-slate-300/60 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-700 shadow-xs"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Selection Pipeline Rounds Grid */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 pl-1 pr-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-display uppercase tracking-wider flex items-center gap-2.5">
                    <Layers size={19} className="text-blue-600" />
                    Selection Pipeline Rounds ({rounds.length})
                  </h3>
                  <span className="text-xs font-extrabold text-blue-700 font-mono bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80 shadow-2xs">
                    Stage {isSelected ? rounds.length : currentRoundIdx + 1} of {rounds.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rounds.map((round, index) => {
                    const isCompleted = index < currentRoundIdx || isSelected;
                    const isActive = index === currentRoundIdx && !isSelected && !isRejected;
                    const isFinalSelected = isSelected && index === rounds.length - 1;
                    const isFinalRejected = isRejected && index === currentRoundIdx;

                    let cardClass = "sp-stage-card-upcoming";
                    if (isFinalSelected || isCompleted) cardClass = "sp-stage-card-completed";
                    else if (isFinalRejected) cardClass = "sp-stage-card-rejected";
                    else if (isActive) cardClass = "sp-stage-card-active";

                    return (
                      <div
                        key={round}
                        className={`sp-stage-card ${cardClass}`}
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          <div
                            className={`w-11 h-11 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 shadow-2xs ${
                              isFinalSelected || isCompleted
                                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                                : isFinalRejected
                                ? 'bg-rose-600 text-white shadow-rose-500/20'
                                : isActive
                                ? 'bg-blue-600 text-white shadow-blue-500/30 ring-4 ring-blue-100'
                                : 'bg-slate-200 text-slate-600 font-bold'
                            }`}
                          >
                            {isCompleted || isFinalSelected ? (
                              <CheckCircle2 size={20} />
                            ) : isFinalRejected ? (
                              <XCircle size={20} />
                            ) : (
                              index + 1
                            )}
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isFinalSelected
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : isFinalRejected
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : isCompleted
                                ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-200'
                                : isActive
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-200/70 text-slate-600'
                            }`}
                          >
                            {isFinalSelected
                              ? 'Selected'
                              : isFinalRejected
                              ? 'Disqualified'
                              : isCompleted
                              ? 'Passed'
                              : isActive
                              ? 'In Progress'
                              : 'Upcoming'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 pl-1.5">
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 pl-0.5 font-mono">
                            Round {index + 1}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-base font-display leading-snug pl-0.5">
                            {round}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feedback and Selection Round Policy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white border border-blue-200/80 flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-3 font-extrabold text-slate-900 font-display">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Award size={20} />
                    </div>
                    <span className="text-base sm:text-lg">Stage Feedback & Updates</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium pl-1">
                    {activeRealVisualizer?.[0]?.feedback || selectedApp.feedback
                      ? (activeRealVisualizer?.[0]?.feedback || selectedApp.feedback)
                      : `The recruitment board is processing candidates for "${rounds[currentRoundIdx]}". Stage feedback will appear here as round evaluations conclude.`}
                  </p>
                </div>

                <div className="p-7 sm:p-8 rounded-3xl bg-slate-50/90 border border-slate-200/90 flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-3 font-extrabold text-slate-900 font-display">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText size={20} />
                    </div>
                    <span className="text-base sm:text-lg">Selection Round Policy</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium pl-1">
                    Candidates must remain on campus or online 15 minutes before scheduled round starts. Rejection at any stage automatically updates pipeline status.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

