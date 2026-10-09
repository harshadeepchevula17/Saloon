import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main architectural panel subtle slow movement
      gsap.fromTo(
        mainImageRef.current,
        { yPercent: 0, scale: 1.0 },
        {
          yPercent: -8,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Overlapping detail image panel (closer in Z-space, slightly faster parallax)
      gsap.fromTo(
        detailImageRef.current,
        { yPercent: 10 },
        {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Text subtle independent scroll
      gsap.to(textRef.current, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[linear-gradient(135deg,#F7F0E6_0%,#F3E7C9_42%,#F2EBDD_100%)] text-[#0B0A09] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="lg:col-span-5 order-2 lg:order-1 space-y-7 will-change-transform">
            <div>
              <span className="text-xs font-mono tracking-[0.28em] uppercase text-[#8A6732] mb-3 block">
                WHY WE DO IT
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                <span className="text-[#0B0A09]">MORE THAN</span>
                <span className="block font-serif italic font-normal text-[#8A6732]">A HAIRCUT.</span>
              </h2>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-[#0B0A09]/90 leading-snug">
              It is an experience designed around your identity, your routine, and the way you carry yourself.
            </p>

            <div className="space-y-4 text-sm leading-relaxed text-[#3F3A36]">
              <p>
                At H &amp; S Salon, we believe grooming is part ritual, part craftsmanship, and part confidence-building. Every chair, every blade, and every consultation is shaped to make you feel considered from the moment you walk in.
              </p>
              <p>
                We focus on precision, ease, and atmosphere: soft lighting, tailored consultations, premium finishing, and a sense of calm that lets the artistry speak for itself. The result is not just a sharper look — it is a more complete way to feel.
              </p>
            </div>

          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[500px] sm:min-h-[620px] flex items-center justify-end">
            <div
              ref={mainImageRef}
              className="relative w-[82%] aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#F2EBDD]/15 bg-[#14110F] shadow-2xl will-change-transform z-10"
              data-cursor="VIEW"
            >
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1400&auto=format&fit=crop"
                alt="Luxury barber chair and grooming space"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-70" />
              <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#C8A46A] uppercase bg-[#0B0A09]/80 px-2.5 py-1">
                SPACE // ATELIER SUITE
              </div>
            </div>

            <div
              ref={detailImageRef}
              className="absolute bottom-0 right-0 sm:right-6 w-[42%] aspect-[3/4] overflow-hidden border border-[#C8A46A]/40 bg-[#0B0A09] shadow-2xl will-change-transform z-20"
              data-cursor="VIEW"
            >
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1000&auto=format&fit=crop"
                alt="Barber tools and craftsmanship details"
                className="w-full h-full object-cover grayscale contrast-120 brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[9px] font-mono tracking-[0.24em] uppercase text-[#F2EBDD]">
                TAILORED <span className="text-[#C8A46A]">DETAIL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
