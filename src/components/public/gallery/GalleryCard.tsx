"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const imageUrl =
    item.type === "image" ? item.url : item.thumbnail || item.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative overflow-hidden cursor-pointer group rounded-2xl"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={item.title || "Gallery image"}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          loading={index < 4 ? "eager" : "lazy"}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1c1917]/80 via-[#1c1917]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Type Icon */}
          <div className="absolute top-4 right-4">
            {item.type === "video" ? (
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="h-5 w-5 text-[#C5A059] ml-0.5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <ZoomIn className="h-5 w-5 text-[#C5A059]" />
              </div>
            )}
          </div>

          {/* Title */}
          {item.title && (
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-sm font-medium">{item.title}</p>
              <p className="text-white/60 text-xs mt-1">
                {item.type === "video" ? "Watch Video" : "View Image"}
              </p>
            </div>
          )}
        </div>

        {/* Border on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#A0522D]/50 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
