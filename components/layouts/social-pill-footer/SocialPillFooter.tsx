import React from 'react';

export const SocialPillFooter: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 text-xs">
      <a href="#" className="hover:text-white">GitHub</a>
      <a href="#" className="hover:text-white">Discord</a>
      <a href="#" className="hover:text-white">Twitter / X</a>
      <a href="#" className="hover:text-emerald-400">Docs</a>
    </div>
  );
};
