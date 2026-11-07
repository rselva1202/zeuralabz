import React from 'react';

export const ShimmerWave: React.FC = () => {
  return (
    <div className="relative w-72 h-20 rounded-xl bg-zinc-900 overflow-hidden flex items-center justify-center border border-zinc-800 text-white font-bold text-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <span>Shimmering Glint</span>
    </div>
  );
};
