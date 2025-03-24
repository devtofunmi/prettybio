/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com',
      'plus.unsplash.com', 'images.unsplash.comm'
    ],  // Include any other domains you're using
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

module.exports = nextConfig;

