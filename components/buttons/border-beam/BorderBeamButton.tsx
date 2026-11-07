import React from 'react';

export const BorderBeamButton: React.FC<{ text?: string }> = ({ text = "Join ZEURALABZ" }) => {
  return (
    <div className="relative inline-flex overflow-hidden rounded-xl p-[2px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ec4899_0%,#3b82f6_50%,#10b981_100%)]" />
      <button className="relative rounded-[10px] bg-zinc-950 px-7 py-3 text-sm font-semibold text-white hover:bg-zinc-900 transition-colors">
        {text}
      </button>
    </div>
  );
};
