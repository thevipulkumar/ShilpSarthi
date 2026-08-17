/**
 * Production startup file.
 *
 * Hostinger's Node.js hosting (and any other Passenger-based host) starts an
 * application by running a file, not by running `npm start`. Its setup screen
 * asks for an "application startup file"; point it at this one.
 *
 * `npm start` still works and still runs `next start`, so nothing here replaces
 * that. This exists only for hosts that need a file to execute.
 *
 * Two things matter for it to work under Passenger:
 *
 *   1. The port must come from the environment. Passenger allocates one and
 *      passes it in as PORT; hard-coding 3000 makes the app unreachable.
 *   2. `dev` must be false and `dir` must be explicit, because the process
 *      working directory is not guaranteed to be the application root.
 *
 * Requires a completed build. Run `npm run build` before starting, or the app
 * will exit complaining about a missing .next directory.
 */
const http = require('node:http');
const next = require('next');

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        handle(req, res).catch((err) => {
          console.error('Request failed:', req.url, err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
      })
      .listen(port, hostname, () => {
        console.log(`Shilp Sarthi listening on ${hostname}:${port}`);
      });
  })
  .catch((err) => {
    // Exit non-zero so the host's process manager reports a failed start rather
    // than leaving a half-initialised process accepting no connections.
    console.error('Failed to start Next.js:', err);
    process.exit(1);
  });
