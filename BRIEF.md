# Claude Code Build Prompt | Shilp Sarthi Website (Next.js)

Paste everything below the line into Claude Code. Keep this file in the repo root as `BRIEF.md` so it can be re-read in later sessions.

---

# PROJECT BRIEF

You are building a production website for **Shilp Sarthi**, a premium home interior design company in Ranchi, Jharkhand, India, and an authorised partner of HomeLane. This site is the destination for live Google Ads and Meta Ads spend. Build it to ship.

## 1. The competitive problem

Shilp Sarthi competes in Ranchi against **HomeLane's own corporate city page** (`homelane.com/cities/interior-designers-ranchi`) and **Livspace**. Both are well-funded national brands with polished sites.

You cannot beat them on production budget. You beat them on the three things a national brand structurally cannot do in a tier-2 city:

1. **Local proof.** Named projects in Bariatu, Harmu, Kanke, Doranda. A national city page shows stock renders from Bangalore.
2. **A real person, reachable now.** A named project manager with a photo and a direct number. National brands route you through a call centre.
3. **A physical studio you can walk into today.** 4th Floor, Royal Heights, Singh More. Livspace and HomeLane have no Ranchi experience centre a homeowner can visit on a Sunday.

Every design and copy decision should sharpen one of those three. If a section does not, cut it.

## 2. Objective and conversion model

Primary conversion: **instant estimate**, which captures the lead at the moment the number is revealed.
Secondary: **WhatsApp**, then **phone call**, then the standard site-visit form.

WhatsApp matters more than a form in this market. Ranchi homeowners on mobile convert on WhatsApp at multiples of form rates. Treat it as a first-class conversion path, not a footer icon.

## 3. Tech stack

- **Next.js (App Router)**, latest stable, TypeScript
- **Tailwind CSS**. Small custom component set, no UI library bloat
- `next/image` everywhere with explicit dimensions and `sizes`. `next/font`, self-hosted
- No jQuery, no Bootstrap. Framer Motion only in the client components that need it
- Mobile-first. Roughly 85 percent of paid traffic here is mobile on mid-range Android. Design for 360px first and treat desktop as the adaptation
- Accessibility floor: semantic HTML, visible focus states, labelled fields, WCAG AA contrast, `prefers-reduced-motion` respected
- Performance: Lighthouse mobile 90+, LCP under 2.5s, CLS under 0.1, zero layout shift from the hero form or the offer bar

## 4. CRITICAL: HomeLane trademark rules

Shilp Sarthi is an authorised HomeLane partner and its outlet is known offline as HomeLane Singh More Ranchi. That is true and can be stated, but it must be handled so the site never reads as an official HomeLane property.

**Allowed**
- "Authorised Partner of HomeLane" or "Official HomeLane Partner" as a text trust badge
- One factual paragraph on About and one in the Partnership section explaining what the partnership gives the customer: factory manufacturing, standardised quality process, warranty backing
- "HomeLane Singh More Ranchi" mentioned once, in the Contact page address block, described as the studio's local identity

**Forbidden**
- HomeLane in the domain, any URL slug, any page `<title>`, meta description, `<h1>`, or the logo
- The HomeLane wordmark or logo file anywhere, **unless written brand-usage permission is confirmed** (see below)
- Wording implying Shilp Sarthi *is* HomeLane, or HomeLane-branded package or product names
- HomeLane in `alt` text, `og:title`, or structured data `name` and `brand` fields
- HomeLane as an ad keyword, ad headline, ad description, or Meta creative text

**The email address must change.** The current public address is `homelanesinghmoreranchi@gmail.com`, displayed in the footer. That does more to make the site look like an official HomeLane property than anything else on the page. Switch the displayed address to `info@shilpsarthi.in`, forward it to the existing Gmail so no lead flow breaks.

**Footer disclaimer, every page:**

> HomeLane is a trademark of its respective owner. Shilp Sarthi is an independent authorised partner and is not the trademark owner. All enquiries submitted on this site are handled by Shilp Sarthi.

Route every appearance of the mark through a single `components/PartnerBadge.tsx` so it can be edited or removed in one file.

**Brand permission gate.** The owner is seeking written brand-usage permission from HomeLane. Build the palette as swappable Tailwind theme tokens so the site can flip between the two directions in section 10 without touching component code. Do not use HomeLane's logo, colour system, or campaign assets until permission is confirmed in writing.

## 5. The Freedom Festival offer

Shilp Sarthi is running **40% off** as an Independence Day promotion.

**Check this first.** HomeLane runs a national campaign called "Freedom Festival" and publishes its own terms PDF. If Shilp Sarthi is running the franchisor's campaign locally, use the name and mirror or link HomeLane's published terms. If this is an independent offer, rename it to **"Azadi Offer"** or **"Independence Week"** and write standalone terms. Ask the owner which it is before building the offer components.

**Build requirements**

- All offer values live in `config/offer.ts`: label, percentage, start date, end date, terms URL, and an `active` boolean. Nothing hardcoded in components
- **A real expiry date.** Not a rolling one. Not a timer that resets on reload. If the offer ends 15 August, the site must stop showing it on 16 August automatically, and the countdown must be computed from the fixed end timestamp in IST
- A countdown is acceptable here **because the deadline is genuinely real**. Show days, hours, minutes. Cap it: if more than 7 days remain, show the date instead of a ticking clock
- **`/offer-terms` page** defining the base price the discount applies against, what is included and excluded, minimum order value, number of slots, and the expiry. India's CCPA guidelines on misleading advertisements require a substantiated base price behind an "up to 40%" claim, and both ad platforms review promotional claims on the landing page. Link every instance of the offer to this page
- Phrase it as **"Up to 40% off"** unless a flat 40% applies to every order, in which case say "Flat 40% off." Do not use "up to" and then describe it as flat elsewhere
- **Retire the old 35% banner.** It has been running since 2025 labelled "limited period," which undermines the credibility of a real deadline

**Where it appears**
1. Slim top announcement bar, dismissible, sticky, with the countdown and a link to terms
2. Hero eyebrow
3. Inside the estimate result, applied to the number so the visitor sees the discounted figure
4. One mid-page offer band
5. The timed popup

Do not put it anywhere else. Five placements is already the ceiling before it reads as a discount store rather than a premium studio.

## 6. The instant estimate tool (this is the differentiator)

HomeLane sends visitors to a separate multi-step estimate flow on another URL. Livspace does the same. Every page change loses people. **Build the estimator inline on the homepage, three taps, no navigation, result in under ten seconds.**

**Flow**
1. Property type: 2BHK, 3BHK, 4BHK, Villa, Independent House, Under Construction, Other
2. Scope: Full home, Kitchen only, Kitchen and wardrobes, Living room, Custom
3. Package: Essential, Premium, Luxe (name these in Shilp Sarthi's own vocabulary, not HomeLane's)

**Result panel**
- A range, never a single figure. "Rs. 4.2 Lakh to Rs. 5.6 Lakh" reads as honest. A precise number reads as fake and creates a dispute later
- Show the pre-discount range struck through and the post-discount range prominently
- A one-line breakdown of what drives the number
- **Lead capture appears here**, framed as "Get this estimate as a detailed PDF on WhatsApp." That is a better offer than "book a visit" because the visitor already wants the artefact
- Two buttons: "Send to WhatsApp" as primary, "Book a free site visit" as secondary

**Rules**
- Rates live in `config/pricing.ts` as a per-square-foot matrix so the owner can update them without a developer
- The result must carry a visible line: "Indicative range based on typical Ranchi projects. Final quote after a free site visit."
- Fire a `estimate_completed` dataLayer event with the selections, whether or not the lead form is submitted. This tells you which configurations attract traffic even from non-converters
- The estimator must work with JavaScript-driven state only. No server round trip, no loading spinner

## 7. Payment transparency block

HomeLane publishes its stage-wise payment schedule. Livspace does not. In Ranchi the number one objection is fear of a contractor taking an advance and disappearing, so publishing your own schedule is the highest-trust thing on the page.

Build a horizontal stepper showing each stage, what happens, and the percentage due. Get the real schedule from the owner. Do not copy HomeLane's percentages, they will not match Shilp Sarthi's actual contract terms and publishing wrong numbers is worse than publishing none.

Pair it with a short line on what happens if the timeline slips.

## 8. The timed offer popup

**Trigger.** Fire on whichever comes first:
- 30 seconds of active dwell time, paused when the tab is hidden
- 55 percent scroll depth
- Exit intent on desktop, pointer leaving the viewport toward the top

**Suppress entirely if any of these are true:**
- The visitor already submitted a lead this session
- The visitor is currently focused inside any form field
- The estimator is mid-flow
- The popup has already been shown once this session
- It was dismissed in the last 7 days, tracked in `localStorage`
- The offer is inactive per `config/offer.ts`
- Viewport is under 380px and the popup cannot render without covering the whole screen, in which case degrade to a bottom sheet occupying at most 60 percent of screen height

**Construction**
- Large, obvious close button, minimum 44 by 44px. Escape key closes it. Clicking the backdrop closes it. Focus is trapped while open and returned to the trigger element on close
- On mobile render as a bottom sheet, not a centre modal. Never cover the whole viewport
- Content: the offer, the countdown, three fields only (name, phone, property type), consent line, terms link
- Fire `popup_shown`, `popup_dismissed`, and `popup_converted` dataLayer events so the popup can be judged on data rather than opinion

**Why the constraints matter.** Google's landing page policy penalises interstitials that obscure content or are hard to dismiss, and Meta's ad review flags the same. A timed popup is fine. A timed popup that traps a user is a disapproval and, on organic, a mobile interstitial penalty. Build it so it can be turned off from config in one edit if approval issues appear.

**Also build a lighter alternative** behind a config flag: a slide-in corner card instead of a modal. It converts less but never risks a policy flag. The owner should be able to A/B these.

## 9. Site architecture

```
/                                    Homepage, primary ad destination
/services
/services/full-home-interiors
/services/modular-kitchen
/services/bedroom-wardrobe
/services/living-room
/services/commercial-interiors
/portfolio
/portfolio/[slug]
/about
/process
/pricing
/contact
/blog                                Scaffold the route, leave empty for phase 2
/privacy-policy
/terms-of-service
/offer-terms
/thank-you
```

`/thank-you` must stay at exactly that path. The live Google Ads conversion action triggers on that URL. Changing it, including adding a trailing slash, silently stops conversion reporting.

## 10. Homepage structure

Order matters. This sequence front-loads the differentiators.

1. **Offer bar.** Slim, sticky, dismissible, countdown, terms link
2. **Header.** Logo, nav, phone, primary CTA. On mobile the call button stays visible at all times
3. **Hero.** Left: eyebrow with the offer, H1, subhead, four trust chips, primary and WhatsApp CTAs. Right: **the estimator**, not a contact form. The estimator is the hook, it asks for zero personal data to start, and it earns the lead by giving something first
   - H1: "Ranchi's Trusted Home Interior Design Studio." Primary keyword intact, no HomeLane
   - Under the CTAs, a response promise: "A designer calls you within 30 minutes, 10am to 8pm." Beating HomeLane's 24 hours is cheap and highly persuasive. Only ship this if the owner can actually staff it
4. **Trust strip.** Real numbers only. Google rating, projects delivered, warranty term, studio address
5. **Payment transparency stepper.** Section 7. This early placement is deliberate, it answers the biggest objection before the visitor has time to form it
6. **Services grid.** Five or six cards, each linking to its service page, each with a quote action that opens the form with the service prefilled
7. **Local proof portfolio.** Six real projects with locality and configuration captions. Header should say something like "Homes we have delivered in Ranchi" so the local advantage is explicit
8. **Meet your project manager.** A real photo, a real name, a direct number. This is the single thing neither competitor can replicate in Ranchi. Do not use a stock portrait. If no photo is available, leave a visible TODO rather than faking it
9. **Process.** Five numbered steps. Numbering is legitimate, the content genuinely is a sequence
10. **Why choose us.** Six differentiators, concrete and specific
11. **Video case study.** Anytime Fitness, Kanke Road. Muted, poster frame, click to play, lazy loaded
12. **Testimonials.** Real names, localities, Google review links where available
13. **Visit our studio.** Map, hours, parking, a photo of the actual space. National competitors have no Ranchi showroom, so say so plainly without naming them
14. **Offer band** with countdown and terms link
15. **FAQ.** Accordion, ten questions, FAQPage schema
16. **Final CTA with form**, address block, both numbers
17. **Footer.** Nav, services, contact, socials, legal, HomeLane disclaimer, dynamic copyright year
18. **Mobile sticky bar.** WhatsApp and Call. Must not overlap form submit buttons or the popup

## 11. Forms and lead capture

- One `LeadForm` component with variants: estimator-result, hero, inline, modal, popup
- Fields: name, phone (validated as a 10-digit Indian mobile), property type. Hidden: `source_page`, `form_variant`, `service_interest`, `estimate_range`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`
- Capture UTMs and click IDs into `sessionStorage` on first load and attach to every submission. Without this no platform can attribute the lead
- Keep **Web3Forms**. The live key is held in `.env.local` as `WEB3FORMS_ACCESS_KEY` and is deliberately not written down here, because this file is committed to a public repository. Submissions are proxied through a Next.js API route so the key never reaches the browser. On the previous site it sat in the page source, which meant anyone could spam the endpoint
- Honeypot field plus a minimum time-on-page check for spam
- Consent line by every submit button: "By submitting, you agree to be contacted by Shilp Sarthi by phone, SMS or WhatsApp about your enquiry." Privacy policy linked directly beneath
- On success, push `generate_lead` to `dataLayer` and route to `/thank-you`

## 12. Tracking

Existing IDs, do not create new ones:
- GTM `GTM-KXQJBHN9`
- GA4 `G-05HY2XK0C0`
- Meta Pixel `950403934685094`

- Load GTM via `next/script` with `strategy="afterInteractive"`, include the `noscript` iframe
- Events: `generate_lead`, `estimate_started`, `estimate_completed`, `click_to_call`, `click_whatsapp`, `popup_shown`, `popup_dismissed`, `popup_converted`, `offer_terms_viewed`
- Meta Pixel: `PageView` all pages, `Lead` on thank-you
- Lightweight consent banner. Not strictly mandatory in India today, but it future-proofs against DPDP Act consent rules and reads as trustworthy
- Verify the Google Ads conversion trigger still matches `/thank-you` in the account before go-live

## 13. SEO

- Unique title and meta description per page via the Metadata API. Keywords: "interior design in Ranchi", "interior designer in Ranchi", "modular kitchen Ranchi", "2BHK interior cost Ranchi", "commercial interior design Ranchi"
- You are competing for these against HomeLane's and Livspace's city pages. Their weakness is that those pages are templated and have no genuine Ranchi content. Beat them with named localities, real project detail, real pricing, and a real address
- Canonicals, Open Graph, Twitter cards, `sitemap.xml`, `robots.txt`
- **LocalBusiness schema** on the homepage: name Shilp Sarthi, address 4th Floor, Royal Heights, Beside True Value, Singh More, Ranchi, Jharkhand 834004, both phones, geo, hours, price range, `areaServed` Ranchi and Jharkhand, `sameAs` Instagram, Facebook, YouTube, and the Google Business Profile. No HomeLane in `name` or `brand`
- **FAQPage** on the homepage FAQ, **Service** on each service page, **BreadcrumbList** on nested routes
- One `h1` per page, descriptive alt text throughout

## 14. Design direction

**Two palette directions. Build both as swappable Tailwind token sets in `tailwind.config.ts`, ship whichever the owner selects.**

**Direction A, recommended, independent identity.** The existing system: Warm Linen, Deep Ink, Terracotta. Extract exact hex values from the live site. This is what the owner converged on after rejecting Cormorant Garamond, DM Serif Display, Fraunces, Lora, and a fully dark treatment, so it is a considered choice, not a default. It also differentiates: HomeLane and Livspace both sit in the same red and coral family, and matching them makes Shilp Sarthi look like a smaller copy of the brands it is trying to beat locally.

**Direction B, HomeLane-aligned.** Only if written brand permission is confirmed. Extract HomeLane's palette from their live CSS, keep Deep Ink for structure and body text so contrast and legibility hold, and use their accent for CTAs only.

**Typography, settled, do not reopen.** Playfair Display for headings, Outfit for body and UI, both self-hosted via `next/font`. Unify the legal pages onto this system, they currently use DM Serif Display on navy.

**Favicon.** Port the existing SVG data URI, navy ground with a terracotta house and gold door, to a proper `icon.svg` plus PNG fallbacks.

**Signature element.** The site currently has no memorable device. Add exactly one and keep everything else quiet. Recommended: a **before-and-after reveal** on the portfolio, a draggable slider between the empty flat and the finished room. It is the right choice because transformation is literally the product, because neither national competitor does it on their Ranchi pages, and because it is the one interaction a visitor will remember and describe to a spouse. The alternative is a materials-swatch motif carried through section dividers. Pick one, justify it, execute it well, add nothing else.

**Motion.** Restrained. Scroll reveal on section entry, hover states on cards, and the one signature interaction. No parallax. Heavy animation reads as templated and hurts LCP.

Never sacrifice estimator visibility or LCP for a flourish.

Before writing code, produce a short plan: extracted token values for both directions, the type scale, the layout concept, and which signature element you chose and why. Show it for approval.

## 15. Copy rules

- **Never use em dashes anywhere.** Use a pipe or rewrite the sentence
- Sentence case for headings and buttons. Active voice. A button names what happens and keeps that name through the flow
- Write for a Ranchi homeowner comparing Shilp Sarthi against two national brands and one local contractor. Specific beats clever
- Indian formatting: Rs. 3.5 Lakh
- **Consider a Hindi toggle.** Both national competitors are English-only. A Hindi option on the estimator and the forms is a genuine local advantage in Ranchi and cheap to add with `next-intl`. Confirm with the owner whether their team can handle Hindi enquiries before shipping it
- Never name HomeLane or Livspace as competitors on the site. Assert the local advantage positively instead

## 16. Business details

- **Studio:** 4th Floor, Royal Heights, Beside True Value, Singh More, Ranchi, Jharkhand 834004
- **Phones:** 97092 11050, 98013 49992
- **WhatsApp:** wa.me/919801349992
- **Email, new public address:** info@shilpsarthi.in, forwarding to homelanesinghmoreranchi@gmail.com
- **Social:** instagram.com/shilp_sarthi, facebook.com/ShilpSarthi, youtube.com/@ShilpSarthiArchitect
- **Services:** full home interiors, modular kitchen, bedroom and wardrobe, living room, commercial
- **Starting price:** Rs. 3.5 Lakh for a 2BHK
- **Timelines:** 30 to 45 days for a 2BHK, 45 to 60 for a 3BHK or 4BHK
- **Service area:** Ranchi primary. Hazaribagh, Jamshedpur, Dhanbad, Bokaro case by case
- **Localities for portfolio and local SEO:** Bariatu, Harmu, Lalpur, Kanke, Doranda, Ratu Road, Ashok Nagar, Morabadi, Argora, Singh More

## 17. Migrated from the existing build

- Port `privacy-policy.html` and `terms-of-service.html` copy as-is and restyle. It is written and approved. Update the "Last Updated" date and the copyright year, which still say 2025
- `/thank-you`: keep `noindex`, keep the 10-second auto-redirect, keep the conversion hooks
- `anytime-fitness-testimonial.mp4`: compress, generate a poster frame, serve muted with controls and lazy loading
- Instagram feed was planned via Behold.so. Scaffold the component behind a config flag
- YouTube embeds deferred pending uploads. Build a `VideoEmbed` component with facade loading so videos drop in later without a performance cost

## 18. Repo hygiene

- `.env.local` for keys and IDs, commit `.env.example` with placeholders
- `config/site.ts` for phones, address, socials, response-time promise
- `config/offer.ts` for the offer, and `config/pricing.ts` for the estimator matrix. A non-developer must be able to end the offer or change rates by editing one file
- `content/` with typed data for services, projects, testimonials, FAQ, payment stages. No content hardcoded in components
- README covering local setup, deploy, "how to end the offer," and "how to update pricing"
- `npm run build` clean, zero type and lint errors, before declaring done
- Test at 360, 390, 768, 1280, 1440

## 19. Confirm before building

1. Is "Freedom Festival" HomeLane's campaign that Shilp Sarthi is running locally, or an independent offer? This decides the name and whose terms apply
2. Exact offer end date and time, and what the 40% is calculated against
3. Has HomeLane given written brand-usage permission? Decides palette Direction A or B, and logo usage
4. The real stage-wise payment schedule
5. Real project photographs, with locality and configuration for each. The current site uses Unsplash stock captioned as real Ranchi projects, which is a misrepresentation risk under both ad platforms and a trust problem
6. Project manager name, photo, and direct number for section 10.8
7. Can the team actually honour a 30-minute callback promise between 10am and 8pm?
8. Per-square-foot rates for the three estimator packages
9. Are the Google rating and project count figures current?
10. Which testimonials have documented client consent
11. Google Business Profile URL for schema and review links
12. Can the team handle Hindi enquiries, for the language toggle
13. Deployment target, and whether hosting moves off cPanel
