"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe } from "lucide-react";

const stats = [
  { icon: Award, value: "30+", label: "Years of Excellence" },
  { icon: Users, value: "50+", label: "Export Markets" },
  { icon: Globe, value: "50+", label: "Countries Served" },
];

export function StatsSection() {
  return (
    <section className="relative z-10 -mt-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl shadow-[#84a98c]/10 border border-[#e7e5e4] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e7e5e4]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ backgroundColor: "#f1f5f3" }}
                className="py-8 px-6 text-center transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-linear-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center shadow-lg shadow-[#84a98c]/25"
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </motion.div>
                <p
                  className="text-3xl md:text-4xl bg-linear-to-br from-[#52796f] to-[#84a98c] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[#78716c] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
