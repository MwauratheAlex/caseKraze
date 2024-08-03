/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  headers: [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://case.mbumwa.com/"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,POST,PUT,DELETE,OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ],
};

export default nextConfig;
