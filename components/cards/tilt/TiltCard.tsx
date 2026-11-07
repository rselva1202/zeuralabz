import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "Neural Accelerator",
  subtitle = "Next-gen deep learning accelerator"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-80 h-96 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 border border-zinc-800 shadow-2xl flex flex-col justify-between"
    >
      <div style={{ transform: "translateZ(40px)" }} className="space-y-3">
        <span className="inline-block p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold uppercase">AI Model</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div style={{ transform: "translateZ(20px)" }}>
        <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-sm">Deploy Model</button>
      </div>
    </motion.div>
  );
};
