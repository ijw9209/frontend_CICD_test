import * as Sentry from "@sentry/nextjs";

const { version } = require("./package.json");

Sentry.init({
  dsn: process.env.NEXT_SENTRY_DSN,
  release: version,
  integrations: [Sentry.replayIntegration()],
  normalizeDepth: 6,
  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
