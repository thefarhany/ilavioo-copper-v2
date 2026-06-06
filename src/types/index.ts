export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string;
  material: string;
  dimensions?: string;
  weight?: string;
  minPrice?: number;
  maxPrice?: number;
  moq: number;
  leadTime: string;
  finishing: string[];
  certifications: string[];
  origin: string;
  hsCode?: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  status: "active" | "inactive";
  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  country: string;
  content: string;
  rating: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;
  companyName: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  aboutUs?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  publicId: string;
  thumbnail?: string;
  title?: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  country?: string;
  company?: string;
  productId?: string;
  product?: Product;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface CreateInquiryData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  country?: string;
  company?: string;
  productId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
