"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/public/about/HeroSection";
import { StatsSection } from "@/components/public/about/StatsSection";
import { StorySection } from "@/components/public/about/StorySection";
import { ProcessSection } from "@/components/public/about/ProcessSection";
import { ValuesSection } from "@/components/public/about/ValuesSection";
import { FinalCTA } from "@/components/public/FinalCTA";

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <HeroSection />
      <StatsSection />
      <StorySection />
      <ProcessSection />
      <ValuesSection />
      <FinalCTA />
    </div>
  );
}
