"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const schedules = [
  { day: "Monday - Friday", time: "08:00 - 17:00", active: true },
  { day: "Saturday", time: "08:00 - 12:00", active: true },
  { day: "Sunday", time: "Closed", active: false },
];

export function BusinessHours() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#F5F0E8] rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4"
      >
        <Clock className="h-4 w-4 text-[#A0522D]" />
        <span className="text-sm uppercase tracking-wider text-[#A0522D] font-medium">Business Hours</span>
      </div>
      
      <div className="space-y-3"
      >
        {schedules.map((schedule) => (
          <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-[#e7e5e4] last:border-0"
          >
            <span className="text-[#78716c]">{schedule.day}</span>
            <span className={`font-medium ${schedule.active ? 'text-[#C5A059]' : 'text-[#a8a29e]'}`}>
              {schedule.time}
            </span>
          </div>
        ))}
      </div>    
    </motion.div>
  );
}
