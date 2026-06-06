"use client";

import { motion } from "framer-motion";
import { ProductGrid as ProductGridComponent } from "@/components/public/products/ProductGrid";
import { EmptyState } from "@/components/public/products/EmptyState";
import type { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  viewMode: "grid" | "masonry";
}

export function ProductsGrid({ products, isLoading, searchQuery, viewMode }: ProductsGridProps) {
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-[#e7e5e4] rounded-2xl animate-pulse" />
                <div className="h-3 bg-[#e7e5e4] rounded-full w-1/3 animate-pulse" />
                <div className="h-4 bg-[#e7e5e4] rounded-full w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products?.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <EmptyState searchQuery={searchQuery} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ProductGridComponent products={products} viewMode={viewMode} />
      </div>
    </section>
  );
}
