import React from 'react';

export const BouncingDots: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce" />
    </div>
  );
};
