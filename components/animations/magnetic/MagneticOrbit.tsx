import React from 'react';

export const MagneticOrbit: React.FC = () => {
  return (
    <div className="flex gap-4">
      {['Github', 'Discord', 'X'].map((brand) => (
        <button key={brand} className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold text-xs flex items-center justify-center hover:scale-125 hover:border-emerald-500 hover:text-emerald-400 transition-all shadow-xl">
          {brand[0]}
        </button>
      ))}
    </div>
  );
};
