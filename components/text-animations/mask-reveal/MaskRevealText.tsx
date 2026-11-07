import React from 'react';
import { motion } from 'framer-motion';

export const MaskRevealText: React.FC<{ text?: string }> = ({ text = "Architectural Precision" }) => {
  return (
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-extrabold text-white"
      >
        {text}
      </motion.h2>
    </div>
  );
};
