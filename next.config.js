/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // You can remove this once everything works
    domains: [
      'res.cloudinary.com',
      'plus.unsplash.com',
      'images.unsplash.com',
      'i.pravatar.cc',
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

module.exports = nextConfig;


