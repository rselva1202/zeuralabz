const fs = require('fs');
const path = require('path');

const textComponents = [
  {
    slug: 'split-text',
    name: 'Split Character Spring Reveal',
    componentName: 'SplitText',
    alias: 'SplitText',
    type: 'split',
    text: 'ZEURALABZ',
    description: 'Dynamic typography with individual letters staggering in with spring momentum, elastic bounce, and luminous drop-shadow.',
    tags: ['text', 'split-text', 'spring', 'reveal', 'framer-motion', 'typography'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'typewriter',
    name: 'Typewriter Terminal Text',
    componentName: 'TypewriterText',
    alias: 'Typewriter',
    type: 'typewriter',
    text: 'Next-Gen UI Systems',
    description: 'Terminal mechanical typing cadence with blinking neon cyan cursor, variable typing speed, and smooth backspace cycling.',
    tags: ['text', 'typewriter', 'terminal', 'coding', 'framer-motion'],
    speed: 1.0,
    fontSize: '2rem'
  },
  {
    slug: 'gradient-text',
    name: 'Flowing Gradient Text',
    componentName: 'GradientText',
    alias: 'GradientText',
    type: 'gradient',
    text: 'Fluid Chromatic Energy',
    description: 'Continuous multi-stop iridescent color gradient smoothly flowing across bold typography with 300% background displacement.',
    tags: ['text', 'gradient', 'iridescent', 'chromatic', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'blur-text',
    name: 'Gaussian Blur-to-Clear Reveal',
    componentName: 'BlurText',
    alias: 'BlurText',
    type: 'blur',
    text: 'Crystalline Focus',
    description: 'Cinematic typography emerging sequentially from heavy 20px Gaussian optical blur to razor-sharp 4K clarity.',
    tags: ['text', 'blur', 'reveal', 'cinematic', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'scramble',
    name: 'Matrix Code Scramble',
    componentName: 'ScrambleText',
    alias: 'Scramble',
    type: 'scramble',
    text: 'SYSTEM_OVERRIDE_01',
    description: 'Cyberpunk cryptographic decoding effect cycling through high-frequency matrix glyphs and resolving left-to-right in glowing emerald.',
    tags: ['text', 'scramble', 'matrix', 'cyberpunk', 'decrypt', 'framer-motion'],
    speed: 1.0,
    fontSize: '1.85rem'
  },
  {
    slug: 'shiny',
    name: 'Continuous Shimmer Light Beam Text',
    componentName: 'ShinyText',
    alias: 'Shiny',
    type: 'shiny',
    text: 'METALLIC SHEEN',
    description: 'Angled high-luminance specular light beam sweeping across metallic typography with continuous specular glint.',
    tags: ['text', 'shiny', 'shimmer', 'metallic', 'light-beam', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'rotating-words',
    name: '3D Flipping Word Carousel',
    componentName: 'RotatingWordsText',
    alias: 'RotatingWords',
    type: 'rotating',
    text: 'FUTURISTIC',
    words: ['FUTURISTIC', 'POWERFUL', 'LIGHTNING', 'ADAPTIVE'],
    description: 'Kinetic 3D perspective tumbling word carousel rotating between high-impact punchy adjectives with spring physics.',
    tags: ['text', 'rotating', 'words', '3d', 'flip', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'counter-roll',
    name: 'Statistical Spring Counter Numbers',
    componentName: 'CounterRollText',
    alias: 'CounterRoll',
    type: 'counter',
    text: '9,840',
    targetNumber: 9840,
    description: 'High-speed numeric odometer odometer roll counting smoothly upward with spring easing and emerald delta indicators.',
    tags: ['text', 'counter', 'numbers', 'statistics', 'odometer', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.75rem'
  },
  {
    slug: 'bounce-letters',
    name: 'Elastic Bounce Letters',
    componentName: 'BounceLettersText',
    alias: 'BounceLetters',
    type: 'bounce',
    text: 'BOUNCING ENERGY',
    description: 'Bold amber typography leaping along a sinusoidal trampoline wave with rhythmic elastic rebounding physics.',
    tags: ['text', 'bounce', 'elastic', 'wave', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.25rem'
  },
  {
    slug: 'fade-up',
    name: 'Cinematic Fade Up Text',
    componentName: 'FadeUpText',
    alias: 'FadeUp',
    type: 'fade-up',
    text: 'CINEMATIC SCALE',
    description: 'Dramatic upward slide reveal through an invisible clipping plane with opacity ramping, letter-spacing expansion, and glow.',
    tags: ['text', 'fade-up', 'cinematic', 'mask', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'glitch',
    name: 'Chromatic Aberration RGB Glitch Text',
    componentName: 'GlitchText',
    alias: 'Glitch',
    type: 'glitch',
    text: 'CYBER_ANOMALY',
    description: 'High-voltage cyberpunk glitch with split cyan/magenta chromatic aberration, horizontal micro-shearing, and digital jitter.',
    tags: ['text', 'glitch', 'cyberpunk', 'rgb-split', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'neon-text',
    name: 'High-Voltage Neon Text',
    componentName: 'NeonText',
    alias: 'NeonText',
    type: 'neon',
    text: 'ELECTRIC GLOW',
    description: 'Atmospheric gas-tube neon sign typography with multi-stage radiant glow halos, electric brightness flickers, and cyan intensity.',
    tags: ['text', 'neon', 'glow', 'electric', 'cyber', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'wave-text',
    name: 'Sinusoidal Harmonic Wave Text',
    componentName: 'WaveText',
    alias: 'WaveText',
    type: 'wave',
    text: 'OCEANIC RHYTHM',
    description: 'Continuous sinusoidal undulating wave passing through individual letters like a smooth floating ribbon.',
    tags: ['text', 'wave', 'sinusoidal', 'harmonic', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.25rem'
  },
  {
    slug: 'reveal-text',
    name: 'Color Bar Curtained Mask Reveal',
    componentName: 'RevealText',
    alias: 'RevealText',
    type: 'reveal',
    text: 'UNVEILED BEAUTY',
    description: 'High-fashion accent color curtain sweeping horizontally across bold typography, unveiling crisp text from darkness.',
    tags: ['text', 'reveal', 'curtain', 'mask', 'framer-motion'],
    speed: 1.0,
    fontSize: '2.5rem'
  },
  {
    slug: 'marquee-text',
    name: 'Infinite Seamless Text Ribbon',
    componentName: 'MarqueeTextRibbon',
    alias: 'MarqueeText',
    type: 'marquee',
    text: 'ZEURALABZ • DESIGN MATRIX',
    description: 'Infinite continuous horizontal ticker tape ribbon streaming smoothly at 60 FPS with gradient typography and dividers.',
    tags: ['text', 'marquee', 'ticker', 'ribbon', 'infinite', 'framer-motion'],
    speed: 1.0,
    fontSize: '2rem'
  }
];

// Mapping for legacy directory compatibility
const dirAliases = {
  'bounce-letters': ['bounce-letters', 'underline-draw'],
  'fade-up': ['fade-up', 'word-swap'],
  'glitch': ['glitch', 'glitch-text'],
  'neon-text': ['neon-text', 'glow-headline'],
  'wave-text': ['wave-text', 'wave-motion'],
  'reveal-text': ['reveal-text', 'mask-reveal'],
};

const engineSrc = path.resolve('components/text-animations/engine/TextEngine.tsx');

for (const comp of textComponents) {
  const dirs = dirAliases[comp.slug] || [comp.slug];

  for (const dirName of dirs) {
    const dirPath = path.resolve(`components/text-animations/${dirName}`);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // Copy local TextEngine.tsx
    fs.copyFileSync(engineSrc, path.join(dirPath, 'TextEngine.tsx'));

    // 1. Generate Component TSX
    const extraProps = comp.words ? `words={${JSON.stringify(comp.words)}}` : comp.targetNumber ? `targetNumber={${comp.targetNumber}}` : '';
    const tsxCode = `import React from 'react';
import { TextEngine, type TextEngineProps } from './TextEngine';

export interface ${comp.componentName}Props extends Partial<TextEngineProps> {}

export const ${comp.componentName}: React.FC<${comp.componentName}Props> = (props) => {
  return (
    <TextEngine
      type="${comp.type}"
      text="${comp.text}"
      speed={${comp.speed}}
      fontSize="${comp.fontSize}"
      fontWeight="900"
      ${extraProps}
      {...props}
    />
  );
};

${comp.alias !== comp.componentName ? `export const ${comp.alias} = ${comp.componentName};\n` : ''}export default ${comp.componentName};
`;

    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.tsx`), tsxCode, 'utf8');
    if (comp.alias !== comp.componentName) {
      fs.writeFileSync(path.join(dirPath, `${comp.alias}.tsx`), `export * from './${comp.componentName}';\nexport { default } from './${comp.componentName}';\n`, 'utf8');
    }

    // 2. Generate CSS
    const cssCode = `.zeura-${comp.slug}-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: radial-gradient(ellipse at center, #111742 0%, #0a0e27 75%, #060817 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.5rem;
  box-sizing: border-box;
}

.zeura-${comp.slug}-text {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: ${comp.fontSize};
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  letter-spacing: -0.02em;
}
`;
    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.css`), cssCode, 'utf8');
    fs.writeFileSync(path.join(dirPath, `${comp.alias}.css`), cssCode, 'utf8');

    // 3. Generate HTML
    const htmlCode = `<div class="zeura-${comp.slug}-container">
  <div class="zeura-${comp.slug}-text">
    ${comp.text}
  </div>
</div>
`;
    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.html`), htmlCode, 'utf8');
    fs.writeFileSync(path.join(dirPath, `${comp.alias}.html`), htmlCode, 'utf8');

    // 4. Generate info.json
    const infoData = {
      name: comp.name,
      slug: comp.slug,
      componentName: comp.componentName,
      category: 'text-animations',
      description: comp.description,
      tags: comp.tags,
      bestFor: ['hero', 'landing', 'features', 'headlines', 'banner'],
      deps: ['framer-motion'],
      previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${comp.slug}`,
      author: 'R. Selva',
      license: 'MIT'
    };
    fs.writeFileSync(path.join(dirPath, 'info.json'), JSON.stringify(infoData, null, 2), 'utf8');
  }
}

console.log('Successfully generated all 15 text animation component files and configs!');
