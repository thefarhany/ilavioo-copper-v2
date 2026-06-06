import { apiClient } from "./axios";
import type { GalleryItem, ApiResponse, PaginatedResponse } from "@/types";

export interface GalleryMediaInput {
  url: string;
  publicId: string;
  type?: "image" | "video";
}

export interface CreateGalleryInput {
  type: "image" | "video";
  title?: string;
  media: GalleryMediaInput[];
}

export const galleryApi = {
  getAllGallery: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<GalleryItem>>>("/gallery", {
      params,
    });
    return data;
  },

  // Admin
  createGallery: async (payload: CreateGalleryInput) => {
    const { data } = await apiClient.post<ApiResponse<GalleryItem>>("/gallery/admin", payload);
    return data;
  },

  updateGallery: async (id: string, data: { title?: string; type?: "image" | "video" }) => {
    const { data: responseData } = await apiClient.put<ApiResponse<GalleryItem>>(`/gallery/admin/${id}`, data);
    return responseData;
  },

  deleteGallery: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<void>>(`/gallery/admin/${id}`);
    return data;
  },
};
