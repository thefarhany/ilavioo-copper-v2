"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store";
import { useEffect } from "react";

export function FeaturedSection() {
  const { products, isLoading, fetchPublicProducts } = useProductStore();

  useEffect(() => {
    // Fetch featured products (limit 4)
    fetchPublicProducts({ limit: 4 });
  }, [fetchPublicProducts]);

  const featuredProducts = products.slice(0, 4);

  const formatPrice = (price?: number) => {
    if (!price) return "Contact";
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#84a98c]/5 via-[#f1f5f3]/30 to-[#52796f]/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f1f5f3] to-transparent opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#84a98c] text-sm uppercase tracking-[0.2em] font-medium mb-4 block">
              Collection
            </span>
            <h2 
              className="text-4xl md:text-5xl text-[#1c1917]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured <span className="text-[#52796f] italic">Products</span>
            </h2>
          </motion.div>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-[#52796f] hover:text-[#84a98c] transition-colors font-medium"
          >
            View Catalog
            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-[#84a98c] group-hover:border-[#84a98c] group-hover:text-white transition-all">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm">
                <div className="aspect-[3/4] bg-[#e7e5e4] animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-[#e7e5e4] rounded-full w-1/3 animate-pulse" />
                  <div className="h-4 bg-[#e7e5e4] rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-[#e7e5e4] rounded-full w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12 text-[#78716c]">
            No featured products available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/products/${product.slug}`} className="block">
                  {/* CARD WRAPPER dengan background, border, shadow */}
                  <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#84a98c]/10 hover:border-[#84a98c]/30 transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f4]">
                      <Image 
                        src={(product as any).thumbnail || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=533&fit=crop"} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/80 via-[#1c1917]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* View Button - Muncul di tengah */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <ArrowUpRight className="h-6 w-6 text-[#52796f]" />
                        </div>
                      </div>

                      {/* Custom Badge */}
                      {product.isCustomizable && (
                        <div className="absolute bottom-4 left-4">
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#52796f] text-xs uppercase tracking-wider rounded-full shadow-md">
                            <Sparkles className="h-3 w-3" />
                            Custom
                          </span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {product.isFeatured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-[#84a98c] to-[#52796f] text-white text-xs uppercase tracking-wider rounded-full shadow-md">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content dengan padding */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs uppercase tracking-wider text-[#84a98c] font-medium">
                          {product.category?.name}
                        </span>
                      </div>
                      
                      <h3 
                        className="text-lg text-[#1c1917] group-hover:text-[#52796f] transition-colors font-medium mb-2 line-clamp-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-[#78716c] line-clamp-1 mb-3">
                        {product.material}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-[#e7e5e4]">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg text-[#52796f] font-semibold">
                            {formatPrice(product.minPrice)}
                          </span>
                          <span className="text-xs text-[#a8a29e]">
                            /pc
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                          <ShoppingBag className="h-3 w-3" />
                          <span>MOQ: {product.moq || 50}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
