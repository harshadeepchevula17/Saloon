export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  startingPrice: string;
  duration: string;
  description: string;
  bgTexture: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "haircut",
    number: "01",
    name: "HAIRCUT",
    startingPrice: "₹1,200",
    duration: "45 MIN",
    description: "Precision shear and clipper sculpture tailored to head geometry and hair texture. Finished with an artisan neck taper and botanical steam compress.",
    bgTexture: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "beard",
    number: "02",
    name: "BEARD",
    startingPrice: "₹800",
    duration: "35 MIN",
    description: "Architectural line sharpening with hot lather and straight razor, facial symmetry balancing, and nourishing cedarwood essential oil massage.",
    bgTexture: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "haircut-beard",
    number: "03",
    name: "HAIRCUT + BEARD",
    startingPrice: "₹1,800",
    duration: "75 MIN",
    description: "The complete transformation. Harmonized hair architecture and full beard sculpture, hot towel ritual, scalp therapy, and bespoke matte finish.",
    bgTexture: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "styling",
    number: "04",
    name: "STYLING",
    startingPrice: "₹700",
    duration: "30 MIN",
    description: "Thermal shaping, texture engineering, and luxury clay pomade structure curated for formal evenings and editorial appearances.",
    bgTexture: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "premium-grooming",
    number: "05",
    name: "PREMIUM GROOMING",
    startingPrice: "₹2,200",
    duration: "60 MIN",
    description: "Clarifying scalp detox, revitalizing botanical face mask, obsidian stone eye de-puffing, and executive acupressure neck massage.",
    bgTexture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "shape-up",
    number: "06",
    name: "SHAPE UP",
    startingPrice: "₹1,200",
    duration: "35 MIN",
    description: "A clean, tailored finish focused on edges, neckline, and overall silhouette refinement for a crisp daily look.",
    bgTexture: "https://images.unsplash.com/photo-1521590832167-7ae0b3d4a7e2?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "eyebrows",
    number: "07",
    name: "EYEBROWS",
    startingPrice: "₹500",
    duration: "20 MIN",
    description: "Symmetry shaping and light cleanup to frame the face and sharpen the overall profile with a polished finish.",
    bgTexture: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "ds-shampoo",
    number: "08",
    name: "D/S SHAMPOO",
    startingPrice: "₹700",
    duration: "20 MIN",
    description: "A deep cleansing wash and scalp refresh that lifts buildup and leaves the hair and skin feeling balanced and light.",
    bgTexture: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "scalp-treatment",
    number: "09",
    name: "SCALP TREATMENT",
    startingPrice: "₹1,400",
    duration: "30 MIN",
    description: "Nourishing scalp care designed to support healthy hair growth, reduce irritation, and restore a healthier finish.",
    bgTexture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop",
  },
];
