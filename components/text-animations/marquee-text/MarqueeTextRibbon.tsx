import React from 'react';

export const MarqueeTextRibbon: React.FC<{ words?: string[] }> = ({ words = ["VIBE", "TAILWIND", "REACT", "FRAMER", "GSAP"] }) => {
  return (
    <div className="w-full overflow-hidden bg-zinc-950 py-3 border-y border-zinc-900">
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-sm font-bold text-zinc-400 tracking-widest">
        {words.concat(words).map((w, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{w}</span>
            <span className="text-emerald-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
