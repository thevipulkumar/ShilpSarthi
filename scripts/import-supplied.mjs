/**
 * Imports the supplied photography from ./images into the site.
 *
 * Run with:  npm run images:supplied
 *
 * WHAT WAS IN THE FOLDER
 * 108 files, of which 39 are usable photographs. The rest:
 *   39  PNGs at 10x8 pixels, which are lazy-load placeholders, not images
 *   25  SVGs, icons and the HomeLane logo
 *    5  campaign banners and an exit-intent creative
 * All excluded. Sections 1 and 7 of the asset brief exclude logos and campaign
 * creative outright, and a 10x8 pixel is not a photograph.
 *
 * WHERE THESE MAY GO
 * Service card headers only, plus generic atmospheric imagery. Section 3 of the
 * brief prohibits this material in portfolio cards, the before-and-after slider,
 * the project manager portrait, testimonial portraits, the studio, and the trust
 * strip. Those slots make factual claims about Shilp Sarthi's own work, and a
 * licence does not make a caption true. `SiteImage` enforces that in code.
 *
 * PROCESSING, per section 5
 * Converted to WebP, resized, all metadata stripped including any embedded
 * copyright EXIF. Source files are 800x600, so nothing is upscaled: a 2x variant
 * would be invented detail. Original dimensions are recorded in the manifest
 * `note` so a higher-resolution swap stays possible.
 *
 * FILENAMES, per section 4
 * Descriptive and neutral. No product codes, no brand name.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'images');
const RETRIEVED = new Date().toISOString().slice(0, 10);

/**
 * Chosen after reviewing all 39 as contact sheets. Each was picked because it
 * actually depicts the subject of its service page, which two of the earlier
 * stock candidates did not.
 */
const PICKS = [
  {
    id: 'service.modular-kitchen',
    from: 'sleek-serenity-elegant-island-kitchen-green-bar-stools.webp',
    to: 'images/services/kitchen-island-marble-green-stools-01',
    alt: 'Modular island kitchen with a marble counter, pendant lights and green bar stools',
  },
  {
    id: 'service.living-room',
    from: '168120391788650f80c5a73bc-HLKT00000826_batch-3-800x600_24-main.jpg',
    to: 'images/services/living-room-daylight-chandelier-01',
    alt: 'Living room in daylight with a chandelier, upholstered seating and full height windows',
  },
  {
    id: 'service.bedroom-wardrobe',
    from: '1639470079750c1dfb6091161-HLKT00000755_resize-800x600_-main.jpg',
    to: 'images/services/bedroom-fitted-wardrobe-ceiling-fan-01',
    alt: 'Bedroom with a fitted floor to ceiling wardrobe, ceiling fan and tiled flooring',
  },
  {
    id: 'service.full-home-interiors',
    from: '1.jpg',
    to: 'images/services/living-dining-tv-unit-display-01',
    alt: 'Living and dining area with a television unit, glazed display cabinet and marble flooring',
  },
];

console.log(`Importing ${PICKS.length} supplied photographs...\n`);

const manifest = [];

for (const p of PICKS) {
  const src = join(SRC, p.from);
  try {
    const meta = await sharp(src).metadata();
    const out = join(ROOT, 'public', `${p.to}.webp`);
    await mkdir(dirname(out), { recursive: true });

    // No upscale. The source is 800x600 and a 2x variant would be invention.
    await sharp(src)
      .resize(meta.width, meta.height, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(out);

    console.log(`  ${p.id}`);
    console.log(`    from     images/${p.from}`);
    console.log(`    written  public/${p.to}.webp  (${meta.width}x${meta.height})`);

    manifest.push({
      id: p.id,
      src: `/${p.to}.webp`,
      alt: p.alt,
      width: meta.width,
      height: meta.height,
      note: `original ${meta.width}x${meta.height} ${meta.format}, supplied in ./images as ${p.from}`,
    });
  } catch (err) {
    console.log(`  ${p.id}  FAILED: ${err.message}`);
  }
}

await writeFile(
  join(ROOT, 'public', 'images', 'services', 'SUPPLIED-IMPORT.json'),
  JSON.stringify({ retrievedAt: RETRIEVED, assets: manifest }, null, 2),
);

console.log(`\n${manifest.length} imported.`);
for (const m of manifest) {
  console.log(`\n  ${m.id}`);
  console.log(`    src '${m.src}'  ${m.width}x${m.height}`);
  console.log(`    note '${m.note}'`);
}
