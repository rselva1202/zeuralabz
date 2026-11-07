import React from 'react';

export const CircularRingLoader: React.FC<{ percent?: number }> = ({ percent = 84 }) => {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="56" cy="56" r={radius} stroke="#27272a" strokeWidth={6} fill="transparent" />
        <circle cx="56" cy="56" r={radius} stroke="#10b981" strokeWidth={6} fill="transparent" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute font-mono font-bold text-white text-lg">{percent}%</span>
    </div>
  );
};
