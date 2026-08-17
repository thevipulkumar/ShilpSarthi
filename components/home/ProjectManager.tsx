import { projectManager } from '@/content/team';
import { site, whatsappLink } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { SiteImage } from '@/components/ui/SiteImage';
import { ButtonLink } from '@/components/ui/Button';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';

/**
 * Meet your project manager.
 *
 * The single thing on this site neither national competitor can replicate in
 * Ranchi: a named person with a face and a number that reaches them.
 *
 * If the photo has not been supplied, MediaFrame shows a labelled placeholder
 * rather than a stock portrait. A stock face here would poison the credibility
 * of every true claim on the page.
 */
export function ProjectManager() {
  const namePending = projectManager.name.startsWith('TODO');

  return (
    <Section id="project-manager" tone="linen">
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <SiteImage
          id="team.project-manager"
          pending={projectManager.photoPending}
          pendingLabel="Real portrait required. Never a stock or generated face."
          ratio="1/1"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 380px"
          className="w-full max-w-sm"
        />

        <div>
          <p className="eyebrow text-accent-600">Your point of contact</p>
          <h2 className="mt-2 text-display-md">
            One named person, on a number that reaches him
          </h2>

          <blockquote className="mt-5 border-l-2 border-accent-400 pl-5">
            <p className="text-body-lg italic leading-relaxed text-ink-700">
              &ldquo;{projectManager.quote}&rdquo;
            </p>
            <footer className="mt-3 text-body-sm">
              <span className={namePending ? 'font-semibold text-accent-700' : 'font-semibold text-ink-900'}>
                {projectManager.name}
              </span>
              <span className="text-ink-600">
                {' '}
                | {projectManager.role} | {projectManager.experience}
              </span>
            </footer>
          </blockquote>

          <p className="mt-5 max-w-prose text-body text-ink-600">
            Not a call centre, not a ticket number, and not a different person each time you ring.
            He answers for the work on your flat from measurement through to the day you get your
            keys back.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`tel:${projectManager.phoneTel}`} size="lg">
              <PhoneIcon />
              Call {projectManager.phoneDisplay}
            </ButtonLink>
            <ButtonLink
              href={whatsappLink('Hi, I would like to speak to the project manager about my flat in Ranchi.')}
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon />
              WhatsApp instead
            </ButtonLink>
          </div>

          <p className="mt-3 text-caption text-ink-500">
            Second line: {site.phones.secondary.display}. Studio hours are{' '}
            {site.studio.hours[0].days.toLowerCase()}, {site.studio.hours[0].open} to{' '}
            {site.studio.hours[0].close}.
          </p>
        </div>
      </div>
    </Section>
  );
}
