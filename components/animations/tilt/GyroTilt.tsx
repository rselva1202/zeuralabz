import React, { useState } from 'react';

export const GyroTilt: React.FC = () => {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setRot({ x: -y * 20, y: x * 20 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ transform: `perspective(600px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      className="w-72 h-40 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-white shadow-2xl transition-transform duration-100 flex flex-col justify-between"
    >
      <span className="text-xs font-mono text-emerald-400">3D GYRO TILT</span>
      <h4 className="font-bold">Interactive Dimensionality</h4>
    </div>
  );
};
