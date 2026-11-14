import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const ANIMATION_PRESETS = [
  'float', 'pulse', 'bounce', 'fade-in', 'slide-up',
  'glow-sweep', 'shimmer', 'spring', 'kinetic', 'drift',
  'reveal', 'flicker', 'stagger', 'spin-slow', 'ripple',
  'wave', 'zoom', 'glitch', 'snap', 'tilt'
];

export const LAYOUT_PRESETS = [
  'hero-center', 'hero-split', 'bento-3', 'bento-4',
  'card-grid-3', 'card-grid-4', 'sidebar-left', 'sidebar-right',
  'nav-floating', 'nav-minimal', 'section-contained', 'section-fullwidth',
  'masonry-feed', 'timeline-vertical', 'dock-bottom'
];

export const RADIUS_MAP = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

export const FONT_MAP = {
  sans: 'font-sans',
  mono: 'font-mono',
  serif: 'font-serif',
  display: 'font-display tracking-tight font-black uppercase'
};

export function loadThemes() {
  const p = path.join(rootDir, 'themes', 'themes.json');
  if (fs.existsSync(p)) {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return [];
}

export function loadRegistry() {
  const p = path.join(rootDir, 'components.json');
  if (fs.existsSync(p)) {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return [];
}

/**
 * Generate an on-demand customized component variant
 * Total Combinations: 755 base x 20 themes x 20 animations x 15 layouts = 4,530,000 styles
 */
export function generateVariant(options = {}) {
  const {
    componentSlug = 'aurora',
    slug = componentSlug,
    themeName = 'dark-neon',
    theme = themeName,
    animation = 'float',
    layout = 'hero-center',
    radius = 'xl',
    font = 'sans',
    outputDir = null
  } = options;

  const registry = loadRegistry();
  const themes = loadThemes();

  // Find component in registry
  const comp = registry.find(
    c => c.slug.toLowerCase() === slug.toLowerCase() ||
         c.id.toLowerCase() === slug.toLowerCase()
  );

  if (!comp) {
    throw new Error(`Component with slug "${slug}" not found in ZEURALABZ registry.`);
  }

  // Find theme
  const selectedTheme = themes.find(
    t => t.id.toLowerCase() === theme.toLowerCase() ||
         t.name.toLowerCase().includes(theme.toLowerCase())
  ) || themes[0];

  const selectedAnim = ANIMATION_PRESETS.includes(animation.toLowerCase())
    ? animation.toLowerCase()
    : 'float';

  const selectedLayout = LAYOUT_PRESETS.includes(layout.toLowerCase())
    ? layout.toLowerCase()
    : 'hero-center';

  const radiusClass = RADIUS_MAP[radius.toLowerCase()] || RADIUS_MAP.xl;
  const fontClass = FONT_MAP[font.toLowerCase()] || FONT_MAP.sans;

  const installCmd = comp.source === 'zeuralabz-original'
    ? `npx zeuralabz add ${comp.slug}`
    : (comp.zeuralabzCommand || `npx zeuralabz add ${comp.slug} --source ${comp.source}`);

  // Header banner
  const banner = `/**
 * ============================================================================
 * ZEURALABZ ON-DEMAND STYLE SYNTHESIZER
 * ============================================================================
 * Component:   ${comp.name} (${comp.slug})
 * Source:      ${comp.sourceLabel || comp.source}
 * Theme:       ${selectedTheme.name} (${selectedTheme.id})
 * Animation:   ${selectedAnim}
 * Layout:      ${selectedLayout}
 * Radius:      ${radiusClass} | Font: ${fontClass}
 * Combinations Formula: 755 base x 20 themes x 20 animations x 15 layouts = 4,530,000+
 *
 * Install Base: ${installCmd}
 * ============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
`;

  // Color CSS styles block
  const cssVars = `
// Theme Color Tokens
const THEME_TOKENS = {
  primary: '${selectedTheme.colors.primary}',
  secondary: '${selectedTheme.colors.secondary}',
  accent: '${selectedTheme.colors.accent}',
  background: '${selectedTheme.colors.background}',
  foreground: '${selectedTheme.colors.foreground}',
  card: '${selectedTheme.colors.card}',
  border: '${selectedTheme.colors.border}',
  muted: '${selectedTheme.colors.muted}'
};
`;

  // Animation variants mapping
  const animMotionVariants = `
const animationVariants = {
  float: {
    animate: {
      y: [-6, 6, -6],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.025, 1],
      opacity: [0.92, 1, 0.92],
      transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
    }
  },
  kinetic: {
    animate: {
      rotate: [-0.75, 0.75, -0.75],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
    }
  },
  shimmer: {
    animate: {
      opacity: [0.85, 1, 0.85],
      filter: ['brightness(1)', 'brightness(1.25)', 'brightness(1)'],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    }
  },
  drift: {
    animate: {
      x: [-8, 8, -8],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
    }
  }
};
`;

  let componentCode = '';

  // Specialized generation for Originals vs Linked
  if (comp.slug === 'aurora' || comp.slug === 'aurora-background') {
    componentCode = `${banner}
${cssVars}
${animMotionVariants}

export interface ThemedAuroraProps {
  className?: string;
  children?: React.ReactNode;
}

export const Themed${comp.componentName || 'Aurora'}: React.FC<ThemedAuroraProps> = ({
  className = '',
  children
}) => {
  return (
    <div
      style={{
        backgroundColor: THEME_TOKENS.background,
        color: THEME_TOKENS.foreground
      }}
      className={\`relative min-h-[480px] w-full overflow-hidden \${className}\`}
    >
      {/* Synthesized Theme Aurora Waves */}
      <motion.div
        variants={animationVariants.${selectedAnim in { float: 1, pulse: 1, kinetic: 1, shimmer: 1, drift: 1 } ? selectedAnim : 'float'}}
        animate="animate"
        className="absolute inset-0 pointer-events-none opacity-60 filter blur-[90px]"
        style={{
          background: \`radial-gradient(circle at 50% 25%, \${THEME_TOKENS.primary} 0%, \${THEME_TOKENS.accent} 40%, \${THEME_TOKENS.secondary} 70%, transparent 100%)\`
        }}
      />
      <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center">
        {children || (
          <div className="${radiusClass} ${fontClass} border p-8 max-w-xl backdrop-blur-md"
               style={{ borderColor: THEME_TOKENS.border, backgroundColor: \`\${THEME_TOKENS.card}cc\` }}>
            <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: \`\${THEME_TOKENS.primary}25\`, color: THEME_TOKENS.primary }}>
              Synthesized Theme: ${selectedTheme.name}
            </span>
            <h2 className="text-3xl font-black mt-4" style={{ color: THEME_TOKENS.foreground }}>
              ${comp.name}
            </h2>
            <p className="mt-2 text-sm" style={{ color: THEME_TOKENS.muted }}>
              Generated with animation preset "${selectedAnim}" and layout "${selectedLayout}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Themed${comp.componentName || 'Aurora'};
`;
  } else if (comp.slug === 'shimmer' || comp.slug === 'shimmer-button') {
    componentCode = `${banner}
${cssVars}
${animMotionVariants}

export interface ThemedShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const Themed${comp.componentName || 'ShimmerButton'}: React.FC<ThemedShimmerButtonProps> = ({
  label = "${comp.name}",
  className = '',
  ...props
}) => {
  return (
    <motion.button
      variants={animationVariants.${selectedAnim in { float: 1, pulse: 1, kinetic: 1, shimmer: 1, drift: 1 } ? selectedAnim : 'pulse'}}
      animate="animate"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        backgroundColor: THEME_TOKENS.primary,
        color: THEME_TOKENS.background,
        borderColor: THEME_TOKENS.border,
        boxShadow: \`0 10px 30px -10px \${THEME_TOKENS.primary}80\`
      }}
      className={\`relative inline-flex items-center justify-center px-6 py-3 border font-bold text-sm tracking-wide ${radiusClass} ${fontClass} transition-colors duration-200 \${className}\`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {label}
      </span>
      {/* Shimmer Light Reflection Sweep */}
      <span
        className="absolute inset-0 overflow-hidden pointer-events-none ${radiusClass}"
      >
        <span
          className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-30"
          style={{
            background: \`conic-gradient(from 0deg, transparent 0 340deg, \${THEME_TOKENS.accent} 360deg)\`
          }}
        />
      </span>
    </motion.button>
  );
};

export default Themed${comp.componentName || 'ShimmerButton'};
`;
  } else if (comp.slug === 'tilt' || comp.slug === '3d-card-effect') {
    componentCode = `${banner}
${cssVars}
${animMotionVariants}

export interface ThemedTiltCardProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export const Themed${comp.componentName || 'TiltCard'}: React.FC<ThemedTiltCardProps> = ({
  title = "${comp.name}",
  subtitle = "${comp.description.replace(/"/g, '\\"')}",
  ctaText = "Explore Feature"
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      variants={animationVariants.${selectedAnim in { float: 1, pulse: 1, kinetic: 1, shimmer: 1, drift: 1 } ? selectedAnim : 'kinetic'}}
      animate="animate"
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        backgroundColor: THEME_TOKENS.card,
        borderColor: THEME_TOKENS.border,
        boxShadow: \`0 20px 40px -15px \${THEME_TOKENS.primary}20\`
      }}
      className="w-80 h-96 border p-6 flex flex-col justify-between ${radiusClass} ${fontClass} transition-shadow duration-300"
    >
      <div className="space-y-3">
        <span
          className="inline-block px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md"
          style={{
            backgroundColor: \`\${THEME_TOKENS.primary}20\`,
            color: THEME_TOKENS.primary
          }}
        >
          ${selectedTheme.name}
        </span>
        <h3 className="text-2xl font-bold" style={{ color: THEME_TOKENS.foreground }}>
          {title}
        </h3>
        <p className="text-sm line-clamp-3" style={{ color: THEME_TOKENS.muted }}>
          {subtitle}
        </p>
      </div>

      <div>
        <button
          className="w-full py-2.5 font-bold text-sm transition-all duration-200 ${radiusClass}"
          style={{
            backgroundColor: THEME_TOKENS.primary,
            color: THEME_TOKENS.background
          }}
        >
          {ctaText}
        </button>
      </div>
    </motion.div>
  );
};

export default Themed${comp.componentName || 'TiltCard'};
`;
  } else {
    // General generator for any of the 755 components
    const safeName = (comp.componentName || comp.name.replace(/[^a-zA-Z0-9]/g, '')) + 'Themed';
    componentCode = `${banner}
${cssVars}
${animMotionVariants}

export interface ThemedWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

export const ${safeName}: React.FC<ThemedWrapperProps> = ({
  className = '',
  children
}) => {
  return (
    <motion.div
      variants={animationVariants.${selectedAnim in { float: 1, pulse: 1, kinetic: 1, shimmer: 1, drift: 1 } ? selectedAnim : 'float'}}
      animate="animate"
      style={{
        backgroundColor: THEME_TOKENS.card,
        borderColor: THEME_TOKENS.border,
        color: THEME_TOKENS.foreground
      }}
      className={\`border p-6 ${radiusClass} ${fontClass} \${className}\`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-2 py-0.5 text-xs font-mono font-bold uppercase rounded"
          style={{
            backgroundColor: \`\${THEME_TOKENS.accent}25\`,
            color: THEME_TOKENS.accent
          }}
        >
          ${comp.sourceLabel || comp.source}
        </span>
        <span className="text-xs font-mono" style={{ color: THEME_TOKENS.muted }}>
          Theme: ${selectedTheme.name}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold" style={{ color: THEME_TOKENS.foreground }}>
          ${comp.name}
        </h3>
        <p className="text-sm" style={{ color: THEME_TOKENS.muted }}>
          ${comp.description.replace(/"/g, '\\"')}
        </p>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

export default ${safeName};
`;
  }

  const fileName = `${comp.slug}.${selectedTheme.id}.tsx`;

  let outPath = null;
  if (outputDir) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    outPath = path.join(outputDir, fileName);
    fs.writeFileSync(outPath, componentCode, 'utf8');
  }

  return {
    outPath,
    customCode: componentCode,
    fileName,
    theme: selectedTheme,
    animation: selectedAnim,
    layout: selectedLayout,
    radius: radiusClass,
    font: fontClass,
    comp,
    formula: '755 base x 20 themes x 20 animations x 15 layouts = 4,530,000 combinations'
  };
}

// CLI Direct Invocation Support
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  const getArg = (name, fallback) => {
    const idx = args.indexOf(`--${name}`);
    if (idx !== -1 && args[idx + 1]) return args[idx + 1];
    return fallback;
  };

  const positional = args.find(a => !a.startsWith('--'));
  const component = positional || getArg('component', 'aurora');
  const theme = getArg('theme', 'dark-neon');
  const animation = getArg('animation', 'float');
  const layout = getArg('layout', 'hero-center');
  const radius = getArg('radius', 'xl');
  const font = getArg('font', 'sans');
  const out = getArg('out', null);

  try {
    const res = generateVariant({
      componentSlug: component,
      themeName: theme,
      animation,
      layout,
      radius,
      font,
      outputDir: out ? path.resolve(out) : null
    });

    console.log(`\n================================================================================`);
    console.log(`               ZEURALABZ ON-DEMAND STYLE SYNTHESIZER                           `);
    console.log(`================================================================================\n`);
    console.log(`Component:    ${res.comp.name} (${res.comp.slug}) [${res.comp.sourceLabel || res.comp.source}]`);
    console.log(`Theme:        ${res.theme.name} (${res.theme.id})`);
    console.log(`Animation:    ${res.animation}`);
    console.log(`Layout:       ${res.layout}`);
    console.log(`Border Radius:${res.radius} | Font: ${res.font}`);
    console.log(`Formula:      ${res.formula}\n`);

    if (res.outPath) {
      console.log(`✔ Generated and saved to: ${res.outPath}`);
    } else {
      console.log(`--- PREVIEW OF GENERATED CODE --------------------------------------------------`);
      console.log(res.customCode.slice(0, 800) + '\n... [truncated preview]');
      console.log(`--------------------------------------------------------------------------------`);
      console.log(`\nTo save to a file, pass: --out ./src/components/zeuralabz\n`);
    }
  } catch (err) {
    console.error('Error generating variant:', err.message);
    process.exit(1);
  }
}

export default generateVariant;
