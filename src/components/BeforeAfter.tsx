import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative w-full py-28 md:py-44 bg-[#0B0A09] text-[#F2EBDD] overflow-hidden border-t border-[#F2EBDD]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#F2EBDD]/10">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-3 block">
              H &amp; S / PRECISION COMPARISON
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#F2EBDD]">
              ARCHITECTURAL <span className="font-serif italic font-normal text-[#C8A46A]">STUDY</span>
            </h2>
          </div>
          <p className="font-serif italic text-lg text-[#8C847A] mt-2 md:mt-0">
            Slide to reveal the finished taper geometry.
          </p>
        </div>

        {/* Framed Architectural Composition */}
        <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#14110F] border border-[#F2EBDD]/15 shadow-2xl">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchMove={handleTouchMove}
            data-cursor="DRAG"
            className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-[#F2EBDD]/10 select-none cursor-ew-resize touch-none bg-[#0B0A09]"
          >
            {/* AFTER Layer (Full Frame) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1600&auto=format&fit=crop"
                alt="After H&S Precision Cut"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-5 right-5 px-3 py-1 bg-[#0B0A09]/90 text-[10px] font-mono tracking-widest text-[#C8A46A] uppercase font-bold border border-[#C8A46A]/30">
                AFTER
              </div>
            </div>

            {/* BEFORE Layer (Clipped Frame) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="absolute inset-0"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop"
                  alt="Before Grooming"
                  className="w-full h-full object-cover filter brightness-70 contrast-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-5 left-5 px-3 py-1 bg-[#0B0A09]/90 text-[10px] font-mono tracking-widest text-[#8C847A] uppercase border border-[#F2EBDD]/10">
                  BEFORE
                </div>
              </div>
            </div>

            {/* Ultra-Thin Divider & Minimal Drag Ring */}
            <div
              className="absolute top-0 bottom-0 w-[1px] bg-[#C8A46A] shadow-[0_0_10px_rgba(200,164,106,0.6)] pointer-events-none z-30"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B0A09] border border-[#C8A46A] flex items-center justify-center text-[#C8A46A] shadow-md">
                <ChevronsLeftRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-[#8C847A] px-1 tracking-widest uppercase">
            <span>&larr; SLIDE LEFT FOR AFTER</span>
            <span>SLIDE RIGHT FOR BEFORE &rarr;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
