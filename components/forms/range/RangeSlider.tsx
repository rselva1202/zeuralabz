import React, { useState } from 'react';

export const RangeSlider: React.FC = () => {
  const [val, setVal] = useState(50);
  return (
    <div className="w-80 space-y-2">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>Volume</span>
        <span className="font-mono text-emerald-400 font-bold">{val}%</span>
      </div>
      <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
    </div>
  );
};
