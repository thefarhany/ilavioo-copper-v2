"use client";

import { motion } from "framer-motion";
import { MessageSquare, Clock, Globe } from "lucide-react";

const quickStats = [
  { icon: Clock, value: "24h", label: "Response Time" },
  { icon: MessageSquare, value: "Multi", label: "Language Support" },
  { icon: Globe, value: "50+", label: "Countries Served" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014825/hero_mrmvib.jpg"
          alt="Contact background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#1c1917]/70 via-[#1c1917]/50 to-[#1c1917]/80" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#A0522D]/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#3E2723]/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center justify-center min-h-[50vh] text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        >
          <MessageSquare className="w-10 h-10 text-[#A0522D]" />
        </motion.div>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-sm text-white/70 mb-4"
        >
          <span>Home</span>
          <span className="text-white/40">/</span>
          <span className="text-white">Contact</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] text-[#A0522D] mb-4 font-medium"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl leading-tight text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Let&apos;s Start a
          <span className="block text-[#A0522D] italic">Conversation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
        >
          Whether you&apos;re interested in our products, have questions about
          export, or want to discuss a custom project, we&apos;re here to help.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10"
            >
              <stat.icon className="h-5 w-5 text-[#A0522D]" />
              <p className="text-2xl font-light text-white">{stat.value}</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
