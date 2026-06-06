"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/public/home/HeroSection";
import { StatsSection } from "@/components/public/home/StatsSection";
import { ValuePropsSection } from "@/components/public/home/ValuePropsSection";
import { FeaturedSection } from "@/components/public/home/FeaturedSection";
import { WhyChooseSection } from "@/components/public/home/WhyChooseSection";
import { GalleryOverviewSection } from "@/components/public/home/GalleryOverviewSection";
import { TestimonialsSection } from "@/components/public/home/TestimonialsSection";
import { CTASection } from "@/components/public/home/CTASection";

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-linear-to-br from-[#84a98c]/10 to-[#cad2c5]/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-100 h-100 rounded-full bg-linear-to-tr from-[#52796f]/5 to-transparent blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <HeroSection />
      <StatsSection />
      <ValuePropsSection />
      <FeaturedSection />
      <WhyChooseSection />
      <GalleryOverviewSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
