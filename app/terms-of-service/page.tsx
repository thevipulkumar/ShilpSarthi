import type { Metadata } from 'next';
import Link from 'next/link';
import { formattedAddress, site } from '@/config/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply to using the Shilp Sarthi website, our estimates and quotations, and interior design work we carry out in Ranchi.',
  alternates: { canonical: '/terms-of-service' },
  robots: { index: true, follow: true },
};

/**
 * Ported from the previous build's terms-of-service.html and restyled onto the
 * site's type system. Substance unchanged; the stale 2025 date is corrected.
 *
 * TODO before go-live: have the owner or their lawyer confirm sections 6 and 9,
 * which describe payment and warranty terms that must match the actual customer
 * contract. Nothing here should promise something the contract does not.
 */
export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of service"
      intro="What this website is, what an estimate on it means, and what governs work we carry out for you."
      lastUpdated="11 August 2026"
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Terms of service', href: '/terms-of-service' },
      ]}
    >
      <h2>1. About these terms</h2>
      <p>
        These terms apply to your use of this website, operated by {site.legalName} of{' '}
        {formattedAddress}. By using the site you accept them. Work we carry out for you is governed
        by the separate written contract you sign before the project starts, and where that contract
        differs from anything on this website, the contract applies.
      </p>

      <h2>2. What this website is</h2>
      <p>
        This site describes our services, publishes our prices, and lets you send us an enquiry.
        Nothing on it is an offer capable of acceptance, and submitting a form does not create a
        contract between us.
      </p>

      <h2>3. Estimates and prices on this site</h2>
      <p>
        Any indicative figure we give you before a site visit, including the &ldquo;from&rdquo;
        price shown on this website, is a starting point and not a quotation. A binding price comes
        only from a written quotation issued after we have visited and measured your property.
      </p>

      <h2>4. Promotional offers</h2>
      <p>
        Any promotion advertised on this site is subject to its own published terms. Those terms
        state what the discount applies against, what is excluded, the minimum order value and the
        expiry. See the <Link href="/offer-terms">offer terms page</Link>. Promotions cannot be
        combined with each other and cannot be applied to a contract already signed.
      </p>

      <h2>5. Enquiries and contact</h2>
      <p>
        When you submit an enquiry you agree to be contacted about it by phone, SMS or WhatsApp. Our
        stated callback time is a commitment we make in good faith during our published hours, not a
        contractual guarantee. Tell us to stop at any point and we will.
      </p>

      <h2>6. Payment</h2>
      <p>
        Payment is staged against work delivered. The full stage-wise schedule, with the exact
        percentage due at each stage, is given to you in writing before any work begins and before
        any money changes hands. We do not take payment through this website, and we will never ask
        you for card or bank details through a form on this site.
      </p>
      <p>
        Anything not listed in your quotation is not included in its price. Civil work, plumbing
        relocation, appliances, soft furnishings and statutory approvals are quoted separately where
        your project needs them.
      </p>

      <h2>7. Timelines</h2>
      <p>
        The timelines published on this site are the ones we work to and the ones we put into
        contracts. Your committed handover date is written into your contract. Delays caused by
        access to the property, changes you request after design sign-off, or matters outside our
        reasonable control move that date, and we will tell you in writing when they do.
      </p>

      <h2>8. Design and intellectual property</h2>
      <p>
        The text, photographs, drawings and 3D visuals on this site belong to {site.legalName} or to
        the people who licensed them to us. Do not reproduce them without permission. Designs we
        prepare for you remain ours until your project is paid for in full, after which you may use
        them freely for your own property.
      </p>
      <p>
        We photograph completed work and may use those photographs in our portfolio. We ask you
        before we do, and if you would rather we did not, we will not.
      </p>

      <h2>9. Warranty</h2>
      <p>
        Modular units carry a {site.stats.warrantyYears} year warranty. Hardware carries the
        manufacturer&rsquo;s own warranty, which we hand over in writing with your project file. The
        warranty covers manufacturing and installation defects. It does not cover damage from misuse,
        water ingress from a source outside our work, alterations by another contractor, or normal
        wear. Your written warranty document is the full statement of what is covered.
      </p>

      <h2>10. Limits on our liability</h2>
      <p>
        We are responsible for our own work and we will put right what we get wrong. We are not
        liable for losses that were not reasonably foreseeable, and our liability in connection with
        a project is limited to the value of the contract for that project. Nothing in these terms
        limits any liability that cannot lawfully be limited.
      </p>

      <h2>11. Third party links and content</h2>
      <p>
        This site links to external services including Google Maps, WhatsApp and our social media
        profiles. We do not control those services and are not responsible for their content or
        their terms.
      </p>

      <h2>12. Trademarks</h2>
      <p>
        Trademarks referred to on this site belong to their respective owners. Where we describe a
        partnership, we are an independent authorised partner and not the trademark owner. All
        enquiries submitted on this site are handled by {site.legalName}.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts at Ranchi, Jharkhand have
        jurisdiction over any dispute arising from them.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows when they last changed. The
        terms in force when you signed your contract are the ones that apply to your project.
      </p>

      <h2>15. Contact</h2>
      <p>
        {site.legalName}, {formattedAddress}. Email{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phones.primary.display} or{' '}
        {site.phones.secondary.display}.
      </p>
    </LegalPage>
  );
}
