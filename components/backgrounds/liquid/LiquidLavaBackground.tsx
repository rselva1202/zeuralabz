import React from 'react';
import { motion } from 'framer-motion';

export const LiquidLavaBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
      />
      <div className="relative z-10">{children || <span className="font-bold text-lg">Liquid Lava Shapes</span>}</div>
    </div>
  );
};
