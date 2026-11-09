const fs = require('fs');
const path = require('path');

async function main() {
  const tempDir = path.join(process.env.TEMP, 'react-bits-catalog');
  const infoPath = path.join(tempDir, 'src', 'constants', 'Information.js');
  const rDir = path.join(tempDir, 'public', 'r');

  if (!fs.existsSync(infoPath)) {
    console.error('Information.js not found at:', infoPath);
    process.exit(1);
  }

  const mod = await import('file:///' + infoPath.replace(/\\/g, '/'));
  const meta = mod.componentMetadata;

  function mapCategory(rbCat, name) {
    if (rbCat === 'Backgrounds') return 'backgrounds';
    if (rbCat === 'TextAnimations') return 'text-animations';
    const lower = name.toLowerCase();
    if (lower.includes('button') || lower.includes('toggle') || lower.includes('switch')) return 'buttons';
    if (lower.includes('card')) return 'cards';
    if (
      lower.includes('input') ||
      lower.includes('select') ||
      lower.includes('radio') ||
      lower.includes('prompt') ||
      lower.includes('dial') ||
      lower.includes('gauge')
    )
      return 'forms';
    if (lower.includes('loader') || lower.includes('counter')) return 'loaders';
    if (
      lower.includes('carousel') ||
      lower.includes('gallery') ||
      lower.includes('nav') ||
      lower.includes('menu') ||
      lower.includes('stack') ||
      lower.includes('grid') ||
      lower.includes('bento') ||
      lower.includes('dock') ||
      lower.includes('sidebar') ||
      lower.includes('folder') ||
      lower.includes('stepper') ||
      lower.includes('masonry') ||
      lower.includes('surface') ||
      lower.includes('wall') ||
      lower.includes('toast') ||
      lower.includes('chip') ||
      lower.includes('row')
    )
      return 'layouts';
    if (rbCat === 'Animations' || rbCat === 'Micro') return 'animations';
    return 'layouts';
  }

  function getSlugFromDocsUrl(docsUrl, name) {
    if (docsUrl) {
      const parts = docsUrl.split('/').filter(Boolean);
      return parts[parts.length - 1];
    }
    return name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
  }

  const reactBitsItems = [];

  for (const [key, comp] of Object.entries(meta)) {
    const slug = getSlugFromDocsUrl(comp.docsUrl, comp.name);
    const category = mapCategory(comp.category, comp.name);

    // Read real dependencies from public/r/<ComponentName>-TS-TW.json
    let deps = ['framer-motion'];
    let variants = ['TS-TW', 'TS-CSS', 'JS-TW', 'JS-CSS'];
    const rFile = path.join(rDir, `${comp.name}-TS-TW.json`);
    if (fs.existsSync(rFile)) {
      try {
        const rData = JSON.parse(fs.readFileSync(rFile, 'utf8'));
        if (rData.dependencies && Array.isArray(rData.dependencies)) {
          deps = rData.dependencies;
        }
      } catch (e) {}
    }

    // Convert camelCase or PascalCase component name to Title Case for name
    const humanName = comp.name
      .replace(/([A-Z])/g, ' $1')
      .trim();

    const item = {
      id: `react-bits-${slug}`,
      name: humanName,
      componentName: comp.name,
      slug: slug,
      source: 'react-bits',
      sourceLabel: 'React Bits • MIT + Commons Clause',
      author: 'David Haz / React Bits',
      category: category,
      originalCategory: comp.category,
      description: comp.description || `Animated ${humanName} component from React Bits.`,
      tags: comp.tags && comp.tags.length > 0 ? comp.tags : [category, 'react-bits', 'animation', 'ui'],
      bestFor: ['landing', 'saas', 'hero', 'creative'],
      license: 'MIT + Commons Clause',
      originalUrl: comp.docsUrl || `https://reactbits.dev/${comp.category.toLowerCase()}/${slug}`,
      previewUrl: comp.docsUrl || `https://reactbits.dev/${comp.category.toLowerCase()}/${slug}`,
      installCommand: `npx shadcn@latest add @react-bits/${comp.name}-TS-TW`,
      zeuralabzCommand: `npx zeuralabz add ${slug} --source react-bits`,
      variants: variants,
      defaultVariant: 'TS-TW',
      deps: deps,
      isOriginal: false
    };

    reactBitsItems.push(item);
  }

  // Ensure registry directory exists
  if (!fs.existsSync('registry')) {
    fs.mkdirSync('registry', { recursive: true });
  }

  fs.writeFileSync('registry/react-bits.json', JSON.stringify(reactBitsItems, null, 2), 'utf8');
  console.log(`Saved registry/react-bits.json with ${reactBitsItems.length} components.`);

  // Update components.json
  const currentRegistryPath = 'components.json';
  let existingItems = [];
  if (fs.existsSync(currentRegistryPath)) {
    existingItems = JSON.parse(fs.readFileSync(currentRegistryPath, 'utf8'));
  }

  // Filter out any previous react-bits entries to ensure idempotency
  const zeuraOriginals = existingItems
    .filter((c) => c.source !== 'react-bits')
    .map((c) => ({
      ...c,
      id: c.id && c.id.startsWith('zeuralabz-') ? c.id : `zeuralabz-${c.slug || c.name.toLowerCase().replace(/\s+/g, '-')}`,
      source: 'zeuralabz-original',
      sourceLabel: 'ZEURALABZ Original',
      license: 'MIT',
      isOriginal: true,
      zeuralabzCommand: `npx zeuralabz add ${c.slug} --source zeuralabz-original`
    }));

  const combined = [...zeuraOriginals, ...reactBitsItems];

  fs.writeFileSync('components.json', JSON.stringify(combined, null, 2), 'utf8');
  fs.writeFileSync('preview-site/src/data/components.json', JSON.stringify(combined, null, 2), 'utf8');

  console.log(`Merged components.json: ${zeuraOriginals.length} ZEURALABZ Original + ${reactBitsItems.length} React Bits = ${combined.length} total components.`);

  // Create ATTRIBUTION.md
  const attributionContent = `# Attribution & Third-Party Licences

ZEURALABZ indexes and links to exceptional open-source component libraries, providing streamlined search, AI recommendation, and one-command installation directly from their official registries.

---

## 1. React Bits

- **Author**: David Haz ([@DavidHDev](https://github.com/DavidHDev))
- **Official Website**: [https://reactbits.dev](https://reactbits.dev)
- **Official GitHub Repository**: [https://github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- **Licence**: MIT + Commons Clause
- **Install Channel**: Official shadcn registry (\`@react-bits/<Component>-TS-TW\`)

### Licence Notice & Terms
React Bits is open source and free to use in your own websites, client work, commercial applications, and software products. Under the Commons Clause condition, components themselves may not be resold, sublicensed, or redistributed as a standalone or competing component library.

**ZEURALABZ Compliance**:
- ZEURALABZ does **NOT** host or redistribute React Bits source files in this repository.
- ZEURALABZ acts strictly as an installer and catalog indexer.
- When running \`npx zeuralabz add <slug> --source react-bits\`, the component is installed directly from the official React Bits registry via \`npx shadcn@latest add @react-bits/<ComponentName>-TS-TW\`.
- All React Bits entries in ZEURALABZ maintain full original attribution, author links, and direct URLs to [reactbits.dev](https://reactbits.dev).

---

## 2. ZEURALABZ Originals

- **Author**: R. Selva ([@rselva1202](https://github.com/rselva1202))
- **Licence**: MIT License
- **Source**: Native original components packaged within ZEURALABZ (\`components/\`).
`;

  fs.writeFileSync('ATTRIBUTION.md', attributionContent, 'utf8');
  console.log('Successfully created ATTRIBUTION.md!');
}

main().catch(console.error);
