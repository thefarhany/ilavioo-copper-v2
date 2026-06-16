"use client";

import { Check, Sparkles, Package, Ruler, Weight, Clock, MapPin, Award, FileText, Shield } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductDetailInfoProps {
  product: Product;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {

  const formatPrice = (price?: number) => {
    if (!price) return "Contact for pricing";
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Category & Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A0522D] font-medium">
          {product.category?.name}
        </span>
        {product.isFeatured && (
          <Badge className="bg-gradient-to-r from-[#A0522D] to-[#3E2723] text-white">
            Featured
          </Badge>
        )}
        {product.isCustomizable && (
          <Badge variant="outline" className="border-[#A0522D] text-[#C5A059]">
            <Sparkles className="h-3 w-3 mr-1" />
            Customizable
          </Badge>
        )}
      </div>

      {/* Title & SKU */}
      <div>
        <h1 
          className="text-3xl md:text-4xl text-[#1c1917] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h1>
        {product.sku && (
          <p className="text-sm text-[#78716c]">
            SKU: {product.sku}
          </p>
        )}
      </div>

      {/* Price Section */}
      <div className="bg-[#F5F0E8] rounded-xl p-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-semibold text-[#C5A059]">
            {formatPrice(product.minPrice)}
          </span>
          {product.maxPrice && product.maxPrice !== product.minPrice && (
            <>
              <span className="text-[#78716c]">-</span>
              <span className="text-3xl font-semibold text-[#C5A059]">
                {formatPrice(product.maxPrice)}
              </span>
            </>
          )}
          <span className="text-sm text-[#78716c]">/unit</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#78716c]">
          <Package className="h-4 w-4" />
          <span>MOQ: {product.moq} units</span>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-stone prose-sm max-w-none">
        <p className="text-[#78716c] leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Material */}
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
          <Award className="h-5 w-5 text-[#A0522D] mt-0.5" />
          <div>
            <p className="text-xs text-[#78716c] uppercase tracking-wider">Material</p>
            <p className="text-[#1c1917] font-medium">{product.material}</p>
          </div>
        </div>

        {/* Dimensions */}
        {product.dimensions && (
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
            <Ruler className="h-5 w-5 text-[#A0522D] mt-0.5" />
            <div>
              <p className="text-xs text-[#78716c] uppercase tracking-wider">Dimensions</p>
              <p className="text-[#1c1917] font-medium">{product.dimensions}</p>
            </div>
          </div>
        )}

        {/* Weight */}
        {product.weight && (
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
            <Weight className="h-5 w-5 text-[#A0522D] mt-0.5" />
            <div>
              <p className="text-xs text-[#78716c] uppercase tracking-wider">Weight</p>
              <p className="text-[#1c1917] font-medium">{product.weight}</p>
            </div>
          </div>
        )}

        {/* Lead Time */}
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
          <Clock className="h-5 w-5 text-[#A0522D] mt-0.5" />
          <div>
            <p className="text-xs text-[#78716c] uppercase tracking-wider">Lead Time</p>
            <p className="text-[#1c1917] font-medium">{product.leadTime}</p>
          </div>
        </div>

        {/* Origin */}
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
          <MapPin className="h-5 w-5 text-[#A0522D] mt-0.5" />
          <div>
            <p className="text-xs text-[#78716c] uppercase tracking-wider">Origin</p>
            <p className="text-[#1c1917] font-medium">{product.origin}</p>
          </div>
        </div>

        {/* HS Code */}
        {product.hsCode && (
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e7e5e4]">
            <FileText className="h-5 w-5 text-[#A0522D] mt-0.5" />
            <div>
              <p className="text-xs text-[#78716c] uppercase tracking-wider">HS Code</p>
              <p className="text-[#1c1917] font-medium">{product.hsCode}</p>
            </div>
          </div>
        )}
      </div>

      {/* Finishing Options */}
      {product.finishing && product.finishing.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1c1917]">Available Finishes</p>
          <div className="flex flex-wrap gap-2">
            {product.finishing.map((finish) => (
              <Badge key={finish} variant="secondary" className="bg-[#F5F0E8] text-[#C5A059]">
                {finish}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {product.certifications && product.certifications.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1c1917]">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((cert) => (
              <Badge key={cert} className="bg-[#A0522D]/10 text-[#C5A059] border-[#A0522D]/20">
                <Shield className="h-3 w-3 mr-1" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pt-4 space-y-4">
        <Button
          asChild
          className="w-full h-14 bg-gradient-to-r from-[#A0522D] to-[#3E2723] hover:from-[#3E2723] hover:to-[#A0522D] text-white text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#A0522D]/25"
        >
          <a
            href={`https://wa.me/6281213696772?text=Hi%20Ilavioo%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.%20Can%20you%20send%20me%20a%20quote%3F`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Now
            <FaWhatsapp className="ml-2 h-4 w-4" />
          </a>
        </Button>

        <p className="text-xs text-[#78716c] text-center">
          Wholesale pricing available for bulk orders. Minimum order quantity: {product.moq} units.
        </p>
      </div>
    </div>
  );
}
