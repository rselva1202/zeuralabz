import React from 'react';

export const ProfileCard: React.FC<{ name?: string; role?: string }> = ({
  name = "Elena Rostova",
  role = "Principal Frontend Architect"
}) => {
  return (
    <div className="w-80 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 text-center hover:border-zinc-700 transition-all">
      <div className="w-20 h-20 rounded-full mx-auto ring-4 ring-zinc-800 bg-zinc-800 flex items-center justify-center text-2xl mb-4 font-bold text-emerald-400">
        ER
      </div>
      <h4 className="text-xl font-bold text-white">{name}</h4>
      <p className="text-sm text-zinc-400 mb-5">{role}</p>
      <div className="flex justify-center gap-3">
        <button className="px-4 py-2 rounded-lg bg-zinc-900 text-xs font-semibold text-white border border-zinc-700">Follow</button>
        <button className="px-4 py-2 rounded-lg bg-emerald-500 text-xs font-semibold text-black font-bold">Message</button>
      </div>
    </div>
  );
};
