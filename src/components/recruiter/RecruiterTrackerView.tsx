import React from 'react';
import { GitMerge, ArrowRight, X, Briefcase, FileText, Mail } from 'lucide-react';
import type { Student, PlacementDrive, Recruiter } from '../../mockData';

interface RecruiterTrackerViewProps {
  recruiter: Recruiter;
  myDrives: PlacementDrive[];
  trackerDriveId: string;
  setTrackerDriveId: (id: string) => void;
  activeTrackerDrive: PlacementDrive | undefined;
  activeTrackerApplications: { student: Student; app: any }[];
  selectedStudentForResume: Student | null;
  setSelectedStudentForResume: (s: Student | null) => void;
  onPromoteStudent: (studentId: string, driveId: string, newRoundIndex: number, isFinalSelection: boolean) => void;
  onRejectStudent: (studentId: string, driveId: string) => void;
}

export const RecruiterTrackerView: React.FC<RecruiterTrackerViewProps> = ({
  recruiter,
  myDrives,
  trackerDriveId,
  setTrackerDriveId,
  activeTrackerDrive,
  activeTrackerApplications,
  selectedStudentForResume,
  setSelectedStudentForResume,
  onPromoteStudent,
  onRejectStudent
}) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2.5">
            <GitMerge size={24} className="text-sky-600" />
            Applicant Selection Pipeline
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Evaluate candidate applications for {recruiter.companyName}, inspect candidate resumes, and extend job offers.
          </p>
        </div>

        {myDrives.length > 0 && (
          <div className="flex flex-col gap-1.5 min-w-[240px]">
            <label className="text-xs font-bold text-slate-700">Select Role</label>
            <select
              value={trackerDriveId}
              onChange={(e) => setTrackerDriveId(e.target.value)}
              className="h-11 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              {myDrives.map((drv) => (
                <option key={drv.id} value={drv.id}>
                  {drv.role}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {activeTrackerDrive ? (() => {
        const defaultRounds = ['Online Assessment', 'Technical Interview', 'HR Interview'];
        const trackerRounds = (activeTrackerDrive && 'rounds' in activeTrackerDrive && Array.isArray((activeTrackerDrive as any).rounds) && (activeTrackerDrive as any).rounds.length > 0)
          ? (activeTrackerDrive as any).rounds
          : defaultRounds;

        return (
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-wrap gap-6 text-xs sm:text-sm shadow-xs">
              <div>
                <span className="text-slate-500 font-medium">Role:</span>{' '}
                <strong className="text-slate-900 font-bold">{activeTrackerDrive.title}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Package:</span>{' '}
                <strong className="text-slate-900 font-bold">{activeTrackerDrive.package || `${(activeTrackerDrive as any).salary || 6} LPA`}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Pipeline:</span>{' '}
                <strong className="text-sky-600 font-bold">{trackerRounds.join(' ➔ ')}</strong>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="ap-kanban-board">
              {trackerRounds.map((roundName: string, colIndex: number) => {
                const columnApplications = activeTrackerApplications.filter(
                  (item) => item.app.currentRoundIndex === colIndex
                );
                const isLastCol = colIndex === trackerRounds.length - 1;

              return (
                <div key={roundName} className="ap-kanban-column">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-bold text-slate-900 text-sm truncate" title={roundName}>
                      {roundName}
                    </h4>
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">
                      {columnApplications.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {columnApplications.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        Empty Stage
                      </div>
                    ) : (
                      columnApplications.map(({ student }) => (
                        <div key={student.id} className="ap-candidate-card">
                          <button
                            onClick={() => setSelectedStudentForResume(student)}
                            className="font-bold text-slate-900 text-sm text-left hover:text-sky-600 transition-colors"
                            title="Inspect Resume"
                          >
                            {student.name}
                          </button>
                          <p className="text-xs text-slate-500">
                            {student.department} (CGPA: {student.cgpa})
                          </p>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 mt-1">
                            <button
                              onClick={() => onRejectStudent(student.id, activeTrackerDrive.id)}
                              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all"
                              title="Mark Rejected"
                            >
                              <X size={14} />
                            </button>
                            <button
                              onClick={() => onPromoteStudent(student.id, activeTrackerDrive.id, colIndex + 1, isLastCol)}
                              className="py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                              title={isLastCol ? 'Extend Offer' : 'Move Next'}
                            >
                              {isLastCol ? 'Offer' : <>Move Next <ArrowRight size={14} /></>}
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
        <div className="rp-card text-center py-16 text-slate-400">
          <Briefcase size={48} className="mx-auto opacity-20 mb-3" />
          <p className="text-sm font-bold text-slate-700">Please post company drives to activate candidate stage Kanban tracker.</p>
        </div>
      )}

      {/* Resume Inspector Modal */}
      {selectedStudentForResume && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base font-display flex items-center gap-2">
                <FileText size={20} className="text-sky-600" />
                {selectedStudentForResume.name}'s Resume Text
              </h3>
              <button
                onClick={() => setSelectedStudentForResume(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed text-slate-800 max-h-72 overflow-y-auto whitespace-pre-wrap">
              {selectedStudentForResume.resumeText || 'No plain text resume overview available.'}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href={`mailto:${selectedStudentForResume.email}`}
                className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Mail size={15} /> Contact Candidate
              </a>
              <button
                onClick={() => setSelectedStudentForResume(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
