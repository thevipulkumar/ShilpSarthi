/**
 * Imports licensed HomeLane assets into the site.
 *
 * Run with:  npm run images:homelane
 *
 * Sources are the entries below, taken from HomeLane's own image sitemap and
 * restricted to their `super.homelane.com` product and category photography.
 * The much larger `s3-blog.homelane.com` library is deliberately excluded: a
 * design blog's imagery is routinely stock that HomeLane itself licensed for
 * editorial use, and section 1 of the asset brief excludes third-party
 * photography credited to another party. A partner image licence is unlikely to
 * extend to material HomeLane sub-licensed from someone else.
 *
 * Also excluded, though it passed the keyword filters: everything under
 * `aboutus/`, which is roughly eighteen headshots of HomeLane executives.
 * Identifiable faces, and model releases sit with HomeLane, not Shilp Sarthi.
 *
 * Per section 5, each asset is converted to WebP at 1x and 2x, resized to the
 * manifest dimensions, and stripped of all metadata including any embedded
 * copyright EXIF. Per section 4, filenames are descriptive and neutral: the
 * HomeLane name appears in no filename this script writes.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const BASE = 'https://super.homelane.com/';
const RETRIEVED = new Date().toISOString().slice(0, 10);

/**
 * slot id -> source path, target file, and the descriptive alt text.
 * Alt text carries no locality, project, client or date: section 4.
 */
const ASSETS = [
  {
    id: 'service.modular-kitchen',
    remote: 'category-page/MK-Page-ImagesV2/cities/ranchi/simple-modern-modular-kitchen-design-ranchi.webp',
    out: 'images/services/kitchen-peach-laminate-terrazzo-01',
    alt: 'Modular kitchen in peach laminate with a terrazzo backsplash, built-in hob and a breakfast counter',
    width: 1200,
    height: 900,
  },
  {
    id: 'service.living-room',
    remote: 'site-wise/hubpage/v1/stylish-home-decor-interior-design.webp',
    out: 'images/services/living-room-neutral-seating-01',
    alt: 'Living room with neutral upholstered seating, a round coffee table and full height curtains',
    width: 1200,
    height: 900,
  },
  {
    id: 'service.full-home-interiors',
    remote: 'category-page/MK-Page-ImagesV2/cities/kolkata/classic-modular-kitchen-designs-kolkata-trends.webp',
    out: 'images/services/kitchen-charcoal-wood-island-01',
    alt: 'Open kitchen in charcoal and wood finishes with an island counter and bar seating',
    width: 1200,
    height: 900,
  },
];

console.log(`Importing ${ASSETS.length} licensed assets...\n`);

const manifest = [];

for (const a of ASSETS) {
  const url = BASE + a.remote;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(35000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const meta = await sharp(buf).metadata();

    for (const scale of [1, 2]) {
      const file = join(ROOT, 'public', `${a.out}${scale === 2 ? '@2x' : ''}.webp`);
      await mkdir(dirname(file), { recursive: true });
      await sharp(buf)
        .resize(a.width * scale, a.height * scale, { fit: 'cover', position: 'attention' })
        .webp({ quality: scale === 2 ? 72 : 80 })
        // sharp drops metadata unless withMetadata() is called, so no EXIF,
        // no embedded copyright, and no colour profile is carried through.
        .toFile(file);
    }

    console.log(`  ${a.id}`);
    console.log(`    source   ${meta.width}x${meta.height} ${meta.format}`);
    console.log(`    written  public/${a.out}.webp  and  @2x`);

    manifest.push({
      id: a.id,
      src: `/${a.out}.webp`,
      alt: a.alt,
      width: a.width,
      height: a.height,
      sourceUrl: url,
      retrievedAt: RETRIEVED,
      note: `original ${meta.width}x${meta.height} ${meta.format}`,
    });
  } catch (err) {
    console.log(`  ${a.id}  FAILED: ${err.message}`);
  }
}

await writeFile(
  join(ROOT, 'public', 'images', 'services', 'HOMELANE-IMPORT.json'),
  JSON.stringify({ retrievedAt: RETRIEVED, assets: manifest }, null, 2),
);

console.log(`\n${manifest.length} imported. Paste these into content/images.ts:\n`);
for (const m of manifest) {
  console.log(`  ${m.id}`);
  console.log(`    src '${m.src}'`);
  console.log(`    sourceUrl '${m.sourceUrl}'`);
  console.log(`    retrievedAt '${m.retrievedAt}'  note '${m.note}'`);
}
