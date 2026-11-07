import React from 'react';

export const DualRingSpinner: React.FC = () => {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
      <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-cyan-400 animate-[spin_1.5s_linear_infinite_reverse]" />
    </div>
  );
};
