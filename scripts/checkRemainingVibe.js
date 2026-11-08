import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const remaining = [];

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      scan(fullPath);
    } else if (entry.isFile()) {
      if (!/\.(js|ts|tsx|json|md|html|css|yml)$/i.test(entry.name)) continue;
      try {
        const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
        lines.forEach((line, idx) => {
          if (/vibe/i.test(line)) {
            // allow the single deprecation note in README.md
            if (entry.name === 'README.md' && line.includes('draft name VibeUI')) return;
            // allow check script & rebrand script itself
            if (entry.name === 'checkRemainingVibe.js' || entry.name === 'rebrandToZeuralabz.js') return;
            // allow generic keywords like "vibe-coding" if applicable or report it
            remaining.push({ file: path.relative(rootDir, fullPath).replace(/\\/g, '/'), line: idx + 1, text: line.trim() });
          }
        });
      } catch {}
    }
  }
}

scan(rootDir);
console.log('Remaining matches for "vibe":', remaining.length);
remaining.forEach(m => console.log('•', m.file + ':' + m.line, '->', m.text));

