import React from 'react';

export const SplitScreenLayout: React.FC<{ left?: React.ReactNode; right?: React.ReactNode }> = ({ left, right }) => {
  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-black text-white">
      <div className="p-8 flex items-center justify-center">{left}</div>
      <div className="p-8 flex items-center justify-center bg-zinc-950 border-l border-zinc-900">{right}</div>
    </div>
  );
};
