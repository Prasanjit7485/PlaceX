export interface StudentResponse {
  id: string;
  name: string;
  email: string;
  registrationNumber?: string;
  phone: string;
  department: string;
  CGPA?: number;
  cgpa?: number;
  activeBacklogs: number;
  resumeUrl: string;
  year: number;
}

export interface StudentRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  department: string;
  activeBacklogs?: number;
  resumeUrl: string;
  year: number;
  cgpa?: number;
}
export interface CompanyResponse {
  id: number;
  name: string;
  website: string;
  location: string;
  description: string;
}

export interface CompanyRequest {
  id?: number;          
  name: string;
  website?: string;
  location: string;
  description?: string;
}

export interface JobPostingResponse {
  id: number;
  title: string;
  description: string;
  salary: number;
  deadline: string;
  status: string;             
  eligibleCGPACutoff: number;
  allowedBacklogs: number;
  allowedBranches: string;
  eligibleBatch?: string;
  requiredSkills: string;
  companyId: number;
  location: string;
}

export interface JobPostingRequest {
  title: string;
  description?: string;
  eligibleCGPACutoff?: number;
  allowedBacklogs?: number;
  allowedBranches?: string;
  eligibleBatch?: string;
  requiredSkills?: string;
  salary?: number;
  deadline: string;
  companyId?: number;
  location?: string;           
}

export interface DriveWithCompany {
  id: string;
  companyId: number;
  companyName: string;
  title: string;
  description: string;
  location: string;
  package: string;
  numericPackage: number;
  cgpaCutoff: number;
  maxBacklogs: number;
  allowedBranches: string[];
  eligibleBatch?: string;
  deadline: string;
  skillsRequired: string[];
  status: 'OPEN' | 'CLOSED';
  registeredCount: number;
}

export type RecruiterStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface RecruiterResponse {
  id: number;
  name: string;
  email: string;
  companyName: string;
  designation: string;
  recruiterStatus: RecruiterStatus;
}
export interface RecruiterRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
  designation?: string;
}
export type Role = "TPO" | "RECRUITER" | "STUDENT" | "ALUMNI";

export interface LoginRequest {
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  role: Role;
}

export interface StudentDashboardResponse {
  applicationsSubmitted: number;
  CGPA: number;
  activeBacklogs: number;
}

export interface DepartmentStat {
  department: string;
  totalStudents: number;
  placed: number;
  placementPercentage: number;
}

export interface SalaryRange {
  range: string;
  count: number;
}
export interface TPODashboardResponse {
  totalStudents: number;
  totalPlaced: number;
  placementPercentage: number;
  activeDrives: number;
  averageCTC: number;
  departmentStats: DepartmentStat[];
  salaryDistribution: SalaryRange[];
}
export interface StudentWithPlacement {
  id: string;
  name: string;
  email: string;
  registrationNumber?: string;
  department: string;
  cgpa: number;
  backlogs: number;
  placementStatus: "Placed" | "Unplaced";
  placedCompany?: string;
  placedPackage?: string;
  resumeScore: number;
  projectsCount: number;
  resumeText: string;
}

export interface ApplicationResponse {
  id: number;
  status: string;
  appliedDate: string;
  studentId: string;
  studentName: string;
  jobPostingId: number;
  jobTitle: string;
  companyName: string;
}

export interface PlacementEventResponse {
  id: number;
  title: string;
  eventType: string;
  companyId: number;
  companyName: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  status: string;
}

export interface InterviewRoundResponse {
  id: number;
  roundNumber: number;
  roundType: string;
  status: string;
  feedback: string | null;
  scheduledAt: string;
  applicationId: number;
}

export interface CalendarEvent {
  id: number | string;
  title: string;
  eventType: string;
  companyId?: number;
  companyName?: string;
  company?: string;
  role?: string;
  scheduledDate: string;
  startTime: string;
  endTime?: string;
  location?: string;
  venue?: string;
  description?: string;
  status?: string;
  branches?: string[];
  isPrivate?: boolean;
}

export interface StudentRoundVisualizerResponse {
  studentId: string;
  jobPostingId: number;
  applicationId: number;
  interviewRoundId?: number;
  feedback?: string;
  scheduledAt?: string;
  status: string;
  roundNumber?: number;
  roundType?: string;
  appliedDate?: string;
}

export interface TPOUserRequest {
  name: string;
  email: string;
  password?: string;
}

export interface TPOUserResponse {
  id: number;
  name: string;
  email: string;
}

export interface AlumniRequest {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hashNodeUrl?: string;
  devToUrl?: string;
}

export interface AlumniResponse {
  id: number;
  email: string;
  name: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hashNodeUrl?: string;
  devToUrl?: string;
}

export interface AlumniBlogRequest {
  id?: number;
  title?: string;
  description?: string;
  alumniId: number;
}

export interface AlumniBlogResponse {
  id: number;
  title: string;
  description: string;
  updatedAt?: string;
  createdAt?: string;
  alumniId: number;
}