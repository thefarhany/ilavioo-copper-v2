"use client";

import { useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useTestimonialStore } from "@/store";
import Image from "next/image";

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg shadow-[#A0522D]/5 border border-[#e7e5e4] h-full relative">
      <Quote className="absolute top-6 right-6 h-8 w-8 text-[#A0522D]/20" />

      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#A0522D] text-[#A0522D]" />
        ))}
      </div>

      <p className="text-[#78716c] leading-relaxed mb-6">{testimonial.content}</p>

      <div className="flex items-center gap-3">
        {testimonial.imageUrl ? (
          <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
            <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#A0522D] to-[#3E2723] flex items-center justify-center shrink-0">
            <span className="text-white font-medium">{testimonial.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-medium text-[#1c1917]">{testimonial.name}</p>
          <p className="text-sm text-[#78716c]">{testimonial.company} · {testimonial.country}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { testimonials, fetchActiveTestimonials, isLoading } = useTestimonialStore();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  useEffect(() => {
    fetchActiveTestimonials(6);
  }, [fetchActiveTestimonials]);

  // Re-init embla whenever testimonials load
  useEffect(() => {
    if (emblaApi && testimonials.length > 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, testimonials.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Duplicate testimonials so Embla loop has enough slides to fill viewports
  const duplicated = useMemo(() => {
    if (testimonials.length === 0) return [];
    const minSlides = 9; // need at least 3 viewports worth (3 per view * 3)
    const repeats = Math.ceil(minSlides / testimonials.length);
    return Array.from({ length: repeats }).flatMap((_, i) =>
      testimonials.map((t, j) => ({ ...t, _key: `${t.id}-${i}-${j}` }))
    );
  }, [testimonials]);

  const canCarousel = testimonials.length > 3;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-3 font-medium">Testimonials</p>
          <h2 className="text-3xl md:text-4xl text-[#1c1917]" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our <span className="text-[#C5A059] italic">Clients</span> Say
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg shadow-[#A0522D]/5 border border-[#e7e5e4] h-full animate-pulse">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 w-4 bg-gray-200 rounded-full" />
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#78716c]">No testimonials yet.</p>
          </div>
        ) : canCarousel ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {duplicated.map((testimonial) => (
                  <div
                    key={testimonial._key}
                    className="min-w-0 shrink-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-[#e7e5e4] bg-white flex items-center justify-center text-[#C5A059] hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-[#e7e5e4] bg-white flex items-center justify-center text-[#C5A059] hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            testimonials.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            testimonials.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-3'
          }`}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
