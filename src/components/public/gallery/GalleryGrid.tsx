import { GalleryCard } from "./GalleryCard";
import type { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem, index: number) => void;
  viewMode?: "grid" | "masonry";
}

export function GalleryGrid({ items, onItemClick, viewMode = "masonry" }: GalleryGridProps) {
  return (
    <div
      className={
        viewMode === "masonry"
          ? "columns-2 md:columns-3 lg:columns-4 gap-4"
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      }
    >
      {items.map((item, index) => (
        <div key={item.id} className="break-inside-avoid mb-4">
          <GalleryCard
            item={item}
            index={index}
            onClick={() => onItemClick(item, index)}
          />
        </div>
      ))}
    </div>
  );
}
