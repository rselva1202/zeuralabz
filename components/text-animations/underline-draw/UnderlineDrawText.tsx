import React from 'react';

export const UnderlineDrawText: React.FC<{ text?: string }> = ({ text = "Game Changer" }) => {
  return (
    <span className="relative inline-block font-extrabold text-3xl text-white">
      {text}
      <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
        <path d="M1 5.5C40 2 120 1 199 6" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
};
