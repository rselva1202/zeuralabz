# ZEURALABZ Installation & Workspace Setup Guide

ZEURALABZ is an intelligent component indexer, CLI suggester, and design matrix that unifies modern animated UI engineering for developers and autonomous AI coding agents.

Install once and use seamlessly across **Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot**.

---

## 1. Quickstart (CLI)

Run ZEURALABZ in any React, Next.js, Vite, or Astro project directly via `npx` without global installation:

```bash
# 1. Initialize configuration in your project (detects framework, Tailwind, and sets componentsDir)
npx zeuralabz init

# 2. Analyze project and get AI-driven 1-best-pick recommendations per section
npx zeuralabz suggest

# 3. Add an individual component (supports all 4 verified sources)
npx zeuralabz add aurora
npx zeuralabz add aurora-background --source aceternity
npx zeuralabz add animated-shiny-text --source magic-ui
npx zeuralabz add split-text --source react-bits
npx zeuralabz add bento

# 4. Generate a custom on-demand theme variant (1M+ combinations)
npx zeuralabz generate aurora --theme ocean --animation float
npx zeuralabz generate shimmer --theme dark-neon --animation pulse
npx zeuralabz generate tilt --theme cyberpunk --animation kinetic

# 5. Search components across all 4 sources with badges
npx zeuralabz search card
npx zeuralabz search button --source magic-ui

# 6. Open live official documentation / preview
npx zeuralabz preview aurora-background --source aceternity

# 7. List components with optional category or source filter
npx zeuralabz list backgrounds
npx zeuralabz list --source react-bits

# 8. List all 20 built-in aesthetic themes
npx zeuralabz themes
```

---

## 2. Multi-Source Architecture (10,134 Base Components)

ZEURALABZ indexes **10,134 base components** across six verified sources:

- **React Bits (218 components)**: Linked official registry (`@react-bits/*`, [reactbits.dev](https://reactbits.dev)) • David Haz (MIT + Commons Clause)
  ```bash
  npx zeuralabz add <slug> --source react-bits
  # Direct official: npx @react-bits/cli add <slug>
  ```
- **Magic UI (79 components)**: Linked official registry (`https://magicui.design/r/<slug>.json`, [magicui.design](https://magicui.design)) • Dillion Verma (MIT)
  ```bash
  npx zeuralabz add <slug> --source magic-ui
  # Direct official: npx shadcn@latest add https://magicui.design/r/<slug>.json
  ```
- **Aceternity UI (114 components)**: Linked official registry (`@aceternity/*`, [ui.aceternity.com](https://ui.aceternity.com)) • Manu Arora (MIT)
  ```bash
  npx zeuralabz add <slug> --source aceternity
  # Direct official: npx shadcn@latest add @aceternity/<slug>
  ```
- **Lightswind (224 components)**: Linked official CLI & registry (`https://lightswind.com/components/<slug>`, [lightswind.com](https://lightswind.com)) • Muhilan (MIT, linked, free only)
  ```bash
  npx zeuralabz add <slug> --source lightswind
  # Direct official: npx lightswind add <slug>
  ```
- **ZEURALABZ Originals (120 components)**: Native handwritten canvas engines and motion primitives (`components/<category>/<slug>`) • R. Selva (MIT)
  ```bash
  npx zeuralabz add <slug>
  ```

> **Zero Third-Party Vendor Cloning**: Linked components are installed directly from upstream registries with attribution and terms intact. ZEURALABZ Originals are 100% original, handwritten motion primitives and canvas engines.

---

## 3. Setting up ZEURALABZ in AI Workspaces

### A. Antigravity Setup

1. Copy `SKILL.md` from repo root into your Antigravity skills directory (or keep it in your workspace root).
2. In your Antigravity chat, simply ask:
   > "Scan my project and suggest the best ZEURALABZ animated components for my SaaS landing page."

### B. Claude Desktop & Claude Code (MCP Server)

Add the ZEURALABZ MCP server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zeuralabz": {
      "command": "node",
      "args": ["d:/MY PROJECTS/ZEURALABZ/mcp-server/index.js"]
    }
  }
}
```

Or when running via npx:
```json
{
  "mcpServers": {
    "zeuralabz": {
      "command": "npx",
      "args": ["-y", "zeuralabz", "mcp"]
    }
  }
}
```

### C. Cursor & Windsurf

In Cursor or Windsurf:
1. Open **Settings > Features > MCP Servers** (or `.cursorrules` / `.windsurfrules`).
2. Add a new MCP server:
   - **Name**: `zeuralabz`
   - **Type**: `command`
   - **Command**: `node ./mcp-server/index.js`
3. In Agent chat, prompt:
   > "@zeuralabz analyze my project and install the best hero headline and animated background."

### D. VS Code Copilot

1. Reference `SKILL.md` in `.github/copilot-instructions.md`.
2. In Copilot Chat:
   > "Using ZEURALABZ guidelines, recommend and install an animated card and button for my portfolio."

---

## 4. MCP Server Tools Reference

The ZEURALABZ MCP server exposes 5 tools:

| MCP Tool | Description |
| :--- | :--- |
| `suggest_ui_for_project` | Analyzes workspace stack and returns tailored 1-best-pick recommendations with preview links. |
| `search_components` | Queries 10,134 base components across all 6 sources by keyword, category, or source. |
| `install_component` | Installs component code and usage snippets directly into the project. |
| `list_themes` | Lists all 20 aesthetic themes with color palettes and styling rules. |
| `list_components` | Lists all 10,134 components with optional category or source filters across 6 sources. |

---

## 5. Project Configuration (`zeuralabz.json`)

When you run `npx zeuralabz init`, a `zeuralabz.json` file is placed in your project root:

```json
{
  "$schema": "https://rselva1202.github.io/zeuralabz/schema.json",
  "framework": "React + Vite",
  "tailwind": "Tailwind CSS v4",
  "typescript": true,
  "componentsDir": "src/components/zeuralabz",
  "defaultTheme": "dark-neon"
}
```
