"use client";

import { motion } from "framer-motion";
import { Award, Clock, Globe, Users } from "lucide-react";

const values = [
  {
    title: "Quality",
    description: "Every piece is crafted to meet international export standards with meticulous attention to detail.",
    icon: Award
  },
  {
    title: "Tradition",
    description: "Our artisans carry forward centuries-old techniques combined with modern precision.",
    icon: Clock
  },
  {
    title: "Export",
    description: "We specialize in B2B export, delivering premium products to discerning clients worldwide.",
    icon: Globe
  },
  {
    title: "Partnership",
    description: "Building lasting relationships with clients through reliability and exceptional service.",
    icon: Users
  }
];

export function ValuesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-[#84a98c] mb-3 font-medium"
          >
            Our Values
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl text-[#1c1917]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We 
            <span className="text-[#52796f] italic"> Stand For</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-[#f1f5f3] rounded-2xl p-8 lg:p-10 h-full group-hover:bg-white group-hover:shadow-xl group-hover:shadow-[#84a98c]/5 transition-all duration-300 border border-transparent group-hover:border-[#e7e5e4]"
              >
                <div className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#84a98c]/25"
                  >
                    <value.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-[#1c1917] mb-2 font-medium"
                    >{value.title}</h3>
                    
                    <p className="text-[#78716c] leading-relaxed"
                    >{value.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
