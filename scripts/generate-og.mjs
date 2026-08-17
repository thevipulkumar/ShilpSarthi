/**
 * Builds the Open Graph share card.  Run with:  npm run og
 *
 * This replaces a placeholder that shipped reading "Open Graph share card.
 * Replace with branded artwork", in the retired linen palette. That card was
 * what every WhatsApp forward, Facebook share and Meta ad link preview showed.
 *
 * The base photograph is the Oak Forest, Pundag living room: a real delivered
 * project, shot on our own walkthrough, so the card shows work rather than a
 * logo on a colour field. It is the same frame used as that project's card hero.
 *
 * Text is rendered through librsvg, which resolves fonts through fontconfig, so
 * the script points fontconfig at scripts/fonts rather than relying on anything
 * being installed on the machine.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');

/* Point fontconfig at the bundled faces before sharp initialises text shaping. */
const conf = join(tmpdir(), 'shilp-og-fonts.conf');
await writeFile(conf, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig><dir>${join(ROOT, 'scripts', 'fonts')}</dir><cachedir>${tmpdir()}</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = conf;

const W = 1200, H = 630;
const SRC = join(ROOT, 'images', 'Oak Forest', 'HL IMG .00_00_05_03.Still001.jpg');

/* A 1.905:1 window taken from 42% down: above that is ceiling, below is floor. */
const meta = await sharp(SRC).metadata();
const cropH = Math.round(meta.width / (W / H));
const base = await sharp(SRC)
  .extract({
    left: 0,
    top: Math.min(Math.round(meta.height * 0.42), meta.height - cropH),
    width: meta.width,
    height: cropH,
  })
  .resize(W, H, { fit: 'cover' })
  .toBuffer();

/*
 * Scrim and lockup. The gradient is weighted to the bottom left so the wordmark
 * sits on tone regardless of what the photograph is doing behind it, while the
 * top right of the room stays clean.
 */
const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0"    stop-color="#0b0d0f" stop-opacity="0.90"/>
      <stop offset="0.34" stop-color="#0b0d0f" stop-opacity="0.55"/>
      <stop offset="0.68" stop-color="#0b0d0f" stop-opacity="0.10"/>
      <stop offset="1"    stop-color="#0b0d0f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"   stop-color="#0b0d0f" stop-opacity="0.42"/>
      <stop offset="0.5" stop-color="#0b0d0f" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#side)"/>
  <rect y="${H * 0.34}" width="${W}" height="${H * 0.66}" fill="url(#scrim)"/>

  <!-- The arch device, drawn as paths so it needs no font. -->
  <g transform="translate(64, ${H - 152}) scale(2.15)">
    <path d="M8 33V19a12 12 0 0 1 24 0v14" fill="none" stroke="#ffffff" stroke-width="2.7" stroke-linecap="round"/>
    <path d="M15 33V20.5a5 5 0 0 1 10 0V33Z" fill="#E71C24"/>
  </g>

  <text x="168" y="${H - 92}" font-family="Poppins" font-weight="600" font-size="54" fill="#ffffff">Shilp Sarthi</text>
  <text x="170" y="${H - 58}" font-family="Lato" font-size="23" fill="#ffffff" fill-opacity="0.86" letter-spacing="3.4">INTERIOR DESIGN IN RANCHI</text>

  <!-- Names the actual project, so the card never implies work we did not do. -->
  <text x="${W - 64}" y="${H - 58}" text-anchor="end" font-family="Lato" font-size="21" fill="#ffffff" fill-opacity="0.72">Oak Forest, Pundag</text>
</svg>`);

await mkdir(join(ROOT, 'public', 'images', 'og'), { recursive: true });
const out = join(ROOT, 'public', 'images', 'og', 'default.jpg');
const info = await sharp(base)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(out);

console.log(`  public/images/og/default.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
