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

  // Gallery items for the physical wall composition
  const mainItem = galleryData.find((g) => g.role === 'main') || galleryData[0];
  const detailItem = galleryData.find((g) => g.role === 'detail') || galleryData[1];
  const verticalItem = galleryData.find((g) => g.role === 'vertical') || galleryData[2];
  const secondaryItem = galleryData.find((g) => g.role === 'secondary') || galleryData[3];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[#14110F] text-[#F2EBDD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Minimal Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-[#F2EBDD]/10 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
              H &amp; S / ARCHIVE
            </span>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#F2EBDD]">
              SIGNATURE WORK
            </h2>
          </div>

          {/* Minimalist Text Filter */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-widest uppercase">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="FILTER"
                className={`relative py-1 transition-colors ${
                  activeCategory === cat ? 'text-[#C8A46A] font-bold' : 'text-[#8C847A] hover:text-[#F2EBDD]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8A46A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Physical Studio Gallery Wall (Spatial Composition) */}
        <div
          ref={wallRef}
          className="relative min-h-[680px] lg:min-h-[850px] w-full"
          style={{ perspective: '1200px' }}
        >
          {/* 1. Dominant Main Physical Print (~60% width) */}
          <div
            ref={mainPanelRef}
            onClick={() => openBooking()}
            data-cursor="VIEW"
            className="w-full lg:w-[62%] aspect-[16/10] overflow-hidden border border-[#F2EBDD]/15 bg-[#0B0A09] shadow-2xl relative cursor-pointer group z-10 will-change-transform"
          >
            <img
              src={mainItem.image}
              alt={mainItem.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/20 to-transparent opacity-75" />
            <div className="absolute top-5 left-5 text-[10px] font-mono tracking-widest text-[#C8A46A] uppercase bg-[#0B0A09]/85 px-3 py-1">
              /{mainItem.number} &bull; {mainItem.category}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#F2EBDD]">
                {mainItem.title}
              </h3>
              <p className="text-xs font-sans text-[#8C847A] mt-1">{mainItem.tagline}</p>
            </div>
          </div>

          {/* 2. Vertical Photographic Panel (Placed to the right, slightly behind) */}
          <div
            ref={verticalPanelRef}
            onClick={() => openBooking()}
            data-cursor="VIEW"
            className="hidden lg:block absolute top-6 right-0 w-[34%] aspect-[3/4] overflow-hidden border border-[#F2EBDD]/15 bg-[#0B0A09] shadow-2xl cursor-pointer group z-10 will-change-transform"
          >
            <img
              src={verticalItem.image}
              alt={verticalItem.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#8C847A] uppercase bg-[#0B0A09]/85 px-2 py-0.5">
              /{verticalItem.number} &bull; {verticalItem.category}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-display text-lg font-bold uppercase text-[#F2EBDD]">
                {verticalItem.title}
              </h4>
            </div>
          </div>

          {/* 3. Small Detail Panel (Overlapping main image lower edge) */}
          <div
            ref={detailPanelRef}
            onClick={() => openBooking()}
            data-cursor="VIEW"
            className="mt-6 lg:mt-0 lg:absolute lg:bottom-4 lg:left-[42%] w-full lg:w-[32%] aspect-[4/3] overflow-hidden border border-[#C8A46A]/40 bg-[#0B0A09] shadow-2xl cursor-pointer group z-20 will-change-transform"
          >
            <img
              src={detailItem.image}
              alt={detailItem.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-[#C8A46A] uppercase bg-[#0B0A09]/90 px-2 py-0.5">
              /{detailItem.number} &bull; TOOL DETAIL
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-display text-base font-bold uppercase text-[#F2EBDD]">
                {detailItem.title}
              </h4>
            </div>
          </div>

          {/* 4. Secondary Atmosphere Panel (Lower Right) */}
          <div
            ref={secondaryPanelRef}
            onClick={() => openBooking()}
            data-cursor="VIEW"
            className="mt-6 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 w-full lg:w-[28%] aspect-[4/3] overflow-hidden border border-[#F2EBDD]/15 bg-[#0B0A09] shadow-2xl cursor-pointer group z-10 will-change-transform"
          >
            <img
              src={secondaryItem.image}
              alt={secondaryItem.title}
              className="w-full h-full object-cover grayscale contrast-125 brightness-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-display text-sm font-bold uppercase text-[#F2EBDD]">
                {secondaryItem.title}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
