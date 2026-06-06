import { apiClient } from "./axios";
import type { ApiResponse } from "@/types";

export interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  totalGalleryItems: number;
  newInquiries: number;
}

export const statsApi = {
  getDashboardStats: async () => {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>("/stats/dashboard");
    return data;
  },
};
