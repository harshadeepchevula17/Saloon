export interface SiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  whatsappDefaultMessage: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    mapsUrl: string;
  };
  hours: {
    weekdays: string;
    sunday: string;
  };
  socials: {
    instagram: string;
    whatsapp: string;
    youtube?: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "H & S SALON",
  shortName: "H & S",
  tagline: "CRAFTED FOR YOUR SIGNATURE",
  subTagline: "Modern grooming. Timeless confidence.",
  description: "H & S Salon is built around precision, bespoke craftsmanship, and the belief that great grooming is an essential mark of individual identity.",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "+919876543210",
  whatsappDisplay: "+91 98765 43210",
  whatsappDefaultMessage: "Hello H & S Salon, I would like to reserve an appointment.",
  email: "chair@hssalon.com",
  address: {
    line1: "42 Heritage Avenue, Luxury Row",
    line2: "Indiranagar, 100ft Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    mapsUrl: "https://maps.google.com/?q=H+and+S+Salon",
  },
  hours: {
    weekdays: "MON — SAT : 10:00 AM — 09:00 PM",
    sunday: "SUN : 11:00 AM — 07:00 PM",
  },
  socials: {
    instagram: "https://instagram.com/hssalon.official",
    whatsapp: "https://wa.me/919876543210",
  },
};
