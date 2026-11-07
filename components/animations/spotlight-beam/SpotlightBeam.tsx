import React, { useState } from 'react';

export const SpotlightBeam: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-80 h-40 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex items-center justify-center text-white"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.2), transparent)` }} />
      <span className="relative z-10 text-xs text-zinc-400">Hover for Spotlight</span>
    </div>
  );
};
