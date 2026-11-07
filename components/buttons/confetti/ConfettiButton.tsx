import React from 'react';
import confetti from 'canvas-confetti';

export const ConfettiButton: React.FC<{ text?: string }> = ({ text = "Celebrate 🎉" }) => {
  const fire = () => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  return (
    <button onClick={fire} className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:scale-105 active:scale-95 transition-all shadow-xl">
      {text}
    </button>
  );
};
