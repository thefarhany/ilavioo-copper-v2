import { create } from "zustand";
import { testimonialApi } from "@/lib/api";
import type { Testimonial } from "@/types";

interface TestimonialState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchActiveTestimonials: (limit?: number) => Promise<void>;
  fetchAllTestimonials: (params?: { page?: number; limit?: number }) => Promise<void>;
  createTestimonial: (data: {
    name: string;
    company: string;
    country: string;
    content: string;
    rating?: number;
    isActive?: boolean;
    imageUrl?: string;
  }) => Promise<boolean>;
  updateTestimonial: (
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
  ) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;

  clearError: () => void;
}

export const useTestimonialStore = create<TestimonialState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  fetchActiveTestimonials: async (limit = 6) => {
    set({ isLoading: true, error: null });
    try {
      const response = await testimonialApi.getActiveTestimonials(limit);
      if (response.success) {
        set({ testimonials: response.data });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch testimonials" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllTestimonials: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await testimonialApi.getAllTestimonials(params);
      if (response.success) {
        const responseData = response.data as unknown as { testimonials: Testimonial[]; pagination: any };
        set({ testimonials: responseData.testimonials || [] });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch testimonials" });
    } finally {
      set({ isLoading: false });
    }
  },

  createTestimonial: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await testimonialApi.createTestimonial(data);
      return response.success;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to create testimonial" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateTestimonial: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await testimonialApi.updateTestimonial(id, data);
      return response.success;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to update testimonial" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTestimonial: async (id) => {
    set({ isLoading: true });
    try {
      const response = await testimonialApi.deleteTestimonial(id);
      if (response.success) {
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        }));
      }
      return response.success;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to delete testimonial" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
