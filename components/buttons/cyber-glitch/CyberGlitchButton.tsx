import React from 'react';

export const CyberGlitchButton: React.FC<{ text?: string }> = ({ text = "INIT_SYSTEM" }) => {
  return (
    <button className="px-8 py-3.5 font-mono font-bold uppercase tracking-widest text-emerald-400 bg-black border-2 border-emerald-400 hover:bg-emerald-400 hover:text-black hover:shadow-[3px_3px_0_#ec4899,-3px_-3px_0_#06b6d4] transition-all">
      {text}
    </button>
  );
};
