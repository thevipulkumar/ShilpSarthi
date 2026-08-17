/**
 * Two reports over content/images.ts:
 *
 *   npm run images:provenance   every non-own asset, with source and licence
 *   npm run images:audit        the replacement backlog, most prominent first
 *
 * Both read the manifest directly, so they cannot drift from what the site
 * actually renders.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const mode = process.argv[2] === 'provenance' ? 'provenance' : 'audit';
const src = await readFile(join(import.meta.dirname, '..', 'content', 'images.ts'), 'utf8');

/* The manifest is plain data, so a light parse beats standing up a TS runtime. */
const slots = [];
for (const block of src.split(/\n  \{\n/).slice(1)) {
  const body = block.split(/\n  \},/)[0];
  const field = (k) => body.match(new RegExp(`${k}:\\s*'([^']*)'`))?.[1];
  const num = (k) => Number(body.match(new RegExp(`${k}:\\s*(\\d+)`))?.[1] ?? 0);
  if (!field('id')) continue;
  slots.push({
    id: field('id'), src: field('src'), source: field('source'), kind: field('kind'),
    sourceUrl: field('sourceUrl'), retrievedAt: field('retrievedAt'),
    licenceNote: field('licenceNote'), note: field('note'), prominence: num('prominence'),
  });
}

const LABEL = {
  own: 'Own photography',
  'homelane-licensed': 'HomeLane, licensed',
  'stock-licensed': 'Stock, licensed',
  generated: 'Generated illustration',
};

if (mode === 'provenance') {
  const third = slots.filter((s) => s.source !== 'own');
  console.log(`\nNon-own assets: ${third.length} of ${slots.length}\n`);
  const byS = {};
  for (const s of third) (byS[s.source] ??= []).push(s);
  for (const [source, list] of Object.entries(byS)) {
    console.log(`${LABEL[source] ?? source}  (${list.length})`);
    for (const s of list) {
      console.log(`  ${s.id}`);
      console.log(`    file     ${s.src}`);
      if (s.sourceUrl) console.log(`    origin   ${s.sourceUrl}`);
      if (s.retrievedAt) console.log(`    retrieved ${s.retrievedAt}`);
      if (s.licenceNote) console.log(`    licence  ${s.licenceNote}`);
      if (s.note) console.log(`    note     ${s.note}`);
    }
    console.log('');
  }
  const hl = byS['homelane-licensed'] ?? [];
  console.log(hl.length
    ? `To withdraw the HomeLane assets: replace the ${hl.length} file(s) above and set source back to 'own'.`
    : 'No HomeLane-sourced assets currently in use.\n');
} else {
  const backlog = slots.filter((s) => s.source !== 'own').sort((a, b) => a.prominence - b.prominence);
  const own = slots.filter((s) => s.source === 'own');
  console.log('\nREPLACE WITH OWN PHOTOGRAPHY');
  console.log('Most prominent first. Every one of these strengthens the local-proof argument.\n');
  if (!backlog.length) console.log('  Nothing outstanding.\n');
  for (const s of backlog) {
    const flag = s.kind === 'own-work' ? '  <- OWN-WORK SLOT, highest priority' : '';
    console.log(`  [${s.prominence}] ${s.id.padEnd(32)} ${(LABEL[s.source] ?? s.source).padEnd(24)}${flag}`);
  }
  console.log(`\nOwn photography in place: ${own.length} of ${slots.length}`);
  const hl = backlog.filter((s) => s.source === 'homelane-licensed');
  if (hl.length) console.log(`HomeLane-sourced, treat as a bridge not a destination: ${hl.length}`);
  console.log('');
}
