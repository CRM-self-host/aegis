/** @type {import('next').NextConfig} */
const withLinaria = require('next-with-linaria');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/user-guide',
        destination: 'https://docs.aegis.com/user-guide/introduction',
        permanent: true,
      },
      {
        source: '/user-guide/section/:folder/:slug*',
        destination: 'https://docs.aegis.com/user-guide/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/user-guide/:folder/:slug*',
        destination: 'https://docs.aegis.com/user-guide/:folder/:slug*',
        permanent: true,
      },

      {
        source: '/developers',
        destination: 'https://docs.aegis.com/developers/introduction',
        permanent: true,
      },
      {
        source: '/developers/section/:folder/:slug*',
        destination: 'https://docs.aegis.com/developers/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/developers/:folder/:slug*',
        destination: 'https://docs.aegis.com/developers/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/developers/:slug',
        destination: 'https://docs.aegis.com/developers/:slug',
        permanent: true,
      },

      {
        source: '/aegis-ui',
        destination: 'https://docs.aegis.com/aegis-ui/introduction',
        permanent: true,
      },
      {
        source: '/aegis-ui/section/:folder/:slug*',
        destination: 'https://docs.aegis.com/aegis-ui/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/aegis-ui/:folder/:slug*',
        destination: 'https://docs.aegis.com/aegis-ui/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/aegis-ui/:slug',
        destination: 'https://docs.aegis.com/aegis-ui/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = withLinaria(nextConfig);
