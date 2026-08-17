/**
 * Lead delivery over SMTP.
 *
 * Replaces the Web3Forms call, which could never have worked from a server: the
 * free plan permits client-side submissions only and answers a server-side POST
 * with "This method is not allowed. Use our API in client side or contact
 * support with server IP address (Pro plan is required)". Proxying the key
 * server-side, which is the whole reason app/api/lead/route.ts exists, is
 * incompatible with that plan by design.
 *
 * Sending over SMTP from a mailbox on the studio's own domain removes the third
 * party entirely. Nothing can rate limit it, challenge it or change its terms.
 *
 * Configuration, all via environment:
 *   SMTP_HOST       e.g. smtp.hostinger.com
 *   SMTP_PORT       465 for implicit TLS, 587 for STARTTLS
 *   SMTP_USER       the full mailbox address, which is also the From
 *   SMTP_PASS       that mailbox's password
 *   LEAD_TO_EMAIL   where enquiries land
 */
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT) || 465;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.LEAD_TO_EMAIL;

/** True only when every value needed to send is present. */
export function mailIsConfigured(): boolean {
  return Boolean(host && user && pass && to);
}

/*
 * Created once and reused. Nodemailer pools connections, so a burst of leads
 * does not open a new TLS handshake each time.
 */
let transport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (!transport) {
    transport = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS. Anything else negotiates STARTTLS instead.
      secure: port === 465,
      auth: { user, pass },
      pool: true,
      maxConnections: 2,
      /*
       * Bounded so a silent SMTP server cannot hold the request open. The route
       * would otherwise sit there while the visitor stares at a spinner, and on
       * a lead form that is worse than failing fast with the phone number.
       */
      connectionTimeout: 10_000,
      greetingTimeout: 8_000,
      socketTimeout: 15_000,
    });
  }
  return transport;
}

/** One row of the enquiry, in the order the reader should see it. */
export type MailField = { label: string; value: string };

export async function sendLeadEmail(subject: string, fields: MailField[]): Promise<void> {
  const rows = fields.filter((f) => f.value && f.value.trim() !== '');

  const text = rows.map((f) => `${f.label}: ${f.value}`).join('\n');

  const html = `<table style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">
${rows
  .map(
    (f) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${escapeHtml(f.label)}</td>` +
      `<td style="padding:6px 0"><strong>${escapeHtml(f.value)}</strong></td></tr>`,
  )
  .join('\n')}
</table>`;

  await getTransport().sendMail({
    // Must be the authenticated mailbox: most providers reject a mismatched From.
    from: `"Shilp Sarthi website" <${user}>`,
    to,
    subject,
    text,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
