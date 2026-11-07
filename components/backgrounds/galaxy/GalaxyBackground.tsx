import React from 'react';
import { motion } from 'framer-motion';

export const GalaxyBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#ec4899,#06b6d4,#6366f1)] opacity-20 blur-[100px] pointer-events-none"
      />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-400">Spiral Galaxy Canvas</span>}</div>
    </div>
  );
};
