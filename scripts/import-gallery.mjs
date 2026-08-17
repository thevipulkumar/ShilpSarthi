/**
 * Imports the supplied photography into the portfolio, About and Contact slots.
 *
 * Run with:  npm run images:gallery
 *
 * A NOTE ON WHAT THIS PUBLISHES
 * The portfolio cards keep their locality and configuration captions at the
 * owner's direction. Those captions are the owner's claims about their own
 * business and are theirs to make. What this script does NOT do is imply that a
 * given photograph is the specific room named in the caption, because it is not.
 * That is why `content/projects.ts` now carries `representativePhotography: true`
 * and every portfolio surface renders a disclosure line.
 *
 * The studio slots on About and Contact are reworded rather than captioned as
 * the Singh More premises. Showing another company's showroom as your own is the
 * one item section 3 of the asset brief singles out, and rewording removes the
 * claim while still filling the page.
 *
 * The before-and-after slider stays illustrated. It only works as proof if both
 * frames are the same actual room, and no genuine pair exists yet.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'images');

/** Each pick chosen to suit the configuration named on its card. */
const PICKS = [
  {
    key: 'bariatu-3bhk-full-home',
    from: '13.jpg',
    to: 'images/projects/living-tv-unit-open-shelving-01',
    alt: 'Living room with a television unit, open shelving and a low sideboard',
  },
  {
    key: 'harmu-2bhk-kitchen-wardrobes',
    from: 'dark-vanilla-modern-kitchen-black-countertops.webp',
    to: 'images/projects/kitchen-wood-grey-black-counter-01',
    alt: 'Modular kitchen in wood and grey with black counters and a breakfast counter',
  },
  {
    key: 'kanke-villa-full-home',
    from: '168120506587892588794d8ae-HLKT00000827_batch-3-800x600_11-main.jpg',
    to: 'images/projects/living-chesterfield-patterned-rug-01',
    alt: 'Formal living room with a deep buttoned sofa, patterned rug and framed art',
  },
  {
    key: 'doranda-3bhk-full-home',
    from: '16812826479900de199faa8ef-HLKT00000836_batch-2-800x600_23-main.jpg',
    to: 'images/projects/bedroom-upholstered-headboard-01',
    alt: 'Bedroom with an upholstered headboard, bedside lighting and full height curtains',
  },
  {
    key: 'lalpur-2bhk-full-home',
    from: '1681205226697c70c0213a9dd-HLKT00000828_batch-3-800x600_33-main.jpg',
    to: 'images/projects/living-panelled-wall-accent-seating-01',
    alt: 'Compact living room with a panelled feature wall, accent sofa and chandelier',
  },
  // The gym keeps its illustration. Nothing in the supplied set is commercial.

  /* ---- Atmospheric imagery for About and Contact ---------------------- */
  {
    key: 'studio.craft',
    from: '1680592144790b7c006ce218e-HLKT00000784_Resized-800x600_17-main.jpg',
    to: 'images/studio/wardrobe-internals-drawers-hanging-01',
    alt: 'Wardrobe internals with hanging space, drawer bank and shelving',
  },
  {
    key: 'studio.finishes',
    from: '1681283290810be933de9aea9-HLKT00000837_batch-2-800x600_14-main.jpg',
    to: 'images/studio/reading-corner-joinery-shelving-01',
    alt: 'Reading corner with built-in shelving joinery and an armchair',
  },
];

console.log(`Importing ${PICKS.length} photographs...\n`);

const done = [];
for (const p of PICKS) {
  try {
    const meta = await sharp(join(SRC, p.from)).metadata();
    const out = join(ROOT, 'public', `${p.to}.webp`);
    await mkdir(dirname(out), { recursive: true });
    // No upscale: sources are 800x600 and a 2x variant would be invented detail.
    await sharp(join(SRC, p.from)).webp({ quality: 82 }).toFile(out);
    console.log(`  ${p.key.padEnd(32)} -> ${p.to}.webp  (${meta.width}x${meta.height})`);
    done.push({ ...p, width: meta.width, height: meta.height, format: meta.format });
  } catch (err) {
    console.log(`  ${p.key.padEnd(32)} FAILED: ${err.message}`);
  }
}

await writeFile(
  join(ROOT, 'public', 'images', 'GALLERY-IMPORT.json'),
  JSON.stringify({ retrievedAt: new Date().toISOString().slice(0, 10), assets: done }, null, 2),
);
console.log(`\n${done.length} imported.`);
