/**
 * Contact sheet for every image in a directory. Globs internally so filenames
 * with spaces are safe.
 *
 * Usage: node scripts/review-dir.mjs "images/Oak Forest" /tmp/sheet.jpg 6 [start] [count]
 */
import { readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const [, , dir, out, colsArg, startArg, countArg] = process.argv;
const cols = Number(colsArg) || 5;
const start = Number(startArg) || 0;

const all = (await readdir(dir))
  .filter((f) => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()))
  .sort();

const files = all.slice(start, start + (Number(countArg) || all.length));
const CW = 200;
const CH = 356; // 9:16 cells, since this set is vertical
const rows = Math.ceil(files.length / cols);

const tiles = [];
for (let i = 0; i < files.length; i++) {
  tiles.push({
    input: await sharp(join(dir, files[i])).resize(CW, CH, { fit: 'cover' }).toBuffer(),
    left: (i % cols) * CW,
    top: Math.floor(i / cols) * CH,
  });
}

await sharp({ create: { width: cols * CW, height: rows * CH, channels: 3, background: '#eeeeee' } })
  .composite(tiles)
  .jpeg({ quality: 88 })
  .toFile(out);

console.log(`${files.length} of ${all.length} -> ${out}  (${cols} cols)`);
files.forEach((f, i) => console.log(`  ${start + i + 1}. ${f}`));
