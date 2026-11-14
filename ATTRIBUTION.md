# ZEURALABZ — Open Source & Linked Catalog Attribution

ZEURALABZ is an intelligent component indexer, CLI suggester, and design matrix that unifies modern UI engineering for developers and autonomous AI coding agents.

The unified registry indexes **531 base components** across 4 premier open-source and original design systems:
- **React Bits (Linked)**: 218 components
- **Magic UI (Linked)**: 79 components
- **Aceternity UI (Linked)**: 114 components
- **ZEURALABZ Originals (Native)**: 120 components

> **CRITICAL ARCHITECTURAL DISTINCTION**:
> Linked components (`react-bits`, `magic-ui`, `aceternity`) are installed from their official registries and site endpoints. ZEURALABZ **never** clones, vendors, or re-licenses third-party components as its own. ZEURALABZ Originals are 100% original, handwritten motion primitives and canvas engines hosted natively in `components/`.

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
  Aceternity UI components are installed / copied directly from their official site (`https://ui.aceternity.com/components/<slug>`) or via their official shadcn registry (`@aceternity/<slug>`), NOT hosted in this repo. ZEURALABZ provides discovery, heuristic suggestions, and direct install workflows with full attribution.

---

*Last updated: November 2026 • ZEURALABZ Ecosystem*
