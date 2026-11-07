import React from 'react';

export const TerminalHero: React.FC = () => {
  return (
    <div className="py-20 px-6 bg-black font-mono">
      <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs text-zinc-400 ml-2">bash ~ npx zeuralabz suggest</span>
        </div>
        <div className="p-6 text-sm space-y-2 text-zinc-300">
          <p className="text-emerald-400">$ npx zeuralabz suggest</p>
          <p className="text-zinc-500">Scanning your project...</p>
          <p className="text-cyan-400 font-bold">✔ React + Vite + Tailwind detected. 5 UI upgrades suggested.</p>
        </div>
      </div>
    </div>
  );
};
