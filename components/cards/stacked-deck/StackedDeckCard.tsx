import React from 'react';
import { motion } from 'framer-motion';

export const StackedDeckCard: React.FC = () => {
  return (
    <div className="relative w-80 h-56 flex items-center justify-center">
      <motion.div whileHover={{ rotate: -8, x: -15 }} className="absolute w-72 h-40 rounded-2xl bg-zinc-800 border border-zinc-700 p-4 -rotate-3" />
      <motion.div whileHover={{ rotate: 8, x: 15 }} className="absolute w-72 h-40 rounded-2xl bg-zinc-900 border border-zinc-700 p-4 rotate-2" />
      <motion.div whileHover={{ y: -8 }} className="relative z-10 w-72 h-40 rounded-2xl bg-emerald-950 border border-emerald-500/50 p-5 shadow-2xl flex flex-col justify-between">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Active Deck</span>
        <h4 className="text-xl font-bold text-white">Stacked Dimension</h4>
      </motion.div>
    </div>
  );
};
