import * as Sentry from "@sentry/nextjs";

export async function register() {
  // if (process.env.NEXT_RUNTIME === "nodejs") {
  //   console.log("durl emfdjdha??");
  //   Sentry.init({
  //     dsn: process.env.NEXT_SENTRY_DSN,
  //     normalizeDepth: 6,
  //     tracesSampleRate: 1.0,

  //     replaysSessionSampleRate: 0.1,
  //     replaysOnErrorSampleRate: 1.0,
  //   });
  // }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.client.config");
  }
}
