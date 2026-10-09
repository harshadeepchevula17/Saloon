import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const CraftSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openBooking } = useBooking();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: 0, scale: 1 },
        {
          yPercent: -8,
          scale: 1.04,
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
        textRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const services = [
    'Haircut',
    'Beard sculpting',
    'Facial care',
    'Nose & brow',
    'Styling',
    'Premium grooming',
  ];

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#0B0A09] text-[#F2EBDD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="lg:col-span-5 space-y-8 will-change-transform">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
                SIGNATURE EXPERIENCE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#F2EBDD]">
                OUR <span className="block font-serif italic font-normal text-[#C8A46A]">RITUAL</span>
              </h2>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-[#F2EBDD]/90 leading-snug">
              More than a haircut — a complete grooming ritual shaped around your features, routine, and confidence.
            </p>

            <div className="space-y-4 text-sm leading-relaxed text-[#8C847A]">
              <p>
                From precision cuts and beard detailing to facial care, brow work, and finish styling, each service is designed to refine the way you look and feel.
              </p>
              <p>
                We keep the experience elevated, personal, and professional — every appointment is precise, reassuring, and tailored to your signature look.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {services.map((item) => (
                <div
                  key={item}
                  className="border border-[#F2EBDD]/10 bg-[#14110F] px-3 py-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[#F2EBDD]/80"
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => openBooking()}
              data-cursor="BOOK"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-mono font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            >
              <span>BOOK A SESSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[620px] flex items-center justify-end">
            <div
              ref={imageRef}
              className="relative w-[90%] aspect-[4/5] overflow-hidden border border-[#F2EBDD]/15 bg-[#14110F] shadow-2xl will-change-transform"
              data-cursor="VIEW"
            >
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1400&auto=format&fit=crop"
                alt="Barber and client during premium grooming service"
                className="w-full h-full object-cover grayscale contrast-120 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]/30" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border border-[#F2EBDD]/10 bg-[#0B0A09]/60 backdrop-blur-sm px-4 py-3">
                <div>
                  <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#C8A46A]">
                    MAINTENANCE
                  </div>
                  <div className="mt-1 text-lg font-display uppercase text-[#F2EBDD]">TAILORED CARE</div>
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C847A]">
                  45-75 MIN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
