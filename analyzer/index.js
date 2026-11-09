import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load registry
function loadRegistry() {
  const regPath = path.join(rootDir, 'components.json');
  if (fs.existsSync(regPath)) {
    return JSON.parse(fs.readFileSync(regPath, 'utf8'));
  }
  return [];
}

/**
 * Analyze a target project directory
 * @param {string} targetDir
 */
export function analyzeProject(targetDir = process.cwd()) {
  const registry = loadRegistry();
  
  const result = {
    targetDir,
    framework: 'Unknown',
    buildTool: 'Unknown',
    tailwind: 'Not Detected',
    typescript: false,
    projectType: 'landing', // fallback
    confidence: 'medium',
    existingFeatures: [],
    detectedMissing: [],
    recommendations: []
  };

  const pkgPath = path.join(targetDir, 'package.json');
  let pkg = {};
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {
      // ignore
    }
  }

  const allDeps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {})
  };

  // 1. Detect Framework & Build Tool
  if (allDeps['next']) {
    result.framework = 'Next.js';
    result.buildTool = 'Next.js Compiler';
  } else if (allDeps['vite']) {
    result.framework = allDeps['react'] ? 'React + Vite' : 'Vite';
    result.buildTool = 'Vite';
  } else if (allDeps['react-scripts']) {
    result.framework = 'Create React App';
    result.buildTool = 'Webpack';
  } else if (allDeps['remix'] || allDeps['@remix-run/react']) {
    result.framework = 'Remix';
  } else if (allDeps['astro']) {
    result.framework = 'Astro';
  } else if (allDeps['react']) {
    result.framework = 'React';
  }

  // 2. Detect TypeScript
  if (allDeps['typescript'] || fs.existsSync(path.join(targetDir, 'tsconfig.json'))) {
    result.typescript = true;
  }

  // 3. Detect Tailwind
  if (allDeps['tailwindcss']) {
    const twVersion = allDeps['tailwindcss'];
    if (twVersion.startsWith('^4') || twVersion.startsWith('4') || allDeps['@tailwindcss/vite']) {
      result.tailwind = 'Tailwind CSS v4';
    } else {
      result.tailwind = 'Tailwind CSS v3';
    }
  } else if (fs.existsSync(path.join(targetDir, 'tailwind.config.js')) || fs.existsSync(path.join(targetDir, 'tailwind.config.ts'))) {
    result.tailwind = 'Tailwind CSS';
  }

  // 4. Detect Project Type from package.json, README, directory structure
  let projectTypeScores = {
    saas: 0,
    portfolio: 0,
    landing: 1, // baseline
    ecommerce: 0,
    dashboard: 0,
    restaurant: 0
  };

  const pkgString = JSON.stringify(pkg).toLowerCase();
  let readmeContent = '';
  const readmePaths = [path.join(targetDir, 'README.md'), path.join(targetDir, 'readme.md')];
  for (const rPath of readmePaths) {
    if (fs.existsSync(rPath)) {
      try {
        readmeContent = fs.readFileSync(rPath, 'utf8').toLowerCase();
        break;
      } catch {}
    }
  }

  const combinedText = `${pkgString} ${readmeContent}`;

  if (/saas|subscription|billing|stripe|workspace|b2b|platform|ai tool|api/.test(combinedText)) {
    projectTypeScores.saas += 3;
  }
  if (/portfolio|resume|cv|personal website|developer|designer|showcase/.test(combinedText)) {
    projectTypeScores.portfolio += 3;
  }
  if (/dashboard|admin|analytics|crm|metrics|charts|portal/.test(combinedText)) {
    projectTypeScores.dashboard += 3;
  }
  if (/ecommerce|shop|cart|checkout|store|products|storefront/.test(combinedText)) {
    projectTypeScores.ecommerce += 3;
  }
  if (/restaurant|cafe|food|menu|dining|catering|bistro/.test(combinedText)) {
    projectTypeScores.restaurant += 3;
  }
  if (/landing|waitlist|launch|marketing|conversion/.test(combinedText)) {
    projectTypeScores.landing += 2;
  }

  // Check file paths
  const checkDirExists = (rel) => fs.existsSync(path.join(targetDir, rel));
  if (checkDirExists('src/app/(dashboard)') || checkDirExists('src/pages/admin') || checkDirExists('src/components/charts')) {
    projectTypeScores.dashboard += 4;
  }
  if (checkDirExists('src/components/cart') || checkDirExists('src/pages/products')) {
    projectTypeScores.ecommerce += 4;
  }

  let highestType = 'landing';
  let highestScore = 0;
  for (const [type, score] of Object.entries(projectTypeScores)) {
    if (score > highestScore) {
      highestScore = score;
      highestType = type;
    }
  }
  result.projectType = highestType;

  // 5. Detect UI gaps (missing sections)
  result.detectedMissing = [
    { section: 'Background', reason: 'No animated background detected. Modern sites use ambient canvas or glow gradients.' },
    { section: 'Hero', reason: 'Hero section lacks punchy typography and dynamic motion.' },
    { section: 'Cards', reason: 'Feature showcase could benefit from 3D tilt or glassmorphic bento cards.' },
    { section: 'Text Animations', reason: 'Headlines look static. Staggered reveal or typewriter adds polish.' },
    { section: 'Buttons', reason: 'Primary call-to-actions are standard. Shimmer or magnetic buttons increase click-through.' },
    { section: 'Extra Polish', reason: 'Missing micro-interactions such as marquee or glowing cursor trail.' }
  ];

  // 6. Select 1 BEST pick per section based on projectType
  const pickSection = (category, sectionName, whyTemplate, fallbackSlug) => {
    // Filter components by category and matching bestFor
    const candidates = registry.filter(c => c.category === category);

    // Prioritize React Bits first for rich visual motion (backgrounds, text, animations)
    candidates.sort((a, b) => {
      if (['backgrounds', 'text-animations', 'animations'].includes(category)) {
        if (a.source === 'react-bits' && b.source !== 'react-bits') return -1;
        if (a.source !== 'react-bits' && b.source === 'react-bits') return 1;
      }
      return 0;
    });

    let matched = candidates.find(c => c.bestFor && c.bestFor.includes(result.projectType));
    if (!matched && fallbackSlug) {
      matched = candidates.find(c => c.slug === fallbackSlug);
    }
    if (!matched && candidates.length > 0) {
      matched = candidates[0];
    }
    if (matched) {
      return {
        section: sectionName,
        category: matched.category,
        slug: matched.slug,
        name: matched.name,
        source: matched.source || 'zeuralabz-original',
        sourceLabel: matched.sourceLabel || (matched.source === 'react-bits' ? 'React Bits • MIT + Commons Clause' : 'ZEURALABZ Original'),
        installCommand: matched.installCommand || matched.zeuralabzCommand || `npx zeuralabz add ${matched.slug}`,
        zeuralabzCommand: matched.zeuralabzCommand || `npx zeuralabz add ${matched.slug} --source ${matched.source || 'react-bits'}`,
        originalUrl: matched.originalUrl || matched.previewUrl,
        previewUrl: matched.previewUrl,
        why: whyTemplate(matched.name, result.projectType)
      };
    }
    return null;
  };

  const picks = [
    pickSection('backgrounds', 'Background', 
      (name, type) => type === 'saas' ? 'Living ambient waves elevate SaaS software aesthetics and create depth' :
                      type === 'portfolio' ? 'Cosmic or subtle grid canvas showcases creative craft' :
                      'Captivating backdrop draws immediate visual focus and sets a premium tone',
      result.projectType === 'saas' ? 'aurora' : result.projectType === 'portfolio' ? 'galaxy' : 'gradient'),
    
    pickSection('layouts', 'Layout & Navigation',
      (name, type) => type === 'dashboard' ? 'Collapsible rail gives clean hierarchy and maximizes screen real estate' :
                      type === 'saas' ? 'Floating glass island nav keeps navigation accessible without blocking content' :
                      'Balanced header and responsive layout structured for conversion',
      result.projectType === 'dashboard' ? 'sidebar' : 'floating-pill-nav'),

    pickSection('heroes', 'Hero Section',
      (name, type) => 'High-conversion hero layout with dynamic headline hierarchy tailored for ' + type + ' projects',
      'center-hero'),

    pickSection('cards', 'Cards & Features',
      (name, type) => type === 'portfolio' ? 'Interactive 3D tilt elevates project showcases' :
                      type === 'saas' ? 'Multi-tiered glass pricing cards build trust and drive subscriptions' :
                      'Bento grid layout organizes multi-feature highlights cleanly',
      result.projectType === 'saas' ? 'pricing' : result.projectType === 'portfolio' ? 'tilt' : 'bento'),

    pickSection('text-animations', 'Text Styles & Headlines',
      (name, type) => 'Smooth staggered reveal gives hero headline a cinematic first impression',
      'split-text'),

    pickSection('buttons', 'Buttons & CTAs',
      (name, type) => 'Subtle luminous light sweep draws the eye directly to your primary conversion action',
      'shimmer'),

    pickSection('animations', 'Extra Animations & Polish',
      (name, type) => 'Infinite logo ribbon displays partner logos and social proof seamlessly',
      'marquee')
  ].filter(Boolean);

  result.recommendations = picks;
  return result;
}

export default analyzeProject;

