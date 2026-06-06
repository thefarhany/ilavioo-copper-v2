import { create } from "zustand";
import { productApi, categoryApi, CreateProductInput, UpdateProductInput } from "@/lib/api";
import type { Product, Category } from "@/types";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ProductState {
  // Data
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  pagination: PaginationInfo | null;

  // Loading states
  isLoading: boolean;
  isLoadingCategories: boolean;
  error: string | null;

  // Actions
  fetchPublicProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => Promise<void>;
  fetchPublicProductBySlug: (slug: string) => Promise<void>;
  fetchAllCategories: () => Promise<void>;

  // Admin actions
  fetchAdminProducts: (params?: {
    page?: number;
    limit?: number;
  }) => Promise<void>;
  createProduct: (payload: CreateProductInput) => Promise<boolean>;
  updateProduct: (id: string, payload: UpdateProductInput) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  createCategory: (name: string) => Promise<boolean>;
  updateCategory: (id: string, name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearCurrentProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  currentProduct: null,
  pagination: null,
  isLoading: false,
  isLoadingCategories: false,
  error: null,

  fetchPublicProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.getPublicProducts(params);
      if (response.success) {
        // Handle both response formats
        const responseData = response.data as unknown as any;
        // Backend returns { products: [], pagination: {} }
        // Or formatted products directly
        const products = responseData.products || responseData || [];
        set({
          products: products,
          pagination: responseData.pagination || null,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPublicProductBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.getPublicProductBySlug(slug);
      if (response.success) {
        set({ currentProduct: response.data });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllCategories: async () => {
    set({ isLoadingCategories: true });
    try {
      const response = await categoryApi.getAllCategories();
      if (response.success) {
        // Backend returns: { categories: [], pagination: {} }
        const responseData = response.data as unknown as {
          categories: Category[];
          pagination: PaginationInfo;
        };
        set({ categories: responseData.categories || [] });
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      set({ isLoadingCategories: false });
    }
  },

  // Admin actions
  fetchAdminProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.getAllProducts(params);
      if (response.success) {
        const responseData = response.data as unknown as {
          products: Product[];
          pagination: PaginationInfo;
        };
        set({
          products: responseData.products || [],
          pagination: responseData.pagination || null,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.createProduct(payload);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to create product";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.updateProduct(id, payload);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to update product";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.deleteProduct(id);
      return response.success;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (name) => {
    try {
      const response = await categoryApi.createCategory(name);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to create category";
      throw new Error(message);
    }
  },

  updateCategory: async (id, name) => {
    try {
      const response = await categoryApi.updateCategory(id, name);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to update category";
      throw new Error(message);
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await categoryApi.deleteCategory(id);
      return response.success;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to delete category";
      throw new Error(message);
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));

