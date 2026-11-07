import React from 'react';

export const CyberHudCard: React.FC<{ title?: string }> = ({ title = "CORE_TELEMETRY" }) => {
  return (
    <div className="relative w-80 p-6 bg-black border border-cyan-500/40 font-mono text-cyan-400">
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
      <div className="text-xs text-zinc-500 mb-2">NODE // 0x48A</div>
      <h4 className="text-lg font-bold text-white tracking-wider">{title}</h4>
      <p className="text-xs text-zinc-400 font-sans mt-2">Active thread synchronization across global points of presence.</p>
    </div>
  );
};
