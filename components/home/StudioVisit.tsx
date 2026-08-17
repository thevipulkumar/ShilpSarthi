import { formattedAddress, site } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/Section';
import { SiteImage } from '@/components/ui/SiteImage';
import { getImage } from '@/content/images';
import { ButtonLink } from '@/components/ui/Button';
import { PhoneIcon } from '@/components/ui/Icons';

/**
 * Visit our studio.
 *
 * The point of this section is that there is a room in this city you can stand
 * in on a Sunday. Say that plainly, and never by naming a competitor who lacks
 * one. BRIEF.md section 15.
 */
export function StudioVisit() {
  /*
   * Show the real studio photograph the moment it exists. Until then fall back to
   * an interim shot of the kind of work on display, captioned so it never claims
   * to be this room. Section 3 of the asset brief is explicit that presenting
   * another company's showroom as your own is the worst item on the list, and a
   * visitor who walks into Royal Heights expecting the pictured room is exactly
   * the trust failure the rebuild exists to fix.
   */
  const hasOwnStudioPhoto = getImage('studio.interior')?.source === 'own';

  const mapSrc = `https://www.google.com/maps?q=${site.studio.mapsEmbedQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.studio.mapsEmbedQuery}`;

  return (
    <Section id="studio" tone="white">
      <SectionHeading
        eyebrow="Visit us"
        title="There is a room in Ranchi where you can open the drawers"
        intro="Renders are easy to make look good. Hardware is not. Come and work the soft-close on a drawer, feel the difference between a laminate and an acrylic shutter, and see a carcass edge up close before you commit to anything."
      />

      <div className="mt-9 grid gap-6 lg:grid-cols-2">
        <div>
          <SiteImage
            id={hasOwnStudioPhoto ? 'studio.interior' : 'studio.interim'}
            ratio="4/3"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          {!hasOwnStudioPhoto ? (
            <p className="mt-3 text-caption text-ink-500">
              Finishes and cabinetry of the kind you can see and handle at the studio. Photographs of
              the studio itself are on the way.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink-200 lg:aspect-auto lg:flex-1">
            <iframe
              src={mapSrc}
              title={`Map to the ${site.name} studio at Singh More, Ranchi`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          {/*
            The pin carries the listing's own name. Naming it here turns a
            confusing label into a clear one. See config/site.ts for the reasoning.
          */}
          <p className="mt-3 text-caption text-ink-500">
            Our outlet is listed on Google as {site.studio.localIdentity}. Either name will get you
            to the same 4th floor studio.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-body font-semibold text-ink-900">Address</h3>
          <address className="mt-1.5 not-italic text-body-sm leading-relaxed text-ink-600">
            {formattedAddress}
          </address>
        </div>

        <div>
          <h3 className="text-body font-semibold text-ink-900">Opening hours</h3>
          <ul className="mt-1.5 space-y-0.5 text-body-sm text-ink-600">
            {site.studio.hours.map((h) => (
              <li key={h.days}>
                {h.days}
                <br />
                {h.open} to {h.close}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-body font-semibold text-ink-900">Parking</h3>
          <p className="mt-1.5 text-body-sm leading-relaxed text-ink-600">{site.studio.parking}</p>
        </div>

        <div>
          <h3 className="text-body font-semibold text-ink-900">Before you come</h3>
          <p className="mt-1.5 text-body-sm leading-relaxed text-ink-600">
            Bring your floor plan if you have one. If not, bring the flat&rsquo;s carpet area and we
            will work from that.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={directionsUrl} size="lg">
          Get directions
        </ButtonLink>
        <ButtonLink href={`tel:${site.phones.primary.tel}`} variant="secondary" size="lg">
          <PhoneIcon />
          Call before you visit
        </ButtonLink>
      </div>
    </Section>
  );
}
