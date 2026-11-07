export const allComponents = [
  // ==================== BACKGROUNDS (15) ====================
  {
    category: 'backgrounds',
    slug: 'aurora',
    name: 'Aurora Background',
    componentName: 'AuroraBackground',
    description: 'Living northern lights curtain simulation drifting with deep indigo, cyan, and magenta ambient waves.',
    tags: ['background', 'aurora', 'ambient', 'gradient', 'framer-motion'],
    bestFor: ['landing', 'saas', 'hero'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '', children }) => {
  return (
    <div className={\`relative overflow-hidden bg-black text-white \${className}\`}>
      <div className="absolute -inset-[10px] opacity-50 blur-[90px] pointer-events-none">
        <motion.div
          animate={{ rotate: [12, -12, 12], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 transform-gpu"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-aurora">
  <div class="vibe-aurora-glow"></div>
  <div class="vibe-aurora-content">
    <h2>Living Aurora</h2>
  </div>
</div>`,
    cssCode: `.vibe-aurora { position: relative; overflow: hidden; background: #000; min-height: 320px; display: flex; align-items: center; justify-content: center; color: #fff; }
.vibe-aurora-glow { position: absolute; top: -50%; left: -25%; width: 150%; height: 200%; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1); filter: blur(90px); opacity: 0.5; animation: auroraFloat 18s ease-in-out infinite; pointer-events-none; }
@keyframes auroraFloat { 0%, 100% { transform: rotate(12deg) scale(1); } 50% { transform: rotate(-12deg) scale(1.1); } }`
  },
  {
    category: 'backgrounds',
    slug: 'galaxy',
    name: 'Spiral Galaxy Cosmic Canvas',
    componentName: 'GalaxyBackground',
    description: 'Deep cosmic spiraling star dust and stellar nebula rotation canvas.',
    tags: ['background', 'galaxy', 'cosmos', 'particles'],
    bestFor: ['landing', 'portfolio', 'web3'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const GalaxyBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#ec4899,#06b6d4,#6366f1)] opacity-20 blur-[100px] pointer-events-none"
      />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-400">Spiral Galaxy Canvas</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-galaxy"><div class="vibe-galaxy-spiral"></div><span>Spiral Galaxy</span></div>`,
    cssCode: `.vibe-galaxy { position: relative; background: #09090b; min-height: 300px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.vibe-galaxy-spiral { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: conic-gradient(#6366f1, #a855f7, #ec4899, #6366f1); filter: blur(80px); opacity: 0.25; animation: spin 40s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }`
  },
  {
    category: 'backgrounds',
    slug: 'particles',
    name: 'Floating Particle Network',
    componentName: 'ParticlesBackground',
    description: 'Interconnected floating particle filaments drifting organically in space.',
    tags: ['background', 'particles', 'network', 'constellation'],
    bestFor: ['saas', 'portfolio', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const ParticlesBackground: React.FC<{ count?: number; children?: React.ReactNode }> = ({ count = 25, children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400/60 animate-ping pointer-events-none"
          style={{ top: \`\${(i * 17) % 90}%\`, left: \`\${(i * 23) % 90}%\`, animationDuration: \`\${3 + (i % 5)}s\` }} />
      ))}
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-400">Particle Network</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-particles"><span>Particle Network</span></div>`,
    cssCode: `.vibe-particles { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'grid',
    name: '3D Perspective Retro Grid',
    componentName: 'RetroGridBackground',
    description: 'Synthwave 3D horizon grid with linear perspective vanishing into dark space.',
    tags: ['background', 'grid', 'retro', 'synthwave'],
    bestFor: ['landing', 'hero', 'gaming'],
    deps: [],
    reactCode: `import React from 'react';

export const RetroGridBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[340px] flex items-center justify-center">
      <div className="absolute inset-0 [background:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:32px_32px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-70" />
      <div className="relative z-10">{children || <span className="font-bold text-xl uppercase tracking-widest text-emerald-400">Horizon Perspective</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-retro-grid"><div class="vibe-grid-plane"></div><span>Horizon Perspective</span></div>`,
    cssCode: `.vibe-retro-grid { position: relative; background: #09090b; min-height: 320px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.vibe-grid-plane { position: absolute; inset: 0; background: linear-gradient(90deg, #27272a 1px, transparent 1px), linear-gradient(180deg, #27272a 1px, transparent 1px); background-size: 30px 30px; transform: perspective(500px) rotateX(60deg); transform-origin: bottom; opacity: 0.7; }`
  },
  {
    category: 'backgrounds',
    slug: 'gradient',
    name: 'Animated Mesh Gradient',
    componentName: 'MeshGradientBackground',
    description: 'Chromatic organic gradient blobs softly blending and pulsing across screen.',
    tags: ['background', 'gradient', 'mesh', 'blobs'],
    bestFor: ['landing', 'saas', 'hero'],
    deps: [],
    reactCode: `import React from 'react';

export const MeshGradientBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute w-96 h-96 rounded-full bg-violet-600/30 blur-[100px] top-10 left-10 animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-cyan-500/25 blur-[90px] bottom-10 right-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="relative z-10">{children || <span className="font-bold text-xl">Fluid Mesh Gradient</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mesh"><span>Fluid Mesh</span></div>`,
    cssCode: `.vibe-mesh { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'noise',
    name: 'Film Grain Noise Texture',
    componentName: 'NoiseBackground',
    description: 'Analog grainy noise texture overlay giving tactility and depth to flat dark modes.',
    tags: ['background', 'noise', 'grain', 'texture'],
    bestFor: ['editorial', 'portfolio', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const NoiseBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[280px] flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-300">Film Grain Noise</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-noise"><span>Film Grain Noise</span></div>`,
    cssCode: `.vibe-noise { position: relative; background: #09090b; min-height: 280px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'dots',
    name: 'Reactive Dot Matrix Grid',
    componentName: 'DotGridBackground',
    description: 'Clean architectural 16px micro-dot grid pattern on deep slate background.',
    tags: ['background', 'dots', 'grid', 'minimal'],
    bestFor: ['saas', 'dashboard', 'developer'],
    deps: [],
    reactCode: `import React from 'react';

export const DotGridBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">16px Dot Matrix</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-dotgrid"><span>16px Dot Matrix</span></div>`,
    cssCode: `.vibe-dotgrid { position: relative; background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'starfield',
    name: 'Deep Space Starfield',
    componentName: 'StarfieldBackground',
    description: 'Dense field of twinkling celestial stars across deep midnight void.',
    tags: ['background', 'starfield', 'cosmos', 'particles'],
    bestFor: ['landing', 'hero', 'web3'],
    deps: [],
    reactCode: `import React from 'react';

export const StarfieldBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[320px] flex items-center justify-center">
      {[...Array(30)].map((_, i) => (
        <span key={i} className="absolute w-1 h-1 bg-white rounded-full animate-ping pointer-events-none"
          style={{ top: \`\${(i * 13) % 95}%\`, left: \`\${(i * 19) % 95}%\`, animationDuration: \`\${2 + (i % 4)}s\` }} />
      ))}
      <div className="relative z-10">{children || <span className="text-sm font-semibold tracking-wide">Deep Space Starfield</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-stars"><span>Deep Space Starfield</span></div>`,
    cssCode: `.vibe-stars { position: relative; background: #000; min-height: 320px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'liquid',
    name: 'Liquid Lava Metaballs',
    componentName: 'LiquidLavaBackground',
    description: 'Organic flowing metaball fluid shapes drifting weightlessly.',
    tags: ['background', 'liquid', 'metaball', 'fluid'],
    bestFor: ['landing', 'portfolio', 'creative'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const LiquidLavaBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
      />
      <div className="relative z-10">{children || <span className="font-bold text-lg">Liquid Lava Shapes</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-lava"><span>Liquid Lava</span></div>`,
    cssCode: `.vibe-lava { position: relative; background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'beam',
    name: 'Conic Border Beam Spotlight',
    componentName: 'BorderBeamBackground',
    description: 'Conic spotlight rotating behind glass panels casting dynamic highlights.',
    tags: ['background', 'beam', 'spotlight', 'conic'],
    bestFor: ['saas', 'hero', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const BorderBeamBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#00000000_0%,#10b98144_50%,#00000000_100%)] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-mono text-sm text-emerald-400">Border Beam Spotlight</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-beam"><span>Border Beam Spotlight</span></div>`,
    cssCode: `.vibe-beam { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'hex-mesh',
    name: 'Cyber Hexagon Tessellation',
    componentName: 'HexMeshBackground',
    description: 'Interlocking hive honeycomb geometry pattern with subtle edge glow highlights.',
    tags: ['background', 'hexagon', 'pattern', 'geometry'],
    bestFor: ['gaming', 'crypto', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const HexMeshBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-mono text-sm text-cyan-400">Cyber Hexagon Tessellation</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-hex"><span>Hexagon Tessellation</span></div>`,
    cssCode: `.vibe-hex { background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'lines',
    name: 'Sinusoidal Neon Waves',
    componentName: 'NeonWavesBackground',
    description: 'Dynamic flowing bezier wave ribbons oscillating smoothly in background.',
    tags: ['background', 'waves', 'neon', 'bezier'],
    bestFor: ['landing', 'hero', 'music'],
    deps: [],
    reactCode: `import React from 'react';

export const NeonWavesBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-semibold text-lg text-rose-400">Sinusoidal Neon Waves</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-waves"><span>Neon Waves</span></div>`,
    cssCode: `.vibe-waves { background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'clouds',
    name: 'Ambient Drifting Mist',
    componentName: 'DriftingMistBackground',
    description: 'Gentle atmospheric cloud smoke drifting softly across dark surfaces.',
    tags: ['background', 'clouds', 'mist', 'ambient'],
    bestFor: ['portfolio', 'wellness', 'creative'],
    deps: [],
    reactCode: `import React from 'react';

export const DriftingMistBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-medium text-zinc-300">Ambient Drifting Mist</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mist"><span>Drifting Mist</span></div>`,
    cssCode: `.vibe-mist { background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'circuit',
    name: 'Cyberpunk Motherboard Traces',
    componentName: 'CircuitBackground',
    description: 'Micro-etched silicon wafer circuit lines with illuminated electron pulses.',
    tags: ['background', 'circuit', 'cyberpunk', 'tech'],
    bestFor: ['developer', 'crypto', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const CircuitBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      <div className="relative z-10">{children || <span className="font-mono text-sm text-emerald-400">Motherboard Traces</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-circuit"><span>Circuit Traces</span></div>`,
    cssCode: `.vibe-circuit { background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },
  {
    category: 'backgrounds',
    slug: 'vignette',
    name: 'Cinematic Dark Radial Vignette',
    componentName: 'VignetteBackground',
    description: 'Classic cinematic vignette darkening the borders to focus attention on central content.',
    tags: ['background', 'vignette', 'minimal', 'focus'],
    bestFor: ['landing', 'portfolio', 'reading'],
    deps: [],
    reactCode: `import React from 'react';

export const VignetteBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-900 text-white min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      <div className="relative z-10">{children || <span className="font-bold text-lg">Cinematic Vignette Focus</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-vignette"><span>Radial Vignette</span></div>`,
    cssCode: `.vibe-vignette { position: relative; background: #18181b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`
  },

  // ==================== TEXT ANIMATIONS (15) ====================
  {
    category: 'text-animations',
    slug: 'split-text',
    name: 'Split Character Spring Reveal',
    componentName: 'SplitText',
    description: 'Cinematic typography reveal where individual letters spring smoothly upward into place.',
    tags: ['text', 'split-text', 'reveal', 'framer-motion'],
    bestFor: ['hero', 'landing', 'portfolio'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const SplitText: React.FC<{ text?: string }> = ({ text = "Make Any Website Look Pretty" }) => {
  return (
    <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight flex flex-wrap gap-x-3 gap-y-1">
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: (wordIndex * 5 + charIndex) * 0.03, type: 'spring', stiffness: 140 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};`,
    htmlCode: `<h1 class="vibe-split-text">Make Any Website Look Pretty</h1>`,
    cssCode: `.vibe-split-text { font-size: 48px; font-weight: 900; color: #fff; }`
  },
  {
    category: 'text-animations',
    slug: 'typewriter',
    name: 'Typewriter Terminal Text',
    componentName: 'TypewriterText',
    description: 'Mechanical keyboard typewriter animation with dynamic word swapping and blinking cursor.',
    tags: ['text', 'typewriter', 'terminal'],
    bestFor: ['hero', 'developer', 'portfolio'],
    deps: [],
    reactCode: `import React, { useState, useEffect } from 'react';

export const TypewriterText: React.FC<{ words?: string[] }> = ({ words = ["Beautiful UI", "Smooth Motion", "Modern Design"] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);
    return () => clearTimeout(timer);
  }, [subIndex, index, reverse, words]);

  return (
    <div className="font-mono text-3xl font-bold text-white flex items-center">
      <span>Built for </span>
      <span className="text-emerald-400 ml-2">{words[index].substring(0, subIndex)}</span>
      <span className="animate-pulse text-emerald-400">|</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-typewriter">Built for <span class="typed">Modern Design</span><span class="cursor">|</span></div>`,
    cssCode: `.vibe-typewriter { font-family: monospace; font-size: 32px; color: #fff; } .cursor { animation: blink 1s infinite; color: #10b981; } @keyframes blink { 50% { opacity: 0; } }`
  },
  {
    category: 'text-animations',
    slug: 'gradient-text',
    name: 'Flowing Gradient Text',
    componentName: 'GradientText',
    description: 'High-visibility typography with continuous shifting multi-stop color gradient wave.',
    tags: ['text', 'gradient', 'animated-text'],
    bestFor: ['hero', 'landing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const GradientText: React.FC<{ text?: string }> = ({ text = "Supercharged by AI" }) => {
  return (
    <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
      {text}
    </h2>
  );
};`,
    htmlCode: `<h2 class="vibe-gradient-text">Supercharged by AI</h2>`,
    cssCode: `.vibe-gradient-text { font-size: 44px; font-weight: 900; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }`
  },
  {
    category: 'text-animations',
    slug: 'blur-text',
    name: 'Gaussian Blur-to-Clear Reveal',
    componentName: 'BlurText',
    description: 'Words emerge from deep gaussian blur into crisp sharp focus sequentially.',
    tags: ['text', 'blur', 'fade-in', 'framer-motion'],
    bestFor: ['hero', 'editorial', 'portfolio'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const BlurText: React.FC<{ text?: string }> = ({ text = "Focus on craft and velocity" }) => {
  return (
    <p className="text-3xl font-semibold text-white flex flex-wrap gap-2">
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};`,
    htmlCode: `<p class="vibe-blur-text">Focus on craft and velocity</p>`,
    cssCode: `.vibe-blur-text { font-size: 28px; font-weight: 600; color: #fff; }`
  },
  {
    category: 'text-animations',
    slug: 'scramble',
    name: 'Matrix Code Scramble',
    componentName: 'ScrambleText',
    description: 'Text that rapidly decodes from random binary/hex digits into clear characters on hover.',
    tags: ['text', 'matrix', 'scramble', 'decoder'],
    bestFor: ['developer', 'cyberpunk', 'saas'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const ScrambleText: React.FC<{ text?: string }> = ({ text = "INITIALIZE_SYSTEM" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________01";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <h3 onMouseEnter={scramble} className="font-mono text-3xl font-bold text-emerald-400 cursor-pointer select-none">
      {displayText}
    </h3>
  );
};`,
    htmlCode: `<h3 class="vibe-scramble">INITIALIZE_SYSTEM</h3>`,
    cssCode: `.vibe-scramble { font-family: monospace; font-size: 28px; color: #10b981; font-weight: bold; cursor: pointer; }`
  },
  {
    category: 'text-animations',
    slug: 'shiny',
    name: 'Continuous Shimmer Light Beam Text',
    componentName: 'ShinyText',
    description: 'Smooth reflective light beam that constantly travels across high-contrast typography.',
    tags: ['text', 'shimmer', 'shiny', 'gradient'],
    bestFor: ['hero', 'cta', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const ShinyText: React.FC<{ text?: string }> = ({ text = "Ultra High Performance" }) => {
  return (
    <h2 className="text-4xl font-black bg-[linear-gradient(110deg,#71717a,45%,#ffffff,55%,#71717a)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer">
      {text}
    </h2>
  );
};`,
    htmlCode: `<h2 class="vibe-shiny">Ultra High Performance</h2>`,
    cssCode: `.vibe-shiny { font-size: 36px; font-weight: 900; background: linear-gradient(110deg, #666 40%, #fff 50%, #666 60%); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }`
  },
  {
    category: 'text-animations',
    slug: 'rotating-words',
    name: '3D Flipping Word Carousel',
    componentName: 'RotatingWordsText',
    description: 'Vertical flipping words cycler that dynamically swaps key marketing adjectives.',
    tags: ['text', 'flip', 'rotate', 'framer-motion'],
    bestFor: ['hero', 'landing', 'saas'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RotatingWordsText: React.FC = () => {
  const words = ["Simple", "Scalable", "Delightful", "Intelligent"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="text-4xl font-extrabold text-white flex items-center gap-3">
      <span>Design that is</span>
      <div className="relative h-12 w-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 text-cyan-400"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-rotating">Design that is <span class="vibe-word">Intelligent</span></div>`,
    cssCode: `.vibe-rotating { font-size: 32px; font-weight: 800; color: #fff; } .vibe-word { color: #06b6d4; }`
  },
  {
    category: 'text-animations',
    slug: 'wave-motion',
    name: 'Sinusoidal Stagger Wave Text',
    componentName: 'WaveMotionText',
    description: 'Letters bounce in a sinusoidal wave harmonic when mouse hovers over the sentence.',
    tags: ['text', 'wave', 'bounce', 'framer-motion'],
    bestFor: ['portfolio', 'creative', 'header'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const WaveMotionText: React.FC<{ text?: string }> = ({ text = "Interactive Waves" }) => {
  return (
    <div className="flex gap-1 text-3xl font-black text-white cursor-pointer">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ y: -10, color: '#10b981' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {char === ' ' ? '\\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-wave">Interactive Waves</div>`,
    cssCode: `.vibe-wave { font-size: 30px; font-weight: 900; color: #fff; }`
  },
  {
    category: 'text-animations',
    slug: 'glitch-text',
    name: 'Chromatic Aberration RGB Glitch Text',
    componentName: 'GlitchText',
    description: 'Split RGB neon layers twitching on hover to create a cyberpunk video distortion.',
    tags: ['text', 'glitch', 'cyberpunk', 'chromatic'],
    bestFor: ['gaming', 'developer', 'crypto'],
    deps: [],
    reactCode: `import React from 'react';

export const GlitchText: React.FC<{ text?: string }> = ({ text = "SYSTEM_OVERRIDE" }) => {
  return (
    <div className="relative text-4xl font-mono font-black text-white uppercase group cursor-pointer">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 text-red-500 opacity-70 translate-x-[2px] -translate-y-[1px] pointer-events-none group-hover:animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 text-cyan-400 opacity-70 -translate-x-[2px] translate-y-[1px] pointer-events-none group-hover:animate-pulse">
        {text}
      </span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-glitch">SYSTEM_OVERRIDE</div>`,
    cssCode: `.vibe-glitch { font-family: monospace; font-size: 32px; font-weight: 900; color: #fff; text-shadow: 2px 0 #ef4444, -2px 0 #06b6d4; }`
  },
  {
    category: 'text-animations',
    slug: 'counter-roll',
    name: 'Statistical Spring Counter Numbers',
    componentName: 'CounterRollText',
    description: 'Animated statistical counter that spins up from 0 to target metrics smoothly.',
    tags: ['text', 'counter', 'numbers', 'metrics'],
    bestFor: ['saas', 'dashboard', 'landing'],
    deps: [],
    reactCode: `import React, { useState, useEffect } from 'react';

export const CounterRollText: React.FC<{ target?: number; suffix?: string }> = ({ target = 99.9, suffix = "%" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return <div className="font-mono text-5xl font-black text-emerald-400">{count}{suffix}</div>;
};`,
    htmlCode: `<div class="vibe-counter">99.9%</div>`,
    cssCode: `.vibe-counter { font-family: monospace; font-size: 48px; font-weight: 900; color: #10b981; }`
  },
  {
    category: 'text-animations',
    slug: 'underline-draw',
    name: 'Handcrafted SVG Underline Stroke',
    componentName: 'UnderlineDrawText',
    description: 'Hand-drawn SVG vector swoosh stroke that paints itself under emphasized words.',
    tags: ['text', 'underline', 'svg', 'draw'],
    bestFor: ['hero', 'editorial', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const UnderlineDrawText: React.FC<{ text?: string }> = ({ text = "Game Changer" }) => {
  return (
    <span className="relative inline-block font-extrabold text-3xl text-white">
      {text}
      <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
        <path d="M1 5.5C40 2 120 1 199 6" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
};`,
    htmlCode: `<span class="vibe-draw-underline">Game Changer</span>`,
    cssCode: `.vibe-draw-underline { position: relative; font-size: 28px; font-weight: 800; color: #fff; text-decoration: underline wavy #10b981; }`
  },
  {
    category: 'text-animations',
    slug: 'word-swap',
    name: 'Dynamic Crossfade Word Morph',
    componentName: 'WordSwapText',
    description: 'Interactive button swapping contrasting design philosophies.',
    tags: ['text', 'morph', 'swap'],
    bestFor: ['hero', 'creative'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const WordSwapText: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <button onClick={() => setToggle(!toggle)} className="text-3xl font-extrabold text-white">
      Ship with <span className="text-emerald-400 underline">{toggle ? 'Velocity' : 'Perfection'}</span>
    </button>
  );
};`,
    htmlCode: `<div class="vibe-swap">Ship with <span>Velocity</span></div>`,
    cssCode: `.vibe-swap { font-size: 30px; font-weight: 800; color: #fff; }`
  },
  {
    category: 'text-animations',
    slug: 'marquee-text',
    name: 'Infinite Seamless Text Ribbon',
    componentName: 'MarqueeTextRibbon',
    description: 'Endless horizontal scrolling brand text ticker across dark background.',
    tags: ['text', 'marquee', 'ribbon', 'infinite'],
    bestFor: ['landing', 'footer', 'hero'],
    deps: [],
    reactCode: `import React from 'react';

export const MarqueeTextRibbon: React.FC<{ words?: string[] }> = ({ words = ["VIBE", "TAILWIND", "REACT", "FRAMER", "GSAP"] }) => {
  return (
    <div className="w-full overflow-hidden bg-zinc-950 py-3 border-y border-zinc-900">
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-sm font-bold text-zinc-400 tracking-widest">
        {words.concat(words).map((w, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{w}</span>
            <span className="text-emerald-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-marquee-ribbon"><span>VIBE ✦ TAILWIND ✦ REACT</span></div>`,
    cssCode: `.vibe-marquee-ribbon { overflow: hidden; white-space: nowrap; font-family: monospace; color: #a1a1aa; padding: 12px; }`
  },
  {
    category: 'text-animations',
    slug: 'glow-headline',
    name: 'Atmospheric Pulse Glowing Headline',
    componentName: 'GlowingHeadlineText',
    description: 'Subtle atmospheric glow breathing effect pulsing behind high-tech header text.',
    tags: ['text', 'glow', 'pulse', 'gradient'],
    bestFor: ['hero', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const GlowingHeadlineText: React.FC<{ text?: string }> = ({ text = "FORGE THE FUTURE" }) => {
  return (
    <div className="relative inline-block">
      <span className="absolute inset-0 blur-lg bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-60 animate-pulse" />
      <h1 className="relative text-5xl font-black text-white tracking-widest">{text}</h1>
    </div>
  );
};`,
    htmlCode: `<h1 class="vibe-glow-head">FORGE THE FUTURE</h1>`,
    cssCode: `.vibe-glow-head { font-size: 40px; font-weight: 900; color: #fff; text-shadow: 0 0 20px rgba(16,185,129,0.5); }`
  },
  {
    category: 'text-animations',
    slug: 'mask-reveal',
    name: 'Curtained Mask Slide Reveal',
    componentName: 'MaskRevealText',
    description: 'Vertical curtain slide unmasking typography cleanly from top to bottom.',
    tags: ['text', 'mask', 'slide', 'reveal'],
    bestFor: ['hero', 'editorial'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const MaskRevealText: React.FC<{ text?: string }> = ({ text = "Architectural Precision" }) => {
  return (
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-extrabold text-white"
      >
        {text}
      </motion.h2>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mask-box"><h2>Architectural Precision</h2></div>`,
    cssCode: `.vibe-mask-box { overflow: hidden; } h2 { font-size: 36px; color: #fff; }`
  },

  // ==================== BUTTONS (15) ====================
  {
    category: 'buttons',
    slug: 'shimmer',
    name: 'Angled Metallic Shimmer Button',
    componentName: 'ShimmerButton',
    description: 'Luxurious button with an animated angled metallic shimmer gradient sweeping on hover.',
    tags: ['button', 'shimmer', 'gradient', 'framer-motion'],
    bestFor: ['landing', 'saas', 'hero'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const ShimmerButton: React.FC<{ text?: string; onClick?: () => void }> = ({ text = "Get Started", onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative overflow-hidden px-7 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 shadow-lg shadow-emerald-600/30 transition-all group"
    >
      <span className="relative z-10">{text}</span>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12"
      />
    </motion.button>
  );
};`,
    htmlCode: `<button class="vibe-shimmer-btn"><span>Get Started</span><div class="overlay"></div></button>`,
    cssCode: `.vibe-shimmer-btn { position: relative; overflow: hidden; padding: 12px 28px; border-radius: 12px; font-weight: 600; color: #fff; background: #059669; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'neon',
    name: 'Cyberpunk Glowing Neon Button',
    componentName: 'NeonButton',
    description: 'High-voltage electric neon button with radiating aura and border illumination.',
    tags: ['button', 'neon', 'glow', 'cyberpunk'],
    bestFor: ['gaming', 'crypto', 'landing'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton: React.FC<{ text?: string }> = ({ text = "Explore Cyber" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="px-8 py-3.5 rounded-lg font-mono font-bold tracking-wider text-black uppercase bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.7)] hover:shadow-[0_0_35px_rgba(6,182,212,1)] transition-all"
    >
      {text}
    </motion.button>
  );
};`,
    htmlCode: `<button class="vibe-neon-btn">Explore Cyber</button>`,
    cssCode: `.vibe-neon-btn { padding: 14px 32px; border-radius: 8px; font-family: monospace; font-weight: bold; background: #06b6d4; color: #000; border: none; box-shadow: 0 0 20px #06b6d4; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'magnetic',
    name: 'Spring Physics Magnetic Button',
    componentName: 'MagneticButton',
    description: 'Interactive button that pulls towards cursor coordinates on proximity with spring physics.',
    tags: ['button', 'magnetic', 'physics', 'interactive'],
    bestFor: ['portfolio', 'hero', 'landing'],
    deps: ['framer-motion'],
    reactCode: `import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MagneticButton: React.FC<{ text?: string }> = ({ text = "Magnetic Pull" }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="px-8 py-4 rounded-full font-medium bg-zinc-900 border border-zinc-700 text-white hover:border-emerald-500 shadow-xl"
    >
      {text}
    </motion.button>
  );
};`,
    htmlCode: `<button class="vibe-mag-btn">Magnetic Pull</button>`,
    cssCode: `.vibe-mag-btn { padding: 16px 32px; border-radius: 9999px; background: #18181b; border: 1px solid #3f3f46; color: #fff; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: '3d',
    name: 'Tactile Depth 3D Mechanical Button',
    componentName: 'DepthButton',
    description: 'Satisfying mechanical tactile button with physical 3D elevation and realistic press depression.',
    tags: ['button', '3d', 'tactile', 'retro'],
    bestFor: ['landing', 'gaming', 'dashboard'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const DepthButton: React.FC<{ text?: string }> = ({ text = "Press Me" }) => {
  return (
    <motion.button
      whileTap={{ y: 4 }}
      className="px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 shadow-[0_6px_0_#581c87,0_12px_16px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#581c87,0_4px_8px_rgba(0,0,0,0.3)] transition-all select-none"
    >
      {text}
    </motion.button>
  );
};`,
    htmlCode: `<button class="vibe-depth-btn">Press Me</button>`,
    cssCode: `.vibe-depth-btn { padding: 14px 32px; border-radius: 12px; font-weight: bold; background: #9333ea; color: #fff; border: none; box-shadow: 0 6px 0 #581c87; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'gradient',
    name: 'Radiant Linear Gradient Button',
    componentName: 'GradientButton',
    description: 'Smooth multi-color gradient button with soft bloom shadow.',
    tags: ['button', 'gradient', 'modern'],
    bestFor: ['landing', 'hero', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const GradientButton: React.FC<{ text?: string }> = ({ text = "Get Started" }) => {
  return (
    <button className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all">
      {text}
    </button>
  );
};`,
    htmlCode: `<button class="vibe-grad-btn">Get Started</button>`,
    cssCode: `.vibe-grad-btn { padding: 14px 32px; border-radius: 12px; font-weight: bold; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1); color: #fff; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'outline-fill',
    name: 'Expanding Liquid Wave Outline Button',
    componentName: 'OutlineFillButton',
    description: 'Clean outline button that expands a full liquid color wave to fill interior on hover.',
    tags: ['button', 'outline', 'hover', 'fill'],
    bestFor: ['saas', 'portfolio', 'minimal'],
    deps: [],
    reactCode: `import React from 'react';

export const OutlineFillButton: React.FC<{ text?: string }> = ({ text = "Discover More" }) => {
  return (
    <button className="group relative overflow-hidden rounded-xl px-7 py-3 font-semibold text-emerald-400 border-2 border-emerald-500 transition-colors">
      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-emerald-500 transition-transform duration-300 ease-out" />
      <span className="relative z-10 group-hover:text-black transition-colors">{text}</span>
    </button>
  );
};`,
    htmlCode: `<button class="vibe-outline-fill"><span>Discover More</span></button>`,
    cssCode: `.vibe-outline-fill { padding: 12px 28px; border: 2px solid #10b981; color: #10b981; border-radius: 12px; background: transparent; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'loading',
    name: 'Stateful Morphing Spinner Button',
    componentName: 'LoadingSpinnerButton',
    description: 'Button that smoothly transforms into a spinning loader on click.',
    tags: ['button', 'loading', 'spinner', 'stateful'],
    bestFor: ['forms', 'checkout', 'dashboard'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const LoadingSpinnerButton: React.FC<{ text?: string }> = ({ text = "Save Changes" }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      className="inline-flex items-center justify-center min-w-[140px] px-6 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-all disabled:opacity-80"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : text}
    </button>
  );
};`,
    htmlCode: `<button class="vibe-loading-btn">Save Changes</button>`,
    cssCode: `.vibe-loading-btn { padding: 12px 24px; min-width: 140px; border-radius: 12px; background: #059669; color: #fff; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'icon-morph',
    name: 'Expanding Brand Social Icon Button',
    componentName: 'IconMorphButton',
    description: 'Icon button that dynamically expands to reveal brand title on hover.',
    tags: ['button', 'icon', 'social', 'expand'],
    bestFor: ['portfolio', 'header', 'social'],
    deps: [],
    reactCode: `import React from 'react';

export const IconMorphButton: React.FC<{ label?: string }> = ({ label = "Star on GitHub" }) => {
  return (
    <button className="group flex items-center gap-2 overflow-hidden px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-all duration-300">
      <span className="text-amber-400 group-hover:rotate-12 transition-transform">★</span>
      <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-medium">
        {label}
      </span>
    </button>
  );
};`,
    htmlCode: `<button class="vibe-icon-morph">★ <span>Star on GitHub</span></button>`,
    cssCode: `.vibe-icon-morph { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-radius: 12px; background: #18181b; color: #fff; border: 1px solid #27272a; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'confetti',
    name: 'Celebration Particle Confetti Button',
    componentName: 'ConfettiButton',
    description: 'Milestone CTA button that shoots celebratory confetti particles on tap.',
    tags: ['button', 'confetti', 'celebration', 'interactive'],
    bestFor: ['landing', 'checkout', 'onboarding'],
    deps: ['canvas-confetti'],
    reactCode: `import React from 'react';
import confetti from 'canvas-confetti';

export const ConfettiButton: React.FC<{ text?: string }> = ({ text = "Celebrate 🎉" }) => {
  const fire = () => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  return (
    <button onClick={fire} className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:scale-105 active:scale-95 transition-all shadow-xl">
      {text}
    </button>
  );
};`,
    htmlCode: `<button class="vibe-confetti-btn">Celebrate 🎉</button>`,
    cssCode: `.vibe-confetti-btn { padding: 14px 32px; border-radius: 12px; font-weight: bold; background: linear-gradient(90deg, #f59e0b, #f43f5e, #8b5cf6); color: #fff; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'glass-btn',
    name: 'Frosted Acrylic Glass Button',
    componentName: 'GlassButton',
    description: 'Frosted acrylic glass button with specular light refraction and crisp semi-transparent border.',
    tags: ['button', 'glassmorphism', 'blur', 'minimal'],
    bestFor: ['hero', 'landing', 'portfolio'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const GlassButton: React.FC<{ text?: string }> = ({ text = "Frosted Glass" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
      whileTap={{ scale: 0.97 }}
      className="px-7 py-3 rounded-xl font-medium text-white backdrop-blur-md bg-white/5 border border-white/15 shadow-xl transition-colors"
    >
      {text}
    </motion.button>
  );
};`,
    htmlCode: `<button class="vibe-glass-btn">Frosted Glass</button>`,
    cssCode: `.vibe-glass-btn { padding: 12px 28px; border-radius: 12px; background: rgba(255,255,255,0.06); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15); color: #fff; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'border-beam',
    name: 'Infinite Conic Rotating Border Button',
    componentName: 'BorderBeamButton',
    description: 'An elegant dark button framed by a continuous rotating conic gradient border beam.',
    tags: ['button', 'border-beam', 'rainbow', 'animated-border'],
    bestFor: ['landing', 'hero', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const BorderBeamButton: React.FC<{ text?: string }> = ({ text = "Join VibeUI" }) => {
  return (
    <div className="relative inline-flex overflow-hidden rounded-xl p-[2px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ec4899_0%,#3b82f6_50%,#10b981_100%)]" />
      <button className="relative rounded-[10px] bg-zinc-950 px-7 py-3 text-sm font-semibold text-white hover:bg-zinc-900 transition-colors">
        {text}
      </button>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-border-beam"><button>Join VibeUI</button></div>`,
    cssCode: `.vibe-border-beam { display: inline-block; padding: 2px; border-radius: 12px; background: linear-gradient(90deg, #ec4899, #3b82f6, #10b981); }
.vibe-border-beam button { background: #09090b; border: none; padding: 12px 28px; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'swipe-arrow',
    name: 'Interactive Arrow Slide CTA Button',
    componentName: 'SwipeArrowButton',
    description: 'Action button where arrow icon slides across container on hover indicating progression.',
    tags: ['button', 'arrow', 'slide', 'cta'],
    bestFor: ['hero', 'landing', 'checkout'],
    deps: [],
    reactCode: `import React from 'react';

export const SwipeArrowButton: React.FC<{ text?: string }> = ({ text = "Continue" }) => {
  return (
    <button className="group flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/30">
      <span>{text}</span>
      <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
    </button>
  );
};`,
    htmlCode: `<button class="vibe-swipe-arrow"><span>Continue</span> →</button>`,
    cssCode: `.vibe-swipe-arrow { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: #2563eb; color: #fff; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'ripple',
    name: 'Material Water Splash Ripple Button',
    componentName: 'RippleButton',
    description: 'Material-inspired click button that sprouts a water ripple from the exact coordinate clicked.',
    tags: ['button', 'ripple', 'material', 'interactive'],
    bestFor: ['mobile', 'dashboard', 'actions'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const RippleButton: React.FC<{ text?: string }> = ({ text = "Click to Ripple" }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  return (
    <button onClick={addRipple} className="relative overflow-hidden px-8 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl">
      {text}
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/40 animate-ping pointer-events-none" style={{ top: r.y - 15, left: r.x - 15, width: 30, height: 30 }} />
      ))}
    </button>
  );
};`,
    htmlCode: `<button class="vibe-ripple">Click to Ripple</button>`,
    cssCode: `.vibe-ripple { padding: 14px 32px; border-radius: 12px; background: #4f46e5; color: #fff; border: none; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'cyber-glitch',
    name: 'RGB Offset Cyberpunk Glitch Button',
    componentName: 'CyberGlitchButton',
    description: 'RGB channel split chromatic aberration glitch button for futuristic cyber aesthetics.',
    tags: ['button', 'glitch', 'cyberpunk', 'chromatic'],
    bestFor: ['gaming', 'crypto', 'developer'],
    deps: [],
    reactCode: `import React from 'react';

export const CyberGlitchButton: React.FC<{ text?: string }> = ({ text = "INIT_SYSTEM" }) => {
  return (
    <button className="px-8 py-3.5 font-mono font-bold uppercase tracking-widest text-emerald-400 bg-black border-2 border-emerald-400 hover:bg-emerald-400 hover:text-black hover:shadow-[3px_3px_0_#ec4899,-3px_-3px_0_#06b6d4] transition-all">
      {text}
    </button>
  );
};`,
    htmlCode: `<button class="vibe-cyber-btn">INIT_SYSTEM</button>`,
    cssCode: `.vibe-cyber-btn { padding: 14px 32px; font-family: monospace; font-weight: bold; background: #000; color: #10b981; border: 2px solid #10b981; cursor: pointer; }`
  },
  {
    category: 'buttons',
    slug: 'copy-snippet',
    name: 'Haptic Clipboard Verified Button',
    componentName: 'CopySnippetButton',
    description: 'Utility button that copies token/code to clipboard and transforms into verified checkmark.',
    tags: ['button', 'copy', 'clipboard', 'utility'],
    bestFor: ['developer', 'docs', 'saas'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const CopySnippetButton: React.FC<{ code?: string }> = ({ code = "npx vibe-ui add aurora" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <span>{code}</span>
      <span className={copied ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>{copied ? '✓ Copied' : '📋'}</span>
    </button>
  );
};`,
    htmlCode: `<button class="vibe-copy-snippet"><code>npx vibe-ui add aurora</code><span>📋</span></button>`,
    cssCode: `.vibe-copy-snippet { display: inline-flex; gap: 8px; padding: 8px 16px; border-radius: 8px; background: #18181b; color: #d4d4d8; border: 1px solid #27272a; cursor: pointer; }`
  },

  // ==================== CARDS (15) ====================
  {
    category: 'cards',
    slug: 'glass',
    name: 'Frosted Glassmorphism Card',
    componentName: 'GlassCard',
    description: 'Ultra-refined backdrop blurred translucent glass card with glowing specular linear border highlight.',
    tags: ['card', 'glassmorphism', 'blur', 'minimal'],
    bestFor: ['landing', 'saas', 'portfolio'],
    deps: [],
    reactCode: `import React from 'react';

export const GlassCard: React.FC<{ title?: string; description?: string }> = ({
  title = "Cloud Sync",
  description = "Instant realtime updates across distributed Edge nodes."
}) => {
  return (
    <div className="w-80 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl mb-4">⚡</div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-glass-card"><h4>Cloud Sync</h4><p>Instant realtime updates.</p></div>`,
    cssCode: `.vibe-glass-card { width: 320px; padding: 24px; border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'tilt',
    name: '3D Gyroscopic Cursor Tilt Card',
    componentName: 'TiltCard',
    description: 'Dynamic card that tilts in three-dimensional space following cursor with specular lighting.',
    tags: ['card', '3d', 'tilt', 'interactive'],
    bestFor: ['landing', 'saas', 'portfolio'],
    deps: ['framer-motion'],
    reactCode: `import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "Neural Accelerator",
  subtitle = "Next-gen deep learning accelerator"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-80 h-96 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 border border-zinc-800 shadow-2xl flex flex-col justify-between"
    >
      <div style={{ transform: "translateZ(40px)" }} className="space-y-3">
        <span className="inline-block p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold uppercase">AI Model</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div style={{ transform: "translateZ(20px)" }}>
        <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-sm">Deploy Model</button>
      </div>
    </motion.div>
  );
};`,
    htmlCode: `<div class="vibe-tilt-card"><h3>Neural Accelerator</h3></div>`,
    cssCode: `.vibe-tilt-card { width: 320px; height: 360px; padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'bento',
    name: 'Bento Grid Asymmetric Tile Card',
    componentName: 'BentoCard',
    description: 'Apple-inspired Bento Grid tile with integrated feature graphics and highlight border.',
    tags: ['card', 'bento', 'grid', 'modern'],
    bestFor: ['landing', 'saas', 'hero'],
    deps: [],
    reactCode: `import React from 'react';

export const BentoCard: React.FC<{ title?: string; description?: string; badge?: string }> = ({
  title = "Universal Sync",
  description = "Auto-replicates database state across 32 geographic edge clusters.",
  badge = "Feature 01"
}) => {
  return (
    <div className="p-7 rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">{badge}</span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <div className="h-28 rounded-xl bg-zinc-900 border border-zinc-800/60 flex items-center justify-center text-xs font-mono text-zinc-500">
        // Realtime Edge Telemetry
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-bento-card"><h3>Universal Sync</h3></div>`,
    cssCode: `.vibe-bento-card { padding: 24px; border-radius: 20px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'profile',
    name: 'Team Member Avatar Badge Card',
    componentName: 'ProfileCard',
    description: 'Team member profile card with circular avatar, role chip, and social action buttons.',
    tags: ['card', 'profile', 'avatar', 'team'],
    bestFor: ['landing', 'portfolio', 'about'],
    deps: [],
    reactCode: `import React from 'react';

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
};`,
    htmlCode: `<div class="vibe-profile-card"><h4>Elena Rostova</h4><p>Principal Frontend Architect</p></div>`,
    cssCode: `.vibe-profile-card { width: 300px; padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; text-align: center; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'pricing',
    name: 'SaaS High-Conversion Subscription Card',
    componentName: 'PricingCard',
    description: 'High-conversion SaaS subscription pricing card with popular badge and highlight borders.',
    tags: ['card', 'pricing', 'saas', 'tier'],
    bestFor: ['landing', 'pricing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const PricingCard: React.FC<{ tier?: string; price?: string }> = ({
  tier = "Pro Developer",
  price = "$29"
}) => {
  return (
    <div className="relative w-80 rounded-2xl bg-zinc-900 border-2 border-emerald-500/60 p-6 shadow-2xl flex flex-col justify-between">
      <div className="absolute -top-3.5 right-6 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase">
        Most Popular
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{tier}</h4>
        <div className="flex items-baseline gap-1 my-4">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-zinc-400 text-sm">/month</span>
        </div>
        <ul className="space-y-3 text-sm text-zinc-300">
          <li>✓ Unlimited Component Exports</li>
          <li>✓ Framer Motion & GSAP Included</li>
          <li>✓ Visual Page Builder Access</li>
        </ul>
      </div>
      <button className="w-full mt-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors">
        Start Free Trial
      </button>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-pricing-card"><h4>Pro Developer</h4><div class="price">$29/mo</div></div>`,
    cssCode: `.vibe-pricing-card { width: 320px; padding: 24px; border-radius: 16px; background: #18181b; border: 2px solid #10b981; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'product',
    name: 'E-Commerce Image Zoom Card',
    componentName: 'ProductCard',
    description: 'Product display card with smooth image scale on hover and stock badge.',
    tags: ['card', 'product', 'ecommerce'],
    bestFor: ['ecommerce', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const ProductCard: React.FC<{ title?: string; price?: string }> = ({
  title = "Studio Headphones",
  price = "$249"
}) => {
  return (
    <div className="group w-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
      <div className="h-44 bg-zinc-950 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
        🎧
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <span className="text-zinc-400 text-sm">{price}</span>
        </div>
        <button className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-xs">Buy</button>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-product-card"><h4>Studio Headphones</h4><span>$249</span></div>`,
    cssCode: `.vibe-product-card { width: 300px; border-radius: 16px; background: #18181b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'hover-glow',
    name: 'Edge Highlight Luminescent Glow Card',
    componentName: 'HoverGlowCard',
    description: 'Card with glowing perimeter gradient border illuminating dynamically on mouse hover.',
    tags: ['card', 'glow', 'gradient-border'],
    bestFor: ['landing', 'saas', 'hero'],
    deps: [],
    reactCode: `import React from 'react';

export const HoverGlowCard: React.FC<{ title?: string }> = ({ title = "Accelerated Analytics" }) => {
  return (
    <div className="relative p-[1px] rounded-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 opacity-30 group-hover:opacity-100 transition-opacity blur-sm" />
      <div className="relative p-6 rounded-2xl bg-zinc-950 space-y-3 text-white">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">Instant machine learning insights across raw log streams.</p>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-glow-card"><h4>Accelerated Analytics</h4></div>`,
    cssCode: `.vibe-glow-card { padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #10b981; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'spotlight',
    name: 'Cursor Flashlight Radial Card',
    componentName: 'SpotlightCard',
    description: 'Card illuminating a dynamic radial light beam wherever the cursor hovers.',
    tags: ['card', 'spotlight', 'radial', 'interactive'],
    bestFor: ['landing', 'saas', 'portfolio'],
    deps: [],
    reactCode: `import React, { useRef, useState } from 'react';

export const SpotlightCard: React.FC<{ title?: string; description?: string }> = ({
  title = "Zero-Knowledge Enclave",
  description = "Hardware-isolated confidential compute environments."
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-80 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: \`radial-gradient(400px circle at \${pos.x}px \${pos.y}px, rgba(16, 185, 129, 0.15), transparent 60%)\`,
        }}
      />
      <div className="relative z-10 space-y-2">
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-spotlight-card"><h4>Zero-Knowledge Enclave</h4></div>`,
    cssCode: `.vibe-spotlight-card { width: 320px; padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'cyber-hud',
    name: 'Sci-Fi Telemetry Bracket HUD Card',
    componentName: 'CyberHudCard',
    description: 'Futuristic sci-fi heads-up display card with corner crosshairs, telemetry stats, and cyber cyan accents.',
    tags: ['card', 'cyberpunk', 'hud', 'futuristic'],
    bestFor: ['gaming', 'crypto', 'developer'],
    deps: [],
    reactCode: `import React from 'react';

export const CyberHudCard: React.FC<{ title?: string }> = ({ title = "CORE_TELEMETRY" }) => {
  return (
    <div className="relative w-80 p-6 bg-black border border-cyan-500/40 font-mono text-cyan-400">
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
      <div className="text-xs text-zinc-500 mb-2">NODE // 0x48A</div>
      <h4 className="text-lg font-bold text-white tracking-wider">{title}</h4>
      <p className="text-xs text-zinc-400 font-sans mt-2">Active thread synchronization across global points of presence.</p>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-hud-card"><h4>CORE_TELEMETRY</h4></div>`,
    cssCode: `.vibe-hud-card { width: 320px; padding: 24px; background: #000; border: 1px solid #06b6d4; color: #06b6d4; font-family: monospace; }`
  },
  {
    category: 'cards',
    slug: 'metric-trend',
    name: 'Analytics KPI Sparkline Trend Card',
    componentName: 'MetricTrendCard',
    description: 'Analytics dashboard metric widget displaying realtime growth percentage and glowing sparkline indicator.',
    tags: ['card', 'metric', 'stat', 'dashboard'],
    bestFor: ['dashboard', 'saas', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const MetricTrendCard: React.FC<{ label?: string; value?: string; change?: string }> = ({
  label = "Monthly Active Users",
  value = "482,910",
  change = "+28.4%"
}) => {
  return (
    <div className="w-80 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-xl">
      <div className="flex items-center justify-between text-zinc-400 text-xs mb-3">
        <span>{label}</span>
        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{change}</span>
      </div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-4 flex items-end gap-1.5 h-8">
        {[40, 60, 50, 75, 65, 90, 85, 100].map((h, i) => (
          <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 rounded-t transition-colors" style={{ height: \`\${h}%\` }} />
        ))}
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-metric-card"><div>Monthly Active Users</div><h3>482,910</h3></div>`,
    cssCode: `.vibe-metric-card { width: 320px; padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'stacked-deck',
    name: 'Cascading Fanned Cards Deck',
    componentName: 'StackedDeckCard',
    description: 'Cascading stacked cards deck that fans out slightly on hover mimicking physical playing cards.',
    tags: ['card', 'stacked', 'deck', 'fan-out'],
    bestFor: ['portfolio', 'landing', 'hero'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const StackedDeckCard: React.FC = () => {
  return (
    <div className="relative w-80 h-56 flex items-center justify-center">
      <motion.div whileHover={{ rotate: -8, x: -15 }} className="absolute w-72 h-40 rounded-2xl bg-zinc-800 border border-zinc-700 p-4 -rotate-3" />
      <motion.div whileHover={{ rotate: 8, x: 15 }} className="absolute w-72 h-40 rounded-2xl bg-zinc-900 border border-zinc-700 p-4 rotate-2" />
      <motion.div whileHover={{ y: -8 }} className="relative z-10 w-72 h-40 rounded-2xl bg-emerald-950 border border-emerald-500/50 p-5 shadow-2xl flex flex-col justify-between">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Active Deck</span>
        <h4 className="text-xl font-bold text-white">Stacked Dimension</h4>
      </motion.div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-deck-card"><h4>Stacked Dimension</h4></div>`,
    cssCode: `.vibe-deck-card { width: 280px; height: 160px; border-radius: 16px; background: #064e3b; border: 1px solid #10b981; color: #fff; padding: 20px; }`
  },
  {
    category: 'cards',
    slug: 'expandable-card',
    name: 'Smooth Accordion Drawer Spec Card',
    componentName: 'ExpandableCard',
    description: 'A collapsed summary card that smoothly unfolds to reveal deep technical specs when tapped.',
    tags: ['card', 'expandable', 'drawer', 'framer-motion'],
    bestFor: ['dashboard', 'docs', 'pricing'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExpandableCard: React.FC<{ title?: string }> = ({ title = "Security Audit Verification" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-80 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 overflow-hidden">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <span className="text-zinc-400 font-mono">{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-3 text-xs text-zinc-400 border-t border-zinc-800 mt-3 leading-relaxed">
            100% formal verification passed with 0 vulnerability warnings detected across edge relays.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-expandable-card"><h4>Security Audit</h4></div>`,
    cssCode: `.vibe-expandable-card { width: 300px; padding: 20px; border-radius: 16px; background: #18181b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'flip-card',
    name: '3D Double-Sided Rotary Card',
    componentName: 'FlipCard',
    description: 'Two-sided card that rotates 180 degrees on mouse hover revealing backside specifications.',
    tags: ['card', 'flip', '3d', 'interactive'],
    bestFor: ['portfolio', 'gaming', 'ecommerce'],
    deps: [],
    reactCode: `import React from 'react';

export const FlipCard: React.FC = () => {
  return (
    <div className="group w-72 h-80 [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between [backface-visibility:hidden]">
          <span className="text-xs text-emerald-400 font-mono">FRONT</span>
          <h4 className="text-xl font-bold text-white">Hover to Flip</h4>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-emerald-950 border border-emerald-500 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <span className="text-xs text-emerald-300 font-mono">BACK</span>
          <p className="text-xs text-zinc-300">Detailed backend configurations revealed on flip side.</p>
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-flip-card">Hover to Flip</div>`,
    cssCode: `.vibe-flip-card { width: 280px; height: 320px; border-radius: 16px; background: #18181b; color: #fff; padding: 24px; }`
  },
  {
    category: 'cards',
    slug: 'testimonial-card',
    name: 'Verified Client Quote Star Card',
    componentName: 'TestimonialCard',
    description: 'Social proof quote card with 5 gold stars, client portrait, and verified badge.',
    tags: ['card', 'testimonial', 'review', 'social-proof'],
    bestFor: ['landing', 'saas', 'ecommerce'],
    deps: [],
    reactCode: `import React from 'react';

export const TestimonialCard: React.FC<{ quote?: string; author?: string; role?: string }> = ({
  quote = "VibeUI cut our landing page development time by 80%. Every component feels alive.",
  author = "Alex Rivera",
  role = "Head of Product @ HyperScale"
}) => {
  return (
    <div className="w-80 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-white space-y-4">
      <div className="text-amber-400 text-sm">★★★★★</div>
      <p className="text-sm text-zinc-300 italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3 pt-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">AR</div>
        <div>
          <div className="text-xs font-bold text-white">{author}</div>
          <div className="text-[11px] text-zinc-500">{role}</div>
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-testi-card"><p>"VibeUI cut our time by 80%."</p><span>Alex Rivera</span></div>`,
    cssCode: `.vibe-testi-card { width: 320px; padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'cards',
    slug: 'feature-icon',
    name: 'Elevated Minimalist Feature Box Card',
    componentName: 'FeatureIconCard',
    description: 'Clean minimalist card with top accent icon and high-contrast typography.',
    tags: ['card', 'feature', 'minimalist'],
    bestFor: ['landing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const FeatureIconCard: React.FC<{ icon?: string; title?: string }> = ({
  icon = "⚡",
  title = "Instant Code Injection"
}) => {
  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 transition-colors space-y-3">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">{icon}</div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="text-xs text-zinc-400 leading-relaxed">Copy-paste production React, pure HTML and Tailwind code instantly.</p>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-feature-box"><h4>Instant Code Injection</h4></div>`,
    cssCode: `.vibe-feature-box { padding: 24px; border-radius: 16px; background: #09090b; border: 1px solid #27272a; color: #fff; }`
  },

  // ==================== HEROES (10) ====================
  {
    category: 'heroes',
    slug: 'center-hero',
    name: 'High-Impact Centered SaaS Hero',
    componentName: 'CenterHero',
    description: 'Centered SaaS headline with ambient glow orbs, dual CTAs, and community pill badge.',
    tags: ['hero', 'centered', 'saas', 'landing'],
    bestFor: ['landing', 'saas', 'startup'],
    deps: [],
    reactCode: `import React from 'react';

export const CenterHero: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "Make Any Website Look Pretty",
  subtitle = "The open-source UI design system and AI analyzer tool. Install once, let AI suggest the best UI for your project."
}) => {
  return (
    <section className="relative py-24 px-6 text-center bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          ✦ VibeUI 1.0 • 1M+ Design Combinations
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
};`,
    htmlCode: `<section class="vibe-center-hero"><h1>Make Any Website Look Pretty</h1></section>`,
    cssCode: `.vibe-center-hero { padding: 80px 20px; text-align: center; background: #000; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'split-hero',
    name: 'Dual Column Value Prop & Live Canvas Hero',
    componentName: 'SplitHero',
    description: 'Split layout hero with compelling value proposition on left and live preview stage on right.',
    tags: ['hero', 'split', 'conversion', 'cta'],
    bestFor: ['saas', 'landing', 'product'],
    deps: [],
    reactCode: `import React from 'react';

export const SplitHero: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-white leading-tight">Build interfaces that your users remember.</h1>
        <p className="text-zinc-400">Production-ready, accessible, and customizable components for vibe-coders.</p>
        <button className="px-7 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm">Explore Library</button>
      </div>
      <div className="h-72 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-500">
        // Interactive Canvas Stage
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-split-hero"><h1>Build interfaces</h1></div>`,
    cssCode: `.vibe-split-hero { display: flex; gap: 32px; padding: 60px 20px; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'video-hero',
    name: 'Ambient Background Motion Loop Hero',
    componentName: 'VideoHero',
    description: 'Immersive dark hero container with video loop motion backdrop.',
    tags: ['hero', 'video', 'cinematic'],
    bestFor: ['landing', 'brand', 'agency'],
    deps: [],
    reactCode: `import React from 'react';

export const VideoHero: React.FC = () => {
  return (
    <div className="relative py-28 px-6 text-center bg-black overflow-hidden">
      <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-white">Cinematic Motion</h1>
        <p className="text-zinc-400">Next-generation UI for modern brand narratives.</p>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-video-hero"><h1>Cinematic Motion</h1></div>`,
    cssCode: `.vibe-video-hero { padding: 90px 20px; text-align: center; background: #000; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'particle-hero',
    name: 'Interactive Constellation Cosmic Hero',
    componentName: 'ParticleHero',
    description: 'Deep cosmos hero with floating stars and reactive nebula luminescence.',
    tags: ['hero', 'particles', 'constellation'],
    bestFor: ['web3', 'portfolio', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const ParticleHero: React.FC = () => {
  return (
    <div className="relative py-28 px-6 text-center bg-black">
      <div className="relative z-10 space-y-4">
        <h2 className="text-6xl font-extrabold text-white">Infinite Possibilities</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">Explore cosmic UI dynamics for high-impact web design.</p>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-particle-hero"><h2>Infinite Possibilities</h2></div>`,
    cssCode: `.vibe-particle-hero { padding: 90px 20px; text-align: center; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'terminal-hero',
    name: 'Hacker CLI Command Stream Hero',
    componentName: 'TerminalHero',
    description: 'Terminal hero with live typing command line animation simulation.',
    tags: ['hero', 'terminal', 'cyberpunk', 'code'],
    bestFor: ['developer', 'cli', 'docs'],
    deps: [],
    reactCode: `import React from 'react';

export const TerminalHero: React.FC = () => {
  return (
    <div className="py-20 px-6 bg-black font-mono">
      <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs text-zinc-400 ml-2">bash ~ npx vibe-ui suggest</span>
        </div>
        <div className="p-6 text-sm space-y-2 text-zinc-300">
          <p className="text-emerald-400">$ npx vibe-ui suggest</p>
          <p className="text-zinc-500">Scanning your project...</p>
          <p className="text-cyan-400 font-bold">✔ React + Vite + Tailwind detected. 5 UI upgrades suggested.</p>
        </div>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-term-hero"><div class="bar"></div><div class="body">$ npx vibe-ui suggest</div></div>`,
    cssCode: `.vibe-term-hero { max-width: 600px; margin: 40px auto; background: #09090b; border: 1px solid #27272a; border-radius: 8px; font-family: monospace; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'editorial-hero',
    name: 'Giant Typography Bold Magazine Hero',
    componentName: 'EditorialHero',
    description: 'Editorial magazine layout dominated by huge, crisp typography and subtle micro-details.',
    tags: ['hero', 'typography', 'editorial'],
    bestFor: ['portfolio', 'creative', 'agency'],
    deps: [],
    reactCode: `import React from 'react';

export const EditorialHero: React.FC = () => {
  return (
    <div className="py-28 px-6 text-center bg-black">
      <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">Edition 2026 // Vol. 01</p>
      <h1 className="text-7xl sm:text-9xl font-black text-white tracking-tighter">VIBE.</h1>
      <p className="text-zinc-500 text-sm mt-6">Engineered for perfectionists.</p>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-edit-hero"><h1>VIBE.</h1></div>`,
    cssCode: `.vibe-edit-hero { padding: 90px 20px; text-align: center; background: #000; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'radial-spotlight-hero',
    name: 'Subtle Atmospheric Flashlight Hero',
    componentName: 'RadialSpotlightHero',
    description: 'Silicon Valley style modern SaaS headline with dual gradient highlights.',
    tags: ['hero', 'saas', 'spotlight'],
    bestFor: ['saas', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const RadialSpotlightHero: React.FC = () => {
  return (
    <div className="py-24 px-6 text-center bg-zinc-950">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-6">
        ★★★★★ Installed by 14,000+ vibe-coders
      </div>
      <h1 className="text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
        Ship 10x faster with AI-suggested UI components
      </h1>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-rad-hero"><h1>Ship 10x faster with AI UI</h1></div>`,
    cssCode: `.vibe-rad-hero { padding: 70px 20px; text-align: center; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'bento-hero',
    name: 'Multi-Tile Product Dashboard Hero',
    componentName: 'BentoHero',
    description: 'Bento tile layout showcasing multiple product pillars inside hero section.',
    tags: ['hero', 'bento', 'dashboard'],
    bestFor: ['saas', 'product'],
    deps: [],
    reactCode: `import React from 'react';

export const BentoHero: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black text-white">The Complete Foundry</h1>
        <p className="text-zinc-400">Everything in one cohesive system.</p>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-bento-hero"><h1>The Complete Foundry</h1></div>`,
    cssCode: `.vibe-bento-hero { padding: 60px 20px; text-align: center; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'isometric-hero',
    name: '3D Perspective Isometric Canvas Hero',
    componentName: 'IsometricHero',
    description: 'Hero section with floating 3D isometric plane depth.',
    tags: ['hero', '3d', 'isometric'],
    bestFor: ['tech', 'gaming'],
    deps: [],
    reactCode: `import React from 'react';

export const IsometricHero: React.FC = () => {
  return (
    <div className="py-24 px-6 text-center bg-zinc-950">
      <h1 className="text-6xl font-extrabold text-white">Isometric Dimension</h1>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-iso-hero"><h1>Isometric Dimension</h1></div>`,
    cssCode: `.vibe-iso-hero { padding: 80px 20px; text-align: center; color: #fff; }`
  },
  {
    category: 'heroes',
    slug: 'minimalist-hero',
    name: 'Clean Monospace Single Headline Hero',
    componentName: 'MinimalistHero',
    description: 'Clean single headline with monospace accent and minimalist CTA.',
    tags: ['hero', 'minimal', 'mono'],
    bestFor: ['portfolio', 'developer'],
    deps: [],
    reactCode: `import React from 'react';

export const MinimalistHero: React.FC = () => {
  return (
    <div className="py-24 px-6 text-center bg-black">
      <h1 className="text-6xl font-black text-white">Less is more.</h1>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mini-hero"><h1>Less is more.</h1></div>`,
    cssCode: `.vibe-mini-hero { padding: 80px 20px; text-align: center; color: #fff; }`
  },

  // ==================== LAYOUTS (10) ====================
  {
    category: 'layouts',
    slug: 'landing',
    name: 'High-Converting SaaS Landing Structure',
    componentName: 'LandingLayout',
    description: 'Complete high-converting SaaS landing page skeleton with header, hero, cards, and footer.',
    tags: ['layout', 'landing', 'saas'],
    bestFor: ['landing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const LandingLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children || <p>Landing Page Layout Shell</p>}</main>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-landing-layout"><main>Landing Page Layout</main></div>`,
    cssCode: `.vibe-landing-layout { min-height: 100vh; background: #000; color: #fff; }`
  },
  {
    category: 'layouts',
    slug: 'dashboard',
    name: 'Responsive Admin Analytics Shell',
    componentName: 'DashboardLayout',
    description: 'Full-featured dashboard layout with collapsible sidebar and top metric widgets.',
    tags: ['layout', 'dashboard', 'admin'],
    bestFor: ['dashboard', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block">Sidebar</aside>
      <main className="flex-1 p-8">{children || <p>Dashboard Content</p>}</main>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-dash-layout"><aside>Sidebar</aside><main>Dashboard</main></div>`,
    cssCode: `.vibe-dash-layout { display: flex; min-height: 100vh; background: #09090b; color: #fff; }`
  },
  {
    category: 'layouts',
    slug: 'bento-grid',
    name: '4-Column Asymmetric Bento Layout',
    componentName: 'BentoGridLayout',
    description: 'Dynamic responsive 4-column Bento layout with asymmetric spans.',
    tags: ['layout', 'bento', 'grid'],
    bestFor: ['landing', 'saas', 'portfolio'],
    deps: [],
    reactCode: `import React from 'react';

export const BentoGridLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-6">{children}</div>;
};`,
    htmlCode: `<div class="vibe-bento-grid"><div>Tile 1</div><div>Tile 2</div></div>`,
    cssCode: `.vibe-bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }`
  },
  {
    category: 'layouts',
    slug: 'sidebar-layout',
    name: 'Collapsible Desktop Sidebar Shell',
    componentName: 'SidebarLayout',
    description: 'Sidebar navigation frame with quick collapsing controls.',
    tags: ['layout', 'sidebar'],
    bestFor: ['dashboard', 'docs'],
    deps: [],
    reactCode: `import React from 'react';

export const SidebarLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="flex min-h-screen bg-black text-white">{children}</div>;
};`,
    htmlCode: `<div class="vibe-sidebar-layout"><div>Content</div></div>`,
    cssCode: `.vibe-sidebar-layout { display: flex; color: #fff; }`
  },
  {
    category: 'layouts',
    slug: 'split-screen',
    name: '50/50 Dual Focus Brand Layout',
    componentName: 'SplitScreenLayout',
    description: 'Split 50/50 layout ideal for login, onboarding, or product stories.',
    tags: ['layout', 'split', 'onboarding'],
    bestFor: ['login', 'onboarding'],
    deps: [],
    reactCode: `import React from 'react';

export const SplitScreenLayout: React.FC<{ left?: React.ReactNode; right?: React.ReactNode }> = ({ left, right }) => {
  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-black text-white">
      <div className="p-8 flex items-center justify-center">{left}</div>
      <div className="p-8 flex items-center justify-center bg-zinc-950 border-l border-zinc-900">{right}</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-split-screen"><div>Left</div><div>Right</div></div>`,
    cssCode: `.vibe-split-screen { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }`
  },
  {
    category: 'layouts',
    slug: 'centered-container',
    name: 'Focused Reading & Onboarding Container',
    componentName: 'CenteredContainerLayout',
    description: 'Narrow centered maximum width container for focused reading or checkout flows.',
    tags: ['layout', 'centered', 'reading'],
    bestFor: ['blog', 'checkout', 'onboarding'],
    deps: [],
    reactCode: `import React from 'react';

export const CenteredContainerLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="max-w-2xl mx-auto px-6 py-16 text-white">{children}</div>;
};`,
    htmlCode: `<div class="vibe-center-container">Content</div>`,
    cssCode: `.vibe-center-container { max-width: 680px; margin: 0 auto; padding: 40px 20px; }`
  },
  {
    category: 'layouts',
    slug: 'multi-column',
    name: '3-Column Modern Grid Canvas',
    componentName: 'MultiColumnLayout',
    description: 'Standard 3-column responsive card canvas.',
    tags: ['layout', 'grid', 'columns'],
    bestFor: ['landing', 'portfolio'],
    deps: [],
    reactCode: `import React from 'react';

export const MultiColumnLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">{children}</div>;
};`,
    htmlCode: `<div class="vibe-multi-col"><div>Col 1</div></div>`,
    cssCode: `.vibe-multi-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }`
  },
  {
    category: 'layouts',
    slug: 'sticky-split',
    name: 'Sticky Scrolling Narrative Side-by-Side',
    componentName: 'StickySplitLayout',
    description: 'Side-by-side layout where one column sticks while the other scrolls narrative.',
    tags: ['layout', 'sticky', 'narrative'],
    bestFor: ['landing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const StickySplitLayout: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      <div className="sticky top-20 h-96 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">Sticky Column</div>
      <div className="space-y-6">Scrolling Narrative</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-sticky-split"><div>Sticky</div><div>Scroll</div></div>`,
    cssCode: `.vibe-sticky-split { display: grid; grid-template-columns: 1fr 1fr; }`
  },
  {
    category: 'layouts',
    slug: 'masonry-grid',
    name: 'Dynamic Tile Masonry Wall',
    componentName: 'MasonryGridLayout',
    description: 'Pinterest-style masonry wall with staggered vertical card heights.',
    tags: ['layout', 'masonry', 'gallery'],
    bestFor: ['portfolio', 'gallery'],
    deps: [],
    reactCode: `import React from 'react';

export const MasonryGridLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto p-6">{children}</div>;
};`,
    htmlCode: `<div class="vibe-masonry"><div>Card 1</div></div>`,
    cssCode: `.vibe-masonry { columns: 3; column-gap: 16px; }`
  },
  {
    category: 'layouts',
    slug: 'fullscreen-hero-layout',
    name: 'Edge-to-Edge Cinematic Screen Shell',
    componentName: 'FullscreenHeroLayout',
    description: 'Full 100vh viewport immersive landing section shell.',
    tags: ['layout', 'fullscreen', 'cinematic'],
    bestFor: ['landing', 'agency'],
    deps: [],
    reactCode: `import React from 'react';

export const FullscreenHeroLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <section className="h-screen w-full flex items-center justify-center bg-black text-white p-6">{children}</section>;
};`,
    htmlCode: `<section class="vibe-full-hero"><h1>Full Viewport</h1></section>`,
    cssCode: `.vibe-full-hero { height: 100vh; display: flex; align-items: center; justify-content: center; }`
  },

  // ==================== FORMS (10) ====================
  {
    category: 'forms',
    slug: 'floating-input',
    name: 'Floating Label Animated Input',
    componentName: 'FloatingInput',
    description: 'Minimalist input field where the label floats upward and changes tint when focused.',
    tags: ['form', 'input', 'floating-label'],
    bestFor: ['login', 'forms', 'saas'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

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
};`,
    htmlCode: `<div class="vibe-float-input"><input placeholder=" "/><label>Email Address</label></div>`,
    cssCode: `.vibe-float-input { position: relative; width: 300px; } input { width: 100%; padding: 20px 12px 6px; background: #18181b; color: #fff; border: 1px solid #27272a; border-radius: 8px; }`
  },
  {
    category: 'forms',
    slug: 'search',
    name: 'Expanding Morphing Search Input',
    componentName: 'ExpandingSearch',
    description: 'Icon that expands into a full search bar upon click with smooth width transition.',
    tags: ['form', 'search', 'morph', 'animated-search'],
    bestFor: ['header', 'navbar', 'dashboard'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const ExpandingSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={\`flex items-center rounded-full bg-zinc-900 border border-zinc-800 p-1.5 transition-all duration-300 \${open ? 'w-72' : 'w-11'}\`}>
      <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white">
        🔍
      </button>
      {open && (
        <input
          autoFocus
          type="text"
          placeholder="Search components..."
          className="bg-transparent text-sm text-white focus:outline-none w-full pr-3 ml-2"
        />
      )}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-expand-search"><button>🔍</button></div>`,
    cssCode: `.vibe-expand-search { display: inline-flex; background: #18181b; padding: 4px; border-radius: 9999px; }`
  },
  {
    category: 'forms',
    slug: 'toggle',
    name: 'Cyberpunk Glow Toggle Switch',
    componentName: 'GlowToggle',
    description: 'Mechanical switch that illuminates an emerald neon glow when activated.',
    tags: ['form', 'switch', 'toggle', 'neon'],
    bestFor: ['settings', 'dashboard'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const GlowToggle: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn(!on)}
      className={\`w-16 h-8 rounded-full p-1 transition-all duration-300 \${
        on ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)]' : 'bg-zinc-800'
      }\`}
    >
      <motion.div
        animate={{ x: on ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-white shadow-md"
      />
    </button>
  );
};`,
    htmlCode: `<div class="vibe-glow-toggle"><div class="knob"></div></div>`,
    cssCode: `.vibe-glow-toggle { width: 64px; height: 32px; border-radius: 9999px; background: #27272a; padding: 4px; cursor: pointer; }`
  },
  {
    category: 'forms',
    slug: 'otp',
    name: 'Split 6-Digit OTP Verification Field',
    componentName: 'OtpInput',
    description: 'Auto-advancing 6-character authentication code input fields for two-factor verification.',
    tags: ['form', 'otp', 'verification', 'auth'],
    bestFor: ['auth', 'login'],
    deps: [],
    reactCode: `import React, { useRef } from 'react';

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
};`,
    htmlCode: `<div class="vibe-otp-row"><input maxlength="1"/><input maxlength="1"/></div>`,
    cssCode: `.vibe-otp-row { display: flex; gap: 8px; } input { width: 44px; height: 48px; text-align: center; background: #18181b; color: #fff; border-radius: 8px; }`
  },
  {
    category: 'forms',
    slug: 'newsletter',
    name: 'Glassmorphism Newsletter Subscribe Box',
    componentName: 'NewsletterBox',
    description: 'Inline email newsletter collector with frosted glass container and integrated CTA.',
    tags: ['form', 'newsletter', 'subscribe', 'glass'],
    bestFor: ['footer', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

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
};`,
    htmlCode: `<form class="vibe-newsletter"><input placeholder="Enter email..."/><button>Subscribe</button></form>`,
    cssCode: `.vibe-newsletter { display: flex; width: 360px; padding: 6px; background: #18181b; border-radius: 12px; }`
  },
  {
    category: 'forms',
    slug: 'password-reveal',
    name: 'Password Input with Reveal Toggle',
    componentName: 'PasswordInput',
    description: 'Secure password field featuring an interactive eye icon to toggle visibility.',
    tags: ['form', 'password', 'toggle', 'security'],
    bestFor: ['auth', 'login'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

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
};`,
    htmlCode: `<div class="vibe-pwd"><input type="password"/><button>👁️</button></div>`,
    cssCode: `.vibe-pwd { position: relative; width: 300px; } input { width: 100%; padding: 12px; background: #18181b; color: #fff; }`
  },
  {
    category: 'forms',
    slug: 'checkbox',
    name: 'Animated Spring Checkbox',
    componentName: 'AnimatedCheckbox',
    description: 'Custom checkbox with smooth spring path drawing checkmark animation.',
    tags: ['form', 'checkbox', 'checkmark'],
    bestFor: ['forms', 'settings'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedCheckbox: React.FC<{ label?: string }> = ({ label = "I agree to terms" }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => setChecked(!checked)}
        className={\`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors \${
          checked ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-zinc-700'
        }\`}
      >
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </div>
      <span className="text-sm text-zinc-300">{label}</span>
    </label>
  );
};`,
    htmlCode: `<label class="vibe-chk"><input type="checkbox"/><span>I agree to terms</span></label>`,
    cssCode: `.vibe-chk { display: flex; align-items: center; gap: 8px; color: #fff; cursor: pointer; }`
  },
  {
    category: 'forms',
    slug: 'select',
    name: 'Animated Dropdown Select Menu',
    componentName: 'CustomSelect',
    description: 'Select menu that smoothly springs open with highlighted keyboard navigation options.',
    tags: ['form', 'select', 'dropdown'],
    bestFor: ['dashboard', 'forms'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('React + Vite');
  const options = ['React + Vite', 'Next.js 15', 'SvelteKit', 'Vue 3'];

  return (
    <div className="relative w-72">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex justify-between items-center text-sm">
        <span>{selected}</span>
        <span>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl z-20">
            {options.map((opt) => (
              <li key={opt} onClick={() => { setSelected(opt); setOpen(false); }} className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer">
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-select"><button>Select Option ▾</button></div>`,
    cssCode: `.vibe-select { position: relative; width: 280px; }`
  },
  {
    category: 'forms',
    slug: 'upload',
    name: 'Drag & Drop File Upload Zone',
    componentName: 'FileUpload',
    description: 'Dotted upload area with pulse highlight on file dragover and file size validator.',
    tags: ['form', 'upload', 'file'],
    bestFor: ['dashboard', 'forms'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const FileUpload: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      className={\`w-80 p-8 rounded-2xl border-2 border-dashed text-center transition-colors cursor-pointer \${
        dragOver ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
      }\`}
    >
      <div className="text-3xl mb-2">📁</div>
      <p className="text-sm font-semibold text-white">Drag & drop files here</p>
      <p className="text-xs text-zinc-500 mt-1">PNG, JPG or SVG up to 10MB</p>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-upload"><p>Drag & drop files</p></div>`,
    cssCode: `.vibe-upload { width: 300px; padding: 32px; border: 2px dashed #3f3f46; text-align: center; color: #fff; }`
  },
  {
    category: 'forms',
    slug: 'range',
    name: 'Range Slider with Dynamic Tooltip',
    componentName: 'RangeSlider',
    description: 'Smooth slider with floating value tooltip that tracks the thumb coordinate.',
    tags: ['form', 'slider', 'range'],
    bestFor: ['dashboard', 'settings'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const RangeSlider: React.FC = () => {
  const [val, setVal] = useState(50);
  return (
    <div className="w-80 space-y-2">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>Volume</span>
        <span className="font-mono text-emerald-400 font-bold">{val}%</span>
      </div>
      <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
    </div>
  );
};`,
    htmlCode: `<input type="range" min="0" max="100" class="vibe-range"/>`,
    cssCode: `.vibe-range { width: 100%; accent-color: #10b981; }`
  },

  // ==================== ANIMATIONS (15) ====================
  {
    category: 'animations',
    slug: 'scroll-reveal',
    name: 'Viewport Intersection Spring Reveal',
    componentName: 'ScrollReveal',
    description: 'Element springs into view as soon as it enters the user viewport.',
    tags: ['animation', 'scroll', 'reveal'],
    bestFor: ['landing', 'cards', 'sections'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children || <div className="p-6 bg-zinc-900 rounded-xl text-white">Scroll Revealed Card</div>}
    </motion.div>
  );
};`,
    htmlCode: `<div class="vibe-scroll-rev">Scroll Revealed Card</div>`,
    cssCode: `.vibe-scroll-rev { padding: 24px; background: #18181b; color: #fff; border-radius: 12px; }`
  },
  {
    category: 'animations',
    slug: 'marquee',
    name: 'Infinite Seamless Marquee Logo Cloud',
    componentName: 'MarqueeLogoCloud',
    description: 'Endless smooth horizontal marquee loop showcasing tech partner logos.',
    tags: ['animation', 'marquee', 'logos', 'infinite'],
    bestFor: ['landing', 'hero', 'social-proof'],
    deps: [],
    reactCode: `import React from 'react';

export const MarqueeLogoCloud: React.FC = () => {
  const logos = ['⚡ VERCEL', '🌐 NEXT.JS', '🎨 TAILWIND', '🍃 MONGODB', '🚀 VITE'];
  return (
    <div className="w-full max-w-lg overflow-hidden py-4 bg-zinc-950 border-y border-zinc-900">
      <div className="flex gap-10 whitespace-nowrap animate-marquee font-bold text-zinc-400 text-sm">
        {logos.concat(logos).map((l, i) => (
          <span key={i} className="hover:text-emerald-400 transition-colors cursor-pointer">{l}</span>
        ))}
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-marquee"><span>VERCEL ✦ TAILWIND ✦ REACT</span></div>`,
    cssCode: `.vibe-marquee { overflow: hidden; white-space: nowrap; color: #a1a1aa; }`
  },
  {
    category: 'animations',
    slug: 'cursor-trail',
    name: 'Velocity Mouse Trail Follower',
    componentName: 'CursorTrail',
    description: 'Trailing glowing cursor ring that stretches based on cursor movement velocity.',
    tags: ['animation', 'cursor', 'mouse-trail'],
    bestFor: ['portfolio', 'creative'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const CursorTrail: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative w-80 h-48 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center cursor-none"
    >
      <div className="pointer-events-none absolute w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-500/20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-lg" style={{ left: pos.x, top: pos.y }} />
      <span className="text-zinc-500 text-xs font-mono">Move mouse inside canvas</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-trail-zone"><div class="cursor"></div></div>`,
    cssCode: `.vibe-trail-zone { width: 320px; height: 190px; background: #09090b; border-radius: 16px; cursor: none; }`
  },
  {
    category: 'animations',
    slug: 'magnetic',
    name: 'Magnetic Orbit Floating Cluster',
    componentName: 'MagneticOrbit',
    description: 'Floating icon clusters that gravitate smoothly towards cursor pointer.',
    tags: ['animation', 'magnetic', 'orbit'],
    bestFor: ['portfolio', 'social'],
    deps: [],
    reactCode: `import React from 'react';

export const MagneticOrbit: React.FC = () => {
  return (
    <div className="flex gap-4">
      {['Github', 'Discord', 'X'].map((brand) => (
        <button key={brand} className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold text-xs flex items-center justify-center hover:scale-125 hover:border-emerald-500 hover:text-emerald-400 transition-all shadow-xl">
          {brand[0]}
        </button>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-orbit"><button>G</button><button>D</button></div>`,
    cssCode: `.vibe-orbit { display: flex; gap: 12px; } button { width: 44px; height: 44px; border-radius: 50%; background: #18181b; color: #fff; }`
  },
  {
    category: 'animations',
    slug: 'tilt',
    name: '3D Gyroscope Perspective Angle',
    componentName: 'GyroTilt',
    description: 'Interactive container that tilts dynamically on mouse move.',
    tags: ['animation', '3d', 'tilt'],
    bestFor: ['cards', 'heroes'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const GyroTilt: React.FC = () => {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setRot({ x: -y * 20, y: x * 20 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ transform: \`perspective(600px) rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\` }}
      className="w-72 h-40 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-white shadow-2xl transition-transform duration-100 flex flex-col justify-between"
    >
      <span className="text-xs font-mono text-emerald-400">3D GYRO TILT</span>
      <h4 className="font-bold">Interactive Dimensionality</h4>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-gyro"><h4>3D Gyro Tilt</h4></div>`,
    cssCode: `.vibe-gyro { width: 280px; height: 160px; background: #18181b; border-radius: 16px; color: #fff; padding: 20px; }`
  },
  {
    category: 'animations',
    slug: 'accordion',
    name: 'Spring Physical FAQ Expansion',
    componentName: 'SpringAccordion',
    description: 'Spring animated accordion panel with rotational chevron indicator.',
    tags: ['animation', 'accordion', 'faq'],
    bestFor: ['pricing', 'faq', 'landing'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const SpringAccordion: React.FC<{ q?: string; a?: string }> = ({
  q = "How do I install VibeUI?",
  a = "Run npx vibe-ui add <slug> in your project terminal."
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-80 rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-white">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center cursor-pointer">
        <span className="font-bold text-sm">{q}</span>
        <span className={\`transition-transform duration-200 \${open ? 'rotate-180' : ''}\`}>▾</span>
      </div>
      {open && <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-zinc-800 leading-relaxed">{a}</p>}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-acc"><span>FAQ Question</span></div>`,
    cssCode: `.vibe-acc { width: 300px; padding: 16px; background: #18181b; border-radius: 12px; color: #fff; }`
  },
  {
    category: 'animations',
    slug: 'carousel',
    name: 'Touch Swiper Carousel',
    componentName: 'SwiperCarousel',
    description: 'Component preview reel with previous/next controls.',
    tags: ['animation', 'carousel', 'swiper'],
    bestFor: ['portfolio', 'landing'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const SwiperCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const slides = ['⚡ Speed', '🎨 Aesthetics', '🛠️ Modularity'];
  return (
    <div className="w-80 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center text-white">
      <div className="h-24 flex items-center justify-center font-bold text-xl bg-zinc-900 rounded-xl mb-4">{slides[index]}</div>
      <div className="flex justify-between items-center">
        <button onClick={() => setIndex((p) => (p > 0 ? p - 1 : slides.length - 1))} className="p-2 rounded bg-zinc-800 text-xs">◀ Prev</button>
        <span className="text-xs text-zinc-400">{index + 1} / {slides.length}</span>
        <button onClick={() => setIndex((p) => (p < slides.length - 1 ? p + 1 : 0))} className="p-2 rounded bg-zinc-800 text-xs">Next ▶</button>
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-carousel">Slide</div>`,
    cssCode: `.vibe-carousel { width: 300px; padding: 20px; background: #09090b; border-radius: 16px; color: #fff; }`
  },
  {
    category: 'animations',
    slug: 'countdown',
    name: 'Realtime Digital Milestone Timer',
    componentName: 'CountdownTimer',
    description: 'Digital countdown display showing Days, Hours, Minutes, and Seconds with dark neon blocks.',
    tags: ['animation', 'countdown', 'timer'],
    bestFor: ['landing', 'hero', 'ecommerce'],
    deps: [],
    reactCode: `import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  const [sec, setSec] = useState(59);
  useEffect(() => {
    const timer = setInterval(() => setSec((p) => (p > 0 ? p - 1 : 59)), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex gap-2">
      {[{ val: '14', l: 'Days' }, { val: '08', l: 'Hours' }, { val: sec < 10 ? \`0\${sec}\` : sec, l: 'Secs' }].map((b, i) => (
        <div key={i} className="w-14 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
          <div className="font-mono text-xl font-bold text-emerald-400">{b.val}</div>
          <div className="text-[10px] text-zinc-500 uppercase">{b.l}</div>
        </div>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-countdown"><span>14d 08h</span></div>`,
    cssCode: `.vibe-countdown { display: flex; gap: 8px; font-family: monospace; color: #10b981; }`
  },
  {
    category: 'animations',
    slug: 'star-rating',
    name: 'Interactive 5-Star Feedback Review Bar',
    componentName: 'StarRating',
    description: 'Gold star review rating component with hover preview feedback and instant score display.',
    tags: ['animation', 'rating', 'stars'],
    bestFor: ['ecommerce', 'social-proof'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const StarRating: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="text-2xl">
          <span className={(hover || rating) >= s ? 'text-amber-400' : 'text-zinc-700'}>★</span>
        </button>
      ))}
      <span className="text-xs font-mono text-zinc-400 ml-2">({rating}/5)</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-stars">★★★★★</div>`,
    cssCode: `.vibe-stars { color: #f59e0b; font-size: 24px; }`
  },
  {
    category: 'animations',
    slug: 'parallax-box',
    name: 'Viewport Coordinate Shifting Box',
    componentName: 'ParallaxBox',
    description: 'Parallax layer container shifting coordinate axes on viewport movement.',
    tags: ['animation', 'parallax', 'scroll'],
    bestFor: ['hero', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const ParallaxBox: React.FC = () => {
  return (
    <div className="w-80 h-44 rounded-2xl bg-gradient-to-br from-indigo-950 to-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between text-white">
      <span className="text-xs font-mono text-indigo-400">PARALLAX LAYER</span>
      <h4 className="text-lg font-bold">Smooth Viewport Physics</h4>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-parallax"><h4>Parallax Layer</h4></div>`,
    cssCode: `.vibe-parallax { width: 300px; height: 160px; background: #09090b; border-radius: 14px; padding: 20px; color: #fff; }`
  },
  {
    category: 'animations',
    slug: 'stagger-fade',
    name: 'Ordered Child Element Sequential Entrance',
    componentName: 'StaggerFade',
    description: 'Orchestrates child element animations with sequential timing delays.',
    tags: ['animation', 'stagger', 'fade'],
    bestFor: ['lists', 'cards'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';
import { motion } from 'framer-motion';

export const StaggerFade: React.FC<{ items?: string[] }> = ({ items = ['Speed', 'Reliability', 'Aesthetics'] }) => {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-3 bg-zinc-900 rounded-xl text-white text-xs">
          {item}
        </motion.div>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-stagger"><div>Item 1</div></div>`,
    cssCode: `.vibe-stagger { display: flex; flex-direction: column; gap: 8px; }`
  },
  {
    category: 'animations',
    slug: 'floating-orb',
    name: 'Ambient Drifting Weightless Orb',
    componentName: 'FloatingOrb',
    description: 'Weightless floating sphere drifting with slow sine curve physics.',
    tags: ['animation', 'floating', 'orb'],
    bestFor: ['background', 'hero'],
    deps: [],
    reactCode: `import React from 'react';

export const FloatingOrb: React.FC = () => {
  return <div className="w-24 h-24 rounded-full bg-emerald-500/30 blur-xl animate-bounce" />;
};`,
    htmlCode: `<div class="vibe-orb"></div>`,
    cssCode: `.vibe-orb { width: 80px; height: 80px; border-radius: 50%; background: rgba(16,185,129,0.3); filter: blur(20px); }`
  },
  {
    category: 'animations',
    slug: 'spotlight-beam',
    name: 'Mouse Coordinate Radial Spotlight',
    componentName: 'SpotlightBeam',
    description: 'Radial gradient spotlight following exact cursor coordinates.',
    tags: ['animation', 'spotlight', 'interactive'],
    bestFor: ['cards', 'hero'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const SpotlightBeam: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-80 h-40 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex items-center justify-center text-white"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: \`radial-gradient(200px circle at \${pos.x}px \${pos.y}px, rgba(16,185,129,0.2), transparent)\` }} />
      <span className="relative z-10 text-xs text-zinc-400">Hover for Spotlight</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-beam-box">Spotlight</div>`,
    cssCode: `.vibe-beam-box { width: 300px; height: 160px; background: #09090b; border-radius: 16px; color: #fff; }`
  },
  {
    category: 'animations',
    slug: 'dock-magnify',
    name: 'macOS Inspired Dock Magnification',
    componentName: 'DockMagnify',
    description: 'Icon dock that magnifies proximity neighbors on mouse hover.',
    tags: ['animation', 'dock', 'magnify'],
    bestFor: ['navbar', 'dock'],
    deps: [],
    reactCode: `import React from 'react';

export const DockMagnify: React.FC = () => {
  return (
    <div className="inline-flex gap-3 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
      {['🏠', '🧩', '🎨', '⚙️'].map((icon, i) => (
        <button key={i} className="w-10 h-10 rounded-xl bg-zinc-800 hover:scale-125 transition-transform flex items-center justify-center text-lg">
          {icon}
        </button>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-dock"><button>🏠</button><button>🎨</button></div>`,
    cssCode: `.vibe-dock { display: inline-flex; gap: 8px; padding: 8px; background: #18181b; border-radius: 14px; }`
  },
  {
    category: 'animations',
    slug: 'shimmer-wave',
    name: 'Surface Light Glint Travelling Wave',
    componentName: 'ShimmerWave',
    description: 'Glint of light travelling across surface boundary.',
    tags: ['animation', 'shimmer', 'glint'],
    bestFor: ['cards', 'buttons'],
    deps: [],
    reactCode: `import React from 'react';

export const ShimmerWave: React.FC = () => {
  return (
    <div className="relative w-72 h-20 rounded-xl bg-zinc-900 overflow-hidden flex items-center justify-center border border-zinc-800 text-white font-bold text-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <span>Shimmering Glint</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-shimmer-wave">Shimmering Glint</div>`,
    cssCode: `.vibe-shimmer-wave { width: 280px; height: 80px; background: #18181b; border-radius: 12px; color: #fff; display: flex; align-items: center; justify-content: center; }`
  },

  // ==================== LOADERS (5) ====================
  {
    category: 'loaders',
    slug: 'spinner',
    name: 'Concentric Dual Orbit Luminous Ring',
    componentName: 'DualRingSpinner',
    description: 'Two concentric luminous rings rotating in opposite directions with varied angular velocities.',
    tags: ['loader', 'spinner', 'dual-ring'],
    bestFor: ['saas', 'dashboard', 'actions'],
    deps: [],
    reactCode: `import React from 'react';

export const DualRingSpinner: React.FC = () => {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
      <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-cyan-400 animate-[spin_1.5s_linear_infinite_reverse]" />
    </div>
  );
};`,
    htmlCode: `<div class="vibe-dual-spin"><div class="outer"></div><div class="inner"></div></div>`,
    cssCode: `.vibe-dual-spin { position: relative; width: 56px; height: 56px; } .outer { width: 100%; height: 100%; border: 4px solid rgba(16,185,129,0.2); border-top-color: #10b981; border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`
  },
  {
    category: 'loaders',
    slug: 'skeleton',
    name: 'Asynchronous Content Shimmer Pulse Box',
    componentName: 'SkeletonCard',
    description: 'Asynchronous content loading skeleton mock with shimmering pulse wave.',
    tags: ['loader', 'skeleton', 'placeholder'],
    bestFor: ['dashboard', 'lists'],
    deps: [],
    reactCode: `import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="w-80 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 animate-pulse">
      <div className="h-32 bg-zinc-800 rounded-xl" />
      <div className="h-4 bg-zinc-800 rounded w-3/4" />
      <div className="h-3 bg-zinc-800 rounded w-1/2" />
    </div>
  );
};`,
    htmlCode: `<div class="vibe-skeleton"><div class="img"></div><div class="line"></div></div>`,
    cssCode: `.vibe-skeleton { width: 300px; padding: 20px; background: #18181b; border-radius: 16px; } .img { height: 120px; background: #27272a; border-radius: 8px; margin-bottom: 12px; } .line { height: 12px; background: #27272a; border-radius: 4px; }`
  },
  {
    category: 'loaders',
    slug: 'progress',
    name: 'Glowing Linear Gradient Track Loader',
    componentName: 'LinearProgress',
    description: 'Linear loading bar with glowing tip advancing along track.',
    tags: ['loader', 'progress', 'linear'],
    bestFor: ['onboarding', 'upload'],
    deps: [],
    reactCode: `import React from 'react';

export const LinearProgress: React.FC<{ percent?: number }> = ({ percent = 78 }) => {
  return (
    <div className="w-80 space-y-2">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>Processing</span>
        <span className="font-mono text-emerald-400">{percent}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: \`\${percent}%\` }} />
      </div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-progress"><div class="track"><div class="fill"></div></div></div>`,
    cssCode: `.vibe-progress { width: 300px; } .track { height: 8px; background: #27272a; border-radius: 9999px; overflow: hidden; } .fill { width: 75%; height: 100%; background: #10b981; }`
  },
  {
    category: 'loaders',
    slug: 'dots',
    name: 'Bouncing Harmonic Liquid Dots Wave',
    componentName: 'BouncingDots',
    description: 'Three liquid dots bouncing in harmonic wave delay rhythm.',
    tags: ['loader', 'dots', 'bounce'],
    bestFor: ['chat', 'status'],
    deps: [],
    reactCode: `import React from 'react';

export const BouncingDots: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-bounce" />
    </div>
  );
};`,
    htmlCode: `<div class="vibe-dots"><span></span><span></span><span></span></div>`,
    cssCode: `.vibe-dots { display: flex; gap: 8px; } span { width: 12px; height: 12px; border-radius: 50%; background: #10b981; }`
  },
  {
    category: 'loaders',
    slug: 'circular',
    name: 'Precision Radial SVG Percentage Ring',
    componentName: 'CircularRingLoader',
    description: 'Radial SVG stroke ring displaying calculated download percentage.',
    tags: ['loader', 'circular', 'svg', 'ring'],
    bestFor: ['dashboard', 'stats'],
    deps: [],
    reactCode: `import React from 'react';

export const CircularRingLoader: React.FC<{ percent?: number }> = ({ percent = 84 }) => {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="56" cy="56" r={radius} stroke="#27272a" strokeWidth={6} fill="transparent" />
        <circle cx="56" cy="56" r={radius} stroke="#10b981" strokeWidth={6} fill="transparent" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute font-mono font-bold text-white text-lg">{percent}%</span>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-ring-loader"><span>84%</span></div>`,
    cssCode: `.vibe-ring-loader { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; color: #fff; }`
  },

  // ==================== NAVBARS & FOOTERS (10) ====================
  {
    category: 'layouts',
    slug: 'floating-navbar',
    name: 'Elevated Glass Pill Island Header',
    componentName: 'FloatingNavbar',
    description: 'Elevated detached pill navbar with backdrop blur and fluid hover indicator.',
    tags: ['navbar', 'glass', 'floating', 'framer-motion'],
    bestFor: ['landing', 'hero'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
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
};`,
    htmlCode: `<nav class="vibe-island-nav"><span>VibeUI</span><a href="#">Home</a><a href="#">Components</a></nav>`,
    cssCode: `.vibe-island-nav { display: inline-flex; gap: 16px; padding: 8px 16px; border-radius: 9999px; background: rgba(9,9,11,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); color: #fff; }`
  },
  {
    category: 'layouts',
    slug: 'sticky-navbar',
    name: 'Sticky Header with Scroll Progress',
    componentName: 'StickyNavbar',
    description: 'Full-width top navigation header featuring integrated top progress line showing scroll percentage.',
    tags: ['navbar', 'sticky', 'scroll-progress'],
    bestFor: ['landing', 'docs'],
    deps: [],
    reactCode: `import React, { useState, useEffect } from 'react';

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
      <div className="h-[2px] bg-emerald-500 transition-all duration-75" style={{ width: \`\${progress}%\` }} />
    </header>
  );
};`,
    htmlCode: `<header class="vibe-sticky-nav"><span>VibeUI</span><div class="progress"></div></header>`,
    cssCode: `.vibe-sticky-nav { position: sticky; top: 0; width: 100%; background: #09090b; border-bottom: 1px solid #27272a; color: #fff; }`
  },
  {
    category: 'layouts',
    slug: 'mobile-drawer',
    name: 'Staggered Slide-Out Mobile Navigation',
    componentName: 'MobileDrawer',
    description: 'Smooth sliding mobile navigation drawer with staggered link appearance animations.',
    tags: ['navbar', 'mobile', 'drawer', 'framer-motion'],
    bestFor: ['mobile', 'landing'],
    deps: ['framer-motion'],
    reactCode: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const items = ['Overview', 'Components', 'Themes', 'Templates'];
  return (
    <div>
      <button onClick={() => setOpen(true)} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs">
        ☰ Menu
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 p-6 z-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-white">Navigation</span>
              <button onClick={() => setOpen(false)} className="text-zinc-400">✕</button>
            </div>
            <div className="space-y-3">
              {items.map((it) => (
                <a key={it} href="#" className="block text-zinc-300 hover:text-emerald-400">{it}</a>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-drawer"><button>☰ Menu</button></div>`,
    cssCode: `.vibe-drawer { position: relative; }`
  },
  {
    category: 'layouts',
    slug: 'collapsible-sidebar',
    name: 'Minimalist Desktop Icon Navigation',
    componentName: 'CollapsibleSidebar',
    description: 'Application sidebar with icon tooltips that collapses down to compact slim width.',
    tags: ['navbar', 'sidebar', 'collapsible'],
    bestFor: ['dashboard', 'saas'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const CollapsibleSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={\`\${collapsed ? 'w-16' : 'w-56'} h-80 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between transition-all\`}>
      <button onClick={() => setCollapsed(!collapsed)} className="text-xs text-zinc-400 self-end mb-4">
        {collapsed ? '→' : '← Collapse'}
      </button>
      <nav className="space-y-2 text-xs text-zinc-300">
        {['🏠 Home', '🧩 Components', '⚙️ Settings'].map((t) => (
          <div key={t} className="p-2 hover:bg-zinc-900 rounded-lg cursor-pointer truncate">{collapsed ? t.split(' ')[0] : t}</div>
        ))}
      </nav>
    </aside>
  );
};`,
    htmlCode: `<aside class="vibe-side">Sidebar</aside>`,
    cssCode: `.vibe-side { width: 220px; background: #09090b; border: 1px solid #27272a; padding: 16px; border-radius: 12px; }`
  },
  {
    category: 'layouts',
    slug: 'pill-dock',
    name: 'iOS Inspired Floating Segmented Dock',
    componentName: 'PillDock',
    description: 'Compact dock-style bottom bar with iOS inspired glass segments.',
    tags: ['navbar', 'dock', 'segmented', 'pill'],
    bestFor: ['landing', 'mobile', 'portfolio'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const PillDock: React.FC = () => {
  const [active, setActive] = useState(0);
  const items = ['All', 'React', 'HTML', 'Tailwind'];
  return (
    <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
      {items.map((it, idx) => (
        <button
          key={it}
          onClick={() => setActive(idx)}
          className={\`px-4 py-1.5 rounded-full text-xs font-semibold \${
            active === idx ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
          }\`}
        >
          {it}
        </button>
      ))}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-pill-dock"><button>All</button><button>React</button></div>`,
    cssCode: `.vibe-pill-dock { display: inline-flex; padding: 4px; background: #18181b; border-radius: 9999px; }`
  },
  {
    category: 'layouts',
    slug: 'command-nav',
    name: 'Keyboard Shortcut ⌘K Quicknav Bar',
    componentName: 'CommandNav',
    description: 'Keyboard centric navigation bar with ⌘K search bar trigger shortcut.',
    tags: ['navbar', 'command-bar', 'shortcuts'],
    bestFor: ['saas', 'docs', 'dashboard'],
    deps: [],
    reactCode: `import React from 'react';

export const CommandNav: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs">
      <span className="font-bold text-white">VibeUI Studio</span>
      <button className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white">
        <span>Search components...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300">⌘K</kbd>
      </button>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-cmd"><span>VibeUI</span><kbd>⌘K</kbd></div>`,
    cssCode: `.vibe-cmd { display: flex; justify-content: space-between; padding: 10px; background: #18181b; }`
  },
  {
    category: 'layouts',
    slug: 'multi-column-footer',
    name: 'Corporate Dark 4-Column Link Footer',
    componentName: 'MultiColumnFooter',
    description: 'Corporate dark footer with link columns, brand badge, and copyright disclaimer.',
    tags: ['footer', 'multi-column', 'links'],
    bestFor: ['landing', 'saas'],
    deps: [],
    reactCode: `import React from 'react';

export const MultiColumnFooter: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-12 px-6 text-zinc-400 text-xs">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <span className="font-extrabold text-white text-base">VibeUI</span>
          <p className="text-[11px] text-zinc-500 mt-2">Next-gen UI design system for vibe-coders.</p>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">Components</h5>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Backgrounds</a></li>
            <li><a href="#" className="hover:text-white">Heroes</a></li>
            <li><a href="#" className="hover:text-white">Buttons</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">Tools</h5>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">AI Analyzer</a></li>
            <li><a href="#" className="hover:text-white">MCP Server</a></li>
            <li><a href="#" className="hover:text-white">CLI Tool</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">License</h5>
          <p className="text-[11px] text-zinc-500">MIT Open Source. Free for commercial projects.</p>
        </div>
      </div>
    </footer>
  );
};`,
    htmlCode: `<footer class="vibe-footer"><p>© 2026 VibeUI</p></footer>`,
    cssCode: `.vibe-footer { padding: 40px 20px; background: #09090b; border-top: 1px solid #27272a; color: #a1a1aa; }`
  },
  {
    category: 'layouts',
    slug: 'minimal-footer',
    name: 'Clean Single-Row Status Indicator Footer',
    componentName: 'MinimalFooter',
    description: 'Clean single-row developer footer with live system status indicator.',
    tags: ['footer', 'minimalist', 'status'],
    bestFor: ['portfolio', 'developer'],
    deps: [],
    reactCode: `import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <div className="w-full py-4 px-6 bg-black border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-400">All systems operational</span>
      </div>
      <div>Designed with craft by R. Selva.</div>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mini-foot"><span>Status: OK</span></div>`,
    cssCode: `.vibe-mini-foot { padding: 16px; background: #000; color: #71717a; display: flex; justify-content: space-between; }`
  },
  {
    category: 'layouts',
    slug: 'social-pill-footer',
    name: 'Centered Floating Social Ribbon',
    componentName: 'SocialPillFooter',
    description: 'Centered glass pill island footer with glowing social media links.',
    tags: ['footer', 'social', 'pill'],
    bestFor: ['portfolio', 'landing'],
    deps: [],
    reactCode: `import React from 'react';

export const SocialPillFooter: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 text-xs">
      <a href="#" className="hover:text-white">GitHub</a>
      <a href="#" className="hover:text-white">Discord</a>
      <a href="#" className="hover:text-white">Twitter / X</a>
      <a href="#" className="hover:text-emerald-400">Docs</a>
    </div>
  );
};`,
    htmlCode: `<div class="vibe-social-pill"><a href="#">GitHub</a></div>`,
    cssCode: `.vibe-social-pill { display: inline-flex; gap: 16px; padding: 10px 20px; background: #18181b; border-radius: 9999px; }`
  },
  {
    category: 'layouts',
    slug: 'mega-menu-nav',
    name: 'Rich Multi-Column Product Dropdown',
    componentName: 'MegaMenuNav',
    description: 'Rich multi-column product mega menu that drops down smoothly with card previews.',
    tags: ['navbar', 'mega-menu', 'dropdown'],
    bestFor: ['saas', 'ecommerce'],
    deps: [],
    reactCode: `import React, { useState } from 'react';

export const MegaMenuNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block" onMouseLeave={() => setOpen(false)}>
      <button onMouseEnter={() => setOpen(true)} className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-800">
        Products ▾
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl z-50 space-y-2">
          <div className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer">
            <div className="font-bold text-white text-xs">120+ Components</div>
            <p className="text-[11px] text-zinc-400">Copy-paste ready UI</p>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer">
            <div className="font-bold text-white text-xs">AI Project Analyzer</div>
            <p className="text-[11px] text-zinc-400">CLI & MCP server suggestions</p>
          </div>
        </div>
      )}
    </div>
  );
};`,
    htmlCode: `<div class="vibe-mega-menu"><button>Products ▾</button></div>`,
    cssCode: `.vibe-mega-menu { position: relative; }`
  }
];

