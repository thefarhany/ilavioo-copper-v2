"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { useGalleryStore } from "@/store";
import { useEffect } from "react";

export function GalleryOverviewSection() {
  const { items, isLoading, fetchGallery } = useGalleryStore();

  useEffect(() => {
    // Fetch all gallery items then pick first 6 images
    fetchGallery({ limit: 999 });
  }, [fetchGallery]);

  // Get only image items, max 6
  const galleryImages = items
    .filter(item => item.type === "image")
    .slice(0, 6);

  // Masonry layout heights (alternating)
  const getAspectRatio = (index: number) => {
    const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]"];
    return ratios[index % ratios.length];
  };

  return (
    <section className="py-24 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A0522D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#A0522D] to-[#3E2723] flex items-center justify-center shadow-lg shadow-[#A0522D]/25"
          >
            <Camera className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-4 font-medium"
          >
            Gallery Preview
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-[#1c1917] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Glimpse of Our <span className="text-[#C5A059] italic">Craft</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#78716c] max-w-2xl mx-auto mb-8"
          >
            Explore our collection of handcrafted copper and brass products, 
            each piece showcasing the artistry and dedication of our skilled artisans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0522D] hover:bg-[#3E2723] text-white rounded-full font-medium transition-colors shadow-lg shadow-[#A0522D]/25"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`bg-[#e7e5e4] rounded-2xl animate-pulse ${getAspectRatio(i)}`} />
            ))}
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12 text-[#78716c]">
            No gallery items available
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {galleryImages.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="break-inside-avoid group"
              >
                <Link href="/gallery" className="block relative rounded-2xl overflow-hidden">
                  <div className={`relative ${getAspectRatio(i)}`}>
                    <Image
                      src={item.url}
                      alt={item.title || "Gallery image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <ArrowRight className="h-5 w-5 text-[#C5A059]" />
                      </div>
                    </div>
                  </div>
                  
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-sm font-medium">{item.title}</p>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
