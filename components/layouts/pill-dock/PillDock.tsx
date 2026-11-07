import React, { useState } from 'react';

export const PillDock: React.FC = () => {
  const [active, setActive] = useState(0);
  const items = ['All', 'React', 'HTML', 'Tailwind'];
  return (
    <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
      {items.map((it, idx) => (
        <button
          key={it}
          onClick={() => setActive(idx)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
            active === idx ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {it}
        </button>
      ))}
    </div>
  );
};
