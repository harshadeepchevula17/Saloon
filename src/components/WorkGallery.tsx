import React, { useState, useEffect, useRef } from 'react';
import { galleryData, galleryCategories } from '../config/gallery';
import { useBooking } from '../context/BookingContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const WorkGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const verticalPanelRef = useRef<HTMLDivElement>(null);
  const secondaryPanelRef = useRef<HTMLDivElement>(null);

  const { openBooking } = useBooking();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Spatial camera scroll across the gallery wall
      gsap.fromTo(
        mainPanelRef.current,
        { yPercent: 0, scale: 1.0 },
        {
          yPercent: -6,
          scale: 1.02,
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
        detailPanelRef.current,
        { yPercent: 8 },
        {
          yPercent: -16,
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
        verticalPanelRef.current,
        { yPercent: -4 },
        {
          yPercent: -12,
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
        secondaryPanelRef.current,
        { yPercent: 12 },
        {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const visibleGallery = activeCategory === 'ALL'
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  const [mainItem, secondaryItem, verticalItem, detailItem] = [
    ...visibleGallery,
    ...galleryData,
  ].slice(0, 4);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[#14110F] text-[#F2EBDD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-[#F2EBDD]/10 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
              H &amp; S / ARCHIVE
            </span>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#F2EBDD]">
              SIGNATURE WORK
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[10px] font-mono tracking-[0.25em] uppercase">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="FILTER"
                className={`relative py-1 transition-all duration-300 ${
                  activeCategory === cat ? 'text-[#C8A46A]' : 'text-[#8C847A] hover:text-[#F2EBDD]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#C8A46A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={wallRef}
          className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6"
          style={{ perspective: '1200px' }}
        >
          <div
            ref={mainPanelRef}
            onClick={() => openBooking()}
            data-cursor="VIEW"
            className="group relative overflow-hidden border border-[#F2EBDD]/10 bg-[#0B0A09] min-h-[500px] lg:min-h-[720px] cursor-pointer"
          >
            <img
              src={mainItem.image}
              alt={mainItem.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/25 to-transparent" />
            <div className="absolute top-5 left-5 text-[10px] font-mono tracking-[0.35em] uppercase text-[#C8A46A]">
              /{mainItem.number} • {mainItem.category}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-mono tracking-[0.28em] uppercase text-[#F2EBDD]/70 mb-3">
                Bespoke cut • Master finish
              </p>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-none text-[#F2EBDD]">
                {mainItem.title}
              </h3>
              <p className="mt-3 max-w-md text-sm text-[#D7D0C5]">{mainItem.tagline}</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div
              ref={verticalPanelRef}
              onClick={() => openBooking()}
              data-cursor="VIEW"
              className="group relative overflow-hidden border border-[#F2EBDD]/10 bg-[#0B0A09] min-h-[260px] lg:min-h-[340px] cursor-pointer"
            >
              <img
                src={verticalItem.image}
                alt={verticalItem.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-[#0B0A09]/10" />
              <div className="absolute top-4 left-4 text-[9px] font-mono tracking-[0.28em] uppercase text-[#C8A46A]">
                /{verticalItem.number}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-display text-xl uppercase text-[#F2EBDD]">{verticalItem.title}</h4>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div
                ref={detailPanelRef}
                onClick={() => openBooking()}
                data-cursor="VIEW"
                className="group relative overflow-hidden border border-[#C8A46A]/30 bg-[#0B0A09] min-h-[220px] cursor-pointer"
              >
                <img
                  src={detailItem.image}
                  alt={detailItem.title}
                  className="w-full h-full object-cover grayscale contrast-120 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#C8A46A]">DETAIL</p>
                  <h4 className="font-display text-lg uppercase text-[#F2EBDD] mt-2">{detailItem.title}</h4>
                </div>
              </div>

              <div
                ref={secondaryPanelRef}
                onClick={() => openBooking()}
                data-cursor="VIEW"
                className="group relative overflow-hidden border border-[#F2EBDD]/10 bg-[#0B0A09] min-h-[220px] cursor-pointer"
              >
                <img
                  src={secondaryItem.image}
                  alt={secondaryItem.title}
                  className="w-full h-full object-cover grayscale contrast-120 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#C8A46A]">STUDIO</p>
                  <h4 className="font-display text-lg uppercase text-[#F2EBDD] mt-2">{secondaryItem.title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
