import React, { useState } from 'react';
import { testimonialsData } from '../config/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-32 bg-[#0B0A09] text-[#F2EBDD] overflow-hidden border-t border-[#F2EBDD]/10"
    >
      {/* Quiet Ambient Salon Texture in Background */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Minimal Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#F2EBDD]/10 mb-16">
          <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#C8A46A]">
            H &amp; S / VOICES
          </span>
          <span className="text-xs font-mono tracking-widest text-[#8C847A] uppercase">
            PATRON TESTIMONIALS
          </span>
        </div>

        {/* Compact Editorial Composition (Height ~400-500px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px]">
          {/* Left: Large Architectural Quote Mark */}
          <div className="lg:col-span-2 hidden lg:block">
            <span className="font-serif italic text-8xl text-[#C8A46A]/30 leading-none select-none">
              “
            </span>
          </div>

          {/* Center: Large Testimonial Quote with Crossfade */}
          <div className="lg:col-span-7">
            <div
              key={currentTestimonial.id}
              className="animate-fadeIn transition-opacity duration-500"
            >
              <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F2EBDD] leading-[0.95]">
                “{currentTestimonial.quote}”
              </blockquote>
            </div>
          </div>

          {/* Right: Author & Number Selector */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8 lg:border-l lg:border-[#F2EBDD]/10 lg:pl-8">
            <div key={`author-${currentTestimonial.id}`} className="animate-fadeIn">
              <p className="font-serif italic text-2xl text-[#C8A46A]">
                — {currentTestimonial.author}
              </p>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C847A] mt-1">
                {currentTestimonial.role}
              </p>
            </div>

            {/* Compact Number Navigation (01 02 03 04 05 06) */}
            <div>
              <span className="text-[10px] font-mono text-[#8C847A] tracking-widest uppercase block mb-2">
                SELECT TESTIMONIAL
              </span>
              <div className="flex items-center gap-3">
                {testimonialsData.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    data-cursor="SELECT"
                    className={`font-mono text-xs tracking-wider transition-colors py-1 ${
                      currentIndex === idx
                        ? 'text-[#C8A46A] font-bold border-b border-[#C8A46A]'
                        : 'text-[#8C847A] hover:text-[#F2EBDD]'
                    }`}
                  >
                    {item.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
