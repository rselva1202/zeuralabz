import React from 'react';

export interface GlassCardProps {
  title?: string;
  description?: string;
  category?: string;
  badge?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title = "Cloud Sync",
  description = "Instant realtime updates across distributed Edge nodes.",
  category,
  badge
}) => {
  return (
    <div className="w-80 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl mb-4">⚡</div>
      {(category || badge) && (
        <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold mb-1 block">
          {category || badge}
        </span>
      )}
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
