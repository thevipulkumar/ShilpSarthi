/**
 * Builds a contact sheet from a list of image paths so a batch can be reviewed
 * in one look rather than opened one at a time.
 *
 * Usage: node scripts/review-sheet.mjs out.jpg cols file1 file2 ...
 */
import sharp from 'sharp';

const [, , out, colsArg, ...files] = process.argv;
const cols = Number(colsArg) || 3;
const CW = 320;
const CH = 240;
const rows = Math.ceil(files.length / cols);

const tiles = [];
for (let i = 0; i < files.length; i++) {
  try {
    tiles.push({
      input: await sharp(files[i]).resize(CW, CH, { fit: 'cover' }).toBuffer(),
      left: (i % cols) * CW,
      top: Math.floor(i / cols) * CH,
    });
  } catch (e) {
    console.error(`  skip ${files[i]}: ${e.message}`);
  }
}

await sharp({ create: { width: cols * CW, height: rows * CH, channels: 3, background: '#eeeeee' } })
  .composite(tiles)
  .jpeg({ quality: 90 })
  .toFile(out);

console.log(`${tiles.length} tiles -> ${out}`);
files.forEach((f, i) => console.log(`  ${i + 1}. ${f.split('/').pop()}`));
