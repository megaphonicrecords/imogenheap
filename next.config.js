/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async redirects() {
    return [
      {
        source: "/thehappysong",
        destination: "/releases/thehappysong",
        permanent: true,
      },
      {
        source: "/thequiet",
        destination: "/releases/thequiet",
        permanent: true,
      },
    ];
  },
};
