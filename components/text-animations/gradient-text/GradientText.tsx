import React from 'react';

export const GradientText: React.FC<{ text?: string }> = ({ text = "Supercharged by AI" }) => {
  return (
    <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
      {text}
    </h2>
  );
};
