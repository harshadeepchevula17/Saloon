import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandPillRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cinematic Master Timeline
      const tl = gsap.timeline({ delay: 4 });

      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }
      )
      .fromTo(
        [brandPillRef.current, descRef.current, ctaRef.current, scrollIndicatorRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        4
      )
      .fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, duration: 1.1, ease: 'power4.out' },
        4
      );

      // Scroll Parallax & Scale
      gsap.to(contentRef.current, {
        yPercent: -25,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(videoRef.current, {
        scale: 1.08,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0B0A09]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center will-change-transform opacity-0"
        >
          <source src="/videos/hero%20(2).mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlays */}
        <div className="absolute inset-0 bg-[#0B0A09]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0A09]/40 to-[#0B0A09]/90 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center items-center text-center pt-16"
      >
        {/* Subtitle Pill */}
        <div
          ref={brandPillRef}
          className="inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-full border border-[#F2EBDD]/15 bg-[#14110F]/70 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46A]" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F2EBDD]/90">
            H & S SALON &bull; ATELIER DE GROOMING
          </span>
        </div>

        {/* Masked Headline Reveal */}
        <div className="overflow-hidden mb-1">
          <h1
            ref={titleLine1Ref}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase text-[#F2EBDD] leading-[0.9] will-change-transform"
          >
            CRAFTED FOR YOUR
          </h1>
        </div>
        <div className="overflow-hidden mb-6 md:mb-8">
          <h1
            ref={titleLine2Ref}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#F2EBDD] via-[#DFC18A] to-[#C8A46A] will-change-transform"
          >
            SIGNATURE
          </h1>
        </div>

        {/* Supporting Copy */}
        <p
          ref={descRef}
          className="text-base sm:text-lg text-[#8C847A] font-light max-w-lg mx-auto tracking-wide mb-10 font-sans"
        >
          Modern grooming. Timeless confidence. An uncompromising sanctuary dedicated to bespoke craft.
        </p>

        {/* Dual CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          <button
            onClick={() => openBooking()}
            data-cursor="BOOK"
            className="w-full sm:w-auto px-8 py-4 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>BOOK YOUR CHAIR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollToServices}
            data-cursor="MENU"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#F2EBDD]/5 text-[#F2EBDD] border border-[#F2EBDD]/20 hover:border-[#C8A46A] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            EXPLORE THE CRAFT
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group select-none"
        data-cursor="SCROLL"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#8C847A] group-hover:text-[#C8A46A] transition-colors">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#8C847A]/30 flex items-start justify-center p-1 group-hover:border-[#C8A46A] transition-colors">
          <ArrowDown className="w-3 h-3 text-[#C8A46A]" />
        </div>
      </div>
    </section>
  );
};
