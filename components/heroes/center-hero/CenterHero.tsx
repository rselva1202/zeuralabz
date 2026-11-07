import React from 'react';

export const CenterHero: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "Make Any Website Look Pretty",
  subtitle = "The open-source UI design system and AI analyzer tool. Install once, let AI suggest the best UI for your project."
}) => {
  return (
    <section className="relative py-24 px-6 text-center bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          ✦ ZEURALABZ 1.0 • 1M+ Design Combinations
        </span>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex justify-center gap-4 pt-4">
          <button className="px-8 py-3.5 rounded-xl font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20">
            Install CLI
          </button>
          <button className="px-8 py-3.5 rounded-xl font-bold text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            Browse Components
          </button>
        </div>
      </div>
    </section>
  );
};
