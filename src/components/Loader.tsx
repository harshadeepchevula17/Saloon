import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('#site-loader', {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    })
    .to('#loader-brand', {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      id="site-loader"
      className="fixed inset-0 z-[10000] bg-[#0B0A09] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div id="loader-brand" className="flex flex-col items-center select-none">
        <h1 className="font-display text-6xl md:text-8xl font-black tracking-tight text-[#F2EBDD] flex items-center gap-3">
          <span>H</span>
          <span className="text-[#C8A46A] text-4xl md:text-6xl font-serif italic">&</span>
          <span>S</span>
        </h1>
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-sans text-[#8C847A] mt-2">
          SALON
        </p>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-[2px] bg-[#1A1613] mt-8 relative overflow-hidden rounded-full">
          <div
            className="h-full bg-[#C8A46A] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(200,164,106,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] tracking-widest font-mono text-[#8C847A] mt-3">
          {progress}%
        </span>
      </div>
    </div>
  );
};
