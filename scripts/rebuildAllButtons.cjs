const fs = require('fs');
const path = require('path');

const buttonComponents = [
  {
    slug: 'gradient',
    name: 'Iridescent Flow Gradient Button',
    componentName: 'GradientButton',
    alias: 'Gradient',
    variant: 'gradient',
    text: 'Iridescent Flow',
    description: 'Vibrant continuous chromatic animated gradient button with dynamic luminosity bloom and responsive hover physics.',
    tags: ['button', 'gradient', 'iridescent', 'chromatic', 'framer-motion']
  },
  {
    slug: 'neon',
    name: 'Cyberpunk Pulse Neon Button',
    componentName: 'NeonButton',
    alias: 'Neon',
    variant: 'neon',
    text: 'Cyber Neon Pulse',
    description: 'Electric neon perimeter glow with pulsing multi-stage ambient halos and high-contrast cyberpunk typography.',
    tags: ['button', 'neon', 'cyberpunk', 'glow', 'framer-motion']
  },
  {
    slug: 'magnetic',
    name: 'Cursor Gravity Magnetic Button',
    componentName: 'MagneticButton',
    alias: 'Magnetic',
    variant: 'magnetic',
    text: 'Cursor Gravity',
    description: 'Physics-based interactive cursor attractor using Framer Motion springs to dynamically pull toward pointer coordinates.',
    tags: ['button', 'magnetic', 'cursor', 'spring', 'framer-motion']
  },
  {
    slug: 'shimmer',
    name: 'Specular Sweep Shimmer Button',
    componentName: 'ShimmerButton',
    alias: 'Shimmer',
    variant: 'shimmer',
    text: 'Specular Shimmer',
    description: 'High-velocity 45° specular light beam sweeping across polished dark surface with metallic border highlights.',
    tags: ['button', 'shimmer', 'metallic', 'specular', 'framer-motion']
  },
  {
    slug: '3d',
    name: 'Tactile Isometric 3D Push Button',
    componentName: 'ThreeDButton',
    alias: 'ThreeD',
    variant: '3d',
    text: '3D Tactile Push',
    description: 'Physical mechanical switch feel with isometric bottom ledge bevel and spring-compressed downward displacement.',
    tags: ['button', '3d', 'tactile', 'push', 'mechanical']
  },
  {
    slug: 'outline-fill',
    name: 'Prism Slide Outline Fill Button',
    componentName: 'OutlineFillButton',
    alias: 'OutlineFill',
    variant: 'outline-fill',
    text: 'Prism Sweep',
    description: 'Sleek geometric wireframe border that dynamically flood-fills with vibrant linear gradient curtain on hover.',
    tags: ['button', 'outline', 'fill', 'hover', 'framer-motion']
  },
  {
    slug: 'loading',
    name: 'Asynchronous State Loading Button',
    componentName: 'LoadingButton',
    alias: 'Loading',
    variant: 'loading',
    text: 'Async Action',
    description: 'Interactive stateful action button displaying animated SVG spinner, orbital progress ring, and state transitions.',
    tags: ['button', 'loading', 'async', 'spinner', 'stateful']
  },
  {
    slug: 'icon',
    name: 'Dynamic Kinetic Icon Button',
    componentName: 'IconButton',
    alias: 'Icon',
    variant: 'icon',
    text: 'Creative Spark',
    description: 'Harmonious iconography with spring-loaded rotational micro-interactions and tactile scale rebound on hover.',
    tags: ['button', 'icon', 'micro-interaction', 'spring', 'framer-motion']
  },
  {
    slug: 'social',
    name: 'Developer Social Connect Button',
    componentName: 'SocialButton',
    alias: 'Social',
    variant: 'social',
    text: 'GitHub Star',
    description: 'Modern developer badge button with authentic brand iconography, live star counter badge, and levitation lift.',
    tags: ['button', 'social', 'github', 'badge', 'framer-motion']
  },
  {
    slug: 'glass-btn',
    name: 'Frosted Refractive Glass Button',
    componentName: 'GlassButton',
    alias: 'Glass',
    variant: 'glass-btn',
    text: 'Liquid Glass',
    description: 'Ultra-luxurious frosted glassmorphism with backdrop blur, specular border reflections, and inner lighting glow.',
    tags: ['button', 'glass', 'glassmorphism', 'frosted', 'blur']
  },
  {
    slug: 'glow',
    name: 'Ambient Radial Backlit Glow Button',
    componentName: 'GlowButton',
    alias: 'Glow',
    variant: 'glow',
    text: 'Ambient Radiant Glow',
    description: 'Diffused radial background bloom that softly breathes in the dark and bursts with chromatic intensity on hover.',
    tags: ['button', 'glow', 'ambient', 'backlit', 'framer-motion']
  },
  {
    slug: 'pill',
    name: 'Ergonomic Capsule Pill Button',
    componentName: 'PillButton',
    alias: 'Pill',
    variant: 'pill',
    text: 'Sleek Capsule',
    description: 'Full border-radius ergonomic capsule with violet accent perimeter ring, refined typography, and subtle scale.',
    tags: ['button', 'pill', 'capsule', 'rounded', 'minimal']
  },
  {
    slug: 'arrow',
    name: 'Kinetic Directional Arrow Button',
    componentName: 'ArrowButton',
    alias: 'Arrow',
    variant: 'arrow',
    text: 'Launch Matrix',
    description: 'Kinetic conversion trigger with directional arrow gliding forward dynamically on hover with spring recovery.',
    tags: ['button', 'arrow', 'cta', 'kinetic', 'framer-motion']
  },
  {
    slug: 'play',
    name: 'Pulsing Concentric Ripple Play Button',
    componentName: 'PlayButton',
    alias: 'Play',
    variant: 'play',
    text: 'Play Video',
    description: 'Media playback button featuring expanding concentric ripple rings and toggleable play/pause status states.',
    tags: ['button', 'play', 'media', 'ripple', 'pulse']
  },
  {
    slug: 'download',
    name: 'Kinetic Progress Download Button',
    componentName: 'DownloadButton',
    alias: 'Download',
    variant: 'download',
    text: 'Download Asset',
    description: 'Action-oriented download trigger featuring downward kinetic arrow, progress beam animation, and success checkmark.',
    tags: ['button', 'download', 'progress', 'action', 'stateful']
  }
];

// Mapping for legacy directory compatibility
const dirAliases = {
  'icon': ['icon', 'icon-morph'],
  'social': ['social', 'cyber-glitch'],
  'glow': ['glow', 'border-beam'],
  'pill': ['pill', 'ripple'],
  'arrow': ['arrow', 'swipe-arrow'],
  'play': ['play', 'confetti'],
  'download': ['download', 'copy-snippet']
};

const engineSrc = path.resolve('components/buttons/engine/BaseButton.tsx');

for (const comp of buttonComponents) {
  const dirs = dirAliases[comp.slug] || [comp.slug];

  for (const dirName of dirs) {
    const dirPath = path.resolve(`components/buttons/${dirName}`);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // Copy local BaseButton.tsx for self-contained installation
    fs.copyFileSync(engineSrc, path.join(dirPath, 'BaseButton.tsx'));

    // 1. Generate Component TSX
    const tsxCode = `import React from 'react';
import { BaseButton, type BaseButtonProps } from './BaseButton';

export interface ${comp.componentName}Props extends Partial<BaseButtonProps> {}

export const ${comp.componentName}: React.FC<${comp.componentName}Props> = (props) => {
  return (
    <BaseButton
      variant="${comp.variant}"
      text="${comp.text}"
      {...props}
    />
  );
};

${comp.alias !== comp.componentName ? `export const ${comp.alias} = ${comp.componentName};\n` : ''}export default ${comp.componentName};
`;

    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.tsx`), tsxCode, 'utf8');
    if (comp.alias !== comp.componentName) {
      fs.writeFileSync(
        path.join(dirPath, `${comp.alias}.tsx`),
        `export * from './${comp.componentName}';\nexport { default } from './${comp.componentName}';\n`,
        'utf8'
      );
    }

    // 2. Generate CSS
    const cssCode = `.zeura-btn-${comp.slug} {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.zeura-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  background: radial-gradient(ellipse at center, #111742 0%, #0a0e27 75%, #060817 100%);
  padding: 1.5rem;
}
`;
    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.css`), cssCode, 'utf8');

    // 3. Generate HTML
    const htmlCode = `<div class="zeura-btn-container">
  <button class="zeura-btn-${comp.slug}">
    <span>${comp.text}</span>
  </button>
</div>
`;
    fs.writeFileSync(path.join(dirPath, `${comp.componentName}.html`), htmlCode, 'utf8');

    // 4. Generate info.json
    const info = {
      name: comp.name,
      slug: comp.slug,
      componentName: comp.componentName,
      category: 'buttons',
      description: comp.description,
      tags: comp.tags,
      bestFor: ['hero', 'landing', 'cta', 'interactive'],
      deps: ['framer-motion'],
      previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${comp.slug}`,
      author: 'R. Selva',
      license: 'MIT',
      engine: 'BaseButton'
    };
    fs.writeFileSync(path.join(dirPath, 'info.json'), JSON.stringify(info, null, 2), 'utf8');
  }
}

console.log('Successfully generated all 15 button component files and configs!');

