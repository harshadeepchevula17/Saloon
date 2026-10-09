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
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Fly-by words (left / middle / right)
  const flyLeftRef = useRef<HTMLSpanElement>(null);
  const flyMidRef = useRef<HTMLSpanElement>(null);
  const flyRightRef = useRef<HTMLSpanElement>(null);

  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /**
       * ONE master timeline, in this order:
       *  1. Video fades in
       *  2. Fly-by words cross the video (each stops for 1 second), played once
       *  3. When ALL fly-by words are done, the main content rises from the bottom:
       *     headline -> small paragraph -> VIEW SERVICES / BOOK NOW buttons
       */
      const IN = 1.2;    // glide-in
      const HOLD = 1;    // pause on screen (1 second)
      const OUT = 1.2;   // glide-out
      const STEP = 1.4;  // gap between each word starting
      const FLY_START = 0.8;

      const tl = gsap.timeline({ delay: 4 });

      // 1) Video
      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      );

      // Side labels
      tl.fromTo(
        leftTextRef.current,
        { opacity: 0, x: -28 },
        { opacity: 0.75, x: 0, duration: 0.8, ease: 'power3.out' },
        0.4
      ).fromTo(
        rightTextRef.current,
        { opacity: 0, x: 28 },
        { opacity: 0.75, x: 0, duration: 0.8, ease: 'power3.out' },
        0.4
      );

      // 2) Fly-by words — glide in, stop 1s, glide out
      const flyBy = (
        el: HTMLElement | null,
        fromX: string,
        toX: string,
        at: number
      ) => {
        if (!el) return;
        gsap.set(el, { x: fromX, opacity: 0 });
        tl.to(el, { x: 0, opacity: 1, duration: IN, ease: 'power3.out' }, at).to(
          el,
          { x: toX, opacity: 0, duration: OUT, ease: 'power3.in' },
          at + IN + HOLD
        );
      };

      flyBy(flyLeftRef.current, '-110vw', '110vw', FLY_START);
      flyBy(flyRightRef.current, '110vw', '-110vw', FLY_START + STEP);
      flyBy(flyMidRef.current, '110vw', '-110vw', FLY_START + STEP * 2);

      // Moment the last fly-by word has fully left the screen
      const END = FLY_START + STEP * 2 + IN + HOLD + OUT;

      // 3) Main content rises from the bottom
      tl.fromTo(
        brandPillRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        END
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { opacity: 0, yPercent: 110 },
          { opacity: 1, yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
          END + 0.15
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          END + 0.7
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          END + 0.9
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          END + 1.3
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

  const outline = { WebkitTextStroke: '1.5px rgba(242,235,221,0.55)' } as React.CSSProperties;
  const outlineGold = { WebkitTextStroke: '1.5px rgba(200,164,106,0.7)' } as React.CSSProperties;

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

      {/* Fly-by words crossing the whole video */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden>
        {/* LEFT — upper band */}
        <div className="absolute left-0 right-0 top-[12%] px-6 md:px-12 flex justify-start">
          <span
            ref={flyLeftRef}
            style={outline}
            className="block whitespace-nowrap font-display font-black uppercase tracking-tight leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent opacity-0 will-change-transform"
          >
            Sharp Lines
          </span>
        </div>

        {/* MIDDLE — center band */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center">
          <span
            ref={flyMidRef}
            style={outlineGold}
            className="block whitespace-nowrap font-serif italic leading-none text-6xl sm:text-8xl md:text-[10rem] text-[#C8A46A]/10 opacity-0 will-change-transform"
          >
            H &amp; S Atelier
          </span>
        </div>

        {/* RIGHT — lower band */}
        <div className="absolute left-0 right-0 bottom-[12%] px-6 md:px-12 flex justify-end">
          <span
            ref={flyRightRef}
            style={outline}
            className="block whitespace-nowrap font-display font-black uppercase tracking-tight leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent opacity-0 will-change-transform"
          >
            Quiet Confidence
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          ref={leftTextRef}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase text-[#F2EBDD]/75 rotate-[-90deg]"
        >
          Tailored cuts
        </div>
        <div
          ref={rightTextRef}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase text-[#F2EBDD]/75 rotate-[90deg]"
        >
          Signature detail
        </div>
      </div>

      {/* Hero Content — rises from the bottom after the fly-by words */}
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

        {/* Small paragraph */}
        <p
          ref={descRef}
          className="text-base sm:text-lg text-[#8C847A] font-light max-w-lg mx-auto tracking-wide mb-10 font-sans"
        >
          Modern grooming. Timeless confidence. An uncompromising sanctuary dedicated to bespoke craft.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          <button
            onClick={scrollToServices}
            data-cursor="MENU"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#F2EBDD]/5 text-[#F2EBDD] border border-[#F2EBDD]/20 hover:border-[#C8A46A] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            VIEW SERVICES
          </button>
          <button
            onClick={() => openBooking()}
            data-cursor="BOOK"
            className="w-full sm:w-auto px-8 py-4 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>BOOK NOW</span>
            <ArrowUpRight className="w-4 h-4" />
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