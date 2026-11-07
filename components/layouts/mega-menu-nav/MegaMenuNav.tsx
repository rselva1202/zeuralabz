import React, { useState } from 'react';

export const MegaMenuNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block" onMouseLeave={() => setOpen(false)}>
      <button onMouseEnter={() => setOpen(true)} className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-800">
        Products ▾
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl z-50 space-y-2">
          <div className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer">
            <div className="font-bold text-white text-xs">120+ Components</div>
            <p className="text-[11px] text-zinc-400">Copy-paste ready UI</p>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer">
            <div className="font-bold text-white text-xs">AI Project Analyzer</div>
            <p className="text-[11px] text-zinc-400">CLI & MCP server suggestions</p>
          </div>
        </div>
      )}
    </div>
  );
};
