import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import type { Student, PlacementDrive, Recruiter } from '../mockData';
import { Footer } from './Footer';

// Import Redesigned Recruiter Components & Scoped CSS
import './recruiter/RecruiterPortal.css';
import { RecruiterSidebar, type RecruiterTabType } from './recruiter/RecruiterSidebar';
import { RecruiterMobileDrawer } from './recruiter/RecruiterMobileDrawer';
import { RecruiterDashboardView } from './recruiter/RecruiterDashboardView';
import { RecruiterDrivesView } from './recruiter/RecruiterDrivesView';
import { RecruiterTrackerView } from './recruiter/RecruiterTrackerView';

interface RecruiterPortalProps {
  recruiter: Recruiter;
  students: Student[];
  drives: PlacementDrive[];
  onLogout: () => void;
  onAddDrive: (drive: Omit<PlacementDrive, 'id' | 'registeredCount' | 'recruiterId'>) => void;
  onToggleDriveActive: (driveId: string) => void;
  onPromoteStudent: (studentId: string, driveId: string, newRoundIndex: number, isFinalSelection: boolean) => void;
  onRejectStudent: (studentId: string, driveId: string) => void;
}

const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Electrical'];

export const RecruiterPortal: React.FC<RecruiterPortalProps> = ({
  recruiter,
  students,
  drives,
  onLogout: _onLogout,
  onAddDrive,
  onToggleDriveActive,
  onPromoteStudent,
  onRejectStudent
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = (path: string): RecruiterTabType => {
    if (path.includes('/recruiter/drives')) return 'drives';
    if (path.includes('/recruiter/tracker') || path.includes('/recruiter/candidates')) return 'tracker';
    return 'dashboard';
  };

  const activeTab = getTabFromPath(location.pathname);

  const handleTabChange = (tab: RecruiterTabType) => {
    const routeMap: Record<RecruiterTabType, string> = {
      dashboard: '/recruiter/dashboard',
      drives: '/recruiter/drives',
      tracker: '/recruiter/tracker'
    };
    navigate(routeMap[tab]);
  };

  useEffect(() => {
    if (location.pathname === '/recruiter' || location.pathname === '/recruiter/') {
      navigate('/recruiter/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Scoped to this recruiter's own company drives only
  const myDrives = drives.filter((d) => d.recruiterId === recruiter.id);

  // New Drive Form State
  const [showDriveForm, setShowDriveForm] = useState(false);
  const [role, setRole] = useState('');
  const [pkg, setPkg] = useState('');
  const [numericPkg, setNumericPkg] = useState(6);
  const [cgpaCutoff, setCgpaCutoff] = useState(7.0);
  const [maxBacklogs, setMaxBacklogs] = useState(0);
  const [allowedBranches, setAllowedBranches] = useState<string[]>(['Computer Science', 'Information Technology']);
  const [eligibleBatch, setEligibleBatch] = useState('2026 Batch');
  const [deadline, setDeadline] = useState('2026-06-30');
  const [jobDesc, setJobDesc] = useState('');
  const [skillsRequiredText, setSkillsRequiredText] = useState('React, JavaScript, Node.js');
  const [roundsText, setRoundsText] = useState('Aptitude Test, Technical Interview, HR Interview');

  const [selectedStudentForResume, setSelectedStudentForResume] = useState<Student | null>(null);
  const [trackerDriveId, setTrackerDriveId] = useState<string>(myDrives[0]?.id || '');

  // KPI Computations (EXACT UNTOUCHED ALGORITHM)
  const activeDrivesCount = myDrives.filter((d) => d.status === 'OPEN').length;

  const myApplications = students.flatMap((s) =>
    s.applications
      .filter((app) => myDrives.some((d) => d.id === app.jobPostingId))
      .map((app) => ({ student: s, app }))
  );
  const totalApplicants = myApplications.length;

  const selectedCandidates = myApplications.filter((item) => item.app.status === 'Selected');
  const placedCount = selectedCandidates.length;

  const totalPackageSum = myDrives.reduce((sum, d) => sum + (d.numericPackage || 0), 0);
  const averagePackage = myDrives.length > 0 ? (totalPackageSum / myDrives.length).toFixed(1) : '0.0';

  // Handlers (EXACT UNTOUCHED ALGORITHM)
  const handleDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !pkg) return;

    onAddDrive({
      companyName: recruiter.companyName,
      role,
      package: pkg.includes('LPA') ? pkg : `${pkg} LPA`,
      numericPackage: Number(numericPkg),
      cgpaCutoff: Number(cgpaCutoff),
      maxBacklogs: Number(maxBacklogs),
      allowedBranches,
      eligibleBatch,
      deadline,
      jobDesc,
      skillsRequired: skillsRequiredText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      rounds: roundsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      title: role,
      description: jobDesc,
      status: 'OPEN',
      companyId: 0,
      recruitmentType: 'CAMPUS',
sourceType: 'RECRUITER',
    });

    setRole('');
    setPkg('');
    setNumericPkg(6);
    setCgpaCutoff(7.0);
    setMaxBacklogs(0);
    setAllowedBranches(['Computer Science', 'Information Technology']);
    setEligibleBatch('2026 Batch');
    setDeadline('2026-06-30');
    setJobDesc('');
    setSkillsRequiredText('React, JavaScript, Node.js');
    setRoundsText('Aptitude Test, Technical Interview, HR Interview');
    setShowDriveForm(false);
  };

  const handleBranchCheckbox = (branch: string) => {
    if (allowedBranches.includes(branch)) {
      setAllowedBranches(allowedBranches.filter((b) => b !== branch));
    } else {
      setAllowedBranches([...allowedBranches, branch]);
    }
  };

  const activeTrackerDrive = myDrives.find((d) => d.id === trackerDriveId);
  const activeTrackerApplications = students.flatMap((s) =>
    s.applications
      .filter((app) => app.jobPostingId === trackerDriveId && app.status !== 'Rejected' && app.status !== 'Selected')
      .map((app) => ({ student: s, app }))
  );

  return (
    <div className="rp-layout">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 flex items-center justify-between shadow-2xs">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs border border-blue-200/80 transition-all cursor-pointer flex items-center gap-2 shadow-2xs active:scale-95"
        >
          <Menu size={18} className="text-blue-600 shrink-0" />
          <span>Recruiter Navigation</span>
        </button>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 font-mono">
          {activeTab}
        </span>
      </div>

      <div className="rp-main-shell">
        {/* Persistent Desktop Sidebar (72px -> 280px Width Transition) */}
        <RecruiterSidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setIsSidebarExpanded((prev) => !prev)}
          recruiter={recruiter}
        />

        {/* Mobile Navigation Drawer */}
        <RecruiterMobileDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          recruiter={recruiter}
        />

        {/* Content Workspace Area */}
        <div className="rp-content-wrapper">
          <main className="rp-workspace">
            {activeTab === 'dashboard' && (
              <RecruiterDashboardView
                recruiter={recruiter}
                activeDrivesCount={activeDrivesCount}
                totalApplicants={totalApplicants}
                placedCount={placedCount}
                averagePackage={averagePackage}
                myDrives={myDrives}
                onGoToPostDrive={() => {
                  handleTabChange('drives');
                  setShowDriveForm(true);
                }}
              />
            )}

            {activeTab === 'drives' && (
              <RecruiterDrivesView
                recruiter={recruiter}
                myDrives={myDrives}
                showDriveForm={showDriveForm}
                setShowDriveForm={setShowDriveForm}
                handleDriveSubmit={handleDriveSubmit}
                role={role}
                setRole={setRole}
                pkg={pkg}
                setPkg={setPkg}
                numericPkg={numericPkg}
                setNumericPkg={setNumericPkg}
                cgpaCutoff={cgpaCutoff}
                setCgpaCutoff={setCgpaCutoff}
                maxBacklogs={maxBacklogs}
                setMaxBacklogs={setMaxBacklogs}
                allowedBranches={allowedBranches}
                handleBranchCheckbox={handleBranchCheckbox}
                eligibleBatch={eligibleBatch}
                setEligibleBatch={setEligibleBatch}
                deadline={deadline}
                setDeadline={setDeadline}
                jobDesc={jobDesc}
                setJobDesc={setJobDesc}
                skillsRequiredText={skillsRequiredText}
                setSkillsRequiredText={setSkillsRequiredText}
                roundsText={roundsText}
                setRoundsText={setRoundsText}
                onToggleDriveActive={onToggleDriveActive}
                branches={BRANCHES}
              />
            )}

            {activeTab === 'tracker' && (
              <RecruiterTrackerView
                recruiter={recruiter}
                myDrives={myDrives}
                trackerDriveId={trackerDriveId}
                setTrackerDriveId={setTrackerDriveId}
                activeTrackerDrive={activeTrackerDrive}
                activeTrackerApplications={activeTrackerApplications}
                selectedStudentForResume={selectedStudentForResume}
                setSelectedStudentForResume={setSelectedStudentForResume}
                onPromoteStudent={onPromoteStudent}
                onRejectStudent={onRejectStudent}
              />
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};
