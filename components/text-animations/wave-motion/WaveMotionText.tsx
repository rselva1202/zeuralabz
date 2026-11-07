import React from 'react';
import { motion } from 'framer-motion';

export const WaveMotionText: React.FC<{ text?: string }> = ({ text = "Interactive Waves" }) => {
  return (
    <div className="flex gap-1 text-3xl font-black text-white cursor-pointer">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ y: -10, color: '#10b981' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};
