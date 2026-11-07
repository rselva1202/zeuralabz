import React from 'react';

export const FeatureIconCard: React.FC<{ icon?: string; title?: string }> = ({
  icon = "⚡",
  title = "Instant Code Injection"
}) => {
  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 transition-colors space-y-3">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">{icon}</div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="text-xs text-zinc-400 leading-relaxed">Copy-paste production React, pure HTML and Tailwind code instantly.</p>
    </div>
  );
};
