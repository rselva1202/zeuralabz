import React from 'react';
import { motion } from 'framer-motion';

export interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '', children }) => {
  return (
    <div className={`relative overflow-hidden bg-black text-white ${className}`}>
      <div className="absolute -inset-[10px] opacity-50 blur-[90px] pointer-events-none">
        <motion.div
          animate={{ rotate: [12, -12, 12], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 transform-gpu"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
