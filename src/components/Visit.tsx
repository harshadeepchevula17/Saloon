import React from 'react';
import { siteConfig } from '../config/site';
import { MapPin, Clock, Phone, Navigation, ArrowUpRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Visit: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <section id="visit" className="relative w-full py-28 md:py-44 bg-[#14110F] text-[#F2EBDD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 pb-6 border-b border-[#F2EBDD]/10">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
            // 08 &bull; ATELIER DESTINATION
          </span>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#F2EBDD]">
            COME FIND <br />
            <span className="font-serif italic font-normal text-[#C8A46A]">YOUR CHAIR</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Physical Salon Interior Photography */}
          <div className="lg:col-span-7 relative overflow-hidden aspect-[16/11] border border-[#F2EBDD]/15 bg-[#0B0A09] group" data-cursor="VIEW">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1400&auto=format&fit=crop"
              alt="H & S Atelier Suite"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C8A46A] uppercase block">
                  FLAGSHIP SUITE
                </span>
                <p className="font-display text-xl font-bold uppercase text-[#F2EBDD]">
                  INDIRANAGAR &bull; 100FT CORRIDOR
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C847A]">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>CHAIRS OPEN TODAY</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Location & Hours Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-display text-3xl font-black uppercase text-[#F2EBDD] tracking-tight">
                {siteConfig.brandName}
              </h3>
              <p className="font-serif italic text-base text-[#C8A46A] mt-1">
                The Heritage Salon
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-[#C8A46A] shrink-0 mt-1" />
              <div className="text-xs sm:text-sm font-sans text-[#8C847A] leading-relaxed">
                <p className="text-[#F2EBDD] font-medium">{siteConfig.address.line1}</p>
                <p>{siteConfig.address.line2}</p>
                <p>{siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pincode}</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-4">
              <Clock className="w-4 h-4 text-[#C8A46A] shrink-0 mt-1" />
              <div className="text-xs font-mono text-[#8C847A] space-y-1">
                <p className="text-[#F2EBDD]">{siteConfig.hours.weekdays}</p>
                <p className="text-[#C8A46A]">{siteConfig.hours.sunday}</p>
              </div>
            </div>

            {/* Telephone Direct */}
            <div className="flex items-start gap-4">
              <Phone className="w-4 h-4 text-[#C8A46A] shrink-0 mt-1" />
              <div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-mono text-base text-[#F2EBDD] hover:text-[#C8A46A] transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <p className="text-[10px] text-[#8C847A] font-mono uppercase">Concierge Desk</p>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-[#F2EBDD]/10">
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="MAP"
                className="px-6 py-3.5 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 text-center"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <button
                onClick={() => openBooking()}
                data-cursor="BOOK"
                className="px-6 py-3.5 bg-transparent hover:bg-[#F2EBDD]/5 text-[#F2EBDD] border border-[#F2EBDD]/20 hover:border-[#C8A46A] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>RESERVE SLOT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
