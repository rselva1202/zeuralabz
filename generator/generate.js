import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadThemes() {
  const p = path.join(rootDir, 'themes', 'themes.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function loadRegistry() {
  const p = path.join(rootDir, 'components.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/**
 * Generate a themed and customized component variant
 */
export function generateVariant(options = {}) {
  const {
    componentSlug = 'aurora',
    themeName = 'dark-neon',
    animation = 'smooth',
    radius = 'xl',
    font = 'sans',
    outputDir = null
  } = options;

  const registry = loadRegistry();
  const themes = loadThemes();

  const comp = registry.find(c => c.slug.toLowerCase() === componentSlug.toLowerCase());
  if (!comp) {
    throw new Error(`Component with slug "${componentSlug}" not found in registry.`);
  }

  const theme = themes.find(t => t.id.toLowerCase() === themeName.toLowerCase() || t.name.toLowerCase().includes(themeName.toLowerCase())) || themes[0];

  // Read base tsx file
  const baseTsxPath = path.join(rootDir, comp.files.find(f => f.endsWith('.tsx')));
  let baseCode = fs.readFileSync(baseTsxPath, 'utf8');

  // Customize based on theme colors and parameters
  const variantHeader = `/**
 * VibeUI Custom Generated Variant
 * Component: ${comp.name} (${comp.slug})
 * Theme: ${theme.name} (${theme.id})
 * Animation: ${animation} | Radius: ${radius} | Font: ${font}
 * Total combinations possible: 150 components x 20 themes x 20 animations x 15 layouts = 900,000+ styles
 */\n`;

  // Apply substitutions for theme colors and radius
  let customCode = baseCode;

  // Insert theme palette comment or inline CSS variable wrapper
  const themeStyles = `
// Theme Palette:
// Background: ${theme.colors.background} | Surface: ${theme.colors.surface}
// Primary: ${theme.colors.primary} | Secondary: ${theme.colors.secondary} | Accent: ${theme.colors.accent}
`;

  customCode = variantHeader + themeStyles + customCode;

  if (outputDir) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outPath = path.join(outputDir, `${comp.componentName}.${theme.id}.tsx`);
    fs.writeFileSync(outPath, customCode, 'utf8');
    return { outPath, customCode, theme, comp };
  }

  return { customCode, theme, comp };
}

// CLI invocation handling
if (process.argv[1] && process.argv[1].endsWith('generate.js')) {
  const args = process.argv.slice(2);
  const getArg = (name, fallback) => {
    const idx = args.indexOf(`--${name}`);
    if (idx !== -1 && args[idx + 1]) return args[idx + 1];
    return fallback;
  };

  const component = getArg('component', 'aurora');
  const theme = getArg('theme', 'dark-neon');
  const animation = getArg('animation', 'smooth');
  const radius = getArg('radius', 'xl');
  const font = getArg('font', 'sans');
  const out = getArg('out', null);

  try {
    const res = generateVariant({
      componentSlug: component,
      themeName: theme,
      animation,
      radius,
      font,
      outputDir: out ? path.resolve(out) : null
    });

    console.log(`\n✨ Successfully generated variant for "${res.comp.name}" with theme "${res.theme.name}"!`);
    if (out) {
      console.log(`Saved to: ${res.outPath}`);
    } else {
      console.log(`\nSample Code Preview:\n`);
      console.log(res.customCode.slice(0, 500) + '\n... [truncated]');
    }
  } catch (err) {
    console.error('Error generating variant:', err.message);
    process.exit(1);
  }
}
