import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { barbersData } from '../config/barbers';
import { useBooking } from '../context/BookingContext';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Barbers: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollWidth = panelsRef.current?.scrollWidth || 0;
      const clientWidth = panelsRef.current?.clientWidth || 0;
      const amountToScroll = scrollWidth - clientWidth + 80;

      if (amountToScroll > 0) {
        gsap.to(panelsRef.current, {
          x: -amountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${amountToScroll * 1.2}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="barbers" ref={sectionRef} className="relative bg-[#0B0A09] text-[#F2EBDD] overflow-hidden border-t border-[#F2EBDD]/10">
      <div ref={triggerRef} className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center py-28 lg:py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
            // 04 &bull; MASTER ARTISANS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#F2EBDD]/10">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#F2EBDD]">
              MEET THE HANDS <br className="hidden sm:inline" />
              <span className="text-[#C8A46A] font-serif italic font-normal">BEHIND THE CRAFT</span>
            </h2>
            <p className="text-xs font-mono text-[#8C847A] tracking-widest uppercase">
              HONED BY DISCIPLINE &bull; DEFINED BY PRECISION
            </p>
          </div>
        </div>

        {/* Large Magazine-Profile Panels */}
        <div className="w-full px-6 md:px-12">
          <div
            ref={panelsRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:w-max overflow-visible"
          >
            {barbersData.map((barber) => (
              <div
                key={barber.id}
                onClick={() => openBooking(undefined, barber.name)}
                data-cursor="BOOK"
                className="w-full lg:w-[480px] shrink-0 bg-[#14110F] border border-[#F2EBDD]/10 hover:border-[#C8A46A]/50 transition-colors duration-500 overflow-hidden cursor-pointer group flex flex-col"
              >
                {/* Large Portrait Image */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[#0B0A09]">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent opacity-80" />

                  {/* Number & Experience */}
                  <div className="absolute top-5 left-5 text-[11px] font-mono text-[#C8A46A] tracking-widest">
                    /{barber.number}
                  </div>
                  <div className="absolute top-5 right-5 text-[10px] font-mono tracking-widest text-[#8C847A] uppercase bg-[#0B0A09]/80 px-2.5 py-1">
                    {barber.experience}
                  </div>

                  {/* Name & Title */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[10px] font-mono tracking-widest text-[#C8A46A] uppercase block">
                      {barber.title}
                    </span>
                    <h3 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#F2EBDD]">
                      {barber.name}
                    </h3>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#8C847A] uppercase tracking-wider block mb-2">
                      SPECIALTY: <span className="text-[#F2EBDD]">{barber.specialty}</span>
                    </span>
                    <p className="font-serif italic text-base text-[#8C847A] group-hover:text-[#F2EBDD]/90 transition-colors leading-relaxed">
                      “{barber.philosophy}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EBDD]/10 flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-[#C8A46A] uppercase">
                      RESERVE CHAIR WITH {barber.name}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#F2EBDD]/20 group-hover:border-[#C8A46A] group-hover:bg-[#C8A46A] flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#F2EBDD] group-hover:text-[#0B0A09]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
