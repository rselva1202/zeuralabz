import React from 'react';
import { motion } from 'framer-motion';

export const DepthButton: React.FC<{ text?: string }> = ({ text = "Press Me" }) => {
  return (
    <motion.button
      whileTap={{ y: 4 }}
      className="px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 shadow-[0_6px_0_#581c87,0_12px_16px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#581c87,0_4px_8px_rgba(0,0,0,0.3)] transition-all select-none"
    >
      {text}
    </motion.button>
  );
};
