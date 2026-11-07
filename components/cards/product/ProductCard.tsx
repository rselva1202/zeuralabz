import React from 'react';

export const ProductCard: React.FC<{ title?: string; price?: string }> = ({
  title = "Studio Headphones",
  price = "$249"
}) => {
  return (
    <div className="group w-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
      <div className="h-44 bg-zinc-950 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
        🎧
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <span className="text-zinc-400 text-sm">{price}</span>
        </div>
        <button className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-xs">Buy</button>
      </div>
    </div>
  );
};
