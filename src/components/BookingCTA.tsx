import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { siteConfig } from '../config/site';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const BookingCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Slow cinematic camera push on background video
      gsap.fromTo(
        videoBgRef.current,
        { scale: 1.0, opacity: 0.6 },
        {
          scale: 1.06,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="booking-cta"
      ref={sectionRef}
      className="relative w-full py-36 md:py-52 bg-[#0B0A09] text-[#F2EBDD] overflow-hidden flex items-center justify-center min-h-[750px]"
    >
      {/* Cinematic Film-Ending Video Atmosphere (reusing hero.mp4 seamlessly) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoBgRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover grayscale contrast-125 brightness-45 will-change-transform"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/60 to-[#0B0A09]" />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center will-change-transform"
      >
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#C8A46A] mb-4 block">
          // 09 &bull; EPILOGUE
        </span>

        <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-[#F2EBDD] leading-[0.88] mb-8">
          YOUR CHAIR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EBDD] via-[#DFC18A] to-[#C8A46A]">
            IS WAITING.
          </span>
        </h2>

        <p className="font-serif italic text-xl sm:text-2xl text-[#8C847A] max-w-md mx-auto mb-12">
          Ready for your next signature look?
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto">
          <button
            onClick={() => openBooking()}
            data-cursor="BOOK"
            className="w-full sm:w-auto px-9 py-4 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>BOOK YOUR APPOINTMENT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={openWhatsApp}
            data-cursor="CHAT"
            className="w-full sm:w-auto px-8 py-4 bg-[#14110F] hover:bg-[#1A1613] text-[#F2EBDD] border border-[#F2EBDD]/15 hover:border-[#C8A46A] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP US</span>
          </button>
        </div>
      </div>
    </section>
  );
};
