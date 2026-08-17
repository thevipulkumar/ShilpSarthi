/**
 * Imports the Oak Forest Pundag project and the Anytime Fitness reception shot.
 *
 * Run with:  npm run images:oak
 *
 * These are the first genuine Shilp Sarthi project photographs in the repo. Two
 * consequences worth knowing:
 *
 *   1. Oak Forest gets `representativePhotography: false`. The photographs ARE
 *      this project, so the "representative work" disclosure does not apply to it.
 *   2. The before and after frames are a real pair from the same flat, so
 *      `beforeAfterPending` goes false and the reveal slider finally works as
 *      proof rather than as a demonstration.
 *
 * Sources are 1080x1920 stills pulled from a walkthrough video, so every
 * landscape crop takes a horizontal slice out of a vertical frame. The gallery
 * keeps them at their native 9:16 instead, which is both sharper and closer to
 * how they were shot.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const OAK = join(ROOT, 'images', 'Oak Forest');

const out = (p) => join(ROOT, 'public', p);
const write = async (src, dest, w, h, position = 'attention') => {
  await mkdir(dirname(out(dest)), { recursive: true });
  await sharp(src).resize(w, h, { fit: 'cover', position }).webp({ quality: 82 }).toFile(out(dest));
  return dest;
};

console.log('Anytime Fitness');
await write(
  join(ROOT, 'images', 'anytime finess Kanke.png'),
  'images/projects/anytime-fitness-kanke-reception-01.webp',
  1200, 900, 'left',
);
console.log('  images/projects/anytime-fitness-kanke-reception-01.webp  (from 1784x882)');

console.log('\nOak Forest Pundag: card, before and after');
// Card hero: the living room, which reads best cropped to landscape.
await write(join(OAK, 'HL IMG .00_00_05_03.Still001.jpg'),
  'images/projects/oak-forest-pundag-living-01.webp', 1200, 900);
/*
 * A genuine pair from the same flat, cropped explicitly rather than by
 * `position: 'attention'`. Attention scores by entropy, and in both these frames
 * the highest-contrast band is the ceiling: the cove beam in the after shot, the
 * fan blade in the before. It cropped to the ceiling and threw away the room.
 *
 * The work is in the lower middle of a 9:16 frame, so the window starts 40% down
 * and takes a 3:2 slice from there: the bare counter in the before, the kitchen
 * and the near sofa in the after.
 */
const cropLower = async (src, dest, fromTop = 0.4) => {
  const m = await sharp(src).metadata();
  const w = m.width;
  const h = Math.round(w / 1.5);
  const top = Math.min(Math.round(m.height * fromTop), m.height - h);
  await mkdir(dirname(out(dest)), { recursive: true });
  await sharp(src)
    .extract({ left: 0, top, width: w, height: h })
    .resize(1400, 933)
    .webp({ quality: 84 })
    .toFile(out(dest));
  console.log(`  ${dest}  window ${w}x${h} at y=${top} of ${m.height}`);
};

await cropLower(join(OAK, 'before interior work.png'), 'images/projects/oak-forest-pundag-before.webp', 0.4);
await cropLower(join(OAK, 'after interior work.jpg'), 'images/projects/oak-forest-pundag-after.webp', 0.4);

/* ---- Gallery, kept at native 9:16 ------------------------------------- */
const stills = (await readdir(OAK))
  .filter((f) => f.startsWith('HL IMG') && f.endsWith('.jpg'))
  .sort();

/**
 * Captions in walkthrough order. Descriptive only: they say what is in the
 * frame, never a price or a claim the photograph cannot support.
 */
const CAPTIONS = [
  'Living room with sectional seating, cove lighting and a ceiling fan',
  'Framed artwork above the sofa with a wall sconce',
  'Living room television wall with a false ceiling and recessed lighting',
  'Backlit display niche beside the television, in wood and textured tile',
  'Glass fronted display unit next to the panelled entrance door',
  'Modular kitchen with an island counter and wood drawer fronts',
  'Kitchen detail: glass fronted wall unit over the counter',
  'Kitchen with chimney, marble backsplash and a built-in hob',
  'Kitchen run with glass fronted wall units and under-cabinet lighting',
  'Kitchen counter with appliances and a marble splashback',
  'Washbasin with a round mirror against papered wall',
  'Dining table and chairs beneath a ceiling fan',
  'Dining area open to the kitchen',
  'Wardrobe run with wood and cane fronted shutters',
  'Pooja mandir set into fluted wall panelling',
  'Entrance corridor with a panelled door and papered walls',
  'Bedroom with a full height wardrobe and cove lighting',
  'Master bedroom with a wood panelled headboard wall',
  'Bedroom with panelled headboard, mirror and bedside storage',
  'Bedroom with a cane panelled headboard and dressing mirror',
];

console.log(`\nGallery: ${stills.length} stills at native 9:16`);
const gallery = [];
for (let i = 0; i < stills.length; i++) {
  const dest = `images/projects/oak-forest-pundag-${String(i + 1).padStart(2, '0')}.webp`;
  await mkdir(dirname(out(dest)), { recursive: true });
  await sharp(join(OAK, stills[i])).resize(720, 1280, { fit: 'cover' }).webp({ quality: 80 }).toFile(out(dest));
  gallery.push({ src: `/${dest}`, alt: CAPTIONS[i] ?? 'Completed interior at Oak Forest, Pundag, Ranchi' });
}
console.log(`  ${gallery.length} written`);

console.log('\nPaste into content/projects.ts as the gallery array:\n');
console.log(gallery.map((g) => `      { src: '${g.src}', alt: '${g.alt}' },`).join('\n'));
