import React from 'react';

export const DotGridBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">16px Dot Matrix</span>}</div>
    </div>
  );
};
