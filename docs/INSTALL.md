# ZEURALABZ Installation & Workspace Setup Guide

ZEURALABZ is designed to be installed once and used seamlessly across modern AI coding agents and development environments.

---

## 1. Quickstart (CLI)

You can run ZEURALABZ in any React or Next.js project directly via `npx` without global installation:

```bash
# 1. Initialize configuration (detects React/Next.js and Tailwind)
npx zeuralabz init

# 2. Get AI-driven recommendations tailored to your project
npx zeuralabz suggest

# 3. Add an individual component
npx zeuralabz add aurora

# 4. Search components
npx zeuralabz search cards

# 5. Open live browser preview
npx zeuralabz preview aurora
```

---

## 2. Setting up ZEURALABZ in AI Workspaces

### A. Antigravity Setup

1. Copy `SKILL.md` into your local `.gemini/antigravity/skills/zeuralabz/SKILL.md` or keep it at the root of your project.
2. In your Antigravity chat, simply ask:
   > "Scan my project and suggest the best ZEURALABZ components for my landing page."

### B. Claude Desktop & Claude Code (MCP Server)

Add ZEURALABZ MCP server to your `claude_desktop_config.json`:

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

Or when published to npm:
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
   > "@zeuralabz analyze my project and install the best hero and background."

### D. VS Code Copilot

1. Reference `SKILL.md` in `.github/copilot-instructions.md`.
2. Use Copilot Chat:
   > "Using ZEURALABZ guidelines, recommend and install an animated card and button for my portfolio."

---

## 3. Project Configuration (`zeuralabz.json`)

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

All installed components will automatically be placed into `componentsDir`.

