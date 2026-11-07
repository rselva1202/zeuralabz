# ✨ VibeUI

> **"Make any website look pretty — install once, let AI suggest the best UI for your project."**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Components](https://img.shields.io/badge/Components-120%2B-indigo.svg)](components.json)
[![Combinations](https://img.shields.io/badge/Combinations-1M%2B_Styles-cyan.svg)](docs/HOW-IT-WORKS.md)
[![Live Preview](https://img.shields.io/badge/Showcase-GitHub_Pages-emerald.svg)](https://rselva1202.github.io/vibe-ui)
[![MCP Protocol](https://img.shields.io/badge/Protocol-Model_Context_Protocol-purple.svg)](mcp-server/)

**VibeUI** is a public, open-source UI design system, AI project analyzer, and CLI tool designed specifically for developers and vibe-coders working in AI workspaces like **Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot**.

Instead of browsing endless component directories or wrestling with heavy UI libraries, VibeUI scans your project structure and **suggests the single best UI component for every part** of your site — background, hero, typography animations, cards, buttons, and micro-interactions — and installs the chosen code directly into your repository.

---

## ⚡ Live Preview Website
👉 **Explore the full interactive catalog:** **[rselva1202.github.io/vibe-ui](https://rselva1202.github.io/vibe-ui)**

---

## 💡 The 1,000,000+ Combinations Architecture

> **Transparency Note**: We do not claim 1,000,000 hand-written files on disk. Instead, VibeUI uses a **combinatorial design matrix** powered by an on-demand generator.

```
┌─────────────────┐      ┌───────────────┐      ┌──────────────────┐      ┌─────────────────┐
│ 150 Base Comps  │  ×   │   20 Themes   │  ×   │  20 Animations   │  ×   │   15 Layouts    │
└────────┬────────┘      └───────┬───────┘      └────────┬─────────┘      └────────┬────────┘
         │                       │                       │                         │
         └───────────────────────┴───────────┬───────────┴─────────────────────────┘
                                             ▼
                                900,000+ Combinations
                           + Parametric Radius & Typography
                                             ▼
                             1,000,000+ Unique UI Styles
```

- **150 Base Components**: Aurora, Bento, 3D Tilt, Glitch, Split-Text, Shimmer Buttons, etc.
- **20 Curated Themes**: `dark-neon`, `minimal-white`, `glass`, `aurora`, `retro-synth`, `cyberpunk`, `luxury-gold`, `midnight-violet`, etc.
- **20 Animation Presets**: Staggered spring reveals, ambient drifting mist, magnetic physics, and infinite marquees.
- **On-Demand Generator**: Generate custom tailored variants anytime via `node generator/generate.js --component <slug> --theme <theme>`.

---

## 🚀 Quickstart (CLI)

Run VibeUI directly in any React, Next.js, or Vite project via `npx`:

```bash
# 1. Initialize VibeUI configuration in your workspace
npx vibe-ui init

# 2. Analyze your project and get tailored 1-best-pick suggestions
npx vibe-ui suggest

# 3. Add an individual component
npx vibe-ui add aurora

# 4. Search components by keyword
npx vibe-ui search cards

# 5. Open live browser demo
npx vibe-ui preview aurora
```

---

## 🤖 The AI Analyzer (`vibe-ui suggest`)

When you run `npx vibe-ui suggest`, VibeUI scans your local project:
- Detects framework (`Next.js`, `Vite`, `React`), styling (`Tailwind v3` or `Tailwind v4`), and language (`TypeScript`).
- Classifies project persona (`SaaS`, `Portfolio`, `Dashboard`, `E-Commerce`, `Restaurant`).
- Identifies missing visual polish and prints **exactly 1 best pick per section**:

```text
Scanning your project...
React + Vite + Tailwind v4 found
Type: SAAS LANDING PAGE

Best UI components for you (1 per section):
═══════════════════════════════════════════════════════════════════
1. Background — Aurora Background
   Slug: aurora
   Preview: https://rselva1202.github.io/vibe-ui/preview/aurora
   Why: Living ambient waves elevate SaaS software aesthetics and create depth

2. Layout & Navigation — High-Converting SaaS Landing Structure
   Slug: landing
   Preview: https://rselva1202.github.io/vibe-ui/preview/landing
   Why: Balanced header and responsive layout structured for conversion

3. Hero Section — High-Impact Centered SaaS Hero
   Slug: center-hero
   Preview: https://rselva1202.github.io/vibe-ui/preview/center-hero
   Why: High-conversion hero layout with dynamic headline hierarchy tailored for landing projects

4. Cards & Features — Frosted Glassmorphism Card
   Slug: glass
   Preview: https://rselva1202.github.io/vibe-ui/preview/glass
   Why: Multi-tiered glass pricing cards build trust and drive subscriptions

5. Text Styles & Headlines — Split Character Spring Reveal
   Slug: split-text
   Preview: https://rselva1202.github.io/vibe-ui/preview/split-text
   Why: Smooth staggered reveal gives hero headline a cinematic first impression

6. Buttons & CTAs — Angled Metallic Shimmer Button
   Slug: shimmer
   Preview: https://rselva1202.github.io/vibe-ui/preview/shimmer
   Why: Subtle luminous light sweep draws the eye directly to your primary conversion action

7. Extra Animations & Polish — Viewport Intersection Spring Reveal
   Slug: scroll-reveal
   Preview: https://rselva1202.github.io/vibe-ui/preview/scroll-reveal
   Why: Infinite logo ribbon displays partner logos and social proof seamlessly
═══════════════════════════════════════════════════════════════════
? Pick numbers to install (e.g. 1, 3 or "all"): 
```

---

## 🔌 Model Context Protocol (MCP) Server

VibeUI exposes a full native MCP server allowing AI coding assistants to autonomously analyze, search, and install components.

### Available MCP Tools:
| Tool | Description |
| :--- | :--- |
| `suggest_ui_for_project` | Analyzes workspace stack and returns tailored 1-best-pick recommendations with preview links. |
| `search_components` | Queries VibeUI registry by keyword, category, or tag. |
| `install_component` | Installs component code and usage snippets directly into the project. |
| `list_themes` | Lists all 20 aesthetic themes with color palettes and styling rules. |

### MCP Setup:
Add to your `claude_desktop_config.json`, Cursor MCP settings, or Windsurf config:
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

---

## 📁 Repository Structure

```text
vibe-ui/
├── components/                  # 120+ Self-contained components
│   ├── backgrounds/             # Aurora, Galaxy, Particles, Grid, Gradient, Noise, Mesh...
│   ├── text-animations/         # Split-text, Typewriter, Gradient-text, Scramble...
│   ├── buttons/                 # Shimmer, Magnetic, Gradient, Neon, 3D, Liquid...
│   ├── cards/                   # Glass, 3D Tilt, Bento, Pricing, Hover-glow...
│   ├── heroes/                  # Center-hero, Split-hero, Video-hero, Particle-hero...
│   ├── layouts/                 # Landing, Dashboard, Sidebar, Floating Pill Nav...
│   ├── forms/                   # Floating-input, Search hotkey, Toggle, OTP...
│   ├── animations/              # Infinite Marquee, Scroll Reveal, Cursor Trail...
│   └── loaders/                 # Skeleton, Cyber Spinner, Pulsing Dots...
├── themes/                      # 20 Aesthetic design themes (themes.json)
├── templates/                   # 4 Production-ready full-page page assemblies
│   ├── landing-saas/            # SaaS landing page
│   ├── landing-portfolio/       # Developer / creator portfolio
│   ├── landing-restaurant/      # Fine dining & atmosphere landing page
│   └── dashboard-starter/       # Analytics & admin dashboard shell
├── analyzer/                    # Project detection and recommendation heuristics
├── cli/                         # vibe-ui CLI binary and commands
├── generator/                   # On-demand variant generator
├── mcp-server/                  # Model Context Protocol server for AI agents
├── preview-site/                # Showcase web app (GitHub Pages)
├── docs/                        # INSTALL.md, HOW-IT-WORKS.md, CONTRIBUTING.md
├── SKILL.md                     # AI Agent instruction manual
├── components.json              # Master component registry
└── package.json
```

---

## 🎨 Component Anatomy

Every component folder contains three independent implementations and full metadata:
```text
components/backgrounds/aurora/
├── AuroraBackground.tsx   # React 19 + TypeScript + Tailwind + Framer Motion
├── AuroraBackground.html  # Pure semantic HTML
├── AuroraBackground.css   # Standalone CSS
├── preview.svg            # Vector card asset
├── preview.png            # Screenshot asset
├── preview.gif            # Micro-animation asset
└── info.json              # Metadata, tags, dependencies & preview URL
```

---

## 📄 Templates Included

| Template | Persona | Key Features |
| :--- | :--- | :--- |
| **`templates/landing-saas`** | SaaS / Software | Aurora backdrop, centered hero, bento cards, shimmer CTA, floating nav |
| **`templates/landing-portfolio`** | Developer Portfolio | Cosmic galaxy canvas, 3D tilt cards, magnetic buttons, split hero |
| **`templates/landing-restaurant`** | Food & Hospitality | Ambient gradient, frosted glass menu, floating input reservation form |
| **`templates/dashboard-starter`** | Admin / Analytics | Collapsible rail sidebar, KPI metric cards, hotkey search, skeleton loader |

---

## 📜 License & Author

- **Author**: **[R. Selva](https://github.com/rselva1202)**
- **License**: **[MIT](LICENSE)** — free for personal and commercial projects.
