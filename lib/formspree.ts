/**
 * Lead delivery via Formspree.
 *
 * Formspree submissions go to a per-form endpoint built from that form's
 * hashid, which is shown on the form's own page in the dashboard:
 *
 *   https://formspree.io/f/<hashid>
 *
 * A project id and deploy key are NOT this. Those belong to the Formspree CLI,
 * which deploys a formspree.json config to a project, and are no use for
 * submitting a lead.
 *
 * `Accept: application/json` matters. Without it Formspree answers a submission
 * with a redirect to its own thank-you page rather than a JSON body, which from
 * a server is useless and hard to interpret.
 */

const endpointFromEnv = (): string | undefined => {
  const raw = process.env.FORMSPREE_FORM_ID?.trim();
  if (!raw) return undefined;
  // Accept either a bare hashid or a full URL, so a pasted endpoint also works.
  return raw.startsWith('http') ? raw : `https://formspree.io/f/${raw}`;
};

export function formspreeIsConfigured(): boolean {
  return Boolean(endpointFromEnv());
}

export type FormspreeResult =
  | { ok: true }
  | { ok: false; status: number; detail: string; quotaExceeded: boolean };

export async function submitToFormspree(
  subject: string,
  fields: Record<string, string>,
): Promise<FormspreeResult> {
  const endpoint = endpointFromEnv();
  if (!endpoint) return { ok: false, status: 0, detail: 'not configured', quotaExceeded: false };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: subject, ...fields }),
    signal: AbortSignal.timeout(12_000),
  });

  if (res.ok) return { ok: true };

  const detail = await res.text().catch(() => '');

  /*
   * The free plan caps monthly submissions. Worth naming separately in the log,
   * because it is the one failure that arrives without warning on a working
   * integration, and the fix is a plan change rather than anything in the code.
   * SMTP picks the lead up either way.
   */
  const quotaExceeded =
    res.status === 429 || /limit|quota|exceeded|upgrade/i.test(detail);

  return { ok: false, status: res.status, detail: detail.slice(0, 300), quotaExceeded };
}
