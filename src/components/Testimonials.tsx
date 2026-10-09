import React from 'react';
import { testimonialsData } from '../config/testimonials';

/**
 * Infinite-loop testimonials.
 * Row 1: oversized quotes drifting LEFT (filled / outlined alternating).
 * Row 2: compact author cards drifting RIGHT.
 * Hover pauses a row. Respects prefers-reduced-motion.
 * Each track renders the list twice and animates -50%, so the loop is seamless.
 */

const Star: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    aria-hidden
    className={`inline-block text-[#C8A46A] animate-[hsSpin_12s_linear_infinite] ${className}`}
  >
    ✦
  </span>
);

export const Testimonials: React.FC = () => {
  // Duplicate for a seamless -50% translate loop
  const loop = [...testimonialsData, ...testimonialsData];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-32 bg-[linear-gradient(135deg,#F7F0E6_0%,#F4E5C8_45%,#F2EBDD_100%)] text-[#0B0A09] overflow-hidden border-t border-[#0B0A09]/10"
    >
      <style>{`
        @keyframes hsMarqueeLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes hsMarqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes hsSpin { to { transform: rotate(360deg); } }
        @keyframes hsRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .hs-track { display: flex; width: max-content; will-change: transform; }
        .hs-left  { animation: hsMarqueeLeft 70s linear infinite; }
        .hs-right { animation: hsMarqueeRight 55s linear infinite; }
        .hs-row:hover .hs-track { animation-play-state: paused; }
        .hs-outline { -webkit-text-stroke: 1.5px #0B0A09; color: transparent; }
        .hs-card { transition: transform .4s ease, border-color .4s ease, background-color .4s ease; }
        .hs-card:hover { transform: translateY(-6px) rotate(-0.6deg); border-color: #C8A46A; background-color: rgba(200,164,106,0.08); }
        .hs-fade { -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
                   mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        @media (prefers-reduced-motion: reduce) {
          .hs-left, .hs-right { animation-duration: 240s; }
        }
      `}</style>

      {/* Ambient grain */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      {/* Soft cream-gold glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full bg-[#E7C77B]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pb-8 border-b border-[#0B0A09]/10 mb-14">
          <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#C8A46A]">
            H &amp; S / VOICES
          </span>
          <span className="hidden sm:flex items-center gap-3 text-xs font-mono tracking-widest text-[#4E4A46] uppercase">
            <Star className="text-[10px]" /> PATRON TESTIMONIALS <Star className="text-[10px]" />
          </span>
          <span className="sm:hidden text-xs font-mono tracking-widest text-[#4E4A46] uppercase">
            TESTIMONIALS
          </span>
        </div>

        {/* ROW 1 — giant quotes, drifting left */}
        <div className="hs-row hs-fade overflow-hidden py-4">
          <div className="hs-track hs-left items-center">
            {loop.map((t, i) => (
              <div
                key={`q-${t.id}-${i}`}
                className="flex items-center shrink-0"
                data-cursor="PAUSE"
              >
                <div className="flex flex-col gap-4 px-10 md:px-16 max-w-[85vw] md:max-w-[900px]">
                  <span className="font-mono text-xs tracking-[0.35em] text-[#C8A46A]">
                    {t.number} — {t.author}
                  </span>
                  <blockquote
                    className={`font-display font-black uppercase tracking-tight leading-[0.95] whitespace-normal text-4xl sm:text-6xl md:text-7xl ${
                      i % 2 === 0 ? 'text-[#0B0A09]' : 'hs-outline'
                    }`}
                  >
                    “{t.quote}”
                  </blockquote>
                </div>
                <Star className="text-5xl md:text-7xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Divider ribbon */}
        <div className="my-12 flex items-center gap-4 max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8A46A]/60 to-[#C8A46A]/60" />
          <span className="font-serif italic text-[#C8A46A] text-xl">in their words</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C8A46A]/60 to-[#C8A46A]/60" />
        </div>

        {/* ROW 2 — author cards, drifting right */}
        <div className="hs-row hs-fade overflow-hidden py-4">
          <div className="hs-track hs-right gap-6 pl-6">
            {loop.map((t, i) => (
              <article
                key={`c-${t.id}-${i}`}
                data-cursor="READ"
                className="hs-card shrink-0 w-[300px] md:w-[400px] border border-[#0B0A09]/10 p-7 flex flex-col justify-between gap-8 bg-[rgba(255,255,255,0.35)] backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif italic text-6xl leading-none text-[#C8A46A]/40 select-none">
                    “
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#8C847A]">
                    {t.number}
                  </span>
                </div>
                <p className="font-serif text-lg md:text-xl leading-snug text-[#0B0A09]/90 whitespace-normal line-clamp-4">
                  {t.quote}
                </p>
                <div className="pt-5 border-t border-[#0B0A09]/10">
                  <p className="font-serif italic text-xl text-[#C8A46A]">— {t.author}</p>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#4E4A46] mt-1">
                    {t.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-mono tracking-[0.3em] uppercase text-[#4E4A46]">
          Hover to pause
        </p>
      </div>
    </section>
  );
};