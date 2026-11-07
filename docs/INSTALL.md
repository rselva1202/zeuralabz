# VibeUI Installation & Workspace Setup Guide

VibeUI is designed to be installed once and used seamlessly across modern AI coding agents and development environments.

---

## 1. Quickstart (CLI)

You can run VibeUI in any React or Next.js project directly via `npx` without global installation:

```bash
# 1. Initialize configuration (detects React/Next.js and Tailwind)
npx vibe-ui init

# 2. Get AI-driven recommendations tailored to your project
npx vibe-ui suggest

# 3. Add an individual component
npx vibe-ui add aurora

# 4. Search components
npx vibe-ui search cards

# 5. Open live browser preview
npx vibe-ui preview aurora
```

---

## 2. Setting up VibeUI in AI Workspaces

### A. Antigravity Setup

1. Copy `SKILL.md` into your local `.gemini/antigravity/skills/vibe-ui/SKILL.md` or keep it at the root of your project.
2. In your Antigravity chat, simply ask:
   > "Scan my project and suggest the best VibeUI components for my landing page."

### B. Claude Desktop & Claude Code (MCP Server)

Add VibeUI MCP server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vibe-ui": {
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
    "vibe-ui": {
      "command": "npx",
      "args": ["-y", "vibe-ui", "mcp"]
    }
  }
}
```

### C. Cursor & Windsurf

In Cursor or Windsurf:
1. Open **Settings > Features > MCP Servers** (or `.cursorrules` / `.windsurfrules`).
2. Add a new MCP server:
   - **Name**: `vibe-ui`
   - **Type**: `command`
   - **Command**: `node ./mcp-server/index.js`
3. In Agent chat, prompt:
   > "@vibe-ui analyze my project and install the best hero and background."

### D. VS Code Copilot

1. Reference `SKILL.md` in `.github/copilot-instructions.md`.
2. Use Copilot Chat:
   > "Using VibeUI guidelines, recommend and install an animated card and button for my portfolio."

---

## 3. Project Configuration (`vibe-ui.json`)

When you run `npx vibe-ui init`, a `vibe-ui.json` file is placed in your project root:

```json
{
  "$schema": "https://rselva1202.github.io/vibe-ui/schema.json",
  "framework": "React + Vite",
  "tailwind": "Tailwind CSS v4",
  "typescript": true,
  "componentsDir": "src/components/vibe-ui",
  "defaultTheme": "dark-neon"
}
```

All installed components will automatically be placed into `componentsDir`.
