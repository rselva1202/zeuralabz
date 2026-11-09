const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = 'C:/Users/ELCOT/AppData/Local/Temp/magicui-catalog/registry.json';

if (!fs.existsSync(catalogPath)) {
  console.error('Magic UI catalog not found at:', catalogPath);
  process.exit(1);
}

const rawCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const uiItems = rawCatalog.items.filter((it) => it.type === 'registry:ui');

console.log(`Found ${uiItems.length} official Magic UI UI components.`);

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

// Category mapping helper
function categorize(slug, title, desc) {
  const s = slug.toLowerCase();
  const d = (desc || '').toLowerCase();

  // Buttons
  if (s.includes('button') || s === 'cool-mode') {
    return 'buttons';
  }

  // Cards
  if (s.includes('card') || s === 'glare-hover') {
    return 'cards';
  }

  // Text Animations
  if (
    s.includes('text') ||
    s.includes('typing') ||
    s.includes('word-rotate') ||
    s.includes('highlighter') ||
    s.includes('number-ticker')
  ) {
    return 'text-animations';
  }

  // Backgrounds
  if (
    s.includes('pattern') ||
    s.includes('grid') ||
    s.includes('particles') ||
    s.includes('meteors') ||
    s.includes('dither') ||
    s.includes('noise') ||
    s.includes('ripple') ||
    s.includes('light-rays') ||
    s.includes('warp-background')
  ) {
    return 'backgrounds';
  }

  // Layouts
  if (
    s === 'dock' ||
    s === 'bento-grid' ||
    s === 'terminal' ||
    s === 'file-tree' ||
    s === 'safari' ||
    s === 'iphone' ||
    s === 'android' ||
    s.includes('dialog') ||
    s.includes('comparison')
  ) {
    return 'layouts';
  }

  // General Animations / Polish
  return 'animations';
}

const magicUIEntries = uiItems.map((item) => {
  const slug = item.name;
  const title = item.title && item.title !== slug ? item.title : toPascalCase(slug);
  const componentName = toPascalCase(slug);
  const category = categorize(slug, title, item.description);
  const docsUrl = `https://magicui.design/docs/components/${slug}`;
  const installCmd = `npx shadcn@latest add https://magicui.design/r/${slug}.json`;

  return {
    id: `magic-ui-${slug}`,
    name: title,
    componentName,
    slug,
    source: 'magic-ui',
    sourceLabel: 'Magic UI • MIT',
    author: 'Magic UI (dillionverma)',
    category,
    originalCategory: 'Components',
    description: (item.description || `${title} component from Magic UI.`).trim(),
    tags: [category, 'magic-ui', 'animation', 'ui', ...(item.dependencies || [])],
    bestFor: ['landing', 'saas', 'hero', 'creative'],
    license: 'MIT',
    originalUrl: docsUrl,
    previewUrl: docsUrl,
    installCommand: installCmd,
    zeuralabzCommand: `npx zeuralabz add ${slug} --source magic-ui`,
    registryUrl: `https://magicui.design/r/${slug}.json`,
    deps: item.dependencies || [],
    devDependencies: item.devDependencies || [],
    registryDependencies: item.registryDependencies || [],
    isOriginal: false,
  };
});

// 1. Write registry/magic-ui.json
const registryDir = path.join(rootDir, 'registry');
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}
const outMagicUiPath = path.join(registryDir, 'magic-ui.json');
fs.writeFileSync(outMagicUiPath, JSON.stringify(magicUIEntries, null, 2), 'utf8');
console.log(`✔ Wrote ${magicUIEntries.length} items to ${outMagicUiPath}`);

// 2. Load existing React Bits and Originals from components.json
const compJsonPath = path.join(rootDir, 'components.json');
const currentComponents = JSON.parse(fs.readFileSync(compJsonPath, 'utf8'));

const originals = currentComponents.filter((c) => c.source === 'zeuralabz-original' || (!c.source && c.isOriginal !== false));
const reactBits = currentComponents.filter((c) => c.source === 'react-bits');

console.log(`Existing components: ${originals.length} Originals + ${reactBits.length} React Bits`);

// Merge all 3 sources
const allComponents = [...originals, ...reactBits, ...magicUIEntries];
console.log(`Total merged components: ${allComponents.length} (${originals.length} Original + ${reactBits.length} React Bits + ${magicUIEntries.length} Magic UI)`);

// Write components.json
fs.writeFileSync(compJsonPath, JSON.stringify(allComponents, null, 2), 'utf8');
console.log(`✔ Updated ${compJsonPath}`);

// Write preview-site/src/data/components.json
const previewDataPath = path.join(rootDir, 'preview-site', 'src', 'data', 'components.json');
fs.writeFileSync(previewDataPath, JSON.stringify(allComponents, null, 2), 'utf8');
console.log(`✔ Updated ${previewDataPath}`);

// 3. Update ATTRIBUTION.md
const attributionPath = path.join(rootDir, 'ATTRIBUTION.md');
const attributionContent = `# ZEURALABZ — Open Source & Linked Catalog Attribution

ZEURALABZ is an intelligent component indexer, CLI suggester, and design matrix that unifies modern UI engineering for developers and autonomous AI coding agents.

This repository features both **ZEURALABZ Originals** and **Linked External Sources** that are installed directly from their respective official registries.

---

## 1. ZEURALABZ Originals
* **Author**: R. Selva (https://github.com/rselva1202)
* **License**: MIT License
* **Description**: Original canvas backgrounds, motion primitives, and interactive UI components hosted directly in \`components/\`.

---

## 2. Linked Source: React Bits
* **Author**: David Haz (https://github.com/DavidHDev)
* **Repository**: https://github.com/DavidHDev/react-bits
* **Official Website**: https://reactbits.dev
* **License**: MIT + Commons Clause
* **Terms of Use**:
  React Bits components are free to use in your personal or commercial websites and web applications.
  Under the Commons Clause condition, components may NOT be resold, sublicensed, or redistributed as a competing standalone component library.
* **ZEURALABZ Integration**:
  ZEURALABZ does NOT host or redistribute React Bits source code. Instead, ZEURALABZ provides discovery, heuristic suggestions, and direct installation commands linking to the official React Bits registry (\`@react-bits/*\`) with full attribution.

---

## 3. Linked Source: Magic UI
* **Author**: Dillion Verma / Magic UI (https://github.com/magicuidesign)
* **Repository**: https://github.com/magicuidesign/magicui
* **Official Website**: https://magicui.design
* **License**: MIT License
* **Terms of Use**:
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
* **ZEURALABZ Integration**:
  Magic UI components are indexed as a linked source and installed directly from their official shadcn registry endpoint (\`https://magicui.design/r/<slug>.json\`). ZEURALABZ does not claim ownership or host local copies in \`components/\`.

---

*Last updated: November 2026 • ZEURALABZ Ecosystem*
`;

fs.writeFileSync(attributionPath, attributionContent, 'utf8');
console.log(`✔ Updated ${attributionPath}`);
