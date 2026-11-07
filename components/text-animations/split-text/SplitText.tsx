import React from 'react';
import { motion } from 'framer-motion';

export const SplitText: React.FC<{ text?: string }> = ({ text = "Make Any Website Look Pretty" }) => {
  return (
    <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight flex flex-wrap gap-x-3 gap-y-1">
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: (wordIndex * 5 + charIndex) * 0.03, type: 'spring', stiffness: 140 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};
