import React from 'react';

export const FlipCard: React.FC = () => {
  return (
    <div className="group w-72 h-80 [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between [backface-visibility:hidden]">
          <span className="text-xs text-emerald-400 font-mono">FRONT</span>
          <h4 className="text-xl font-bold text-white">Hover to Flip</h4>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-emerald-950 border border-emerald-500 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <span className="text-xs text-emerald-300 font-mono">BACK</span>
          <p className="text-xs text-zinc-300">Detailed backend configurations revealed on flip side.</p>
        </div>
      </div>
    </div>
  );
};
