import { apiClient } from "./axios";
import type { Product, ApiResponse, PaginatedResponse } from "@/types";

export interface ProductImageInput {
  url: string;
  publicId: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  material: string;
  dimensions?: string;
  weight?: string;
  minPrice?: string;
  maxPrice?: string;
  moq?: string;
  leadTime?: string;
  origin?: string;
  finishing?: string[];
  certifications?: string[];
  isCustomizable?: boolean;
  isFeatured?: boolean;
  status?: string;
  categoryId: string;
  images: ProductImageInput[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export const productApi = {
  // Public
  getPublicProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    q?: string;
  }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>("/products", {
      params,
    });
    return data;
  },

  getPublicProductBySlug: async (slug: string) => {
    const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
    return data;
  },

  // Admin
  getAllProducts: async (params?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      "/products/admin",
      { params }
    );
    return data;
  },

  createProduct: async (payload: CreateProductInput) => {
    const { data } = await apiClient.post<ApiResponse<Product>>("/products/admin", payload);
    return data;
  },

  updateProduct: async (id: string, payload: UpdateProductInput) => {
    const { data } = await apiClient.put<ApiResponse<Product>>(`/products/admin/${id}`, payload);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<void>>(`/products/admin/${id}`);
    return data;
  },
};
