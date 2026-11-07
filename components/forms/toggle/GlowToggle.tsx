import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const GlowToggle: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-16 h-8 rounded-full p-1 transition-all duration-300 ${
        on ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)]' : 'bg-zinc-800'
      }`}
    >
      <motion.div
        animate={{ x: on ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-white shadow-md"
      />
    </button>
  );
};
