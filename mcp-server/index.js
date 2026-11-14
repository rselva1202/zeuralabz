#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeProject } from '../analyzer/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadRegistry() {
  const regPath = path.join(rootDir, 'components.json');
  if (fs.existsSync(regPath)) {
    return JSON.parse(fs.readFileSync(regPath, 'utf8'));
  }
  return [];
}

function loadThemes() {
  const themesPath = path.join(rootDir, 'themes', 'themes.json');
  if (fs.existsSync(themesPath)) {
    return JSON.parse(fs.readFileSync(themesPath, 'utf8'));
  }
  return [];
}

const server = new Server(
  {
    name: 'zeuralabz-mcp',
    version: '1.3.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tool schemas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'suggest_ui_for_project',
        description:
          'Analyzes a project directory structure, dependencies, and styling to suggest the 1 best component per section (Background, Layout, Hero, Cards, Text, Buttons, Extra Polish) prioritizing rich linked libraries (React Bits, Magic UI, Aceternity UI) and ZEURALABZ originals.',
        inputSchema: {
          type: 'object',
          properties: {
            targetDir: {
              type: 'string',
              description: 'Absolute or relative path to the project to analyze (defaults to current directory)',
            },
          },
        },
      },
      {
        name: 'search_components',
        description: 'Search ZEURALABZ component library across React Bits, Magic UI, Aceternity UI, and ZEURALABZ Originals by keyword, tag, source, or category.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Keyword to search for (e.g., aurora, 3d, tilt, glass, button, navbar)',
            },
            category: {
              type: 'string',
              description: 'Optional category filter: backgrounds, text-animations, buttons, cards, heroes, layouts, forms, animations, loaders',
            },
            source: {
              type: 'string',
              description: 'Optional source filter: "react-bits", "magic-ui", "aceternity", "lightswind", or "zeuralabz-original"',
            },
          },
        },
      },
      {
        name: 'install_component',
        description: 'Installs or generates installation code for a component from React Bits, Magic UI, Aceternity UI, Lightswind, or ZEURALABZ Original.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Slug of the component to install (e.g. aurora, magic-card, split-text, shimmer, noise-cloud-background, 3d-card-effect)',
            },
            source: {
              type: 'string',
              description: 'Source filter: "react-bits", "magic-ui", "aceternity", "lightswind", or "zeuralabz-original"',
            },
            targetDir: {
              type: 'string',
              description: 'Target project path (defaults to current directory)',
            },
          },
          required: ['slug'],
        },
      },
      {
        name: 'list_themes',
        description: 'Lists all 20 built-in aesthetic themes (colors, mood, styling rules) from ZEURALABZ design system.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'list_components',
        description: 'Lists all 755 components with optional category and source filtering across React Bits, Magic UI, Aceternity UI, Lightswind, and ZEURALABZ Originals.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Optional category filter: backgrounds, text-animations, buttons, cards, heroes, layouts, forms, animations, loaders',
            },
            source: {
              type: 'string',
              description: 'Optional source filter: "react-bits", "magic-ui", "aceternity", "lightswind", or "zeuralabz-original"',
            },
          },
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const registry = loadRegistry();

  if (name === 'suggest_ui_for_project') {
    const targetDir = args?.targetDir ? path.resolve(args.targetDir) : process.cwd();
    const analysis = analyzeProject(targetDir);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(analysis, null, 2),
        },
      ],
    };
  }

  if (name === 'search_components') {
    const query = (args?.query || '').toLowerCase();
    const category = (args?.category || '').toLowerCase();
    const source = (args?.source || '').toLowerCase();
    let results = registry;

    if (source) {
      results = results.filter((c) => c.source && c.source.toLowerCase() === source);
    }
    if (category) {
      results = results.filter((c) => c.category && c.category.toLowerCase() === category);
    }
    if (query) {
      results = results.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(query)) ||
          (c.slug && c.slug.toLowerCase().includes(query)) ||
          (c.description && c.description.toLowerCase().includes(query)) ||
          (c.tags && c.tags.some((t) => t.toLowerCase().includes(query)))
      );
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              totalMatches: results.length,
              components: results.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                source: c.source,
                sourceLabel: c.sourceLabel,
                category: c.category,
                description: c.description,
                bestFor: c.bestFor,
                deps: c.deps,
                installCommand: c.installCommand || c.zeuralabzCommand,
                originalUrl: c.originalUrl || c.previewUrl,
                previewUrl: c.previewUrl,
              })),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === 'install_component') {
    const slug = (args?.slug || '').trim().toLowerCase();
    const source = (args?.source || '').trim().toLowerCase();
    const targetDir = args?.targetDir ? path.resolve(args.targetDir) : process.cwd();

    let matches = registry.filter(
      (c) =>
        (c.slug && c.slug.toLowerCase() === slug) ||
        (c.id && c.id.toLowerCase() === slug)
    );

    if (source) {
      matches = matches.filter((c) => c.source && c.source.toLowerCase() === source);
    }

    if (matches.length === 0) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Component "${slug}" not found in ZEURALABZ registry.`,
          },
        ],
      };
    }

    // Default priority: React Bits -> Magic UI -> Aceternity -> ZEURALABZ Original
    const comp =
      matches.find((m) => m.source === 'react-bits') ||
      matches.find((m) => m.source === 'magic-ui') ||
      matches.find((m) => m.source === 'aceternity') ||
      matches[0];

    if (comp.source === 'react-bits') {
      const installCmd = comp.installCommand || `npx shadcn@latest add @react-bits/${comp.componentName}-TS-TW`;
      const usageSnippet = `import ${comp.componentName} from '@/components/${comp.componentName}';\n\nexport default function Example() {\n  return <${comp.componentName} />;\n}`;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                component: comp.name,
                source: 'react-bits',
                sourceLabel: 'React Bits • MIT + Commons Clause',
                installCommand: installCmd,
                originalUrl: comp.originalUrl,
                usage: usageSnippet,
                instructions: `Run "${installCmd}" inside your project to install directly from the official React Bits shadcn registry.`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (comp.source === 'magic-ui') {
      const installCmd = comp.installCommand || `npx shadcn@latest add https://magicui.design/r/${comp.slug}.json`;
      const usageSnippet = `import { ${comp.componentName || comp.name.replace(/[^a-zA-Z0-9]/g, '')} } from '@/components/magicui/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName || comp.name.replace(/[^a-zA-Z0-9]/g, '')} />;\n}`;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                component: comp.name,
                source: 'magic-ui',
                sourceLabel: 'Magic UI • MIT',
                installCommand: installCmd,
                originalUrl: comp.originalUrl,
                usage: usageSnippet,
                instructions: `Run "${installCmd}" inside your project to install directly from the official Magic UI shadcn registry.`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (comp.source === 'aceternity') {
      const installCmd = comp.installCommand || `npx shadcn@latest add @aceternity/${comp.slug}`;
      const usageSnippet = `import { ${comp.componentName || 'Component'} } from '@/components/ui/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName || 'Component'} />;\n}`;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                component: comp.name,
                source: 'aceternity',
                sourceLabel: 'Aceternity UI • MIT',
                installCommand: installCmd,
                originalUrl: comp.originalUrl,
                usage: usageSnippet,
                instructions: `Run "${installCmd}" inside your project or visit ${comp.originalUrl} to install from the official Aceternity registry.`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (comp.source === 'lightswind') {
      const installCmd = comp.installCommand || `npx lightswind add ${comp.slug}`;
      const usageSnippet = `import { ${comp.componentName || 'Component'} } from '@/components/lightswind/${comp.slug}';\n\nexport default function Example() {\n  return <${comp.componentName || 'Component'} />;\n}`;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                component: comp.name,
                source: 'lightswind',
                sourceLabel: 'Lightswind • MIT (linked, free only)',
                installCommand: installCmd,
                originalUrl: comp.originalUrl,
                usage: usageSnippet,
                instructions: `Run "${installCmd}" inside your project to install directly from the official Lightswind CLI.`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ZEURALABZ Original local copy
    const sourceDir = path.join(rootDir, 'components', comp.category, comp.slug);
    let destDir = path.join(targetDir, 'src', 'components', 'zeuralabz', comp.slug);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir);
    const copiedFiles = [];
    let tsxFileName = '';

    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.css') || file === 'info.json') {
        const srcPath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);
        const content = fs.readFileSync(srcPath, 'utf8');
        fs.writeFileSync(destPath, content, 'utf8');
        copiedFiles.push(file);

        if (file.endsWith('.tsx')) {
          tsxFileName = file;
        }
      }
    }

    const componentName = tsxFileName.replace('.tsx', '');
    const usageSnippet = `import { ${componentName} } from './components/zeuralabz/${comp.slug}/${componentName}';\n\nexport default function Example() {\n  return <${componentName} />;\n}`;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: true,
              component: comp.name,
              source: 'zeuralabz-original',
              installedTo: path.relative(targetDir, destDir),
              files: copiedFiles,
              dependencies: comp.deps,
              usage: usageSnippet,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === 'list_themes') {
    const themes = loadThemes();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(themes, null, 2),
        },
      ],
    };
  }

  if (name === 'list_components') {
    const category = (args?.category || '').toLowerCase();
    const source = (args?.source || '').toLowerCase();
    let results = registry;

    if (source) {
      results = results.filter((c) => c.source && c.source.toLowerCase() === source);
    }
    if (category) {
      results = results.filter((c) => c.category && c.category.toLowerCase() === category);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total: results.length,
              sourceFilter: source || 'all',
              categoryFilter: category || 'all',
              components: results.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                source: c.source,
                sourceLabel: c.sourceLabel,
                category: c.category,
                description: c.description,
                originalUrl: c.originalUrl || c.previewUrl,
                installCommand: c.zeuralabzCommand || c.installCommand,
              })),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  return {
    isError: true,
    content: [
      {
        type: 'text',
        text: `Unknown tool: ${name}`,
      },
    ],
  };
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch((error) => {
  console.error('Fatal MCP Server error:', error);
  process.exit(1);
});
