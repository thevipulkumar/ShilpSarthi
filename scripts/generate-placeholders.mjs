/**
 * Generates the placeholder image set and the favicon PNG fallbacks.
 *
 * The placeholders are deliberately diagrammatic, not photographic. They state
 * in plain text what belongs in each slot and what its dimensions should be.
 * Nothing here could be mistaken for a real Ranchi project, which is the whole
 * point: the previous site captioned stock photography as real work, and that is
 * both an ad-policy risk and the wrong way to start a trust relationship.
 *
 * Run with:  npm run placeholders
 * Safe to re-run. It overwrites only files it owns and never touches a real
 * photograph you have dropped in, because it skips any path that already exists
 * unless --force is passed.
 */
import { mkdir, access, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const FORCE = process.argv.includes('--force');
const ROOT = join(import.meta.dirname, '..', 'public');

const INK = '#12202B';
const LINEN = '#F1EADF';
const LINEN_DARK = '#E6DBCA';
const ACCENT = '#A84523';
const MUTED = '#5A7A91';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Wraps text to a rough character budget so long labels do not overflow. */
function wrap(text, perLine) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > perLine) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function placeholderSvg({ width, height, kicker, label, tone = 'light' }) {
  const bg = tone === 'before' ? LINEN_DARK : tone === 'dark' ? INK : LINEN;
  const fg = tone === 'dark' ? '#B4C6D2' : MUTED;
  const kickerColour = tone === 'dark' ? '#E79C7E' : ACCENT;

  const kickerSize = Math.max(13, Math.round(width / 34));
  const labelSize = Math.max(15, Math.round(width / 26));
  const lines = wrap(label, Math.round(width / (labelSize * 0.52)));
  const lineHeight = Math.round(labelSize * 1.4);

  // Vertically centre the whole block: kicker + gap + label lines.
  const blockHeight = kickerSize + 18 + lines.length * lineHeight;
  let y = Math.round((height - blockHeight) / 2) + kickerSize;

  const kickerEl = `<text x="50%" y="${y}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="${kickerSize}" font-weight="600" letter-spacing="${kickerSize * 0.14}" fill="${kickerColour}">${esc(kicker.toUpperCase())}</text>`;
  y += 18 + labelSize;

  const labelEls = lines
    .map((l, i) => `<text x="50%" y="${y + i * lineHeight}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="${labelSize}" font-weight="400" fill="${fg}">${esc(l)}</text>`)
    .join('');

  const dims = `<text x="50%" y="${height - 22}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="${Math.max(11, Math.round(width / 46))}" fill="${fg}" opacity="0.75">${width} x ${height}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" fill="none" stroke="${fg}" stroke-width="2" stroke-dasharray="12 10" opacity="0.5"/>
  ${kickerEl}${labelEls}${dims}
</svg>`;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function writePng(relPath, svg, { width, height }) {
  const out = join(ROOT, relPath);
  if (!FORCE && (await exists(out))) {
    console.log(`  skip (already present) ${relPath}`);
    return;
  }
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).resize(width, height).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`  wrote ${relPath}`);
}

/* ------------------------------------------------------------------ */

const projects = [
  ['bariatu-3bhk-full-home', '3 BHK full home in Bariatu'],
  ['harmu-2bhk-kitchen-wardrobes', '2 BHK kitchen and wardrobes in Harmu'],
  ['kanke-villa-full-home', 'Villa full home on Kanke Road'],
  ['doranda-3bhk-full-home', '3 BHK full home in Doranda'],
  ['lalpur-2bhk-full-home', '2 BHK full home in Lalpur'],
  ['kanke-road-anytime-fitness', 'Anytime Fitness on Kanke Road'],
];

const beforeAfterPairs = [
  ['bariatu-3bhk', '3 BHK living room, Bariatu'],
  ['harmu-2bhk', '2 BHK kitchen, Harmu'],
  ['kanke-villa', 'Villa living room, Kanke Road'],
  ['lalpur-2bhk', '2 BHK living and dining, Lalpur'],
];

const services = [
  ['full-home-interiors', 'Completed full home interior, Ranchi'],
  ['modular-kitchen', 'Completed modular kitchen, Ranchi'],
  ['bedroom-wardrobe', 'Completed bedroom and wardrobe, Ranchi'],
  ['living-room', 'Completed living room, Ranchi'],
  ['commercial-interiors', 'Completed commercial fit-out, Ranchi'],
];

console.log('Generating placeholder images...');

// Portfolio cards, 4:3
for (const [slug, label] of projects) {
  await writePng(
    `images/projects/${slug}.jpg`,
    placeholderSvg({ width: 1200, height: 900, kicker: 'Replace', label }),
    { width: 1200, height: 900 },
  );
}

// Before and after pairs, 3:2 for the reveal slider
for (const [base, label] of beforeAfterPairs) {
  await writePng(
    `images/projects/${base}-before.jpg`,
    placeholderSvg({ width: 1400, height: 933, kicker: 'Before', label: `Empty flat, ${label}`, tone: 'before' }),
    { width: 1400, height: 933 },
  );
  await writePng(
    `images/projects/${base}-after.jpg`,
    placeholderSvg({ width: 1400, height: 933, kicker: 'After', label: `Finished room, ${label}`, tone: 'light' }),
    { width: 1400, height: 933 },
  );
}

// Service pages, 4:3
for (const [slug, label] of services) {
  await writePng(
    `images/services/${slug}.jpg`,
    placeholderSvg({ width: 1200, height: 900, kicker: 'Replace', label }),
    { width: 1200, height: 900 },
  );
}

// Studio, team, project manager
await writePng(
  'images/studio/shilp-sarthi-studio-singh-more.jpg',
  placeholderSvg({ width: 1200, height: 900, kicker: 'Replace', label: 'Inside the studio at Royal Heights, Singh More' }),
  { width: 1200, height: 900 },
);
await writePng(
  'images/studio/shilp-sarthi-team-ranchi.jpg',
  placeholderSvg({ width: 1200, height: 900, kicker: 'Replace', label: 'The design and project team at the studio' }),
  { width: 1200, height: 900 },
);
await writePng(
  'images/team/project-manager.jpg',
  placeholderSvg({ width: 1200, height: 900, kicker: 'Real portrait', label: 'Ranchi project manager. Do not use a stock portrait.' }),
  { width: 1200, height: 900 },
);

/*
 * No video placeholder any more. Every video on the site is a real film from the
 * studio's YouTube channel, and each one's poster is cropped from its own
 * thumbnail. See the "Work videos" section of the README.
 */

// Open Graph card, 1200x630
await writePng(
  'images/og/default.jpg',
  placeholderSvg({ width: 1200, height: 630, kicker: 'Shilp Sarthi', label: 'Open Graph share card. Replace with branded artwork.' }),
  { width: 1200, height: 630 },
);

/* ------------------------------------------------------------------ */
/* Favicon PNG fallbacks, rasterised from the same geometry as app/icon.svg. */

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="9" fill="${INK}"/>
  <path d="M20 9.5 31 19v11.5a1.5 1.5 0 0 1-1.5 1.5h-19A1.5 1.5 0 0 1 9 30.5V19l11-9.5Z" fill="#C4562F"/>
  <rect x="16.75" y="22" width="6.5" height="10" rx="1" fill="#D9A441"/>
</svg>`;

for (const size of [192, 512]) {
  const out = join(ROOT, `icon-${size}.png`);
  if (!FORCE && (await exists(out))) {
    console.log(`  skip (already present) icon-${size}.png`);
    continue;
  }
  await sharp(Buffer.from(iconSvg)).resize(size, size).png().toFile(out);
  console.log(`  wrote icon-${size}.png`);
}

// A written record of exactly what needs replacing, for whoever collects assets.
const manifest = `# Image assets to supply

Every file below is currently a generated placeholder. Drop the real file at the
exact same path and filename, then set the matching \`assetsPending\` /
\`photoPending\` / \`pending\` flag to false in the content file noted.

Do not caption a stock photograph as a real Ranchi project. That is what the
previous site did and it is a misrepresentation risk under both Google Ads and
Meta ad policy.

## Portfolio, content/projects.ts -> set assetsPending: false per project
${projects.map(([s, l]) => `- public/images/projects/${s}.jpg  (1200x900, 4:3)  ${l}`).join('\n')}

## Before and after pairs, needed for the reveal slider
Both files in a pair are required. If there is no genuine "before" shot, set
\`before\` and \`after\` to null in content/projects.ts and the card falls back to a
single static image. A slider with a faked before is worse than no slider.
${beforeAfterPairs.map(([b, l]) => `- public/images/projects/${b}-before.jpg + ${b}-after.jpg  (1400x933, 3:2)  ${l}`).join('\n')}

## Service pages, content/services.ts
${services.map(([s, l]) => `- public/images/services/${s}.jpg  (1200x900, 4:3)  ${l}`).join('\n')}

## Studio and team
- public/images/studio/shilp-sarthi-studio-singh-more.jpg  (1200x900)  the actual studio interior
- public/images/studio/shilp-sarthi-team-ranchi.jpg  (1200x900)  the actual team
- public/images/team/project-manager.jpg  (1200x900)  REAL portrait. Never a stock face.

## Video
Nothing outstanding. All three homepage videos are real films from the studio's
own YouTube channel, and their poster frames are cropped from their own
thumbnails. To add another, see the "Work videos" section of the README.

## Share card and icons
- public/images/og/default.jpg  (1200x630)  Open Graph card
- public/icon-192.png, public/icon-512.png  generated from app/icon.svg, fine as is
`;

await writeFile(join(ROOT, '..', 'ASSETS-TODO.md'), manifest, 'utf8');
console.log('  wrote ASSETS-TODO.md');
console.log('Done.');
