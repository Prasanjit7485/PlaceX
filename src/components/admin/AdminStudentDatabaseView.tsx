import React, { useState } from 'react';
import { Users, FileText, ChevronRight, X, Save, Award, TrendingUp } from 'lucide-react';
import type { Student, PlacementDrive, ResumeFeedback } from '../../mockData';
import type { StudentWithPlacement } from '../../api/types';
import { StudentVisualizerView } from '../student/StudentVisualizerView';

interface AdminStudentDatabaseViewProps {
  filteredStudents: (Student | StudentWithPlacement)[];
  allStudents: (Student | StudentWithPlacement)[];
  studentSearch: string;
  setStudentSearch: (v: string) => void;
  branchFilter: string;
  setBranchFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  minCgpaFilter: number;
  setMinCgpaFilter: (v: number) => void;
  minAtsFilter: number;
  setMinAtsFilter: (v: number) => void;
  branches: string[];
  selectedStudentForResume: (Student | StudentWithPlacement) | null;
  setSelectedStudentForResume: (s: (Student | StudentWithPlacement) | null) => void;
  review: {
    score: number;
    status: string;
    projects: string;
    skills: string;
    experience: string;
    ats: string;
    overall: string;
  };
  setReview: React.Dispatch<React.SetStateAction<{
    score: number;
    status: string;
    projects: string;
    skills: string;
    experience: string;
    ats: string;
    overall: string;
  }>>;
  statusChangeStudentId: string | null;
  setStatusChangeStudentId: (id: string | null) => void;
  placedCompanyInput: string;
  setPlacedCompanyInput: (v: string) => void;
  placedPackageInput: string;
  setPlacedPackageInput: (v: string) => void;
  setActivePopoverStudent: (s: (Student | StudentWithPlacement) | null) => void;
  onUpdateStudentStatus: (studentId: string, company?: string, salaryPackage?: string) => void;
  onSaveFeedback: (studentId: string, feedback: ResumeFeedback) => void;
  handleManualStatusSave: (studentId: string) => void;
  drives?: PlacementDrive[];
}

export const AdminStudentDatabaseView: React.FC<AdminStudentDatabaseViewProps> = ({
  filteredStudents,
  allStudents,
  studentSearch,
  setStudentSearch,
  branchFilter,
  setBranchFilter,
  statusFilter,
  setStatusFilter,
  minCgpaFilter,
  setMinCgpaFilter,
  minAtsFilter,
  setMinAtsFilter,
  branches,
  selectedStudentForResume,
  setSelectedStudentForResume,
  review,
  setReview,
  statusChangeStudentId,
  setStatusChangeStudentId,
  placedCompanyInput,
  setPlacedCompanyInput,
  placedPackageInput,
  setPlacedPackageInput,
  onUpdateStudentStatus,
  onSaveFeedback,
  handleManualStatusSave,
  drives = []
}) => {
  const [activeMobileStudent, setActiveMobileStudent] = useState<(Student | StudentWithPlacement) | null>(null);
  const [selectedStudentForVisualizer, setSelectedStudentForVisualizer] = useState<(Student | StudentWithPlacement) | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string>('');

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">
            <Users size={28} className="text-blue-600" />
            Student Placement Roster
          </h1>
          <p className="sp-page-subtitle">
            Review academic qualifications, filter by department & CGPA thresholds, edit placement statuses, and inspect candidate resumes.
          </p>
        </div>
        <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-700 font-bold self-start sm:self-center">
          Showing <span className="text-blue-600 font-bold">{filteredStudents.length}</span> of {allStudents.length} Candidates
        </div>
      </div>

      {/* Filter Tools Bar */}
      <div className="ap-card p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700">Search Candidate</label>
          <input
            type="text"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            placeholder="Name, email, reg no..."
            className="input-field"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700">Branch / Dept</label>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Departments</option>
            {branches.map((br) => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700">Placement Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Status</option>
            <option value="Placed">Placed</option>
            <option value="Unplaced">Unplaced</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Min CGPA</span>
            <span className="text-blue-600 font-mono">{minCgpaFilter.toFixed(1)}+</span>
          </div>
          <input
            type="range"
            min="5.0"
            max="10.0"
            step="0.1"
            value={minCgpaFilter}
            onChange={(e) => setMinCgpaFilter(Number(e.target.value))}
            className="accent-blue-600 mt-2 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Min ATS Score</span>
            <span className="text-emerald-600 font-mono">{minAtsFilter}%+</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={minAtsFilter}
            onChange={(e) => setMinAtsFilter(Number(e.target.value))}
            className="accent-emerald-600 mt-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Roster Table Container */}
      <div className="ap-card p-0 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <table className="hidden md:table w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50 uppercase tracking-wider text-[11px]">
              <th className="px-6 py-4">Student Info</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">CGPA / Backlogs</th>
              <th className="px-6 py-4">Placement Status</th>
              <th className="px-6 py-4">ATS Score</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                  No candidate records match the selected search and cutoff filters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm font-display">{student.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">{student.department}</td>
                  <td className="px-6 py-4 font-mono">
                    <strong className="text-slate-900 text-sm">{student.cgpa}</strong> CGPA
                    <span className="text-slate-400 text-xs ml-1 font-sans">({student.backlogs} Backlogs)</span>
                  </td>
                  <td className="px-6 py-4">
                    {student.placementStatus === 'Placed' ? (
                      <div className="flex flex-col gap-1">
                        <span className="sp-badge sp-badge-success self-start">Placed</span>
                        <span className="text-xs text-blue-600 font-bold truncate max-w-48" title={student.placedCompany}>
                          {student.placedCompany} ({student.placedPackage})
                        </span>
                      </div>
                    ) : (
                      <span className="sp-badge sp-badge-warning self-start">Unplaced</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-600 text-sm">
                    {student.resumeScore}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedStudentForVisualizer(student)}
                        className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                        title="View Selection Stage Pipeline"
                      >
                        <TrendingUp size={16} />
                      </button>

                      <button
                        onClick={() => setSelectedStudentForResume(student)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="Review Resume Text & Feedback"
                      >
                        <FileText size={16} />
                      </button>

                      <button
                        onClick={() => {
                          if (student.placementStatus === 'Placed') {
                            onUpdateStudentStatus(student.id);
                          } else {
                            setStatusChangeStudentId(student.id);
                            setPlacedCompanyInput('');
                            setPlacedPackageInput('');
                          }
                        }}
                        className={`btn h-9 px-4 rounded-xl text-xs font-bold cursor-pointer ${
                          student.placementStatus === 'Placed'
                            ? 'btn-danger'
                            : 'btn-primary'
                        }`}
                      >
                        {student.placementStatus === 'Placed' ? 'Mark Unplaced' : 'Set Placed'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile View Responsive Candidate Cards */}
        <div className="md:hidden flex flex-col divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-medium">
              No student records match the selected parameters.
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setActiveMobileStudent(student)}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm font-display">{student.name}</h4>
                      <span className={`sp-badge ${student.placementStatus === 'Placed' ? 'sp-badge-success' : 'sp-badge-warning'}`}>
                        {student.placementStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {student.department} • {student.cgpa} CGPA • ATS {student.resumeScore}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xs font-bold text-blue-600 hidden xs:inline">Details</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Student Detail Popover Modal */}
      {activeMobileStudent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col gap-5 my-auto">
            {/* Modal Top Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm">
                  {activeMobileStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg font-display">{activeMobileStudent.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{activeMobileStudent.email}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMobileStudent(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Candidate Specs Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Department</span>
                <span className="font-bold text-slate-900 truncate block">{activeMobileStudent.department}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">CGPA / Backlogs</span>
                <span className="font-bold text-slate-900 block">{activeMobileStudent.cgpa} CGPA ({activeMobileStudent.backlogs} Backlogs)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">ATS Resume Score</span>
                <span className="font-bold text-emerald-600 block">{activeMobileStudent.resumeScore}% Match</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Status</span>
                <span className={`sp-badge mt-0.5 ${activeMobileStudent.placementStatus === 'Placed' ? 'sp-badge-success' : 'sp-badge-warning'}`}>
                  {activeMobileStudent.placementStatus}
                </span>
              </div>
            </div>

            {/* Placed offer details if placed */}
            {activeMobileStudent.placementStatus === 'Placed' && activeMobileStudent.placedCompany && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-between">
                <span>Placed at: <strong>{activeMobileStudent.placedCompany}</strong></span>
                <span className="font-mono font-bold text-emerald-700">{activeMobileStudent.placedPackage}</span>
              </div>
            )}

            {/* Action Buttons inside Mobile Detail Modal */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedStudentForResume(activeMobileStudent);
                  setActiveMobileStudent(null);
                }}
                className="btn btn-secondary h-11 w-full rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Review Resume Text & ATS Feedback
              </button>

              <button
                onClick={() => {
                  if (activeMobileStudent.placementStatus === 'Placed') {
                    onUpdateStudentStatus(activeMobileStudent.id);
                  } else {
                    setStatusChangeStudentId(activeMobileStudent.id);
                  }
                  setActiveMobileStudent(null);
                }}
                className={`btn h-11 w-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
                  activeMobileStudent.placementStatus === 'Placed'
                    ? 'btn-danger'
                    : 'btn-primary'
                }`}
              >
                {activeMobileStudent.placementStatus === 'Placed' ? 'Mark Unplaced' : 'Set Placed'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Corporate Placement Offer Modal */}
      {statusChangeStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award size={22} className="text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base font-display">Record Placement Offer</h3>
              </div>
              <button
                type="button"
                onClick={() => setStatusChangeStudentId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Recruiting Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Google / Amazon / Microsoft"
                  value={placedCompanyInput}
                  onChange={(e) => setPlacedCompanyInput(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Offered Annual Package (CTC) *</label>
                <input
                  type="text"
                  placeholder="e.g. 24 LPA"
                  value={placedPackageInput}
                  onChange={(e) => setPlacedPackageInput(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStatusChangeStudentId(null)}
                className="btn btn-secondary h-11 px-5 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleManualStatusSave(statusChangeStudentId)}
                className="btn btn-primary h-11 px-6 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
              >
                Save Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Analyzer Feedback Modal */}
      {selectedStudentForResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base font-display">Resume Analyzer Report</h3>
              </div>
              <button onClick={() => setSelectedStudentForResume(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span>Candidate: <strong>{selectedStudentForResume.name}</strong></span> •
              <span>ATS Score: <strong className="text-blue-600 font-mono">{selectedStudentForResume.resumeScore}%</strong></span> •
              <span>Projects: <strong>{selectedStudentForResume.projectsCount}</strong></span>
            </div>

            <div className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono max-h-48 overflow-y-auto whitespace-pre-wrap">
              {selectedStudentForResume.resumeText}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <h4 className="font-bold text-slate-800 text-sm">Add TPO Review Feedback</h4>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Score (0-100)"
                  className="input-field text-xs h-10"
                  value={review.score}
                  onChange={(e) => setReview({ ...review, score: Number(e.target.value) })}
                />
                <select
                  className="input-field text-xs h-10"
                  value={review.status}
                  onChange={(e) => setReview({ ...review, status: e.target.value })}
                >
                  <option>Good</option>
                  <option>Excellent</option>
                  <option>Needs Improvement</option>
                </select>
              </div>

              <textarea
                rows={2}
                placeholder="Projects Feedback"
                className="input-field text-xs"
                value={review.projects}
                onChange={(e) => setReview({ ...review, projects: e.target.value })}
              />

              <textarea
                rows={2}
                placeholder="Overall Feedback Summary"
                className="input-field text-xs"
                value={review.overall}
                onChange={(e) => setReview({ ...review, overall: e.target.value })}
              />

              <button
                onClick={() => {
                  if (!selectedStudentForResume) return;
                  onSaveFeedback(selectedStudentForResume.id, {
                    ...review,
                    status: (['Good', 'Excellent', 'Needs Improvement'].includes(review.status)
                      ? review.status
                      : 'Needs Improvement') as 'Good' | 'Excellent' | 'Needs Improvement',
                    reviewedBy: 'TPO Admin',
                    reviewedOn: new Date().toLocaleDateString()
                  });
                  setSelectedStudentForResume(null);
                }}
                className="btn btn-primary h-11 w-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-1"
              >
                <Save size={16} /> Save Feedback Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage Visualizer Modal for TPO */}
      {selectedStudentForVisualizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg font-display">
                    {selectedStudentForVisualizer.name}'s Placement Stage Visualizer
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedStudentForVisualizer.department} • Student ID: {selectedStudentForVisualizer.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForVisualizer(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <StudentVisualizerView
              currentStudent={'applications' in selectedStudentForVisualizer ? (selectedStudentForVisualizer as Student) : {
                id: selectedStudentForVisualizer.id,
                name: selectedStudentForVisualizer.name,
                email: selectedStudentForVisualizer.email,
                password: '',
                department: selectedStudentForVisualizer.department,
                branch: selectedStudentForVisualizer.department,
                cgpa: selectedStudentForVisualizer.cgpa,
                backlogs: selectedStudentForVisualizer.backlogs,
                skills: ['React', 'TypeScript', 'Java'],
                placementStatus: selectedStudentForVisualizer.placementStatus,
                resumeScore: selectedStudentForVisualizer.resumeScore ?? 80,
                projectsCount: selectedStudentForVisualizer.projectsCount ?? 2,
                resumeText: selectedStudentForVisualizer.resumeText ?? '',
                applications: [
                  {
                    jobPostingId: '1',
                    driveId: '1',
                    companyName: selectedStudentForVisualizer.placedCompany || 'Google',
                    role: 'Associate Software Engineer',
                    appliedDate: '2026-06-01',
                    status: selectedStudentForVisualizer.placementStatus === 'Placed' ? 'Selected' : 'Applied',
                    currentRoundIndex: 1,
                    feedback: 'Candidate under evaluation by recruitment board.'
                  }
                ]
              }}
              drives={drives}
              selectedApplicationId={selectedAppId || '1'}
              setSelectedApplicationId={setSelectedAppId}
            />
          </div>
        </div>
      )}
    </div>
  );
};
