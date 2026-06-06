"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CookingPot, Home, Factory, UtensilsCrossed } from "lucide-react";
import { useProductStore } from "@/store";
import { useEffect } from "react";

export function CategoriesSection() {
  const { categories, isLoadingCategories, fetchAllCategories } = useProductStore();

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  // Category visuals mapping (gradient + icon)
  const categoryVisuals: Record<string, { gradient: string; icon: React.ReactNode }> = {
    "copper-products": {
      gradient: "bg-linear-to-br from-[#b87333] to-[#8b5a2b]",
      icon: <CookingPot className="w-10 h-10 text-white/80" />,
    },
    "copper-cat": {
      gradient: "bg-linear-to-br from-[#52796f] to-[#354f52]",
      icon: <Home className="w-10 h-10 text-white/80" />,
    },
    "test-category": {
      gradient: "bg-linear-to-br from-[#84a98c] to-[#52796f]",
      icon: <UtensilsCrossed className="w-10 h-10 text-white/80" />,
    },
    "test-add-category": {
      gradient: "bg-linear-to-br from-[#6b4c35] to-[#4a3322]",
      icon: <Factory className="w-10 h-10 text-white/80" />,
    },
  };

  const getCategoryVisual = (slug: string) => {
    return categoryVisuals[slug.toLowerCase()] || {
      gradient: "bg-linear-to-br from-[#84a98c] to-[#52796f]",
      icon: <CookingPot className="w-10 h-10 text-white/80" />,
    };
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f1f5f3] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#84a98c] text-sm uppercase tracking-[0.2em] font-medium mb-4 block">
              Browse
            </span>
            <h2 
              className="text-4xl md:text-5xl text-[#1c1917]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Product <span className="text-[#52796f] italic">Categories</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-[#52796f] hover:text-[#84a98c] transition-colors font-medium"
            >
              View All Categories
              <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-[#84a98c] group-hover:border-[#84a98c] group-hover:text-white transition-all">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {isLoadingCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#e7e5e4] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-[#78716c]">
            No categories available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, i) => {
              const visual = getCategoryVisual(category.slug);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`group ${i === 1 ? 'lg:mt-12' : i === 2 ? 'lg:mt-6' : ''}`}
                >
                  <Link href={`/products?category=${category.slug}`} className="block">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg shadow-[#84a98c]/10 group">
                      <div className={`absolute inset-0 ${visual.gradient} transition-transform duration-700 group-hover:scale-110`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                        {visual.icon}
                      </div>

                      <div className="absolute bottom-0 p-6">
                        <h3
                          className="text-xl font-light text-white"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {category.name}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
