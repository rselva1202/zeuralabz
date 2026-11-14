# How ZEURALABZ Works — Architecture & The 1M+ Combinations System

ZEURALABZ was built to eliminate generic, boring websites without requiring developers to hand-write thousands of boilerplate files or lock themselves into heavy component frameworks.

---

## 1. The 1M+ Combinations Math Explained

> **Core Principle**: Do not store 1,000,000 physical files on disk. Instead, store high-leverage atomic primitives and combine them parametrically on demand.

ZEURALABZ achieves over 1,000,000 distinct visual outcomes through combinatorial permutations:

$$\text{Styles} = 755 \text{ Base Components} \times 20 \text{ Themes} \times 20 \text{ Animation Presets} \times 15 \text{ Layout Structures} = 4,530,000 \ge 1,000,000+$$

With additional parametric adjustments for corner radiuses (`none`, `sm`, `md`, `lg`, `xl`, `full`) and typography pairings (`sans`, `serif`, `mono`, `display`), the total possible permutations exceed **27,000,000 unique styles**.

### The Layer Hierarchy:
1. **Base Component Layer (10,135 Base Components Across 6 Sources)**:
   - **React Bits (218 components)**: Linked official registry (`@react-bits/*`) • David Haz (MIT + Commons Clause)
   - **Magic UI (79 components)**: Linked official registry (`magicui.design/r/<slug>.json`) • Dillion Verma (MIT)
   - **Aceternity UI (115 components)**: Linked official registry (`@aceternity/*`) • Manu Arora (MIT)
   - **Lightswind (224 components)**: Linked official CLI & registry (`lightswind.com/components/<slug>`) • Muhilan (MIT, free only)
   - **ZEURALABZ Originals (120 components)**: Native handwritten canvas engines and motion primitives (`components/<category>/<slug>`) • R. Selva (MIT)
2. **Design Theme Layer (20 Aesthetic Themes)**:
   - Carefully calibrated hex values, surfaces, borders, and glow reflections defined in `themes/themes.json`.
   - Examples: `dark-neon`, `minimal-white`, `glass`, `aurora`, `retro-synth`, `cyberpunk`, `luxury-gold`, `midnight-violet`, `ocean`, `crimson-tide`.
3. **Motion Preset Layer (20 Animations)**:
   - Spring physics, viewport-triggered reveals, continuous fluid loops, and GPU-accelerated canvas transforms:
     `float`, `pulse`, `bounce`, `fade-in`, `slide-up`, `glow-sweep`, `shimmer`, `spring`, `kinetic`, `drift`, `reveal`, `flicker`, `stagger`, `spin-slow`, `ripple`, `wave`, `zoom`, `glitch`, `snap`, `tilt`.
4. **Layout Layer (15 Layout Archetypes)**:
   - `hero-center`, `hero-split`, `bento-3`, `bento-4`, `card-grid-3`, `card-grid-4`, `sidebar-left`, `sidebar-right`, `nav-floating`, `nav-minimal`, `section-contained`, `section-fullwidth`, `masonry-feed`, `timeline-vertical`, `dock-bottom`.
5. **On-Demand Style Synthesizer**:
   - `generator/generate.js` synthesizes any requested permutation instantly into clean production code via:
     ```bash
     npx zeuralabz generate <slug> --theme <theme> --animation <animation> --radius <radius> --font <font>
     ```

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
       - Motion engine            - Hospitality / Menu routes
               │                         │
               └────────────┬────────────┘
                            ▼
               [Persona Classification]
                - SaaS (score weighting)
                - Portfolio / Creative
                - Dashboard / Analytics
                - E-Commerce / Storefront
                - Restaurant / Hospitality
                            ▼
               [Component Gap Analysis]
                - Check background motion
                - Check headline animations
                - Check feature card depth
                - Check primary CTA treatment
                - Check feedback loaders
                            ▼
               [1-Best-Pick Selection Across 4 Sources]
                Background -> Aceternity Aurora Background
                Hero       -> Magic UI Animated Shiny Text
                Cards      -> ZEURALABZ Bento Grid
                Button     -> Magic UI Shimmer Button
                Polish     -> React Bits Logo Loop
```

### The "One-Best-Pick" Principle:
Developers and AI coding assistants suffer from decision fatigue. ZEURALABZ intentionally recommends **only 1 best component per section**, accompanied by an actionable explanation of *why* it fits the project's persona, its official source license badge, and exact install command.

---

## 3. Multi-Source Architecture — React Bits, Magic UI & Aceternity UI Linked Sources

ZEURALABZ combines four distinct component origins under one unified index:

1. **Official React Bits Integration (`source: "react-bits"`, 218 components)**:
   - Created by David Haz ([reactbits.dev](https://reactbits.dev)).
   - Licensed under MIT + Commons Clause.
   - ZEURALABZ does **not** copy or re-host React Bits code files. Instead, ZEURALABZ links directly to official endpoints (`npx @react-bits/cli add <slug>` or official shadcn registry).

2. **Official Magic UI Integration (`source: "magic-ui"`, 79 components)**:
   - Created by Dillion Verma ([magicui.design](https://magicui.design)).
   - Licensed under MIT.
   - ZEURALABZ links directly to official remote registry endpoints (`https://magicui.design/r/<slug>.json`) with zero redistribution.

3. **Official Aceternity UI Integration (`source: "aceternity"`, 114 components)**:
   - Created by Manu Arora ([ui.aceternity.com](https://ui.aceternity.com)).
   - Licensed under MIT / Aceternity License Terms.
   - ZEURALABZ links directly to official components with zero local copy redistribution (`npx shadcn@latest add @aceternity/<slug>`).

4. **Official Lightswind Integration (`source: "lightswind"`, 224 components)**:
   - Created by Muhilan ([lightswind.com](https://lightswind.com)).
   - Licensed under MIT (linked, free only).
   - ZEURALABZ strictly links to verified free components (and proof component Noise Cloud Background).
   - Installed via official CLI: `npx lightswind add <slug>` or `npx zeuralabz add <slug> --source lightswind`.

5. **ZEURALABZ Originals (`source: "zeuralabz-original"`, 120 components)**:
   - 120 custom base primitives authored under the MIT License and bundled locally within `components/`.
   - Installed via `npx zeuralabz add <slug>`.

---

## 4. Website vs Repo Skill Distinction

- **Website (`https://rselva1202.github.io/zeuralabz`)**: Showcase only. It displays what the Skill is, how it works, what it is for, and how the 1M+ combinations matrix connects. There is NO component catalog grid on the website.
- **GitHub Repo Skill & CLI**: The core product. The Skill, CLI (`npx zeuralabz`), MCP server, Analyzer, and Generator live in this repository, indexing all 755 base components and generating tailored animations on demand.
