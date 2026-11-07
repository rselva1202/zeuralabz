import React from 'react';

export const RetroGridBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[340px] flex items-center justify-center">
      <div className="absolute inset-0 [background:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:32px_32px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-70" />
      <div className="relative z-10">{children || <span className="font-bold text-xl uppercase tracking-widest text-emerald-400">Horizon Perspective</span>}</div>
    </div>
  );
};
