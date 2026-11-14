import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load components registry
function loadRegistry() {
  const regPath = path.join(rootDir, 'components.json');
  if (fs.existsSync(regPath)) {
    try {
      return JSON.parse(fs.readFileSync(regPath, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Analyze a target project directory
 * @param {string} targetDir Directory to analyze (defaults to cwd)
 * @returns {object} Analysis result with stack, persona, missing sections, and recommendations
 */
export function analyzeProject(targetDir = process.cwd()) {
  const registry = loadRegistry();

  const result = {
    targetDir: path.resolve(targetDir),
    framework: 'Unknown',
    buildTool: 'Unknown',
    styling: 'Not Detected',
    tailwind: 'Not Detected',
    motion: 'None',
    typescript: false,
    projectType: 'saas', // default fallback
    confidence: 'medium',
    detectedMissing: [],
    recommendations: []
  };

  const pkgPath = path.join(targetDir, 'package.json');
  let pkg = {};
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {
      // ignore JSON parse failure
    }
  }

  const allDeps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {})
  };

  // 1. Detect Framework & Build Tool
  if (allDeps['next']) {
    result.framework = 'Next.js';
    const isAppRouter = fs.existsSync(path.join(targetDir, 'app')) ||
                        fs.existsSync(path.join(targetDir, 'src', 'app'));
    if (isAppRouter) {
      result.framework = 'Next.js (App Router)';
    } else {
      result.framework = 'Next.js (Pages Router)';
    }
    result.buildTool = allDeps['turbopack'] ? 'Turbopack' : 'Next.js Compiler';
  } else if (allDeps['vite']) {
    result.framework = allDeps['react'] ? 'React + Vite' : 'Vite';
    result.buildTool = 'Vite';
  } else if (allDeps['astro']) {
    result.framework = 'Astro';
    result.buildTool = 'Astro Compiler / Vite';
  } else if (allDeps['@remix-run/react'] || allDeps['remix']) {
    result.framework = 'Remix';
    result.buildTool = 'Vite / Remix';
  } else if (allDeps['gatsby']) {
    result.framework = 'Gatsby';
    result.buildTool = 'Webpack';
  } else if (allDeps['react-scripts']) {
    result.framework = 'Create React App';
    result.buildTool = 'Webpack';
  } else if (allDeps['react']) {
    result.framework = 'React';
    result.buildTool = 'Custom / Bundler';
  }

  // 2. Detect TypeScript
  if (
    allDeps['typescript'] ||
    fs.existsSync(path.join(targetDir, 'tsconfig.json')) ||
    fs.existsSync(path.join(targetDir, 'src', 'App.tsx')) ||
    fs.existsSync(path.join(targetDir, 'App.tsx'))
  ) {
    result.typescript = true;
  }

  // 3. Detect Styling & Tailwind
  if (allDeps['tailwindcss']) {
    const twVer = String(allDeps['tailwindcss'] || '');
    if (twVer.includes('4') || allDeps['@tailwindcss/vite'] || allDeps['@tailwindcss/postcss']) {
      result.styling = 'Tailwind CSS v4';
      result.tailwind = 'Tailwind CSS v4';
    } else {
      result.styling = 'Tailwind CSS v3';
      result.tailwind = 'Tailwind CSS v3';
    }
  } else if (
    fs.existsSync(path.join(targetDir, 'tailwind.config.js')) ||
    fs.existsSync(path.join(targetDir, 'tailwind.config.ts')) ||
    fs.existsSync(path.join(targetDir, 'tailwind.config.mjs'))
  ) {
    result.styling = 'Tailwind CSS';
    result.tailwind = 'Tailwind CSS';
  } else if (allDeps['styled-components']) {
    result.styling = 'styled-components';
  } else if (allDeps['@emotion/react']) {
    result.styling = 'Emotion';
  } else {
    result.styling = 'CSS Modules / Vanilla CSS';
  }

  // 4. Detect Motion / Animation Libraries
  if (allDeps['motion'] || allDeps['framer-motion']) {
    const fmVer = String(allDeps['framer-motion'] || allDeps['motion'] || '');
    if (fmVer.includes('12') || allDeps['motion']) {
      result.motion = 'Framer Motion v12 / motion';
    } else {
      result.motion = 'Framer Motion v11';
    }
  } else if (allDeps['gsap']) {
    result.motion = 'GSAP';
  } else if (allDeps['three'] || allDeps['@react-three/fiber']) {
    result.motion = 'Three.js / React Three Fiber';
  } else {
    result.motion = 'None (CSS Animations Only)';
  }

  // 5. Detect Persona
  const scores = {
    saas: 0,
    portfolio: 0,
    dashboard: 0,
    ecommerce: 0,
    restaurant: 0,
    agency: 0,
    blog: 0
  };

  const pkgText = `${pkg.name || ''} ${pkg.description || ''} ${(pkg.keywords || []).join(' ')}`.toLowerCase();
  
  let readmeText = '';
  const readmeFiles = ['README.md', 'readme.md', 'README'];
  for (const f of readmeFiles) {
    const p = path.join(targetDir, f);
    if (fs.existsSync(p)) {
      try {
        readmeText = fs.readFileSync(p, 'utf8').toLowerCase();
        break;
      } catch {}
    }
  }

  const combined = `${pkgText} ${readmeText}`;

  // SaaS cues
  if (/saas|subscription|billing|stripe|workspace|b2b|platform|ai tool|api|pricing|mcp/.test(combined)) scores.saas += 4;
  if (/auth|clerk|supabase|next-auth/.test(JSON.stringify(allDeps))) scores.saas += 2;

  // Portfolio cues
  if (/portfolio|resume|cv|personal website|developer|designer|showcase|bio|projects/.test(combined)) scores.portfolio += 4;

  // Dashboard cues
  if (/dashboard|admin|analytics|crm|metrics|charts|portal|telemetry|kpi/.test(combined)) scores.dashboard += 4;
  if (/recharts|chart\.js|d3|@tanstack\/react-table/.test(JSON.stringify(allDeps))) scores.dashboard += 3;

  // E-commerce cues
  if (/ecommerce|shop|cart|checkout|store|products|storefront|shopify|order/.test(combined)) scores.ecommerce += 4;

  // Restaurant cues
  if (/restaurant|cafe|food|menu|dining|bistro|culinary|chef|reservation|hospitality/.test(combined)) scores.restaurant += 4;

  // Agency cues
  if (/agency|studio|consulting|client work|creative agency/.test(combined)) scores.agency += 4;

  // Blog cues
  if (/blog|posts|articles|editorial|news|newsletter|magazine/.test(combined)) scores.blog += 4;

  // Inspect directory names
  const checkDir = (sub) => fs.existsSync(path.join(targetDir, sub));
  if (checkDir('src/app/(dashboard)') || checkDir('pages/dashboard') || checkDir('src/components/dashboard')) scores.dashboard += 4;
  if (checkDir('src/components/cart') || checkDir('pages/products') || checkDir('app/shop')) scores.ecommerce += 4;
  if (checkDir('src/components/menu') || checkDir('pages/reservations')) scores.restaurant += 4;
  if (checkDir('pages/portfolio') || checkDir('src/components/projects')) scores.portfolio += 4;

  let bestType = 'saas';
  let bestScore = -1;
  for (const [type, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }
  result.projectType = bestType;
  result.confidence = bestScore >= 4 ? 'high' : bestScore >= 2 ? 'medium' : 'low';

  // 6. Detect Missing Sections
  result.detectedMissing = [
    {
      section: 'Background',
      reason: 'No dynamic background canvas detected. Modern applications use subtle ambient shader waves, mesh gradients, or particle grids.'
    },
    {
      section: 'Hero Headline',
      reason: 'Hero headline lacks dynamic motion. Staggered character reveal, shiny gradient sweep, or rotating words elevate first impressions.'
    },
    {
      section: 'Feature Cards',
      reason: 'Feature highlights look flat. 3D tilt, spotlight illumination, or bento layout organizes value propositions with interactive depth.'
    },
    {
      section: 'Buttons & CTAs',
      reason: 'Primary conversion buttons are standard. Specular shimmer, magnetic cursor attraction, or glowing borders dramatically boost click-through.'
    },
    {
      section: 'Polish & Loaders',
      reason: 'Missing interactive micro-interactions. Continuous partner logo marquees, interactive progress rings, or cursor trails provide visual polish.'
    }
  ];

  // Helper to pick exact component
  const findComp = (slug, preferredSource) => {
    let match = null;
    if (preferredSource) {
      match = registry.find(c => c.slug === slug && c.source === preferredSource);
    }
    if (!match) {
      match = registry.find(c => c.slug === slug);
    }
    return match;
  };

  const createRec = (section, slug, preferredSource, why) => {
    let item = findComp(slug, preferredSource);
    if (!item) {
      // Fallback to any item in registry with this slug or similar
      item = registry.find(c => c.slug && c.slug.includes(slug)) || registry[0];
    }

    const src = item.source || 'zeuralabz-original';
    const sourceLabel = item.sourceLabel || (
      src === 'react-bits' ? 'React Bits • MIT + Commons' :
      src === 'magic-ui' ? 'Magic UI • MIT' :
      src === 'aceternity' ? 'Aceternity • MIT' :
      src === 'lightswind' ? 'Lightswind • MIT (linked, free only)' :
      src === '21st-dev' ? `21st.dev • Per-author (@${item.author || 'community'})` :
      'ZEURALABZ Original • MIT'
    );

    const zeuralabzCmd = src === 'zeuralabz-original'
      ? `npx zeuralabz add ${item.slug}`
      : `npx zeuralabz add ${item.slug} --source ${src}`;

    return {
      section,
      name: item.name || slug,
      slug: item.slug,
      source: src,
      sourceLabel,
      why,
      originalUrl: item.originalUrl || item.previewUrl || 'https://rselva1202.github.io/zeuralabz/',
      previewUrl: item.previewUrl || item.originalUrl || 'https://rselva1202.github.io/zeuralabz/',
      installCommand: item.installCommand || zeuralabzCmd,
      zeuralabzCommand: zeuralabzCmd
    };
  };

  // 7. Curated One-Best-Pick per Section across all 4 sources tailored to persona
  if (result.projectType === 'saas') {
    result.recommendations = [
      createRec(
        'Background',
        'aurora-background',
        'aceternity',
        'Soft ambient aurora shader waves create an ultra-modern dark aesthetic without distracting from high-contrast analytics copy.'
      ),
      createRec(
        'Hero Headline',
        'animated-shiny-text',
        'magic-ui',
        'Light reflection sweep highlights primary product value proposition with subtle metallic elegance.'
      ),
      createRec(
        'Feature Cards',
        'bento',
        'zeuralabz-original',
        'Asymmetrical modular bento layout organizes dense multi-tier SaaS features with smooth responsive hover states.'
      ),
      createRec(
        'Buttons & CTAs',
        'shimmer-button',
        'magic-ui',
        'High-converting primary action button featuring continuous specular reflection along the rim.'
      ),
      createRec(
        'Polish & Loaders',
        'logo-loop',
        'react-bits',
        'Infinite seamless ribbon displays customer logos and social proof badges smoothly.'
      )
    ];
  } else if (result.projectType === 'portfolio') {
    result.recommendations = [
      createRec(
        'Background',
        'pixel-trail',
        'react-bits',
        'Playful reactive cursor trail draws pixelated sparks as visitors explore your technical projects.'
      ),
      createRec(
        'Hero Headline',
        'split-text',
        'react-bits',
        'Cinematic character-by-character spring physics reveal immediately hooks visitors on your personal bio.'
      ),
      createRec(
        'Feature Cards',
        '3d-card-effect',
        'aceternity',
        'Parallax 3D tilt geometry projects project preview screenshots outward toward the user cursor.'
      ),
      createRec(
        'Buttons & CTAs',
        'magnet',
        'react-bits',
        'Tactile magnetic button gently draws toward pointer coordinates for an unforgettable micro-interaction.'
      ),
      createRec(
        'Polish & Loaders',
        'circular',
        'zeuralabz-original',
        'Smooth SVG circular dash animation for asynchronous project and case-study load states.'
      )
    ];
  } else if (result.projectType === 'dashboard') {
    result.recommendations = [
      createRec(
        'Background',
        'dots',
        'zeuralabz-original',
        'Clean, non-intrusive reactive dot matrix grid maintains peak legibility for dense tables and graphs.'
      ),
      createRec(
        'Hero Headline',
        'number-ticker',
        'magic-ui',
        'Dynamic numeric rolling ticker communicates live financial numbers, active sessions, and KPI metrics.'
      ),
      createRec(
        'Feature Cards',
        'metric-trend',
        'zeuralabz-original',
        'High-density KPI metric card with percentage change trend badges and sparkline integration.'
      ),
      createRec(
        'Buttons & CTAs',
        'interactive-hover-button',
        'magic-ui',
        'Crisp expand-on-hover action button ideal for export, filter, and report generation workflows.'
      ),
      createRec(
        'Polish & Loaders',
        'sidebar-layout',
        'zeuralabz-original',
        'Collapsible rail navigation maximizes viewport real estate for multi-column analytic dashboards.'
      )
    ];
  } else if (result.projectType === 'restaurant') {
    result.recommendations = [
      createRec(
        'Background',
        'fireflies',
        'zeuralabz-original',
        'Warm bioluminescent light orbs evoke warm candlelit dining and organic hospitality.'
      ),
      createRec(
        'Hero Headline',
        'word-rotate',
        'magic-ui',
        'Smooth vertical rotating text cycles culinary virtues ("Artisan", "Handcrafted", "Locally Sourced").'
      ),
      createRec(
        'Feature Cards',
        'product',
        'zeuralabz-original',
        'High-resolution imagery zoom card designed to highlight chef tasting specials and seasonal dishes.'
      ),
      createRec(
        'Buttons & CTAs',
        'star-border',
        'react-bits',
        'Subtle perimeter light loop draws immediate eyes to table reservation booking.'
      ),
      createRec(
        'Polish & Loaders',
        'blur-fade',
        'magic-ui',
        'Graceful progressive blur-fade animation smoothly reveals menu categories and dining images.'
      )
    ];
  } else if (result.projectType === 'ecommerce') {
    result.recommendations = [
      createRec(
        'Background',
        'gradient',
        'zeuralabz-original',
        'Atmospheric soft mesh gradient spotlights featured merchandise collections cleanly.'
      ),
      createRec(
        'Hero Headline',
        'hero-parallax',
        'aceternity',
        'Multi-layer scrolling parallax transforms product collections into an immersive editorial story.'
      ),
      createRec(
        'Feature Cards',
        'product',
        'zeuralabz-original',
        'Interactive product hover card with high-definition zoom and instant cart add states.'
      ),
      createRec(
        'Buttons & CTAs',
        'pulsating-button',
        'magic-ui',
        'Pulsing glow ring creates urgency on primary "Add to Cart" and "Checkout" actions.'
      ),
      createRec(
        'Polish & Loaders',
        'number-ticker',
        'magic-ui',
        'Live inventory stock counter and real-time review tally ticker.'
      )
    ];
  } else {
    // General fallback
    result.recommendations = [
      createRec('Background', 'aurora', 'zeuralabz-original', 'Fluid ambient waves set a dynamic modern aesthetic.'),
      createRec('Hero Headline', 'split-text', 'react-bits', 'Staggered letter animation delivers a cinematic first impression.'),
      createRec('Feature Cards', 'glass', 'zeuralabz-original', 'Translucent frosted glass cards display product features cleanly.'),
      createRec('Buttons & CTAs', 'shimmer', 'zeuralabz-original', 'Luminous light reflection sweep boosts primary click-through.'),
      createRec('Polish & Loaders', 'marquee', 'zeuralabz-original', 'Continuous ribbon showcases social proof and media partner logos.')
    ];
  }

  return result;
}

// Direct CLI Execution Support
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const targetArg = args.find(a => !a.startsWith('--')) || process.cwd();

  const analysis = analyzeProject(targetArg);

  if (isJson) {
    console.log(JSON.stringify(analysis, null, 2));
  } else {
    console.log('\n================================================================================');
    console.log('                   ZEURALABZ AUTONOMOUS PROJECT ANALYZER                       ');
    console.log('================================================================================\n');
    console.log(`Target Directory: ${analysis.targetDir}`);
    console.log(`Framework:        ${analysis.framework}`);
    console.log(`Build Tool:       ${analysis.buildTool}`);
    console.log(`Styling:          ${analysis.styling}`);
    console.log(`Motion Engine:    ${analysis.motion}`);
    console.log(`TypeScript:       ${analysis.typescript ? 'Yes' : 'No'}`);
    console.log(`Detected Persona: ${analysis.projectType.toUpperCase()} (Confidence: ${analysis.confidence})\n`);

    console.log('--- DETECTED UI GAPS & MISSING SECTIONS ----------------------------------------');
    analysis.detectedMissing.forEach((item, idx) => {
      console.log(`[${idx + 1}] ${item.section}: ${item.reason}`);
    });

    console.log('\n--- RECOMMENDED ZEURALABZ ONE-BEST-PICK PLAN -----------------------------------');
    analysis.recommendations.forEach((rec, idx) => {
      console.log(`\n[${idx + 1}] SECTION: ${rec.section.toUpperCase()}`);
      console.log(`    Component: ${rec.name} (${rec.slug}) [${rec.sourceLabel}]`);
      console.log(`    Why:       ${rec.why}`);
      console.log(`    Preview:   ${rec.originalUrl}`);
      console.log(`    Install:   ${rec.zeuralabzCommand}`);
    });
    console.log('\n================================================================================\n');
  }
}

export default analyzeProject;
