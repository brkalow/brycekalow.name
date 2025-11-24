export default {
  cacheComponents: true,
  experimental: {
    outputFileTracingIncludes: {
      "/notes/*": [
        "node_modules/shikiji/dist/languages/**/*",
        "node_modules/shikiji/dist/themes/**/*",
      ],
    },
  },
};
