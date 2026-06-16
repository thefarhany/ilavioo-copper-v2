"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInquiryStore } from "@/store";
import { toast } from "sonner";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
}

export function InquiryModal({ isOpen, onClose, productId, productName }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: productName ? `Product: ${productName}` : "",
    country: "",
    company: "",
  });
  const { createInquiry, isLoading } = useInquiryStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createInquiry({ ...formData, productId });
    if (success) {
      toast.success("Inquiry sent successfully! We\'ll get back to you within 24 hours.");
      setFormData({ name: "", email: "", message: "", country: "", company: "" });
      onClose();
    } else {
      toast.error("Failed to send inquiry. Please try again or contact us directly.");
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Header */}
               <div className="flex items-center justify-between p-6 border-b border-gray-100">
                 <div>
                   <h2 className="text-xl font-semibold text-gray-900">Request Quote</h2>
                   {productName && (
                     <p className="text-sm text-[#A0522D] mt-1">Product: {productName}</p>
                   )}
                 </div>
                 <Button variant="ghost" size="icon" onClick={onClose}>
                   <X className="h-5 w-5" />
                 </Button>
               </div>
  
               {/* Form */}
               <form onSubmit={handleSubmit} className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Name *
                     </label>
                     <Input
                       type="text"
                       required
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                       placeholder="Your name"
                     />
                   </div>
  
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Email *
                     </label>
                     <Input
                       type="email"
                       required
                       value={formData.email}
                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       placeholder="your@email.com"
                     />
                   </div>
                 </div>
  
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Country
                     </label>
                     <Input
                       type="text"
                       value={formData.country}
                       onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                       placeholder="Your country"
                     />
                   </div>
  
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Company
                     </label>
                     <Input
                       type="text"
                       value={formData.company}
                       onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                       placeholder="Your company (optional)"
                     />
                   </div>
                 </div>
  
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Message *
                   </label>
                   <Textarea
                     required
                     rows={4}
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                     placeholder="Tell us about your requirements..."
                   />
                 </div>
  
                 <Button
                   type="submit"
                   className="w-full bg-amber-600 hover:bg-amber-700"
                   disabled={isLoading}
                 >
                   <Send className="h-4 w-4 mr-2" />
                   {isLoading ? "Sending..." : "Send Inquiry"}
                 </Button>
               </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modalContent, document.body);
}
