import React from 'react';

export const GlowingHeadlineText: React.FC<{ text?: string }> = ({ text = "FORGE THE FUTURE" }) => {
  return (
    <div className="relative inline-block">
      <span className="absolute inset-0 blur-lg bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-60 animate-pulse" />
      <h1 className="relative text-5xl font-black text-white tracking-widest">{text}</h1>
    </div>
  );
};
