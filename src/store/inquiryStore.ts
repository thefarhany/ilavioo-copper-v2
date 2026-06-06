import { create } from "zustand";
import { inquiryApi } from "@/lib/api";
import type { Inquiry, CreateInquiryData } from "@/types";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface InquiryState {
  inquiries: Inquiry[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  error: string | null;

  // Public actions
  createInquiry: (data: CreateInquiryData) => Promise<boolean>;

  // Admin actions
  fetchAllInquiries: (params?: { page?: number; limit?: number }) => Promise<void>;
  updateInquiryStatus: (
    id: string,
    status: "new" | "contacted" | "closed"
  ) => Promise<boolean>;

  clearError: () => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  inquiries: [],
  pagination: null,
  isLoading: false,
  error: null,

  createInquiry: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await inquiryApi.createInquiry(data);
      return response.success;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to submit inquiry" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllInquiries: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await inquiryApi.getAllInquiries(params);
      if (response.success) {
        // Backend returns: { inquiries: [], pagination: {} }
        const responseData = response.data as unknown as { inquiries: Inquiry[]; pagination: PaginationInfo };
        set({
          inquiries: responseData.inquiries || [],
          pagination: responseData.pagination || null,
        });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to fetch inquiries" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateInquiryStatus: async (id, status) => {
    set({ isLoading: true });
    try {
      const response = await inquiryApi.updateInquiry(id, status);
      if (response.success) {
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id ? { ...inq, status } : inq
          ),
        }));
      }
      return response.success;
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
