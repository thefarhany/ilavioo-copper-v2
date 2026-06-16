"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Star, Quote, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTestimonialStore } from "@/store";
import { toast } from "sonner";

interface TestimonialFormProps {
  testimonialId?: string;
  isEdit?: boolean;
}

export default function TestimonialForm({ testimonialId, isEdit = false }: TestimonialFormProps) {
  const router = useRouter();
  const { testimonials, fetchAllTestimonials, createTestimonial, updateTestimonial, isLoading } = useTestimonialStore();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    content: "",
    rating: 5,
    isActive: true,
    imageUrl: "",
  });

  useEffect(() => {
    if (isEdit && testimonialId) {
      const testimonial = testimonials.find((t) => t.id === testimonialId);
      if (testimonial) {
        setFormData({
          name: testimonial.name,
          company: testimonial.company,
          country: testimonial.country,
          content: testimonial.content,
          rating: testimonial.rating,
          isActive: testimonial.isActive,
          imageUrl: testimonial.imageUrl || "",
        });
      } else {
        fetchAllTestimonials();
      }
    }
  }, [isEdit, testimonialId, testimonials, fetchAllTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    let success;
    if (isEdit && testimonialId) {
      success = await updateTestimonial(testimonialId, formData);
      if (success) {
        toast.success("Testimonial updated successfully");
      } else {
        toast.error("Failed to update testimonial");
      }
    } else {
      success = await createTestimonial(formData);
      if (success) {
        toast.success("Testimonial created successfully");
        router.push("/admin/testimonials");
      } else {
        toast.error("Failed to create testimonial");
      }
    }

    if (success && isEdit) {
      router.push("/admin/testimonials");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Testimonial" : "Add New Testimonial"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update client testimonial" : "Create a new client testimonial"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-5">
          {/* Client Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Client Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Client Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">
                  Company *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., Luxury Interiors Ltd"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="country">
                  Country
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., United States"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">
                  Profile Image URL (optional)
                </Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Testimonial Content */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Testimonial Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="content">
                Testimonial *
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write the client's testimonial here..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-1 transition-colors ${
                      star <= formData.rating ? "text-amber-500" : "text-gray-300"
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating} / 5
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Publish testimonial
              </Label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/testimonials">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#3E2723] hover:bg-[#2A1B14]"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}



