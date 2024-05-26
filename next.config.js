/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.dummyjson.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000,immutable',
          }
        ]
      }
    ]
  }
};

