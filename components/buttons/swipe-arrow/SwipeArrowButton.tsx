import React from 'react';

export const SwipeArrowButton: React.FC<{ text?: string }> = ({ text = "Continue" }) => {
  return (
    <button className="group flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/30">
      <span>{text}</span>
      <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
    </button>
  );
};
