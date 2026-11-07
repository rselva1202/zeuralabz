import React from 'react';

export const CommandNav: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs">
      <span className="font-bold text-white">ZEURALABZ Studio</span>
      <button className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white">
        <span>Search components...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300">⌘K</kbd>
      </button>
    </div>
  );
};
