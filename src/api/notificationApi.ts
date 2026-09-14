import request from "./client";
import type { NotificationResponse } from "./types";

export const notificationApi = {
  getNotifications: (studentId: string) =>
    request<NotificationResponse[]>(
      `/students/${encodeURIComponent(studentId)}/notifications`
    ),

  markViewed: (notificationId: number) =>
    request<string>(`/students/notifications/${notificationId}/viewed`, {
      method: "PATCH",
    }),
};
