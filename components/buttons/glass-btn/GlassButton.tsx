import React from 'react';
import { motion } from 'framer-motion';

export const GlassButton: React.FC<{ text?: string }> = ({ text = "Frosted Glass" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
      whileTap={{ scale: 0.97 }}
      className="px-7 py-3 rounded-xl font-medium text-white backdrop-blur-md bg-white/5 border border-white/15 shadow-xl transition-colors"
    >
      {text}
    </motion.button>
  );
};
