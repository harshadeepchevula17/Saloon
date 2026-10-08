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
      className="relative w-full py-28 md:py-44 bg-[#0B0A09] text-[#F2EBDD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Overlapping Architectural Studio Image Composition */}
          <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[540px] flex items-center">
            {/* Main Interior Image (Chair + Mirror + Lighting) */}
            <div
              ref={mainImageRef}
              className="relative w-[82%] aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#F2EBDD]/15 bg-[#14110F] shadow-2xl will-change-transform z-10"
              data-cursor="VIEW"
            >
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1400&auto=format&fit=crop"
                alt="H & S Atelier Chair and Mirror Station"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#C8A46A] uppercase bg-[#0B0A09]/80 px-2.5 py-1">
                SPACE // ATELIER SUITE
              </div>
            </div>

            {/* Secondary Detail Image (Scissors / Steel / Dark Wood Close-Up) */}
            <div
              ref={detailImageRef}
              className="absolute -bottom-8 right-0 sm:right-4 w-[48%] aspect-[4/3] overflow-hidden border border-[#C8A46A]/40 bg-[#0B0A09] shadow-2xl will-change-transform z-20"
              data-cursor="VIEW"
            >
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1000&auto=format&fit=crop"
                alt="Forged Japanese Steel Shears"
                className="w-full h-full object-cover grayscale contrast-125 brightness-85"
              />
              <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest text-[#8C847A] uppercase bg-[#0B0A09]/90 px-2 py-0.5">
                DETAILS MATTER
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative Content */}
          <div ref={textRef} className="lg:col-span-5 space-y-8 will-change-transform">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
                H &amp; S / ARCHITECTURE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#F2EBDD] leading-[0.92]">
                MORE THAN <br />
                <span className="font-serif italic font-normal text-[#C8A46A]">A HAIRCUT.</span>
              </h2>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-[#F2EBDD]/90 leading-snug">
              “A space designed around precision, comfort, and personal style.”
            </p>

            <div className="space-y-4 text-xs sm:text-sm font-sans text-[#8C847A] leading-relaxed">
              <p>
                Every angle of H &amp; S Salon is intentional—from custom black leather chairs and acoustics calibrated for private conversations, to shadow-free mirrors and precision warm tungsten lighting.
              </p>
              <p>
                We honor the timeless heritage of artisan barbering while embracing architectural purity. No loud distractions, no rushed appointments. Only bespoke craftsmanship crafted for your signature.
              </p>
            </div>

            {/* Material & Craft Highlights */}
            <div className="pt-6 border-t border-[#F2EBDD]/10 grid grid-cols-2 gap-6">
              <div>
                <span className="text-[10px] font-mono text-[#C8A46A] uppercase tracking-wider block">
                  ENVIRONMENT
                </span>
                <p className="font-display text-base font-bold uppercase text-[#F2EBDD] mt-1">
                  Private Workstations
                </p>
                <p className="text-[11px] text-[#8C847A] mt-0.5">Calibrated acoustic luxury.</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C8A46A] uppercase tracking-wider block">
                  STANDARDS
                </span>
                <p className="font-display text-base font-bold uppercase text-[#F2EBDD] mt-1">
                  Hand-Honed Steel
                </p>
                <p className="text-[11px] text-[#8C847A] mt-0.5">Micro-taper edge accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
