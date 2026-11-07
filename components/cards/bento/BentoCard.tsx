import React from 'react';

export const BentoCard: React.FC<{ title?: string; description?: string; badge?: string }> = ({
  title = "Universal Sync",
  description = "Auto-replicates database state across 32 geographic edge clusters.",
  badge = "Feature 01"
}) => {
  return (
    <div className="p-7 rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">{badge}</span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <div className="h-28 rounded-xl bg-zinc-900 border border-zinc-800/60 flex items-center justify-center text-xs font-mono text-zinc-500">
        // Realtime Edge Telemetry
      </div>
    </div>
  );
};
