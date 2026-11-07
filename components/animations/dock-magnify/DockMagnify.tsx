import React from 'react';

export const DockMagnify: React.FC = () => {
  return (
    <div className="inline-flex gap-3 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
      {['🏠', '🧩', '🎨', '⚙️'].map((icon, i) => (
        <button key={i} className="w-10 h-10 rounded-xl bg-zinc-800 hover:scale-125 transition-transform flex items-center justify-center text-lg">
          {icon}
        </button>
      ))}
    </div>
  );
};
