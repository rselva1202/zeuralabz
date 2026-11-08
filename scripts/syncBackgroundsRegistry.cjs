const fs = require('fs');

const backgrounds = [
  {
    slug: 'aurora',
    name: 'Aurora Flowing Waves Canvas',
    componentName: 'AuroraBackground',
    description: 'Volumetric luminous aurora ribbons with dynamic flowing sinusoidal light waves and shimmering curtain folds.',
    tags: ['background', 'aurora', 'waves', 'glow', 'canvas'],
    dir: 'aurora'
  },
  {
    slug: 'galaxy',
    name: 'Spiral Galaxy Cosmic Canvas',
    componentName: 'GalaxyBackground',
    description: 'Deep cosmic spiral galaxy simulation with 800+ stars, 3 logarithmic spiral arms, radiant stellar core, and chromatic volumetric nebula dust clouds.',
    tags: ['background', 'galaxy', 'cosmos', 'particles', 'spiral', 'canvas', 'space', 'stars'],
    dir: 'galaxy'
  },
  {
    slug: 'particles',
    name: 'Floating Particle Network',
    componentName: 'ParticlesBackground',
    description: 'Interactive connected particle constellation with dynamic proximity links, pulsing nodes, and glowing momentum physics.',
    tags: ['background', 'particles', 'network', 'constellation', 'canvas'],
    dir: 'particles'
  },
  {
    slug: 'dots',
    name: 'Reactive Dot Matrix Grid',
    componentName: 'DotGridBackground',
    description: 'Pulsing 2D dot matrix grid with undulating radial energy ripples, luminous amplitude waves, and deep navy backdrop.',
    tags: ['background', 'dots', 'matrix', 'grid', 'canvas'],
    dir: 'dots'
  },
  {
    slug: 'starfield',
    name: 'Deep Space Starfield',
    componentName: 'StarfieldBackground',
    description: 'Infinite deep space starfield with 700+ twinkling stars, multi-tier parallax Z-depth projection, and subtle cosmic drift on deep navy #0a0e27.',
    tags: ['background', 'starfield', 'stars', 'cosmos', 'canvas', 'space'],
    dir: 'starfield'
  },
  {
    slug: 'liquid',
    name: 'Liquid Lava Metaballs',
    componentName: 'LiquidLavaBackground',
    description: 'Fluid organic lava metaballs drifting with smooth orbital harmonic blending, radiant core diffusion, and vibrant chromatic gradients.',
    tags: ['background', 'liquid', 'lava', 'metaballs', 'fluid', 'canvas'],
    dir: 'liquid'
  },
  {
    slug: 'grid',
    name: '3D Perspective Retro Grid',
    componentName: 'RetroGridBackground',
    description: 'Synthwave 3D perspective receding grid plane with radiant horizon neon glow, animated depth displacement, and electric cyan/indigo lines.',
    tags: ['background', 'grid', 'retro', '3d', 'synthwave', 'perspective'],
    dir: 'grid'
  },
  {
    slug: 'mesh',
    name: 'Geometric Mesh Constellation',
    componentName: 'MeshBackground',
    description: 'Dynamic kinetic wireframe polygon mesh with shifting geometric tension, glowing vertices, and interconnected nodes.',
    tags: ['background', 'mesh', 'geometry', 'network', 'canvas'],
    dir: 'mesh'
  },
  {
    slug: 'noise',
    name: 'Chromatic Ambient Noise',
    componentName: 'NoiseBackground',
    description: 'Film grain perceptual micro-noise texture animated over deep iridescent cosmic violet and indigo gradients.',
    tags: ['background', 'noise', 'texture', 'film-grain', 'canvas'],
    dir: 'noise'
  },
  {
    slug: 'beam',
    name: 'Conic Border Beam Spotlight',
    componentName: 'BorderBeamBackground',
    description: 'Rotating perimeter border beam with continuous conic spotlight sweep, radiant corner blooms, and luminous chromatic edge glow.',
    tags: ['background', 'beam', 'border-beam', 'glow', 'spotlight'],
    dir: 'beam'
  },
  {
    slug: 'hexagon',
    name: 'Cyber Hexagon Honeycomb',
    componentName: 'HexagonBackground',
    description: 'Futuristic geometric hexagonal tessellation grid with rhythmic wave pulses, glowing outlines, and energy dispersion nodes.',
    tags: ['background', 'hexagon', 'honeycomb', 'cyber', 'grid', 'canvas'],
    dir: 'hexagon'
  },
  {
    slug: 'waves',
    name: 'Sinusoidal Neon Waves',
    componentName: 'WavesBackground',
    description: 'Multi-layered neon sine waves with undulating harmonic phase shifts, vibrant luminous strokes, and translucent intersecting ribbons.',
    tags: ['background', 'waves', 'neon', 'sinusoidal', 'lines', 'canvas'],
    dir: 'waves'
  },
  {
    slug: 'gradient',
    name: 'Animated Mesh Gradient',
    componentName: 'MeshGradientBackground',
    description: 'Ultra-smooth multi-focal fluid gradient mesh drifting across orbital paths with vivid color bleeding on deep navy #0a0e27.',
    tags: ['background', 'gradient', 'mesh-gradient', 'colors', 'canvas'],
    dir: 'gradient'
  },
  {
    slug: 'nebula',
    name: 'Volumetric Cosmic Nebula',
    componentName: 'NebulaBackground',
    description: 'Drifting interstellar nebula dust cloud with chromatic magenta and cyan gas tendrils, stellar core radiance, and twinkling micro-stars.',
    tags: ['background', 'nebula', 'clouds', 'cosmos', 'space', 'canvas'],
    dir: 'nebula'
  },
  {
    slug: 'fireflies',
    name: 'Bioluminescent Fireflies',
    componentName: 'FirefliesBackground',
    description: 'Organic glowing bioluminescent motes drifting with soft Brownian motion, gentle light pulsation, and radiant emerald/cyan glow trails.',
    tags: ['background', 'fireflies', 'particles', 'bioluminescence', 'vignette', 'canvas'],
    dir: 'fireflies'
  }
];

['components.json', 'preview-site/src/data/components.json'].forEach(filePath => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Keep non-background components intact
  const nonBg = data.filter(c => c.category !== 'backgrounds');

  const bgItems = backgrounds.map(bg => ({
    id: `backgrounds/${bg.slug}`,
    name: bg.name,
    slug: bg.slug,
    componentName: bg.componentName,
    category: 'backgrounds',
    description: bg.description,
    tags: bg.tags,
    bestFor: ['landing', 'portfolio', 'web3', 'hero', 'saas'],
    deps: [],
    files: [
      `components/backgrounds/${bg.dir}/${bg.componentName}.tsx`,
      `components/backgrounds/${bg.dir}/${bg.componentName}.html`,
      `components/backgrounds/${bg.dir}/${bg.componentName}.css`,
      `components/backgrounds/${bg.dir}/info.json`
    ],
    previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${bg.slug}`,
    theme: 'dark-neon',
    animation: 'canvas'
  }));

  const updated = [...bgItems, ...nonBg];
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`Synced ${bgItems.length} backgrounds in ${filePath}`);
});
