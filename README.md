# Shilp Sarthi

Production website for Shilp Sarthi, a home interior design studio in Ranchi, Jharkhand. This site is the destination for live Google Ads and Meta Ads spend.

Built to the specification in [BRIEF.md](BRIEF.md). Read that first if you are picking this up cold: it explains *why* things are the way they are, and several decisions in here look arbitrary until you know the reasoning.

**Stack:** Next.js 16 (App Router) | React 19 | TypeScript | Tailwind CSS 3.4

> **Revision note.** The site was slimmed down after the first build at the owner's direction: white-only palette matched to the two reference sites, the instant estimator replaced by a free consultation form, the pricing page removed, and the homepage cut from thirteen sections to eight. Sections of this README that described the estimator and the rate card have been rewritten accordingly. `BRIEF.md` still describes the original specification and is now out of date in those four areas.

---

## Quick start

```bash
npm install
```

Copy the environment template and fill in the real values:

```bash
cp .env.example .env.local
```

Then run the dev server:

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

### Before you commit

```bash
npm run typecheck && npm run lint && npm run build
```

All three must be clean. They are, as of the last commit.

---

## The three things a non-developer needs

Everything below can be changed by editing one file. No developer required, and nothing needs to be hunted for in component code.

### 1. How to end the offer

Open **`config/offer.ts`** and set:

```ts
active: false,
```

That is the only change. Every offer surface disappears at once: the announcement bar, the hero eyebrow, and the timed popup.

You do not normally need to do this, because **the offer ends itself.** `endsAt` is a fixed timestamp in IST. The moment it passes, every offer surface stops rendering with no deploy required, and `/offer-terms` switches to saying the offer has closed.

Other things in that file:

| To do this | Change this |
| --- | --- |
| Change the discount | `percentage` |
| Extend or shorten the offer | `endsAt` (keep it a real date) |
| Switch between "Up to 40% off" and "Flat 40% off" | `flat` |
| Turn off just the popup, keep the rest | `popupEnabled: false` |
| Swap the popup for a gentler corner card | `popupVariant: 'corner'` |
| Link the campaign's own terms document | `franchisorTermsUrl` |

**Do not make the deadline roll forward and do not let the countdown reset on reload.** A countdown is only defensible on this site because the deadline is genuinely real. Fake urgency is also the fastest route to an ad disapproval.

### 2. How to change the one price on the site

There is exactly one figure published anywhere: **from Rs. 3.5 Lakh**, in `config/site.ts`:

```ts
pricing: { startingFromLabel: 'Rs. 3.5 Lakh', startingFromConfig: '2BHK' }
```

Nothing else quotes a number. There is no pricing page, no rate card, and no estimator. This was a deliberate decision: a figure attached to a flat nobody has measured is a guess, and publishing one invites a dispute at quotation stage.

If you ever add pricing back, put it behind the consultation rather than in front of it, and read section 4 of `/offer-terms` first, because a published "up to 40%" claim needs a stated basis.

### 3. How to change contact details, promises and feature flags

Open **`config/site.ts`**: phones, address, email, socials, opening hours, the statistics in the trust strip, and the service area.

Two flags in there deserve care:

```ts
responsePromise.enabled   // the "designer calls within 30 minutes" promise
features.hindiToggle      // Hindi option on the estimator and forms
```

Both are staffing promises. **Turn them off the moment the team cannot honour them.** A 30-minute callback promise that goes unanswered does more damage than never making it.

---

## Content

No content is hardcoded in components. Everything typed lives in `content/`:

| File | What it holds |
| --- | --- |
| `services.ts` | The five services, with timelines, inclusions and per-page SEO |
| `projects.ts` | Portfolio projects, with locality and configuration |
| `team.ts` | The project manager section |
| `payment-stages.ts` | The stage-wise payment schedule |
| `faq.ts` | The ten homepage FAQ entries, also emitted as FAQPage schema |
| `process.ts` | The five process steps, used on /process |
| `property-types.ts` | The property dropdown in every form |

### Two content gates you should know about

These exist to make it impossible to ship something misleading by accident.

**Photographs are gated.** Every image reference carries a `pending` flag. While it is true, a clearly-labelled placeholder renders instead of the photo. Drop the real file at the path shown on the placeholder, flip the flag to `false`, and the real image appears. See [ASSETS-TODO.md](ASSETS-TODO.md) for the full list of files needed, with dimensions.

The previous site captioned Unsplash stock photography as real Ranchi projects. That is a misrepresentation risk under both Google Ads and Meta ad policy, and it is the wrong way to open a trust relationship with someone about to spend Rs. 5 Lakh. Do not do it again.

**The payment schedule is gated.** `paymentSchedule.published` is `false` because the real percentages have to come from the actual customer contract. While it is false, the stepper still shows the stages and what happens at each one, and replaces the numbers with the written-schedule commitment. To publish: fill in every `percentage`, make sure they total 100, then set `published: true`. The component refuses to render percentages that do not add up.

---

## Design

### Palette

White ground, near-black text, one red for action. Everything is in `app/globals.css` as CSS custom properties, and every component references semantic token names only (`accent-600`, `ink-900`), so a change there moves the whole site.

The two values that matter, both taken from the reference sites the owner selected:

| Token | Value | Source | Contrast |
| --- | --- | --- | --- |
| `accent-600` | `#E71C24` | HomeLane's CTA red, used exactly | 4.58:1 with white text, clears AA |
| `ink-900` | `#212529` | HomeLane's body near-black | 15.4:1 on white |

Livspace's lighter `#EB595F` is **not** used behind white text: it only reaches 3.43:1 and fails AA. It survives as `accent-400` for tints and hovers.

Backgrounds are white everywhere. Sections are separated by hairline `ink-200` rules rather than alternating fills, so nothing on the page competes with the red. One amber token (`gold-500`, `#F5A623`) exists for review stars only, because red stars read as a warning.

To re-check contrast after changing any colour:

```bash
node -e "const h=s=>s.replace('#','').match(/../g).map(x=>parseInt(x,16));const l=s=>{const c=h(s).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};const cr=(a,b)=>{const[x,y]=[l(a),l(b)].sort((p,q)=>q-p);return((x+.05)/(y+.05)).toFixed(2)};console.log('white on CTA:',cr('#FFFFFF','#E71C24'));console.log('body on white:',cr('#212529','#FFFFFF'));console.log('muted on white:',cr('#666666','#FFFFFF'))"
```

Body text must clear 4.5:1 and large text 3:1. `ink-500` (`#7B7B7B`) is 4.23:1, so it is reserved for large or decorative text; `ink-600` (`#666666`) is the muted body colour at 5.74:1.

### Typography

Poppins for headings (Livspace) and Lato for body and UI (HomeLane), matched to the reference sites. Both self-hosted by `next/font` at build time, so there is no request to Google and no font-swap flash.

### Illustrations (a stopgap, not the destination)

`npm run illustrations` draws every image on the site as a flat vector interior
and rasterises it with sharp. They exist because there are no photographs of
Shilp Sarthi's work in the repo yet, and the alternatives were worse: stock
photography captioned as real Ranchi projects is what the previous site did and
is a misrepresentation risk under both ad platforms, and grey placeholder panels
make a live site look broken.

They are deliberately, obviously **illustrations**. Nobody mistakes one for a
photograph, which is the point: they carry the layout without claiming to be a
flat that was actually delivered.

They are drawn for **Indian homes specifically**, because that is what a Ranchi
homeowner needs to recognise. The CC0 photography pool was checked first and is
useless here: it returns European glass-walled villas, 1950s black-and-white
archives, and for "indian kitchen", South Indian food. So the scenes carry the
details those photos never do:

- ceiling fans, and cove lighting in a false ceiling
- vitrified tile floors, not floorboards
- a wardrobe with **loft storage** above it
- a **pooja niche** in the dining area
- an **RO water purifier**, mixer grinder and chimney in the kitchen
- casement windows behind **safety grilles**

**These are temporary.** `npm run photos` overwrites any of them the moment a
real photograph lands in `/incoming`. Delete the script once the photography is
in and nothing breaks.

### Adding photographs

Drop files into `/incoming` with a keyword in the filename, then:

```bash
npm run photos
```

The script resizes each photo, files it into `/public`, and switches the
matching placeholder off. No code editing. `incoming/README.md` lists the
keywords; `harmu-kitchen.jpg` and `studio-front.jpeg` both just work.

Photos straight off a phone are fine. Anything under about 900px wide is skipped
with a warning rather than shipped blurry.

**Until a photograph exists, `MediaFrame` renders a branded panel** rather than a
"missing image" box, so the page still looks intentional in front of a visitor.
In development the panel also prints the exact path to drop the file at; that
hint is stripped from production builds.

This is the mechanism that stops a stock photograph ever being captioned as a
real Ranchi project. While `pending` is true, no photograph renders at all.

### Work videos

`content/videos.ts` holds the homepage video gallery. Every entry is a film from
Shilp Sarthi's own YouTube channel, so this section is the one place on the site
showing genuinely original footage rather than a placeholder.

They load behind a facade: nothing downloads from YouTube until a visitor presses
play. Three raw embeds on the homepage would have cost roughly a megabyte and a
half of player before anyone asked for it.

To add another video, put its id in `content/videos.ts`, then generate the poster
frame. YouTube pillarboxes a vertical Short's thumbnail into 16:9 with a blurred
fill, so the centre strip has to be cropped back out:

```bash
ID=yourVideoId; curl -s -o /tmp/$ID.jpg "https://i.ytimg.com/vi/$ID/maxresdefault.jpg" && node -e "require('sharp')('/tmp/$ID.jpg').extract({left:437,top:0,width:405,height:720}).resize(720,1280,{fit:'cover'}).jpeg({quality:84,mozjpeg:true}).toFile('public/images/video/$ID-poster.jpg').then(()=>console.log('done'))"
```

For a landscape upload, skip the `extract` step and set `aspect: '16/9'`.

### The signature element

One memorable interaction and nothing else. It is the **before-and-after reveal slider** (`components/portfolio/BeforeAfterSlider.tsx`), a draggable divider between the empty flat and the finished room.

Chosen because transformation is literally the product, so the interaction *is* the pitch; because neither national competitor does this on their Ranchi pages; and because it is the one thing a visitor will describe to their spouse afterwards.

It is a real slider, not a mouse toy: `role="slider"` with proper ARIA values, keyboard operable with arrow keys, Home and End, and both images carry their own alt text so the content survives with no interaction at all.

Everything else stays quiet: scroll reveal on section entry, hover states on cards. No parallax. **Do not add a second signature interaction.**

---

## How the conversion path works

Primary conversion is the **free consultation form** in the hero. Then WhatsApp, then phone.

WhatsApp is treated as a first-class path, not a footer icon. In this market, mobile visitors convert on WhatsApp at a multiple of form rates.

### The consultation form

`components/home/ConsultationForm.tsx`, sitting in the hero. Three fields and a button, so the whole commitment is visible at a glance and takes under fifteen seconds. It replaced a multi-step instant estimator, which was removed along with all public pricing.

### Forms

One `LeadForm` component with five variants. Submissions go to `/api/lead`, which forwards server-side to Web3Forms.

**The access key is server-side only.** It used to sit in the page source, which meant anyone could read it and post junk straight to the endpoint. It now lives in `.env.local` as `WEB3FORMS_ACCESS_KEY` with no `NEXT_PUBLIC_` prefix, so it never reaches the browser.

Spam handling, in `lib/validation.ts`:
- a honeypot field, present in the DOM but hidden from sight and from assistive tech
- a minimum fill time, because humans do not complete three fields in 2.5 seconds
- a coarse per-IP rate limit in the API route

Both spam signals return a success-shaped `200` so a bot gets no signal to tune against, while the submission is silently dropped.

### Attribution

`lib/attribution.ts` captures UTMs, `gclid` and `fbclid` into `sessionStorage` on first load and attaches them to every submission. First touch wins. Without this, no ad platform can attribute a lead back to the click that paid for it.

---

## Tracking

Existing account IDs. **Do not create new ones.** The live Google Ads conversion action and the GA4 property both have history attached to these.

| | |
| --- | --- |
| GTM | `GTM-KXQJBHN9` |
| GA4 | `G-05HY2XK0C0` (fires through GTM) |
| Meta Pixel | `950403934685094` |

Events fired, all declared in `lib/analytics.ts`:

`generate_lead` · `click_to_call` · `click_whatsapp` · `popup_shown` · `popup_dismissed` · `popup_converted` · `offer_terms_viewed`

### ⚠️ `/thank-you`

**This path must stay exactly `/thank-you`.** The live Google Ads conversion action triggers on that URL. Renaming it, moving it, or adding a trailing slash silently stops conversion reporting: no error appears anywhere, the campaign just looks like it stopped working. `trailingSlash: false` is pinned in `next.config.mjs` for the same reason.

The page keeps `noindex`, keeps the 10-second auto-redirect, and is disallowed in `robots.ts` so organic arrivals cannot fire a paid conversion.

---

## The partner trademark rules

Shilp Sarthi is an authorised HomeLane partner and the outlet is known offline as HomeLane Singh More Ranchi. That is true and can be stated, but the site must never read as an official HomeLane property.

**Every appearance of the mark routes through `components/PartnerBadge.tsx`,** so it can be reworded or removed everywhere from one file. `SHOW_PARTNER_BADGE = false` in that file removes every instance at once.

Permitted:
- "Authorised Partner of HomeLane" as a text trust badge
- one factual paragraph on `/about` and one in the homepage partnership section
- "HomeLane Singh More Ranchi" once, in the `/contact` address block, as the studio's local identity

Never, anywhere:
- the mark in a URL, page `<title>`, meta description, `<h1>`, `og:title`, `alt` text, or structured data `name` / `brand`
- the HomeLane wordmark or logo file, unless `HOMELANE_LOGO_PERMITTED` in `config/theme.ts` is true **and** a written permission letter covering logo use is on file
- wording implying Shilp Sarthi *is* HomeLane
- the mark as an ad keyword, headline, or creative text

The footer disclaimer appears on every page.

**The public email is `info@shilpsarthi.in`,** forwarding to the existing Gmail inbox. The old `homelanesinghmoreranchi@gmail.com` address must never be displayed: it did more to make the site look like an official HomeLane property than anything else on the page.

To verify all of this after any change:

```bash
npm run build && npm start
```

then, in another terminal, check every route:

```bash
for r in / /services /services/modular-kitchen /portfolio /about /process /pricing /contact /offer-terms /privacy-policy /terms-of-service /thank-you /blog; do
  echo "=== $r"
  curl -s "http://localhost:3000$r" | grep -oE '<title>[^<]*</title>|<h1[^>]*>' | head -2
done
```

No title and no `h1` may contain the mark.

---

## Accessibility and performance

- Semantic HTML, one `<h1>` per page, visible focus states everywhere, labelled fields
- WCAG AA contrast throughout, verified with the script above
- 44px minimum touch targets on interactive controls
- `prefers-reduced-motion` respected: scroll reveal and all animation collapse to instant
- Scroll reveal is opt-in and content is visible by default, so a failed script can never leave a section invisible
- Zero layout shift from the offer bar, the hero form, or the countdown, which reserves its own width before hydrating
- Videos load behind a facade: nothing downloads until the visitor presses play
- GTM and the Meta Pixel load `afterInteractive` so neither competes with the hero for LCP

**Mobile-first.** Roughly 85% of paid traffic here is mobile on mid-range Android. Design for 360px first; desktop is the adaptation. Test at 360, 390, 768, 1280 and 1440.

### The popup

`components/offer/OfferPopup.tsx`. Google's landing page policy penalises interstitials that obscure content or are hard to dismiss, and Meta's ad review flags the same thing. A timed popup is fine; a timed popup that traps a visitor is a disapproval.

Constraints, all verified:
- 44×44 minimum close button, and it is the first tab stop, so the very first thing a keyboard user reaches is the way out
- Escape closes, backdrop click closes, focus is trapped while open and returned on close
- bottom sheet on mobile, capped at 60% of viewport height so it never covers the screen
- one appearance per session; a dismissal suppresses it for 7 days

Suppressed entirely if the visitor has already converted, is typing in a form, or the offer is inactive.

If either platform raises an interstitial issue, set `popupVariant: 'corner'` in `config/offer.ts` for a slide-in card that converts less but cannot be read as an interstitial.

---

## Deployment

Vercel is the natural target for an App Router site: `/api/lead` and the two pages that read request data need a Node runtime, so a purely static export will not work.

1. Push to a Git remote and import the repo into Vercel
2. Add all four variables from `.env.example` to the Vercel project settings
3. Set `site.url` in `config/site.ts` to the final domain, because canonicals and structured data are built from it
4. Deploy

### Before go-live

- [ ] Confirm the Google Ads conversion action still points at `/thank-you`, with no trailing slash
- [ ] Submit one real test enquiry and confirm it arrives in the inbox
- [ ] Set up the `info@shilpsarthi.in` forward to the existing Gmail **before** the site goes live
- [ ] Fill in the outstanding `TODO CONFIRM` items (see below)
- [ ] Supply the assets in [ASSETS-TODO.md](ASSETS-TODO.md) and flip the `pending` flags
- [ ] Run Lighthouse on mobile and confirm 90+, LCP under 2.5s, CLS under 0.1
- [ ] Submit `sitemap.xml` in Google Search Console

### Still outstanding

Every one of these is marked `TODO CONFIRM` in the code. Search for that string.

| What | Where |
| --- | --- |
| Real stage-wise payment percentages | `content/payment-stages.ts` |
| Project manager name, photo, direct number | `content/team.ts` |
| Real project photographs | `content/projects.ts` + `ASSETS-TODO.md` |
| Google Business Profile URL | `config/site.ts` |
| Exact studio coordinates | `config/site.ts` |
| Whether the rating and project count are current | `config/site.ts` |
| Exact offer end timestamp | `config/offer.ts` |
| The campaign's own published terms URL | `config/offer.ts` |
| Real slot count for the offer, or delete that section | `app/offer-terms/page.tsx` |
| Legal review of payment and warranty clauses | `app/terms-of-service/page.tsx` |

---

## Project layout

```
app/                     routes, App Router
  api/lead/              server-side form proxy, keeps the Web3Forms key private
  offer-terms/           offer substantiation, required by both ad platforms
  thank-you/             ⚠️ path is load-bearing for Google Ads
components/
  analytics/             GTM and Meta Pixel
  forms/                 LeadForm, five variants
  home/                  homepage sections, in brief order
  layout/                header, footer, mobile sticky bar, consent banner
  media/                 facade video loader
  offer/                 offer bar, band, popup, countdown
  portfolio/             the before-and-after reveal slider
  providers/             cross-component state the popup needs
  ui/                    buttons, sections, icons, media frame, logo
config/                  offer, site, theme  ← the files to edit
content/                 typed content, no content in components
lib/                     analytics, attribution, validation, schema
scripts/                 placeholder image generator
```

## Scripts

| | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run placeholders` | Regenerate placeholder images. Skips files that already exist, so it will never overwrite a real photograph. Pass `--force` to regenerate everything. |

---

## Copy rules

- **Never use em dashes.** Use a pipe or rewrite the sentence.
- Sentence case for headings and buttons. Active voice. A button names what happens and keeps that name through the flow.
- Indian formatting: `Rs. 3.5 Lakh`.
- Write for a Ranchi homeowner comparing this studio against two national brands and one local contractor. Specific beats clever.
- **Never name a competitor.** Assert the local advantage positively instead.
