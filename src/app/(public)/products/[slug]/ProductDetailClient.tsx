"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProductDetailGallery } from "@/components/public/products/ProductDetailGallery";
import { ProductDetailInfo } from "@/components/public/products/ProductDetailInfo";
import { FinalCTA } from "@/components/public/FinalCTA";
import { useProductStore } from "@/store";
import type { Product } from "@/types";

function RelatedCard({ product }: { product: Product }) {
  const imageUrl =
    (product as any).thumbnail ||
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop";

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-sm hover:shadow-xl hover:shadow-[#A0522D]/10 hover:border-[#A0522D]/30 transition-all duration-500">
        <div className="relative aspect-4/5 bg-[#f5f5f4] overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1c1917]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
              <ArrowRight className="h-4 w-4 text-[#C5A059]" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-[#A0522D] mb-1">
            {product.category?.name}
          </p>
          <h3 className="text-sm text-[#1c1917] group-hover:text-[#C5A059] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const {
    currentProduct,
    products,
    isLoading,
    fetchPublicProductBySlug,
    fetchPublicProducts,
    clearCurrentProduct,
  } = useProductStore();

  useEffect(() => {
    if (slug) {
      fetchPublicProductBySlug(slug);
    }
    return () => {
      clearCurrentProduct();
    };
  }, [slug, fetchPublicProductBySlug, clearCurrentProduct]);

  // Fetch related products
  useEffect(() => {
    if (currentProduct?.categoryId) {
      fetchPublicProducts({ category: currentProduct.categoryId, limit: 4 });
    }
  }, [currentProduct, fetchPublicProducts]);

  // Filter out current product from related
  const relatedProducts = products
    .filter((p) => p.id !== currentProduct?.id)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        {/* Header Skeleton */}
        <div className="border-b border-[#e7e5e4] bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="h-4 bg-[#e7e5e4] rounded w-32 animate-pulse" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-4/5 bg-[#e7e5e4] rounded-2xl animate-pulse" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-[#e7e5e4] rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="space-y-6">
              <div className="h-3 bg-[#e7e5e4] rounded w-24 animate-pulse" />
              <div className="h-8 bg-[#e7e5e4] rounded w-3/4 animate-pulse" />
              <div className="h-24 bg-[#e7e5e4] rounded-xl animate-pulse" />
              <div className="h-14 bg-[#e7e5e4] rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-2xl text-[#1c1917]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Product not found
          </h1>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#C5A059] hover:text-[#A0522D] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductDetailGallery
                images={currentProduct.images || []}
                productName={currentProduct.name}
              />
            </motion.div>

            {/* Right - Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProductDetailInfo product={currentProduct} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 border-t border-[#e7e5e4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-2 font-medium">
                  You May Also Like
                </p>
                <h2
                  className="text-2xl md:text-3xl text-[#1c1917]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="group hidden sm:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#C5A059] hover:text-[#A0522D] transition-colors"
              >
                View All Products
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <RelatedCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA variant="products" />
    </div>
  );
}
