/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Serve os placeholders SVG em /assets/residuos/ com o Content-Type correto.
  async headers() {
    return [
      {
        source: "/assets/residuos/:file*",
        headers: [
          { key: "Content-Type", value: "image/svg+xml" },
        ],
      },
    ];
  },
};

export default nextConfig;
