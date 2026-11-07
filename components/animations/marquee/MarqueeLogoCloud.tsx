import React from 'react';

export const MarqueeLogoCloud: React.FC = () => {
  const logos = ['⚡ VERCEL', '🌐 NEXT.JS', '🎨 TAILWIND', '🍃 MONGODB', '🚀 VITE'];
  return (
    <div className="w-full max-w-lg overflow-hidden py-4 bg-zinc-950 border-y border-zinc-900">
      <div className="flex gap-10 whitespace-nowrap animate-marquee font-bold text-zinc-400 text-sm">
        {logos.concat(logos).map((l, i) => (
          <span key={i} className="hover:text-emerald-400 transition-colors cursor-pointer">{l}</span>
        ))}
      </div>
    </div>
  );
};
