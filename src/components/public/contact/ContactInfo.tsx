"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "marketing@ilavioo.com",
    href: "mailto:marketing@ilavioo.com",
    description: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+62 8121-3696-772",
    href: "https://wa.me/6281213696772",
    description: "Mon-Fri from 8am to 5pm",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Tumang, Central Java, Indonesia",
    href: "#",
    description: "Visit our showroom",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-8 h-0.5 bg-[#A0522D]" />
          <span className="text-sm uppercase tracking-[0.2em] text-[#A0522D] font-medium">
            Contact Information
          </span>
        </motion.div>

        <h2
          className="text-3xl md:text-4xl text-[#1c1917] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          We&apos;d love to hear
          <span className="text-[#C5A059] italic"> from you</span>
        </h2>

        <p className="text-[#78716c] mb-8">
          Our team is ready to assist you with any questions about our products,
          export services, or custom manufacturing.
        </p>

        <div className="space-y-4">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5 }}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-lg shadow-[#A0522D]/5 border border-[#e7e5e4] hover:border-[#A0522D]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#A0522D] to-[#3E2723] flex items-center justify-center shrink-0 shadow-lg shadow-[#A0522D]/25">
                <item.icon className="h-5 w-5 text-white" />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-[#A0522D] mb-1">
                  {item.label}
                </p>
                <p className="text-[#1c1917] font-medium group-hover:text-[#C5A059] transition-colors">
                  {item.value}
                </p>
                <p className="text-sm text-[#78716c] mt-1">
                  {item.description}
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-[#C5A059] group-hover:text-[#A0522D] group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
