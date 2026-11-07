import React from 'react';

export const DriftingMistBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-medium text-zinc-300">Ambient Drifting Mist</span>}</div>
    </div>
  );
};
