"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGalleryStore } from "@/store";
import { GalleryGrid } from "@/components/public/gallery/GalleryGrid";
import { GalleryLightbox } from "@/components/public/gallery/GalleryLightbox";
import { HeroSection } from "@/components/public/gallery/HeroSection";
import { FilterBar } from "@/components/public/gallery/FilterBar";
import type { GalleryItem } from "@/types";

export default function GalleryPageClient() {
  const { items, isLoading, fetchGallery } = useGalleryStore();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(items[newIndex]);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    setSelectedItem(items[newIndex]);
  };

  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const imageCount = items.filter(item => item.type === "image").length;
  const videoCount = items.filter(item => item.type === "video").length;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <HeroSection
        imageCount={imageCount}
        videoCount={videoCount}
      />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalCount={items.length}
        imageCount={imageCount}
        videoCount={videoCount}
      />

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className={`grid gap-4 ${viewMode === "masonry" ? "columns-2 md:columns-3 lg:columns-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`bg-[#e7e5e4] rounded-2xl animate-pulse ${
                    viewMode === "masonry" && i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#f5f5f4] flex items-center justify-center"
              >
                <svg className="h-8 w-8 text-[#A0522D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl text-[#1c1917] mb-2">No items found</h3>
              <p className="text-[#78716c]">Try selecting a different filter.</p>
            </motion.div>
          ) : (
            <GalleryGrid
              items={filteredItems}
              onItemClick={handleItemClick}
              viewMode={viewMode}
            />
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        item={selectedItem}
        currentIndex={selectedIndex}
        totalItems={items.length}
        onClose={() => setSelectedItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
