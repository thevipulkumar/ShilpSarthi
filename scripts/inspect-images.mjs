/**
 * Inventories a folder of supplied images: dimensions, aspect, and a first pass
 * at whether each one is usable photography or should be excluded under the
 * asset brief (logos, campaign creative, UI sprites, tiny icons).
 *
 * Usage: node scripts/inspect-images.mjs ./images
 */
import { readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const dir = process.argv[2] ?? './images';
const files = (await readdir(dir)).filter((f) =>
  ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'].includes(extname(f).toLowerCase()),
);

const EXCLUDE = /logo|wordmark|favicon|sprite|banner|offer|sale|campaign|fest|promo|deal|emi|coupon|discount|exit-intent|free_session|vastu_sense|desktop\.webp/i;

const rows = [];
for (const f of files) {
  const p = join(dir, f);
  const ext = extname(f).toLowerCase();
  let w = 0, h = 0, fmt = ext.slice(1);
  try {
    const m = await sharp(p).metadata();
    w = m.width ?? 0; h = m.height ?? 0; fmt = m.format ?? fmt;
  } catch {
    // SVGs without intrinsic size, or unreadable files.
  }
  let verdict = 'photo';
  if (ext === '.svg') verdict = 'vector, likely icon';
  else if (EXCLUDE.test(f)) verdict = 'EXCLUDE campaign/logo';
  else if (w && w < 600) verdict = 'EXCLUDE too small';
  rows.push({ f, w, h, fmt, ar: h ? (w / h).toFixed(2) : '?', verdict });
}

const groups = {};
for (const r of rows) (groups[r.verdict] ??= []).push(r);

console.log(`${rows.length} files in ${dir}\n`);
for (const [v, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${v}  (${list.length})`);
  for (const r of list.slice(0, 45)) {
    console.log(`   ${String(r.w).padStart(5)}x${String(r.h).padEnd(5)} ar ${r.ar.padEnd(5)} ${r.fmt.padEnd(5)} ${r.f}`);
  }
  if (list.length > 45) console.log(`   ... and ${list.length - 45} more`);
  console.log('');
}
