import request from "./client";
import type {
  TPODashboardResponse,
  StudentDashboardResponse,
  StudentResponse,
} from "./types";

export const dashboardApi = {
  getTpoDashboard: () => request<TPODashboardResponse>("/dashboard/tpo"),

  getStudentDashboard: async (
    studentId: string
  ): Promise<StudentDashboardResponse> => {
    const [stats, student] = await Promise.all([
      request<{ applicationsSubmitted: number }>(
        `/dashboard/student/${studentId}`
      ),
      request<StudentResponse>(`/students/${studentId}`),
    ]);

    return {
      applicationsSubmitted: stats.applicationsSubmitted,
      CGPA: student.CGPA ?? student.cgpa ?? 0,
      activeBacklogs: student.activeBacklogs,
    };
  },
};