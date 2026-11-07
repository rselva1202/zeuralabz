import React from 'react';

export const BorderBeamBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#00000000_0%,#10b98144_50%,#00000000_100%)] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-emerald-400">Border Beam Spotlight</span>}</div>
    </div>
  );
};
