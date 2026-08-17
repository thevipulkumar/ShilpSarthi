/**
 * Original interior illustrations, drawn as vectors and rasterised with sharp.
 *
 * WHY THESE EXIST
 * There are no photographs of Shilp Sarthi's work available to this repo yet.
 * The three options were: ship stock photography captioned as real Ranchi
 * projects (which is what the previous site did, and is a misrepresentation risk
 * under both Google Ads and Meta ad policy), leave grey placeholder panels, or
 * draw something original. This is the third option.
 *
 * These are deliberately, obviously ILLUSTRATIONS. Flat vector elevations in the
 * site palette. Nobody can mistake one for a photograph of a real room, which is
 * exactly the point: they fill the layout and set the tone without claiming to
 * be a project that was delivered.
 *
 * They are a stopgap. The moment real photographs arrive, `npm run photos`
 * overwrites them and the illustrations are gone.
 *
 * Run with: npm run illustrations
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..', 'public');

/* ---------- palette ---------------------------------------------------- */
const C = {
  wall: '#FBF9F7',
  wallAlt: '#F4F0EB',
  floor: '#E9E2D8',
  floorDark: '#DDD3C5',
  wood: '#D9C3A2',
  woodDark: '#C0A47E',
  woodDeep: '#9C8563',
  panel: '#EFE7DA',
  stone: '#3A3F45',
  stoneLight: '#8E959D',
  metal: '#C3C8CE',
  line: '#2A2E33',
  soft: '#B9BFC6',
  accent: '#E71C24',
  green: '#5E7A5A',
  greenDark: '#43593F',
  white: '#FFFFFF',
};

/* ---------- primitives ------------------------------------------------- */
const r = (x, y, w, h, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const rr = (x, y, w, h, rad, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${fill}" ${extra}/>`;
const ln = (x1, y1, x2, y2, stroke = C.line, w = 2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;
const ci = (cx, cy, rad, fill) => `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"/>`;
const pth = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`;

/** A run of cabinet doors with thin handles. */
function cabinets(x, y, w, h, count, fill, handle = C.stoneLight, vertical = true) {
  const each = w / count;
  let s = rr(x, y, w, h, 3, fill);
  for (let i = 0; i < count; i++) {
    const cx = x + i * each;
    if (i > 0) s += ln(cx, y + 3, cx, y + h - 3, '#00000018', 2);
    s += vertical
      ? rr(cx + each - 12, y + h * 0.22, 4, h * 0.56, 2, handle)
      : rr(cx + each * 0.3, y + 10, each * 0.4, 4, 2, handle);
  }
  return s;
}

/** Potted plant, used to break up the geometry. */
function plant(x, y, scale = 1) {
  const s = (n) => n * scale;
  return `<g transform="translate(${x},${y})">
    ${pth(`M ${-s(26)} 0 L ${s(26)} 0 L ${s(19)} ${s(46)} L ${-s(19)} ${s(46)} Z`, C.woodDark)}
    ${r(-s(26), -s(6), s(52), s(9), C.woodDeep)}
    ${pth(`M 0 ${-s(8)} C ${-s(34)} ${-s(30)} ${-s(40)} ${-s(74)} ${-s(12)} ${-s(92)} C ${-s(6)} ${-s(60)} ${-s(4)} ${-s(30)} 0 ${-s(8)} Z`, C.green)}
    ${pth(`M 0 ${-s(8)} C ${s(34)} ${-s(28)} ${s(42)} ${-s(70)} ${s(14)} ${-s(88)} C ${s(6)} ${-s(56)} ${s(4)} ${-s(28)} 0 ${-s(8)} Z`, C.greenDark)}
    ${pth(`M 0 ${-s(8)} C ${-s(10)} ${-s(44)} ${s(2)} ${-s(84)} ${s(2)} ${-s(104)} C ${s(10)} ${-s(72)} ${s(8)} ${-s(36)} 0 ${-s(8)} Z`, C.green)}
  </g>`;
}

/** Warm ceiling downlight with a soft cone. */
function downlight(x, y, spread = 60, drop = 150) {
  return `${rr(x - 16, y, 32, 7, 3, C.metal)}
    ${pth(`M ${x - 14} ${y + 7} L ${x + 14} ${y + 7} L ${x + spread} ${y + drop} L ${x - spread} ${y + drop} Z`, '#FFF4D6', 'opacity="0.5"')}`;
}

/** Ceiling fan. In an Indian room its absence is the first thing you notice. */
function ceilingFan(x, y = 0, span = 150, drop = 96) {
  return `<g>
    ${ln(x, y, x, y + drop, C.stoneLight, 5)}
    ${rr(x - 26, y + drop, 52, 26, 8, C.metal)}
    ${rr(x - 20, y + drop + 26, 40, 8, 4, C.stoneLight)}
    ${pth(`M ${x - 22} ${y + drop + 8} L ${x - span} ${y + drop + 2} L ${x - span} ${y + drop + 16} L ${x - 22} ${y + drop + 20} Z`, C.soft)}
    ${pth(`M ${x + 22} ${y + drop + 8} L ${x + span} ${y + drop + 2} L ${x + span} ${y + drop + 16} L ${x + 22} ${y + drop + 20} Z`, C.soft)}
  </g>`;
}

/** Casement window behind a safety grille, the standard Indian opening. */
function grilleWindow(x, y, w, h) {
  let s = rr(x - 8, y - 8, w + 16, h + 16, 4, C.woodDark);
  s += r(x, y, w, h, '#DCE6EC');
  s += pth(`M ${x} ${y + h} L ${x + w * 0.55} ${y} L ${x + w * 0.8} ${y} L ${x + w * 0.25} ${y + h} Z`, '#FFFFFF', 'opacity="0.45"');
  for (let i = 1; i < 5; i++) s += ln(x + (w / 5) * i, y, x + (w / 5) * i, y + h, C.stoneLight, 3);
  s += ln(x, y + h / 2, x + w, y + h / 2, C.stoneLight, 3);
  s += r(x - 8, y + h + 8, w + 16, 10, C.stone);
  return s;
}

/** Loft storage over a wardrobe. Standard in Indian bedrooms, absent in Western ones. */
function loft(x, y, w, h, count = 2) {
  return cabinets(x, y, w, h, count, C.woodDark) + ln(x, y + h, x + w, y + h, '#00000022', 3);
}

/** Mandir niche with a warm lamp. */
function poojaNiche(x, y, w, h) {
  let s = rr(x, y, w, h, 6, C.woodDeep);
  s += pth(`M ${x + 12} ${y + h - 12} L ${x + 12} ${y + h * 0.42} Q ${x + w / 2} ${y - 6} ${x + w - 12} ${y + h * 0.42} L ${x + w - 12} ${y + h - 12} Z`, '#FFF3DA');
  s += rr(x + w / 2 - 16, y + h - 46, 32, 34, 4, C.woodDark);
  s += ci(x + w / 2, y + h - 58, 9, C.accent);
  s += pth(`M ${x + w / 2 - 4} ${y + h - 70} Q ${x + w / 2} ${y + h - 86} ${x + w / 2 + 4} ${y + h - 70} Z`, '#F5A623');
  return s;
}

function frame(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
}

/* ---------- scenes ----------------------------------------------------- */
const W = 1200, H = 900, FLOOR = 700;

/** Shared back wall, floor and skirting. */
function room(wall = C.wall) {
  // Vitrified tile, laid in a grid. Indian homes are not floorboarded.
  let s = `${r(0, 0, W, H, wall)}${r(0, FLOOR, W, H - FLOOR, '#EDEAE4')}`;
  for (let x = -40; x < W + 200; x += 150) s += ln(x, FLOOR, x - 90, H, '#00000010', 2);
  for (let y = FLOOR + 46; y < H; y += 58) s += ln(0, y, W, y, '#00000010', 2);
  s += r(0, FLOOR - 14, W, 14, '#E2DCD2') + ln(0, FLOOR, W, FLOOR, '#00000018', 3);
  return s;
}

function kitchen() {
  let s = room();
  s += downlight(300, 60) + downlight(880, 60);
  // Tiled dado, the standard Indian splashback.
  s += r(90, 300, 1020, 190, C.wallAlt);
  for (let x = 90; x <= 1110; x += 68) s += ln(x, 300, x, 490, '#00000010', 2);
  for (let y = 300; y <= 490; y += 47) s += ln(90, y, 1110, y, '#00000010', 2);

  s += cabinets(90, 150, 400, 150, 3, C.wood);
  s += cabinets(830, 150, 280, 150, 2, C.wood);
  // Chimney over the hob.
  s += pth('M 560 150 L 760 150 L 720 250 L 600 250 Z', C.metal);
  s += r(636, 250, 48, 52, C.stoneLight);

  // Granite counter and base units.
  s += r(90, 484, 1020, 20, C.stone);
  s += cabinets(90, 504, 800, 196, 5, C.wood);
  // Tall provisions unit.
  s += r(908, 150, 202, 550, C.woodDark, 'rx="3"');
  s += ln(908, 400, 1110, 400, '#00000018', 2) + rr(1090, 380, 4, 40, 2, C.stoneLight);

  s += rr(600, 470, 120, 16, 3, C.stone);
  s += ci(624, 478, 7, C.stoneLight) + ci(696, 478, 7, C.stoneLight);
  s += rr(180, 468, 140, 18, 3, C.metal);
  s += ln(250, 468, 250, 424, C.metal, 6) + ln(250, 424, 278, 424, C.metal, 6);

  // Wall-mounted RO water purifier: in almost every Indian kitchen, in none of
  // the Western reference photography.
  s += rr(500, 330, 78, 104, 6, C.white) + rr(510, 344, 58, 40, 3, '#DCE6EC');
  s += rr(524, 402, 30, 8, 3, C.stoneLight) + ci(539, 424, 5, C.stoneLight);

  // Mixer grinder and a pressure cooker on the counter.
  s += rr(370, 440, 46, 44, 4, C.white) + rr(376, 424, 34, 18, 3, C.stoneLight);
  s += rr(430, 452, 50, 32, 5, C.metal) + rr(444, 442, 22, 10, 3, C.stoneLight);
  s += rr(786, 440, 52, 44, 6, C.accent) + rr(800, 430, 24, 12, 3, C.accent);
  return frame(W, H, s);
}

function livingRoom() {
  let s = room();
  // False ceiling with cove lighting, the default in Indian flats.
  s += r(0, 0, W, 96, C.wallAlt) + r(0, 96, W, 8, '#FFF0CC');
  s += ceilingFan(330, 104, 132, 88);
  s += downlight(180, 60, 70, 150) + downlight(1020, 60, 70, 150);

  // Panelled TV wall.
  s += r(620, 170, 500, 530, C.panel);
  for (let x = 640; x < 1120; x += 40) s += ln(x, 170, x, 700, '#00000012', 3);
  s += rr(720, 250, 320, 190, 6, C.stone);
  s += rr(736, 266, 288, 158, 3, '#12161A');
  s += rr(690, 500, 390, 62, 5, C.woodDark) + ln(885, 500, 885, 562, '#00000018', 2);

  s += grilleWindow(120, 210, 300, 200);
  // Three seater plus a single, the usual Indian sofa set.
  s += rr(100, 500, 380, 130, 12, C.soft);
  s += rr(118, 460, 344, 70, 14, '#C9CFD6');
  s += rr(128, 482, 140, 56, 10, C.wallAlt) + rr(300, 482, 140, 56, 10, C.wallAlt);
  s += rr(146, 470, 70, 60, 10, C.accent);
  s += `<ellipse cx="330" cy="694" rx="300" ry="34" fill="#00000010"/>`;
  s += rr(190, 620, 200, 18, 5, C.wood) + r(208, 638, 12, 56, C.woodDeep) + r(360, 638, 12, 56, C.woodDeep);
  s += plant(540, 700, 0.62);
  return frame(W, H, s);
}

function bedroom() {
  let s = room(C.wallAlt);
  s += r(0, 0, W, 88, C.wall) + r(0, 88, W, 7, '#FFF0CC');
  s += ceilingFan(430, 95, 130, 84);

  s += r(170, 210, 520, 290, C.panel);
  for (let x = 196; x < 682; x += 52) s += rr(x, 232, 34, 246, 4, '#00000010');
  s += rr(170, 210, 520, 12, 3, C.woodDark);

  s += rr(150, 560, 560, 96, 6, C.woodDeep);
  s += rr(158, 496, 544, 70, 8, C.white);
  s += rr(158, 528, 544, 40, 6, C.soft);
  s += rr(230, 452, 164, 56, 12, C.white) + rr(410, 452, 164, 56, 12, C.white);
  s += rr(322, 470, 116, 40, 10, C.accent);
  s += r(176, 656, 18, 44, C.woodDeep) + r(666, 656, 18, 44, C.woodDeep);

  // Wardrobe with the loft above it. This is the detail that says India.
  s += loft(790, 130, 340, 96, 2);
  s += r(790, 226, 340, 474, C.wood, 'rx="3"');
  s += ln(960, 226, 960, 700, '#00000020', 3);
  s += r(806, 248, 138, 430, C.metal, 'rx="2"');
  s += pth('M 806 470 L 944 248 L 944 342 L 852 678 L 806 678 Z', '#FFFFFF', 'opacity="0.32"');
  s += rr(944, 430, 6, 76, 3, C.stoneLight) + rr(974, 430, 6, 76, 3, C.stoneLight);

  s += rr(716, 542, 74, 14, 3, C.woodDark);
  s += rr(728, 556, 50, 100, 3, C.wood) + rr(732, 590, 42, 4, 2, C.stoneLight);
  return frame(W, H, s);
}

function fullHome() {
  let s = room();
  s += r(0, 0, W, 92, C.wallAlt) + r(0, 92, W, 8, '#FFF0CC');
  s += ceilingFan(320, 100, 132, 86);
  s += downlight(700, 60) + downlight(950, 60);

  // Dining, with the pooja niche that no Western reference photo would carry.
  s += rr(90, 520, 400, 22, 5, C.wood);
  s += r(118, 542, 14, 158, C.woodDeep) + r(448, 542, 14, 158, C.woodDeep);
  for (const x of [140, 240, 340]) {
    s += rr(x, 462, 68, 16, 4, C.soft) + r(x + 6, 478, 10, 58, C.woodDark) + r(x + 52, 478, 10, 58, C.woodDark);
  }
  s += rr(228, 498, 58, 22, 5, C.accent);
  s += poojaNiche(546, 210, 150, 210);

  // Crockery unit.
  s += r(730, 200, 230, 500, C.woodDark, 'rx="3"');
  s += r(748, 222, 194, 190, C.wallAlt, 'rx="2"');
  for (let y = 268; y < 412; y += 48) s += ln(748, y, 942, y, '#00000018', 3);
  s += cabinets(748, 430, 194, 250, 2, C.wood);

  s += rr(990, 500, 190, 110, 12, C.soft) + rr(1004, 466, 162, 56, 12, '#C9CFD6');
  s += `<ellipse cx="1080" cy="700" rx="150" ry="30" fill="#00000010"/>`;
  s += plant(700, 700, 0.62);
  return frame(W, H, s);
}

function commercial() {
  let s = room('#F7F8FA');
  s += r(0, 0, W, 92, '#EEF1F4') + r(0, 92, W, 7, '#FFF0CC');
  s += downlight(300, 60, 90, 190) + downlight(620, 60, 90, 190) + downlight(940, 60, 90, 190);

  s += r(120, 150, 600, 340, C.wallAlt);
  s += rr(176, 208, 300, 34, 6, C.accent);
  s += rr(176, 268, 400, 16, 4, C.soft) + rr(176, 302, 320, 16, 4, C.soft);

  s += rr(140, 500, 540, 200, 8, C.woodDark);
  s += rr(140, 480, 570, 30, 6, C.stone);
  s += ln(320, 510, 320, 700, '#00000018', 2) + ln(500, 510, 500, 700, '#00000018', 2);
  s += rr(600, 428, 92, 54, 5, C.stone) + r(637, 482, 18, 26, C.stoneLight);

  s += rr(790, 560, 150, 60, 10, C.soft) + rr(802, 520, 126, 48, 10, '#C9CFD6');
  s += rr(980, 560, 150, 60, 10, C.soft) + rr(992, 520, 126, 48, 10, '#C9CFD6');
  s += r(970, 160, 190, 300, C.wood, 'rx="3"');
  for (let y = 226; y < 460; y += 74) s += ln(970, y, 1160, y, '#00000018', 3);
  s += plant(752, 700, 0.68);
  return frame(W, H, s);
}

function studio() {
  let s = room();
  s += r(0, 0, W, 90, C.wallAlt) + r(0, 90, W, 7, '#FFF0CC');
  s += downlight(240, 56) + downlight(600, 56) + downlight(960, 56);

  // Shutter and laminate samples on the wall, which is what the studio is for.
  s += r(80, 140, 1040, 290, C.wallAlt);
  [C.wood, C.woodDark, C.stone, C.panel, C.metal, C.woodDeep, C.soft, C.accent]
    .forEach((f, i) => {
      const x = 120 + i * 122;
      s += rr(x, 176, 96, 96, 6, f) + rr(x, 288, 96, 12, 3, '#00000012');
    });
  s += rr(120, 348, 300, 14, 4, C.soft) + rr(120, 378, 200, 14, 4, C.soft);

  s += rr(300, 500, 600, 22, 5, C.stone);
  s += cabinets(320, 522, 560, 178, 4, C.wood);
  s += rr(560, 478, 110, 22, 4, C.metal);
  for (const x of [380, 500]) {
    s += rr(x, 560, 74, 18, 6, C.woodDark) + r(x + 30, 578, 12, 122, C.woodDeep) + rr(x + 10, 692, 54, 10, 4, C.woodDeep);
  }
  s += plant(140, 700, 0.72) + plant(1080, 700, 0.6);
  return frame(W, H, s);
}

/* ---------- output map -------------------------------------------------- */
const OUT = [
  // superseded by supplied photography, see content/images.ts
  // ['images/services/modular-kitchen.jpg', kitchen()],
  // superseded by supplied photography, see content/images.ts
  // ['images/services/living-room.jpg', livingRoom()],
  // superseded by supplied photography, see content/images.ts
  // ['images/services/bedroom-wardrobe.jpg', bedroom()],
  // superseded by supplied photography, see content/images.ts
  // ['images/services/full-home-interiors.jpg', fullHome()],
  ['images/services/commercial-interiors.jpg', commercial()],
  ['images/studio/shilp-sarthi-studio-singh-more.jpg', studio()],
  ['images/studio/shilp-sarthi-team-ranchi.jpg', studio()],
  // Project cards reuse the scenes that match each project's scope.
  ['images/projects/bariatu-3bhk-full-home.jpg', fullHome()],
  ['images/projects/harmu-2bhk-kitchen-wardrobes.jpg', kitchen()],
  ['images/projects/kanke-villa-full-home.jpg', livingRoom()],
  ['images/projects/doranda-3bhk-full-home.jpg', bedroom()],
  ['images/projects/lalpur-2bhk-full-home.jpg', livingRoom()],
  ['images/projects/kanke-road-anytime-fitness.jpg', commercial()],
  // Before and after pairs for the reveal slider.
  ['images/projects/bariatu-3bhk-before.jpg', null],
  ['images/projects/bariatu-3bhk-after.jpg', fullHome()],
  ['images/projects/harmu-2bhk-before.jpg', null],
  ['images/projects/harmu-2bhk-after.jpg', kitchen()],
  ['images/projects/kanke-villa-before.jpg', null],
  ['images/projects/kanke-villa-after.jpg', livingRoom()],
  ['images/projects/lalpur-2bhk-before.jpg', null],
  ['images/projects/lalpur-2bhk-after.jpg', livingRoom()],
];

/** The "before": a bare, unfinished shell. */
function emptyShell() {
  let s = `${r(0, 0, W, H, '#EFEDEA')}${r(0, FLOOR, W, H - FLOOR, '#DFDAD3')}`;
  for (let x = -40; x < W + 200; x += 150) s += ln(x, FLOOR, x - 90, H, '#00000012', 2);
  for (let y = FLOOR + 46; y < H; y += 58) s += ln(0, y, W, y, '#00000012', 2);
  s += r(0, FLOOR - 12, W, 12, '#D3CCC3') + ln(0, FLOOR, W, FLOOR, '#0000001C', 3);

  // Bare plaster, an unpainted grille, exposed wiring, a stack of tiles.
  s += r(150, 170, 300, 400, '#E4E0DB') + ln(150, 170, 150, 570, '#00000018', 3);
  s += ln(450, 170, 450, 570, '#00000018', 3) + ln(150, 170, 450, 170, '#00000018', 3);
  s += rr(792, 232, 300, 210, 3, '#CFC9C1');
  s += r(800, 240, 284, 194, '#DDE4E9');
  for (let i = 1; i < 5; i++) s += ln(800 + (284 / 5) * i, 240, 800 + (284 / 5) * i, 434, '#A9A49C', 3);
  s += ln(800, 337, 1084, 337, '#A9A49C', 3);
  s += ln(560, 300, 590, 300, '#9A948B', 5) + ln(590, 300, 590, 352, '#9A948B', 5);
  s += ci(590, 358, 7, '#9A948B');
  s += rr(560, 648, 110, 52, 2, '#CFC9C1') + rr(574, 634, 82, 16, 2, '#C4BDB4');
  s += rr(700, 664, 70, 36, 2, '#C4BDB4');
  s += `<ellipse cx="600" cy="726" rx="250" ry="26" fill="#00000010"/>`;
  return frame(W, H, s);
}

/*
 * Slots that hold a real licensed photograph are listed in
 * public/images/services/PHOTO-SOURCES.json and skipped, so re-running this
 * script can never paint an illustration over a photo.
 */
let keep = new Set();
try {
  const { readFile } = await import('node:fs/promises');
  const j = JSON.parse(await readFile(join(ROOT, 'images/services/PHOTO-SOURCES.json'), 'utf8'));
  keep = new Set(j.keep ?? []);
} catch { /* no manifest yet */ }

console.log('Drawing illustrations...');
for (const [path, svg] of OUT) {
  if (keep.has(path)) { console.log('  skip (real photo) ' + path); continue; }
  const out = join(ROOT, path);
  await mkdir(dirname(out), { recursive: true });
  const source = svg ?? emptyShell();
  const is32 = path.includes('-before') || path.includes('-after');
  await sharp(Buffer.from(source))
    .resize(is32 ? 1400 : 1200, is32 ? 933 : 900, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log('  ' + path);
}
console.log(`\n${OUT.length} illustrations written.`);
