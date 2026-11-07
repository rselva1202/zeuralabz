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
    name: 'vibe-ui-mcp',
    version: '1.0.0',
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
          'Analyzes a project directory structure, dependencies, and styling to suggest the 1 best VibeUI component for every section (Background, Layout, Hero, Cards, Text, Buttons, Extra Polish) with live preview URLs and reasons.',
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
        description: 'Search VibeUI component library by keyword, tag, or category to find animated backgrounds, cards, buttons, etc.',
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
          },
        },
      },
      {
        name: 'install_component',
        description: 'Installs a VibeUI component into the target project (writes React .tsx, HTML, CSS files, and provides usage code).',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Slug of the component to install (e.g. aurora, split-text, shimmer, glass)',
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
        description: 'Lists all 20 built-in aesthetic themes (colors, mood, styling rules) from VibeUI design system.',
        inputSchema: {
          type: 'object',
          properties: {},
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
    let results = registry;

    if (category) {
      results = results.filter((c) => c.category.toLowerCase() === category);
    }
    if (query) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query))
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
                name: c.name,
                slug: c.slug,
                category: c.category,
                description: c.description,
                bestFor: c.bestFor,
                deps: c.deps,
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
    const targetDir = args?.targetDir ? path.resolve(args.targetDir) : process.cwd();

    const comp = registry.find((c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug);
    if (!comp) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Component "${slug}" not found in VibeUI registry.`,
          },
        ],
      };
    }

    const sourceDir = path.join(rootDir, 'components', comp.category, comp.slug);
    let destDir = path.join(targetDir, 'src', 'components', 'vibe-ui', comp.slug);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir);
    const copiedFiles = [];
    let tsxContent = '';
    let tsxFileName = '';

    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.css') || file === 'info.json') {
        const srcPath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);
        const content = fs.readFileSync(srcPath, 'utf8');
        fs.writeFileSync(destPath, content, 'utf8');
        copiedFiles.push(file);

        if (file.endsWith('.tsx')) {
          tsxContent = content;
          tsxFileName = file;
        }
      }
    }

    const componentName = tsxFileName.replace('.tsx', '');
    const usageSnippet = `import { ${componentName} } from './components/vibe-ui/${comp.slug}/${componentName}';\n\nexport default function Example() {\n  return <${componentName} />;\n}`;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: true,
              message: `Installed ${comp.name} into ${destDir}`,
              slug: comp.slug,
              files: copiedFiles,
              dependencies: comp.deps,
              npmInstallCommand: comp.deps.length > 0 ? `npm install ${comp.deps.join(' ')}` : null,
              usageSnippet,
              code: tsxContent,
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

  return {
    isError: true,
    content: [{ type: 'text', text: `Unknown tool "${name}"` }],
  };
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch((error) => {
  console.error('Fatal error in VibeUI MCP server:', error);
  process.exit(1);
});

