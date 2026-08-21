/**
 * Verifies SMTP credentials without going anywhere near the website.
 *
 *   npm run smtp:test              check the login only
 *   npm run smtp:test -- --send    also send one real test email
 *
 * Reads SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and LEAD_TO_EMAIL from the
 * environment or .env.local. The password is never printed.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

const ROOT = join(import.meta.dirname, '..');

/* Load .env.local without adding a dependency just for this. */
try {
  for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {
  /* fine: the values may come from the real environment instead */
}

const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass, LEAD_TO_EMAIL: to } = process.env;
const port = Number(process.env.SMTP_PORT) || 465;

const missing = Object.entries({ SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass, LEAD_TO_EMAIL: to })
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  console.error(`\n  Missing: ${missing.join(', ')}\n  Set them in .env.local or the environment.\n`);
  process.exit(1);
}

console.log('\n  host      ' + host);
console.log('  port      ' + port + (port === 465 ? '  (implicit TLS)' : '  (STARTTLS)'));
console.log('  user      ' + user);
console.log('  password  ' + '*'.repeat(8) + `  (${pass.length} characters)`);
console.log('  deliver   ' + to + '\n');

const transport = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  connectionTimeout: 12_000,
  greetingTimeout: 10_000,
});

/**
 * Turns nodemailer's terse errors into the thing you actually need to change.
 *
 * Note that nodemailer reports a refused connection as ESOCKET with ECONNREFUSED
 * only in the message, never as code ECONNREFUSED, so the message has to be
 * inspected rather than the code alone.
 */
function explain(err) {
  const code = err.code || '';
  const msg = String(err.message || '');

  if (code === 'EAUTH' || /\b535\b|authentication failed|username and password/i.test(msg))
    return 'The username or password was rejected.\n' +
           '   SMTP_USER must be the FULL email address, not just the part before the @.\n' +
           '   If this is Gmail, a normal password will never work: you need a 16 character\n' +
           '   App Password, which requires 2 step verification to be switched on first.';

  if (/ECONNREFUSED/.test(msg))
    return 'Nothing is listening on that host and port.\n' +
           '   Check SMTP_HOST for a typo, and try port 587 if 465 was refused.';

  if (/ENOTFOUND|EAI_AGAIN|getaddrinfo/i.test(msg))
    return 'That hostname does not resolve. Check SMTP_HOST for a typo.';

  if (/wrong version number|SSL routines|ERR_SSL/i.test(msg))
    return 'The TLS mode does not match the port.\n' +
           '   Use port 465 for implicit TLS, or port 587 for STARTTLS. Swap and retry.';

  if (code === 'ETIMEDOUT' || /timeout|greeting never received/i.test(msg))
    return 'The connection timed out.\n' +
           '   Usually the wrong port for the TLS mode: 465 is implicit TLS, 587 is STARTTLS.\n' +
           '   Some networks and hosts also block outbound SMTP entirely.';

  return `${msg}${code ? `  (code ${code})` : ''}`;
}

try {
  await transport.verify();
  console.log('  Login accepted. The mailbox can send.\n');
} catch (err) {
  console.error('  Login FAILED.\n');
  console.error('   ' + explain(err) + '\n');
  process.exit(1);
}

if (process.argv.includes('--send')) {
  const info = await transport.sendMail({
    from: `"Shilp Sarthi website" <${user}>`,
    to,
    subject: 'SMTP test from the Shilp Sarthi website',
    text: 'If you are reading this, lead delivery works. Nothing else to do.',
  });
  console.log(`  Test email sent to ${to}`);
  console.log(`  message id ${info.messageId}\n  Check the inbox, and the spam folder.\n`);
} else {
  console.log('  Re-run with --send to deliver a real test email.\n');
}

transport.close();
