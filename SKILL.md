---
name: zeuralabz
description: Autonomous UI design analyzer and component recommendation skill for Antigravity, Claude Code, Cursor, Windsurf, and VS Code Copilot. Analyzes project stack, synthesizes 1M+ animated styles on demand, and recommends the best picks across 531 components from React Bits, Magic UI, Aceternity UI, and ZEURALABZ Originals with exact install commands.
---

# ZEURALABZ AI Skill — Autonomous UI Design Matrix (1M+ Styles)

Use this skill whenever the user is building or improving a web application, landing page, portfolio, SaaS dashboard, e-commerce storefront, or marketing site, or asks:
- "How do I make my website look good / modern / animated?"
- "Suggest a background, hero, or card design for this project"
- "What UI components should I use?"
- "Install ZEURALABZ / suggest animated components"
- "Generate a custom component style / theme"

---

## 1. How ZEURALABZ Works in AI Workspaces

ZEURALABZ is an intelligent component indexer, CLI suggester, and design matrix that unifies modern animated UI engineering for developers and autonomous AI coding agents.

### Unified 531 Base Components Across 4 Sources
1. **React Bits (218 components)**: Linked official registry (`@react-bits/*`, [reactbits.dev](https://reactbits.dev)) • David Haz (MIT + Commons Clause)
2. **Magic UI (79 components)**: Linked official registry (`https://magicui.design/r/<slug>.json`, [magicui.design](https://magicui.design)) • Dillion Verma (MIT)
3. **Aceternity UI (114 components)**: Linked official registry (`@aceternity/*`, [ui.aceternity.com](https://ui.aceternity.com)) • Manu Arora (MIT)
4. **ZEURALABZ Originals (120 components)**: Native handwritten canvas engines and motion primitives (`components/<category>/<slug>`) • R. Selva (MIT)

### The 1M+ Combinations Formula
ZEURALABZ does not claim 1,000,000 hand-written files on disk. Instead, it provides **1,000,000+ deterministic combinations on demand** via its style synthesizer engine:
$$\text{Total Combinations} = 531 \text{ base components} \times 20 \text{ aesthetic themes} \times 20 \text{ animation presets} \times 15 \text{ layout structures} = 3,186,000 \ge 1\text{M+}$$

Agents can instantiate any base component in any of the 20 verified color themes and motion styles instantly using `npx zeuralabz generate`.

---

## 2. Autonomous Project Scanning Protocol

When inspecting a user workspace, the AI agent must systematically scan the environment before making recommendations:

### Step 1: Detect Framework & Tooling (`package.json`)
- **Framework**: Next.js (App Router `app/` vs Pages Router `pages/`), Vite React, Remix, Astro, Gatsby.
- **Styling**: Tailwind CSS v3 (`tailwind.config.js`) vs Tailwind CSS v4 (`@import "tailwindcss";` in CSS).
- **Motion & Graphics**: `framer-motion`, `motion`, `gsap`, `three`, `@react-three/fiber`, `canvas-confetti`, `lucide-react`.
- **UI Primitives**: `@radix-ui/*`, `shadcn/ui`, `clsx`, `tailwind-merge`, `cva`.

### Step 2: Determine Project Persona
Examine directory structure, page names, titles, and copy:
- **SaaS / B2B Platform**: `pricing`, `dashboard`, `auth`, `billing` -> needs subtle shader backgrounds (Aurora, Mesh), Bento grids, interactive pricing toggles, and metallic shimmer CTAs.
- **Developer / Designer Portfolio**: `projects`, `about`, `github`, `tech-stack` -> needs reactive particle grids, pixel trails, 3D tilt cards, magnetic buttons, and terminal / code previewers.
- **Dashboard / Admin App**: `analytics`, `metrics`, `settings`, `data-table` -> needs collapsible rail navigation, radial progress rings, KPI metric cards, and skeleton loaders.
- **E-Commerce / Consumer App**: `products`, `cart`, `checkout`, `shop` -> needs high-converting image zoom cards, floating dock navigation, announcement badges, and cart drawers.
- **Hospitality / Restaurant / Local Business**: `menu`, `reservations`, `contact`, `locations` -> needs warm ambient glows, elegant serif/sans typography reveal, interactive menu tabs, and location pin cards.

### Step 3: Identify Missing Animated Sections
Audit existing pages and find gaps:
1. **Background**: Plain solid white/black? -> Recommend canvas/shader backdrop.
2. **Hero Section**: Static static text? -> Recommend split-text, word-rotate, or shiny text.
3. **Feature Cards**: Flat borders without hover response? -> Recommend 3D tilt, spotlight, or magic cards.
4. **Primary CTAs**: Generic standard buttons? -> Recommend shimmer, magnetic, or pulse buttons.
5. **Feedback & Loaders**: Abrupt loading jumps? -> Recommend circular SVG rings or neural loaders.

---

## 3. Recommendation Rules: The "One-Best-Pick" Principle

Do **not** overwhelm the user with a raw list of dozens of components. Always curate:
1. **Exactly 1 Best Component per Section**: Pick the single highest-impact component for Background, Hero, Cards, Buttons, and Polish.
2. **Multi-Source Inclusion**: Pick freely across React Bits, Magic UI, Aceternity UI, and ZEURALABZ Originals based purely on aesthetic fit and performance.
3. **Explicit Reasoning**: State clearly *why* this component elevates the user's specific persona.
4. **Source Badge**: Always specify the exact source and license (`[React Bits • MIT + Commons]`, `[Magic UI • MIT]`, `[Aceternity • MIT]`, `[ZEURALABZ Original • MIT]`).
5. **Exact Install Commands**: Provide copy-paste terminal commands.

### Format Structure:
```markdown
### 🎨 Recommended ZEURALABZ Design Plan for <Project Name>

| Section | Recommended Component | Source & License | Why It Fits | Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | <Name> (`<slug>`) | [<Source> • <License>] | <Reasoning> | `npx zeuralabz add <slug> --source <source>` |
| **Hero** | <Name> (`<slug>`) | [<Source> • <License>] | <Reasoning> | `npx zeuralabz add <slug> --source <source>` |
| **Cards** | <Name> (`<slug>`) | [<Source> • <License>] | <Reasoning> | `npx zeuralabz add <slug> --source <source>` |
| **Button / CTA** | <Name> (`<slug>`) | [<Source> • <License>] | <Reasoning> | `npx zeuralabz add <slug> --source <source>` |
| **Polish** | <Name> (`<slug>`) | [<Source> • <License>] | <Reasoning> | `npx zeuralabz add <slug> --source <source>` |
```

---

## 4. Exact Installation & Execution Protocol

### Source-Specific Installation Routing

- **ZEURALABZ Originals (Native)**:
  ```bash
  npx zeuralabz add <slug>
  ```
  *Copies handwritten component from `components/<category>/<slug>` directly into the user's project (`src/components/zeuralabz/<slug>/`).*

- **React Bits (Linked)**:
  ```bash
  npx zeuralabz add <slug> --source react-bits
  # Alternative direct official CLI:
  npx @react-bits/cli add <slug>
  ```

- **Magic UI (Linked)**:
  ```bash
  npx zeuralabz add <slug> --source magic-ui
  # Alternative direct official shadcn endpoint:
  npx shadcn@latest add https://magicui.design/r/<slug>.json
  ```

- **Aceternity UI (Linked)**:
  ```bash
  npx zeuralabz add <slug> --source aceternity
  # Alternative direct official shadcn endpoint:
  npx shadcn@latest add @aceternity/<slug>
  ```

---

## 5. On-Demand Style Synthesis (Generator)

When the user asks for a tailored theme, specific brand colors, or custom motion behavior:

```bash
npx zeuralabz generate <slug> --theme <theme-name> --animation <animation-type> --radius <radius> --font <font>
```

### Supported Parameters:
- `--theme`: 20 aesthetic themes (`mint-brutalism`, `dark-neon`, `cyberpunk`, `ocean`, `emerald-luxe`, `sunset-vibes`, `monochrome`, `crimson-noir`, `nordic-frost`, `pastel-dream`, `tokyo-night`, `retro-synth`, `slate-clean`, `hyper-gold`, `amethyst`, `dracula`, `solarized`, `matrix`, `industrial`, `minimal-light`).
- `--animation`: 20 animation styles (`float`, `pulse`, `bounce`, `fade-in`, `slide-up`, `glow-sweep`, `shimmer`, `spring`, `kinetic`, `drift`, `reveal`, `flicker`, `stagger`, `spin-slow`, `ripple`, `wave`, `zoom`, `glitch`, `snap`, `tilt`).
- `--radius`: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- `--font`: `sans`, `mono`, `serif`, `display`.

### Example Generation:
```bash
npx zeuralabz generate aurora --theme ocean --animation float --radius lg
```
This generates a production-ready component file pre-configured with ocean teal/cyan CSS variables and fluid floating keyframes.

---

## 6. Worked Examples

### Worked Example A: Modern SaaS Landing Page
**User Context**: Next.js 14 App Router, Tailwind CSS v3, TypeScript, framer-motion installed. Building an AI analytics platform called "PulseMetrics".

**AI Agent Thought Process**:
1. *Stack Audit*: Next.js 14 (App Router needs `'use client'` for interactive widgets), Tailwind v3 (`tailwind.config.js` is active), `framer-motion` is already in `dependencies`.
2. *Persona*: B2B SaaS. Tone: High-tech, trustworthy, premium dark theme.
3. *Section Strategy*:
   - Background: Dark ambient shader waves to create depth without distracting from data charts -> Aceternity's `aurora-background`.
   - Hero Text: Staggered animated shiny highlight on "Next-Gen Analytics" -> Magic UI's `animated-shiny-text`.
   - Feature Highlights: Bento grid with dynamic interactive spotlights on hover -> ZEURALABZ Original `bento-grid`.
   - Primary CTA: Shimmering button to maximize click-through rate -> Magic UI's `shimmer-button`.
   - Social Proof: Dynamic partner logo marquee -> React Bits' `logo-wall`.

**Agent Output to User**:
```markdown
### 🎨 Recommended ZEURALABZ Design Plan for PulseMetrics

| Section | Recommended Component | Source & License | Why It Fits | Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | Aurora Background (`aurora-background`) | [Aceternity • MIT] | Smooth shader gradient waves give the dark viewport high-end depth. | `npx zeuralabz add aurora-background --source aceternity` |
| **Hero Headline** | Animated Shiny Text (`animated-shiny-text`) | [Magic UI • MIT] | Sweeps subtle metallic light across the value proposition copy. | `npx zeuralabz add animated-shiny-text --source magic-ui` |
| **Features** | Bento Grid (`bento`) | [ZEURALABZ Original • MIT] | High-density asymmetrical cards with subtle glowing borders for features. | `npx zeuralabz add bento` |
| **Primary CTA** | Shimmer Button (`shimmer-button`) | [Magic UI • MIT] | High-converting button with infinite specular rim reflection. | `npx zeuralabz add shimmer-button --source magic-ui` |
| **Social Proof** | Logo Wall (`logo-wall`) | [React Bits • MIT + Commons] | Infinite seamless scrolling ticker for investor and customer logos. | `npx zeuralabz add logo-wall --source react-bits` |
```

---

### Worked Example B: Developer Portfolio & Personal Brand
**User Context**: React 19 + Vite, Tailwind CSS v4, TypeScript. Looking for an impressive, playful, yet minimalist aesthetic.

**AI Agent Thought Process**:
1. *Stack Audit*: React 19 with Vite, Tailwind v4. Needs components that do not rely on legacy Tailwind config plugins.
2. *Persona*: Creative frontend developer / creative technologist.
3. *Section Strategy*:
   - Background: Reactive cursor trail that draws pixelated sparks as the user explores -> React Bits' `pixel-trail`.
   - Project Showcase: Cards that tilt smoothly in 3D perspective based on pointer coordinate -> Aceternity's `3d-card-effect`.
   - Skills & Badges: Interactive physics-inspired floating icon tags -> React Bits' `gravity`.
   - Contact CTA: Magnetic button that snaps toward the cursor -> React Bits' `magnet`.
   - Page Transitions: Canvas-based circular progress loader -> ZEURALABZ Original `circular`.

**Agent Output to User**:
```markdown
### 🎨 Recommended ZEURALABZ Design Plan for Developer Portfolio

| Section | Recommended Component | Source & License | Why It Fits | Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Interactive Canvas** | Pixel Trail (`pixel-trail`) | [React Bits • MIT + Commons] | Creates playful retro pixel trails following the cursor. | `npx zeuralabz add pixel-trail --source react-bits` |
| **Project Showcase** | 3D Card Effect (`3d-card-effect`) | [Aceternity • MIT] | Parallax depth projection makes screenshots pop out of the page. | `npx zeuralabz add 3d-card-effect --source aceternity` |
| **Skills Cloud** | Gravity (`gravity`) | [React Bits • MIT + Commons] | Matter.js physics simulation where technology tags bounce and interact. | `npx zeuralabz add gravity --source react-bits` |
| **Contact CTA** | Magnet Button (`magnet`) | [React Bits • MIT + Commons] | Attracts pointer on hover for an ultra-tactile micro-interaction. | `npx zeuralabz add magnet --source react-bits` |
| **Loading State** | Precision Radial Ring (`circular`) | [ZEURALABZ Original • MIT] | Smooth SVG circular dash animation for asynchronous project loading. | `npx zeuralabz add circular` |
```

---

### Worked Example C: Local Cafe & Artisan Restaurant
**User Context**: Next.js 14, Tailwind CSS v3. Clean warm aesthetic, menu showcase, and reservation booking.

**AI Agent Thought Process**:
1. *Stack Audit*: Next.js 14, Tailwind v3. Needs soft, warm organic tones without harsh sci-fi effects.
2. *Persona*: Hospitality, culinary, warm sensory experience.
3. *Section Strategy*:
   - Backdrop: Warm ambient color blooms resembling warm candlelight -> ZEURALABZ Original `ambient-glow`.
   - Headline Reveal: Elegant serif text fade with smooth word reveal -> Magic UI's `word-rotate`.
   - Menu Highlights: Interactive image zoom card highlighting dishes -> ZEURALABZ Original `product`.
   - Reservation Button: Pulsing warm brass CTA -> React Bits' `star-border`.

**Agent Output to User**:
```markdown
### 🎨 Recommended ZEURALABZ Design Plan for Artisan Cafe

| Section | Recommended Component | Source & License | Why It Fits | Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Backdrop** | Warm Ambient Glow (`ambient-glow`) | [ZEURALABZ Original • MIT] | Soft golden radial diffusion mimics atmospheric indoor ambient light. | `npx zeuralabz add ambient-glow` |
| **Hero Story** | Word Rotate (`word-rotate`) | [Magic UI • MIT] | Smooth vertical rotation showcasing culinary pillars ("Organic", "Artisan"). | `npx zeuralabz add word-rotate --source magic-ui` |
| **Menu Showcase** | E-Commerce Product Zoom (`product`) | [ZEURALABZ Original • MIT] | High-resolution image zoom on hover for signature culinary dishes. | `npx zeuralabz add product` |
| **Reservation CTA** | Star Border Button (`star-border`) | [React Bits • MIT + Commons] | Elegant glowing perimeter stroke draws eyes to table booking. | `npx zeuralabz add star-border --source react-bits` |
```

---

## 7. Troubleshooting & Best Practices

### Issue 1: Missing shadcn/ui Base Configuration
Linked components from Magic UI and Aceternity rely on `shadcn/ui` utility functions (`cn` from `clsx` and `tailwind-merge`).
- **Fix**: Run:
  ```bash
  npx shadcn@latest init
  ```
  Ensure `src/lib/utils.ts` exists with:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

### Issue 2: Next.js App Router Hydration Mismatches
Interactive canvas or pointer tracking components use `window` or `document` objects.
- **Fix**: Always include `'use client';` at the top of the component or import dynamically:
  ```tsx
  'use client';
  import dynamic from 'next/dynamic';
  const AuroraBackground = dynamic(
    () => import('@/components/zeuralabz/aurora').then(mod => mod.AuroraBackground),
    { ssr: false }
  );
  ```

### Issue 3: Tailwind CSS v4 Migration
Tailwind v4 removes `tailwind.config.js` in favor of CSS `@theme` directives.
- **Fix**: When using animation keyframes, define `@keyframes` and `@utility` directly in your main CSS file (`globals.css`):
  ```css
  @theme {
    --color-mint-500: #00F5A0;
  }
  ```

### Issue 4: framer-motion vs motion/react (Framer Motion v12+)
In Framer Motion v12+, the package transitioned to `motion/react`.
- **Fix**: If using `motion/react`, alias or update your import statements:
  ```tsx
  import { motion, AnimatePresence } from 'framer-motion';
  // or
  import { motion, AnimatePresence } from 'motion/react';
  ```
