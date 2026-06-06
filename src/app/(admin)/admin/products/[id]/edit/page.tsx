"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
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
import { useProductStore } from "@/store";
import { toast } from "sonner";
import Image from "next/image";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const { products, categories, updateProduct, createCategory, fetchAdminProducts, fetchAllCategories, isLoading } = useProductStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newImages, setNewImages] = useState<{ file: File; preview: string }[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{ id: string; url: string; isPrimary: boolean }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Category modal state
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const product = products.find((p) => p.id === productId);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    material: "",
    categoryId: "",
    isCustomizable: false,
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    fetchAllCategories();
    if (products.length === 0) {
      fetchAdminProducts();
    }
  }, [fetchAllCategories, fetchAdminProducts, products.length]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        material: product.material || "",
        categoryId: product.categoryId,
        isCustomizable: product.isCustomizable,
        status: product.status,
      });
      setExistingImages(product.images?.map((img) => ({
        id: img.id,
        url: img.url,
        isPrimary: img.isPrimary,
      })) || []);
    }
  }, [product]);

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
      // Refresh categories to get the new one
      await fetchAllCategories();
      setNewCategoryName("");
      setIsCategoryDialogOpen(false);
      // User can now select the new category from dropdown
    } else {
      toast.error("Failed to create category");
    }
    setIsCreatingCategory(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImages((prev) => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (existingImages.length === 0 && newImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsUpdating(true);

    try {
      let uploadedImages: { url: string; publicId: string; type: "image" | "video" }[] = [];
      if (newImages.length > 0) {
        toast.info("Uploading new images to Cloudinary...");
        uploadedImages = await uploadMultipleToCloudinary(
          newImages.map((img) => img.file),
          "image"
        );
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        material: formData.material,
        categoryId: formData.categoryId,
        isCustomizable: formData.isCustomizable,
        status: formData.status,
        images: uploadedImages,
      };

      const success = await updateProduct(productId, payload);

      if (success) {
        toast.success("Product updated successfully");
        router.push("/admin/products");
      } else {
        toast.error("Failed to update product");
        setIsUpdating(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload images");
      setIsUpdating(false);
    }
  };

  if (isLoading && !product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#52796f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
        <Link href="/admin/products">
          <Button variant="outline" className="mt-4">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
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

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="customizable"
                  checked={formData.isCustomizable}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isCustomizable: checked })
                  }
                />
                <Label htmlFor="customizable" className="cursor-pointer">
                  Allow Customization
                </Label>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
              
              {/* Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#52796f] hover:bg-[#84a98c]/10 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  Click to upload more images
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Current Images</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {existingImages.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image
                          src={img.url}
                          alt="Product image"
                          fill
                          sizes="(max-width: 768px) 33vw, 150px"
                          className="object-cover"
                        />
                        {img.isPrimary && (
                          <span className="absolute top-1 left-1 bg-[#52796f]/100 text-white text-xs px-2 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingImage(img.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {newImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Images</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {newImages.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image
                          src={img.preview}
                          alt={`New preview ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 150px"
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t">
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isUpdating}
            className="bg-[#52796f] hover:bg-[#3d5c54]"
          >
            {isUpdating ? "Updating..." : "Update Product"}
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingCategory}
                className="bg-[#52796f] hover:bg-[#3d5c54]"
              >
                {isCreatingCategory ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}




