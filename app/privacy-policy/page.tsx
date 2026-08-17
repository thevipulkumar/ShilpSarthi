import type { Metadata } from 'next';
import { formattedAddress, site } from '@/config/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Shilp Sarthi collects, uses and protects the personal information you submit through this website.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

/**
 * Ported from the previous build's privacy-policy.html and restyled onto the
 * site's type system. The substance is unchanged because it was already written
 * and approved. The "Last updated" date and the copyright year, which both still
 * said 2025, are corrected.
 *
 * TODO before go-live: have the owner confirm the retention period in section 5
 * and the grievance officer name in section 10, both of which were unspecified in
 * the original copy.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect when you enquire, why we collect it, and what we will never do with it."
      lastUpdated="11 August 2026"
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Privacy policy', href: '/privacy-policy' },
      ]}
    >
      <h2>1. Who we are</h2>
      <p>
        {site.legalName} is an interior design studio operating from {formattedAddress}. This policy
        covers this website and any enquiry you send us through it. Every enquiry submitted here is
        handled by our own team in Ranchi.
      </p>
      <p>
        For any question about this policy, contact us at{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
        {site.phones.primary.display}.
      </p>

      <h2>2. What we collect</h2>
      <p>When you submit a form on this site, we collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your mobile number</li>
        <li>Your property type, and any message you choose to write</li>
      </ul>
      <p>
        We also record technical information that arrives with your visit: the page you landed on,
        the website or advert that referred you, and campaign parameters such as{' '}
        <code>utm_source</code>, <code>gclid</code> and <code>fbclid</code>. This tells us which
        advertising is worth paying for. It does not identify you personally.
      </p>
      <p>
        We do not ask for and do not want your address, date of birth, government identity numbers,
        bank details or card details. Never send those through this website. We will never ask you
        for a payment through a form on this site.
      </p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To call or message you back about the enquiry you sent</li>
        <li>To prepare a design proposal, estimate or quotation for you</li>
        <li>To arrange and follow up a site visit</li>
        <li>To measure which pages and adverts bring people to the studio</li>
      </ul>
      <p>
        We do not sell your information. We do not rent it, trade it, or pass it to any other
        interior design business.
      </p>

      <h2>4. How you are contacted</h2>
      <p>
        By submitting a form, you agree to be contacted by {site.name} by phone, SMS or WhatsApp
        about your enquiry. If you would rather we stopped, tell whoever calls you, or email{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>, and we will stop. You do not need to give
        a reason.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep enquiry details for as long as we are in conversation with you, and afterwards for as
        long as we may need them to honour a warranty on work we have delivered. If you ask us to
        delete your details and there is no live project or warranty obligation, we will delete them.
      </p>

      <h2>6. Who else processes it</h2>
      <p>Your submission passes through a small number of service providers:</p>
      <ul>
        <li>
          <strong>Our form provider</strong> delivers the contents of your enquiry to our inbox.
        </li>
        <li>
          <strong>Google Analytics and Google Tag Manager</strong> give us aggregate statistics about
          how the site is used.
        </li>
        <li>
          <strong>Meta Pixel</strong> tells us whether an advert on Facebook or Instagram led to an
          enquiry.
        </li>
        <li>
          <strong>WhatsApp</strong>, if you choose to message us there rather than use a form.
        </li>
      </ul>
      <p>
        These providers process data on their own terms. We share the minimum each one needs and
        nothing more.
      </p>

      <h2>7. Cookies and measurement</h2>
      <p>
        This site uses cookies to measure traffic and advertising performance. You are asked on your
        first visit whether to allow them, and you can decline the non-essential ones without losing
        any functionality. Nothing on this site requires you to accept advertising cookies in order
        to enquire or to read any page.
      </p>

      <h2>8. Your rights</h2>
      <p>You can ask us at any time to:</p>
      <ul>
        <li>Tell you what information we hold about you</li>
        <li>Correct anything that is wrong</li>
        <li>Delete your information, where we have no obligation to keep it</li>
        <li>Stop contacting you</li>
      </ul>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a
        reasonable period. There is no charge for any of this.
      </p>

      <h2>9. Security</h2>
      <p>
        This site is served over HTTPS. Form submissions are transmitted to our provider over an
        encrypted connection and our access credentials are held on the server, never in the pages
        you download. No website can promise perfect security, but we do not store your enquiry
        details in this website itself.
      </p>

      <h2>10. Children</h2>
      <p>
        This site is intended for adults enquiring about interior design work. We do not knowingly
        collect information from anyone under 18.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        If we change this policy we will update the date at the top of this page. Material changes
        will be described here rather than made quietly.
      </p>

      <h2>12. Contact and grievances</h2>
      <p>
        Write to {site.legalName} at {formattedAddress}, email{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>, or call{' '}
        {site.phones.primary.display} or {site.phones.secondary.display}. If you are not satisfied
        with how we have handled a privacy concern, tell us so directly and we will escalate it
        within our own team rather than leave it with the person you first spoke to.
      </p>
    </LegalPage>
  );
}
