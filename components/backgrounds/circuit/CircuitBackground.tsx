import React from 'react';

export const CircuitBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-mono text-sm text-emerald-400">Motherboard Traces</span>}</div>
    </div>
  );
};
