# ZEURALABZ — Open Source & Linked Catalog Attribution

ZEURALABZ is an intelligent component indexer, CLI suggester, and design matrix that unifies modern UI engineering for developers and autonomous AI coding agents.

The unified registry indexes **10,135 base components** across 6 premier open-source and original design systems:
- **React Bits (Linked)**: 218 components
- **Magic UI (Linked)**: 79 components
- **Aceternity UI (Linked)**: 115 components
- **Lightswind (Linked, Free Only)**: 224 components
- **21st.dev (Linked, Per-Author)**: 9,379 components
- **ZEURALABZ Originals (Native)**: 120 components

> **CRITICAL ARCHITECTURAL DISTINCTION**:
> Linked components (`react-bits`, `magic-ui`, `aceternity`, `lightswind`, `21st-dev`) are installed from their official registries, site endpoints, and CLIs. ZEURALABZ **never** clones, vendors, or re-licenses third-party components as its own. ZEURALABZ Originals are 100% original, handwritten motion primitives and canvas engines hosted natively in `components/`.

---

## 1. ZEURALABZ Originals
* **Author**: R. Selva (https://github.com/rselva1202)
* **License**: MIT License
* **Description**: Original canvas backgrounds, motion primitives, and interactive UI components hosted directly in `components/`.

---

## 2. Linked Source: React Bits
* **Author**: David Haz (https://github.com/DavidHDev)
* **Repository**: https://github.com/DavidHDev/react-bits
* **Official Website**: https://reactbits.dev
* **License**: MIT + Commons Clause
* **Terms of Use**:
  React Bits components are free to use in your personal or commercial websites and web applications.
  Under the Commons Clause condition, components may NOT be resold, sublicensed, or redistributed as a competing standalone component library.
* **ZEURALABZ Integration**:
  ZEURALABZ does NOT host or redistribute React Bits source code. Instead, ZEURALABZ provides discovery, heuristic suggestions, and direct installation commands linking to the official React Bits registry (`@react-bits/*`) with full attribution.

---

## 3. Linked Source: Magic UI
* **Author**: Dillion Verma / Magic UI (https://github.com/magicuidesign)
* **Repository**: https://github.com/magicuidesign/magicui
* **Official Website**: https://magicui.design
* **License**: MIT License
* **Terms of Use**:
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
* **ZEURALABZ Integration**:
  Magic UI components are indexed as a linked source and installed directly from their official shadcn registry endpoint (`https://magicui.design/r/<slug>.json`). ZEURALABZ does not claim ownership or host local copies in `components/`.

---

## 4. Linked Source: Aceternity UI
* **Author**: Manu Arora (https://github.com/manuarora700 / https://x.com/mannupaaji)
* **Official Website**: https://ui.aceternity.com
* **Repository**: https://github.com/aceternity-labs/aceternity-ui
* **License**: MIT License / Aceternity License Terms
* **Terms of Use**:
  Aceternity UI components are free to use in your personal or commercial websites, web apps, and commercial client projects.
  Source files and components may NOT be redistributed as a competing standalone component library, stock asset pack, or resold on template marketplaces.
* **ZEURALABZ Integration**:
  Aceternity UI components (including Aceternity Labs motion experiments like Fey Cards, `https://ui.aceternity.com/labs/fey-cards`) are installed / copied directly from their official site (`https://ui.aceternity.com/components/<slug>` or `/labs/<slug>`) or via their official shadcn registry (`@aceternity/<slug>`), NOT hosted in this repo. ZEURALABZ provides discovery, heuristic suggestions, and direct install workflows with full attribution.

---

## 5. Linked Source: Lightswind
* **Author**: Muhilan / codewithMUHILAN (https://github.com/codewithMUHILAN)
* **Official Website**: https://lightswind.com
* **Repository**: https://github.com/codewithMUHILAN/Lightswind-UI-Library
* **License**: MIT License (linked, free only)
* **Terms of Use**:
  The Lightswind repository code is open-source under the MIT License. The site license terms specify that components are for integration into user projects and forbid repackaging code as a competing standalone component library, UI kit, or registry.
* **ZEURALABZ Integration**:
  ZEURALABZ strictly enforces **LINKED ONLY, FREE components only**. Zero Pro components are redistributed, and zero code is copied into `components/` as originals. Components (224 free components including Noise Cloud Background proof) are discovered via ZEURALABZ and installed directly via the official Lightswind CLI (`npx lightswind add <slug>`) or linked official registry endpoints with full attribution.

---

## 6. Linked Source: 21st.dev
* **Platform**: 21st.dev (https://21st.dev)
* **Community Authors**: 1,045 verified creator authors (including `@designali-in` for Starfield proof, `@21st`, `@ruixen.ui`, `@ravikatiyar162`, `@cnippet-dev`, `@sean0205`, etc.)
* **Official Registry**: https://21st.dev/community/components
* **License**: Per-author licensing — check original component page
* **Terms of Use**:
  Components on 21st.dev carry individual per-author licenses without a blanket grant. Free access allows browsing and discovery; individual authors retain rights and terms specified on their respective component pages.
* **ZEURALABZ Integration**:
  ZEURALABZ strictly enforces **LINKED ONLY, per-author attribution**. Zero components are claimed as ZEURALABZ Originals or copied into `components/`. Every single entry (9,379 components across 1,045 creators) maintains exact author username attribution (`author: "<username>"`), official source URL (`originalUrl`), and official preview URL. Installation runs via the official shadcn CLI endpoint (`npx shadcn@latest add "https://21st.dev/r/<author>/<slug>"`) or `@21st-dev/cli`. Starfield by `@designali-in` is indexed as proof with full props and documentation links.

---

*Last updated: November 2026 • ZEURALABZ Ecosystem*
