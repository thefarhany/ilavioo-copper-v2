"use client";

import { motion } from "framer-motion";
import { Grid3X3, LayoutTemplate } from "lucide-react";

interface FilterBarProps {
  filter: "all" | "image" | "video";
  setFilter: (filter: "all" | "image" | "video") => void;
  viewMode: "grid" | "masonry";
  setViewMode: (mode: "grid" | "masonry") => void;
  totalCount: number;
  imageCount: number;
  videoCount: number;
}

export function FilterBar({ 
  filter, 
  setFilter, 
  viewMode, 
  setViewMode, 
  totalCount, 
  imageCount, 
  videoCount 
}: FilterBarProps) {
  const tabs = [
    { id: "all" as const, label: "All", count: totalCount },
    { id: "image" as const, label: "Photos", count: imageCount },
    { id: "video" as const, label: "Videos", count: videoCount },
  ];

  return (
    <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-[#e7e5e4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Filter Tabs */}
          <div className="flex items-center bg-[#f5f5f4] rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tab.id
                    ? "bg-white text-[#52796f] shadow-sm"
                    : "text-[#78716c] hover:text-[#52796f]"
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === tab.id ? "bg-[#84a98c]/20 text-[#52796f]" : "bg-[#e7e5e4] text-[#78716c]"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("masonry")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "masonry" ? "bg-[#84a98c]/10 text-[#52796f]" : "text-[#78716c]"
              }`}
              title="Masonry View"
            >
              <LayoutTemplate className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-[#84a98c]/10 text-[#52796f]" : "text-[#78716c]"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
