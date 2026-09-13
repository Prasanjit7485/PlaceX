import React from 'react';
import { GitMerge, ArrowRight, X, Briefcase } from 'lucide-react';
import type { DriveWithCompany } from '../../api/types';
import type { Student, PlacementDrive } from '../../mockData';

interface AdminLiveTrackerViewProps {
  trackerDriveId: string;
  setTrackerDriveId: (id: string) => void;
  effectiveDrives: (DriveWithCompany | PlacementDrive)[];
  activeTrackerDrive: (DriveWithCompany | PlacementDrive) | undefined;
  activeTrackerApplications: { student: Student; app: any }[];
  onPromoteStudent: (studentId: string, driveId: string, newRoundIndex: number, isFinalSelection: boolean) => void;
  onRejectStudent: (studentId: string, driveId: string) => void;
}

export const AdminLiveTrackerView: React.FC<AdminLiveTrackerViewProps> = ({
  trackerDriveId,
  setTrackerDriveId,
  effectiveDrives,
  activeTrackerDrive,
  activeTrackerApplications,
  onPromoteStudent,
  onRejectStudent
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">
            <GitMerge size={28} className="text-blue-600" />
            Live Selection Round Tracker
          </h1>
          <p className="sp-page-subtitle">
            Coordinate candidates through selection pipeline rounds and extend final offers.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[260px]">
          <label className="text-xs font-bold text-slate-700">Select Active Drive</label>
          <select
            value={trackerDriveId}
            onChange={(e) => setTrackerDriveId(e.target.value)}
            className="input-field font-bold text-slate-800"
          >
            {effectiveDrives.map((drv) => (
              <option key={drv.id} value={drv.id}>
                {drv.companyName} — {drv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeTrackerDrive ? (() => {
        const defaultRounds = ['Online Assessment', 'Technical Interview', 'HR Interview'];
        const trackerRounds = (activeTrackerDrive && 'rounds' in activeTrackerDrive && Array.isArray((activeTrackerDrive as any).rounds) && (activeTrackerDrive as any).rounds.length > 0)
          ? (activeTrackerDrive as any).rounds
          : defaultRounds;

        return (
          <div className="flex flex-col gap-5">
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Recruiting Company:</span>{' '}
                <strong className="text-slate-900 font-bold text-base font-display">{activeTrackerDrive.companyName}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Package:</span>{' '}
                <span className="sp-badge sp-badge-primary font-mono font-bold">{activeTrackerDrive.package || `${(activeTrackerDrive as any).salary || 6} LPA`}</span>
              </div>
              <div className="flex items-center gap-2 max-w-xl">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs shrink-0">Rounds Order:</span>{' '}
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 truncate">
                  {trackerRounds.join(' ➔ ')}
                </span>
              </div>
            </div>

            {/* Kanban Columns Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {trackerRounds.map((roundName: string, colIndex: number) => {
                const columnApplications = activeTrackerApplications.filter(
                  (item) => item.app.currentRoundIndex === colIndex
                );
                const isLastCol = colIndex === trackerRounds.length - 1;

              return (
                <div key={roundName} className="card-container p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-bold text-slate-900 text-sm font-display truncate" title={roundName}>
                      {roundName}
                    </h4>
                    <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold flex items-center justify-center border border-blue-200 shadow-2xs">
                      {columnApplications.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[140px]">
                    {columnApplications.length === 0 ? (
                      <div className="p-8 rounded-xl border border-dashed border-slate-200/80 bg-white/50 text-slate-400 text-xs font-semibold text-center flex flex-col items-center justify-center gap-1.5 my-auto">
                        <span>Empty Stage</span>
                        <span className="text-[10px] text-slate-300">No candidates in round</span>
                      </div>
                    ) : (
                      columnApplications.map(({ student, app }) => (
                        <div key={app?.id || `${student.id}-${activeTrackerDrive.id}`} className="card-kanban p-4 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition-all flex flex-col gap-3">
                          <div>
                            <h5 className="font-bold text-slate-900 text-sm font-display">{student.name}</h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              {student.department} • <strong className="text-slate-800">{student.cgpa} CGPA</strong>
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-1">
                            <button
                              onClick={() => onRejectStudent(student.id, activeTrackerDrive.id)}
                              className="btn btn-danger h-8 px-2.5 rounded-lg text-xs font-bold cursor-pointer"
                              title="Reject Candidate"
                            >
                              <X size={14} />
                            </button>
                            <button
                              onClick={() => onPromoteStudent(student.id, activeTrackerDrive.id, colIndex + 1, isLastCol)}
                              className="btn btn-success h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                              title={isLastCol ? 'Select Candidate' : 'Move to Next Round'}
                            >
                              {isLastCol ? 'Select' : <>Next Round <ArrowRight size={14} /></>}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        );
      })() : (
        <div className="glass-card text-center py-16 text-slate-400">
          <Briefcase size={48} className="mx-auto opacity-20 mb-3" />
          <p className="text-sm font-bold text-slate-700">Please launch recruitment drives to activate stage Kanban tracker.</p>
        </div>
      )}
    </div>
  );
};
