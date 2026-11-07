import React, { useState } from 'react';

export const SpringAccordion: React.FC<{ q?: string; a?: string }> = ({
  q = "How do I install VibeUI?",
  a = "Run npx vibe-ui add <slug> in your project terminal."
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-80 rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-white">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center cursor-pointer">
        <span className="font-bold text-sm">{q}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </div>
      {open && <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-zinc-800 leading-relaxed">{a}</p>}
    </div>
  );
};
