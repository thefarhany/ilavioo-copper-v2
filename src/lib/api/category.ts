import { apiClient } from "./axios";
import type { Category, ApiResponse, PaginatedResponse } from "@/types";

export const categoryApi = {
  getAllCategories: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Category>>>("/categories", {
      params,
    });
    return data;
  },

  createCategory: async (name: string) => {
    const { data } = await apiClient.post<ApiResponse<Category>>("/categories", { name });
    return data;
  },

  updateCategory: async (id: string, name: string) => {
    const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, { name });
    return data;
  },

  deleteCategory: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
    return data;
  },
};
