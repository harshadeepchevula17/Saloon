export interface GalleryItem {
  id: string;
  number: string;
  title: string;
  category: "ALL" | "FADE" | "CLASSIC" | "BEARD" | "TEXTURE";
  image: string;
  tagline: string;
  role: "main" | "secondary" | "vertical" | "detail";
}

export const galleryCategories = ["ALL", "FADE", "CLASSIC", "BEARD", "TEXTURE"] as const;

export const galleryData: GalleryItem[] = [
  {
    id: "work-1",
    number: "01",
    title: "THE MAIN ATELIER SUITE",
    category: "CLASSIC",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop",
    tagline: "Hand-stitched leather chair and bespoke mirror workstations",
    role: "main",
  },
  {
    id: "work-2",
    number: "02",
    title: "JAPANESE STEEL & RAZOR HONING",
    category: "FADE",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop",
    tagline: "440C stainless forged shears and precision straight razor edge",
    role: "detail",
  },
  {
    id: "work-3",
    number: "03",
    title: "DARK TIMBER & BRUSHED METAL",
    category: "TEXTURE",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop",
    tagline: "Architectural storage and warm tungsten illumination",
    role: "vertical",
  },
  {
    id: "work-4",
    number: "04",
    title: "BEARD ARCHITECTURE STATION",
    category: "BEARD",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
    tagline: "Aromatherapy steam towel basin and botanical elixir station",
    role: "secondary",
  },
];
