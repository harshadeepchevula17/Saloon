import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type MorphTransitionProps = {
  variant?: 'dark-cream' | 'cream-dark';
};

export const MorphTransition: React.FC<MorphTransitionProps> = ({
  variant = 'dark-cream',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !morphRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(morphRef.current, {
        yPercent: 12,
        scaleX: 1.2,
        scaleY: 1.35,
        borderRadius: variant === 'dark-cream'
          ? '36% 64% 52% 48% / 42% 40% 60% 58%'
          : '55% 45% 58% 42% / 48% 60% 40% 52%',
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
  }, [prefersReducedMotion, variant]);

  return (
    <div
      ref={sectionRef}
      className="relative h-24 w-full overflow-hidden bg-transparent md:h-32"
      aria-hidden="true"
    >
      <div
        ref={morphRef}
        className={
          variant === 'dark-cream'
            ? 'absolute left-1/2 top-1/2 h-[220%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[38%_62%_56%_44%/43%_41%_59%_57%] bg-[radial-gradient(circle_at_30%_30%,rgba(200,164,106,0.4),transparent_32%),linear-gradient(135deg,#0B0A09_0%,#1A1613_38%,#F2EBDD_100%)] blur-[2px] opacity-80'
            : 'absolute left-1/2 top-1/2 h-[220%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[58%_42%_46%_54%/52%_60%_40%_48%] bg-[radial-gradient(circle_at_70%_25%,rgba(200,164,106,0.38),transparent_28%),linear-gradient(135deg,#F7F0E6_0%,#F4E5C8_42%,#0B0A09_100%)] blur-[2px] opacity-80'
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2EBDD]/10 to-transparent" />
    </div>
  );
};
