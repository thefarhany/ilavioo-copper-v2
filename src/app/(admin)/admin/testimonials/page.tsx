"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star, Quote, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTestimonialStore } from "@/store";
import { toast } from "sonner";
import TestimonialForm from "./TestimonialForm";

export default function AdminTestimonialsPage() {
  const { testimonials, isLoading, fetchAllTestimonials, deleteTestimonial, updateTestimonial } = useTestimonialStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllTestimonials();
  }, [fetchAllTestimonials]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const success = await deleteTestimonial(id);
      if (success) {
        toast.success("Testimonial deleted successfully");
      } else {
        toast.error("Failed to delete testimonial");
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const success = await updateTestimonial(id, { isActive: !currentStatus });
    if (success) {
      toast.success(`Testimonial ${!currentStatus ? "published" : "unpublished"}`);
    }
  };

  const openEditDialog = (id: string) => {
    setSelectedTestimonialId(id);
    setIsEditDialogOpen(true);
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-[#52796f] hover:bg-[#3d5c54]">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search testimonials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No testimonials found
                </TableCell>
              </TableRow>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Quote className="h-4 w-4 text-amber-500" />
                      {testimonial.name}
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.company}</TableCell>
                  <TableCell>{testimonial.country}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{testimonial.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={testimonial.isActive}
                        onCheckedChange={() => handleToggleActive(testimonial.id, testimonial.isActive)}
                      />
                      <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                        {testimonial.isActive ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(testimonial.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          {selectedTestimonialId && (
            <TestimonialForm
              testimonialId={selectedTestimonialId}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

