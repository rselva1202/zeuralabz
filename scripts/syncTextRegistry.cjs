const fs = require('fs');

const textComponents = [
  {
    slug: 'split-text',
    name: 'Split Character Spring Reveal',
    componentName: 'SplitText',
    description: 'Dynamic typography with individual letters staggering in with spring momentum, elastic bounce, and luminous drop-shadow.',
    tags: ['text', 'split-text', 'spring', 'reveal', 'framer-motion', 'typography'],
    dir: 'split-text'
  },
  {
    slug: 'typewriter',
    name: 'Typewriter Terminal Text',
    componentName: 'TypewriterText',
    description: 'Terminal mechanical typing cadence with blinking neon cyan cursor, variable typing speed, and smooth backspace cycling.',
    tags: ['text', 'typewriter', 'terminal', 'coding', 'framer-motion'],
    dir: 'typewriter'
  },
  {
    slug: 'gradient-text',
    name: 'Flowing Gradient Text',
    componentName: 'GradientText',
    description: 'Continuous multi-stop iridescent color gradient smoothly flowing across bold typography with 300% background displacement.',
    tags: ['text', 'gradient', 'iridescent', 'chromatic', 'framer-motion'],
    dir: 'gradient-text'
  },
  {
    slug: 'blur-text',
    name: 'Gaussian Blur-to-Clear Reveal',
    componentName: 'BlurText',
    description: 'Cinematic typography emerging sequentially from heavy 20px Gaussian optical blur to razor-sharp 4K clarity.',
    tags: ['text', 'blur', 'reveal', 'cinematic', 'framer-motion'],
    dir: 'blur-text'
  },
  {
    slug: 'scramble',
    name: 'Matrix Code Scramble',
    componentName: 'ScrambleText',
    description: 'Cyberpunk cryptographic decoding effect cycling through high-frequency matrix glyphs and resolving left-to-right in glowing emerald.',
    tags: ['text', 'scramble', 'matrix', 'cyberpunk', 'decrypt', 'framer-motion'],
    dir: 'scramble'
  },
  {
    slug: 'shiny',
    name: 'Continuous Shimmer Light Beam Text',
    componentName: 'ShinyText',
    description: 'Angled high-luminance specular light beam sweeping across metallic typography with continuous specular glint.',
    tags: ['text', 'shiny', 'shimmer', 'metallic', 'light-beam', 'framer-motion'],
    dir: 'shiny'
  },
  {
    slug: 'rotating-words',
    name: '3D Flipping Word Carousel',
    componentName: 'RotatingWordsText',
    description: 'Kinetic 3D perspective tumbling word carousel rotating between high-impact punchy adjectives with spring physics.',
    tags: ['text', 'rotating', 'words', '3d', 'flip', 'framer-motion'],
    dir: 'rotating-words'
  },
  {
    slug: 'counter-roll',
    name: 'Statistical Spring Counter Numbers',
    componentName: 'CounterRollText',
    description: 'High-speed numeric odometer odometer roll counting smoothly upward with spring easing and emerald delta indicators.',
    tags: ['text', 'counter', 'numbers', 'statistics', 'odometer', 'framer-motion'],
    dir: 'counter-roll'
  },
  {
    slug: 'bounce-letters',
    name: 'Elastic Bounce Letters',
    componentName: 'BounceLettersText',
    description: 'Bold amber typography leaping along a sinusoidal trampoline wave with rhythmic elastic rebounding physics.',
    tags: ['text', 'bounce', 'elastic', 'wave', 'framer-motion'],
    dir: 'bounce-letters'
  },
  {
    slug: 'fade-up',
    name: 'Cinematic Fade Up Text',
    componentName: 'FadeUpText',
    description: 'Dramatic upward slide reveal through an invisible clipping plane with opacity ramping, letter-spacing expansion, and glow.',
    tags: ['text', 'fade-up', 'cinematic', 'mask', 'framer-motion'],
    dir: 'fade-up'
  },
  {
    slug: 'glitch',
    name: 'Chromatic Aberration RGB Glitch Text',
    componentName: 'GlitchText',
    description: 'High-voltage cyberpunk glitch with split cyan/magenta chromatic aberration, horizontal micro-shearing, and digital jitter.',
    tags: ['text', 'glitch', 'cyberpunk', 'rgb-split', 'framer-motion'],
    dir: 'glitch'
  },
  {
    slug: 'neon-text',
    name: 'High-Voltage Neon Text',
    componentName: 'NeonText',
    description: 'Atmospheric gas-tube neon sign typography with multi-stage radiant glow halos, electric brightness flickers, and cyan intensity.',
    tags: ['text', 'neon', 'glow', 'electric', 'cyber', 'framer-motion'],
    dir: 'neon-text'
  },
  {
    slug: 'wave-text',
    name: 'Sinusoidal Harmonic Wave Text',
    componentName: 'WaveText',
    description: 'Continuous sinusoidal undulating wave passing through individual letters like a smooth floating ribbon.',
    tags: ['text', 'wave', 'sinusoidal', 'harmonic', 'framer-motion'],
    dir: 'wave-text'
  },
  {
    slug: 'reveal-text',
    name: 'Color Bar Curtained Mask Reveal',
    componentName: 'RevealText',
    description: 'High-fashion accent color curtain sweeping horizontally across bold typography, unveiling crisp text from darkness.',
    tags: ['text', 'reveal', 'curtain', 'mask', 'framer-motion'],
    dir: 'reveal-text'
  },
  {
    slug: 'marquee-text',
    name: 'Infinite Seamless Text Ribbon',
    componentName: 'MarqueeTextRibbon',
    description: 'Infinite continuous horizontal ticker tape ribbon streaming smoothly at 60 FPS with gradient typography and dividers.',
    tags: ['text', 'marquee', 'ticker', 'ribbon', 'infinite', 'framer-motion'],
    dir: 'marquee-text'
  }
];

['components.json', 'preview-site/src/data/components.json'].forEach(filePath => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Keep non-text components intact
  const nonText = data.filter(c => c.category !== 'text-animations');

  const textItems = textComponents.map(comp => ({
    id: `text-animations/${comp.slug}`,
    name: comp.name,
    slug: comp.slug,
    componentName: comp.componentName,
    category: 'text-animations',
    description: comp.description,
    tags: comp.tags,
    bestFor: ['hero', 'landing', 'features', 'headlines', 'banner'],
    deps: ['framer-motion'],
    files: [
      `components/text-animations/${comp.dir}/${comp.componentName}.tsx`,
      `components/text-animations/${comp.dir}/${comp.componentName}.html`,
      `components/text-animations/${comp.dir}/${comp.componentName}.css`,
      `components/text-animations/${comp.dir}/info.json`
    ],
    previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${comp.slug}`,
    theme: 'dark-neon',
    animation: 'framer-motion'
  }));

  // Re-insert text-animations
  const updated = [...data.filter(c => c.category === 'backgrounds'), ...textItems, ...data.filter(c => c.category !== 'backgrounds' && c.category !== 'text-animations')];
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`Synced ${textItems.length} text animations in ${filePath}`);
});

