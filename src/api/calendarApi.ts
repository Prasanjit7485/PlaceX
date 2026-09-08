import request from "./client";
import type { PlacementEventResponse } from "./types";

function sanitizeTime(timeStr?: string): string | undefined {
  if (!timeStr || !timeStr.trim()) return undefined;
  const t = timeStr.trim();
  if (t.length === 5) return `${t}:00`;
  return t;
}

export const calendarApi = {
  getAll: (filters?: { year?: number; month?: number; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.year) params.set("year", String(filters.year));
    if (filters?.month) params.set("month", String(filters.month));
    if (filters?.status) params.set("status", filters.status);
    const query = params.toString();
    return request<PlacementEventResponse[]>(
      `/calendar/events/all${query ? `?${query}` : ""}`
    );
  },

  getUpcoming: () =>
    request<PlacementEventResponse[]>("/calendar/events/upcoming"),

  create: (data: {
    title: string;
    eventType: string;
    companyId?: number;
    scheduledDate: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    description?: string;
  }) => {
    const payload = {
      ...data,
      startTime: sanitizeTime(data.startTime),
      endTime: sanitizeTime(data.endTime),
    };
    return request<PlacementEventResponse>("/calendar/events/add", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: (
    id: number,
    data: {
      title: string;
      eventType: string;
      companyId?: number;
      scheduledDate: string;
      startTime?: string;
      endTime?: string;
      location?: string;
      description?: string;
    }
  ) => {
    const payload = {
      ...data,
      startTime: sanitizeTime(data.startTime),
      endTime: sanitizeTime(data.endTime),
    };
    return request<PlacementEventResponse>(`/calendar/events/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  
  cancel: (id: number) =>
    request<PlacementEventResponse>(`/calendar/events/delete/${id}`, {
      method: "DELETE",
    }),
};