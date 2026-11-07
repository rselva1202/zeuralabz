import React from 'react';

export const HoverGlowCard: React.FC<{ title?: string }> = ({ title = "Accelerated Analytics" }) => {
  return (
    <div className="relative p-[1px] rounded-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 opacity-30 group-hover:opacity-100 transition-opacity blur-sm" />
      <div className="relative p-6 rounded-2xl bg-zinc-950 space-y-3 text-white">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">Instant machine learning insights across raw log streams.</p>
      </div>
    </div>
  );
};
