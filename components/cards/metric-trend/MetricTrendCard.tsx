import React from 'react';

export const MetricTrendCard: React.FC<{ label?: string; value?: string; change?: string }> = ({
  label = "Monthly Active Users",
  value = "482,910",
  change = "+28.4%"
}) => {
  return (
    <div className="w-80 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-xl">
      <div className="flex items-center justify-between text-zinc-400 text-xs mb-3">
        <span>{label}</span>
        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{change}</span>
      </div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-4 flex items-end gap-1.5 h-8">
        {[40, 60, 50, 75, 65, 90, 85, 100].map((h, i) => (
          <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 rounded-t transition-colors" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
};
