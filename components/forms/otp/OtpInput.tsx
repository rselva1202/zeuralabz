import React, { useRef } from 'react';

export const OtpInput: React.FC = () => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          className="w-11 h-12 text-center text-xl font-bold rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-emerald-500 focus:outline-none"
        />
      ))}
    </div>
  );
};
