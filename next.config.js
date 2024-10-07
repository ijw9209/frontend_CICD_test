const { withSentryConfig } = require("@sentry/nextjs");
// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // trailingSlash: true,
  swcMinify: true,
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_SENTRY_DSN: process.env.NEXT_SENTRY_DSN,
  },
  generateBuildId: async () => {
    return "v1";
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ensure deterministic module and chunk ids
    config.optimization.moduleIds = "deterministic";
    config.optimization.chunkIds = "deterministic";

    // Add a custom plugin to sort chunks
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compilation.tap("SortChunksPlugin", (compilation) => {
          compilation.hooks.optimizeChunks.tap("SortChunksPlugin", (chunks) => {
            const sortedChunks = Array.from(chunks).sort((a, b) => {
              // Sort by chunk name first
              if (a.name && b.name) {
                return a.name.localeCompare(b.name);
              }
              // If names are the same or undefined, sort by id
              return (a.id || "").localeCompare(b.id || "");
            });

            // Clear the original chunks set and add sorted chunks
            chunks.clear();
            sortedChunks.forEach((chunk) => chunks.add(chunk));
          });
        });
      },
    });

    // Important: return the modified config
    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  authToken: process.env.NEXT_SENTRY_AUTH_TOKEN,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
