import { apiClient } from "./axios";
import type { Testimonial, ApiResponse, PaginatedResponse } from "@/types";

export const testimonialApi = {
  // Public
  getActiveTestimonials: async (limit?: number) => {
    const { data } = await apiClient.get<ApiResponse<Testimonial[]>>("/testimonials/active", {
      params: { limit },
    });
    return data;
  },

  // Admin
  getAllTestimonials: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Testimonial>>>("/testimonials", {
      params,
    });
    return data;
  },

  createTestimonial: async (data: {
    name: string;
    company: string;
    country: string;
    content: string;
    rating?: number;
    isActive?: boolean;
    imageUrl?: string;
  }) => {
    const response = await apiClient.post<ApiResponse<Testimonial>>("/testimonials", data);
    return response.data;
  },

  updateTestimonial: async (
    id: string,
    data: {
      name?: string;
      company?: string;
      country?: string;
      content?: string;
      rating?: number;
      isActive?: boolean;
      imageUrl?: string;
    }
  ) => {
    const response = await apiClient.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data);
    return response.data;
  },

  deleteTestimonial: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<void>>(`/testimonials/${id}`);
    return data;
  },
};
