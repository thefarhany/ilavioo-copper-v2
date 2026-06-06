"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30+", label: "Years", sublabel: "Experience" },
  { value: "200+", label: "Products", sublabel: "In Catalog" },
  { value: "50+", label: "Countries", sublabel: "Export" },
  { value: "100%", label: "Handmade", sublabel: "Artisan" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export function StatsSection() {
  return (
    <section className="border-y border-[#e7e5e4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e7e5e4]">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="py-12 text-center"
            >
              <motion.p 
                className="text-4xl md:text-5xl mb-2 bg-gradient-to-br from-[#52796f] to-[#84a98c] bg-clip-text text-transparent"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm uppercase tracking-wider text-[#78716c] font-medium">{stat.label}</p>
              <p className="text-xs text-[#a8a29e] mt-1">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
