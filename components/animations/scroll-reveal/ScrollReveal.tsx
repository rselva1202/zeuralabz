import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children || <div className="p-6 bg-zinc-900 rounded-xl text-white">Scroll Revealed Card</div>}
    </motion.div>
  );
};
