import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 120 Component Specifications
const componentsSpec = [
  // --- BACKGROUNDS (15) ---
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
          animate={{
            rotate: [12, -12, 12],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 transform-gpu"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};`,
    htmlCode: `<div class="zeura-aurora">
  <div class="zeura-aurora-glow"></div>
  <div class="zeura-aurora-content">
    <h2>Living Aurora</h2>
  </div>
</div>`,
    cssCode: `.zeura-aurora {
  position: relative;
  overflow: hidden;
  background-color: #000;
  color: #fff;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zeura-aurora-glow {
  position: absolute;
  top: -50%;
  left: -25%;
  width: 150%;
  height: 200%;
  background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1);
  filter: blur(90px);
  opacity: 0.5;
  animation: auroraFloat 18s ease-in-out infinite;
  pointer-events-none;
}
@keyframes auroraFloat {
  0%, 100% { transform: rotate(12deg) scale(1); }
  50% { transform: rotate(-12deg) scale(1.1); }
}`,
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
    htmlCode: `<div class="zeura-galaxy"><div class="zeura-galaxy-spiral"></div><span>Spiral Galaxy</span></div>`,
    cssCode: `.zeura-galaxy { position: relative; background: #09090b; min-height: 300px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.zeura-galaxy-spiral { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: conic-gradient(#6366f1, #a855f7, #ec4899, #6366f1); filter: blur(80px); opacity: 0.25; animation: spin 40s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }`,
  },
  {
    category: 'backgrounds',
    slug: 'particles',
    name: 'Floating Particle Network',
    componentName: 'ParticlesBackground',
    description: 'Subtle interconnected floating particles that react to mouse coordinate movement.',
    tags: ['background', 'particles', 'network', 'constellation'],
    bestFor: ['saas', 'portfolio', 'landing'],
    deps: ['framer-motion'],
    reactCode: `import React from 'react';

export const ParticlesBackground: React.FC<{ count?: number; children?: React.ReactNode }> = ({ count = 25, children }) => {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-[300px] flex items-center justify-center">
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/60 animate-ping pointer-events-none"
          style={{
            top: \`\${(i * 17) % 90}%\`,
            left: \`\${(i * 23) % 90}%\`,
            animationDuration: \`\${3 + (i % 5)}s\`,
          }}
        />
      ))}
      <div className="relative z-10">{children || <span className="font-mono text-sm text-zinc-400">Particle Network</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="zeura-particles"><span>Particle Network</span></div>`,
    cssCode: `.zeura-particles { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-retro-grid"><div class="zeura-grid-plane"></div><span>Horizon Perspective</span></div>`,
    cssCode: `.zeura-retro-grid { position: relative; background: #09090b; min-height: 320px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.zeura-grid-plane { position: absolute; inset: 0; background: linear-gradient(90deg, #27272a 1px, transparent 1px), linear-gradient(180deg, #27272a 1px, transparent 1px); background-size: 30px 30px; transform: perspective(500px) rotateX(60deg); transform-origin: bottom; opacity: 0.7; }`,
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
    htmlCode: `<div class="zeura-mesh"><div class="zeura-blob1"></div><div class="zeura-blob2"></div><span>Fluid Mesh</span></div>`,
    cssCode: `.zeura-mesh { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.zeura-blob1 { position: absolute; width: 300px; height: 300px; background: rgba(124, 58, 237, 0.3); filter: blur(80px); top: 10%; left: 10%; }
.zeura-blob2 { position: absolute; width: 250px; height: 250px; background: rgba(6, 182, 212, 0.25); filter: blur(80px); bottom: 10%; right: 10%; }`,
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
    htmlCode: `<div class="zeura-noise"><div class="zeura-grain"></div><span>Film Grain Noise</span></div>`,
    cssCode: `.zeura-noise { position: relative; background: #09090b; min-height: 280px; display: flex; align-items: center; justify-content: center; }
.zeura-grain { position: absolute; inset: 0; background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 3px 3px; opacity: 0.15; pointer-events-none; }`,
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
    htmlCode: `<div class="zeura-dotgrid"><span>16px Dot Matrix</span></div>`,
    cssCode: `.zeura-dotgrid { position: relative; background: #09090b; background-image: radial-gradient(#27272a 1px, transparent 1px); background-size: 16px 16px; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
        <span
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-ping pointer-events-none"
          style={{
            top: \`\${(i * 13) % 95}%\`,
            left: \`\${(i * 19) % 95}%\`,
            animationDuration: \`\${2 + (i % 4)}s\`,
          }}
        />
      ))}
      <div className="relative z-10">{children || <span className="text-sm font-semibold tracking-wide">Deep Space Starfield</span>}</div>
    </div>
  );
};`,
    htmlCode: `<div class="zeura-stars"><span>Deep Space Starfield</span></div>`,
    cssCode: `.zeura-stars { position: relative; background: #000; min-height: 320px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-lava"><span>Liquid Lava</span></div>`,
    cssCode: `.zeura-lava { position: relative; background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-beam"><span>Border Beam Spotlight</span></div>`,
    cssCode: `.zeura-beam { position: relative; background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-hex"><span>Hexagon Tessellation</span></div>`,
    cssCode: `.zeura-hex { background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-waves"><span>Neon Waves</span></div>`,
    cssCode: `.zeura-waves { background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-mist"><span>Drifting Mist</span></div>`,
    cssCode: `.zeura-mist { background: #09090b; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-circuit"><span>Circuit Traces</span></div>`,
    cssCode: `.zeura-circuit { background: #000; min-height: 300px; display: flex; align-items: center; justify-content: center; }`,
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
    htmlCode: `<div class="zeura-vignette"><span>Radial Vignette</span></div>`,
    cssCode: `.zeura-vignette { position: relative; background: #18181b; min-height: 300px; display: flex; align-items: center; justify-content: center; }
.zeura-vignette::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.85) 100%); pointer-events-none; }`,
  },
];

console.log(`Configured \${componentsSpec.length} initial components. Expanding to 120...`);

