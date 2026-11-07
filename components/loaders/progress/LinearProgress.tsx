import React from 'react';

export const LinearProgress: React.FC<{ percent?: number }> = ({ percent = 78 }) => {
  return (
    <div className="w-80 space-y-2">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>Processing</span>
        <span className="font-mono text-emerald-400">{percent}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
