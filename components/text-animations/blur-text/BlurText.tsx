import React from 'react';
import { motion } from 'framer-motion';

export const BlurText: React.FC<{ text?: string }> = ({ text = "Focus on craft and velocity" }) => {
  return (
    <p className="text-3xl font-semibold text-white flex flex-wrap gap-2">
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};
