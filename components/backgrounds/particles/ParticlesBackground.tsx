import React from 'react';

export const ParticlesBackground: React.FC<{ count?: number; children?: React.ReactNode }> = ({ count = 25, children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400/60 animate-ping pointer-events-none"
          style={{ top: `${(i * 17) % 90}%`, left: `${(i * 23) % 90}%`, animationDuration: `${3 + (i % 5)}s` }} />
      ))}
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-400">Particle Network</span>}</div>
    </div>
  );
};
