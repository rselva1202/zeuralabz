import React from 'react';

export const ParallaxBox: React.FC = () => {
  return (
    <div className="w-80 h-44 rounded-2xl bg-gradient-to-br from-indigo-950 to-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between text-white">
      <span className="text-xs font-mono text-indigo-400">PARALLAX LAYER</span>
      <h4 className="text-lg font-bold">Smooth Viewport Physics</h4>
    </div>
  );
};
