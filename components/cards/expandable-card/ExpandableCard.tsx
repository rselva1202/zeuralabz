import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExpandableCard: React.FC<{ title?: string }> = ({ title = "Security Audit Verification" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-80 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 overflow-hidden">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <span className="text-zinc-400 font-mono">{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-3 text-xs text-zinc-400 border-t border-zinc-800 mt-3 leading-relaxed">
            100% formal verification passed with 0 vulnerability warnings detected across edge relays.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
