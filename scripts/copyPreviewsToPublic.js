import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicPreviewsDir = path.join(rootDir, 'preview-site', 'public', 'previews');
if (!fs.existsSync(publicPreviewsDir)) {
  fs.mkdirSync(publicPreviewsDir, { recursive: true });
}

const regPath = path.join(rootDir, 'components.json');
const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));

let count = 0;
for (const comp of registry) {
  const compDir = path.join(rootDir, 'components', comp.category, comp.slug);
  const svgSrc = path.join(compDir, 'preview.svg');
  const pngSrc = path.join(compDir, 'preview.png');

  if (fs.existsSync(svgSrc)) {
    fs.copyFileSync(svgSrc, path.join(publicPreviewsDir, `${comp.slug}.svg`));
  }
  if (fs.existsSync(pngSrc)) {
    fs.copyFileSync(pngSrc, path.join(publicPreviewsDir, `${comp.slug}.png`));
  }
  count++;
}

console.log(`Successfully copied previews for ${count} components to preview-site/public/previews/`);

