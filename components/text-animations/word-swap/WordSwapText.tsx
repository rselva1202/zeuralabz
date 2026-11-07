import React, { useState } from 'react';

export const WordSwapText: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <button onClick={() => setToggle(!toggle)} className="text-3xl font-extrabold text-white">
      Ship with <span className="text-emerald-400 underline">{toggle ? 'Velocity' : 'Perfection'}</span>
    </button>
  );
};
