import React from 'react';

export const IconMorphButton: React.FC<{ label?: string }> = ({ label = "Star on GitHub" }) => {
  return (
    <button className="group flex items-center gap-2 overflow-hidden px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-all duration-300">
      <span className="text-amber-400 group-hover:rotate-12 transition-transform">★</span>
      <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-medium">
        {label}
      </span>
    </button>
  );
};
