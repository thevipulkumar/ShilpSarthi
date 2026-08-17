import type { Metadata } from 'next';
import { faqs } from '@/content/faq';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { PaymentStepper } from '@/components/home/PaymentStepper';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { LocalProof } from '@/components/home/LocalProof';
import { WorkVideos } from '@/components/home/WorkVideos';
import { ProjectManager } from '@/components/home/ProjectManager';
import { StudioVisit } from '@/components/home/StudioVisit';
import { Faq } from '@/components/home/Faq';
import { FinalCta } from '@/components/home/FinalCta';
import { faqSchema, localBusinessSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Interior Design in Ranchi | Shilp Sarthi',
  description:
    'Interior designers in Ranchi. Full home interiors from Rs. 3.5 Lakh for a 2BHK, modular kitchens, wardrobes and commercial fit-outs. Book a free consultation.',
  alternates: { canonical: '/' },
  keywords: [
    'interior design in Ranchi',
    'interior designer in Ranchi',
    'modular kitchen Ranchi',
    'commercial interior design Ranchi',
    'home interiors Ranchi',
  ],
};

/**
 * Homepage.
 *
 * Cut from thirteen content sections to nine at the owner's direction. What
 * came out and where it went instead:
 *
 *   Process, five steps      -> lives on /process, linked from the nav
 *   Why choose us, six cards -> the three that mattered are now the trust strip
 *   Video case study         -> replaced by the video gallery after the
 *                               portfolio, using the studio's own YouTube films
 *   Testimonials             -> nothing was consent-cleared, so it showed a
 *                               fallback card and earned no attention
 *   Mid-page offer band      -> the offer already has the bar, the hero and the
 *                               popup; a fourth placement was noise
 *
 * Section sequence is set by the owner. It currently runs:
 *
 *   Hero                 who we are, and the consultation form
 *   Trust strip          proof at a glance
 *   On video             the work moving, in our own footage
 *   Local proof          the work standing still, delivered here
 *   What we do           the five services, and the links into their pages
 *   Payment transparency that money is staged against delivery
 *   Your point of contact who you will actually deal with
 *   Visit us             where to find the studio
 *   FAQ                  the remaining objections
 *   Get started          the enquiry form
 *
 * Evidence first, then scope, then money: a visitor arriving cold from an advert
 * sees real completed work before being asked to read anything about price or
 * process. The two proof sections are adjacent on purpose, video then stills, so
 * the footage and the photographs reinforce each other instead of being split by
 * the services grid.
 *
 * Reordering is safe on tone: since the palette went white, Section's `linen` and
 * `white` resolve to the same fill and every section is divided by a hairline
 * rule, so no two neighbours can collide.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <Hero />
      <TrustStrip />
      <WorkVideos />
      <LocalProof />
      <ServicesGrid />
      <PaymentStepper />
      <ProjectManager />
      <StudioVisit />
      <Faq items={faqs} />
      <FinalCta sourcePage="/" />
    </>
  );
}
