import React from 'react';

export const NoiseBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[280px] flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-300">Film Grain Noise</span>}</div>
    </div>
  );
};
