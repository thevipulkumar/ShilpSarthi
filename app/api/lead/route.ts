import { NextResponse } from 'next/server';
import { formattedAddress, site } from '@/config/site';
import { validateLead, type LeadPayload } from '@/lib/validation';

/**
 * Lead submission proxy.
 *
 * The Web3Forms access key used to sit in the page source, which meant anyone
 * could read it and post junk straight to the endpoint. It now lives in
 * .env.local and never reaches the browser: the client posts here, and this
 * route forwards server-side.
 *
 * Spam handling: a honeypot field and a minimum fill time are checked in
 * lib/validation.ts. Both return a 200 with a success-shaped body so a bot gets
 * no signal to tune against, while the submission is silently dropped.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Coarse in-memory rate limit, per instance. Blunts a burst from one address. */
const recentSubmissions = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (recentSubmissions.size > 500) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= WINDOW_MS)) recentSubmissions.delete(key);
    }
  }

  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not set. Lead was not forwarded.');
    return NextResponse.json(
      { error: `Our form is temporarily unavailable. Please call ${site.phones.primary.display}.` },
      { status: 500 },
    );
  }

  let payload: Partial<LeadPayload>;
  try {
    payload = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const result = validateLead(payload);

  if (!result.ok) {
    // Spam signals get a success-shaped 200 so the bot learns nothing.
    if (result.error === 'spam') return NextResponse.json({ success: true });
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  /*
   * Rate limited only after validation passes, and deliberately so.
   *
   * This used to run first, which meant every rejected attempt burned one of
   * the five slots. Someone mistyping their mobile number a few times, which is
   * completely normal on a phone, got five tries and was then locked out of the
   * only enquiry route on a site paid traffic lands on. The thing worth limiting
   * is the upstream forward, not a person correcting a typo, and an invalid
   * payload costs nothing because it never reaches Web3Forms.
   */
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again in a minute.' },
      { status: 429 },
    );
  }

  const subject = payload.estimate_range
    ? `Estimate lead: ${payload.name} | ${payload.propertyType || 'property not specified'}`
    : `Website lead: ${payload.name} | ${payload.form_variant}`;

  const body = {
    access_key: accessKey,
    subject,
    from_name: `${site.name} website`,
    // Explicit field list. Web3Forms emails every key, so the order here is the
    // order the person reading the email sees.
    Name: payload.name,
    Phone: `+91 ${payload.phone}`,
    WhatsApp: `https://wa.me/91${payload.phone}`,
    'Property type': payload.propertyType || 'Not specified',
    'Estimate shown': payload.estimate_range || 'Not from estimator',
    'Service interest': payload.service_interest || 'Not specified',
    Message: payload.message || 'None',
    'Form variant': payload.form_variant,
    'Source page': payload.source_page,
    'Landing page': payload.landing_page || 'Direct',
    Referrer: payload.referrer || 'Direct',
    'UTM source': payload.utm_source || '',
    'UTM medium': payload.utm_medium || '',
    'UTM campaign': payload.utm_campaign || '',
    'UTM term': payload.utm_term || '',
    'UTM content': payload.utm_content || '',
    gclid: payload.gclid || '',
    fbclid: payload.fbclid || '',
    'Studio address': formattedAddress,
  };

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12_000),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      console.error('Web3Forms rejected the submission', upstream.status, text);
      return NextResponse.json(
        {
          error: `We could not send that. Please WhatsApp or call ${site.phones.primary.display}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead forwarding failed', err);
    return NextResponse.json(
      { error: `We could not send that. Please WhatsApp or call ${site.phones.primary.display}.` },
      { status: 502 },
    );
  }
}
