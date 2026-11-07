import React from 'react';

export const MeshGradientBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute w-96 h-96 rounded-full bg-violet-600/30 blur-[100px] top-10 left-10 animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-cyan-500/25 blur-[90px] bottom-10 right-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="relative z-10">{children || <span className="font-bold text-xl">Fluid Mesh Gradient</span>}</div>
    </div>
  );
};
