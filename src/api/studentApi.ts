import request from "./client";
import type {
  StudentResponse,
  StudentRequest,
  StudentRoundVisualizerResponse,
  ApplicationResponse,
  StudentWithPlacement,
} from "./types";
import { applicationApi } from "./applicationApi";
import { jobPostingApi } from "./jobPostingApi";

export const studentApi = {
  getAll: () => request<StudentResponse[]>("/students/all"),

  getById: (id: string) => request<StudentResponse>(`/students/${id}`),

  add: (data: StudentRequest) =>
    request<StudentResponse>("/students/add", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (data: StudentRequest) =>
    request<StudentResponse>("/students/update", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<string>(`/students/delete/${id}`, { method: "DELETE" }),

  getStageVisualizer: (id: string) =>
    request<StudentRoundVisualizerResponse[]>(`/students/stageVisualizer/${id}`),

  getAllWithPlacementInfo: async (): Promise<StudentWithPlacement[]> => {
    const [students, applications, jobPostings] = await Promise.all([
      request<StudentResponse[]>("/students/all"),
      applicationApi.getAll(),
      jobPostingApi.getAll(),
    ]);

    const jobPostingById = new Map(jobPostings.map((jp) => [jp.id, jp]));

    const placedByStudent = new Map<string, ApplicationResponse>();
    for (const app of applications) {
      if (app.status === "SHORTLISTED") {
        placedByStudent.set(app.studentId, app);
      }
    }

    return students.map((s): StudentWithPlacement => {
      const placedApp = placedByStudent.get(s.id);
      const placedPosting = placedApp
        ? jobPostingById.get(placedApp.jobPostingId)
        : undefined;
      return {
        id: s.id,
        name: s.name,
        email: s.email,
        department: s.department,
        cgpa: s.cgpa ?? s.CGPA ?? 0,
        backlogs: s.activeBacklogs,
        placementStatus: placedApp ? "Placed" : "Unplaced",
        placedCompany: placedApp?.companyName,
        placedPackage: placedPosting?.salary
          ? `${placedPosting.salary} LPA`
          : undefined,
        resumeScore: 0,
        projectsCount: 0,
        resumeText: "",
      };
    });
  },
};