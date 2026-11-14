# ✨ ZEURALABZ

> **Autonomous UI Design Matrix for AI Coding Agents & Modern Developers**
> 
> *531 Base Components Across 4 Premier Sources • 1,000,000+ Combinatoric Styles • Install Once, Let AI Elevate Your Web Applications.*

[![npm version](https://img.shields.io/npm/v/zeuralabz.svg)](https://www.npmjs.com/package/zeuralabz)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Base Components](https://img.shields.io/badge/Base_Components-531-indigo.svg)](components.json)
[![Combinations](https://img.shields.io/badge/Combinations-1M%2B_Styles-emerald.svg)](docs/HOW-IT-WORKS.md)
[![Showcase Site](https://img.shields.io/badge/Showcase-GitHub_Pages-cyan.svg)](https://rselva1202.github.io/zeuralabz)
[![MCP Protocol](https://img.shields.io/badge/Protocol-Model_Context_Protocol-purple.svg)](mcp-server/)

---

## 🌟 What is ZEURALABZ?

**ZEURALABZ** is an intelligent component indexer, CLI suggester, and design matrix that unifies modern animated UI engineering for developers and autonomous AI coding agents (**Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot**).

Instead of wading through hundreds of fragmented libraries or wrestling with copy-paste boilerplate, ZEURALABZ inspects your project stack, detects missing animated sections, and **recommends the single best component per section** from **React Bits**, **Magic UI**, **Aceternity UI**, and **ZEURALABZ Originals** with exact installation commands.

👉 **Live Showcase Website**: [https://rselva1202.github.io/zeuralabz](https://rselva1202.github.io/zeuralabz) *(Showcase only — zero card grid clutter)*

---

## ⚡ The 531 Base Components Index

ZEURALABZ indexes **531 base components** across four verified sources:

| Source | Count | Origin / Author | License | Integration Method |
| :--- | :---: | :--- | :--- | :--- |
| **React Bits** | 218 | [David Haz](https://github.com/DavidHDev) ([reactbits.dev](https://reactbits.dev)) | MIT + Commons Clause | Linked official registry (`@react-bits/*`) |
| **Magic UI** | 79 | [Dillion Verma](https://github.com/magicuidesign) ([magicui.design](https://magicui.design)) | MIT | Linked official registry (`magicui.design/r/*.json`) |
| **Aceternity UI** | 114 | [Manu Arora](https://github.com/manuarora700) ([ui.aceternity.com](https://ui.aceternity.com)) | MIT / Aceternity Terms | Linked official registry (`@aceternity/*`) |
| **ZEURALABZ Originals** | 120 | [R. Selva](https://github.com/rselva1202) | MIT | Native handwritten canvas engines & motion primitives |
| **Total Base** | **531** | — | — | **Zero Third-Party Vendor Cloning** |

> **Attribution Integrity**: Linked third-party components are **never** cloned into `components/` as originals. ZEURALABZ connects to their official registries with complete author attribution.

---

## 💡 The 1,000,000+ Combinations Architecture

ZEURALABZ does not claim 1,000,000 hand-written files on disk. Instead, it provides **1,000,000+ deterministic combinations on demand** via its style synthesizer engine:

$$\text{Total Combinations} = 531 \text{ base components} \times 20 \text{ themes} \times 20 \text{ animations} \times 15 \text{ layouts} = 3,186,000 \ge 1\text{M+}$$

```
┌──────────────────┐      ┌───────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  531 Base Comps  │  ×   │   20 Themes   │  ×   │  20 Animations   │  ×   │   15 Layouts    │
└────────┬─────────┘      └───────┬───────┘      └────────┬─────────┘      └────────┬────────┘
         │                        │                       │                         │
         └────────────────────────┴───────────┬───────────┴─────────────────────────┘
                                              ▼
                                   3,186,000+ Combinations
                             + Parametric Radius & Typography
                                              ▼
                               1,000,000+ Unique UI Styles
```

- **20 Themes**: `dark-neon`, `minimal-white`, `glass`, `aurora`, `sunset`, `ocean`, `forest`, `candy`, `cyberpunk`, `luxury-gold`, `retro-synth`, `pastel-dream`, `brutalist`, `monochrome`, `emerald-vault`, `midnight-violet`, `solar-amber`, `crimson-tide`, `arctic-ice`, `deep-space`.
- **20 Animations**: `float`, `pulse`, `bounce`, `fade-in`, `slide-up`, `glow-sweep`, `shimmer`, `spring`, `kinetic`, `drift`, `reveal`, `flicker`, `stagger`, `spin-slow`, `ripple`, `wave`, `zoom`, `glitch`, `snap`, `tilt`.
- **15 Layouts**: `hero-center`, `hero-split`, `bento-3`, `bento-4`, `card-grid-3`, `card-grid-4`, `sidebar-left`, `sidebar-right`, `nav-floating`, `nav-minimal`, `section-contained`, `section-fullwidth`, `masonry-feed`, `timeline-vertical`, `dock-bottom`.

---

## 🚀 Quickstart (CLI)

Run ZEURALABZ directly in any project via `npx`:

```bash
# 1. Initialize configuration in your workspace
npx zeuralabz init

# 2. Analyze project and get 1-best-pick recommendations per section
npx zeuralabz suggest

# 3. Install any component across all 4 sources
npx zeuralabz add aurora-background --source aceternity
npx zeuralabz add animated-shiny-text --source magic-ui
npx zeuralabz add split-text --source react-bits
npx zeuralabz add bento

# 4. Generate a custom on-demand theme variant
npx zeuralabz generate aurora --theme ocean --animation float
npx zeuralabz generate shimmer --theme dark-neon --animation pulse
npx zeuralabz generate tilt --theme cyberpunk --animation kinetic

# 5. Search components across all 4 sources
npx zeuralabz search card

# 6. Open live official component preview
npx zeuralabz preview aurora-background --source aceternity

# 7. List components or inspect themes
npx zeuralabz list backgrounds
npx zeuralabz themes
```

---

## 🤖 The AI Project Analyzer

When you run `npx zeuralabz suggest`, the analyzer inspects your project:
- Detects framework (`Next.js`, `Vite`, `React`, `Astro`, `Remix`), styling (`Tailwind v3` or `Tailwind v4`), motion engine (`Framer Motion`, `GSAP`, `Three.js`), and language (`TypeScript`).
- Classifies project persona (`SaaS`, `Portfolio`, `Dashboard`, `E-Commerce`, `Restaurant`).
- Recommends **exactly 1 best pick per section** with reasoning and source badges:

```text
================================================================================
                   ZEURALABZ AUTONOMOUS PROJECT ANALYZER                       
================================================================================

Framework:        Next.js (App Router)
Styling:          Tailwind CSS v4
Motion Engine:    Framer Motion v12 / motion
Detected Persona: SAAS (Confidence: high)

--- RECOMMENDED ZEURALABZ ONE-BEST-PICK PLAN -----------------------------------

[1] SECTION: BACKGROUND
    Component: Aurora Background (aurora-background) [Aceternity UI • MIT]
    Why:       Soft ambient aurora shader waves create an ultra-modern dark aesthetic without distracting from copy.
    Install:   npx zeuralabz add aurora-background --source aceternity

[2] SECTION: HERO HEADLINE
    Component: Animated Shiny Text (animated-shiny-text) [Magic UI • MIT]
    Why:       Light reflection sweep highlights primary product value proposition with subtle metallic elegance.
    Install:   npx zeuralabz add animated-shiny-text --source magic-ui

[3] SECTION: FEATURE CARDS
    Component: Bento Grid Asymmetric Tile Card (bento) [ZEURALABZ Original • MIT]
    Why:       Asymmetrical modular bento layout organizes dense multi-tier SaaS features cleanly.
    Install:   npx zeuralabz add bento

[4] SECTION: BUTTONS & CTAS
    Component: Shimmer Button (shimmer-button) [Magic UI • MIT]
    Why:       High-converting primary action button featuring continuous specular reflection along the rim.
    Install:   npx zeuralabz add shimmer-button --source magic-ui

[5] SECTION: POLISH & LOADERS
    Component: Logo Loop (logo-loop) [React Bits • MIT + Commons Clause]
    Why:       Infinite seamless ribbon displays customer logos and social proof badges smoothly.
    Install:   npx zeuralabz add logo-loop --source react-bits
```

---

## 🔌 Model Context Protocol (MCP) Server

Connect ZEURALABZ directly into **Claude Desktop, Cursor, Windsurf, or Antigravity**:

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

### Available Tools:
- `suggest_ui_for_project`: Programmatic stack analysis and 1-best-pick design plan.
- `search_components`: Query 531 components by keyword, category, or source.
- `install_component`: Automated component installation and snippet generation.
- `list_themes`: Inspection of all 20 color palettes and themes.
- `list_components`: Listing of all 531 components with category/source filters.

---

## 📁 Repository Structure

```text
zeuralabz/
├── components/                  # 120 Native ZEURALABZ Originals
│   ├── backgrounds/             # Aurora, Galaxy, Particles, Dots, Grid, Gradient, Fireflies...
│   ├── text-animations/         # Split-text, Typewriter, Gradient-text, Scramble...
│   ├── buttons/                 # Shimmer, Glow, Magnetic, Gradient, 3D...
│   ├── cards/                   # Bento, 3D Tilt, Metric-trend, Product, Glass...
│   ├── heroes/                  # Center-hero, Split-hero, Isometric-hero...
│   ├── layouts/                 # Sidebar-layout, Floating-pill-nav, Landing...
│   ├── forms/                   # Floating-input, Search hotkey, Toggle...
│   ├── animations/              # Infinite Marquee, Scroll Reveal, Carousel...
│   └── loaders/                 # Circular progress, Skeleton, Cyber Spinner...
├── registry/                    # Official registry indexes
│   ├── react-bits.json          # 218 React Bits components
│   ├── magic-ui.json            # 79 Magic UI components
│   ├── aceternity.json          # 114 Aceternity UI components
│   ├── zeuralabz-original.json  # 120 ZEURALABZ Original components
│   └── index.json               # Master registry manifest (531 total)
├── themes/                      # 20 Aesthetic design themes (themes.json)
├── templates/                   # 4 Production-ready full-page assemblies
│   ├── landing-saas/            # SaaS landing page with Next.js & Tailwind
│   ├── landing-portfolio/       # Developer portfolio with Vite & React 19
│   ├── landing-restaurant/      # Restaurant landing page with Astro & Tailwind
│   └── dashboard-starter/       # Analytics dashboard shell with Next.js
├── analyzer/                    # Project detection and recommendation heuristics
├── cli/                         # zeuralabz CLI binary and commands
├── generator/                   # On-demand style synthesizer (1M+ combinations)
├── mcp-server/                  # Model Context Protocol server for AI agents
├── preview-site/                # Showcase website (GitHub Pages, 0 card grid)
├── docs/                        # INSTALL.md, HOW-IT-WORKS.md, CONTRIBUTING.md
├── SKILL.md                     # AI Agent instruction manual for Antigravity & Claude
├── ATTRIBUTION.md               # Upstream authors & license terms
├── components.json              # Master unified catalog (531 items)
└── package.json
```

---

## 📜 License & Attribution

- **ZEURALABZ Originals**: MIT License • Authored by **[R. Selva](https://github.com/rselva1202)**
- **React Bits**: MIT + Commons Clause • Authored by **[David Haz](https://github.com/DavidHDev)**
- **Magic UI**: MIT License • Authored by **[Dillion Verma](https://github.com/magicuidesign)**
- **Aceternity UI**: MIT License / Terms • Authored by **[Manu Arora](https://github.com/manuarora700)**
- Full attribution details available in **[ATTRIBUTION.md](ATTRIBUTION.md)**.
