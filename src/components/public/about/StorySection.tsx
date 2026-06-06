"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Lightbulb, MapPin } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Lightbulb className="h-5 w-5 text-[#84a98c]" />
              <span className="text-sm uppercase tracking-[0.2em] text-[#84a98c] font-medium">
                Our Story
              </span>
            </motion.div>

            <h2
              className="text-3xl md:text-4xl text-[#1c1917] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Three Decades of
              <span className="text-[#52796f] italic"> Excellence</span>
            </h2>

            <div className="w-24 h-0.5 bg-linear-to-r from-[#84a98c] to-[#cad2c5] mb-8" />

            <div className="space-y-4 text-[#78716c] leading-relaxed">
              <p>
                What began as a small family workshop in 1990 has evolved into a
                respected name in copper and brass manufacturing. Our founder's
                vision was simple: create products that honor traditional
                craftsmanship while meeting modern quality standards.
              </p>

              <p>
                Today, we combine time-honored techniques with contemporary
                design sensibilities, producing pieces that grace homes, hotels,
                and businesses across more than 50 countries. Every item that
                leaves our workshop carries with it decades of expertise and a
                commitment to excellence.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mt-8 text-[#52796f]"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Based in Malang, Indonesia</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#84a98c]/20 to-[#cad2c5]/20 rounded-3xl transform rotate-3" />

            <div className="relative aspect-4/3 bg-[#f5f5f4] rounded-3xl overflow-hidden shadow-2xl shadow-[#84a98c]/10">
              <Image
                src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014825/hero-2_jhpkij.jpg"
                alt="Workshop"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#1c1917]/40 to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#1c1917]">
                      Est. 1990
                    </p>

                    <p className="text-xs text-[#78716c]">30+ Years Legacy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
