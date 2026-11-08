const fs = require('fs');
const path = require('path');

const backgrounds = [
  {
    slug: 'aurora',
    name: 'Aurora Flowing Waves Canvas',
    componentName: 'AuroraBackground',
    alias: 'Aurora',
    type: 'aurora',
    description: 'Volumetric luminous aurora ribbons with dynamic flowing sinusoidal light waves and shimmering curtain folds.',
    tags: ['background', 'aurora', 'waves', 'glow', 'canvas'],
    speed: 0.8,
    glow: 1.3,
    particleCount: 800,
    colors: ['#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#10b981']
  },
  {
    slug: 'galaxy',
    name: 'Spiral Galaxy Cosmic Canvas',
    componentName: 'GalaxyBackground',
    alias: 'Galaxy',
    type: 'galaxy',
    description: 'Deep cosmic spiral galaxy simulation with 800+ stars, 3 logarithmic spiral arms, radiant stellar core, and chromatic volumetric nebula dust clouds.',
    tags: ['background', 'galaxy', 'cosmos', 'particles', 'spiral', 'canvas', 'space', 'stars'],
    speed: 0.6,
    glow: 1.2,
    particleCount: 900,
    colors: ['#ffffff', '#fef08a', '#38bdf8', '#818cf8', '#c084fc', '#f472b6']
  },
  {
    slug: 'particles',
    name: 'Floating Particle Network',
    componentName: 'ParticlesBackground',
    alias: 'Particles',
    type: 'particles',
    description: 'Interactive connected particle constellation with dynamic proximity links, pulsing nodes, and glowing momentum physics.',
    tags: ['background', 'particles', 'network', 'constellation', 'canvas'],
    speed: 0.8,
    glow: 1.2,
    particleCount: 140,
    colors: ['#38bdf8', '#818cf8', '#c084fc', '#ffffff']
  },
  {
    slug: 'dots',
    name: 'Reactive Dot Matrix Grid',
    componentName: 'DotGridBackground',
    alias: 'Dots',
    type: 'dots',
    description: 'Pulsing 2D dot matrix grid with undulating radial energy ripples, luminous amplitude waves, and deep navy backdrop.',
    tags: ['background', 'dots', 'matrix', 'grid', 'canvas'],
    speed: 0.9,
    glow: 1.2,
    particleCount: 600,
    colors: ['#38bdf8', '#818cf8', '#6366f1']
  },
  {
    slug: 'starfield',
    name: 'Deep Space Starfield',
    componentName: 'StarfieldBackground',
    alias: 'Starfield',
    type: 'starfield',
    description: 'Infinite deep space starfield with 700+ twinkling stars, multi-tier parallax Z-depth projection, and subtle cosmic drift on deep navy #0a0e27.',
    tags: ['background', 'starfield', 'stars', 'cosmos', 'canvas', 'space'],
    speed: 0.7,
    glow: 1.2,
    particleCount: 750,
    colors: ['#ffffff', '#fef08a', '#a5f3fc', '#e0e7ff', '#c7d2fe']
  },
  {
    slug: 'liquid',
    name: 'Liquid Lava Metaballs',
    componentName: 'LiquidLavaBackground',
    alias: 'Liquid',
    type: 'liquid',
    description: 'Fluid organic lava metaballs drifting with smooth orbital harmonic blending, radiant core diffusion, and vibrant chromatic gradients.',
    tags: ['background', 'liquid', 'lava', 'metaballs', 'fluid', 'canvas'],
    speed: 0.8,
    glow: 1.3,
    particleCount: 800,
    colors: ['#ec4899', '#f43f5e', '#8b5cf6', '#6366f1', '#fb923c']
  },
  {
    slug: 'grid',
    name: '3D Perspective Retro Grid',
    componentName: 'RetroGridBackground',
    alias: 'Grid',
    type: 'grid',
    description: 'Synthwave 3D perspective receding grid plane with radiant horizon neon glow, animated depth displacement, and electric cyan/indigo lines.',
    tags: ['background', 'grid', 'retro', '3d', 'synthwave', 'perspective'],
    speed: 0.9,
    glow: 1.3,
    particleCount: 800,
    colors: ['#06b6d4', '#6366f1', '#a855f7']
  },
  {
    slug: 'mesh',
    name: 'Geometric Mesh Constellation',
    componentName: 'MeshBackground',
    alias: 'Mesh',
    type: 'mesh',
    description: 'Dynamic kinetic wireframe polygon mesh with shifting geometric tension, glowing vertices, and interconnected nodes.',
    tags: ['background', 'mesh', 'geometry', 'network', 'canvas'],
    speed: 0.8,
    glow: 1.2,
    particleCount: 130,
    colors: ['#38bdf8', '#818cf8', '#c084fc']
  },
  {
    slug: 'noise',
    name: 'Chromatic Ambient Noise',
    componentName: 'NoiseBackground',
    alias: 'Noise',
    type: 'noise',
    description: 'Film grain perceptual micro-noise texture animated over deep iridescent cosmic violet and indigo gradients.',
    tags: ['background', 'noise', 'texture', 'film-grain', 'canvas'],
    speed: 1.0,
    glow: 1.1,
    particleCount: 800,
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4']
  },
  {
    slug: 'beam',
    name: 'Conic Border Beam Spotlight',
    componentName: 'BorderBeamBackground',
    alias: 'Beam',
    type: 'beam',
    description: 'Rotating perimeter border beam with continuous conic spotlight sweep, radiant corner blooms, and luminous chromatic edge glow.',
    tags: ['background', 'beam', 'border-beam', 'glow', 'spotlight'],
    speed: 1.0,
    glow: 1.4,
    particleCount: 800,
    colors: ['#06b6d4', '#6366f1', '#ec4899']
  },
  {
    slug: 'hexagon',
    name: 'Cyber Hexagon Honeycomb',
    componentName: 'HexagonBackground',
    alias: 'Hexagon',
    type: 'hexagon',
    description: 'Futuristic geometric hexagonal tessellation grid with rhythmic wave pulses, glowing outlines, and energy dispersion nodes.',
    tags: ['background', 'hexagon', 'honeycomb', 'cyber', 'grid', 'canvas'],
    speed: 0.8,
    glow: 1.3,
    particleCount: 800,
    colors: ['#06b6d4', '#38bdf8', '#818cf8', '#a855f7']
  },
  {
    slug: 'waves',
    name: 'Sinusoidal Neon Waves',
    componentName: 'WavesBackground',
    alias: 'Waves',
    type: 'waves',
    description: 'Multi-layered neon sine waves with undulating harmonic phase shifts, vibrant luminous strokes, and translucent intersecting ribbons.',
    tags: ['background', 'waves', 'neon', 'sinusoidal', 'lines', 'canvas'],
    speed: 0.9,
    glow: 1.3,
    particleCount: 800,
    colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
  },
  {
    slug: 'gradient',
    name: 'Animated Mesh Gradient',
    componentName: 'MeshGradientBackground',
    alias: 'Gradient',
    type: 'gradient',
    description: 'Ultra-smooth multi-focal fluid gradient mesh drifting across orbital paths with vivid color bleeding on deep navy #0a0e27.',
    tags: ['background', 'gradient', 'mesh-gradient', 'colors', 'canvas'],
    speed: 0.7,
    glow: 1.3,
    particleCount: 800,
    colors: ['#312e81', '#4c1d95', '#0c4a6e', '#701a75', '#1e1b4b']
  },
  {
    slug: 'nebula',
    name: 'Volumetric Cosmic Nebula',
    componentName: 'NebulaBackground',
    alias: 'Nebula',
    type: 'nebula',
    description: 'Drifting interstellar nebula dust cloud with chromatic magenta and cyan gas tendrils, stellar core radiance, and twinkling micro-stars.',
    tags: ['background', 'nebula', 'clouds', 'cosmos', 'space', 'canvas'],
    speed: 0.6,
    glow: 1.3,
    particleCount: 800,
    colors: ['#c084fc', '#f472b6', '#38bdf8', '#818cf8', '#fef08a']
  },
  {
    slug: 'fireflies',
    name: 'Bioluminescent Fireflies',
    componentName: 'FirefliesBackground',
    alias: 'Fireflies',
    type: 'fireflies',
    description: 'Organic glowing bioluminescent motes drifting with soft Brownian motion, gentle light pulsation, and radiant emerald/cyan glow trails.',
    tags: ['background', 'fireflies', 'particles', 'bioluminescence', 'vignette', 'canvas'],
    speed: 0.8,
    glow: 1.4,
    particleCount: 130,
    colors: ['#fef08a', '#84cc16', '#22c55e', '#38bdf8', '#facc15']
  }
];

// Mapping for legacy directory compatibility
const dirAliases = {
  'hexagon': ['hex-mesh', 'hexagon'],
  'waves': ['lines', 'waves'],
  'nebula': ['clouds', 'nebula'],
  'fireflies': ['vignette', 'fireflies'],
  'mesh': ['circuit', 'mesh'],
};

for (const bg of backgrounds) {
  const dirs = dirAliases[bg.slug] || [bg.slug];

  for (const dirName of dirs) {
    const dirPath = path.resolve(`components/backgrounds/${dirName}`);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // Copy local CanvasEngine.tsx
    const engineSrc = path.resolve('components/backgrounds/engine/CanvasEngine.tsx');
    fs.copyFileSync(engineSrc, path.join(dirPath, 'CanvasEngine.tsx'));

    // 1. Generate Component TSX
    const tsxCode = `import React from 'react';
import { CanvasEngine, type CanvasEngineProps } from './CanvasEngine';

export interface ${bg.componentName}Props extends Partial<CanvasEngineProps> {}

export const ${bg.componentName}: React.FC<${bg.componentName}Props> = (props) => {
  return (
    <CanvasEngine
      type="${bg.type}"
      speed={${bg.speed}}
      glow={${bg.glow}}
      particleCount={${bg.particleCount}}
      colors={${JSON.stringify(bg.colors)}}
      {...props}
    />
  );
};

export const ${bg.alias} = ${bg.componentName};
export default ${bg.componentName};
`;

    fs.writeFileSync(path.join(dirPath, `${bg.componentName}.tsx`), tsxCode, 'utf8');
    fs.writeFileSync(path.join(dirPath, `${bg.alias}.tsx`), `export * from './${bg.componentName}';\nexport { default } from './${bg.componentName}';\n`, 'utf8');

    // 2. Generate CSS
    const cssCode = `.zeura-${bg.slug}-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #111742 0%, #0a0e27 70%, #060817 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zeura-${bg.slug}-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

.zeura-${bg.slug}-content {
  position: relative;
  z-index: 10;
  color: #ffffff;
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
}
`;
    fs.writeFileSync(path.join(dirPath, `${bg.componentName}.css`), cssCode, 'utf8');
    fs.writeFileSync(path.join(dirPath, `${bg.alias}.css`), cssCode, 'utf8');

    // 3. Generate HTML
    const htmlCode = `<div class="zeura-${bg.slug}-container" id="${bg.slug}Wrapper">
  <canvas class="zeura-${bg.slug}-canvas" id="${bg.slug}Canvas"></canvas>
  <div class="zeura-${bg.slug}-content">
    <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; text-shadow: 0 0 20px rgba(99,102,241,0.6);">${bg.name}</h2>
    <p style="font-size: 0.875rem; color: #cbd5e1; opacity: 0.85;">${bg.description}</p>
  </div>
</div>
`;
    fs.writeFileSync(path.join(dirPath, `${bg.componentName}.html`), htmlCode, 'utf8');
    fs.writeFileSync(path.join(dirPath, `${bg.alias}.html`), htmlCode, 'utf8');

    // 4. Generate info.json
    const infoData = {
      name: bg.name,
      slug: bg.slug,
      componentName: bg.componentName,
      category: 'backgrounds',
      description: bg.description,
      tags: bg.tags,
      bestFor: ['landing', 'portfolio', 'web3', 'hero', 'saas'],
      deps: [],
      previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${bg.slug}`,
      author: 'R. Selva',
      license: 'MIT'
    };
    fs.writeFileSync(path.join(dirPath, 'info.json'), JSON.stringify(infoData, null, 2), 'utf8');
  }
}

console.log('Successfully generated all 15 background component files and configs!');
