import React from 'react';
import { motion } from 'framer-motion';

export const ShimmerButton: React.FC<{ text?: string; onClick?: () => void }> = ({ text = "Get Started", onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative overflow-hidden px-7 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 shadow-lg shadow-emerald-600/30 transition-all group"
    >
      <span className="relative z-10">{text}</span>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12"
      />
    </motion.button>
  );
};
