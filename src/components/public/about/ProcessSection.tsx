"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    step: "01",
    title: "Design",
    description:
      "Collaborative design process to bring your vision to life with our expertise.",
  },
  {
    step: "02",
    title: "Craftsmanship",
    description:
      "Skilled artisans handcraft each piece using traditional techniques.",
  },
  {
    step: "03",
    title: "Quality Control",
    description:
      "Rigorous inspection ensures every product meets our high standards.",
  },
  {
    step: "04",
    title: "Export",
    description:
      "Secure packaging and worldwide shipping to deliver perfection to your door.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-[#F5F0E8] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#A0522D]/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-[#3E2723]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-3 font-medium"
          >
            Our Process
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl text-[#1c1917]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From Concept to
            <span className="text-[#C5A059] italic"> Creation</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-[#A0522D]/5 h-full border border-[#e7e5e4] group-hover:border-[#A0522D]/30 transition-all">
                <span
                  className="text-5xl font-extralight text-[#A0522D]/30 group-hover:text-[#A0522D]/50 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.step}
                </span>

                <div className="w-12 h-0.5 bg-linear-to-r from-[#A0522D] to-[#C5A059] my-4" />

                <h3 className="text-xl text-[#1c1917] mb-3 font-medium">
                  {step.title}
                </h3>

                <p className="text-sm text-[#78716c] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-linear-to-r from-[#A0522D]/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
