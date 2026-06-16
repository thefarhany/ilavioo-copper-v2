"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#3E2723] to-[#A0522D] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Can&apos;t Find What You&apos;re Looking For?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/80 mb-8"
        >
          We offer custom manufacturing services. Get in touch for bespoke designs.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-[#C5A059] hover:bg-[#F5F0E8] px-8 py-3 rounded-full font-medium transition-colors"
          >
            Request Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
