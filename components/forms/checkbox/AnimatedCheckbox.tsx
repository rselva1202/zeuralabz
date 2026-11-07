import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedCheckbox: React.FC<{ label?: string }> = ({ label = "I agree to terms" }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => setChecked(!checked)}
        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
          checked ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-zinc-700'
        }`}
      >
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </div>
      <span className="text-sm text-zinc-300">{label}</span>
    </label>
  );
};
