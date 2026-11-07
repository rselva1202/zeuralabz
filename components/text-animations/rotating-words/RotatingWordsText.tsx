import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RotatingWordsText: React.FC = () => {
  const words = ["Simple", "Scalable", "Delightful", "Intelligent"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="text-4xl font-extrabold text-white flex items-center gap-3">
      <span>Design that is</span>
      <div className="relative h-12 w-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 text-cyan-400"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
