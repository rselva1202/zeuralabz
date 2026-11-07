import React from 'react';

export const HexMeshBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-mono text-sm text-cyan-400">Cyber Hexagon Tessellation</span>}</div>
    </div>
  );
};
