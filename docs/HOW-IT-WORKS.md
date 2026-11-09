# How ZEURALABZ Works — Architecture & The 1M+ Combinations System

ZEURALABZ was built to eliminate generic, boring websites without requiring developers to hand-write thousands of boilerplate files or lock themselves into heavy component frameworks.

---

## 1. The 1M+ Combinations Math Explained

> **Core Principle**: Do not store 1,000,000 physical files on disk. Instead, store high-leverage atomic primitives and combine them parametrically.

ZEURALABZ achieves over 1,000,000 distinct visual outcomes through combinatorial permutations:

$$\text{Styles} = 150 \text{ Base Components} \times 20 \text{ Themes} \times 20 \text{ Animation Presets} \times 15 \text{ Layout Archetypes} = 900,000+$$

With parametric adjustments for corner radiuses (`sm`, `md`, `lg`, `xl`, `full`) and typography pairings (`sans`, `serif`, `mono`), the total permutations exceed **1,000,000 unique styles**.

### The Layer Hierarchy:
1. **Base Component Layer (120+ Components)**:
   - Self-contained React (TypeScript), Pure HTML, and Pure CSS implementations.
   - Zero hardcoded vendor lock-in.
2. **Design Theme Layer (20 Aesthetic Themes)**:
   - Carefully calibrated hex values, surfaces, borders, and glow reflections defined in `themes/themes.json`.
   - Examples: `dark-neon`, `minimal-white`, `glass`, `aurora`, `retro-synth`, `cyberpunk`, `luxury-gold`.
3. **Motion Preset Layer (20 Animations)**:
   - Spring physics, viewport-triggered reveals, continuous fluid loops, and GPU-accelerated canvas transforms.
4. **Layout Layer (15 Layout Archetypes)**:
   - Centered SaaS, Split Portfolio, Bento Grid, Rail Sidebar, Floating Island, Minimal Stack.
5. **On-Demand Variant Generator**:
   - `generator/generate.js` synthesizes any requested permutation instantly into clean production code.

---

## 2. Project Analyzer Heuristics (`analyzer/index.js`)

When you run `npx zeuralabz suggest`, the Analyzer executes five deterministic heuristic checks:

```
┌────────────────────────────────────────────────────────┐
│               Target Project Directory                 │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      [package.json scan]        [Directory & File Scan]
       - Framework detect         - src/app vs src/pages
       - Tailwind v3 vs v4        - Admin / Dashboard routes
       - TypeScript support       - E-Commerce / Cart items
               │                         │
               └────────────┬────────────┘
                            ▼
               [Persona Classification]
                - SaaS (score weighting)
                - Portfolio / Creative
                - Dashboard / Analytics
                - E-Commerce / Storefront
                            ▼
               [Component Gap Analysis]
                - Check background motion
                - Check headline animations
                - Check CTA button treatment
                            ▼
               [1-Best-Pick Selection]
                Background -> Aurora
                Hero       -> Split Text
                Cards      -> Bento / Tilt
                Button     -> Shimmer
```

### The "One-Best-Pick" Principle:
Developers and zeura-coders suffer from decision fatigue. ZEURALABZ intentionally recommends **only 1 best component per section**, accompanied by an actionable explanation of *why* it fits the project's persona.

---

## 3. Component Architecture & Isolation

Every component in ZEURALABZ adheres to a strict contract:

```
components/<category>/<slug>/
├── <ComponentName>.tsx   # React 19 + TypeScript + Tailwind + Framer Motion
├── <ComponentName>.html  # Pure Semantic HTML5
├── <ComponentName>.css   # Standalone CSS
├── preview.svg           # High-resolution vector preview asset
├── preview.png           # Fallback image asset
├── preview.gif           # Animation indicator asset
└── info.json             # Structured component metadata & dependencies
```

- **Zero Global State Pollution**: Every component is self-contained.
- **Copy-Paste Simplicity**: Installing a component simply copies its source code directly into your `src/components/zeuralabz/<slug>` folder. You own the code completely.

---

## 4. Multi-Source Architecture & React Bits Integration

ZEURALABZ combines two distinct component origins under one cohesive interface:

1. **Official React Bits Integration (`source: "react-bits"`)**:
   - React Bits (created by David Haz) contains 218+ premier visual components.
   - To respect the MIT + Commons Clause license, ZEURALABZ does **not** copy or re-host React Bits code files.
   - Instead, ZEURALABZ connects to React Bits' official shadcn registry:
     ```bash
     npx zeuralabz add aurora --source react-bits
     # Runs: npx shadcn@latest add @react-bits/Aurora-TS-TW
     ```
   - Previews link directly to the official [reactbits.dev](https://reactbits.dev) catalog.

2. **ZEURALABZ Originals (`source: "zeuralabz-original"`)**:
   - 120 custom base primitives authored under the MIT License and bundled locally within `components/`.
   - Installed via `npx zeuralabz add <slug> --source zeuralabz-original`.


