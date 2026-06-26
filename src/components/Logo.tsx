import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Compute sizes
  const sizes = {
    sm: {
      container: 'p-2',
      letters: 'text-2xl',
      divider: 'h-6 w-[2px]',
      text: 'text-[6px] tracking-widest',
      box: 'w-24 h-24',
    },
    md: {
      container: 'p-4',
      letters: 'text-4xl md:text-5xl',
      divider: 'h-10 md:h-12 w-[2px]',
      text: 'text-[10px] md:text-[11px] tracking-widest',
      box: 'w-44 h-44',
    },
    lg: {
      container: 'p-6',
      letters: 'text-6xl md:text-7xl',
      divider: 'h-16 md:h-20 w-[3px]',
      text: 'text-[12px] md:text-[14px] tracking-[0.2em]',
      box: 'w-64 h-64',
    },
  };

  const selectedSize = sizes[size];

  return (
    <div
      id="logo-dept"
      className={`bg-[#0052cc] text-white flex flex-col items-center justify-center rounded-xl shadow-lg border border-blue-500/20 aspect-square select-none ${selectedSize.box} ${className}`}
    >
      {/* Letters Block */}
      <div className="flex items-center justify-center gap-1 font-serif font-semibold">
        <span className={`${selectedSize.letters} tracking-tight leading-none text-white`}>C</span>
        <div className={`${selectedSize.divider} bg-white opacity-90 mx-1`} />
        <span className={`${selectedSize.letters} tracking-tight leading-none text-white`}>M</span>
      </div>
      
      {/* Subtitle text */}
      <div className={`mt-2 font-sans font-bold text-center text-white/95 uppercase ${selectedSize.text}`}>
        COMERÇ I MÀRQUETING - ViB
      </div>
    </div>
  );
}
