"use client";

import { motion } from "framer-motion";
import { Shield, Award, Truck, HeartHandshake } from "lucide-react";

const valueProps = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Handcrafted with precision using traditional techniques passed down through generations"
  },
  {
    icon: Award,
    title: "Export Certified",
    description: "Meeting international standards with ISO certified manufacturing processes"
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description: "Reliable worldwide delivery to over 50 countries with secure packaging"
  },
  {
    icon: HeartHandshake,
    title: "Custom Orders",
    description: "Bespoke designs tailored to your specifications and business requirements"
  }
];

export function ValuePropsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-3 font-medium">
            Why Choose Us
          </p>
          <h2 
            className="text-3xl md:text-4xl text-[#1c1917]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The <span className="text-[#C5A059] italic">Ilavio</span> Difference
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-[#A0522D]/5 border border-[#e7e5e4] h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#A0522D]/10 group-hover:border-[#A0522D]/30">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A0522D] to-[#3E2723] flex items-center justify-center mb-6 shadow-lg shadow-[#A0522D]/25 group-hover:scale-110 transition-transform duration-300">
                  <prop.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl text-[#1c1917] mb-3 font-medium">{prop.title}</h3>
                <p className="text-[#78716c] text-sm leading-relaxed">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
