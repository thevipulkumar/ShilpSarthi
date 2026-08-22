/**
 * Lead delivery via Formspree.
 *
 * Formspree has two kinds of form, and they use different endpoints. The
 * library's own source is the authority on this:
 *
 *   this.project ? `${base}/p/${project}/f/${formKey}` : `${base}/f/${hashid}`
 *
 * A form created in the dashboard gets a hashid. A form defined in
 * formspree.json and pushed with the CLI belongs to a PROJECT, and is addressed
 * by project id plus the form key from that file. Project forms have no hashid
 * at all, which is why looking for one leads nowhere.
 *
 * Verified against the live API before this was written: posting to a project
 * endpoint from a server returns a normal JSON response, and an unknown form key
 * gives FORM_NOT_FOUND while an unknown project gives PROJECT_NOT_FOUND. Server
 * side submission is therefore supported, unlike Web3Forms, whose free plan
 * refuses it outright.
 *
 * `Accept: application/json` matters. Without it Formspree answers with a
 * redirect to its own thank-you page rather than a JSON body, which from a
 * server is useless and hard to interpret.
 */

const BASE = 'https://formspree.io';

/**
 * Resolves whichever of the two styles is configured. A full URL wins, then a
 * project plus form key, then a bare hashid.
 */
function endpointFromEnv(): string | undefined {
  const project = process.env.FORMSPREE_PROJECT_ID?.trim();
  const formKey = process.env.FORMSPREE_FORM_KEY?.trim();
  const legacy = process.env.FORMSPREE_FORM_ID?.trim();

  if (legacy?.startsWith('http')) return legacy;
  if (project && formKey) return `${BASE}/p/${project}/f/${formKey}`;
  if (legacy) return `${BASE}/f/${legacy}`;
  return undefined;
}

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
