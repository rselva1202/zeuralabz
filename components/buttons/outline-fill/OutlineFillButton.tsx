import React from 'react';

export const OutlineFillButton: React.FC<{ text?: string }> = ({ text = "Discover More" }) => {
  return (
    <button className="group relative overflow-hidden rounded-xl px-7 py-3 font-semibold text-emerald-400 border-2 border-emerald-500 transition-colors">
      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-emerald-500 transition-transform duration-300 ease-out" />
      <span className="relative z-10 group-hover:text-black transition-colors">{text}</span>
    </button>
  );
};
