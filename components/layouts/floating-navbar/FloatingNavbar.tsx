import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FloatingNavbar: React.FC = () => {
  const [active, setActive] = useState('Home');
  const links = ['Home', 'Components', 'Templates', 'Docs'];

  return (
    <nav className="flex items-center gap-1 px-4 py-2 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 font-bold text-white pr-4 border-r border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        VibeUI
      </div>
      <div className="flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => setActive(link)}
            className="relative px-3.5 py-1.5 text-xs font-medium transition-colors"
          >
            <span className={active === link ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}>{link}</span>
            {active === link && <motion.div layoutId="navTab" className="absolute inset-0 bg-white/10 rounded-full -z-10" />}
          </button>
        ))}
      </div>
    </nav>
  );
};
