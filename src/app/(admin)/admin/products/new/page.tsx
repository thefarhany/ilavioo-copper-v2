"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Plus, DollarSign, Package, Ruler, Weight, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store";
import { toast } from "sonner";
import Image from "next/image";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";

const FINISHING_OPTIONS = ["Polished", "Brushed", "Antique", "Matte", "Hammered"];
const CERTIFICATION_OPTIONS = ["Food Grade", "ISO 9001", "Export Quality", "Handcrafted"];
const LEAD_TIME_OPTIONS = ["1-2 weeks", "2-3 weeks", "3-4 weeks", "4-6 weeks"];

export default function NewProductPage() {
  const router = useRouter();
  const { categories, createProduct, createCategory, fetchAllCategories } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [selectedFinishing, setSelectedFinishing] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    material: "",
    dimensions: "",
    weight: "",
    minPrice: "",
    maxPrice: "",
    moq: "100",
    leadTime: "2-3 weeks",
    origin: "Indonesia",
    categoryId: "",
    isCustomizable: false,
    isFeatured: false,
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsCreatingCategory(true);
    const success = await createCategory(newCategoryName.trim());
    
    if (success) {
      toast.success("Category created successfully");
      await fetchAllCategories();
      setNewCategoryName("");
      setIsCategoryDialogOpen(false);
    } else {
      toast.error("Failed to create category");
    }
    setIsCreatingCategory(false);
  };

  const toggleFinishing = (finishing: string) => {
    setSelectedFinishing(prev => 
      prev.includes(finishing) 
        ? prev.filter(f => f !== finishing)
        : [...prev, finishing]
    );
  };

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev => 
      prev.includes(cert) 
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);

    try {
      toast.info("Uploading images to Cloudinary...");
      const uploadedImages = await uploadMultipleToCloudinary(
        images.map((img) => img.file),
        "image"
      );

      const payload = {
        name: formData.name,
        description: formData.description,
        material: formData.material,
        dimensions: formData.dimensions,
        weight: formData.weight,
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
        moq: formData.moq,
        leadTime: formData.leadTime,
        origin: formData.origin,
        finishing: selectedFinishing,
        certifications: selectedCertifications,
        categoryId: formData.categoryId,
        isCustomizable: formData.isCustomizable,
        isFeatured: formData.isFeatured,
        status: formData.status,
        images: uploadedImages,
      };

      const success = await createProduct(payload);

      if (success) {
        toast.success("Product created successfully");
        router.push("/admin/products");
      } else {
        toast.error("Failed to create product");
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload images");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Create a new product with complete details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Copper Kettle"
                    required
                  />
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product description..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g., Pure Copper, Brass"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Specifications
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g., 30cm x 20cm x 15cm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 2.5 kg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="e.g., Indonesia"
                />
              </div>

            </div>

            {/* Category & Status */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Category & Status</h2>
              
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCategoryDialogOpen(true)}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time</Label>
                  <Select
                    value={formData.leadTime}
                    onValueChange={(value) => setFormData({ ...formData, leadTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAD_TIME_OPTIONS.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="customizable"
                    checked={formData.isCustomizable}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isCustomizable: checked })
                    }
                  />
                  <Label htmlFor="customizable" className="cursor-pointer">Customizable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFeatured: checked })
                    }
                  />
                  <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & MOQ
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Min Price (USD)</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Max Price (USD)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moq">Minimum Order Quantity (MOQ)</Label>
                <Input
                  id="moq"
                  type="number"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>

            {/* Finishing Options */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Finishing Options</h2>
              <div className="flex flex-wrap gap-2">
                {FINISHING_OPTIONS.map((finishing) => (
                  <button
                    key={finishing}
                    type="button"
                    onClick={() => toggleFinishing(finishing)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedFinishing.includes(finishing)
                        ? "bg-[#3E2723]/10 text-[#C5A059] border border-[#3E2723]/30"
                        : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                    }`}
                  >
                    {finishing}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATION_OPTIONS.map((cert) => (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleCertification(cert)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedCertifications.includes(cert)
                        ? "bg-[#A0522D]/10 text-[#3E2723] border border-[#C5A059]"
                        : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Images */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Product Images <span className="text-red-500">*</span>
              </h2>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#3E2723] hover:bg-[#A0522D]/10 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 33vw, 150px"
                        className="object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-[#3E2723]/100 text-white text-xs px-2 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t">
          <Link href="/admin/products">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#3E2723] hover:bg-[#2A1B14]"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>

      {/* Create Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="newCategory">Category Name *</Label>
              <Input
                id="newCategory"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingCategory} className="bg-[#3E2723] hover:bg-[#2A1B14]">
                {isCreatingCategory ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}




