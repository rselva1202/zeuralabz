import React, { useState } from 'react';

export const StarRating: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="text-2xl">
          <span className={(hover || rating) >= s ? 'text-amber-400' : 'text-zinc-700'}>★</span>
        </button>
      ))}
      <span className="text-xs font-mono text-zinc-400 ml-2">({rating}/5)</span>
    </div>
  );
};
