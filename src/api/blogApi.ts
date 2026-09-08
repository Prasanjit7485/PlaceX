import request from "./client";
import type { AlumniBlogRequest, AlumniBlogResponse } from "./types";

export const blogApi = {
  add: (data: AlumniBlogRequest) =>
    request<string>("/blog/add", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => request<AlumniBlogResponse[]>("/blog/all"),

  getByAlumniId: (alumniId: number) =>
    request<AlumniBlogResponse[]>(`/blog?alumniId=${alumniId}`),

  getById: (id: number) => request<AlumniBlogResponse>(`/blog/${id}`),

  update: (id: number, data: AlumniBlogRequest) =>
    request<string>(`/blog/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<string>(`/blog/delete/${id}`, { method: "DELETE" }),
};
