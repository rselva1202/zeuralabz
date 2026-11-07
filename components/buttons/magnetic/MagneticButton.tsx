import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MagneticButton: React.FC<{ text?: string }> = ({ text = "Magnetic Pull" }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="px-8 py-4 rounded-full font-medium bg-zinc-900 border border-zinc-700 text-white hover:border-emerald-500 shadow-xl"
    >
      {text}
    </motion.button>
  );
};
