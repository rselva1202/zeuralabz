import React from 'react';

export const GradientButton: React.FC<{ text?: string }> = ({ text = "Get Started" }) => {
  return (
    <button className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all">
      {text}
    </button>
  );
};
