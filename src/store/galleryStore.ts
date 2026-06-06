import { create } from "zustand";
import { galleryApi, CreateGalleryInput } from "@/lib/api";
import type { GalleryItem } from "@/types";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface GalleryState {
  items: GalleryItem[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  error: string | null;

  // Public actions
  fetchGallery: (params?: { page?: number; limit?: number }) => Promise<void>;

  // Admin actions
  createGalleryItem: (payload: CreateGalleryInput) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  updateGalleryItem: (id: string, data: { title?: string; type?: "image" | "video" }) => Promise<boolean>;

  clearError: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  items: [],
  pagination: null,
  isLoading: false,
  error: null,

  fetchGallery: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await galleryApi.getAllGallery(params);
      if (response.success) {
        // Backend returns: { gallery: [], pagination: {} }
        const responseData = response.data as unknown as { gallery: GalleryItem[]; pagination: PaginationInfo };
        set({
          items: responseData.gallery || [],
          pagination: responseData.pagination || null,
        });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch gallery" });
    } finally {
      set({ isLoading: false });
    }
  },

  createGalleryItem: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await galleryApi.createGallery(payload);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to create gallery item";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteGalleryItem: async (id) => {
    set({ isLoading: true });
    try {
      const response = await galleryApi.deleteGallery(id);
      if (response.success) {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      }
      return response.success;
    } catch (error) {
      console.error("Failed to delete gallery item:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateGalleryItem: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await galleryApi.updateGallery(id, data);
      if (response.success) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }));
      }
      return response.success;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to update gallery item" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

