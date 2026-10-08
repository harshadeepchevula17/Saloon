import React from 'react';
import { siteConfig } from '../config/site';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const cleanNumber = siteConfig.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleClick}
        data-cursor="CHAT"
        aria-label="Connect via WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#14110F] border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110" />

        {/* Floating tooltip on desktop */}
        <span className="hidden md:block absolute right-16 px-3 py-1.5 bg-[#0B0A09]/95 text-[11px] font-mono tracking-widest text-[#F2EBDD] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-[#F2EBDD]/10">
          CONCIERGE CHAT
        </span>
      </button>
    </div>
  );
};
