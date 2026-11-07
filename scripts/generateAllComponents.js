import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allComponents } from './componentsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Minimal 1x1 transparent PNG buffer fallback if canvas isn't present
// Pre-crafted valid PNG with basic dark card preview (1200x675 SVG wrapped in HTML or SVG rendered)
function generatePreviewSvg(comp) {
  const primaryColor = comp.category === 'backgrounds' ? '#6366f1' :
                       comp.category === 'buttons' ? '#ec4899' :
                       comp.category === 'cards' ? '#10b981' :
                       comp.category === 'heroes' ? '#8b5cf6' :
                       comp.category === 'text-animations' ? '#06b6d4' : '#f59e0b';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Subtle Grid Lines -->
  <g stroke="#27272a" stroke-width="1" opacity="0.3">
    <line x1="0" y1="135" x2="1200" y2="135"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>
    <line x1="0" y1="405" x2="1200" y2="405"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="240" y1="0" x2="240" y2="675"/>
    <line x1="480" y1="0" x2="480" y2="675"/>
    <line x1="720" y1="0" x2="720" y2="675"/>
    <line x1="960" y1="0" x2="960" y2="675"/>
  </g>

  <!-- Glowing Accent Orb -->
  <circle cx="600" cy="300" r="180" fill="url(#brandGrad)" opacity="0.15" filter="url(#glow)"/>

  <!-- Card Container -->
  <rect x="250" y="160" width="700" height="340" rx="24" fill="#18181b" stroke="#27272a" stroke-width="2"/>
  
  <!-- Badge -->
  <rect x="290" y="200" width="130" height="32" rx="16" fill="${primaryColor}" opacity="0.2"/>
  <text x="355" y="221" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="${primaryColor}" text-anchor="middle">
    ${comp.category.toUpperCase()}
  </text>

  <!-- Title -->
  <text x="290" y="275" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="700" fill="#f4f4f5">
    ${comp.name}
  </text>

  <!-- Description -->
  <text x="290" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#a1a1aa">
    ${comp.description.length > 70 ? comp.description.substring(0, 67) + '...' : comp.description}
  </text>

  <!-- CLI Command Pill -->
  <rect x="290" y="380" width="380" height="50" rx="12" fill="#09090b" stroke="#3f3f46" stroke-width="1"/>
  <text x="320" y="412" font-family="monospace, Consolas, sans-serif" font-size="15" fill="#38bdf8">
    npx vibe-ui add ${comp.slug}
  </text>

  <!-- Tags Pill Group -->
  <g transform="translate(290, 455)">
    ${comp.tags.slice(0, 3).map((tag, idx) => `
      <rect x="${idx * 110}" y="0" width="95" height="24" rx="12" fill="#27272a"/>
      <text x="${idx * 110 + 47}" y="16" font-family="system-ui, sans-serif" font-size="11" fill="#71717a" text-anchor="middle">#${tag}</text>
    `).join('')}
  </g>

  <!-- Logo in top-left -->
  <text x="60" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
    Vibe<tspan fill="#6366f1">UI</tspan>
  </text>
  <text x="1140" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#71717a" text-anchor="end">
    rselva1202.github.io/vibe-ui
  </text>
</svg>`;
}

// Minimal valid transparent 1x1 GIF buffer
const minimalGifBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
// Minimal valid transparent 1x1 PNG buffer
const minimalPngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

console.log(`Starting generation for ${allComponents.length} components...`);

const registry = [];

for (const comp of allComponents) {
  const compDir = path.join(rootDir, 'components', comp.category, comp.slug);
  ensureDir(compDir);

  const previewUrl = `https://rselva1202.github.io/vibe-ui/preview/${comp.slug}`;

  // 1. React component: <ComponentName>.tsx
  const tsxPath = path.join(compDir, `${comp.componentName}.tsx`);
  fs.writeFileSync(tsxPath, comp.reactCode.trim() + '\n', 'utf8');

  // 2. Pure HTML: <ComponentName>.html
  const htmlPath = path.join(compDir, `${comp.componentName}.html`);
  fs.writeFileSync(htmlPath, comp.htmlCode.trim() + '\n', 'utf8');

  // 3. Pure CSS: <ComponentName>.css
  const cssPath = path.join(compDir, `${comp.componentName}.css`);
  fs.writeFileSync(cssPath, comp.cssCode.trim() + '\n', 'utf8');

  // 4. info.json
  const infoData = {
    name: comp.name,
    slug: comp.slug,
    componentName: comp.componentName,
    category: comp.category,
    description: comp.description,
    tags: comp.tags,
    bestFor: comp.bestFor,
    deps: comp.deps,
    previewUrl: previewUrl,
    author: 'R. Selva',
    license: 'MIT'
  };
  fs.writeFileSync(path.join(compDir, 'info.json'), JSON.stringify(infoData, null, 2) + '\n', 'utf8');

  // 5. preview.svg & preview.png & preview.gif
  const svgData = generatePreviewSvg(comp);
  fs.writeFileSync(path.join(compDir, 'preview.svg'), svgData, 'utf8');
  fs.writeFileSync(path.join(compDir, 'preview.png'), minimalPngBuffer);
  fs.writeFileSync(path.join(compDir, 'preview.gif'), minimalGifBuffer);

  // Add to master registry
  registry.push({
    id: `${comp.category}/${comp.slug}`,
    name: comp.name,
    slug: comp.slug,
    componentName: comp.componentName,
    category: comp.category,
    description: comp.description,
    tags: comp.tags,
    bestFor: comp.bestFor,
    deps: comp.deps,
    files: [
      `components/${comp.category}/${comp.slug}/${comp.componentName}.tsx`,
      `components/${comp.category}/${comp.slug}/${comp.componentName}.html`,
      `components/${comp.category}/${comp.slug}/${comp.componentName}.css`,
      `components/${comp.category}/${comp.slug}/info.json`
    ],
    previewUrl: previewUrl,
    theme: 'dark-neon',
    animation: comp.deps.includes('framer-motion') ? 'framer-motion' : 'css-native'
  });
}

// Write master components.json
const componentsJsonPath = path.join(rootDir, 'components.json');
fs.writeFileSync(componentsJsonPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');

console.log(`Successfully generated ${registry.length} component directories and components.json!`);
