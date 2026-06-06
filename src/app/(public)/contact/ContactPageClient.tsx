"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/public/contact/HeroSection";
import { ContactInfo } from "@/components/public/contact/ContactInfo";
import { ContactForm } from "@/components/public/contact/ContactForm";
import { BusinessHours } from "@/components/public/contact/BusinessHours";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <HeroSection />

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left - Contact Info + Business Hours */}
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo />
              <BusinessHours />
            </div>

            {/* Right - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
