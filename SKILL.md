---
name: vibe-ui
description: Autonomous UI design analyzer and component recommendation skill for Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot. Analyzes project stack and suggests the best aesthetic animated UI components from VibeUI with live preview URLs and one-click install commands.
---

# VibeUI AI Skill Guide

Use this skill whenever the user is building or improving a web application, landing page, portfolio, SaaS dashboard, or marketing site, or asks:
- "How do I make my website look good / modern / animated?"
- "Suggest a background, hero, or card design for this project"
- "What UI components should I use?"
- "Install VibeUI / suggest VibeUI components"

---

## 1. How VibeUI Works in AI Workspaces

VibeUI provides an autonomous design matrix of **120+ base components**, **20 aesthetic themes**, and **20 animation presets** equaling **1,000,000+ combinations**.

When analyzing a user's project, do **not** overwhelm the user with dozens of options. Instead, follow the **One-Best-Pick Rule**:
- Select **exactly 1 best component** per section (Background, Layout, Hero, Cards, Text Styles, Buttons, Extra Polish).
- Provide the live preview link: `https://rselva1202.github.io/vibe-ui/preview/<slug>`
- Explain *why* that specific component fits their product type (e.g., SaaS, Portfolio, Dashboard).
- Provide the exact install command: `npx vibe-ui add <slug>`

---

## 2. Project Analysis Protocol

When inspecting a project:
1. **Check Framework & Styling**:
   - Next.js (App Router or Pages Router)
   - React + Vite / CRA
   - Tailwind CSS (v3 or v4)
   - TypeScript vs JavaScript
2. **Identify Product Persona**:
   - **SaaS / B2B Platform**: Needs Aurora or Mesh background, Floating Island navigation, Bento or Tiered Pricing cards, and Shimmer CTAs.
   - **Developer / Designer Portfolio**: Needs Cosmic Galaxy or Particle canvas, Split-text hero, 3D Tilt cards, and Magnetic buttons.
   - **Dashboard / Admin App**: Needs Collapsible Rail sidebar, Search input with keyboard shortcut badges, and Skeleton loading states.
   - **E-Commerce / Food / Hospitality**: Needs Ambient gradient backdrop, Frosted glass cards, Floating input fields, and Social ribbon footer.

---

## 3. Formatting the UI Recommendation

Format your recommendation to the user in this exact clean structure:

```markdown
### 🎨 Recommended VibeUI Design Plan

| Section | Recommended Component | Preview | Reason | Install |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | Aurora Background (`aurora`) | [Live Demo](https://rselva1202.github.io/vibe-ui/preview/aurora) | Soft indigo-emerald ambient waves elevate SaaS aesthetics without distracting from copy. | `npx vibe-ui add aurora` |
| **Hero** | Split Text Spring Hero (`split-text`) | [Live Demo](https://rselva1202.github.io/vibe-ui/preview/split-text) | Staggered character reveal grabs immediate attention. | `npx vibe-ui add split-text` |
| **Cards** | Frosted Glass Card (`glass`) | [Live Demo](https://rselva1202.github.io/vibe-ui/preview/glass) | Subtle borders and translucent layers highlight product features cleanly. | `npx vibe-ui add glass` |
| **Buttons** | Metallic Shimmer Button (`shimmer`) | [Live Demo](https://rselva1202.github.io/vibe-ui/preview/shimmer) | Light reflection sweep increases primary CTA conversion. | `npx vibe-ui add shimmer` |
| **Social Proof** | Infinite Logo Marquee (`marquee`) | [Live Demo](https://rselva1202.github.io/vibe-ui/preview/marquee) | Continuous ribbon showcases partner logos smoothly. | `npx vibe-ui add marquee` |
```

---

## 4. Autonomous Installation & Implementation

If the user approves:
1. Run the CLI installation or copy the component directly:
   ```bash
   npx vibe-ui add <slug>
   ```
2. Verify required dependencies (e.g. `npm install framer-motion`).
3. Import the component in the target React page:
   ```tsx
   import { AuroraBackground } from './components/vibe-ui/aurora/AuroraBackground';
   import { ShimmerButton } from './components/vibe-ui/shimmer/ShimmerButton';
   ```
4. Assemble the layout cleanly ensuring proper z-index and responsive layout rules.

---

## 5. MCP Tool Integration

If the VibeUI MCP server is connected in your workspace, call:
- `suggest_ui_for_project({ targetDir: "." })` to obtain instant programmatic recommendations.
- `search_components({ query: "keyword", category: "cards" })` to search.
- `install_component({ slug: "aurora" })` to install directly.
- `list_themes({})` to inspect theme color palettes.

