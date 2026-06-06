"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  item,
  currentIndex,
  totalItems,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#1c1917]/98 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </motion.button>

        {/* Navigation */}
        {totalItems > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}

        {/* Media */}
        <div
          className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.title || "Gallery image"}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <video
                  src={item.url}
                  controls
                  className="max-w-full max-h-full rounded-lg"
                  autoPlay
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#1c1917] to-transparent pt-20 pb-6 px-6"
        >
          <div className="max-w-3xl mx-auto text-center">
            {item.title && (
              <h3 className="text-xl text-white mb-2">{item.title}</h3>
            )}
            <p className="text-white/60 text-sm">
              {currentIndex + 1} / {totalItems}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
