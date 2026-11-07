# Contributing to VibeUI

We welcome contributions from designers, creative coders, and front-end engineers!

---

## Contribution Guidelines

### 1. Component Rules
- Every component must live in its own directory: `components/<category>/<slug>/`
- You must provide 3 code representations:
  - `<ComponentName>.tsx` (React 19 + TypeScript + Tailwind CSS)
  - `<ComponentName>.html` (Pure semantic HTML)
  - `<ComponentName>.css` (Clean CSS)
- Include `info.json` containing:
  ```json
  {
    "name": "Component Name",
    "slug": "component-slug",
    "componentName": "ComponentName",
    "category": "backgrounds",
    "description": "Clear 1-2 sentence description.",
    "tags": ["tag1", "tag2"],
    "bestFor": ["landing", "saas"],
    "deps": ["framer-motion"]
  }
  ```
- Original Code Only: Do **not** copy commercial or closed-source code from React Bits Pro, 21st.dev Pro, or other paid libraries.

### 2. Testing Locally
1. Run the component generator or update `scripts/componentsData.js`.
2. Rebuild the master registry:
   ```bash
   node scripts/generateAllComponents.js
   ```
3. Test CLI functionality:
   ```bash
   node ./cli/bin/vibe-ui.js search <your-slug>
   ```
4. Test the preview site build:
   ```bash
   npm run build:preview
   ```

### 3. Submitting a Pull Request
- Create a feature branch: `git checkout -b feat/my-new-component`
- Commit your changes: `git commit -m "feat(components): add glowing radial cards"`
- Push and open a PR on `https://github.com/rselva1202/vibe-ui`!
