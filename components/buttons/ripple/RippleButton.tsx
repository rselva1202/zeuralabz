import React, { useState } from 'react';

export const RippleButton: React.FC<{ text?: string }> = ({ text = "Click to Ripple" }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  return (
    <button onClick={addRipple} className="relative overflow-hidden px-8 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl">
      {text}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/40 animate-ping pointer-events-none" style={{ top: r.y - 15, left: r.x - 15, width: 30, height: 30 }} />
      ))}
    </button>
  );
};
