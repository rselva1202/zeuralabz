import React, { useState } from 'react';

export const FloatingInput: React.FC<{ label?: string }> = ({ label = "Email Address" }) => {
  const [val, setVal] = useState('');
  return (
    <div className="relative w-80">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-transparent focus:border-emerald-500 focus:outline-none transition-colors"
      />
      <label className="absolute left-4 top-2 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400 pointer-events-none">
        {label}
      </label>
    </div>
  );
};
