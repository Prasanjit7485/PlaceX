import request from "./client";
import type { TPOUserRequest, TPOUserResponse } from "./types";

export const userApi = {
  register: (data: TPOUserRequest) =>
    request<TPOUserResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => request<TPOUserResponse[]>("/users/all"),

  getById: (id: number) => request<TPOUserResponse>(`/users/${id}`),

  delete: (id: number) =>
    request<string>(`/users/delete/${id}`, { method: "DELETE" }),
};
