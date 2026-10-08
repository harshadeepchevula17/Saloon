import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      tl.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0.4, y: 50 },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out' }
      )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.6, scale: 1.2, ease: 'power2.out' },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-[#0B0A09] flex items-center justify-center border-t border-b border-[#F2EBDD]/5"
    >
      {/* Background Radial Glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[300px] bg-[#C8A46A]/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div
        ref={cardRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <span className="text-[11px] font-mono tracking-[0.35em] text-[#C8A46A] uppercase mb-4 block">
          // 01 — THE EXPERIENCE
        </span>
        <div ref={textRef} className="space-y-4">
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#F2EBDD] font-normal leading-tight">
            “Grooming is not routine — it is architecture, ritual, and signature identity.”
          </h2>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="w-12 h-[1px] bg-[#C8A46A]/40" />
            <span className="font-display tracking-[0.25em] text-xs text-[#8C847A] uppercase">
              H & S ATELIER
            </span>
            <div className="w-12 h-[1px] bg-[#C8A46A]/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
