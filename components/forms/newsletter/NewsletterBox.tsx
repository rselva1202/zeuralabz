import React from 'react';

export const NewsletterBox: React.FC = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex p-1.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md w-96">
      <input
        type="email"
        placeholder="Enter your email..."
        className="bg-transparent px-4 text-sm text-white focus:outline-none flex-1 placeholder-zinc-500"
      />
      <button className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors">
        Subscribe
      </button>
    </form>
  );
};
