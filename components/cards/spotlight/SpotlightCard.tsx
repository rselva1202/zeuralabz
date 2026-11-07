import React, { useRef, useState } from 'react';

export const SpotlightCard: React.FC<{ title?: string; description?: string }> = ({
  title = "Zero-Knowledge Enclave",
  description = "Hardware-isolated confidential compute environments."
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-80 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(16, 185, 129, 0.15), transparent 60%)`,
        }}
      />
      <div className="relative z-10 space-y-2">
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    </div>
  );
};
