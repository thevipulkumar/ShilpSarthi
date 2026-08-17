# HomeLane licensed assets: status

Working notes against `claude-code-prompt-homelane-assets.md`. Read this before
re-attempting the asset pull.

## Status: infrastructure complete, zero assets acquired

Sections 2, 3, 5 and 6 of the brief are built and working. Section 1 produced
nothing, for the reason below.

## Why no assets were taken

**No partner asset kit was supplied**, so the preferred source in section 1 was
unavailable and the homelane.com fallback applied.

Applying the brief's own exclusion filters to homelane.com yields **zero usable
images**. Checked on 16 August 2026, with the page fully rendered and scrolled so
lazy-loaded media resolved:

| Page | Images found | Passing the filters |
| --- | --- | --- |
| homelane.com homepage | 7 | **0** |
| homelane.com/cities/interior-designers-ranchi | 2 | **0** |

Everything present was excluded by rules the brief itself sets:

- `hllogosvg.svg` — logo file, excluded by section 7
- `free_session_banner.webp`, `best-home-interior-design-solutions-homelane-new.avif`,
  `exit-intent-image-revamp.webp` — campaign creative, excluded by section 1
- `flags@2x.png` — country-flag UI sprite for the phone field, not photography
- `l4.jpg`, bing/webengage endpoints — tracking pixels, not images

HomeLane's site is built almost entirely from campaign creative and client-side
rendered UI. It is not a photography library.

**Worth noting competitively:** their Ranchi city page carries no interior
photography whatsoever. The local-proof argument this site is built on is
attacking a genuinely empty position.

## What to do when the kit arrives

1. Drop the files somewhere local.
2. For each asset, add an entry to `content/images.ts` with:
   - `source: 'homelane-licensed'`
   - `sourceUrl`, `retrievedAt`, `licenceNote` (include the agreement reference)
   - `kind: 'illustrative'` — see the hard limit below
   - `note` recording original pixel dimensions, so a higher-resolution swap stays possible
3. Self-host under `public/images/`. Never hotlink a HomeLane CDN domain: a
   hotlinked asset can be moved or hotlink-protected at any time and would break
   a live ad landing page silently.
4. Run `npm run images:provenance` to confirm the asset is tracked.

## The hard limit, enforced in code

`components/ui/SiteImage.tsx` refuses `homelane-licensed` or `stock-licensed`
sources in any slot marked `kind: 'own-work'`. It throws in development and
degrades to the placeholder in production.

Own-work slots are the portfolio cards, the before-and-after slider, the project
manager portrait, testimonial portraits and the studio. Those carry locality
captions, configurations and completion dates. A HomeLane metro photograph
behind a "Bariatu, Ranchi | 3BHK" caption is a factual misstatement on a page
carrying paid traffic, and both ad platforms review landing page claims. The
licence does not make the caption true.

This is not a preference and should not be worked around by relabelling a slot
to `illustrative` while leaving the claim in the surrounding copy. Remove the
claim, or use an own photograph.

## Reporting

```bash
npm run images:provenance   # every non-own asset, source and licence
npm run images:audit        # replacement backlog, most prominent first
```

---

## The Google Business Profile and the embedded map

Decided 16 August 2026. Recorded so this is not revisited from scratch.

The studio's Google listing is titled **"HomeLane Singh More, Interior Design
Studio"** and does not mention Shilp Sarthi at all.
Source: `https://share.google/1Lk5M7WRC9vU7gXoU`

The owner's decisions:

| Question | Decision |
| --- | --- |
| Embed the listing in "Visit us"? | **Yes, as-is.** The map therefore displays the HomeLane name on the homepage. |
| Use it for `googleBusinessProfile`? | **No.** Left empty, so it stays out of `sameAs` in the LocalBusiness schema. |
| Rename the listing? | **No.** Cannot be changed under the franchise terms. |

### Consequence to be aware of

The mark now appears in **three** places, not the two that `BRIEF.md` section 4
permits:

1. the "Authorised Partner of HomeLane" badge
2. the Contact page address block
3. **the embedded map pin on the homepage**, which Google renders, not us

Because the map renders that name whatever we do, the "Visit us" section states
the local identity in a caption beneath it. An unexplained HomeLane label sitting
under a Shilp Sarthi heading reads worse than a stated one.

Nothing else changed: the mark is still absent from every page title, meta
description, `h1`, `og:title`, alt text, filename, and from `name` and `brand` in
all structured data. `npm run build` plus the route audit in the README verifies
that.

### If the listing is ever renamed

Renaming it to include Shilp Sarthi resolves all of this. At that point:
1. update `mapsListingName` and `mapsEmbedQuery` in `config/site.ts`
2. remove the explanatory caption from `components/home/StudioVisit.tsx`
3. reconsider filling `googleBusinessProfile`, which would enable the
   "Read our Google reviews" button and consolidate local SEO
