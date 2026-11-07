import React, { useState } from 'react';

export const PasswordInput: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-80">
      <input
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white pr-11 focus:border-emerald-500 focus:outline-none"
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white text-sm">
        {show ? '🙈' : '👁️'}
      </button>
    </div>
  );
};
