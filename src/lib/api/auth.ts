import { apiClient } from "./axios";
import type { ApiResponse } from "@/types";

interface User {
  id: string;
  email: string;
}

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post<ApiResponse<{ user: User }>>("/auth/login", {
      email,
      password,
    });
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post<ApiResponse<void>>("/auth/logout");
    return data;
  },

  me: async () => {
    const { data } = await apiClient.get<ApiResponse<{ user: User }>>("/auth/me");
    return data;
  },

  refresh: async () => {
    const { data } = await apiClient.post<ApiResponse<{ user: User }>>("/auth/refresh");
    return data;
  },
};
