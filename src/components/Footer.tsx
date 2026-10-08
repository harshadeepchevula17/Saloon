import React from 'react';
import { siteConfig } from '../config/site';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0B0A09] text-[#F2EBDD] pt-20 pb-12 border-t border-[#F2EBDD]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Tier: Huge Brandmark */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#F2EBDD]/10">
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#8C847A] block mb-2">
              HAUTE GROOMING ATELIER
            </span>
            <h2 className="font-display text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] font-black uppercase tracking-tight text-[#F2EBDD] leading-none select-none">
              H <span className="font-serif italic font-normal text-[#C8A46A]">&</span> S
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#DFC18A] mt-2">
              “{siteConfig.tagline}”
            </p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#8C847A] hover:text-[#C8A46A] transition-colors uppercase group"
            >
              <span>BACK TO SUMMIT</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-[#C8A46A]" />
            </button>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-xs font-mono tracking-widest uppercase text-[#8C847A]">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A46A] transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A46A] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-[#C8A46A] transition-colors"
              >
                Concierge Call
              </a>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C8A46A] transition-colors"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8C847A]">
          <p>&copy; {new Date().getFullYear()} {siteConfig.brandName}. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F2EBDD] cursor-pointer">PRIVACY POLICY</span>
            <span>&bull;</span>
            <span className="hover:text-[#F2EBDD] cursor-pointer">TERMS OF SERVICE</span>
            <span>&bull;</span>
            <span className="text-[#C8A46A]">ATELIER EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
