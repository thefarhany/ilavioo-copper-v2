"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, ImageIcon, Video, Pencil, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGalleryStore } from "@/store";
import { toast } from "sonner";
import type { GalleryItem } from "@/types";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";

export default function AdminGalleryPage() {
  const { items, isLoading, fetchGallery, createGalleryItem, deleteGalleryItem, updateGalleryItem } =
    useGalleryStore();
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState<"image" | "video">("image");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      toast.info("Uploading to Cloudinary...");
      const uploaded = await uploadMultipleToCloudinary(
        Array.from(selectedFiles),
        uploadType
      );

      const payload = {
        type: uploadType,
        title: title || undefined,
        media: uploaded,
      };

      const success = await createGalleryItem(payload);
      if (success) {
        toast.success("Upload successful");
        setSelectedFiles(null);
        setTitle("");
        setIsUploadDialogOpen(false);
        fetchGallery();
      } else {
        toast.error("Failed to upload");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload");
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteGalleryItem(id);
    if (success) {
      toast.success("Item deleted successfully");
    } else {
      toast.error("Failed to delete item");
    }
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title || "");
    setEditType(item.type);
    setIsEditDialogOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsUpdating(true);
    const success = await updateGalleryItem(editingItem.id, {
      title: editTitle,
      type: editType,
    });

    if (success) {
      toast.success("Item updated successfully");
      setEditingItem(null);
      setEditTitle("");
      setIsEditDialogOpen(false);
      fetchGallery();
    } else {
      toast.error("Failed to update item");
    }
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
          <p className="text-gray-600">Manage your gallery images and videos</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#52796f] hover:bg-[#3d5c54]">
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
            </DialogHeader>

            <Tabs value={uploadType} onValueChange={(v) => setUploadType(v as "image" | "video")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">Image</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (optional)</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter image title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <Input type="file" accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} />
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (optional)</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
                  <Input type="file" accept="video/*" onChange={(e) => setSelectedFiles(e.target.files)} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload} disabled={!selectedFiles || isLoading} className="bg-[#52796f] hover:bg-[#3d5c54]">
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No gallery items yet. Upload your first media!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} onDelete={handleDelete} onEdit={openEditDialog} />
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Enter title" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Tabs value={editType} onValueChange={(v) => setEditType(v as "image" | "video")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isUpdating} className="bg-[#52796f] hover:bg-[#3d5c54]">
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GalleryCard({
  item,
  onDelete,
  onEdit,
}: {
  item: GalleryItem;
  onDelete: (id: string) => void;
  onEdit: (item: GalleryItem) => void;
}) {
  return (
    <div className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={item.type === "image" ? item.url : (item.thumbnail || item.url)}
        alt={item.title || "Gallery item"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />

      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-[#52796f] ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button variant="secondary" size="icon" onClick={() => onEdit(item)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-2 left-2">
        {item.type === "image" ? (
          <ImageIcon className="h-4 w-4 text-white drop-shadow" />
        ) : (
          <Video className="h-4 w-4 text-white drop-shadow" />
        )}
      </div>

      {item.title && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-white text-sm truncate">{item.title}</p>
        </div>
      )}
    </div>
  );
}
