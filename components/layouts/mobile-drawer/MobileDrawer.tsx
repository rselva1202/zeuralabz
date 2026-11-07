import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const items = ['Overview', 'Components', 'Themes', 'Templates'];
  return (
    <div>
      <button onClick={() => setOpen(true)} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs">
        ☰ Menu
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 p-6 z-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-white">Navigation</span>
              <button onClick={() => setOpen(false)} className="text-zinc-400">✕</button>
            </div>
            <div className="space-y-3">
              {items.map((it) => (
                <a key={it} href="#" className="block text-zinc-300 hover:text-emerald-400">{it}</a>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
