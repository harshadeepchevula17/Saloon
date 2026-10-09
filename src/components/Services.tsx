import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock3, Sparkles } from 'lucide-react';
import { servicesData } from '../config/services';
import { useBooking } from '../context/BookingContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();
  const quickAddons = [
    'Nose Wax',
    'Brow Detail',
    'Beard Trim',
    'Hot Towel',
    'Scalp Massage',
    'Styling Finish',
  ];

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[linear-gradient(135deg,#F7F0E6_0%,#F5EACC_45%,#F2EBDD_100%)] text-[#0B0A09] overflow-hidden py-28 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,164,106,0.09),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.35em] uppercase text-[#8A6732] block mb-4">
            // 01 &bull; THE MENU
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[88px] font-black uppercase tracking-[-0.04em] leading-[0.9] text-[#0B0A09]">
            Precision without <span className="font-serif italic font-normal text-[#8A6732] not-italic">excess</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm md:text-base text-[#3F3A36] leading-relaxed">
            Tailored grooming built around silhouette, texture, and your daily rhythm from the first consultation to the final detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <article
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden border border-[#F2EBDD]/10 bg-[#14110F] transition-all duration-500 hover:-translate-y-1 hover:border-[#C8A46A]/50"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.bgTexture}
                  alt={service.name}
                  className="h-full w-full object-cover grayscale contrast-[1.08] brightness-[0.7] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/25 to-transparent" />
                <div className="absolute left-4 top-4 text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#C8A46A] uppercase">
                  {service.number}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#F2EBDD]/75">
                      Signature service
                    </p>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl font-black uppercase tracking-[-0.04em] text-[#F2EBDD] leading-none">
                      {service.name}
                    </h3>
                  </div>
                  <div className="rounded-full border border-[#C8A46A]/40 bg-[#0B0A09]/60 p-2.5 text-[#F2EBDD] group-hover:border-[#C8A46A] transition-colors">
                    <ArrowUpRight className="h-4 w-4 text-[#C8A46A]" />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#F2EBDD]/10 pb-4">
                  <div className="flex items-center gap-2 text-[#F2EBDD]/90">
                    <Clock3 className="h-3.5 w-3.5 text-[#C8A46A]" />
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.22em] uppercase">
                      {service.duration}
                    </span>
                  </div>
                  <span className="font-display text-xl md:text-2xl font-bold text-[#C8A46A]">
                    {service.startingPrice}
                  </span>
                </div>

                <p className="text-sm md:text-[15px] leading-relaxed text-[#8C847A] min-h-[96px]">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#F2EBDD]/10 pt-4">
                  <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-[0.22em] uppercase text-[#F2EBDD]/80">
                    <Sparkles className="h-3.5 w-3.5 text-[#C8A46A]" />
                    Bespoke finish
                  </span>

                  <button
                    type="button"
                    onClick={() => openBooking(undefined, service.name)}
                    className="text-[10px] md:text-xs font-mono tracking-[0.22em] uppercase text-[#C8A46A] transition-colors hover:text-[#F2EBDD]"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 w-full rounded-none border border-[#F2EBDD]/10 bg-[#14110F] px-6 py-7 md:px-8 md:py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A]">
                QUICK ADD-ONS
              </span>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.04em] text-[#F2EBDD]">
                Finish stronger
              </h3>
            </div>
            <p className="max-w-xl text-sm text-[#8C847A] leading-relaxed">
              Personalize the appointment with a refined detail layer that sharpens your cut, beard, or facial balance.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {quickAddons.map((addon) => (
              <span
                key={addon}
                className="border border-[#F2EBDD]/10 bg-[#0B0A09] px-4 py-2.5 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-[#F2EBDD]/80"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};