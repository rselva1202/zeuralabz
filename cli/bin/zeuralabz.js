#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import open from 'open';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { analyzeProject } from '../../analyzer/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// Helper to load registry
function getRegistry() {
  const regPath = path.join(rootDir, 'components.json');
  if (fs.existsSync(regPath)) {
    return JSON.parse(fs.readFileSync(regPath, 'utf8'));
  }
  return [];
}

// Helper to load themes
function getThemes() {
  const themesPath = path.join(rootDir, 'themes', 'themes.json');
  if (fs.existsSync(themesPath)) {
    return JSON.parse(fs.readFileSync(themesPath, 'utf8'));
  }
  return [];
}

// Find components by slug with optional source filter
function findComponents(slug, sourceFilter = null) {
  const registry = getRegistry();
  const q = slug.toLowerCase();
  let matches = registry.filter(
    (c) =>
      (c.slug && c.slug.toLowerCase() === q) ||
      (c.id && c.id.toLowerCase() === q) ||
      (c.componentName && c.componentName.toLowerCase() === q)
  );

  if (sourceFilter) {
    const sf = sourceFilter.toLowerCase();
    if (sf === 'react-bits' || sf === 'rb') {
      matches = matches.filter((c) => c.source === 'react-bits');
    } else if (sf === 'magic-ui' || sf === 'magic' || sf === 'magicui') {
      matches = matches.filter((c) => c.source === 'magic-ui');
    } else if (sf === 'aceternity' || sf === 'ac' || sf === 'aceternity-ui') {
      matches = matches.filter((c) => c.source === 'aceternity');
    } else if (sf === 'zeuralabz-original' || sf === 'original' || sf === 'zeura') {
      matches = matches.filter((c) => c.source === 'zeuralabz-original');
    }
  }

  return matches;
}

// Install a component to target project
export async function installComponent(slug, targetDir = process.cwd(), options = {}) {
  let matches = findComponents(slug, options.source);

  if (matches.length === 0) {
    console.log(chalk.red(`\n✖ Component "${slug}" not found in ZEURALABZ registry.`));
    if (options.source) {
      console.log(chalk.gray(`  (Searched with source filter: ${options.source})`));
    }
    return false;
  }

  let comp = matches[0];

  // If multiple matching sources exist and no source was specified, prompt user or default
  if (matches.length > 1 && !options.source) {
    if (process.stdin.isTTY) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'selected',
          message: `Multiple sources available for "${slug}". Choose one:`,
          choices: matches.map((m, idx) => ({
            name: `${idx + 1}. ${m.name} [${
              m.source === 'react-bits'
                ? 'React Bits • MIT + Commons'
                : m.source === 'magic-ui'
                ? 'Magic UI • MIT'
                : m.source === 'aceternity'
                ? 'Aceternity UI • MIT'
                : 'ZEURALABZ Original • MIT'
            }]`,
            value: m,
          })),
        },
      ]);
      comp = answers.selected;
    } else {
      // Priority default: 1. React Bits, 2. Magic UI, 3. Aceternity UI, 4. ZEURALABZ Original
      const rb = matches.find((m) => m.source === 'react-bits');
      const mg = matches.find((m) => m.source === 'magic-ui');
      const ac = matches.find((m) => m.source === 'aceternity');
      if (rb) {
        comp = rb;
        console.log(chalk.gray(`Found multiple sources for "${slug}". Defaulting to React Bits (use --source magic-ui, --source aceternity, or --source zeuralabz-original).`));
      } else if (mg) {
        comp = mg;
        console.log(chalk.gray(`Found multiple sources for "${slug}". Defaulting to Magic UI (use --source aceternity or --source zeuralabz-original).`));
      } else if (ac) {
        comp = ac;
        console.log(chalk.gray(`Found multiple sources for "${slug}". Defaulting to Aceternity UI (use --source zeuralabz-original).`));
      }
    }
  }

  // 1. REACT BITS INSTALLATION (via official shadcn registry or direct official fetch)
  if (comp.source === 'react-bits') {
    const shadcnConfigExists =
      fs.existsSync(path.join(targetDir, 'components.json')) &&
      fs.readFileSync(path.join(targetDir, 'components.json'), 'utf8').includes('ui.shadcn.com');

    if (shadcnConfigExists) {
      const cmd = comp.installCommand || `npx shadcn@latest add @react-bits/${comp.componentName}-TS-TW`;
      console.log(chalk.cyan(`\n📦 Installing official React Bits component via shadcn:`));
      console.log(chalk.bold.white(`   ${cmd}\n`));
      try {
        execSync(cmd, { stdio: 'inherit', cwd: targetDir });
        console.log(chalk.bold.green(`\n✔ Installed ${chalk.bold(comp.name)} from React Bits (@react-bits/${comp.componentName}-TS-TW)`));
        console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.white(`import ${comp.componentName} from '@/components/${comp.componentName}';\n\nexport default function Example() {\n  return <${comp.componentName} />;\n}`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
        return true;
      } catch (err) {
        console.log(chalk.yellow(`\n⚠️  shadcn install command encountered an issue. Falling back to official registry direct download.`));
      }
    }

    // Direct download from official React Bits registry fallback
    const registryUrl = `https://reactbits.dev/r/${comp.componentName}-TS-TW.json`;
    console.log(chalk.cyan(`\n📦 Fetching official React Bits component from:`));
    console.log(chalk.bold.white(`   ${registryUrl}\n`));

    try {
      const fetchRes = await fetch(registryUrl);
      if (fetchRes.ok) {
        const itemData = await fetchRes.json();
        const rbDir = path.join(targetDir, 'src', 'components', 'react-bits', comp.slug);
        fs.mkdirSync(rbDir, { recursive: true });

        if (itemData.files && itemData.files.length > 0) {
          for (const file of itemData.files) {
            const filename = path.basename(file.path);
            const header = `/**\n * React Bits — ${comp.name}\n * Source: ${comp.originalUrl}\n * Author: David Haz (https://github.com/DavidHDev/react-bits)\n * License: MIT + Commons Clause\n * Free to use in your personal or commercial website/app.\n */\n\n`;
            fs.writeFileSync(path.join(rbDir, filename), header + file.content, 'utf8');
          }
        }

        console.log(chalk.bold.green(`✔ Downloaded official ${chalk.bold(comp.name)} directly into src/components/react-bits/${comp.slug}/`));
        console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.white(`import ${comp.componentName} from './components/react-bits/${comp.slug}/${comp.componentName}';\n\nexport default function Example() {\n  return <${comp.componentName} />;\n}`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
        return true;
      }
    } catch (fetchErr) {
      console.log(chalk.red(`Direct download failed: ${fetchErr.message}`));
    }

    console.log(chalk.yellow(`💡 If you want to use the official shadcn command:`));
    console.log(chalk.cyan(`   npx shadcn@latest init`));
    console.log(chalk.gray(`   Then re-run: npx zeuralabz add ${comp.slug} --source react-bits\n`));
    return false;
  }

  // 2. MAGIC UI INSTALLATION (via official shadcn registry or direct official fetch)
  if (comp.source === 'magic-ui') {
    const shadcnConfigExists =
      fs.existsSync(path.join(targetDir, 'components.json')) &&
      fs.readFileSync(path.join(targetDir, 'components.json'), 'utf8').includes('ui.shadcn.com');

    const cmd = comp.installCommand || `npx shadcn@latest add https://magicui.design/r/${comp.slug}.json`;

    if (shadcnConfigExists) {
      console.log(chalk.cyan(`\n📦 Installing official Magic UI component via shadcn:`));
      console.log(chalk.bold.white(`   ${cmd}\n`));
      try {
        execSync(cmd, { stdio: 'inherit', cwd: targetDir });
        console.log(chalk.bold.green(`\n✔ Installed ${chalk.bold(comp.name)} from Magic UI`));
        console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.white(`import { ${comp.componentName} } from '@/components/magicui/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName} />;\n}`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
        return true;
      } catch (err) {
        console.log(chalk.yellow(`\n⚠️  shadcn install command encountered an issue. Falling back to official registry direct download.`));
      }
    }

    // Direct download from official Magic UI registry fallback
    const registryUrl = comp.registryUrl || `https://magicui.design/r/${comp.slug}.json`;
    console.log(chalk.cyan(`\n📦 Fetching official Magic UI component from:`));
    console.log(chalk.bold.white(`   ${registryUrl}\n`));

    try {
      const fetchRes = await fetch(registryUrl);
      if (fetchRes.ok) {
        const itemData = await fetchRes.json();
        const magicDir = path.join(targetDir, 'src', 'components', 'magic-ui', comp.slug);
        fs.mkdirSync(magicDir, { recursive: true });

        if (itemData.files && itemData.files.length > 0) {
          for (const file of itemData.files) {
            const filename = path.basename(file.path);
            const header = `/**\n * Magic UI — ${comp.name}\n * Source: ${comp.originalUrl}\n * Author: Magic UI (https://magicui.design)\n * License: MIT\n */\n\n`;
            fs.writeFileSync(path.join(magicDir, filename), header + file.content, 'utf8');
          }
        }

        console.log(chalk.bold.green(`✔ Downloaded official ${chalk.bold(comp.name)} directly into src/components/magic-ui/${comp.slug}/`));
        console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.white(`import { ${comp.componentName} } from './components/magic-ui/${comp.slug}/${comp.componentName}';\n\nexport default function Example() {\n  return <${comp.componentName} />;\n}`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
        return true;
      }
    } catch (fetchErr) {
      console.log(chalk.red(`Direct download failed: ${fetchErr.message}`));
    }

    console.log(chalk.yellow(`💡 If you want to use the official shadcn command:`));
    console.log(chalk.cyan(`   npx shadcn@latest init`));
    console.log(chalk.gray(`   Then re-run: npx zeuralabz add ${comp.slug} --source magic-ui\n`));
    return false;
  }

  // 3. ACETERNITY UI INSTALLATION (via official shadcn registry or direct official fetch)
  if (comp.source === 'aceternity') {
    const shadcnConfigExists =
      fs.existsSync(path.join(targetDir, 'components.json')) &&
      fs.readFileSync(path.join(targetDir, 'components.json'), 'utf8').includes('ui.shadcn.com');

    const cmd = comp.installCommand || `npx shadcn@latest add @aceternity/${comp.slug}`;

    if (shadcnConfigExists) {
      console.log(chalk.cyan(`\n📦 Installing official Aceternity UI component via shadcn:`));
      console.log(chalk.bold.white(`   ${cmd}\n`));
      try {
        execSync(cmd, { stdio: 'inherit', cwd: targetDir });
        console.log(chalk.bold.green(`\n✔ Installed ${chalk.bold(comp.name)} from Aceternity UI`));
        console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.white(`import { ${comp.componentName || 'Component'} } from '@/components/ui/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName || 'Component'} />;\n}`));
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
        return true;
      } catch (err) {
        console.log(chalk.yellow(`\n⚠️  shadcn install command encountered an issue.`));
      }
    }

    // Direct registry download fallback if endpoint exists
    const registryUrl = comp.registryUrl || `https://ui.aceternity.com/r/${comp.slug}.json`;
    try {
      const fetchRes = await fetch(registryUrl);
      if (fetchRes.ok) {
        const itemData = await fetchRes.json();
        const acDir = path.join(targetDir, 'src', 'components', 'ui', comp.slug);
        fs.mkdirSync(acDir, { recursive: true });

        if (itemData.files && itemData.files.length > 0) {
          for (const file of itemData.files) {
            const filename = path.basename(file.path || file.name || `${comp.slug}.tsx`);
            const header = `/**\n * Aceternity UI — ${comp.name}\n * Source: ${comp.originalUrl}\n * Author: Manu Arora (https://ui.aceternity.com)\n * License: MIT\n */\n\n`;
            fs.writeFileSync(path.join(acDir, filename), header + (file.content || ''), 'utf8');
          }
          console.log(chalk.bold.green(`✔ Downloaded official ${chalk.bold(comp.name)} directly into src/components/ui/${comp.slug}/`));
          console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
          console.log(chalk.gray(`--------------------------------------------------`));
          console.log(chalk.white(`import { ${comp.componentName || 'Component'} } from './components/ui/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName || 'Component'} />;\n}`));
          console.log(chalk.gray(`--------------------------------------------------`));
          console.log(chalk.blue(`🔗 Official Documentation & Live Demos: ${comp.originalUrl}\n`));
          return true;
        }
      }
    } catch {}

    // Fallback: Aceternity installation instructions
    console.log(chalk.bold.cyan(`\n💎 Official Aceternity UI Component:`));
    console.log(chalk.gray(`Aceternity UI components are distributed via the official Aceternity registry / shadcn:`));
    console.log(chalk.bold.white(`\n   ${comp.installCommand || `npx shadcn@latest add @aceternity/${comp.slug}`}\n`));
    console.log(chalk.yellow(`Or view documentation, dependencies, and code directly on the official site:`));
    console.log(chalk.bold.blue(`   ${comp.originalUrl}\n`));
    console.log(chalk.gray(`Author: Manu Arora (https://twitter.com/mannupaaji) • License: MIT`));
    console.log(chalk.gray(`Note: ZEURALABZ links directly to official Aceternity UI source and does not redistribute proprietary code.\n`));
    return true;
  }

  // 4. ZEURALABZ ORIGINAL INSTALLATION (local file copy)
  let destDir = path.join(targetDir, 'src', 'components', 'zeuralabz', comp.slug);
  const configPath = path.join(targetDir, 'zeuralabz.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.componentsDir) {
        destDir = path.join(targetDir, config.componentsDir, comp.slug);
      }
    } catch {}
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Source directory
  const sourceDir = path.join(rootDir, 'components', comp.category, comp.slug);
  if (!fs.existsSync(sourceDir)) {
    console.log(chalk.red(`\n✖ Source folder for "${comp.slug}" not found in ZEURALABZ components.`));
    return false;
  }

  // Copy files: tsx, html, css, info.json
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    if (file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.css') || file === 'info.json') {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
    }
  }

  console.log(chalk.green(`\n✔ Installed ${chalk.bold(comp.name)} [ZEURALABZ Original] to ${path.relative(targetDir, destDir)}`));

  // Check dependencies
  if (comp.deps && comp.deps.length > 0) {
    console.log(chalk.yellow(`\n📦 Dependencies required:`));
    console.log(chalk.cyan(`   npm install ${comp.deps.join(' ')}`));
  }

  // Print import instruction
  const tsxFile =
    files.find((f) => f.endsWith('.tsx') && (f === `${comp.componentName}.tsx` || f.toLowerCase().includes(comp.slug.toLowerCase()))) ||
    files.find((f) => f.endsWith('.tsx'));
  if (tsxFile) {
    const componentName = path.basename(tsxFile, '.tsx');
    const relImport = `./${path.relative(path.join(targetDir, 'src'), destDir).replace(/\\/g, '/')}/${componentName}`;
    console.log(chalk.magenta(`\n🚀 Usage in your React page:`));
    console.log(chalk.gray(`--------------------------------------------------`));
    console.log(chalk.white(`import { ${componentName} } from '${relImport}';\n\nexport default function Example() {\n  return <${componentName} />;\n}`));
    console.log(chalk.gray(`--------------------------------------------------\n`));
  }

  return true;
}

const program = new Command();

program
  .name('zeuralabz')
  .description(chalk.cyan('✨ ZEURALABZ — Make any website look pretty with AI-curated UI components'))
  .version('1.2.0');

// 1. INIT
program
  .command('init')
  .description('Initialize ZEURALABZ configuration in your project')
  .action(() => {
    const cwd = process.cwd();
    const configPath = path.join(cwd, 'zeuralabz.json');
    if (fs.existsSync(configPath)) {
      console.log(chalk.yellow('\nℹ zeuralabz.json already exists in this directory.\n'));
      return;
    }

    const defaultConfig = {
      $schema: 'https://rselva1202.github.io/zeuralabz/schema.json',
      componentsDir: 'src/components/zeuralabz',
      theme: 'dark-neon',
      animation: 'framer-motion',
      preferSource: 'react-bits'
    };

    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
    console.log(chalk.green('\n✔ Created zeuralabz.json config!'));
    console.log(chalk.gray('  Components will be installed to: src/components/zeuralabz\n'));
  });

// 2. SUGGEST
program
  .command('suggest')
  .description('Analyze project and recommend the 1 best UI design for every section')
  .option('--all', 'Install all suggested components without prompt')
  .option('--pick <indices>', 'Comma-separated indices to install (e.g. 1,3,4)')
  .action(async (options) => {
    const spinner = ora('Analyzing project structure, dependencies, and styles...').start();
    const analysis = analyzeProject(process.cwd());
    spinner.succeed(chalk.bold.green('Project Analysis Complete!'));

    console.log(chalk.bold.cyan('\n📊 Project Profile:'));
    console.log(`• Framework:   ${chalk.yellow(analysis.framework)}`);
    console.log(`• Build Tool:  ${chalk.yellow(analysis.buildTool)}`);
    console.log(`• TypeScript:  ${chalk.yellow(analysis.typescript ? 'Yes' : 'No')}`);
    console.log(`• Styling:     ${chalk.yellow(analysis.tailwind)}`);
    console.log(`• Persona:     ${chalk.bold.magenta(analysis.projectType.toUpperCase())} (${analysis.confidence} confidence)\n`);

    console.log(chalk.bold.cyan('🎨 Recommended UI Design Plan (1 Best Pick Per Section):'));
    console.log(chalk.gray('--------------------------------------------------------------------------------'));

    analysis.recommendations.forEach((rec, idx) => {
      const sourceBadge =
        rec.source === 'react-bits'
          ? chalk.bgBlue.white.bold(' React Bits • MIT ')
          : rec.source === 'magic-ui'
          ? chalk.bgCyan.black.bold(' Magic UI • MIT ')
          : rec.source === 'aceternity'
          ? chalk.bgBlue.black.bold(' Aceternity UI • MIT ')
          : chalk.bgMagenta.white.bold(' ZEURALABZ Original ');

      console.log(`${chalk.bold.yellow(`[${idx + 1}]`)} ${chalk.bold.white(rec.section.toUpperCase())}: ${chalk.bold.cyan(rec.name)} ${sourceBadge}`);
      console.log(`    Slug:    ${chalk.green(rec.slug)}`);
      console.log(`    Why:     ${chalk.gray(rec.why)}`);
      console.log(`    Preview: ${chalk.blue.underline(rec.previewUrl)}`);
      console.log(`    Install: ${chalk.white(rec.zeuralabzCommand || `npx zeuralabz add ${rec.slug}`)}`);
      console.log(chalk.gray('--------------------------------------------------------------------------------'));
    });

    let selection = options.all ? 'all' : options.pick;

    if (!selection && process.stdin.isTTY) {
      const promptRes = await inquirer.prompt([
        {
          type: 'input',
          name: 'selection',
          message: 'Pick numbers to install (e.g. 1, 3 or "all" or press Enter to skip):'
        }
      ]);
      selection = promptRes.selection;
    }

    if (!selection || selection.trim() === '') {
      console.log(chalk.gray('\nNo components selected. You can install anytime with: npx zeuralabz add <slug>\n'));
      return;
    }

    let toInstall = [];
    if (selection.trim().toLowerCase() === 'all') {
      toInstall = analysis.recommendations;
    } else {
      const indices = selection
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n >= 1 && n <= analysis.recommendations.length);
      toInstall = indices.map((i) => analysis.recommendations[i - 1]);
    }

    if (toInstall.length === 0) {
      console.log(chalk.yellow('\nNo valid component numbers entered.'));
      return;
    }

    console.log(chalk.magenta(`\nInstalling ${toInstall.length} component(s)...`));
    for (const rec of toInstall) {
      await installComponent(rec.slug, process.cwd(), { source: rec.source });
    }
    console.log(chalk.bold.green('All selected components installed ready to use!\n'));
  });

// 3. ADD
program
  .command('add <slug>')
  .description('Install a component into your project by its slug (e.g. aurora, magic-card, split-text, 3d-card-effect)')
  .option('-s, --source <source>', 'Source library: "react-bits", "magic-ui", "aceternity", or "zeuralabz-original"')
  .action(async (slug, options) => {
    await installComponent(slug, process.cwd(), options);
  });

// 4. SEARCH
program
  .command('search <query>')
  .description('Search ZEURALABZ components by keyword or tag')
  .option('-s, --source <source>', 'Filter by source: "react-bits", "magic-ui", "aceternity", or "zeuralabz-original"')
  .action((query, options) => {
    let registry = getRegistry();
    if (options.source) {
      const sf = options.source.toLowerCase();
      if (sf === 'react-bits' || sf === 'rb') {
        registry = registry.filter((c) => c.source === 'react-bits');
      } else if (sf === 'magic-ui' || sf === 'magic' || sf === 'magicui') {
        registry = registry.filter((c) => c.source === 'magic-ui');
      } else if (sf === 'aceternity' || sf === 'ac' || sf === 'aceternity-ui') {
        registry = registry.filter((c) => c.source === 'aceternity');
      } else if (sf === 'zeuralabz-original' || sf === 'original') {
        registry = registry.filter((c) => c.source === 'zeuralabz-original');
      }
    }

    const q = query.toLowerCase();
    const matches = registry.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.slug && c.slug.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
    );

    console.log(chalk.bold.magenta(`\nFound ${matches.length} component(s) matching "${query}":\n`));

    if (matches.length === 0) {
      console.log(chalk.gray('No matches found. Try searching for "background", "hero", "card", or "button".\n'));
      return;
    }

    matches.forEach((c) => {
      const sourceBadge =
        c.source === 'react-bits'
          ? chalk.blue('[React Bits • MIT + Commons]')
          : c.source === 'magic-ui'
          ? chalk.cyan('[Magic UI • MIT]')
          : c.source === 'aceternity'
          ? chalk.blueBright('[Aceternity UI • MIT]')
          : chalk.magenta('[ZEURALABZ Original • MIT]');
      console.log(`• ${chalk.bold.cyan(c.name)} (${chalk.yellow(c.slug)}) [${chalk.green(c.category)}] ${sourceBadge}`);
      console.log(`  ${chalk.gray(c.description)}`);
      console.log(`  Install: ${chalk.white(c.zeuralabzCommand || `npx zeuralabz add ${c.slug}`)}`);
      console.log(`  URL:     ${chalk.blue.underline(c.originalUrl || c.previewUrl)}\n`);
    });
  });

// 5. PREVIEW
program
  .command('preview <slug>')
  .description('Open the live web preview of a component in your browser')
  .option('-s, --source <source>', 'Source library: "react-bits", "magic-ui", "aceternity", or "zeuralabz-original"')
  .action(async (slug, options) => {
    const matches = findComponents(slug, options.source);
    const comp = matches[0];
    const url = comp ? comp.originalUrl || comp.previewUrl : `https://magicui.design/docs/components/${slug}`;
    console.log(chalk.cyan(`\nOpening preview in browser: ${chalk.underline(url)}\n`));
    try {
      await open(url);
    } catch {
      console.log(chalk.gray(`Could not launch browser automatically. Please visit:\n${url}\n`));
    }
  });

// 6. LIST
program
  .command('list [category]')
  .description('List all available components (optionally filter by category)')
  .option('-s, --source <source>', 'Filter by source: "react-bits", "magic-ui", "aceternity", or "zeuralabz-original"')
  .action((category, options) => {
    let items = getRegistry();

    if (options.source) {
      const sf = options.source.toLowerCase();
      if (sf === 'react-bits' || sf === 'rb') {
        items = items.filter((c) => c.source === 'react-bits');
      } else if (sf === 'magic-ui' || sf === 'magic' || sf === 'magicui') {
        items = items.filter((c) => c.source === 'magic-ui');
      } else if (sf === 'aceternity' || sf === 'ac' || sf === 'aceternity-ui') {
        items = items.filter((c) => c.source === 'aceternity');
      } else if (sf === 'zeuralabz-original' || sf === 'original') {
        items = items.filter((c) => c.source === 'zeuralabz-original');
      }
    }

    if (category) {
      items = items.filter((c) => c.category && c.category.toLowerCase() === category.toLowerCase());
      console.log(chalk.bold.magenta(`\nComponents in category "${category}" (${items.length}):\n`));
    } else {
      console.log(chalk.bold.magenta(`\nAll Components (${items.length}):\n`));
    }

    items.forEach((c) => {
      const sourceBadge =
        c.source === 'react-bits'
          ? chalk.blue('[React Bits]')
          : c.source === 'magic-ui'
          ? chalk.cyan('[Magic UI]')
          : c.source === 'aceternity'
          ? chalk.blueBright('[Aceternity UI]')
          : chalk.magenta('[ZEURALABZ]');
      console.log(`• ${chalk.bold.cyan(c.slug.padEnd(24))} ${sourceBadge} ${chalk.gray('—')} ${chalk.white(c.name)} [${chalk.green(c.category)}]`);
    });
    console.log(chalk.gray(`\nTo install any component: npx zeuralabz add <slug> --source <source>\n`));
  });

// 7. THEMES
program
  .command('themes')
  .description('List all 20 built-in aesthetic themes')
  .action(() => {
    const themes = getThemes();
    console.log(chalk.bold.magenta(`\nZEURALABZ Themes (${themes.length} available):\n`));
    themes.forEach((t) => {
      console.log(`• ${chalk.bold.cyan(t.name.padEnd(18))} ${chalk.yellow(t.mood.padEnd(20))} ${chalk.gray(t.description)}`);
    });
    console.log('');
  });

program.parse(process.argv);
