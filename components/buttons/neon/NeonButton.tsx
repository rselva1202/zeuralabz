import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton: React.FC<{ text?: string }> = ({ text = "Explore Cyber" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="px-8 py-3.5 rounded-lg font-mono font-bold tracking-wider text-black uppercase bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.7)] hover:shadow-[0_0_35px_rgba(6,182,212,1)] transition-all"
    >
      {text}
    </motion.button>
  );
};
