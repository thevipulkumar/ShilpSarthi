/**
 * Renders the PNG icon fallbacks from app/icon.svg so they can never drift out
 * of sync with the mark. Run with:  npm run icons
 *
 * The previous set was still navy and terracotta long after the palette moved to
 * white and red, because they were generated once by hand and never revisited.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const svg = await readFile(join(ROOT, 'app', 'icon.svg'));

const TARGETS = [
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
  ['app/apple-icon.png', 180],
];

for (const [dest, size] of TARGETS) {
  const info = await sharp(svg, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(ROOT, dest));
  console.log(`  ${dest.padEnd(24)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
