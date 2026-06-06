import { apiClient } from "./axios";
import type { Inquiry, CreateInquiryData, ApiResponse, PaginatedResponse } from "@/types";

export const inquiryApi = {
  // Public
  createInquiry: async (inquiryData: CreateInquiryData) => {
    const { data } = await apiClient.post<ApiResponse<Inquiry>>("/inquiries", inquiryData);
    return data;
  },

  getPublicInquiries: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Inquiry>>>("/inquiries", {
      params,
    });
    return data;
  },

  // Admin
  getAllInquiries: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Inquiry>>>(
      "/inquiries/admin",
      { params }
    );
    return data;
  },

  updateInquiry: async (id: string, status: "new" | "contacted" | "closed") => {
    const { data } = await apiClient.put<ApiResponse<Inquiry>>(`/inquiries/admin/${id}`, {
      status,
    });
    return data;
  },
};
