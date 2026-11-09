const fs = require('fs');

const buttonComponents = [
  {
    slug: 'gradient',
    name: 'Iridescent Flow Gradient Button',
    componentName: 'GradientButton',
    description: 'Vibrant continuous chromatic animated gradient button with dynamic luminosity bloom and responsive hover physics.',
    tags: ['button', 'gradient', 'iridescent', 'chromatic', 'framer-motion'],
    dir: 'gradient'
  },
  {
    slug: 'neon',
    name: 'Cyberpunk Pulse Neon Button',
    componentName: 'NeonButton',
    description: 'Electric neon perimeter glow with pulsing multi-stage ambient halos and high-contrast cyberpunk typography.',
    tags: ['button', 'neon', 'cyberpunk', 'glow', 'framer-motion'],
    dir: 'neon'
  },
  {
    slug: 'magnetic',
    name: 'Cursor Gravity Magnetic Button',
    componentName: 'MagneticButton',
    description: 'Physics-based interactive cursor attractor using Framer Motion springs to dynamically pull toward pointer coordinates.',
    tags: ['button', 'magnetic', 'cursor', 'spring', 'framer-motion'],
    dir: 'magnetic'
  },
  {
    slug: 'shimmer',
    name: 'Specular Sweep Shimmer Button',
    componentName: 'ShimmerButton',
    description: 'High-velocity 45° specular light beam sweeping across polished dark surface with metallic border highlights.',
    tags: ['button', 'shimmer', 'metallic', 'specular', 'framer-motion'],
    dir: 'shimmer'
  },
  {
    slug: '3d',
    name: 'Tactile Isometric 3D Push Button',
    componentName: 'ThreeDButton',
    description: 'Physical mechanical switch feel with isometric bottom ledge bevel and spring-compressed downward displacement.',
    tags: ['button', '3d', 'tactile', 'push', 'mechanical'],
    dir: '3d'
  },
  {
    slug: 'outline-fill',
    name: 'Prism Slide Outline Fill Button',
    componentName: 'OutlineFillButton',
    description: 'Sleek geometric wireframe border that dynamically flood-fills with vibrant linear gradient curtain on hover.',
    tags: ['button', 'outline', 'fill', 'hover', 'framer-motion'],
    dir: 'outline-fill'
  },
  {
    slug: 'loading',
    name: 'Asynchronous State Loading Button',
    componentName: 'LoadingButton',
    description: 'Interactive stateful action button displaying animated SVG spinner, orbital progress ring, and state transitions.',
    tags: ['button', 'loading', 'async', 'spinner', 'stateful'],
    dir: 'loading'
  },
  {
    slug: 'icon',
    name: 'Dynamic Kinetic Icon Button',
    componentName: 'IconButton',
    description: 'Harmonious iconography with spring-loaded rotational micro-interactions and tactile scale rebound on hover.',
    tags: ['button', 'icon', 'micro-interaction', 'spring', 'framer-motion'],
    dir: 'icon'
  },
  {
    slug: 'social',
    name: 'Developer Social Connect Button',
    componentName: 'SocialButton',
    description: 'Modern developer badge button with authentic brand iconography, live star counter badge, and levitation lift.',
    tags: ['button', 'social', 'github', 'badge', 'framer-motion'],
    dir: 'social'
  },
  {
    slug: 'glass-btn',
    name: 'Frosted Refractive Glass Button',
    componentName: 'GlassButton',
    description: 'Ultra-luxurious frosted glassmorphism with backdrop blur, specular border reflections, and inner lighting glow.',
    tags: ['button', 'glass', 'glassmorphism', 'frosted', 'blur'],
    dir: 'glass-btn'
  },
  {
    slug: 'glow',
    name: 'Ambient Radial Backlit Glow Button',
    componentName: 'GlowButton',
    description: 'Diffused radial background bloom that softly breathes in the dark and bursts with chromatic intensity on hover.',
    tags: ['button', 'glow', 'ambient', 'backlit', 'framer-motion'],
    dir: 'glow'
  },
  {
    slug: 'pill',
    name: 'Ergonomic Capsule Pill Button',
    componentName: 'PillButton',
    description: 'Full border-radius ergonomic capsule with violet accent perimeter ring, refined typography, and subtle scale.',
    tags: ['button', 'pill', 'capsule', 'rounded', 'minimal'],
    dir: 'pill'
  },
  {
    slug: 'arrow',
    name: 'Kinetic Directional Arrow Button',
    componentName: 'ArrowButton',
    description: 'Kinetic conversion trigger with directional arrow gliding forward dynamically on hover with spring recovery.',
    tags: ['button', 'arrow', 'cta', 'kinetic', 'framer-motion'],
    dir: 'arrow'
  },
  {
    slug: 'play',
    name: 'Pulsing Concentric Ripple Play Button',
    componentName: 'PlayButton',
    description: 'Media playback button featuring expanding concentric ripple rings and toggleable play/pause status states.',
    tags: ['button', 'play', 'media', 'ripple', 'pulse'],
    dir: 'play'
  },
  {
    slug: 'download',
    name: 'Kinetic Progress Download Button',
    componentName: 'DownloadButton',
    description: 'Action-oriented download trigger featuring downward kinetic arrow, progress beam animation, and success checkmark.',
    tags: ['button', 'download', 'progress', 'action', 'stateful'],
    dir: 'download'
  }
];

function updateRegistry(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const registry = JSON.parse(content);

  // Filter out existing button entries
  const nonButtons = registry.filter((c) => c.category !== 'buttons');

  const newButtons = buttonComponents.map((c) => ({
    name: c.name,
    slug: c.slug,
    componentName: c.componentName,
    category: 'buttons',
    description: c.description,
    tags: c.tags,
    bestFor: ['hero', 'landing', 'cta', 'interactive'],
    deps: ['framer-motion'],
    files: [
      `components/buttons/${c.dir}/${c.componentName}.tsx`,
      `components/buttons/${c.dir}/BaseButton.tsx`,
      `components/buttons/${c.dir}/${c.componentName}.css`,
      `components/buttons/${c.dir}/${c.componentName}.html`,
      `components/buttons/${c.dir}/info.json`
    ],
    previewUrl: `https://rselva1202.github.io/zeuralabz/preview/${c.slug}`,
    previewPng: `/previews/${c.slug}.png`,
    previewGif: `/previews/${c.slug}.gif`,
    previewSvg: `/previews/${c.slug}.svg`
  }));

  const updated = [...nonButtons, ...newButtons];
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`Updated ${filePath}: now has ${updated.length} components (${newButtons.length} buttons)`);
}

updateRegistry('components.json');
updateRegistry('preview-site/src/data/components.json');

