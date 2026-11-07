import React from 'react';
import { motion } from 'framer-motion';

export const StaggerFade: React.FC<{ items?: string[] }> = ({ items = ['Speed', 'Reliability', 'Aesthetics'] }) => {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-3 bg-zinc-900 rounded-xl text-white text-xs">
          {item}
        </motion.div>
      ))}
    </div>
  );
};
