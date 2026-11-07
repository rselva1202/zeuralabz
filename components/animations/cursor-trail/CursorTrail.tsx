import React, { useState } from 'react';

export const CursorTrail: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative w-80 h-48 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center cursor-none"
    >
      <div className="pointer-events-none absolute w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-500/20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-lg" style={{ left: pos.x, top: pos.y }} />
      <span className="text-zinc-500 text-xs font-mono">Move mouse inside canvas</span>
    </div>
  );
};
