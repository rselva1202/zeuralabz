---
name: zeuralabz
description: Autonomous UI design analyzer and component recommendation skill for Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot. Analyzes project stack and suggests the best aesthetic animated UI components from ZEURALABZ with live preview URLs and one-click install commands.
---

# ZEURALABZ AI Skill Guide

Use this skill whenever the user is building or improving a web application, landing page, portfolio, SaaS dashboard, or marketing site, or asks:
- "How do I make my website look good / modern / animated?"
- "Suggest a background, hero, or card design for this project"
- "What UI components should I use?"
- "Install ZEURALABZ / suggest ZEURALABZ components"

---

## 1. How ZEURALABZ Works in AI Workspaces

ZEURALABZ provides an autonomous design matrix of **531 components** across four verified sources:
- **React Bits (218 components)**: Linked official registry (`@react-bits/...-TS-TW`)
- **Magic UI (79 components)**: Linked official registry (`https://magicui.design/r/<slug>.json`)
- **Aceternity UI (114 components)**: Linked official registry (`@aceternity/<slug>`)
- **ZEURALABZ Originals (120 components)**: Direct copy (`src/components/zeuralabz/<slug>/`)
Combined with **20 aesthetic themes** and **20 animation presets** equaling **1,000,000+ combinations**.

When analyzing a user's project, do **not** overwhelm the user with dozens of options. Instead, follow the **One-Best-Pick Rule**:
- Select **exactly 1 best component** per section (Background, Layout, Hero, Cards, Text Styles, Buttons, Extra Polish).
- Prioritize high-quality linked sources: 1. React Bits, 2. Magic UI, 3. Aceternity UI, 4. ZEURALABZ Original.
- Provide the official preview/docs link.
- Explain *why* that specific component fits their product type (e.g., SaaS, Portfolio, Dashboard).
- Provide the exact install command: `npx zeuralabz add <slug> --source <source>`

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
### 🎨 Recommended ZEURALABZ Design Plan

| Section | Recommended Component | Preview | Reason | Install |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | Aurora Background (`aurora`) | [Live Demo](https://rselva1202.github.io/zeuralabz/preview/aurora) | Soft indigo-emerald ambient waves elevate SaaS aesthetics without distracting from copy. | `npx zeuralabz add aurora` |
| **Hero** | Split Text Spring Hero (`split-text`) | [Live Demo](https://rselva1202.github.io/zeuralabz/preview/split-text) | Staggered character reveal grabs immediate attention. | `npx zeuralabz add split-text` |
| **Cards** | Frosted Glass Card (`glass`) | [Live Demo](https://rselva1202.github.io/zeuralabz/preview/glass) | Subtle borders and translucent layers highlight product features cleanly. | `npx zeuralabz add glass` |
| **Buttons** | Metallic Shimmer Button (`shimmer`) | [Live Demo](https://rselva1202.github.io/zeuralabz/preview/shimmer) | Light reflection sweep increases primary CTA conversion. | `npx zeuralabz add shimmer` |
| **Social Proof** | Infinite Logo Marquee (`marquee`) | [Live Demo](https://rselva1202.github.io/zeuralabz/preview/marquee) | Continuous ribbon showcases partner logos smoothly. | `npx zeuralabz add marquee` |
```

---

## 4. Autonomous Installation & Implementation

If the user approves:
1. Run the CLI installation or copy the component directly:
   ```bash
   npx zeuralabz add <slug>
   ```
2. Verify required dependencies (e.g. `npm install framer-motion`).
3. Import the component in the target React page:
   ```tsx
   import { AuroraBackground } from './components/zeuralabz/aurora/AuroraBackground';
   import { ShimmerButton } from './components/zeuralabz/shimmer/ShimmerButton';
   ```
4. Assemble the layout cleanly ensuring proper z-index and responsive layout rules.

---

## 5. Linked Sources — React Bits, Magic UI & Aceternity UI

ZEURALABZ indexes verified third-party component libraries alongside native originals.

- **Recommendation Hierarchy**: For backgrounds, text animations, cards, and complex micro-interactions, ZEURALABZ prioritizes official linked components (React Bits first, Magic UI second, Aceternity third, Originals fourth) because they are visually rich, production-tested, and performance-tuned.
- **Zero Local Redistribution**: React Bits, Magic UI, and Aceternity UI source codes are **never** copied into `components/` in this repo.
- **Official Registry Installation**:
  - React Bits:
    ```bash
    npx zeuralabz add aurora --source react-bits
    # Installs via: npx shadcn@latest add @react-bits/Aurora-TS-TW
    ```
  - Magic UI:
    ```bash
    npx zeuralabz add magic-card --source magic-ui
    # Installs via: npx shadcn@latest add https://magicui.design/r/magic-card.json
    ```
  - Aceternity UI:
    ```bash
    npx zeuralabz add 3d-card-effect --source aceternity
    # Installs via: npx shadcn@latest add @aceternity/3d-card-effect
    ```
- **Attribution & Licencing**: Every recommendation displays the source label (`React Bits • MIT + Commons Clause`, `Magic UI • MIT`, or `Aceternity UI • MIT`) and links to official documentation ([reactbits.dev](https://reactbits.dev) / [magicui.design](https://magicui.design) / [ui.aceternity.com](https://ui.aceternity.com)).
- **User Confirmation**: The CLI and AI assistant always present the source label and ask user confirmation before running the install.

---

## 6. MCP Tool Integration

If the ZEURALABZ MCP server is connected in your workspace, call:
- `suggest_ui_for_project({ targetDir: "." })` to obtain instant programmatic recommendations.
- `search_components({ query: "keyword", category: "cards", source: "react-bits" })` to search.
- `install_component({ slug: "aurora", source: "react-bits" })` to install directly.
- `list_themes({})` to inspect theme color palettes.

