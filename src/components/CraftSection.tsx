import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const CraftSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openBooking } = useBooking();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Smooth Camera Zoom on Video
      gsap.fromTo(
        videoRef.current,
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Independent Subtle Parallax on Foreground Typography
      gsap.to(typographyRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="craft"
      ref={containerRef}
      className="relative w-full min-h-[85vh] lg:min-h-screen bg-[#0B0A09] text-[#F2EBDD] overflow-hidden flex items-center justify-center py-28 md:py-36"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover grayscale contrast-125 brightness-60 will-change-transform"
        >
          <source src="/videos/craft.mp4" type="video/mp4" />
        </video>

        {/* Middle Atmospheric Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]" />
        <div className="absolute inset-0 bg-[#0B0A09]/40 mix-blend-multiply" />
      </div>

      {/* Foreground Typography Layer */}
      <div
        ref={typographyRef}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center items-center text-center will-change-transform"
      >
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#C8A46A] mb-4 block">
          // 02 &bull; DISCIPLINE &amp; MASTERY
        </span>

        <h2 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black uppercase tracking-tight text-[#F2EBDD] leading-[0.88] mb-8">
          THE ART <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EBDD] via-[#DFC18A] to-[#C8A46A]">
            OF THE CUT
          </span>
        </h2>

        <p
          ref={quoteRef}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#F2EBDD]/90 max-w-2xl mx-auto leading-tight mb-10"
        >
          “Every movement has purpose. Every shear stroke honors the silhouette.”
        </p>

        <div>
          <button
            onClick={() => openBooking()}
            data-cursor="BOOK"
            className="px-8 py-4 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2"
          >
            <span>EXPERIENCE THE CRAFT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
