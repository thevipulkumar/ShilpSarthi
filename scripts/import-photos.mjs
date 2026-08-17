/**
 * Drop-in photo importer.
 *
 * Put photographs in /incoming with any filename that contains a keyword from
 * the table below, then run:
 *
 *   npm run photos
 *
 * The script resizes each one, writes it to the right path in /public, and flips
 * the matching `pending` flag off in the content files. No code editing.
 *
 *   incoming/bariatu-living.jpg      -> the Bariatu project card
 *   incoming/kitchen harmu.png       -> the Harmu project card
 *   incoming/studio.jpeg             -> the studio interior
 *   incoming/rakesh-pm.jpg           -> the project manager portrait
 *
 * Phone photos straight off WhatsApp are fine. Anything at least 1200px wide
 * works; the script reports anything too small rather than shipping it blurry.
 */
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const INCOMING = join(ROOT, 'incoming');

/** keyword(s) -> where it goes, at what size, and which flag it clears. */
const TARGETS = [
  { keys: ['bariatu'], out: 'images/projects/bariatu-3bhk-full-home.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'bariatu-3bhk-full-home' } },
  { keys: ['harmu'], out: 'images/projects/harmu-2bhk-kitchen-wardrobes.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'harmu-2bhk-kitchen-wardrobes' } },
  { keys: ['kanke-villa', 'kanke villa', 'villa'], out: 'images/projects/kanke-villa-full-home.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'kanke-villa-full-home' } },
  { keys: ['doranda'], out: 'images/projects/doranda-3bhk-full-home.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'doranda-3bhk-full-home' } },
  { keys: ['lalpur'], out: 'images/projects/lalpur-2bhk-full-home.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'lalpur-2bhk-full-home' } },
  { keys: ['fitness', 'gym'], out: 'images/projects/kanke-road-anytime-fitness.jpg', w: 1200, h: 900, flag: { file: 'content/projects.ts', slug: 'kanke-road-anytime-fitness' } },

  { keys: ['full-home', 'fullhome'], out: 'images/services/full-home-interiors.jpg', w: 1200, h: 900 },
  { keys: ['kitchen'], out: 'images/services/modular-kitchen.jpg', w: 1200, h: 900 },
  { keys: ['wardrobe', 'bedroom'], out: 'images/services/bedroom-wardrobe.jpg', w: 1200, h: 900 },
  { keys: ['living'], out: 'images/services/living-room.jpg', w: 1200, h: 900 },
  { keys: ['commercial', 'office'], out: 'images/services/commercial-interiors.jpg', w: 1200, h: 900 },

  { keys: ['studio', 'showroom'], out: 'images/studio/shilp-sarthi-studio-singh-more.jpg', w: 1200, h: 900 },
  { keys: ['team'], out: 'images/studio/shilp-sarthi-team-ranchi.jpg', w: 1200, h: 900 },
  { keys: ['pm', 'manager', 'portrait'], out: 'images/team/project-manager.jpg', w: 1200, h: 900, flag: { file: 'content/team.ts', field: 'photoPending' } },
  { keys: ['og', 'share'], out: 'images/og/default.jpg', w: 1200, h: 630 },
];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.avif']);

let files = [];
try {
  files = (await readdir(INCOMING)).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()));
} catch {
  console.log('No /incoming folder. Create it and drop photographs in, then run this again.');
  process.exit(0);
}

if (files.length === 0) {
  console.log('Nothing in /incoming.\n');
  console.log('Drop photographs in there with a keyword in the filename, then run: npm run photos');
  console.log('Keywords: ' + TARGETS.flatMap((t) => t.keys).join(', '));
  process.exit(0);
}

const cleared = { projects: new Set(), team: false };
let imported = 0;

for (const file of files) {
  const name = basename(file, extname(file)).toLowerCase();
  const target = TARGETS.find((t) => t.keys.some((k) => name.includes(k)));

  if (!target) {
    console.log(`  ?  ${file}  no keyword matched, skipped`);
    continue;
  }

  const srcPath = join(INCOMING, file);
  const meta = await sharp(srcPath).metadata();

  if ((meta.width ?? 0) < target.w * 0.75) {
    console.log(`  !  ${file}  only ${meta.width}px wide, needs ${Math.round(target.w * 0.75)}px+. Skipped rather than shipped blurry.`);
    continue;
  }

  const outPath = join(ROOT, 'public', target.out);
  await mkdir(join(outPath, '..'), { recursive: true });
  await sharp(srcPath)
    .rotate()
    .resize(target.w, target.h, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(outPath);

  console.log(`  ok ${file}  ->  public/${target.out}`);
  imported++;

  if (target.flag?.slug) cleared.projects.add(target.flag.slug);
  if (target.flag?.field === 'photoPending') cleared.team = true;
}

/* Flip the pending flags for anything that now has a real photograph. */
if (cleared.projects.size > 0) {
  const p = join(ROOT, 'content/projects.ts');
  let s = await readFile(p, 'utf8');
  for (const slug of cleared.projects) {
    const i = s.indexOf(`slug: '${slug}'`);
    if (i === -1) continue;
    const j = s.indexOf('assetsPending: true', i);
    const nextSlug = s.indexOf('slug: ', i + 10);
    if (j !== -1 && (nextSlug === -1 || j < nextSlug)) {
      s = s.slice(0, j) + 'assetsPending: false' + s.slice(j + 'assetsPending: true'.length);
      console.log(`  ->  ${slug}: assetsPending now false`);
    }
  }
  await writeFile(p, s);
}

if (cleared.team) {
  const p = join(ROOT, 'content/team.ts');
  let s = await readFile(p, 'utf8');
  s = s.replace('photoPending: true', 'photoPending: false');
  await writeFile(p, s);
  console.log('  ->  project manager: photoPending now false');
}

console.log(`\n${imported} photograph${imported === 1 ? '' : 's'} imported. Run "npm run build" to check, then delete /incoming.`);
