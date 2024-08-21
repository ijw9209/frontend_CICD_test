const { withSentryConfig } = require("@sentry/nextjs");
// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_SENTRY_DSN: process.env.NEXT_SENTRY_DSN,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  authToken: process.env.NEXT_SENTRY_AUTH_TOKEN,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
