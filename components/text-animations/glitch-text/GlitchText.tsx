import React from 'react';

export const GlitchText: React.FC<{ text?: string }> = ({ text = "SYSTEM_OVERRIDE" }) => {
  return (
    <div className="relative text-4xl font-mono font-black text-white uppercase group cursor-pointer">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 text-red-500 opacity-70 translate-x-[2px] -translate-y-[1px] pointer-events-none group-hover:animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 text-cyan-400 opacity-70 -translate-x-[2px] translate-y-[1px] pointer-events-none group-hover:animate-pulse">
        {text}
      </span>
    </div>
  );
};
