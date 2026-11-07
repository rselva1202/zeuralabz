import React, { useState } from 'react';

export const SwiperCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const slides = ['⚡ Speed', '🎨 Aesthetics', '🛠️ Modularity'];
  return (
    <div className="w-80 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center text-white">
      <div className="h-24 flex items-center justify-center font-bold text-xl bg-zinc-900 rounded-xl mb-4">{slides[index]}</div>
      <div className="flex justify-between items-center">
        <button onClick={() => setIndex((p) => (p > 0 ? p - 1 : slides.length - 1))} className="p-2 rounded bg-zinc-800 text-xs">◀ Prev</button>
        <span className="text-xs text-zinc-400">{index + 1} / {slides.length}</span>
        <button onClick={() => setIndex((p) => (p < slides.length - 1 ? p + 1 : 0))} className="p-2 rounded bg-zinc-800 text-xs">Next ▶</button>
      </div>
    </div>
  );
};
