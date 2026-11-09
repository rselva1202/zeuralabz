#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import open from 'open';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Find component by slug
function findComponent(slug) {
  const registry = getRegistry();
  return registry.find(c => (c.slug && c.slug.toLowerCase() === slug.toLowerCase()) || (c.id && c.id.toLowerCase() === slug.toLowerCase()));
}

// Install a component to target project
export async function installComponent(slug, targetDir = process.cwd(), options = {}) {
  const comp = findComponent(slug);
  if (!comp) {
    console.log(chalk.red(`\n✖ Component "${slug}" not found in ZEURALABZ registry.`));
    return false;
  }

  // Load zeuralabz.json config if present
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
    console.log(chalk.red(`\n✖ Source folder for "${comp.slug}" not found.`));
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

  console.log(chalk.green(`\n✔ Installed ${chalk.bold(comp.name)} to ${path.relative(targetDir, destDir)}`));

  // Check dependencies
  if (comp.deps && comp.deps.length > 0) {
    console.log(chalk.yellow(`\n📦 Dependencies required:`));
    console.log(chalk.cyan(`   npm install ${comp.deps.join(' ')}`));
  }

  // Print import instruction
  const tsxFile = files.find(f => f.endsWith('.tsx') && (f === `${comp.componentName}.tsx` || f.toLowerCase().includes(comp.slug.toLowerCase()))) || files.find(f => f.endsWith('.tsx'));
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
  .version('1.1.0');

// 1. INIT
program
  .command('init')
  .description('Initialize ZEURALABZ configuration in your project')
  .option('-y, --yes', 'Skip prompts and use sensible defaults')
  .action(async (options) => {
    console.log(chalk.bold.magenta('\n✨ Initializing ZEURALABZ in your project...\n'));
    const analysis = analyzeProject(process.cwd());

    console.log(chalk.gray(`Detected environment:`));
    console.log(`  ${chalk.cyan('• Framework:')} ${chalk.bold(analysis.framework)}`);
    console.log(`  ${chalk.cyan('• Styling:')}   ${chalk.bold(analysis.tailwind)}`);
    console.log(`  ${chalk.cyan('• Language:')}  ${chalk.bold(analysis.typescript ? 'TypeScript' : 'JavaScript')}`);

    let componentsDir = 'src/components/zeuralabz';
    let defaultTheme = 'dark-neon';

    if (!options.yes && process.stdin.isTTY) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'componentsDir',
          message: 'Where would you like to install ZEURALABZ components?',
          default: 'src/components/zeuralabz'
        },
        {
          type: 'list',
          name: 'defaultTheme',
          message: 'Choose your default aesthetic theme:',
          choices: [
            'dark-neon',
            'minimal-white',
            'glass',
            'aurora',
            'retro-synth',
            'cyberpunk',
            'luxury-gold',
            'emerald-vault',
            'midnight-violet'
          ],
          default: 'dark-neon'
        }
      ]);
      componentsDir = answers.componentsDir;
      defaultTheme = answers.defaultTheme;
    }

    const config = {
      $schema: 'https://rselva1202.github.io/zeuralabz/schema.json',
      framework: analysis.framework,
      tailwind: analysis.tailwind,
      typescript: analysis.typescript,
      componentsDir: componentsDir,
      defaultTheme: defaultTheme,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(path.join(process.cwd(), 'zeuralabz.json'), JSON.stringify(config, null, 2), 'utf8');
    console.log(chalk.green(`\n✔ Created ${chalk.bold('zeuralabz.json')} successfully!`));
    console.log(chalk.gray(`Run ${chalk.cyan('npx zeuralabz suggest')} to get AI suggestions for your site.\n`));
  });

// 2. SUGGEST
program
  .command('suggest')
  .description('Scan current project and suggest the best UI components for every section')
  .option('-p, --pick <numbers>', 'Comma-separated recommendation numbers to install (e.g. 1,3)')
  .option('-a, --all', 'Install all suggested components')
  .action(async (options) => {
    const spinner = ora('Scanning your project with ZEURALABZ Analyzer...').start();
    await new Promise(r => setTimeout(r, 600));
    const analysis = analyzeProject(process.cwd());
    spinner.succeed(chalk.green('Project scanned successfully!\n'));

    console.log(chalk.bold(`Detected: ${chalk.cyan(analysis.framework)} + ${chalk.cyan(analysis.tailwind)}`));
    console.log(chalk.bold(`Project Type: ${chalk.yellow(analysis.projectType.toUpperCase())}\n`));

    console.log(chalk.bold.magenta('Best UI components for you (1 per section):'));
    console.log(chalk.gray('═══════════════════════════════════════════════════════════════════'));

    analysis.recommendations.forEach((item, index) => {
      console.log(chalk.bold(`${chalk.cyan(index + 1)}. ${item.section} — ${chalk.white(item.name)}`));
      console.log(`   ${chalk.gray('Slug:')} ${chalk.green(item.slug)}`);
      console.log(`   ${chalk.gray('Preview:')} ${chalk.blue.underline(item.previewUrl)}`);
      console.log(`   ${chalk.gray('Why:')} ${item.why}\n`);
    });

    console.log(chalk.gray('═══════════════════════════════════════════════════════════════════'));

    let selection = options.all ? 'all' : options.pick;

    if (!selection && process.stdin.isTTY) {
      const promptRes = await inquirer.prompt([
        {
          type: 'input',
          name: 'selection',
          message: 'Pick numbers to install (e.g. 1, 3 or "all" or press Enter to skip):',
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
      toInstall = analysis.recommendations.map(r => r.slug);
    } else {
      const indices = selection.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 1 && n <= analysis.recommendations.length);
      toInstall = indices.map(i => analysis.recommendations[i - 1].slug);
    }

    if (toInstall.length === 0) {
      console.log(chalk.yellow('\nNo valid component numbers entered.'));
      return;
    }

    console.log(chalk.magenta(`\nInstalling ${toInstall.length} component(s)...`));
    for (const slug of toInstall) {
      await installComponent(slug, process.cwd());
    }
    console.log(chalk.bold.green('All selected components installed ready to use!\n'));
  });

// 3. ADD
program
  .command('add <slug>')
  .description('Install a component into your project by its slug (e.g. aurora, split-text)')
  .action(async (slug) => {
    await installComponent(slug, process.cwd());
  });

// 4. SEARCH
program
  .command('search <query>')
  .description('Search ZEURALABZ components by keyword or tag')
  .action((query) => {
    const registry = getRegistry();
    const q = query.toLowerCase();
    const matches = registry.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );

    console.log(chalk.bold.magenta(`\nFound ${matches.length} component(s) matching "${query}":\n`));

    if (matches.length === 0) {
      console.log(chalk.gray('No matches found. Try searching for "background", "hero", "card", or "button".\n'));
      return;
    }

    matches.forEach((c) => {
      console.log(`• ${chalk.bold.cyan(c.name)} (${chalk.yellow(c.slug)}) [${chalk.green(c.category)}]`);
      console.log(`  ${chalk.gray(c.description)}`);
      console.log(`  ${chalk.blue.underline(c.previewUrl)}\n`);
    });
  });

// 5. PREVIEW
program
  .command('preview <slug>')
  .description('Open the live web preview of a component in your browser')
  .action(async (slug) => {
    const comp = findComponent(slug);
    const url = comp ? comp.previewUrl : `https://rselva1202.github.io/zeuralabz/preview/${slug}`;
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
  .action((category) => {
    const registry = getRegistry();
    let items = registry;
    if (category) {
      items = registry.filter(c => c.category.toLowerCase() === category.toLowerCase());
      console.log(chalk.bold.magenta(`\nZEURALABZ Components in category "${category}" (${items.length}):\n`));
    } else {
      console.log(chalk.bold.magenta(`\nAll ZEURALABZ Components (${items.length}):\n`));
    }

    items.forEach(c => {
      console.log(`• ${chalk.bold.cyan(c.slug.padEnd(24))} ${chalk.gray('—')} ${chalk.white(c.name)} [${chalk.green(c.category)}]`);
    });
    console.log(chalk.gray(`\nTo install any component: npx zeuralabz add <slug>\n`));
  });

// 7. THEMES
program
  .command('themes')
  .description('List all 20 built-in aesthetic themes')
  .action(() => {
    const themes = getThemes();
    console.log(chalk.bold.magenta(`\nZEURALABZ Themes (${themes.length} available):\n`));
    themes.forEach(t => {
      console.log(`• ${chalk.bold.cyan(t.name.padEnd(18))} ${chalk.yellow(t.mood.padEnd(20))} ${chalk.gray(t.description)}`);
    });
    console.log('');
  });

program.parse(process.argv);

