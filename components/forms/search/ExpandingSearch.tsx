import React, { useState } from 'react';

export const ExpandingSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex items-center rounded-full bg-zinc-900 border border-zinc-800 p-1.5 transition-all duration-300 ${open ? 'w-72' : 'w-11'}`}>
      <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white">
        🔍
      </button>
      {open && (
        <input
          autoFocus
          type="text"
          placeholder="Search components..."
          className="bg-transparent text-sm text-white focus:outline-none w-full pr-3 ml-2"
        />
      )}
    </div>
  );
};
