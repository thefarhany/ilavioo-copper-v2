"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/public/products/HeroSection";
import { FilterBar } from "@/components/public/products/FilterBar";
import { ProductsGrid } from "@/components/public/products/ProductsGrid";
import { BottomCTA } from "@/components/public/products/BottomCTA";
import { useProductStore } from "@/store";

export default function ProductsPageClient() {
  const { products = [], categories = [], isLoading, fetchPublicProducts, fetchAllCategories } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  // Initial load
  useEffect(() => {
    fetchAllCategories();
    fetchPublicProducts();
  }, [fetchAllCategories, fetchPublicProducts]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch with filters
  useEffect(() => {
    const params: { q?: string; category?: string } = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (selectedCategory) params.category = selectedCategory;
    fetchPublicProducts(params);
  }, [debouncedSearch, selectedCategory, fetchPublicProducts]);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <HeroSection />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        productsCount={products.length}
      />

      <ProductsGrid
        products={products}
        isLoading={isLoading}
        searchQuery={debouncedSearch}
        viewMode={viewMode}
      />

      <BottomCTA />
    </div>
  );
}
