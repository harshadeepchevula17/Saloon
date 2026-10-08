export interface BarberProfile {
  id: string;
  number: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  philosophy: string;
  image: string;
}

export const barbersData: BarberProfile[] = [
  {
    id: "arjun",
    number: "01",
    name: "ARJUN",
    title: "MASTER CRAFTSMAN",
    specialty: "PRECISION FADES & ARCHITECTURAL SCISSOR WORK",
    experience: "11 YEARS",
    philosophy: "Every hairline possesses its own natural geometry. The craft is in sculpting the silhouette with absolute zero tolerance for imperfection.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ravi",
    number: "02",
    name: "RAVI",
    title: "EDITORIAL DIRECTOR",
    specialty: "CLASSIC SILHOUETTES & TEXTURED TAPERS",
    experience: "14 YEARS",
    philosophy: "True luxury is effortless form. When you step out of our chair, the cut should look immaculate today and grow out with effortless poise.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "karthik",
    number: "03",
    name: "KARTHIK",
    title: "BEARD ARCHITECT",
    specialty: "BEARD SCULPTING & HOT RAZOR PROFILES",
    experience: "9 YEARS",
    philosophy: "A tailored beard is facial architecture. It defines the jawline and commands quiet, unmistakable authority.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
  },
];
