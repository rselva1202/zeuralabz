import React from 'react';

export const NeonWavesBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-semibold text-lg text-rose-400">Sinusoidal Neon Waves</span>}</div>
    </div>
  );
};
