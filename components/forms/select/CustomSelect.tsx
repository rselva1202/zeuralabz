import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('React + Vite');
  const options = ['React + Vite', 'Next.js 15', 'SvelteKit', 'Vue 3'];

  return (
    <div className="relative w-72">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex justify-between items-center text-sm">
        <span>{selected}</span>
        <span>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl z-20">
            {options.map((opt) => (
              <li key={opt} onClick={() => { setSelected(opt); setOpen(false); }} className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer">
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
