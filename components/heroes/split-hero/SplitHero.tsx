import React from 'react';

export const SplitHero: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-white leading-tight">Build interfaces that your users remember.</h1>
        <p className="text-zinc-400">Production-ready, accessible, and customizable components for zeura-coders.</p>
        <button className="px-7 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm">Explore Library</button>
      </div>
      <div className="h-72 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-500">
        // Interactive Canvas Stage
      </div>
    </div>
  );
};
