import React from 'react';

export const VignetteBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-900 text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-bold text-lg">Cinematic Vignette Focus</span>}</div>
    </div>
  );
};
