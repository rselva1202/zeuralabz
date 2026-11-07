import React, { useState, useEffect } from 'react';

export const StickyNavbar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-zinc-950/80 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-extrabold text-lg text-white">VibeUI</span>
        <button className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs">Get Started</button>
      </div>
      <div className="h-[2px] bg-emerald-500 transition-all duration-75" style={{ width: `${progress}%` }} />
    </header>
  );
};
