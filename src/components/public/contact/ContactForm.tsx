"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactApi } from "@/lib/api/contact";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await contactApi.sendContact(formData);
      if (response.success) {
        setIsSubmitted(true);
        toast.success(
          "Message sent successfully! We'll get back to you within 24 hours.",
        );
        // Reset after showing success
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            subject: "",
            message: "",
          });
        }, 3000);
      } else {
        setSubmitError(
          response.message || "Failed to send message. Please try again.",
        );
        toast.error(response.message || "Failed to send message.");
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-3"
    >
      <div className="bg-white rounded-3xl shadow-xl shadow-[#84a98c]/10 border border-[#e7e5e4] p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>

              <h3
                className="text-2xl text-[#1c1917] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Message Sent!
              </h3>

              <p className="text-[#78716c]">
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-0.5 bg-[#84a98c]" />
                <span className="text-sm uppercase tracking-[0.2em] text-[#84a98c] font-medium">
                  Send Message
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                  Subject *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1c1917] mb-2 block">
                  Message *
                </label>
                <Textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="bg-[#f5f5f4] border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-[#84a98c]/20 py-3 px-4 resize-none"
                  placeholder="Tell us about your project, requirements, or any questions you have..."
                />
              </div>

              {submitError && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <p className="text-red-800 text-sm font-medium">
                    {submitError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-linear-to-r from-[#84a98c] to-[#52796f] hover:from-[#52796f] hover:to-[#84a98c] text-white text-sm uppercase tracking-wider rounded-xl font-medium shadow-lg shadow-[#84a98c]/25 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
