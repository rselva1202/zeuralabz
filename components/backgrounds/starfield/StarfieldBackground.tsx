import React from 'react';

export const StarfieldBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[320px] flex items-center justify-center">
      {[...Array(30)].map((_, i) => (
        <span key={i} className="absolute w-1 h-1 bg-white rounded-full animate-ping pointer-events-none"
          style={{ top: `${(i * 13) % 95}%`, left: `${(i * 19) % 95}%`, animationDuration: `${2 + (i % 4)}s` }} />
      ))}
      <div className="relative z-10">{children || <span className="text-sm font-semibold tracking-wide">Deep Space Starfield</span>}</div>
    </div>
  );
};
