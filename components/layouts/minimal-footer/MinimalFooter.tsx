import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <div className="w-full py-4 px-6 bg-black border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-400">All systems operational</span>
      </div>
      <div>Designed with craft by R. Selva.</div>
    </div>
  );
};
