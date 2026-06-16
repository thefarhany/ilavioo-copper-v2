"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, Grid3X3, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  viewMode: "grid" | "masonry";
  setViewMode: (mode: "grid" | "masonry") => void;
  categories: Array<{ id: string; slug: string; name: string }>;
  productsCount: number;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
  productsCount
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(null);
  }, [setSearchQuery, setSelectedCategory]);

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-[#e7e5e4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0522D]" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 bg-[#f5f5f4] border-0 rounded-full focus-visible:ring-2 focus-visible:ring-[#A0522D]/20 py-3 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#C5A059] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* View Toggle */}
            <div className="flex items-center bg-[#f5f5f4] rounded-full p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid" 
                    ? "bg-white shadow-sm text-[#C5A059]" 
                    : "text-[#78716c] hover:text-[#C5A059]"
                }`}
                title="Grid View"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "masonry" 
                    ? "bg-white shadow-sm text-[#C5A059]" 
                    : "text-[#78716c] hover:text-[#C5A059]"
                }`}
                title="Masonry View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-2.5 bg-[#f5f5f4] hover:bg-[#e7e5e4] rounded-full text-sm text-[#1c1917] transition-colors"
              >
                <span className="font-medium">
                  {selectedCategory
                    ? categories.find((c) => c.slug === selectedCategory)?.name
                    : "All Categories"}
                </span>
                <ChevronDown className={`h-4 w-4 text-[#A0522D] transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsFilterOpen(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e7e5e4] rounded-2xl shadow-xl shadow-[#A0522D]/10 z-20 overflow-hidden"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-colors ${
                            !selectedCategory 
                              ? "bg-[#A0522D]/10 text-[#C5A059] font-medium" 
                              : "text-[#1c1917] hover:bg-[#f5f5f4]"
                          }`}
                        >
                          All Categories
                        </button>
                        
                        {categories?.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.slug);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-colors ${
                              selectedCategory === category.slug 
                                ? "bg-[#A0522D]/10 text-[#C5A059] font-medium" 
                                : "text-[#1c1917] hover:bg-[#f5f5f4]"
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Results Count */}
            <span className="hidden sm:block text-sm text-[#78716c]">
              {productsCount} products
            </span>

            {/* Clear Filters */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#C5A059] hover:text-[#A0522D] bg-[#A0522D]/10 hover:bg-[#A0522D]/20 rounded-full transition-colors"
                >
                  Clear filters
                  <X className="h-3 w-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
