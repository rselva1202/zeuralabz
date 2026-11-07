import React from 'react';

export const TestimonialCard: React.FC<{ quote?: string; author?: string; role?: string }> = ({
  quote = "VibeUI cut our landing page development time by 80%. Every component feels alive.",
  author = "Alex Rivera",
  role = "Head of Product @ HyperScale"
}) => {
  return (
    <div className="w-80 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-white space-y-4">
      <div className="text-amber-400 text-sm">★★★★★</div>
      <p className="text-sm text-zinc-300 italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3 pt-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">AR</div>
        <div>
          <div className="text-xs font-bold text-white">{author}</div>
          <div className="text-[11px] text-zinc-500">{role}</div>
        </div>
      </div>
    </div>
  );
};
